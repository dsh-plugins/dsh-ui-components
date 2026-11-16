"""计算同一浏览器无损截图的逐像素差异，并生成组件裁图和比对报告。"""

import argparse
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont


def metrics(reference, candidate):
    delta = np.abs(reference.astype(np.int16) - candidate.astype(np.int16))
    changed = np.any(delta != 0, axis=2)
    significant = np.max(delta, axis=2) > 8
    return {
        "pixels": int(changed.size),
        "changed_pixels": int(changed.sum()),
        "changed_percent": round(float(changed.mean() * 100), 3),
        "over_8_percent": round(float(significant.mean() * 100), 3),
        "mean_channel_error": round(float(delta.mean()), 3),
        "identical": not bool(changed.any()),
    }


def crop(image, bounds):
    x, y, width, height = (round(bounds[key]) for key in ("x", "y", "width", "height"))
    return image.crop((x, y, x + width, y + height))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("directory", type=Path, help="包含截图及对应布局 JSON 的目录")
    args = parser.parse_args()
    directory = args.directory
    report = {"threshold": 8, "themes": {}}
    repeat = metrics(np.array(Image.open(directory / "hero-dark.png").convert("RGB")), np.array(Image.open(directory / "hero-dark-repeat.png").convert("RGB")))
    if not repeat["identical"]:
        raise ValueError("官方参考重复截图不稳定，请先排除动画、字体或尺寸变化")
    report["reference_repeat"] = repeat
    for theme in ("light", "dark"):
        images = {name: Image.open(directory / f"{name}-{theme}.png").convert("RGB") for name in ("hero", "vue", "react")}
        layouts = {name: json.loads((directory / f"{name}-{theme}.json").read_text(encoding="utf-8")) for name in images}
        reference_cases = layouts["hero"]["samples"]
        for name, layout in layouts.items():
            if layout["viewport"] != {"width": 1280, "height": 960, "dpr": 1}:
                raise ValueError(f"截图视口不符合固定条件：{name}/{theme}")
            if set(layout["samples"]) != set(reference_cases):
                raise ValueError(f"组件样本集合不同：{name}/{theme}")
            if images[name].size != (1280, 1844):
                raise ValueError(f"截图像素尺寸不同：{name}/{theme}")
            repeated = np.array(Image.open(directory / f"{name}-{theme}-repeat.png").convert("RGB"))
            if not metrics(np.array(images[name]), repeated)["identical"]:
                raise ValueError(f"重复截图不稳定：{name}/{theme}")
            state = layout["state"]
            if state["fonts"] != "loaded" or state["textarea"] != "工作区说明" or not state["skeleton"]:
                raise ValueError(f"样本尚未完成渲染：{name}/{theme}")
            if len(state["progressFill"]) != 1 or abs(state["progressFill"][0]["width"] - 280 * 0.62) > 0.02:
                raise ValueError(f"进度样本与 62% 不符：{name}/{theme}")
        result = {}
        for name in ("vue", "react"):
            cases = []
            reference_crops = []
            candidate_crops = []
            for key, bounds in reference_cases.items():
                candidate_bounds = layouts[name]["samples"][key]
                if bounds["width"] != candidate_bounds["width"] or bounds["height"] != candidate_bounds["height"]:
                    raise ValueError(f"样本画布尺寸不同：{name}/{theme}/{key}")
                reference = np.array(crop(images["hero"], bounds))
                candidate = np.array(crop(images[name], candidate_bounds))
                cases.append({"case": key, **metrics(reference, candidate)})
                reference_crops.append(reference)
                candidate_crops.append(candidate)
            reference = np.concatenate(reference_crops, axis=0)
            candidate = np.concatenate(candidate_crops, axis=0)
            result[name] = {"aggregate": metrics(reference, candidate), "cases": cases}
            delta = np.max(np.abs(reference.astype(np.int16) - candidate.astype(np.int16)), axis=2)
            difference = np.full_like(reference, 255)
            difference[delta > 0] = [255, 145, 145]
            difference[delta > 8] = [210, 0, 55]
            Image.fromarray(difference).save(directory / f"diff-{name}-{theme}.png")
            Image.blend(Image.fromarray(reference), Image.fromarray(candidate), 0.5).save(directory / f"overlay-{name}-{theme}.png")
            print(f"已比较 {name}/{theme}：{len(cases)} 个样本，差异像素 {result[name]['aggregate']['changed_percent']}%", flush=True)
        report["themes"][theme] = result

        selected = ["button-primary", "input", "switch", "card", "tabs", "alert"]
        sheet = Image.new("RGB", (1264, 48 + len(selected) * 208), "#e4e4e7")
        draw = ImageDraw.Draw(sheet)
        font = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 20)
        label_font = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 14)
        for column, name in enumerate(("hero", "vue", "react")):
            draw.text((16 + column * 416, 12), {"hero": "HeroUI 3.2.7", "vue": "DSH Vue", "react": "DSH React"}[name], font=font, fill="#18181b")
            for row, key in enumerate(selected):
                y = 48 + row * 208
                draw.text((16 + column * 416, y), key, font=label_font, fill="#18181b")
                sheet.paste(crop(images[name], layouts[name]["samples"][key]), (16 + column * 416, y + 24))
        sheet.save(directory / f"comparison-{theme}.png")

        modal_sheet = Image.new("RGB", (1696, 304), "#e4e4e7")
        modal_draw = ImageDraw.Draw(modal_sheet)
        modal_geometry = {}
        for column, name in enumerate(("hero", "vue", "react")):
            bounds = json.loads((directory / f"{name}-modal-{theme}.json").read_text(encoding="utf-8"))
            if bounds["viewport"] != {"width": 1280, "height": 960, "dpr": 1}:
                raise ValueError(f"弹窗截图视口不同：{name}/{theme}")
            modal_geometry[name] = bounds
            modal_image = Image.open(directory / f"{name}-modal-{theme}.png").convert("RGB")
            modal_repeat = np.array(Image.open(directory / f"{name}-modal-{theme}-repeat.png").convert("RGB"))
            if not metrics(np.array(modal_image), modal_repeat)["identical"]:
                raise ValueError(f"弹窗重复截图不稳定：{name}/{theme}")
            center_x = bounds["x"] + bounds["width"] / 2
            center_y = bounds["y"] + bounds["height"] / 2
            modal_draw.text((16 + column * 560, 12), {"hero": "HeroUI 3.2.7", "vue": "DSH Vue", "react": "DSH React"}[name], font=font, fill="#18181b")
            modal_sheet.paste(modal_image.crop((round(center_x - 272), round(center_y - 120), round(center_x + 272), round(center_y + 120))), (16 + column * 560, 48))
        modal_sheet.save(directory / f"modal-comparison-{theme}.png")
        report["themes"][theme]["modal"] = modal_geometry

    (directory / "metrics.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    labels = json.loads((Path(__file__).parent / "cases.json").read_text(encoding="utf-8"))
    counts = {name: sum(case["identical"] for theme in ("light", "dark") for case in report["themes"][theme][name]["cases"]) for name in ("vue", "react")}
    lines = ["# 逐项像素比较结果", "", f"各实现共 {len(labels) * 2} 个组件和主题组合；像素完全相同的组合数为 Vue {counts['vue']}、React {counts['react']}。", "", "下表为 RGB 任一通道不相等的像素占每组 400×176 样本面积的比例；分母包含组件周围留白。", "", "| 样本 | Vue 浅色 | React 浅色 | Vue 深色 | React 深色 |", "| --- | ---: | ---: | ---: | ---: |"]
    for key, label in labels:
        values = []
        for theme, name in (("light", "vue"), ("light", "react"), ("dark", "vue"), ("dark", "react")):
            case = next(item for item in report["themes"][theme][name]["cases"] if item["case"] == key)
            values.append(f"{case['changed_percent']:.3f}%")
        lines.append(f"| {label} | {' | '.join(values)} |")
    lines.extend(["", "完整通道误差、差异像素数量、RGB 最大通道差大于 8 的比例和弹窗几何数据见 [metrics.json](metrics.json)。", ""])
    (directory / "summary.md").write_text("\n".join(lines), encoding="utf-8")


if __name__ == "__main__":
    main()

# React 像素对照

当前 React 组件与官方 HeroUI 并非像素一致：22 项样本在浅色、深色下的 44 个组合均存在差异。

运行 `npm run preview -- --port 5179 --strictPort`，访问 `http://127.0.0.1:5179/?compare=1&theme=light`。`theme=dark` 切换深色，追加 `state=modal` 打开默认弹窗。对照页使用 1280px 画布、400×176 样本框、Arial 字体并关闭动画，保留本库组件的默认视觉。

样本清单见 [cases.json](cases.json)，共用画布见 [fixture.css](fixture.css)。`ghost` 使用现有 `Button variant="text"`；Chip 使用 `Tag tone="success"`；Select 使用受控 `value="balanced"`；Progress 使用 `percent={62}`；Skeleton 使用 `text={false}` 与 `image.style` 指定 280×48 矩形。文本域显示“工作区说明”，表格关闭分页，Tooltip 比较关闭状态的触发按钮。

官方参考项目位于 `vue` 分支的 [docs/hero-reference](https://github.com/dsh-plugins/dsh-ui-components/tree/vue/docs/hero-reference)，完整测量方法、截图和结果位于该分支的 [docs/comparison](https://github.com/dsh-plugins/dsh-ui-components/tree/vue/docs/comparison)。这些资料及本次改动仅保存在本地，尚未推送；上述链接需对应分支推送后才能访问本次内容。

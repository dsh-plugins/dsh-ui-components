#!/usr/bin/env node
/**
 * 从 DSH 宿主样式表生成演示站使用的令牌副本。
 *
 * 演示站跑在普通浏览器里，没有宿主注入 `--dsw-*`。为了让组件在演示站里与
 * 在宿主里表现一致，本脚本把宿主的三张样式表（调色板、语义别名、阴影与
 * 字体）原样搬到 `docs/preview/host-tokens.css`，并补上宿主 `base.css` 里的
 * 字体族默认值。
 *
 * 用法：node scripts/gen-host-tokens.mjs
 * 宿主样式目录的定位规则与 `verify-tokens.mjs` 一致。
 */
import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

/**
 * 按候选顺序定位宿主样式目录。
 *
 * @returns 样式目录绝对路径。
 */
function locateThemeDir() {
  const candidates = []
  if (process.env.DSH_UI_THEME_DIR) candidates.push(process.env.DSH_UI_THEME_DIR)
  candidates.push(resolve(root, '..', '.dsh', 'temp', 'session-tree-harness', 'packages', 'client', 'ui-theme', 'src', 'styles'))
  for (const candidate of candidates) {
    if (existsSync(candidate) && statSync(candidate).isDirectory()) return candidate
  }
  console.error('未找到 DSH 宿主样式目录。请设置 DSH_UI_THEME_DIR。')
  process.exit(2)
}

const themeDir = locateThemeDir()

/** 需要搬运的样式表，顺序即层叠顺序。 */
const SOURCES = ['base.css', 'design-platform.css', 'gradient-shadow-text.css', 'focus.css', 'corner-shape.css']

const header = `/*
 * 本文件由 scripts/gen-host-tokens.mjs 从 DSH 宿主样式表生成，请勿手改。
 *
 * 内容与宿主 ui-theme 的样式表一一对应：静态调色板、语义别名、字体与阴影
 * 令牌、焦点环与圆角平滑。演示站用它代替宿主注入，使组件外观与在宿主中
 * 一致。宿主升级后重新运行脚本即可更新。
 */

`

const body = SOURCES.map(file => {
  const path = join(themeDir, file)
  if (!existsSync(path)) {
    console.error(`宿主样式表缺少 ${file}`)
    process.exit(2)
  }
  return `/* ── ${file} ────────────────────────────────────────────────── */\n${readFileSync(path, 'utf8').trim()}\n`
}).join('\n')

const target = join(root, 'docs', 'preview', 'host-tokens.css')
writeFileSync(target, header + body, 'utf8')
console.log(`已生成 docs/preview/host-tokens.css（来源 ${themeDir}）`)

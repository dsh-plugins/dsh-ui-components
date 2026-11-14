#!/usr/bin/env node
/**
 * 校验源码里出现的每个 DSH 变量名都真实存在于宿主样式表中。
 *
 * 宿主升级后若重命名某个 `--dsw-*` 令牌，本脚本会在离线阶段直接报错，而不是
 * 等到运行时样式静默失效。宿主样式表位置按顺序探测：
 *
 *   1. `DSH_UI_THEME_DIR` 环境变量指向的目录；
 *   2. 工作区内的 DSH 源码副本 `.dsh/temp/session-tree-harness/...`；
 *   3. `node_modules/@deepseek-ai/dsh-client-ui-theme/` 之类已安装布局。
 *
 * 全部探测失败时以非零码退出，避免把「没找到样式表」误判成「全部通过」。
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

/** 宿主样式表文件相对于 ui-theme 包的路径。 */
const STYLE_FILES = ['base.css', 'design-platform.css', 'gradient-shadow-text.css', 'focus.css', 'scrollbar.css', 'corner-shape.css']

/**
 * 按候选顺序定位宿主样式目录。
 *
 * @returns 样式目录绝对路径。
 */
function locateThemeDir() {
  const candidates = []
  if (process.env.DSH_UI_THEME_DIR) candidates.push(process.env.DSH_UI_THEME_DIR)
  candidates.push(resolve(root, '..', '.dsh', 'temp', 'session-tree-harness', 'packages', 'client', 'ui-theme', 'src', 'styles'))
  candidates.push(resolve(root, 'node_modules', '@deepseek-ai', 'dsh-client-ui-theme', 'src', 'styles'))
  candidates.push(resolve(root, 'node_modules', '@deepseek-ai', 'dsh-client-ui-theme', 'lib', 'styles'))
  for (const candidate of candidates) {
    if (existsSync(candidate) && statSync(candidate).isDirectory()) return candidate
  }
  console.error('未找到 DSH 宿主样式目录。请设置 DSH_UI_THEME_DIR，或在工作区保留 .dsh/temp/session-tree-harness 源码副本。')
  process.exit(2)
}

const themeDir = locateThemeDir()

/** 从宿主样式表解析出的全部变量名。 */
const hostTokens = new Set()
for (const file of STYLE_FILES) {
  const path = join(themeDir, file)
  if (!existsSync(path)) continue
  const css = readFileSync(path, 'utf8')
  for (const match of css.matchAll(/(--ds[wh]?-[a-z0-9-]*[a-z0-9])\s*:/g)) hostTokens.add(match[1])
}

if (hostTokens.size === 0) {
  console.error(`未能从 ${themeDir} 解析出任何 --dsw-* 变量`)
  process.exit(2)
}

/**
 * 匹配源码中一个完整的宿主令牌名。
 *
 * 覆盖宿主的三类前缀：`--dsw-*`（主题令牌）、`--dsh-*`（主题运行时写入的
 * 变量）与 `--ds-*`（字体与动效）。令牌必须以字母或数字结尾，且后面不能
 * 紧跟 `-`、`*` 或标识符字符，这样注释里的通配写法（`--dsw-alias-*`）与
 * 半截前缀不会被当成真实令牌名。
 */
const TOKEN_PATTERN = /--ds[wh]?-[a-z0-9-]*[a-z0-9](?![-\w*])/g

/**
 * 递归列出目录下的 TypeScript 源文件。
 *
 * @param dir - 起始目录。
 * @returns 文件绝对路径列表。
 */
function listSources(dir) {
  const out = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...listSources(path))
    else if (/\.tsx?$/.test(entry.name)) out.push(path)
  }
  return out
}

/**
 * 匹配本包自己定义局部变量的两种写法：CSS 里的 `--name:` 声明，以及 TSX
 * inline style 里的 `'--name': value` 键。分段控件的位置变量就是这样注入的。
 */
const DECLARATION_PATTERNS = [
  /(--ds[wh]?-[a-z0-9-]*[a-z0-9])\s*:/g,
  /['"](--ds[wh]?-[a-z0-9-]*[a-z0-9])['"]\s*:/g,
]

const sources = listSources(join(root, 'src')).filter(file => !file.endsWith('icons-index.ts'))

// 本包自己声明的局部变量（如分段控件的位置变量）不要求宿主定义。
const localTokens = new Set()
for (const file of sources) {
  const text = readFileSync(file, 'utf8')
  for (const pattern of DECLARATION_PATTERNS) {
    for (const match of text.matchAll(pattern)) localTokens.add(match[1])
  }
}

const problems = []
const referenced = new Set()
for (const file of sources) {
  const relative = file.slice(root.length + 1).replace(/\\/g, '/')
  const text = readFileSync(file, 'utf8')
  for (const match of text.matchAll(TOKEN_PATTERN)) {
    const name = match[0]
    referenced.add(name)
    if (!hostTokens.has(name) && !localTokens.has(name)) problems.push(`${relative} 引用了不存在的令牌 ${name}`)
  }
}

if (problems.length > 0) {
  console.error([...new Set(problems)].join('\n'))
  console.error('对照宿主样式表修正上述令牌名')
  process.exit(1)
}

console.log(`令牌校验通过：引用 ${referenced.size} 个令牌（其中本包声明 ${localTokens.size} 个），宿主定义 ${hostTokens.size} 个`)

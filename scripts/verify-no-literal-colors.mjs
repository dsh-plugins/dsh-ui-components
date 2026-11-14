#!/usr/bin/env node
/**
 * 校验源码没有写死颜色。
 *
 * 颜色只能以 `--dsw-*` 令牌、Arco 变量或 `currentColor` / `transparent`
 * 表达，否则宿主换主题时会露出旧配色。唯一放行的是 `src/foundation/bridge.ts`
 * —— Arco 的十级色阶必须是 `R,G,B` 三元组字面量，无法用令牌表达。
 */
import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

/** 允许出现字面色值的文件，相对仓库根。 */
const ALLOWED = new Set(['src/foundation/bridge.ts', 'src/foundation/palette.ts'])

/** 逐条检查规则：命中即报错。 */
const RULES = [
  { name: '十六进制色值', pattern: /#[0-9a-fA-F]{3,8}\b/g },
  { name: 'rgb()/rgba()/hsl() 字面量', pattern: /\b(?:rgba?|hsla?)\(\s*\d/g },
  { name: '颜色关键字 white/black', pattern: /(?<![\w-])(?:white|black)(?![\w-])/g },
]

/**
 * 递归列出目录下的源文件。
 *
 * @param dir - 起始目录。
 * @returns 文件绝对路径列表。
 */
function listSources(dir) {
  const out = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...listSources(path))
    else if (/\.(tsx?|css)$/.test(entry.name)) out.push(path)
  }
  return out
}

const problems = []
for (const file of listSources(join(root, 'src'))) {
  const relative = file.slice(root.length + 1).replace(/\\/g, '/')
  if (ALLOWED.has(relative)) continue
  const text = readFileSync(file, 'utf8')
  text.split(/\r?\n/).forEach((line, index) => {
    for (const rule of RULES) {
      rule.pattern.lastIndex = 0
      if (rule.pattern.test(line)) {
        problems.push(`${relative}:${index + 1} 出现${rule.name}：${line.trim().slice(0, 100)}`)
      }
    }
  })
}

if (problems.length > 0) {
  console.error(problems.slice(0, 30).join('\n'))
  if (problems.length > 30) console.error(`… 另有 ${problems.length - 30} 处`)
  console.error('改用 --dsw-* 令牌、Arco 变量或 currentColor / transparent')
  process.exit(1)
}

console.log('字面颜色校验通过')

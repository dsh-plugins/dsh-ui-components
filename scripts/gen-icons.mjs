#!/usr/bin/env node
/**
 * 从 @icon-park/react 生成两条图标通道：
 *
 *   1. src/icons/<Pascal>.ts —— 2658 个逐图标转导出，供
 *      `dsh-ui-components/icons/Setting` 这样的子路径按需引入。
 *   2. src/icons-index.ts —— 全量元数据，不导入任何图标模块，供搜索框、
 *      图标选择器与文档站使用。
 *
 * 用法：node scripts/gen-icons.mjs [--check]
 *   不带参数时重写两份产物；带 --check 时只比对，发现差异即以非零码退出。
 */
import { readFileSync, readdirSync, rmSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const iconsDir = join(root, 'src', 'icons')
const indexFile = join(root, 'src', 'icons-index.ts')
const check = process.argv.includes('--check')

/** 图标清单的绝对路径，从本包依赖树解析。 */
const manifestPath = require.resolve('@icon-park/react/icons.json')
/** 单个图标模块目录，用于核对转导出目标确实存在。 */
const modulesDir = join(dirname(manifestPath), 'es', 'icons')

/**
 * 把 IconPark 的 kebab-case 名字转成模块文件名用的 PascalCase。
 *
 * @param name - 例如 `a-cane`。
 * @returns 例如 `ACane`。
 */
function pascal(name) {
  return name
    .split('-')
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

/**
 * 把任意文本转成可安全放进单引号字符串字面量的形式。
 *
 * @param text - 原始文本。
 * @returns 转义后的文本。
 */
function quote(text) {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r\n|[\r\n\u2028\u2029]/g, ' ')
    .replace(/\t/g, ' ')
}

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
if (!Array.isArray(manifest) || manifest.length === 0) {
  throw new Error('icons.json 为空或格式不符合预期')
}

/** 每个图标一条，按名字排序保证产物稳定。 */
const entries = manifest
  .map(item => ({
    name: String(item.name),
    pascal: pascal(String(item.name)),
    title: String(item.title ?? ''),
    titleZh: String(item.titleZh ?? item.title ?? ''),
    category: String(item.category ?? ''),
    tags: Array.isArray(item.tag) ? item.tag.map(String) : [],
    rtl: item.rtl === true,
  }))
  .sort((a, b) => (a.pascal < b.pascal ? -1 : a.pascal > b.pascal ? 1 : 0))

const collisions = entries.filter((entry, index) => index > 0 && entries[index - 1].pascal === entry.pascal)
if (collisions.length > 0) {
  throw new Error(`图标名转 PascalCase 后冲突：${collisions.map(entry => `${entry.name}->${entry.pascal}`).join(', ')}`)
}

for (const entry of entries) {
  if (!existsSync(join(modulesDir, `${entry.pascal}.js`))) {
    throw new Error(`@icon-park/react 缺少图标模块 es/icons/${entry.pascal}.js（来源图标 ${entry.name}）`)
  }
}

/**
 * 单图标转导出文件的内容。
 *
 * @param entry - 一条图标记录。
 * @returns 文件文本。
 */
function iconModule(entry) {
  return `export { default } from '@icon-park/react/es/icons/${entry.pascal}.js'\n`
}

const metadataRows = entries
  .map(entry => {
    const tags = entry.tags.map(tag => `'${quote(tag)}'`).join(', ')
    return `  { name: '${quote(entry.name)}', pascal: '${entry.pascal}', title: '${quote(entry.title)}', titleZh: '${quote(entry.titleZh)}', category: '${quote(entry.category)}', tags: [${tags}], rtl: ${entry.rtl} },`
  })
  .join('\n')

const indexSource = `/**
 * 全量 IconPark 图标元数据，共 ${entries.length} 条。
 *
 * 本文件由 scripts/gen-icons.mjs 从 @icon-park/react/icons.json 生成，请勿手改；
 * 它不导入任何图标模块，因此被 import 时不会把图标打进产物。按名取组件请从
 * \`@dsh-plugin/dsh-ui-components/icons/<pascal>\` 逐图标引入，或使用根导出的
 * 策划命名集 \`Icon\` / \`Icons\`。
 *
 * @module @dsh-plugin/dsh-ui-components/icons-index
 */

/** 一条图标元数据。 */
export interface IconMeta {
  /** IconPark 的 kebab-case 名。 */
  name: string
  /** 对应的模块文件名，也是 \`./icons/<pascal>\` 子路径的末段。 */
  pascal: string
  /** 图标标题，英文与无译名时为原名。 */
  title: string
  /** 图标中文标题。 */
  titleZh: string
  /** IconPark 分类，例如 \`Edit\`。 */
  category: string
  /** 检索标签。 */
  tags: readonly string[]
  /** 该图标是否有 RTL 变体。 */
  rtl: boolean
}

/** 全部图标元数据。 */
export const ICON_INDEX: readonly IconMeta[] = [
${metadataRows}
]

/** 全部图标数量，供门禁核对。 */
export const ICON_COUNT = ${entries.length}
`

if (check) {
  const problems = []
  /**
   * 读取源码并把行尾归一为 LF。
   *
   * 生成内容始终是 LF；Windows 检出时 Git 的 `core.autocrlf` 会把工作区文件
   * 转成 CRLF，逐字节比较就会让全部图标误报为不一致。
   *
   * @param path - 文件绝对路径。
   * @returns 归一化后的内容。
   */
  const readNormalized = path => readFileSync(path, 'utf8').replace(/\r\n/g, '\n')
  if (!existsSync(indexFile)) {
    problems.push('缺少 src/icons-index.ts')
  } else if (readNormalized(indexFile) !== indexSource) {
    problems.push('src/icons-index.ts 与 icons.json 不一致')
  }
  const existing = existsSync(iconsDir) ? readdirSync(iconsDir).filter(file => file.endsWith('.ts')) : []
  const expected = new Set(entries.map(entry => `${entry.pascal}.ts`))
  for (const file of existing) {
    if (!expected.has(file)) problems.push(`多余的图标模块 src/icons/${file}`)
  }
  for (const file of expected) {
    if (!existing.includes(file)) {
      problems.push(`缺少图标模块 src/icons/${file}`)
      continue
    }
    const entry = entries.find(item => `${item.pascal}.ts` === file)
    if (readNormalized(join(iconsDir, file)) !== iconModule(entry)) {
      problems.push(`src/icons/${file} 内容与模板不一致`)
    }
  }
  if (problems.length > 0) {
    console.error(problems.slice(0, 20).join('\n'))
    if (problems.length > 20) console.error(`… 另有 ${problems.length - 20} 项`)
    console.error('运行 `npm run gen:icons` 重新生成')
    process.exit(1)
  }
  console.log(`图标通道校验通过：${entries.length} 个图标`)
} else {
  rmSync(iconsDir, { recursive: true, force: true })
  mkdirSync(iconsDir, { recursive: true })
  for (const entry of entries) {
    writeFileSync(join(iconsDir, `${entry.pascal}.ts`), iconModule(entry), 'utf8')
  }
  writeFileSync(indexFile, indexSource, 'utf8')
  console.log(`已生成 ${entries.length} 个图标模块与 src/icons-index.ts`)
}

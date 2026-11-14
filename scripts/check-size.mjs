#!/usr/bin/env node
/**
 * 核对发布产物的体积与文件数。
 *
 * 本包逐文件产出 ESM 与声明，体积主要由图标通道决定：`lib/icons/` 每个文件
 * 是一行转导出，整体应保持在几百 KB 量级。门禁在构建后用 `npm pack` 的
 * 实际结果核对，超出阈值说明产物结构发生了变化。
 *
 * 用法：node scripts/check-size.mjs [--json]
 */
import { execFileSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

/** 各部分的体积上限，单位字节。 */
const LIMITS = {
  /** 整个压缩包上限，覆盖图标、组件与声明。 */
  tarball: 2_200_000,
  /** 打包后的解压体积上限。 */
  unpacked: 7_000_000,
}
/** 压缩包内文件数上限。图标通道本身占约 5300 个（`.js` 与 `.d.ts` 各一份）。 */
const MAX_FILES = 6_000

let report
try {
  const output = execFileSync('npm', ['pack', '--dry-run', '--json'], {
    cwd: root,
    encoding: 'utf8',
    shell: process.platform === 'win32',
  })
  // npm 在不同版本下可能返回数组、单个对象，或以包名为键的对象；BOM 也要先去掉。
  const parsed = JSON.parse(output.replace(/^\uFEFF/, ''))
  const candidate = Array.isArray(parsed) ? parsed[0] : parsed
  report = candidate !== null && typeof candidate === 'object' && !('size' in candidate)
    ? Object.values(candidate)[0]
    : candidate
} catch (error) {
  console.error('npm pack --dry-run 失败，请先执行 npm run build')
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(2)
}

if (report === undefined || report === null || typeof report !== 'object') {
  console.error('无法从 npm pack --dry-run 的输出中定位本次打包结果')
  process.exit(2)
}

const size = Number(report.size ?? 0)
const unpacked = Number(report.unpackedSize ?? 0)
const files = Number(report.entryCount ?? (Array.isArray(report.files) ? report.files.length : 0))

const problems = []
if (size > LIMITS.tarball) problems.push(`压缩包 ${size} 字节超过上限 ${LIMITS.tarball}`)
if (unpacked > LIMITS.unpacked) problems.push(`解压体积 ${unpacked} 字节超过上限 ${LIMITS.unpacked}`)
if (files > MAX_FILES) problems.push(`文件数 ${files} 超过上限 ${MAX_FILES}`)

if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ size, unpacked, files }, null, 2))
}

if (problems.length > 0) {
  console.error(problems.join('\n'))
  process.exit(1)
}

console.log(`体积检查通过：压缩包 ${(size / 1024).toFixed(0)} KB，解压 ${(unpacked / 1024).toFixed(0)} KB，${files} 个文件`)

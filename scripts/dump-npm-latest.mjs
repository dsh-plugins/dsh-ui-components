#!/usr/bin/env node
/**
 * 把 npm 上本包的 latest 版本信息回写到仓库根的 npm-latest.json。
 *
 * 由发布工作流在正式版发布后调用，内容幂等：同一 latest 版本重复运行没有
 * 差异，因此不会产生空提交。
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const registry = process.env.NPM_REGISTRY ?? 'https://registry.npmjs.org'
const manifest = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
const name = manifest.name

const tagsResponse = await fetch(`${registry}/-/package/${name}/dist-tags`, {
  headers: { accept: 'application/json' },
})
if (!tagsResponse.ok) {
  console.error(`读取 dist-tags 失败：HTTP ${tagsResponse.status}`)
  process.exit(1)
}
const tags = await tagsResponse.json()
const latest = tags.latest
if (typeof latest !== 'string') {
  console.error('dist-tags 中没有 latest')
  process.exit(1)
}

const versionResponse = await fetch(`${registry}/${name}/${latest}`, {
  headers: { accept: 'application/json' },
})
if (!versionResponse.ok) {
  console.error(`读取 ${name}@${latest} 失败：HTTP ${versionResponse.status}`)
  process.exit(1)
}
const version = await versionResponse.json()

const record = {
  name,
  latest,
  publishedAt: '',
  dist: {
    tarball: version.dist?.tarball ?? '',
    integrity: version.dist?.integrity ?? '',
    unpackedSize: version.dist?.unpackedSize ?? 0,
  },
}

// 发布时间取注册表给出的该版本时间戳，读不到时退回当前时间。
const document = await fetch(`${registry}/${name}`, { headers: { accept: 'application/json' } })
  .then(response => (response.ok ? response.json() : undefined))
  .catch(() => undefined)
const publishedAt = document?.time?.[latest]
record.publishedAt = typeof publishedAt === 'string' ? publishedAt : new Date().toISOString()

writeFileSync(join(root, 'npm-latest.json'), `${JSON.stringify(record, null, 2)}\n`, 'utf8')
console.log(`已写入 npm-latest.json：${name}@${latest}`)

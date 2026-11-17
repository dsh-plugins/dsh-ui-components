import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'

// 发布包的根入口必须包含依赖版本实际提供的每个 Arco 组件。
const require = createRequire(import.meta.url)
const root = dirname(require.resolve('@arco-design/web-vue/package.json'))
const declarations = await readFile(resolve(root, 'es/index.d.ts'), 'utf8')
const exports = await import('../dist/index.js')
const names = [...declarations.matchAll(/export \{([^}]+)\} from '\.\/([^']+)';/g)]
  .filter(([, , source]) => !source.startsWith('_') && source !== 'locale')
  .flatMap(([, list]) => list.split(',').map(entry => entry.trim().split(/\s+as\s+/).at(-1)).filter(Boolean))
  .filter(name => name !== 'default')
const missing = names.filter(name => !(name in exports))
if (missing.length > 0) {
  throw new Error(`发布入口缺少 Arco 导出：${missing.join(', ')}`)
}
console.log(`已核对 ${names.length} 个 Arco 组件及子组件导出`)

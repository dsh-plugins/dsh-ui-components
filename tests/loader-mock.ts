/**
 * `@dsh-plugin/dsh-loader/client` 的测试替身。
 *
 * 真实的 loader 客户端产物是一个脚本：顶层只调用
 * `window.__ModuleLoader__.load({ id, factory })`，本身没有任何 `export`，
 * 导出对象是工厂返回的 `module.exports`。宿主的模块表正是这样求值的，而
 * 静态 import 分析看不到任何命名导出，因此测试必须复现这一步：读文件、在
 * 沙箱里执行以捕获工厂、再用同一套模块解析调用它。
 *
 * 这样测试跑的是宿主实际会加载的那份 Arco 与控件，而不是项目另装的一份。
 * 新增对 loader 其余导出的依赖时，在文件末尾补一条再导出即可。
 */
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { runInThisContext } from 'node:vm'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as ReactDOMClient from 'react-dom/client'
import * as JsxRuntime from 'react/jsx-runtime'

const nodeRequire = createRequire(import.meta.url)

/**
 * 菜单原语替身。
 *
 * 真实实现来自宿主内部的 `@deepseek-ai/dsh-client-ui-primitives`，本包只在
 * 菜单包装层引用它。测试用一个渲染子节点的最小实现替代，避免把宿主内部包
 * 拉进依赖树。
 *
 * @param props - 菜单 props。
 * @returns 带 `role="menu"` 的容器。
 */
function MenuStub(props: { children?: React.ReactNode }): React.ReactElement {
  return React.createElement('div', { role: 'menu' }, props.children)
}

/** 模块表：说明符到导出对象。 */
const MODULES: Record<string, unknown> = {
  react: React,
  'react/jsx-runtime': JsxRuntime,
  'react-dom': ReactDOM,
  'react-dom/client': ReactDOMClient,
  util: nodeRequire('node:util'),
  '@deepseek-ai/dsh-client-ui-primitives': { Menu: MenuStub, MenuItemButton: MenuStub },
}

/**
 * 解析工厂请求的模块说明符，剥掉客户端入口的 `/client` 后缀。
 *
 * @param specifier - 工厂请求的说明符。
 * @returns 对应导出对象。
 */
function resolveModule(specifier: string): unknown {
  const normalized = specifier.endsWith('/client') ? specifier.slice(0, -'/client'.length) : specifier
  const found = MODULES[specifier] ?? MODULES[normalized]
  if (found !== undefined) return found
  throw new Error(`测试模块表缺少 ${specifier}，请在 tests/loader-mock.ts 中补充`)
}

/**
 * loader 客户端产物的路径。
 *
 * 包清单的 `exports` 没有暴露 `lib/*`，因此先解析 `./package.json` 子路径
 * 拿到包目录，再拼出产物文件名。
 */
const packageDir = dirname(nodeRequire.resolve('@dsh-plugin/dsh-loader/package.json'))
const bundlePath = join(packageDir, 'lib', 'client.js')

/** 捕获到的注册项。 */
interface Registration {
  id: string
  factory: (require: (id: string) => unknown) => Record<string, unknown>
}

/** 最近一次捕获的注册项。 */
let captured: Registration | undefined

/**
 * 模块表入口。
 *
 * 挂在真实的 `window` 上而不是沙箱对象上：产物在注册之后会立即被求值，
 * 工厂闭包要用到 `document`、`MutationObserver` 等浏览器全局，这些只有当前
 * 上下文（jsdom 环境）里才有。
 */
const host = (typeof window === 'undefined' ? globalThis : window) as unknown as Record<string, unknown>
host.__ModuleLoader__ = {
  /**
   * 捕获注册的工厂。
   *
   * @param entry - 注册项。
   */
  load(entry: Registration): void {
    captured = entry
  },
}

// 在当前上下文求值产物，让工厂闭包看到同一套全局对象。
runInThisContext(readFileSync(bundlePath, 'utf8'), { filename: bundlePath })

if (captured === undefined) {
  throw new Error('loader 客户端产物没有调用 window.__ModuleLoader__.load')
}

/** 宿主实际会得到的导出对象。 */
const loaded = captured.factory(resolveModule)

/**
 * 取一个导出，缺失时直接报错，避免测试静默拿到 `undefined`。
 *
 * @param name - 导出名。
 * @returns 导出值。
 */
function take<T>(name: string): T {
  const value = loaded[name]
  if (value === undefined) throw new Error(`loader 客户端产物没有导出 ${name}`)
  return value as T
}

/** Arco 组件与类型命名空间。 */
export const Arco = take<Record<string, any>>('Arco')

/** 幂等样式注入器。 */
export const injectStyle = take<<R>(pluginId: string, cssId: string, css: string) => R>('injectStyle')

/** 基于 Arco 主题的滚动容器。 */
export const Scrollbar = take<React.ComponentType<any>>('Scrollbar')

/** 设计令牌（颜色）。 */
export const T = take<Record<string, string>>('T')

/** 设计令牌（几何量）。 */
export const G = take<Record<string, number>>('G')

/** 类名拼接。 */
export const cx = take<(...parts: Array<string | false | null | undefined>) => string>('cx')

/** loader 注册的包名。 */
export const name = take<string>('name')

/**
 * 演示站里对 `@dsh-plugin/dsh-loader/client` 的替身。
 *
 * 真实宿主中，这三个导出来自 loader 的客户端模块表：Arco 单例、幂等样式
 * 注入器、滚动容器。演示站没有宿主模块表，如果把 loader 的客户端产物再求值
 * 一遍，页面里会出现两份 React（产物自带一条独立依赖链），组件随即报
 * “Invalid hook call”。
 *
 * 因此演示站直接引用同版本的 `@arco-design/web-react`，并按 loader 的语义
 * 补上另外两个导出。视觉与行为与宿主一致，React 也保持单实例。真实模块表
 * 的互操作路径由 `tests/loader-mock.ts` 覆盖，那里没有渲染两棵树的问题。
 */
import * as React from 'react'
import * as ArcoModule from '@arco-design/web-react'

/** 本包在宿主样式归属属性中使用的插件 id。 */
const OWNER = '@dsh-plugin/dsh-ui-components'

/** Arco 组件与类型命名空间。 */
export const Arco = ArcoModule as unknown as Record<string, any>

/**
 * 幂等注入样式表，与 loader 的实现语义一致：按 `data-plugin-css` 去重，
 * 返回移除标签的释放函数。
 *
 * @param pluginId - 归属插件 id。
 * @param cssId - 表内唯一标识。
 * @param css - 样式表文本。
 * @returns 释放函数。
 */
export function injectStyle(pluginId: string, cssId: string, css: string): () => void {
  if (typeof document === 'undefined') return () => {}
  const tagId = `${pluginId}/${cssId}`
  const selector = `style[data-plugin-css="${tagId}"]`
  if (document.querySelector(selector) !== null) return () => {}
  const style = document.createElement('style')
  style.dataset.plugin = pluginId
  style.dataset.pluginCss = tagId
  style.textContent = css
  document.head.appendChild(style)
  return () => {
    if (style.parentNode !== null) style.parentNode.removeChild(style)
  }
}

/** {@link Scrollbar} 的 props。 */
export interface ScrollbarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 内容。 */
  children: React.ReactNode
}

/** 滚动容器的样式表，与 loader 的滚动条外观一致：隐藏原生滚动条与轨道。 */
const SCROLLBAR_CSS = `
.dshl-scrollbar{position:relative;display:flex;min-height:0;min-width:0;overflow:hidden}
.dshl-scrollbar-viewport{flex:1;min-height:0;min-width:0;overflow:auto;overscroll-behavior:contain;scrollbar-width:none;padding-right:12px}
.dshl-scrollbar-viewport::-webkit-scrollbar{display:none}
.dshl-scrollbar-content{min-width:0;display:flow-root}
`

/**
 * 隐藏原生滚动条的纵向滚动容器。
 *
 * 真实实现带自绘滑块与键盘操作，演示站只需要它不遮挡内容、并能撑出滚动，
 * 因此保留同一套类名与布局，去掉滑块。
 *
 * @param props - 见 {@link ScrollbarProps}。
 * @returns 滚动容器元素。
 */
export function Scrollbar({ children, className, ...rest }: ScrollbarProps): React.ReactElement {
  injectStyle(OWNER, 'preview/scrollbar.css', SCROLLBAR_CSS)
  return (
    <div {...rest} className={['dshl-scrollbar', className].filter(Boolean).join(' ')}>
      <div className="dshl-scrollbar-viewport">
        <div className="dshl-scrollbar-content">{children}</div>
      </div>
    </div>
  )
}

/** 颜色令牌，与 loader 导出同名，供需要它的代码编译通过。 */
export const T = {} as Record<string, string>

/** 几何令牌。 */
export const G = {} as Record<string, number>

/**
 * 拼接类名。
 *
 * @param parts - 类名片段，假值被跳过。
 * @returns 以单个空格连接的类名字符串。
 */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

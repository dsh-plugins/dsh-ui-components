/**
 * 样式注入与类名拼接。
 *
 * 样式以字符串常量形式注入，消费方不需要任何 CSS 处理管线。注入走
 * `@dsh-plugin/dsh-loader/client` 的 `injectStyle`，它带 `data-plugin` /
 * `data-plugin-css` 归属属性，宿主热重载时可以回收。
 *
 * @module @dsh-plugin/dsh-ui-components/foundation/style
 */
import { injectStyle } from '@dsh-plugin/dsh-loader/client'

/** 本包在宿主样式归属属性中使用的插件 id。 */
export const OWNER = '@dsh-plugin/dsh-ui-components'

/** 组件样式统一使用的根类名。 */
export const ROOT_CLASS = 'dsh-ui'

/** 浮层容器元素 id。 */
export const PORTAL_ID = 'dsh-ui-portal'

/**
 * 幂等注入一张样式表。
 *
 * @param cssId - 表内唯一标识，例如 `foundation/bridge.css`。
 * @param css - 样式表文本。
 * @returns 释放函数，移除本次注入的标签；重复注入时返回空实现。
 */
export function injectUiStyle(cssId: string, css: string): () => void {
  if (typeof document === 'undefined') { return () => {} }
  return injectStyle(OWNER, cssId, css)
}

/** 浮层容器的类名，带上它才能在 body 层读到同一套变量。 */
export const OVERLAY_CLASS = `${ROOT_CLASS}-overlay`

/**
 * 取得或创建 body 级浮层容器。
 *
 * Arco 的 `Modal`、`Drawer` 与命令式弹层自带 `getPopupContainer` 默认值
 * （直接返回 `document.body`），不读 `ConfigProvider` 的设置，因此这类组件
 * 必须显式传入本容器，否则浮层挂在 `body` 下拿不到 `.dsh-ui` 的变量。
 *
 * @returns 容器元素；服务端渲染时返回 `null`。
 */
export function ensureOverlayContainer(): HTMLElement | null {
  if (typeof document === 'undefined') { return null }
  const existing = document.getElementById(PORTAL_ID)
  if (existing !== null) {
    existing.dataset.theme = 'host'
    return existing
  }
  const host = document.createElement('div')
  host.id = PORTAL_ID
  host.className = `${ROOT_CLASS} ${OVERLAY_CLASS}`
  host.dataset.theme = 'host'
  host.dataset.radius = 'md'
  document.body.appendChild(host)
  return host
}

/**
 * 拼接类名，忽略假值。
 *
 * @param parts - 类名片段，假值被跳过。
 * @returns 以单个空格连接的类名字符串。
 */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

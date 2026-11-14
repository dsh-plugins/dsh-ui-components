/**
 * DSH 组件树的根提供器。
 *
 * 它做三件事：注入桥接样式表、把 Arco 的全部浮层挂到带同一套变量的容器
 * 上、并把 `.dsh-ui` 容器类交给子树。插件在自己的 React 树根部挂一次即可，
 * 组件本身不依赖它也能渲染（样式表会在首个组件渲染时补注入），但没有它时
 * 浮层会挂到 `body` 下而拿不到 `.dsh-ui` 的变量。
 *
 * @module @dsh-plugin/dsh-ui-components/foundation/provider
 */
import * as React from 'react'
import { Arco } from '@dsh-plugin/dsh-loader/client'
import { BRIDGE_CSS } from './bridge.js'
import { ROOT_CLASS, ensureOverlayContainer, injectUiStyle } from './style.js'

/** {@link DshProvider} 的 props。 */
export interface DshProviderProps {
  /** 子树内容。 */
  children?: React.ReactNode
  /** 追加到根容器的类名。 */
  className?: string
  /** 追加到根容器的内联样式。 */
  style?: React.CSSProperties
}

/**
 * 取得或创建浮层容器。
 *
 * 容器挂在 `body` 下并带 `.dsh-ui-overlay`，因此浮层即使在 body 层也能读到
 * 同一套变量。多个 provider 共用同一个容器，卸载时只解除自己的引用。
 *
 * @returns 浮层容器元素；服务端渲染时返回 `null`。
 */
function ensurePortal(): HTMLElement | null {
  return ensureOverlayContainer()
}

/**
 * 包裹子树，注入 DSH 皮肤并把 Arco 浮层收进统一容器。
 *
 * @param props - 见 {@link DshProviderProps}。
 * @returns 带 `.dsh-ui` 容器的 `ConfigProvider` 子树。
 */
export function DshProvider({ children, className, style }: DshProviderProps): React.ReactElement {
  // 注入放在渲染期：样式必须先于首帧存在，而 injectUiStyle 幂等。
  injectUiStyle('foundation/bridge.css', BRIDGE_CSS)

  const getPopupContainer = React.useCallback((node: HTMLElement): HTMLElement => {
    // 浮层优先留在触发元素所在的滚动/裁剪上下文里，只有在它不在 `.dsh-ui`
    // 子树内时才回退到 body 级容器。
    const scope = node.closest(`.${ROOT_CLASS}`)
    return scope instanceof HTMLElement ? scope : (ensurePortal() ?? document.body)
  }, [])

  return (
    <Arco.ConfigProvider getPopupContainer={getPopupContainer}>
      <div className={[ROOT_CLASS, className].filter(Boolean).join(' ')} style={style}>
        {children}
      </div>
    </Arco.ConfigProvider>
  )
}

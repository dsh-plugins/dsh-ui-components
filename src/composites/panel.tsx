/**
 * 弹出层外壳。
 *
 * 插件自己实现的弹窗、面板、配置编辑器都用它，从而自动满足全局规范：与窗口
 * 上下各留 120px、最大高度 `calc(100dvh - 240px)`、内容区内部滚动、标题与
 * 操作行固定可见。内容滚动统一用 loader 的 `Scrollbar`。
 *
 * @module @dsh-plugin/dsh-ui-components/composites/panel
 */
import * as React from 'react'
import { Arco, Scrollbar } from '@dsh-plugin/dsh-loader/client'
import { PopupContext } from '../foundation/provider.js'
import { cx } from '../foundation/style.js'
import { IconButton } from '../basic/icon-button.js'
import { Icon } from '../foundation/icons.js'
import { injectCompositeStyles } from './styles.js'

/** {@link PanelShell} 的 props。 */
export interface PanelShellProps {
  /** 面板标题。 */
  title?: React.ReactNode
  /** 标题右侧关闭按钮的可访问名称；省略时不渲染关闭按钮。 */
  closeLabel?: string
  /** 关闭时回调。 */
  onClose?: () => void
  /** 底部操作区。 */
  footer?: React.ReactNode
  /** 内容。 */
  children?: React.ReactNode
  /** 追加类名。 */
  className?: string
  /** 关闭时是否渲染遮罩，默认渲染。 */
  mask?: boolean
}

/**
 * 一个居中的弹出面板，自带规范要求的留白与滚动行为。
 *
 * @param props - 见 {@link PanelShellProps}。
 * @returns 面板元素。
 */
export function PanelShell({
  title,
  closeLabel,
  onClose,
  footer,
  children,
  className,
  mask = true,
}: PanelShellProps): React.ReactElement {
  injectCompositeStyles()
  const dialog = React.useRef<HTMLDialogElement>(null)
  const titleId = React.useId()
  const getPopupContainer = React.useCallback(() => dialog.current ?? document.body, [])
  React.useLayoutEffect(() => {
    const node = dialog.current!
    const previous = document.activeElement
    node.showModal()
    return () => {
      node.close()
      if (previous instanceof HTMLElement && previous.isConnected) previous.focus()
    }
  }, [])
  return (
    <dialog ref={dialog} className={cx('dsh-panel-shell', className)} aria-modal="true"
      aria-labelledby={title == null ? undefined : titleId}
      onCancel={event => { event.preventDefault(); onClose?.() }}>
      <PopupContext.Provider value={getPopupContainer}>
        <Arco.ConfigProvider getPopupContainer={getPopupContainer}>
          {mask ? <div className="dsh-panel-shell__mask" onClick={onClose} /> : null}
          <div className="dsh-panel-shell__card">
            {title === undefined && closeLabel === undefined
              ? null
              : (
                <div className="dsh-panel-shell__header">
                  {title === undefined ? <span /> : <h2 id={titleId} className="dsh-panel-shell__title">{title}</h2>}
                  {closeLabel === undefined
                    ? null
                    : <IconButton icon={<Icon name="Close" />} label={closeLabel} onClick={onClose} />}
                </div>
              )}
            <div className="dsh-panel-shell__body">
              <Scrollbar>{children}</Scrollbar>
            </div>
            {footer === undefined ? null : <div className="dsh-panel-shell__footer">{footer}</div>}
          </div>
        </Arco.ConfigProvider>
      </PopupContext.Provider>
    </dialog>
  )
}

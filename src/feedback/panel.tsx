/**
 * 弹窗与抽屉。
 *
 * 弹窗与窗口顶部、底部各留至少 120px，抽屉贴边且允许占满高度；
 * 超出部分在内部滚动，标题与操作行保持可见。样式
 * 已由 `feedback/styles` 落实，组件这一层只负责把 Arco 的 API 接到 DSH 的
 * 语义上：`title`、`footer`、`content` 三个位置固定，`scroll` 打开时内容区
 * 换成宿主统一的滚动容器。
 *
 * @module @dsh-plugin/dsh-ui-components/feedback/panel
 */
import * as React from 'react'
import { Arco, Scrollbar } from '@dsh-plugin/dsh-loader/client'
import { ensureOverlayContainer, injectUiStyle } from '../foundation/style.js'
import { useDshPopupContainer } from '../foundation/provider.js'
import { BRIDGE_CSS, HERO_CSS, HERO_COMPONENT_CSS } from '../foundation/bridge.js'
import { injectFeedbackStyles } from './styles.js'
import { injectHeroOverlayStyles } from '../foundation/overlay-style.js'

/**
 * 把浮层挂到带皮肤变量的容器上。
 *
 * Arco 的 `Modal` 与 `Drawer` 自带 `getPopupContainer` 默认值，它直接返回
 * `document.body` 且不读 `ConfigProvider`，因此这两类组件必须逐次传入，否则
 * 弹层会在 body 层渲染，拿不到 `.dsh-ui` 上的 DSH 变量。
 *
 * @returns 浮层容器；服务端渲染时退回 `document.body`。
 */
function overlayContainer(): HTMLElement {
  return ensureOverlayContainer() ?? document.body
}

/** {@link Modal} 的 props。 */
export type ModalProps = Omit<React.ComponentPropsWithoutRef<typeof Arco.Modal>, 'children'> & {
  /** 弹窗标题。 */
  title?: React.ReactNode
  /** 内容。 */
  children?: React.ReactNode
  /** 底部操作行。 */
  footer?: React.ReactNode
  /** 内容超出高度时是否启用宿主统一的滚动容器，默认启用。 */
  scroll?: boolean
  /** Reserve space between the scrolling content and the thumb. */
  scrollGutter?: boolean
  /** 关联开关状态、焦点恢复与无障碍属性的触发按钮。 */
  trigger?: React.ReactElement<React.ButtonHTMLAttributes<HTMLButtonElement>>
  /** 配合触发按钮使用的初始显示状态。 */
  defaultVisible?: boolean
}

function useOverlayTrigger(trigger: ModalProps['trigger'], visible: boolean | undefined, defaultVisible: boolean) {
  const [localVisible, setVisible] = React.useState(defaultVisible)
  const opened = visible ?? localVisible
  return {
    opened,
    close: () => setVisible(false),
    element: trigger ? React.cloneElement(trigger, {
      'aria-haspopup': 'dialog', 'aria-expanded': opened,
      className: [trigger.props.className, opened && 'dsh-overlay-trigger-open'].filter(Boolean).join(' '),
      onClick: event => {
        trigger.props.onClick?.(event)
        if (!event.defaultPrevented) { setVisible(true) }
      },
    }) : undefined,
  }
}

/**
 * 居中弹窗。
 *
 * @param props - 见 {@link ModalProps}。
 * @returns 弹窗元素。
 */
export function Modal({ title, children, footer, scroll = true, scrollGutter, getPopupContainer, trigger, defaultVisible = false, visible, onCancel, onOk, ...rest }: ModalProps): React.ReactElement {
  injectFeedbackStyles()
  injectHeroOverlayStyles()
  const scopedContainer = useDshPopupContainer()
  const state = useOverlayTrigger(trigger, visible, defaultVisible)
  const body = scroll === true ? <Scrollbar className={scrollGutter ? 'dsh-overlay-scroll--gutter' : undefined} style={{ flex: 1, minHeight: 0 }}>{children}</Scrollbar> : children
  return (
    <>{state.element}<Arco.Modal
      autoFocus={false}
      {...rest}
      visible={trigger ? state.opened : visible}
      onCancel={() => { state.close(); onCancel?.() }}
      onOk={async event => { await onOk?.(event); if (trigger && visible === undefined) { state.close() } }}
      getPopupContainer={getPopupContainer ?? scopedContainer}
      title={title}
      footer={footer}
      alignCenter
    >
      {body}
    </Arco.Modal></>
  )
}

/** {@link Modal.confirm} 的参数。 */
export type ModalConfirmOptions = Parameters<typeof Arco.Modal.confirm>[0]

/** 命令式弹窗共享主题容器和内容滚动，调用方的容器配置优先生效。 */
export function prepareModalOptions(options: ModalConfirmOptions, container?: () => HTMLElement): ModalConfirmOptions {
  injectUiStyle('foundation/bridge.css', BRIDGE_CSS)
  injectFeedbackStyles()
  injectUiStyle('foundation/hero.css', `${HERO_CSS}\n${HERO_COMPONENT_CSS}`)
  injectHeroOverlayStyles()
  return {
    ...options,
    getPopupContainer: options.getPopupContainer ?? container ?? overlayContainer,
    content: <Scrollbar style={{ maxHeight: 'calc(100dvh - 400px)' }}>{options.content}</Scrollbar>,
  }
}

/**
 * 打开一个确认弹窗。
 *
 * @param options - 与 Arco 的 `Modal.confirm` 一致。
 * @returns 可用于手动关闭的句柄。
 */
export function confirm(options: ModalConfirmOptions): ReturnType<typeof Arco.Modal.confirm> {
  return Arco.Modal.confirm(prepareModalOptions(options))
}

/** {@link Drawer} 的 props。 */
export type DrawerProps = React.ComponentPropsWithoutRef<typeof Arco.Drawer> & Pick<ModalProps, 'trigger' | 'defaultVisible' | 'scrollGutter'>

/**
 * 侧边抽屉占满高度，上下抽屉按内容高度展开。
 *
 * @param props - 见 {@link DrawerProps}。
 * @returns 抽屉元素。
 */
export function Drawer({ getPopupContainer, children, placement = 'right', width, height, className, scrollGutter, trigger, defaultVisible = false, visible, onCancel, ...props }: DrawerProps): React.ReactElement {
  injectFeedbackStyles()
  injectHeroOverlayStyles()
  const scopedContainer = useDshPopupContainer()
  const side = placement === 'left' || placement === 'right'
  const state = useOverlayTrigger(trigger, visible, defaultVisible)
  return <>{state.element}<Arco.Drawer autoFocus={false} {...props} visible={trigger ? state.opened : visible} onCancel={event => { state.close(); onCancel?.(event) }} placement={placement} width={width ?? 'var(--dsh-drawer-width)'} height={height ?? 'auto'} className={[`dsh-drawer-${side ? 'side' : placement}`, className].filter(Boolean).join(' ')} getPopupContainer={getPopupContainer ?? scopedContainer}><Scrollbar className={scrollGutter ? 'dsh-overlay-scroll--gutter' : undefined} style={{ flex: 1, minHeight: 0 }}>{children}</Scrollbar></Arco.Drawer></>
}

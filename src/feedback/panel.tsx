/**
 * 弹窗与抽屉。
 *
 * 两者都按全局规范处理尺寸：与窗口顶部、底部各留至少 120px，最大高度
 * `calc(100dvh - 240px)`，超出部分在内部滚动，标题与操作行保持可见。样式
 * 已由 `feedback/styles` 落实，组件这一层只负责把 Arco 的 API 接到 DSH 的
 * 语义上：`title`、`footer`、`content` 三个位置固定，`scroll` 打开时内容区
 * 换成宿主统一的滚动容器。
 *
 * @module @dsh-plugin/dsh-ui-components/feedback/panel
 */
import * as React from 'react'
import { Arco, Scrollbar } from '@dsh-plugin/dsh-loader/client'
import { injectFeedbackStyles } from './styles.js'

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
}

/**
 * 居中弹窗。
 *
 * @param props - 见 {@link ModalProps}。
 * @returns 弹窗元素。
 */
export function Modal({ title, children, footer, scroll = true, ...rest }: ModalProps): React.ReactElement {
  injectFeedbackStyles()
  const body = scroll === true ? <Scrollbar style={{ maxHeight: '100%' }}>{children}</Scrollbar> : children
  return (
    <Arco.Modal {...rest} title={title} footer={footer} alignCenter>
      {body}
    </Arco.Modal>
  )
}

/** {@link Modal.confirm} 的参数。 */
export type ModalConfirmOptions = Parameters<typeof Arco.Modal.confirm>[0]

/**
 * 打开一个确认弹窗。
 *
 * @param options - 与 Arco 的 `Modal.confirm` 一致。
 * @returns 可用于手动关闭的句柄。
 */
export function confirm(options: ModalConfirmOptions): ReturnType<typeof Arco.Modal.confirm> {
  injectFeedbackStyles()
  return Arco.Modal.confirm(options)
}

/** {@link Drawer} 的 props。 */
export type DrawerProps = React.ComponentPropsWithoutRef<typeof Arco.Drawer>

/**
 * 侧边抽屉，高度同样受 240px 上下留白约束。
 *
 * @param props - 见 {@link DrawerProps}。
 * @returns 抽屉元素。
 */
export function Drawer(props: DrawerProps): React.ReactElement {
  injectFeedbackStyles()
  return <Arco.Drawer {...props} />
}

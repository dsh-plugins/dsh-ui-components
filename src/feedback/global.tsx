/**
 * 全局提示：消息条、通知与确认气泡。
 *
 * `Message` 与 `Notification` 是命令式接口，默认挂到 body 层的容器上；容器带
 * `.dsh-ui-overlay`，因此即使在 body 层也能读到同一套皮肤变量。Arco 的这两个
 * 命名空间不读 `ConfigProvider` 的 `getPopupContainer`，所以每次调用都要显式
 * 传 `getContainer`。
 *
 * @module @dsh-plugin/dsh-ui-components/feedback/global
 */
import { Arco } from '@dsh-plugin/dsh-loader/client'
import * as React from 'react'
import { ensureOverlayContainer } from '../foundation/style.js'
import { injectFeedbackStyles } from './styles.js'

/**
 * 命令式浮层使用的容器解析函数。
 *
 * @returns 带皮肤变量的 body 级容器。
 */
function overlayContainer(): HTMLElement {
  return ensureOverlayContainer() ?? document.body
}

/** 是否已经把消息与通知指向了本包的容器。 */
let containerBound = false

/**
 * 把消息条与通知挂到带皮肤变量的容器上。
 *
 * Arco 的这两个命名空间只接受 `config` 级别的 `getContainer`，不能在每次调用
 * 时覆盖，所以首次使用时统一设置一次。
 */
function bindContainer(): void {
  if (containerBound) return
  Arco.Message.config({ getContainer: overlayContainer })
  Arco.Notification.config({ getContainer: overlayContainer })
  containerBound = true
}

/** 消息条的可选项。 */
type MessageOptions = Parameters<typeof Arco.Message.info>[0]

/** 通知的可选项。 */
type NotificationOptions = Parameters<typeof Arco.Notification.info>[0]

/**
 * 顶部居中的短消息，默认 3 秒后自动消失。
 *
 * @param options - 与 Arco 的 `Message` 一致。
 * @returns 可用于手动关闭的句柄。
 */
export function message(options: MessageOptions): ReturnType<typeof Arco.Message.info> {
  injectFeedbackStyles()
  bindContainer()
  return Arco.Message.info(options)
}

/** 成功消息。 */
export function messageSuccess(content: string): ReturnType<typeof Arco.Message.info> {
  injectFeedbackStyles()
  bindContainer()
  return Arco.Message.success({ content })
}

/** 失败消息。 */
export function messageError(content: string): ReturnType<typeof Arco.Message.info> {
  injectFeedbackStyles()
  bindContainer()
  return Arco.Message.error({ content })
}

/** 警告消息。 */
export function messageWarning(content: string): ReturnType<typeof Arco.Message.info> {
  injectFeedbackStyles()
  bindContainer()
  return Arco.Message.warning({ content })
}

/**
 * 右上角的通知卡片。
 *
 * @param options - 与 Arco 的 `Notification` 一致。
 * @returns 用于手动关闭的句柄。
 */
export function notification(options: NotificationOptions): ReturnType<typeof Arco.Notification.info> {
  injectFeedbackStyles()
  bindContainer()
  return Arco.Notification.info(options)
}

/** {@link Message} 组件本身，供需要内联渲染的场景使用。 */
export const Message: typeof Arco.Message = Arco.Message

/** {@link Notification} 命名空间，命令式通知。 */
export const Notification: typeof Arco.Notification = Arco.Notification

/** {@link Popconfirm} 的 props。 */
export type PopconfirmProps = React.ComponentPropsWithoutRef<typeof Arco.Popconfirm>

/**
 * 气泡确认框，浮层由 `DshProvider` 的容器设置接管。
 *
 * @param props - 见 {@link PopconfirmProps}。
 * @returns 确认气泡元素。
 */
export function Popconfirm(props: PopconfirmProps): React.ReactElement {
  injectFeedbackStyles()
  return <Arco.Popconfirm {...props} />
}

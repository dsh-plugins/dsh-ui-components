/**
 * 全局提示：消息条、通知与确认气泡。
 *
 * `Message` 与 `Notification` 是命令式接口，挂到 body 层的容器上；容器带
 * `.dsh-ui-overlay`，因此即使在 body 层也能读到同一套皮肤变量。
 *
 * @module @dsh-plugin/dsh-ui-components/feedback/global
 */
import { Arco } from '@dsh-plugin/dsh-loader/client'
import * as React from 'react'
import { injectFeedbackStyles } from './styles.js'

/**
 * 顶部居中的短消息，默认 3 秒后自动消失。
 *
 * @param options - 与 Arco 的 `Message` 一致。
 * @returns 可用于手动关闭的句柄。
 */
export function message(options: Parameters<typeof Arco.Message.info>[0]): ReturnType<typeof Arco.Message.info> {
  injectFeedbackStyles()
  return Arco.Message.info(options)
}

/** 成功消息。 */
export function messageSuccess(message: string): ReturnType<typeof Arco.Message.info> {
  injectFeedbackStyles()
  return Arco.Message.success({ content: message })
}

/** 失败消息。 */
export function messageError(message: string): ReturnType<typeof Arco.Message.info> {
  injectFeedbackStyles()
  return Arco.Message.error({ content: message })
}

/** 警告消息。 */
export function messageWarning(message: string): ReturnType<typeof Arco.Message.info> {
  injectFeedbackStyles()
  return Arco.Message.warning({ content: message })
}

/** {@link Message} 组件本身，供需要内联渲染的场景使用。 */
export const Message: typeof Arco.Message = Arco.Message

/** {@link Notification} 命名空间，命令式通知。 */
export const Notification: typeof Arco.Notification = Arco.Notification

/** {@link Popconfirm} 的 props。 */
export type PopconfirmProps = React.ComponentPropsWithoutRef<typeof Arco.Popconfirm>

/**
 * 点击后弹出的小确认气泡。
 *
 * @param props - 见 {@link PopconfirmProps}。
 * @returns 确认气泡元素。
 */
export function Popconfirm(props: PopconfirmProps): React.ReactElement {
  injectFeedbackStyles()
  return <Arco.Popconfirm {...props} />
}

import * as React from 'react'
import { createPortal } from 'react-dom'
import { createRoot, type Root } from 'react-dom/client'
import { Arco } from '@dsh-plugin/dsh-loader/client'
import { ensureOverlayContainer, injectUiStyle } from '../foundation/style.js'
import { BRIDGE_CSS, HERO_CSS, HERO_COMPONENT_CSS } from '../foundation/bridge.js'
import { useDshPopupContainer } from '../foundation/provider.js'
import { injectFeedbackStyles } from './styles.js'

type MessageOptions = Parameters<typeof Arco.Message.info>[0]
type NotificationOptions = Parameters<typeof Arco.Notification.info>[0]
type NoticeOptions = Exclude<MessageOptions, string> | NotificationOptions
type NoticeConfig = NonNullable<Parameters<typeof Arco.Message.config>[0]>
type NoticeKind = 'info' | 'success' | 'error' | 'warning' | 'normal' | 'loading'

interface NoticeInstance {
  add(options: NoticeOptions): string
  remove(id: string): void
}

interface NoticeGroup {
  root: Root
  element: HTMLElement
  instance: NoticeInstance | null
  items: Map<string, NoticeEntry>
  closing: Set<NoticeEntry>
}

interface NoticeEntry {
  renderId: string
  options: NoticeOptions
  notifyClose: boolean
  closed: boolean
}

function injectNoticeStyles(): void {
  injectUiStyle('foundation/bridge.css', BRIDGE_CSS)
  injectFeedbackStyles()
  injectUiStyle('foundation/hero.css', `${HERO_CSS}\n${HERO_COMPONENT_CSS}`)
}

// 使用公开实例方法与独立 React 根，避免修改宿主 Arco 的静态配置和消息列表。
function createChannel(kind: 'message' | 'notification') {
  let config: NoticeConfig = {}
  let sequence = 0
  const groups = new Map<string, NoticeGroup>()

  function release(position: string, group: NoticeGroup): void {
    queueMicrotask(() => {
      if (group.items.size === 0 && group.closing.size === 0 && groups.get(position) === group) {
        groups.delete(position)
        group.root.unmount()
        group.element.remove()
      }
    })
  }

  function close(position: string, group: NoticeGroup, id: string, entry: NoticeEntry): void {
    if (group.items.get(id) !== entry) { return }
    group.items.delete(id)
    if (group.instance) {
      group.closing.add(entry)
      group.instance.remove(entry.renderId)
    } else {
      entry.options.onClose?.()
      release(position, group)
    }
  }

  function clear(): void {
    const items = [...groups.values()].flatMap(group => [...group.items.values(), ...group.closing])
    for (const [position, group] of groups) {
      groups.delete(position)
      group.items.clear()
      group.closing.clear()
      queueMicrotask(() => { group.root.unmount(); group.element.remove() })
    }
    for (const item of items) { item.options.onClose?.() }
  }

  function add(options: NoticeOptions) {
    injectNoticeStyles()
    const position = options.position ?? (kind === 'message' ? 'top' : config.rtl ? 'topLeft' : 'topRight')
    let group = groups.get(position)
    if (group === undefined) {
      const element = document.createElement('div')
      const container = config.getContainer?.() ?? ensureOverlayContainer() ?? document.body
      container.appendChild(element)
      group = { element, root: createRoot(element), instance: null, items: new Map(), closing: new Set() }
      groups.set(position, group)
      const owner = group
      const ref = (instance: NoticeInstance | null) => {
        owner.instance = instance
        if (instance !== null) {
          for (const item of owner.items.values()) { instance.add(item.options) }
        }
      }
      const props = { ref, prefixCls: config.prefixCls ?? 'arco', rtl: config.rtl ?? false }
      group.root.render(kind === 'message' ? <Arco.Message {...props} /> : <Arco.Notification {...props} />)
    }
    const owner = group
    // 每次渲染使用独立 id，旧实例的延迟退出不会删除同逻辑 id 的新消息。
    const renderId = `dsh-${kind}-${++sequence}`
    const id = options.id ?? renderId
    const previous = group.items.get(id)
    if (previous) {
      previous.notifyClose = false
      close(position, group, id, previous)
    }
    const maximum = Math.max(1, config.maxCount ?? Infinity)
    if (!group.items.has(id) && group.items.size >= maximum) {
      const oldest = group.items.keys().next().value
      if (oldest !== undefined) {
        const entry = group.items.get(oldest)
        if (entry) { close(position, group, oldest, entry) }
      }
    }
    const entry: NoticeEntry = {
      renderId,
      notifyClose: true,
      closed: false,
      options: {
        duration: config.duration ?? 3000,
        ...(config.closable === undefined ? {} : { closable: config.closable }),
        ...options,
        position,
        id: renderId,
        onClose: () => {
          if (entry.closed) { return }
          entry.closed = true
          owner.closing.delete(entry)
          if (owner.items.get(id) === entry) { owner.items.delete(id) }
          try { if (entry.notifyClose) { options.onClose?.() } } finally { release(position, owner) }
        },
      } as NoticeOptions,
    }
    group.items.set(id, entry)
    group.instance?.add(entry.options)
    return {
      element: group.element,
      close: () => close(position, owner, id, entry),
    }
  }

  return {
    add,
    configure(options: NoticeConfig = {}) {
      const next = { ...config, ...options }
      const container = options.getContainer?.()
      const recreate = (container !== undefined && [...groups.values()].some(group => group.element.parentNode !== container))
        || next.prefixCls !== config.prefixCls || next.rtl !== config.rtl
      config = next
      if (recreate) { clear() }
    },
    remove(id: string) {
      for (const [position, group] of groups) {
        const entry = group.items.get(id)
        if (entry) { close(position, group, id, entry) }
      }
    },
    clear,
  }
}

const messages = createChannel('message')
const notifications = createChannel('notification')

function addMessage(type: NoticeKind, options: MessageOptions): ReturnType<typeof Arco.Message.info> {
  return messages.add({ ...(typeof options === 'string' ? { content: options } : options), type }).close
}

function addNotification(type: NoticeKind, options: NotificationOptions): ReturnType<typeof Arco.Notification.info> {
  return notifications.add({ ...options, type }).element
}

/** 消息类保留 Arco 的静态操作和内联组件用法，实例与宿主消息相互独立。 */
export class Message extends Arco.Message {
  static override success(options: MessageOptions) { return addMessage('success', options) }
  static override info(options: MessageOptions) { return addMessage('info', options) }
  static override error(options: MessageOptions) { return addMessage('error', options) }
  static override warning(options: MessageOptions) { return addMessage('warning', options) }
  static override normal(options: MessageOptions) { return addMessage('normal', options) }
  static override loading(options: MessageOptions) { return addMessage('loading', options) }
  static override config(options?: NoticeConfig) { messages.configure(options) }
  static override clear() { messages.clear() }
  static override addInstance(options: Exclude<MessageOptions, string>) { return messages.add(options).close }
  static override useMessage(config?: Parameters<typeof Arco.Message.useMessage>[0]): ReturnType<typeof Arco.Message.useMessage> {
    const getContainer = useDshPopupContainer()
    const [api, holder] = Arco.Message.useMessage(config)
    return [api, <>{typeof document === 'undefined' ? holder : createPortal(holder, config?.getContainer?.() ?? getContainer())}</>]
  }
}

/** 通知使用独立实例；useNotification 绑定当前 Provider 的浮层容器。 */
export class Notification extends Arco.Notification {
  static override success(options: NotificationOptions) { return addNotification('success', options) }
  static override info(options: NotificationOptions) { return addNotification('info', options) }
  static override error(options: NotificationOptions) { return addNotification('error', options) }
  static override warning(options: NotificationOptions) { return addNotification('warning', options) }
  static override normal(options: NotificationOptions) { return addNotification('normal', options) }
  static override config(options?: Parameters<typeof Arco.Notification.config>[0]) { notifications.configure(options) }
  static override clear() { notifications.clear() }
  static override remove(id: string) { notifications.remove(id) }
  static override addInstance(options: NotificationOptions) { return notifications.add(options).element }
  static override useNotification(config?: Parameters<typeof Arco.Notification.useNotification>[0]): ReturnType<typeof Arco.Notification.useNotification> {
    const getContainer = useDshPopupContainer()
    return Arco.Notification.useNotification({ getContainer, ...config })
  }
}

/** 显示普通消息，返回关闭函数。 */
export function message(options: MessageOptions): ReturnType<typeof Arco.Message.info> { return Message.info(options) }
/** 显示成功消息。 */
export function messageSuccess(content: string): ReturnType<typeof Arco.Message.info> { return Message.success(content) }
/** 显示失败消息。 */
export function messageError(content: string): ReturnType<typeof Arco.Message.info> { return Message.error(content) }
/** 显示警告消息。 */
export function messageWarning(content: string): ReturnType<typeof Arco.Message.info> { return Message.warning(content) }
/** 显示通知并返回其独立挂载元素。 */
export function notification(options: NotificationOptions): ReturnType<typeof Arco.Notification.info> { return Notification.info(options) }

/** 确认气泡参数沿用 Arco。 */
export type PopconfirmProps = React.ComponentPropsWithoutRef<typeof Arco.Popconfirm>
/** 确认气泡使用 Provider 的主题容器。 */
export function Popconfirm(props: PopconfirmProps): React.ReactElement {
  injectFeedbackStyles()
  return <Arco.Popconfirm {...props} />
}

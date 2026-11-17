import * as React from 'react'
import { createPortal } from 'react-dom'
import { createRoot, type Root } from 'react-dom/client'
import { Arco } from '@dsh-plugin/dsh-loader/client'
import { ensureOverlayContainer, injectUiStyle } from '../foundation/style.js'
import { BRIDGE_CSS, HERO_CSS, HERO_COMPONENT_CSS } from '../foundation/bridge.js'
import { useDshPopupContainer } from '../foundation/provider.js'
import { injectFeedbackStyles } from './styles.js'
import { statusIcons } from './hero-result.js'
import { observeToastLayout } from './toast-layout.js'
import { HeroSpin } from '../display/hero-spin.js'

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
  stopLayout: () => void
}

interface NoticeEntry {
  renderId: string
  options: NoticeOptions
  notifyClose: boolean
  closed: boolean
}

interface NoticeHookGroup {
  instance: InstanceType<typeof Arco.Message> | InstanceType<typeof Arco.Notification> | null
  pending: Map<string, NoticeOptions>
  items: Map<string, NoticeEntry>
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
        group.stopLayout()
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
      group.stopLayout()
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
      group = { element, root: createRoot(element), instance: null, items: new Map(), closing: new Set(), stopLayout: observeToastLayout(element) }
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
        closable: config.closable ?? true,
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

function useNoticeLayout(getContainer: () => HTMLElement): void {
  React.useEffect(() => observeToastLayout(getContainer()), [getContainer])
}

function useNoticeHolder(kind: 'message' | 'notification', config: NoticeConfig = {}) {
  const getContainer = useDshPopupContainer()
  const context = React.useContext(Arco.ConfigProvider.ConfigContext)
  const [, refresh] = React.useReducer(value => value + 1, 0)
  const groups = React.useRef(new Map<string, NoticeHookGroup>())
  const sequence = React.useRef(0)
  const disposed = React.useRef(false)
  const settings = React.useRef(config)
  settings.current = config
  React.useEffect(() => {
    disposed.current = false
    return () => {
      disposed.current = true
      for (const group of groups.current.values()) { group.pending.clear(); group.items.clear() }
      groups.current.clear()
    }
  }, [])
  useNoticeLayout(config.getContainer ?? getContainer)
  const closeEntry = React.useCallback((group: NoticeHookGroup, id: string, entry: NoticeEntry) => {
    if (group.items.get(id) !== entry) { return }
    group.items.delete(id)
    if (group.pending.delete(entry.renderId)) { entry.options.onClose?.() }
    else { group.instance?.remove(entry.renderId) }
  }, [])
  const remove = React.useCallback((id: string) => {
    for (const group of groups.current.values()) {
      const entry = group.items.get(id)
      if (entry) { closeEntry(group, id, entry) }
    }
  }, [closeEntry])
  const add = React.useCallback((type: NoticeKind, options: NoticeOptions) => {
    if (disposed.current) { throw new Error('消息 holder 已卸载，无法显示消息') }
    const current = settings.current
    const position = options.position ?? (kind === 'message' ? 'top' : (current.rtl ?? context.rtl) ? 'topLeft' : 'topRight')
    let group = groups.current.get(position)
    if (!group) { group = { instance: null, pending: new Map(), items: new Map() }; groups.current.set(position, group) }
    const owner = group
    const renderId = `dsh-hook-${++sequence.current}`
    const id = options.id ?? renderId
    const previous = group.items.get(id)
    if (previous) { previous.notifyClose = false; closeEntry(group, id, previous) }
    const maximum = Math.max(1, current.maxCount ?? Infinity)
    const oldestId = group.items.keys().next().value
    if (group.items.size >= maximum && oldestId !== undefined) {
      const oldest = group.items.get(oldestId)
      if (oldest) { closeEntry(group, oldestId, oldest) }
    }
    const entry: NoticeEntry = {
      renderId, notifyClose: true, closed: false,
      options: noticeIcon({ duration: current.duration ?? 3000, closable: current.closable ?? true, ...options, id: renderId, position, type,
        onClose: () => {
          if (entry.closed) { return }
          entry.closed = true
          if (owner.items.get(id) === entry) { owner.items.delete(id) }
          if (entry.notifyClose) { options.onClose?.() }
        },
      } as NoticeOptions, type),
    }
    group.items.set(id, entry)
    if (group.instance) { group.instance.add(entry.options) }
    else { group.pending.set(renderId, entry.options); refresh() }
    return { close: () => closeEntry(owner, id, entry), instance: group.instance }
  }, [context.rtl, kind, closeEntry])
  const holder = <>{Array.from(groups.current, ([position, group]) => {
    const ref = (instance: InstanceType<typeof Arco.Message> | InstanceType<typeof Arco.Notification> | null) => {
      group.instance = instance
      if (instance) { for (const options of group.pending.values()) { instance.add(options) }; group.pending.clear() }
    }
    const props = { ref, prefixCls: config.prefixCls ?? context.prefixCls, rtl: config.rtl ?? context.rtl }
    return kind === 'message' ? <Arco.Message key={position} {...props} /> : <Arco.Notification key={position} {...props} />
  })}</>
  return { add, remove, holder: typeof document === 'undefined' ? holder : createPortal(holder, config.getContainer?.() ?? getContainer()) }
}

function noticeIcon<T extends NoticeOptions>(options: T, type: NoticeKind): T {
  const path = type in statusIcons ? statusIcons[type as keyof typeof statusIcons] : undefined
  return {
    ...options,
    ...(type === 'loading' && options.icon === undefined ? { icon: <HeroSpin size={16} /> } : {}),
    ...(path && options.icon === undefined ? { icon: <svg className="dsh-notice-icon" viewBox="0 0 16 16" fill="none" aria-hidden><path d={path} fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg> } : {}),
    ...(options.closeIcon === undefined ? { closeIcon: <svg className="dsh-notice-close-icon" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M3.47 3.47a.75.75 0 0 1 1.06 0L8 6.94l3.47-3.47a.75.75 0 1 1 1.06 1.06L9.06 8l3.47 3.47a.75.75 0 1 1-1.06 1.06L8 9.06l-3.47 3.47a.75.75 0 0 1-1.06-1.06L6.94 8 3.47 4.53a.75.75 0 0 1 0-1.06Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg> } : {}),
  }
}

function addMessage(type: NoticeKind, options: MessageOptions): ReturnType<typeof Arco.Message.info> {
  return messages.add(noticeIcon({ ...(typeof options === 'string' ? { content: options } : options), type }, type)).close
}

function addNotification(type: NoticeKind, options: NotificationOptions): ReturnType<typeof Arco.Notification.info> {
  return notifications.add(noticeIcon({ ...options, type }, type)).element
}

/** 消息类保留 Arco 的静态操作和内联组件用法，实例与宿主消息相互独立。 */
export class Message extends Arco.Message {
  static override success(options: MessageOptions): ReturnType<typeof Arco.Message.success> { return addMessage('success', options) }
  static override info(options: MessageOptions): ReturnType<typeof Arco.Message.info> { return addMessage('info', options) }
  static override error(options: MessageOptions): ReturnType<typeof Arco.Message.error> { return addMessage('error', options) }
  static override warning(options: MessageOptions): ReturnType<typeof Arco.Message.warning> { return addMessage('warning', options) }
  static override normal(options: MessageOptions): ReturnType<typeof Arco.Message.normal> { return addMessage('normal', options) }
  static override loading(options: MessageOptions): ReturnType<typeof Arco.Message.loading> { return addMessage('loading', options) }
  static override config(options?: NoticeConfig) { messages.configure(options) }
  static override clear() { messages.clear() }
  static override addInstance(options: Exclude<MessageOptions, string>) { return messages.add(noticeIcon(options, options.type as NoticeKind ?? 'info')).close }
  static override useMessage(config?: Parameters<typeof Arco.Message.useMessage>[0]): ReturnType<typeof Arco.Message.useMessage> {
    const { add, holder } = useNoticeHolder('message', config)
    const styledApi: ReturnType<typeof Arco.Message.useMessage>[0] = {}
    for (const type of ['info', 'success', 'error', 'warning', 'normal'] as const) {
      styledApi[type] = options => add(type, typeof options === 'string' ? { content: options } : options).close
    }
    return [styledApi, holder]
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
  static override addInstance(options: NotificationOptions) { return notifications.add(noticeIcon(options, options.type as NoticeKind ?? 'info')).element }
  static override useNotification(config?: Parameters<typeof Arco.Notification.useNotification>[0]): ReturnType<typeof Arco.Notification.useNotification> {
    const { add, remove, holder } = useNoticeHolder('notification', config)
    const styledApi: ReturnType<typeof Arco.Notification.useNotification>[0] = { remove }
    for (const type of ['info', 'success', 'error', 'warning', 'normal'] as const) {
      // 与 Arco 一致，首次创建的实例在 holder 提交后可用。
      styledApi[type] = options => add(type, options).instance!
    }
    return [styledApi, holder]
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

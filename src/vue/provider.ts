import {
  Teleport, computed, defineComponent, h, inject, nextTick, onBeforeUnmount, onMounted,
  onUpdated, provide, shallowReactive, ref, shallowRef, watch, type InjectionKey, type PropType,
  type ShallowRef, type VNodeChild, type CSSProperties,
} from 'vue'
import { Alert, ConfigProvider, Spin } from '@arco-design/web-vue'

/** 主题范围同时覆盖组件树及其独立浮层。 */
export type DshTheme = 'auto' | 'light' | 'dark'
/** 控件圆角尺度。 */
export type DshRadius = 'none' | 'sm' | 'md' | 'lg' | 'full'
/** 作用域内提示的内容和生命周期。 */
export interface ToastOptions {
  content: VNodeChild | (() => VNodeChild)
  title?: VNodeChild | (() => VNodeChild)
  type?: 'info' | 'success' | 'warning' | 'error' | 'loading' | 'normal'
  id?: string
  kind?: 'message' | 'notification'
  position?: 'top' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
  icon?: () => VNodeChild
  footer?: () => VNodeChild
  closeIcon?: () => VNodeChild
  closeIconElement?: () => VNodeChild
  showIcon?: boolean
  resetOnHover?: boolean
  class?: string | Record<string, boolean> | (string | Record<string, boolean>)[]
  style?: CSSProperties
  duration?: number
  closable?: boolean
  onClose?: (id: string | number) => void
}
/** 提示句柄允许操作完成后主动关闭。 */
export interface ToastHandle { close: () => void }
/** 在当前 Provider 内显示消息，避免修改 Arco 全局配置。 */
export interface ToastApi {
  show: (options: string | ToastOptions) => ToastHandle
  info: (options: string | ToastOptions) => ToastHandle
  success: (options: string | ToastOptions) => ToastHandle
  warning: (options: string | ToastOptions) => ToastHandle
  error: (options: string | ToastOptions) => ToastHandle
  clear: (position?: ToastOptions['position'], kind?: ToastOptions['kind']) => void
  remove: (id: string, kind?: ToastOptions['kind']) => void
}
/** 普通浮层包装通过此上下文取得独立容器。 */
export interface DshThemeContext {
  container: ShallowRef<HTMLElement | undefined>
  toast: ToastApi
  mountOverlay: (content: () => VNodeChild) => () => void
}
interface ToastEntry extends ToastOptions { internalId: number }
interface OverlayEntry { id: number; content: () => VNodeChild }
const themeKey: InjectionKey<DshThemeContext> = Symbol('dsh-theme')

/** 需要在 DshProvider 后代的 setup 中调用。 */
export function useDshTheme(): DshThemeContext {
  const context = inject(themeKey)
  if (!context) {
    throw new Error('DSH 浮层组件必须在 DshProvider 内使用')
  }
  return context
}

/** 对话框为其后代浮层建立独立容器，同时继承外层消息与主题上下文。 */
export function provideDshPopupScope(container: ShallowRef<HTMLElement | undefined>): void {
  provide(themeKey, { ...useDshTheme(), container })
}

/** 提供局部主题、语言、方向和可回收的浮层及消息容器。 */
export const DshProvider = defineComponent({
  name: 'DshProvider',
  inheritAttrs: false,
  props: {
    theme: { type: String as PropType<DshTheme>, default: 'auto' },
    radius: { type: String as PropType<DshRadius>, default: 'md' },
    reducedMotion: { type: Boolean, default: undefined },
    locale: ConfigProvider.props.locale,
    rtl: Boolean,
  },
  setup(props, { attrs, slots }) {
    const root = shallowRef<HTMLElement>()
    const container = shallowRef<HTMLElement>()
    const autoTheme = ref<'light' | 'dark'>('light')
    const hostTheme = ref(false)
    const systemMotion = ref(false)
    const resolvedTheme = computed(() => props.theme === 'auto' ? autoTheme.value : props.theme)
    const motion = computed(() => (props.reducedMotion ?? systemMotion.value) ? 'reduced' : 'full')
    const entries = shallowReactive<ToastEntry[]>([])
    const overlays = shallowReactive<OverlayEntry[]>([])
    const timers = new Map<number, ReturnType<typeof setTimeout>>()
    let counter = 0
    let disposed = false
    let disconnect: (() => void) | undefined

    const close = (id: number) => {
      clearTimeout(timers.get(id))
      timers.delete(id)
      const index = entries.findIndex(entry => entry.internalId === id)
      if (index >= 0) {
        const entry = entries.splice(index, 1)[0]
        entry?.onClose?.(entry.id ?? id)
      }
    }
    const arm = (entry: ToastEntry) => {
      clearTimeout(timers.get(entry.internalId))
      if (!container.value) {
        return
      }
      const duration = entry.duration ?? 4000
      if (duration > 0) {
        timers.set(entry.internalId, setTimeout(() => close(entry.internalId), duration))
      }
    }
    const show = (options: string | ToastOptions): ToastHandle => {
      if (disposed) {
        throw new Error('DshProvider 已卸载，无法显示消息')
      }
      const config = typeof options === 'string' ? { content: options } : options
      const existing = config.id === undefined ? undefined : entries.find(entry => entry.id === config.id && entry.kind === config.kind)
      if (existing) {
        const updated = { ...existing, ...config }
        entries[entries.indexOf(existing)] = updated
        arm(updated)
        return { close: () => close(existing.internalId) }
      }
      const entry = { ...config, internalId: ++counter }
      entries.push(entry)
      arm(entry)
      return { close: () => close(entry.internalId) }
    }
    const withType = (type: NonNullable<ToastOptions['type']>) => (options: string | ToastOptions) =>
      show({ ...(typeof options === 'string' ? { content: options } : options), type })
    const toast: ToastApi = {
      show, info: withType('info'), success: withType('success'), warning: withType('warning'),
      error: withType('error'),
      clear: (position, kind) => [...entries].filter(entry =>
        (position === undefined || (entry.position ?? 'top') === position) && (kind === undefined || entry.kind === kind),
      ).forEach(entry => close(entry.internalId)),
      remove: (id, kind) => [...entries].filter(entry => entry.id === id && (kind === undefined || entry.kind === kind))
        .forEach(entry => close(entry.internalId)),
    }
    const mountOverlay = (content: () => VNodeChild) => {
      if (disposed) {
        throw new Error('DshProvider 已卸载，无法打开浮层')
      }
      const entry = { id: ++counter, content }
      overlays.push(entry)
      return () => {
        const index = overlays.indexOf(entry)
        if (index >= 0) {
          overlays.splice(index, 1)
        }
      }
    }
    provide(themeKey, { container, toast, mountOverlay })

    const syncPortal = () => {
      const portal = container.value
      if (!portal || !root.value) {
        return
      }
      portal.className = 'dsh-ui dsh-ui-portal'
      portal.dataset.theme = resolvedTheme.value
      portal.dataset.radius = props.radius
      portal.dataset.motion = motion.value
      portal.dataset.hostTheme = String(props.theme === 'auto' && hostTheme.value)
      portal.dir = props.rtl ? 'rtl' : 'ltr'
      // 自定义属性在声明元素处求值，独立 portal 必须复制根节点的最终值。
      portal.removeAttribute('style')
      const styles = getComputedStyle(root.value)
      for (let index = 0; index < styles.length; index++) {
        const name = styles.item(index)
        if (name.startsWith('--')) {
          portal.style.setProperty(name, styles.getPropertyValue(name))
        }
      }
    }
    onMounted(() => {
      const portal = document.createElement('div')
      portal.className = 'dsh-ui dsh-ui-portal'
      document.body.appendChild(portal)
      container.value = portal
      entries.forEach(arm)
      const color = window.matchMedia('(prefers-color-scheme: dark)')
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
      const update = () => {
        const dark = document.body.getAttribute('data-ds-dark-theme')
        const arco = document.body.getAttribute('arco-theme')
        hostTheme.value = dark !== null
        autoTheme.value = dark !== null
          ? (dark === 'false' || dark === '0' ? 'light' : 'dark')
          : (arco !== null ? (arco === 'dark' ? 'dark' : 'light') : (color.matches ? 'dark' : 'light'))
        systemMotion.value = reduced.matches
        void nextTick(syncPortal)
      }
      const observer = new MutationObserver(update)
      observer.observe(document.body, { attributes: true, attributeFilter: ['data-ds-dark-theme', 'arco-theme', 'style', 'class'] })
      color.addEventListener('change', update)
      reduced.addEventListener('change', update)
      disconnect = () => {
        observer.disconnect()
        color.removeEventListener('change', update)
        reduced.removeEventListener('change', update)
      }
      update()
    })
    watch([resolvedTheme, motion, () => props.radius, () => props.rtl], syncPortal, { flush: 'post' })
    onUpdated(syncPortal)
    onBeforeUnmount(() => {
      disposed = true
      disconnect?.()
      for (const timer of timers.values()) {
        clearTimeout(timer)
      }
      timers.clear()
      container.value?.remove()
      container.value = undefined
    })
    return () => h(ConfigProvider, { locale: props.locale, rtl: props.rtl, global: false }, {
      default: () => [
        h('div', {
          ...attrs, ref: root, class: ['dsh-ui', attrs.class],
          'data-theme': resolvedTheme.value, 'data-radius': props.radius, 'data-motion': motion.value,
          'data-host-theme': String(props.theme === 'auto' && hostTheme.value), dir: props.rtl ? 'rtl' : 'ltr',
        }, slots.default?.()),
        ...overlays.map(entry => h('div', { key: entry.id, style: { display: 'contents' } }, [entry.content()])),
        container.value ? h(Teleport, { to: container.value },
          (['top', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'] as const).map(position => h('div', {
            class: 'dsh-toast-region', 'data-position': position, 'aria-label': '通知',
            style: {
              top: position.startsWith('top') ? '24px' : 'auto',
              bottom: position.startsWith('bottom') ? '24px' : 'auto',
              left: position.endsWith('Left') ? '24px' : position.endsWith('Right') ? 'auto' : '50%',
              right: position.endsWith('Right') ? '24px' : 'auto',
              transform: position.endsWith('Left') || position.endsWith('Right') ? 'none' : 'translateX(-50%)',
            },
          }, entries.filter(entry => (entry.position ?? 'top') === position).map(entry =>
            h('div', {
              key: entry.internalId, class: ['dsh-toast', entry.class], style: entry.style,
              role: entry.type === 'error' ? 'alert' : 'status',
              onMouseenter: () => {
                if (entry.resetOnHover !== false) {
                  clearTimeout(timers.get(entry.internalId))
                }
              },
              onMouseleave: () => {
                if (entry.resetOnHover !== false) {
                  arm(entry)
                }
              },
              onFocusin: () => clearTimeout(timers.get(entry.internalId)), onFocusout: () => arm(entry),
            }, [h(Alert, {
              type: entry.type === 'loading' || entry.type === 'normal' ? 'info' : entry.type ?? 'info',
              closable: false, showIcon: entry.showIcon ?? entry.type !== 'normal', role: 'presentation',
            }, {
              title: entry.title ? () => typeof entry.title === 'function' ? entry.title() : entry.title : undefined,
              icon: entry.icon ?? (entry.type === 'loading' ? () => h(Spin, { size: 16 }) : undefined),
              action: entry.closable !== false ? () => h('button', {
                type: 'button', class: 'dsh-button dsh-toast-close', 'data-variant': 'ghost', 'data-size': 'sm',
                'aria-label': '关闭通知', onClick: () => close(entry.internalId),
              }, (entry.closeIconElement ?? entry.closeIcon)?.() ?? '×') : undefined,
              default: () => [typeof entry.content === 'function' ? entry.content() : entry.content, entry.footer?.()],
            })]),
          ))),
        ) : null,
      ],
    })
  },
})

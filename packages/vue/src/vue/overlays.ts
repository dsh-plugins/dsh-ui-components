import {
  cloneVNode, computed, defineComponent, h, isVNode, nextTick, onBeforeUnmount, ref, shallowRef, shallowReactive, useId, watch,
  type DefineComponent, type PropType,
} from 'vue'
import {
  Drawer as ArcoDrawer, Modal as ArcoModal, Scrollbar,
  type MessageConfig, type MessageMethod, type NotificationConfig, type NotificationMethod,
  type ModalConfig, type ModalMethod, type DrawerMethod,
} from '@arco-design/web-vue'
import { provideDshPopupScope, useDshTheme, type ToastApi } from './provider.js'

/** 保留 Arco 的事件与异步确认接口，并提供初始显示状态。 */
export type ModalProps = InstanceType<typeof ArcoModal>['$props'] & { label?: string }
/** 抽屉沿用 Arco 的位置和尺寸接口。 */
export type DrawerProps = InstanceType<typeof ArcoDrawer>['$props'] & { label?: string }

const focusableSelector = 'button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'
const openDialogs: HTMLElement[] = []

function createOverlay(name: string, drawer: boolean, alert: boolean) {
  return defineComponent({
    name,
    inheritAttrs: false,
    props: {
      visible: { type: Boolean, default: undefined },
      defaultVisible: Boolean,
      title: String,
      label: String,
      escToClose: { type: Boolean, default: true },
      maskClosable: { type: Boolean, default: undefined },
      popupContainer: { type: [String, Object] as PropType<string | HTMLElement> },
    },
    emits: ['update:visible', 'ok', 'cancel', 'open', 'close', 'beforeOpen', 'beforeClose'],
    setup(props, { attrs, slots, emit, expose }) {
      const theme = useDshTheme()
      const popupScope = shallowRef<HTMLElement>()
      provideDshPopupScope(popupScope)
      const localVisible = ref(props.defaultVisible)
      const visible = computed(() => props.visible ?? localVisible.value)
      const id = `dsh-dialog-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
      const titleId = `${id}-title`
      let dialog: HTMLElement | undefined
      let previousFocus: HTMLElement | undefined
      let releaseFocus: (() => void) | undefined
      watch(theme.container, host => {
        popupScope.value?.remove()
        if (host) {
          const popupHost = document.createElement('div')
          popupHost.dataset.dshDialogOwner = id
          host.appendChild(popupHost)
          popupScope.value = popupHost
        } else {
          popupScope.value = undefined
        }
      }, { immediate: true, flush: 'post' })
      const update = (value: boolean) => {
        localVisible.value = value
        emit('update:visible', value)
      }
      const close = () => update(false)
      const open = () => update(true)
      expose({ open, close })
      const detach = (restore: boolean) => {
        releaseFocus?.()
        releaseFocus = undefined
        if (dialog) {
          const index = openDialogs.indexOf(dialog)
          if (index >= 0) {
            openDialogs.splice(index, 1)
          }
        }
        dialog = undefined
        if (restore && previousFocus?.isConnected) {
          previousFocus.focus()
        }
        if (restore) {
          previousFocus = undefined
        }
      }
      const attach = () => {
        const host = typeof props.popupContainer === 'string'
          ? document.querySelector(props.popupContainer)
          : props.popupContainer ?? theme.container.value
        dialog = host?.querySelector<HTMLElement>(drawer ? `.${id} .arco-drawer` : `.${id}`) ?? undefined
        if (!dialog || openDialogs.includes(dialog)) {
          return
        }
        const element = dialog
        element.id = id
        openDialogs.push(element)
        element.setAttribute('role', alert ? 'alertdialog' : 'dialog')
        element.setAttribute('aria-modal', 'true')
        element.tabIndex = -1
        if (props.label) {
          element.setAttribute('aria-label', props.label)
        } else if (props.title || slots.header || slots.title) {
          element.setAttribute('aria-labelledby', titleId)
        }
        const closeButton = element.querySelector<HTMLElement>('.arco-modal-close-btn, .arco-drawer-close-btn')
        if (closeButton) {
          closeButton.tabIndex = 0
          closeButton.setAttribute('aria-label', '关闭')
        }
        const candidates = () => Array.from(element.querySelectorAll<HTMLElement>(focusableSelector))
          .filter(node => node.getClientRects().length > 0 && node.getAttribute('aria-hidden') !== 'true' && !node.closest('[inert]'))
        const keydown = (event: KeyboardEvent) => {
          if (openDialogs[openDialogs.length - 1] !== element) {
            return
          }
          if (closeButton && event.target === closeButton && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault()
            closeButton.click()
          }
          if (event.key !== 'Tab') {
            return
          }
          const nodes = candidates()
          const first = nodes[0]
          const last = nodes[nodes.length - 1]
          if (!first || !last) {
            event.preventDefault()
            element.focus()
          } else if (event.shiftKey && (document.activeElement === first || document.activeElement === element)) {
            event.preventDefault()
            last.focus()
          } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === element)) {
            event.preventDefault()
            first.focus()
          }
        }
        const focusin = (event: FocusEvent) => {
          const popup = event.target instanceof Element ? event.target.closest('.arco-trigger-popup') : null
          if (popup && popupScope.value?.contains(popup)) {
            return
          }
          if (openDialogs[openDialogs.length - 1] === element && event.target instanceof Node && !element.contains(event.target)) {
            (candidates()[0] ?? element).focus()
          }
        }
        element.addEventListener('keydown', keydown)
        document.addEventListener('focusin', focusin)
        releaseFocus = () => {
          element.removeEventListener('keydown', keydown)
          document.removeEventListener('focusin', focusin)
        }
        const initialFocus = element.querySelector<HTMLElement>('[autofocus]') ?? element
        initialFocus.focus()
      }
      watch(visible, async value => {
        if (value && typeof document !== 'undefined') {
          previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : undefined
          await nextTick()
          attach()
        } else if (!value) {
          detach(true)
        }
      }, { immediate: true, flush: 'post' })
      onBeforeUnmount(() => {
        detach(true)
        popupScope.value?.remove()
      })
      return () => {
        const state = { open, close, visible: visible.value }
        const shared = {
          ...attrs, visible: visible.value, title: props.title,
          popupContainer: props.popupContainer ?? theme.container.value,
          escToClose: props.escToClose,
          maskClosable: props.maskClosable ?? !alert,
          'onUpdate:visible': update,
          onOk: (event: Event) => emit('ok', event), onCancel: (event: Event) => emit('cancel', event),
          onOpen: () => {
            attach()
            emit('open')
          },
          onClose: () => {
            detach(true)
            emit('close')
          },
          onBeforeOpen: () => emit('beforeOpen'), onBeforeClose: () => emit('beforeClose'),
        }
        const contentSlots = {
          ...slots,
          trigger: undefined,
          title: props.title || slots.header || slots.title
            ? () => h('span', { id: titleId }, slots.header?.(state) ?? slots.title?.(state) ?? props.title)
            : undefined,
          header: drawer && slots.header ? () => h('div', { id: titleId }, slots.header?.(state)) : undefined,
          default: () => h(Scrollbar, { outerClass: 'dsh-overlay-scroll', style: { maxHeight: 'inherit', overflow: 'auto' } }, {
            default: () => slots.default?.(state),
          }),
          footer: slots.footer ? () => slots.footer?.(state) : undefined,
        }
        const triggers = slots.trigger?.(state)?.map(node => isVNode(node) ? cloneVNode(node, {
          'aria-haspopup': 'dialog', 'aria-expanded': visible.value, 'aria-controls': id,
          class: { 'dsh-overlay-trigger-open': visible.value },
          onClick: (event: MouseEvent) => { if (!event.defaultPrevented) { open() } },
        }) : node)
        return [triggers, theme.container.value ? (
          drawer
            ? h(ArcoDrawer, {
              ...shared,
              width: typeof attrs.width === 'string' || typeof attrs.width === 'number' ? attrs.width : 'var(--dsh-drawer-width)',
              height: typeof attrs.height === 'string' || typeof attrs.height === 'number' ? attrs.height : 'auto',
              class: ['dsh-drawer', `dsh-drawer-${attrs.placement === 'top' || attrs.placement === 'bottom' ? attrs.placement : 'side'}`, id, attrs.class],
            }, contentSlots)
            : h(ArcoModal, { ...shared, alignCenter: true, modalClass: ['dsh-modal', id, attrs.modalClass] }, contentSlots)
        ) : null]
      }
    },
  })
}

/** 带焦点限制、焦点恢复和独立滚动区的模态对话框。 */
export const Modal = createOverlay('DshModal', false, false) as DefineComponent<ModalProps>
/** 侧边抽屉占满窗口高度，上下抽屉按内容高度展开。 */
export const Drawer = createOverlay('DshDrawer', true, false) as DefineComponent<DrawerProps>
/** 默认禁止点击遮罩关闭的确认对话框。 */
export const AlertDialog = createOverlay('DshAlertDialog', false, true) as DefineComponent<ModalProps>
/** 获取当前主题范围内的消息接口，计时器随 Provider 卸载释放。 */
export function useToast(): ToastApi {
  return useDshTheme().toast
}

/** 提供作用域内的 Arco 消息和通知接口，支持独立位置与标识更新。 */
export interface FeedbackApi {
  message: MessageMethod
  notification: NotificationMethod
}

/** 命令式提示通过当前 Provider 渲染，避免共享全局容器和主题。 */
export function useFeedback(): FeedbackApi {
  const toast = useToast()
  const message = (type: 'info' | 'success' | 'warning' | 'error' | 'loading' | 'normal') =>
    (config: string | MessageConfig) => toast.show({
      ...(typeof config === 'string' ? { content: config } : config), kind: 'message', type,
    })
  const notification = (type: 'info' | 'success' | 'warning' | 'error') =>
    (config: string | NotificationConfig) => toast.show({
      position: 'topRight', ...(typeof config === 'string' ? { content: config } : config), kind: 'notification', type,
    })
  return {
    message: {
      info: message('info'), success: message('success'), warning: message('warning'), error: message('error'),
      loading: message('loading'), normal: message('normal'), clear: position => toast.clear(position, 'message'),
    },
    notification: {
      info: notification('info'), success: notification('success'), warning: notification('warning'), error: notification('error'),
      remove: id => toast.remove(id, 'notification'), clear: position => toast.clear(position, 'notification'),
    },
  }
}

/** 作用域内的命令式对话框接口，句柄支持关闭与更新。 */
export interface DialogApi {
  modal: ModalMethod
  drawer: DrawerMethod
}
const dialogApis = new WeakMap<ReturnType<typeof useDshTheme>['mountOverlay'], DialogApi>()

/** 动态内容作为 Provider 后代渲染，继承语言、主题和 Vue 注入值。 */
export function useDialog(): DialogApi {
  const theme = useDshTheme()
  const existing = dialogApis.get(theme.mountOverlay)
  if (existing) {
    return existing
  }
  const defaults: { simple?: boolean } = {}
  const modalClosers = new Set<() => void>()
  const modal = (config: ModalConfig & { messageType?: 'info' | 'success' | 'warning' | 'error' }): ReturnType<ModalMethod['open']> => {
    const state = shallowReactive({ ...defaults, ...config, visible: true })
    let closed = false
    const close = () => {
      if (!closed) {
        closed = true
        modalClosers.delete(close)
        remove()
        state.onClose?.()
      }
    }
    const remove = theme.mountOverlay(() => {
      const { title, content, footer, ...props } = state
      return h(Modal, {
        ...props,
        footer: typeof footer === 'boolean' ? footer : true,
        'onUpdate:visible': value => { state.visible = value },
        onClose: close,
      }, {
        title: title === undefined ? undefined : () => typeof title === 'function' ? title() : title,
        default: () => typeof content === 'function' ? content() : content,
        footer: footer !== undefined && typeof footer !== 'boolean' ? () => typeof footer === 'function' ? footer() : footer : undefined,
      })
    })
    modalClosers.add(close)
    return { close, update: options => Object.assign(state, options) }
  }
  const drawer: DrawerMethod['open'] = config => {
    const state = shallowReactive({ ...config, visible: true })
    let closed = false
    const close = () => {
      if (!closed) {
        closed = true
        remove()
        state.onClose?.()
      }
    }
    const remove = theme.mountOverlay(() => {
      const { title, content, footer, header, ...props } = state
      return h(Drawer, {
        ...props,
        header: typeof header === 'boolean' ? header : true,
        footer: typeof footer === 'boolean' ? footer : true,
        'onUpdate:visible': value => { state.visible = value },
        onClose: close,
      }, {
        title: title === undefined ? undefined : () => typeof title === 'function' ? title() : title,
        default: () => typeof content === 'function' ? content() : content,
        header: header !== undefined && typeof header !== 'boolean' ? () => typeof header === 'function' ? header() : header : undefined,
        footer: footer !== undefined && typeof footer !== 'boolean' ? () => typeof footer === 'function' ? footer() : footer : undefined,
      })
    })
    return { close, update: options => Object.assign(state, options) }
  }
  const api: DialogApi = {
    modal: {
      open: modal,
      confirm: config => modal({ maskClosable: false, ...config }),
      info: config => modal({ hideCancel: true, ...config, messageType: 'info' }),
      success: config => modal({ hideCancel: true, ...config, messageType: 'success' }),
      warning: config => modal({ hideCancel: true, ...config, messageType: 'warning' }),
      error: config => modal({ hideCancel: true, ...config, messageType: 'error' }),
      config: options => { Object.assign(defaults, options) },
      destroyAll: () => [...modalClosers].forEach(close => close()),
    },
    drawer: { open: drawer },
  }
  dialogApis.set(theme.mountOverlay, api)
  return api
}

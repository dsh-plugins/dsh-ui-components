import { Fragment, Teleport, cloneVNode, createTextVNode, defineComponent, h, isVNode, nextTick, ref, shallowRef, type App, type Component, type ComponentPublicInstance, type CSSProperties, type VNode } from 'vue'
import * as Arco from '@arco-design/web-vue'
import { useDshTheme } from './provider.js'

const scopedComponents = new Map<Component, Component>()

// 包装层只代理 Vue 公开实例，保留原组件的事件、插槽与 focus 等实例方法。
function scopedPopup<C extends Component>(component: C, name: string, nested?: 'triggerProps' | 'previewProps'): C {
  const wrapped = defineComponent({
    name: `Dsh${name}`,
    inheritAttrs: false,
    setup(_, { attrs, slots, expose }) {
      const { container, locale } = useDshTheme()
      const selection = shallowRef<unknown>(attrs.defaultValue ?? attrs['default-value'])
      const query = ref('')
      const instance = shallowRef<ComponentPublicInstance>()
      const anchor = shallowRef<Element>()
      const open = ref(Boolean(attrs.defaultPopupVisible ?? attrs['default-popup-visible']))
      const arrowTarget = shallowRef<HTMLElement>()
      expose(new Proxy({}, {
        get: (_, key) => (instance.value as unknown as Record<string | symbol, unknown> | undefined)?.[key],
        has: (_, key) => instance.value !== undefined && key in instance.value,
      }))
      return () => {
        // Trigger 在首次打开时缓存挂载点，等待 Provider 建好容器再创建实例。
        if (!container.value) { return null }
        const forwarded = { ...attrs }
        if (name === 'Popconfirm') {
          for (const [key, kebab] of [['cancelButtonProps', 'cancel-button-props'], ['okButtonProps', 'ok-button-props']] as const) {
            forwarded[key] = { size: 'small', ...(attrs[key] ?? attrs[kebab] ?? {}) as Record<string, unknown> }
            delete forwarded[kebab]
          }
        }
        if (['Select', 'AutoComplete', 'Cascader', 'TreeSelect', 'DatePicker', 'RangePicker', 'TimePicker', 'ColorPicker'].includes(name)) {
          forwarded.triggerProps = { popupOffset: 8, ...(attrs.triggerProps ?? attrs['trigger-props'] ?? {}) as Record<string, unknown> }
          delete forwarded['trigger-props']
        }
        if (['Tooltip', 'Popover', 'Dropdown', 'Popconfirm'].includes(name)) {
          const arrow = attrs.showArrow ?? attrs['show-arrow']
          const showArrow = arrow !== undefined && arrow !== false
          forwarded.popupOffset = attrs.popupOffset ?? attrs['popup-offset'] ?? (name === 'Tooltip' ? (showArrow ? 7 : 3) : 8)
          if (name === 'Tooltip' || name === 'Popover' || name === 'Popconfirm') { forwarded.showArrow = showArrow; delete forwarded['show-arrow'] }
        }
        if (name === 'Dsubmenu') { forwarded.popupOffset = attrs.popupOffset ?? attrs['popup-offset'] ?? 7 }
        const nestedKebab = nested === 'triggerProps' ? 'trigger-props' : 'preview-props'
        const configured = nested ? forwarded[nested] ?? attrs[nestedKebab] : undefined
        const nestedProps = typeof configured === 'object' && configured !== null ? { ...configured } as Record<string, unknown> : {}
        const explicitContainer = nested
          ? nestedProps.popupContainer ?? nestedProps['popup-container']
          : attrs.popupContainer ?? attrs['popup-container']
        delete nestedProps['popup-container']
        delete forwarded['popup-container']
        if (nested) {
          delete forwarded[nestedKebab]
        }
        const popup = nested
          ? { [nested]: { ...nestedProps, popupContainer: explicitContainer ?? container.value } }
          : { popupContainer: explicitContainer ?? container.value }
        const alignTrigger = ['Tooltip', 'Popover', 'Popconfirm', 'Dropdown', 'Dsubmenu'].includes(name)
        const alignPoint = attrs.alignPoint ?? attrs['align-point']
        if (alignTrigger && (alignPoint === undefined || alignPoint === false) && forwarded.popupTranslate === undefined && forwarded['popup-translate'] === undefined && explicitContainer === undefined) {
          // React Aria 将主轴边界取整；每次定位时读取实际触发器，保留浮层的交叉轴位置。
          forwarded.popupTranslate = Object.defineProperties({}, Object.fromEntries(
            ['top', 'tl', 'tr', 'bottom', 'bl', 'br', 'left', 'lt', 'lb', 'right', 'rt', 'rb'].map(position => [position, { enumerable: true, get() {
              const element = name === 'Dsubmenu'
                ? anchor.value?.closest('.arco-dropdown-option') ?? (instance.value?.$el instanceof Element ? instance.value.$el : undefined)
                : anchor.value ?? (instance.value?.$el instanceof Element ? instance.value.$el : undefined)
              const rect = element?.getBoundingClientRect()
              if (!rect) { return [0, 0] }
              if (['top', 'tl', 'tr'].includes(position)) { return [0, Math.ceil(rect.top) - rect.top] }
              if (['bottom', 'bl', 'br'].includes(position)) { return [0, Math.floor(rect.bottom) - rect.bottom] }
              if (['left', 'lt', 'lb'].includes(position)) { return [Math.ceil(rect.left) - rect.left, 0] }
              return [Math.ceil(rect.right) - rect.right, 0]
            } }]),
          ))
        }
        let componentSlots = alignTrigger ? {
          ...slots,
          default: (...args: unknown[]) => slots.default?.(...args).map(function bindAnchor(node): VNode {
            if (node.type === Fragment && Array.isArray(node.children)) {
              const fragment = cloneVNode(node)
              fragment.children = node.children.map(child => isVNode(child) ? bindAnchor(child) : child)
              return fragment
            }
            return cloneVNode(node, {
            ref: (value: Element | ComponentPublicInstance | null) => {
              const element = value instanceof Element ? value : value?.$el instanceof Element ? value.$el : undefined
              // Arco 使用插槽中的首个有效元素，多个根节点按实际文档顺序确定触发器。
              if (element && (!anchor.value?.isConnected || (element.compareDocumentPosition(anchor.value) & Node.DOCUMENT_POSITION_FOLLOWING))) {
                anchor.value = element
              }
            },
            ...(['Popover', 'Popconfirm'].includes(name) ? { class: { 'dsh-popover-trigger-open': attrs.popupVisible ?? attrs['popup-visible'] ?? open.value } } : {}),
            }, true)
          }),
        } : slots
        if (name === 'Popconfirm' && !slots.icon && (attrs.type === undefined || attrs.type === 'info')) {
          componentSlots = { ...componentSlots, icon: () => [h('svg', { viewBox: '0 0 16 16', width: 16, height: 16, fill: 'none', style: { color: 'var(--accent)' }, 'aria-hidden': true }, [h('path', { d: 'M8 13.5a5.5 5.5 0 1 0 0-11a5.5 5.5 0 0 0 0 11M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14m1-9.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-.25 3a.75.75 0 0 0-1.5 0V11a.75.75 0 0 0 1.5 0z', fill: 'currentColor', 'fill-rule': 'evenodd', 'clip-rule': 'evenodd' })])] }
        }
        if (name === 'Tooltip' && forwarded.showArrow && !(attrs.arrowClass ?? attrs['arrow-class'])) {
          const arrowStyle = (attrs.arrowStyle ?? attrs['arrow-style']) as CSSProperties | undefined
          const background = arrowStyle?.backgroundColor ?? arrowStyle?.background ?? attrs.backgroundColor ?? attrs['background-color']
          componentSlots = { ...componentSlots, content: () => [
            ...(slots.content?.() ?? [createTextVNode(String(attrs.content ?? ''))]),
            h(Teleport, { to: arrowTarget.value ?? container.value, disabled: !arrowTarget.value }, [
              h('svg', {
                class: 'dsh-tooltip-arrow', 'aria-hidden': true, width: 12, height: 12, viewBox: '0 0 12 12', fill: 'none',
                style: { fill: background },
                onVnodeMounted: node => { void nextTick(() => {
                  const element = node.el as SVGElement
                  if (element.isConnected) { arrowTarget.value = element.closest('.arco-trigger-popup-wrapper')?.querySelector<HTMLElement>(':scope > .arco-trigger-arrow') ?? undefined }
                }) },
                onVnodeBeforeUnmount: () => { arrowTarget.value = undefined },
              }, [h('path', { d: 'M0 0C5.48483 8 6.5 8 12 0Z' })]),
            ]),
          ] }
        }
        if (name === 'Select' && (attrs.allowSearch ?? attrs['allow-search']) !== undefined && (attrs.allowSearch ?? attrs['allow-search']) !== false && Array.isArray(attrs.options) && !slots.header) {
          const text = String(attrs.inputValue ?? attrs['input-value'] ?? query.value)
          const filter = attrs.filterOption ?? attrs['filter-option']
          forwarded.showHeaderOnEmpty = true
          forwarded.fallbackOption = false
          forwarded.placeholder = attrs.placeholder ?? 'Select an item'
          forwarded.allowSearch = false
          delete forwarded['allow-search']
          forwarded.inputValue = undefined
          delete forwarded['input-value']
          forwarded.options = filter === false ? attrs.options : attrs.options.filter(option => typeof filter === 'function' ? filter(text, option) : String(option.label ?? option.value ?? option).toLocaleLowerCase().includes(text.toLocaleLowerCase()))
          componentSlots = { ...componentSlots, header: () => [h('div', { class: 'dsh-select-search' }, h('div', { class: 'dsh-select-search__group' }, h('input', {
            type: 'search', 'aria-label': '搜索', value: text, autofocus: (forwarded.options as unknown[]).length > 0,
            onInput(event: Event) {
              const value = (event.target as HTMLInputElement).value
              query.value = value
              for (const name of ['onUpdate:inputValue', 'onInputValueChange', 'onSearch']) {
                const listener = attrs[name]
                for (const fn of Array.isArray(listener) ? listener : [listener]) { if (typeof fn === 'function') { fn(value) } }
              }
            },
            onKeydown(event: KeyboardEvent) {
              if (!['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(event.key)) { return }
              event.preventDefault()
              instance.value?.$el?.dispatchEvent(new KeyboardEvent('keydown', { key: event.key, bubbles: true }))
            },
          })))] }
        }
        if (name === 'Select' && attrs.multiple && !slots.label && !attrs.formatLabel && !attrs['format-label']) {
          const values = (attrs.modelValue ?? attrs['model-value'] ?? selection.value ?? []) as unknown[]
          const parts = new Intl.ListFormat(locale.value).formatToParts(values.map((_, index) => String(index)))
          const separators = parts.filter(part => part.type === 'literal').map(part => part.value)
          componentSlots = { ...componentSlots, label: ({ data }: { data: { value: unknown; label?: unknown } }) => {
            const index = values.findIndex(value => (typeof value === 'object' && value ? (value as { value: unknown }).value : value) === data.value)
            return [h('span', { class: 'dsh-select-summary' }, [data.label as string ?? String(data.value), separators[index] ?? ''])]
          } }
          const listener = attrs.onChange
          forwarded.onChange = (value: unknown, ...args: unknown[]) => {
            selection.value = value
            for (const fn of Array.isArray(listener) ? listener : [listener]) { if (typeof fn === 'function') { fn(value, ...args) } }
          }
        }
        if (name === 'AutoComplete') {
          const opened = (forwarded.triggerProps as Record<string, unknown>)?.popupVisible ?? open.value
          componentSlots = { ...componentSlots,
            ...(!slots.suffix ? { suffix: () => [h('span', { class: ['dsh-combobox-indicator', { 'dsh-combobox-indicator--open': opened }], 'aria-hidden': true })] } : {}),
            ...(Array.isArray(attrs.data) && !attrs.data.length && !slots.footer ? { footer: () => [h('div', { class: 'dsh-autocomplete-empty' }, h('span', { class: 'dsh-autocomplete-empty__text' }, slots.empty?.() ?? (locale.value.startsWith('zh') ? '无结果' : 'No results found')))] } : {}),
          }
        }
        const popupVisibleChange = ['Popover', 'Popconfirm', 'AutoComplete'].includes(name) ? {
          onPopupVisibleChange(value: boolean) {
            open.value = value
            const listener = attrs.onPopupVisibleChange
            if (Array.isArray(listener)) { listener.forEach(fn => { if (typeof fn === 'function') { fn(value) } }) }
            else if (typeof listener === 'function') { listener(value) }
          },
        } : {}
        return h(component, { ...forwarded, ...popup, ...popupVisibleChange, ref: instance }, componentSlots)
      }
    },
  })
  scopedComponents.set(component, wrapped)
  const originalInstall = (component as C & { install?: typeof Arco.Select.install }).install
  if (originalInstall) {
    Object.assign(wrapped, {
      install(app: App, options?: Parameters<typeof Arco.Select.install>[1]) {
        function register(name: string): Component | undefined
        function register(name: string, definition: Component): App
        function register(name: string, definition?: Component): Component | App | undefined {
          if (definition === undefined) {
            return app.component(name)
          }
          return app.component(name, scopedComponents.get(definition) ?? definition)
        }
        // 原安装器负责命名、子组件和配置，注册入口只替换已包装的公开组件。
        originalInstall({ ...app, component: register }, options)
      },
    })
  }
  return wrapped as C
}

/** 下拉浮层继承所属 Provider 的主题，其他参数和实例类型沿用 Arco。 */
export const AutoComplete: typeof Arco.AutoComplete = scopedPopup(Arco.AutoComplete, 'AutoComplete', 'triggerProps')
export const Autocomplete: typeof Arco.AutoComplete = AutoComplete
export const Cascader: typeof Arco.Cascader = scopedPopup(Arco.Cascader, 'Cascader')
export const ColorPicker: typeof Arco.ColorPicker = scopedPopup(Arco.ColorPicker, 'ColorPicker')
export const DatePicker: typeof Arco.DatePicker = scopedPopup(Arco.DatePicker, 'DatePicker')
export const MonthPicker: typeof Arco.MonthPicker = scopedPopup(Arco.MonthPicker, 'MonthPicker')
export const QuarterPicker: typeof Arco.QuarterPicker = scopedPopup(Arco.QuarterPicker, 'QuarterPicker')
export const WeekPicker: typeof Arco.WeekPicker = scopedPopup(Arco.WeekPicker, 'WeekPicker')
export const YearPicker: typeof Arco.YearPicker = scopedPopup(Arco.YearPicker, 'YearPicker')
export const RangePicker: typeof Arco.RangePicker = scopedPopup(Arco.RangePicker, 'RangePicker')
export const DateRangePicker: typeof Arco.RangePicker = RangePicker
export const Dropdown: typeof Arco.Dropdown = scopedPopup(Arco.Dropdown, 'Dropdown')
export const Dsubmenu: typeof Arco.Dsubmenu = scopedPopup(Arco.Dsubmenu, 'Dsubmenu')
export const DropdownButton: typeof Arco.DropdownButton = scopedPopup(Arco.DropdownButton, 'DropdownButton')
export const Select: typeof Arco.Select = scopedPopup(Arco.Select, 'Select')
export const TreeSelect: typeof Arco.TreeSelect = scopedPopup(Arco.TreeSelect, 'TreeSelect')
export const TimePicker: typeof Arco.TimePicker = scopedPopup(Arco.TimePicker, 'TimePicker')
export const Tooltip: typeof Arco.Tooltip = scopedPopup(Arco.Tooltip, 'Tooltip')
export const Popover: typeof Arco.Popover = scopedPopup(Arco.Popover, 'Popover')
export const Popconfirm: typeof Arco.Popconfirm = scopedPopup(Arco.Popconfirm, 'Popconfirm')
export const Trigger: typeof Arco.Trigger = scopedPopup(Arco.Trigger, 'Trigger')
export const Mention: typeof Arco.Mention = scopedPopup(Arco.Mention, 'Mention')
export const Menu: typeof Arco.Menu = scopedPopup(Arco.Menu, 'Menu', 'triggerProps')
export const Image: typeof Arco.Image = scopedPopup(Arco.Image, 'Image', 'previewProps')
export const ImagePreview: typeof Arco.ImagePreview = scopedPopup(Arco.ImagePreview, 'ImagePreview')
export const ImagePreviewGroup: typeof Arco.ImagePreviewGroup = scopedPopup(Arco.ImagePreviewGroup, 'ImagePreviewGroup')

Object.assign(Cascader, { CascaderPanel: Arco.CascaderPanel })
Object.assign(DatePicker, { MonthPicker, QuarterPicker, WeekPicker, YearPicker, RangePicker })
Object.assign(Dropdown, { Option: Arco.Doption, Group: Arco.Dgroup, Submenu: Dsubmenu, Button: DropdownButton })
Object.assign(Select, { Option: Arco.Option, OptGroup: Arco.Optgroup })
Object.assign(Menu, { Item: Arco.MenuItem, ItemGroup: Arco.MenuItemGroup, SubMenu: Arco.SubMenu })
Object.assign(Image, { Preview: ImagePreview, PreviewGroup: ImagePreviewGroup })

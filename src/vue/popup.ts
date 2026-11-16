import { defineComponent, h, shallowRef, type App, type Component, type ComponentPublicInstance } from 'vue'
import * as Arco from '@arco-design/web-vue'
import { useDshTheme } from './provider.js'

const scopedComponents = new Map<Component, Component>()

// 包装层只代理 Vue 公开实例，保留原组件的事件、插槽与 focus 等实例方法。
function scopedPopup<C extends Component>(component: C, name: string, nested?: 'triggerProps' | 'previewProps'): C {
  const wrapped = defineComponent({
    name: `Dsh${name}`,
    inheritAttrs: false,
    setup(_, { attrs, slots, expose }) {
      const { container } = useDshTheme()
      const instance = shallowRef<ComponentPublicInstance>()
      expose(new Proxy({}, {
        get: (_, key) => (instance.value as unknown as Record<string | symbol, unknown> | undefined)?.[key],
        has: (_, key) => instance.value !== undefined && key in instance.value,
      }))
      return () => {
        const forwarded = { ...attrs }
        const nestedKebab = nested === 'triggerProps' ? 'trigger-props' : 'preview-props'
        const configured = nested ? attrs[nested] ?? attrs[nestedKebab] : undefined
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
        return h(component, { ...forwarded, ...popup, ref: instance }, slots)
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
export const AutoComplete: typeof Arco.AutoComplete = scopedPopup(Arco.AutoComplete, 'AutoComplete')
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
Object.assign(Dropdown, { Option: Arco.Doption, Group: Arco.Dgroup, Submenu: Arco.Dsubmenu, Button: DropdownButton })
Object.assign(Select, { Option: Arco.Option, OptGroup: Arco.Optgroup })
Object.assign(Menu, { Item: Arco.MenuItem, ItemGroup: Arco.MenuItemGroup, SubMenu: Arco.SubMenu })
Object.assign(Image, { Preview: ImagePreview, PreviewGroup: ImagePreviewGroup })

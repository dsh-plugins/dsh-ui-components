import { defineComponent, h, type PropType } from 'vue'
import { Collapse } from '@arco-design/web-vue'
import { Spin } from './basic.js'
export { InputNumber as NumberField } from './basic.js'
export { Tag as Chip } from './basic.js'

/** Arco Vue 全量入口保留原有组件、子组件、实例类型与功能 API。 */
export * from '@arco-design/web-vue'

/** HeroUI 名称与 Arco 同等用途组件的映射，参数仍采用 Arco Vue API。 */
export {
  AutoComplete as Autocomplete,
  Breadcrumb as Breadcrumbs,
  CollapseItem as AccordionItem,
  Collapse as DisclosureGroup,
  CollapseItem as Disclosure,
  Empty as EmptyState,
  Divider as Separator,
  Textarea as TextArea,
  RangePicker as DateRangePicker,
  TypographyText as Text,
} from '@arco-design/web-vue'

/** 手风琴默认只展开一项，设置 accordion=false 可展开多项。 */
export const Accordion = defineComponent({
  name: 'DshAccordion',
  setup(_, { attrs, slots }) {
    return () => h(Collapse, { accordion: true, ...attrs }, slots)
  },
})

/** 开关组通过原生 fieldset 同时提供分组名称和整体禁用语义。 */
export const SwitchGroup = defineComponent({
  name: 'DshSwitchGroup',
  props: { label: String, disabled: Boolean, orientation: { type: String as PropType<'horizontal' | 'vertical'>, default: 'vertical' } },
  setup(props, { slots }) {
    return () => h('fieldset', { class: 'dsh-switch-group', disabled: props.disabled, 'data-orientation': props.orientation }, [
      props.label ? h('legend', props.label) : null, slots.default?.(),
    ])
  },
})

/** 忙碌指示器为辅助技术提供状态名称。 */
export const Spinner = defineComponent({
  name: 'DshSpinner',
  props: { label: { type: String, default: '正在加载' } },
  setup(props, { attrs, slots }) {
    return () => h(Spin, { ...attrs, loading: true, role: 'status', 'aria-label': props.label }, slots)
  },
})

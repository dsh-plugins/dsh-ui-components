import { computed, defineComponent, h, inject, provide, ref, type ComputedRef, type InjectionKey, type PropType } from 'vue'
import { Button as ArcoButton, ButtonGroup as ArcoButtonGroup } from '@arco-design/web-vue'

/** 按钮的视觉层级，与 HeroUI 的语义变体对应。 */
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'danger' | 'danger-soft'
/** 统一的控件尺寸。 */
export type ControlSize = 'sm' | 'md' | 'lg'
/** 可按组件覆盖提供器中的圆角。 */
export type Radius = 'none' | 'sm' | 'md' | 'lg' | 'full'

const sizes = { sm: 'small', md: 'medium', lg: 'large' } as const
type ArcoSize = NonNullable<InstanceType<typeof ArcoButtonGroup>['$props']['size']>
const groupSizeKey: InjectionKey<ComputedRef<ArcoSize | undefined>> = Symbol('dsh-button-group-size')

/** 组尺寸兼容 DSH 简写与 Arco 原生取值。 */
export const ButtonGroup = defineComponent({
  name: 'DshButtonGroup',
  inheritAttrs: false,
  props: {
    size: String as PropType<ControlSize | ArcoSize>,
    type: String as PropType<InstanceType<typeof ArcoButtonGroup>['$props']['type']>,
    status: String as PropType<InstanceType<typeof ArcoButtonGroup>['$props']['status']>,
    shape: String as PropType<InstanceType<typeof ArcoButtonGroup>['$props']['shape']>,
    disabled: Boolean,
  },
  setup(props, { attrs, slots }) {
    const size = computed(() => {
      const requested = props.size
      if (requested === 'sm' || requested === 'md' || requested === 'lg') { return sizes[requested] }
      return requested
    })
    provide(groupSizeKey, size)
    return () => h(ArcoButtonGroup, { ...attrs, ...props, size: size.value }, slots)
  },
})

/** 按钮沿用 Arco 的链接、提交、加载和点击行为，并增加语义化外观。 */
export const Button = defineComponent({
  name: 'DshButton',
  inheritAttrs: false,
  props: {
    type: String as PropType<'primary' | 'secondary' | 'outline' | 'dashed' | 'text'>,
    shape: String as PropType<'round' | 'circle' | 'square'>,
    status: String as PropType<'normal' | 'success' | 'warning' | 'danger'>,
    htmlType: { type: String, default: 'button' },
    href: String,
    autofocus: Boolean,
    long: Boolean,
    loadingFixedWidth: Boolean,
    variant: { type: String as PropType<ButtonVariant>, default: 'primary' },
    size: String as PropType<ControlSize>,
    radius: String as PropType<Radius>,
    disabled: Boolean,
    loading: Boolean,
    iconOnly: Boolean,
    block: Boolean,
  },
  setup(props, { attrs, slots, expose }) {
    const groupSize = inject(groupSizeKey, undefined)
    const size = computed(() => props.size ? sizes[props.size] : groupSize?.value)
    const displaySize = computed(() => ({ mini: 'sm', small: 'sm', medium: 'md', large: 'lg' } as const)[size.value ?? 'medium'])
    const button = ref<InstanceType<typeof ArcoButton>>()
    expose({ focus: () => button.value?.$el?.focus(), blur: () => button.value?.$el?.blur() })
    return () => h(ArcoButton, {
      ...props,
      ...attrs,
      ref: button,
      class: ['dsh-button', attrs.class],
      'data-variant': props.variant,
      'data-size': displaySize.value,
      'data-radius': props.radius,
      'data-icon-only': props.iconOnly || undefined,
      type: props.type ?? (props.variant === 'primary' || props.variant === 'danger' ? 'primary' : 'secondary'),
      size: size.value,
      disabled: props.disabled,
      loading: props.loading,
      long: props.block || props.long,
      'aria-busy': props.loading || undefined,
    }, { ...slots, default: () => [slots.startContent?.(), slots.default?.(), slots.endContent?.()] })
  },
})

/** 关闭按钮需要可访问名称，默认使用中文操作说明。 */
export const CloseButton = defineComponent({
  name: 'DshCloseButton',
  setup(_, { attrs }) {
    return () => h(Button, { variant: 'ghost', iconOnly: true, 'aria-label': '关闭', ...attrs }, () => '×')
  },
})

/** 对外参数类型包含 Arco 按钮功能及本库外观参数。 */
export type ButtonProps = InstanceType<typeof Button>['$props']

import { computed, defineComponent, getCurrentInstance, h, mergeProps, nextTick, onBeforeUnmount, onMounted, ref, useId, type PropType } from 'vue'
import { Input, Link as ArcoLink, Scrollbar } from '@arco-design/web-vue'
import { insertOtp, normalizeOtp } from './selection-model.js'

function hasModel(): boolean {
  const props = getCurrentInstance()?.vnode.props ?? {}
  return 'modelValue' in props || 'model-value' in props
}

/** 链接保留原生导航语义；禁用时移除导航地址并拦截激活。 */
export const Link = defineComponent({
  name: 'DshLink',
  inheritAttrs: false,
  props: {
    href: String, disabled: Boolean, external: Boolean, loading: Boolean, icon: Boolean,
    hoverable: { type: Boolean, default: true },
    status: String as PropType<InstanceType<typeof ArcoLink>['$props']['status']>,
  },
  emits: ['click'],
  setup(props, { attrs, slots, emit }) {
    return () => {
      const blocked = props.disabled || props.loading
      return h(ArcoLink, {
        ...attrs,
        disabled: props.disabled, loading: props.loading, icon: props.icon,
        hoverable: props.hoverable, status: props.status,
        class: ['dsh-link', attrs.class],
        role: 'link',
        href: blocked ? undefined : props.href,
        target: blocked ? undefined : props.external ? '_blank' : attrs.target,
        rel: props.external || attrs.target === '_blank' ? `${attrs.rel ?? ''} noopener noreferrer`.trim() : attrs.rel,
        tabindex: blocked ? -1 : attrs.tabindex,
        'aria-disabled': blocked || undefined,
        'aria-busy': props.loading || undefined,
        onClickCapture: blocked ? (event: MouseEvent) => {
          event.preventDefault()
          event.stopImmediatePropagation()
        } : attrs.onClickCapture,
        onClick: (event: MouseEvent) => emit('click', event),
      }, slots)
    }
  },
})

/** 键盘快捷键提示，keys 支持分离显示组合键。 */
export const Kbd = defineComponent({
  name: 'DshKbd',
  props: { keys: { type: Array as PropType<readonly string[]>, default: () => [] } },
  setup(props, { slots }) {
    return () => h('kbd', { class: 'dsh-kbd' }, [
      ...props.keys.map(key => h('span', { class: 'dsh-kbd__key', key }, key)), slots.default?.(),
    ])
  },
})

/** 表面层级通过主题变量表达，允许指定语义标签。 */
export const Surface = defineComponent({
  name: 'DshSurface',
  props: {
    as: { type: String, default: 'div' },
    variant: { type: String as PropType<'default' | 'secondary' | 'tertiary' | 'transparent'>, default: 'default' },
  },
  setup(props, { slots }) { return () => h(props.as, { class: 'dsh-surface', 'data-variant': props.variant }, slots.default?.()) },
})

/** 分区标题容器，保留原生 header 语义。 */
export const Header = defineComponent({
  name: 'DshHeader',
  setup(_, { slots }) { return () => h('header', { class: 'dsh-header' }, slots.default?.()) },
})

/** 表单标签通过 for 与输入框建立关联。 */
export const Label = defineComponent({
  name: 'DshLabel',
  props: { required: Boolean },
  setup(props, { slots }) {
    return () => h('label', { class: 'dsh-label' }, [slots.default?.(), props.required ? h('span', { 'aria-hidden': 'true', class: 'dsh-label__required' }, ' *') : null])
  },
})

/** 辅助说明可通过 id 关联输入框的 aria-describedby。 */
export const Description = defineComponent({
  name: 'DshDescription',
  setup(_, { slots }) { return () => h('div', { class: 'dsh-description' }, slots.default?.()) },
})

/** 校验错误使用礼貌播报，避免重复打断屏幕阅读器。 */
export const FieldError = defineComponent({
  name: 'DshFieldError',
  setup(_, { slots }) { return () => h('div', { class: 'dsh-field-error', 'aria-live': 'polite' }, slots.default?.()) },
})

/** 错误文案组件，与 FieldError 具有相同语义。 */
export const ErrorMessage = FieldError

/** 原生字段组统一提供 legend 和 disabled 行为。 */
export const Fieldset = defineComponent({
  name: 'DshFieldset',
  props: { legend: String, disabled: Boolean },
  setup(props, { slots }) {
    return () => h('fieldset', { class: 'dsh-fieldset', disabled: props.disabled }, [
      slots.legend || props.legend ? h('legend', {}, slots.legend?.() ?? props.legend) : null,
      slots.default?.(),
    ])
  },
})

/** 输入组合容器通过 start/end 插槽容纳图标及附加按钮。 */
export const InputGroup = defineComponent({
  name: 'DshInputGroup',
  setup(_, { slots }) {
    return () => h('div', { class: 'dsh-input-group' }, [
      slots.start ? h('span', { class: 'dsh-input-group__start' }, slots.start()) : null,
      slots.default?.(),
      slots.end ? h('span', { class: 'dsh-input-group__end' }, slots.end()) : null,
    ])
  },
})

const fieldProps = {
  modelValue: String,
  defaultValue: { type: String, default: '' },
  id: String,
  label: String,
  description: String,
  errorMessage: String,
  invalid: Boolean,
  required: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  name: String,
  placeholder: String,
  type: { type: String, default: 'text' },
} as const

/** 带关联标签、说明和错误信息的受控或非受控文本框。 */
export const TextField = defineComponent({
  name: 'DshTextField',
  inheritAttrs: false,
  props: fieldProps,
  emits: ['update:modelValue', 'change', 'input', 'focus', 'blur'],
  setup(props, { attrs, slots, emit, expose }) {
    const controlled = hasModel()
    const generatedId = useId()
    const input = ref<InstanceType<typeof Input> | null>(null)
    const localValue = ref(props.defaultValue)
    expose({ focus: () => input.value?.focus(), blur: () => input.value?.blur() })
    return () => {
      const id = props.id ?? `dsh-field-${generatedId}`
      const hasDescription = Boolean(props.description || slots.description)
      const hasError = Boolean(props.errorMessage || slots.error)
      const describedBy = [attrs['aria-describedby'], hasDescription ? `${id}-description` : '', hasError ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined
      const { class: className, style, 'aria-labelledby': labelledBy, ...inputAttrs } = attrs
      return h('div', { class: ['dsh-field', className], style, 'data-invalid': props.invalid || hasError || undefined }, [
        props.label || slots.label ? h(Label, { for: id, required: props.required }, { default: () => slots.label?.() ?? props.label }) : null,
        h(Input, {
          ...inputAttrs,
          ref: input,
          type: props.type === 'password' ? 'password' : 'text',
          inputAttrs: {
            ...(typeof attrs.inputAttrs === 'object' ? attrs.inputAttrs : {}),
            id,
            name: props.name,
            type: props.type,
            required: props.required,
            'aria-label': attrs['aria-label'],
            'aria-labelledby': labelledBy ?? (attrs.inputAttrs as Record<string, unknown> | undefined)?.['aria-labelledby'],
            'aria-invalid': props.invalid || hasError || undefined,
            'aria-describedby': describedBy,
            'aria-required': props.required || undefined,
          },
          placeholder: props.placeholder,
          modelValue: controlled ? props.modelValue ?? '' : localValue.value,
          disabled: props.disabled,
          readonly: props.readonly,
          error: props.invalid || hasError,
          'onUpdate:modelValue': (value: string) => { localValue.value = value; emit('update:modelValue', value) },
          onChange: (value: string, event: Event) => emit('change', value, event),
          onInput: (value: string, event: Event) => emit('input', value, event),
          onFocus: (event: FocusEvent) => emit('focus', event),
          onBlur: (event: FocusEvent) => emit('blur', event),
        }, { prefix: slots.prefix, suffix: slots.suffix, prepend: slots.prepend, append: slots.append }),
        hasDescription ? h(Description, { id: `${id}-description` }, { default: () => slots.description?.() ?? props.description }) : null,
        hasError ? h(FieldError, { id: `${id}-error` }, { default: () => slots.error?.() ?? props.errorMessage }) : null,
      ])
    }
  },
})

/** 搜索框保留 TextField 的标签结构，提供 search 事件和清空入口。 */
export const SearchField = defineComponent({
  name: 'DshSearchField',
  inheritAttrs: false,
  props: fieldProps,
  emits: ['update:modelValue', 'search'],
  setup(props, { attrs, slots, emit }) {
    const controlled = hasModel()
    const localValue = ref(props.defaultValue)
    return () => h(TextField, mergeProps(attrs, {
      ...props,
      type: 'search',
      allowClear: true,
      modelValue: controlled ? props.modelValue ?? '' : localValue.value,
      'onUpdate:modelValue': (value: string) => { localValue.value = value; emit('update:modelValue', value) },
      onKeydown: (event: KeyboardEvent) => {
        if (event.key === 'Enter' && !event.isComposing && !props.disabled) { emit('search', controlled ? props.modelValue ?? '' : localValue.value) }
      },
    }), slots)
  },
})

/** 单个原生输入承载验证码编辑，装饰格子避免分裂粘贴、读屏和自动填充行为。 */
export const InputOTP = defineComponent({
  name: 'DshInputOTP',
  inheritAttrs: false,
  props: {
    modelValue: String,
    defaultValue: { type: String, default: '' },
    length: { type: Number, default: 6, validator: (value: number) => Number.isInteger(value) && value > 0 },
    type: { type: String as PropType<'numeric' | 'text'>, default: 'numeric' },
    disabled: Boolean,
    readonly: Boolean,
    invalid: Boolean,
    label: { type: String, default: '验证码' },
  },
  emits: ['update:modelValue', 'complete', 'change'],
  setup(props, { attrs, emit, expose }) {
    const controlled = hasModel()
    const input = ref<HTMLInputElement | null>(null)
    const localValue = ref(normalizeOtp(props.defaultValue, props.length, props.type === 'numeric'))
    const value = computed(() => normalizeOtp(controlled ? props.modelValue ?? '' : localValue.value, props.length, props.type === 'numeric'))
    const focused = ref(false)
    const cursor = ref(0)
    const syncCursor = () => { cursor.value = input.value?.selectionStart ?? 0 }
    const update = (next: string, position: number) => {
      const previous = value.value
      localValue.value = next
      emit('update:modelValue', next)
      if (previous !== next) {
        emit('change', next)
        if (next.length === props.length) { emit('complete', next) }
      }
      void nextTick(() => {
        if (input.value) {
          input.value.value = value.value
          input.value.setSelectionRange(position, position)
          syncCursor()
        }
      })
    }
    expose({ focus: () => input.value?.focus(), blur: () => input.value?.blur() })
    return () => {
      const { class: className, style, ...inputAttrs } = attrs
      return h('div', {
        class: ['dsh-otp', className], style, 'data-invalid': props.invalid || undefined, 'data-disabled': props.disabled || undefined,
        onMousedown(event: MouseEvent) {
          if (!props.disabled && !event.defaultPrevented) {
            event.preventDefault()
            input.value?.focus()
          }
        },
      }, [
        h('div', { class: 'dsh-otp__cells', 'aria-hidden': 'true' }, Array.from({ length: props.length }, (_, index) => h('span', {
          class: 'dsh-otp__cell',
          'data-active': focused.value && Math.min(cursor.value, props.length - 1) === index || undefined,
          'data-filled': Boolean(value.value[index]) || undefined,
          onMousedown(event: MouseEvent) {
            if (props.disabled) { return }
            event.preventDefault()
            input.value?.focus()
            input.value?.setSelectionRange(Math.min(index, value.value.length), Math.min(index, value.value.length))
            syncCursor()
          },
        }, value.value[index] ?? ''))),
        h('input', mergeProps(inputAttrs, {
          ref: input,
          class: 'dsh-otp__input',
          value: value.value,
          type: 'text',
          inputmode: props.type === 'numeric' ? 'numeric' : 'text',
          autocomplete: 'one-time-code',
          maxlength: props.length,
          disabled: props.disabled,
          readonly: props.readonly,
          'aria-label': attrs['aria-label'] ?? props.label,
          'aria-invalid': props.invalid || undefined,
          onFocus: () => { focused.value = true; syncCursor() },
          onBlur: () => { focused.value = false },
          onSelect: syncCursor,
          onKeyup: syncCursor,
          onInput(event: Event) {
            const target = event.target as HTMLInputElement
            const position = normalizeOtp(target.value.slice(0, target.selectionStart ?? 0), props.length, props.type === 'numeric').length
            update(normalizeOtp(target.value, props.length, props.type === 'numeric'), position)
          },
          onPaste(event: ClipboardEvent) {
            if (props.disabled || props.readonly || !event.clipboardData) { return }
            event.preventDefault()
            const inserted = insertOtp(value.value, event.clipboardData.getData('text'), input.value?.selectionStart ?? 0, input.value?.selectionEnd ?? 0, props.length, props.type === 'numeric')
            update(inserted.value, inserted.cursor)
          },
        })),
      ])
    }
  },
})

/** 滚动内容使用 Arco Scrollbar，边缘状态供主题绘制阴影。 */
export const ScrollShadow = defineComponent({
  name: 'DshScrollShadow',
  props: { maxHeight: { type: [Number, String], default: 240 }, variant: String as PropType<'page'> },
  setup(props, { slots }) {
    const root = ref<HTMLElement | null>(null)
    const scrolling = ref(false)
    let hideTimer: ReturnType<typeof setTimeout> | undefined
    const edges = ref({ top: false, bottom: false, left: false, right: false })
    let resize: ResizeObserver | undefined
    let mutations: MutationObserver | undefined
    const measure = () => {
      const viewport = root.value?.querySelector<HTMLElement>('.arco-scrollbar-container')
      if (viewport) {
        edges.value = {
          top: viewport.scrollTop > 1,
          bottom: viewport.scrollTop + viewport.clientHeight < viewport.scrollHeight - 1,
          left: viewport.scrollLeft > 1,
          right: viewport.scrollLeft + viewport.clientWidth < viewport.scrollWidth - 1,
        }
      }
    }
    onMounted(() => {
      measure()
      if (typeof ResizeObserver !== 'undefined' && root.value) {
        resize = new ResizeObserver(measure)
        resize.observe(root.value)
        const content = root.value.querySelector('.dsh-scroll-shadow__content')
        if (content) { resize.observe(content) }
      }
      if (root.value) {
        mutations = new MutationObserver(measure)
        const content = root.value.querySelector('.dsh-scroll-shadow__content')
        if (content) { mutations.observe(content, { childList: true, subtree: true, characterData: true }) }
      }
    })
    onBeforeUnmount(() => { resize?.disconnect(); mutations?.disconnect(); clearTimeout(hideTimer) })
    return () => h('div', {
      ref: root,
      class: ['dsh-scroll-shadow', { 'dsh-scroll-shadow--page': props.variant === 'page' }],
      'data-scrolling': scrolling.value || undefined,
      onScrollCapture() {
        measure()
        if (props.variant !== 'page') { return }
        scrolling.value = true
        clearTimeout(hideTimer)
        hideTimer = setTimeout(() => { scrolling.value = false }, 900)
      },
      'data-top': edges.value.top || undefined,
      'data-bottom': edges.value.bottom || undefined,
      'data-left': edges.value.left || undefined,
      'data-right': edges.value.right || undefined,
    }, h(Scrollbar, { style: { height: '100%', overflow: 'auto', maxHeight: typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight }, outerStyle: { height: '100%', maxHeight: typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight } }, { default: () => h('div', { class: 'dsh-scroll-shadow__content' }, slots.default?.()) }))
  },
})

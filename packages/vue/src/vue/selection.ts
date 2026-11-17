import { computed, defineComponent, getCurrentInstance, h, nextTick, onBeforeUnmount, onMounted, ref, useId, watch, type PropType } from 'vue'
import { findByText, nextEnabledIndex, toggleSelection, type SelectionOption, type SelectionValue } from './selection-model.js'

export type { SelectionOption, SelectionValue } from './selection-model.js'

function hasModel(): boolean {
  const props = getCurrentInstance()?.vnode.props ?? {}
  return 'modelValue' in props || 'model-value' in props
}

const selectionProps = {
  options: { type: Array as PropType<readonly SelectionOption[]>, default: () => [] },
  modelValue: [String, Number, Array] as PropType<SelectionValue>,
  defaultValue: [String, Number, Array] as PropType<SelectionValue>,
  multiple: Boolean,
  disabled: Boolean,
  allowEmpty: { type: Boolean, default: true },
  label: String,
} as const

/** 单选和多选列表提供活动后代、首尾导航和文字检索。 */
export const ListBox = defineComponent({
  name: 'DshListBox',
  props: selectionProps,
  emits: ['update:modelValue', 'change'],
  setup(props, { slots, emit }) {
    const controlled = hasModel()
    const id = useId()
    const root = ref<HTMLElement | null>(null)
    const localValue = ref<SelectionValue>(props.defaultValue)
    const current = computed(() => controlled ? props.modelValue : localValue.value)
    const selected = computed(() => Array.isArray(current.value) ? current.value : current.value === undefined ? [] : [current.value])
    const active = ref(-1)
    let search = ''
    let searchedAt = 0
    const resetActive = () => {
      const selectedIndex = props.options.findIndex(option => !option.disabled && selected.value.includes(option.value))
      active.value = selectedIndex < 0 ? nextEnabledIndex(props.options, -1, 'Home') : selectedIndex
    }
    watch(() => props.options, resetActive, { immediate: true, deep: true })
    const choose = (index: number) => {
      const option = props.options[index]
      if (props.disabled || !option || option.disabled) { return }
      active.value = index
      const value = toggleSelection(current.value, option.value, props.multiple, props.allowEmpty)
      localValue.value = value
      emit('update:modelValue', value)
      emit('change', value)
    }
    const reveal = () => {
      void nextTick(() => root.value?.querySelector<HTMLElement>(`[data-index="${active.value}"]`)?.scrollIntoView({ block: 'nearest' }))
    }
    const onKeydown = (event: KeyboardEvent) => {
      if (props.disabled || event.isComposing) { return }
      if (['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
        event.preventDefault()
        active.value = nextEnabledIndex(props.options, active.value, event.key)
        reveal()
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        choose(active.value)
      } else if (props.multiple && (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'a') {
        event.preventDefault()
        const value = props.options.filter(option => !option.disabled || selected.value.includes(option.value)).map(option => option.value)
        localValue.value = value
        emit('update:modelValue', value)
        emit('change', value)
      } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
        const now = Date.now()
        search = now - searchedAt > 700 ? event.key : search + event.key
        searchedAt = now
        const repeated = [...search].every(character => character.toLocaleLowerCase() === event.key.toLocaleLowerCase())
        const query = repeated ? event.key : search
        const found = findByText(props.options, query.length > 1 ? active.value - 1 : active.value, query)
        if (found >= 0) { active.value = found; reveal() }
        event.preventDefault()
      }
    }
    return () => h('div', {
      ref: root,
      class: 'dsh-listbox',
      role: 'listbox',
      tabindex: props.disabled ? -1 : 0,
      'aria-label': props.label,
      'aria-multiselectable': props.multiple || undefined,
      'aria-disabled': props.disabled || undefined,
      'aria-activedescendant': active.value < 0 ? undefined : `dsh-listbox-${id}-${active.value}`,
      onKeydown,
      onFocus: resetActive,
    }, props.options.length === 0 ? slots.empty?.() : props.options.map((option, index) => h('div', {
      key: option.value,
      id: `dsh-listbox-${id}-${index}`,
      role: 'option',
      'aria-selected': selected.value.includes(option.value),
      'aria-disabled': props.disabled || option.disabled || undefined,
      'data-selected': selected.value.includes(option.value) || undefined,
      'data-disabled': props.disabled || option.disabled || undefined,
      'data-active': active.value === index || undefined,
      'data-index': index,
      class: 'dsh-listbox__option',
      onMousedown(event: MouseEvent) { event.preventDefault() },
      onClick() { root.value?.focus(); choose(index) },
    }, slots.option?.({ option, selected: selected.value.includes(option.value), active: active.value === index }) ?? [
      h('span', { class: 'dsh-listbox__label' }, option.label),
      option.description ? h('span', { class: 'dsh-description' }, option.description) : null,
      h('span', { class: 'dsh-listbox__indicator', 'aria-hidden': 'true' }, selected.value.includes(option.value) ? '✓' : ''),
    ])))
  },
})

/** 可切换按钮使用 aria-pressed 表达选中状态。 */
export const ToggleButton = defineComponent({
  name: 'DshToggleButton',
  inheritAttrs: false,
  props: {
    modelValue: { type: Boolean, default: undefined },
    defaultValue: Boolean,
    disabled: Boolean,
  },
  emits: ['update:modelValue', 'change', 'click'],
  setup(props, { attrs, slots, emit }) {
    const controlled = hasModel()
    const localValue = ref(props.defaultValue)
    const current = computed(() => controlled ? props.modelValue ?? false : localValue.value)
    return () => h('button', {
      ...attrs,
      class: ['dsh-toggle-button', attrs.class],
      type: 'button',
      disabled: props.disabled,
      'aria-pressed': current.value,
      'data-selected': current.value || undefined,
      onClick(event: MouseEvent) {
        if (props.disabled) { return }
        localValue.value = !current.value
        emit('update:modelValue', localValue.value)
        emit('change', localValue.value)
        emit('click', event)
      },
    }, slots.default?.())
  },
})

/** 一组可切换按钮；方向键移动焦点，空格和回车执行选择。 */
export const ToggleButtonGroup = defineComponent({
  name: 'DshToggleButtonGroup',
  props: { ...selectionProps, orientation: { type: String as PropType<'horizontal' | 'vertical'>, default: 'horizontal' } },
  emits: ['update:modelValue', 'change'],
  setup(props, { slots, emit }) {
    const controlled = hasModel()
    const root = ref<HTMLElement | null>(null)
    const localValue = ref<SelectionValue>(props.defaultValue)
    const current = computed(() => controlled ? props.modelValue : localValue.value)
    const selected = computed(() => Array.isArray(current.value) ? current.value : current.value === undefined ? [] : [current.value])
    const active = ref(-1)
    watch(() => props.options, () => {
      if (!props.options[active.value] || props.options[active.value]?.disabled) {
        const index = props.options.findIndex(option => !option.disabled && selected.value.includes(option.value))
        active.value = index < 0 ? nextEnabledIndex(props.options, -1, 'Home') : index
      }
    }, { immediate: true, deep: true })
    const choose = (option: SelectionOption) => {
      if (props.disabled || option.disabled) { return }
      const value = toggleSelection(current.value, option.value, props.multiple, props.allowEmpty)
      localValue.value = value
      emit('update:modelValue', value)
      emit('change', value)
    }
    return () => h('div', {
      ref: root,
      role: 'group',
      class: 'dsh-toggle-group',
      'aria-label': props.label,
      'aria-disabled': props.disabled || undefined,
      'data-orientation': props.orientation,
      onKeydown(event: KeyboardEvent) {
        if (props.disabled) { return }
        const keys = props.orientation === 'horizontal' ? ['ArrowLeft', 'ArrowRight', 'Home', 'End'] : ['ArrowUp', 'ArrowDown', 'Home', 'End']
        if (!keys.includes(event.key)) { return }
        event.preventDefault()
        let key = event.key
        if (props.orientation === 'horizontal' && root.value && getComputedStyle(root.value).direction === 'rtl') {
          if (key === 'ArrowLeft') { key = 'ArrowRight' } else if (key === 'ArrowRight') { key = 'ArrowLeft' }
        }
        active.value = nextEnabledIndex(props.options, active.value, key)
        void nextTick(() => root.value?.querySelector<HTMLButtonElement>(`[data-index="${active.value}"]`)?.focus())
      },
    }, props.options.map((option, index) => h(ToggleButton, {
      key: option.value,
      modelValue: selected.value.includes(option.value),
      disabled: props.disabled || option.disabled,
      tabindex: active.value === index ? 0 : -1,
      'data-index': index,
      onFocus: () => { active.value = index },
      'onUpdate:modelValue': () => choose(option),
    }, { default: () => slots.option?.({ option, selected: selected.value.includes(option.value) }) ?? option.label })))
  },
})

/** 工具栏保留单个 Tab 入口，并通过方向键访问可用操作。 */
export const Toolbar = defineComponent({
  name: 'DshToolbar',
  props: { label: String, orientation: { type: String as PropType<'horizontal' | 'vertical'>, default: 'horizontal' } },
  setup(props, { slots }) {
    const root = ref<HTMLElement | null>(null)
    let observer: MutationObserver | undefined
    const originalTabIndex = new Map<HTMLElement, string | null>()
    const elements = () => Array.from(root.value?.querySelectorAll<HTMLElement>('button, a[href], input, select, textarea, [tabindex]') ?? [])
      .filter(element => !element.matches(':disabled, [aria-disabled="true"], [hidden]') && !element.closest('[hidden], [inert]'))
    const synchronize = (focused?: HTMLElement) => {
      const controls = elements()
      const selected = focused && controls.includes(focused) ? focused : controls.find(element => element === document.activeElement) ?? controls.find(element => element.tabIndex === 0) ?? controls[0]
      for (const element of controls) {
        if (!originalTabIndex.has(element)) { originalTabIndex.set(element, element.getAttribute('tabindex')) }
        element.tabIndex = element === selected ? 0 : -1
      }
    }
    onMounted(() => {
      synchronize()
      if (root.value) {
        observer = new MutationObserver(() => synchronize())
        observer.observe(root.value, { childList: true, subtree: true, attributes: true, attributeFilter: ['disabled', 'aria-disabled', 'hidden'] })
      }
    })
    onBeforeUnmount(() => {
      observer?.disconnect()
      for (const [element, previous] of originalTabIndex) {
        if (previous === null) { element.removeAttribute('tabindex') } else { element.setAttribute('tabindex', previous) }
      }
    })
    return () => h('div', {
      ref: root,
      class: 'dsh-toolbar',
      role: 'toolbar',
      'aria-label': props.label,
      'aria-orientation': props.orientation,
      onFocusin(event: FocusEvent) { synchronize(event.target as HTMLElement) },
      onKeydown(event: KeyboardEvent) {
        const target = event.target as HTMLElement
        if (target.matches('input, textarea, select, [contenteditable="true"]')) { return }
        const keys = props.orientation === 'horizontal' ? ['ArrowLeft', 'ArrowRight', 'Home', 'End'] : ['ArrowUp', 'ArrowDown', 'Home', 'End']
        if (!keys.includes(event.key)) { return }
        const controls = elements()
        let key = event.key
        if (props.orientation === 'horizontal' && root.value && getComputedStyle(root.value).direction === 'rtl') {
          if (key === 'ArrowLeft') { key = 'ArrowRight' } else if (key === 'ArrowRight') { key = 'ArrowLeft' }
        }
        const index = nextEnabledIndex(controls.map((_, index) => ({ value: index, label: '' })), controls.indexOf(target), key)
        if (index >= 0) { event.preventDefault(); controls[index]?.focus() }
      },
    }, slots.default?.())
  },
})

/** 可删除标签的模型项；value 用于稳定标识和删除回调。 */
export interface TagItem {
  value: string | number
  label: string
  disabled?: boolean
}

/** 标签组通过 v-model 更新剩余项，删除后将焦点交给邻近标签。 */
export const TagGroup = defineComponent({
  name: 'DshTagGroup',
  props: {
    modelValue: Array as PropType<readonly TagItem[]>,
    defaultValue: { type: Array as PropType<readonly TagItem[]>, default: () => [] },
    label: String,
    removable: { type: Boolean, default: true },
    disabled: Boolean,
    removeLabel: { type: Function as PropType<(item: TagItem) => string>, default: (item: TagItem) => `移除 ${item.label}` },
  },
  emits: ['update:modelValue', 'remove'],
  setup(props, { slots, emit }) {
    const controlled = hasModel()
    const root = ref<HTMLElement | null>(null)
    const localValue = ref<readonly TagItem[]>(props.defaultValue)
    const items = computed(() => controlled ? props.modelValue ?? [] : localValue.value)
    const remove = (item: TagItem, index: number) => {
      if (props.disabled || item.disabled) { return }
      localValue.value = items.value.filter(candidate => candidate.value !== item.value)
      emit('update:modelValue', localValue.value)
      emit('remove', item.value)
      void nextTick(() => {
        const buttons = root.value?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)')
        if (buttons?.length) { buttons[Math.min(index, buttons.length - 1)]?.focus() } else { root.value?.focus() }
      })
    }
    return () => h('div', { ref: root, class: 'dsh-tag-group', role: 'group', 'aria-label': props.label, tabindex: -1 }, items.value.map((item, index) => h('span', {
      class: ['arco-tag', 'dsh-tag-group__tag'], key: item.value, 'data-disabled': props.disabled || item.disabled || undefined,
    }, [
      slots.item?.({ item }) ?? h('span', {}, item.label),
      props.removable ? h('button', {
        class: 'dsh-tag-group__remove',
        type: 'button',
        disabled: props.disabled || item.disabled,
        'aria-label': props.removeLabel(item),
        onClick: () => remove(item, index),
      }, '×') : null,
    ])))
  },
})

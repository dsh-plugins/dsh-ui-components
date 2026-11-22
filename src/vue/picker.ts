import { computed, defineComponent, h, inject, nextTick, onBeforeUpdate, onMounted, onUpdated, ref, shallowRef, watch, type App, type Component, type ComponentPublicInstance, type PropType, type VNode } from 'vue'
import { configProviderInjectionKey } from '@arco-design/web-vue/es/config-provider/context.js'
import dayjs, { type Dayjs } from 'dayjs'
import * as Arco from '@arco-design/web-vue'
import { DatePicker as ScopedDate, RangePicker as ScopedRange, MonthPicker, YearPicker, QuarterPicker, WeekPicker } from './popup.js'
import { useDshTheme } from './provider.js'
import { renderDateInput, type DateInputDraft } from './date-input.js'
import { calendarWeekStart, orderedRange, pickerDate, renderCalendar, validDateRange, type CalendarFactory, type DisabledDay, type RangeEndpoint } from './picker-model.js'

const factory: CalendarFactory<VNode> = (tag, props, ...children) => {
  const { className, fillRule, clipRule, suppressContentEditableWarning, onKeyDown, onBeforeInput, onMouseEnter, onBlur, ...rest } = props
  return h(tag, { ...rest, class: className, 'fill-rule': fillRule, 'clip-rule': clipRule, onKeydown: onKeyDown, onBeforeinput: onBeforeInput, onMouseenter: onMouseEnter, onFocusout: onBlur }, children)
}
const CalendarPanel = defineComponent({
  name: 'DshCalendarPanel',
  props: {
    standalone: Boolean,
    range: Boolean,
    value: { type: Array as PropType<Dayjs[]>, required: true },
    view: { type: Object as PropType<Dayjs>, required: true },
    locale: { type: String, required: true },
    weekStart: Number,
    disabled: Function as PropType<DisabledDay>,
    onSelect: { type: Function as PropType<(dates: Dayjs[], complete: boolean) => void>, required: true },
    onView: { type: Function as PropType<(date: Dayjs) => void>, required: true },
  },
  setup(props) {
    const month = shallowRef(props.view.startOf('month'))
    const focused = shallowRef(props.value.at(-1) ?? props.view)
    const yearOpen = ref(false)
    const anchor = shallowRef<Dayjs>()
    const hover = shallowRef<Dayjs>()
    const root = shallowRef<HTMLElement>()
    watch(() => props.view.valueOf(), () => {
      month.value = props.view.startOf('month')
      if (!focused.value.isSame(month.value, 'month') && !(props.range && focused.value.isSame(month.value.add(1, 'month'), 'month'))) {
        focused.value = props.view
      }
    })
    async function focusPanel(previous?: HTMLButtonElement) {
      await nextTick()
      if (previous) {
        const active = document.activeElement
        if (active !== previous && !(active === document.body && (!previous.isConnected || previous.disabled))) { return }
      }
      const selector = yearOpen.value ? '.dsh-calendar__year[data-selected]' : '.dsh-calendar__cell[tabindex="0"]'
      const target = root.value?.querySelector<HTMLButtonElement>(selector) ?? root.value?.querySelector<HTMLButtonElement>('.dsh-calendar__year-trigger, .dsh-calendar__heading')
      target?.focus({ preventScroll: true })
      if (yearOpen.value && target?.parentElement) { target.parentElement.scrollTop = Math.max(0, target.offsetTop - (target.parentElement.clientHeight - target.offsetHeight) / 2) }
    }
    let previousFocus: HTMLButtonElement | undefined
    onBeforeUpdate(() => { previousFocus = root.value?.querySelector<HTMLButtonElement>('.dsh-calendar__cell:focus') ?? undefined })
    onUpdated(() => { if (previousFocus) { void focusPanel(previousFocus) } })
    onMounted(() => { if (!props.standalone) { void focusPanel() } })
    watch(yearOpen, () => { void focusPanel() })
    const isDisabled = (date: Dayjs) => !!props.disabled?.(date, anchor.value ? 'end' : 'start')
    const move = (date: Dayjs) => { props.onView(date) }
    return () => h('div', { ref: root, class: ['dsh-picker-popover', { 'dsh-picker-popover--range': props.range, 'dsh-calendar-standalone': props.standalone }] }, [renderCalendar(factory, {
      month: month.value, focused: focused.value, selected: props.value, anchor: anchor.value, hover: hover.value,
      range: props.range, yearOpen: yearOpen.value, locale: props.locale, firstDay: props.weekStart ?? calendarWeekStart(props.locale), disabled: isDisabled,
    }, {
      month: move, focus: date => { focused.value = date }, year: value => { yearOpen.value = value },
      hover: date => { if (anchor.value) { hover.value = date } },
      yearSelect: year => { const date = month.value.year(year).date(Math.min(focused.value.date(), month.value.year(year).daysInMonth())); focused.value = date; move(date); yearOpen.value = false },
      select: date => {
        if (isDisabled(date)) { return }
        focused.value = date
        if (!props.range) { props.onSelect([date], true); return }
        if (!anchor.value) { anchor.value = date; hover.value = date; props.onSelect([date], false); return }
        const dates = orderedRange(anchor.value, date)
        if (!validDateRange(dates[0], dates[1], props.disabled)) { return }
        anchor.value = undefined; hover.value = undefined; props.onSelect(dates, true)
      },
    })])
  },
})

const booleanPickerAttrs = new Set(['disabled', 'readonly', 'disabledInput', 'showTime', 'showNowBtn', 'showConfirmBtn', 'popupVisible', 'defaultPopupVisible', 'allowClear'])

function createPicker(range: boolean) {
  const Base = range ? ScopedRange : ScopedDate
  const wrapped = defineComponent({
    name: range ? 'DshRangePicker' : 'DshDatePicker', inheritAttrs: false,
    setup(_, { attrs, slots, expose }) {
      const theme = useDshTheme()
      const instance = shallowRef<ComponentPublicInstance>()
      const inputRoot = shallowRef<HTMLElement>()
      const revision = ref(0)
      const draft: DateInputDraft = { parts: [], source: '', buffer: '' }
      const get = (name: string) => {
        const attr = attrs[name] ?? attrs[name.replace(/[A-Z]/g, value => `-${value.toLowerCase()}`)]
        return attr === '' && booleanPickerAttrs.has(name) ? true : attr
      }
      const parse = (value: unknown) => pickerDate(value, String(get('valueFormat') ?? (typeof get('format') === 'string' ? get('format') : 'YYYY-MM-DD')))
      const localValue = shallowRef(get('defaultValue'))
      const visible = ref(!!get('defaultPopupVisible'))
      const first = (value: unknown) => range && Array.isArray(value) ? value[0] : value
      const view = shallowRef(parse(first(get('pickerValue') ?? get('defaultPickerValue') ?? get('modelValue') ?? get('defaultValue'))) ?? dayjs())
      const value = computed(() => 'modelValue' in attrs || 'model-value' in attrs ? get('modelValue') : localValue.value)
      watch(() => parse(first(value.value))?.valueOf(), timestamp => {
        if (timestamp !== undefined) { view.value = dayjs(timestamp) }
      })
      const call = (event: string, ...args: unknown[]) => {
        const listener = attrs[event]
        if (Array.isArray(listener)) { listener.forEach(fn => { if (typeof fn === 'function') { fn(...args) } }) }
        else if (typeof listener === 'function') { listener(...args) }
      }
      expose(new Proxy({}, { get: (_, key) => key === 'focus' ? (index = 0) => { if (inputRoot.value) { inputRoot.value.querySelectorAll<HTMLElement>('.dsh-date-input__field')[index]?.querySelector<HTMLElement>('[role=spinbutton]')?.focus() } else { (instance.value as { focus?: (index?: number) => void } | undefined)?.focus?.(index) } } : key === 'blur' ? () => { if (inputRoot.value) { inputRoot.value.querySelector<HTMLElement>(':focus')?.blur() } else { (instance.value as { blur?: () => void } | undefined)?.blur?.() } } : (instance.value as unknown as Record<string | symbol, unknown> | undefined)?.[key], has: (_, key) => instance.value !== undefined && (key === 'focus' || key === 'blur' || key in instance.value) }))
      const changeVisible = (open: boolean) => { visible.value = open; call('onUpdate:popupVisible', open); call('onPopupVisibleChange', open) }
      const output = (date: Dayjs) => {
        const format = get('valueFormat') ?? (typeof get('format') === 'string' ? get('format') : 'YYYY-MM-DD')
        if (format === 'Date') { return date.toDate() }
        if (format === 'timestamp') { return date.valueOf() }
        return date.format(String(format))
      }
      return () => {
        void revision.value
        const raw = value.value
        const dates = (range ? Array.isArray(raw) ? raw : [] : [raw]).map(parse).filter((date): date is Dayjs => !!date)
        const mode = get('mode')
        const fallback = !!(get('panelRender') || get('showTime') || get('showNowBtn') === true || get('showConfirmBtn') || (get('shortcuts') as unknown[] | undefined)?.length || slots.extra || slots.cell || get('utcOffset') !== undefined || get('timezone') || mode && mode !== 'date' || Array.isArray(get('disabled')))
        const trigger = (get('triggerProps') ?? {}) as Record<string, unknown>
        const disabledDate = get('disabledDate') as ((date: Date, type?: RangeEndpoint) => boolean) | undefined
        const disabled: DisabledDay | undefined = disabledDate
          ? (date, endpoint) => disabledDate(date.toDate(), range ? endpoint : undefined)
          : undefined
        const panel = () => h(CalendarPanel, {
          range, value: dates, view: parse(first(get('pickerValue'))) ?? view.value,
          locale: theme.locale.value, weekStart: get('dayStartOfWeek') as number | undefined,
          disabled,
          onView: date => {
            if (get('pickerValue') === undefined) { view.value = date }
            const next = range ? [date, date.add(1, 'month')] : [date]
            const values = next.map(output); const native = next.map(item => item.toDate()); const formatted = next.map(item => item.format('YYYY-MM-DD'))
            call('onPickerValueChange', range ? values : values[0], range ? native : native[0], range ? formatted : formatted[0])
          },
          onSelect: (next, complete) => {
            const values = next.map(output); const native = next.map(item => item.toDate()); const formatted = next.map(item => item.format(typeof get('format') === 'string' ? String(get('format')) : 'YYYY-MM-DD'))
            if (range) { call('onSelect', values, native, formatted) }
            if (!complete) { return }
            const nextValue = range ? values : values[0]
            if (!next.every((date, index) => dates[index]?.isSame(date, 'day'))) {
              localValue.value = nextValue
              call('onUpdate:modelValue', nextValue)
              call('onChange', nextValue, range ? native : native[0], range ? formatted : formatted[0])
            }
            changeVisible(false)
          },
        })
        const format = typeof get('format') === 'string' ? String(get('format')) : theme.locale.value.startsWith('en-US') ? 'M/D/YYYY' : 'YYYY-MM-DD'
        const segmented = !fallback && !slots.default && !slots.prefix && !slots['suffix-icon'] && !get('inputProps') && /^(?:YYYY|MM?|DD?|[\/\-.\s])+$/.test(format)
        const commitInput = (next: (Dayjs | undefined)[]) => {
          if (next.length && next.some(date => !date)) { return }
          const nextValue = range ? next.map(date => date ? output(date) : undefined) : next[0] ? output(next[0]) : undefined
          localValue.value = nextValue
          call('onUpdate:modelValue', nextValue)
          call('onChange', nextValue, range ? next.map(date => date?.toDate()) : next[0]?.toDate(), range ? next.map(date => date?.format(format)) : next[0]?.format(format))
        }
        const componentSlots = segmented ? { ...slots, default: () => {
          const node = renderDateInput(factory, {
            dates: range ? [parse(Array.isArray(raw) ? raw[0] : undefined), parse(Array.isArray(raw) ? raw[1] : undefined)] : [parse(raw)],
            range, format, label: String(get('aria-label') ?? '日期'), disabled: !!get('disabled'), readonly: !!(get('readonly') || get('disabledInput')),
            open: !!(get('popupVisible') ?? visible.value), allowClear: get('allowClear') !== false, draft,
            invalidate: () => { revision.value++ }, change: commitInput, toggle: () => changeVisible(!(get('popupVisible') ?? visible.value)),
            disabledDate: disabled,
          })
          return h('div', { ref: inputRoot, class: attrs.class, style: attrs.style as Record<string, string> }, [node])
        } } : slots
        return h(Base as typeof ScopedDate, {
          ...attrs, ref: instance, modelValue: value.value as string | number | Date | undefined, popupVisible: get('popupVisible') ?? visible.value,
          triggerProps: { popupOffset: 8, ...trigger }, panelRender: fallback ? get('panelRender') : panel,
          'onUpdate:modelValue': (next: unknown) => { localValue.value = next; call('onUpdate:modelValue', next) },
          'onUpdate:popupVisible': (open: boolean) => { visible.value = open; call('onUpdate:popupVisible', open) },
          onPopupVisibleChange: (open: boolean) => { visible.value = open; call('onPopupVisibleChange', open) },
        }, componentSlots)
      }
    },
  })
  Object.assign(wrapped, { install(app: App, options?: Parameters<typeof Arco.DatePicker.install>[1]) {
    if (range) { app.component(`${options?.componentPrefix ?? 'A'}RangePicker`, wrapped); return }
    const replacements = new Map<Component, Component>([[Arco.DatePicker, wrapped], [Arco.RangePicker, RangePicker], [Arco.MonthPicker, MonthPicker], [Arco.YearPicker, YearPicker], [Arco.QuarterPicker, QuarterPicker], [Arco.WeekPicker, WeekPicker]])
    function component(name: string): Component | undefined
    function component(name: string, definition: Component): App
    function component(name: string, definition?: Component): Component | App | undefined {
      if (definition === undefined) { return app.component(name) }
      return app.component(name, replacements.get(definition) ?? definition)
    }
    Arco.DatePicker.install({ ...app, component }, options)
  } })
  return wrapped
}

/** 日期、范围与键盘选择保留 Arco 外层输入和公开事件。 */
export const RangePicker = createPicker(true) as unknown as typeof Arco.RangePicker
export const DateRangePicker = RangePicker
export const DatePicker = Object.assign(createPicker(false), { RangePicker, MonthPicker, YearPicker, QuarterPicker, WeekPicker }) as unknown as typeof Arco.DatePicker

/** 卡片日历共享日期选择器的网格；自定义单元格与完整日历模式仍由 Arco 渲染。 */
export const Calendar = Object.assign(defineComponent({
  name: 'DshCalendar', inheritAttrs: false,
  setup(_, { attrs, slots }) {
    const { locale } = useDshTheme()
    const config = inject(configProviderInjectionKey, undefined)
    const get = (key: string) => attrs[key] ?? attrs[key.replace(/[A-Z]/g, char => `-${char.toLowerCase()}`)]
    const local = shallowRef(pickerDate(get('defaultValue')) ?? dayjs().startOf('day'))
    const view = shallowRef(pickerDate(get('defaultPageShowDate')) ?? pickerDate(get('modelValue')) ?? local.value)
    const call = (key: string, date: Date) => {
      const listeners = attrs[key]
      for (const listener of Array.isArray(listeners) ? listeners : [listeners]) { if (typeof listener === 'function') { listener(date) } }
    }
    return () => {
      const language = config?.locale?.locale ?? locale.value
      const words = config?.locale?.calendar
      const standardWords = language === 'en-US' ? { month: 'MMM YYYY', year: 'YYYY', days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] } : language === 'zh-CN' ? { month: 'YYYY 年 MM 月', year: 'YYYY 年', days: ['日', '一', '二', '三', '四', '五', '六'] } : undefined
      const customWords = words && (!standardWords || words.formatMonth !== standardWords.month || words.formatYear !== standardWords.year || (['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const).some((key, index) => words.week?.short?.[key] !== standardWords.days[index]) || Array.from({ length: 12 }, (_, month) => new Date(2020, month, 1)).some(date => (words.month?.long as Record<string, string> | undefined)?.[new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)] !== new Intl.DateTimeFormat(language, { month: 'long' }).format(date)))
      const fallback = get('panel') === undefined || get('panel') === false || (get('mode') ?? get('defaultMode') ?? 'month') !== 'month' || ['headerRender', 'dateRender', 'dateInnerContent', 'monthRender', 'panelOperations', 'panelWidth'].some(key => get(key) !== undefined) || !!get('panelTodayBtn') || !!get('isWeek') || customWords || config?.rtl || config?.prefixCls && config.prefixCls !== 'arco' || Object.keys(slots).length > 0
      if (fallback) { return h(Arco.Calendar, attrs, slots) }
      const value = pickerDate(get('modelValue')) ?? local.value
      const rootAttrs = Object.fromEntries(Object.entries(attrs).filter(([key]) => ['id', 'title', 'role', 'tabindex'].includes(key) || /^(aria-|data-)/.test(key) || /^on[A-Z]/.test(key) && !['onChange', 'onPanelChange', 'onUpdate:modelValue'].includes(key)))
      return h('div', { ...rootAttrs, class: ['arco-calendar dsh-hero-calendar', attrs.class], style: attrs.style as Record<string, string> }, [h(CalendarPanel, {
        standalone: true, range: false, value: [value], view: pickerDate(get('pageShowDate')) ?? view.value, locale: config?.locale?.locale ?? locale.value,
        weekStart: get('dayStartOfWeek') as number | undefined ?? 0, disabled: date => !!(get('disabledDate') as ((date: Dayjs) => boolean) | undefined)?.(date),
        onView: date => { if (get('pageShowDate') === undefined) { view.value = date }; call('onPanelChange', date.toDate()) },
        onSelect: dates => {
          if (get('allowSelect') === false) { return }
          const date = dates[0]!
          local.value = date
          if (get('pageShowDate') === undefined) { view.value = date }
          call('onUpdate:modelValue', date.toDate()); call('onChange', date.toDate()); call('onPanelChange', date.toDate())
        },
      })])
    }
  },
}), { install(app: App, options?: Parameters<typeof Arco.Calendar.install>[1]) {
  function component(name: string): Component | undefined
  function component(name: string, definition: Component): App
  function component(name: string, definition?: Component): Component | App | undefined {
    if (definition === undefined) { return app.component(name) }
    return app.component(name, definition === Arco.Calendar ? Calendar : definition)
  }
  Arco.Calendar.install({ ...app, component }, options)
} }) as unknown as typeof Arco.Calendar

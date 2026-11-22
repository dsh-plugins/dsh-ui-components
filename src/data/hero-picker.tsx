import * as React from 'react'
import dayjs, { type Dayjs } from 'dayjs'
import { Arco as HostArco } from '@dsh-plugin/dsh-loader/client'
import { wrapScopedPopup } from '../foundation/scoped-popup.js'
import { componentProps } from '../foundation/component-props.js'
import { renderDateInput, type DateInputDraft } from './date-input.js'
import { calendarWeekStart, orderedRange, pickerDate, renderCalendar, validDateRange, type CalendarFactory } from './picker-model.js'

const ScopedDate = wrapScopedPopup(HostArco.DatePicker) as unknown as React.ForwardRefExoticComponent<DateProps & React.RefAttributes<{ focus: () => void; blur: () => void }>>
const ScopedRange = wrapScopedPopup(HostArco.DatePicker.RangePicker)
type DateProps = React.ComponentPropsWithoutRef<typeof HostArco.DatePicker> & { id?: string }
type RangeProps = React.ComponentPropsWithoutRef<typeof HostArco.DatePicker.RangePicker> & { id?: string }
const factory: CalendarFactory<React.ReactNode> = (tag, props, ...children) => React.createElement(tag, props, ...children)

function CalendarPanel({ range, value, view, locale, weekStart, disabled, onSelect, onView, standalone = false }: {
  range: boolean; value: Dayjs[]; view: Dayjs; locale: string; weekStart?: number;
  disabled?: (date: Dayjs) => boolean; onSelect: (dates: Dayjs[], complete: boolean) => void; onView: (date: Dayjs) => void; standalone?: boolean
}): React.ReactElement {
  const [month, setMonth] = React.useState(view.startOf('month'))
  const [focused, setFocused] = React.useState(value.at(-1) ?? view)
  const [yearOpen, setYearOpen] = React.useState(false)
  const [anchor, setAnchor] = React.useState<Dayjs>()
  const [hover, setHover] = React.useState<Dayjs>()
  const root = React.useRef<HTMLDivElement>(null)
  const dateFocus = React.useRef<HTMLElement | null>(null)
  const previousYearOpen = React.useRef(yearOpen)
  React.useLayoutEffect(() => {
    const previous = dateFocus.current
    const active = document.activeElement
    if (previous && (active === previous || active === document.body && (!previous.isConnected || previous.matches(':disabled')))) {
      const target = root.current?.querySelector<HTMLButtonElement>('.dsh-calendar__cell[tabindex="0"]') ?? root.current?.querySelector<HTMLButtonElement>('.dsh-calendar__year-trigger, .dsh-calendar__heading')
      if (target !== active) { target?.focus({ preventScroll: true }) }
    } else if (active && !root.current?.contains(active)) { dateFocus.current = null }
  })
  React.useEffect(() => {
    setMonth(view.startOf('month'))
    setFocused(current => current.isSame(view, 'month') || (range && current.isSame(view.add(1, 'month'), 'month')) ? current : view)
  }, [view.valueOf(), range])
  React.useEffect(() => {
    if (standalone && previousYearOpen.current === yearOpen) { return }
    previousYearOpen.current = yearOpen
    const frame = requestAnimationFrame(() => {
      const target = root.current?.querySelector<HTMLButtonElement>(yearOpen ? '.dsh-calendar__year[data-selected]' : '.dsh-calendar__cell[tabindex="0"]') ?? root.current?.querySelector<HTMLButtonElement>('.dsh-calendar__year-trigger, .dsh-calendar__heading')
      target?.focus({ preventScroll: true })
      if (yearOpen) {
        const selected = root.current?.querySelector<HTMLElement>('.dsh-calendar__year[data-selected]')
        if (selected?.parentElement) { selected.parentElement.scrollTop = Math.max(0, selected.offsetTop - (selected.parentElement.clientHeight - selected.offsetHeight) / 2) }
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [yearOpen])
  const move = (date: Dayjs) => { onView(date) }
  return <div ref={root} onFocusCapture={event => { dateFocus.current = (event.target as HTMLElement).matches('.dsh-calendar__cell') ? event.target as HTMLElement : null }}
    onBlurCapture={event => {
      const target = event.target as HTMLElement
      if (event.relatedTarget) { dateFocus.current = null }
      else { queueMicrotask(() => { if (dateFocus.current === target && target.isConnected && document.activeElement !== target) { dateFocus.current = null } }) }
    }} className={`dsh-picker-popover ${range ? 'dsh-picker-popover--range' : ''} ${standalone ? 'dsh-calendar-standalone' : ''}`}>
    {renderCalendar(factory, { month, focused, selected: value, anchor, hover, range, yearOpen, locale, firstDay: weekStart ?? calendarWeekStart(locale), disabled: date => !!disabled?.(date) }, {
      month: move, focus: setFocused, year: setYearOpen, hover: date => { if (anchor) { setHover(date) } },
      yearSelect: year => { const date = month.year(year).date(Math.min(focused.date(), month.year(year).daysInMonth())); setFocused(date); move(date); setYearOpen(false) },
      select: date => {
        if (disabled?.(date)) { return }
        setFocused(date)
        if (!range) { onSelect([date], true); return }
        if (!anchor) { setAnchor(date); setHover(date); onSelect([date], false); return }
        const dates = orderedRange(anchor, date)
        if (!validDateRange(dates[0], dates[1], disabled)) { return }
        setAnchor(undefined); setHover(undefined); onSelect(dates, true)
      },
    })}
  </div>
}

/** 父组件切换已选日期时跟随到相应月份，浏览中仍可独立翻页。 */
function usePickerView(initial: () => Dayjs, selected: Dayjs | undefined) {
  const [view, setView] = React.useState(initial)
  const timestamp = selected?.valueOf()
  const previous = React.useRef(timestamp)
  React.useEffect(() => {
    if (timestamp !== undefined && timestamp !== previous.current) { setView(dayjs(timestamp)) }
    previous.current = timestamp
  }, [timestamp])
  return [view, setView] as const
}

/** 默认日期面板采用 HeroUI 布局，时间、快捷值及用户自定义面板保留 Arco 的完整实现。 */
const DateBase = React.forwardRef<React.ComponentRef<typeof ScopedRange>, DateProps>((props, ref) => {
  const inputRoot = React.useRef<HTMLDivElement>(null)
  const baseRef = React.useRef<React.ComponentRef<typeof ScopedDate>>(null)
  const [, invalidate] = React.useReducer(value => value + 1, 0)
  const draft = React.useRef<DateInputDraft>({ parts: [], source: '', buffer: '' })
  React.useImperativeHandle(ref, () => ({ focus: (index = 0) => { if (inputRoot.current) { inputRoot.current.querySelectorAll<HTMLElement>('.dsh-date-input__field')[index]?.querySelector<HTMLElement>('[role=spinbutton]')?.focus() } else { baseRef.current?.focus() } }, blur: () => { if (inputRoot.current) { inputRoot.current.querySelector<HTMLElement>(':focus')?.blur() } else { baseRef.current?.blur() } } }))
  const config = React.useContext(HostArco.ConfigProvider.ConfigContext)
  const parse = (value: unknown) => pickerDate(value, typeof props.format === 'string' ? props.format : undefined)
  const [localValue, setLocalValue] = React.useState(props.defaultValue)
  const [visible, setVisible] = React.useState(false)
  const value = props.value === undefined ? localValue : props.value
  const dates = [parse(value)].filter((date): date is Dayjs => !!date)
  const [view, setView] = usePickerView(() => parse(props.pickerValue ?? props.defaultPickerValue ?? props.value ?? props.defaultValue) ?? dayjs(), dates[0])
  const format = typeof props.format === 'string' ? props.format : 'YYYY-MM-DD'
  const fallback = !!(props.panelRender || props.showTime || props.showNowBtn === true || props.shortcuts?.length || props.extra || props.dateRender || props.utcOffset !== undefined || props.timezone)
  const onChange = (text: string, date?: Dayjs) => { setLocalValue(date); (props.onChange as ((text: string, date?: Dayjs) => void) | undefined)?.(text, date) }
  const onVisibleChange = (open?: boolean) => { setVisible(!!open); props.onVisibleChange?.(open) }
  const segmented = !fallback && props.triggerElement === undefined && !props.inputProps && typeof props.format !== 'function' && /^(?:YYYY|MM?|DD?|[\/\-.\s])+$/.test(format)
  const triggerElement = segmented ? <div ref={inputRoot} className={Array.isArray(props.className) ? props.className.join(' ') : props.className} style={props.style}>{renderDateInput(factory, {
    dates: [parse(value)], range: false, format, label: (props as { 'aria-label'?: string })['aria-label'] ?? '日期', disabled: !!props.disabled, readonly: props.editable === false,
    id: props.id, placeholder: props.placeholder, size: props.size ?? config.size,
    onClear: props.onClear, open: props.popupVisible ?? visible, allowClear: props.allowClear !== false, draft: draft.current, invalidate,
    change: next => onChange(next[0]?.format(format) ?? '', next[0]), toggle: () => onVisibleChange(!(props.popupVisible ?? visible)), disabledDate: props.disabledDate,
  })}</div> : props.triggerElement
  return <ScopedDate {...props} allowClear={props.allowClear !== false} ref={baseRef} triggerElement={triggerElement} value={value} onChange={onChange} popupVisible={props.popupVisible ?? visible} onVisibleChange={onVisibleChange}
    triggerProps={{ popupAlign: { bottom: 8, top: 8 }, ...props.triggerProps }}
    panelRender={fallback ? props.panelRender : () => <CalendarPanel range={false} value={dates} view={parse(props.pickerValue) ?? view} locale={config.locale?.locale ?? 'zh-CN'} weekStart={props.dayStartOfWeek} disabled={props.disabledDate}
      onView={date => { if (props.pickerValue === undefined) { setView(date) }; props.onPickerValueChange?.(date.format(format), date) }}
      onSelect={([date]) => { if (!date) { return }; props.onSelect?.(date.format(format), date); if (!dates[0]?.isSame(date, 'day')) { onChange(date.format(format), date) }; onVisibleChange(false) }} />} />
})

const RangeBase = React.forwardRef<React.ComponentRef<typeof HostArco.DatePicker.RangePicker>, RangeProps>((props, ref) => {
  const inputRoot = React.useRef<HTMLDivElement>(null)
  const baseRef = React.useRef<React.ComponentRef<typeof ScopedRange>>(null)
  const [, invalidate] = React.useReducer(value => value + 1, 0)
  const draft = React.useRef<DateInputDraft>({ parts: [], source: '', buffer: '' })
  React.useImperativeHandle(ref, () => ({ focus: (index = 0) => { if (inputRoot.current) { inputRoot.current.querySelectorAll<HTMLElement>('.dsh-date-input__field')[index]?.querySelector<HTMLElement>('[role=spinbutton]')?.focus() } else { baseRef.current?.focus(index) } }, blur: () => { if (inputRoot.current) { inputRoot.current.querySelector<HTMLElement>(':focus')?.blur() } else { baseRef.current?.blur() } } }))
  const config = React.useContext(HostArco.ConfigProvider.ConfigContext)
  const parse = (value: unknown) => pickerDate(value, typeof props.format === 'string' ? props.format : undefined)
  const [localValue, setLocalValue] = React.useState(props.defaultValue)
  const [visible, setVisible] = React.useState(false)
  const value = props.value === undefined ? localValue : props.value
  const dates = (value ?? []).map(parse).filter((date): date is Dayjs => !!date)
  const [view, setView] = usePickerView(() => parse(props.pickerValue?.[0] ?? props.defaultPickerValue?.[0] ?? props.value?.[0] ?? props.defaultValue?.[0]) ?? dayjs(), dates[0])
  const format = typeof props.format === 'string' ? props.format : 'YYYY-MM-DD'
  const fallback = !!(props.panelRender || props.showTime || props.shortcuts?.length || props.extra || props.dateRender || props.utcOffset !== undefined || props.timezone || (props.mode && props.mode !== 'date') || Array.isArray(props.disabled))
  const onChange: NonNullable<RangeProps['onChange']> = (text, date) => { setLocalValue(date); props.onChange?.(text, date) }
  const onVisibleChange = (open?: boolean) => { setVisible(!!open); props.onVisibleChange?.(open) }
  const segmented = !fallback && props.triggerElement === undefined && !props.inputProps && typeof props.format !== 'function' && /^(?:YYYY|MM?|DD?|[\/\-.\s])+$/.test(format)
  const triggerElement = segmented ? <div ref={inputRoot} className={Array.isArray(props.className) ? props.className.join(' ') : props.className} style={props.style}>{renderDateInput(factory, {
    dates: [parse(value?.[0]), parse(value?.[1])], range: true, format, label: (props as { 'aria-label'?: string })['aria-label'] ?? '日期范围', disabled: !!props.disabled, readonly: props.editable === false,
    id: props.id, placeholder: props.placeholder, size: props.size ?? config.size,
    onClear: props.onClear, open: props.popupVisible ?? visible, allowClear: props.allowClear !== false, draft: draft.current, invalidate,
    change: next => { if (next.every((date): date is Dayjs => !!date)) { onChange(next.map(date => date.format(format)), next) } else if (!next.length) { onChange([], []) } }, toggle: () => onVisibleChange(!(props.popupVisible ?? visible)), disabledDate: props.disabledDate,
  })}</div> : props.triggerElement
  return <ScopedRange {...props} allowClear={props.allowClear !== false} ref={baseRef} triggerElement={triggerElement} value={value} onChange={onChange} popupVisible={props.popupVisible ?? visible} onVisibleChange={onVisibleChange}
    triggerProps={{ popupAlign: { bottom: 8, top: 8 }, ...props.triggerProps }}
    panelRender={fallback ? props.panelRender : () => <CalendarPanel range value={dates} view={parse(props.pickerValue?.[0]) ?? view} locale={config.locale?.locale ?? 'zh-CN'} weekStart={props.dayStartOfWeek} disabled={props.disabledDate}
      onView={date => { if (props.pickerValue === undefined) { setView(date) }; const next = [date, date.add(1, 'month')]; props.onPickerValueChange?.(next.map(item => item.format(format)), next) }}
      onSelect={(next, complete) => { props.onSelect?.(next.map(date => date.format(format)), next, { type: complete ? 'end' : 'start' }); if (complete) { if (!next.every((date, index) => dates[index]?.isSame(date, 'day'))) { onChange(next.map(date => date.format(format)), next) }; onVisibleChange(false) } }} />} />
})

export const HeroRangePicker = RangeBase as typeof HostArco.DatePicker.RangePicker & typeof RangeBase
export const HeroDatePicker = Object.assign(DateBase, {
  RangePicker: HeroRangePicker,
  MonthPicker: wrapScopedPopup(HostArco.DatePicker.MonthPicker),
  YearPicker: wrapScopedPopup(HostArco.DatePicker.YearPicker),
  QuarterPicker: wrapScopedPopup(HostArco.DatePicker.QuarterPicker),
  WeekPicker: wrapScopedPopup(HostArco.DatePicker.WeekPicker),
}) as unknown as typeof HostArco.DatePicker

/** 卡片日历与日期选择器共享网格，完整日历及自定义渲染保留 Arco 交互。 */
export function HeroCalendar(props: React.ComponentPropsWithoutRef<typeof HostArco.Calendar>): React.ReactElement {
  const config = React.useContext(HostArco.ConfigProvider.ConfigContext)
  const options = componentProps(props, config.componentConfig?.Calendar)
  const [local, setLocal] = React.useState(() => pickerDate(options.defaultValue))
  const [view, setView] = React.useState(() => pickerDate(options.defaultPageShowDate) ?? pickerDate(options.value) ?? local ?? dayjs().startOf('day'))
  const language = config.locale?.locale ?? 'zh-CN'
  const words = config.locale?.Calendar
  const standardWords = language === 'en-US' ? { month: 'MMM YYYY', year: 'YYYY', days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] } : language === 'zh-CN' ? { month: 'YYYY 年 MM 月', year: 'YYYY 年', days: ['日', '一', '二', '三', '四', '五', '六'] } : undefined
  const customWords = words && (!standardWords || words.formatMonth !== standardWords.month || words.formatYear !== standardWords.year || ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].some((key, index) => words.week?.short?.[key] !== standardWords.days[index]) || Array.from({ length: 12 }, (_, month) => new Date(2020, month, 1)).some(date => words.month?.long?.[new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)] !== new Intl.DateTimeFormat(language, { month: 'long' }).format(date)))
  const fallback = !options.panel || (options.mode ?? options.defaultMode ?? 'month') !== 'month' || options.headerRender || options.dateRender || options.dateInnerContent || options.monthRender || options.panelTodayBtn || options.panelOperations || options.isWeek || options.panelWidth !== undefined || options.rangeValues || options.hoverRangeValues || options.onMouseEnterCell || options.onMouseLeaveCell || options.locale || customWords || config.rtl || (config.getPrefixCls?.('calendar') ?? 'arco-calendar') !== 'arco-calendar'
  if (fallback) { return <HostArco.Calendar {...props} /> }
  const value = 'value' in options ? pickerDate(options.value) : local
  const rootAttrs = Object.fromEntries(Object.entries(options).filter(([key]) => ['id', 'title', 'role', 'tabIndex'].includes(key) || /^(aria-|data-)/.test(key) || /^on[A-Z]/.test(key) && !['onChange', 'onPanelChange', 'onMouseEnterCell', 'onMouseLeaveCell'].includes(key)))
  return <div {...rootAttrs} className={['arco-calendar dsh-hero-calendar', ...(Array.isArray(options.className) ? options.className : options.className ? [options.className] : [])].join(' ')} style={options.style}><CalendarPanel standalone range={false} value={value ? [value] : []} view={pickerDate(options.pageShowDate) ?? view} locale={config.locale?.locale ?? 'zh-CN'} weekStart={options.dayStartOfWeek ?? 0} disabled={date => !!options.disabledDate?.(date)} onView={date => { if (options.pageShowDate === undefined) { setView(date) }; options.onPanelChange?.(date) }} onSelect={dates => {
    if (options.allowSelect === false) { return }
    const date = dates[0]!
    setLocal(date)
    if (options.pageShowDate === undefined) { setView(date) }
    options.onChange?.(date); options.onPanelChange?.(date)
  }} /></div>
}
HeroCalendar.displayName = 'Calendar'

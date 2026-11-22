import dayjs, { type Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'

dayjs.extend(customParseFormat)

/** 日期面板保留公历日期算术，格式化和事件值交由 Dayjs 与 Arco。 */
export function pickerDate(value: unknown, format?: string): Dayjs | undefined {
  if (value === undefined || value === null || value === '') { return undefined }
  const parsed = typeof value === 'string' && format ? dayjs(value, format, true) : undefined
  const date = parsed?.isValid() ? parsed : dayjs(value as string | number | Date | Dayjs)
  return date.isValid() ? date.startOf('day') : undefined
}

/** 日期网格包含当前月及首尾周，避免额外空周改变面板高度。 */
export function monthDays(month: Dayjs, firstDay: number): Dayjs[] {
  const first = month.startOf('month')
  const offset = (first.day() - firstDay + 7) % 7
  const start = first.subtract(offset, 'day')
  const length = Math.ceil((offset + first.daysInMonth()) / 7) * 7
  return Array.from({ length }, (_, index) => start.add(index, 'day'))
}

/** 焦点限制在可见月份内，优先原日期，再选择与其最近的可用日期。 */
export function calendarFocus(month: Dayjs, preferred: Dayjs, range: boolean, disabled: (date: Dayjs) => boolean): Dayjs | undefined {
  const first = month.startOf('month')
  const last = first.add(range ? 2 : 1, 'month').subtract(1, 'day')
  const start = preferred.isBefore(first, 'day') ? first : preferred.isAfter(last, 'day') ? last : preferred
  const length = last.diff(first, 'day')
  for (let offset = 0; offset <= length; offset++) {
    const after = start.add(offset, 'day')
    if (!after.isAfter(last, 'day') && !disabled(after)) { return after }
    const before = start.subtract(offset, 'day')
    if (offset && !before.isBefore(first, 'day') && !disabled(before)) { return before }
  }
  return undefined
}

export function orderedRange(first: Dayjs, second: Dayjs): [Dayjs, Dayjs] {
  return first.isAfter(second, 'day') ? [second, first] : [first, second]
}

export type RangeEndpoint = 'start' | 'end'
export type DisabledDay = (date: Dayjs, endpoint: RangeEndpoint) => boolean

/** 两端分别应用各自的规则，区间不能跨过完全禁用的日期。 */
export function validDateRange(start: Dayjs, end: Dayjs, disabled?: DisabledDay): boolean {
  if (end.isBefore(start, 'day')) { return false }
  if (!disabled) { return true }
  if (disabled(start, 'start') || disabled(end, 'end')) { return false }
  for (let day = start.add(1, 'day'); day.isBefore(end, 'day'); day = day.add(1, 'day')) {
    if (disabled(day, 'start') && disabled(day, 'end')) { return false }
  }
  return true
}

export function calendarWeekStart(locale: string): number {
  return /^(en-US|en-CA|ja|ko|zh-TW|zh-HK)/i.test(locale) ? 0 : 1
}

export function calendarKeyDate(date: Dayjs, key: string, firstDay: number, shift = false): Dayjs | undefined {
  switch (key) {
    case 'ArrowLeft': return date.subtract(1, 'day')
    case 'ArrowRight': return date.add(1, 'day')
    case 'ArrowUp': return date.subtract(7, 'day')
    case 'ArrowDown': return date.add(7, 'day')
    case 'Home': return date.subtract((date.day() - firstDay + 7) % 7, 'day')
    case 'End': return date.add(6 - (date.day() - firstDay + 7) % 7, 'day')
    case 'PageUp': return date.subtract(1, shift ? 'year' : 'month')
    case 'PageDown': return date.add(1, shift ? 'year' : 'month')
    default: return undefined
  }
}

export const calendarIcons = {
  previous: 'M10.53 2.97a.75.75 0 0 1 0 1.06L6.56 8l3.97 3.97a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 0',
  next: 'M5.47 2.97a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06L9.44 8 5.47 4.03a.75.75 0 0 1 0-1.06Z',
}

export interface CalendarViewState {
  month: Dayjs
  focused: Dayjs
  selected: Dayjs[]
  anchor?: Dayjs
  hover?: Dayjs
  range: boolean
  yearOpen: boolean
  locale: string
  firstDay: number
  disabled: (date: Dayjs) => boolean
}
export interface CalendarViewActions {
  select: (date: Dayjs) => void
  hover: (date: Dayjs) => void
  month: (date: Dayjs) => void
  focus: (date: Dayjs) => void
  year: (value: boolean) => void
  yearSelect: (year: number) => void
}
export type CalendarFactory<N> = (tag: string, props: Record<string, unknown>, ...children: (N | string | number | null)[]) => N

/** 两端使用相同语义结构；工厂只转换框架的 class 与事件绑定。 */
export function renderCalendar<N>(h: CalendarFactory<N>, state: CalendarViewState, actions: CalendarViewActions): N {
  const { month, range, locale, firstDay, yearOpen } = state
  const followingMonth = month.add(1, 'month')
  const monthFormatter = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' })
  const monthLabel = monthFormatter.format(month.toDate())
  const weekLabel = new Intl.DateTimeFormat(locale, { weekday: 'short' })
  const dateLabel = new Intl.DateTimeFormat(locale, { dateStyle: 'full' })
  const icon = (name: 'previous' | 'next') => h('svg', { viewBox: '0 0 16 16', width: 16, height: 16, fill: 'none', 'aria-hidden': 'true' }, h('path', { d: calendarIcons[name], fill: 'currentColor', fillRule: 'evenodd', clipRule: 'evenodd' }))
  const nav = (delta: number) => h('button', { type: 'button', className: 'dsh-calendar__nav', 'aria-label': delta < 0 ? 'Previous' : 'Next', onClick: () => actions.month(month.add(delta * (range ? 2 : 1), 'month')) }, icon(delta < 0 ? 'previous' : 'next'))
  const currentRange = state.anchor && state.hover ? orderedRange(state.anchor, state.hover) : state.selected
  const focus = calendarFocus(month, state.focused, range, state.disabled)
  const grids = Array.from({ length: range ? 2 : 1 }, (_, offset) => {
    const current = month.add(offset, 'month')
    const days = monthDays(current, firstDay)
    const rows = Array.from({ length: days.length / 7 }, (_, row) => h('tr', { key: row }, ...days.slice(row * 7, row * 7 + 7).map(date => {
      const outside = date.month() !== current.month()
      const disabled = state.disabled(date)
      const start = !outside && range && !!currentRange[0]?.isSame(date, 'day')
      const end = !outside && range && !!currentRange[1]?.isSame(date, 'day')
      const selected = !outside && (range
        ? !!(currentRange[0] && currentRange[1] && !date.isBefore(currentRange[0], 'day') && !date.isAfter(currentRange[1], 'day'))
        : !!state.selected[0]?.isSame(date, 'day'))
      const active = !outside && !disabled && !!focus?.isSame(date, 'day')
      return h('td', { key: date.format('YYYY-MM-DD'), role: 'gridcell', 'aria-selected': selected, 'aria-disabled': disabled || undefined }, h('button', {
        type: 'button', className: 'dsh-calendar__cell arco-picker-cell', 'data-date': date.format('YYYY-MM-DD'),
        'data-outside-month': outside || undefined, 'data-selected': selected || undefined,
        'data-selection-start': start || undefined, 'data-selection-end': end || undefined,
        'data-today': (!outside && date.isSame(dayjs(), 'day')) || undefined, 'data-disabled': disabled || undefined,
        'aria-label': dateLabel.format(date.toDate()), tabIndex: active && !yearOpen ? 0 : -1, disabled,
        onClick: () => actions.select(date), onMouseEnter: (event: MouseEvent) => { actions.hover(date); if (state.anchor && !disabled) { actions.focus(date); (event.currentTarget as HTMLElement).focus({ preventScroll: true }) } }, onFocus: () => actions.focus(date),
        onKeyDown: (event: KeyboardEvent) => {
          const target = calendarKeyDate(date, event.key, firstDay, event.shiftKey)
          if (!target) { return }
          event.preventDefault()
          if (state.disabled(target)) { return }
          actions.focus(target)
          if (!target.isSame(month, 'month') && !(range && target.isSame(followingMonth, 'month'))) { actions.month(target.startOf('month')) }
          requestAnimationFrame(() => {
            const root = (event.target as HTMLElement).closest('.dsh-calendar')
            root?.querySelector<HTMLButtonElement>(`[data-date="${target.format('YYYY-MM-DD')}"]:not([data-outside-month])`)?.focus()
          })
        },
      }, range ? h('span', { className: 'dsh-calendar__cell-button' }, date.date()) : String(date.date())))
    })))
    return h('table', { className: 'dsh-calendar__grid', key: offset, role: 'grid', 'aria-label': monthFormatter.format(current.toDate()) },
      h('thead', {}, h('tr', {}, ...days.slice(0, 7).map(date => h('th', { className: 'dsh-calendar__weekday', key: date.day(), scope: 'col' }, weekLabel.format(date.toDate()))))), h('tbody', {}, ...rows))
  })
  const title = range
    ? h('button', { type: 'button', className: 'dsh-calendar__heading', 'aria-expanded': yearOpen, onClick: () => actions.year(!yearOpen) }, monthLabel)
    : h('button', { type: 'button', className: 'dsh-calendar__year-trigger arco-picker-header-label', 'aria-expanded': yearOpen, 'data-open': yearOpen || undefined, onClick: () => actions.year(!yearOpen) }, h('span', {}, monthLabel), icon('next'))
  const nextTitle = range ? h('span', { className: 'dsh-calendar__heading dsh-calendar__heading--next' }, monthFormatter.format(followingMonth.toDate())) : null
  const firstYear = Math.min(1900, Math.floor(month.year() / 100) * 100)
  const lastYear = Math.max(2099, Math.floor(month.year() / 100) * 100 + 99)
  const yearGrid = yearOpen ? h('div', { className: 'dsh-calendar__years', role: 'listbox', 'aria-label': 'Year', tabIndex: -1, style: { top: '40px', height: `${28 + monthDays(month, firstDay).length / 7 * 36}px` } }, ...Array.from({ length: lastYear - firstYear + 1 }, (_, index) => {
    const year = firstYear + index
    return h('button', {
      key: year, type: 'button', className: 'dsh-calendar__year', role: 'option', 'data-year': year,
      'aria-selected': year === month.year(), 'data-selected': year === month.year() || undefined,
      tabIndex: year === month.year() ? 0 : -1, onClick: () => actions.yearSelect(year),
      onKeyDown: (event: KeyboardEvent) => {
        if (event.key === 'Escape') { event.preventDefault(); actions.year(false); return }
        const offset = ({ ArrowLeft: -1, ArrowRight: 1, ArrowUp: -3, ArrowDown: 3 } as Record<string, number>)[event.key]
        if (offset === undefined && event.key !== 'Home' && event.key !== 'End') { return }
        event.preventDefault()
        const target = event.key === 'Home' ? firstYear : event.key === 'End' ? lastYear : Math.max(firstYear, Math.min(lastYear, year + (offset ?? 0)))
        ;(event.target as HTMLElement).closest('.dsh-calendar__years')?.querySelector<HTMLButtonElement>(`[data-year="${target}"]`)?.focus()
      },
    }, year)
  })) : null
  return h('div', { className: `dsh-calendar${range ? ' dsh-calendar--range' : ''}`, 'data-year-open': yearOpen || undefined },
    h('div', { className: 'dsh-calendar__header' }, nav(-1), title, nextTitle, nav(1)),
    h('div', { className: 'dsh-calendar__grids' }, ...grids), yearGrid)
}

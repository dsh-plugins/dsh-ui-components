import dayjs, { type Dayjs } from 'dayjs'
import { validDateRange, type CalendarFactory, type DisabledDay } from './picker-model.js'

type DateUnit = 'year' | 'month' | 'day'
type DateParts = Partial<Record<DateUnit, number>>

/** 分段输入按格式排列，日期计算始终限制在公历有效范围内。 */
export function dateSegments(format: string): { unit?: DateUnit; text: string }[] {
  return (format.match(/YYYY|MM?|DD?|\[[^\]]*\]|./g) ?? []).map(text => ({
    unit: text === 'YYYY' ? 'year' : /^M+$/.test(text) ? 'month' : /^D+$/.test(text) ? 'day' : undefined,
    text: text.startsWith('[') ? text.slice(1, -1) : text,
  }))
}

export function dateFromParts(parts: DateParts): Dayjs | undefined {
  if (parts.year === undefined || parts.month === undefined || parts.day === undefined) { return undefined }
  const month = dayjs().date(1).year(Math.max(1, Math.min(9999, parts.year))).month(Math.max(1, Math.min(12, parts.month)) - 1)
  return month.date(Math.max(1, Math.min(parts.day, month.daysInMonth()))).startOf('day')
}

/** 编辑草稿独立于受控值，允许空日期逐段录入后再提交完整日期。 */
export interface DateInputDraft {
  parts: DateParts[]
  source: string
  buffer: string
  target?: string
}

export interface DateInputOptions {
  dates: (Dayjs | undefined)[]
  range: boolean
  format: string
  label: string
  id?: string
  size?: string
  placeholder?: string | readonly string[]
  onClear?: () => void
  disabled: boolean
  readonly: boolean
  open: boolean
  allowClear: boolean
  draft: DateInputDraft
  invalidate: () => void
  change: (dates: (Dayjs | undefined)[]) => void
  toggle: () => void
  disabledDate?: DisabledDay
}

/** 两个框架共享输入语义，Arco Trigger 继续负责定位与关闭。 */
export function renderDateInput<N>(h: CalendarFactory<N>, options: DateInputOptions): N {
  const { dates, range, draft, disabled, readonly } = options
  const source = dates.map(date => date?.format('YYYY-MM-DD') ?? '').join('/')
  if (source !== draft.source) {
    draft.source = source
    draft.parts = dates.map(date => date ? { year: date.year(), month: date.month() + 1, day: date.date() } : {})
  }
  const change = (index: number, unit: DateUnit, value: number | undefined) => {
    const parts = draft.parts[index] ??= {}
    parts[unit] = value
    const next = dateFromParts(parts)
    if (next && !options.disabledDate?.(next, index === 0 ? 'start' : 'end')) {
      const result = Array.from({ length: range ? 2 : 1 }, (_, slot) => dateFromParts(draft.parts[slot] ?? {}))
      result[index] = next
      const [start, end] = result
      if (!range || (start && end && validDateRange(start, end, options.disabledDate))) { options.change(result) }
    }
    if (value === undefined && dates[index]) { options.change([]) }
    options.invalidate()
  }
  const move = (target: HTMLElement, delta: number) => {
    const group = target.closest('.dsh-date-input')
    const fields = Array.from(group?.querySelectorAll<HTMLElement>('[role=spinbutton]') ?? [])
    fields[fields.indexOf(target) + delta]?.focus()
  }
  const fields = Array.from({ length: range ? 2 : 1 }, (_, index) => {
    const placeholder = typeof options.placeholder === 'string' ? options.placeholder : options.placeholder?.[index]
    const empty = Object.values(draft.parts[index] ?? {}).every(part => part === undefined)
    return h('div', { className: 'dsh-date-input__field', key: index, 'data-placeholder': empty && placeholder || undefined }, ...dateSegments(options.format).map(({ unit, text }, part) => {
      if (!unit) { return h('span', { key: part, className: 'dsh-date-input__literal', 'aria-hidden': true }, text) }
      const parts = draft.parts[index] ??= {}
      const value = parts[unit]
      const max = unit === 'year' ? 9999 : unit === 'month' ? 12 : dateFromParts({ year: parts.year ?? 2000, month: parts.month ?? 1, day: 1 })!.daysInMonth()
      const id = `${index}-${unit}`
      const type = (data: string, target: HTMLElement) => {
        if (disabled || readonly || !/^\d+$/.test(data)) { return }
        const buffer = (draft.target === id ? draft.buffer : '') + data
        const next = Number(buffer) > max ? data : buffer
        draft.target = id
        draft.buffer = next
        if (Number(next) > 0) { change(index, unit, Math.min(max, Number(next))) }
        if (next.length >= (unit === 'year' ? 4 : 2) || Number(next + '0') > max) { draft.buffer = ''; move(target, 1) }
      }
      return h('span', {
        key: part, className: 'dsh-date-input__segment', role: 'spinbutton', tabIndex: disabled ? -1 : 0,
        contentEditable: !disabled && !readonly, suppressContentEditableWarning: true, spellCheck: false, inputMode: 'numeric',
        'aria-label': `${unit}, ${options.label}${range ? index === 0 ? ', start' : ', end' : ''}`,
        'aria-valuenow': value, 'aria-valuemin': 1, 'aria-valuemax': max, 'aria-disabled': disabled || undefined, 'aria-readonly': readonly || undefined,
        'data-placeholder': value === undefined || undefined,
        onFocus: () => { draft.target = id; draft.buffer = '' },
        onClick: (event: Event) => event.stopPropagation(),
        onBeforeInput: (event: InputEvent & { nativeEvent?: InputEvent }) => { event.preventDefault(); type(event.data ?? event.nativeEvent?.data ?? '', event.target as HTMLElement) },
        onPaste: (event: ClipboardEvent) => { event.preventDefault(); type(event.clipboardData?.getData('text') ?? '', event.target as HTMLElement) },
        onKeyDown: (event: KeyboardEvent) => {
          if (event.altKey && event.key === 'ArrowDown') { event.preventDefault(); options.toggle(); return }
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); move(event.target as HTMLElement, event.key === 'ArrowLeft' ? -1 : 1); return }
          if (disabled || readonly) { return }
          if (/^\d$/.test(event.key)) { event.preventDefault(); type(event.key, event.target as HTMLElement); return }
          if (event.key === 'Backspace' || event.key === 'Delete') { event.preventDefault(); draft.buffer = ''; change(index, unit, undefined); return }
          if (['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
            event.preventDefault(); draft.buffer = ''
            const next = event.key === 'Home' ? 1 : event.key === 'End' ? max : (value ?? 0) + (event.key === 'ArrowUp' ? 1 : -1)
            change(index, unit, next < 1 ? max : next > max ? 1 : next)
          }
        },
      }, value === undefined ? unit === 'year' ? 'yyyy' : unit === 'month' ? 'mm' : 'dd' : String(value).padStart(text.length, '0'))
    }))
  })
  const children: N[] = [fields[0]!]
  if (range) { children.push(h('span', { className: 'dsh-date-input__separator', 'aria-hidden': true }, '-'), fields[1]!) }
  children.push(h('button', { type: 'button', className: 'dsh-date-input__trigger', id: options.id, disabled, 'aria-label': 'Calendar', 'aria-haspopup': 'dialog', 'aria-expanded': options.open,
    onClick: (event: Event) => { event.stopPropagation(); options.toggle() },
  }, h('span', { className: 'dsh-date-input__indicator' }, h('svg', { viewBox: '0 0 13 14', width: 14, height: 14, fill: 'none', 'aria-hidden': true }, h('path', { fill: 'currentColor', fillRule: 'evenodd', clipRule: 'evenodd', d: 'M3.75 4.5A.75.75 0 0 1 3 3.75v-.748a1.5 1.5 0 0 0-1.5 1.5v1h10v-1a1.5 1.5 0 0 0-1.5-1.5v.75a.75.75 0 1 1-1.5 0v-.75h-4v.747a.75.75 0 0 1-.75.75ZM8.5 1.501h-4V.75a.75.75 0 0 0-1.5 0v.752a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3v-.75a.75.75 0 0 0-1.5 0v.75Zm-7 5.5v3.5a1.5 1.5 0 0 0 1.5 1.5h7a1.5 1.5 0 0 0 1.5-1.5v-3.5h-10Z' })))))
  if (options.allowClear && dates.some(Boolean) && !readonly && !disabled) {
    children.push(h('button', { type: 'button', className: 'dsh-date-input__clear', 'aria-label': 'Clear', onClick: (event: Event) => { event.stopPropagation(); options.change([]); options.onClear?.() } }, '×'))
  }
  return h('div', { className: 'dsh-date-input', role: 'group', 'aria-label': options.label, 'data-size': options.size, 'data-disabled': disabled || undefined,
    onBlur: (event: FocusEvent) => {
      if (!(event.relatedTarget instanceof Node) || !(event.currentTarget as HTMLElement).contains(event.relatedTarget)) {
        draft.source = '\0'; draft.buffer = ''; options.invalidate()
      }
    },
    onClick: () => { if (!disabled && !readonly) { options.toggle() } } }, ...children)
}

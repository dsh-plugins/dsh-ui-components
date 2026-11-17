import { describe, expect, it } from 'vitest'
import dayjs from 'dayjs'
import { calendarFocus, calendarKeyDate, monthDays, orderedRange, pickerDate } from '../../src/vue/picker-model.js'
import { dateFromParts, dateSegments } from '../../src/vue/date-input.js'

describe('日期面板的日历边界', () => {
  it('只保留与当前月相交的周，并包含闰日', () => {
    const november = monthDays(dayjs('2026-11-16'), 0)
    expect(november).toHaveLength(35)
    expect(november[0]?.format('YYYY-MM-DD')).toBe('2026-11-01')
    expect(november.at(-1)?.format('YYYY-MM-DD')).toBe('2026-12-05')
    const leap = monthDays(dayjs('2024-02-01'), 1)
    expect(leap.filter(day => day.month() === 1)).toHaveLength(29)
    expect(monthDays(dayjs('2026-05-01'), 0)).toHaveLength(42)
  })
  it('可见月份内避开禁用日期，并允许全部禁用时无日期入口', () => {
    const month = dayjs('2026-12-01')
    const disabled = (date: dayjs.Dayjs) => date.date() === 1
    expect(calendarFocus(month, dayjs('2026-11-16'), false, disabled)?.format('YYYY-MM-DD')).toBe('2026-12-02')
    expect(calendarFocus(month, dayjs('2027-01-04'), true, disabled)?.format('YYYY-MM-DD')).toBe('2027-01-04')
    expect(calendarFocus(month, dayjs('2026-12-31'), false, date => date.date() >= 30)?.format('YYYY-MM-DD')).toBe('2026-12-29')
    expect(calendarFocus(month, month, false, () => true)).toBeUndefined()
  })
  it('跨月键盘导航保持有效日期并尊重周起始日', () => {
    const date = dayjs('2026-01-31')
    expect(calendarKeyDate(date, 'PageDown', 0)?.format('YYYY-MM-DD')).toBe('2026-02-28')
    expect(calendarKeyDate(dayjs('2026-11-18'), 'Home', 1)?.format('YYYY-MM-DD')).toBe('2026-11-16')
    expect(calendarKeyDate(dayjs('2026-11-18'), 'End', 1)?.format('YYYY-MM-DD')).toBe('2026-11-22')
  })
  it('反向范围选择返回有序日期，空值不变成当天', () => {
    expect(orderedRange(dayjs('2026-11-16'), dayjs('2026-11-12')).map(date => date.format('YYYY-MM-DD'))).toEqual(['2026-11-12', '2026-11-16'])
    expect(pickerDate(undefined)).toBeUndefined()
    expect(pickerDate('')).toBeUndefined()
  })
  it('按显示格式严格回读，键盘跨年后保留月末边界', () => {
    expect(pickerDate('16/11/2026', 'DD/MM/YYYY')?.format('YYYY-MM-DD')).toBe('2026-11-16')
    expect(calendarKeyDate(dayjs('2024-02-29'), 'PageDown', 0, true)?.format('YYYY-MM-DD')).toBe('2025-02-28')
    expect(calendarKeyDate(dayjs('2026-12-31'), 'ArrowRight', 0)?.format('YYYY-MM-DD')).toBe('2027-01-01')
  })
  it('分段格式保留字面量，完整日期限制在有效公历范围内', () => {
    expect(dateSegments('YYYY[年]M[月]D[日]')).toEqual([
      { unit: 'year', text: 'YYYY' }, { unit: undefined, text: '年' },
      { unit: 'month', text: 'M' }, { unit: undefined, text: '月' },
      { unit: 'day', text: 'D' }, { unit: undefined, text: '日' },
    ])
    expect(dateFromParts({ year: 2024, month: 2, day: 31 })?.format('YYYY-MM-DD')).toBe('2024-02-29')
    expect(dateFromParts({ year: 2026, month: 2, day: 29 })?.format('YYYY-MM-DD')).toBe('2026-02-28')
    expect(dateFromParts({ year: 2026, month: 13, day: 31 })?.format('YYYY-MM-DD')).toBe('2026-12-31')
    expect(dateFromParts({ year: 2026, month: 0, day: 0 })?.format('YYYY-MM-DD')).toBe('2026-01-01')
    expect(dateFromParts({ year: 2026, month: 2 })).toBeUndefined()
  })
})

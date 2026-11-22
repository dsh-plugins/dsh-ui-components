import dayjs from 'dayjs'
import { describe, expect, it } from 'vitest'
import { validDateRange } from '../src/data/picker-model.js'

describe('date range validation', () => {
  const start = dayjs('2026-01-10')
  const end = dayjs('2026-01-12')

  it('rejects a reversed range and a disabled day inside the range', () => {
    expect(validDateRange(end, start)).toBe(false)
    expect(validDateRange(start, end, day => day.date() === 11)).toBe(false)
  })

  it('uses the role of each endpoint and allows interior days excluded for just one role', () => {
    expect(validDateRange(start, end, (day, role) => role === 'end' && day.date() === 12)).toBe(false)
    expect(validDateRange(start, end, (day, role) => role === 'end' && day.date() < 12)).toBe(true)
  })
})

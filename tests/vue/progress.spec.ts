import { describe, expect, it } from 'vitest'
import { progressRatio } from '../../src/vue/progress.js'

describe('进度值域归一化', () => {
  it('支持偏移值域并限制越界值', () => {
    expect(progressRatio(15, 10, 30)).toBe(0.25)
    expect(progressRatio(-1, 10, 30)).toBe(0)
    expect(progressRatio(40, 10, 30)).toBe(1)
    expect(progressRatio(undefined, 10, 30)).toBe(0)
  })
  it('拒绝空值域与非有限值', () => {
    expect(() => progressRatio(1, 10, 10)).toThrow(RangeError)
    expect(() => progressRatio(Number.NaN, 0, 100)).toThrow(RangeError)
    expect(() => progressRatio(1, 0, Infinity)).toThrow(RangeError)
  })
})

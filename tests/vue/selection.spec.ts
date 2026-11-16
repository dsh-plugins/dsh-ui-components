import { describe, expect, it } from 'vitest'
import { findByText, insertOtp, nextEnabledIndex, normalizeOtp, toggleSelection } from '../../src/vue/selection-model.js'

const options = [
  { value: 'alpha', label: 'Alpha' },
  { value: 'beta', label: 'Beta', disabled: true },
  { value: 'gamma', label: 'Gamma' },
  { value: 'alpine', label: 'Alpine' },
]

describe('选择状态与键盘导航', () => {
  it('方向导航跳过禁用项，按配置循环或停留在边界', () => {
    expect(nextEnabledIndex(options, 0, 'ArrowDown')).toBe(2)
    expect(nextEnabledIndex(options, 0, 'ArrowUp')).toBe(3)
    expect(nextEnabledIndex(options, 0, 'ArrowUp', false)).toBe(0)
    expect(nextEnabledIndex(options, 2, 'Home')).toBe(0)
    expect(nextEnabledIndex(options, -1, 'End')).toBe(3)
    expect(nextEnabledIndex(options.map(option => ({ ...option, disabled: true })), 0, 'Home')).toBe(-1)
    expect(nextEnabledIndex([], -1, 'ArrowDown')).toBe(-1)
  })

  it('文字检索从当前位置之后开始，并循环匹配同前缀选项', () => {
    expect(findByText(options, 0, 'AL')).toBe(3)
    expect(findByText(options, 3, 'al')).toBe(0)
    expect(findByText(options, 0, 'b')).toBe(-1)
    expect(findByText(options, 0, '')).toBe(-1)
  })

  it('多选保留顺序且不修改调用方数组，必选模式保留最后一项', () => {
    const values = ['alpha', 'gamma']
    expect(toggleSelection(values, 'alpha', true, true)).toEqual(['gamma'])
    expect(values).toEqual(['alpha', 'gamma'])
    expect(toggleSelection(['gamma'], 'gamma', true, false)).toEqual(['gamma'])
    expect(toggleSelection(['gamma'], 'alpha', true, false)).toEqual(['gamma', 'alpha'])
    expect(toggleSelection('alpha', 'alpha', false, true)).toBeUndefined()
    expect(toggleSelection('alpha', 'alpha', false, false)).toBe('alpha')
  })
})

describe('验证码文本处理', () => {
  it('数字模式过滤分隔符、保留前导零，并限制长度', () => {
    expect(normalizeOtp('00-12 34a9', 6, true)).toBe('001234')
    expect(normalizeOtp('Ab-2', 4, false)).toBe('Ab-2')
  })

  it('粘贴替换选区，并给出过滤后的光标位置', () => {
    expect(insertOtp('123456', '00-7', 1, 4, 6, true)).toEqual({ value: '100756', cursor: 4 })
    expect(insertOtp('1234', '56789', 4, 4, 6, true)).toEqual({ value: '123456', cursor: 6 })
    expect(insertOtp('1234', 'ab', 1, 3, 6, true)).toEqual({ value: '14', cursor: 1 })
  })
})

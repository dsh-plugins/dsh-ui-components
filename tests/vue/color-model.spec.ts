import { describe, expect, expectTypeOf, it } from 'vitest'
import type { ColorPicker } from '../../src/vue/color.js'
import { colorVariables } from '../../src/vue/color-model.js'

describe('颜色输入解析与 HSB 坐标', () => {
  it('展开短 Hex，并保留 Hex 透明度', () => {
    const short = colorVariables('#f008')
    const full = colorVariables('#ff000088')
    expect(short).toEqual(full)
    expect(short['--dsh-color-current']).toBe('rgb(255 0 0 / 0.5333333333333333)')
    expect(short['--dsh-color-x']).toBe('100%')
    expect(short['--dsh-color-y']).toBe('0%')
  })
  it('将逗号与空格 RGB 语法解析为相同色相', () => {
    const comma = colorVariables('rgba(0, 255, 0, 0.25)')
    expect(comma).toEqual(colorVariables('rgb(0 255 0 / 0.25)'))
    expect(comma['--dsh-color-hue']).toBe('hsl(120 100% 50%)')
    expect(comma['--dsh-color-alpha-x']).toBe('25%')
  })
  it('无彩色没有色相或饱和度，亮度由最大通道决定', () => {
    expect(colorVariables('#000')['--dsh-color-y']).toBe('100%')
    const white = colorVariables('#fff')
    expect(white['--dsh-color-x']).toBe('0%')
    expect(white['--dsh-color-y']).toBe('0%')
    expect(white['--dsh-color-hue']).toBe('hsl(0 100% 50%)')
  })
  it('禁用透明度时保持色彩与坐标，仅归一透明度', () => {
    const variables = colorVariables('#f008', true)
    expect(variables['--dsh-color-current']).toBe('rgb(255 0 0 / 1)')
    expect(variables['--dsh-color-alpha-x']).toBe('100%')
    expect(variables['--dsh-color-x']).toBe(colorVariables('#f00')['--dsh-color-x'])
  })
  it('无法解析的输入不产生视觉变量', () => {
    expect(colorVariables(undefined)).toEqual({})
    expect(colorVariables('invalid')).toEqual({})
  })
})

it('公开格式控件的布尔属性', () => {
  expectTypeOf<InstanceType<typeof ColorPicker>['$props']['showFormatControls']>().toEqualTypeOf<boolean | undefined>()
})

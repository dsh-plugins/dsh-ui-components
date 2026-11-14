// @vitest-environment jsdom
/**
 * 桥接样式表与令牌生成的行为测试。
 *
 * 断言的是对外可见的产物：样式表里必须出现宿主语义令牌、深浅主题各有一份
 * 色阶、且色阶是 Arco 能消费的 `R,G,B` 三元组形式。
 */
import { describe, expect, it } from 'vitest'
import { BRIDGE_CSS } from '../src/foundation/bridge.js'
import { ramp, mixTriple, declareRamp, STATIC, WHITE, BLACK } from '../src/foundation/palette.js'

describe('色阶生成', () => {
  it('以第 6 级为基准展开十级', () => {
    const steps = ramp([100, 150, 200])
    expect(steps).toHaveLength(10)
    expect(steps[5]).toEqual([100, 150, 200])
  })

  it('前五级向白色递进，后四级向黑色递进', () => {
    const steps = ramp([100, 100, 100])
    expect(steps[0]![0]).toBeGreaterThan(steps[4]![0]!)
    expect(steps[4]![0]).toBeGreaterThan(steps[5]![0]!)
    expect(steps[9]![0]).toBeLessThan(steps[6]![0]!)
  })

  it('混合比例取端点时返回对应颜色', () => {
    expect(mixTriple(WHITE, BLACK, 0)).toEqual([255, 255, 255])
    expect(mixTriple(WHITE, BLACK, 1)).toEqual([0, 0, 0])
  })

  it('序列化为以逗号分隔的三元组声明', () => {
    expect(declareRamp('primary', [[1, 2, 3], [4, 5, 6]])).toBe('  --primary-1: 1,2,3;\n  --primary-2: 4,5,6;')
  })
})

describe('桥接样式表', () => {
  it('把文字层级指向宿主语义令牌', () => {
    expect(BRIDGE_CSS).toContain('--color-text-1: var(--dsw-alias-label-primary')
    expect(BRIDGE_CSS).toContain('--color-text-3: var(--dsw-alias-label-tertiary')
  })

  it('把背景与边框指向层级令牌', () => {
    expect(BRIDGE_CSS).toContain('--color-bg-1: var(--dsw-alias-bg-base)')
    expect(BRIDGE_CSS).toContain('--color-border-2: var(--dsw-alias-border-l2)')
  })

  it('按 DSH 圆角标准重绑三档圆角', () => {
    expect(BRIDGE_CSS).toContain('--border-radius-small: var(--dsw-radius-sm, 8px)')
    expect(BRIDGE_CSS).toContain('--border-radius-medium: var(--dsw-radius-md, 12px)')
    expect(BRIDGE_CSS).toContain('--border-radius-large: var(--dsw-radius-lg, 16px)')
  })

  it('浮层表面使用宿主菜单材质与浮起阴影', () => {
    expect(BRIDGE_CSS).toContain('--dsw-specific-menu')
    expect(BRIDGE_CSS).toContain('--dsw-menu-backdrop-filter')
    expect(BRIDGE_CSS).toContain('var(--dsw-elevation-panel)')
  })

  it('深色主题单独提供一份色阶', () => {
    expect(BRIDGE_CSS).toContain('body[data-ds-dark-theme] .dsh-ui')
    const darkIndex = BRIDGE_CSS.indexOf('body[data-ds-dark-theme] .dsh-ui')
    expect(BRIDGE_CSS.slice(darkIndex)).toContain('--primary-6:')
  })

  it('主色取自宿主静态近黑色，而不是品牌蓝', () => {
    expect(BRIDGE_CSS).toContain(`--primary-6: ${STATIC.bluish[1000].join(',')}`)
  })

  it('主按钮走宿主自己的按钮填充令牌', () => {
    expect(BRIDGE_CSS).toContain('background-color: var(--dsw-alias-button-primary-fill)')
    expect(BRIDGE_CSS).toContain('var(--dsw-alias-button-primary-hover)')
  })

  it('危险主按钮用淡红填充配错误色文字', () => {
    expect(BRIDGE_CSS).toContain('.arco-btn-primary.arco-btn-status-danger')
    expect(BRIDGE_CSS).toContain('var(--dsw-alias-interactive-bg-hover-danger)')
    expect(BRIDGE_CSS).toContain('color: var(--dsw-alias-state-error-primary)')
  })
})

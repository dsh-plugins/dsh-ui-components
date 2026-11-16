/**
 * 色阶生成与 RGB 令牌序列化算法测试。
 *
 * 验证十级色阶的基准、递进顺序以及 Arco 所需的 RGB 三元组格式。
 */
import { describe, expect, it } from 'vitest'
import { ramp, mixTriple, declareRamp, WHITE, BLACK } from '../src/foundation/palette.js'

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

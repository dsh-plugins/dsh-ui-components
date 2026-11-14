/**
 * 组件共用的几何量。
 *
 * 尺寸取自 DSH 的圆角标准与控制件实测值：标准控件高 36、紧凑控件高 28、
 * 输入框高 32；圆角按角色取 `--dsw-radius-*` 的像素等价量。颜色一律由
 * `bridge.ts` 里的 CSS 变量承担，本文件只管尺寸与字号。
 *
 * @module @dsh-plugin/dsh-ui-components/foundation/tokens
 */

/** 组件共用的几何量，单位均为像素。 */
export const G = {
  /** 标准控件高度。 */
  controlHeight: 36,
  /** 紧凑控件高度。 */
  controlHeightSm: 28,
  /** 输入框高度，介于标准与紧凑之间。 */
  inputHeight: 32,
  /** 标准圆角，对应 `--dsw-radius-md`。 */
  radius: 12,
  /** 紧凑圆角，对应 `--dsw-radius-sm`。 */
  radiusSm: 8,
  /** 大圆角，对应 `--dsw-radius-lg`。 */
  radiusLg: 16,
  /** 卡片圆角，对应 `--dsw-radius-xl`。 */
  radiusXl: 20,
  /** 面板圆角，对应 `--dsw-radius-panel`。 */
  radiusPanel: 28,
  /** 胶囊圆角。 */
  radiusPill: 999,
  /** 正文基准字号。 */
  fontSize: 14,
  /** 说明文字字号。 */
  fontSizeSm: 12,
  /** 正文行高。 */
  lineHeight: 22,
  /** 说明文字行高。 */
  lineHeightSm: 18,
  /** 标准间距。 */
  gap: 8,
  /** 紧凑间距。 */
  gapSm: 4,
  /** 分区间距。 */
  gapLg: 16,
  /** 弹出层与窗口上下的最小留白。 */
  overlayMargin: 120,
} as const

/**
 * 计算弹出层的最大高度。
 *
 * 全局规范要求弹出层与窗口顶部、底部各留至少 {@link G.overlayMargin}，
 * 因此最大高度是视口高度减去两倍留白。
 *
 * @returns 形如 `calc(100dvh - 240px)` 的高度表达式。
 */
export function overlayMaxHeight(): string {
  return `calc(100dvh - ${G.overlayMargin * 2}px)`
}

/** 弹出层最大高度的 CSS 值。 */
export const OVERLAY_MAX_HEIGHT = overlayMaxHeight()

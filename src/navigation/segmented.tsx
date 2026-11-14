/**
 * 分段控件。
 *
 * 与 `Pill` 的差别同宿主一致：`Pill` 是一组各自独立的开关，`SegmentedControl`
 * 是少数互斥模式中的一个选择，带 tablist 键盘语义（方向键在段之间移动，只有
 * 选中段在 Tab 序列里）。
 *
 * 指示条的位置由段数与选中下标通过 CSS 变量推导，不测量 DOM。
 *
 * @module @dsh-plugin/dsh-ui-components/navigation/segmented
 */
import * as React from 'react'
import { cx } from '../foundation/style.js'
import { injectNavigationStyles } from './styles.js'

/** 一个分段。 */
export interface Segment {
  /** 该段的值。 */
  value: string
  /** 展示文本。 */
  label: React.ReactNode
  /** 不可选。 */
  disabled?: boolean
  /** 禁用原因的悬停提示。 */
  disabledReason?: string
}

/** {@link SegmentedControl} 的 props。 */
export interface SegmentedControlProps {
  /** 分段列表，至少两个。 */
  items: readonly Segment[]
  /** 当前选中的值。 */
  value: string
  /** 选中项变化时回调。 */
  onChange: (value: string) => void
  /** 列表的可访问名称。 */
  label: string
  /** id 前缀，用于生成每段的 id 与它控制的面板 id。 */
  id?: string
  /** 锁定全部段，用于有操作在途时。 */
  disabled?: boolean
  /** 撑满父容器宽度，默认按内容收缩。 */
  block?: boolean
  /** 追加类名。 */
  className?: string
}

/**
 * 一组互斥模式的分段切换。
 *
 * 每段的 id 是 `<id>-<value>`，它控制的面板 id 是 `<id>-<value>-panel`；面板
 * 由调用方渲染并用 `aria-labelledby` 指回该段。
 *
 * @param props - 见 {@link SegmentedControlProps}。
 * @returns 带 tablist 语义的分段控件。
 */
export function SegmentedControl({
  items,
  value,
  onChange,
  label,
  id,
  disabled,
  block,
  className,
}: SegmentedControlProps): React.ReactElement {
  injectNavigationStyles()

  const selectedIndex = Math.max(0, items.findIndex(item => item.value === value))

  /**
   * 方向键、Home、End 在段之间移动。
   *
   * @param event - 键盘事件。
   */
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (disabled === true) return
    const delta = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
    const enabled = items.map((item, index) => (item.disabled === true ? -1 : index)).filter(index => index >= 0)
    if (enabled.length === 0) return

    let nextIndex: number | undefined
    if (delta !== 0) {
      const position = enabled.indexOf(selectedIndex)
      const base = position >= 0 ? position : 0
      nextIndex = enabled[(base + delta + enabled.length) % enabled.length]
    } else if (event.key === 'Home') {
      nextIndex = enabled[0]
    } else if (event.key === 'End') {
      nextIndex = enabled[enabled.length - 1]
    }

    if (nextIndex === undefined) return
    event.preventDefault()
    const target = items[nextIndex]
    if (target !== undefined) onChange(target.value)
  }

  return (
    <div
      role="tablist"
      aria-label={label}
      aria-disabled={disabled === true ? true : undefined}
      className={cx('dsh-segmented', block === true && 'dsh-segmented--block', className)}
      style={
        {
          '--dsh-segment-count': items.length,
          '--dsh-segment-index': selectedIndex,
        } as React.CSSProperties
      }
      onKeyDown={onKeyDown}
    >
      <span className="dsh-segmented__indicator" aria-hidden="true" />
      {items.map(item => {
        const selected = item.value === value
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            id={id === undefined ? undefined : `${id}-${item.value}`}
            aria-selected={selected}
            aria-controls={id === undefined ? undefined : `${id}-${item.value}-panel`}
            tabIndex={selected ? 0 : -1}
            disabled={disabled === true || item.disabled === true}
            title={item.disabledReason}
            className="dsh-segmented__tab"
            onClick={() => onChange(item.value)}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}

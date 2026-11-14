/**
 * 折叠标题行与状态点。
 *
 * `DisclosureRow` 是宿主思考行、工具行那样「一行标题 + 就地展开内容」的结构；
 * `StateDot` 是列表与任务行的状态标记。
 *
 * @module @dsh-plugin/dsh-ui-components/navigation/indicator
 */
import * as React from 'react'
import { cx } from '../foundation/style.js'
import { Icon } from '../foundation/icons.js'
import { injectNavigationStyles } from './styles.js'

/** {@link DisclosureRow} 的 props。 */
export interface DisclosureRowProps {
  /** 标题。 */
  title: React.ReactNode
  /** 标题前的小图标。 */
  leading?: React.ReactNode
  /** 展开后的内容。不需要展开时省略。 */
  children?: React.ReactNode
  /** 受控展开状态；与 `onToggle` 同时提供时由调用方持有。 */
  expanded?: boolean
  /** 默认展开状态，非受控时使用。 */
  defaultExpanded?: boolean
  /** 展开状态变化时回调。 */
  onToggle?: (expanded: boolean) => void
  /** 标题行右侧的独立操作，点击它不会触发展开。 */
  accessory?: React.ReactNode
  /** 追加类名。 */
  className?: string
}

/**
 * 一行可折叠的标题。
 *
 * 展开时标题行显示向上箭头，收起时悬停显示向下箭头，与宿主的思考行一致。
 *
 * @param props - 见 {@link DisclosureRowProps}。
 * @returns 折叠行元素。
 */
export function DisclosureRow({
  title,
  leading,
  children,
  expanded,
  defaultExpanded = false,
  onToggle,
  accessory,
  className,
}: DisclosureRowProps): React.ReactElement {
  injectNavigationStyles()
  const [internal, setInternal] = React.useState(defaultExpanded)
  const open = expanded ?? internal
  const expandable = children !== undefined

  /**
   * 切换展开状态。受控与非受控都走同一入口。
   */
  const toggle = (): void => {
    if (!expandable) return
    const next = !open
    if (expanded === undefined) setInternal(next)
    onToggle?.(next)
  }

  const header = (
    <>
      {leading === undefined ? null : <span className="dsh-disclosure__leading" aria-hidden="true">{leading}</span>}
      <span className="dsh-disclosure__title">{title}</span>
      {expandable ? (
        <span className="dsh-disclosure__leading" aria-hidden="true">
          <Icon name={open ? 'ChevronUp' : 'ChevronDown'} size={14} />
        </span>
      ) : null}
    </>
  )

  return (
    <div className={cx('dsh-disclosure', className)}>
      <div className="dsh-disclosure__header">
        {expandable ? (
          <button
            type="button"
            className="dsh-disclosure__header--expandable"
            aria-expanded={open}
            onClick={toggle}
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            {header}
          </button>
        ) : (
          <span className="dsh-disclosure__header--expandable" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>{header}</span>
        )}
        {accessory}
      </div>
      {expandable && open ? <div className="dsh-disclosure__content">{children}</div> : null}
    </div>
  )
}

/** 状态点的状态。 */
export type StateDotState = 'done' | 'warning' | 'error' | 'idle' | 'ongoing'

/** {@link StateDot} 的 props。 */
export interface StateDotProps {
  /** 状态，默认 `idle`。 */
  state?: StateDotState
  /** 追加类名。 */
  className?: string
}

/**
 * 一个状态标记。
 *
 * 它是装饰元素（`aria-hidden`），名字由所在行的调用方提供；`ongoing` 渲染
 * 为持续旋转的圆环，其余状态是一枚实心圆点。
 *
 * @param props - 见 {@link StateDotProps}。
 * @returns 状态点元素。
 */
export function StateDot({ state = 'idle', className }: StateDotProps): React.ReactElement {
  injectNavigationStyles()
  return <span className={cx('dsh-state-dot', className)} data-state={state} aria-hidden="true" />
}

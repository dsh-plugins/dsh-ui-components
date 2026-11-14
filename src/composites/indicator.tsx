/**
 * 文件类型徽标与状态行。
 *
 * @module @dsh-plugin/dsh-ui-components/composites/indicator
 */
import * as React from 'react'
import { cx } from '../foundation/style.js'
import { StateDot, type StateDotState } from '../navigation/indicator.js'
import { injectCompositeStyles } from './styles.js'

/** {@link FileTypeBadge} 的 props。 */
export interface FileTypeBadgeProps {
  /**
   * 文件名或扩展名。传文件名时取其扩展名；传 `ts` 这类裸扩展名也接受。
   * 没有扩展名时显示 `file`。
   */
  name: string
  /** 追加类名。 */
  className?: string
}

/**
 * 从文件名取扩展名。
 *
 * 含点号或路径分隔符时按文件名处理；否则只有足够短的记号才当作裸扩展名
 * （`md`、`tsx`），这样 `Makefile`、`LICENSE` 这类无扩展名文件仍然得到
 * `file`。
 *
 * @param name - 文件名或裸扩展名。
 * @returns 扩展名；无扩展名时返回 `file`。
 */
function extensionOf(name: string): string {
  const trimmed = name.trim()
  if (trimmed === '') return 'file'
  if (trimmed.includes('/') || trimmed.includes('\\') || trimmed.includes('.')) {
    const base = trimmed.slice(trimmed.lastIndexOf('/') + 1, undefined)
    const dot = base.lastIndexOf('.')
    if (dot <= 0) return 'file'
    return base.slice(dot + 1)
  }
  return /^[a-z0-9]{1,5}$/i.test(trimmed) ? trimmed : 'file'
}

/**
 * 文件类型徽标，按扩展名取短标签。
 *
 * @param props - 见 {@link FileTypeBadgeProps}。
 * @returns 徽标元素。
 */
export function FileTypeBadge({ name, className }: FileTypeBadgeProps): React.ReactElement {
  injectCompositeStyles()
  const extension = extensionOf(name)
  const label = extension === '' ? 'file' : extension
  return (
    <span className={cx('dsh-file-badge', className)} aria-hidden="true">
      {label}
    </span>
  )
}

/** {@link StatusLine} 的 props。 */
export interface StatusLineProps {
  /** 状态点。 */
  state?: StateDotState
  /** 状态文字。 */
  children?: React.ReactNode
  /** 右侧的附加信息，通常是用时。 */
  time?: React.ReactNode
  /** 追加类名。 */
  className?: string
}

/**
 * 状态行：状态点、文字与右侧附加信息。
 *
 * 文字与状态点在同一基线，`time` 用等宽数字右对齐，避免计时变动时整行抖动。
 *
 * @param props - 见 {@link StatusLineProps}。
 * @returns 状态行元素。
 */
export function StatusLine({ state = 'ongoing', children, time, className }: StatusLineProps): React.ReactElement {
  injectCompositeStyles()
  return (
    <span className={cx('dsh-status-line', className)}>
      <StateDot state={state} />
      {children === undefined ? null : <span className="dsh-status-line__text">{children}</span>}
      {time === undefined ? null : <span className="dsh-status-line__time">{time}</span>}
    </span>
  )
}

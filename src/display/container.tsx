/**
 * 容器与表面类展示组件。
 *
 * @module @dsh-plugin/dsh-ui-components/display/container
 */
import * as React from 'react'
import { Arco } from '@dsh-plugin/dsh-loader/client'
import { cx } from '../foundation/style.js'
import { injectDisplayStyles } from './styles.js'

/** {@link Card} 的 props。 */
export type CardProps = Omit<React.ComponentPropsWithoutRef<typeof Arco.Card>, 'title'> & {
  /** 卡片标题，渲染在带分隔线的头部。 */
  title?: React.ReactNode
  /** 头部右侧的操作区。 */
  extra?: React.ReactNode
  /** 视觉形态。`elevated` 用描边阴影，`flat` 用极细实线边框。 */
  variant?: 'elevated' | 'flat' | 'glass'
  /** Override the glass surface opacity, from 0 to 1. */
  glassOpacity?: number
  /** 收紧内边距，用于密集列表。 */
  tight?: boolean
}

/**
 * 一张卡片。
 *
 * @param props - 见 {@link CardProps}。
 * @returns 卡片元素。
 */
export function Card({ title, extra, variant = 'elevated', tight, glassOpacity, className, style, ...rest }: CardProps): React.ReactElement {
  injectDisplayStyles()
  const glassStyle = variant === 'glass' && Number.isFinite(glassOpacity)
    ? { '--dsh-glass-opacity': glassOpacity } as React.CSSProperties
    : undefined
  return (
    <Arco.Card
      {...rest}
      title={title}
      extra={extra}
      style={glassStyle ? { ...glassStyle, ...style } : style}
      className={cx(variant === 'glass' && 'dsh-card--glass', variant === 'flat' && 'dsh-card--flat', tight === true && 'dsh-card--tight', Array.isArray(className) ? className.join(' ') : className)}
    />
  )
}

/** {@link Divider} 的 props。 */
export type DividerProps = React.ComponentPropsWithoutRef<typeof Arco.Divider>

/**
 * 一条分隔线。
 *
 * @param props - 见 {@link DividerProps}。
 * @returns 分隔线元素。
 */
export function Divider(props: DividerProps): React.ReactElement {
  injectDisplayStyles()
  return <Arco.Divider {...props} />
}

/** {@link Descriptions} 的 props。 */
export type DescriptionsProps = React.ComponentPropsWithoutRef<typeof Arco.Descriptions>

/**
 * 键值对描述列表。条目通过 `data` 数组提供，不单独导出子组件。
 *
 * @param props - 见 {@link DescriptionsProps}。
 * @returns 描述列表元素。
 */
export function Descriptions(props: DescriptionsProps): React.ReactElement {
  injectDisplayStyles()
  return <Arco.Descriptions {...props} />
}

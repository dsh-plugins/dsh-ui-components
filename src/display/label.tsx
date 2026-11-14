/**
 * 徽标类小组件：标签、可选中胶囊、头像、徽标数。
 *
 * `Tag` 与 `Pill` 的区别与宿主一致：`Tag` 是只读徽章（固定 11px 胶囊），
 * `Pill` 是可选中胶囊（24px 高、带激活态），用于视图切换与筛选。
 *
 * @module @dsh-plugin/dsh-ui-components/display/label
 */
import * as React from 'react'
import { Arco } from '@dsh-plugin/dsh-loader/client'
import { cx } from '../foundation/style.js'
import { injectDisplayStyles } from './styles.js'

/** 标签的色调。 */
export type TagTone =
  | 'neutral'
  | 'outline'
  | 'solid'
  | 'quiet'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'

/** {@link Tag} 的 props。 */
export interface TagProps {
  /** 语义色调，默认 `neutral`。 */
  tone?: TagTone
  /** 尺寸，默认 `md`。 */
  size?: 'sm' | 'md' | 'lg'
  /** 可关闭时显示关闭按钮。 */
  closable?: boolean
  /** 关闭时回调。 */
  onClose?: () => void
  /** 追加类名。 */
  className?: string
  /** 内联样式。 */
  style?: React.CSSProperties
  /** 内容。 */
  children?: React.ReactNode
}

/** DSH 色调到内联样式：状态色调自带填充与文字色，其余交给 Arco 变量。 */
const TONE_STYLE: Record<TagTone, React.CSSProperties | undefined> = {
  neutral: undefined,
  outline: {
    border: '0.5px solid var(--dsw-alias-border-l4)',
    backgroundColor: 'transparent',
    color: 'var(--dsw-alias-label-tertiary)',
  },
  solid: {
    backgroundColor: 'var(--dsw-alias-label-primary)',
    color: 'var(--dsw-alias-bg-layer-3)',
  },
  quiet: {
    backgroundColor: 'transparent',
    color: 'var(--dsw-alias-label-tertiary)',
  },
  success: {
    backgroundColor: 'color-mix(in srgb, var(--dsw-alias-state-success-primary) 10%, transparent)',
    color: 'var(--dsw-alias-state-success-primary)',
  },
  info: {
    backgroundColor: 'color-mix(in srgb, var(--dsw-alias-state-business-primary) 10%, transparent)',
    color: 'var(--dsw-alias-state-business-primary)',
  },
  warning: {
    backgroundColor: 'color-mix(in srgb, var(--dsw-alias-state-warn-primary) 12%, transparent)',
    color: 'var(--dsw-alias-state-warn-primary)',
  },
  danger: {
    backgroundColor: 'color-mix(in srgb, var(--dsw-alias-state-error-primary) 10%, transparent)',
    color: 'var(--dsw-alias-state-error-primary)',
  },
}

/** DSH 尺寸到 Arco 尺寸的映射。 */
const ARCO_SIZE: Record<'sm' | 'md' | 'lg', 'small' | 'default' | 'large'> = {
  sm: 'small',
  md: 'default',
  lg: 'large',
}

/**
 * 只读标签。
 *
 * @param props - 见 {@link TagProps}。
 * @returns 标签元素。
 */
export function Tag({ tone = 'neutral', size = 'md', closable, onClose, className, style, children }: TagProps): React.ReactElement {
  injectDisplayStyles()
  return (
    <Arco.Tag
      size={ARCO_SIZE[size]}
      closable={closable}
      onClose={onClose}
      className={className}
      style={{ ...TONE_STYLE[tone], ...style }}
    >
      {children}
    </Arco.Tag>
  )
}

/** {@link Pill} 的 props。 */
export interface PillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 选中态。 */
  active?: boolean
  /** 带前置图标。 */
  icon?: React.ReactNode
}

/**
 * 可选中胶囊，用于视图切换与筛选。
 *
 * @param props - 见 {@link PillProps}。
 * @param ref - 指向原生 `button` 元素。
 * @returns 胶囊按钮元素。
 */
export const Pill = React.forwardRef<HTMLButtonElement, PillProps>(function Pill(
  { active, icon, className, children, type, ...rest },
  ref,
) {
  injectDisplayStyles()
  return (
    <button
      {...rest}
      ref={ref}
      type={type ?? 'button'}
      aria-pressed={active === true}
      className={cx('dsh-pill', 'dsh-pill--interactive', active === true && 'dsh-pill--active', className)}
    >
      {icon}
      {children}
    </button>
  )
})

/** {@link Avatar} 的 props。 */
export type AvatarProps = React.ComponentPropsWithoutRef<typeof Arco.Avatar>

/**
 * 头像。
 *
 * @param props - 见 {@link AvatarProps}。
 * @returns 头像元素。
 */
export function Avatar(props: AvatarProps): React.ReactElement {
  injectDisplayStyles()
  return <Arco.Avatar {...props} />
}

/** {@link Badge} 的 props。 */
export type BadgeProps = React.ComponentPropsWithoutRef<typeof Arco.Badge>

/**
 * 徽标数或小红点。
 *
 * @param props - 见 {@link BadgeProps}。
 * @returns 徽标元素。
 */
export function Badge(props: BadgeProps): React.ReactElement {
  injectDisplayStyles()
  return <Arco.Badge {...props} />
}

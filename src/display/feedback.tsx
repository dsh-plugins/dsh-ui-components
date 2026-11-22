/**
 * 排版、空状态与加载占位。
 *
 * @module @dsh-plugin/dsh-ui-components/display/feedback
 */
import * as React from 'react'
import { Arco } from '@dsh-plugin/dsh-loader/client'
import { HeroSpin } from './hero-spin.js'
import { injectDisplayStyles } from './styles.js'

/** {@link Typography} 的 props。 */
export type TypographyProps = React.ComponentPropsWithoutRef<typeof Arco.Typography>

/**
 * 富文本排版容器，提供标题、段落、代码与引用样式。
 *
 * @param props - 见 {@link TypographyProps}。
 * @returns 排版元素。
 */
export function Typography(props: TypographyProps): React.ReactElement {
  injectDisplayStyles()
  return <Arco.Typography {...props} />
}

/** {@link Text} 的 props。 */
export type TextProps = React.ComponentPropsWithoutRef<typeof Arco.Typography.Text>

/**
 * 行内文本，可标记为次要、成功、警告或危险。
 *
 * @param props - 见 {@link TextProps}。
 * @returns 文本元素。
 */
export function Text(props: TextProps): React.ReactElement {
  injectDisplayStyles()
  return <Arco.Typography.Text {...props} />
}

/** {@link Paragraph} 的 props。 */
export type ParagraphProps = React.ComponentPropsWithoutRef<typeof Arco.Typography.Paragraph>

/**
 * 段落。
 *
 * @param props - 见 {@link ParagraphProps}。
 * @returns 段落元素。
 */
export function Paragraph(props: ParagraphProps): React.ReactElement {
  injectDisplayStyles()
  return <Arco.Typography.Paragraph {...props} />
}

/** {@link Empty} 的 props。 */
export type EmptyProps = React.ComponentPropsWithoutRef<typeof Arco.Empty>

/**
 * 空状态占位。
 *
 * @param props - 见 {@link EmptyProps}。
 * @returns 空状态元素。
 */
export function Empty(props: EmptyProps): React.ReactElement {
  injectDisplayStyles()
  return <Arco.Empty {...props} />
}

/** {@link Skeleton} 的 props。 */
export type SkeletonProps = React.ComponentPropsWithoutRef<typeof Arco.Skeleton>

/**
 * 骨架屏占位。
 *
 * @param props - 见 {@link SkeletonProps}。
 * @returns 骨架元素。
 */
export function Skeleton(props: SkeletonProps): React.ReactElement {
  injectDisplayStyles()
  return <Arco.Skeleton {...props} />
}

/** {@link Spin} 的 props。 */
export type SpinProps = React.ComponentPropsWithoutRef<typeof Arco.Spin> & { loadingStyle?: 'blur' }

/**
 * 加载指示器。
 *
 * @param props - 见 {@link SpinProps}。
 * @returns 加载元素。
 */
export function Spin({ loadingStyle, className, children, ...props }: SpinProps): React.ReactElement {
  injectDisplayStyles()
  if (loadingStyle !== 'blur' || children == null) {
    return <HeroSpin {...props} className={className}>{children}</HeroSpin>
  }
  return <HeroSpin {...props} className={['dsh-spin--blur', className].flat().filter(Boolean).join(' ')} aria-busy={props.loading || undefined}>
    <div {...(props.loading ? { inert: '' } : {})}>{children}</div>
  </HeroSpin>
}

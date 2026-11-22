/**
 * 其余数据展示组件：统计、时间线、日历、轮播与图片。
 *
 * @module @dsh-plugin/dsh-ui-components/data/info
 */
import * as React from 'react'
import { Arco } from '@dsh-plugin/dsh-loader/client'
import { injectDataStyles } from './styles.js'
import { useDshPopupContainer } from '../foundation/provider.js'
import { HeroCalendar } from './hero-picker.js'

/** {@link Statistic} 的 props。 */
export type StatisticProps = React.ComponentPropsWithoutRef<typeof Arco.Statistic>

/**
 * 指标数值。
 *
 * @param props - 见 {@link StatisticProps}。
 * @returns 统计元素。
 */
export function Statistic(props: StatisticProps): React.ReactElement {
  injectDataStyles()
  return <Arco.Statistic {...props} />
}

/** {@link Timeline} 的 props。 */
export type TimelineProps = React.ComponentPropsWithoutRef<typeof Arco.Timeline>

/**
 * 时间线。
 *
 * @param props - 见 {@link TimelineProps}。
 * @returns 时间线元素。
 */
function TimelineBase(props: TimelineProps): React.ReactElement {
  injectDataStyles()
  return <Arco.Timeline {...props} />
}

/** {@link TimelineItem} 的 props。 */
export type TimelineItemProps = React.ComponentPropsWithoutRef<typeof Arco.Timeline.Item>

/** 时间线节点，直接取 Arco 的原组件以保持子组件识别。 */
export const TimelineItem: typeof Arco.Timeline.Item = Arco.Timeline.Item

/** 带静态子组件的时间线导出。 */
export const Timeline: typeof TimelineBase & { Item: typeof Arco.Timeline.Item } = Object.assign(TimelineBase, {
  Item: Arco.Timeline.Item,
})

/** {@link Calendar} 的 props。 */
export type CalendarProps = React.ComponentPropsWithoutRef<typeof Arco.Calendar>

/**
 * 日历。
 *
 * @param props - 见 {@link CalendarProps}。
 * @returns 日历元素。
 */
export function Calendar(props: CalendarProps): React.ReactElement {
  injectDataStyles()
  return <HeroCalendar {...props} />
}

/** {@link Carousel} 的 props。 */
export type CarouselProps = React.ComponentPropsWithoutRef<typeof Arco.Carousel>

/**
 * 轮播。
 *
 * @param props - 见 {@link CarouselProps}。
 * @returns 轮播元素。
 */
export function Carousel(props: CarouselProps): React.ReactElement {
  injectDataStyles()
  return <Arco.Carousel {...props} />
}

/** {@link Image} 的 props。 */
export type ImageProps = React.ComponentPropsWithoutRef<typeof Arco.Image>

/**
 * 图片，带预览。
 *
 * @param props - 见 {@link ImageProps}。
 * @returns 图片元素。
 */
const ImageBase = React.forwardRef<HTMLDivElement, ImageProps>(function Image({ previewProps, ...props }, ref) {
  injectDataStyles()
  const container = useDshPopupContainer()
  return <Arco.Image {...props} ref={ref} previewProps={{ getPopupContainer: container, ...previewProps }} />
})

const ImagePreview: typeof Arco.Image.Preview = React.forwardRef(({ getPopupContainer, ...props }, ref) => {
  const container = useDshPopupContainer()
  return <Arco.Image.Preview {...props} ref={ref} getPopupContainer={getPopupContainer ?? container} />
})

const ImagePreviewGroup: typeof Arco.Image.PreviewGroup = React.forwardRef(({ getPopupContainer, ...props }, ref) => {
  const container = useDshPopupContainer()
  return <Arco.Image.PreviewGroup {...props} ref={ref} getPopupContainer={getPopupContainer ?? container} />
})

export const Image: typeof Arco.Image = Object.assign(ImageBase, { Preview: ImagePreview, PreviewGroup: ImagePreviewGroup })

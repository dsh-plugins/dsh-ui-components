/**
 * 浮层类展示组件：提示、气泡与折叠面板。
 *
 * 浮层通过 `DshProvider` 的 `getPopupContainer` 进入带皮肤变量的容器，因此
 * 即使在 `body` 层也能拿到同一套令牌。未挂 provider 时会退回 `body`，样式
 * 仍可用，只是拿不到 `.dsh-ui` 上的变量覆盖。
 *
 * @module @dsh-plugin/dsh-ui-components/display/overlay
 */
import * as React from 'react'
import { Arco } from '@dsh-plugin/dsh-loader/client'
import { injectDisplayStyles } from './styles.js'

/** {@link Tooltip} 的 props。 */
export type TooltipProps = Omit<React.ComponentPropsWithoutRef<typeof Arco.Tooltip>, 'position'> & {
  /** 相对锚点的方位，默认 `bottom`。 */
  position?: React.ComponentPropsWithoutRef<typeof Arco.Tooltip>['position']
}

/**
 * 悬停或聚焦时显示的短提示，内容应只有一行文字。
 *
 * 宿主的气泡贴着锚点、没有箭头，默认出现在下方；Arco 的默认值是上方，且四向
 * 各留 12px 并预留箭头空间，间距因此明显偏大。箭头与间距都在样式表里收掉。
 *
 * @param props - 见 {@link TooltipProps}。
 * @returns 提示元素。
 */
export function Tooltip({ position = 'bottom', ...rest }: TooltipProps): React.ReactElement {
  injectDisplayStyles()
  return <Arco.Tooltip {...rest} position={position} />
}

/** {@link Popover} 的 props。 */
export type PopoverProps = React.ComponentPropsWithoutRef<typeof Arco.Popover>

/**
 * 可承载富内容的气泡卡片。
 *
 * @param props - 见 {@link PopoverProps}。
 * @returns 气泡元素。
 */
export function Popover(props: PopoverProps): React.ReactElement {
  injectDisplayStyles()
  return <Arco.Popover {...props} />
}

/** {@link HoverCard} 的 props。 */
export type HoverCardProps = Omit<React.ComponentPropsWithoutRef<typeof Arco.Popover>, 'trigger'> & {
  /**
   * 悬停多久后显示，单位毫秒，默认 120。触屏设备上悬停不可用，因此调用方应
   * 保证同样的信息也能通过点击路径获得。
   */
  delayMs?: number
}

/**
 * 悬停预览卡片，用于在列表里展开一段只读详情。
 *
 * 与 `Popover` 的差别只在触发方式：这里固定为悬停加键盘聚焦，并且带一个很短
 * 的延迟，避免指针划过整列时连续弹层。
 *
 * @param props - 见 {@link HoverCardProps}。
 * @returns 悬停卡片元素。
 */
export function HoverCard({ delayMs = 120, triggerProps, ...rest }: HoverCardProps): React.ReactElement {
  injectDisplayStyles()
  return (
    <Arco.Popover
      {...rest}
      trigger="hover"
      triggerProps={{ ...triggerProps, mouseEnterDelay: delayMs, mouseLeaveDelay: 80 }}
    />
  )
}

/** {@link Collapse} 的 props。 */
export type CollapseProps = React.ComponentPropsWithoutRef<typeof Arco.Collapse>

/**
 * 折叠面板组。
 *
 * @param props - 见 {@link CollapseProps}。
 * @returns 折叠面板组元素。
 */
export function Collapse(props: CollapseProps): React.ReactElement {
  injectDisplayStyles()
  return <Arco.Collapse {...props} />
}

/** {@link CollapseItem} 的 props。 */
export type CollapseItemProps = React.ComponentPropsWithoutRef<typeof Arco.Collapse.Item>

/**
 * 折叠面板中的一项。
 *
 * @param props - 见 {@link CollapseItemProps}。
 * @returns 折叠面板项元素。
 */
export function CollapseItem(props: CollapseItemProps): React.ReactElement {
  injectDisplayStyles()
  return <Arco.Collapse.Item {...props} />
}

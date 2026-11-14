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
export type TooltipProps = React.ComponentPropsWithoutRef<typeof Arco.Tooltip>

/**
 * 悬停或聚焦时显示的短提示，内容应只有一行文字。
 *
 * @param props - 见 {@link TooltipProps}。
 * @returns 提示元素。
 */
export function Tooltip(props: TooltipProps): React.ReactElement {
  injectDisplayStyles()
  return <Arco.Tooltip {...props} />
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

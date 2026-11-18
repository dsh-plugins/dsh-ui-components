/**
 * 菜单、下拉与标签页。
 *
 * @module @dsh-plugin/dsh-ui-components/navigation/menu
 */
import * as React from 'react'
import { Arco } from '@dsh-plugin/dsh-loader/client'
import { cx } from '../foundation/style.js'
import { injectNavigationStyles } from './styles.js'

/** {@link Menu} 的 props。 */
export type MenuProps = React.ComponentPropsWithoutRef<typeof Arco.Menu> & {
  centered?: boolean
  itemWidth?: number | string
}

/**
 * 侧边或页面内的菜单。选中项走宿主的选择态填充。
 *
 * @param props - 见 {@link MenuProps}。
 * @returns 菜单元素。
 */
export function Menu({ centered, itemWidth, className, style, ...props }: MenuProps): React.ReactElement {
  injectNavigationStyles()
  const itemStyle = itemWidth === undefined ? style : {
    '--dsh-menu-item-width': typeof itemWidth === 'number' ? itemWidth + 'px' : itemWidth,
    ...style,
  } as React.CSSProperties
  return <Arco.Menu {...props} className={cx(Array.isArray(className) ? className.join(' ') : className, centered && 'dsh-menu--centered')} style={itemStyle} />
}

/** {@link MenuItem} 的 props。 */
export type MenuItemProps = React.ComponentPropsWithoutRef<typeof Arco.Menu.Item> & { action?: React.ReactNode }

/**
 * 菜单中的一项。
 *
 * @param props - 见 {@link MenuItemProps}。
 * @returns 菜单项元素。
 */
export function MenuItem({ action, children, disabled, ...props }: MenuItemProps): React.ReactElement {
  injectNavigationStyles()
  return <Arco.Menu.Item {...props} disabled={disabled}>{action == null ? children : (
    <div className="dsh-menu-item-content">
      <span>{children}</span>
      <span className="dsh-menu-item-action" {...(disabled ? { inert: '' } : {})} onClick={event => event.stopPropagation()} onKeyDown={event => event.stopPropagation()}>{action}</span>
    </div>
  )}</Arco.Menu.Item>
}
MenuItem.menuType = 'MenuItem'

/** {@link Dropdown} 的 props。 */
export type DropdownProps = React.ComponentPropsWithoutRef<typeof Arco.Dropdown>

/**
 * 附着在触发元素上的下拉菜单。
 *
 * @param props - 见 {@link DropdownProps}。
 * @returns 下拉元素。
 */
export function Dropdown(props: DropdownProps): React.ReactElement {
  injectNavigationStyles()
  return <Arco.Dropdown {...props} />
}

/** {@link Tabs} 的 props。 */
export type TabsProps = React.ComponentPropsWithoutRef<typeof Arco.Tabs> & {
  /**
   * 外观。`line` 是默认的下划线标签页；`segment` 渲染为胶囊分段控件，
   * 适合在少数几个模式之间切换。
   */
  appearance?: 'line' | 'segment'
}

/**
 * 标签页。
 *
 * `Tabs.TabPane` 与 Arco 本身一致，用作子页。
 *
 * @param props - 见 {@link TabsProps}。
 * @returns 标签页元素。
 */
function TabsBase({ appearance = 'line', className, ...rest }: TabsProps): React.ReactElement {
  injectNavigationStyles()
  return (
    <Arco.Tabs
      {...rest}
      className={cx(appearance === 'segment' && 'dsh-tabs--segment', Array.isArray(className) ? className.join(' ') : className)}
    />
  )
}

/** {@link TabPane} 的 props。 */
export type TabPaneProps = React.ComponentPropsWithoutRef<typeof Arco.Tabs.TabPane>

/**
 * 标签页中的一页。
 *
 * 直接取 Arco 的原组件而不是包一层：Arco 通过 `child.type` 识别子页，包一层
 * 会让识别失败并静默渲染出空标签栏。
 */
export const TabPane: typeof Arco.Tabs.TabPane = Arco.Tabs.TabPane

/** 带静态子组件的标签页导出，`<Tabs><Tabs.TabPane /></Tabs>` 可直接使用。 */
export const Tabs: typeof TabsBase & { TabPane: typeof Arco.Tabs.TabPane } = Object.assign(TabsBase, {
  TabPane: Arco.Tabs.TabPane,
})

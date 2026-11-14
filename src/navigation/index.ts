/**
 * 导航组件出口。
 *
 * @module @dsh-plugin/dsh-ui-components/navigation
 */
export { Dropdown, Menu, MenuItem, TabPane, Tabs, type DropdownProps, type MenuItemProps, type MenuProps, type TabPaneProps, type TabsProps } from './menu.js'
export {
  Breadcrumb,
  BreadcrumbItem,
  Pagination,
  Step,
  Steps,
  type BreadcrumbItemProps,
  type BreadcrumbProps,
  type PaginationProps,
  type StepProps,
  type StepsProps,
} from './hierarchy.js'
export { SegmentedControl, type Segment, type SegmentedControlProps } from './segmented.js'
export { DisclosureRow, StateDot, type DisclosureRowProps, type StateDotProps, type StateDotState } from './indicator.js'
export { NAVIGATION_CSS, injectNavigationStyles } from './styles.js'

/**
 * 页面结构与位置指示：面包屑、分页、步骤条。
 *
 * @module @dsh-plugin/dsh-ui-components/navigation/hierarchy
 */
import * as React from 'react'
import { Arco } from '@dsh-plugin/dsh-loader/client'
import { injectNavigationStyles } from './styles.js'

/** {@link Breadcrumb} 的 props。 */
export type BreadcrumbProps = React.ComponentPropsWithoutRef<typeof Arco.Breadcrumb>

/**
 * 层级路径。
 *
 * @param props - 见 {@link BreadcrumbProps}。
 * @returns 面包屑元素。
 */
export function Breadcrumb(props: BreadcrumbProps): React.ReactElement {
  injectNavigationStyles()
  return <Arco.Breadcrumb {...props} />
}

/** {@link BreadcrumbItem} 的 props。 */
export type BreadcrumbItemProps = React.ComponentPropsWithoutRef<typeof Arco.Breadcrumb.Item>

/**
 * 面包屑中的一个节点。
 *
 * @param props - 见 {@link BreadcrumbItemProps}。
 * @returns 面包屑节点元素。
 */
export function BreadcrumbItem(props: BreadcrumbItemProps): React.ReactElement {
  injectNavigationStyles()
  return <Arco.Breadcrumb.Item {...props} />
}

/** {@link Pagination} 的 props。 */
export type PaginationProps = React.ComponentPropsWithoutRef<typeof Arco.Pagination>

/**
 * 分页器。
 *
 * @param props - 见 {@link PaginationProps}。
 * @returns 分页元素。
 */
export function Pagination(props: PaginationProps): React.ReactElement {
  injectNavigationStyles()
  return <Arco.Pagination {...props} />
}

/** {@link Steps} 的 props。 */
export type StepsProps = React.ComponentPropsWithoutRef<typeof Arco.Steps>

/**
 * 步骤条。
 *
 * `<Steps.Step />` 与 Arco 本身一致，用作单步。
 *
 * @param props - 见 {@link StepsProps}。
 * @returns 步骤条元素。
 */
function StepsBase(props: StepsProps): React.ReactElement {
  injectNavigationStyles()
  return <Arco.Steps {...props} />
}

/** {@link Step} 的 props。 */
export type StepProps = React.ComponentPropsWithoutRef<typeof Arco.Steps.Step>

/**
 * 步骤条中的一步。
 *
 * 这里直接取 Arco 的原组件而不是包一层：Arco 通过 `child.type` 识别子步骤，
 * 包一层会让识别失败并静默渲染出空步骤条。
 */
export const Step = Arco.Steps.Step

/** 带静态子组件的步骤条导出。 */
export const Steps = Object.assign(StepsBase, { Step: Arco.Steps.Step })

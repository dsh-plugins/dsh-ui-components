/**
 * 表格、列表与树。
 *
 * @module @dsh-plugin/dsh-ui-components/data/collection
 */
import * as React from 'react'
import { Arco } from '@dsh-plugin/dsh-loader/client'
import { injectDataStyles } from './styles.js'

/** {@link Table} 的 props。 */
export type TableProps = React.ComponentPropsWithoutRef<typeof Arco.Table>

/**
 * 数据表格。表头用模块底色，行悬停用交互填充。
 *
 * @param props - 见 {@link TableProps}。
 * @returns 表格元素。
 */
function TableBase(props: TableProps): React.ReactElement {
  injectDataStyles()
  return <Arco.Table {...props} />
}

/**
 * 表格列配置的类型别名。
 *
 * 直接取 Arco 的列定义，避免手写一份会漂移的副本。
 */
export type TableColumn = NonNullable<TableProps['columns']>[number]

/** 带静态子组件的表格导出。 */
export const Table = TableBase

/** {@link List} 的 props。 */
export type ListProps = React.ComponentPropsWithoutRef<typeof Arco.List>

/**
 * 纵向列表。
 *
 * @param props - 见 {@link ListProps}。
 * @returns 列表元素。
 */
function ListBase(props: ListProps): React.ReactElement {
  injectDataStyles()
  return <Arco.List {...props} />
}

/** {@link ListItem} 的 props。 */
export type ListItemProps = React.ComponentPropsWithoutRef<typeof Arco.List.Item>

/** 列表项，直接取 Arco 的原组件以保持子组件识别。 */
export const ListItem = Arco.List.Item

/** 带静态子组件的列表导出。 */
export const List = Object.assign(ListBase, { Item: Arco.List.Item })

/** {@link Tree} 的 props。 */
export type TreeProps = React.ComponentPropsWithoutRef<typeof Arco.Tree>

/**
 * 树形结构。
 *
 * @param props - 见 {@link TreeProps}。
 * @returns 树元素。
 */
export function Tree(props: TreeProps): React.ReactElement {
  injectDataStyles()
  return <Arco.Tree {...props} />
}

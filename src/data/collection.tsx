/**
 * 表格、列表与树。
 *
 * @module @dsh-plugin/dsh-ui-components/data/collection
 */
import * as React from 'react'
import { Arco } from '@dsh-plugin/dsh-loader/client'
import { HeroTree } from './hero-tree.js'
import { HeroSpin } from '../display/hero-spin.js'
import { cx } from '../foundation/style.js'
import { injectDataStyles } from './styles.js'

/** {@link Table} 的 props。 */
export type TableProps = React.ComponentPropsWithoutRef<typeof Arco.Table> & {
  /** Use intrinsic column widths and horizontal overflow. */
  contentSized?: boolean
  /** Blur data rows while loading, retaining the table frame and header. */
  loadingStyle?: 'blur'
}

/**
 * 数据表格。表头用模块底色，行悬停用交互填充。
 *
 * @param props - 见 {@link TableProps}。
 * @returns 表格元素。
 */
function TableBase({ contentSized, loadingStyle, loading, scroll, className, ...props }: TableProps): React.ReactElement {
  injectDataStyles()
  const blur = loadingStyle === 'blur'
  const spin = typeof loading === 'object' ? loading : { loading }
  const busy = blur && Boolean(spin.loading)
  const delay = (typeof loading === 'object' ? loading.delay : 0) ?? 0
  const [delayElapsed, setDelayElapsed] = React.useState(false)
  React.useEffect(() => {
    setDelayElapsed(false)
    if (!busy || delay <= 0) { return }
    const timer = setTimeout(() => { setDelayElapsed(true) }, delay)
    return () => clearTimeout(timer)
  }, [busy, delay])
  const showLoading = busy && (delay <= 0 || delayElapsed)
  const table = <Arco.Table {...props}
    className={cx(Array.isArray(className) ? className.join(' ') : className, contentSized && 'dsh-table--content-sized')}
    scroll={contentSized ? { x: 'max-content', ...scroll } : scroll}
    loading={blur ? false : loading}
  />
  return blur ? <div className="dsh-table-loading" aria-busy={busy || undefined} data-loading={showLoading || undefined}>
    <div {...(busy ? { inert: '' } : {})}>{table}</div>
    {showLoading && <div className="dsh-table-loading__indicator"><HeroSpin {...spin} delay={undefined} loading /></div>}
  </div> : table
}

/**
 * 表格列配置的类型别名。
 *
 * 直接取 Arco 的列定义，避免手写一份会漂移的副本。
 */
export type TableColumn = NonNullable<TableProps['columns']>[number]

/** 带静态子组件的表格导出。 */
export const Table: typeof TableBase & Pick<typeof Arco.Table, 'Summary'> = Object.assign(TableBase, { Summary: Arco.Table.Summary })

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
export const ListItem: typeof Arco.List.Item = Arco.List.Item

/** 带静态子组件的列表导出。 */
export const List: typeof ListBase & { Item: typeof Arco.List.Item } = Object.assign(ListBase, {
  Item: Arco.List.Item,
})

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
  return <HeroTree {...props} />
}

import * as React from 'react'
import { Arco as HostArco } from '@dsh-plugin/dsh-loader/client'

const Tree = React.forwardRef<InstanceType<typeof HostArco.Tree>, React.ComponentPropsWithoutRef<typeof HostArco.Tree>>((props, ref) => <HostArco.Tree {...props} ref={ref} renderExtra={node => <>
  {props.renderExtra?.(node)}
  <svg className="dsh-tree-half-indicator" style={{ display: 'none' }} aria-hidden="true" viewBox="0 0 24 24" width={12} height={12} fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round"><line x1={21} x2={3} y1={12} y2={12}/></svg>
</>} />)

/** 半选图形通过公开 renderExtra 插入，原生 Tree 继续管理状态与实例。 */
export const HeroTree = Object.assign(Tree, { Node: HostArco.Tree.Node, SHOW_ALL: HostArco.Tree.SHOW_ALL, SHOW_PARENT: HostArco.Tree.SHOW_PARENT, SHOW_CHILD: HostArco.Tree.SHOW_CHILD }) as unknown as typeof HostArco.Tree

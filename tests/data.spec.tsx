// @vitest-environment jsdom
/**
 * 数据展示组件的行为测试。
 */
import { afterEach, describe, expect, it, vi } from 'vitest'
import * as React from 'react'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { List, Statistic, Table, Timeline, Tree } from '../src/data/index.js'

afterEach(cleanup)

describe('Table', () => {
  const data = [
    { id: 'a', name: 'dsh-loader', version: '2.0.0' },
    { id: 'b', name: 'dsh-ui-components', version: '0.1.0' },
  ]
  const columns = [
    { title: '插件', dataIndex: 'name' },
    { title: '版本', dataIndex: 'version' },
  ]

  it('渲染表头与行数据', () => {
    render(<Table rowKey="id" columns={columns} data={data} pagination={false} />)
    expect(screen.getByText('插件')).toBeTruthy()
    expect(screen.getByText('dsh-loader')).toBeTruthy()
    expect(screen.getByText('dsh-ui-components')).toBeTruthy()
  })

  it('无数据时显示空状态', () => {
    render(<Table rowKey="id" columns={columns} data={[]} pagination={false} />)
    expect(document.querySelector('.arco-table-empty-row')).toBeTruthy()
    expect(screen.getByText('暂无数据')).toBeTruthy()
  })
})

describe('List', () => {
  it('渲染列表项', () => {
    render(
      <List
        dataSource={[{ id: 'a', title: '会话记录' }, { id: 'b', title: '插件清单' }]}
        render={(item: { id: string; title: string }) => <List.Item key={item.id}>{item.title}</List.Item>}
      />,
    )
    expect(screen.getByText('会话记录')).toBeTruthy()
    expect(screen.getByText('插件清单')).toBeTruthy()
  })
})

describe('Tree', () => {
  it('渲染节点并在点击时选中', () => {
    const onSelect = vi.fn()
    render(
      <Tree
        treeData={[{ key: 'src', title: 'src', children: [{ key: 'index', title: 'index.ts' }] }]}
        onSelect={onSelect}
      />,
    )
    expect(screen.getByText('src')).toBeTruthy()
    fireEvent.click(screen.getByText('src'))
    expect(onSelect).toHaveBeenCalled()
  })
})

describe('Statistic', () => {
  it('渲染标题与数值', () => {
    render(<Statistic title="插件数" value={42} />)
    expect(screen.getByText('插件数')).toBeTruthy()
    expect(screen.getByText('42')).toBeTruthy()
  })
})

describe('Timeline', () => {
  it('渲染节点内容', () => {
    render(
      <Timeline>
        <Timeline.Item label="19:00">安装完成</Timeline.Item>
        <Timeline.Item label="19:05">已启用</Timeline.Item>
      </Timeline>,
    )
    expect(screen.getByText('安装完成')).toBeTruthy()
    expect(screen.getByText('已启用')).toBeTruthy()
  })
})

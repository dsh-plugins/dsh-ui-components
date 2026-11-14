// @vitest-environment jsdom
/**
 * 导航组件的行为测试。
 *
 * 分段控件与折叠行是本包自己实现的部分，重点断言它们的键盘语义与可访问
 * 属性；菜单与标签页把行为交给 Arco，只断言内容可见。
 */
import { afterEach, describe, expect, it, vi } from 'vitest'
import * as React from 'react'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import {
  Breadcrumb,
  BreadcrumbItem,
  DisclosureRow,
  Menu,
  MenuItem,
  Pagination,
  SegmentedControl,
  StateDot,
  Steps,
  TabPane,
  Tabs,
} from '../src/navigation/index.js'

afterEach(cleanup)

describe('Menu', () => {
  it('渲染菜单项', () => {
    render(
      <Menu mode="vertical" defaultSelectedKeys={['a']}>
        <MenuItem key="a">会话</MenuItem>
        <MenuItem key="b">插件</MenuItem>
      </Menu>,
    )
    expect(screen.getByText('会话')).toBeTruthy()
    expect(screen.getByText('插件')).toBeTruthy()
  })
})

describe('Tabs', () => {
  it('渲染标签与当前页内容', () => {
    render(
      <Tabs defaultActiveTab="a">
        <Tabs.TabPane key="a" title="常规">常规内容</Tabs.TabPane>
        <Tabs.TabPane key="b" title="高级">高级内容</Tabs.TabPane>
      </Tabs>,
    )
    expect(screen.getByText('常规')).toBeTruthy()
    expect(screen.getByText('常规内容')).toBeTruthy()
  })

  it('分段外观附加修饰类', () => {
    const { container } = render(
      <Tabs appearance="segment" defaultActiveTab="a">
        <Tabs.TabPane key="a" title="甲">内容</Tabs.TabPane>
      </Tabs>,
    )
    expect(container.querySelector('.dsh-tabs--segment')).toBeTruthy()
  })
})

describe('Breadcrumb', () => {
  it('渲染层级路径', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>设置</BreadcrumbItem>
        <BreadcrumbItem>插件</BreadcrumbItem>
      </Breadcrumb>,
    )
    expect(screen.getByText('设置')).toBeTruthy()
    expect(screen.getByText('插件')).toBeTruthy()
  })
})

describe('Pagination', () => {
  it('渲染页码并回调当前页', () => {
    const onChange = vi.fn()
    render(<Pagination total={50} pageSize={10} current={1} onChange={onChange} />)
    // 页码条目的可访问名称来自其文本内容。
    fireEvent.click(screen.getByText('2'))
    expect(onChange).toHaveBeenCalledWith(2, expect.anything())
  })
})

describe('Steps', () => {
  it('渲染步骤标题', () => {
    render(
      <Steps current={1}>
        <Steps.Step title="选择目录" />
        <Steps.Step title="确认安装" />
      </Steps>,
    )
    expect(screen.getByText('选择目录')).toBeTruthy()
    expect(screen.getByText('确认安装')).toBeTruthy()
  })
})

describe('SegmentedControl', () => {
  const items = [
    { value: 'list', label: '列表' },
    { value: 'grid', label: '网格' },
  ]

  it('把选中状态暴露给辅助技术', () => {
    render(<SegmentedControl items={items} value="grid" onChange={() => {}} label="视图" />)
    expect(screen.getByRole('tab', { name: '列表' }).getAttribute('aria-selected')).toBe('false')
    expect(screen.getByRole('tab', { name: '网格' }).getAttribute('aria-selected')).toBe('true')
  })

  it('只有选中段在 Tab 序列里', () => {
    render(<SegmentedControl items={items} value="list" onChange={() => {}} label="视图" />)
    expect(screen.getByRole('tab', { name: '列表' }).getAttribute('tabindex')).toBe('0')
    expect(screen.getByRole('tab', { name: '网格' }).getAttribute('tabindex')).toBe('-1')
  })

  it('点击切换选中值', () => {
    const onChange = vi.fn()
    render(<SegmentedControl items={items} value="list" onChange={onChange} label="视图" />)
    fireEvent.click(screen.getByRole('tab', { name: '网格' }))
    expect(onChange).toHaveBeenCalledWith('grid')
  })

  it('方向键在段之间移动', () => {
    const onChange = vi.fn()
    render(<SegmentedControl items={items} value="list" onChange={onChange} label="视图" />)
    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'ArrowRight' })
    expect(onChange).toHaveBeenCalledWith('grid')
  })

  it('方向键跳过禁用段', () => {
    const onChange = vi.fn()
    render(
      <SegmentedControl
        items={[items[0]!, { value: 'grid', label: '网格', disabled: true }, { value: 'tree', label: '树' }]}
        value="list"
        onChange={onChange}
        label="视图"
      />,
    )
    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'ArrowRight' })
    expect(onChange).toHaveBeenCalledWith('tree')
  })

  it('锁定后不响应方向键', () => {
    const onChange = vi.fn()
    render(<SegmentedControl items={items} value="list" onChange={onChange} label="视图" disabled />)
    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'ArrowRight' })
    expect(onChange).not.toHaveBeenCalled()
  })

  it('段 id 与控制的面板 id 成对生成', () => {
    render(<SegmentedControl items={items} value="list" onChange={() => {}} label="视图" id="view" />)
    const tab = screen.getByRole('tab', { name: '列表' })
    expect(tab.id).toBe('view-list')
    expect(tab.getAttribute('aria-controls')).toBe('view-list-panel')
  })
})

describe('DisclosureRow', () => {
  it('默认收起时不渲染内容', () => {
    render(<DisclosureRow title="思考过程">正文</DisclosureRow>)
    expect(screen.getByText('思考过程')).toBeTruthy()
    expect(screen.queryByText('正文')).toBeNull()
  })

  it('默认展开时渲染内容', () => {
    render(<DisclosureRow title="思考过程" defaultExpanded>正文</DisclosureRow>)
    expect(screen.getByText('正文')).toBeTruthy()
  })

  it('点击标题切换展开并把状态交给调用方', () => {
    const onToggle = vi.fn()
    render(<DisclosureRow title="思考过程" onToggle={onToggle}>正文</DisclosureRow>)
    const button = screen.getByRole('button', { name: /思考过程/ })
    fireEvent.click(button)
    expect(onToggle).toHaveBeenCalledWith(true)
    expect(screen.getByText('正文')).toBeTruthy()
  })

  it('受控展开状态由调用方决定', () => {
    const onToggle = vi.fn()
    render(<DisclosureRow title="思考过程" expanded={false} onToggle={onToggle}>正文</DisclosureRow>)
    fireEvent.click(screen.getByRole('button', { name: /思考过程/ }))
    expect(onToggle).toHaveBeenCalledWith(true)
    expect(screen.queryByText('正文')).toBeNull()
  })

  it('无内容时不提供展开入口', () => {
    render(<DisclosureRow title="工具调用" accessory={<span>详情</span>} />)
    expect(screen.queryByRole('button')).toBeNull()
    expect(screen.getByText('详情')).toBeTruthy()
  })
})

describe('StateDot', () => {
  it('用 data-state 表达状态且对辅助技术隐藏', () => {
    const { container } = render(<StateDot state="done" />)
    const dot = container.querySelector('.dsh-state-dot') as HTMLElement
    expect(dot.dataset.state).toBe('done')
    expect(dot.getAttribute('aria-hidden')).toBe('true')
  })

  it('默认是空闲状态', () => {
    const { container } = render(<StateDot />)
    expect((container.querySelector('.dsh-state-dot') as HTMLElement).dataset.state).toBe('idle')
  })
})

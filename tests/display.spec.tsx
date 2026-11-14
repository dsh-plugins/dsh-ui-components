// @vitest-environment jsdom
/**
 * 展示组件的行为测试。
 */
import { afterEach, describe, expect, it, vi } from 'vitest'
import * as React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import { Card, Collapse, CollapseItem, Divider, Descriptions, Empty, HoverCard, Pill, Tag, Text } from '../src/display/index.js'

afterEach(cleanup)

describe('Card', () => {
  it('渲染标题与内容', () => {
    render(<Card title="网络代理">内容</Card>)
    expect(screen.getByText('网络代理')).toBeTruthy()
    expect(screen.getByText('内容')).toBeTruthy()
  })

  it('扁平形态与浮起形态不影响内容渲染', () => {
    const { rerender } = render(<Card variant="flat">甲</Card>)
    expect(screen.getByText('甲')).toBeTruthy()
    rerender(<Card variant="elevated" tight>甲</Card>)
    expect(screen.getByText('甲')).toBeTruthy()
  })

  it('渲染头部操作区', () => {
    render(<Card title="标题" extra={<span>操作</span>}>正文</Card>)
    expect(screen.getByText('操作')).toBeTruthy()
  })
})

describe('Tag', () => {
  it('渲染文字', () => {
    render(<Tag>稳定版</Tag>)
    expect(screen.getByText('稳定版')).toBeTruthy()
  })

  it('危险色调改用状态色而非默认填充', () => {
    render(<Tag tone="danger">失败</Tag>)
    const tag = screen.getByText('失败').closest('.arco-tag') as HTMLElement
    expect(tag.style.color).toContain('--dsw-alias-state-error-primary')
  })

  it('可关闭时提供关闭按钮', () => {
    const onClose = vi.fn()
    render(<Tag closable onClose={onClose}>可关闭</Tag>)
    const close = document.querySelector('.arco-tag-close-btn') as HTMLElement
    expect(close).toBeTruthy()
    close.click()
    expect(onClose).toHaveBeenCalled()
  })
})

describe('Pill', () => {
  it('选中态通过 aria-pressed 暴露给辅助技术', () => {
    const { rerender } = render(<Pill active>全部</Pill>)
    expect(screen.getByRole('button', { name: '全部' }).getAttribute('aria-pressed')).toBe('true')
    rerender(<Pill active={false}>全部</Pill>)
    expect(screen.getByRole('button', { name: '全部' }).getAttribute('aria-pressed')).toBe('false')
  })

  it('点击时回调', () => {
    const onClick = vi.fn()
    render(<Pill onClick={onClick}>筛选</Pill>)
    screen.getByRole('button', { name: '筛选' }).click()
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})

describe('Descriptions', () => {
  it('按数据渲染键值对', () => {
    render(
      <Descriptions
        column={1}
        data={[
          { label: '版本', value: '0.1.0' },
          { label: '作者', value: 'dsh-plugins' },
        ]}
      />,
    )
    expect(screen.getByText('版本')).toBeTruthy()
    expect(screen.getByText('0.1.0')).toBeTruthy()
  })
})

describe('Divider', () => {
  it('渲染为分隔元素', () => {
    const { container } = render(<Divider />)
    expect(container.querySelector('.arco-divider')).toBeTruthy()
  })
})

describe('Empty', () => {
  it('显示描述文字', () => {
    render(<Empty description="暂无插件" />)
    expect(screen.getByText('暂无插件')).toBeTruthy()
  })
})

describe('Collapse', () => {
  it('展开时显示内容', () => {
    render(
      <Collapse defaultActiveKey={['a']}>
        <CollapseItem header="详情" name="a">折叠内容</CollapseItem>
      </Collapse>,
    )
    expect(screen.getByText('详情')).toBeTruthy()
    expect(screen.getByText('折叠内容')).toBeTruthy()
  })
})

describe('Text', () => {
  it('渲染文字并支持语义色调', () => {
    render(<Text type="error">错误信息</Text>)
    const element = screen.getByText('错误信息')
    expect(element.className).toContain('arco-typography-error')
  })
})

describe('HoverCard', () => {
  it('渲染触发元素本身', () => {
    render(
      <HoverCard content="预览内容">
        <button type="button">悬停我</button>
      </HoverCard>,
    )
    expect(screen.getByRole('button', { name: '悬停我' })).toBeTruthy()
  })
})

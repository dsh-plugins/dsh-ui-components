// @vitest-environment jsdom
/**
 * 反馈与浮层组件的行为测试。
 *
 * 弹窗类组件断言的是规范要求的可见行为：标题、内容与操作行都在，且内容区
 * 走宿主统一滚动容器；不依赖具体尺寸断点。
 */
import { afterEach, describe, expect, it, vi } from 'vitest'
import * as React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import { Alert, Drawer, Modal, Progress, Result } from '../src/feedback/index.js'

afterEach(cleanup)

describe('Alert', () => {
  it('渲染标题与内容', () => {
    render(<Alert type="warning" title="注意" content="配置将在保存后生效" />)
    expect(screen.getByText('注意')).toBeTruthy()
    expect(screen.getByText('配置将在保存后生效')).toBeTruthy()
  })

  it('可关闭时提供关闭按钮', () => {
    const onClose = vi.fn()
    render(<Alert type="info" content="提示" closable onClose={onClose} />)
    const close = document.querySelector('.arco-alert-close-btn') as HTMLElement
    expect(close).toBeTruthy()
    close.click()
    expect(onClose).toHaveBeenCalled()
  })
})

describe('Progress', () => {
  it('渲染百分比', () => {
    render(<Progress percent={40} />)
    expect(screen.getByText('40%')).toBeTruthy()
  })
})

describe('Result', () => {
  it('渲染标题与副标题', () => {
    render(<Result status="success" title="已保存" subTitle="配置已写入 profile" />)
    expect(screen.getByText('已保存')).toBeTruthy()
    expect(screen.getByText('配置已写入 profile')).toBeTruthy()
  })
})

describe('Modal', () => {
  it('展开时渲染标题、内容与底部操作', () => {
    render(
      <Modal visible title="确认删除" footer={<button type="button">确定</button>}>
        删除后不可恢复
      </Modal>,
    )
    expect(screen.getByText('确认删除')).toBeTruthy()
    expect(screen.getByText('删除后不可恢复')).toBeTruthy()
    expect(screen.getByRole('button', { name: '确定' })).toBeTruthy()
  })

  it('内容区使用宿主统一滚动容器', () => {
    render(
      <Modal visible title="详情">
        正文
      </Modal>,
    )
    expect(document.querySelector('.dshl-scrollbar')).toBeTruthy()
  })

  it('关闭滚动容器后内容直接渲染', () => {
    render(
      <Modal visible scroll={false} title="详情">
        正文
      </Modal>,
    )
    expect(screen.getByText('正文')).toBeTruthy()
    expect(document.querySelector('.dshl-scrollbar')).toBeNull()
  })
})

describe('Drawer', () => {
  it('展开时渲染标题与内容', () => {
    render(
      <Drawer visible title="文件详情">
        抽屉内容
      </Drawer>,
    )
    expect(screen.getByText('文件详情')).toBeTruthy()
    expect(screen.getByText('抽屉内容')).toBeTruthy()
  })
})

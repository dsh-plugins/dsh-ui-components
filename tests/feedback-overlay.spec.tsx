// @vitest-environment jsdom
import * as React from 'react'
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Modal, Drawer } from '../src/feedback/panel.js'

afterEach(cleanup)

it('独立打开的弹窗保留 onConfirm 和显式对齐方式', async () => {
  const onConfirm = vi.fn()
  render(<Modal defaultVisible alignCenter={false} onConfirm={onConfirm} okText="保存">正文</Modal>)
  fireEvent.click(await screen.findByRole('button', { name: '保存' }))
  expect(onConfirm).toHaveBeenCalledOnce()
  expect(document.querySelector('.arco-modal-wrapper-align-center')).toBeNull()
})

it('非受控抽屉确认后收起并可以重新打开', async () => {
  const onOk = vi.fn()
  render(<Drawer trigger={<button>打开</button>} okText="应用" onOk={onOk}>选项</Drawer>)
  const opener = screen.getByRole('button', { name: '打开' })
  fireEvent.click(opener)
  fireEvent.click(await screen.findByRole('button', { name: '应用' }))
  await waitFor(() => expect(opener.getAttribute('aria-expanded')).toBe('false'))
  expect(onOk).toHaveBeenCalledOnce()
  fireEvent.click(opener)
  expect(opener.getAttribute('aria-expanded')).toBe('true')
})

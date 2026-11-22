// @vitest-environment jsdom
/**
 * 基础控件的行为测试。
 *
 * 断言用户可见行为：标签文字、可访问名称、受控值变化触发回调、禁用态。
 * 不断言类名或渲染次数，避免把实现细节写进测试。
 */
import { afterEach, describe, expect, it, vi } from 'vitest'
import * as React from 'react'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { Field, Input, Textarea } from '../src/basic/index.js'
import { Button, ButtonGroup } from '../src/basic/button.js'
import { IconButton } from '../src/basic/icon-button.js'

// 未开启 vitest 全局 API 时 testing-library 不会自动清理，显式登记一次，
// 否则上一个用例渲染的节点会留在 document 里影响后续查询。
afterEach(cleanup)

describe('Input', () => {
  it('输入时把新值交给调用方', () => {
    const onChange = vi.fn()
    render(<Input value="" onChange={onChange} placeholder="地址" />)
    fireEvent.change(screen.getByPlaceholderText('地址'), { target: { value: 'foo' } })
    expect(onChange).toHaveBeenCalledWith('foo', expect.anything())
  })

  it('校验失败时标记 aria-invalid', () => {
    render(<Input invalid placeholder="地址" />)
    expect(screen.getByPlaceholderText('地址').getAttribute('aria-invalid')).toBe('true')
  })

  it('保留调用方传给单行与多行输入的校验状态', () => {
    render(<><Input aria-invalid="grammar" placeholder="名称" /><Textarea aria-invalid="true" placeholder="详情" /></>)
    expect(screen.getByPlaceholderText('名称').getAttribute('aria-invalid')).toBe('grammar')
    expect(screen.getByPlaceholderText('详情').getAttribute('aria-invalid')).toBe('true')
  })

  it('等宽模式附加字体类名', () => {
    render(<Input mono placeholder="命令" />)
    expect(screen.getByPlaceholderText('命令').className).toContain('dsh-mono')
  })
})

describe('Field', () => {
  it('渲染标签、说明与错误消息', () => {
    render(
      <Field label="地址" description="仅影响全局请求" error="不能为空" htmlFor="host">
        <Input id="host" />
      </Field>,
    )
    expect(screen.getByText('地址')).toBeTruthy()
    expect(screen.getByText('仅影响全局请求')).toBeTruthy()
    expect(screen.getByRole('alert').textContent).toBe('不能为空')
    expect(screen.getByLabelText('地址')).toBeTruthy()
  })

  it('无错误时不渲染 alert', () => {
    render(<Field label="地址"><Input /></Field>)
    expect(screen.queryByRole('alert')).toBeNull()
  })

  it('必填时在标签后加星号', () => {
    render(<Field label="密钥" required><Input /></Field>)
    expect(screen.getByText('*')).toBeTruthy()
  })
})

describe('按钮组', () => {
  it('对子按钮和纯图标按钮应用组禁用和尺寸，保留单项尺寸', () => {
    const action = vi.fn()
    render(<ButtonGroup disabled size="sm"><Button block onClick={action}>保存</Button><IconButton label="关闭" size="lg" icon={<svg />} /></ButtonGroup>)
    const save = screen.getByRole('button', { name: '保存' }) as HTMLButtonElement
    const close = screen.getByRole('button', { name: '关闭' }) as HTMLButtonElement
    fireEvent.click(save)
    expect(action).not.toHaveBeenCalled()
    expect(save.disabled && close.disabled).toBe(true)
    expect(save.classList.contains('arco-btn-size-small')).toBe(true)
    expect(save.classList.contains('arco-btn-long')).toBe(true)
    expect(close.classList.contains('arco-btn-size-large')).toBe(true)
    expect(close.classList.contains('arco-btn-icon-only')).toBe(true)
  })
})

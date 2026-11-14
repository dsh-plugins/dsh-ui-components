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
import { Button, Field, IconButton, Input, Select, Switch } from '../src/basic/index.js'
import { Icon } from '../src/foundation/icons.js'

// 未开启 vitest 全局 API 时 testing-library 不会自动清理，显式登记一次，
// 否则上一个用例渲染的节点会留在 document 里影响后续查询。
afterEach(cleanup)

describe('Button', () => {
  it('渲染文字并默认是普通按钮类型', () => {
    render(<Button>保存</Button>)
    const button = screen.getByRole('button', { name: '保存' })
    expect(button.getAttribute('type')).toBe('button')
  })

  it('主按钮与危险按钮都能同时表达', () => {
    render(<Button variant="primary" danger>删除</Button>)
    expect(screen.getByRole('button', { name: '删除' })).toBeTruthy()
  })

  it('点击时调用回调，禁用时不调用', () => {
    const onClick = vi.fn()
    const { rerender } = render(<Button onClick={onClick}>执行</Button>)
    screen.getByRole('button', { name: '执行' }).click()
    expect(onClick).toHaveBeenCalledTimes(1)

    rerender(<Button onClick={onClick} disabled>执行</Button>)
    screen.getByRole('button', { name: '执行' }).click()
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})

describe('IconButton', () => {
  it('用 label 作为可访问名称', () => {
    render(<IconButton icon={<Icon name="Settings" />} label="设置" />)
    const button = screen.getByRole('button', { name: '设置' })
    expect(button.getAttribute('title')).toBe('设置')
  })
})

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

  it('等宽模式附加字体类名', () => {
    render(<Input mono placeholder="命令" />)
    expect(screen.getByPlaceholderText('命令').className).toContain('dsh-mono')
  })
})

describe('Select', () => {
  it('渲染当前选中项的文字', () => {
    render(
      <Select
        options={[
          { value: 'foo', label: '选项甲' },
          { value: 'bar', label: '选项乙' },
        ]}
        value="bar"
      />,
    )
    expect(screen.getByText('选项乙')).toBeTruthy()
  })

  it('无选中项时显示占位文本', () => {
    render(<Select options={[{ value: 'foo', label: '选项甲' }]} placeholder="请选择" />)
    // 选择器把占位文本渲染在可见值与测量层各一份，只要出现即符合预期。
    expect(screen.getAllByText('请选择').length).toBeGreaterThan(0)
  })
})

describe('Switch', () => {
  it('受控值变化时回调布尔值', () => {
    const onChange = vi.fn()
    render(<Switch checked={false} onChange={onChange} />)
    screen.getByRole('switch').click()
    expect(onChange).toHaveBeenCalledWith(true, expect.anything())
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

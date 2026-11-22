// @vitest-environment jsdom
import * as React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import { Arco, ConfigProvider, Form, Input, Select, Tree, Typography } from '../src/index.js'

afterEach(cleanup)

it('根入口保留上游方法、上下文及可渲染的子组件', () => {
  expect(ConfigProvider.ConfigContext).toBe(Arco.ConfigProvider.ConfigContext)
  expect(Form.useForm).toBe(Arco.Form.useForm)
  expect(Tree.Node).toBe(Arco.Tree.Node)
  render(<><Typography.Title>设置</Typography.Title><Input.Password placeholder="密码" />
    <Select defaultValue="a"><Select.Option value="a">已选择</Select.Option></Select></>)
  expect(screen.getByText('设置')).toBeTruthy()
  expect(screen.getByPlaceholderText('密码')).toBeTruthy()
  expect(screen.getByText('已选择')).toBeTruthy()
})

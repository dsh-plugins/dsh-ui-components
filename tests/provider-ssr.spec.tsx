import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { expect, it, vi } from 'vitest'
import { DshProvider } from '../src/foundation/provider.js'
import { Popover } from '../src/display/overlay.js'

vi.mock('@dsh-plugin/dsh-loader/client', async () => ({
  Arco: await import('@arco-design/web-react'),
  injectStyle: () => { throw new Error('服务端没有样式挂载点') },
}))

it('服务端保留普通内容和浮层触发器', () => {
  const html = renderToString(<DshProvider><p>表单</p><Popover content="说明"><button>详情</button></Popover></DshProvider>)
  expect(html).toContain('表单')
  expect(html).toContain('详情')
})

import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { expect, it } from 'vitest'
import { DshProvider, Select } from '../../src/index.js'

it('服务端保留选择框和默认选中的标签', async () => {
  const app = createSSRApp({
    render: () => h(DshProvider, null, {
      default: () => h(Select, { modelValue: 'a', options: [{ value: 'a', label: '已选择' }] }),
    }),
  })
  expect(await renderToString(app)).toContain('已选择')
})

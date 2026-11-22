import { expect, it } from 'vitest'
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Table as ArcoTable } from '@arco-design/web-vue'
import { Progress, Table } from '../../src/vue/basic.js'

it('保留列和原生表格结构的静态组件', () => {
  for (const name of ['Column', 'Thead', 'Tbody', 'Tr', 'Th', 'Td'] as const) {
    expect(Table[name]).toBe(ArcoTable[name])
  }
})

it('各形态的无障碍进度值与屏幕百分比相同', async () => {
  for (const props of [{}, { type: 'circle' as const }, { steps: 5 }]) {
    const html = await renderToString(createSSRApp({
      render: () => h(Progress, { ...props, percent: 0.6, 'aria-label': '下载进度' }),
    }))
    expect(html).toMatch(/role="progressbar"[^>]*aria-valuemax="100"[^>]*aria-valuenow="60"[^>]*aria-label="下载进度"/)
    expect(html).toContain('aria-hidden="true"')
  }
})

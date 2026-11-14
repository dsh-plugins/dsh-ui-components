// @vitest-environment jsdom
/**
 * DSH 专属组合件的行为测试。
 *
 * 组合件是本包相对直接用 Arco 的增量，测试重点是它们自己的交互契约：下拉的
 * 鼠标与键盘两条路径、弹出层的留白与滚动容器、JSON 树的展开语义。
 */
import { afterEach, describe, expect, it, vi } from 'vitest'
import * as React from 'react'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import {
  CodeBlockShell,
  FileTypeBadge,
  JsonTree,
  MenuSelect,
  PanelShell,
  SettingsCard,
  SettingsRow,
  StatusLine,
} from '../src/composites/index.js'

afterEach(cleanup)

describe('SettingsCard', () => {
  it('渲染标题、说明、内容与操作区', () => {
    render(
      <SettingsCard title="网络代理" description="仅影响全局请求" footer={<button type="button">保存</button>}>
        <SettingsRow label="启用" description="立即生效">
          <input type="checkbox" aria-label="启用" />
        </SettingsRow>
      </SettingsCard>,
    )
    expect(screen.getByText('网络代理')).toBeTruthy()
    expect(screen.getByText('仅影响全局请求')).toBeTruthy()
    expect(screen.getByText('启用')).toBeTruthy()
    expect(screen.getByText('立即生效')).toBeTruthy()
    expect(screen.getByRole('button', { name: '保存' })).toBeTruthy()
  })
})

describe('SettingsRow', () => {
  it('堆叠布局附加修饰类', () => {
    const { container } = render(
      <SettingsRow label="地址" layout="stack">
        <input aria-label="地址" />
      </SettingsRow>,
    )
    expect(container.querySelector('.dsh-settings-row--stack')).toBeTruthy()
  })
})

describe('PanelShell', () => {
  it('渲染标题、内容与底部操作', () => {
    render(
      <PanelShell title="插件详情" footer={<button type="button">关闭</button>}>
        详情正文
      </PanelShell>,
    )
    expect(screen.getByRole('dialog')).toBeTruthy()
    expect(screen.getByText('插件详情')).toBeTruthy()
    expect(screen.getByText('详情正文')).toBeTruthy()
    expect(screen.getByRole('button', { name: '关闭' })).toBeTruthy()
  })

  it('内容区使用宿主统一滚动容器', () => {
    render(<PanelShell title="详情">正文</PanelShell>)
    expect(document.querySelector('.dshl-scrollbar')).toBeTruthy()
  })

  it('关闭按钮触发回调', () => {
    const onClose = vi.fn()
    render(
      <PanelShell title="详情" closeLabel="关闭面板" onClose={onClose}>
        正文
      </PanelShell>,
    )
    fireEvent.click(screen.getByRole('button', { name: '关闭面板' }))
    expect(onClose).toHaveBeenCalled()
  })
})

describe('MenuSelect', () => {
  const options = [
    { value: 'auto', label: '自动' },
    { value: 'manual', label: '手动' },
    { value: 'off', label: '关闭', disabled: true },
  ]

  it('渲染当前选中项的文字', () => {
    render(<MenuSelect options={options} value="manual" label="模式" />)
    expect(screen.getByRole('button', { name: '模式: 手动' })).toBeTruthy()
  })

  it('无选中项时显示占位文本', () => {
    render(<MenuSelect options={options} placeholder="请选择" label="模式" />)
    expect(screen.getByRole('button', { name: '模式: 请选择' })).toBeTruthy()
  })

  it('点击后展开选项并选中', () => {
    const onChange = vi.fn()
    render(<MenuSelect options={options} value="auto" onChange={onChange} label="模式" />)
    fireEvent.click(screen.getByRole('button', { name: /模式/ }))
    const listbox = screen.getByRole('listbox')
    expect(listbox).toBeTruthy()
    fireEvent.click(screen.getByRole('option', { name: '手动' }))
    expect(onChange).toHaveBeenCalledWith('manual')
    expect(screen.queryByRole('listbox')).toBeNull()
  })

  it('禁用选项不触发回调', () => {
    const onChange = vi.fn()
    render(<MenuSelect options={options} value="auto" onChange={onChange} label="模式" />)
    fireEvent.click(screen.getByRole('button', { name: /模式/ }))
    fireEvent.click(screen.getByRole('option', { name: '关闭' }))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('方向键在选项间移动并用回车选中', () => {
    const onChange = vi.fn()
    const { container } = render(<MenuSelect options={options} value="auto" onChange={onChange} label="模式" />)
    const wrapper = container.querySelector('.dsh-menu-select') as HTMLElement
    fireEvent.click(screen.getByRole('button', { name: /模式/ }))
    fireEvent.keyDown(wrapper, { key: 'ArrowDown' })
    fireEvent.keyDown(wrapper, { key: 'Enter' })
    expect(onChange).toHaveBeenCalledWith('manual')
  })

  it('方向键跳过禁用选项', () => {
    const onChange = vi.fn()
    const { container } = render(<MenuSelect options={options} value="manual" onChange={onChange} label="模式" />)
    const wrapper = container.querySelector('.dsh-menu-select') as HTMLElement
    fireEvent.click(screen.getByRole('button', { name: /模式/ }))
    fireEvent.keyDown(wrapper, { key: 'ArrowDown' })
    fireEvent.keyDown(wrapper, { key: 'Enter' })
    expect(onChange).toHaveBeenCalledWith('auto')
  })

  it('Escape 关闭弹层', () => {
    const { container } = render(<MenuSelect options={options} value="auto" label="模式" />)
    fireEvent.click(screen.getByRole('button', { name: /模式/ }))
    expect(screen.getByRole('listbox')).toBeTruthy()
    fireEvent.keyDown(container.querySelector('.dsh-menu-select') as HTMLElement, { key: 'Escape' })
    expect(screen.queryByRole('listbox')).toBeNull()
  })

  it('禁用时触发器不可点', () => {
    render(<MenuSelect options={options} value="auto" label="模式" disabled />)
    expect((screen.getByRole('button', { name: /模式/ }) as HTMLButtonElement).disabled).toBe(true)
  })
})

describe('JsonTree', () => {
  it('渲染键名与标量值', () => {
    render(<JsonTree value={{ name: 'dsh-loader', version: 2 }} />)
    expect(screen.getAllByText(/name:/).length).toBeGreaterThan(0)
    expect(screen.getByText('"dsh-loader"')).toBeTruthy()
    expect(screen.getByText('2')).toBeTruthy()
  })

  it('数组按项数汇总收起', () => {
    render(<JsonTree value={{ items: [1, 2, 3] }} defaultExpanded={false} />)
    expect(screen.getByText(/3 项/)).toBeTruthy()
  })

  it('点击可展开折叠的节点', () => {
    render(<JsonTree value={{ items: [1, 2, 3] }} defaultExpanded={false} />)
    const toggle = screen.getAllByRole('button', { name: '展开' })[0]!
    fireEvent.click(toggle)
    expect(screen.getByText('1')).toBeTruthy()
  })

  it('布尔与空值使用关键字配色', () => {
    const { container } = render(<JsonTree value={{ enabled: true, extra: null }} />)
    expect(container.querySelector('.dsh-json-tree__keyword')).toBeTruthy()
  })
})

describe('CodeBlockShell', () => {
  it('渲染语言标签、操作与内容', () => {
    render(
      <CodeBlockShell language="ts" actions={<button type="button">复制</button>}>
        <pre>const value = 1</pre>
      </CodeBlockShell>,
    )
    expect(screen.getByText('ts')).toBeTruthy()
    expect(screen.getByRole('button', { name: '复制' })).toBeTruthy()
    expect(screen.getByText('const value = 1')).toBeTruthy()
  })

  it('无标签与操作时不渲染横幅', () => {
    const { container } = render(<CodeBlockShell><pre>代码</pre></CodeBlockShell>)
    expect(container.querySelector('.dsh-code-shell__banner')).toBeNull()
  })
})

describe('FileTypeBadge', () => {
  it('从文件名取扩展名', () => {
    render(<FileTypeBadge name="src/index.tsx" />)
    expect(screen.getByText('tsx')).toBeTruthy()
  })

  it('接受裸扩展名', () => {
    render(<FileTypeBadge name="md" />)
    expect(screen.getByText('md')).toBeTruthy()
  })

  it('无扩展名时显示 file', () => {
    render(<FileTypeBadge name="Makefile" />)
    expect(screen.getByText('file')).toBeTruthy()
  })
})

describe('StatusLine', () => {
  it('渲染状态点、文字与用时', () => {
    const { container } = render(<StatusLine state="ongoing" time="12s">正在思考</StatusLine>)
    expect(screen.getByText('正在思考')).toBeTruthy()
    expect(screen.getByText('12s')).toBeTruthy()
    expect((container.querySelector('.dsh-state-dot') as HTMLElement).dataset.state).toBe('ongoing')
  })
})

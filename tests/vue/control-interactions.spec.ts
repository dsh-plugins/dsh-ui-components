// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createApp, h, nextTick, type App, type VNode } from 'vue'
import { Button, ButtonGroup } from '../../src/vue/button.js'
import { Pagination } from '../../src/vue/components.js'
import { Link, SearchField, TextField } from '../../src/vue/primitives.js'
import { ListBox, TagGroup, ToggleButtonGroup, Toolbar } from '../../src/vue/selection.js'

let app: App | undefined
function mount(view: () => VNode) {
  const root = document.body.appendChild(document.createElement('div'))
  app = createApp({ render: view })
  app.mount(root)
  return root
}
afterEach(() => { app?.unmount(); document.body.replaceChildren() })

describe('公开控件的状态和可访问性', () => {
  it('组禁用即时生效，尺寸可在单个按钮覆盖', () => {
    const root = mount(() => h(ButtonGroup, { size: 'sm', disabled: true }, () => [
      h(Button, {}, () => '保存'), h(Button, { size: 'lg' }, () => '详情'),
    ]))
    const [save, info] = root.querySelectorAll('button')
    expect(save?.disabled && info?.disabled).toBe(true)
    expect(save?.dataset.size).toBe('sm')
    expect(info?.dataset.size).toBe('lg')
  })

  it('将外部标签直接关联到两个原生输入框', () => {
    const root = mount(() => h('section', [
      h('label', { id: 'filter' }, '筛选'),
      ...[TextField, SearchField].map(field => h(field, { 'aria-labelledby': 'filter' })),
    ]))
    expect([...root.querySelectorAll('input')].map(input => input.getAttribute('aria-labelledby'))).toEqual(['filter', 'filter'])
  })

  it('链接保留图标与语义色，加载时阻止导航和业务回调', () => {
    const onClick = vi.fn()
    const onParentClick = vi.fn()
    const root = mount(() => h('section', { onClick: onParentClick }, [
      h(Link, { status: 'success', hoverable: false, href: '#ok' }, { icon: () => h('i', '图标'), default: () => '保存' }),
      h(Link, { loading: true, href: '#blocked', onClick }, () => '等待'),
    ]))
    const [ready, loading] = root.querySelectorAll('a')
    expect(ready?.querySelector('i')?.textContent).toBe('图标')
    expect(ready?.classList.contains('arco-link-status-success')).toBe(true)
    expect(ready?.classList.contains('arco-link-hoverless')).toBe(true)
    expect(loading?.hasAttribute('href')).toBe(false)
    loading?.click()
    expect(onClick).not.toHaveBeenCalled()
    expect(onParentClick).not.toHaveBeenCalled()
  })

  it('保持分页器的公开折叠阈值可覆盖', () => {
    const root = mount(() => h('section', [
      h(Pagination, { total: 90, current: 2 }),
      h(Pagination, { total: 90, current: 2, baseSize: 6 }),
    ]))
    const lists = root.querySelectorAll('.arco-pagination')
    expect(lists[0]?.textContent).not.toContain('6')
    expect(lists[1]?.textContent).toContain('6')
  })

  it('保留编辑键，再用 Tab 到达工具栏按钮', () => {
    const root = mount(() => h(Toolbar, {}, () => [h('input'), h('button', '保存')]))
    const input = root.querySelector('input')!
    input.focus()
    input.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowRight' }))
    expect(document.activeElement).toBe(input)
    input.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Tab' }))
    expect(document.activeElement).toBe(root.querySelector('button'))
  })

  it('删除标签时跳过禁用项而保留相邻位置', async () => {
    const options = ['A', 'B', 'C', 'D'].map(value => ({ label: value, value, disabled: value === 'A' }))
    const root = mount(() => h(TagGroup, { defaultValue: options }))
    root.querySelector<HTMLButtonElement>('[aria-label="移除 B"]')!.click()
    await nextTick()
    expect(document.activeElement?.getAttribute('aria-label')).toBe('移除 C')
  })

  it.each([ListBox, ToggleButtonGroup])('必选模式下重复选择不发出变化事件', component => {
    const onChange = vi.fn()
    const root = mount(() => h(component, { options: [{ value: 'a', label: 'A' }], defaultValue: 'a', allowEmpty: false, onChange }))
    root.querySelector<HTMLElement>('[data-index="0"]')!.click()
    expect(onChange).not.toHaveBeenCalled()
  })
})

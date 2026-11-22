// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { createApp, h, nextTick, type App } from 'vue'
import { Input, InputNumber, InputPassword } from '../../src/index.js'

const compoundInputStyles = readFileSync('src/vue/compound-input.css', 'utf8')

let app: App
let stylesheet: HTMLStyleElement
afterEach(() => { app?.unmount(); stylesheet?.remove(); document.body.replaceChildren() })

describe('复合输入框', () => {
  it('保留普通输入与后缀按钮的宿主焦点，仅清除复合字段内层表面', async () => {
    stylesheet = document.createElement('style')
    stylesheet.textContent = `
      input:focus, button:focus { box-shadow: inset 0 0 0 2px red; }
      input { min-width: 260px; min-height: 40px; border: 2px solid red; padding: 4px; }
      ${compoundInputStyles}
    `
    document.head.append(stylesheet)
    const root = document.body.appendChild(document.createElement('div'))
    app = createApp({ render: () => h('section', { class: 'dsh-ui' }, [
      h(Input, { inputAttrs: { id: 'plain' } }),
      h(Input, { inputAttrs: { id: 'prefix' } }, { prefix: () => 'https://' }),
      h(Input, { inputAttrs: { id: 'suffix' } }, { suffix: () => h('button', '显示') }),
      h(Input, { inputAttrs: { id: 'clear' }, allowClear: true, defaultValue: '示例' }),
      h(InputNumber, { inputAttrs: { id: 'spin' } }),
      h(InputPassword, { inputAttrs: { id: 'password' } }),
    ]) })
    app.mount(root)
    for (const id of ['prefix', 'suffix', 'clear', 'password']) {
      const input = root.querySelector<HTMLInputElement>('#' + id)!
      input.focus()
      await nextTick()
      expect(input.parentElement?.classList.contains('arco-input-focus')).toBe(true)
      const style = getComputedStyle(input)
      expect(style.boxShadow, id).toBe('none')
      expect(Number.parseFloat(style.minWidth), id).toBe(0)
      expect(Number.parseFloat(style.minHeight), id).toBe(0)
      expect(style.padding).toBe('0px')
    }
    for (const control of [root.querySelector<HTMLInputElement>('#plain')!, root.querySelector<HTMLInputElement>('#spin')!, root.querySelector('button')!]) {
      control.focus()
      expect(getComputedStyle(control).boxShadow).toContain('2px red')
    }
  })
})

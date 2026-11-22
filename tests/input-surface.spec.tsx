import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { expect, it, vi } from 'vitest'
import { Input } from '../src/basic/input.js'
import { DshProvider } from '../src/foundation/provider.js'

const styles = new Map<string, string>()
vi.mock('@dsh-plugin/dsh-loader/client', async () => ({ Arco: await import('@arco-design/web-react') }))
vi.mock('../src/foundation/style.js', async (load) => ({
  ...await load<typeof import('../src/foundation/style.js')>(),
  injectUiStyle: (id: string, css: string) => { styles.set(id, css) },
}))

// jsdom 无法计算整套主题的级联。CI 三个平台自带 Chrome，本地也可指定其路径。
const chrome = [
  process.env.CHROME_BIN,
  '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  join(process.env.ProgramFiles ?? '', 'Google/Chrome/Application/chrome.exe'),
].find((path): path is string => !!path && existsSync(path))

// 在真实浏览器内读取 DshProvider 和 Arco 实际渲染的 DOM 及计算样式。
function checkSurfaces() {
  for (const panel of document.querySelectorAll('.dsh-ui')) {
    const theme = panel.getAttribute('data-theme')
    const plain = panel.querySelector<HTMLInputElement>('[name=plain]')!
    for (const field of panel.querySelectorAll<HTMLInputElement>('input:not([name=plain])')) {
      const wrapper = field.parentElement!
      plain.focus()
      const restingShadow = getComputedStyle(wrapper).boxShadow
      const errorColor = getComputedStyle(wrapper).outlineColor
      for (const focus of [false, true]) {
        if (focus) field.focus()
        const inner = getComputedStyle(field)
        const frame = getComputedStyle(wrapper)
        const issue = (reason: string) => { throw new Error([theme, field.name, focus ? 'focus' : 'rest', reason].join(' / ')) }
        if (inner.backgroundColor !== 'rgba(0, 0, 0, 0)' || inner.boxShadow !== 'none') issue('inner surface')
        if (inner.outlineStyle !== 'none' || inner.borderWidth !== '0px' || inner.padding !== '0px') issue('inner frame')
        if (wrapper.scrollWidth > wrapper.clientWidth + 1) issue('suffix overflow')
        if (frame.backgroundColor === 'rgba(0, 0, 0, 0)') issue('missing field background')
        if (focus && !field.disabled && frame.boxShadow === restingShadow) issue('missing focus ring')
        if (field.name === 'error' && (focus ? !frame.boxShadow.includes(errorColor) : frame.outlineStyle !== 'solid')) issue('missing error')
      }
    }
    plain.focus()
    const single = getComputedStyle(plain)
    if (single.paddingInlineStart === '0px' || single.boxShadow === 'none') throw new Error(theme + ' plain input')
  }
}

it.skipIf(!chrome)('组合输入框在窄宿主表单中只绘制一层底色与焦点环', () => {
  const form = (['light', 'dark'] as const).map(theme => renderToStaticMarkup(
    <DshProvider theme={theme}>
      <Input name="plain" />
      <Input name="prefix" prefix="@" />
      <Input name="suffix" suffix={<button>显示密码</button>} />
      <Input name="clear" allowClear defaultValue="text" />
      <Input name="error" suffix="!" invalid />
      <Input name="disabled" suffix="!" disabled />
    </DshProvider>,
  )).join('')
  const dir = mkdtempSync(join(tmpdir(), 'dsh-input-'))
  try {
    const arco = readFileSync(new URL('../node_modules/@arco-design/web-react/dist/css/arco.css', import.meta.url), 'utf8')
    const host = '.dsh-ui { width:320px; padding:20px; box-sizing:border-box } .dsh-ui input { min-width:260px; padding:18px }'
    writeFileSync(join(dir, 'form.css'), [arco, ...styles.values(), host, '* { transition:none !important }'].join('\n'))
    const file = join(dir, 'form.html')
    writeFileSync(file, '<meta charset="utf-8"><link rel="stylesheet" href="form.css">' + form +
      '<output></output><script>try { (' + checkSurfaces.toString() +
      ')(); document.querySelector("output").textContent="OK" } catch(e) { document.querySelector("output").textContent=e.message }</script>')
    const page = execFileSync(chrome!, ['--headless', '--no-sandbox', '--disable-gpu', '--no-first-run',
      '--user-data-dir=' + join(dir, 'profile'), '--dump-dom', pathToFileURL(file).href], {
      encoding: 'utf8', timeout: 25000, stdio: ['ignore', 'pipe', 'ignore'],
    })
    expect(page.match(/<output>([^<]*)<\/output>/)?.[1]).toBe('OK')
  } finally {
    rmSync(dir, { recursive: true, force: true, maxRetries: 3 })
  }
}, 30000)

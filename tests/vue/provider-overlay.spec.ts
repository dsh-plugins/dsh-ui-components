// @vitest-environment jsdom
import '../jsdom-setup.js'
import { afterEach, expect, it, vi } from 'vitest'
import { createApp, defineComponent, h, nextTick, ref, Teleport, type App } from 'vue'
import { DshProvider, useDshTheme } from '../../src/vue/provider.js'

let app: App
afterEach(() => {
  app?.unmount()
  document.body.removeAttribute('data-ds-dark-theme')
  document.body.replaceChildren()
  vi.restoreAllMocks()
})

const settle = async () => {
  await nextTick()
  await Promise.resolve()
  await nextTick()
}

it('reads computed tokens before writing styles and only changes differing portal tokens', async () => {
  const nativeCompute = globalThis.getComputedStyle
  const nativeWrite = CSSStyleDeclaration.prototype.setProperty
  const phases: string[] = []
  let inherited = 'first'
  let includeLegacy = true
  vi.spyOn(globalThis, 'getComputedStyle').mockImplementation((element, pseudo) => {
    if (!element.classList.contains('fixture-provider')) { return nativeCompute(element, pseudo) }
    const keys = includeLegacy ? ['display', '--fixture-inherited', '--fixture-legacy'] : ['display', '--fixture-inherited']
    return {
      get length() { phases.push('read'); return keys.length },
      item(index: number) { phases.push('read'); return keys[index] },
      getPropertyValue(name: string) { phases.push('read'); return name === '--fixture-inherited' ? inherited : 'legacy' },
    } as CSSStyleDeclaration
  })
  vi.spyOn(CSSStyleDeclaration.prototype, 'setProperty').mockImplementation(function (this: CSSStyleDeclaration, ...args) {
    if (document.querySelector<HTMLElement>('.dsh-ui-portal')?.style === this) { phases.push('write:' + args[0]) }
    return nativeWrite.apply(this, args)
  })

  const inset = ref<number | undefined>(6)
  const parent = document.body.appendChild(document.createElement('div'))
  app = createApp({ render: () => h(DshProvider, { class: 'fixture-provider', overlayInset: inset.value }, () => h('button', '内容')) })
  app.mount(parent)
  await settle()
  const portal = document.querySelector<HTMLElement>('.dsh-ui-portal')!
  const writes = () => phases.filter(phase => phase.startsWith('write:'))
  expect(phases.slice(0, phases.indexOf('write:--fixture-inherited'))).toEqual(Array(6).fill('read'))
  expect(writes()).toEqual(['write:--fixture-inherited', 'write:--fixture-legacy', 'write:--dsh-overlay-inset'])
  expect(portal.style.getPropertyValue('--fixture-inherited')).toBe('first')
  expect(portal.style.getPropertyValue('--dsh-overlay-inset')).toBe('6px')

  phases.length = 0
  parent.classList.toggle('unrelated')
  await settle()
  expect(writes()).toEqual([])

  inherited = 'second'
  includeLegacy = false
  phases.length = 0
  parent.classList.toggle('fixture-theme')
  await settle()
  expect(writes()).toEqual(['write:--fixture-inherited'])
  expect(portal.style.getPropertyValue('--fixture-inherited')).toBe('second')
  expect(portal.style.getPropertyValue('--fixture-legacy')).toBe('')

  inset.value = undefined
  document.body.setAttribute('data-ds-dark-theme', '')
  await settle()
  expect(portal.hasAttribute('data-overlay-frame')).toBe(false)
  expect(portal.style.getPropertyValue('--dsh-overlay-inset')).toBe('')
  expect(portal.dataset.theme).toBe('dark')
  expect(portal.dataset.hostTheme).toBe('true')
})

it('keeps nested teleports and their theme values separate', async () => {
  const Popup = defineComponent({
    props: { label: String },
    setup(props) {
      const { container } = useDshTheme()
      return () => container.value ? h(Teleport, { to: container.value }, h('span', props.label)) : null
    },
  })
  const parent = document.body.appendChild(document.createElement('div'))
  app = createApp({ render: () => h(DshProvider, { theme: 'light', style: { '--accent': 'outer' } }, () => [
    h(Popup, { label: 'outer' }),
    h(DshProvider, {
      theme: 'dark', radius: 'lg', reducedMotion: true, rtl: true, overlayRadius: 8, style: { '--accent': 'inner' },
    }, () => h(Popup, { label: 'inner' })),
  ]) })
  app.mount(parent)
  await settle()
  const popup = (label: string) => [...document.querySelectorAll<HTMLElement>('.dsh-ui-portal')].find(portal => portal.textContent === label)!
  const outer = popup('outer')
  const inner = popup('inner')
  expect(outer).not.toBe(inner)
  expect(outer.parentElement).toBe(document.body)
  expect(inner.parentElement).toBe(document.body)
  expect(outer.dataset.theme).toBe('light')
  expect(inner.dataset.theme).toBe('dark')
  expect(inner.dataset.radius).toBe('lg')
  expect(inner.dataset.motion).toBe('reduced')
  expect(inner.dir).toBe('rtl')
  expect(outer.style.getPropertyValue('--accent')).toBe('outer')
  expect(inner.style.getPropertyValue('--accent')).toBe('inner')
  expect(inner.style.getPropertyValue('--dsh-overlay-radius')).toBe('8px')
})

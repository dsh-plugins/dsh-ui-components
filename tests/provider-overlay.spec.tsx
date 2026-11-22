// @vitest-environment jsdom
import * as React from 'react'
import { afterEach, expect, it, vi } from 'vitest'
import { act, cleanup, render } from '@testing-library/react'
import { createPortal } from 'react-dom'
import { DshProvider, useDshPopupContainer } from '../src/foundation/provider.js'

vi.mock('../src/foundation/style.js', async (load) => ({
  ...await load<typeof import('../src/foundation/style.js')>(),
  injectUiStyle: () => {},
}))

afterEach(() => {
  cleanup()
  document.body.removeAttribute('data-ds-dark-theme')
  vi.restoreAllMocks()
})

it('reads the live cascade before writing any portal styles, updating and removing only changed tokens', async () => {
  const nativeCompute = globalThis.getComputedStyle
  const nativeWrite = CSSStyleDeclaration.prototype.setProperty
  const phases: string[] = []
  const writes: string[] = []
  let hostToken = 'first'
  let includeLegacy = true
  vi.spyOn(globalThis, 'getComputedStyle').mockImplementation((element, pseudo) => {
    if (!(element as HTMLElement).classList.contains('dsh-ui')) { return nativeCompute(element, pseudo) }
    const keys = includeLegacy ? ['display', '--fixture-inherited', '--fixture-legacy'] : ['display', '--fixture-inherited']
    return {
      get length() { phases.push('read-size'); return keys.length },
      item(index: number) { phases.push('read-key'); return keys[index] },
      getPropertyValue(name: string) { phases.push('read-value'); return name === '--fixture-inherited' ? hostToken : 'legacy' },
    } as CSSStyleDeclaration
  })
  vi.spyOn(CSSStyleDeclaration.prototype, 'setProperty').mockImplementation(function (this: CSSStyleDeclaration, ...args) {
    if (document.querySelector<HTMLElement>('.dsh-ui-overlay')?.style === this) {
      phases.push('write'); writes.push(args[0])
    }
    return nativeWrite.apply(this, args)
  })

  const view = render(<DshProvider theme="host" overlayInset={6}><div>内容</div></DshProvider>)
  const portal = document.querySelector<HTMLElement>('.dsh-ui-overlay')!
  expect(phases).toEqual(['read-size', 'read-key', 'read-key', 'read-value', 'read-key', 'read-value', 'write', 'write', 'write'])
  expect(portal.style.getPropertyValue('--fixture-inherited')).toBe('first')
  expect(portal.style.getPropertyValue('--dsh-overlay-inset')).toBe('6px')
  expect(portal.dataset.theme).toBe('light')
  phases.length = 0
  writes.length = 0

  const ancestor = view.container
  await act(async () => { ancestor.classList.toggle('unrelated') })
  expect(writes).toEqual([])
  hostToken = 'second'
  includeLegacy = false
  await act(async () => { ancestor.classList.toggle('fixture-theme') })
  expect(writes).toEqual(['--fixture-inherited'])
  expect(portal.style.getPropertyValue('--fixture-inherited')).toBe('second')
  expect(portal.style.getPropertyValue('--fixture-legacy')).toBe('')

  await act(async () => { document.body.setAttribute('data-ds-dark-theme', '') })
  expect(portal.dataset.theme).toBe('dark')
  view.unmount()
  expect(document.body.contains(portal)).toBe(false)
})

it('keeps nested popup roots separate, preserving overrides and provider direction', async () => {
  function Popup({label}: {label: string}) {
    return createPortal(<span>{label}</span>, useDshPopupContainer()())
  }
  const view = render(
    <DshProvider theme="light" style={{ '--test-accent': 'outer' } as React.CSSProperties}>
      <Popup label="outer popup"/>
      <DshProvider theme="dark" radius="lg" direction="rtl" reducedMotion overlayInset="2em" overlayRadius={8} style={{ '--test-accent': 'inner' } as React.CSSProperties}>
        <Popup label="inner popup"/>
      </DshProvider>
    </DshProvider>,
  )
  const popupRoot = (text: string) => ([...document.querySelectorAll<HTMLElement>('.dsh-ui-overlay')].find(node => node.textContent === text))!
  const outer = popupRoot('outer popup')
  const inner = popupRoot('inner popup')
  expect(outer.parentElement).toBe(document.body)
  expect(inner.parentElement).toBe(document.body)
  expect(inner).not.toBe(outer)
  expect(outer.dataset.theme).toBe('light')
  expect(inner.dataset.theme).toBe('dark')
  expect(inner.dataset.radius).toBe('lg')
  expect(inner.dataset.motion).toBe('reduced')
  expect(inner.dir).toBe('rtl')
  expect(outer.style.getPropertyValue('--test-accent')).toBe('outer')
  expect(inner.style.getPropertyValue('--test-accent')).toBe('inner')
  expect(outer.hasAttribute('data-overlay-frame')).toBe(false)
  expect(inner.hasAttribute('data-overlay-frame')).toBe(true)
  expect(inner.style.getPropertyValue('--dsh-overlay-inset')).toBe('2em')
  expect(inner.style.getPropertyValue('--dsh-overlay-radius')).toBe('8px')
  view.unmount()
  expect(document.body.contains(outer)).toBe(false)
  expect(document.body.contains(inner)).toBe(false)
})

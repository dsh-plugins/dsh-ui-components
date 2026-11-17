const layouts = new WeakMap<HTMLElement, { users: number; stop: () => void }>()

/** 同一浮层容器复用测量器，最后一个调用方卸载时释放监听。 */
export function observeToastLayout(container: HTMLElement): () => void {
  let layout = layouts.get(container)
  if (!layout) { layout = { users: 0, stop: startLayout(container) }; layouts.set(container, layout) }
  const owner = layout
  owner.users++
  return () => {
    owner.users--
    if (owner.users === 0) { owner.stop(); layouts.delete(container) }
  }
}

function startLayout(container: HTMLElement): () => void {
  const regions = '.dsh-toast-region,.arco-message-wrapper,.arco-notification-wrapper'
  const notices = '.dsh-toast,.arco-message,.arco-notification'
  const observed = new Set<Element>()
  let frame = 0
  const schedule = () => {
    if (!frame) { frame = requestAnimationFrame(update) }
  }
  const resize = new ResizeObserver(schedule)
  const set = (element: HTMLElement, name: string, value: string) => {
    if (element.style.getPropertyValue(name) !== value) { element.style.setProperty(name, value) }
  }
  const update = () => {
    frame = 0
    const current = new Set<Element>()
    for (const region of container.querySelectorAll<HTMLElement>(regions)) {
      const items = Array.from(region.querySelectorAll<HTMLElement>(notices)).reverse()
      const active = items.filter(item => item.style.opacity !== '0' && !item.classList.contains('dsh-toast-slide-leave-active') && !item.parentElement?.className.includes('-exit'))
      const expanded = active.length > 1 && (region.matches(':hover') || region.contains(document.activeElement))
      region.dataset.dshToastStack = String(active.length)
      region.dataset.dshToastDirection = region.className.includes('bottom') || region.dataset.position?.startsWith('bottom') ? 'bottom' : 'top'
      let offset = 0
      let frontHeight = 0
      for (const [index, item] of active.entries()) {
        const style = getComputedStyle(item)
        const children = Array.from(item.children).filter(child => !child.className.toString().includes('close'))
        const height = item.style.height ? parseFloat(style.height) : Math.max(0, ...children.map(child => (child as HTMLElement).offsetHeight))
          + parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth)
        if (index === 0) { frontHeight = height }
        set(item, '--dsh-toast-index', String(index))
        set(item, '--dsh-toast-offset', `${offset}px`)
        set(item, '--dsh-toast-height', `${height}px`)
        set(item, '--dsh-toast-front-height', `${frontHeight}px`)
        set(item, '--dsh-toast-layer', String(active.length - index))
        item.dataset.dshToastIndex = String(index)
        item.toggleAttribute('inert', index >= 3)
        item.setAttribute('aria-hidden', String(index >= 3))
        const close = item.querySelector<HTMLElement>(':scope > .arco-message-close-btn,:scope > .arco-notification-close-btn')
        if (close) {
          close.setAttribute('role', 'button')
          close.setAttribute('aria-label', '关闭通知')
          close.tabIndex = index < 3 && (index === 0 || expanded) ? 0 : -1
        }
        const wrapper = item.matches('.dsh-toast') ? item : item.parentElement
        if (wrapper) { wrapper.dataset.dshToastItem = '' }
        for (const child of children) {
          current.add(child)
          if (!observed.has(child)) { resize.observe(child) }
        }
        offset += height + 12
      }
      for (const item of items.filter(item => !active.includes(item))) {
        item.dataset.dshToastIndex = 'exiting'
      }
      set(region, '--dsh-toast-front-height', `${frontHeight}px`)
    }
    for (const element of observed) {
      if (!current.has(element)) { resize.unobserve(element) }
    }
    observed.clear()
    current.forEach(element => observed.add(element))
  }
  const mutation = new MutationObserver(schedule)
  mutation.observe(container, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['class'] })
  const keydown = (event: KeyboardEvent) => {
    const target = event.target
    if (!event.defaultPrevented && target instanceof HTMLElement && target.matches('.arco-message-close-btn,.arco-notification-close-btn') && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault()
      target.click()
    }
  }
  const events = ['pointerover', 'pointerout', 'focusin', 'focusout'] as const
  events.forEach(event => container.addEventListener(event, schedule))
  container.addEventListener('keydown', keydown)
  update()
  return () => {
    mutation.disconnect()
    resize.disconnect()
    cancelAnimationFrame(frame)
    events.forEach(event => container.removeEventListener(event, schedule))
    container.removeEventListener('keydown', keydown)
  }
}

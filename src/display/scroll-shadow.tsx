import * as React from 'react'
import { Scrollbar } from '@dsh-plugin/dsh-loader/client'
import { injectUiStyle } from '../foundation/style.js'

/** 使用宿主滚动容器，在仍有内容的边缘显示 HeroUI 渐隐。 */
export interface ScrollShadowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onScroll'> {
  /** 内容区域的最大高度，默认 240px。 */
  maxHeight?: React.CSSProperties['maxHeight']
  variant?: 'page'
  /** 实际内容视口的原生滚动事件，currentTarget 指向该视口。 */
  onScroll?: (event: Event) => void
}

const CSS = `
.dsh-ui .dsh-scroll-shadow { position: relative; min-height: 0; }
.dsh-ui .dsh-scroll-shadow > .dshl-scrollbar { height: 100%; max-height: inherit; }
.dsh-ui .dsh-scroll-shadow .dshl-scrollbar-viewport {
  padding: 0;
  mask-image: linear-gradient(180deg, transparent 0, var(--color-black) var(--dsh-scroll-shadow-start), var(--color-black) calc(100% - var(--dsh-scroll-shadow-end)), transparent 100%);
}
`

/** 渐隐仅改变内容合成，滚轮、触摸、滑块及键盘操作由 Scrollbar 提供。 */
export function ScrollShadow({ maxHeight = 240, variant, style, className, children, onScroll, ...props }: ScrollShadowProps): React.ReactElement {
  injectUiStyle('display/scroll-shadow.css', CSS)
  const root = React.useRef<HTMLDivElement>(null)
  const [fade, setFade] = React.useState({ start: 0, end: 0 })
  const measure = React.useCallback(() => {
    const viewport = root.current?.querySelector<HTMLElement>('.dshl-scrollbar-viewport')
    if (!viewport) { return }
    const start = Math.min(40, Math.max(0, viewport.scrollTop))
    const end = Math.min(40, Math.max(0, viewport.scrollHeight - viewport.clientHeight - viewport.scrollTop))
    setFade(previous => previous.start === start && previous.end === end ? previous : { start, end })
  }, [])
  React.useEffect(() => {
    measure()
    const viewport = root.current?.querySelector<HTMLElement>('.dshl-scrollbar-viewport')
    const content = root.current?.querySelector<HTMLElement>('.dshl-scrollbar-content')
    const resize = new ResizeObserver(measure)
    const mutations = new MutationObserver(measure)
    let hideTimer: ReturnType<typeof setTimeout> | undefined
    const handleScroll = (event: Event) => {
      measure()
      onScroll?.(event)
      if (variant !== 'page' || !root.current) { return }
      const container = root.current
      container.dataset.scrolling = ''
      clearTimeout(hideTimer)
      hideTimer = setTimeout(() => { delete container.dataset.scrolling }, 900)
    }
    viewport?.addEventListener('scroll', handleScroll)
    if (viewport) { resize.observe(viewport) }
    if (content) { resize.observe(content); mutations.observe(content, { childList: true, subtree: true, characterData: true }) }
    return () => { viewport?.removeEventListener('scroll', handleScroll); resize.disconnect(); mutations.disconnect(); clearTimeout(hideTimer); if (root.current) { delete root.current.dataset.scrolling } }
  }, [measure, onScroll, variant])
  const fadeStyle = { '--dsh-scroll-shadow-start': `${fade.start}px`, '--dsh-scroll-shadow-end': `${fade.end}px` } as React.CSSProperties
  return <div {...props} ref={root} data-top={fade.start > 1 || undefined} data-bottom={fade.end > 1 || undefined} className={['dsh-scroll-shadow', variant === 'page' && 'dsh-scroll-shadow--page', className].filter(Boolean).join(' ')} style={{ maxHeight, ...fadeStyle, ...style }}><Scrollbar>{children}</Scrollbar></div>
}

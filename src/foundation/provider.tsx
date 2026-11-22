import * as React from 'react'
import { Arco } from '@dsh-plugin/dsh-loader/client'
import { BRIDGE_CSS, HERO_CSS, HERO_COMPONENT_CSS } from './bridge.js'
import { ROOT_CLASS, ensureOverlayContainer, injectUiStyle } from './style.js'
import { injectBasicStyles } from '../basic/styles.js'
import { injectDisplayStyles } from '../display/styles.js'
import { injectFeedbackStyles } from '../feedback/styles.js'
import { injectNavigationStyles } from '../navigation/styles.js'
import { injectDataStyles } from '../data/styles.js'
import { injectCompositeStyles } from '../composites/styles.js'
import { injectHeroOverlayStyles } from './overlay-style.js'
import { PICKER_OVERLAY_CSS } from './picker-overlay-style.js'
import { SELECTION_OVERLAY_CSS } from './selection-overlay-style.js'
import { PRESENTATION_CSS } from './presentation-style.js'
import { COLOR_OVERLAY_CSS } from './color-overlay-style.js'

/** 主题源；host 跟随 DSH 的明暗状态，system 跟随操作系统。 */
export type DshTheme = 'host' | 'system' | 'light' | 'dark'
/** 控件圆角；full 仅将小控件设为胶囊，面板仍保留适合内容的圆角。 */
export type DshRadius = 'none' | 'sm' | 'md' | 'lg' | 'full'

/** React 组件主题、方向及浮层配置。 */
export interface DshProviderProps {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  theme?: DshTheme
  radius?: DshRadius
  reducedMotion?: boolean
  direction?: 'ltr' | 'rtl'
  overlayInset?: number | string
  overlayRadius?: number | string
}

function defaultContainer(): HTMLElement {
  return ensureOverlayContainer() ?? document.body
}

export const PopupContext = React.createContext<() => HTMLElement>(defaultContainer)
const useLayoutEffect = typeof document === 'undefined' ? React.useEffect : React.useLayoutEffect

/** 供封装浮层使用，确保弹窗和触发器属于同一主题。 */
export function useDshPopupContainer(): () => HTMLElement {
  return React.useContext(PopupContext)
}

function resolveTheme(theme: DshTheme): 'light' | 'dark' {
  if (theme === 'light' || theme === 'dark') { return theme }
  if (typeof document === 'undefined') { return 'light' }
  if (theme === 'host') {
    const value = document.body.getAttribute('data-ds-dark-theme')
    return value !== null && value !== 'false' && value !== '0' ? 'dark' : 'light'
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/** 注入完整主题，以 body 级独立容器隔离浮层并避免父元素裁切。 */
export function DshProvider({ children, className, style, theme = 'host', radius = 'md', reducedMotion, direction = 'ltr', overlayInset, overlayRadius }: DshProviderProps): React.ReactElement {
  injectUiStyle('foundation/bridge.css', BRIDGE_CSS)
  injectBasicStyles()
  injectDisplayStyles()
  injectFeedbackStyles()
  injectNavigationStyles()
  injectDataStyles()
  injectCompositeStyles()
  injectUiStyle('foundation/hero.css', `${HERO_CSS}\n${HERO_COMPONENT_CSS}`)
  injectHeroOverlayStyles()
  injectUiStyle('foundation/hero-pickers.css', PICKER_OVERLAY_CSS)
  injectUiStyle('foundation/hero-selection.css', SELECTION_OVERLAY_CSS)
  injectUiStyle('foundation/hero-colors.css', COLOR_OVERLAY_CSS)
  injectUiStyle('foundation/presentation.css', PRESENTATION_CSS)

  const [effectiveTheme, setEffectiveTheme] = React.useState<'light' | 'dark'>('light')
  const [systemReduced, setSystemReduced] = React.useState(false)
  const [portal] = React.useState(() => typeof document === 'undefined' ? null : document.createElement('div'))
  const root = React.useRef<HTMLDivElement>(null)
  const getPopupContainer = React.useCallback(() => portal ?? defaultContainer(), [portal])
  const motion = (reducedMotion ?? systemReduced) ? 'reduced' : 'full'
  const resolved = theme === 'light' || theme === 'dark' ? theme : effectiveTheme

  useLayoutEffect(() => {
    const update = () => setEffectiveTheme(resolveTheme(theme))
    update()
    if (theme === 'host') {
      const observer = new MutationObserver(update)
      observer.observe(document.body, { attributes: true, attributeFilter: ['data-ds-dark-theme'] })
      return () => observer.disconnect()
    }
    const query = window.matchMedia?.('(prefers-color-scheme: dark)')
    query?.addEventListener('change', update)
    return () => query?.removeEventListener('change', update)
  }, [theme])

  React.useEffect(() => {
    const query = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    const update = () => setSystemReduced(Boolean(query?.matches))
    update()
    query?.addEventListener('change', update)
    return () => query?.removeEventListener('change', update)
  }, [])

  React.useInsertionEffect(() => {
    if (portal === null) { return }
    document.body.appendChild(portal)
    return () => portal.remove()
  }, [portal])


  useLayoutEffect(() => {
    if (portal === null) { return }
    const sync = () => {
      portal.className = `${ROOT_CLASS} dsh-ui-overlay`
      portal.dataset.theme = resolved
      portal.dataset.radius = radius
      portal.dataset.motion = motion
      portal.dir = direction
      portal.style.cssText = ''
      if (root.current) {
        const computed = getComputedStyle(root.current)
        for (let index = 0; index < computed.length; index += 1) {
          const key = computed.item(index)
          if (key.startsWith('--')) { portal.style.setProperty(key, computed.getPropertyValue(key)) }
        }
      }
      for (const [key, value] of Object.entries(style ?? {})) {
        if (key.startsWith('--') && value !== undefined) { portal.style.setProperty(key, String(value)) }
      }
      if (overlayInset !== undefined || overlayRadius !== undefined) { portal.dataset.overlayFrame = '' }
      else { delete portal.dataset.overlayFrame }
      for (const [name, value] of [['inset', overlayInset], ['radius', overlayRadius]] as const) {
        if (value !== undefined) { portal.style.setProperty('--dsh-overlay-' + name, typeof value === 'number' ? value + 'px' : value) }
      }
    }
    sync()
    const observer = new MutationObserver(sync)
    // 逐级监听，浮层位于独立子树，不会因写入自己的 style 再次触发。
    for (let node: Element | null = root.current; node; node = node.parentElement) {
      observer.observe(node, { attributes: true })
    }
    return () => observer.disconnect()
  }, [portal, className, resolved, radius, motion, direction, style, overlayInset, overlayRadius])

  return (
    <PopupContext.Provider value={getPopupContainer}>
      <Arco.ConfigProvider getPopupContainer={getPopupContainer} rtl={direction === 'rtl'}>
        <div ref={root} className={[ROOT_CLASS, className].filter(Boolean).join(' ')} style={style} data-theme={resolved} data-radius={radius} data-motion={motion} dir={direction}>
          {children}
        </div>
      </Arco.ConfigProvider>
    </PopupContext.Provider>
  )
}

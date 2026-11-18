import * as React from 'react'
import * as ArcoModule from '@arco-design/web-react'

export const Arco = ArcoModule as unknown as Record<string, any>

export function injectStyle(pluginId: string, cssId: string, css: string): () => void {
  if (typeof document === 'undefined') return () => {}
  const tagId = `${pluginId}/${cssId}`
  const selector = `style[data-plugin-css="${tagId}"]`
  if (document.querySelector(selector) !== null) return () => {}
  const style = document.createElement('style')
  style.dataset.plugin = pluginId
  style.dataset.pluginCss = tagId
  style.textContent = css
  document.head.appendChild(style)
  return () => {
    if (style.parentNode !== null) style.parentNode.removeChild(style)
  }
}

export interface ScrollbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const SCROLLBAR_CSS = `
.dshl-scrollbar{position:relative;display:flex;min-height:0;min-width:0;overflow:hidden}
.dshl-scrollbar-viewport{flex:1;min-height:0;min-width:0;overflow:auto;overscroll-behavior:contain;scrollbar-width:none;padding-right:12px}
.dshl-scrollbar-viewport::-webkit-scrollbar{display:none}
.dshl-scrollbar-content{min-width:0;display:flow-root}
`

export function Scrollbar({ children, className, ...rest }: ScrollbarProps) {
  React.useEffect(() => injectStyle('@dsh-plugin/dsh-loader', 'scrollbar', SCROLLBAR_CSS), [])
  return (
    <div className={className ? `dshl-scrollbar ${className}` : 'dshl-scrollbar'} {...rest}>
      <div className="dshl-scrollbar-viewport">
        <div className="dshl-scrollbar-content">{children}</div>
      </div>
    </div>
  )
}

import * as React from 'react'
import { Arco } from '@dsh-plugin/dsh-loader/client'
import { componentProps } from '../foundation/component-props.js'

/** 默认删除图标采用 HeroUI 路径，保留 Arco 关闭事件与自定义图标。 */
export const HeroTag: typeof Arco.Tag = React.forwardRef<unknown, React.ComponentPropsWithoutRef<typeof Arco.Tag>>((props, ref) => {
  const config = React.useContext(Arco.ConfigProvider.ConfigContext)
  const options = componentProps(props, config.componentConfig?.Tag)
  const configured = options.closeIcon
  return <Arco.Tag {...options} ref={ref} onKeyDown={event => {
    options.onKeyDown?.(event)
    if (event.defaultPrevented || event.key !== ' ' || !(event.target instanceof HTMLElement) || !event.target.classList.contains(`${config.getPrefixCls?.('tag') ?? 'arco-tag'}-close-btn`)) { return }
    event.preventDefault()
    event.target.click()
  }} closeIcon={configured === undefined ? <svg className="dsh-tag-close-icon" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M3.47 3.47a.75.75 0 0 1 1.06 0L8 6.94l3.47-3.47a.75.75 0 1 1 1.06 1.06L9.06 8l3.47 3.47a.75.75 0 1 1-1.06 1.06L8 9.06l-3.47 3.47a.75.75 0 0 1-1.06-1.06L6.94 8 3.47 4.53a.75.75 0 0 1 0-1.06Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg> : configured} />
})

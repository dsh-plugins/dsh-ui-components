import * as React from 'react'
import { Arco } from '@dsh-plugin/dsh-loader/client'
import { componentProps } from '../foundation/component-props.js'

export const statusIcons = {
  info: 'M8 13.5a5.5 5.5 0 1 0 0-11a5.5 5.5 0 0 0 0 11M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14m1-9.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-.25 3a.75.75 0 0 0-1.5 0V11a.75.75 0 0 0 1.5 0z',
  success: 'M13.5 8a5.5 5.5 0 1 1-11 0a5.5 5.5 0 0 1 11 0M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0m-3.9-1.55a.75.75 0 1 0-1.2-.9L7.419 8.858L6.03 7.47a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.13-.08z',
  warning: 'M7.134 2.994L2.217 11.5a1 1 0 0 0 .866 1.5h9.834a1 1 0 0 0 .866-1.5L8.866 2.993a1 1 0 0 0-1.732 0m3.03-.75c-.962-1.665-3.366-1.665-4.329 0L.918 10.749c-.963 1.666.24 3.751 2.165 3.751h9.834c1.925 0 3.128-2.085 2.164-3.751zM8 5a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2A.75.75 0 0 1 8 5m1 5.75a1 1 0 1 1-2 0a1 1 0 0 1 2 0',
  error: 'M8 13.5a5.5 5.5 0 1 0 0-11a5.5 5.5 0 0 0 0 11M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14m1-4.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0M8.75 5a.75.75 0 0 0-1.5 0v2.5a.75.75 0 0 0 1.5 0z',
}

/** 状态结果采用 HeroUI 状态图标，保留自定义图标、空图标与 HTTP 状态插图。 */
export const HeroResult: typeof Arco.Result = React.forwardRef<unknown, React.ComponentPropsWithoutRef<typeof Arco.Result>>((props, ref) => {
  const config = React.useContext(Arco.ConfigProvider.ConfigContext)
  const options = componentProps(props, config.componentConfig?.Result)
  const status = options.status === undefined ? 'info' : options.status
  const path = typeof status === 'string' && status in statusIcons ? statusIcons[status as keyof typeof statusIcons] : undefined
  const icon = path && !('icon' in options) ? <svg className="dsh-result-icon" viewBox="0 0 16 16" fill="none" aria-hidden><path d={path} fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg> : options.icon
  return <Arco.Result {...options} ref={ref} {...(path && !('icon' in options) ? { icon } : {})} />
})

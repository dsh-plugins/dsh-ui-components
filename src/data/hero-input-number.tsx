import * as React from 'react'
import { Arco as HostArco } from '@dsh-plugin/dsh-loader/client'

/** 默认步进图标使用原尺寸 SVG，数值格式、边界与长按仍交由 Arco。 */
export const HeroInputNumber: typeof HostArco.InputNumber = React.forwardRef((props, ref) => {
  const config = React.useContext(HostArco.ConfigProvider.ConfigContext).componentConfig?.InputNumber
  const icons = props.icons ?? config?.icons
  const icon = (path: string) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden><path d={path} fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg>
  return <HostArco.InputNumber {...props} ref={ref} icons={{
    ...icons,
    minus: icons?.minus ?? icon('M1.75 8a.75.75 0 0 1 .75-.75h11a.75.75 0 0 1 0 1.5h-11A.75.75 0 0 1 1.75 8'),
    plus: icons?.plus ?? icon('M8 1.75a.75.75 0 0 1 .75.75v4.75h4.75a.75.75 0 0 1 0 1.5H8.75v4.75a.75.75 0 0 1-1.5 0V8.75H2.5a.75.75 0 0 1 0-1.5h4.75V2.5A.75.75 0 0 1 8 1.75'),
  }} />
})

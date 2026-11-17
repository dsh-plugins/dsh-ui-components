import * as React from 'react'
import { Arco } from '@dsh-plugin/dsh-loader/client'
import { componentProps } from '../foundation/component-props.js'

/** 默认圆环采用 HeroUI 的几何比例，显式尺寸、轨道与文本交由 Arco。 */
export const HeroProgress: typeof Arco.Progress = React.forwardRef((props, ref) => {
  const config = React.useContext(Arco.ConfigProvider.ConfigContext)
  const settings = componentProps(props, config.componentConfig?.Progress)
  const size = settings.size ?? config.size
  const circle = settings.type === 'circle' && settings.showText === false && !settings.formatText && !settings.steps && settings.width === undefined && (size === undefined || size === 'default')
  return <Arco.Progress {...props} ref={ref} width={circle ? 36 : settings.width} className={[...(Array.isArray(settings.className) ? settings.className : settings.className ? [settings.className] : []), ...(circle ? ['dsh-hero-progress-circle'] : []), ...(circle && settings.strokeWidth === undefined ? ['dsh-hero-progress-circle-default-stroke'] : [])]} />
})

import * as React from 'react'
import { Arco } from '@dsh-plugin/dsh-loader/client'
import { componentProps } from '../foundation/component-props.js'

/** 独立标签输入的样式不影响 Select 等组件内部复用的标签输入。 */
export const HeroInputTag: typeof Arco.InputTag = React.forwardRef<React.ComponentRef<typeof Arco.InputTag>, React.ComponentPropsWithoutRef<typeof Arco.InputTag>>((props, ref) => {
  const config = React.useContext(Arco.ConfigProvider.ConfigContext)
  const options = componentProps(props, config.componentConfig?.InputTag)
  const icon = { ...options.icon, removeIcon: options.icon?.removeIcon === undefined ? <svg className="dsh-tag-close-icon" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M3.47 3.47a.75.75 0 0 1 1.06 0L8 6.94l3.47-3.47a.75.75 0 1 1 1.06 1.06L9.06 8l3.47 3.47a.75.75 0 1 1-1.06 1.06L8 9.06l-3.47 3.47a.75.75 0 0 1-1.06-1.06L6.94 8 3.47 4.53a.75.75 0 0 1 0-1.06Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg> : options.icon.removeIcon }
  return <Arco.InputTag {...options} icon={icon} ref={ref} className={['dsh-hero-input-tag', ...(Array.isArray(options.className) ? options.className : options.className ? [options.className] : [])]} />
})

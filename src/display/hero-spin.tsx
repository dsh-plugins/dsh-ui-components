import * as React from 'react'
import { Arco as HostArco } from '@dsh-plugin/dsh-loader/client'

/** 默认圆环采用 HeroUI 渐变；调用方提供的图标、元素和点阵参数继续交由 Arco。 */
export const HeroSpin: typeof HostArco.Spin = React.forwardRef((props, ref) => {
  const id = React.useId()
  const config = React.useContext(HostArco.ConfigProvider.ConfigContext).componentConfig?.Spin
  const size = props.size ?? config?.size
  const custom = (props.dot === undefined ? config?.dot : props.dot) || (props.icon === undefined ? config?.icon : props.icon) || (props.element === undefined ? config?.element : props.element)
  const icon = <svg className="dsh-spinner-icon" viewBox="0 0 24 24" aria-hidden style={size ? { width: size, height: size } : undefined}>
    <defs>
      <linearGradient id={`${id}-1`} x1="50%" x2="50%" y1="5.271%" y2="91.793%"><stop offset="0%" stopColor="currentColor" /><stop offset="100%" stopColor="currentColor" stopOpacity={.55} /></linearGradient>
      <linearGradient id={`${id}-2`} x1="50%" x2="50%" y1="15.24%" y2="87.15%"><stop offset="0%" stopColor="currentColor" stopOpacity={0} /><stop offset="100%" stopColor="currentColor" stopOpacity={.55} /></linearGradient>
    </defs>
    <path d="M8.749.021a1.5 1.5 0 0 1 .497 2.958A7.5 7.5 0 0 0 3 10.375a7.5 7.5 0 0 0 7.5 7.5v3c-5.799 0-10.5-4.7-10.5-10.5C0 5.23 3.726.865 8.749.021" fill={`url(#${id}-1)`} transform="translate(1.5 1.625)" />
    <path d="M15.392 2.673a1.5 1.5 0 0 1 2.119-.115A10.48 10.48 0 0 1 21 10.375c0 5.8-4.701 10.5-10.5 10.5v-3a7.5 7.5 0 0 0 5.007-13.084a1.5 1.5 0 0 1-.115-2.118" fill={`url(#${id}-2)`} transform="translate(1.5 1.625)" />
  </svg>
  return <HostArco.Spin {...props} ref={ref} {...(custom ? {} : { element: icon })} />
})

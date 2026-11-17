import * as React from 'react'
import { Arco as HostArco } from '@dsh-plugin/dsh-loader/client'
import { wrapScopedPopup } from '../foundation/scoped-popup.js'
import { colorVariables } from './color-model.js'

const ScopedColor = wrapScopedPopup(HostArco.ColorPicker)
/** 打开额外格式及数值透明度控件；默认使用 HeroUI 的基本颜色面板。 */
export type HeroColorPickerProps = React.ComponentPropsWithoutRef<typeof HostArco.ColorPicker> & { showFormatControls?: boolean }

/** 保留 Arco 的受控值、渐变、历史颜色及预设颜色接口。 */
export const HeroColorPicker = React.forwardRef<React.ComponentRef<typeof HostArco.ColorPicker>, HeroColorPickerProps>(({ showFormatControls, triggerProps, onChange, className, style, ...props }, ref) => {
  const [current, setCurrent] = React.useState(props.defaultValue)
  const value = props.value ?? current
  const variables = colorVariables(value)
  const advanced = showFormatControls || props.format === 'rgb' || props.mode && props.mode !== 'single'
  return <ScopedColor {...props} ref={ref} className={['dsh-color-trigger', className].filter(Boolean).join(' ')} style={{ ...variables, ...style }} onChange={next => { setCurrent(next); onChange?.(next) }}
    triggerProps={{ ...triggerProps, className: [triggerProps?.className, 'dsh-color-panel', advanced && 'dsh-color-panel--advanced'].filter(Boolean).join(' '), style: { ...variables, ...triggerProps?.style } }} />
})

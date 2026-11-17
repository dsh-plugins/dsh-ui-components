/**
 * 开关类控件：复选框、单选框、开关。
 *
 * 三者都沿用 Arco 的受控与非受控语义，因此 `checked` / `defaultChecked` /
 * `onChange` 的行为与原生表单一致。勾选状态的配色由桥接样式表改指 DSH 的
 * 品牌色令牌。
 *
 * @module @dsh-plugin/dsh-ui-components/basic/toggle
 */
import * as React from 'react'
import { Arco } from '@dsh-plugin/dsh-loader/client'
import { injectBasicStyles } from './styles.js'

/** {@link Checkbox} 的 props。 */
export type CheckboxProps = Omit<React.ComponentPropsWithoutRef<typeof Arco.Checkbox>, 'children'> & {
  /** 勾选框右侧的文字。 */
  label?: React.ReactNode
}

/**
 * 一个复选框。
 *
 * @param props - 见 {@link CheckboxProps}。
 * @returns 复选框元素。
 */
export function Checkbox({ label, icon, ...rest }: CheckboxProps): React.ReactElement {
  injectBasicStyles()
  return <Arco.Checkbox {...rest} icon={icon ?? <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 17 18"><polyline points="1 9 7 14 15 4" /></svg>}>{label}</Arco.Checkbox>
}

/** {@link CheckboxGroup} 的 props。 */
export type CheckboxGroupProps = React.ComponentPropsWithoutRef<typeof Arco.Checkbox.Group>

/**
 * 一组复选框。
 *
 * @param props - 见 {@link CheckboxGroupProps}。
 * @returns 复选框组元素。
 */
export function CheckboxGroup(props: CheckboxGroupProps): React.ReactElement {
  injectBasicStyles()
  return <Arco.Checkbox.Group {...props} />
}

/** {@link Radio} 的 props。 */
export type RadioProps = Omit<React.ComponentPropsWithoutRef<typeof Arco.Radio>, 'children'> & {
  /** 单选框右侧的文字。 */
  label?: React.ReactNode
}

/**
 * 一个单选框。
 *
 * @param props - 见 {@link RadioProps}。
 * @returns 单选框元素。
 */
export function Radio({ label, ...rest }: RadioProps): React.ReactElement {
  injectBasicStyles()
  return <Arco.Radio {...rest}>{label}</Arco.Radio>
}

/** {@link RadioGroup} 的 props。 */
export type RadioGroupProps = React.ComponentPropsWithoutRef<typeof Arco.Radio.Group>

/**
 * 一组单选框，`onChange` 回调选中的 value。
 *
 * @param props - 见 {@link RadioGroupProps}。
 * @returns 单选框组元素。
 */
export function RadioGroup(props: RadioGroupProps): React.ReactElement {
  injectBasicStyles()
  return <Arco.Radio.Group {...props} />
}

/** {@link Switch} 的 props。 */
export type SwitchProps = React.ComponentPropsWithoutRef<typeof Arco.Switch>

/**
 * 一个开关，用于即时生效的设置项。
 *
 * @param props - 见 {@link SwitchProps}。
 * @returns 开关元素。
 */
export function Switch(props: SwitchProps): React.ReactElement {
  injectBasicStyles()
  return <Arco.Switch {...props} />
}

/** {@link Slider} 的 props。 */
export type SliderProps = React.ComponentPropsWithoutRef<typeof Arco.Slider>

/**
 * 一个滑块。
 *
 * @param props - 见 {@link SliderProps}。
 * @returns 滑块元素。
 */
export function Slider(props: SliderProps): React.ReactElement {
  injectBasicStyles()
  return <Arco.Slider {...props} />
}

/** {@link Rate} 的 props。 */
export type RateProps = React.ComponentPropsWithoutRef<typeof Arco.Rate>

/**
 * 一个评分控件。
 *
 * @param props - 见 {@link RateProps}。
 * @returns 评分元素。
 */
export function Rate(props: RateProps): React.ReactElement {
  injectBasicStyles()
  return <Arco.Rate {...props} />
}

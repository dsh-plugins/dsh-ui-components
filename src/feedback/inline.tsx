/**
 * 容器内的反馈组件：提示条、进度、结果。
 *
 * @module @dsh-plugin/dsh-ui-components/feedback/inline
 */
import * as React from 'react'
import { Arco } from '@dsh-plugin/dsh-loader/client'
import { injectFeedbackStyles } from './styles.js'
import { componentProps } from '../foundation/component-props.js'
import { HeroProgress } from './hero-progress.js'
import { HeroResult, statusIcons } from './hero-result.js'

/** {@link Alert} 的 props。 */
export type AlertProps = React.ComponentPropsWithoutRef<typeof Arco.Alert>

/**
 * 页面内的提示条，用于需要常驻的说明与警告。
 *
 * @param props - 见 {@link AlertProps}。
 * @returns 提示条元素。
 */
export function Alert(props: AlertProps): React.ReactElement {
  injectFeedbackStyles()
  const config = React.useContext(Arco.ConfigProvider.ConfigContext)
  const options = componentProps(props, config.componentConfig?.Alert)
  const path = statusIcons[options.type ?? 'info']
  const icon = options.icon === undefined ? <svg className="dsh-alert-status-icon" aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">
    <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d={path} />
  </svg> : options.icon
  return <Arco.Alert {...options} icon={icon} />
}

/** {@link Progress} 的 props。 */
export type ProgressProps = React.ComponentPropsWithoutRef<typeof Arco.Progress>

/**
 * 进度条。
 *
 * @param props - 见 {@link ProgressProps}。
 * @returns 进度条元素。
 */
export function Progress(props: ProgressProps): React.ReactElement {
  injectFeedbackStyles()
  return <HeroProgress {...props} />
}

/** {@link Result} 的 props。 */
export type ResultProps = React.ComponentPropsWithoutRef<typeof Arco.Result>

/**
 * 结果页，用于操作完成、失败或无权限等终态。
 *
 * @param props - 见 {@link ResultProps}。
 * @returns 结果页元素。
 */
export function Result(props: ResultProps): React.ReactElement {
  injectFeedbackStyles()
  return <HeroResult {...props} />
}

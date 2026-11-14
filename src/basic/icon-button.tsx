/**
 * 图标按钮。
 *
 * 只有图标的按钮必须带可访问名称，因此 `label` 是必填项，它同时成为
 * `aria-label` 与 `title`。
 *
 * @module @dsh-plugin/dsh-ui-components/basic/icon-button
 */
import * as React from 'react'
import { Arco } from '@dsh-plugin/dsh-loader/client'
import { injectBasicStyles } from './styles.js'
import { type ButtonProps, type ButtonSize, type ButtonVariant } from './button.js'

/** {@link IconButton} 的 props。 */
export type IconButtonProps = Omit<ButtonProps, 'children' | 'icon' | 'shape'> & {
  /** 按钮图标，通常是 `<Icon ... />` 或从逐图标子路径引入的组件。 */
  icon: React.ReactNode
  /** 可访问名称，作为 `aria-label` 与 `title`。 */
  label: string
  /** 形状，默认 `square`。 */
  shape?: 'square' | 'circle'
}

/** DSH 尺寸到 Arco 尺寸的映射。 */
const ARCO_SIZE: Record<ButtonSize, 'default' | 'small' | 'large'> = {
  md: 'default',
  sm: 'small',
  lg: 'large',
}

/** Arco 的 `type` 取值。 */
const ARCO_TYPE: Record<ButtonVariant, 'primary' | 'secondary' | 'outline' | 'text'> = {
  primary: 'primary',
  secondary: 'secondary',
  outline: 'outline',
  text: 'text',
}

/**
 * 只显示图标的方形或圆形按钮。
 *
 * @param props - 见 {@link IconButtonProps}。
 * @param ref - 指向原生 `button` 元素。
 * @returns 图标按钮元素。
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { icon, label, shape = 'square', variant = 'text', size = 'md', danger, htmlType, ...rest },
  ref,
) {
  injectBasicStyles()
  return (
    <Arco.Button
      {...rest}
      ref={ref}
      type={ARCO_TYPE[variant]}
      size={ARCO_SIZE[size]}
      shape={shape}
      status={danger === true ? 'danger' : undefined}
      htmlType={htmlType ?? 'button'}
      aria-label={label}
      title={rest.title ?? label}
    >
      {icon}
    </Arco.Button>
  )
})

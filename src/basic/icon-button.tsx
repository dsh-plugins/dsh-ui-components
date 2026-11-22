/**
 * 图标按钮。
 *
 * 只有图标的按钮必须带可访问名称，因此 `label` 是必填项，它同时成为
 * `aria-label` 与 `title`。
 *
 * @module @dsh-plugin/dsh-ui-components/basic/icon-button
 */
import * as React from 'react'
import { Button, type ButtonProps } from './button.js'

/** {@link IconButton} 的 props。 */
export type IconButtonProps = Omit<ButtonProps, 'children' | 'icon' | 'shape'> & {
  /** 按钮图标，通常是 `<Icon ... />` 或从逐图标子路径引入的组件。 */
  icon: React.ReactNode
  /** 可访问名称，作为 `aria-label` 与 `title`。 */
  label: string
  /** 形状，默认 `square`。 */
  shape?: 'square' | 'circle'
}

/**
 * 只显示图标的方形或圆形按钮。
 *
 * @param props - 见 {@link IconButtonProps}。
 * @param ref - 指向原生 `button` 元素。
 * @returns 图标按钮元素。
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { icon, label, shape = 'square', variant = 'text', size, danger, htmlType, ...rest },
  ref,
) {
  return (
    <Button
      {...rest}
      ref={ref}
      variant={variant}
      size={size}
      shape={shape}
      danger={danger}
      icon={icon}
      iconOnly
      htmlType={htmlType ?? 'button'}
      aria-label={label}
      title={rest.title ?? label}
    />
  )
})

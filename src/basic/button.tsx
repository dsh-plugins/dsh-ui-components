/**
 * 按钮。
 *
 * 语义与键盘行为来自 Arco 的 `Button`，外观由桥接样式表与 `basic/styles`
 * 决定。DSH 的按钮尺寸是 36（标准）与 28（紧凑），主按钮是中性近黑色而非
 * 品牌蓝，这一层已经由桥接规则处理。
 *
 * @module @dsh-plugin/dsh-ui-components/basic/button
 */
import * as React from 'react'
import { Arco } from '@dsh-plugin/dsh-loader/client'
import { injectBasicStyles } from './styles.js'

/** 按钮的视觉层级。 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text'

/** 按钮尺寸，`md` 高 36，`sm` 高 28。 */
export type ButtonSize = 'md' | 'sm' | 'lg'

/** {@link Button} 的 props。 */
export type ButtonProps = Omit<React.ComponentPropsWithoutRef<typeof Arco.Button>, 'type' | 'size' | 'status'> & {
  /** 视觉层级，默认 `primary`。 */
  variant?: ButtonVariant
  /** 尺寸，默认 `md`。 */
  size?: ButtonSize
  /** 渲染为危险操作（删除、清空）。 */
  danger?: boolean
  /** 前置图标。 */
  icon?: React.ReactNode
  /** 撑满父容器宽度。 */
  block?: boolean
}

/** Arco 的 `type` 取值。 */
const ARCO_TYPE: Record<ButtonVariant, 'primary' | 'secondary' | 'outline' | 'text'> = {
  primary: 'primary',
  secondary: 'secondary',
  outline: 'outline',
  text: 'text',
}

/** DSH 尺寸到 Arco 尺寸的映射。 */
const ARCO_SIZE: Record<ButtonSize, 'default' | 'small' | 'large'> = {
  md: 'default',
  sm: 'small',
  lg: 'large',
}

/**
 * 一个按钮。
 *
 * @param props - 见 {@link ButtonProps}。
 * @param ref - 指向原生 `button` 元素，供焦点管理与浮层定位使用。
 * @returns 按钮元素。
 */
export const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>> =
  React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    { variant = 'primary', size = 'md', danger, icon, block, children, htmlType, ...rest },
    ref,
  ) {
    injectBasicStyles()
    return (
      <Arco.Button
        {...rest}
        ref={ref}
        type={ARCO_TYPE[variant]}
        size={ARCO_SIZE[size]}
        status={danger === true ? 'danger' : undefined}
        long={block === true}
        htmlType={htmlType ?? 'button'}
      >
        {icon === undefined || icon === null ? null : icon}
        <>{children}</>
      </Arco.Button>
    )
  })

/**
 * 文本类输入控件。
 *
 * `Input` / `Textarea` 沿用 Arco 的受控与非受控行为，追加 DSH 的两项约定：
 * 等宽字体开关 `mono` 与校验失败标记 `invalid`。尺寸按 DSH 取 32（标准）/
 * 28（紧凑）/ 44（大）。
 *
 * ref 的类型沿用 Arco 自己的签名：它暴露的是 `{ dom, focus, blur }` 这样的
 * 句柄，而不是原生元素。需要原生元素时用 `ref.current.dom`。
 *
 * @module @dsh-plugin/dsh-ui-components/basic/input
 */
import * as React from 'react'
import { Arco } from '@dsh-plugin/dsh-loader/client'
import { cx } from '../foundation/style.js'
import { injectBasicStyles } from './styles.js'

/** 输入控件的尺寸，与按钮分开定义，因为输入框标准高度是 32 而非 36。 */
export type FieldSize = 'md' | 'sm' | 'lg'

/** DSH 尺寸到 Arco 尺寸的映射。 */
const ARCO_SIZE: Record<FieldSize, 'default' | 'small' | 'large'> = {
  md: 'default',
  sm: 'small',
  lg: 'large',
}

/**
 * 合并 Arco 的 `className`（可能是字符串数组）与 DSH 的附加类名。
 *
 * @param className - Arco 传来的类名。
 * @param extra - 需要追加的类名，假值忽略。
 * @returns 归一化后的 `className`。
 */
function mergeClass(className: string | string[] | undefined, ...extra: Array<string | false | undefined>): string {
  const inherited = Array.isArray(className) ? className : className === undefined ? [] : [className]
  return cx(...inherited, ...extra)
}

/** Arco 输入框暴露的句柄。 */
export type InputRef = React.ElementRef<typeof Arco.Input>

/** Arco 文本域暴露的句柄。 */
export type TextareaRef = React.ElementRef<typeof Arco.Input.TextArea>

/** {@link Input} 的 props。 */
export type InputProps = Omit<React.ComponentPropsWithoutRef<typeof Arco.Input>, 'size'> & {
  /** 尺寸，默认 `md`。 */
  size?: FieldSize
  /** 使用等宽字体，用于路径、命令与标识符。 */
  mono?: boolean
  /** 校验失败。同时设置 `aria-invalid`。 */
  invalid?: boolean
}

/**
 * 单行文本输入。
 *
 * @param props - 见 {@link InputProps}。
 * @param ref - Arco 的输入框句柄，含 `dom`、`focus`、`blur`。
 * @returns 输入框元素。
 */
export const Input = React.forwardRef<InputRef, InputProps>(function Input(
  { size = 'md', mono, invalid, className, status, ...rest },
  ref,
) {
  injectBasicStyles()
  return (
    <Arco.Input
      {...rest}
      ref={ref}
      size={ARCO_SIZE[size]}
      status={invalid === true ? 'error' : status}
      aria-invalid={invalid === true ? true : undefined}
      className={mergeClass(className, mono === true && 'dsh-mono')}
    />
  )
})

/** {@link Textarea} 的 props。 */
export type TextareaProps = Omit<React.ComponentPropsWithoutRef<typeof Arco.Input.TextArea>, 'className'> & {
  /** 尺寸，默认 `md`。Arco 的文本域不接受 `size`，此处以类名表达。 */
  size?: FieldSize
  /** 使用等宽字体。 */
  mono?: boolean
  /** 校验失败。 */
  invalid?: boolean
  /** 追加类名。 */
  className?: string
}

/**
 * 多行文本输入，默认最小高度 72 并允许竖向拉伸。
 *
 * @param props - 见 {@link TextareaProps}。
 * @param ref - Arco 的文本域句柄。
 * @returns 文本域元素。
 */
export const Textarea = React.forwardRef<TextareaRef, TextareaProps>(function Textarea(
  { size = 'md', mono, invalid, className, status, ...rest },
  ref,
) {
  injectBasicStyles()
  return (
    <Arco.Input.TextArea
      {...rest}
      ref={ref}
      status={invalid === true ? 'error' : status}
      aria-invalid={invalid === true ? true : undefined}
      className={mergeClass(className, `dsh-textarea-${size}`, mono === true && 'dsh-mono')}
    />
  )
})

/** Arco 数字输入暴露的句柄。 */
export type InputNumberRef = React.ElementRef<typeof Arco.InputNumber>

/** {@link InputNumber} 的 props。 */
export type InputNumberProps = Omit<React.ComponentPropsWithoutRef<typeof Arco.InputNumber>, 'size'> & {
  /** 尺寸，默认 `md`。 */
  size?: FieldSize
}

/**
 * 数字输入，可带步进按钮。
 *
 * @param props - 见 {@link InputNumberProps}。
 * @param ref - Arco 的数字输入句柄。
 * @returns 数字输入元素。
 */
export const InputNumber = React.forwardRef<InputNumberRef, InputNumberProps>(function InputNumber(
  { size = 'md', ...rest },
  ref,
) {
  injectBasicStyles()
  return <Arco.InputNumber {...rest} ref={ref} size={ARCO_SIZE[size]} />
})

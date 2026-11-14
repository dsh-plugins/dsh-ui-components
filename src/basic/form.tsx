/**
 * 表单与字段容器。
 *
 * `Field` 是设置页最常用的组合：标签、控件、说明文字与校验消息。它自己不做
 * 校验，只在有 `error` 时把消息以 `role="alert"` 渲染出来，并把 `id` 关联到
 * 标签上。`Form` 直接沿用 Arco 的校验与布局能力。
 *
 * @module @dsh-plugin/dsh-ui-components/basic/form
 */
import * as React from 'react'
import { Arco } from '@dsh-plugin/dsh-loader/client'
import { cx, injectUiStyle } from '../foundation/style.js'
import { injectBasicStyles } from './styles.js'

/** 字段容器的样式表，单独一张，避免与控件表混在一起。 */
const FIELD_CSS = `
.dsh-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.dsh-field__label {
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  color: var(--dsw-alias-label-secondary);
}

.dsh-field__required {
  margin-left: 2px;
  color: var(--dsw-alias-state-error-primary);
}

.dsh-field__desc {
  font-size: 12px;
  line-height: 18px;
  color: var(--dsw-alias-label-tertiary);
}

.dsh-field__error {
  font-size: 12px;
  line-height: 18px;
  color: var(--dsw-alias-state-error-primary);
}

.dsh-field--inline {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.dsh-field--inline .dsh-field__text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
`

/**
 * 注入字段样式。
 *
 * @returns 释放函数。
 */
function injectFieldStyles(): void {
  injectUiStyle('basic/field.css', FIELD_CSS)
}

/** {@link Field} 的 props。 */
export interface FieldProps {
  /** 字段标签。 */
  label?: React.ReactNode
  /** 控件下方或右侧的说明文字。 */
  description?: React.ReactNode
  /** 校验失败消息。存在时以 `role="alert"` 渲染。 */
  error?: React.ReactNode
  /** 与控件 `id` 关联的标签 `htmlFor`。 */
  htmlFor?: string
  /** 标记为必填，仅在标签后显示星号。 */
  required?: boolean
  /**
   * 布局。`stack` 让标签在上、控件在下；`inline` 让文字在左、控件在右，
   * 适合开关与短选择器。
   */
  layout?: 'stack' | 'inline'
  /** 控件。 */
  children?: React.ReactNode
  /** 追加类名。 */
  className?: string
}

/**
 * 标签、控件与说明文字组成的标准字段。
 *
 * @param props - 见 {@link FieldProps}。
 * @returns 字段容器元素。
 */
export function Field({
  label,
  description,
  error,
  htmlFor,
  required,
  layout = 'stack',
  children,
  className,
}: FieldProps): React.ReactElement {
  injectFieldStyles()
  const hasError = error !== undefined && error !== null && error !== false
  const text =
    label === undefined && description === undefined
      ? null
      : (
        <div className="dsh-field__text">
          {label === undefined
            ? null
            : (
              <label className="dsh-field__label" htmlFor={htmlFor}>
                {label}
                {required === true ? <span className="dsh-field__required">*</span> : null}
              </label>
            )}
          {description === undefined ? null : <span className="dsh-field__desc">{description}</span>}
        </div>
      )

  if (layout === 'inline') {
    return (
      <div className={cx('dsh-field', 'dsh-field--inline', className)}>
        {text}
        {children}
        {hasError ? (
          <span className="dsh-field__error" role="alert">
            {error}
          </span>
        ) : null}
      </div>
    )
  }

  return (
    <div className={cx('dsh-field', className)}>
      {text}
      {children}
      {hasError ? (
        <span className="dsh-field__error" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  )
}

/** {@link Form} 的 props，与 Arco 的 `Form` 一致。 */
export type FormProps = React.ComponentPropsWithoutRef<typeof Arco.Form>

/**
 * 表单容器，提供 Arco 的校验、布局与提交语义。
 *
 * @param props - 见 {@link FormProps}。
 * @returns 表单元素。
 */
export function Form(props: FormProps): React.ReactElement {
  injectBasicStyles()
  return <Arco.Form {...props} />
}

/** {@link FormItem} 的 props。 */
export type FormItemProps = React.ComponentPropsWithoutRef<typeof Arco.Form.Item>

/**
 * 表单中的一项，带标签与校验消息。
 *
 * @param props - 见 {@link FormItemProps}。
 * @returns 表单项元素。
 */
export function FormItem(props: FormItemProps): React.ReactElement {
  injectBasicStyles()
  return <Arco.Form.Item {...props} />
}

/**
 * 选择类控件。
 *
 * 选项数据统一用 `options: { value, label, disabled }[]`，与 DSH 宿主自己的
 * 选择器一致；`onChange` 直接回调选中的 value，而不是 DOM 事件。
 *
 * @module @dsh-plugin/dsh-ui-components/basic/select
 */
import * as React from 'react'
import { Arco } from '@dsh-plugin/dsh-loader/client'
import { injectBasicStyles } from './styles.js'
import { type FieldSize } from './input.js'
import { HeroChevronDown } from '../foundation/hero-icons.js'
import { wrapScopedPopup } from '../foundation/scoped-popup.js'

const ScopedSelect = wrapScopedPopup(Arco.Select, {}, true)
const ScopedAutoComplete = wrapScopedPopup(Arco.AutoComplete)

/** DSH 尺寸到 Arco 尺寸的映射。 */
const ARCO_SIZE: Record<FieldSize, 'default' | 'small' | 'large'> = {
  md: 'default',
  sm: 'small',
  lg: 'large',
}

/** 一个选项。 */
export interface SelectOption {
  /** 提交值。 */
  value: string
  /** 展示文本。 */
  label: React.ReactNode
  /** 不可选。 */
  disabled?: boolean
}

/** {@link Select} 的 props。 */
export interface SelectProps {
  /** 选项列表。 */
  options: readonly SelectOption[]
  /** 当前值；多选时为数组。 */
  value?: string | string[]
  /** 默认值；多选时为数组。 */
  defaultValue?: string | string[]
  /** 选中项变化时回调，参数是选项 value（多选时为数组）。 */
  onChange?: (value: string | string[]) => void
  /** 多选模式。 */
  multiple?: boolean
  /** 允许清空。 */
  allowClear?: boolean
  /** 无选中项时显示的占位文本。 */
  placeholder?: string
  /** 禁用。 */
  disabled?: boolean
  /** 尺寸，默认 `md`。 */
  size?: FieldSize
  /** 校验失败。 */
  invalid?: boolean
  /** 前置标签。 */
  prefix?: React.ReactNode
  /** 输入框 id，用于与 `Field` 的 label 关联。 */
  id?: string
  /** 追加类名。 */
  className?: string
  /** 追加内联样式。 */
  style?: React.CSSProperties
}

/**
 * 下拉选择。
 *
 * @param props - 见 {@link SelectProps}。
 * @returns 选择器元素。
 */
export function Select({
  options,
  value,
  defaultValue,
  onChange,
  multiple,
  allowClear,
  placeholder,
  disabled,
  size = 'md',
  invalid,
  prefix,
  id,
  className,
  style,
}: SelectProps): React.ReactElement {
  injectBasicStyles()
  return (
    <ScopedSelect
      options={options as SelectOption[]}
      arrowIcon={<HeroChevronDown />}
      {...(value === undefined ? {} : { value })}
      defaultValue={defaultValue}
      onChange={onChange as (value: unknown) => void}
      mode={multiple === true ? 'multiple' : undefined}
      allowClear={allowClear}
      placeholder={placeholder}
      disabled={disabled}
      size={ARCO_SIZE[size]}
      status={invalid === true ? 'error' : undefined}
      prefix={prefix}
      id={id}
      className={className}
      style={style}
    />
  )
}

/** {@link AutoComplete} 的 props。 */
export type AutoCompleteProps = React.ComponentPropsWithoutRef<typeof Arco.AutoComplete>

/**
 * 带候选提示的文本输入。
 *
 * 高度沿用 Arco 的尺寸，通过 `inputProps` 透传输入框属性。
 *
 * @param props - 见 {@link AutoCompleteProps}。
 * @returns 自动完成输入元素。
 */
export function AutoComplete(props: AutoCompleteProps): React.ReactElement {
  injectBasicStyles()
  return <ScopedAutoComplete {...props} />
}

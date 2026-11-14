/**
 * 选择类数据组件：日期、时间、级联、树选择与穿梭框。
 *
 * 这些组件的浮层统一走菜单材质与浮起阴影，由 `data/styles` 落实。
 *
 * @module @dsh-plugin/dsh-ui-components/data/picker
 */
import * as React from 'react'
import { Arco } from '@dsh-plugin/dsh-loader/client'
import { injectDataStyles } from './styles.js'

/** {@link DatePicker} 的 props。 */
export type DatePickerProps = React.ComponentPropsWithoutRef<typeof Arco.DatePicker>

/**
 * 日期选择。
 *
 * @param props - 见 {@link DatePickerProps}。
 * @returns 日期选择元素。
 */
function DatePickerBase(props: DatePickerProps): React.ReactElement {
  injectDataStyles()
  return <Arco.DatePicker {...props} />
}

/** 月份选择。 */
export const MonthPicker = Arco.DatePicker.MonthPicker
/** 年份选择。 */
export const YearPicker = Arco.DatePicker.YearPicker
/** 季度选择。 */
export const QuarterPicker = Arco.DatePicker.QuarterPicker
/** 周选择。 */
export const WeekPicker = Arco.DatePicker.WeekPicker
/** 日期区间选择。 */
export const RangePicker = Arco.DatePicker.RangePicker

/** 带静态子组件的日期选择导出。 */
export const DatePicker = Object.assign(DatePickerBase, {
  MonthPicker: Arco.DatePicker.MonthPicker,
  YearPicker: Arco.DatePicker.YearPicker,
  QuarterPicker: Arco.DatePicker.QuarterPicker,
  WeekPicker: Arco.DatePicker.WeekPicker,
  RangePicker: Arco.DatePicker.RangePicker,
})

/** {@link TimePicker} 的 props。 */
export type TimePickerProps = React.ComponentPropsWithoutRef<typeof Arco.TimePicker>

/**
 * 时间选择。
 *
 * @param props - 见 {@link TimePickerProps}。
 * @returns 时间选择元素。
 */
function TimePickerBase(props: TimePickerProps): React.ReactElement {
  injectDataStyles()
  return <Arco.TimePicker {...props} />
}

/** 时间区间选择。 */
export const TimeRangePicker = Arco.TimePicker.RangePicker

/** 带静态子组件的时间选择导出。 */
export const TimePicker = Object.assign(TimePickerBase, { RangePicker: Arco.TimePicker.RangePicker })

/** {@link Cascader} 的 props。 */
export type CascaderProps = React.ComponentPropsWithoutRef<typeof Arco.Cascader>

/**
 * 级联选择。
 *
 * @param props - 见 {@link CascaderProps}。
 * @returns 级联元素。
 */
export function Cascader(props: CascaderProps): React.ReactElement {
  injectDataStyles()
  return <Arco.Cascader {...props} />
}

/** {@link TreeSelect} 的 props。 */
export type TreeSelectProps = React.ComponentPropsWithoutRef<typeof Arco.TreeSelect>

/**
 * 树形选择。
 *
 * @param props - 见 {@link TreeSelectProps}。
 * @returns 树选择元素。
 */
export function TreeSelect(props: TreeSelectProps): React.ReactElement {
  injectDataStyles()
  return <Arco.TreeSelect {...props} />
}

/** {@link Transfer} 的 props。 */
export type TransferProps = React.ComponentPropsWithoutRef<typeof Arco.Transfer>

/**
 * 穿梭框。
 *
 * @param props - 见 {@link TransferProps}。
 * @returns 穿梭框元素。
 */
export function Transfer(props: TransferProps): React.ReactElement {
  injectDataStyles()
  return <Arco.Transfer {...props} />
}

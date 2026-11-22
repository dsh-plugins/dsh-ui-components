import type { ComponentMeta } from './types'
import * as V2 from '../demos/vue-demos-2'
import * as R from '../demos/react-demos'

export const dataEntryComponents: ComponentMeta[] = [
  {
    slug: 'auto-complete',
    name: 'AutoComplete',
    title: '自动补全',
    category: 'data-entry',
    categoryLabel: '数据输入',
    description: '输入框自动完成功能（别名 Autocomplete）。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'autocomplete-basic',
        title: '自动补全与禁用',
        description: '输入字符自动匹配候选项，支持 allowClear 与 disabled。',
        vueComponent: V2.AutoCompleteBasicVue,
        reactComponent: R.AutoCompleteReact,
        vueCode: `<template>\n  <AutoComplete v-model="val" :data="['Vue 3', 'Vite', 'Vitest']" allow-clear />\n</template>`,
        reactCode: `import { AutoComplete } from '@dsh-plugin/dsh-ui-components'

export function Demo() {
  return <AutoComplete data={['React', 'Vite', 'Arco', 'TypeScript']} placeholder="输入 R 或 A" allowClear />
}`,
      },
    ],
    apiSections: [
      {
        id: 'api-autocomplete-props',
        title: 'AutoComplete Props',
        kind: 'props',
        rows: [
          { name: 'modelValue / value', description: '绑定值（Vue 支持 v-model）', type: 'string', defaultValue: '-' },
          { name: 'data', description: '自动补全的数据源', type: 'Array<string | SelectOptionData>', defaultValue: '[]' },
          { name: 'allowClear', description: '是否允许清空输入框', type: 'boolean', defaultValue: 'false' },
          { name: 'disabled', description: '是否禁用', type: 'boolean', defaultValue: 'false' },
          { name: 'strict', description: '是否严格区分大小写匹配', type: 'boolean', defaultValue: 'false' },
        ],
      },
      {
        id: 'api-autocomplete-events',
        title: 'AutoComplete Events',
        kind: 'events',
        rows: [
          { name: 'search / onSearch', description: '输入搜索时触发', type: '(value: string) => void' },
          { name: 'select / onSelect', description: '选择选项时触发', type: '(value: string) => void' },
          { name: 'change / onChange', description: '输入值改变时触发', type: '(value: string) => void' },
        ],
      },
    ],
  },
  {
    slug: 'cascader',
    name: 'Cascader',
    title: '级联选择',
    category: 'data-entry',
    categoryLabel: '数据输入',
    description: '从一组相关联的多级数据集合中进行选择。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'cascader-basic',
        title: '单选与多选级联',
        description: '展示单选与 multiple 多选模式。',
        vueComponent: V2.CascaderBasicVue,
        reactComponent: R.CascaderReact,
        vueCode: `<template>\n  <Cascader :options="options" allow-clear />\n  <Cascader :options="options" multiple />\n</template>`,
        reactCode: `import { Cascader } from '@dsh-plugin/dsh-ui-components'\n\nexport function Demo() {\n  const options = [{ value: 'cn', label: '中国', children: [{ value: 'bj', label: '北京' }] }]\n  return <Cascader options={options} placeholder="请选择地区" allowClear />\n}`,
      },
    ],
    apiSections: [
      {
        id: 'api-cascader-props',
        title: 'Cascader Props',
        kind: 'props',
        rows: [
          { name: 'options', description: '级联选项数据', type: 'CascaderOption[]', defaultValue: '[]' },
          { name: 'multiple', description: '是否开启多选（React 使用 mode="multiple"）', type: 'boolean', defaultValue: 'false' },
          { name: 'allowClear', description: '是否允许清除', type: 'boolean', defaultValue: 'false' },
          { name: 'allowSearch', description: '是否允许搜索（React 使用 showSearch）', type: 'boolean', defaultValue: 'false' },
          { name: 'expandTrigger', description: '次级菜单展开方式', type: `'click' | 'hover'`, defaultValue: `'click'` },
        ],
      },
      {
        id: 'api-cascader-events',
        title: 'Cascader Events',
        kind: 'events',
        rows: [
          { name: 'change / onChange', description: '选中值改变时触发', type: '(value: any) => void' },
        ],
      },
    ],
  },
  {
    slug: 'checkbox',
    name: 'Checkbox',
    title: '复选框',
    category: 'data-entry',
    categoryLabel: '数据输入',
    description: '在一组可选项中进行多项选择（含 CheckboxGroup）。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'checkbox-basic',
        title: '基础、半选与复选框组',
        description: '展示 checked、indeterminate 半选、disabled 与 CheckboxGroup。',
        vueComponent: V2.CheckboxBasicVue,
        reactComponent: R.CheckboxReact,
        vueCode: `<template>\n  <Checkbox v-model="checked">单个复选框</Checkbox>\n  <Checkbox indeterminate>半选</Checkbox>\n  <CheckboxGroup v-model="group" :options="options" />\n</template>`,
        reactCode: `import { CheckboxGroup } from '@dsh-plugin/dsh-ui-components'

export function Demo() {
  return (
    <CheckboxGroup
      defaultValue={['react']}
      options={[
        { label: 'React 18', value: 'react' },
        { label: 'TypeScript', value: 'ts' },
      ]}
    />
  )
}`,
      },
    ],
    apiSections: [
      {
        id: 'api-checkbox-props',
        title: 'Checkbox Props',
        kind: 'props',
        rows: [
          { name: 'modelValue / checked', description: '是否选中', type: 'boolean', defaultValue: 'false' },
          { name: 'indeterminate', description: '是否为半选状态', type: 'boolean', defaultValue: 'false' },
          { name: 'disabled', description: '是否禁用', type: 'boolean', defaultValue: 'false' },
          { name: 'value', description: '在 CheckboxGroup 中对应的选项值', type: 'string | number | boolean', defaultValue: '-' },
        ],
      },
      {
        id: 'api-checkbox-group-props',
        title: 'CheckboxGroup Props',
        kind: 'props',
        rows: [
          { name: 'modelValue / value', description: '当前选中项数组', type: 'Array<string | number>', defaultValue: '[]' },
          { name: 'options', description: '选项配置数组', type: 'Array<string | number | CheckboxOption>', defaultValue: '[]' },
          { name: 'direction', description: '排列方向', type: `'horizontal' | 'vertical'`, defaultValue: `'horizontal'` },
          { name: 'max', description: '最多可选数量', type: 'number', defaultValue: '-' },
        ],
      },
      {
        id: 'api-checkbox-events',
        title: 'Checkbox Events',
        kind: 'events',
        rows: [
          { name: 'change / onChange', description: '选中状态变化时触发', type: '(value: boolean | string[]) => void' },
        ],
      },
    ],
  },
  {
    slug: 'color-picker',
    name: 'ColorPicker',
    title: '颜色选择器',
    category: 'data-entry',
    categoryLabel: '数据输入',
    description: '用于颜色选择与色值输入，统一触发器与浮层面板样式。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'colorpicker-basic',
        title: '颜色选择、显示色值与禁用',
        description: '开启 showFormatControls 可切换颜色格式并编辑透明度。示例同时展示色值文本和禁用状态。',
        vueComponent: V2.ColorPickerBasicVue,
        reactComponent: R.ColorPickerReact,
        vueCode: `<template>\n  <ColorPicker default-value="#722ed1" show-text show-format-controls />\n</template>`,
        reactCode: `import { ColorPicker } from '@dsh-plugin/dsh-ui-components'

export function Demo() {
  return <ColorPicker defaultValue="#722ed1" showText showFormatControls />
}`,
      },
    ],
    props: [
      { name: 'modelValue / value', description: '单色模式下的 HEX 或 RGB 色值', type: 'string', defaultValue: '-' },
      { name: 'showText', description: '是否在触发器上显示色值文本', type: 'boolean', defaultValue: 'false' },
      { name: 'showFormatControls', description: '显示格式切换和透明度数值控件', type: 'boolean', defaultValue: 'false' },
      { name: 'className / triggerProps.className', description: '分别附加触发器和浮层的类名，可传数组', type: 'string | string[]', framework: 'react' },
      { name: 'disabled', description: '是否禁用', type: 'boolean', defaultValue: 'false' },
    ],
  },
  {
    slug: 'date-picker',
    name: 'DatePicker',
    title: '日期选择器',
    category: 'data-entry',
    categoryLabel: '数据输入',
    description: 'DatePicker 选择单日，RangePicker 选择日期范围。Vue 也导出 DateRangePicker 别名。另提供月份、季度、周和年份选择器。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'datepicker-basic',
        title: '日期、范围与月份选择',
        description: '可逐段编辑年、月、日，也可从日历选择。已有日期可直接清空。',
        vueComponent: V2.DatePickerBasicVue,
        reactComponent: R.DatePickerReact,
        vueCode: `<template>\n  <DatePicker default-value="2026-01-02" format="YYYY-MM-DD" />\n  <RangePicker :placeholder="['开始日期', '结束日期']" />\n  <MonthPicker placeholder="选择月份" />\n</template>`,
        reactCode: `import { DatePicker, MonthPicker, RangePicker } from '@dsh-plugin/dsh-ui-components'

export function Demo() {
  return (
    <>
      <DatePicker defaultValue="2026-01-02" format="YYYY-MM-DD" />
      <RangePicker placeholder={['开始日期', '结束日期']} />
      <MonthPicker placeholder="选择月份" />
    </>
  )
}`,
      },
    ],
    apiSections: [
      {
        id: 'api-datepicker-props',
        title: 'DatePicker Props',
        kind: 'props',
        rows: [
          { name: 'modelValue', description: 'Vue v-model 绑定的日期。外部设为 undefined 可清空，defaultValue 只在未绑定时作为初始值', type: 'string | number | Date', framework: 'vue' },
          { name: 'value', description: 'React 受控日期值', type: 'string | number | Date | Dayjs', framework: 'react' },
          { name: 'pickerValue', description: '控制面板显示的月份。未指定时面板随外部选中的日期切换月份', type: 'DateValue' },
          { name: 'format', description: '分段输入按声明的格式显示，MM 和 DD 保留前导零', type: 'string', defaultValue: '中文环境 YYYY-MM-DD' },
          { name: 'id', description: '分段日期控件的标签目标，可用 label 的 for / htmlFor 关联日历按钮', type: 'string' },
          { name: 'placeholder', description: '空日期的占位文字', type: 'string' },
          { name: 'size', description: '小、中、大档控件高度分别为 28、36、44 px', type: "'mini' | 'small' | 'medium' | 'large'", defaultValue: "'medium'", framework: 'vue' },
          { name: 'size', description: '小、中、大档控件高度分别为 28、36、44 px', type: "'mini' | 'small' | 'default' | 'large'", defaultValue: "'default'", framework: 'react' },
          { name: 'showTime', description: '增加时间选择，可在模板中直接写 show-time', type: 'boolean', defaultValue: 'false', framework: 'vue' },
          { name: 'showTime', description: '增加时间选择，可指定时间选择器配置', type: 'boolean | TimePickerProps', defaultValue: 'false', framework: 'react' },
          { name: 'allowClear', description: '是否允许清空', type: 'boolean', defaultValue: 'true' },
          { name: 'disabled', description: '是否禁用', type: 'boolean', defaultValue: 'false' },
        ],
      },
      {
        id: 'api-rangepicker-props',
        title: 'RangePicker Props',
        kind: 'props',
        rows: [
          { name: 'modelValue / value', description: '日期范围 [开始, 结束]。手动编辑只提交完整且顺序有效的区间，未设置 pickerValue 时面板跟随起始月', type: '[DateValue, DateValue]', defaultValue: '-' },
          { name: 'mode', description: '范围选择模式', type: `'date' | 'month' | 'quarter' | 'week' | 'year'`, defaultValue: `'date'` },
          { name: 'placeholder', description: '开始、结束日期的占位文字', type: '[string, string]' },
          { name: 'allowClear', description: '显示清除整个范围的按钮', type: 'boolean', defaultValue: 'true' },
          { name: 'disabledDate', description: '默认日期面板分别判断起点、终点，区间不能跨过两种角色均禁用的日期', type: "(date: Date, type: 'start' | 'end') => boolean", framework: 'vue' },
          { name: 'disabledDate', description: '默认日期面板要求端点及中间日期均可选', type: '(date: Dayjs) => boolean', framework: 'react' },
          { name: 'shortcuts', description: '预设时间范围快捷选项', type: 'ShortcutType[]', defaultValue: '[]' },
        ],
      },
      {
        id: 'api-datepicker-events',
        title: 'DatePicker Events',
        kind: 'events',
        rows: [
          { name: 'change / ok', description: '更改日期 / 确认日期。value 的类型由 valueFormat 决定，清除时没有选中日期', type: '(value, date, formatted) => void', framework: 'vue' },
          { name: 'onChange / onOk', description: '更改或确认单日。分段输入的清除操作传给 onChange 的文本为空字符串', type: '(formatted: string, date?: Dayjs) => void', framework: 'react' },
          { name: 'RangePicker.onChange', description: '更改日期范围。清空分段输入时两个参数均为空数组', type: '(formatted: string[], dates: Dayjs[]) => void', framework: 'react' },
          { name: 'clear / onClear', description: '点击单日或范围选择器的清除按钮时触发一次', type: '() => void' },
        ],
      },
    ],
  },
  {
    slug: 'form',
    name: 'Form / Field / Fieldset',
    title: '表单',
    category: 'data-entry',
    categoryLabel: '数据输入',
    description: '保留 Arco Form 校验规则，提供 Field、Fieldset、Label、Description 与 FieldError。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'form-basic',
        title: '动态切换表单布局 (layout)',
        description: '点击按钮实时切换 vertical / horizontal / inline 三种表单排列方式。',
        vueComponent: V2.FormBasicVue,
        reactComponent: R.FormReact,
        vueCode: `<template>\n  <Form :model="form" :layout="layout">\n    <FormItem field="name" label="工作区名称" required><Input v-model="form.name" /></FormItem>\n  </Form>\n</template>`,
        reactCode: `import { Form, FormItem, Input, Button } from '@dsh-plugin/dsh-ui-components'

export function Demo() {
  return (
    <Form layout="vertical">
      <FormItem label="用户名" field="username" rules={[{ required: true, message: '请输入用户名' }]}>
        <Input placeholder="请输入用户名" />
      </FormItem>
      <FormItem>
        <Button variant="primary">提交</Button>
      </FormItem>
    </Form>
  )
}`,
      },
    ],
    apiSections: [
      {
        id: 'api-form-props',
        title: 'Form Props',
        kind: 'props',
        rows: [
          { name: 'model', description: '表单数据对象（Vue）', type: 'Record<string, any>', defaultValue: '-', framework: 'vue' },
          { name: 'layout', description: '表单布局方式', type: `'horizontal' | 'vertical' | 'inline'`, defaultValue: `'horizontal'` },
          { name: 'size', description: '表单控件统一尺寸', type: `'mini' | 'small' | 'medium' | 'large'`, defaultValue: `'medium'` },
          { name: 'disabled', description: '是否禁用表单内全部控件', type: 'boolean', defaultValue: 'false' },
        ],
      },
      {
        id: 'api-form-item-props',
        title: 'FormItem Props',
        kind: 'props',
        rows: [
          { name: 'field', description: '表单项字段名', type: 'string', required: true },
          { name: 'label', description: '标签文本', type: 'string | ReactNode', defaultValue: '-' },
          { name: 'rules', description: '校验规则数组', type: 'FieldRule[]', defaultValue: '-' },
          { name: 'required', description: '是否显示必填星号', type: 'boolean', defaultValue: 'false' },
          { name: 'help / extra', description: '提示或补充说明文案', type: 'string | ReactNode', defaultValue: '-' },
        ],
      },
      {
        id: 'api-form-events',
        title: 'Form Events',
        kind: 'events',
        rows: [
          { name: 'submit / onSubmit', description: '表单校验通过并提交时触发', type: '(values: Record<string, any>) => void' },
          { name: 'submit-failed / onSubmitFailed', description: '表单校验失败时触发', type: '(errors: Record<string, any>) => void' },
        ],
      },
    ],
  },
  {
    slug: 'input',
    name: 'Input / Textarea',
    title: '输入框',
    category: 'data-entry',
    categoryLabel: '数据输入',
    description: '包含单行 Input、多行 Textarea（TextArea）与 InputGroup。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'input-basic',
        title: '尺寸、错误态、禁用与文本域',
        description: '展示输入尺寸、清除、校验、禁用和自适应高度的文本域。',
        vueComponent: V2.InputBasicVue,
        reactComponent: R.InputReact,
        vueCode: `<template>\n  <Input v-model="val" allow-clear />\n  <Input size="small" placeholder="small" />\n  <Input error placeholder="error" />\n  <Textarea auto-size />\n</template>`,
        reactCode: `import * as React from 'react'
import { Field, Input, Textarea } from '@dsh-plugin/dsh-ui-components'

export function Demo() {
  const [val, setVal] = React.useState('')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Field label="工作区名称" htmlFor="r-input">
        <Input id="r-input" value={val} onChange={(v) => setVal(v)} placeholder="请输入名称" />
      </Field>
      <Textarea placeholder="Textarea 多行输入" />
    </div>
  )
}`,
      },
    ],
    apiSections: [
      {
        id: 'api-input-props',
        title: 'Input Props',
        kind: 'props',
        rows: [
          { name: 'modelValue / value', description: '绑定输入值', type: 'string', defaultValue: '-' },
          { name: 'size', description: '小、中、大档的外框高度分别为 28、36、44px', type: "'mini' | 'small' | 'medium' | 'large'", defaultValue: "'medium'", framework: 'vue' },
          { name: 'size', description: '小、中、大档的外框高度分别为 28、36、44px', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", framework: 'react' },
          { name: 'allowClear', description: '是否显示清除按钮', type: 'boolean', defaultValue: 'false' },
          { name: 'error', description: '是否为错误状态', type: 'boolean', defaultValue: 'false', framework: 'vue' },
          { name: 'invalid', description: '标记错误并设置 aria-invalid 为 true', type: 'boolean', defaultValue: 'false', framework: 'react' },
          { name: 'aria-invalid', description: '传给输入元素的校验状态，invalid 为 true 时优先', type: "boolean | 'true' | 'false' | 'grammar' | 'spelling'", framework: 'react' },
          { name: 'disabled', description: '是否禁用', type: 'boolean', defaultValue: 'false' },
          { name: 'maxLength', description: '最大输入长度', type: 'number | { length: number; errorOnly?: boolean }', defaultValue: '-' },
        ],
      },
      {
        id: 'api-textarea-props',
        title: 'Textarea Props',
        kind: 'props',
        rows: [
          { name: 'size', description: '最小外框高度分别为 60、72、96px', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", framework: 'react' },
          { name: 'size', description: '最小外框高度分别为 60、72、96px', type: "'small' | 'medium' | 'large'", defaultValue: "'medium'", framework: 'vue' },
          { name: 'aria-invalid', description: '传给文本域的原生校验状态，invalid 为 true 时优先', type: "boolean | 'true' | 'false' | 'grammar' | 'spelling'", framework: 'react' },
          { name: 'autoSize', description: '是否自适应内容高度', type: 'boolean | { minRows?: number; maxRows?: number }', defaultValue: 'false' },
          { name: 'showWordLimit', description: '是否显示字数统计（需配合 maxLength）', type: 'boolean', defaultValue: 'false' },
        ],
      },
      {
        id: 'api-input-events',
        title: 'Input Events',
        kind: 'events',
        rows: [
          { name: 'input / change / onChange', description: '输入值变化时触发', type: '(value: string) => void' },
          { name: 'press-enter / onPressEnter', description: '按下回车键时触发', type: '(ev: KeyboardEvent) => void' },
        ],
      },
    ],
  },
  {
    slug: 'input-number',
    name: 'InputNumber',
    title: '数字输入框',
    category: 'data-entry',
    categoryLabel: '数据输入',
    description: '仅允许输入标准数字值（别名 NumberField），支持 embed 与 button 两种模式。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'inputnumber-basic',
        title: '模式与禁用态 (mode)',
        description: '展示默认 embed 模式、mode="button" 模式与 disabled 状态。',
        vueComponent: V2.InputNumberBasicVue,
        reactComponent: R.InputNumberReact,
        vueCode: `<template>\n  <InputNumber v-model="num" :min="0" :max="100" />\n  <InputNumber mode="button" :default-value="10" />\n</template>`,
        reactCode: `import * as React from 'react'
import { InputNumber } from '@dsh-plugin/dsh-ui-components'

export function Demo() {
  const [n, setN] = React.useState(5)
  return <InputNumber value={n} onChange={(v) => setN(v ?? 0)} min={0} max={100} />
}`,
      },
    ],
    apiSections: [
      {
        id: 'api-inputnumber-props',
        title: 'InputNumber Props',
        kind: 'props',
        rows: [
          { name: 'modelValue / value', description: '当前数值', type: 'number', defaultValue: '-' },
          { name: 'mode', description: '按钮位置模式', type: `'embed' | 'button'`, defaultValue: `'embed'` },
          { name: 'min / max', description: '最小值与最大值', type: 'number', defaultValue: '-Infinity / Infinity' },
          { name: 'step', description: '步进精度', type: 'number', defaultValue: '1' },
          { name: 'precision', description: '数值精度（小数位数）', type: 'number', defaultValue: '-' },
          { name: 'disabled', description: '是否禁用', type: 'boolean', defaultValue: 'false' },
        ],
      },
    ],
  },
  {
    slug: 'input-otp',
    name: 'InputOTP / VerificationCode',
    title: '验证码输入',
    category: 'data-entry',
    categoryLabel: '数据输入',
    badge: 'DSH',
    description: 'Vue 使用 InputOTP，React 使用 VerificationCode。两端均以独立字符格展示验证码。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'inputotp-basic',
        title: '六位验证码输入',
        description: '输入六个字符后显示完成状态。',
        reactComponent: R.VerificationCodeBasicReact,
        reactCode: `import * as React from 'react'
import * as DSH from '@dsh-plugin/dsh-ui-components'

function Demo() {
  const [code, setCode] = React.useState('')
  return (
    <div>
      <DSH.VerificationCode length={6} onChange={setCode} />
      <p aria-live="polite">{code.length === 6 ? '已完成输入' : ''}</p>
    </div>
  )
}`,
        vueComponent: V2.InputOtpBasicVue,
        vueCode: `<template>\n  <InputOTP v-model="code" :length="6" @complete="onComplete" />\n</template>`,
      },
    ],
    props: [
      { name: 'modelValue / value', description: 'Vue / React 的受控验证码字符串', type: 'string', defaultValue: `''` },
      { name: 'length', description: '字符格数量', type: 'number', defaultValue: '6' },
      { name: 'type', description: 'Vue 输入类型限制', type: `'numeric' | 'text'`, defaultValue: `'numeric'` },
      { name: 'disabled', description: '是否禁用', type: 'boolean', defaultValue: 'false' },
    ],
    events: [
      { name: 'complete / onFinish', description: '填满所有字符格时触发', type: '(code: string) => void' },
    ],
  },
  {
    slug: 'input-tag',
    name: 'InputTag / TagGroup',
    title: '标签输入与标签组',
    category: 'data-entry',
    categoryLabel: '数据输入',
    description: 'InputTag 支持回车录入标签；TagGroup 支持删除后焦点恢复。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'inputtag-basic',
        title: 'InputTag 与 TagGroup',
        description: '输入后按回车新增标签，支持点击关闭按钮移除。',
        reactComponent: R.InputTagBasicReact,
        reactCode: `import * as DSH from '@dsh-plugin/dsh-ui-components'

function Demo() {
  return <DSH.InputTag defaultValue={['React', 'TypeScript']} placeholder="输入后按回车添加标签" allowClear />
}`,
        vueComponent: V2.InputTagBasicVue,
        vueCode: `<template>\n  <InputTag :default-value="['Vue', 'TypeScript']" allow-clear />\n  <TagGroup v-model="tags" />\n</template>`,
      },
    ],
    props: [
      { name: 'modelValue', description: '标签数组', type: 'string[] | TagItem[]', defaultValue: '[]' },
      { name: 'allowClear', description: '是否允许清空全部标签', type: 'boolean', defaultValue: 'false' },
      { name: 'maxTagCount', description: '最多展示的标签数量', type: 'number', defaultValue: '-' },
    ],
  },
  {
    slug: 'mention',
    name: 'Mention / Mentions',
    title: '提及',
    category: 'data-entry',
    categoryLabel: '数据输入',
    description: '用于在输入中通过 @ 符号提及特定人员或对象。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'mention-basic',
        title: '基础提及输入',
        description: '输入 @ 自动弹出候选列表。',
        reactComponent: R.MentionsBasicReact,
        reactCode: `import * as DSH from '@dsh-plugin/dsh-ui-components'

function Demo() {
  return <DSH.Mentions options={['Alice', 'Bob', 'Charlie']} placeholder="输入 @ 提及" />
}`,
        vueComponent: V2.MentionBasicVue,
        vueCode: `<template>\n  <Mention :data="['Alice', 'Bob', 'Charlie']" placeholder="输入 @ 提及" />\n</template>`,
      },
    ],
    props: [
      { name: 'data', description: '提及候选项列表', type: 'string[]', defaultValue: '[]' },
      { name: 'prefix', description: '触发字符前缀', type: 'string | string[]', defaultValue: `'@'` },
      { name: 'type', description: 'Vue 输入框类型，默认显示一行文本域', type: `'input' | 'textarea'`, defaultValue: `'textarea'` },
    ],
  },
  {
    slug: 'radio',
    name: 'Radio',
    title: '单选框',
    category: 'data-entry',
    categoryLabel: '数据输入',
    description: '用于在多个备选项中选中单个状态（含 RadioGroup）。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'radio-basic',
        title: '标准单选与按钮单选 (type="button")',
        description: '展示常规圆圈单选与按钮组单选两种形态。',
        vueComponent: V2.RadioBasicVue,
        reactComponent: R.RadioReact,
        vueCode: `<template>\n  <RadioGroup v-model="val"><Radio value="auto">自动</Radio></RadioGroup>\n  <RadioGroup v-model="val" type="button" :options="options" />\n</template>`,
        reactCode: `import { Radio, RadioGroup } from '@dsh-plugin/dsh-ui-components'

export function Demo() {
  return (
    <RadioGroup defaultValue="auto">
      <Radio value="auto" label="自动" />
      <Radio value="manual" label="手动" />
    </RadioGroup>
  )
}`,
      },
    ],
    apiSections: [
      {
        id: 'api-radio-props',
        title: 'Radio Props',
        kind: 'props',
        rows: [
          { name: 'value', description: '单选框的值', type: 'string | number | boolean', required: true },
          { name: 'checked', description: '是否选中（受控）', type: 'boolean', defaultValue: '-' },
          { name: 'disabled', description: '是否禁用', type: 'boolean', defaultValue: 'false' },
        ],
      },
      {
        id: 'api-radiogroup-props',
        title: 'RadioGroup Props',
        kind: 'props',
        rows: [
          { name: 'modelValue / value', description: '当前选中值', type: 'string | number | boolean', defaultValue: '-' },
          { name: 'type', description: '单选组展示类型', type: `'radio' | 'button'`, defaultValue: `'radio'` },
          { name: 'direction', description: '排列方向', type: `'horizontal' | 'vertical'`, defaultValue: `'horizontal'` },
          { name: 'size', description: '按钮类型下的尺寸', type: `'mini' | 'small' | 'medium' | 'large'`, defaultValue: `'medium'` },
        ],
      },
    ],
  },
  {
    slug: 'rate',
    name: 'Rate',
    title: '评分',
    category: 'data-entry',
    categoryLabel: '数据输入',
    description: '对事物进行快速的评级操作，支持半星选择与只读模式。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'rate-basic',
        title: '半星评分与只读展示',
        description: '展示 allowHalf 半星与 readonly 只读属性。',
        vueComponent: V2.RateBasicVue,
        reactComponent: R.RateReact,
        vueCode: `<template>\n  <Rate v-model="score" allow-half />\n  <Rate :default-value="4" readonly />\n</template>`,
        reactCode: `import { Rate } from '@dsh-plugin/dsh-ui-components'\n\nexport function Demo() {\n  return <Rate defaultValue={4} allowHalf />\n}`,
      },
    ],
    props: [
      { name: 'modelValue / value', description: '当前分值', type: 'number', defaultValue: '0' },
      { name: 'count', description: '星星总数', type: 'number', defaultValue: '5' },
      { name: 'allowHalf', description: '是否允许半星', type: 'boolean', defaultValue: 'false' },
      { name: 'readonly', description: '是否只读', type: 'boolean', defaultValue: 'false' },
    ],
  },
  {
    slug: 'search-field',
    name: 'SearchField',
    title: '搜索字段',
    category: 'data-entry',
    categoryLabel: '数据输入',
    badge: 'DSH',
    description: 'HeroUI 风格搜索输入框，内置搜索图标与清除交互。',
    frameworks: ['vue'],
    demos: [
      {
        id: 'searchfield-basic',
        title: '受控搜索输入',
        description: '内置放大镜图标与一键清空按钮。',
        vueComponent: V2.SearchFieldBasicVue,
        vueCode: `<template>\n  <SearchField v-model="q" placeholder="搜索组件…" />\n</template>`,
      },
    ],
    props: [
      { name: 'modelValue', description: '搜索关键词', type: 'string', defaultValue: `''` },
      { name: 'aria-labelledby', description: '将原生搜索输入框关联到外部标签的 id', type: 'string' },
      { name: 'placeholder', description: '占位提示', type: 'string', defaultValue: '-' },
      { name: 'disabled', description: '是否禁用', type: 'boolean', defaultValue: 'false' },
    ],
  },
  {
    slug: 'select',
    name: 'Select',
    title: '选择器',
    category: 'data-entry',
    categoryLabel: '数据输入',
    description: '弹出下拉菜单进行单选或多选，浮层自动同步当前主题。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'select-basic',
        title: '单选、多选与禁用项',
        description: 'multiple 模式默认按当前语言显示选中项摘要。输入框可通过外部标签获取焦点。',
        vueComponent: V2.SelectBasicVue,
        reactComponent: R.SelectReact,
        vueCode: `<template>
  <label for="mode">运行模式</label>
  <Select id="mode" default-value="balanced" :options="options" allow-clear />
  <Select multiple :default-value="['fast', 'balanced']" :options="options" />
</template>

<script setup>
const options = [
  { value: 'fast', label: '快速模式' },
  { value: 'balanced', label: '均衡模式' },
  { value: 'off', label: '离线（禁用）', disabled: true },
]
</script>`,
        reactCode: `import { Select } from '@dsh-plugin/dsh-ui-components'

const options = [
  { value: 'fast', label: '快速模式' },
  { value: 'balanced', label: '均衡模式' },
  { value: 'off', label: '离线（禁用）', disabled: true },
]

export function Demo() {
  return (
    <>
      <label htmlFor="mode">运行模式</label>
      <Select id="mode" defaultValue="balanced" options={options} allowClear />
      <Select multiple defaultValue={['fast', 'balanced']} options={options} />
    </>
  )
}`,
      },
    ],
    apiSections: [
      {
        id: 'api-select-props',
        title: 'Select Props',
        kind: 'props',
        rows: [
          { name: 'modelValue', description: '单选值或多选数组，支持 v-model', type: 'SelectOptionValue | SelectOptionValue[]', framework: 'vue' },
          { name: 'value', description: '根导出 Select 的单选值或多选数组', type: 'string | string[]', framework: 'react' },
          { name: 'options', description: '支持普通选项和含 isGroup、label、options 的分组', type: 'SelectOption[]', defaultValue: '[]', framework: 'vue' },
          { name: 'options', description: '根导出 Select 需要带 value 和 label 的选项数组', type: 'SelectOption[]', required: true, framework: 'react' },
          { name: 'multiple', description: '开启多选，默认展示已选项文字摘要。React 的 Arco.Select 使用 mode="multiple"', type: 'boolean', defaultValue: 'false' },
          { name: 'id', description: '通过外部 label 的 for / htmlFor 激活选择器', type: 'string' },
          { name: 'allowSearch / fieldNames', description: '允许搜索 / 设置选项字段映射，搜索会匹配分组内的选项', type: 'boolean / SelectFieldNames', framework: 'vue' },
          { name: 'Arco.Select.showSearch', description: '使用 React 命名空间组件开启搜索，自定义 filterOption 收到 React 选项元素', type: 'boolean', defaultValue: 'false', framework: 'react' },
          { name: 'allowClear', description: '是否允许清除', type: 'boolean', defaultValue: 'false' },
          { name: 'loading', description: '切换加载中状态；React 通过 Arco.Select 提供此属性', type: 'boolean', defaultValue: 'false' },
        ],
      },
      {
        id: 'api-select-events',
        title: 'Select Events',
        kind: 'events',
        rows: [
          { name: 'change / onChange', description: '选中值变化时触发', type: '(value) => void' },
          { name: 'search / onSearch', description: '搜索输入变化时触发，React 使用 Arco.Select', type: '(inputValue: string) => void' },
        ],
      },
    ],
  },
  {
    slug: 'slider',
    name: 'Slider',
    title: '滑动输入条',
    category: 'data-entry',
    categoryLabel: '数据输入',
    description: '通过拖动滑块在一个固定区间内进行连续数值选择。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'slider-basic',
        title: '单滑块、范围选择与禁用',
        description: '展示默认单点滑块、range 范围滑块与 disabled 状态。',
        vueComponent: V2.SliderBasicVue,
        reactComponent: R.SliderReact,
        vueCode: `<template>\n  <Slider v-model="val" />\n  <Slider :default-value="[20, 70]" range />\n</template>`,
        reactCode: `import * as React from 'react'\nimport { Slider } from '@dsh-plugin/dsh-ui-components'\n\nexport function Demo() {\n  const [v, setV] = React.useState(50)\n  return <Slider value={v} onChange={(val) => setV(Number(val))} />\n}`,
      },
    ],
    props: [
      { name: 'modelValue / value', description: '当前数值或范围数组', type: 'number | [number, number]', defaultValue: '0' },
      { name: 'min / max', description: '最小/最大值', type: 'number', defaultValue: '0 / 100' },
      { name: 'range', description: '是否开启范围选择', type: 'boolean', defaultValue: 'false' },
      { name: 'disabled', description: '是否禁用', type: 'boolean', defaultValue: 'false' },
    ],
  },
  {
    slug: 'switch',
    name: 'Switch',
    title: '开关',
    category: 'data-entry',
    categoryLabel: '数据输入',
    description: '互斥性的操作开关，另有 SwitchGroup 分组容器。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'switch-basic',
        title: '尺寸、形状、加载与禁用',
        description: '展示 size="small"、type="round"、loading 与 disabled 效果。',
        vueComponent: V2.SwitchBasicVue,
        reactComponent: R.SwitchReact,
        vueCode: `<template>\n  <Switch v-model="on" />\n  <Switch size="small" />\n  <Switch loading />\n</template>`,
        reactCode: `import * as React from 'react'\nimport { Switch } from '@dsh-plugin/dsh-ui-components'\n\nexport function Demo() {\n  const [on, setOn] = React.useState(true)\n  return <Switch checked={on} onChange={setOn} />\n}`,
      },
    ],
    props: [
      { name: 'modelValue / checked', description: '是否开启', type: 'boolean', defaultValue: 'false' },
      { name: 'size', description: '开关尺寸', type: `'small' | 'medium'`, defaultValue: `'medium'` },
      { name: 'type', description: '开关形状', type: `'circle' | 'round' | 'line'`, defaultValue: `'circle'` },
      { name: 'loading', description: '加载中状态', type: 'boolean', defaultValue: 'false' },
      { name: 'disabled', description: '是否禁用', type: 'boolean', defaultValue: 'false' },
    ],
  },
  {
    slug: 'text-field',
    name: 'TextField',
    title: '组合文本字段',
    category: 'data-entry',
    categoryLabel: '数据输入',
    badge: 'DSH',
    description: '为输入框自动关联 Label、Description 与 FieldError 无障碍属性。',
    frameworks: ['vue'],
    demos: [
      {
        id: 'textfield-basic',
        title: 'TextField 字段组合',
        description: '自带标签与辅助说明。',
        vueComponent: V2.TextFieldBasicVue,
        vueCode: `<template>\n  <TextField v-model="email" label="邮箱地址" description="用于接收通知" />\n</template>`,
      },
    ],
    props: [
      { name: 'modelValue', description: '绑定输入值', type: 'string', defaultValue: `''` },
      { name: 'label', description: '字段标签', type: 'string', defaultValue: '-' },
      { name: 'aria-labelledby', description: '使用外部标签时，传入该标签的 id 作为原生输入框的无障碍名称来源', type: 'string' },
      { name: 'description', description: '字段说明文字', type: 'string', defaultValue: '-' },
      { name: 'errorMessage', description: '错误提示信息', type: 'string', defaultValue: '-' },
    ],
  },
  {
    slug: 'time-picker',
    name: 'TimePicker',
    title: '时间选择器',
    category: 'data-entry',
    categoryLabel: '数据输入',
    description: '选择或输入标准时间与时间范围。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'timepicker-basic',
        title: '时间与时间范围选择',
        description: '展示单时间选择与 type="time-range" 范围选择。',
        vueComponent: V2.TimePickerBasicVue,
        reactComponent: R.TimePickerReact,
        vueCode: `<template>\n  <TimePicker />\n  <TimePicker type="time-range" />\n</template>`,
        reactCode: `import { TimePicker } from '@dsh-plugin/dsh-ui-components'\n\nexport function Demo() {\n  return <TimePicker placeholder="请选择时间" />\n}`,
      },
    ],
    props: [
      { name: 'type', description: '选择器类型', type: `'time' | 'time-range'`, defaultValue: `'time'` },
      { name: 'format', description: '时间格式', type: 'string', defaultValue: `'HH:mm:ss'` },
      { name: 'use12Hours', description: '12 小时制', type: 'boolean', defaultValue: 'false' },
    ],
  },
  {
    slug: 'toggle-button',
    name: 'ToggleButton / ToggleButtonGroup',
    title: '切换按钮',
    category: 'data-entry',
    categoryLabel: '数据输入',
    badge: 'DSH',
    description: '支持受控值、默认值、单选或多选及键盘导航的切换按钮组。',
    frameworks: ['vue'],
    demos: [
      {
        id: 'togglebutton-basic',
        title: '切换按钮组',
        description: '常用于视图模式或格式切换。',
        vueComponent: V2.ToggleButtonBasicVue,
        vueCode: `<template>\n  <ToggleButtonGroup v-model="layout" :options="options" />\n</template>`,
      },
    ],
    props: [
      { name: 'modelValue', description: '选中值（单选为标量，多选为数组）', type: 'string | number | Array', defaultValue: '-' },
      { name: 'options', description: '按钮选项列表', type: 'Array<{ label: string; value: string | number; disabled?: boolean }>', defaultValue: '[]' },
      { name: 'allowEmpty', description: '设为 false 时保留最后一项选择。已有选择未变化时不会触发 change 或 update:modelValue', type: 'boolean', defaultValue: 'true' },
      { name: 'multiple', description: '是否支持多选', type: 'boolean', defaultValue: 'false' },
    ],
  },
  {
    slug: 'transfer',
    name: 'Transfer',
    title: '穿梭框',
    category: 'data-entry',
    categoryLabel: '数据输入',
    description: '双栏穿梭选择框，用于在两列之间移动数据项。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'transfer-basic',
        title: '双栏穿梭框',
        description: '支持批量勾选与左右移动。',
        vueComponent: V2.TransferBasicVue,
        reactComponent: R.TransferReact,
        vueCode: `<template>\n  <Transfer v-model="value" :data="data" />\n</template>`,
        reactCode: `import { Transfer } from '@dsh-plugin/dsh-ui-components'\n\nexport function Demo() {\n  const dataSource = [{ key: '1', value: '选项 A' }, { key: '2', value: '选项 B' }]\n  return <Transfer dataSource={dataSource} defaultTargetKeys={['1']} />\n}`,
      },
    ],
    props: [
      { name: 'data', description: '穿梭框数据源', type: 'TransferItem[]', defaultValue: '[]' },
      { name: 'modelValue', description: '右侧目标框数据 key 数组', type: 'string[]', defaultValue: '[]' },
      { name: 'showSearch', description: '是否显示搜索框', type: 'boolean', defaultValue: 'false' },
    ],
  },
  {
    slug: 'tree-select',
    name: 'TreeSelect',
    title: '树选择',
    category: 'data-entry',
    categoryLabel: '数据输入',
    description: '树型选择控件，结合下拉框与树形结构。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'treeselect-basic',
        title: '树形选择器',
        description: '支持展开、搜索与清空。',
        vueComponent: V2.TreeSelectBasicVue,
        reactComponent: R.TreeSelectReact,
        vueCode: `<template>\n  <TreeSelect :data="treeData" placeholder="请选择" allow-clear />\n</template>`,
        reactCode: `import { TreeSelect } from '@dsh-plugin/dsh-ui-components'\n\nexport function Demo() {\n  const treeData = [{ key: 'root', title: '根节点', children: [{ key: 'child-1', title: '子节点 1' }] }]\n  return <TreeSelect treeData={treeData} placeholder="请选择节点" />\n}`,
      },
    ],
    props: [
      { name: 'data', description: '树形数据源', type: 'TreeNodeData[]', defaultValue: '[]' },
      { name: 'multiple', description: '是否多选', type: 'boolean', defaultValue: 'false' },
      { name: 'treeCheckable', description: '是否显示复选框', type: 'boolean', defaultValue: 'false' },
    ],
  },
  {
    slug: 'upload',
    name: 'Upload',
    title: '上传',
    category: 'data-entry',
    categoryLabel: '数据输入',
    description: '文件选择上传和拖拽上传控件。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'upload-basic',
        title: '文件上传列表',
        description: '支持多文件选择与上传列表展示。',
        reactComponent: R.UploadBasicReact,
        reactCode: `import * as DSH from '@dsh-plugin/dsh-ui-components'

function Demo() {
  return <DSH.Upload autoUpload={false} />
}`,
        vueComponent: V2.UploadBasicVue,
        vueCode: `<template>\n  <Upload :auto-upload="false" multiple />\n</template>`,
      },
    ],
    props: [
      { name: 'action', description: '上传接口地址', type: 'string', defaultValue: '-' },
      { name: 'multiple', description: '是否支持多选文件', type: 'boolean', defaultValue: 'false' },
      { name: 'autoUpload', description: '是否选择文件后自动上传', type: 'boolean', defaultValue: 'true' },
      { name: 'draggable', description: '是否支持拖拽上传', type: 'boolean', defaultValue: 'false' },
    ],
  },
]

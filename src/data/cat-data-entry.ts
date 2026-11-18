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
        description: '展示 showText 显示文本与 disabled 状态。',
        vueComponent: V2.ColorPickerBasicVue,
        vueCode: `<template>\n  <ColorPicker v-model="color" show-text />\n</template>`,
      },
    ],
    props: [
      { name: 'modelValue / value', description: '颜色值（HEX / RGB / HSV）', type: 'string', defaultValue: '-' },
      { name: 'showText', description: '是否在触发器上显示色值文本', type: 'boolean', defaultValue: 'false' },
      { name: 'disabled', description: '是否禁用', type: 'boolean', defaultValue: 'false' },
    ],
  },
  {
    slug: 'date-picker',
    name: 'DatePicker',
    title: '日期选择器',
    category: 'data-entry',
    categoryLabel: '数据输入',
    description: '包含 DatePicker、DateRangePicker（RangePicker）、MonthPicker、QuarterPicker、WeekPicker、YearPicker。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'datepicker-basic',
        title: '日期、范围与月份选择',
        description: '统一日期网格与浮层主题。',
        vueComponent: V2.DatePickerBasicVue,
        reactComponent: R.DatePickerReact,
        vueCode: `<template>\n  <DatePicker />\n  <DateRangePicker />\n  <MonthPicker />\n</template>`,
        reactCode: `import { DatePicker } from '@dsh-plugin/dsh-ui-components'

export function Demo() {
  return <DatePicker placeholder="请选择日期" allowClear />
}`,
      },
    ],
    apiSections: [
      {
        id: 'api-datepicker-props',
        title: 'DatePicker Props',
        kind: 'props',
        rows: [
          { name: 'modelValue / value', description: '绑定日期值', type: 'string | number | Date', defaultValue: '-' },
          { name: 'format', description: '展示日期格式', type: 'string', defaultValue: `'YYYY-MM-DD'` },
          { name: 'showTime', description: '是否增加时间选择', type: 'boolean | TimePickerProps', defaultValue: 'false' },
          { name: 'allowClear', description: '是否允许清空', type: 'boolean', defaultValue: 'true' },
          { name: 'disabled', description: '是否禁用', type: 'boolean', defaultValue: 'false' },
        ],
      },
      {
        id: 'api-rangepicker-props',
        title: 'RangePicker Props',
        kind: 'props',
        rows: [
          { name: 'modelValue / value', description: '日期范围数组 [start, end]', type: '[DateValue, DateValue]', defaultValue: '-' },
          { name: 'mode', description: '范围选择模式', type: `'date' | 'month' | 'quarter' | 'week' | 'year'`, defaultValue: `'date'` },
          { name: 'shortcuts', description: '预设时间范围快捷选项', type: 'ShortcutType[]', defaultValue: '[]' },
        ],
      },
      {
        id: 'api-datepicker-events',
        title: 'DatePicker Events',
        kind: 'events',
        rows: [
          { name: 'change / onChange', description: '日期值改变时触发', type: '(value: string, date: Date) => void' },
          { name: 'ok / onOk', description: '点击确认按钮时触发', type: '(value: string, date: Date) => void' },
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
        description: '展示 size (small/medium/large)、allowClear、error、disabled 与 Textarea autoSize。',
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
          { name: 'size', description: '输入框尺寸', type: `'mini' | 'small' | 'medium' | 'large'`, defaultValue: `'medium'` },
          { name: 'allowClear', description: '是否显示清除按钮', type: 'boolean', defaultValue: 'false' },
          { name: 'error', description: '是否为错误状态', type: 'boolean', defaultValue: 'false' },
          { name: 'disabled', description: '是否禁用', type: 'boolean', defaultValue: 'false' },
          { name: 'maxLength', description: '最大输入长度', type: 'number | { length: number; errorOnly?: boolean }', defaultValue: '-' },
        ],
      },
      {
        id: 'api-textarea-props',
        title: 'Textarea Props',
        kind: 'props',
        rows: [
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
    description: '使用单个原生输入处理粘贴、光标、删除与自动填充，视觉上显示独立字符格。',
    frameworks: ['vue'],
    demos: [
      {
        id: 'inputotp-basic',
        title: '六位验证码与完成回调',
        description: '支持整段粘贴与 @complete 事件。',
        vueComponent: V2.InputOtpBasicVue,
        vueCode: `<template>\n  <InputOTP v-model="code" :length="6" @complete="onComplete" />\n</template>`,
      },
    ],
    props: [
      { name: 'modelValue', description: '验证码字符串', type: 'string', defaultValue: `''` },
      { name: 'length', description: '字符格数量', type: 'number', defaultValue: '6' },
      { name: 'type', description: '输入类型限制', type: `'numeric' | 'text'`, defaultValue: `'numeric'` },
      { name: 'disabled', description: '是否禁用', type: 'boolean', defaultValue: 'false' },
    ],
    events: [
      { name: 'complete', description: '填满所有字符格时触发', type: '(code: string) => void' },
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
    name: 'Mention',
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
        vueComponent: V2.MentionBasicVue,
        vueCode: `<template>\n  <Mention :data="['Alice', 'Bob', 'Charlie']" placeholder="输入 @ 提及" />\n</template>`,
      },
    ],
    props: [
      { name: 'data', description: '提及候选项列表', type: 'string[]', defaultValue: '[]' },
      { name: 'prefix', description: '触发字符前缀', type: 'string | string[]', defaultValue: `'@'` },
      { name: 'type', description: '输入框类型', type: `'input' | 'textarea'`, defaultValue: `'input'` },
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
        description: '展示 allowClear、multiple 多选标签与禁用选项。',
        vueComponent: V2.SelectBasicVue,
        reactComponent: R.SelectReact,
        vueCode: `<template>\n  <Select v-model="single" :options="options" allow-clear />\n  <Select v-model="multi" multiple :options="options" />\n</template>`,
        reactCode: `import * as React from 'react'
import { Select } from '@dsh-plugin/dsh-ui-components'

export function Demo() {
  const [val, setVal] = React.useState('balanced')
  return (
    <Select
      value={val}
      onChange={(v) => setVal(v)}
      options={[
        { value: 'fast', label: '快速模式' },
        { value: 'balanced', label: '均衡模式' },
        { value: 'deep', label: '深入分析' },
      ]}
    />
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
          { name: 'modelValue / value', description: '绑定选中值', type: 'string | number | Array', defaultValue: '-' },
          { name: 'options', description: '选项数据数组', type: 'SelectOptionData[]', defaultValue: '[]' },
          { name: 'multiple / mode', description: '是否多选（React 使用 mode="multiple"）', type: `boolean | 'multiple' | 'tags'`, defaultValue: 'false' },
          { name: 'allowSearch / showSearch', description: '是否允许搜索', type: 'boolean', defaultValue: 'false' },
          { name: 'allowClear', description: '是否允许清除', type: 'boolean', defaultValue: 'false' },
          { name: 'loading', description: '是否为加载中状态', type: 'boolean', defaultValue: 'false' },
        ],
      },
      {
        id: 'api-select-events',
        title: 'Select Events',
        kind: 'events',
        rows: [
          { name: 'change / onChange', description: '选中值变化时触发', type: '(value: any, option: any) => void' },
          { name: 'search / onSearch', description: '搜索输入变化时触发', type: '(inputValue: string) => void' },
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

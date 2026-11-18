import { defineComponent, h, reactive, ref } from 'vue'
import * as UI from '@dsh-plugin/dsh-ui-components-vue'

export const AutoCompleteBasicVue = defineComponent({
  setup() {
    const val = ref('')
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:12px;max-width:360px;' }, [
        h(UI.AutoComplete, {
          modelValue: val.value,
          'onUpdate:modelValue': (v: string) => (val.value = v),
          data: ['Vue 3', 'Vite', 'Vitest', 'TypeScript', 'Arco Design'],
          placeholder: '输入 V 或 T 查看补全建议',
          allowClear: true,
        }),
        h(UI.AutoComplete, { data: ['a', 'b'], disabled: true, placeholder: 'disabled 禁用状态' }),
      ])
  },
})

export const CascaderBasicVue = defineComponent({
  setup() {
    const options = [
      {
        value: 'ui',
        label: 'UI 组件',
        children: [
          { value: 'general', label: '通用', children: [{ value: 'button', label: 'Button' }] },
          { value: 'entry', label: '数据输入', children: [{ value: 'select', label: 'Select' }] },
        ],
      },
    ]
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:12px;max-width:360px;' }, [
        h(UI.Cascader, { options, placeholder: '单选级联', allowClear: true }),
        h(UI.Cascader, { options, multiple: true, placeholder: 'multiple 多选级联' }),
      ])
  },
})

export const CheckboxBasicVue = defineComponent({
  setup() {
    const checked = ref(true)
    const group = ref(['vue'])
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:14px;' }, [
        h('div', { style: 'display:flex;gap:16px;flex-wrap:wrap;' }, [
          h(UI.Checkbox, { modelValue: checked.value, 'onUpdate:modelValue': (v: any) => (checked.value = !!v) }, () => '单个复选框'),
          h(UI.Checkbox, { indeterminate: true }, () => 'indeterminate 半选'),
          h(UI.Checkbox, { disabled: true, modelValue: true }, () => 'disabled 禁用'),
        ]),
        h(UI.CheckboxGroup, {
          modelValue: group.value,
          'onUpdate:modelValue': (v: any) => (group.value = v),
          options: [
            { label: 'Vue 3', value: 'vue' },
            { label: 'React 18', value: 'react' },
            { label: 'TypeScript', value: 'ts' },
          ],
        }),
      ])
  },
})

export const ColorPickerBasicVue = defineComponent({
  setup() {
    const color = ref('#165dff')
    return () =>
      h('div', { style: 'display:flex;align-items:center;gap:16px;flex-wrap:wrap;' }, [
        h(UI.ColorPicker, { modelValue: color.value, 'onUpdate:modelValue': (v: string) => (color.value = v) }),
        h(UI.ColorPicker, { defaultValue: '#722ed1', showText: true }),
        h(UI.ColorPicker, { defaultValue: '#00b42a', disabled: true }),
      ])
  },
})

export const DatePickerBasicVue = defineComponent({
  setup() {
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:12px;max-width:420px;' }, [
        h(UI.DatePicker, { placeholder: 'DatePicker 选择日期' }),
        h(UI.DateRangePicker, { placeholder: ['开始日期', '结束日期'] }),
        h(UI.MonthPicker, { placeholder: 'MonthPicker 选择月份' }),
      ])
  },
})

export const FormBasicVue = defineComponent({
  setup() {
    const layout = ref<'horizontal' | 'vertical' | 'inline'>('vertical')
    const form = reactive({ name: 'DSH Studio', mode: 'balanced' })
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:14px;max-width:520px;' }, [
        h(UI.RadioGroup, {
          modelValue: layout.value,
          'onUpdate:modelValue': (v: any) => (layout.value = v),
          type: 'button',
          options: ['vertical', 'horizontal', 'inline'],
        }),
        h(UI.Form, { model: form, layout: layout.value }, () => [
          h(UI.FormItem, { field: 'name', label: '工作区名称', required: true }, () =>
            h(UI.Input, { modelValue: form.name, 'onUpdate:modelValue': (v: string) => (form.name = v) })
          ),
          h(UI.FormItem, { field: 'mode', label: '默认模式' }, () =>
            h(UI.Select, {
              modelValue: form.mode,
              'onUpdate:modelValue': (v: any) => (form.mode = v),
              options: [
                { label: '快速', value: 'fast' },
                { label: '均衡', value: 'balanced' },
              ],
            })
          ),
        ]),
      ])
  },
})

export const InputBasicVue = defineComponent({
  setup() {
    const val = ref('')
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:12px;max-width:400px;' }, [
        h(UI.Input, { modelValue: val.value, 'onUpdate:modelValue': (v: string) => (val.value = v), placeholder: '默认 medium 尺寸', allowClear: true }),
        h(UI.Input, { size: 'small', placeholder: 'size="small"' }),
        h(UI.Input, { size: 'large', placeholder: 'size="large"' }),
        h(UI.Input, { error: true, placeholder: 'error 错误状态' }),
        h(UI.Input, { disabled: true, placeholder: 'disabled 禁用状态' }),
        h(UI.Textarea, { placeholder: 'Textarea 多行文本域', autoSize: { minRows: 2, maxRows: 4 } }),
      ])
  },
})

export const InputNumberBasicVue = defineComponent({
  setup() {
    const num = ref(5)
    return () =>
      h('div', { style: 'display:flex;gap:12px;flex-wrap:wrap;max-width:460px;' }, [
        h(UI.InputNumber, { modelValue: num.value, 'onUpdate:modelValue': (v: number | undefined) => (num.value = v ?? 0), min: 0, max: 100 }),
        h(UI.InputNumber, { mode: 'button', defaultValue: 10, min: 0, max: 20 }),
        h(UI.InputNumber, { disabled: true, defaultValue: 3 }),
      ])
  },
})

export const InputOtpBasicVue = defineComponent({
  setup() {
    const code = ref('')
    const completed = ref('')
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:10px;' }, [
        h(UI.Label, null, () => '六位数字验证码（支持整段粘贴）'),
        h(UI.InputOTP, {
          modelValue: code.value,
          'onUpdate:modelValue': (v: string) => (code.value = v),
          length: 6,
          onComplete: (v: string) => (completed.value = v),
        }),
        completed.value ? h('span', { style: 'font-size:13px;color:var(--docs-accent);' }, `已完成输入：${completed.value}`) : null,
      ])
  },
})

export const InputTagBasicVue = defineComponent({
  setup() {
    const tags = ref([{ value: 'vue', label: 'Vue 3' }, { value: 'arco', label: 'Arco' }])
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:14px;max-width:420px;' }, [
        h(UI.InputTag, { defaultValue: ['Vue', 'TypeScript'], placeholder: '输入后按回车添加标签', allowClear: true }),
        h(UI.TagGroup, { modelValue: tags.value, 'onUpdate:modelValue': (v: any) => (tags.value = v) }),
      ])
  },
})

export const MentionBasicVue = defineComponent({
  setup() {
    return () =>
      h('div', { style: 'max-width:360px;' }, [
        h(UI.Mention, { data: ['Alice', 'Bob', 'Charlie', 'DSH Bot'], placeholder: '输入 @ 触发提及列表' }),
      ])
  },
})

export const RadioBasicVue = defineComponent({
  setup() {
    const val = ref('auto')
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:14px;' }, [
        h(UI.RadioGroup, { modelValue: val.value, 'onUpdate:modelValue': (v: any) => (val.value = v) }, () => [
          h(UI.Radio, { value: 'auto' }, () => '自动'),
          h(UI.Radio, { value: 'manual' }, () => '手动'),
          h(UI.Radio, { value: 'off', disabled: true }, () => '禁用项'),
        ]),
        h(UI.RadioGroup, {
          modelValue: val.value,
          'onUpdate:modelValue': (v: any) => (val.value = v),
          type: 'button',
          options: [
            { label: '自动', value: 'auto' },
            { label: '手动', value: 'manual' },
          ],
        }),
      ])
  },
})

export const RateBasicVue = defineComponent({
  setup() {
    const score = ref(3.5)
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:12px;' }, [
        h(UI.Rate, { modelValue: score.value, 'onUpdate:modelValue': (v: number) => (score.value = v), allowHalf: true }),
        h(UI.Rate, { defaultValue: 4, readonly: true }),
      ])
  },
})

export const SearchFieldBasicVue = defineComponent({
  setup() {
    const q = ref('')
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:10px;max-width:360px;' }, [
        h(UI.SearchField, { modelValue: q.value, 'onUpdate:modelValue': (v: string) => (q.value = v), placeholder: '输入关键词搜索…' }),
        h('span', { style: 'font-size:12px;color:var(--docs-text-secondary);' }, `当前输入：${q.value || '（空）'}`),
      ])
  },
})

export const SelectBasicVue = defineComponent({
  setup() {
    const single = ref('balanced')
    const multi = ref(['vue', 'ts'])
    const options = [
      { value: 'fast', label: '快速模式' },
      { value: 'balanced', label: '均衡模式' },
      { value: 'deep', label: '深入分析' },
      { value: 'off', label: '离线（禁用）', disabled: true },
    ]
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:12px;max-width:380px;' }, [
        h(UI.Select, { modelValue: single.value, 'onUpdate:modelValue': (v: any) => (single.value = v), options, allowClear: true }),
        h(UI.Select, {
          modelValue: multi.value,
          'onUpdate:modelValue': (v: any) => (multi.value = v),
          multiple: true,
          options: [
            { value: 'vue', label: 'Vue 3' },
            { value: 'react', label: 'React 18' },
            { value: 'ts', label: 'TypeScript' },
          ],
        }),
      ])
  },
})

export const SliderBasicVue = defineComponent({
  setup() {
    const val = ref(45)
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:16px;max-width:360px;' }, [
        h(UI.Slider, { modelValue: val.value, 'onUpdate:modelValue': (v: any) => (val.value = v) }),
        h(UI.Slider, { defaultValue: [20, 70], range: true }),
        h(UI.Slider, { defaultValue: 30, disabled: true }),
      ])
  },
})

export const SwitchBasicVue = defineComponent({
  setup() {
    const on = ref(true)
    return () =>
      h('div', { style: 'display:flex;gap:16px;align-items:center;flex-wrap:wrap;' }, [
        h(UI.Switch, { modelValue: on.value, 'onUpdate:modelValue': (v: any) => (on.value = !!v) }),
        h(UI.Switch, { size: 'small', defaultChecked: true }),
        h(UI.Switch, { type: 'round', defaultChecked: true }),
        h(UI.Switch, { loading: true, defaultChecked: true }),
        h(UI.Switch, { disabled: true }),
      ])
  },
})

export const TextFieldBasicVue = defineComponent({
  setup() {
    const email = ref('')
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:12px;max-width:380px;' }, [
        h(UI.TextField, {
          modelValue: email.value,
          'onUpdate:modelValue': (v: string) => (email.value = v),
          label: '邮箱地址',
          placeholder: 'user@example.com',
          description: '自动绑定 label、input 与 description 无障碍关系',
        }),
      ])
  },
})

export const TimePickerBasicVue = defineComponent({
  setup() {
    return () =>
      h('div', { style: 'display:flex;gap:12px;flex-wrap:wrap;' }, [
        h(UI.TimePicker),
        h(UI.TimePicker, { type: 'time-range' }),
      ])
  },
})

export const ToggleButtonBasicVue = defineComponent({
  setup() {
    const layout = ref('grid')
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:14px;' }, [
        h(UI.ToggleButtonGroup, {
          modelValue: layout.value,
          'onUpdate:modelValue': (v: any) => (layout.value = v),
          options: [
            { label: '网格视图', value: 'grid' },
            { label: '列表视图', value: 'list' },
            { label: '时间线', value: 'timeline' },
          ],
        }),
      ])
  },
})

export const TransferBasicVue = defineComponent({
  setup() {
    const val = ref(['0'])
    return () =>
      h(UI.Transfer, {
        modelValue: val.value,
        'onUpdate:modelValue': (v: string[]) => (val.value = v),
        data: [
          { value: '0', label: '设计规范', disabled: false },
          { value: '1', label: '代码审查', disabled: false },
          { value: '2', label: '自动部署', disabled: false },
        ],
      })
  },
})

export const TreeSelectBasicVue = defineComponent({
  setup() {
    const data = [{ key: 'ws', title: '工作区', children: [{ key: 'src', title: 'src' }, { key: 'docs', title: 'docs' }] }]
    return () =>
      h('div', { style: 'max-width:360px;' }, [
        h(UI.TreeSelect, { data, placeholder: '选择目录节点', allowClear: true }),
      ])
  },
})

export const UploadBasicVue = defineComponent({
  setup() {
    return () =>
      h('div', { style: 'max-width:440px;' }, [
        h(UI.Upload, { autoUpload: false, multiple: true }),
      ])
  },
})

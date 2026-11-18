import { defineComponent, h, reactive, ref } from 'vue'
import * as UI from '@dsh-plugin/dsh-ui-components-vue'

export const InputVue = defineComponent({
  setup() {
    const val = ref('')
    const num = ref(3)
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:12px;max-width:400px;' }, [
        h(UI.Input, { modelValue: val.value, 'onUpdate:modelValue': (v: string) => (val.value = v), placeholder: '基础输入框 Input', allowClear: true }),
        h(UI.Textarea, { placeholder: '多行文本 Textarea', autoSize: { minRows: 2, maxRows: 4 } }),
        h(UI.InputNumber, { modelValue: num.value, 'onUpdate:modelValue': (v: number | undefined) => (num.value = v ?? 0), min: 0, max: 99 }),
      ])
  },
})

export const TextFieldSearchOtpVue = defineComponent({
  setup() {
    const email = ref('')
    const otp = ref('')
    const tags = ref([{ value: 'vue', label: 'Vue 3' }, { value: 'arco', label: 'Arco' }])
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:14px;max-width:420px;' }, [
        h(UI.TextField, {
          modelValue: email.value,
          'onUpdate:modelValue': (v: string) => (email.value = v),
          label: '邮箱地址',
          placeholder: 'user@example.com',
          description: 'TextField 自动关联标签与说明',
        }),
        h(UI.SearchField, { placeholder: '搜索组件…' }),
        h('div', [
          h(UI.Label, null, () => '验证码 InputOTP'),
          h(UI.InputOTP, { modelValue: otp.value, 'onUpdate:modelValue': (v: string) => (otp.value = v), length: 6 }),
        ]),
        h(UI.TagGroup, { modelValue: tags.value, 'onUpdate:modelValue': (v: any) => (tags.value = v) }),
      ])
  },
})

export const SelectCascaderTreeVue = defineComponent({
  setup() {
    const mode = ref('balanced')
    const treeData = [
      { key: 'ws', title: '工作区', children: [{ key: 'src', title: 'src' }, { key: 'docs', title: 'docs' }] },
    ]
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:12px;max-width:400px;' }, [
        h(UI.Select, {
          modelValue: mode.value,
          'onUpdate:modelValue': (v: any) => (mode.value = v),
          options: [
            { value: 'fast', label: '快速模式' },
            { value: 'balanced', label: '均衡模式' },
            { value: 'quality', label: '深入模式' },
          ],
        }),
        h(UI.AutoComplete, { data: ['Vue', 'Vite', 'Vitest'], placeholder: 'AutoComplete 输入 V' }),
        h(UI.Cascader, {
          options: [{ value: 'ui', label: 'UI 组件', children: [{ value: 'btn', label: 'Button' }] }],
          placeholder: 'Cascader 级联选择',
        }),
        h(UI.TreeSelect, { data: treeData, placeholder: 'TreeSelect 树选择' }),
      ])
  },
})

export const ToggleControlsVue = defineComponent({
  setup() {
    const checked = ref(true)
    const slider = ref(60)
    const layout = ref('grid')
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:14px;' }, [
        h(UI.CheckboxGroup, { defaultValue: ['a'], options: [{ label: '选项 A', value: 'a' }, { label: '选项 B', value: 'b' }] }),
        h(UI.RadioGroup, { defaultValue: 'auto' }, () => [
          h(UI.Radio, { value: 'auto' }, () => '自动'),
          h(UI.Radio, { value: 'manual' }, () => '手动'),
        ]),
        h('div', { style: 'display:flex;align-items:center;gap:10px;' }, [
          h(UI.Switch, { modelValue: checked.value, 'onUpdate:modelValue': (v: any) => (checked.value = !!v) }),
          h('span', checked.value ? '已开启 Switch' : '已关闭'),
        ]),
        h(UI.Slider, { modelValue: slider.value, 'onUpdate:modelValue': (v: any) => (slider.value = v), style: 'max-width:320px;' }),
        h(UI.Rate, { defaultValue: 4, allowHalf: true }),
        h(UI.ToggleButtonGroup, {
          modelValue: layout.value,
          'onUpdate:modelValue': (v: any) => (layout.value = v),
          options: [{ label: '网格', value: 'grid' }, { label: '列表', value: 'list' }],
        }),
      ])
  },
})

export const PickerUploadVue = defineComponent({
  setup() {
    const transferVal = ref(['0'])
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:14px;max-width:520px;' }, [
        h('div', { style: 'display:flex;gap:10px;flex-wrap:wrap;' }, [
          h(UI.DatePicker),
          h(UI.DateRangePicker),
          h(UI.TimePicker),
          h(UI.ColorPicker, { defaultValue: '#165dff' }),
        ]),
        h(UI.Upload, { autoUpload: false, multiple: true }),
        h(UI.Transfer, {
          modelValue: transferVal.value,
          'onUpdate:modelValue': (v: string[]) => (transferVal.value = v),
          data: [
            { value: '0', label: '设计规范', disabled: false },
            { value: '1', label: '代码审查', disabled: false },
            { value: '2', label: '自动部署', disabled: false },
          ],
        }),
      ])
  },
})

export const FormMentionInputTagVue = defineComponent({
  setup() {
    const form = reactive({ name: 'DSH Studio', count: 2 })
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:14px;max-width:420px;' }, [
        h(UI.Form, { model: form, layout: 'vertical' }, () => [
          h(UI.FormItem, { field: 'name', label: '项目名称' }, () =>
            h(UI.Input, { modelValue: form.name, 'onUpdate:modelValue': (v: string) => (form.name = v) })
          ),
          h(UI.FormItem, { field: 'count', label: '并发数' }, () =>
            h(UI.InputNumber, { modelValue: form.count, 'onUpdate:modelValue': (v: any) => (form.count = v ?? 1) })
          ),
        ]),
        h(UI.InputTag, { defaultValue: ['Vue', 'TypeScript'], placeholder: '输入标签按回车' }),
        h(UI.Mention, { data: ['Alice', 'Bob', 'Charlie'], placeholder: '输入 @ 提及成员' }),
      ])
  },
})

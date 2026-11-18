import { defineComponent, h, ref } from 'vue'
import * as UI from '@dsh-plugin/dsh-ui-components-vue'
import * as Icons from '@dsh-plugin/dsh-ui-components-vue/icons'

export const ButtonVariantsVue = defineComponent({
  setup() {
    const variants = ['primary', 'secondary', 'tertiary', 'outline', 'ghost', 'danger', 'danger-soft'] as const
    return () =>
      h('div', { style: 'display:flex;flex-wrap:wrap;gap:10px;align-items:center;' },
        variants.map((variant) => h(UI.Button, { key: variant, variant }, () => variant))
      )
  },
})

export const ButtonSizesVue = defineComponent({
  setup() {
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:12px;' }, [
        h('div', { style: 'display:flex;flex-wrap:wrap;gap:10px;align-items:center;' }, [
          h(UI.Button, { size: 'sm' }, () => '紧凑 sm'),
          h(UI.Button, { size: 'md' }, () => '标准 md'),
          h(UI.Button, { size: 'lg' }, () => '宽松 lg'),
        ]),
        h('div', { style: 'display:flex;flex-wrap:wrap;gap:10px;align-items:center;' }, [
          h(UI.Button, { loading: true }, () => '加载中'),
          h(UI.Button, { disabled: true }, () => '禁用状态'),
          h(UI.Button, { variant: 'outline', radius: 'full' }, () => '胶囊圆角'),
          h(UI.CloseButton, { 'aria-label': '关闭' }),
        ]),
      ])
  },
})

export const LinkVue = defineComponent({
  setup() {
    return () =>
      h('div', { style: 'display:flex;gap:16px;flex-wrap:wrap;align-items:center;' }, [
        h(UI.Link, { href: '#button' }, () => '默认链接'),
        h(UI.Link, { href: '#button', status: 'success' }, () => '成功链接'),
        h(UI.Link, { href: '#button', status: 'warning' }, () => '警告链接'),
        h(UI.Link, { href: '#button', status: 'danger' }, () => '危险链接'),
        h(UI.Link, { href: '#button', disabled: true }, () => '禁用链接'),
      ])
  },
})

export const TypographyVue = defineComponent({
  setup() {
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:8px;' }, [
        h(UI.TypographyTitle, { heading: 4 }, () => 'HeroUI 视觉排版体系'),
        h(UI.TypographyParagraph, null, () => '基于 Arco Design Vue 保留完整的排版能力，同时统一字重、行高与颜色层次。'),
        h(UI.Text, { type: 'secondary' }, () => '次要说明文本 · TypographyText / Text'),
        h('div', { style: 'display:flex;gap:8px;align-items:center;' }, [
          h('span', '快捷键：'),
          h(UI.Kbd, null, () => '⌘'),
          h(UI.Kbd, null, () => 'K'),
        ]),
      ])
  },
})

export const IconsVue = defineComponent({
  setup() {
    const keyword = ref('')
    const entries = Object.entries(Icons).filter(([name]) => name.startsWith('Icon')).slice(0, 48)
    return () => {
      const q = keyword.value.trim().toLowerCase()
      const list = q ? entries.filter(([name]) => name.toLowerCase().includes(q)) : entries
      return h('div', { style: 'display:flex;flex-direction:column;gap:14px;' }, [
        h(UI.SearchField, {
          modelValue: keyword.value,
          'onUpdate:modelValue': (v: string) => (keyword.value = v),
          placeholder: '过滤图标名称（如 Search、Plus、Check）…',
        }),
        h(
          'div',
          { style: 'display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:10px;' },
          list.map(([name, IconComp]) =>
            h(
              'div',
              {
                key: name,
                style: 'display:flex;flex-direction:column;align-items:center;gap:6px;padding:12px 8px;border:1px solid var(--docs-border);border-radius:8px;font-size:12px;',
              },
              [h(IconComp as any, { size: 20 }), h('span', { style: 'word-break:break-all;text-align:center;' }, name)]
            )
          )
        ),
      ])
    }
  },
})

import { defineComponent, h, ref } from 'vue'
import * as UI from '@dsh-plugin/dsh-ui-components-vue'
import * as Icons from '@dsh-plugin/dsh-ui-components-vue/icons'

// ==================== 通用 General ====================
export const ButtonVariantsVue = defineComponent({
  setup() {
    const variants = ['primary', 'secondary', 'tertiary', 'outline', 'ghost', 'danger', 'danger-soft'] as const
    return () =>
      h('div', { style: 'display:flex;flex-wrap:wrap;gap:10px;align-items:center;' },
        variants.map((variant) => h(UI.Button, { key: variant, variant }, () => variant))
      )
  },
})

export const ButtonPropsVue = defineComponent({
  setup() {
    const loading = ref(false)
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:14px;' }, [
        h('div', { style: 'display:flex;flex-wrap:wrap;gap:10px;align-items:center;' }, [
          h(UI.Button, { size: 'sm' }, () => 'size="sm"'),
          h(UI.Button, { size: 'md' }, () => 'size="md"'),
          h(UI.Button, { size: 'lg' }, () => 'size="lg"'),
        ]),
        h('div', { style: 'display:flex;flex-wrap:wrap;gap:10px;align-items:center;' }, [
          h(UI.Button, { radius: 'none', variant: 'outline' }, () => 'radius="none"'),
          h(UI.Button, { radius: 'sm', variant: 'outline' }, () => 'radius="sm"'),
          h(UI.Button, { radius: 'lg', variant: 'outline' }, () => 'radius="lg"'),
          h(UI.Button, { radius: 'full', variant: 'outline' }, () => 'radius="full"'),
        ]),
        h('div', { style: 'display:flex;flex-wrap:wrap;gap:10px;align-items:center;' }, [
          h(UI.Button, { variant: 'outline', onClick: () => (loading.value = !loading.value) }, () =>
            loading.value ? '结束保存' : '模拟保存'
          ),
          h(UI.CloseButton, { 'aria-label': '关闭' }),
          h(UI.ButtonGroup, { size: 'sm', disabled: loading.value }, () => [
            h(UI.Button, { loading: loading.value }, () => '保存'),
            h(UI.Button, { variant: 'outline', size: 'md' }, () => '预览'),
          ]),
        ]),
        h(UI.Button, { block: true }, () => '占满一行'),
      ])
  },
})

export const LinkBasicVue = defineComponent({
  setup() {
    return () =>
      h('div', { style: 'display:flex;gap:16px;flex-wrap:wrap;align-items:center;' }, [
        h(UI.Link, { href: '#link' }, () => '默认链接'),
        h(UI.Link, { href: '#link', status: 'success' }, () => 'status="success"'),
        h(UI.Link, { href: '#link', status: 'warning' }, () => 'status="warning"'),
        h(UI.Link, { href: '#link', status: 'danger' }, () => 'status="danger"'),
        h(UI.Link, { href: '#link', disabled: true }, () => 'disabled'),
        h(UI.Link, { href: '#link', hoverable: false }, () => 'hoverable={false}'),
      ])
  },
})

export const TypographyBasicVue = defineComponent({
  setup() {
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:8px;' }, [
        h(UI.TypographyTitle, { heading: 2 }, () => 'H2 标题 · TypographyTitle'),
        h(UI.TypographyTitle, { heading: 4 }, () => 'H4 标题 · TypographyTitle'),
        h(UI.TypographyParagraph, null, () => '默认段落文本：保留 Arco Typography 的排版能力，同时统一 HeroUI 字体颜色与行高。'),
        h('div', { style: 'display:flex;gap:14px;flex-wrap:wrap;' }, [
          h(UI.Text, null, () => '默认 Text'),
          h(UI.Text, { type: 'secondary' }, () => 'type="secondary"'),
          h(UI.Text, { type: 'success' }, () => 'type="success"'),
          h(UI.Text, { type: 'warning' }, () => 'type="warning"'),
          h(UI.Text, { type: 'danger' }, () => 'type="danger"'),
          h(UI.Text, { code: true }, () => 'code'),
          h(UI.Text, { mark: true }, () => 'mark'),
        ]),
      ])
  },
})

export const KbdBasicVue = defineComponent({
  setup() {
    return () =>
      h('div', { style: 'display:flex;gap:16px;flex-wrap:wrap;align-items:center;' }, [
        h('span', { style: 'display:inline-flex;gap:4px;align-items:center;' }, [h(UI.Kbd, null, () => '⌘'), h(UI.Kbd, null, () => 'K')]),
        h('span', { style: 'display:inline-flex;gap:4px;align-items:center;' }, [h(UI.Kbd, null, () => 'Ctrl'), h('span', '+'), h(UI.Kbd, null, () => 'S')]),
        h('span', { style: 'display:inline-flex;gap:4px;align-items:center;' }, [h(UI.Kbd, null, () => 'Shift'), h('span', '+'), h(UI.Kbd, null, () => 'Enter')]),
      ])
  },
})

export const IconsGalleryVue = defineComponent({
  setup() {
    const keyword = ref('')
    const entries = Object.entries(Icons).filter(([name]) => name.startsWith('Icon')).slice(0, 60)
    return () => {
      const q = keyword.value.trim().toLowerCase()
      const list = q ? entries.filter(([name]) => name.toLowerCase().includes(q)) : entries
      return h('div', { style: 'display:flex;flex-direction:column;gap:14px;' }, [
        h(UI.SearchField, {
          modelValue: keyword.value,
          'onUpdate:modelValue': (v: string) => (keyword.value = v),
          placeholder: '搜索图标名称（如 Search、Plus、Check）…',
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

// ==================== 布局 Layout ====================
export const DividerBasicVue = defineComponent({
  setup() {
    return () =>
      h('div', [
        h('p', '基础水平分割线'),
        h(UI.Divider),
        h('p', '带文字与虚线 type="dashed"'),
        h(UI.Divider, { type: 'dashed', orientation: 'left' }, () => '左侧文字'),
        h(UI.Divider, { orientation: 'center' }, () => '居中文字'),
        h('div', { style: 'display:flex;align-items:center;gap:12px;margin-top:12px;' }, [
          h('span', '首页'),
          h(UI.Divider, { direction: 'vertical' }),
          h('span', '组件'),
          h(UI.Divider, { direction: 'vertical' }),
          h('span', '主题'),
        ]),
      ])
  },
})

export const GridBasicVue = defineComponent({
  setup() {
    const box = (text: string, alpha = 0.14) =>
      h(
        'div',
        {
          style: `padding:12px;border-radius:8px;text-align:center;background:rgba(22,93,255,${alpha});font-weight:600;font-size:13px;`,
        },
        text
      )
    return () =>
      h(UI.Row, { gutter: [12, 12] }, () => [
        h(UI.Col, { span: 8 }, () => box('span=8')),
        h(UI.Col, { span: 8 }, () => box('span=8', 0.22)),
        h(UI.Col, { span: 8 }, () => box('span=8')),
        h(UI.Col, { span: 6 }, () => box('span=6', 0.18)),
        h(UI.Col, { span: 12 }, () => box('span=12', 0.24)),
        h(UI.Col, { span: 6 }, () => box('span=6', 0.18)),
      ])
  },
})

export const LayoutBasicVue = defineComponent({
  setup() {
    return () =>
      h(UI.Layout, { style: 'border:1px solid var(--docs-border);border-radius:10px;overflow:hidden;height:200px;' }, () => [
        h(UI.LayoutHeader, { style: 'padding:10px 16px;background:var(--docs-bg-subtle);border-bottom:1px solid var(--docs-border);font-weight:600;' }, () => 'LayoutHeader'),
        h(UI.Layout, null, () => [
          h(UI.LayoutSider, { width: 130, style: 'padding:12px;border-right:1px solid var(--docs-border);' }, () => 'LayoutSider'),
          h(UI.LayoutContent, { style: 'padding:16px;' }, () => 'LayoutContent 主内容区'),
        ]),
        h(UI.LayoutFooter, { style: 'padding:8px 16px;background:var(--docs-bg-subtle);border-top:1px solid var(--docs-border);font-size:12px;' }, () => 'LayoutFooter'),
      ])
  },
})

export const ResizeBoxBasicVue = defineComponent({
  setup() {
    return () =>
      h(
        UI.ResizeBox as any,
        {
          directions: ['right', 'bottom'],
          style: 'width:320px;min-width:180px;max-width:100%;height:120px;border:1px solid var(--docs-border);border-radius:10px;padding:16px;',
        },
        () => '拖拽右侧或底部边缘调整容器大小'
      )
  },
})

export const SpaceBasicVue = defineComponent({
  setup() {
    const size = ref<'mini' | 'small' | 'medium' | 'large'>('medium')
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:14px;' }, [
        h(UI.RadioGroup, {
          modelValue: size.value,
          'onUpdate:modelValue': (v: any) => (size.value = v),
          type: 'button',
          options: ['mini', 'small', 'medium', 'large'],
        }),
        h(UI.Space, { size: size.value, wrap: true }, () => [
          h(UI.Button, null, () => '按钮一'),
          h(UI.Button, { variant: 'secondary' }, () => '按钮二'),
          h(UI.Button, { variant: 'outline' }, () => '按钮三'),
          h(UI.Tag, null, () => '标签'),
        ]),
      ])
  },
})

export const SplitBasicVue = defineComponent({
  setup() {
    return () =>
      h(UI.Split as any, { style: 'height:140px;border:1px solid var(--docs-border);border-radius:10px;' }, {
        first: () => h('div', { style: 'padding:16px;' }, '左侧面板（可拖拽分隔条）'),
        second: () => h('div', { style: 'padding:16px;' }, '右侧面板'),
      })
  },
})

export const SurfaceBasicVue = defineComponent({
  setup() {
    return () =>
      h(UI.Surface, { style: 'padding:20px;border-radius:12px;' }, () => [
        h('strong', 'Surface 表面容器'),
        h('p', { style: 'margin:8px 0 0;color:var(--docs-text-secondary);font-size:13px;' }, '提供 HeroUI 风格的层级背景、描边与圆角。'),
      ])
  },
})

export const ScrollShadowBasicVue = defineComponent({
  setup() {
    return () =>
      h(UI.ScrollShadow, { maxHeight: 160, variant: 'page', style: 'border:1px solid var(--docs-border);border-radius:10px;padding:12px;' }, () =>
        Array.from({ length: 12 }, (_, i) =>
          h('div', { key: i, style: 'padding:7px 0;border-bottom:1px dashed var(--docs-border);font-size:13px;' }, `滚动边缘渐隐列表项 #${i + 1}`)
        )
      )
  },
})

// ==================== 导航 Navigation ====================
export const AffixBasicVue = defineComponent({
  setup() {
    return () =>
      h('div', { style: 'display:flex;align-items:center;gap:12px;' }, [
        h(UI.Affix, { offsetTop: 80 }, () => h(UI.Button, { variant: 'outline' }, () => 'Affix 固钉按钮')),
        h('span', { style: 'color:var(--docs-text-secondary);font-size:13px;' }, '页面滚动时固定在视口 offsetTop 位置'),
      ])
  },
})

export const AnchorBasicVue = defineComponent({
  setup() {
    return () =>
      h(UI.Anchor, { affix: false }, () => [
        h(UI.AnchorLink, { href: '#anchor-basic', title: '基础用法' }),
        h(UI.AnchorLink, { href: '#api-props', title: 'API 参数' }),
      ])
  },
})

export const BackTopBasicVue = defineComponent({
  setup() {
    return () =>
      h('div', { style: 'display:flex;align-items:center;gap:12px;' }, [
        h(UI.Tag, null, () => 'BackTop 回到顶部'),
        h('span', { style: 'color:var(--docs-text-secondary);font-size:13px;' }, '当页面向下滚动超过 visibleHeight 时会在右下角显示按钮。'),
        h(UI.BackTop, { visibleHeight: 200 }),
      ])
  },
})

export const BreadcrumbBasicVue = defineComponent({
  setup() {
    return () =>
      h(UI.Breadcrumb, null, () => [
        h(UI.BreadcrumbItem, null, () => '首页'),
        h(UI.BreadcrumbItem, null, () => '组件库'),
        h(UI.BreadcrumbItem, null, () => 'Breadcrumb 面包屑'),
      ])
  },
})

export const DropdownBasicVue = defineComponent({
  setup() {
    return () =>
      h('div', { style: 'display:flex;gap:12px;flex-wrap:wrap;' }, [
        h(
          UI.Dropdown,
          { trigger: 'click' },
          {
            default: () => h(UI.Button, { variant: 'outline' }, () => '点击展开 (click) ▾'),
            content: () => [
              h(UI.Doption, null, () => '新建工作区'),
              h(UI.Doption, null, () => '导入配置'),
              h(UI.Doption, { disabled: true }, () => '已归档项目'),
            ],
          }
        ),
        h(
          UI.Dropdown,
          { trigger: 'hover' },
          {
            default: () => h(UI.Button, { variant: 'secondary' }, () => '悬停展开 (hover) ▾'),
            content: () => [h(UI.Doption, null, () => '选项一'), h(UI.Doption, null, () => '选项二')],
          }
        ),
      ])
  },
})

export const MenuBasicVue = defineComponent({
  setup() {
    return () =>
      h(UI.Menu, { mode: 'horizontal', defaultSelectedKeys: ['1'] }, () => [
        h(UI.MenuItem, { key: '1' }, () => '概览'),
        h(UI.MenuItem, { key: '2' }, () => '组件'),
        h(UI.MenuItem, { key: '3' }, () => '主题'),
      ])
  },
})

export const PageHeaderBasicVue = defineComponent({
  setup() {
    return () =>
      h(UI.PageHeader, { title: '工作区设置', subtitle: '管理主题、圆角与插件权限', showBack: true }, {
        extra: () => h(UI.Button, { size: 'sm' }, () => '保存设置'),
      })
  },
})

export const PaginationBasicVue = defineComponent({
  setup() {
    const current = ref(2)
    return () =>
      h(UI.Pagination, {
        total: 120,
        current: current.value,
        'onUpdate:current': (v: number) => (current.value = v),
        showTotal: true,
        showJumper: true,
      })
  },
})

export const StepsBasicVue = defineComponent({
  setup() {
    const step = ref(2)
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:16px;' }, [
        h(UI.Steps, { current: step.value }, () => [
          h(UI.Step, { title: '安装依赖', description: 'pnpm add' }),
          h(UI.Step, { title: '配置主题', description: 'DshProvider' }),
          h(UI.Step, { title: '发布上线', description: 'GitHub Pages' }),
        ]),
        h('div', { style: 'display:flex;gap:8px;' }, [
          h(UI.Button, { size: 'sm', variant: 'outline', onClick: () => (step.value = Math.max(1, step.value - 1)) }, () => '上一步'),
          h(UI.Button, { size: 'sm', onClick: () => (step.value = Math.min(3, step.value + 1)) }, () => '下一步'),
        ]),
      ])
  },
})

export const TabsBasicVue = defineComponent({
  setup() {
    const type = ref<'line' | 'card' | 'rounded' | 'capsule'>('line')
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:14px;' }, [
        h(UI.RadioGroup, {
          modelValue: type.value,
          'onUpdate:modelValue': (v: any) => (type.value = v),
          type: 'button',
          options: ['line', 'card', 'rounded', 'capsule'],
        }),
        h(UI.Tabs, { defaultActiveKey: '1', type: type.value }, () => [
          h(UI.TabPane, { key: '1', title: 'Vue 3' }, () => '使用 @dsh-plugin/dsh-ui-components-vue 构建 Vue 界面。'),
          h(UI.TabPane, { key: '2', title: 'React 18' }, () => '使用 @dsh-plugin/dsh-ui-components 构建 React 界面。'),
          h(UI.TabPane, { key: '3', title: 'Tokens' }, () => '通过 CSS 变量统一主题与圆角。'),
        ]),
      ])
  },
})

export const ToolbarBasicVue = defineComponent({
  setup() {
    return () =>
      h(UI.Toolbar, { 'aria-label': '编辑工具栏' }, () => [
        h('input', { 'aria-label': '搜索文档', placeholder: '搜索文档' }),
        h(UI.ToggleButton, null, () => '加粗'),
        h(UI.ToggleButton, null, () => '斜体'),
        h(UI.ToggleButton, null, () => '下划线'),
        h(UI.Button, { size: 'sm', variant: 'ghost' }, () => '插入链接'),
      ])
  },
})

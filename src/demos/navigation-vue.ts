import { defineComponent, h, ref } from 'vue'
import * as UI from '@dsh-plugin/dsh-ui-components-vue'

export const BreadcrumbVue = defineComponent({
  setup() {
    return () =>
      h(UI.Breadcrumb, null, () => [
        h(UI.BreadcrumbItem, null, () => '首页'),
        h(UI.BreadcrumbItem, null, () => '组件库'),
        h(UI.BreadcrumbItem, null, () => 'Breadcrumb 面包屑'),
      ])
  },
})

export const DropdownVue = defineComponent({
  setup() {
    return () =>
      h(
        UI.Dropdown,
        { trigger: 'click' },
        {
          default: () => h(UI.Button, { variant: 'outline' }, () => '点击展开下拉菜单 ▾'),
          content: () => [
            h(UI.Doption, null, () => '新建工作区'),
            h(UI.Doption, null, () => '导入配置'),
            h(UI.Doption, { disabled: true }, () => '已归档项目'),
          ],
        }
      )
  },
})

export const MenuVue = defineComponent({
  setup() {
    return () =>
      h(
        UI.Menu,
        { mode: 'horizontal', defaultSelectedKeys: ['1'] },
        () => [
          h(UI.MenuItem, { key: '1' }, () => '概览'),
          h(UI.MenuItem, { key: '2' }, () => '组件'),
          h(UI.MenuItem, { key: '3' }, () => '主题'),
        ]
      )
  },
})

export const PaginationVue = defineComponent({
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

export const StepsVue = defineComponent({
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

export const TabsVue = defineComponent({
  setup() {
    return () =>
      h(UI.Tabs, { defaultActiveKey: '1' }, () => [
        h(UI.TabPane, { key: '1', title: 'Vue 3' }, () => '使用 @dsh-plugin/dsh-ui-components-vue 构建 Vue 界面。'),
        h(UI.TabPane, { key: '2', title: 'React 18' }, () => '使用 @dsh-plugin/dsh-ui-components 构建 React 插件界面。'),
        h(UI.TabPane, { key: '3', title: 'Design Tokens' }, () => '通过 CSS 变量统一主题、圆角与阴影层次。'),
      ])
  },
})

export const ToolbarVue = defineComponent({
  setup() {
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:14px;' }, [
        h(UI.PageHeader, { title: '工作区设置', subtitle: 'PageHeader 页头导航', showBack: false }),
        h(UI.Toolbar, { 'aria-label': '编辑工具栏' }, () => [
          h(UI.ToggleButton, null, () => '加粗'),
          h(UI.ToggleButton, null, () => '斜体'),
          h(UI.Button, { size: 'sm', variant: 'ghost' }, () => '插入链接'),
        ]),
      ])
  },
})

export const AffixAnchorBackTopVue = defineComponent({
  setup() {
    return () =>
      h('div', { style: 'display:flex;gap:16px;align-items:center;flex-wrap:wrap;' }, [
        h(UI.Tag, null, () => 'Affix 固钉 / Anchor 锚点 / BackTop 回到顶部'),
        h(UI.Anchor, { affix: false }, () => [
          h(UI.AnchorLink, { href: '#demo-1', title: '基础用法' }),
          h(UI.AnchorLink, { href: '#api-props', title: 'API 参数' }),
        ]),
        h(UI.BackTop, { visibleHeight: 200 }),
      ])
  },
})

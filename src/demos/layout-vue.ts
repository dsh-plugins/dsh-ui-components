import { defineComponent, h } from 'vue'
import * as UI from '@dsh-plugin/dsh-ui-components-vue'

export const DividerVue = defineComponent({
  setup() {
    return () =>
      h('div', [
        h('p', '上方内容区域'),
        h(UI.Divider, null, () => '分割线文本'),
        h('p', '下方内容区域'),
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

export const GridVue = defineComponent({
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
        h(UI.Col, { span: 8 }, () => box('Col 8')),
        h(UI.Col, { span: 8 }, () => box('Col 8', 0.22)),
        h(UI.Col, { span: 8 }, () => box('Col 8')),
        h(UI.Col, { span: 12 }, () => box('Col 12', 0.2)),
        h(UI.Col, { span: 12 }, () => box('Col 12', 0.12)),
      ])
  },
})

export const LayoutVue = defineComponent({
  setup() {
    return () =>
      h(UI.Layout, { style: 'border:1px solid var(--docs-border);border-radius:10px;overflow:hidden;height:200px;' }, () => [
        h(UI.LayoutHeader, { style: 'padding:10px 16px;background:var(--docs-bg-subtle);border-bottom:1px solid var(--docs-border);font-weight:600;' }, () => 'Header'),
        h(UI.Layout, null, () => [
          h(UI.LayoutSider, { width: 120, style: 'padding:12px;border-right:1px solid var(--docs-border);' }, () => 'Sider'),
          h(UI.LayoutContent, { style: 'padding:16px;' }, () => 'Content 主内容区'),
        ]),
      ])
  },
})

export const SpaceVue = defineComponent({
  setup() {
    return () =>
      h(UI.Space, { size: 'medium', wrap: true }, () => [
        h(UI.Button, null, () => '按钮一'),
        h(UI.Button, { variant: 'secondary' }, () => '按钮二'),
        h(UI.Button, { variant: 'outline' }, () => '按钮三'),
        h(UI.Tag, null, () => '标签'),
      ])
  },
})

export const SplitResizeVue = defineComponent({
  setup() {
    return () =>
      h(UI.Split as any, { style: 'height:140px;border:1px solid var(--docs-border);border-radius:10px;' }, {
        first: () => h('div', { style: 'padding:16px;' }, '左侧面板（可拖拽分隔条）'),
        second: () => h('div', { style: 'padding:16px;' }, '右侧面板'),
      })
  },
})

export const SurfaceScrollShadowVue = defineComponent({
  setup() {
    return () =>
      h('div', { style: 'display:grid;grid-template-columns:1fr 1fr;gap:16px;' }, [
        h(UI.Surface, { style: 'padding:18px;border-radius:12px;' }, () => [
          h('strong', 'Surface 表面容器'),
          h('p', { style: 'margin:8px 0 0;color:var(--docs-text-secondary);font-size:13px;' }, '提供 HeroUI 风格的层级背景与描边。'),
        ]),
        h(UI.ScrollShadow, { style: 'height:140px;border:1px solid var(--docs-border);border-radius:10px;padding:12px;' }, () =>
          Array.from({ length: 10 }, (_, i) =>
            h('div', { key: i, style: 'padding:6px 0;border-bottom:1px dashed var(--docs-border);font-size:13px;' }, `滚动边缘渐隐项目 #${i + 1}`)
          )
        ),
      ])
  },
})

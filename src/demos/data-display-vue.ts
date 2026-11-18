import { defineComponent, h, ref } from 'vue'
import * as UI from '@dsh-plugin/dsh-ui-components-vue'

export const AvatarBadgeTagVue = defineComponent({
  setup() {
    return () =>
      h('div', { style: 'display:flex;gap:16px;align-items:center;flex-wrap:wrap;' }, [
        h(UI.Badge, { count: 9 }, () => h(UI.Avatar, { size: 40 }, () => 'DS')),
        h(UI.Tag, { color: 'blue' }, () => 'Arco Design'),
        h(UI.Tag, { color: 'green' }, () => '运行正常'),
        h(UI.Chip, { color: 'purple' }, () => 'HeroUI Chip'),
      ])
  },
})

export const CardCollapseVue = defineComponent({
  setup() {
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:16px;' }, [
        h(UI.Card, { title: '工作区概览', extra: 'v0.1.0' }, () => 'Card 卡片容器支持 title、extra、actions 等标准插槽。'),
        h(UI.Accordion, { defaultActiveKey: ['1'] }, () => [
          h(UI.AccordionItem, { key: '1', header: '什么是 DSH UI Components？' }, () => '基于 Arco Design 并融合 HeroUI v3 视觉语言的组件库。'),
          h(UI.AccordionItem, { key: '2', header: '如何切换圆角与主题？' }, () => '通过 DshProvider 的 theme 和 radius 属性一键切换。'),
        ]),
      ])
  },
})

export const TableListVue = defineComponent({
  setup() {
    const selected = ref('balanced')
    const columns = [
      { title: '组件', dataIndex: 'name' },
      { title: '分类', dataIndex: 'category' },
      { title: '状态', dataIndex: 'status' },
    ]
    const data = [
      { key: '1', name: 'Button', category: '通用', status: '稳定' },
      { key: '2', name: 'InputOTP', category: '数据输入', status: '稳定' },
      { key: '3', name: 'DshProvider', category: '主题基础', status: '稳定' },
    ]
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:16px;' }, [
        h(UI.Table, { columns, data, pagination: false }),
        h(UI.ListBox, {
          modelValue: selected.value,
          'onUpdate:modelValue': (v: any) => (selected.value = v),
          options: [
            { value: 'fast', label: '快速', description: '优先响应速度' },
            { value: 'balanced', label: '均衡', description: '兼顾速度与质量' },
          ],
        }),
      ])
  },
})

export const DescriptionsStatisticTimelineVue = defineComponent({
  setup() {
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:18px;' }, [
        h(UI.Descriptions, {
          title: '组件库信息',
          column: 2,
          data: [
            { label: '包名', value: '@dsh-plugin/dsh-ui-components-vue' },
            { label: '基线', value: '@arco-design/web-vue' },
          ],
        }),
        h('div', { style: 'display:flex;gap:32px;flex-wrap:wrap;' }, [
          h(UI.Statistic, { title: '覆盖组件数', value: 70, suffix: '+' }),
          h(UI.Statistic, { title: '测试通过率', value: 100, suffix: '%' }),
        ]),
        h(UI.Timeline, null, () => [
          h(UI.TimelineItem, { label: '2026-11-14' }, () => '发布 React 版 @dsh-plugin/dsh-ui-components'),
          h(UI.TimelineItem, { label: '2026-11-18' }, () => '构建 Vue & React 官方文档站点'),
        ]),
      ])
  },
})

export const TooltipPopoverTreeVue = defineComponent({
  setup() {
    const treeData = [
      { key: 'root', title: 'dsh-ui-components', children: [{ key: 'vue', title: 'vue 分支' }, { key: 'main', title: 'main (React)' }] },
    ]
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:16px;' }, [
        h('div', { style: 'display:flex;gap:12px;flex-wrap:wrap;' }, [
          h(UI.Tooltip, { content: '这是 Tooltip 文字提示' }, () => h(UI.Button, { variant: 'outline' }, () => '悬停 Tooltip')),
          h(UI.Popover, { title: 'Popover 标题', content: '支持更丰富的弹出卡片内容。' }, () => h(UI.Button, { variant: 'secondary' }, () => '点击 Popover')),
        ]),
        h(UI.Tree, { data: treeData, defaultExpandAll: true, checkable: true }),
      ])
  },
})

export const MediaMiscDisplayVue = defineComponent({
  setup() {
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:16px;' }, [
        h(UI.Empty, { description: 'Empty / EmptyState 空状态占位' }),
        h(UI.Comment, { author: 'DSH Team', datetime: '刚刚', content: 'Comment 评论组件展示。' }),
        h(UI.Watermark, { content: 'DSH UI' }, () =>
          h('div', { style: 'height:90px;padding:16px;border:1px solid var(--docs-border);border-radius:8px;' }, 'Watermark 水印保护区域')
        ),
        h(UI.Carousel, { style: 'width:100%;height:110px;border-radius:10px;overflow:hidden;' }, () => [
          h(UI.CarouselItem, null, () => h('div', { style: 'height:110px;display:flex;align-items:center;justify-content:center;background:rgba(22,93,255,0.12);font-weight:600;' }, 'Carousel 轮播 1')),
          h(UI.CarouselItem, null, () => h('div', { style: 'height:110px;display:flex;align-items:center;justify-content:center;background:rgba(114,46,209,0.12);font-weight:600;' }, 'Carousel 轮播 2')),
        ]),
      ])
  },
})

export const CalendarImageOverflowVue = defineComponent({
  setup() {
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:14px;' }, [
        h(UI.OverflowList, null, () => [
          h(UI.Tag, null, () => 'Vue 3'),
          h(UI.Tag, null, () => 'React 18'),
          h(UI.Tag, null, () => 'Arco Design'),
          h(UI.Tag, null, () => 'HeroUI'),
          h(UI.Tag, null, () => 'TypeScript'),
        ]),
        h(UI.Calendar, { style: 'max-width:460px;' }),
      ])
  },
})

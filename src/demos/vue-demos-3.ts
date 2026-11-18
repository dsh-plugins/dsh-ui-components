import { defineComponent, h, ref } from 'vue'
import * as UI from '@dsh-plugin/dsh-ui-components-vue'

// ==================== 数据展示 Data Display ====================
export const AvatarBasicVue = defineComponent({
  setup() {
    return () =>
      h('div', { style: 'display:flex;gap:16px;align-items:center;flex-wrap:wrap;' }, [
        h(UI.Avatar, { size: 32 }, () => 'S'),
        h(UI.Avatar, { size: 40 }, () => 'DS'),
        h(UI.Avatar, { size: 48, shape: 'square' }, () => 'UI'),
        h(UI.AvatarGroup, { size: 36 }, () => [
          h(UI.Avatar, null, () => 'A'),
          h(UI.Avatar, null, () => 'B'),
          h(UI.Avatar, null, () => 'C'),
        ]),
      ])
  },
})

export const BadgeBasicVue = defineComponent({
  setup() {
    return () =>
      h('div', { style: 'display:flex;gap:24px;align-items:center;flex-wrap:wrap;' }, [
        h(UI.Badge, { count: 9 }, () => h(UI.Avatar, { shape: 'square' }, () => 'DS')),
        h(UI.Badge, { count: 108, maxCount: 99 }, () => h(UI.Button, { variant: 'outline', size: 'sm' }, () => '消息')),
        h(UI.Badge, { dot: true, status: 'processing' }, () => h(UI.Button, { variant: 'secondary', size: 'sm' }, () => '状态点')),
      ])
  },
})

export const CalendarBasicVue = defineComponent({
  setup() {
    return () => h(UI.Calendar, { style: 'max-width:480px;' })
  },
})

export const CardBasicVue = defineComponent({
  setup() {
    return () =>
      h('div', { style: 'display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;' }, [
        h(UI.Card, { title: '标准卡片', extra: '更多' }, () => 'HeroUI 三级表面与柔和描边。'),
        h(UI.Card, { title: '可悬停卡片', hoverable: true }, () => 'hoverable={true} 提供悬停阴影反馈。'),
      ])
  },
})

export const CarouselBasicVue = defineComponent({
  setup() {
    return () =>
      h(UI.Carousel, { style: 'width:100%;height:130px;border-radius:10px;overflow:hidden;', showArrow: 'always' }, () => [
        h(UI.CarouselItem, null, () => h('div', { style: 'height:130px;display:flex;align-items:center;justify-content:center;background:rgba(22,93,255,0.12);font-weight:600;' }, 'Slide 1 · HeroUI 视觉语言')),
        h(UI.CarouselItem, null, () => h('div', { style: 'height:130px;display:flex;align-items:center;justify-content:center;background:rgba(114,46,209,0.12);font-weight:600;' }, 'Slide 2 · Arco 交互基线')),
      ])
  },
})

export const CollapseBasicVue = defineComponent({
  setup() {
    return () =>
      h(UI.Accordion, { defaultActiveKey: ['1'] }, () => [
        h(UI.AccordionItem, { key: '1', header: '什么是 DSH UI Components？' }, () => '基于 Arco Design 并融合 HeroUI v3 视觉语言的组件库。'),
        h(UI.AccordionItem, { key: '2', header: '支持哪些主题与圆角？' }, () => '支持浅色/深色/自动主题及 5 档圆角预设。'),
      ])
  },
})

export const CommentBasicVue = defineComponent({
  setup() {
    return () =>
      h(UI.Comment, {
        author: 'DSH Design Team',
        datetime: '1 分钟前',
        content: '文档站点已支持 Vue 与 React 双框架切换展示与代码复制。',
      })
  },
})

export const DescriptionsBasicVue = defineComponent({
  setup() {
    return () =>
      h(UI.Descriptions, {
        title: '包信息',
        column: 2,
        bordered: true,
        data: [
          { label: 'Vue 包名', value: '@dsh-plugin/dsh-ui-components-vue' },
          { label: 'React 包名', value: '@dsh-plugin/dsh-ui-components' },
          { label: '设计语言', value: 'HeroUI v3' },
          { label: '交互基线', value: 'Arco Design' },
        ],
      })
  },
})

export const EmptyBasicVue = defineComponent({
  setup() {
    return () => h(UI.Empty, { description: '暂无匹配的数据记录' })
  },
})

export const ImageBasicVue = defineComponent({
  setup() {
    return () =>
      h(UI.Image, {
        width: 220,
        height: 140,
        src: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
        title: 'DSH 媒体预览',
        description: '点击图片预览',
        alt: '示例图片',
      })
  },
})

export const ListBoxBasicVue = defineComponent({
  setup() {
    const selected = ref('balanced')
    return () =>
      h('div', { style: 'max-width:420px;' }, [
        h(UI.ListBox, {
          modelValue: selected.value,
          'onUpdate:modelValue': (v: any) => (selected.value = v),
          options: [
            { value: 'fast', label: '快速模式', description: '轻量任务，优先响应速度' },
            { value: 'balanced', label: '均衡模式', description: '日常工作，兼顾速度与质量' },
            { value: 'offline', label: '离线模式', description: '当前不可用', disabled: true },
          ],
        }),
      ])
  },
})

export const OverflowListBasicVue = defineComponent({
  setup() {
    return () =>
      h('div', { style: 'max-width:340px;' }, [
        h(UI.OverflowList, null, () => [
          h(UI.Tag, null, () => 'Vue 3'),
          h(UI.Tag, null, () => 'React 18'),
          h(UI.Tag, null, () => 'Arco Design'),
          h(UI.Tag, null, () => 'HeroUI'),
          h(UI.Tag, null, () => 'TypeScript'),
          h(UI.Tag, null, () => 'Vite'),
        ]),
      ])
  },
})

export const PopoverBasicVue = defineComponent({
  setup() {
    return () =>
      h('div', { style: 'display:flex;gap:12px;' }, [
        h(UI.Popover, { title: 'Popover 标题', content: '支持自定义标题与富文本内容。', trigger: 'click' }, () =>
          h(UI.Button, { variant: 'outline' }, () => '点击弹出 Popover')
        ),
        h(UI.Popover, { title: '悬停触发', content: 'trigger="hover"', trigger: 'hover' }, () =>
          h(UI.Button, { variant: 'secondary' }, () => '悬停弹出')
        ),
      ])
  },
})

export const StatisticBasicVue = defineComponent({
  setup() {
    return () =>
      h('div', { style: 'display:flex;gap:36px;flex-wrap:wrap;' }, [
        h(UI.Statistic, { title: '组件总数', value: 50, suffix: '+' }),
        h(UI.Statistic, { title: '测试覆盖率', value: 100, suffix: '%' }),
        h(UI.Statistic, { title: '构建耗时', value: 1.4, precision: 1, suffix: 's' }),
      ])
  },
})

export const TableBasicVue = defineComponent({
  setup() {
    const columns = [
      { title: '组件', dataIndex: 'name' },
      { title: '分类', dataIndex: 'category' },
      { title: '支持框架', dataIndex: 'framework' },
    ]
    const data = [
      { key: '1', name: 'Button', category: '通用', framework: 'Vue / React' },
      { key: '2', name: 'InputOTP', category: '数据输入', framework: 'Vue' },
      { key: '3', name: 'PanelShell', category: 'DSH 复合组件', framework: 'React' },
    ]
    return () => h(UI.Table, { columns, data, pagination: false })
  },
})

export const TagBasicVue = defineComponent({
  setup() {
    const colors = ['blue', 'green', 'orange', 'red', 'purple', 'gray'] as const
    return () =>
      h('div', { style: 'display:flex;gap:8px;flex-wrap:wrap;align-items:center;' }, [
        ...colors.map((color) => h(UI.Tag, { key: color, color }, () => color)),
        h(UI.Chip, { color: 'purple', closable: true }, () => 'HeroUI Chip'),
      ])
  },
})

export const TimelineBasicVue = defineComponent({
  setup() {
    return () =>
      h(UI.Timeline, null, () => [
        h(UI.TimelineItem, { label: '2026-11-14' }, () => '发布 React 版 @dsh-plugin/dsh-ui-components'),
        h(UI.TimelineItem, { label: '2026-11-17' }, () => '完善 Vue 版 @dsh-plugin/dsh-ui-components-vue'),
        h(UI.TimelineItem, { label: '2026-11-18' }, () => '上线双框架文档站点与 GitHub Pages'),
      ])
  },
})

export const TooltipBasicVue = defineComponent({
  setup() {
    return () =>
      h('div', { style: 'display:flex;gap:12px;flex-wrap:wrap;' }, [
        h(UI.Tooltip, { content: '上方提示', position: 'top' }, () => h(UI.Button, { variant: 'outline' }, () => 'Top')),
        h(UI.Tooltip, { content: '右侧提示', position: 'right' }, () => h(UI.Button, { variant: 'outline' }, () => 'Right')),
        h(UI.Tooltip, { content: '下方提示', position: 'bottom' }, () => h(UI.Button, { variant: 'outline' }, () => 'Bottom')),
      ])
  },
})

export const TreeBasicVue = defineComponent({
  setup() {
    const data = [
      {
        key: 'root',
        title: 'dsh-ui-components',
        children: [
          { key: 'main', title: 'main (React)' },
          { key: 'vue', title: 'vue (Vue 3)' },
          { key: 'docs', title: 'docs (Docs Site)' },
        ],
      },
    ]
    return () => h(UI.Tree, { data, defaultExpandAll: true, checkable: true })
  },
})

export const WatermarkBasicVue = defineComponent({
  setup() {
    return () =>
      h(UI.Watermark, { content: 'DSH UI' }, () =>
        h('div', { style: 'height:120px;padding:16px;border:1px solid var(--docs-border);border-radius:10px;' }, 'Watermark 水印保护区域')
      )
  },
})

// ==================== 反馈 Feedback ====================
export const AlertBasicVue = defineComponent({
  setup() {
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:10px;' }, [
        h(UI.Alert, { type: 'info', title: '信息提示' }, () => 'type="info"'),
        h(UI.Alert, { type: 'success', title: '操作成功' }, () => 'type="success"'),
        h(UI.Alert, { type: 'warning', title: '注意事项' }, () => 'type="warning"'),
        h(UI.Alert, { type: 'error', title: '错误警告', closable: true }, () => 'type="error" closable'),
      ])
  },
})

export const DrawerBasicVue = defineComponent({
  setup() {
    const open = ref(false)
    const placement = ref<'right' | 'left' | 'top' | 'bottom'>('right')
    return () =>
      h('div', { style: 'display:flex;gap:10px;align-items:center;flex-wrap:wrap;' }, [
        h(UI.RadioGroup, {
          modelValue: placement.value,
          'onUpdate:modelValue': (v: any) => (placement.value = v),
          type: 'button',
          options: ['right', 'left', 'top', 'bottom'],
        }),
        h(UI.Button, { onClick: () => (open.value = true) }, () => '打开 Drawer'),
        h(UI.Drawer, {
          visible: open.value,
          'onUpdate:visible': (v: boolean) => (open.value = v),
          placement: placement.value,
          title: '作用域抽屉',
          width: 360,
        }, () => 'Drawer 自动继承 DshProvider 的主题与圆角变量。'),
      ])
  },
})

export const MessageBasicVue = defineComponent({
  setup() {
    const { message } = UI.useFeedback()
    const toast = UI.useToast()
    return () =>
      h('div', { style: 'display:flex;gap:10px;flex-wrap:wrap;' }, [
        h(UI.Button, { onClick: () => message.info('info 消息') }, () => 'Info'),
        h(UI.Button, { variant: 'secondary', onClick: () => toast.success('useToast 成功提示') }, () => 'Toast Success'),
        h(UI.Button, { variant: 'outline', onClick: () => message.warning('warning 警告') }, () => 'Warning'),
        h(UI.Button, { variant: 'danger-soft', onClick: () => message.error('error 错误') }, () => 'Error'),
      ])
  },
})

export const MeterBasicVue = defineComponent({
  setup() {
    const val = ref(72)
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:12px;max-width:420px;' }, [
        h(UI.Meter, { value: val.value, label: '内存占用' }),
        h('div', { style: 'display:flex;gap:8px;' }, [
          h(UI.Button, { size: 'sm', variant: 'outline', onClick: () => (val.value = Math.max(0, val.value - 15)) }, () => '-15%'),
          h(UI.Button, { size: 'sm', onClick: () => (val.value = Math.min(100, val.value + 15)) }, () => '+15%'),
        ]),
      ])
  },
})

export const ModalBasicVue = defineComponent({
  setup() {
    const open = ref(false)
    return () =>
      h('div', [
        h(UI.Button, { onClick: () => (open.value = true) }, () => '打开 Modal 对话框'),
        h(UI.Modal, {
          visible: open.value,
          'onUpdate:visible': (v: boolean) => (open.value = v),
          title: 'HeroUI 风格对话框',
        }, () => '支持 Escape 关闭、焦点限制与关闭后焦点恢复。'),
      ])
  },
})

export const NotificationBasicVue = defineComponent({
  setup() {
    const { notification } = UI.useFeedback()
    return () =>
      h('div', { style: 'display:flex;gap:10px;flex-wrap:wrap;' }, [
        h(UI.Button, { onClick: () => notification.info({ title: '系统通知', content: '来自 useFeedback().notification 的作用域通知。' }) }, () => '弹出通知'),
        h(UI.Button, { variant: 'secondary', onClick: () => notification.success({ title: '部署完成', content: 'GitHub Pages 已更新。' }) }, () => '成功通知'),
      ])
  },
})

export const PopconfirmBasicVue = defineComponent({
  setup() {
    return () =>
      h(UI.Popconfirm, { content: '确定删除此配置项吗？' }, () =>
        h(UI.Button, { variant: 'danger-soft' }, () => '点击删除（Popconfirm）')
      )
  },
})

export const ProgressBasicVue = defineComponent({
  setup() {
    const pct = ref(0.68)
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:14px;max-width:440px;' }, [
        h(UI.Progress, { percent: pct.value }),
        h(UI.ProgressBar, { value: Math.round(pct.value * 100), label: 'ProgressBar' }),
        h(UI.ProgressCircle, { value: Math.round(pct.value * 100) }),
      ])
  },
})

export const ResultBasicVue = defineComponent({
  setup() {
    const status = ref<'success' | 'info' | 'warning' | 'error'>('success')
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:12px;' }, [
        h(UI.RadioGroup, {
          modelValue: status.value,
          'onUpdate:modelValue': (v: any) => (status.value = v),
          type: 'button',
          options: ['success', 'info', 'warning', 'error'],
        }),
        h(UI.Result, { status: status.value, title: `状态：${status.value}`, subtitle: '展示操作处理结果与引导操作。' }),
      ])
  },
})

export const SkeletonBasicVue = defineComponent({
  setup() {
    return () =>
      h(UI.Skeleton, { animation: true }, () => h(UI.SkeletonLine, { rows: 3 }))
  },
})

export const SpinBasicVue = defineComponent({
  setup() {
    return () =>
      h('div', { style: 'display:flex;gap:24px;align-items:center;' }, [
        h(UI.Spin, { size: 24 }),
        h(UI.Spin, { dot: true }),
        h(UI.Spinner, { label: '正在加载数据…' }),
        h(UI.Spin, { loading: true, loadingStyle: 'blur' }, () => h('p', '加载中的内容')),
      ])
  },
})

export const TriggerBasicVue = defineComponent({
  setup() {
    return () =>
      h(
        UI.Trigger,
        { trigger: 'click', position: 'bottom' },
        {
          default: () => h(UI.Button, { variant: 'outline' }, () => '点击触发 Trigger'),
          content: () =>
            h(
              'div',
              {
                style: 'padding:12px 16px;border-radius:10px;border:1px solid var(--docs-border);background:var(--docs-bg-card);box-shadow:0 8px 24px rgba(0,0,0,0.12);',
              },
              '自定义 Trigger 弹出内容'
            ),
        }
      )
  },
})

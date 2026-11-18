import { defineComponent, h, ref } from 'vue'
import * as UI from '@dsh-plugin/dsh-ui-components-vue'

export const AlertVue = defineComponent({
  setup() {
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:10px;' }, [
        h(UI.Alert, { type: 'info', title: '信息提示' }, () => '这是一条标准的信息提示。'),
        h(UI.Alert, { type: 'success', title: '操作成功' }, () => '组件配置已保存并生效。'),
        h(UI.Alert, { type: 'warning', title: '注意事项' }, () => '浮层组件建议放置在 DshProvider 作用域内。'),
        h(UI.Alert, { type: 'error', title: '错误警告' }, () => '检测到无效的输入参数。'),
      ])
  },
})

export const ProgressMeterVue = defineComponent({
  setup() {
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:14px;max-width:440px;' }, [
        h(UI.Progress, { percent: 0.72 }),
        h(UI.ProgressBar, { value: 65, label: 'ProgressBar 任务进度' }),
        h('div', { style: 'display:flex;gap:20px;align-items:center;' }, [
          h(UI.ProgressCircle, { value: 78 }),
          h(UI.Meter, { value: 82, label: 'CPU 占用', style: 'flex:1;' }),
        ]),
      ])
  },
})

export const SpinSkeletonResultVue = defineComponent({
  setup() {
    return () =>
      h('div', { style: 'display:flex;flex-direction:column;gap:16px;' }, [
        h('div', { style: 'display:flex;gap:16px;align-items:center;' }, [
          h(UI.Spin),
          h(UI.Spinner, { label: '加载中' }),
        ]),
        h(UI.Skeleton, { animation: true }, () => h(UI.SkeletonLine, { rows: 2 })),
        h(UI.Result, { status: 'success', title: '构建完成', subtitle: '文档站点已准备就绪，可部署至 GitHub Pages。' }),
      ])
  },
})

export const ModalDrawerPopconfirmVue = defineComponent({
  setup() {
    const modalOpen = ref(false)
    const drawerOpen = ref(false)
    const toast = UI.useToast()
    return () =>
      h('div', { style: 'display:flex;gap:10px;flex-wrap:wrap;' }, [
        h(UI.Button, { onClick: () => (modalOpen.value = true) }, () => '打开 Modal 对话框'),
        h(UI.Button, { variant: 'secondary', onClick: () => (drawerOpen.value = true) }, () => '打开 Drawer 抽屉'),
        h(UI.Button, { variant: 'outline', onClick: () => toast.success('来自 useToast 的作用域提示！') }, () => '触发 Toast / Message'),
        h(
          UI.Popconfirm,
          { content: '确定执行此操作吗？' },
          () => h(UI.Button, { variant: 'danger-soft' }, () => 'Popconfirm 确认')
        ),
        h(
          UI.Modal,
          {
            visible: modalOpen.value,
            'onUpdate:visible': (v: boolean) => (modalOpen.value = v),
            title: 'HeroUI 风格对话框',
          },
          () => 'Modal 自动继承 DshProvider 的主题与圆角变量。'
        ),
        h(
          UI.Drawer,
          {
            visible: drawerOpen.value,
            'onUpdate:visible': (v: boolean) => (drawerOpen.value = v),
            title: '设置抽屉',
            width: 360,
          },
          () => 'Drawer 保留 Arco 官方满高布局与统一表面色。'
        ),
      ])
  },
})

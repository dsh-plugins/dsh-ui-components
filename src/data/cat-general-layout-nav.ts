import type { ComponentMeta } from './types'
import * as V1 from '../demos/vue-demos-1'
import * as R from '../demos/react-demos'

export const generalLayoutNavComponents: ComponentMeta[] = [
  // ==================== 通用 General ====================
  {
    slug: 'button',
    name: 'Button',
    title: '按钮',
    category: 'general',
    categoryLabel: '通用',
    badge: 'HeroUI',
    description: '支持 primary / secondary / tertiary / outline / ghost / danger / danger-soft 变体与 sm / md / lg 尺寸，含 CloseButton、IconButton 与 ButtonGroup。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'button-variants',
        title: '按钮变体 (variant)',
        description: '展示 7 种语义化变体，React 版支持 primary / secondary / outline / text 与 danger。',
        vueComponent: V1.ButtonVariantsVue,
        reactComponent: R.ButtonVariantsReact,
        vueCode: `<template>
  <Button variant="primary">primary</Button>
  <Button variant="secondary">secondary</Button>
  <Button variant="tertiary">tertiary</Button>
  <Button variant="outline">outline</Button>
  <Button variant="ghost">ghost</Button>
  <Button variant="danger">danger</Button>
  <Button variant="danger-soft">danger-soft</Button>
</template>`,
        reactCode: `import { Button, IconButton } from '@dsh-plugin/dsh-ui-components'

export function Demo() {
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      <Button variant="primary">primary</Button>
      <Button variant="secondary">secondary</Button>
      <Button variant="outline">outline</Button>
      <Button variant="text">text</Button>
      <Button variant="primary" danger>danger</Button>
      <IconButton icon={<span>+</span>} label="新建" />
    </div>
  )
}`,
      },
      {
        id: 'button-props',
        title: '尺寸、圆角、加载与组合',
        description: '展示 size (sm/md/lg)、radius (none/sm/lg/full)、loading、disabled、CloseButton 与 ButtonGroup 效果。',
        vueComponent: V1.ButtonPropsVue,
        reactComponent: R.ButtonPropsReact,
        vueCode: `<script setup lang="ts">
import { ref } from 'vue'
import { Button, CloseButton, ButtonGroup } from '@dsh-plugin/dsh-ui-components-vue'

const loading = ref(false)
</script>

<template>
  <Button size="sm">sm</Button>
  <Button size="md">md</Button>
  <Button size="lg">lg</Button>
  <Button radius="full" variant="outline">胶囊圆角</Button>
  <Button :loading="loading" @click="loading = !loading">切换 loading</Button>
  <Button disabled>disabled</Button>
  <CloseButton aria-label="关闭" />
  <ButtonGroup>
    <Button variant="outline">左</Button>
    <Button variant="outline">中</Button>
    <Button variant="outline">右</Button>
  </ButtonGroup>
</template>`,
        reactCode: `import * as React from 'react'
import { Button } from '@dsh-plugin/dsh-ui-components'

export function Demo() {
  const [loading, setLoading] = React.useState(false)
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      <Button size="sm">sm</Button>
      <Button size="md">md</Button>
      <Button size="lg">lg</Button>
      <Button loading={loading} onClick={() => setLoading(!loading)}>
        切换 loading
      </Button>
      <Button disabled>disabled</Button>
    </div>
  )
}`,
      },
    ],
    apiSections: [
      {
        id: 'api-button-props',
        title: 'Button Props',
        kind: 'props',
        rows: [
          { name: 'variant', description: '按钮视觉变体（React 支持 primary / secondary / outline / text）', type: `'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'danger' | 'danger-soft'`, defaultValue: `'primary'` },
          { name: 'size', description: '按钮尺寸', type: `'sm' | 'md' | 'lg'`, defaultValue: `'md'` },
          { name: 'radius', description: '覆盖 DshProvider 全局圆角', type: `'none' | 'sm' | 'md' | 'lg' | 'full'`, defaultValue: '-' },
          { name: 'loading', description: '是否为加载中状态', type: 'boolean', defaultValue: 'false' },
          { name: 'disabled', description: '是否禁用按钮', type: 'boolean', defaultValue: 'false' },
          { name: 'danger', description: '危险操作样式（React）', type: 'boolean', defaultValue: 'false', framework: 'react' },
          { name: 'iconOnly', description: '纯图标按钮紧凑正方形布局', type: 'boolean', defaultValue: 'false', framework: 'vue' },
          { name: 'htmlType', description: '原生 button 的 type 属性', type: `'button' | 'submit' | 'reset'`, defaultValue: `'button'` },
        ],
      },
      {
        id: 'api-button-events',
        title: 'Button Events',
        kind: 'events',
        rows: [
          { name: 'click / onClick', description: '点击按钮时触发（loading 或 disabled 时不触发）', type: '(ev: MouseEvent) => void' },
        ],
      },
      {
        id: 'api-button-slots',
        title: 'Button Slots',
        kind: 'slots',
        framework: 'vue',
        rows: [
          { name: 'default', description: '按钮文本或内容', type: '-' },
          { name: 'icon', description: '前置图标插槽', type: '-' },
        ],
      },
      {
        id: 'api-icon-button-props',
        title: 'IconButton Props',
        description: '仅图标按钮封装，强制要求传入无障碍 label / aria-label。',
        kind: 'props',
        framework: 'react',
        rows: [
          { name: 'icon', description: '图标元素', type: 'ReactNode', required: true },
          { name: 'label', description: '无障碍可读名称（同时作为 tooltip 默认提示）', type: 'string', required: true },
          { name: 'size', description: '按钮尺寸', type: `'sm' | 'md' | 'lg'`, defaultValue: `'md'` },
          { name: 'variant', description: '视觉变体', type: `'primary' | 'secondary' | 'outline' | 'text'`, defaultValue: `'text'` },
        ],
      },
      {
        id: 'api-button-group-props',
        title: 'ButtonGroup Props',
        description: '将多个按钮组合为紧凑工具条。',
        kind: 'props',
        rows: [
          { name: 'size', description: '统一子按钮尺寸', type: `'sm' | 'md' | 'lg'`, defaultValue: `'md'` },
          { name: 'disabled', description: '统一禁用组内全部按钮', type: 'boolean', defaultValue: 'false' },
        ],
      },
    ],
  },
  {
    slug: 'link',
    name: 'Link',
    title: '链接',
    category: 'general',
    categoryLabel: '通用',
    description: '保留 Arco Link 语义状态与图标支持，统一 HeroUI 焦点环与强调色。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'link-basic',
        title: '链接状态与禁用',
        description: '展示 status (success / warning / danger)、disabled 与 hoverable 属性效果。',
        vueComponent: V1.LinkBasicVue,
        reactComponent: R.LinkReact,
        vueCode: `<template>
  <Link href="#">默认链接</Link>
  <Link href="#" status="success">成功链接</Link>
  <Link href="#" status="warning">警告链接</Link>
  <Link href="#" status="danger">危险链接</Link>
  <Link href="#" disabled>禁用链接</Link>
</template>`,
        reactCode: `import { Link } from '@arco-design/web-react'

export function Demo() {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <Link href="#link">默认链接</Link>
      <Link href="#link" status="success">success</Link>
      <Link href="#link" status="warning">warning</Link>
      <Link href="#link" status="error">error</Link>
      <Link href="#link" disabled>disabled</Link>
    </div>
  )
}`,
      },
    ],
    apiSections: [
      {
        id: 'api-link-props',
        title: 'Link Props',
        kind: 'props',
        rows: [
          { name: 'href', description: '链接跳转地址', type: 'string', defaultValue: '-' },
          { name: 'status', description: '链接语义状态（React 危险态为 error）', type: `'normal' | 'success' | 'warning' | 'danger' | 'error'`, defaultValue: `'normal'` },
          { name: 'disabled', description: '是否禁用链接', type: 'boolean', defaultValue: 'false' },
          { name: 'hoverable', description: '悬浮时是否显示底色', type: 'boolean', defaultValue: 'true' },
          { name: 'icon', description: '是否显示默认图标或自定义图标（React）', type: 'boolean | ReactNode', defaultValue: 'false' },
        ],
      },
      {
        id: 'api-link-slots',
        title: 'Link Slots',
        kind: 'slots',
        framework: 'vue',
        rows: [
          { name: 'default', description: '链接文案', type: '-' },
          { name: 'icon', description: '自定义前置图标', type: '-' },
        ],
      },
    ],
  },
  {
    slug: 'typography',
    name: 'Typography',
    title: '排版',
    category: 'general',
    categoryLabel: '通用',
    description: '包含 TypographyTitle、TypographyParagraph 与 Text（TypographyText）。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'typography-basic',
        title: '标题、段落与文本修饰',
        description: '展示 heading、type (secondary/success/warning/danger)、code 与 mark 属性效果。',
        vueComponent: V1.TypographyBasicVue,
        reactComponent: R.TypographyReact,
        vueCode: `<template>
  <TypographyTitle :heading="2">H2 标题</TypographyTitle>
  <TypographyParagraph>正文段落</TypographyParagraph>
  <Text type="secondary">次要文本</Text>
  <Text code>code</Text>
</template>`,
        reactCode: `import { Typography, Paragraph, Text } from '@dsh-plugin/dsh-ui-components'

export function Demo() {
  return (
    <Typography>
      <Typography.Title heading={4}>React 排版体系</Typography.Title>
      <Paragraph>使用 Typography、Paragraph 与 Text 展示层级清晰的文本内容。</Paragraph>
      <Text type="secondary">次要说明文本 · Text</Text>
    </Typography>
  )
}`,
      },
    ],
    apiSections: [
      {
        id: 'api-typography-title',
        title: 'Typography.Title Props',
        kind: 'props',
        rows: [
          { name: 'heading', description: '标题级别，对应 h1 ~ h6', type: '1 | 2 | 3 | 4 | 5 | 6', defaultValue: '1' },
          { name: 'bold', description: '是否加粗', type: 'boolean', defaultValue: 'true' },
          { name: 'ellipsis', description: '是否开启溢出省略', type: 'boolean | EllipsisConfig', defaultValue: 'false' },
        ],
      },
      {
        id: 'api-typography-text',
        title: 'Text / Paragraph Props',
        kind: 'props',
        rows: [
          { name: 'type', description: '文本语义类型', type: `'primary' | 'secondary' | 'success' | 'warning' | 'danger'`, defaultValue: '-' },
          { name: 'code', description: '行内代码样式', type: 'boolean', defaultValue: 'false' },
          { name: 'mark', description: '高亮标记样式', type: 'boolean | { color?: string }', defaultValue: 'false' },
          { name: 'underline', description: '下划线样式', type: 'boolean', defaultValue: 'false' },
          { name: 'delete', description: '删除线样式', type: 'boolean', defaultValue: 'false' },
          { name: 'copyable', description: '是否支持一键复制', type: 'boolean | CopyableConfig', defaultValue: 'false' },
        ],
      },
    ],
  },
  {
    slug: 'kbd',
    name: 'Kbd',
    title: '键盘快捷键',
    category: 'general',
    categoryLabel: '通用',
    badge: 'DSH',
    description: '用于展示键盘按键与组合快捷键的胶囊标签。',
    frameworks: ['vue'],
    demos: [
      {
        id: 'kbd-basic',
        title: '组合快捷键展示',
        description: '适合命令面板与菜单快捷键提示。',
        vueComponent: V1.KbdBasicVue,
        vueCode: `<template>
  <Kbd>⌘</Kbd> + <Kbd>K</Kbd>
</template>`,
      },
    ],
    slots: [
      { name: 'default', description: '按键文本', type: '-' },
    ],
  },
  {
    slug: 'icons',
    name: 'Icons',
    title: '图标',
    category: 'general',
    categoryLabel: '通用',
    description: 'Vue 版通过 @dsh-plugin/dsh-ui-components-vue/icons 按 Arco 图标名导入；React 版通过 IconPark 子路径导入。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'icons-gallery',
        title: '图标检索与预览',
        description: '支持按名称过滤常用图标，自动 Tree-shaking。',
        vueComponent: V1.IconsGalleryVue,
        reactComponent: R.IconsReact,
        vueCode: `<script setup lang="ts">
import { IconSearch, IconPlus, IconSettings } from '@dsh-plugin/dsh-ui-components-vue/icons'
</script>

<template>
  <IconSearch :size="20" />
  <IconPlus :size="20" />
  <IconSettings :size="20" :spin="true" />
</template>`,
        reactCode: `import { Icon } from '@dsh-plugin/dsh-ui-components'

export function Demo() {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <Icon name="Search" size={20} />
      <Icon name="Settings" size={20} />
      <Icon name="Copy" size={20} />
    </div>
  )
}`,
      },
    ],
    apiSections: [
      {
        id: 'api-icons-props',
        title: 'Icon Props',
        kind: 'props',
        rows: [
          { name: 'name', description: 'IconPark 图标名称（React 按名称动态或子路径导入）', type: 'IconName', required: true, framework: 'react' },
          { name: 'size', description: '图标尺寸（像素或 CSS 长度）', type: 'number | string', defaultValue: '16' },
          { name: 'strokeWidth', description: '线条粗细', type: 'number', defaultValue: '3', framework: 'react' },
          { name: 'spin', description: '是否开启旋转动画', type: 'boolean', defaultValue: 'false' },
        ],
      },
    ],
  },

  // ==================== 布局 Layout ====================
  {
    slug: 'divider',
    name: 'Divider',
    title: '分割线',
    category: 'layout',
    categoryLabel: '布局',
    description: '区隔内容的分割线（别名 Separator），支持水平带文本与垂直分割。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'divider-basic',
        title: '水平、虚线、文本位置与垂直分割',
        description: '展示 type="dashed"、orientation 与 direction="vertical"。',
        vueComponent: V1.DividerBasicVue,
        reactComponent: R.DividerReact,
        vueCode: `<template>
  <Divider type="dashed" orientation="left">左侧文字</Divider>
  <Divider direction="vertical" />
</template>`,
        reactCode: `import { Divider } from '@dsh-plugin/dsh-ui-components'

export function Demo() {
  return (
    <div>
      <p>上方内容</p>
      <Divider>分割线文本</Divider>
      <p>下方内容</p>
    </div>
  )
}`,
      },
    ],
    apiSections: [
      {
        id: 'api-divider-props',
        title: 'Divider Props',
        kind: 'props',
        rows: [
          { name: 'direction', description: '分割线方向', type: `'horizontal' | 'vertical'`, defaultValue: `'horizontal'` },
          { name: 'orientation', description: '分割线文字位置', type: `'left' | 'center' | 'right'`, defaultValue: `'center'` },
          { name: 'type', description: '线条类型', type: `'solid' | 'dashed' | 'dotted' | 'double'`, defaultValue: `'solid'` },
          { name: 'margin', description: '上下或左右外边距（px）', type: 'number | string', defaultValue: '-' },
        ],
      },
    ],
  },
  {
    slug: 'grid',
    name: 'Grid',
    title: '栅格',
    category: 'layout',
    categoryLabel: '布局',
    description: '24 栅格系统（Row / Col），支持响应式断点与间距配置。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'grid-basic',
        title: '基础栅格与间距',
        description: '通过 gutter 与 span 控制分栏比例与间隔。',
        vueComponent: V1.GridBasicVue,
        reactComponent: R.GridReact,
        vueCode: `<template>
  <Row :gutter="[12, 12]">
    <Col :span="8">span=8</Col>
    <Col :span="8">span=8</Col>
    <Col :span="8">span=8</Col>
  </Row>
</template>`,
        reactCode: `import { Grid } from '@arco-design/web-react'

const { Row, Col } = Grid

export function Demo() {
  return (
    <Row gutter={[12, 12]}>
      <Col span={8}>Col 8</Col>
      <Col span={8}>Col 8</Col>
      <Col span={8}>Col 8</Col>
    </Row>
  )
}`,
      },
    ],
    apiSections: [
      {
        id: 'api-row-props',
        title: 'Row Props',
        kind: 'props',
        rows: [
          { name: 'gutter', description: '栅格间隔，支持数字、数组 [水平, 垂直] 或响应式对象', type: 'number | [number, number] | ResponsiveValue', defaultValue: '0' },
          { name: 'justify', description: '水平对齐方式', type: `'start' | 'center' | 'end' | 'space-around' | 'space-between'`, defaultValue: `'start'` },
          { name: 'align', description: '垂直对齐方式', type: `'start' | 'center' | 'end' | 'stretch'`, defaultValue: `'start'` },
          { name: 'wrap', description: '是否自动换行', type: 'boolean', defaultValue: 'true' },
        ],
      },
      {
        id: 'api-col-props',
        title: 'Col Props',
        kind: 'props',
        rows: [
          { name: 'span', description: '栅格占位格数（共 24 格）', type: 'number', defaultValue: '24' },
          { name: 'offset', description: '栅格左侧的间隔格数', type: 'number', defaultValue: '0' },
          { name: 'order', description: '栅格顺序', type: 'number', defaultValue: '0' },
          { name: 'flex', description: 'flex 布局属性', type: 'number | string', defaultValue: '-' },
        ],
      },
    ],
  },
  {
    slug: 'layout',
    name: 'Layout',
    title: '页面布局',
    category: 'layout',
    categoryLabel: '布局',
    description: '页面级整体布局容器（Layout / LayoutHeader / LayoutSider / LayoutContent / LayoutFooter）。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'layout-basic',
        title: '经典后台布局',
        description: '顶部导航 + 侧边栏 + 主内容区 + 页脚组合。',
        vueComponent: V1.LayoutBasicVue,
        reactComponent: R.LayoutReact,
        vueCode: `<template>
  <Layout>
    <LayoutHeader>Header</LayoutHeader>
    <Layout>
      <LayoutSider :width="130">Sider</LayoutSider>
      <LayoutContent>Content</LayoutContent>
    </Layout>
    <LayoutFooter>Footer</LayoutFooter>
  </Layout>
</template>`,
        reactCode: `import { Layout } from '@arco-design/web-react'

const { Header, Sider, Content, Footer } = Layout

export function Demo() {
  return (
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Sider style={{ width: 120 }}>Sider</Sider>
        <Content>Content</Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  )
}`,
      },
    ],
    apiSections: [
      {
        id: 'api-layout-props',
        title: 'Layout Props',
        kind: 'props',
        rows: [
          { name: 'hasSider', description: '表示子元素里有 Sider，一般不用指定', type: 'boolean', defaultValue: 'false' },
        ],
      },
      {
        id: 'api-sider-props',
        title: 'Layout.Sider Props',
        kind: 'props',
        rows: [
          { name: 'width', description: '侧边栏宽度', type: 'number | string', defaultValue: '200' },
          { name: 'collapsedWidth', description: '收缩宽度', type: 'number', defaultValue: '48' },
          { name: 'collapsible', description: '是否可收起', type: 'boolean', defaultValue: 'false' },
          { name: 'collapsed', description: '当前收起状态（受控）', type: 'boolean', defaultValue: '-' },
          { name: 'breakpoint', description: '触发响应式布局的断点', type: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'`, defaultValue: '-' },
        ],
      },
    ],
  },
  {
    slug: 'resize-box',
    name: 'ResizeBox',
    title: '伸缩框',
    category: 'layout',
    categoryLabel: '布局',
    description: '支持通过拖拽边缘自由调整尺寸的布局容器。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'resize-basic',
        title: '多方向拖拽伸缩',
        description: '配置 directions 允许向右与向下拖拽。',
        vueComponent: V1.ResizeBoxBasicVue,
        vueCode: `<template>
  <ResizeBox :directions="['right', 'bottom']">内容</ResizeBox>
</template>`,
      },
    ],
    props: [
      { name: 'directions', description: '允许拖拽的方向', type: `Array<'left' | 'right' | 'top' | 'bottom'>`, defaultValue: `['right']` },
      { name: 'width / height', description: '受控宽度与高度', type: 'number', defaultValue: '-' },
    ],
    events: [
      { name: 'moving', description: '拖拽尺寸变化时触发', type: '(size: { width: number; height: number }) => void' },
    ],
  },
  {
    slug: 'space',
    name: 'Space',
    title: '间距',
    category: 'layout',
    categoryLabel: '布局',
    description: '设置组件之间的均匀间距，支持水平、垂直方向与自动换行。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'space-basic',
        title: '动态切换间距尺寸 (size)',
        description: '点击按钮实时体验 mini / small / medium / large 间距效果。',
        vueComponent: V1.SpaceBasicVue,
        reactComponent: R.SpaceReact,
        vueCode: `<template>
  <Space :size="size" wrap>
    <Button>按钮一</Button>
    <Button variant="secondary">按钮二</Button>
  </Space>
</template>`,
        reactCode: `import { Space } from '@arco-design/web-react'
import { Button } from '@dsh-plugin/dsh-ui-components'

export function Demo() {
  return (
    <Space size="medium" wrap>
      <Button variant="primary">按钮一</Button>
      <Button variant="secondary">按钮二</Button>
      <Button variant="outline">按钮三</Button>
    </Space>
  )
}`,
      },
    ],
    apiSections: [
      {
        id: 'api-space-props',
        title: 'Space Props',
        kind: 'props',
        rows: [
          { name: 'size', description: '间距大小，支持预设或具体像素值 / 数组', type: `'mini' | 'small' | 'medium' | 'large' | number | [number, number]`, defaultValue: `'small'` },
          { name: 'direction', description: '排列方向', type: `'horizontal' | 'vertical'`, defaultValue: `'horizontal'` },
          { name: 'wrap', description: '是否自动换行（仅水平时有效）', type: 'boolean', defaultValue: 'false' },
          { name: 'align', description: '交叉轴对齐方式', type: `'start' | 'end' | 'center' | 'baseline'`, defaultValue: '-' },
          { name: 'fill', description: '是否撑满父容器宽度', type: 'boolean', defaultValue: 'false' },
        ],
      },
    ],
  },
  {
    slug: 'split',
    name: 'Split',
    title: '面板分割',
    category: 'layout',
    categoryLabel: '布局',
    description: '将容器分割为可拖拽调整比例的两部分。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'split-basic',
        title: '可拖拽分割面板',
        description: '拖动中间分割线调整左右比例。',
        vueComponent: V1.SplitBasicVue,
        vueCode: `<template>
  <Split style="height: 140px">
    <template #first>左侧面板</template>
    <template #second>右侧面板</template>
  </Split>
</template>`,
      },
    ],
    props: [
      { name: 'direction', description: '分割方向', type: `'horizontal' | 'vertical'`, defaultValue: `'horizontal'` },
      { name: 'size', description: '分割比例或像素值', type: 'number | string', defaultValue: '0.5' },
      { name: 'min / max', description: '最小/最大阈值', type: 'number | string', defaultValue: '-' },
    ],
  },
  {
    slug: 'surface',
    name: 'Surface',
    title: '表面容器',
    category: 'layout',
    categoryLabel: '布局',
    badge: 'DSH',
    description: 'HeroUI 语义化表面容器，提供统一的背景层级、边框与圆角。',
    frameworks: ['vue'],
    demos: [
      {
        id: 'surface-basic',
        title: 'Surface 表面容器',
        description: '自适应浅色与深色背景层级。',
        vueComponent: V1.SurfaceBasicVue,
        vueCode: `<template>\n  <Surface>表面内容</Surface>\n</template>`,
      },
    ],
    slots: [
      { name: 'default', description: '容器内容', type: '-' },
    ],
  },
  {
    slug: 'scroll-shadow',
    name: 'ScrollShadow',
    title: '滚动渐隐容器',
    category: 'layout',
    categoryLabel: '布局',
    badge: 'DSH',
    description: '复用 Arco Scrollbar，根据实际滚动边缘自动显示顶部/底部渐隐提示。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'scrollshadow-basic',
        title: '滚动边缘渐隐',
        description: '内容溢出时自动出现边缘阴影提示，滚动到底部自动隐藏底部阴影。',
        vueComponent: V1.ScrollShadowBasicVue,
        vueCode: `<template>\n  <ScrollShadow style="height: 160px">...</ScrollShadow>\n</template>`,
        reactCode: `import { ScrollShadow } from '@dsh-plugin/dsh-ui-components'`,
      },
    ],
    props: [
      { name: 'size', description: '渐隐阴影高度（px）', type: 'number', defaultValue: '24' },
      { name: 'orientation', description: '滚动方向', type: `'vertical' | 'horizontal'`, defaultValue: `'vertical'` },
    ],
  },

  // ==================== 导航 Navigation ====================
  {
    slug: 'affix',
    name: 'Affix',
    title: '固钉',
    category: 'navigation',
    categoryLabel: '导航',
    description: '将页面元素固定在可视范围指定偏移位置。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'affix-basic',
        title: '基础固钉',
        description: '设置 offsetTop 固定在视口顶部偏移位置。',
        vueComponent: V1.AffixBasicVue,
        vueCode: `<template>\n  <Affix :offset-top="80"><Button>固钉按钮</Button></Affix>\n</template>`,
      },
    ],
    props: [
      { name: 'offsetTop', description: '距离窗口顶部达到指定偏移量后触发', type: 'number', defaultValue: '0' },
      { name: 'offsetBottom', description: '距离窗口底部达到指定偏移量后触发', type: 'number', defaultValue: '-' },
    ],
    events: [
      { name: 'change', description: '固定状态改变时触发', type: '(fixed: boolean) => void' },
    ],
  },
  {
    slug: 'anchor',
    name: 'Anchor',
    title: '锚点',
    category: 'navigation',
    categoryLabel: '导航',
    description: '用于跳转到页面指定位置的锚点导航。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'anchor-basic',
        title: '基础锚点',
        description: '高亮当前所在章节链接。',
        vueComponent: V1.AnchorBasicVue,
        vueCode: `<template>\n  <Anchor :affix="false"><AnchorLink href="#demo" title="示例" /></Anchor>\n</template>`,
      },
    ],
    props: [
      { name: 'affix', description: '是否固钉定位', type: 'boolean', defaultValue: 'true' },
      { name: 'lineless', description: '是否隐藏左侧指示线', type: 'boolean', defaultValue: 'false' },
    ],
  },
  {
    slug: 'back-top',
    name: 'BackTop',
    title: '回到顶部',
    category: 'navigation',
    categoryLabel: '导航',
    description: '返回页面顶部的快捷悬浮按钮。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'backtop-basic',
        title: '回到顶部',
        description: '滚动超过 visibleHeight 阈值后显示返回顶部按钮。',
        vueComponent: V1.BackTopBasicVue,
        reactComponent: R.BackTopReact,
        vueCode: `<template>\n  <BackTop :visible-height="200" />\n</template>`,
        reactCode: `import { BackTop } from '@arco-design/web-react'\n\nexport function Demo() {\n  return <BackTop visibleHeight={200} />\n}`,
      },
    ],
    props: [
      { name: 'visibleHeight', description: '滚动高度达到此值才显示按钮', type: 'number', defaultValue: '200' },
      { name: 'easing', description: '滚动动画缓动函数', type: 'string', defaultValue: `'quartOut'` },
    ],
  },
  {
    slug: 'breadcrumb',
    name: 'Breadcrumb',
    title: '面包屑',
    category: 'navigation',
    categoryLabel: '导航',
    description: '显示当前页面在系统层级结构中的位置（别名 Breadcrumbs）。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'breadcrumb-basic',
        title: '基础面包屑',
        description: '清晰展示路径层级。',
        vueComponent: V1.BreadcrumbBasicVue,
        reactComponent: R.BreadcrumbReact,
        vueCode: `<template>\n  <Breadcrumb><BreadcrumbItem>首页</BreadcrumbItem></Breadcrumb>\n</template>`,
        reactCode: `import { Breadcrumb } from '@dsh-plugin/dsh-ui-components'

export function Demo() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>首页</Breadcrumb.Item>
      <Breadcrumb.Item>组件库</Breadcrumb.Item>
      <Breadcrumb.Item>Breadcrumb</Breadcrumb.Item>
    </Breadcrumb>
  )
}`,
      },
    ],
    apiSections: [
      {
        id: 'api-breadcrumb-props',
        title: 'Breadcrumb Props',
        kind: 'props',
        rows: [
          { name: 'separator', description: '自定义分隔符', type: 'string | ReactNode', defaultValue: `'/'` },
          { name: 'maxCount', description: '最多显示的面包屑数量（超出自动折叠）', type: 'number', defaultValue: '0' },
          { name: 'routes', description: '路由配置数组（直接生成面包屑）', type: 'RouteProps[]', defaultValue: '-' },
        ],
      },
      {
        id: 'api-breadcrumb-item-props',
        title: 'Breadcrumb.Item Props',
        kind: 'props',
        rows: [
          { name: 'href', description: '跳转链接地址', type: 'string', defaultValue: '-' },
          { name: 'droplist', description: '下拉菜单内容', type: 'ReactNode | VNode', defaultValue: '-' },
        ],
      },
    ],
  },
  {
    slug: 'dropdown',
    name: 'Dropdown',
    title: '下拉菜单',
    category: 'navigation',
    categoryLabel: '导航',
    description: '向下弹出的命令菜单列表，浮层自动同步 DshProvider 当前主题。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'dropdown-basic',
        title: '触发方式 (click / hover)',
        description: '展示 click 与 hover 触发下拉菜单及禁用项效果。',
        vueComponent: V1.DropdownBasicVue,
        reactComponent: R.DropdownReact,
        vueCode: `<template>
  <Dropdown trigger="click">
    <Button variant="outline">展开菜单</Button>
    <template #content>
      <Doption>新建文件</Doption>
      <Doption>重命名</Doption>
      <Doption disabled>删除</Doption>
    </template>
  </Dropdown>
</template>`,
        reactCode: `import { Dropdown, Menu, MenuItem, Button } from '@dsh-plugin/dsh-ui-components'

export function Demo() {
  const dropList = (
    <Menu>
      <MenuItem key="1">新建文件</MenuItem>
      <MenuItem key="2">重命名</MenuItem>
      <MenuItem key="3">删除</MenuItem>
    </Menu>
  )
  return (
    <Dropdown droplist={dropList} trigger="click">
      <Button variant="outline">点击展开菜单</Button>
    </Dropdown>
  )
}`,
      },
    ],
    apiSections: [
      {
        id: 'api-dropdown-props',
        title: 'Dropdown Props',
        kind: 'props',
        rows: [
          { name: 'trigger', description: '触发方式', type: `'hover' | 'click' | 'focus' | 'contextMenu'`, defaultValue: `'hover'` },
          { name: 'position', description: '弹出位置', type: `'top' | 'tl' | 'tr' | 'bottom' | 'bl' | 'br'`, defaultValue: `'bottom'` },
          { name: 'popupVisible', description: '受控显示状态', type: 'boolean', defaultValue: '-' },
          { name: 'disabled', description: '是否禁用弹出', type: 'boolean', defaultValue: 'false' },
        ],
      },
      {
        id: 'api-doption-props',
        title: 'Doption Props',
        kind: 'props',
        framework: 'vue',
        rows: [
          { name: 'value', description: '选项值', type: 'string | number | Record<string, any>', defaultValue: '-' },
          { name: 'disabled', description: '是否禁用该菜单项', type: 'boolean', defaultValue: 'false' },
        ],
      },
      {
        id: 'api-dropdown-events',
        title: 'Dropdown Events',
        kind: 'events',
        rows: [
          { name: 'select', description: '点击菜单项时触发', type: '(value: string | number) => void' },
          { name: 'popup-visible-change', description: '下拉框显示状态改变时触发', type: '(visible: boolean) => void' },
        ],
      },
    ],
  },
  {
    slug: 'menu',
    name: 'Menu',
    title: '导航菜单',
    category: 'navigation',
    categoryLabel: '导航',
    description: '为页面和功能提供水平或垂直导航的菜单列表。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'menu-basic',
        title: '水平导航菜单',
        description: '支持 horizontal / vertical 模式与主题切换。',
        vueComponent: V1.MenuBasicVue,
        reactComponent: R.MenuReact,
        vueCode: `<template>
  <Menu mode="horizontal" :default-selected-keys="['1']">
    <MenuItem key="1">概览</MenuItem>
    <MenuItem key="2">文档</MenuItem>
    <MenuItem key="3">设置</MenuItem>
  </Menu>
</template>`,
        reactCode: `import { Menu, MenuItem } from '@dsh-plugin/dsh-ui-components'

export function Demo() {
  return (
    <Menu mode="horizontal" defaultSelectedKeys={['home']}>
      <MenuItem key="home">首页</MenuItem>
      <MenuItem key="docs">文档</MenuItem>
      <MenuItem key="settings">设置</MenuItem>
    </Menu>
  )
}`,
      },
    ],
    apiSections: [
      {
        id: 'api-menu-props',
        title: 'Menu Props',
        kind: 'props',
        rows: [
          { name: 'mode', description: '菜单模式', type: `'vertical' | 'horizontal' | 'pop' | 'popButton'`, defaultValue: `'vertical'` },
          { name: 'collapsed', description: '是否水平折叠收起菜单', type: 'boolean', defaultValue: 'false' },
          { name: 'selectedKeys', description: '当前选中的菜单项 key 数组', type: 'string[]', defaultValue: '-' },
          { name: 'openKeys', description: '当前展开的子菜单 key 数组', type: 'string[]', defaultValue: '-' },
          { name: 'accordion', description: '是否开启手风琴模式（仅保留一个子菜单展开）', type: 'boolean', defaultValue: 'false' },
        ],
      },
      {
        id: 'api-menuitem-props',
        title: 'MenuItem Props',
        kind: 'props',
        rows: [
          { name: 'key', description: '菜单项唯一标识', type: 'string', required: true },
          { name: 'disabled', description: '是否禁用', type: 'boolean', defaultValue: 'false' },
        ],
      },
      {
        id: 'api-menu-events',
        title: 'Menu Events',
        kind: 'events',
        rows: [
          { name: 'menu-item-click / onClickMenuItem', description: '点击菜单项时触发', type: '(key: string) => void' },
          { name: 'sub-menu-click / onClickSubMenu', description: '点击子菜单时触发', type: '(key: string, openKeys: string[]) => void' },
        ],
      },
    ],
  },
  {
    slug: 'page-header',
    name: 'PageHeader',
    title: '页头',
    category: 'navigation',
    categoryLabel: '导航',
    description: '展示页面标题、副标题、返回按钮与右侧操作区。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'pageheader-basic',
        title: '标准页头与操作区',
        description: '包含返回按钮、标题、副标题与 extra 插槽。',
        vueComponent: V1.PageHeaderBasicVue,
        reactComponent: R.PageHeaderReact,
        vueCode: `<template>\n  <PageHeader title="工作区设置" subtitle="说明" />\n</template>`,
        reactCode: `import { PageHeader } from '@arco-design/web-react'\nimport { Button } from '@dsh-plugin/dsh-ui-components'\n\nexport function Demo() {\n  return <PageHeader title="工作区配置" subTitle="React PageHeader" extra={<Button size="sm">保存</Button>} />\n}`,
      },
    ],
    props: [
      { name: 'title', description: '主标题', type: 'string', defaultValue: '-' },
      { name: 'subtitle', description: '副标题', type: 'string', defaultValue: '-' },
      { name: 'showBack', description: '是否显示返回按钮', type: 'boolean', defaultValue: 'true' },
    ],
    events: [
      { name: 'back', description: '点击返回按钮触发', type: '() => void' },
    ],
  },
  {
    slug: 'pagination',
    name: 'Pagination',
    title: '分页',
    category: 'navigation',
    categoryLabel: '导航',
    description: '采用分页的形式分隔长列表，每次只加载一个页面。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'pagination-basic',
        title: '完整分页器',
        description: '支持 showTotal 总数显示与 showJumper 快速跳转。',
        vueComponent: V1.PaginationBasicVue,
        reactComponent: R.PaginationReact,
        vueCode: `<template>\n  <Pagination :total="120" v-model:current="current" show-total show-jumper />\n</template>`,
        reactCode: `import * as React from 'react'
import { Pagination } from '@dsh-plugin/dsh-ui-components'

export function Demo() {
  const [cur, setCur] = React.useState(2)
  return <Pagination total={120} current={cur} onChange={(p) => setCur(p)} showTotal showJumper />
}`,
      },
    ],
    apiSections: [
      {
        id: 'api-pagination-props',
        title: 'Pagination Props',
        kind: 'props',
        rows: [
          { name: 'total', description: '数据总数', type: 'number', required: true },
          { name: 'current', description: '当前页数（Vue 支持 v-model:current）', type: 'number', defaultValue: '1' },
          { name: 'pageSize', description: '每页条数', type: 'number', defaultValue: '10' },
          { name: 'size', description: '分页器尺寸', type: `'mini' | 'small' | 'medium' | 'large'`, defaultValue: `'medium'` },
          { name: 'showTotal', description: '是否显示总数', type: 'boolean', defaultValue: 'false' },
          { name: 'showJumper', description: '是否显示快速跳转', type: 'boolean', defaultValue: 'false' },
          { name: 'simple', description: '是否开启简洁模式', type: 'boolean', defaultValue: 'false' },
        ],
      },
      {
        id: 'api-pagination-events',
        title: 'Pagination Events',
        kind: 'events',
        rows: [
          { name: 'change / onChange', description: '页码改变时触发', type: '(current: number, pageSize: number) => void' },
          { name: 'page-size-change / onPageSizeChange', description: '每页条数改变时触发', type: '(pageSize: number, current: number) => void' },
        ],
      },
    ],
  },
  {
    slug: 'steps',
    name: 'Steps',
    title: '步骤条',
    category: 'navigation',
    categoryLabel: '导航',
    description: '引导用户按照流程完成任务的导航条。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'steps-basic',
        title: '交互式步骤条',
        description: '点击上一步 / 下一步按钮切换 current 属性。',
        vueComponent: V1.StepsBasicVue,
        reactComponent: R.StepsReact,
        vueCode: `<template>\n  <Steps :current="step"><Step title="安装依赖" /></Steps>\n</template>`,
        reactCode: `import * as React from 'react'
import { Steps, Step, Button } from '@dsh-plugin/dsh-ui-components'

export function Demo() {
  const [cur, setCur] = React.useState(2)
  return (
    <div>
      <Steps current={cur}>
        <Step title="安装依赖" description="pnpm add" />
        <Step title="配置主题" description="DshProvider" />
        <Step title="发布上线" description="GitHub Pages" />
      </Steps>
      <Button size="sm" onClick={() => setCur(Math.min(3, cur + 1))}>下一步</Button>
    </div>
  )
}`,
      },
    ],
    apiSections: [
      {
        id: 'api-steps-props',
        title: 'Steps Props',
        kind: 'props',
        rows: [
          { name: 'current', description: '当前步骤索引（从 1 开始）', type: 'number', defaultValue: '1' },
          { name: 'direction', description: '步骤条方向', type: `'horizontal' | 'vertical'`, defaultValue: `'horizontal'` },
          { name: 'type', description: '步骤条类型', type: `'default' | 'arrow' | 'dot' | 'navigation'`, defaultValue: `'default'` },
          { name: 'status', description: '当前步骤状态', type: `'wait' | 'process' | 'finish' | 'error'`, defaultValue: `'process'` },
        ],
      },
      {
        id: 'api-step-props',
        title: 'Steps.Step Props',
        kind: 'props',
        rows: [
          { name: 'title', description: '步骤标题', type: 'string | ReactNode', required: true },
          { name: 'description', description: '步骤描述信息', type: 'string | ReactNode', defaultValue: '-' },
          { name: 'status', description: '指定当前步骤状态', type: `'wait' | 'process' | 'finish' | 'error'`, defaultValue: '-' },
          { name: 'disabled', description: '是否禁用点击切换', type: 'boolean', defaultValue: 'false' },
        ],
      },
    ],
  },
  {
    slug: 'tabs',
    name: 'Tabs',
    title: '标签页',
    category: 'navigation',
    categoryLabel: '导航',
    description: '选项卡切换组件，将内容分组并在同一区域切换展示。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'tabs-basic',
        title: '标签页样式切换 (type)',
        description: '支持实时切换 line / card / rounded / capsule 四种视觉类型。',
        vueComponent: V1.TabsBasicVue,
        reactComponent: R.TabsReact,
        vueCode: `<template>\n  <Tabs default-active-key="1" :type="type"><TabPane key="1" title="Vue 3">内容</TabPane></Tabs>\n</template>`,
        reactCode: `import { Tabs, TabPane } from '@dsh-plugin/dsh-ui-components'

export function Demo() {
  return (
    <Tabs defaultActiveTab="1">
      <TabPane key="1" title="Vue 3">Vue 版 @dsh-plugin/dsh-ui-components-vue</TabPane>
      <TabPane key="2" title="React 18">React 版 @dsh-plugin/dsh-ui-components</TabPane>
    </Tabs>
  )
}`,
      },
    ],
    apiSections: [
      {
        id: 'api-tabs-props',
        title: 'Tabs Props',
        kind: 'props',
        rows: [
          { name: 'activeKey / activeTab', description: '当前激活标签的 key（Vue 支持 v-model:active-key）', type: 'string | number', defaultValue: '-' },
          { name: 'type', description: '标签页类型', type: `'line' | 'card' | 'card-gutter' | 'text' | 'rounded' | 'capsule'`, defaultValue: `'line'` },
          { name: 'position / tabPosition', description: '选项卡所在位置', type: `'left' | 'right' | 'top' | 'bottom'`, defaultValue: `'top'` },
          { name: 'size', description: '选项卡尺寸', type: `'mini' | 'small' | 'medium' | 'large'`, defaultValue: `'medium'` },
          { name: 'editable', description: '是否允许增删标签页', type: 'boolean', defaultValue: 'false' },
        ],
      },
      {
        id: 'api-tabpane-props',
        title: 'TabPane Props',
        kind: 'props',
        rows: [
          { name: 'key', description: '选项卡唯一标识', type: 'string | number', required: true },
          { name: 'title', description: '选项卡标题', type: 'string | ReactNode', required: true },
          { name: 'disabled', description: '是否禁用该选项卡', type: 'boolean', defaultValue: 'false' },
          { name: 'closable', description: '在 editable 模式下是否可关闭', type: 'boolean', defaultValue: 'true' },
        ],
      },
      {
        id: 'api-tabs-events',
        title: 'Tabs Events',
        kind: 'events',
        rows: [
          { name: 'change / onChange', description: '当前标签页改变时触发', type: '(key: string | number) => void' },
          { name: 'tab-click / onClickTab', description: '点击选项卡时触发', type: '(key: string | number) => void' },
        ],
      },
    ],
  },
  {
    slug: 'toolbar',
    name: 'Toolbar',
    title: '工具栏',
    category: 'navigation',
    categoryLabel: '导航',
    badge: 'DSH',
    description: '管理组内键盘方向键焦点移动的工具栏容器。',
    frameworks: ['vue'],
    demos: [
      {
        id: 'toolbar-basic',
        title: 'Toolbar 工具栏',
        description: '使用方向键在组内按钮间移动焦点。',
        vueComponent: V1.ToolbarBasicVue,
        vueCode: `<template>\n  <Toolbar><ToggleButton>加粗</ToggleButton><ToggleButton>斜体</ToggleButton></Toolbar>\n</template>`,
      },
    ],
    props: [
      { name: 'orientation', description: '工具栏方向', type: `'horizontal' | 'vertical'`, defaultValue: `'horizontal'` },
    ],
  },
]

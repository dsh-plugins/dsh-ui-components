import type { Component } from 'vue'
import type { ComponentType } from 'react'
import type { ApiRow } from '../components/ApiTable.vue'
import * as GeneralVue from '../demos/general-vue'
import * as GeneralReact from '../demos/general-react'
import * as LayoutVue from '../demos/layout-vue'
import * as NavigationVue from '../demos/navigation-vue'
import * as DataEntryVue from '../demos/data-entry-vue'
import * as DataDisplayVue from '../demos/data-display-vue'
import * as FeedbackVue from '../demos/feedback-vue'

export interface ComponentDemo {
  id: string
  title: string
  description: string
  vueComponent?: Component
  reactComponent?: ComponentType<any>
  vueCode: string
  reactCode?: string
}

export interface ComponentMeta {
  slug: string
  name: string
  title: string
  category: 'general' | 'layout' | 'navigation' | 'data-entry' | 'data-display' | 'feedback' | 'composites'
  categoryLabel: string
  badge?: string
  description: string
  frameworks: ('vue' | 'react')[]
  demos: ComponentDemo[]
  props?: ApiRow[]
  events?: ApiRow[]
  slots?: ApiRow[]
}

export const categories = [
  { key: 'general', label: '通用 General' },
  { key: 'layout', label: '布局 Layout' },
  { key: 'navigation', label: '导航 Navigation' },
  { key: 'data-entry', label: '数据输入 Data Entry' },
  { key: 'data-display', label: '数据展示 Data Display' },
  { key: 'feedback', label: '反馈 Feedback' },
  { key: 'composites', label: 'DSH 复合组件 Composites' },
] as const

export const allComponents: ComponentMeta[] = [
  // ==================== 通用 General ====================
  {
    slug: 'button',
    name: 'Button',
    title: '按钮',
    category: 'general',
    categoryLabel: '通用',
    badge: 'HeroUI',
    description: '支持 primary / secondary / tertiary / outline / ghost / danger / danger-soft 七种 HeroUI 风格变体与 sm / md / lg 尺寸。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'button-variants',
        title: '按钮变体',
        description: '七种语义化按钮变体，适配浅色与深色主题。',
        vueComponent: GeneralVue.ButtonVariantsVue,
        reactComponent: GeneralReact.ButtonReactDemo,
        vueCode: `<template>
  <Button variant="primary">primary</Button>
  <Button variant="secondary">secondary</Button>
  <Button variant="tertiary">tertiary</Button>
  <Button variant="outline">outline</Button>
  <Button variant="ghost">ghost</Button>
  <Button variant="danger">danger</Button>
  <Button variant="danger-soft">danger-soft</Button>
</template>`,
        reactCode: `import { Button } from '@dsh-plugin/dsh-ui-components'

export function Demo() {
  return (
    <>
      <Button variant="primary">primary</Button>
      <Button variant="secondary">secondary</Button>
      <Button variant="outline">outline</Button>
      <Button variant="danger">danger</Button>
    </>
  )
}`,
      },
      {
        id: 'button-sizes',
        title: '尺寸、状态与 CloseButton',
        description: '支持 sm / md / lg 尺寸、loading、disabled、胶囊圆角及 CloseButton 关闭按钮。',
        vueComponent: GeneralVue.ButtonSizesVue,
        vueCode: `<template>
  <Button size="sm">紧凑 sm</Button>
  <Button size="md">标准 md</Button>
  <Button size="lg">宽松 lg</Button>
  <Button loading>加载中</Button>
  <CloseButton aria-label="关闭" />
</template>`,
      },
    ],
    props: [
      { name: 'variant', description: '按钮视觉变体', type: `'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'danger' | 'danger-soft'`, defaultValue: `'primary'` },
      { name: 'size', description: '按钮尺寸', type: `'sm' | 'md' | 'lg'`, defaultValue: `'md'` },
      { name: 'radius', description: '圆角覆盖', type: `'none' | 'sm' | 'md' | 'lg' | 'full'`, defaultValue: '-' },
      { name: 'loading', description: '是否处于加载状态', type: 'boolean', defaultValue: 'false' },
      { name: 'disabled', description: '是否禁用', type: 'boolean', defaultValue: 'false' },
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
        title: '链接状态',
        description: '支持默认、成功、警告、危险与禁用状态。',
        vueComponent: GeneralVue.LinkVue,
        vueCode: `<template>
  <Link href="#">默认链接</Link>
  <Link href="#" status="success">成功链接</Link>
  <Link href="#" status="danger">危险链接</Link>
</template>`,
      },
    ],
  },
  {
    slug: 'typography',
    name: 'Typography',
    title: '排版与快捷键',
    category: 'general',
    categoryLabel: '通用',
    badge: 'DSH',
    description: '包含 TypographyTitle、TypographyParagraph、Text (TypographyText) 与 Kbd 键盘快捷键展示。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'typography-basic',
        title: '标题、段落与 Kbd',
        description: '统一的文字层级与键盘快捷键胶囊。',
        vueComponent: GeneralVue.TypographyVue,
        vueCode: `<template>
  <TypographyTitle :heading="4">HeroUI 视觉排版体系</TypographyTitle>
  <TypographyParagraph>保留 Arco 排版能力，统一字重与行高。</TypographyParagraph>
  <Text type="secondary">次要说明文本</Text>
  <Kbd>⌘</Kbd> + <Kbd>K</Kbd>
</template>`,
      },
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
        description: '支持按名称过滤常用图标，构建器自动 Tree-shaking 未使用的图标。',
        vueComponent: GeneralVue.IconsVue,
        vueCode: `<script setup lang="ts">
import { IconSearch, IconPlus } from '@dsh-plugin/dsh-ui-components-vue/icons'
</script>
<template>
  <IconSearch :size="20" />
  <IconPlus :size="20" />
</template>`,
        reactCode: `import { Search } from '@dsh-plugin/dsh-ui-components/icons/Search'`,
      },
    ],
  },

  // ==================== 布局 Layout ====================
  {
    slug: 'divider',
    name: 'Divider / Separator',
    title: '分割线',
    category: 'layout',
    categoryLabel: '布局',
    description: '区隔内容的分割线，支持水平带文本与垂直分割（导出别名 Separator）。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'divider-basic',
        title: '水平与垂直分割线',
        description: '支持插槽文本与 direction="vertical"。',
        vueComponent: LayoutVue.DividerVue,
        vueCode: `<template>
  <Divider>分割线文本</Divider>
  <Divider direction="vertical" />
</template>`,
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
        title: '基础栅格',
        description: '通过 Row 与 Col 实现灵活的页面分栏。',
        vueComponent: LayoutVue.GridVue,
        vueCode: `<template>
  <Row :gutter="[12, 12]">
    <Col :span="8">Col 8</Col>
    <Col :span="8">Col 8</Col>
    <Col :span="8">Col 8</Col>
  </Row>
</template>`,
      },
    ],
  },
  {
    slug: 'layout',
    name: 'Layout',
    title: '页面布局',
    category: 'layout',
    categoryLabel: '布局',
    description: '协助进行页面级整体布局的容器组件（Layout / LayoutHeader / LayoutSider / LayoutContent / LayoutFooter）。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'layout-basic',
        title: '经典后台布局',
        description: '顶部导航 + 侧边栏 + 主内容区组合。',
        vueComponent: LayoutVue.LayoutVue,
        vueCode: `<template>
  <Layout>
    <LayoutHeader>Header</LayoutHeader>
    <Layout>
      <LayoutSider :width="120">Sider</LayoutSider>
      <LayoutContent>Content</LayoutContent>
    </Layout>
  </Layout>
</template>`,
      },
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
        title: '基础间距',
        description: '避免组件紧贴，支持 wrap 自动折行。',
        vueComponent: LayoutVue.SpaceVue,
        vueCode: `<template>
  <Space size="medium" wrap>
    <Button>按钮一</Button>
    <Button variant="secondary">按钮二</Button>
  </Space>
</template>`,
      },
    ],
  },
  {
    slug: 'split',
    name: 'Split / ResizeBox',
    title: '面板分割与伸缩',
    category: 'layout',
    categoryLabel: '布局',
    description: 'Split 将容器分割为可拖拽调整比例的两部分；ResizeBox 支持任意方向自由拖拽缩放。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'split-basic',
        title: '可拖拽分割面板',
        description: '拖动中间分割线调整左右比例。',
        vueComponent: LayoutVue.SplitResizeVue,
        vueCode: `<template>
  <Split style="height: 140px">
    <template #first>左侧面板</template>
    <template #second>右侧面板</template>
  </Split>
</template>`,
      },
    ],
  },
  {
    slug: 'surface',
    name: 'Surface / ScrollShadow',
    title: '表面容器与滚动渐隐',
    category: 'layout',
    categoryLabel: '布局',
    badge: 'DSH',
    description: 'Surface 提供 HeroUI 语义化表面容器；ScrollShadow 根据滚动边缘状态自动显示顶部/底部渐隐提示。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'surface-scrollshadow',
        title: 'Surface 与 ScrollShadow',
        description: '结合 Arco Scrollbar 实现平滑滚动边缘提示。',
        vueComponent: LayoutVue.SurfaceScrollShadowVue,
        vueCode: `<template>
  <Surface>表面容器</Surface>
  <ScrollShadow style="height: 140px">...</ScrollShadow>
</template>`,
      },
    ],
  },

  // ==================== 导航 Navigation ====================
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
        vueComponent: NavigationVue.BreadcrumbVue,
        vueCode: `<template>
  <Breadcrumb>
    <BreadcrumbItem>首页</BreadcrumbItem>
    <BreadcrumbItem>组件库</BreadcrumbItem>
  </Breadcrumb>
</template>`,
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
        title: '基础下拉菜单',
        description: '点击或悬停触发命令菜单。',
        vueComponent: NavigationVue.DropdownVue,
        vueCode: `<template>
  <Dropdown trigger="click">
    <Button variant="outline">点击展开</Button>
    <template #content>
      <Doption>新建工作区</Doption>
      <Doption>导入配置</Doption>
    </template>
  </Dropdown>
</template>`,
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
        description: '支持水平与垂直折叠模式。',
        vueComponent: NavigationVue.MenuVue,
        vueCode: `<template>
  <Menu mode="horizontal" :default-selected-keys="['1']">
    <MenuItem key="1">概览</MenuItem>
    <MenuItem key="2">组件</MenuItem>
  </Menu>
</template>`,
      },
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
        description: '支持总数显示与快速跳转。',
        vueComponent: NavigationVue.PaginationVue,
        vueCode: `<template>
  <Pagination :total="120" v-model:current="current" show-total show-jumper />
</template>`,
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
        description: '可切换当前步骤状态。',
        vueComponent: NavigationVue.StepsVue,
        vueCode: `<template>
  <Steps :current="step">
    <Step title="安装依赖" />
    <Step title="配置主题" />
    <Step title="发布上线" />
  </Steps>
</template>`,
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
        title: '基础标签页',
        description: '支持卡片、胶囊、线框等多种样式。',
        vueComponent: NavigationVue.TabsVue,
        vueCode: `<template>
  <Tabs default-active-key="1">
    <TabPane key="1" title="Vue 3">Vue 内容</TabPane>
    <TabPane key="2" title="React 18">React 内容</TabPane>
  </Tabs>
</template>`,
      },
    ],
  },
  {
    slug: 'toolbar',
    name: 'Toolbar / PageHeader',
    title: '工具栏与页头',
    category: 'navigation',
    categoryLabel: '导航',
    badge: 'DSH',
    description: 'Toolbar 管理组内键盘焦点移动，PageHeader 提供页面顶部标题与返回操作。',
    frameworks: ['vue'],
    demos: [
      {
        id: 'toolbar-basic',
        title: 'PageHeader 与 Toolbar',
        description: '适合编辑器与工作区顶部操作栏。',
        vueComponent: NavigationVue.ToolbarVue,
        vueCode: `<template>
  <PageHeader title="工作区设置" :show-back="false" />
  <Toolbar aria-label="编辑工具栏">
    <ToggleButton>加粗</ToggleButton>
    <ToggleButton>斜体</ToggleButton>
  </Toolbar>
</template>`,
      },
    ],
  },
  {
    slug: 'affix-anchor-backtop',
    name: 'Affix / Anchor / BackTop',
    title: '固钉、锚点与回到顶部',
    category: 'navigation',
    categoryLabel: '导航',
    description: '页面滚动辅助导航组件组。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'affix-anchor',
        title: 'Anchor 锚点与 BackTop',
        description: '快速定位页面章节或返回顶部。',
        vueComponent: NavigationVue.AffixAnchorBackTopVue,
        vueCode: `<template>
  <Anchor :affix="false">
    <AnchorLink href="#demo-1" title="基础用法" />
  </Anchor>
  <BackTop />
</template>`,
      },
    ],
  },

  // ==================== 数据输入 Data Entry ====================
  {
    slug: 'input',
    name: 'Input / Textarea / InputNumber',
    title: '输入框与数字输入',
    category: 'data-entry',
    categoryLabel: '数据输入',
    description: '统一 HeroUI 字段表面、描边、焦点环、清除按钮与禁用状态；InputNumber 另有别名 NumberField。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'input-basic',
        title: '基础输入控件',
        description: '包含单行 Input、多行 Textarea 与数字 InputNumber。',
        vueComponent: DataEntryVue.InputVue,
        reactComponent: GeneralReact.InputFieldReactDemo,
        vueCode: `<template>
  <Input v-model="val" placeholder="基础输入框" allow-clear />
  <Textarea placeholder="多行文本" auto-size />
  <InputNumber v-model="num" :min="0" :max="99" />
</template>`,
        reactCode: `import { Field, Input } from '@dsh-plugin/dsh-ui-components'`,
      },
    ],
  },
  {
    slug: 'textfield-otp',
    name: 'TextField / SearchField / InputOTP / TagGroup',
    title: '补充输入字段',
    category: 'data-entry',
    categoryLabel: '数据输入',
    badge: 'DSH',
    description: 'HeroUI 风格补充字段组件：TextField 自动关联 Label 与 Description；InputOTP 支持单输入粘贴与验证码自动填充；TagGroup 支持删除后焦点恢复。',
    frameworks: ['vue'],
    demos: [
      {
        id: 'textfield-otp-demo',
        title: 'TextField、SearchField、InputOTP 与 TagGroup',
        description: '完整的辅助标签、搜索框、六位验证码与动态标签组。',
        vueComponent: DataEntryVue.TextFieldSearchOtpVue,
        vueCode: `<template>
  <TextField v-model="email" label="邮箱地址" description="用于接收通知" />
  <SearchField placeholder="搜索组件…" />
  <InputOTP v-model="otp" :length="6" />
  <TagGroup v-model="tags" />
</template>`,
      },
    ],
  },
  {
    slug: 'select',
    name: 'Select / AutoComplete / Cascader / TreeSelect',
    title: '选择器与级联',
    category: 'data-entry',
    categoryLabel: '数据输入',
    description: '下拉选择器家族，浮层容器自动跟随 DshProvider 主题与圆角。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'select-family',
        title: '下拉、自动补全、级联与树选择',
        description: '覆盖单选、搜索补全与多级数据选择。',
        vueComponent: DataEntryVue.SelectCascaderTreeVue,
        vueCode: `<template>
  <Select v-model="mode" :options="options" />
  <AutoComplete :data="['Vue', 'Vite']" />
  <Cascader :options="cascaderOptions" />
  <TreeSelect :data="treeData" />
</template>`,
      },
    ],
  },
  {
    slug: 'toggle',
    name: 'Checkbox / Radio / Switch / Slider / Rate / ToggleButton',
    title: '选择与调节控件',
    category: 'data-entry',
    categoryLabel: '数据输入',
    description: '复选框、单选框、开关（含 SwitchGroup）、滑块、评分与切换按钮组。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'toggle-controls',
        title: '常见选择与调节组件',
        description: '统一的选中强调色与键盘可达性。',
        vueComponent: DataEntryVue.ToggleControlsVue,
        vueCode: `<template>
  <CheckboxGroup :options="options" />
  <RadioGroup default-value="auto"><Radio value="auto">自动</Radio></RadioGroup>
  <Switch v-model="checked" />
  <Slider v-model="slider" />
  <Rate allow-half />
  <ToggleButtonGroup v-model="layout" :options="layoutOptions" />
</template>`,
      },
    ],
  },
  {
    slug: 'picker-upload',
    name: 'DatePicker / TimePicker / ColorPicker / Upload / Transfer',
    title: '日期、颜色、上传与穿梭框',
    category: 'data-entry',
    categoryLabel: '数据输入',
    description: '日期与时间选择器、取色器、文件上传与双列表穿梭框。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'picker-upload-demo',
        title: '选择器、上传与穿梭框',
        description: '所有弹出面板均隔离在对应 Provider 浮层容器内。',
        vueComponent: DataEntryVue.PickerUploadVue,
        vueCode: `<template>
  <DatePicker />
  <DateRangePicker />
  <TimePicker />
  <ColorPicker default-value="#165dff" />
  <Upload :auto-upload="false" multiple />
  <Transfer v-model="transferVal" :data="transferData" />
</template>`,
      },
    ],
  },
  {
    slug: 'form',
    name: 'Form / Fieldset / InputTag / Mention',
    title: '表单与提及输入',
    category: 'data-entry',
    categoryLabel: '数据输入',
    description: '保留 Arco Form 校验体系，并补充 Fieldset、Label、FieldError、InputTag 与 Mention。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'form-mention-demo',
        title: '表单、标签输入与 @ 提及',
        description: '支持垂直/水平表单布局与实时输入建议。',
        vueComponent: DataEntryVue.FormMentionInputTagVue,
        vueCode: `<template>
  <Form :model="form" layout="vertical">
    <FormItem field="name" label="项目名称"><Input v-model="form.name" /></FormItem>
  </Form>
  <InputTag placeholder="输入标签按回车" />
  <Mention :data="['Alice', 'Bob']" placeholder="输入 @ 提及" />
</template>`,
      },
    ],
  },

  // ==================== 数据展示 Data Display ====================
  {
    slug: 'avatar-badge-tag',
    name: 'Avatar / Badge / Tag / Chip',
    title: '头像、徽标与标签',
    category: 'data-display',
    categoryLabel: '数据展示',
    description: '用于展示用户头像、状态角标与分类胶囊标签（Tag 另有别名 Chip / Pill）。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'avatar-badge-tag-demo',
        title: '头像、徽标与标签组合',
        description: '支持多种语义色彩与尺寸。',
        vueComponent: DataDisplayVue.AvatarBadgeTagVue,
        reactComponent: GeneralReact.CardTagReactDemo,
        vueCode: `<template>
  <Badge :count="9"><Avatar :size="40">DS</Avatar></Badge>
  <Tag color="blue">Arco Design</Tag>
  <Chip color="purple">HeroUI Chip</Chip>
</template>`,
      },
    ],
  },
  {
    slug: 'card-collapse',
    name: 'Card / Collapse / Accordion',
    title: '卡片与折叠面板',
    category: 'data-display',
    categoryLabel: '数据展示',
    description: 'HeroUI 三级表面与柔和阴影；Collapse 另有别名 Accordion / DisclosureGroup。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'card-collapse-demo',
        title: 'Card 与 Accordion',
        description: '清晰的表面层次与手风琴展开效果。',
        vueComponent: DataDisplayVue.CardCollapseVue,
        vueCode: `<template>
  <Card title="工作区概览" extra="v0.1.0">内容</Card>
  <Accordion :default-active-key="['1']">
    <AccordionItem key="1" header="标题">内容</AccordionItem>
  </Accordion>
</template>`,
      },
    ],
  },
  {
    slug: 'table-list',
    name: 'Table / List / ListBox',
    title: '表格与列表',
    category: 'data-display',
    categoryLabel: '数据展示',
    description: 'Arco Table 与 List，以及 HeroUI 风格的键盘可达 ListBox 选择列表。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'table-list-demo',
        title: 'Table 与 ListBox',
        description: '支持表头描边、行悬停与键盘上下键选择。',
        vueComponent: DataDisplayVue.TableListVue,
        vueCode: `<template>
  <Table :columns="columns" :data="data" :pagination="false" />
  <ListBox v-model="selected" :options="options" />
</template>`,
      },
    ],
  },
  {
    slug: 'descriptions-statistic',
    name: 'Descriptions / Statistic / Timeline',
    title: '描述列表、统计与时间线',
    category: 'data-display',
    categoryLabel: '数据展示',
    description: '结构化展示键值对信息、核心指标数值与时间轴事件。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'descriptions-stat-timeline',
        title: '信息展示组合',
        description: '统一的正文与弱化文字对比度。',
        vueComponent: DataDisplayVue.DescriptionsStatisticTimelineVue,
        vueCode: `<template>
  <Descriptions title="组件库信息" :column="2" :data="data" />
  <Statistic title="覆盖组件数" :value="70" suffix="+" />
  <Timeline><TimelineItem label="2026-11-18">文档上线</TimelineItem></Timeline>
</template>`,
      },
    ],
  },
  {
    slug: 'tooltip-popover-tree',
    name: 'Tooltip / Popover / Tree',
    title: '气泡提示与树形控件',
    category: 'data-display',
    categoryLabel: '数据展示',
    description: '文字提示、气泡卡片（React 另有 HoverCard）与支持勾选的树形结构。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'tooltip-popover-tree-demo',
        title: 'Tooltip、Popover 与 Tree',
        description: '浮层自动匹配当前暗黑/浅色主题。',
        vueComponent: DataDisplayVue.TooltipPopoverTreeVue,
        vueCode: `<template>
  <Tooltip content="文字提示"><Button variant="outline">悬停</Button></Tooltip>
  <Popover title="标题" content="内容"><Button>点击</Button></Popover>
  <Tree :data="treeData" default-expand-all checkable />
</template>`,
      },
    ],
  },
  {
    slug: 'display-misc',
    name: 'Empty / Comment / Watermark / Carousel / Calendar / Image / OverflowList',
    title: '媒体与其他展示组件',
    category: 'data-display',
    categoryLabel: '数据展示',
    description: '覆盖空状态、评论、水印、轮播、日历、图片预览与溢出折叠列表。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'display-misc-1',
        title: 'Empty、Comment、Watermark 与 Carousel',
        description: '保留 Arco 全部展示能力并统一表面圆角。',
        vueComponent: DataDisplayVue.MediaMiscDisplayVue,
        vueCode: `<template>
  <Empty description="暂无数据" />
  <Comment author="DSH Team" content="评论内容" />
  <Watermark content="DSH UI">...</Watermark>
  <Carousel>...</Carousel>
</template>`,
      },
      {
        id: 'display-misc-2',
        title: 'OverflowList 与 Calendar',
        description: '自动折叠溢出标签与完整日历面板。',
        vueComponent: DataDisplayVue.CalendarImageOverflowVue,
        vueCode: `<template>
  <OverflowList><Tag>Vue 3</Tag><Tag>React 18</Tag></OverflowList>
  <Calendar />
</template>`,
      },
    ],
  },

  // ==================== 反馈 Feedback ====================
  {
    slug: 'alert',
    name: 'Alert',
    title: '警告提示',
    category: 'feedback',
    categoryLabel: '反馈',
    description: '向用户显示重要的静态状态提示（info / success / warning / error）。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'alert-basic',
        title: '四种语义状态',
        description: '支持标题、描述与关闭按钮。',
        vueComponent: FeedbackVue.AlertVue,
        reactComponent: GeneralReact.AlertReactDemo,
        vueCode: `<template>
  <Alert type="info" title="信息提示">标准提示</Alert>
  <Alert type="success" title="操作成功">已保存</Alert>
</template>`,
        reactCode: `import { Alert } from '@dsh-plugin/dsh-ui-components'`,
      },
    ],
  },
  {
    slug: 'progress',
    name: 'Progress / ProgressBar / ProgressCircle / Meter',
    title: '进度与仪表',
    category: 'feedback',
    categoryLabel: '反馈',
    badge: 'HeroUI',
    description: '同时提供 Arco Progress（0~1）以及 HeroUI 风格的 ProgressBar、ProgressCircle 与 Meter。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'progress-basic',
        title: '进度条、环形进度与 Meter',
        description: '统一进度语义色与减少动画支持。',
        vueComponent: FeedbackVue.ProgressMeterVue,
        vueCode: `<template>
  <Progress :percent="0.72" />
  <ProgressBar :value="65" label="任务进度" />
  <ProgressCircle :value="78" />
  <Meter :value="82" label="CPU 占用" />
</template>`,
      },
    ],
  },
  {
    slug: 'spin-skeleton-result',
    name: 'Spin / Spinner / Skeleton / Result',
    title: '加载、骨架屏与结果页',
    category: 'feedback',
    categoryLabel: '反馈',
    description: '覆盖加载指示器、骨架屏占位与操作结果反馈页。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'spin-skeleton-result-demo',
        title: '加载状态与结果页',
        description: 'Spinner 额外提供无障碍 status 语义标签。',
        vueComponent: FeedbackVue.SpinSkeletonResultVue,
        vueCode: `<template>
  <Spin />
  <Spinner label="加载中" />
  <Skeleton animation><SkeletonLine :rows="2" /></Skeleton>
  <Result status="success" title="构建完成" />
</template>`,
      },
    ],
  },
  {
    slug: 'modal-drawer-toast',
    name: 'Modal / Drawer / Popconfirm / Message / Notification / useToast',
    title: '浮层弹窗与全局提示',
    category: 'feedback',
    categoryLabel: '反馈',
    badge: 'Provider',
    description: 'Modal 与 Drawer 在 DshProvider 内拥有独立 body 浮层容器，自动同步主题、圆角与 Escape/焦点恢复；useToast() 与 useDialog() 提供作用域命令式调用。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'modal-drawer-toast-demo',
        title: 'Modal、Drawer、Popconfirm 与 useToast',
        description: '点击按钮实时体验作用域浮层与 Toast 提示。',
        vueComponent: FeedbackVue.ModalDrawerPopconfirmVue,
        vueCode: `<script setup lang="ts">
import { useToast } from '@dsh-plugin/dsh-ui-components-vue'
const toast = useToast()
</script>
<template>
  <Button @click="modalOpen = true">打开 Modal</Button>
  <Button @click="toast.success('成功提示')">触发 Toast</Button>
  <Modal v-model:visible="modalOpen" title="对话框">内容</Modal>
</template>`,
      },
    ],
  },

  // ==================== DSH 复合组件 Composites ====================
  {
    slug: 'composites',
    name: 'PanelShell / SettingsCard / MenuSelect / CodeBlockShell / JsonTree',
    title: 'DSH 专属复合组件',
    category: 'composites',
    categoryLabel: 'DSH 复合组件',
    badge: 'React',
    description: '面向 DSH 插件场景的高阶组合组件：PanelShell、SettingsCard、SettingsRow、MenuSelect、CodeBlockShell、JsonTree、FileTypeBadge 与 StatusLine。',
    frameworks: ['react'],
    demos: [
      {
        id: 'composites-react-demo',
        title: '插件设置面板与数据展示组合',
        description: '实时渲染 @dsh-plugin/dsh-ui-components 中的 React 复合组件。',
        reactComponent: GeneralReact.CompositesReactDemo,
        vueCode: `<!-- 复合组件目前主要提供于 React 版 @dsh-plugin/dsh-ui-components，请切换顶部框架至 React 查看实时预览。 -->`,
        reactCode: `import {
  PanelShell,
  SettingsCard,
  SettingsRow,
  MenuSelect,
  CodeBlockShell,
  JsonTree,
  FileTypeBadge,
  StatusLine,
} from '@dsh-plugin/dsh-ui-components'`,
      },
    ],
  },
]

export function getComponentBySlug(slug: string): ComponentMeta | undefined {
  return allComponents.find((c) => c.slug === slug)
}

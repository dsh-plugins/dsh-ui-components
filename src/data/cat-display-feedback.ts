import type { ComponentMeta } from './types'
import * as V3 from '../demos/vue-demos-3'
import * as R from '../demos/react-demos'

export const displayFeedbackComponents: ComponentMeta[] = [
  // ==================== 数据展示 Data Display ====================
  {
    slug: 'avatar',
    name: 'Avatar',
    title: '头像',
    category: 'data-display',
    categoryLabel: '数据展示',
    description: '用来代表用户或事物，支持图片、图标或字符展示（含 AvatarGroup）。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'avatar-basic',
        title: '尺寸、形状与头像组',
        description: '展示 size、shape (circle/square) 与 AvatarGroup 重叠排列。',
        vueComponent: V3.AvatarBasicVue,
        reactComponent: R.AvatarReact,
        vueCode: `<template>\n  <Avatar :size="40">DS</Avatar>\n  <Avatar :size="48" shape="square">UI</Avatar>\n  <AvatarGroup><Avatar>A</Avatar><Avatar>B</Avatar></AvatarGroup>\n</template>`,
        reactCode: `import { Avatar } from '@dsh-plugin/dsh-ui-components'\n\nexport function Demo() {\n  return (\n    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>\n      <Avatar size={32}>S</Avatar>\n      <Avatar size={40}>DS</Avatar>\n      <Avatar size={48} shape="square">UI</Avatar>\n    </div>\n  )\n}`,
      },
    ],
    props: [
      { name: 'size', description: '头像尺寸（px）', type: 'number', defaultValue: '40' },
      { name: 'shape', description: '头像形状', type: `'circle' | 'square'`, defaultValue: `'circle'` },
      { name: 'autoFixFontSize', description: '是否自动根据头像大小调整文字尺寸', type: 'boolean', defaultValue: 'true' },
    ],
  },
  {
    slug: 'badge',
    name: 'Badge',
    title: '徽标数',
    category: 'data-display',
    categoryLabel: '数据展示',
    description: '图标或头像右上角的圆形徽标数字或状态点。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'badge-basic',
        title: '数字徽标、封顶与状态点',
        description: '展示 count、maxCount 与 dot 状态点效果。',
        vueComponent: V3.BadgeBasicVue,
        reactComponent: R.BadgeTagReact,
        vueCode: `<template>\n  <Badge :count="9"><Avatar>DS</Avatar></Badge>\n  <Badge :count="108" :max-count="99"><Button>消息</Button></Badge>\n  <Badge dot status="processing"><Button>状态点</Button></Badge>\n</template>`,
        reactCode: `import { Badge, Avatar } from '@dsh-plugin/dsh-ui-components'\n\nexport function Demo() {\n  return (\n    <Badge count={9}>\n      <Avatar shape="square">DS</Avatar>\n    </Badge>\n  )\n}`,
      },
    ],
    props: [
      { name: 'count', description: '显示的数字', type: 'number', defaultValue: '0' },
      { name: 'maxCount', description: '封顶展示数字', type: 'number', defaultValue: '99' },
      { name: 'dot', description: '是否仅显示小红点', type: 'boolean', defaultValue: 'false' },
      { name: 'status', description: '状态点颜色', type: `'normal' | 'processing' | 'success' | 'warning' | 'danger'`, defaultValue: '-' },
    ],
  },
  {
    slug: 'calendar',
    name: 'Calendar',
    title: '日历',
    category: 'data-display',
    categoryLabel: '数据展示',
    description: '按照日历形式展示数据的容器。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'calendar-basic',
        title: '日历面板',
        description: '支持月/年视图切换。',
        vueComponent: V3.CalendarBasicVue,
        reactComponent: R.CalendarReact,
        vueCode: `<template>\n  <Calendar />\n</template>`,
        reactCode: `import { Calendar } from '@dsh-plugin/dsh-ui-components'\n\nexport function Demo() {\n  return <Calendar panel />\n}`,
      },
    ],
    props: [
      { name: 'modelValue', description: '当前选中日期', type: 'Date', defaultValue: '-' },
      { name: 'mode', description: '视图模式', type: `'month' | 'year'`, defaultValue: `'month'` },
    ],
  },
  {
    slug: 'card',
    name: 'Card',
    title: '卡片',
    category: 'data-display',
    categoryLabel: '数据展示',
    description: '通用卡片容器，采用 HeroUI 三级表面与柔和阴影。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'card-basic',
        title: '悬停卡片与紧凑卡片',
        description: '对照默认卡片和带细边框、紧凑内边距的 flat 卡片。',
        vueComponent: V3.CardBasicVue,
        reactComponent: R.CardReact,
        vueCode: `<template>\n  <Card title="标准卡片" hoverable>悬停查看阴影。</Card>\n  <Card title="紧凑卡片" variant="flat" tight>适合紧凑列表。</Card>\n</template>`,
        reactCode: `import { Card } from '@dsh-plugin/dsh-ui-components'\n\nexport function Demo() {\n  return <Card title="紧凑卡片" variant="flat" tight>适合紧凑列表。</Card>\n}`,
      },
    ],
    apiSections: [
      {
        id: 'api-card-props',
        title: 'Card Props',
        kind: 'props',
        rows: [
          { name: 'title', description: '卡片标题', type: 'string | ReactNode', defaultValue: '-' },
          { name: 'extra', description: '卡片右上角操作区', type: 'string | ReactNode', defaultValue: '-' },
          { name: 'hoverable', description: '是否可悬浮高亮', type: 'boolean', defaultValue: 'false' },
          { name: 'variant', description: 'elevated 使用表面阴影，flat 使用细边框，glass 使用半透明模糊背景', type: "'glass' | 'elevated' | 'flat'", defaultValue: '-' },
          { name: 'tight', description: '将内边距收紧为上下 12px、左右 16px', type: 'boolean', defaultValue: 'false' },
          { name: 'glassOpacity', description: '玻璃背景不透明度，范围为 0 到 1', type: 'number', defaultValue: '-' },
          { name: 'bordered', description: '是否显示边框', type: 'boolean', defaultValue: 'true' },
          { name: 'loading', description: '是否为加载中状态', type: 'boolean', defaultValue: 'false' },
          { name: 'size', description: '卡片尺寸', type: `'default' | 'small'`, defaultValue: `'default'` },
        ],
      },
      {
        id: 'api-card-slots',
        title: 'Card Slots',
        kind: 'slots',
        framework: 'vue',
        rows: [
          { name: 'default', description: '卡片主体内容', type: '-' },
          { name: 'title', description: '自定义标题', type: '-' },
          { name: 'extra', description: '自定义右上角操作区', type: '-' },
          { name: 'actions', description: '卡片底部操作按钮区', type: '-' },
        ],
      },
    ],
  },
  {
    slug: 'carousel',
    name: 'Carousel',
    title: '图片轮播',
    category: 'data-display',
    categoryLabel: '数据展示',
    description: '旋转木马轮播组件，支持指示器与自动切换。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'carousel-basic',
        title: '基础轮播',
        description: '支持箭头与指示器切换。',
        vueComponent: V3.CarouselBasicVue,
        reactComponent: R.CarouselReact,
        vueCode: `<template>\n  <Carousel show-arrow="always"><CarouselItem>Slide 1</CarouselItem></Carousel>\n</template>`,
        reactCode: `import { Carousel } from '@dsh-plugin/dsh-ui-components'\n\nexport function Demo() {\n  return (\n    <Carousel style={{ width: '100%', height: 140 }}>\n      <div>Slide 1</div>\n      <div>Slide 2</div>\n    </Carousel>\n  )\n}`,
      },
    ],
    props: [
      { name: 'autoPlay', description: '是否自动切换', type: 'boolean | { interval: number }', defaultValue: 'false' },
      { name: 'showArrow', description: '切换箭头显示时机', type: `'always' | 'hover' | 'never'`, defaultValue: `'always'` },
      { name: 'indicatorType', description: '指示器类型', type: `'dot' | 'line' | 'slider' | 'never'`, defaultValue: `'dot'` },
    ],
  },
  {
    slug: 'collapse',
    name: 'Collapse / Accordion',
    title: '折叠面板',
    category: 'data-display',
    categoryLabel: '数据展示',
    description: '可以折叠/展开的内容区域（别名 Accordion / DisclosureGroup）。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'collapse-basic',
        title: '手风琴折叠面板',
        description: '默认手风琴模式仅展开一项。',
        vueComponent: V3.CollapseBasicVue,
        reactComponent: R.CollapseReact,
        vueCode: `<template>\n  <Accordion :default-active-key="['1']"><AccordionItem key="1" header="标题">内容</AccordionItem></Accordion>\n</template>`,
        reactCode: `import { Collapse, CollapseItem } from '@dsh-plugin/dsh-ui-components'

export function Demo() {
  return (
    <Collapse defaultActiveKey={['1']}>
      <CollapseItem name="1" header="React Collapse 面板 1">内容区域 1</CollapseItem>
      <CollapseItem name="2" header="React Collapse 面板 2">内容区域 2</CollapseItem>
    </Collapse>
  )
}`,
      },
    ],
    apiSections: [
      {
        id: 'api-collapse-props',
        title: 'Collapse Props',
        kind: 'props',
        rows: [
          { name: 'activeKey', description: '当前展开面板 key 数组', type: 'Array<string | number>', defaultValue: '-' },
          { name: 'accordion', description: '是否开启手风琴模式', type: 'boolean', defaultValue: 'false' },
          { name: 'bordered', description: '是否显示外边框', type: 'boolean', defaultValue: 'true' },
          { name: 'expandIconPosition', description: '展开图标位置', type: `'left' | 'right'`, defaultValue: `'left'` },
        ],
      },
      {
        id: 'api-collapse-item-props',
        title: 'CollapseItem Props',
        kind: 'props',
        rows: [
          { name: 'name / key', description: '面板唯一标识', type: 'string | number', required: true },
          { name: 'header', description: '面板头内容', type: 'string | ReactNode', defaultValue: '-' },
          { name: 'disabled', description: '是否禁用该面板', type: 'boolean', defaultValue: 'false' },
        ],
      },
    ],
  },
  {
    slug: 'comment',
    name: 'Comment',
    title: '评论',
    category: 'data-display',
    categoryLabel: '数据展示',
    description: '对网站内容的反馈、评价和讨论展示。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'comment-basic',
        title: '基础评论',
        description: '包含作者、时间、正文与操作区。',
        reactComponent: R.CommentBasicReact,
        reactCode: `import * as DSH from '@dsh-plugin/dsh-ui-components'

function Demo() {
  return <DSH.Comment author="DSH Design Team" datetime="1 分钟前" content="文档站点支持 Vue 与 React 示例。" />
}`,
        vueComponent: V3.CommentBasicVue,
        vueCode: `<template>\n  <Comment author="DSH Design Team" datetime="1 分钟前" content="评论内容" />\n</template>`,
      },
    ],
    props: [
      { name: 'author', description: '作者名称', type: 'string', defaultValue: '-' },
      { name: 'datetime', description: '发布时间', type: 'string', defaultValue: '-' },
      { name: 'content', description: '评论正文', type: 'string', defaultValue: '-' },
    ],
  },
  {
    slug: 'descriptions',
    name: 'Descriptions',
    title: '描述列表',
    category: 'data-display',
    categoryLabel: '数据展示',
    description: '成组展示多个只读字段。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'descriptions-basic',
        title: '带边框的描述列表',
        description: '展示 bordered 与 column 分列效果。',
        vueComponent: V3.DescriptionsBasicVue,
        reactComponent: R.DescriptionsReact,
        vueCode: `<template>\n  <Descriptions title="包信息" :column="2" bordered :data="data" />\n</template>`,
        reactCode: `import { Descriptions } from '@dsh-plugin/dsh-ui-components'\n\nexport function Demo() {\n  return <Descriptions title="包信息" column={2} data={[\n    { label: '包名', value: '@dsh-plugin/dsh-ui-components' },\n    { label: '基线', value: '@arco-design/web-react' },\n  ]} />\n}`,
      },
    ],
    props: [
      { name: 'data', description: '描述项数据数组', type: 'Array<{ label: string; value: string }>', defaultValue: '[]' },
      { name: 'column', description: '每行显示的数据列数', type: 'number', defaultValue: '3' },
      { name: 'bordered', description: '是否显示边框', type: 'boolean', defaultValue: 'false' },
    ],
  },
  {
    slug: 'empty',
    name: 'Empty',
    title: '空状态',
    category: 'data-display',
    categoryLabel: '数据展示',
    description: '空状态时的占位提示（别名 EmptyState）。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'empty-basic',
        title: '空状态占位',
        description: '支持自定义图标与描述文案。',
        vueComponent: V3.EmptyBasicVue,
        reactComponent: R.EmptyReact,
        vueCode: `<template>\n  <Empty description="暂无匹配的数据记录" />\n</template>`,
        reactCode: `import { Empty } from '@dsh-plugin/dsh-ui-components'\n\nexport function Demo() {\n  return <Empty description="暂无匹配数据" />\n}`,
      },
    ],
    props: [
      { name: 'description', description: '自定义描述文字', type: 'string', defaultValue: `'暂无数据'` },
    ],
  },
  {
    slug: 'image',
    name: 'Image',
    title: '图片',
    category: 'data-display',
    categoryLabel: '数据展示',
    description: '可预览、支持加载占位与多图分组预览的图片组件。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'image-basic',
        title: '图片与点击放大预览',
        description: '点击图片弹出大图预览器。',
        vueComponent: V3.ImageBasicVue,
        reactComponent: R.ImageReact,
        vueCode: `<template>\n  <Image :width="220" :height="140" src="..." title="预览" />\n</template>`,
        reactCode: `import { Image } from '@dsh-plugin/dsh-ui-components'\n\nexport function Demo() {\n  return <Image width={160} src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp" alt="示例图片" />\n}`,
      },
    ],
    props: [
      { name: 'src', description: '图片地址', type: 'string', defaultValue: '-' },
      { name: 'width / height', description: '图片宽高', type: 'number | string', defaultValue: '-' },
      { name: 'preview', description: '是否开启点击预览', type: 'boolean', defaultValue: 'true' },
      { name: 'previewProps', description: '预览默认挂载到 DshProvider 容器。React 可用 getPopupContainer 自定义挂载点，Vue 可用 popupContainer。', type: 'ImagePreviewProps', defaultValue: '-' },
    ],
  },
  {
    slug: 'list',
    name: 'List / ListBox',
    title: '列表与选择列表',
    category: 'data-display',
    categoryLabel: '数据展示',
    badge: 'DSH',
    description: '标准数据列表 List 与支持键盘上下键导航、单选/多选的 ListBox。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'listbox-basic',
        title: 'ListBox 选择列表',
        description: '支持描述文本、禁用项与键盘方向键导航。',
        vueComponent: V3.ListBoxBasicVue,
        reactComponent: R.ListReact,
        vueCode: `<template>\n  <ListBox v-model="selected" :options="options" />\n</template>`,
        reactCode: `import { List, ListItem } from '@dsh-plugin/dsh-ui-components'\n\nexport function Demo() {\n  return (\n    <List\n      size="small"\n      header="最近更新"\n      dataSource={['Button 按钮', 'Input 输入框', 'Table 表格']}\n      render={(item, index) => <ListItem key={index}>{item}</ListItem>}\n    />\n  )\n}`,
      },
    ],
    props: [
      { name: 'modelValue', description: '当前选中项（单选为标量，多选为数组）', type: 'string | number | Array', defaultValue: '-' },
      { name: 'options', description: '列表选项数组', type: 'Array<{ value, label, description?, disabled? }>', defaultValue: '[]' },
      { name: 'multiple', description: '是否支持多选', type: 'boolean', defaultValue: 'false' },
    ],
  },
  {
    slug: 'overflow-list',
    name: 'OverflowList',
    title: '折叠列表',
    category: 'data-display',
    categoryLabel: '数据展示',
    description: '当容器宽度不足时自动将溢出项折叠为计数器。',
    frameworks: ['vue'],
    demos: [
      {
        id: 'overflowlist-basic',
        title: '自动折叠溢出标签',
        description: '在窄容器中自动收起多余元素并显示 +N。',
        vueComponent: V3.OverflowListBasicVue,
        vueCode: `<template>\n  <OverflowList><Tag>Vue 3</Tag><Tag>React 18</Tag></OverflowList>\n</template>`,
      },
    ],
    props: [
      { name: 'min', description: '最少保留展示的元素数量', type: 'number', defaultValue: '0' },
      { name: 'margin', description: '子元素间距（px）', type: 'number', defaultValue: '8' },
    ],
  },
  {
    slug: 'popover',
    name: 'Popover',
    title: '气泡卡片',
    category: 'data-display',
    categoryLabel: '数据展示',
    description: '点击或悬停元素弹出丰富的气泡卡片（React 另有 HoverCard）。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'popover-basic',
        title: '点击与悬停触发',
        description: '点击打开 Popover。React 的 HoverCard 也可将焦点移到按钮上打开。',
        vueComponent: V3.PopoverBasicVue,
        reactComponent: R.PopoverReact,
        vueCode: `<template>\n  <Popover title="标题" content="内容" trigger="click"><Button>点击</Button></Popover>\n</template>`,
        reactCode: `import { HoverCard, Popover } from '@dsh-plugin/dsh-ui-components'\n\nexport function Demo() {\n  return (\n    <>\n      <Popover title="Popover" content="气泡卡片内容" trigger="click">\n        <button type="button">点击 Popover</button>\n      </Popover>\n      <HoverCard content="组件详情">\n        <button type="button">悬停或聚焦查看详情</button>\n      </HoverCard>\n    </>\n  )\n}`,
      },
    ],
    props: [
      { name: 'title', description: '气泡标题', type: 'string', defaultValue: '-' },
      { name: 'content', description: '气泡内容', type: 'string', defaultValue: '-' },
      { name: 'trigger', description: '触发方式', type: `'hover' | 'click' | 'focus'`, defaultValue: `'hover'` },
      { name: 'position', description: '弹出位置', type: `'top' | 'bottom' | 'left' | 'right'`, defaultValue: `'top'` },
    ],
  },
  {
    slug: 'statistic',
    name: 'Statistic',
    title: '数值显示',
    category: 'data-display',
    categoryLabel: '数据展示',
    description: '展示统计数值、精度与前后缀。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'statistic-basic',
        title: '指标数值与后缀',
        description: '支持 precision 精度与 suffix 后缀。',
        vueComponent: V3.StatisticBasicVue,
        reactComponent: R.StatisticReact,
        vueCode: `<template>\n  <Statistic title="组件总数" :value="50" suffix="+" />\n</template>`,
        reactCode: `import { Statistic } from '@dsh-plugin/dsh-ui-components'\n\nexport function Demo() {\n  return <Statistic title="组件总数" value={80} />\n}`,
      },
    ],
    props: [
      { name: 'title', description: '数值标题', type: 'string', defaultValue: '-' },
      { name: 'value', description: '数值内容', type: 'number | Date', defaultValue: '-' },
      { name: 'precision', description: '小数精度', type: 'number', defaultValue: '-' },
      { name: 'suffix', description: '后缀文本', type: 'string', defaultValue: '-' },
    ],
  },
  {
    slug: 'table',
    name: 'Table',
    title: '表格',
    category: 'data-display',
    categoryLabel: '数据展示',
    description: '展示行列数据，支持排序、筛选、分页与固定列。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'table-basic',
        title: '基础数据表格',
        description: '统一表头、描边与行悬停背景。',
        vueComponent: V3.TableBasicVue,
        reactComponent: R.TableReact,
        vueCode: `<template>\n  <Table :columns="columns" :data="data" :pagination="false" />\n</template>`,
        reactCode: `import { Table } from '@dsh-plugin/dsh-ui-components'

export function Demo() {
  return (
    <Table
      pagination={false}
      columns={[
        { title: '组件', dataIndex: 'name' },
        { title: '分类', dataIndex: 'category' },
      ]}
      data={[
        { key: '1', name: 'Button', category: '通用' },
        { key: '2', name: 'PanelShell', category: 'DSH 复合组件' },
      ]}
    />
  )
}`,
      },
    ],
    apiSections: [
      {
        id: 'api-table-props',
        title: 'Table Props',
        kind: 'props',
        rows: [
          { name: 'columns', description: '表格列配置。Vue 也可在 columns 插槽中使用 Table.Column 声明列。', type: 'TableColumnData[]', defaultValue: '-' },
          { name: 'data', description: '表格数据源', type: 'TableData[]', defaultValue: '[]' },
          { name: 'pagination', description: '分页器配置或设为 false 禁用', type: 'boolean | PaginationProps', defaultValue: 'true' },
          { name: 'bordered', description: '是否显示边框', type: 'boolean | { wrapper?: boolean; cell?: boolean }', defaultValue: 'true' },
          { name: 'stripe', description: '是否开启斑马纹', type: 'boolean', defaultValue: 'false' },
          { name: 'loading', description: '表格是否加载中', type: 'boolean | SpinProps', defaultValue: 'false' },
          { name: 'loadingStyle', description: '加载时只模糊数据区域', type: `'blur'`, defaultValue: '-' },
          { name: 'contentSized', description: '按内容定宽并保持单行，可与固定列一起使用', type: 'boolean', defaultValue: 'false' },
          { name: 'rowSelection', description: '行选择器配置', type: 'TableRowSelection', defaultValue: '-' },
        ],
      },
      {
        id: 'api-table-column-props',
        title: 'TableColumn Props',
        kind: 'props',
        rows: [
          { name: 'title', description: '列头显示文字', type: 'string | ReactNode', required: true },
          { name: 'dataIndex', description: '列数据在数据项中对应的路径', type: 'string', required: true },
          { name: 'width', description: '列宽度', type: 'number | string', defaultValue: '-' },
          { name: 'align', description: '对齐方式', type: `'left' | 'center' | 'right'`, defaultValue: `'left'` },
          { name: 'fixed', description: '固定列位置', type: `'left' | 'right'`, defaultValue: '-' },
          { name: 'sorter', description: '排序函数或配置', type: 'boolean | SorterFn', defaultValue: '-' },
        ],
      },
      {
        id: 'api-table-events',
        title: 'Table Events',
        kind: 'events',
        rows: [
          { name: 'change / onChange', description: '分页、排序、筛选变化时触发', type: '(pagination, sorter, filters) => void' },
          { name: 'row-click', description: '点击行时触发', type: '(record, ev) => void' },
        ],
      },
    ],
  },
  {
    slug: 'tag',
    name: 'Tag / Chip / Pill',
    title: '标签',
    category: 'data-display',
    categoryLabel: '数据展示',
    description: '进行标记和分类的小标签（Vue 导出别名 Chip；React 导出 Pill 与 Tag）。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'tag-basic',
        title: '预设色彩与可关闭标签',
        description: '对照三档尺寸和可关闭标签。',
        vueComponent: V3.TagBasicVue,
        reactComponent: R.TagReact,
        vueCode: `<template>\n  <Tag color="blue" size="small">小号</Tag>\n  <Tag color="green">默认</Tag>\n  <Chip color="orange" size="large" closable>可关闭</Chip>\n</template>`,
        reactCode: `import { Tag } from '@dsh-plugin/dsh-ui-components'\n\nexport function Demo() {\n  return <><Tag tone="info" size="sm">小号</Tag><Tag tone="success">默认</Tag><Tag tone="warning" size="lg" closable>可关闭</Tag></>\n}`,
      },
    ],
    props: [
      { name: 'size', description: '小、中、大三档对应的普通标签高度为 20、24、28px', type: 'Vue: small | medium | large；React: sm | md | lg', defaultValue: 'Vue: medium；React: md' },
      { name: 'color', description: '标签预设色或自定义色值（Vue）', type: 'string', defaultValue: '-' },
      { name: 'tone', description: '语义色调（React）', type: `'neutral' | 'info' | 'success' | 'warning' | 'danger'`, defaultValue: `'neutral'` },
      { name: 'closable', description: '是否可关闭', type: 'boolean', defaultValue: 'false' },
    ],
  },
  {
    slug: 'timeline',
    name: 'Timeline',
    title: '时间轴',
    category: 'data-display',
    categoryLabel: '数据展示',
    description: '垂直展示的时间流信息。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'timeline-basic',
        title: '基础时间轴',
        description: '按时间顺序记录关键里程碑。',
        vueComponent: V3.TimelineBasicVue,
        reactComponent: R.TimelineReact,
        vueCode: `<template>\n  <Timeline><TimelineItem label="2026-11-18">文档上线</TimelineItem></Timeline>\n</template>`,
        reactCode: `import { Timeline, TimelineItem } from '@dsh-plugin/dsh-ui-components'\n\nexport function Demo() {\n  return (\n    <Timeline>\n      <TimelineItem label="2026-01">初始化 DSH Token</TimelineItem>\n      <TimelineItem label="2026-11">上线双栈文档站点</TimelineItem>\n    </Timeline>\n  )\n}`,
      },
    ],
    props: [
      { name: 'direction', description: '时间轴方向', type: `'horizontal' | 'vertical'`, defaultValue: `'vertical'` },
      { name: 'reverse', description: '是否倒序排列', type: 'boolean', defaultValue: 'false' },
    ],
  },
  {
    slug: 'tooltip',
    name: 'Tooltip',
    title: '文字提示',
    category: 'data-display',
    categoryLabel: '数据展示',
    description: '简单的文字提示气泡框，支持多方向定位。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'tooltip-basic',
        title: '方位展示 (position)',
        description: '展示 top / right / bottom 弹出方位效果。',
        vueComponent: V3.TooltipBasicVue,
        reactComponent: R.TooltipReact,
        vueCode: `<template>\n  <Tooltip content="上方提示" position="top"><Button>Top</Button></Tooltip>\n</template>`,
        reactCode: `import { Tooltip } from '@dsh-plugin/dsh-ui-components'\n\nexport function Demo() {\n  return (\n    <Tooltip content="Tooltip 提示" trigger={['hover', 'focus']}>\n      <button type="button">查看提示</button>\n    </Tooltip>\n  )\n}`,
      },
    ],
    props: [
      { name: 'content', description: '提示文案', type: 'string', defaultValue: '-' },
      { name: 'position', description: '弹出方位', type: `'top' | 'tl' | 'tr' | 'bottom' | 'bl' | 'br' | 'left' | 'right'`, defaultValue: `'bottom'` },
      { name: 'mini', description: '是否使用紧凑样式', type: 'boolean', defaultValue: 'false' },
    ],
  },
  {
    slug: 'tree',
    name: 'Tree',
    title: '树形控件',
    category: 'data-display',
    categoryLabel: '数据展示',
    description: '完整展示多层级树形结构，支持勾选、展开与拖拽。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'tree-basic',
        title: '可勾选树形结构',
        description: '展示 defaultExpandAll 与 checkable 复选框联动。',
        vueComponent: V3.TreeBasicVue,
        reactComponent: R.TreeReact,
        vueCode: `<template>\n  <Tree :data="data" default-expand-all checkable />\n</template>`,
        reactCode: `import { Tree } from '@dsh-plugin/dsh-ui-components'\n\nexport function Demo() {\n  const treeData = [{ key: 'src', title: 'src', children: [{ key: 'components', title: 'components' }] }]\n  return <Tree treeData={treeData} defaultExpandedKeys={['src']} />\n}`,
      },
    ],
    props: [
      { name: 'data', description: '树节点数据', type: 'TreeNodeData[]', defaultValue: '[]' },
      { name: 'checkable', description: '是否在节点前添加复选框', type: 'boolean', defaultValue: 'false' },
      { name: 'defaultExpandAll', description: '是否默认展开所有节点', type: 'boolean', defaultValue: 'false' },
    ],
  },
  {
    slug: 'watermark',
    name: 'Watermark',
    title: '水印',
    category: 'data-display',
    categoryLabel: '数据展示',
    description: '给页面或指定区域加上防篡改水印。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'watermark-basic',
        title: '区域文字水印',
        description: '支持自定义文字、角度与间距。',
        reactComponent: R.WatermarkBasicReact,
        reactCode: `import * as DSH from '@dsh-plugin/dsh-ui-components'

function Demo() {
  return <DSH.Watermark content="DSH UI"><div style={{ height: 120 }}>水印保护区域</div></DSH.Watermark>
}`,
        vueComponent: V3.WatermarkBasicVue,
        vueCode: `<template>\n  <Watermark content="DSH UI"><div>受保护内容</div></Watermark>\n</template>`,
      },
    ],
    props: [
      { name: 'content', description: '水印文字内容', type: 'string | string[]', defaultValue: '-' },
      { name: 'rotate', description: '水印旋转角度', type: 'number', defaultValue: '-22' },
      { name: 'zIndex', description: '水印层 z-index', type: 'number', defaultValue: '9' },
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
        title: '四种语义状态与可关闭',
        description: '展示 type="info|success|warning|error" 与 closable。',
        vueComponent: V3.AlertBasicVue,
        reactComponent: R.AlertReact,
        vueCode: `<template>\n  <Alert type="info" title="信息提示">type="info"</Alert>\n  <Alert type="error" title="错误" closable>可关闭</Alert>\n</template>`,
        reactCode: `import { Alert } from '@dsh-plugin/dsh-ui-components'\n\nexport function Demo() {\n  return <Alert type="info" title="信息" content="请先保存配置。" />\n}`,
      },
    ],
    props: [
      { name: 'type', description: '警告提示类型', type: `'info' | 'success' | 'warning' | 'error'`, defaultValue: `'info'` },
      { name: 'title', description: '标题文案', type: 'string', defaultValue: '-' },
      { name: 'closable', description: '是否显示关闭按钮', type: 'boolean', defaultValue: 'false' },
    ],
  },
  {
    slug: 'drawer',
    name: 'Drawer',
    title: '抽屉',
    category: 'feedback',
    categoryLabel: '反馈',
    badge: 'Provider',
    description: '屏幕边缘滑出的浮层面板，在 DshProvider 内自动隔离主题变量。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'drawer-basic',
        title: '打开和关闭抽屉',
        description: 'Vue 示例可切换方向，React 示例使用 trigger 管理非受控抽屉的开关。',
        vueComponent: V3.DrawerBasicVue,
        reactComponent: R.DrawerReact,
        vueCode: `<template>\n  <Drawer v-model:visible="open" :placement="placement" title="作用域抽屉">内容</Drawer>\n</template>`,
        reactCode: `import { Drawer, Button } from '@dsh-plugin/dsh-ui-components'\n\nexport function Demo() {\n  return <Drawer title="作用域抽屉" trigger={<Button variant="outline">打开 Drawer</Button>}>点击确定或取消关闭抽屉。</Drawer>\n}`,
      },
    ],
    props: [
      { name: 'visible', description: '是否可见（Vue 支持 v-model:visible）', type: 'boolean', defaultValue: 'false' },
      { name: 'defaultVisible', description: '非受控时的初始可见状态', type: 'boolean', defaultValue: 'false' },
      { name: 'scrollGutter', description: '在内容区与滚动条之间留出间距', type: 'boolean', defaultValue: 'false' },
      { name: 'placement', description: '抽屉滑出位置', type: `'top' | 'right' | 'bottom' | 'left'`, defaultValue: `'right'` },
      { name: 'width / height', description: '抽屉宽度或高度', type: 'number | string', defaultValue: '侧边宽 384px，上下高度 auto' },
    ],
  },
  {
    slug: 'message',
    name: 'Message / useToast',
    title: '全局提示',
    category: 'feedback',
    categoryLabel: '反馈',
    badge: 'Provider',
    description: '轻量级反馈提示；Provider 后代优先使用 useFeedback().message 或 useToast() 获得作用域主题隔离。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'message-basic',
        title: '作用域 Message 与 useToast',
        description: '点击按钮触发不同语义的作用域提示。',
        vueComponent: V3.MessageBasicVue,
        reactComponent: R.MessageReact,
        vueCode: `<script setup lang="ts">\nimport { useFeedback, useToast } from '@dsh-plugin/dsh-ui-components-vue'\nconst { message } = useFeedback()\nconst toast = useToast()\n</script>`,
        reactCode: `import { Button, Message } from '@dsh-plugin/dsh-ui-components'\n\nexport function Demo() {\n  const [message, holder] = Message.useMessage()\n  return <>{holder}<Button onClick={() => message.success?.('操作成功')}>Message 成功</Button></>\n}`,
      },
    ],
    props: [
      { name: 'content', description: '提示内容', type: 'string', defaultValue: '-' },
      { name: 'duration', description: '自动关闭延时（ms）', type: 'number', defaultValue: '3000' },
      { name: 'closable', description: '是否可手动关闭', type: 'boolean', defaultValue: 'true' },
    ],
  },
  {
    slug: 'meter',
    name: 'Meter',
    title: '计量条',
    category: 'feedback',
    categoryLabel: '反馈',
    badge: 'HeroUI',
    description: 'HeroUI 风格计量条，用于展示资源占用或配额比例。',
    frameworks: ['vue'],
    demos: [
      {
        id: 'meter-basic',
        title: '动态调整 Meter 数值',
        description: '点击 -15% / +15% 实时观察颜色与进度变化。',
        vueComponent: V3.MeterBasicVue,
        vueCode: `<template>\n  <Meter :value="val" label="内存占用" />\n</template>`,
      },
    ],
    props: [
      { name: 'value', description: '当前数值', type: 'number', defaultValue: '0' },
      { name: 'min / max', description: '最小/最大值', type: 'number', defaultValue: '0 / 100' },
      { name: 'label', description: '标签说明', type: 'string', defaultValue: '-' },
    ],
  },
  {
    slug: 'modal',
    name: 'Modal / useDialog',
    title: '对话框',
    category: 'feedback',
    categoryLabel: '反馈',
    badge: 'Provider',
    description: '模态对话框，支持上下 120px 留白、Escape 关闭、焦点限制与关闭后焦点恢复。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'modal-basic',
        title: '模态对话框',
        description: '自动继承 DshProvider 的主题与圆角。',
        vueComponent: V3.ModalBasicVue,
        reactComponent: R.ModalReact,
        vueCode: `<template>\n  <Modal v-model:visible="open" title="标题">内容</Modal>\n</template>`,
        reactCode: `import * as React from 'react'\nimport { Modal, Button } from '@dsh-plugin/dsh-ui-components'\n\nexport function Demo() {\n  const [open, setOpen] = React.useState(false)\n  return (\n    <>\n      <Button variant="primary" onClick={() => setOpen(true)}>打开 Modal</Button>\n      <Modal title="React Modal" visible={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)}>React Modal 内容</Modal>\n    </>\n  )\n}`,
      },
    ],
    props: [
      { name: 'visible', description: '是否可见（Vue 支持 v-model:visible）', type: 'boolean', defaultValue: 'false' },
      { name: 'defaultVisible', description: '非受控时的初始可见状态', type: 'boolean', defaultValue: 'false' },
      { name: 'alignCenter', description: '是否垂直居中显示', type: 'boolean', defaultValue: 'true' },
      { name: 'title', description: '对话框标题', type: 'string', defaultValue: '-' },
      { name: 'maskClosable', description: '点击遮罩是否允许关闭', type: 'boolean', defaultValue: 'true' },
      { name: 'scrollGutter', description: '在内容区与滚动条之间留出间距', type: 'boolean', defaultValue: 'false' },
    ],
    events: [
      { name: 'ok / onOk', description: '点击确定按钮触发。React 也可使用 onConfirm，同时传入时优先调用 onOk', type: '() => void' },
      { name: 'cancel', description: '点击取消或关闭触发', type: '() => void' },
    ],
  },
  {
    slug: 'notification',
    name: 'Notification',
    title: '通知提醒框',
    category: 'feedback',
    categoryLabel: '反馈',
    badge: 'Provider',
    description: '在角落展示带有标题与详情的通知提醒。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'notification-basic',
        title: '作用域通知提醒',
        description: '通过 useFeedback().notification 调用，支持多主题隔离。',
        vueComponent: V3.NotificationBasicVue,
        reactComponent: R.NotificationReact,
        vueCode: `<script setup lang="ts">\nconst { notification } = useFeedback()\nnotification.info({ title: '系统通知', content: '...' })\n</script>`,
        reactCode: `import { Button, Notification } from '@dsh-plugin/dsh-ui-components'\n\nexport function Demo() {\n  const [notification, holder] = Notification.useNotification()\n  return <>{holder}<Button onClick={() => notification.info?.({ title: '通知', content: '配置已保存' })}>打开 Notification</Button></>\n}`,
      },
    ],
    props: [
      { name: 'title', description: '通知标题', type: 'string', defaultValue: '-' },
      { name: 'content', description: '通知详情', type: 'string', defaultValue: '-' },
      { name: 'position', description: '作用域通知默认出现在行末上方，RTL 时为左上角', type: 'string', defaultValue: 'LTR: topRight；RTL: topLeft' },
      { name: 'duration', description: '自动关闭延时（ms），设为 0 时持续显示', type: 'number', defaultValue: '3000' },
    ],
  },
  {
    slug: 'popconfirm',
    name: 'Popconfirm',
    title: '气泡确认框',
    category: 'feedback',
    categoryLabel: '反馈',
    description: '点击元素弹出确认气泡，用于轻量二次确认。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'popconfirm-basic',
        title: '二次确认气泡',
        description: '避免危险误操作。',
        vueComponent: V3.PopconfirmBasicVue,
        reactComponent: R.PopconfirmReact,
        vueCode: `<template>\n  <Popconfirm content="确定删除此配置项吗？"><Button variant="danger-soft">删除</Button></Popconfirm>\n</template>`,
        reactCode: `import { Popconfirm, Button, messageSuccess } from '@dsh-plugin/dsh-ui-components'\n\nexport function Demo() {\n  return (\n    <Popconfirm title="确认删除此配置吗？" onOk={() => messageSuccess('已删除')}>\n      <Button variant="primary" danger>删除配置</Button>\n    </Popconfirm>\n  )\n}`,
      },
    ],
    props: [
      { name: 'showArrow / triggerProps.showArrow', description: 'Vue 使用 showArrow，React 使用 triggerProps.showArrow', type: 'boolean', defaultValue: 'false' },
      { name: 'content / title', description: 'Vue 使用 content，React 使用 title 作为确认文案', type: 'string', defaultValue: '-' },
      { name: 'type', description: '图标语义类型', type: `'info' | 'success' | 'warning' | 'error'`, defaultValue: `'info'` },
    ],
    events: [
      { name: 'ok', description: '点击确认按钮触发', type: '() => void' },
      { name: 'cancel', description: '点击取消按钮触发', type: '() => void' },
    ],
  },
  {
    slug: 'progress',
    name: 'Progress / ProgressBar / ProgressCircle',
    title: '进度条',
    category: 'feedback',
    categoryLabel: '反馈',
    badge: 'HeroUI',
    description: 'Vue 的 Progress 使用 0 到 1，React 使用 0 到 100。Vue 另提供可指定值域的 ProgressBar 和 ProgressCircle。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'progress-basic',
        title: '线性进度条与环形进度',
        description: '统一语义色与减少动画支持。',
        vueComponent: V3.ProgressBasicVue,
        reactComponent: R.ProgressReact,
        vueCode: `<template>\n  <Progress :percent="0.68" />\n  <ProgressBar :value="68" label="ProgressBar" />\n  <ProgressCircle :value="68" />\n</template>`,
        reactCode: `import { Progress } from '@dsh-plugin/dsh-ui-components'\n\nexport function Demo() {\n  return <Progress percent={68} />\n}`,
      },
    ],
    apiSections: [
      {
        id: 'api-progress-props',
        title: 'Progress Props',
        kind: 'props',
        rows: [
          { name: 'percent', description: 'Arco Progress 进度值（Vue: 0 ~ 1, React: 0 ~ 100）', type: 'number', defaultValue: '0' },
          { name: 'type', description: '进度条类型', type: `'line' | 'circle'`, defaultValue: `'line'` },
          { name: 'status', description: '进度状态', type: `'normal' | 'success' | 'warning' | 'danger' | 'error'`, defaultValue: `'normal'` },
          { name: 'strokeWidth', description: '线性进度轨道厚度（px），显式值优先于尺寸档', type: 'number', defaultValue: '小 4 / 中 8 / 大 12' },
          { name: 'showText', description: '是否显示进度文案', type: 'boolean', defaultValue: 'true' },
        ],
      },
      {
        id: 'api-progressbar-props',
        title: 'ProgressBar / ProgressCircle Props',
        framework: 'vue',
        kind: 'props',
        rows: [
          { name: 'value', description: '当前数值（0 ~ 100）', type: 'number', defaultValue: '0' },
          { name: 'label', description: '进度条标签', type: 'string', defaultValue: '-' },
          { name: 'min / max', description: '可绘制的数值范围', type: 'number', defaultValue: '0 / 100' },
        ],
      },
    ],
  },
  {
    slug: 'result',
    name: 'Result',
    title: '结果页',
    category: 'feedback',
    categoryLabel: '反馈',
    description: '用于反馈一系列操作任务的处理结果。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'result-basic',
        title: '结果状态切换 (status)',
        description: '点击按钮实时切换 success / info / warning / error 结果页。',
        vueComponent: V3.ResultBasicVue,
        reactComponent: R.ResultReact,
        vueCode: `<template>\n  <Result :status="status" title="操作结果" subtitle="说明文案" />\n</template>`,
        reactCode: `import { Result } from '@dsh-plugin/dsh-ui-components'\n\nexport function Demo() {\n  return <Result status="success" title="操作成功" subTitle="配置已同步至工作区。" />\n}`,
      },
    ],
    props: [
      { name: 'status', description: '结果状态类型', type: `'info' | 'success' | 'warning' | 'error' | '403' | '404' | '500'`, defaultValue: `'info'` },
      { name: 'title', description: '主标题', type: 'string', defaultValue: '-' },
      { name: 'subtitle', description: '副标题', type: 'string', defaultValue: '-' },
    ],
  },
  {
    slug: 'skeleton',
    name: 'Skeleton',
    title: '骨架屏',
    category: 'feedback',
    categoryLabel: '反馈',
    description: '在内容加载过程中展示占位图形。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'skeleton-basic',
        title: '动画骨架屏',
        description: '展示 animation 脉冲动画与 SkeletonLine 多行文本占位。',
        vueComponent: V3.SkeletonBasicVue,
        reactComponent: R.SkeletonReact,
        vueCode: `<template>\n  <Skeleton animation><SkeletonLine :rows="3" /></Skeleton>\n</template>`,
        reactCode: `import { Skeleton } from '@dsh-plugin/dsh-ui-components'\n\nexport function Demo() {\n  return <Skeleton text={{ rows: 2 }} animation />\n}`,
      },
    ],
    props: [
      { name: 'loading', description: '是否显示骨架屏占位', type: 'boolean', defaultValue: 'true' },
      { name: 'animation', description: '是否开启渐变动画', type: 'boolean', defaultValue: 'false' },
    ],
  },
  {
    slug: 'spin',
    name: 'Spin / Spinner',
    title: '加载中',
    category: 'feedback',
    categoryLabel: '反馈',
    description: '用于页面和区块的加载中状态（Spinner 额外提供无障碍 status 语义）。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'spin-basic',
        title: 'Spin 与无障碍 Spinner',
        description: '展示圆环、点状加载和内容模糊。',
        vueComponent: V3.SpinBasicVue,
        reactComponent: R.SpinReact,
        vueCode: `<template>\n  <Spin :size="24" />\n  <Spin dot />\n  <Spinner label="正在加载数据…" />\n  <Spin loading loading-style="blur"><p>加载中的内容</p></Spin>\n</template>`,
        reactCode: `import { Spin } from '@dsh-plugin/dsh-ui-components'\n\nexport function Demo() {\n  return <Spin loading loadingStyle="blur"><p>加载中的内容</p></Spin>\n}`,
      },
    ],
    props: [
      { name: 'size', description: '图标尺寸', type: 'number', defaultValue: '24' },
      { name: 'dot', description: '是否使用点状动画', type: 'boolean', defaultValue: 'false' },
      { name: 'tip', description: '加载提示文案', type: 'string', defaultValue: '-' },
      { name: 'loadingStyle', description: '加载时模糊内容并保留清晰的加载图标', type: "'blur'", defaultValue: '-' },
    ],
  },
  {
    slug: 'trigger',
    name: 'Trigger',
    title: '触发器',
    category: 'feedback',
    categoryLabel: '反馈',
    description: '底层弹出层定位与触发器组件。',
    frameworks: ['vue', 'react'],
    demos: [
      {
        id: 'trigger-basic',
        title: '基础触发器',
        description: '自定义弹出内容与触发方式。',
        reactComponent: R.TriggerBasicReact,
        reactCode: `import * as DSH from '@dsh-plugin/dsh-ui-components'

function Demo() {
  return (
    <DSH.Trigger trigger="click" position="bottom" popup={() => <div>自定义弹出内容</div>}>
      <DSH.Button variant="outline">点击触发 Trigger</DSH.Button>
    </DSH.Trigger>
  )
}`,
        vueComponent: V3.TriggerBasicVue,
        vueCode: `<template>\n  <Trigger trigger="click"><Button>点击</Button><template #content>内容</template></Trigger>\n</template>`,
      },
    ],
    props: [
      { name: 'trigger', description: '触发方式', type: `'hover' | 'click' | 'focus' | 'contextMenu'`, defaultValue: `'hover'` },
      { name: 'position', description: '弹出方位', type: `'top' | 'bottom' | 'left' | 'right'`, defaultValue: `'bottom'` },
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
    description: '用于插件设置与结果展示，包括 PanelShell、SettingsCard、SettingsRow、MenuSelect、SegmentedControl、CodeBlockShell、JsonTree、FileTypeBadge 与 StatusLine。',
    frameworks: ['react'],
    demos: [
      {
        id: 'panel-shell',
        title: '模态面板与分段导航',
        description: '打开面板后，使用左右方向键切换摘要和原始数据。按 Esc 关闭并返回启动按钮。较长内容在面板正文内滚动。',
        reactComponent: R.PanelShellReact,
        vueCode: '',
        reactCode: `import * as React from 'react'
import { Button, PanelShell, SegmentedControl, JsonTree } from '@dsh-plugin/dsh-ui-components'

export function Demo() {
  const [open, setOpen] = React.useState(false)
  const [mode, setMode] = React.useState('summary')
  return (
    <>
      <Button onClick={() => setOpen(true)}>查看运行结果</Button>
      {open && <PanelShell title="运行结果" closeLabel="关闭运行结果" onClose={() => setOpen(false)}>
        <SegmentedControl id="run-view" label="结果视图" value={mode} onChange={setMode}
          items={[{ value: 'summary', label: '摘要' }, { value: 'data', label: '原始数据' }]} />
        <div id="run-view-summary-panel" role="tabpanel" aria-labelledby="run-view-summary" hidden={mode !== 'summary'}>任务已完成</div>
        <div id="run-view-data-panel" role="tabpanel" aria-labelledby="run-view-data" hidden={mode !== 'data'}>
          <JsonTree value={{ status: 'done', timings: { total: 12 } }} defaultExpanded={false} />
        </div>
      </PanelShell>}
    </>
  )
}`,
      },
      {
        id: 'composites-react-demo',
        title: '插件设置面板与数据展示组合',
        description: '实时渲染 @dsh-plugin/dsh-ui-components 中的 React 复合组件。',
        reactComponent: R.CompositesReact,
        vueCode: `<!-- 复合组件提供于 React 版 @dsh-plugin/dsh-ui-components，请切换顶部框架至 React 查看实时预览。 -->`,
        reactCode: `import * as React from 'react'
import {
  SettingsCard,
  SettingsRow,
  MenuSelect,
  Switch,
  CodeBlockShell,
  JsonTree,
  FileTypeBadge,
  StatusLine,
} from '@dsh-plugin/dsh-ui-components'

export function Demo() {
  const [mode, setMode] = React.useState('balanced')
  const [autoSave, setAutoSave] = React.useState(true)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <SettingsCard title="运行策略" description="DSH 专属复合设置卡片">
        <SettingsRow label="推理模式" description="选择默认响应速度与质量平衡">
          <MenuSelect
            label="推理模式"
            value={mode}
            onChange={setMode}
            options={[
              { value: 'fast', label: '快速模式' },
              { value: 'balanced', label: '均衡模式' },
              { value: 'deep', label: '深度分析（暂不可用）', disabled: true },
            ]}
          />
        </SettingsRow>
        <SettingsRow label="自动保存" description="编辑后自动持久化配置">
          <Switch checked={autoSave} onChange={setAutoSave} />
        </SettingsRow>
      </SettingsCard>
      <div style={{ display: 'flex', gap: 12 }}>
        <FileTypeBadge name="index.tsx" />
        <StatusLine state="done" time="12ms">服务运行中</StatusLine>
      </div>
      <CodeBlockShell language="ts">
        <pre>{'import { DshProvider, Button } from "@dsh-plugin/dsh-ui-components"'}</pre>
      </CodeBlockShell>
      <JsonTree value={{ package: '@dsh-plugin/dsh-ui-components', framework: 'react' }} />
    </div>
  )
}`,
      },
    ],
    apiSections: [
      {
        id: 'api-panel-shell',
        title: 'PanelShell Props',
        kind: 'props',
        framework: 'react',
        description: '挂载即打开模态面板。请用状态控制挂载，并在 onClose 中更新状态以关闭面板。内容可单独滚动，标题和底部操作区保持可见。',
        rows: [
          { name: 'title', description: '可见标题，同时作为面板的无障碍名称', type: 'ReactNode' },
          { name: 'closeLabel', description: '关闭按钮的无障碍名称，传入后显示按钮', type: 'string' },
          { name: 'onClose', description: '按 Esc、点击关闭按钮或点击遮罩时调用', type: '() => void' },
          { name: 'mask', description: '显示可点击的遮罩', type: 'boolean', defaultValue: 'true' },
          { name: 'children', description: '可滚动的正文', type: 'ReactNode' },
          { name: 'footer', description: '底部操作区', type: 'ReactNode' },
        ],
      },
      {
        id: 'api-segmented-control',
        title: 'SegmentedControl Props',
        kind: 'props',
        framework: 'react',
        description: '左右方向键按页面书写方向移动到可用项，Home 和 End 移到首尾。切换时同步选择和键盘焦点。',
        rows: [
          { name: 'items', description: '每项包含 value、label，可设置 disabled 和 disabledReason', type: 'readonly Segment[]', required: true },
          { name: 'value', description: '当前选中项的值', type: 'string', required: true },
          { name: 'onChange', description: '接收下一项的值', type: '(value: string) => void', required: true },
          { name: 'label', description: '分段列表的无障碍名称', type: 'string', required: true },
          { name: 'id', description: '生成页签 id 和对应面板 id 的前缀，面板由调用方渲染', type: 'string' },
          { name: 'disabled', description: '禁用全部分段', type: 'boolean', defaultValue: 'false' },
          { name: 'block', description: '占满父容器宽度', type: 'boolean', defaultValue: 'false' },
        ],
      },
      {
        id: 'api-settings-card',
        title: 'SettingsCard Props',
        kind: 'props',
        framework: 'react',
        rows: [
          { name: 'title', description: '卡片标题', type: 'ReactNode', defaultValue: '-' },
          { name: 'description', description: '卡片副标题描述', type: 'ReactNode', defaultValue: '-' },
          { name: 'footer', description: '卡片底部操作区', type: 'ReactNode', defaultValue: '-' },
        ],
      },
      {
        id: 'api-settings-row',
        title: 'SettingsRow Props',
        kind: 'props',
        framework: 'react',
        rows: [
          { name: 'label', description: '设置项标题', type: 'ReactNode', required: true },
          { name: 'description', description: '设置项辅助说明', type: 'ReactNode', defaultValue: '-' },
          { name: 'layout', description: '行布局方向', type: `'inline' | 'stack'`, defaultValue: `'inline'` },
        ],
      },
      {
        id: 'api-menuselect',
        title: 'MenuSelect Props',
        kind: 'props',
        framework: 'react',
        description: '方向键跳过禁用项，Home 和 End 定位到首尾可用项，Enter 确认。即使列表为空或全部禁用，Esc 仍可收起并将焦点还给触发器。',
        rows: [
          { name: 'value', description: '当前选中值', type: 'string', defaultValue: '-' },
          { name: 'options', description: '每项包含 value、label，可设置 disabled', type: 'readonly MenuSelectOption[]', required: true },
          { name: 'disabled', description: '禁用整个控件并立即收起已打开的菜单', type: 'boolean', defaultValue: 'false' },
          { name: 'label', description: '触发器和弹出列表的无障碍名称', type: 'string' },
          { name: 'placeholder', description: '没有选中项时的触发器文本', type: 'string' },
          { name: 'id', description: '触发器的 HTML id，可用于关联外部标签', type: 'string' },
          { name: 'onChange', description: '选中项改变回调', type: '(value: string) => void', defaultValue: '-' },
        ],
      },
      {
        id: 'api-data-view',
        title: 'CodeBlockShell / JsonTree Props',
        kind: 'props',
        framework: 'react',
        rows: [
          { name: 'language', description: 'CodeBlockShell 代码语言标识', type: 'string', defaultValue: '-' },
          { name: 'value', description: 'JsonTree 待展示的可序列化数据', type: 'unknown', required: true },
          { name: 'defaultExpanded', description: 'JsonTree 根节点的初始展开状态，子节点初始折叠', type: 'boolean', defaultValue: 'true' },
        ],
      },
      {
        id: 'api-indicator',
        title: 'FileTypeBadge / StatusLine Props',
        kind: 'props',
        framework: 'react',
        rows: [
          { name: 'name', description: 'FileTypeBadge 接受裸扩展名或 Windows、POSIX 路径，路径最后一级没有扩展名时显示 FILE', type: 'string', required: true },
          { name: 'state', description: 'StatusLine 状态点枚举', type: `'idle' | 'ongoing' | 'done' | 'warning' | 'error'`, defaultValue: `'ongoing'` },
          { name: 'time', description: 'StatusLine 的耗时或其他附加信息', type: 'ReactNode', defaultValue: '-' },
        ],
      },
    ],
  },
]

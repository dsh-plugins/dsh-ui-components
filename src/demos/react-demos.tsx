import * as React from 'react'
import * as DSH from '@dsh-plugin/dsh-ui-components'
import * as ArcoReact from '@arco-design/web-react'

export function ButtonVariantsReact() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
      <DSH.Button variant="primary">primary</DSH.Button>
      <DSH.Button variant="secondary">secondary</DSH.Button>
      <DSH.Button variant="outline">outline</DSH.Button>
      <DSH.Button variant="text">text</DSH.Button>
      <DSH.Button variant="primary" danger>danger</DSH.Button>
      <DSH.IconButton icon={<span>+</span>} label="新建" />
    </div>
  )
}

export function ButtonPropsReact() {
  const [loading, setLoading] = React.useState(false)
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
      <DSH.Button size="sm">sm</DSH.Button>
      <DSH.Button size="md">md</DSH.Button>
      <DSH.Button size="lg">lg</DSH.Button>
      <DSH.Button variant="outline" onClick={() => setLoading(!loading)}>{loading ? '结束保存' : '模拟保存'}</DSH.Button>
      <DSH.ButtonGroup size="sm" disabled={loading}>
        <DSH.Button loading={loading}>保存</DSH.Button>
        <DSH.Button variant="outline" size="md">预览</DSH.Button>
      </DSH.ButtonGroup>
      <DSH.Button block>占满一行</DSH.Button>
    </div>
  )
}

export function IconsReact() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
      <DSH.Icon name="Search" size={20} />
      <DSH.Icon name="Settings" size={20} />
      <DSH.Icon name="Copy" size={20} />
      <DSH.Icon name="Link" size={20} />
      <DSH.Icon name="Play" size={20} />
      <DSH.Icon name="Close" size={20} />
    </div>
  )
}

export function LinkReact() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <ArcoReact.Link href="#link">默认链接</ArcoReact.Link>
      <ArcoReact.Link href="#link" status="success">success</ArcoReact.Link>
      <ArcoReact.Link href="#link" status="warning">warning</ArcoReact.Link>
      <ArcoReact.Link href="#link" status="error">error</ArcoReact.Link>
      <ArcoReact.Link href="#link" disabled>disabled</ArcoReact.Link>
    </div>
  )
}

export function TypographyReact() {
  return (
    <DSH.Typography>
      <ArcoReact.Typography.Title heading={4}>React 排版体系</ArcoReact.Typography.Title>
      <DSH.Paragraph>使用 Typography、Paragraph 与 Text 展示层级清晰的文本内容。</DSH.Paragraph>
      <DSH.Text type="secondary">次要说明文本 · Text</DSH.Text>
    </DSH.Typography>
  )
}

// 布局
export function DividerReact() {
  return (
    <div>
      <p>上方内容</p>
      <DSH.Divider>分割线文本</DSH.Divider>
      <p>下方内容</p>
    </div>
  )
}

export function GridReact() {
  const { Row, Col } = ArcoReact.Grid
  const box = (text: string) => (
    <div style={{ padding: 12, borderRadius: 8, textAlign: 'center', background: 'rgba(22,93,255,0.14)', fontWeight: 600 }}>{text}</div>
  )
  return (
    <Row gutter={[12, 12]}>
      <Col span={8}>{box('Col 8')}</Col>
      <Col span={8}>{box('Col 8')}</Col>
      <Col span={8}>{box('Col 8')}</Col>
    </Row>
  )
}

export function SpaceReact() {
  return (
    <ArcoReact.Space size="medium" wrap>
      <DSH.Button variant="primary">按钮一</DSH.Button>
      <DSH.Button variant="secondary">按钮二</DSH.Button>
      <DSH.Button variant="outline">按钮三</DSH.Button>
    </ArcoReact.Space>
  )
}

// 导航
export function BreadcrumbReact() {
  return (
    <DSH.Breadcrumb>
      <ArcoReact.Breadcrumb.Item>首页</ArcoReact.Breadcrumb.Item>
      <ArcoReact.Breadcrumb.Item>组件库</ArcoReact.Breadcrumb.Item>
      <ArcoReact.Breadcrumb.Item>Breadcrumb</ArcoReact.Breadcrumb.Item>
    </DSH.Breadcrumb>
  )
}

export function PaginationReact() {
  const [cur, setCur] = React.useState(2)
  return <DSH.Pagination total={120} current={cur} onChange={(p: number) => setCur(p)} />
}

export function StepsReact() {
  const [cur, setCur] = React.useState(2)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ArcoReact.Steps current={cur}>
        <ArcoReact.Steps.Step title="安装依赖" description="pnpm add" />
        <ArcoReact.Steps.Step title="配置主题" description="DshProvider" />
        <ArcoReact.Steps.Step title="发布上线" description="GitHub Pages" />
      </ArcoReact.Steps>
      <div style={{ display: 'flex', gap: 8 }}>
        <DSH.Button size="sm" variant="outline" onClick={() => setCur(Math.max(1, cur - 1))}>上一步</DSH.Button>
        <DSH.Button size="sm" variant="primary" onClick={() => setCur(Math.min(3, cur + 1))}>下一步</DSH.Button>
      </div>
    </div>
  )
}

export function TabsReact() {
  return (
    <DSH.Tabs defaultActiveTab="1">
      <DSH.TabPane key="1" title="Vue 3">Vue 版 @dsh-plugin/dsh-ui-components-vue</DSH.TabPane>
      <DSH.TabPane key="2" title="React 18">React 版 @dsh-plugin/dsh-ui-components</DSH.TabPane>
    </DSH.Tabs>
  )
}

// 数据输入
export function InputReact() {
  const [val, setVal] = React.useState('')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 380 }}>
      <DSH.Field label="工作区名称" htmlFor="r-input" description="Field + Input 组合">
        <DSH.Input id="r-input" value={val} onChange={(v: string) => setVal(v)} placeholder="请输入名称" />
      </DSH.Field>
      <DSH.Textarea placeholder="Textarea 多行输入" />
    </div>
  )
}

export function InputNumberReact() {
  const [n, setN] = React.useState<number>(5)
  return <DSH.InputNumber value={n} onChange={(v: number) => setN(v)} min={0} max={100} />
}

export function SelectReact() {
  const id = React.useId()
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 380 }}>
      <label htmlFor={id}>运行模式</label>
      <DSH.Select
        id={id}
        defaultValue="balanced"
        allowClear
        options={[
          { value: 'fast', label: '快速模式' },
          { value: 'balanced', label: '均衡模式' },
          { value: 'deep', label: '深入分析' },
          { value: 'off', label: '离线（禁用）', disabled: true },
        ]}
      />
      <DSH.Select
        multiple
        defaultValue={['react', 'ts']}
        options={[
          { value: 'vue', label: 'Vue 3' },
          { value: 'react', label: 'React' },
          { value: 'ts', label: 'TypeScript' },
        ]}
      />
    </div>
  )
}

export function AutoCompleteReact() {
  return <DSH.AutoComplete data={['React', 'Vite', 'Arco', 'TypeScript']} placeholder="输入 R 或 A" style={{ maxWidth: 340 }} />
}

export function CheckboxReact() {
  return (
    <DSH.CheckboxGroup
      defaultValue={['react']}
      options={[
        { label: 'React 18', value: 'react' },
        { label: 'TypeScript', value: 'ts' },
      ]}
    />
  )
}

export function RadioReact() {
  return (
    <DSH.RadioGroup defaultValue="auto">
      <DSH.Radio value="auto" label="自动" />
      <DSH.Radio value="manual" label="手动" />
    </DSH.RadioGroup>
  )
}

export function SwitchReact() {
  const [on, setOn] = React.useState(true)
  return <DSH.Switch checked={on} onChange={setOn} />
}

export function SliderReact() {
  const [v, setV] = React.useState(50)
  return <DSH.Slider value={v} onChange={(val: any) => setV(val)} style={{ maxWidth: 320 }} />
}

export function RateReact() {
  return <DSH.Rate defaultValue={4} allowHalf />
}

export function ColorPickerReact() {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <DSH.ColorPicker defaultValue="#165dff" />
      <DSH.ColorPicker defaultValue="#722ed1" showText showFormatControls />
      <DSH.ColorPicker defaultValue="#00b42a" disabled />
    </div>
  )
}

export function DatePickerReact() {
  return (
    <div style={{ display: 'grid', gap: 12, maxWidth: 420 }}>
      <DSH.DatePicker defaultValue="2026-01-02" format="YYYY-MM-DD" />
      <DSH.RangePicker placeholder={['开始日期', '结束日期']} />
      <DSH.MonthPicker placeholder="选择月份" />
    </div>
  )
}

export function TimePickerReact() {
  return <DSH.TimePicker />
}

// 数据展示
export function AvatarReact() {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <DSH.Avatar size={32}>S</DSH.Avatar>
      <DSH.Avatar size={40}>DS</DSH.Avatar>
      <DSH.Avatar size={48} shape="square">UI</DSH.Avatar>
    </div>
  )
}

export function BadgeTagReact() {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <DSH.Badge count={9}>
        <DSH.Avatar shape="square">DS</DSH.Avatar>
      </DSH.Badge>
      <DSH.Tag tone="info">info</DSH.Tag>
      <DSH.Tag tone="success">success</DSH.Tag>
      <DSH.Tag tone="warning">warning</DSH.Tag>
      <DSH.Tag tone="danger">danger</DSH.Tag>
      <DSH.Pill>Pill 胶囊</DSH.Pill>
    </div>
  )
}

export function TagReact() {
  return <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
    <DSH.Tag tone="info" size="sm">小号</DSH.Tag>
    <DSH.Tag tone="success">默认</DSH.Tag>
    <DSH.Tag tone="warning" size="lg" closable>可关闭</DSH.Tag>
  </div>
}

export function CardReact() {
  return <div style={{ display: 'grid', gap: 16 }}>
    <DSH.Card title="标准卡片" hoverable>悬停查看阴影。</DSH.Card>
    <DSH.Card title="紧凑卡片" variant="flat" tight>适合紧凑列表。</DSH.Card>
  </div>
}

export function CollapseReact() {
  return (
    <DSH.Collapse defaultActiveKey={['1']}>
      <DSH.CollapseItem name="1" header="React Collapse 面板 1">内容区域 1</DSH.CollapseItem>
      <DSH.CollapseItem name="2" header="React Collapse 面板 2">内容区域 2</DSH.CollapseItem>
    </DSH.Collapse>
  )
}

export function DescriptionsReact() {
  return (
    <DSH.Descriptions
      title="React 包信息"
      column={2}
      data={[
        { label: '包名', value: '@dsh-plugin/dsh-ui-components' },
        { label: '基线', value: '@arco-design/web-react' },
      ]}
    />
  )
}

export function EmptyReact() {
  return <DSH.Empty description="暂无匹配数据" />
}

export function PopoverReact() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      <DSH.Popover title="Popover" content="气泡卡片内容" trigger="click">
        <button type="button" className="demo-trigger">点击 Popover</button>
      </DSH.Popover>
      <DSH.HoverCard content="组件详情">
        <button type="button" className="demo-trigger">悬停或聚焦查看详情</button>
      </DSH.HoverCard>
    </div>
  )
}

export function TooltipReact() {
  return (
    <DSH.Tooltip content="Tooltip 提示" trigger={['hover', 'focus']}>
      <button type="button" className="demo-trigger">查看提示</button>
    </DSH.Tooltip>
  )
}

export function ScrollShadowReact() {
  return (
    <DSH.ScrollShadow maxHeight={160} variant="page">
      {Array.from({ length: 14 }, (_, index) => <div key={index}>滚动内容 {index + 1}</div>)}
    </DSH.ScrollShadow>
  )
}

export function TableReact() {
  return (
    <DSH.Table
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
}

// 反馈
export function AlertReact() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <DSH.Alert type="info" title="信息" content="React 版通过 DshProvider 注入样式表与浮层容器。" />
      <DSH.Alert type="success" title="成功" content="配置已保存。" />
      <DSH.Alert type="warning" title="警告" content="请检查配置。" />
      <DSH.Alert type="error" title="错误" content="保存失败。" closable />
    </div>
  )
}

export function ProgressReact() {
  return <div style={{ display: 'grid', gap: 12 }}>
    {(['small', 'default', 'large'] as const).map(size =>
      <DSH.Progress key={size} size={size} percent={68} />)}
    <DSH.Progress type="circle" percent={68} />
  </div>
}

export function SpinReact() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <DSH.Spin />
      <DSH.Spin dot />
      <DSH.Spin loading loadingStyle="blur"><p>加载中的内容</p></DSH.Spin>
    </div>
  )
}

export function SkeletonReact() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <DSH.Skeleton text={{ rows: 2 }} animation />
    </div>
  )
}

export function ModalDrawerReact() {
  const [modalOpen, setModalOpen] = React.useState(false)
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <DSH.Button variant="primary" onClick={() => setModalOpen(true)}>打开 Modal</DSH.Button>
      <DSH.Button variant="outline" onClick={() => setDrawerOpen(true)}>打开 Drawer</DSH.Button>
      <DSH.Modal title="React Modal" visible={modalOpen} onOk={() => setModalOpen(false)} onCancel={() => setModalOpen(false)}>
        React Modal 内容
      </DSH.Modal>
      <DSH.Drawer title="React Drawer" visible={drawerOpen} onOk={() => setDrawerOpen(false)} onCancel={() => setDrawerOpen(false)}>
        React Drawer 内容
      </DSH.Drawer>
    </div>
  )
}

export function LayoutReact() {
  const { Header, Sider, Content, Footer } = ArcoReact.Layout
  return (
    <ArcoReact.Layout style={{ border: '1px solid var(--docs-border)', borderRadius: 8, overflow: 'hidden' }}>
      <Header style={{ padding: '10px 16px', background: 'rgba(22,93,255,0.12)', fontWeight: 600 }}>Header</Header>
      <ArcoReact.Layout>
        <Sider style={{ width: 120, padding: 16, background: 'rgba(22,93,255,0.06)' }}>Sider</Sider>
        <Content style={{ padding: 16 }}>Content</Content>
      </ArcoReact.Layout>
      <Footer style={{ padding: '10px 16px', background: 'rgba(22,93,255,0.08)' }}>Footer</Footer>
    </ArcoReact.Layout>
  )
}

export function DropdownReact() {
  const dropList = (
    <DSH.Menu>
      <DSH.MenuItem key="1">新建文件</DSH.MenuItem>
      <DSH.MenuItem key="2">重命名</DSH.MenuItem>
      <DSH.MenuItem key="3">删除</DSH.MenuItem>
    </DSH.Menu>
  )
  return (
    <DSH.Dropdown droplist={dropList} trigger="click">
      <DSH.Button variant="outline">点击展开菜单 ▾</DSH.Button>
    </DSH.Dropdown>
  )
}

export function MenuReact() {
  return (
    <DSH.Menu mode="horizontal" defaultSelectedKeys={['home']} style={{ borderBottom: '1px solid var(--docs-border)' }}>
      <DSH.MenuItem key="home">首页</DSH.MenuItem>
      <DSH.MenuItem key="docs">文档</DSH.MenuItem>
      <DSH.MenuItem key="settings">设置</DSH.MenuItem>
    </DSH.Menu>
  )
}

export function PageHeaderReact() {
  return (
    <ArcoReact.PageHeader
      title="工作区配置"
      subTitle="React PageHeader"
      extra={<DSH.Button size="sm">保存</DSH.Button>}
    />
  )
}

export function BackTopReact() {
  return <ArcoReact.BackTop visibleHeight={100} style={{ position: 'static' }} />
}

export function CascaderReact() {
  const options = [
    {
      value: 'cn',
      label: '中国',
      children: [
        { value: 'bj', label: '北京' },
        { value: 'sh', label: '上海' },
      ],
    },
  ]
  return <DSH.Cascader options={options} placeholder="请选择地区" style={{ maxWidth: 280 }} allowClear />
}

export function FormReact() {
  return (
    <DSH.Form layout="vertical" style={{ maxWidth: 400 }}>
      <DSH.FormItem label="用户名" field="username" rules={[{ required: true, message: '请输入用户名' }]}>
        <DSH.Input placeholder="请输入用户名" />
      </DSH.FormItem>
      <DSH.FormItem>
        <DSH.Button variant="primary" htmlType="submit">提交</DSH.Button>
      </DSH.FormItem>
    </DSH.Form>
  )
}

export function TransferReact() {
  const dataSource = [
    { key: '1', value: '选项 A' },
    { key: '2', value: '选项 B' },
    { key: '3', value: '选项 C' },
  ]
  return <DSH.Transfer dataSource={dataSource} defaultTargetKeys={['1']} />
}

export function TreeSelectReact() {
  const treeData = [
    {
      key: 'root',
      title: '根节点',
      children: [
        { key: 'child-1', title: '子节点 1' },
        { key: 'child-2', title: '子节点 2' },
      ],
    },
  ]
  return <DSH.TreeSelect treeData={treeData} placeholder="请选择节点" style={{ maxWidth: 280 }} />
}

export function CalendarReact() {
  return <DSH.Calendar panel />
}

export function CarouselReact() {
  return (
    <DSH.Carousel style={{ width: '100%', maxWidth: 480, height: 140 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(22,93,255,0.14)', height: '100%' }}>Slide 1</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(114,46,209,0.14)', height: '100%' }}>Slide 2</div>
    </DSH.Carousel>
  )
}

export function ImageReact() {
  return (
    <DSH.Image
      width={160}
      src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
      alt="示例图片"
    />
  )
}

export function ListReact() {
  return (
    <DSH.List
      size="small"
      header="最近更新"
      dataSource={['Button 按钮', 'Input 输入框', 'Table 表格']}
      render={(item: string, index: number) => <DSH.ListItem key={index}>{item}</DSH.ListItem>}
    />
  )
}

export function StatisticReact() {
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <DSH.Statistic title="组件总数" value={80} />
      <DSH.Statistic title="覆盖率" value={100} suffix="%" />
    </div>
  )
}

export function TimelineReact() {
  return (
    <DSH.Timeline>
      <DSH.TimelineItem label="2026-01">初始化 DSH Token</DSH.TimelineItem>
      <DSH.TimelineItem label="2026-06">完成 Arco 全量覆盖</DSH.TimelineItem>
      <DSH.TimelineItem label="2026-11">上线双栈文档站点</DSH.TimelineItem>
    </DSH.Timeline>
  )
}

export function TreeReact() {
  const treeData = [
    {
      key: 'src',
      title: 'src',
      children: [
        { key: 'components', title: 'components' },
        { key: 'demos', title: 'demos' },
      ],
    },
  ]
  return <DSH.Tree treeData={treeData} defaultExpandedKeys={['src']} />
}

export function MessageReact() {
  const [message, holder] = DSH.Message.useMessage()
  return <>{holder}<DSH.Button onClick={() => message.success?.('操作成功')}>Message 成功</DSH.Button></>
}

export function NotificationReact() {
  const [notification, holder] = DSH.Notification.useNotification()
  return <>{holder}<DSH.Button onClick={() => notification.info?.({ title: '通知', content: '配置已保存' })}>打开 Notification</DSH.Button></>
}

export function PopconfirmReact() {
  return (
    <DSH.Popconfirm title="确认删除此配置吗？" onOk={() => { DSH.messageSuccess('已删除') }}>
      <DSH.Button variant="primary" danger>删除配置</DSH.Button>
    </DSH.Popconfirm>
  )
}

export function ResultReact() {
  return <DSH.Result status="success" title="操作成功" subTitle="配置已同步至工作区。" />
}

export function ModalReact() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <DSH.Button variant="primary" onClick={() => setOpen(true)}>打开 Modal</DSH.Button>
      <DSH.Modal title="React Modal" visible={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)}>
        React Modal 内容
      </DSH.Modal>
    </>
  )
}

export function DrawerReact() {
  return <DSH.Drawer title="作用域抽屉" trigger={<DSH.Button variant="outline">打开 Drawer</DSH.Button>}>
    点击确定或取消关闭抽屉。
  </DSH.Drawer>
}

// 复合组件
export function PanelShellReact() {
  const [open, setOpen] = React.useState(false)
  const [mode, setMode] = React.useState('summary')
  return (
    <>
      <DSH.Button onClick={() => setOpen(true)}>查看运行结果</DSH.Button>
      {open && <DSH.PanelShell title="运行结果" closeLabel="关闭运行结果" onClose={() => setOpen(false)}>
        <DSH.SegmentedControl id="run-view" label="结果视图" value={mode} onChange={setMode}
          items={[{ value: 'summary', label: '摘要' }, { value: 'data', label: '原始数据' }]} />
        <div id="run-view-summary-panel" role="tabpanel" aria-labelledby="run-view-summary" hidden={mode !== 'summary'}>任务已完成</div>
        <div id="run-view-data-panel" role="tabpanel" aria-labelledby="run-view-data" hidden={mode !== 'data'}>
          <DSH.JsonTree value={{ status: 'done', timings: { total: 12 } }} defaultExpanded={false} />
        </div>
      </DSH.PanelShell>}
    </>
  )
}

export function CompositesReact() {
  const [mode, setMode] = React.useState('balanced')
  const [autoSave, setAutoSave] = React.useState(true)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <DSH.SettingsCard title="运行策略" description="DSH 专属复合设置卡片">
        <DSH.SettingsRow label="推理模式" description="选择默认响应速度与质量平衡">
          <DSH.MenuSelect
            label="推理模式"
            value={mode}
            onChange={setMode}
            options={[
              { value: 'fast', label: '快速模式' },
              { value: 'balanced', label: '均衡模式' },
              { value: 'deep', label: '深度分析（暂不可用）', disabled: true },
            ]}
          />
        </DSH.SettingsRow>
        <DSH.SettingsRow label="自动保存" description="编辑后自动持久化配置">
          <DSH.Switch checked={autoSave} onChange={setAutoSave} />
        </DSH.SettingsRow>
      </DSH.SettingsCard>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <DSH.FileTypeBadge name="index.tsx" />
        <DSH.FileTypeBadge name="config.json" />
        <DSH.StatusLine state="done" time="12ms">服务运行中</DSH.StatusLine>
      </div>

      <DSH.CodeBlockShell language="ts">
        <pre style={{ margin: 0 }}>{`import { DshProvider, Button } from '@dsh-plugin/dsh-ui-components'`}</pre>
      </DSH.CodeBlockShell>
      <DSH.JsonTree value={{ package: '@dsh-plugin/dsh-ui-components', framework: 'react', arco: true }} />
    </div>
  )
}

export function VerificationCodeBasicReact() {
  const [code, setCode] = React.useState('')
  return (
    <div>
      <DSH.VerificationCode length={6} onChange={setCode} />
      <p aria-live="polite">{code.length === 6 ? '已完成输入' : ''}</p>
    </div>
  )
}

export function InputTagBasicReact() {
  return <DSH.InputTag defaultValue={['React', 'TypeScript']} placeholder="输入后按回车添加标签" allowClear />
}

export function MentionsBasicReact() {
  return <DSH.Mentions options={['Alice', 'Bob', 'Charlie']} placeholder="输入 @ 提及" />
}

export function UploadBasicReact() {
  return <DSH.Upload autoUpload={false} />
}

export function CommentBasicReact() {
  return <DSH.Comment author="DSH Design Team" datetime="1 分钟前" content="文档站点支持 Vue 与 React 示例。" />
}

export function WatermarkBasicReact() {
  return <DSH.Watermark content="DSH UI"><div style={{ height: 120 }}>水印保护区域</div></DSH.Watermark>
}

export function TriggerBasicReact() {
  return (
    <DSH.Trigger trigger="click" position="bottom" popup={() => <div>自定义弹出内容</div>}>
      <DSH.Button variant="outline">点击触发 Trigger</DSH.Button>
    </DSH.Trigger>
  )
}

export function ResizeBoxBasicReact() {
  return (
    <DSH.ResizeBox directions={['right', 'bottom']} style={{ width: 320, maxWidth: '100%', height: 120, padding: 16, border: '1px solid var(--docs-border)' }}>
      拖拽右侧或底部边缘调整容器大小
    </DSH.ResizeBox>
  )
}

export function SplitBasicReact() {
  return <DSH.ResizeBox.Split style={{ height: 140 }} panes={[<div key="left">左侧面板</div>, <div key="right">右侧面板</div>]} />
}

export function AffixBasicReact() {
  return <DSH.Affix offsetTop={80}><DSH.Button variant="outline">Affix 固钉按钮</DSH.Button></DSH.Affix>
}

export function AnchorBasicReact() {
  return (
    <DSH.Anchor affix={false}>
      <DSH.Anchor.Link href="#anchor-basic" title="基础用法" />
      <DSH.Anchor.Link href="#api-props" title="API 参数" />
    </DSH.Anchor>
  )
}

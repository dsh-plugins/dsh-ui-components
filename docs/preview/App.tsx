/**
 * 演示站主界面。
 *
 * 逐组列出组件实例，并提供主题切换与图标搜索。演示站本身就是本包的主要
 * 集成验证：它在浏览器里跑的是同一份源码，任何遗漏的样式注入或错误令牌
 * 都会在这里露出来。
 */
import * as React from 'react'
import {
  Alert,
  Avatar,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  Checkbox,
  CodeBlockShell,
  Descriptions,
  DisclosureRow,
  Divider,
  DshProvider,
  Empty,
  Field,
  FileTypeBadge,
  Icon,
  ICON_INDEX,
  Icons,
  IconButton,
  Input,
  JsonTree,
  List,
  MenuSelect,
  Modal,
  Pagination,
  PanelShell,
  Paragraph,
  Pill,
  Progress,
  Radio,
  Rate,
  SegmentedControl,
  Select,
  SettingsCard,
  SettingsRow,
  Skeleton,
  Slider,
  Spin,
  StateDot,
  Statistic,
  StatusLine,
  Steps,
  Switch,
  Table,
  Tabs,
  Tag,
  Text,
  Textarea,
  Timeline,
  Tooltip,
  Typography,
} from '../../src/index.js'

/** 演示站的一个分组。 */
interface Section {
  id: string
  title: string
  description: string
  render: () => React.ReactElement
}

const SELECT_OPTIONS = [
  { value: 'auto', label: '自动' },
  { value: 'manual', label: '手动' },
  { value: 'off', label: '关闭' },
]

const TABLE_COLUMNS = [
  { title: '插件', dataIndex: 'name' },
  { title: '版本', dataIndex: 'version' },
  { title: '状态', dataIndex: 'state' },
]

const TABLE_DATA = [
  { id: 'a', name: 'dsh-loader', version: '2.0.0', state: '运行中' },
  { id: 'b', name: 'dsh-ui-components', version: '0.1.0', state: '运行中' },
  { id: 'c', name: 'dsh-thought-buddy', version: '2.0.0', state: '已停用' },
]

const JSON_SAMPLE = {
  plugin: 'dsh-ui-components',
  version: '0.1.0',
  flags: { experimental: false, cacheable: true },
  dependencies: ['react', 'react-dom'],
  counts: { components: 60, icons: 2658 },
}

const SECTIONS: Section[] = [
  {
    id: 'buttons',
    title: '按钮',
    description: '四个层级、三档尺寸，主按钮走宿主的中性填充。',
    render: () => (
      <div className="preview-stack">
        <div className="preview-row">
          <Button variant="primary">保存配置</Button>
          <Button variant="secondary">取消</Button>
          <Button variant="outline">导出</Button>
          <Button variant="text">了解更多</Button>
          <Button variant="primary" danger>删除</Button>
          <Button variant="primary" disabled>不可用</Button>
        </div>
        <div className="preview-row">
          <Button size="sm" variant="primary">紧凑</Button>
          <Button size="md" variant="outline">标准</Button>
          <Button size="lg" variant="outline">大号</Button>
          <Button variant="outline" icon={<Icon name="Download" />}>下载</Button>
          <IconButton icon={<Icon name="Settings" />} label="设置" />
          <IconButton shape="circle" icon={<Icon name="Search" />} label="搜索" />
        </div>
      </div>
    ),
  },
  {
    id: 'inputs',
    title: '输入',
    description: '标准高 32、紧凑高 28；路径类字段可开等宽字体。',
    render: () => (
      <div className="preview-grid">
        <Field label="代理地址" description="仅影响走全局 fetch 的请求" htmlFor="preview-host">
          <Input id="preview-host" mono placeholder="127.0.0.1:7890" />
        </Field>
        <Field label="协议" htmlFor="preview-proto">
          <Select id="preview-proto" options={SELECT_OPTIONS} value="auto" />
        </Field>
        <Field label="模式" htmlFor="preview-mode">
          <MenuSelect id="preview-mode" label="模式" options={SELECT_OPTIONS} value="manual" />
        </Field>
        <Field label="备注" description="支持多行" htmlFor="preview-note">
          <Textarea id="preview-note" placeholder="写点什么" />
        </Field>
        <Field label="密钥" required error="不能为空" htmlFor="preview-key">
          <Input id="preview-key" invalid placeholder="sk-..." />
        </Field>
      </div>
    ),
  },
  {
    id: 'toggles',
    title: '选择控件',
    description: '开关用于即时生效的设置，复选框与单选框走原生表单语义。',
    render: () => (
      <div className="preview-stack">
        <div className="preview-row">
          <Switch defaultChecked />
          <Switch />
          <Switch defaultChecked disabled />
        </div>
        <div className="preview-row">
          <Checkbox defaultChecked label="启用缓存" />
          <Checkbox label="跟随系统" />
          <Radio defaultChecked label="自动" name="preview-radio" />
          <Radio label="手动" name="preview-radio" />
        </div>
        <div className="preview-row" style={{ maxWidth: 320 }}>
          <Slider defaultValue={40} />
        </div>
        <Rate defaultValue={3} />
      </div>
    ),
  },
  {
    id: 'labels',
    title: '标签与徽标',
    description: '八种色调的只读徽章，以及可选中胶囊。',
    render: () => (
      <div className="preview-stack">
        <div className="preview-row">
          {(['neutral', 'outline', 'solid', 'quiet', 'success', 'info', 'warning', 'danger'] as const).map(tone => (
            <Tag key={tone} tone={tone}>{tone}</Tag>
          ))}
        </div>
        <div className="preview-row">
          <Pill active>全部</Pill>
          <Pill>已启用</Pill>
          <Pill>已停用</Pill>
          <Pill icon={<Icon name="Add" size={12} />}>新建</Pill>
        </div>
        <div className="preview-row">
          <Avatar size={32}>DS</Avatar>
          <Badge count={3}><Avatar size={32}>UI</Avatar></Badge>
          <Badge dot><Avatar size={32}>CS</Avatar></Badge>
          <FileTypeBadge name="src/index.tsx" />
          <FileTypeBadge name="README.md" />
          <FileTypeBadge name="Makefile" />
        </div>
      </div>
    ),
  },
  {
    id: 'cards',
    title: '容器与设置页',
    description: 'SettingsCard 对应宿主设置页卡片，Card 用浮起描边阴影。',
    render: () => (
      <div className="preview-grid">
        <SettingsCard
          title="网络代理"
          description="只影响本插件发起的请求"
          footer={<Button variant="primary" size="sm">保存</Button>}
        >
          <SettingsRow label="启用代理" description="立即生效"><Switch defaultChecked /></SettingsRow>
          <SettingsRow label="地址" layout="stack"><Input mono placeholder="127.0.0.1:7890" /></SettingsRow>
        </SettingsCard>
        <Card title="插件详情" extra={<Tag tone="success">已安装</Tag>}>
          <Descriptions
            column={1}
            data={[
              { label: '版本', value: '0.1.0' },
              { label: '作者', value: 'dsh-plugins' },
            ]}
          />
        </Card>
        <Card variant="flat" title="扁平卡片">
          <Text>用极细边框代替阴影，适合嵌套在卡片内部。</Text>
        </Card>
      </div>
    ),
  },
  {
    id: 'feedback',
    title: '反馈',
    description: '提示条、进度、结果与状态行。',
    render: () => (
      <div className="preview-stack">
        <Alert type="info" content="配置保存后立即生效。" />
        <Alert type="warning" title="注意" content="修改密钥会中断正在运行的任务。" />
        <Alert type="success" title="已保存" content="配置已写入 profile。" closable />
        <Alert type="error" content="连接失败，请检查网络。" />
        <div style={{ maxWidth: 360 }}><Progress percent={62} /></div>
        <div className="preview-row">
          <StatusLine state="ongoing" time="12s">正在思考</StatusLine>
          <StatusLine state="done" time="3s">已完成</StatusLine>
          <StatusLine state="error" time="1s">执行失败</StatusLine>
          <StatusLine state="idle">等待中</StatusLine>
          <StateDot state="warning" />
        </div>
        <Steps current={1}>
          <Steps.Step title="选择目录" />
          <Steps.Step title="确认安装" />
          <Steps.Step title="完成" />
        </Steps>
      </div>
    ),
  },
  {
    id: 'navigation',
    title: '导航',
    description: '标签页、分段控件、面包屑与分页。',
    render: () => (
      <div className="preview-stack">
        <SegmentedControl
          items={[{ value: 'list', label: '列表' }, { value: 'grid', label: '网格' }, { value: 'tree', label: '树' }]}
          value="list"
          onChange={() => {}}
          label="视图"
        />
        <Tabs defaultActiveTab="a">
          <Tabs.TabPane key="a" title="常规">常规设置内容</Tabs.TabPane>
          <Tabs.TabPane key="b" title="高级">高级设置内容</Tabs.TabPane>
        </Tabs>
        <Tabs appearance="segment" defaultActiveTab="a">
          <Tabs.TabPane key="a" title="概要">概要内容</Tabs.TabPane>
          <Tabs.TabPane key="b" title="日志">日志内容</Tabs.TabPane>
        </Tabs>
        <Breadcrumb>
          <BreadcrumbItem>设置</BreadcrumbItem>
          <BreadcrumbItem>插件</BreadcrumbItem>
          <BreadcrumbItem>dsh-loader</BreadcrumbItem>
        </Breadcrumb>
        <Pagination total={80} pageSize={10} current={1} />
        <DisclosureRow title="思考过程" defaultExpanded>这里展开后是可折叠的内容。</DisclosureRow>
        <DisclosureRow title="工具调用" accessory={<Tag tone="quiet">2 次</Tag>} />
      </div>
    ),
  },
  {
    id: 'data',
    title: '数据',
    description: '表格、列表、JSON 树与代码壳。',
    render: () => (
      <div className="preview-stack">
        <Table rowKey="id" columns={TABLE_COLUMNS} data={TABLE_DATA} pagination={false} />
        <List
          dataSource={TABLE_DATA}
          render={(item: (typeof TABLE_DATA)[number]) => (
            <List.Item key={item.id}>
              {item.name} · {item.version}
            </List.Item>
          )}
        />
        <div className="preview-grid">
          <JsonTree value={JSON_SAMPLE} />
          <CodeBlockShell language="ts" actions={<Button size="sm" variant="text">复制</Button>}>
            <pre>{`const value = { theme: 'dsh' }`}</pre>
          </CodeBlockShell>
        </div>
        <div className="preview-row">
          <Statistic title="组件数" value={60} />
          <Statistic title="图标数" value={2658} />
        </div>
        <Timeline>
          <Timeline.Item label="19:00">安装完成</Timeline.Item>
          <Timeline.Item label="19:05">已启用</Timeline.Item>
        </Timeline>
      </div>
    ),
  },
  {
    id: 'typography',
    title: '排版与占位',
    description: '标题层级、行内文本与加载占位。',
    render: () => (
      <div className="preview-stack">
        <Typography>
          <h1>一级标题</h1>
          <h2>二级标题</h2>
          <Paragraph>
            正文段落，含 <Text type="success">成功</Text>、<Text type="warning">警告</Text> 与
            <Text type="error">错误</Text> 三种行内语义。
          </Paragraph>
          <blockquote>引用块使用左侧细线与次要文字色。</blockquote>
        </Typography>
        <Divider />
        <div className="preview-grid">
          <Skeleton animation />
          <Empty description="暂无插件" />
          <div className="preview-row"><Spin size={20} /><Text>加载中</Text></div>
        </div>
      </div>
    ),
  },
  {
    id: 'overlays',
    title: '浮层',
    description: '弹窗与面板外壳自带 120px 上下留白与内部滚动。',
    render: () => <OverlayDemo />,
  },
  {
    id: 'icons',
    title: '图标',
    description: '策划命名集与全量元数据索引。',
    render: () => <IconDemo />,
  },
]

/** 浮层示例，用状态控制展开。 */
function OverlayDemo(): React.ReactElement {
  const [modalOpen, setModalOpen] = React.useState(false)
  const [panelOpen, setPanelOpen] = React.useState(false)
  return (
    <div className="preview-stack">
      <div className="preview-row">
        <Button variant="outline" onClick={() => setModalOpen(true)}>打开弹窗</Button>
        <Button variant="outline" onClick={() => setPanelOpen(true)}>打开面板</Button>
        <Tooltip content="这是一条短提示"><Button variant="text">悬停提示</Button></Tooltip>
      </div>
      <Modal
        visible={modalOpen}
        title="确认删除"
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalOpen(false)}>取消</Button>,
          <Button key="ok" variant="primary" danger onClick={() => setModalOpen(false)}>删除</Button>,
        ]}
      >
        <Paragraph>删除后不可恢复，配置将同时从 profile 中移除。</Paragraph>
      </Modal>
      {panelOpen ? (
        <PanelShell
          title="插件详情"
          closeLabel="关闭面板"
          onClose={() => setPanelOpen(false)}
          footer={<Button variant="primary" onClick={() => setPanelOpen(false)}>知道了</Button>}
        >
          <JsonTree value={JSON_SAMPLE} />
        </PanelShell>
      ) : null}
    </div>
  )
}

/** 图标示例，带搜索。 */
function IconDemo(): React.ReactElement {
  const [query, setQuery] = React.useState('')
  const [loaded, setLoaded] = React.useState<Record<string, React.ComponentType<{ size?: number }>>>({})
  const matches = React.useMemo(() => {
    const trimmed = query.trim().toLowerCase()
    if (trimmed === '') return ICON_INDEX.slice(0, 36)
    return ICON_INDEX.filter(
      entry =>
        entry.name.includes(trimmed) ||
        entry.pascal.toLowerCase().includes(trimmed) ||
        entry.titleZh.includes(query.trim()) ||
        entry.tags.some(tag => tag.includes(query.trim())),
    ).slice(0, 36)
  }, [query])

  // 演示站按需加载当前可见的图标模块。正式插件应改为静态导入，让打包器
  // 只保留实际用到的图标；这里的懒加载只是为了让预览页能展示全量索引。
  React.useEffect(() => {
    let cancelled = false
    const missing = matches.filter(entry => loaded[entry.pascal] === undefined)
    if (missing.length === 0) return undefined
    void Promise.all(
      missing.map(async entry => {
        const loader = ICON_MODULES[`../../src/icons/${entry.pascal}.ts`]
        if (loader === undefined) return [entry.pascal, null] as const
        const module = (await loader()) as { default: React.ComponentType<{ size?: number }> }
        return [entry.pascal, module.default] as const
      }),
    ).then(entries => {
      if (cancelled) return
      setLoaded(previous => {
        const next = { ...previous }
        for (const [pascal, component] of entries) {
          if (component !== null) next[pascal] = component
        }
        return next
      })
    })
    return () => {
      cancelled = true
    }
  }, [matches, loaded])

  return (
    <div className="preview-stack">
      <div className="preview-row">
        <Text type="secondary">策划命名集共 {Object.keys(Icons).length} 个，元数据索引共 {ICON_INDEX.length} 个。</Text>
      </div>
      <div className="preview-row">
        {(Object.keys(Icons) as Array<keyof typeof Icons>).slice(0, 24).map(name => {
          const Curated = Icons[name]
          return (
            <Tooltip key={name} content={name}>
              <IconButton icon={<Curated />} label={name} />
            </Tooltip>
          )
        })}
      </div>
      <Input value={query} onChange={setQuery} placeholder="按名称、中文标题或标签搜索图标" allowClear />
      <div className="preview-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))' }}>
        {matches.map(entry => {
          const LoadedIcon = loaded[entry.pascal]
          return (
            <div className="preview-icon-cell" key={entry.pascal}>
              {LoadedIcon === undefined ? <span style={{ width: 18, height: 18 }} /> : <LoadedIcon size={18} />}
              <span>{entry.titleZh || entry.name}</span>
            </div>
          )
        })}
      </div>
      {matches.length === 0 ? <Empty description="没有匹配的图标" /> : null}
    </div>
  )
}

/**
 * 全部图标模块的懒加载器，键是相对路径。
 *
 * 演示站独有：它把 2658 个图标按需加载，正式插件不应照搬这一写法。
 */
const ICON_MODULES = import.meta.glob('../../src/icons/*.ts') as Record<
  string,
  () => Promise<{ default: React.ComponentType<{ size?: number }> }>
>

/** 演示站根组件。 */
export function App(): React.ReactElement {
  const [dark, setDark] = React.useState(false)

  React.useEffect(() => {
    if (dark) document.body.setAttribute('data-ds-dark-theme', '')
    else document.body.removeAttribute('data-ds-dark-theme')
    return () => document.body.removeAttribute('data-ds-dark-theme')
  }, [dark])

  return (
    <DshProvider>
      <div className="preview-shell">
        <nav className="preview-nav">
          <h1 className="preview-nav__title">dsh-ui-components</h1>
          {SECTIONS.map(section => (
            <a key={section.id} className="preview-nav__link" href={`#${section.id}`}>{section.title}</a>
          ))}
        </nav>
        <main className="preview-main">
          <div className="preview-toolbar">
            <Text type="secondary">深色主题随宿主 body 属性切换</Text>
            <div className="preview-row">
              <Text type="secondary">{dark ? '深色' : '浅色'}</Text>
              <Switch checked={dark} onChange={setDark} />
            </div>
          </div>
          {SECTIONS.map(section => (
            <section className="preview-section" id={section.id} key={section.id}>
              <h2 className="preview-section__title">{section.title}</h2>
              <p className="preview-section__desc">{section.description}</p>
              {section.render()}
            </section>
          ))}
        </main>
      </div>
    </DshProvider>
  )
}

import * as React from 'react'
import {
  Alert, Avatar, Breadcrumb, BreadcrumbItem, Button, Card, Checkbox, Collapse, CollapseItem,
  DshProvider, Input, Modal, Progress, Radio, RadioGroup, Select, Skeleton, Slider, Switch,
  Table, Tabs, Tag, Textarea, Tooltip,
} from '../../src/index.js'
import cases from '../comparison/cases.json'
import '../comparison/fixture.css'

const samples: Record<string, React.ReactNode> = {
  'button-primary': <div className="comparison-row">
    <Button variant="primary" size="sm">保存</Button>
    <Button variant="primary" size="md">保存</Button>
    <Button variant="primary" size="lg">保存</Button>
  </div>,
  'button-variants': <div className="comparison-row">
    <Button variant="secondary">操作</Button>
    <Button variant="outline">操作</Button>
    <Button variant="text">操作</Button>
  </div>,
  'button-danger': <Button variant="primary" danger>删除</Button>,
  'button-disabled': <Button disabled>不可用</Button>,
  input: <Input className="comparison-wide" placeholder="输入名称" aria-label="名称" />,
  textarea: <Textarea className="comparison-wide" defaultValue="工作区说明" aria-label="工作区说明" />,
  checkbox: <Checkbox defaultChecked label="启用缓存" />,
  radio: <RadioGroup defaultValue="auto" direction="vertical" aria-label="运行模式">
    <Radio value="auto" label="自动" />
    <Radio value="manual" label="手动" />
  </RadioGroup>,
  switch: <Switch defaultChecked aria-label="启用通知" />,
  slider: <Slider className="comparison-wide" defaultValue={64} min={0} max={100} />,
  select: <Select className="comparison-wide" value="balanced" options={[
    { value: 'fast', label: '快速' },
    { value: 'balanced', label: '均衡' },
    { value: 'deep', label: '深入' },
  ]} />,
  card: <Card className="comparison-wide" title="工作区">配置已保存。</Card>,
  chip: <Tag tone="success">已启用</Tag>,
  avatar: <Avatar>DS</Avatar>,
  tabs: <Tabs className="comparison-wide" defaultActiveTab="overview">
    <Tabs.TabPane key="overview" title="概要" />
    <Tabs.TabPane key="logs" title="日志" />
    <Tabs.TabPane key="settings" title="设置" />
  </Tabs>,
  progress: <Progress className="comparison-wide" percent={62} showText={false} />,
  alert: <Alert className="comparison-wide" type="success" title="已保存" content="配置已写入工作区。" />,
  accordion: <Collapse className="comparison-wide" defaultActiveKey={[]}>
    <CollapseItem name="workspace" header="工作区设置">主题与通知选项</CollapseItem>
  </Collapse>,
  table: <Table className="comparison-wide" rowKey="name" pagination={false} columns={[
    { title: '名称', dataIndex: 'name' },
    { title: '状态', dataIndex: 'state' },
  ]} data={[
    { name: '主题', state: '已启用' },
    { name: '通知', state: '已启用' },
  ]} />,
  skeleton: <Skeleton className="comparison-wide" text={false} image={{ style: { width: 280, height: 48 } }} />,
  breadcrumb: <Breadcrumb><BreadcrumbItem>工作区</BreadcrumbItem><BreadcrumbItem>设置</BreadcrumbItem></Breadcrumb>,
  tooltip: <Tooltip content="主题与通知选项"><Button>查看提示</Button></Tooltip>,
}

/** 固定样本页保留 React 组件默认外观，供官方 HeroUI 与 Vue 实现逐项比较。 */
export function Comparison(): React.ReactElement {
  const query = new URLSearchParams(window.location.search)
  const theme = query.get('theme') === 'dark' ? 'dark' : 'light'
  const [modalOpen, setModalOpen] = React.useState(query.get('state') === 'modal')

  return <DshProvider theme={theme} reducedMotion>
    <main id="comparison" className="comparison" data-theme={theme}>
      <h1 className="comparison-heading">组件像素对照</h1>
      <p className="comparison-note">默认组件样式 · 相同内容与画布</p>
      <div className="comparison-grid">
        {(cases as Array<[string, string]>).map(([id, label]) => <section key={id} className="comparison-case" data-case={id}>
          <h2 className="comparison-label">{label}</h2>
          <div className="comparison-sample" data-sample={id}>{samples[id]}</div>
        </section>)}
      </div>
      <Modal visible={modalOpen} title="工作区设置" onCancel={() => setModalOpen(false)} footer={<>
        <Button onClick={() => setModalOpen(false)}>取消</Button>
        <Button variant="primary" onClick={() => setModalOpen(false)}>保存</Button>
      </>}>
        主题与通知选项
      </Modal>
    </main>
  </DshProvider>
}

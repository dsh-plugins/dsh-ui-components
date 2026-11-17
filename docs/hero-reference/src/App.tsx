import { useState, type ReactNode } from 'react'
import {
  Accordion, Alert, Avatar, Breadcrumbs, Button, Card, Checkbox, Chip, Input,
  Label, ListBox, Modal, ProgressBar, Radio, RadioGroup, Select, Skeleton,
  Slider, Switch, Table, Tabs, TextArea, Tooltip,
} from '@heroui/react'
import cases from '.././cases.json'

function sample(id: string): ReactNode {
  switch (id) {
    case 'button-primary':
      return <div className="comparison-row"><Button size="sm">保存</Button><Button size="md">保存</Button><Button size="lg">保存</Button></div>
    case 'button-variants':
      return <div className="comparison-row"><Button variant="secondary">操作</Button><Button variant="outline">操作</Button><Button variant="ghost">操作</Button></div>
    case 'button-danger':
      return <Button variant="danger">删除</Button>
    case 'button-disabled':
      return <Button isDisabled>不可用</Button>
    case 'input':
      return <Input aria-label="名称" placeholder="输入名称" className="comparison-wide" />
    case 'textarea':
      return <TextArea aria-label="说明" defaultValue="工作区说明" className="comparison-wide" />
    case 'checkbox':
      return <Checkbox defaultSelected><Checkbox.Content><Checkbox.Control><Checkbox.Indicator /></Checkbox.Control><Label>启用缓存</Label></Checkbox.Content></Checkbox>
    case 'radio':
      return <RadioGroup aria-label="运行方式" defaultValue="auto" orientation="vertical">
        <Radio value="auto"><Radio.Content><Radio.Control><Radio.Indicator /></Radio.Control><Label>自动</Label></Radio.Content></Radio>
        <Radio value="manual"><Radio.Content><Radio.Control><Radio.Indicator /></Radio.Control><Label>手动</Label></Radio.Content></Radio>
      </RadioGroup>
    case 'switch':
      return <Switch defaultSelected aria-label="启用通知"><Switch.Content><Switch.Control><Switch.Thumb /></Switch.Control></Switch.Content></Switch>
    case 'slider':
      return <Slider aria-label="数值" defaultValue={64} minValue={0} maxValue={100} className="comparison-wide"><Slider.Track><Slider.Fill /><Slider.Thumb /></Slider.Track></Slider>
    case 'select':
      return <Select aria-label="运行模式" defaultSelectedKey="balanced" className="comparison-wide">
        <Select.Trigger><Select.Value /><Select.Indicator /></Select.Trigger>
        <Select.Popover><ListBox>
          <ListBox.Item id="fast" textValue="快速">快速</ListBox.Item>
          <ListBox.Item id="balanced" textValue="均衡">均衡</ListBox.Item>
          <ListBox.Item id="quality" textValue="深入">深入</ListBox.Item>
        </ListBox></Select.Popover>
      </Select>
    case 'card':
      return <Card className="comparison-wide"><Card.Header><Card.Title>工作区</Card.Title></Card.Header><Card.Content>配置已保存。</Card.Content></Card>
    case 'chip':
      return <Chip color="success">已启用</Chip>
    case 'avatar':
      return <Avatar><Avatar.Fallback>DS</Avatar.Fallback></Avatar>
    case 'tabs':
      return <Tabs defaultSelectedKey="overview" className="comparison-wide"><Tabs.List aria-label="页面">
        <Tabs.Tab id="overview">概要<Tabs.Indicator /></Tabs.Tab>
        <Tabs.Tab id="logs">日志<Tabs.Indicator /></Tabs.Tab>
        <Tabs.Tab id="settings">设置<Tabs.Indicator /></Tabs.Tab>
      </Tabs.List></Tabs>
    case 'progress':
      return <ProgressBar value={62} aria-label="完成进度" className="comparison-wide"><ProgressBar.Track><ProgressBar.Fill /></ProgressBar.Track></ProgressBar>
    case 'alert':
      return <Alert status="success" className="comparison-wide"><Alert.Indicator /><Alert.Content><Alert.Title>已保存</Alert.Title><Alert.Description>配置已写入工作区。</Alert.Description></Alert.Content></Alert>
    case 'accordion':
      return <Accordion className="comparison-wide"><Accordion.Item id="workspace"><Accordion.Heading><Accordion.Trigger>工作区设置<Accordion.Indicator /></Accordion.Trigger></Accordion.Heading><Accordion.Panel><Accordion.Body>主题与通知选项</Accordion.Body></Accordion.Panel></Accordion.Item></Accordion>
    case 'table':
      return <Table className="comparison-wide"><Table.ScrollContainer><Table.Content aria-label="工作区配置">
        <Table.Header><Table.Column isRowHeader>名称</Table.Column><Table.Column>状态</Table.Column></Table.Header>
        <Table.Body><Table.Row id="theme"><Table.Cell>主题</Table.Cell><Table.Cell>已启用</Table.Cell></Table.Row><Table.Row id="notification"><Table.Cell>通知</Table.Cell><Table.Cell>已启用</Table.Cell></Table.Row></Table.Body>
      </Table.Content></Table.ScrollContainer></Table>
    case 'skeleton':
      return <Skeleton className="comparison-wide" style={{ height: 48 }} />
    case 'breadcrumb':
      return <Breadcrumbs><Breadcrumbs.Item href="#workspace">工作区</Breadcrumbs.Item><Breadcrumbs.Item>设置</Breadcrumbs.Item></Breadcrumbs>
    case 'tooltip':
      return <Tooltip><Button>查看提示</Button><Tooltip.Content>主题与通知选项</Tooltip.Content></Tooltip>
    default:
      throw new Error(`未定义的组件对照样本：${id}`)
  }
}

/** 使用官方组件默认视觉，读取共享样本顺序与固定画布。 */
export function App({ theme, showModal }: { theme: 'light' | 'dark'; showModal: boolean }) {
  const [modalOpen, setModalOpen] = useState(showModal)
  return <>
    <main id="comparison" className="comparison" data-theme={theme}>
      <h1 className="comparison-heading">组件像素对照</h1>
      <p className="comparison-note">默认组件样式 · 相同内容与画布</p>
      <div className="comparison-grid">
        {cases.map(([id, label]) => <section key={id} className="comparison-case" data-case={id}>
          <h2 className="comparison-label">{label}</h2>
          <div className="comparison-sample" data-sample={id}>{sample(id)}</div>
        </section>)}
      </div>
    </main>
    <Modal isOpen={modalOpen} onOpenChange={setModalOpen}>
      <Modal.Backdrop><Modal.Container><Modal.Dialog>
        <Modal.CloseTrigger />
        <Modal.Header><Modal.Heading>工作区设置</Modal.Heading></Modal.Header>
        <Modal.Body>主题与通知选项</Modal.Body>
        <Modal.Footer><Button variant="secondary" onPress={() => setModalOpen(false)}>取消</Button><Button onPress={() => setModalOpen(false)}>保存</Button></Modal.Footer>
      </Modal.Dialog></Modal.Container></Modal.Backdrop>
    </Modal>
  </>
}

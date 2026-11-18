import * as React from 'react'
import {
  Alert,
  Badge,
  Button,
  Card,
  CodeBlockShell,
  Field,
  FileTypeBadge,
  IconButton,
  Input,
  JsonTree,
  MenuSelect,
  Pill,
  SettingsCard,
  SettingsRow,
  StatusLine,
  Switch,
  Tag,
} from '@dsh-plugin/dsh-ui-components'

export function ButtonReactDemo() {
  const variants = ['primary', 'secondary', 'outline', 'text'] as const
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
      {variants.map((v) => (
        <Button key={v} variant={v}>
          {v}
        </Button>
      ))}
      <Button variant="primary" danger>
        danger
      </Button>
      <IconButton icon={<span>+</span>} label="新建" />
    </div>
  )
}

export function InputFieldReactDemo() {
  const [val, setVal] = React.useState('DSH React Workspace')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 380 }}>
      <Field label="工作区名称" htmlFor="react-ws-name" description="React 版采用 Field + Input 组合">
        <Input id="react-ws-name" value={val} onChange={(v: string) => setVal(v)} placeholder="输入名称" />
      </Field>
    </div>
  )
}

export function CardTagReactDemo() {
  return (
    <Card title="DSH React 卡片" extra={<Pill>v0.0.1</Pill>}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <Tag tone="info">HeroUI 风格</Tag>
        <Tag tone="success">已连接</Tag>
        <Badge count={5}>
          <Button variant="outline" size="sm">通知</Button>
        </Badge>
      </div>
    </Card>
  )
}

export function AlertReactDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Alert type="info" title="提示" content="React 版通过 DshProvider 同步宿主或系统明暗主题。" />
      <Alert type="success" title="就绪" content="所有 Arco 原生能力与 DSH 组合件均可用。" />
    </div>
  )
}

export function CompositesReactDemo() {
  const [mode, setMode] = React.useState('balanced')
  const [autoSave, setAutoSave] = React.useState(true)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <SettingsCard title="运行策略" description="DSH 专属复合设置卡片">
        <SettingsRow label="推理模式" description="选择默认响应速度与质量平衡">
          <MenuSelect
            value={mode}
            onChange={setMode}
            options={[
              { value: 'fast', label: '快速模式' },
              { value: 'balanced', label: '均衡模式' },
              { value: 'deep', label: '深度分析' },
            ]}
          />
        </SettingsRow>
        <SettingsRow label="自动保存" description="编辑后自动持久化配置">
          <Switch checked={autoSave} onChange={setAutoSave} />
        </SettingsRow>
      </SettingsCard>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <FileTypeBadge name="index.tsx" />
        <FileTypeBadge name="config.json" />
        <StatusLine state="done" time="12ms">服务运行中</StatusLine>
      </div>

      <CodeBlockShell language="ts">
        <pre style={{ margin: 0 }}>{`import { DshProvider, Button } from '@dsh-plugin/dsh-ui-components'`}</pre>
      </CodeBlockShell>
      <JsonTree value={{ package: '@dsh-plugin/dsh-ui-components', framework: 'react', arco: true }} />
    </div>
  )
}

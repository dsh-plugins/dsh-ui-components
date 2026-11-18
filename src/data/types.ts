import type { Component } from 'vue'
import type { ComponentType } from 'react'
import type { ApiRow } from '../components/ApiTable.vue'

export interface ApiSection {
  id: string
  title: string
  description?: string
  kind?: 'props' | 'events' | 'slots' | 'methods'
  framework?: 'vue' | 'react' | 'both'
  rows: ApiRow[]
}

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
  apiSections?: ApiSection[]
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

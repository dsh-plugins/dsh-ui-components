<script setup lang="ts">
import { ref } from 'vue'
import * as UI from '../../src/index'
import casesText from '../comparison/cases.json?raw'
import ComparisonPanel from './ComparisonPanel.vue'

const parameters = new URLSearchParams(window.location.search)
const theme = parameters.get('theme') === 'dark' ? 'dark' : 'light'
const panel = parameters.get('panel')
const cases: [string, string][] = JSON.parse(casesText)
const modal = ref(parameters.get('state') === 'modal')
const sizes = ['sm', 'md', 'lg'] as const
const variants = ['secondary', 'outline', 'ghost'] as const
const options = [
  { value: 'fast', label: '快速' },
  { value: 'balanced', label: '均衡' },
  { value: 'deep', label: '深入' },
]
const columns = [{ title: '名称', dataIndex: 'name' }, { title: '状态', dataIndex: 'status' }]
const rows = [
  { key: 'theme', name: '主题', status: '已启用' },
  { key: 'notification', name: '通知', status: '已启用' },
]
</script>

<template>
  <ComparisonPanel v-if="panel" :panel="panel" :theme="theme" />
  <UI.DshProvider v-else :theme="theme" :reduced-motion="true">
    <main id="comparison" class="comparison" :data-theme="theme">
      <h1 class="comparison-heading">组件像素对照</h1>
      <p class="comparison-note">默认组件样式 · 相同内容与画布</p>
      <div class="comparison-grid">
        <section v-for="[id, label] in cases" :key="id" class="comparison-case" :data-case="id">
          <h2 class="comparison-label">{{ label }}</h2>
          <div class="comparison-sample" :data-sample="id">
            <template v-if="id === 'button-primary'">
              <UI.Button v-for="size in sizes" :key="size" :size="size">保存</UI.Button>
            </template>
            <template v-else-if="id === 'button-variants'">
              <UI.Button v-for="variant in variants" :key="variant" :variant="variant">操作</UI.Button>
            </template>
            <UI.Button v-else-if="id === 'button-danger'" variant="danger">删除</UI.Button>
            <UI.Button v-else-if="id === 'button-disabled'" disabled>不可用</UI.Button>
            <UI.Input v-else-if="id === 'input'" class="comparison-wide" placeholder="输入名称" aria-label="名称" />
            <UI.Textarea v-else-if="id === 'textarea'" class="comparison-wide" default-value="工作区说明" aria-label="工作区说明" />
            <UI.Checkbox v-else-if="id === 'checkbox'" :default-checked="true">启用缓存</UI.Checkbox>
            <UI.RadioGroup v-else-if="id === 'radio'" default-value="auto" direction="vertical" aria-label="运行模式">
              <UI.Radio value="auto">自动</UI.Radio>
              <UI.Radio value="manual">手动</UI.Radio>
            </UI.RadioGroup>
            <UI.Switch v-else-if="id === 'switch'" :default-checked="true" aria-label="启用通知" />
            <UI.Slider v-else-if="id === 'slider'" class="comparison-wide" :default-value="64" :min="0" :max="100" aria-label="进度" />
            <UI.Select v-else-if="id === 'select'" class="comparison-wide" default-value="balanced" :options="options" aria-label="运行模式" />
            <UI.Card v-else-if="id === 'card'" class="comparison-wide" title="工作区">配置已保存。</UI.Card>
            <UI.Tag v-else-if="id === 'chip'" color="green">已启用</UI.Tag>
            <UI.Avatar v-else-if="id === 'avatar'">DS</UI.Avatar>
            <UI.Tabs v-else-if="id === 'tabs'" class="comparison-wide" default-active-key="overview">
              <UI.TabPane key="overview" title="概要" />
              <UI.TabPane key="logs" title="日志" />
              <UI.TabPane key="settings" title="设置" />
            </UI.Tabs>
            <UI.Progress v-else-if="id === 'progress'" class="comparison-wide" :percent="0.62" :show-text="false" />
            <UI.Alert v-else-if="id === 'alert'" class="comparison-wide" type="success" title="已保存">配置已写入工作区。</UI.Alert>
            <UI.Collapse v-else-if="id === 'accordion'" class="comparison-wide">
              <UI.CollapseItem key="settings" header="工作区设置">主题与通知选项</UI.CollapseItem>
            </UI.Collapse>
            <UI.Table v-else-if="id === 'table'" class="comparison-wide" :columns="columns" :data="rows" :pagination="false" />
            <UI.Skeleton v-else-if="id === 'skeleton'" class="comparison-wide" :animation="false">
              <UI.SkeletonShape shape="square" :style="{ width: '100%', height: '48px' }" />
            </UI.Skeleton>
            <UI.Breadcrumb v-else-if="id === 'breadcrumb'">
              <UI.BreadcrumbItem>工作区</UI.BreadcrumbItem>
              <UI.BreadcrumbItem>设置</UI.BreadcrumbItem>
            </UI.Breadcrumb>
            <UI.Tooltip v-else-if="id === 'tooltip'" content="工作区提示">
              <UI.Button>查看提示</UI.Button>
            </UI.Tooltip>
          </div>
        </section>
      </div>
    </main>
    <UI.Modal v-model:visible="modal" title="工作区设置">
      主题与通知选项
      <template #footer>
        <UI.Button variant="secondary" @click="modal = false">取消</UI.Button>
        <UI.Button @click="modal = false">保存</UI.Button>
      </template>
    </UI.Modal>
  </UI.DshProvider>
</template>

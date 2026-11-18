<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button, Tag } from '@dsh-plugin/dsh-ui-components-vue'
import DocsLayout from '../layout/DocsLayout.vue'
import { docsState } from '../state/docs-state'

const router = useRouter()
</script>

<template>
  <DocsLayout :show-sidebar="false">
    <section class="home-hero">
      <div class="home-eyebrow">
        <span>DSH UI Components</span>
        <Tag color="blue">{{ docsState.framework === 'vue' ? 'Vue 3' : 'React 18' }}</Tag>
      </div>
      <h1 class="home-title">
        基于 Arco Design，<br />融入 HeroUI 视觉语言
      </h1>
      <p class="home-subtitle">
        为 DSH 生态提供覆盖 Arco Design 全部交互组件、HeroUI 柔和层次与圆角焦点环的
        Vue 与 React 双端组件库。支持独立作用域主题、无障碍键盘导航与按需图标。
      </p>
      <div class="home-actions">
        <Button size="lg" @click="router.push('/guide/quick-start')">开始使用</Button>
        <Button size="lg" variant="outline" @click="router.push('/components')">浏览全部组件</Button>
      </div>
    </section>

    <section class="home-grid">
      <div class="home-feature-card">
        <h3>Vue & React 双栈支持</h3>
        <p>
          <code>@dsh-plugin/dsh-ui-components-vue</code> 基于 Arco Design Vue；
          <code>@dsh-plugin/dsh-ui-components</code> 基于 Arco Design React 与 DSH Loader。
        </p>
      </div>
      <div class="home-feature-card">
        <h3>HeroUI 视觉层级</h3>
        <p>
          统一 Surface 表面色、五档圆角、柔和阴影、焦点环与按钮/输入交互状态，开箱即用。
        </p>
      </div>
      <div class="home-feature-card">
        <h3>作用域主题隔离</h3>
        <p>
          <code>DshProvider</code> 自动管理浅色/深色/宿主主题及 body 浮层容器，多实例互不干扰。
        </p>
      </div>
      <div class="home-feature-card">
        <h3>全量组件与补充件</h3>
        <p>
          完整导出 Arco 全部组件及子组件，并补充 TextField、InputOTP、ListBox、Toolbar、ScrollShadow 等高频组件。
        </p>
      </div>
    </section>
  </DocsLayout>
</template>

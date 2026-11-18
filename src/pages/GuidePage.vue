<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DocsLayout from '../layout/DocsLayout.vue'
import AnchorToc from '../components/AnchorToc.vue'
import { docsState } from '../state/docs-state'

const route = useRoute()
const section = computed(() => String(route.params.section || 'quick-start'))

const pageTitle = computed(() => {
  if (section.value === 'theme') return '主题与 DshProvider'
  if (section.value === 'coverage') return '组件覆盖与迁移'
  return '快速开始'
})

const tocItems = computed(() => {
  if (section.value === 'theme') {
    return [
      { id: 'theme-provider', label: 'DshProvider 配置' },
      { id: 'theme-overlays', label: '作用域浮层与 Toast' },
      { id: 'theme-tokens', label: 'CSS 变量定制' },
    ]
  }
  if (section.value === 'coverage') {
    return [
      { id: 'coverage-rules', label: '覆盖规则' },
      { id: 'coverage-extra', label: '补充组件清单' },
    ]
  }
  return [
    { id: 'install', label: '安装依赖' },
    { id: 'usage', label: '基础示例' },
  ]
})
</script>

<template>
  <DocsLayout>
    <main class="docs-main">
      <div class="docs-page-header">
        <div class="docs-page-category">开发指南</div>
        <h1 class="docs-page-title">{{ pageTitle }}</h1>
      </div>

      <template v-if="section === 'quick-start'">
        <section id="install" class="demo-block" style="padding: 24px">
          <h2 style="margin-top: 0">1. 安装依赖（pnpm）</h2>
          <p v-if="docsState.framework === 'vue'">
            Vue 3 项目安装 <code>@dsh-plugin/dsh-ui-components-vue</code>：
          </p>
          <p v-else>
            React 18 项目安装 <code>@dsh-plugin/dsh-ui-components</code>：
          </p>
          <div class="demo-code" style="border-radius: 8px; border: 1px solid var(--docs-border)">
            <pre><code>{{ docsState.framework === 'vue' ? 'pnpm add @dsh-plugin/dsh-ui-components-vue' : 'pnpm add @dsh-plugin/dsh-ui-components' }}</code></pre>
          </div>
        </section>

        <section id="usage" class="demo-block" style="padding: 24px">
          <h2 style="margin-top: 0">2. 引入并使用</h2>
          <div class="demo-code" style="border-radius: 8px; border: 1px solid var(--docs-border)">
            <pre v-if="docsState.framework === 'vue'"><code>&lt;script setup lang="ts"&gt;
import { DshProvider, Button, Input } from '@dsh-plugin/dsh-ui-components-vue'
import '@dsh-plugin/dsh-ui-components-vue/style.css'
&lt;/script&gt;

&lt;template&gt;
  &lt;DshProvider theme="auto" radius="md"&gt;
    &lt;Input placeholder="输入内容" /&gt;
    &lt;Button variant="primary"&gt;提交&lt;/Button&gt;
  &lt;/DshProvider&gt;
&lt;/template&gt;</code></pre>
            <pre v-else><code>import { DshProvider, Button, Field, Input } from '@dsh-plugin/dsh-ui-components'

export function App() {
  return (
    &lt;DshProvider theme="host" radius="md"&gt;
      &lt;Field label="名称" htmlFor="name"&gt;
        &lt;Input id="name" placeholder="输入内容" /&gt;
      &lt;/Field&gt;
      &lt;Button variant="primary"&gt;提交&lt;/Button&gt;
    &lt;/DshProvider&gt;
  )
}</code></pre>
          </div>
        </section>
      </template>

      <template v-else-if="section === 'theme'">
        <section id="theme-provider" class="demo-block" style="padding: 24px">
          <h2 style="margin-top: 0">DshProvider 配置</h2>
          <p>
            <code>DshProvider</code> 支持 <code>theme="auto|light|dark"</code>（React 版支持 <code>host|system|light|dark</code>）、
            <code>radius="none|sm|md|lg|full"</code>、<code>reducedMotion</code>、<code>locale</code> 与 <code>rtl</code>。
            你可以在页面顶部栏实时切换主题与圆角，观察全站组件的变化。
          </p>
        </section>
        <section id="theme-overlays" class="demo-block" style="padding: 24px">
          <h2 style="margin-top: 0">作用域浮层与 Toast</h2>
          <p>
            所有带浮层的组件（Modal、Drawer、Select、Dropdown、Tooltip 等）应置于 <code>DshProvider</code> 内。
            每个 Provider 拥有独立的 body 浮层容器，自动复制根元素的 CSS 变量并在卸载时回收。
          </p>
        </section>
        <section id="theme-tokens" class="demo-block" style="padding: 24px">
          <h2 style="margin-top: 0">CSS 变量定制</h2>
          <p>
            在 <code>DshProvider</code> 的 <code>style</code> 中覆盖 <code>--dsh-accent</code>、<code>--dsh-surface</code>、<code>--dsh-radius</code>
            等变量即可实现局部主题定制。
          </p>
        </section>
      </template>

      <template v-else>
        <section id="coverage-rules" class="demo-block" style="padding: 24px">
          <h2 style="margin-top: 0">覆盖规则</h2>
          <p>
            根入口完整覆盖 <code>@arco-design/web-vue</code> / <code>@arco-design/web-react</code> 全部组件及子组件，
            同时保留 <code>Arco</code> 命名空间以便直接调用原生 API。
          </p>
        </section>
        <section id="coverage-extra" class="demo-block" style="padding: 24px">
          <h2 style="margin-top: 0">补充组件清单</h2>
          <p>
            Vue 版补充：<code>Surface</code>、<code>Header</code>、<code>Label</code>、<code>Description</code>、<code>FieldError</code>、
            <code>Fieldset</code>、<code>TextField</code>、<code>SearchField</code>、<code>InputOTP</code>、<code>Kbd</code>、
            <code>ListBox</code>、<code>ToggleButton</code>、<code>ToggleButtonGroup</code>、<code>Toolbar</code>、<code>TagGroup</code>、<code>ScrollShadow</code>、
            <code>ProgressBar</code>、<code>ProgressCircle</code>、<code>Meter</code>。
          </p>
          <p>
            React 版额外补充 DSH 复合组件：<code>PanelShell</code>、<code>SettingsCard</code>、<code>SettingsRow</code>、
            <code>MenuSelect</code>、<code>CodeBlockShell</code>、<code>JsonTree</code>、<code>FileTypeBadge</code>、<code>StatusLine</code>。
          </p>
        </section>
      </template>
    </main>
    <AnchorToc :items="tocItems" />
  </DocsLayout>
</template>

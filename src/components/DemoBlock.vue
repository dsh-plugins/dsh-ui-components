<script setup lang="ts">
import { computed, ref, type Component } from 'vue'
import type { ComponentType } from 'react'
import { DshProvider } from '@dsh-plugin/dsh-ui-components-vue'
import hljs from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/xml'
import typescript from 'highlight.js/lib/languages/typescript'
import 'highlight.js/styles/github-dark-dimmed.min.css'
import { docsState } from '../state/docs-state'
import ReactMount from './ReactMount.vue'

hljs.registerLanguage('xml', xml)
hljs.registerLanguage('typescript', typescript)

const props = defineProps<{
  id?: string
  title: string
  description?: string
  vueComponent?: Component
  reactComponent?: ComponentType<any>
  vueCode?: string
  reactCode?: string
  frameworks?: ('vue' | 'react')[]
  provideVueTheme?: boolean
}>()

const codeVisible = ref(false)
const copied = ref(false)

const isFallbackToVue = computed(
  () => docsState.framework === 'react' && !props.reactComponent && Boolean(props.vueComponent)
)
const isFallbackToReact = computed(
  () => docsState.framework === 'vue' && !props.vueComponent && Boolean(props.reactComponent)
)

const displayedFramework = computed(() => isFallbackToVue.value ? 'vue' : isFallbackToReact.value ? 'react' : docsState.framework)

const activeCode = computed(() => {
  if (displayedFramework.value === 'react') {
    return props.reactCode || '// 暂无示例代码'
  }
  return props.vueCode || '<!-- 暂无示例代码 -->'
})

const codeLangLabel = computed(() => {
  return displayedFramework.value === 'react' ? 'React TSX' : 'Vue 3'
})

const highlightedCode = computed(() => {
  const lang = displayedFramework.value === 'react' ? 'typescript' : 'xml'
  try {
    return hljs.highlight(activeCode.value, { language: lang }).value
  } catch {
    return activeCode.value
  }
})

async function copyCode() {
  try {
    await navigator.clipboard.writeText(activeCode.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 1800)
  } catch {
    // ignore clipboard errors
  }
}
</script>

<template>
  <section :id="id" class="demo-block">
    <div v-if="isFallbackToVue || isFallbackToReact" class="demo-notice">
      <span v-if="isFallbackToVue">{{ frameworks?.includes('react') ? '此示例使用 Vue 3。' : '当前组件仅提供 Vue 3 实现。' }}</span>
      <span v-else>{{ frameworks?.includes('vue') ? '此示例使用 React 18。' : '当前组件仅提供 React 18 实现。' }}</span>
    </div>
    <div class="demo-preview">
      <!-- ReactMount owns its own theme; mount a Vue provider only for a rendered Vue demo. -->
      <template v-if="displayedFramework === 'vue' && vueComponent">
        <DshProvider v-if="provideVueTheme" :theme="docsState.theme" :radius="docsState.radius" :reduced-motion="docsState.reducedMotion">
          <component :is="vueComponent" />
        </DshProvider>
        <component :is="vueComponent" v-else />
      </template>
      <ReactMount v-else-if="displayedFramework === 'react' && reactComponent" :component="reactComponent" />
    </div>
    <div class="demo-meta">
      <div>
        <h3 class="demo-title">{{ title }}</h3>
        <p v-if="description" class="demo-desc">{{ description }}</p>
      </div>
      <div class="demo-actions">
        <div class="demo-fw-switch" role="group" aria-label="示例框架切换">
          <button
            type="button"
            class="demo-fw-btn"
            :class="{ active: docsState.framework === 'vue' }"
            :aria-pressed="docsState.framework === 'vue'"
            @click="docsState.framework = 'vue'"
          >
            Vue
          </button>
          <button
            type="button"
            class="demo-fw-btn"
            :class="{ active: docsState.framework === 'react' }"
            :aria-pressed="docsState.framework === 'react'"
            @click="docsState.framework = 'react'"
          >
            React
          </button>
        </div>
        <button type="button" class="demo-action-btn" @click="copyCode">
          {{ copied ? '已复制 ✓' : '复制代码' }}
        </button>
        <button
          type="button"
          class="demo-action-btn"
          :class="{ active: codeVisible }"
          :aria-expanded="codeVisible"
          @click="codeVisible = !codeVisible"
        >
          {{ codeVisible ? '收起代码' : '</> 查看代码' }}
        </button>
      </div>
    </div>
    <div v-if="codeVisible" class="demo-code">
      <div class="demo-code-header">
        <span>{{ codeLangLabel }}</span>
      </div>
      <pre><code class="hljs" v-html="highlightedCode" /></pre>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, type Component } from 'vue'
import type { ComponentType } from 'react'
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
}>()

const codeVisible = ref(false)
const copied = ref(false)

const isFallbackToVue = computed(
  () => docsState.framework === 'react' && !props.reactComponent && Boolean(props.vueComponent)
)
const isFallbackToReact = computed(
  () => docsState.framework === 'vue' && !props.vueComponent && Boolean(props.reactComponent)
)

const activeCode = computed(() => {
  if (docsState.framework === 'react') {
    return props.reactCode || props.vueCode || '// 暂无示例代码'
  }
  return props.vueCode || props.reactCode || '<!-- 暂无示例代码 -->'
})

const codeLangLabel = computed(() => {
  if (docsState.framework === 'react') {
    return props.reactCode ? 'React TSX' : 'Vue SFC (Fallback)'
  }
  return props.vueCode ? 'Vue SFC' : 'React TSX (Fallback)'
})

const highlightedCode = computed(() => {
  const isReactCode = docsState.framework === 'react' ? Boolean(props.reactCode) : !props.vueCode && Boolean(props.reactCode)
  const lang = isReactCode ? 'typescript' : 'xml'
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
      <span v-if="isFallbackToVue">当前组件仅提供 Vue 3 实现，以下为 Vue 实时预览与示例。</span>
      <span v-else>当前组件仅提供 React 18 实现，以下为 React 实时预览与示例。</span>
    </div>
    <div class="demo-preview">
      <template v-if="docsState.framework === 'vue'">
        <component :is="vueComponent" v-if="vueComponent" />
        <ReactMount v-else-if="reactComponent" :component="reactComponent" />
      </template>
      <template v-else>
        <ReactMount v-if="reactComponent" :component="reactComponent" />
        <component :is="vueComponent" v-else-if="vueComponent" />
      </template>
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
            @click="docsState.framework = 'vue'"
          >
            Vue
          </button>
          <button
            type="button"
            class="demo-fw-btn"
            :class="{ active: docsState.framework === 'react' }"
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

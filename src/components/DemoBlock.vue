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

const activeCode = computed(() => {
  if (docsState.framework === 'react') {
    return props.reactCode || props.vueCode || '// 暂无示例代码'
  }
  return props.vueCode || props.reactCode || '<!-- 暂无示例代码 -->'
})

const highlightedCode = computed(() => {
  const lang = docsState.framework === 'react' ? 'typescript' : 'xml'
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
        <button type="button" class="demo-action-btn" @click="copyCode">
          {{ copied ? '已复制 ✓' : '复制代码' }}
        </button>
        <button type="button" class="demo-action-btn" @click="codeVisible = !codeVisible">
          {{ codeVisible ? '收起代码' : '展开代码' }}
        </button>
      </div>
    </div>
    <div v-if="codeVisible" class="demo-code">
      <pre><code class="hljs" v-html="highlightedCode" /></pre>
    </div>
  </section>
</template>

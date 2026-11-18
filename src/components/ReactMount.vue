<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as React from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { DshProvider } from '@dsh-plugin/dsh-ui-components'
import { docsState } from '../state/docs-state'

const props = defineProps<{
  component: React.ComponentType<any>
}>()

const containerRef = ref<HTMLElement | null>(null)
let root: Root | null = null

function renderReact() {
  if (!root) return
  const Comp = props.component
  root.render(
    React.createElement(
      DshProvider,
      {
        theme: docsState.theme,
        radius: docsState.radius,
        reducedMotion: docsState.reducedMotion,
      },
      React.createElement(Comp)
    )
  )
}

onMounted(() => {
  if (!containerRef.value) return
  root = createRoot(containerRef.value)
  renderReact()
})

watch(
  () => [props.component, docsState.theme, docsState.radius, docsState.reducedMotion],
  () => {
    renderReact()
  }
)

onBeforeUnmount(() => {
  root?.unmount()
  root = null
})
</script>

<template>
  <div ref="containerRef" class="react-mount-root" />
</template>

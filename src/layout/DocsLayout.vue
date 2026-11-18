<script setup lang="ts">
import { DshProvider } from '@dsh-plugin/dsh-ui-components-vue'
import { docsState } from '../state/docs-state'
import TopNav from './TopNav.vue'
import SideNav from './SideNav.vue'
import SearchModal from '../components/SearchModal.vue'

defineProps<{
  showSidebar?: boolean
}>()
</script>

<template>
  <DshProvider
    :theme="docsState.theme"
    :radius="docsState.radius"
    :reduced-motion="docsState.reducedMotion"
    class="docs-shell"
  >
    <TopNav />
    <div v-if="showSidebar !== false" class="docs-body">
      <SideNav />
      <slot />
    </div>
    <slot v-else />
    <SearchModal />
  </DshProvider>
</template>

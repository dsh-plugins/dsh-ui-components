<script setup lang="ts">
import { computed } from 'vue'
import { DshProvider } from '@dsh-plugin/dsh-ui-components-vue'
import DemoBlock from '../../../src/components/DemoBlock.vue'
import { getComponentBySlug } from '../../../src/data/components'
import { docsState } from '../../../src/state/docs-state'

const props = defineProps<{
  slug: string
  demoId: string
}>()

const demo = computed(() => {
  const comp = getComponentBySlug(props.slug)
  return comp?.demos.find((d) => d.id === props.demoId)
})
</script>

<template>
  <ClientOnly>
    <DshProvider
      v-if="demo"
      :theme="docsState.theme"
      :radius="docsState.radius"
      :reduced-motion="docsState.reducedMotion"
      class="vp-dsh-provider-wrap"
    >
      <DemoBlock
        :id="demo.id"
        :title="demo.title"
        :description="demo.description"
        :vue-component="demo.vueComponent"
        :react-component="demo.reactComponent"
        :vue-code="demo.vueCode"
        :react-code="demo.reactCode"
      />
    </DshProvider>
  </ClientOnly>
</template>

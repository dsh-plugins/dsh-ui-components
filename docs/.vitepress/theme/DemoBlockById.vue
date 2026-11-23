<script setup lang="ts">
import { computed } from 'vue'
import DemoBlock from '../../../src/components/DemoBlock.vue'
import { getComponentBySlug } from '../../../src/data/components'

const props = defineProps<{
  slug: string
  demoId: string
}>()

const component = computed(() => getComponentBySlug(props.slug))
const demo = computed(() => component.value?.demos.find((d) => d.id === props.demoId))
</script>

<template>
  <ClientOnly>
    <DemoBlock
      v-if="demo"
      :id="demo.id"
      :title="demo.title"
      :description="demo.description"
      :vue-component="demo.vueComponent"
      :react-component="demo.reactComponent"
      :vue-code="demo.vueCode"
      :react-code="demo.reactCode"
      :frameworks="component?.frameworks"
      provide-vue-theme
    />
  </ClientOnly>
</template>

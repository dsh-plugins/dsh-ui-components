<script setup lang="ts">
import { computed } from 'vue'
import ApiTable from '../../../src/components/ApiTable.vue'
import { getComponentBySlug } from '../../../src/data/components'

const props = defineProps<{
  slug: string
  sectionId: string
}>()

const section = computed(() => {
  const comp = getComponentBySlug(props.slug)
  if (!comp) return undefined
  if (comp.apiSections?.length) {
    return comp.apiSections.find((s) => s.id === props.sectionId)
  }
  if (props.sectionId === 'api-props' && comp.props?.length) {
    return { id: 'api-props', title: `${comp.name} Props`, kind: 'props' as const, rows: comp.props }
  }
  if (props.sectionId === 'api-events' && comp.events?.length) {
    return { id: 'api-events', title: `${comp.name} Events`, kind: 'events' as const, rows: comp.events }
  }
  if (props.sectionId === 'api-slots' && comp.slots?.length) {
    return { id: 'api-slots', title: `${comp.name} Slots`, kind: 'slots' as const, rows: comp.slots }
  }
  return undefined
})
</script>

<template>
  <ApiTable
    v-if="section"
    :id="section.id"
    :title="section.title"
    :description="section.description"
    :rows="section.rows"
    :kind="section.kind"
    :framework="section.framework"
  />
</template>

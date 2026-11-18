<script setup lang="ts">
import { computed } from 'vue'
import { getComponentBySlug } from '../../../src/data/components'

const props = defineProps<{
  slug: string
}>()

const meta = computed(() => getComponentBySlug(props.slug))
</script>

<template>
  <div v-if="meta" class="vp-dsh-comp-header">
    <div class="vp-dsh-comp-cat">组件 / {{ meta.categoryLabel }}</div>
    <h1 class="vp-dsh-comp-title">
      <span>{{ meta.name }} {{ meta.title }}</span>
      <span v-for="fw in meta.frameworks" :key="fw" class="docs-badge">{{ fw.toUpperCase() }}</span>
      <span v-if="meta.badge" class="docs-badge dsh">{{ meta.badge }}</span>
    </h1>
    <p class="vp-dsh-comp-desc">{{ meta.description }}</p>
  </div>
</template>

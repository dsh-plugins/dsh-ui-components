<script setup lang="ts">
export interface TocItem {
  id: string
  label: string
}

defineProps<{
  items: TocItem[]
}>()

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <aside v-if="items.length > 0" class="docs-toc" aria-label="页面目录">
    <div class="docs-toc-title">本页目录</div>
    <a
      v-for="item in items"
      :key="item.id"
      :href="`#${item.id}`"
      class="docs-toc-link"
      @click.prevent="scrollTo(item.id)"
    >
      {{ item.label }}
    </a>
  </aside>
</template>

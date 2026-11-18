<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DocsLayout from '../layout/DocsLayout.vue'
import DemoBlock from '../components/DemoBlock.vue'
import ApiTable from '../components/ApiTable.vue'
import AnchorToc, { type TocItem } from '../components/AnchorToc.vue'
import { getComponentBySlug } from '../data/components'

const route = useRoute()
const meta = computed(() => getComponentBySlug(String(route.params.name || '')))

const tocItems = computed<TocItem[]>(() => {
  if (!meta.value) return []
  const items: TocItem[] = meta.value.demos.map((d) => ({ id: d.id, label: d.title }))
  if (meta.value.props?.length) items.push({ id: 'api-props', label: 'API · Props' })
  if (meta.value.events?.length) items.push({ id: 'api-events', label: 'API · Events' })
  if (meta.value.slots?.length) items.push({ id: 'api-slots', label: 'API · Slots' })
  return items
})
</script>

<template>
  <DocsLayout>
    <main class="docs-main">
      <template v-if="meta">
        <div class="docs-page-header">
          <div class="docs-page-category">{{ meta.categoryLabel }}</div>
          <h1 class="docs-page-title">
            <span>{{ meta.name }} {{ meta.title }}</span>
            <span v-for="fw in meta.frameworks" :key="fw" class="docs-badge">{{ fw.toUpperCase() }}</span>
            <span v-if="meta.badge" class="docs-badge dsh">{{ meta.badge }}</span>
          </h1>
          <p class="docs-page-desc">{{ meta.description }}</p>
        </div>

        <DemoBlock
          v-for="demo in meta.demos"
          :id="demo.id"
          :key="demo.id"
          :title="demo.title"
          :description="demo.description"
          :vue-component="demo.vueComponent"
          :react-component="demo.reactComponent"
          :vue-code="demo.vueCode"
          :react-code="demo.reactCode"
        />

        <ApiTable v-if="meta.props?.length" id="api-props" title="Props 参数" :rows="meta.props" kind="props" />
        <ApiTable v-if="meta.events?.length" id="api-events" title="Events 事件" :rows="meta.events" kind="events" />
        <ApiTable v-if="meta.slots?.length" id="api-slots" title="Slots 插槽" :rows="meta.slots" kind="slots" />
      </template>

      <div v-else class="demo-block" style="padding: 36px; text-align: center">
        <h2>未找到该组件文档</h2>
        <p style="color: var(--docs-text-secondary)">请从左侧导航或组件总览中选择其他组件。</p>
        <router-link to="/components" class="docs-topnav-link active">返回组件总览</router-link>
      </div>
    </main>

    <AnchorToc :items="tocItems" />
  </DocsLayout>
</template>

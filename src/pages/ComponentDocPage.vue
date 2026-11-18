<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DocsLayout from '../layout/DocsLayout.vue'
import DemoBlock from '../components/DemoBlock.vue'
import ApiTable from '../components/ApiTable.vue'
import AnchorToc, { type TocItem } from '../components/AnchorToc.vue'
import { allComponents, getComponentBySlug } from '../data/components'

const route = useRoute()
const meta = computed(() => getComponentBySlug(String(route.params.name || '')))

const currentIndex = computed(() =>
  allComponents.findIndex((c) => c.slug === meta.value?.slug)
)
const prevComponent = computed(() =>
  currentIndex.value > 0 ? allComponents[currentIndex.value - 1] : undefined
)
const nextComponent = computed(() =>
  currentIndex.value >= 0 && currentIndex.value < allComponents.length - 1
    ? allComponents[currentIndex.value + 1]
    : undefined
)

const resolvedApiSections = computed(() => {
  if (!meta.value) return []
  if (meta.value.apiSections?.length) {
    return meta.value.apiSections
  }
  const list = []
  if (meta.value.props?.length) {
    list.push({
      id: 'api-props',
      title: `${meta.value.name} Props`,
      kind: 'props' as const,
      rows: meta.value.props,
    })
  }
  if (meta.value.events?.length) {
    list.push({
      id: 'api-events',
      title: `${meta.value.name} Events`,
      kind: 'events' as const,
      rows: meta.value.events,
    })
  }
  if (meta.value.slots?.length) {
    list.push({
      id: 'api-slots',
      title: `${meta.value.name} Slots`,
      kind: 'slots' as const,
      rows: meta.value.slots,
    })
  }
  return list
})

const tocItems = computed<TocItem[]>(() => {
  if (!meta.value) return []
  const items: TocItem[] = meta.value.demos.map((d) => ({ id: d.id, label: d.title }))
  for (const sec of resolvedApiSections.value) {
    items.push({ id: sec.id, label: sec.title })
  }
  return items
})
</script>

<template>
  <DocsLayout>
    <main class="docs-main">
      <template v-if="meta">
        <div class="docs-page-header">
          <div class="docs-page-category">组件 / {{ meta.categoryLabel }}</div>
          <h1 class="docs-page-title">
            <span>{{ meta.name }} {{ meta.title }}</span>
            <span v-for="fw in meta.frameworks" :key="fw" class="docs-badge">{{ fw.toUpperCase() }}</span>
            <span v-if="meta.badge" class="docs-badge dsh">{{ meta.badge }}</span>
          </h1>
          <p class="docs-page-desc">{{ meta.description }}</p>
        </div>

        <h2 class="docs-section-heading">代码演示与属性效果</h2>
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

        <template v-if="resolvedApiSections.length > 0">
          <h2 class="docs-section-heading" style="margin-top: 44px">API 文档</h2>
          <ApiTable
            v-for="sec in resolvedApiSections"
            :id="sec.id"
            :key="sec.id"
            :title="sec.title"
            :description="sec.description"
            :rows="sec.rows"
            :kind="sec.kind"
            :framework="sec.framework"
          />
        </template>

        <nav class="docs-prev-next" aria-label="组件上下页">
          <router-link
            v-if="prevComponent"
            :to="`/components/${prevComponent.slug}`"
            class="docs-pn-card prev"
          >
            <span class="docs-pn-label">← 上一个组件</span>
            <span class="docs-pn-name">{{ prevComponent.name }} · {{ prevComponent.title }}</span>
          </router-link>
          <span v-else />
          <router-link
            v-if="nextComponent"
            :to="`/components/${nextComponent.slug}`"
            class="docs-pn-card next"
          >
            <span class="docs-pn-label">下一个组件 →</span>
            <span class="docs-pn-name">{{ nextComponent.name }} · {{ nextComponent.title }}</span>
          </router-link>
        </nav>
      </template>

      <div v-else class="demo-block" style="padding: 36px; text-align: center">
        <h2>未找到该组件文档</h2>
        <p style="color: var(--docs-text-secondary)">请从左侧导航或组件总览中选择其他组件。</p>
        <router-link to="/overview" class="docs-topnav-link active">返回组件总览</router-link>
      </div>
    </main>

    <AnchorToc :items="tocItems" />
  </DocsLayout>
</template>

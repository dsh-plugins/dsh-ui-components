<script setup lang="ts">
import DocsLayout from '../layout/DocsLayout.vue'
import { allComponents, categories } from '../data/components'

function byCategory(key: string) {
  return allComponents.filter((c) => c.category === key)
}
</script>

<template>
  <DocsLayout>
    <main class="docs-main">
      <div class="docs-page-header">
        <div class="docs-page-category">组件总览</div>
        <h1 class="docs-page-title">全部组件</h1>
        <p class="docs-page-desc">
          覆盖 Arco Design 全量基础、布局、导航、数据输入、数据展示、反馈组件以及 DSH 补充与复合组件。
        </p>
      </div>

      <section v-for="cat in categories" :key="cat.key" class="overview-group">
        <h2>{{ cat.label }}</h2>
        <div class="overview-grid">
          <router-link
            v-for="comp in byCategory(cat.key)"
            :key="comp.slug"
            :to="`/components/${comp.slug}`"
            class="overview-card"
          >
            <div class="overview-card-head">
              <span>{{ comp.name }}</span>
              <span v-if="comp.badge" class="docs-badge dsh">{{ comp.badge }}</span>
            </div>
            <div style="font-size: 13px; font-weight: 500; color: var(--docs-accent)">{{ comp.title }}</div>
            <div class="overview-card-desc">{{ comp.description }}</div>
          </router-link>
        </div>
      </section>
    </main>
  </DocsLayout>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'
import { allComponents, categories } from '../../../src/data/components'

function byCategory(key: string) {
  return allComponents.filter((c) => c.category === key)
}
</script>

<template>
  <div class="vp-dsh-overview">
    <section v-for="cat in categories" :key="cat.key" class="overview-group">
      <h2 :id="cat.key">
        {{ cat.label }}
        <span class="docs-badge" style="margin-left: 8px; vertical-align: middle">
          {{ byCategory(cat.key).length }}
        </span>
      </h2>
      <div class="overview-grid">
        <a
          v-for="comp in byCategory(cat.key)"
          :key="comp.slug"
          :href="withBase(`/components/${comp.slug}.html`)"
          class="overview-card"
        >
          <div class="overview-card-head">
            <span>{{ comp.name }}</span>
            <span v-if="comp.badge" class="docs-badge dsh">{{ comp.badge }}</span>
          </div>
          <div style="font-size: 13px; font-weight: 500; color: var(--vp-c-brand-1)">{{ comp.title }}</div>
          <div class="overview-card-desc">{{ comp.description }}</div>
        </a>
      </div>
    </section>
  </div>
</template>

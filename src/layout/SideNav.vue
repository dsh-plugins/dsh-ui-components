<script setup lang="ts">
import { useRoute } from 'vue-router'
import { allComponents, categories } from '../data/components'

const route = useRoute()

const guideLinks = [
  { to: '/guide/quick-start', label: '快速开始' },
  { to: '/guide/theme', label: '主题与 DshProvider' },
  { to: '/guide/coverage', label: '组件覆盖与迁移' },
  { to: '/overview', label: '组件总览' },
]

function byCategory(key: string) {
  return allComponents.filter((c) => c.category === key)
}
</script>

<template>
  <aside class="docs-sidebar" aria-label="组件导航">
    <div class="docs-sidebar-group">
      <div class="docs-sidebar-title">开发指南</div>
      <router-link
        v-for="item in guideLinks"
        :key="item.to"
        :to="item.to"
        class="docs-sidebar-item"
        :class="{ active: route.path === item.to }"
      >
        <span>{{ item.label }}</span>
      </router-link>
    </div>

    <div v-for="cat in categories" :key="cat.key" class="docs-sidebar-group">
      <div class="docs-sidebar-title">{{ cat.label }}</div>
      <router-link
        v-for="comp in byCategory(cat.key)"
        :key="comp.slug"
        :to="`/components/${comp.slug}`"
        class="docs-sidebar-item"
        :class="{ active: route.path === `/components/${comp.slug}` }"
      >
        <span>{{ comp.name }} · {{ comp.title }}</span>
        <span v-if="comp.badge" class="docs-badge dsh">{{ comp.badge }}</span>
      </router-link>
    </div>
  </aside>
</template>

<script setup lang="ts">
export interface ApiRow {
  name: string
  description: string
  type: string
  defaultValue?: string
  required?: boolean
  version?: string
  framework?: 'vue' | 'react'
}

defineProps<{
  id?: string
  title: string
  description?: string
  rows: ApiRow[]
  kind?: 'props' | 'events' | 'slots' | 'methods'
  framework?: 'vue' | 'react' | 'both'
}>()
</script>

<template>
  <div :id="id" class="api-section">
    <div class="api-section-head">
      <h2>{{ title }}</h2>
      <span v-if="framework && framework !== 'both'" class="docs-badge" :class="framework">
        {{ framework === 'vue' ? 'Vue 3' : 'React 18' }}
      </span>
    </div>
    <p v-if="description" class="api-section-desc">{{ description }}</p>
    <div class="api-table-wrap">
      <table class="api-table">
        <thead>
          <tr>
            <th>{{ kind === 'events' ? '事件名' : kind === 'slots' ? '插槽名' : kind === 'methods' ? '方法名' : '参数名' }}</th>
            <th>说明</th>
            <th>{{ kind === 'slots' ? '作用域参数' : '类型' }}</th>
            <th v-if="kind !== 'events' && kind !== 'slots' && kind !== 'methods'">默认值</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.name">
            <td>
              <div class="api-name-cell">
                <code>{{ row.name }}</code>
                <span v-if="row.required" class="api-tag required">必填</span>
                <span v-if="row.framework" class="api-tag fw">{{ row.framework.toUpperCase() }}</span>
                <span v-if="row.version" class="api-tag ver">{{ row.version }}</span>
              </div>
            </td>
            <td>{{ row.description }}</td>
            <td><code>{{ row.type }}</code></td>
            <td v-if="kind !== 'events' && kind !== 'slots' && kind !== 'methods'">
              <code v-if="row.defaultValue">{{ row.defaultValue }}</code>
              <span v-else>-</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

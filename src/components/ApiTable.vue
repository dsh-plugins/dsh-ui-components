<script setup lang="ts">
export interface ApiRow {
  name: string
  description: string
  type: string
  defaultValue?: string
}

defineProps<{
  id?: string
  title: string
  rows: ApiRow[]
  kind?: 'props' | 'events' | 'slots'
}>()
</script>

<template>
  <div :id="id" class="api-section">
    <h2>{{ title }}</h2>
    <div class="api-table-wrap">
      <table class="api-table">
        <thead>
          <tr>
            <th>{{ kind === 'events' ? '事件名' : kind === 'slots' ? '插槽名' : '参数名' }}</th>
            <th>说明</th>
            <th>{{ kind === 'slots' ? '作用域参数' : '类型' }}</th>
            <th v-if="kind !== 'events' && kind !== 'slots'">默认值</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.name">
            <td><code>{{ row.name }}</code></td>
            <td>{{ row.description }}</td>
            <td><code>{{ row.type }}</code></td>
            <td v-if="kind !== 'events' && kind !== 'slots'">
              <code v-if="row.defaultValue">{{ row.defaultValue }}</code>
              <span v-else>-</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { docsState } from '../state/docs-state'
import { allComponents } from '../data/components'

const router = useRouter()
const query = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

const results = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return allComponents.slice(0, 12)
  return allComponents
    .filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.categoryLabel.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    )
    .slice(0, 16)
})

function selectItem(slug: string) {
  docsState.searchOpen = false
  query.value = ''
  router.push(`/components/${slug}`)
}

function onKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    docsState.searchOpen = !docsState.searchOpen
  } else if (e.key === 'Escape' && docsState.searchOpen) {
    docsState.searchOpen = false
  }
}

watch(
  () => docsState.searchOpen,
  async (open) => {
    if (open) {
      await nextTick()
      inputRef.value?.focus()
    }
  }
)

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div v-if="docsState.searchOpen" class="search-backdrop" @click.self="docsState.searchOpen = false">
    <div class="search-dialog" role="dialog" aria-label="搜索组件">
      <div class="search-input-wrap">
        <input
          ref="inputRef"
          v-model="query"
          type="text"
          class="search-input"
          placeholder="搜索组件名称、中文标题或分类…"
        />
        <button type="button" class="demo-action-btn" @click="docsState.searchOpen = false">Esc</button>
      </div>
      <div class="search-results">
        <button
          v-for="item in results"
          :key="item.slug"
          type="button"
          class="search-item"
          @click="selectItem(item.slug)"
        >
          <div>
            <strong>{{ item.name }}</strong>
            <span class="search-item-title">{{ item.title }}</span>
          </div>
          <span class="docs-badge">{{ item.categoryLabel }}</span>
        </button>
        <div v-if="results.length === 0" class="search-empty">未找到匹配的组件</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-backdrop {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 12vh;
}
.search-dialog {
  width: min(560px, 92vw);
  border-radius: 14px;
  border: 1px solid var(--docs-border);
  background: var(--docs-bg-card);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}
.search-input-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--docs-border);
}
.search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: var(--docs-text);
  font-size: 15px;
}
.search-results {
  max-height: 360px;
  overflow-y: auto;
  padding: 8px;
}
.search-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--docs-text);
  cursor: pointer;
  text-align: left;
}
.search-item:hover {
  background: var(--docs-accent-soft);
}
.search-item-title {
  margin-left: 8px;
  font-size: 13px;
  color: var(--docs-text-secondary);
}
.search-empty {
  padding: 24px;
  text-align: center;
  color: var(--docs-text-muted);
  font-size: 14px;
}
</style>

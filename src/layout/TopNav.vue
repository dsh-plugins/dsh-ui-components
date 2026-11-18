<script setup lang="ts">
import { useRoute } from 'vue-router'
import { docsState } from '../state/docs-state'

const route = useRoute()
</script>

<template>
  <header class="docs-topnav">
    <div class="docs-topnav-left">
      <router-link to="/" class="docs-brand">
        <span class="docs-brand-logo">D</span>
        <span>DSH Design</span>
      </router-link>

      <nav class="docs-topnav-links" aria-label="主导航">
        <router-link
          to="/guide/quick-start"
          class="docs-topnav-link"
          :class="{ active: route.path.startsWith('/guide') }"
        >
          指南
        </router-link>
        <router-link
          to="/components"
          class="docs-topnav-link"
          :class="{ active: route.path.startsWith('/components') }"
        >
          组件
        </router-link>
        <router-link
          to="/guide/theme"
          class="docs-topnav-link"
          :class="{ active: route.path === '/guide/theme' }"
        >
          主题定制
        </router-link>
      </nav>
    </div>

    <div class="docs-topnav-right">
      <button type="button" class="docs-search-btn" @click="docsState.searchOpen = true">
        <span>搜索组件…</span>
        <kbd style="font-size: 11px; opacity: 0.7">⌘K</kbd>
      </button>

      <div class="docs-framework-switch" role="group" aria-label="框架切换">
        <button
          type="button"
          class="docs-framework-btn"
          :class="{ active: docsState.framework === 'vue' }"
          @click="docsState.framework = 'vue'"
        >
          Vue
        </button>
        <button
          type="button"
          class="docs-framework-btn"
          :class="{ active: docsState.framework === 'react' }"
          @click="docsState.framework = 'react'"
        >
          React
        </button>
      </div>

      <select
        v-model="docsState.radius"
        aria-label="全局圆角"
        class="docs-icon-btn"
      >
        <option value="none">无圆角</option>
        <option value="sm">小圆角</option>
        <option value="md">标准圆角</option>
        <option value="lg">大圆角</option>
        <option value="full">胶囊圆角</option>
      </select>

      <button
        type="button"
        class="docs-icon-btn"
        :aria-label="docsState.theme === 'light' ? '切换深色' : '切换浅色'"
        @click="docsState.theme = docsState.theme === 'light' ? 'dark' : 'light'"
      >
        {{ docsState.theme === 'light' ? '☀️ 浅色' : '🌙 深色' }}
      </button>

      <a
        href="https://github.com/dsh-plugins/dsh-ui-components"
        target="_blank"
        rel="noreferrer"
        class="docs-icon-btn"
      >
        GitHub
      </a>
    </div>
  </header>
</template>

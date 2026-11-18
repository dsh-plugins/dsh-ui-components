<script setup lang="ts">
import { docsState } from '../../../src/state/docs-state'
</script>

<template>
  <div class="vp-dsh-controls">
    <div class="vp-dsh-fw-switch" role="group" aria-label="框架切换">
      <button
        type="button"
        class="vp-dsh-fw-btn"
        :class="{ active: docsState.framework === 'vue' }"
        @click="docsState.framework = 'vue'"
      >
        Vue
      </button>
      <button
        type="button"
        class="vp-dsh-fw-btn"
        :class="{ active: docsState.framework === 'react' }"
        @click="docsState.framework = 'react'"
      >
        React
      </button>
    </div>

    <select
      v-model="docsState.radius"
      aria-label="全局圆角"
      class="vp-dsh-radius-select"
    >
      <option value="none">无圆角</option>
      <option value="sm">小圆角</option>
      <option value="md">标准圆角</option>
      <option value="lg">大圆角</option>
      <option value="full">胶囊圆角</option>
    </select>
  </div>
</template>

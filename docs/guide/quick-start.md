---
title: 快速开始
---

# 快速开始

**DSH UI Components** 基于 Arco Design，并结合 HeroUI 视觉令牌进行微调，同时提供 Vue 3 与 React 18 两个官方包。

## 1. 安装依赖

::: code-group

```bash [Vue 3]
pnpm add @dsh-plugin/dsh-ui-components-vue
```

```bash [React 18]
pnpm add @dsh-plugin/dsh-ui-components
```

:::

## 2. 引入并使用

::: code-group

```vue [Vue 3]
<script setup lang="ts">
import { DshProvider, Button, Input } from '@dsh-plugin/dsh-ui-components-vue'
import '@dsh-plugin/dsh-ui-components-vue/style.css'
</script>

<template>
  <DshProvider theme="auto" radius="md">
    <Input placeholder="输入内容" />
    <Button variant="primary">提交</Button>
  </DshProvider>
</template>
```

```tsx [React 18]
import { DshProvider, Button, Field, Input } from '@dsh-plugin/dsh-ui-components'

export function App() {
  return (
    <DshProvider theme="host" radius="md">
      <Field label="名称" htmlFor="name">
        <Input id="name" placeholder="输入内容" />
      </Field>
      <Button variant="primary">提交</Button>
    </DshProvider>
  )
}
```

:::

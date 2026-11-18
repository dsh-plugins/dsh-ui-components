# DSH Vue 组件库

`@dsh-plugin/dsh-ui-components-vue` 在 `vue` 分支提供基于 Arco Design Vue 的组件库，使用 HeroUI 风格的表面、圆角、阴影、焦点环与交互状态。

验收基线为 `@arco-design/web-vue` 全部组件及子组件。组件参数、事件、`v-model` 和插槽沿用 Arco Vue；与 HeroUI 的逐项视觉对应、额外组件和迁移差异见 [组件对照](docs/vue-coverage.md)。React 版本使用独立的 `react` 分支及包名 `@dsh-plugin/dsh-ui-components`。

## 使用

本地构建后可通过 `npm pack` 生成安装包。发布名称为 `@dsh-plugin/dsh-ui-components-vue`；当前工作区修改不代表已发布到 npm。

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { DshProvider, Button, Input, FormItem, Select, Modal } from '@dsh-plugin/dsh-ui-components-vue'
import '@dsh-plugin/dsh-ui-components-vue/style.css'

const name = ref('')
const mode = ref('standard')
const visible = ref(false)
</script>

<template>
  <DshProvider theme="auto" radius="md">
    <FormItem label="名称">
      <Input v-model="name" />
    </FormItem>
    <Select v-model="mode" :options="['standard', 'custom']" />
    <Button variant="primary" @click="visible = true">打开</Button>
    <Modal v-model:visible="visible" title="设置">
      {{ name }}
    </Modal>
  </DshProvider>
</template>
```

## 主题与浮层

`DshProvider` 支持 `theme="auto|light|dark"`、`radius="none|sm|md|lg|full"`、`reducedMotion`、`locale` 与 `rtl`。`auto` 优先读取 DSH/Arco 宿主主题，再使用系统偏好；动画默认遵循系统的减少动画设置。

在 Provider 的 `style` 中覆盖 `--dsh-accent`、`--dsh-surface`、`--dsh-radius` 等变量即可调整局部主题。每个 Provider 拥有独立 body 浮层容器，复制根元素的最终 CSS 变量，并在卸载时回收。

所有带浮层的组件应置于 Provider 内。Modal、Drawer 和 AlertDialog 的顶部和底部各保留 120px，内容使用 Arco Vue Scrollbar。弹窗支持 Escape、焦点限制、关闭后焦点恢复和 `trigger/header/footer` 插槽。Vue 运行环境直接复用 Arco Vue 滚动条。

命令式消息优先在 Provider 后代的 `setup` 中调用 `useFeedback()`，取得作用域内的 `message` 与 `notification`；`useToast()` 提供简化短提示。原生 `Message`、`Notification` 导出保留 Arco 全局语义，局部主题使用作用域接口。

## 公开入口

- 根入口包含全部 Arco Vue 组件及子组件，以及 HeroUI 风格的 Button、ProgressBar、ProgressCircle、Meter、TextField、SearchField、InputOTP、ListBox、ToggleButton、Toolbar 等补充组件。
- `Arco` 命名空间保留原始 Arco Vue 的全部参数和组件，适合需要原生 Button、Link、InputGroup API 的调用方。局部主题浮层优先使用根入口包装组件。
- `useDialog()` 返回当前 Provider 内的 `modal`、`drawer` 命令式接口，支持 `open`、`confirm`、`close` 与 `update`，用来替代原始静态弹窗调用。
- `Button` 支持 `primary/secondary/tertiary/outline/ghost/danger/danger-soft` 变体与 `sm/md/lg` 尺寸；其余 Arco 控件保留 Arco 的尺寸命名。
- 图标通过 `@dsh-plugin/dsh-ui-components-vue/icons` 以 Arco Vue 图标名导入，构建器可移除未使用图标。
- 样式单独通过 `style.css` 导入；Vue 和 Arco 的 JavaScript 作为共享依赖，包中不包含 React 或 dsh-loader。

## 可选界面样式

- `Table` 的 `contentSized` 按内容计算列宽并保持单行。固定列沿用 Arco 的 `fixed` 配置。`loadingStyle="blur"` 仅模糊数据区。`Spin` 的同名选项模糊卡片内容。
- `Card` 的 `variant="glass"` 启用半透明背景和模糊，`glassOpacity` 可设置 0 到 1 的背景不透明度。
- `ScrollShadow` 的 `variant="page"` 启用两端渐隐的滚动阴影。`Modal`、`Drawer` 的 `scrollGutter` 在内容和滚动条之间留空。`DshProvider` 的 `overlayInset`、`overlayRadius` 可调整作用域内的提示位置和遮罩轮廓。
- 横向 `Menu` 的 `centered` 和 `itemWidth` 控制整体居中及每项宽度。 `MenuItem` 的 `action` 插槽可以放置独立操作。
- 在标签和单选 `Select` 的共同容器上添加 `dsh-select-label-inset` 可对齐文字。`HintIcon` 支持鼠标悬停和键盘聚焦显示 `content`。
- `dsh-markdown` 为调用方渲染的 Markdown HTML 设置样式，覆盖表格、代码块、引用块、任务列表、`mark`、`kbd` 和 GitHub 格式提示块。

## 开发与验证

```sh
npm install
npm run typecheck
npm run build
npm test
npm run verify:arco
npm run preview:build
npm run preview
```

预览入口位于 `docs/preview/App.vue`，组件源码位于 `src/vue/`，根出口位于 `src/index.ts`。`verify:arco` 根据安装版本的官方声明核对发布入口，新增依赖组件时会同步进入核对范围。单元测试针对选择状态、验证码处理和进度归一化等自研规则；交互与视觉在预览中验收。

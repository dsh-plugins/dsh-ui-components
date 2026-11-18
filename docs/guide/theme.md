---
title: 主题与 DshProvider
---

# 主题与 DshProvider

**DSH UI Components** 通过 `DshProvider` 统一管理 Arco Design 组件的 HeroUI 视觉令牌微调，包括浅色/深色主题、全局圆角档位与减少动画设置。

## DshProvider 配置

`DshProvider` 支持以下核心属性：

- `theme`: Vue 支持 `'auto' | 'light' | 'dark'`，React 支持 `'host' | 'system' | 'light' | 'dark'`
- `radius`: `'none' | 'sm' | 'md' | 'lg' | 'full'`（可在页面右上角实时切换）
- `reducedMotion`: 是否减少动画效果
- 从右到左布局使用 Vue 的 `rtl` 或 React 的 `direction="rtl"`。可通过对应的 Arco `ConfigProvider` 配置语言，Vue 的 `DshProvider` 也接受 `locale`。
- `overlayInset` 与 `overlayRadius`: 调整作用域内弹窗遮罩的边距和圆角，通知位置也会计入边距。

## 作用域浮层与 Toast

所有带浮层的组件（`Modal`、`Drawer`、`Select`、`Dropdown`、`Tooltip`、`Popover` 等）应置于 `DshProvider` 内。每个 Provider 拥有独立的 body 浮层容器，自动复制根元素的 CSS 变量并在卸载时回收，确保多插件实例互不干扰。

## CSS 变量定制

在 `DshProvider` 的 `style` 中覆盖 `--dsh-accent`、`--dsh-surface`、`--dsh-radius` 等视觉令牌即可实现局部主题定制。

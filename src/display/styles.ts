/**
 * 展示组件追加样式。
 *
 * 卡片、标签、浮层这类表面形态在 DSH 里有讲究：浮起表面用 `border: 0` 配
 * 描边阴影，菜单表面要带材质模糊，胶囊形状要退出全局圆角平滑。这些必须改
 * 结构，因此单独成表。
 *
 * @module @dsh-plugin/dsh-ui-components/display/styles
 */
import { injectUiStyle } from '../foundation/style.js'

/** 展示组件样式表。 */
export const DISPLAY_CSS = `
/* ── 卡片 ───────────────────────────────────────────────────────── */
.dsh-ui .arco-card {
  border-radius: var(--dsw-radius-xl, 20px);
  border: 0;
  box-shadow: var(--dsw-elevation-panel);
  background-color: var(--dsw-alias-card-fill);
}

.dsh-ui .arco-card-header {
  border-bottom: 1px solid var(--dsw-alias-border-l1);
  height: auto;
  padding: 16px 20px;
}

.dsh-ui .arco-card-header-title {
  font-size: 15px;
  line-height: 22px;
  font-weight: 500;
  color: var(--dsw-alias-label-primary);
}

.dsh-ui .arco-card-body {
  padding: 20px;
  font-size: 14px;
  line-height: 22px;
  color: var(--dsw-alias-label-primary);
}

.dsh-ui .dsh-card--flat.arco-card {
  box-shadow: none;
  background-color: transparent;
  border: 0.5px solid var(--dsw-alias-border-l2);
}

.dsh-ui .dsh-card--tight .arco-card-body {
  padding: 12px 16px;
}

/* ── 标签 ───────────────────────────────────────────────────────── */
.dsh-ui .arco-tag {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  corner-shape: round;
  padding: 1px 8px;
  height: auto;
  font-size: 11px;
  line-height: 17px;
  font-weight: 500;
  white-space: nowrap;
  border: none;
  background-color: var(--dsw-alias-bg-module-platform);
  color: var(--dsw-alias-label-secondary);
}

.dsh-ui .arco-tag-size-small {
  padding: 0 6px;
  font-size: 10px;
  line-height: 15px;
}

.dsh-ui .arco-tag-size-large {
  padding: 2px 10px;
  font-size: 12px;
  line-height: 19px;
}

/* ── 胶囊按钮 ───────────────────────────────────────────────────── */
.dsh-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 24px;
  padding: 0 8px;
  border: none;
  border-radius: 999px;
  corner-shape: round;
  font-family: inherit;
  font-size: 12px;
  line-height: 18px;
  color: var(--dsw-alias-label-secondary);
  background-color: var(--dsw-alias-bg-layer-2);
}

.dsh-pill--interactive {
  cursor: pointer;
}

@media (hover: hover) {
  .dsh-pill--interactive:hover {
    background-color: var(--dsw-alias-interactive-bg-hover);
  }
}

.dsh-pill--active {
  color: var(--dsw-alias-label-primary);
  background-color: var(--dsw-alias-button-ghost-active-fill);
  box-shadow: inset 0 0 0 1px var(--dsw-alias-button-ghost-active-border);
}

/* ── 折叠面板 ───────────────────────────────────────────────────── */
.dsh-ui .arco-collapse {
  border: 0;
  border-radius: var(--dsw-radius-lg, 16px);
  background-color: transparent;
}

.dsh-ui .arco-collapse-item {
  border-bottom: 0.5px solid var(--dsw-alias-border-l1);
}

.dsh-ui .arco-collapse-item:last-child {
  border-bottom: 0;
}

.dsh-ui .arco-collapse-item-header {
  border: 0;
  background-color: transparent;
  font-size: 13px;
  line-height: 24px;
  color: var(--dsw-alias-label-tertiary);
  padding-left: 0;
  padding-right: 0;
}

@media (hover: hover) {
  .dsh-ui .arco-collapse-item-header:hover {
    color: var(--dsw-alias-label-secondary);
  }
}

.dsh-ui .arco-collapse-item-active .arco-collapse-item-header {
  color: var(--dsw-alias-label-primary);
}

.dsh-ui .arco-collapse-item-content {
  background-color: transparent;
  font-size: 14px;
  line-height: 22px;
  color: var(--dsw-alias-label-primary);
  padding-left: 0;
}

/* ── 描述列表 ───────────────────────────────────────────────────── */
.dsh-ui .arco-descriptions-item-label {
  font-size: 13px;
  line-height: 20px;
  color: var(--dsw-alias-label-tertiary);
}

.dsh-ui .arco-descriptions-item-value {
  font-size: 14px;
  line-height: 22px;
  color: var(--dsw-alias-label-primary);
}

/* ── 空状态与骨架 ───────────────────────────────────────────────── */
.dsh-ui .arco-empty-description {
  font-size: 13px;
  line-height: 20px;
  color: var(--dsw-alias-label-tertiary);
}

.dsh-ui .arco-skeleton-line-row,
.dsh-ui .arco-skeleton-header .arco-skeleton-image {
  background-color: var(--dsw-alias-bg-skeleton);
}

.dsh-ui .arco-spin-loading-icon {
  color: var(--dsw-alias-label-tertiary);
}

/* ── 提示与气泡 ─────────────────────────────────────────────────── */
.dsh-ui-overlay .arco-tooltip-content,
.dsh-ui .arco-tooltip-content {
  border-radius: var(--dsw-radius-sm, 8px);
  background-color: var(--dsw-alias-tooltip-bg);
  color: var(--dsw-alias-tooltip-label);
  font-size: 13px;
  line-height: 20px;
  padding: 3px 7px;
  box-shadow: none;
}

/* 宿主的提示气泡没有箭头，且贴着锚点；Arco 的 12px 偏移与箭头预留空间由 JS
   算进绝对定位里，因此只能用负外边距收回到 4px。 */
.dsh-ui-overlay .arco-tooltip-arrow,
.dsh-ui .arco-tooltip-arrow {
  display: none;
}

.dsh-ui-overlay .arco-tooltip.arco-trigger-position-bottom,
.dsh-ui .arco-tooltip.arco-trigger-position-bottom {
  margin-top: -8px;
}

.dsh-ui-overlay .arco-tooltip.arco-trigger-position-top,
.dsh-ui .arco-tooltip.arco-trigger-position-top {
  margin-bottom: -8px;
}

.dsh-ui-overlay .arco-popover-content,
.dsh-ui .arco-popover-content {
  border-radius: var(--dsw-radius-lg, 16px);
  border: 0;
  background: var(--dsw-specific-menu, var(--dsw-alias-bg-layer-2));
  backdrop-filter: var(--dsw-menu-backdrop-filter, none);
  box-shadow: var(--dsw-elevation-prominent);
  color: var(--dsw-alias-label-primary);
  font-size: 14px;
  line-height: 22px;
}

/* ── 头像与徽标 ─────────────────────────────────────────────────── */
.dsh-ui .arco-avatar {
  border-radius: 50%;
  corner-shape: round;
  background-color: var(--dsw-alias-bg-module-platform);
  color: var(--dsw-alias-label-secondary);
}

.dsh-ui .arco-avatar-square {
  border-radius: var(--dsw-radius-md, 12px);
}

.dsh-ui .arco-badge-number,
.dsh-ui .arco-badge-dot {
  background-color: var(--dsw-alias-state-error-primary);
  box-shadow: 0 0 0 2px var(--dsw-alias-bg-base);
}

/* ── 分隔线 ─────────────────────────────────────────────────────── */
.dsh-ui .arco-divider {
  border-color: var(--dsw-alias-border-l1);
}

.dsh-ui .arco-divider-horizontal {
  border-bottom-width: 0.5px;
  margin: 16px 0;
}

.dsh-ui .arco-divider-vertical {
  border-left-width: 0.5px;
  margin: 0 12px;
}

/* ── 排版 ───────────────────────────────────────────────────────── */
.dsh-ui .arco-typography {
  color: var(--dsw-alias-label-primary);
  font-size: 14px;
  line-height: 22px;
}

.dsh-ui h1.arco-typography {
  font-size: 21px;
  line-height: 30px;
  font-weight: 700;
}

.dsh-ui h2.arco-typography {
  font-size: 19px;
  line-height: 28px;
  font-weight: 700;
}

.dsh-ui h3.arco-typography {
  font-size: 18px;
  line-height: 26px;
  font-weight: 700;
}

.dsh-ui .arco-typography-secondary {
  color: var(--dsw-alias-label-secondary);
}

.dsh-ui .arco-typography-success {
  color: var(--dsw-alias-state-success-primary);
}

.dsh-ui .arco-typography-warning {
  color: var(--dsw-alias-state-warn-primary);
}

.dsh-ui .arco-typography-danger {
  color: var(--dsw-alias-state-error-primary);
}

.dsh-ui .arco-typography code,
.dsh-ui .arco-typography kbd {
  border-radius: var(--dsw-radius-xs, 4px);
  background-color: var(--dsw-alias-markdown-inline-code);
  font-family: var(--ds-font-family-code, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
  font-size: 12px;
  padding: 1px 5px;
}

.dsh-ui .arco-typography blockquote {
  border-left: 2px solid var(--dsw-alias-border-l3);
  padding-left: 12px;
  color: var(--dsw-alias-label-secondary);
  margin: 8px 0;
}

@media (prefers-reduced-motion: reduce) {
  .dsh-ui .arco-collapse-item-header,
  .dsh-pill {
    transition: none;
  }
}
`

/**
 * 注入展示组件样式。幂等。
 *
 * @returns 释放函数。
 */
export function injectDisplayStyles(): () => void {
  return injectUiStyle('display/components.css', DISPLAY_CSS)
}

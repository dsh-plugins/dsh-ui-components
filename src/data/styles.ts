/**
 * 数据展示组件追加样式。
 *
 * 表格与树这类高密度组件在 DSH 里有明确的层级：表头用模块底色，行悬停用
 * 交互填充，分割线是 0.5px 的极细线。日期与下拉的浮层表面走统一的菜单材质。
 *
 * @module @dsh-plugin/dsh-ui-components/data/styles
 */
import { injectUiStyle } from '../foundation/style.js'

/** 数据展示组件样式表。 */
export const DATA_CSS = `
/* ── 表格 ───────────────────────────────────────────────────────── */
.dsh-ui .arco-table {
  font-size: 14px;
  line-height: 22px;
  color: var(--dsw-alias-label-primary);
}

.dsh-ui .arco-table-th {
  background-color: var(--dsw-alias-bg-module-platform);
  color: var(--dsw-alias-label-secondary);
  font-size: 13px;
  font-weight: 500;
  border-bottom: 0.5px solid var(--dsw-alias-border-l2);
}

.dsh-ui .arco-table-td {
  border-bottom: 0.5px solid var(--dsw-alias-border-l1);
  color: var(--dsw-alias-label-primary);
}

.dsh-ui .arco-table-tr:hover .arco-table-td {
  background-color: var(--dsw-alias-interactive-bg-hover);
}

.dsh-ui .arco-table-tbody > .arco-table-tr-checked .arco-table-td {
  background-color: var(--dsw-alias-button-ghost-active-fill);
}

.dsh-ui .arco-table-border .arco-table-th,
.dsh-ui .arco-table-border .arco-table-td {
  border-right: 0.5px solid var(--dsw-alias-border-l1);
}

.dsh-ui .arco-table-pagination {
  margin-top: 16px;
}

.dsh-ui .arco-table-empty .arco-table-td {
  color: var(--dsw-alias-label-tertiary);
}

/* 固定列在滚动时应与内容区分开 */
.dsh-ui .arco-table-col-fixed-left-last::after,
.dsh-ui .arco-table-col-fixed-right-first::after {
  box-shadow: none;
  background: none;
}

.dsh-ui .arco-table .arco-table-col-fixed-left::before,
.dsh-ui .arco-table .arco-table-col-fixed-right::before {
  box-shadow: none;
}

/* ── 列表 ───────────────────────────────────────────────────────── */
.dsh-ui .arco-list {
  border-radius: var(--dsw-radius-lg, 16px);
  border-color: var(--dsw-alias-border-l1);
  background-color: transparent;
}

.dsh-ui .arco-list-item {
  border-bottom: 0.5px solid var(--dsw-alias-border-l1);
  color: var(--dsw-alias-label-primary);
  font-size: 14px;
  line-height: 22px;
}

.dsh-ui .arco-list-item-meta-title {
  color: var(--dsw-alias-label-primary);
  font-size: 14px;
  line-height: 22px;
}

.dsh-ui .arco-list-item-meta-description {
  color: var(--dsw-alias-label-tertiary);
  font-size: 13px;
  line-height: 20px;
}

/* ── 树 ─────────────────────────────────────────────────────────── */
.dsh-ui .arco-tree-node-title {
  border-radius: var(--dsw-radius-sm, 8px);
  color: var(--dsw-alias-label-primary);
  font-size: 14px;
  line-height: 28px;
  padding: 0 8px;
}

@media (hover: hover) {
  .dsh-ui .arco-tree-node-title:hover {
    background-color: var(--dsw-alias-interactive-bg-hover);
  }
}

.dsh-ui .arco-tree-node-selected .arco-tree-node-title {
  background-color: var(--dsw-alias-button-ghost-active-fill);
  color: var(--dsw-alias-label-primary);
  font-weight: 500;
}

.dsh-ui .arco-tree-node-switcher {
  color: var(--dsw-alias-label-tertiary);
}

.dsh-ui .arco-tree-node-indent-block {
  width: 16px;
}

/* ── 日期与时间选择 ─────────────────────────────────────────────── */
.dsh-ui .arco-picker {
  border-radius: var(--dsw-radius-md, 12px);
  font-family: inherit;
  font-size: 14px;
}

.dsh-ui .arco-picker:hover,
.dsh-ui .arco-picker-focused {
  border-color: var(--dsw-alias-state-business-primary);
}

.dsh-ui-overlay .arco-picker-container,
.dsh-ui .arco-picker-container {
  border-radius: var(--dsw-radius-lg, 16px);
  border: 0;
  background: var(--dsw-specific-menu, var(--dsw-alias-bg-layer-2));
  backdrop-filter: var(--dsw-menu-backdrop-filter, none);
  box-shadow: var(--dsw-elevation-prominent);
}

.dsh-ui-overlay .arco-picker-header,
.dsh-ui .arco-picker-header {
  border-bottom: 0.5px solid var(--dsw-alias-border-l1);
  color: var(--dsw-alias-label-secondary);
}

.dsh-ui-overlay .arco-picker-cell-selected .arco-picker-date,
.dsh-ui .arco-picker-cell-selected .arco-picker-date {
  background-color: var(--dsw-alias-brand-primary);
  color: var(--dsw-alias-label-primary-foreground);
  border-radius: var(--dsw-radius-sm, 8px);
}

.dsh-ui-overlay .arco-picker-cell-today::after,
.dsh-ui .arco-picker-cell-today::after {
  background-color: var(--dsw-alias-brand-primary);
}

/* ── 级联与树选择 ───────────────────────────────────────────────── */
.dsh-ui-overlay .arco-cascader-popup,
.dsh-ui-overlay .arco-tree-select-popup,
.dsh-ui .arco-cascader-popup,
.dsh-ui .arco-tree-select-popup {
  border-radius: var(--dsw-radius-lg, 16px);
  border: 0;
  background: var(--dsw-specific-menu, var(--dsw-alias-bg-layer-2));
  box-shadow: var(--dsw-elevation-panel);
  padding: 4px;
}

.dsh-ui .arco-cascader-option,
.dsh-ui .arco-tree-select-node-title {
  border-radius: var(--dsw-radius-sm, 8px);
  color: var(--dsw-alias-label-primary);
  font-size: 14px;
  line-height: 22px;
}

.dsh-ui .arco-cascader-option:hover,
.dsh-ui .arco-tree-select-node-title:hover {
  background-color: var(--dsw-alias-interactive-bg-hover);
}

/* ── 统计与时间线 ───────────────────────────────────────────────── */
.dsh-ui .arco-statistic-title {
  font-size: 13px;
  line-height: 20px;
  color: var(--dsw-alias-label-tertiary);
}

.dsh-ui .arco-statistic-value {
  font-size: 22px;
  line-height: 30px;
  font-weight: 600;
  color: var(--dsw-alias-label-primary);
}

.dsh-ui .arco-timeline-item-dot {
  border-color: var(--dsw-alias-brand-primary);
  background-color: var(--dsw-alias-bg-base);
}

.dsh-ui .arco-timeline-item-dot-custom {
  background-color: transparent;
}

.dsh-ui .arco-timeline-item-tail {
  border-left: 0.5px solid var(--dsw-alias-border-l2);
}

.dsh-ui .arco-timeline-item-content {
  font-size: 14px;
  line-height: 22px;
  color: var(--dsw-alias-label-primary);
}

.dsh-ui .arco-timeline-item-label {
  font-size: 12px;
  line-height: 18px;
  color: var(--dsw-alias-label-tertiary);
}

/* ── 图片与轮播 ─────────────────────────────────────────────────── */
.dsh-ui .arco-image {
  border-radius: var(--dsw-radius-lg, 16px);
  overflow: hidden;
}

.dsh-ui-overlay > .arco-image-preview { position: fixed !important; inset: 0; }

.dsh-ui .arco-image-preview-toolbar {
  border-radius: var(--dsw-radius-md, 12px);
  background-color: var(--dsw-alias-bg-mask-3);
}

.dsh-ui .arco-carousel-indicator-item {
  border-radius: 999px;
  corner-shape: round;
  background-color: var(--dsw-alias-bg-mask-drop);
}

.dsh-ui .arco-carousel-indicator-item-active {
  background-color: var(--snow);
}

/* ── 日历 ───────────────────────────────────────────────────────── */
.dsh-ui .arco-calendar {
  border-radius: var(--dsw-radius-lg, 16px);
  border-color: var(--dsw-alias-border-l1);
}

.dsh-ui .arco-calendar-header {
  border-bottom: 0.5px solid var(--dsw-alias-border-l1);
}

.dsh-ui .arco-calendar-cell {
  color: var(--dsw-alias-label-primary);
}

.dsh-ui .arco-calendar-cell-today {
  color: var(--dsw-alias-state-business-primary);
}

@media (prefers-reduced-motion: reduce) {
  .dsh-ui .arco-tree-node-title,
  .dsh-ui .arco-table-td {
    transition: none;
  }
}
`

/**
 * 注入数据展示组件样式。幂等。
 *
 * @returns 释放函数。
 */
export function injectDataStyles(): () => void {
  return injectUiStyle('data/components.css', DATA_CSS)
}

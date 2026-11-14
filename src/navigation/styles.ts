/**
 * 导航组件追加样式。
 *
 * 菜单表面使用宿主菜单材质（`--dsw-specific-menu` 配 `--dsw-menu-backdrop-filter`），
 * 浮起表面用描边阴影而不是边框，与宿主自己的下拉菜单一致。
 *
 * @module @dsh-plugin/dsh-ui-components/navigation/styles
 */
import { injectUiStyle } from '../foundation/style.js'

/** 导航组件样式表。 */
export const NAVIGATION_CSS = `
/* ── 菜单与下拉 ─────────────────────────────────────────────────── */
.dsh-ui .arco-menu {
  background-color: transparent;
  border: 0;
  font-size: 14px;
  line-height: 22px;
}

.dsh-ui .arco-menu-item,
.dsh-ui .arco-menu-pop-header {
  border-radius: var(--dsw-radius-sm, 8px);
  color: var(--dsw-alias-label-secondary);
  line-height: 32px;
  height: 32px;
  padding: 0 10px;
  margin: 2px 0;
}

@media (hover: hover) {
  .dsh-ui .arco-menu-item:hover,
  .dsh-ui .arco-menu-pop-header:hover {
    background-color: var(--dsw-alias-interactive-bg-hover);
    color: var(--dsw-alias-label-primary);
  }
}

.dsh-ui .arco-menu-selected,
.dsh-ui .arco-menu-item.arco-menu-selected {
  background-color: var(--dsw-alias-button-ghost-active-fill);
  color: var(--dsw-alias-label-primary);
  font-weight: 500;
}

.dsh-ui .arco-menu-inline-header {
  color: var(--dsw-alias-label-tertiary);
  font-size: 12px;
  line-height: 18px;
  padding: 8px 10px 4px;
  height: auto;
}

.dsh-ui-overlay .arco-dropdown-menu,
.dsh-ui .arco-dropdown-menu {
  border-radius: var(--dsw-radius-lg, 16px);
  border: 0;
  background: var(--dsw-specific-menu, var(--dsw-alias-bg-layer-2));
  backdrop-filter: var(--dsw-menu-backdrop-filter, none);
  box-shadow: var(--dsw-elevation-panel);
  padding: 4px;
  min-width: 160px;
}

.dsh-ui-overlay .arco-dropdown-menu-item,
.dsh-ui .arco-dropdown-menu-item {
  border-radius: var(--dsw-radius-sm, 8px);
  font-size: 14px;
  line-height: 22px;
  height: 32px;
  color: var(--dsw-alias-label-primary);
}

@media (hover: hover) {
  .dsh-ui-overlay .arco-dropdown-menu-item:hover,
  .dsh-ui .arco-dropdown-menu-item:hover {
    background-color: var(--dsw-alias-interactive-bg-hover);
  }
}

.dsh-ui-overlay .arco-dropdown-menu-item-disabled,
.dsh-ui .arco-dropdown-menu-item-disabled {
  color: var(--dsw-alias-label-caption);
}

/* ── 标签页 ─────────────────────────────────────────────────────── */
.dsh-ui .arco-tabs-header-nav::before {
  background-color: var(--dsw-alias-border-l1);
}

.dsh-ui .arco-tabs-header-title {
  font-size: 14px;
  line-height: 22px;
  color: var(--dsw-alias-label-tertiary);
  font-weight: 400;
}

.dsh-ui .arco-tabs-header-title:hover {
  color: var(--dsw-alias-label-secondary);
}

.dsh-ui .arco-tabs-header-title-active,
.dsh-ui .arco-tabs-header-title-active:hover {
  color: var(--dsw-alias-label-primary);
  font-weight: 500;
}

.dsh-ui .arco-tabs-header-ink {
  background-color: var(--dsw-alias-brand-primary);
  height: 2px;
}

.dsh-ui .arco-tabs-content {
  padding-top: 16px;
}

/* 卡片式标签改为胶囊分段 */
.dsh-ui .dsh-tabs--segment .arco-tabs-header-nav {
  background-color: var(--dsw-alias-interactive-bg-hover-solid);
  border-radius: var(--dsw-radius-md, 12px);
  padding: 4px;
  display: inline-flex;
}

.dsh-ui .dsh-tabs--segment .arco-tabs-header-nav::before {
  display: none;
}

/* Arco 的行式标签给首个标题额外加了 16px 左外边距，分段外观下会变成大面积留白。 */
.dsh-ui .dsh-tabs--segment .arco-tabs-header > .arco-tabs-header-title:first-of-type,
.dsh-ui .dsh-tabs--segment .arco-tabs-header-scroll > .arco-tabs-header-title:first-of-type {
  margin-left: 0;
}

.dsh-ui .dsh-tabs--segment .arco-tabs-header-title {
  border-radius: var(--dsw-radius-sm, 8px);
  height: 28px;
  line-height: 20px;
  padding: 4px 16px;
  margin: 0;
  font-size: 13px;
  font-weight: 500;
}

.dsh-ui .dsh-tabs--segment .arco-tabs-header-title-active {
  background-color: var(--dsw-alias-bg-layer-1);
  box-shadow: var(--dsw-elevation-soft);
}

.dsh-ui .dsh-tabs--segment .arco-tabs-header-ink {
  display: none;
}

/* ── 面包屑 ─────────────────────────────────────────────────────── */
.dsh-ui .arco-breadcrumb {
  font-size: 13px;
  line-height: 20px;
  color: var(--dsw-alias-label-tertiary);
}

.dsh-ui .arco-breadcrumb-item a,
.dsh-ui .arco-breadcrumb-item-link {
  color: var(--dsw-alias-label-tertiary);
  font-weight: 400;
}

.dsh-ui .arco-breadcrumb-item a:hover,
.dsh-ui .arco-breadcrumb-item-link:hover {
  color: var(--dsw-alias-label-primary);
}

.dsh-ui .arco-breadcrumb-item:last-child {
  color: var(--dsw-alias-label-primary);
  font-weight: 500;
}

/* ── 分页 ───────────────────────────────────────────────────────── */
.dsh-ui .arco-pagination-item {
  border-radius: var(--dsw-radius-sm, 8px);
  border: 0;
  background-color: transparent;
  color: var(--dsw-alias-label-secondary);
  font-size: 13px;
  min-width: 28px;
  height: 28px;
  line-height: 28px;
}

@media (hover: hover) {
  .dsh-ui .arco-pagination-item:hover {
    background-color: var(--dsw-alias-interactive-bg-hover);
    color: var(--dsw-alias-label-primary);
  }
}

.dsh-ui .arco-pagination-item-active {
  background-color: var(--dsw-alias-button-ghost-active-fill);
  color: var(--dsw-alias-label-primary);
  font-weight: 500;
}

.dsh-ui .arco-pagination-item-disabled {
  color: var(--dsw-alias-label-caption);
}

/* ── 步骤条 ─────────────────────────────────────────────────────── */
.dsh-ui .arco-steps-item-title {
  font-size: 14px;
  line-height: 22px;
  color: var(--dsw-alias-label-primary);
}

.dsh-ui .arco-steps-item-description {
  font-size: 12px;
  line-height: 18px;
  color: var(--dsw-alias-label-tertiary);
}

.dsh-ui .arco-steps-item-wait .arco-steps-item-title {
  color: var(--dsw-alias-label-tertiary);
}

.dsh-ui .arco-steps-item-process .arco-steps-icon,
.dsh-ui .arco-steps-item-finish .arco-steps-icon {
  background-color: var(--dsw-alias-brand-primary);
  color: var(--dsw-alias-label-primary-foreground);
}

.dsh-ui .arco-steps-item-wait .arco-steps-icon {
  background-color: var(--dsw-alias-bg-module-platform);
  color: var(--dsw-alias-label-tertiary);
}

/* ── 分段控件 ───────────────────────────────────────────────────── */
.dsh-segmented {
  position: relative;
  display: inline-grid;
  /* 放在 grid 容器里时，inline-grid 仍会被拉伸到整行；按内容收缩才符合宿主的
     表单控件观感。需要撑满时用 block 形态。 */
  justify-self: start;
  width: fit-content;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  gap: 2px;
  padding: 4px;
  border-radius: var(--dsw-radius-md, 12px);
  background-color: var(--dsw-alias-interactive-bg-hover-solid);
}

.dsh-segmented--block {
  display: grid;
  width: 100%;
  justify-self: stretch;
}

.dsh-segmented__indicator {
  position: absolute;
  top: 4px;
  left: 4px;
  width: calc((100% - 8px - 2px * (var(--dsh-segment-count) - 1)) / var(--dsh-segment-count));
  height: calc(100% - 8px);
  border: 0;
  border-radius: var(--dsw-radius-sm, 8px);
  background-color: var(--dsw-alias-bg-layer-1);
  box-shadow: var(--dsw-elevation-soft);
  transform: translateX(calc(var(--dsh-segment-index) * (100% + 2px)));
  transition: transform 160ms ease;
  pointer-events: none;
}

.dsh-segmented__tab {
  position: relative;
  z-index: 1;
  height: 28px;
  padding: 0 16px;
  border: 0;
  border-radius: var(--dsw-radius-sm, 8px);
  background-color: transparent;
  color: var(--dsw-alias-label-secondary);
  font-family: inherit;
  font-size: 13px;
  line-height: 20px;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition: color 120ms ease;
}

.dsh-segmented__tab[aria-selected='true'] {
  color: var(--dsw-alias-label-primary);
}

@media (hover: hover) {
  .dsh-segmented__tab:hover:not(:disabled) {
    color: var(--dsw-alias-label-primary);
  }
}

.dsh-segmented__tab:disabled {
  cursor: default;
  opacity: 0.4;
}

/* ── 折叠标题行 ─────────────────────────────────────────────────── */
.dsh-disclosure {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
}

.dsh-disclosure__header {
  display: flex;
  align-items: center;
  min-width: 0;
  gap: 6px;
  height: 24px;
  color: var(--dsw-alias-label-tertiary);
  transition: color 100ms ease;
}

.dsh-disclosure__header--expandable {
  cursor: pointer;
  border: 0;
  background: none;
  padding: 0;
  /* 按钮不继承父级文字颜色，不写这一行在深色主题下会是浏览器默认的黑色。 */
  color: inherit;
  font-family: inherit;
  font-size: 13px;
  line-height: 24px;
  text-align: left;
  width: 100%;
}

@media (hover: hover) {
  .dsh-disclosure__header--expandable:hover {
    color: var(--dsw-alias-label-secondary);
  }
}

.dsh-disclosure__leading {
  display: inline-flex;
  flex: none;
  width: 16px;
  height: 16px;
  align-items: center;
  justify-content: center;
  color: inherit;
}

.dsh-disclosure__title {
  flex: none;
  font-size: 13px;
  line-height: 24px;
  color: inherit;
}

.dsh-disclosure__content {
  min-width: 0;
  color: var(--dsw-alias-label-primary);
}

/* ── 状态点 ─────────────────────────────────────────────────────── */
.dsh-state-dot {
  position: relative;
  display: inline-block;
  flex: none;
  width: 10px;
  height: 10px;
}

.dsh-state-dot::after {
  content: '';
  position: absolute;
  inset: 20%;
  border-radius: 50%;
  corner-shape: round;
  background-color: currentColor;
}

.dsh-state-dot[data-state='done'] {
  color: var(--dsw-alias-state-success-primary);
}

.dsh-state-dot[data-state='warning'] {
  color: var(--dsw-alias-state-warn-primary);
}

.dsh-state-dot[data-state='error'] {
  color: var(--dsw-alias-state-error-primary);
}

.dsh-state-dot[data-state='idle'] {
  color: var(--dsw-alias-state-idle-primary);
}

.dsh-state-dot[data-state='ongoing'] {
  color: var(--dsw-alias-label-tertiary);
}

.dsh-state-dot[data-state='ongoing']::after {
  inset: 0;
  border-radius: 50%;
  corner-shape: round;
  background: none;
  border: 2px solid currentColor;
  border-right-color: transparent;
  animation: dsh-state-dot-spin 1.5s linear infinite;
}

@keyframes dsh-state-dot-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .dsh-state-dot[data-state='ongoing']::after {
    animation: none;
  }

  .dsh-segmented__indicator,
  .dsh-segmented__tab,
  .dsh-disclosure__header {
    transition: none;
  }
}
`

/**
 * 注入导航组件样式。幂等。
 *
 * @returns 释放函数。
 */
export function injectNavigationStyles(): () => void {
  return injectUiStyle('navigation/components.css', NAVIGATION_CSS)
}

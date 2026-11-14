/**
 * DSH 专属组合件样式。
 *
 * 这一层是相对直接用 Arco 的主要增量：设置页卡片、弹出层外壳、与宿主一致
 * 的下拉选择器、JSON 树与文件类型徽标。全部由前几批的原子组件与令牌组合，
 * 不引入新依赖。
 *
 * @module @dsh-plugin/dsh-ui-components/composites/styles
 */
import { injectUiStyle } from '../foundation/style.js'
import { G } from '../foundation/tokens.js'

/** DSH 专属组合件样式表。 */
export const COMPOSITES_CSS = `
/* ── 设置页卡片 ─────────────────────────────────────────────────── */
.dsh-settings-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  box-sizing: border-box;
  border-radius: var(--dsw-radius-xl, 20px);
  background-color: var(--dsw-alias-settings-card-fill, var(--dsw-alias-bg-layer-2));
  border: 0.5px solid var(--dsw-alias-settings-card-stroke, var(--dsw-alias-border-l4));
}

.dsh-settings-card__title {
  margin: 0;
  font-size: 15px;
  line-height: 22px;
  font-weight: 500;
  color: var(--dsw-alias-label-primary);
}

.dsh-settings-card__desc {
  font-size: 13px;
  line-height: 20px;
  color: var(--dsw-alias-label-tertiary);
}

.dsh-settings-card__body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

.dsh-settings-card__footer {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* ── 设置行 ─────────────────────────────────────────────────────── */
.dsh-settings-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-width: 0;
}

.dsh-settings-row--stack {
  flex-direction: column;
  align-items: stretch;
  gap: 6px;
}

.dsh-settings-row__text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.dsh-settings-row__label {
  font-size: 13px;
  line-height: 20px;
  font-weight: 500;
  color: var(--dsw-alias-label-secondary);
}

.dsh-settings-row__desc {
  font-size: 12px;
  line-height: 18px;
  color: var(--dsw-alias-label-tertiary);
}

.dsh-settings-row__control {
  flex: none;
  min-width: 0;
}

.dsh-settings-row--stack .dsh-settings-row__control {
  flex: 1 1 auto;
}

/* ── 弹出层外壳 ─────────────────────────────────────────────────── */
.dsh-panel-shell {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${G.overlayMargin}px 24px;
  box-sizing: border-box;
}

.dsh-panel-shell__mask {
  position: absolute;
  inset: 0;
  background-color: var(--dsw-alias-bg-mask-1);
}

.dsh-panel-shell__card {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: min(560px, 100%);
  max-height: calc(100dvh - ${G.overlayMargin * 2}px);
  border-radius: var(--dsw-radius-panel, 28px);
  border: 0;
  background-color: var(--dsw-alias-bg-layer-2);
  box-shadow: var(--dsw-elevation-prominent);
  overflow: hidden;
}

.dsh-panel-shell__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex: none;
  padding: 20px 24px 14px;
  border-bottom: 0.5px solid var(--dsw-alias-border-l1);
}

.dsh-panel-shell__title {
  margin: 0;
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  color: var(--dsw-alias-label-primary);
}

.dsh-panel-shell__body {
  flex: 1 1 auto;
  min-height: 0;
  padding: 16px 24px;
  overflow: hidden;
}

.dsh-panel-shell__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  flex: none;
  padding: 14px 24px;
  border-top: 0.5px solid var(--dsw-alias-border-l1);
}

/* ── 宿主风格下拉 ───────────────────────────────────────────────── */
.dsh-menu-select {
  position: relative;
  width: 100%;
  min-width: 0;
}

.dsh-menu-select__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
  min-height: 32px;
  padding: 5px 10px;
  font-family: inherit;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  color: var(--dsw-alias-label-primary);
  background-color: var(--dsw-alias-bg-layer-1);
  border: 0.5px solid var(--dsw-alias-border-l4);
  border-radius: var(--dsw-radius-md, 12px);
  cursor: pointer;
}

.dsh-menu-select__trigger:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.dsh-menu-select__trigger:focus-visible {
  outline: var(--dsw-focus-ring-width, 2px) solid var(--dsw-alias-state-business-primary);
  outline-offset: 2px;
}

.dsh-menu-select__text {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dsh-menu-select__text--placeholder {
  color: var(--dsw-alias-label-dimmed);
}

.dsh-menu-select__caret {
  display: inline-flex;
  flex: none;
  align-items: center;
  color: var(--dsw-alias-label-tertiary);
}

.dsh-menu-select__popup {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 1050;
  margin-top: 4px;
  max-height: 264px;
  overflow: auto;
  padding: 4px;
  border-radius: var(--dsw-radius-lg, 16px);
  background: var(--dsw-specific-menu, var(--dsw-alias-bg-layer-2));
  backdrop-filter: var(--dsw-menu-backdrop-filter, none);
  box-shadow: var(--dsw-elevation-panel);
}

.dsh-menu-select__popup--above {
  margin-top: 0;
  margin-bottom: 4px;
  bottom: 100%;
  top: auto;
}

.dsh-menu-select__option {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
  min-height: 32px;
  padding: 5px 10px;
  border: 0;
  border-radius: var(--dsw-radius-sm, 8px);
  background: none;
  font-family: inherit;
  font-size: 14px;
  line-height: 22px;
  text-align: left;
  color: var(--dsw-alias-label-primary);
  cursor: pointer;
}

@media (hover: hover) {
  .dsh-menu-select__option:hover:not(:disabled) {
    background-color: var(--dsw-alias-interactive-bg-hover);
  }
}

.dsh-menu-select__option--selected {
  background-color: var(--dsw-alias-button-ghost-active-fill);
  font-weight: 500;
}

.dsh-menu-select__option:disabled {
  color: var(--dsw-alias-label-caption);
  cursor: not-allowed;
}

.dsh-menu-select__check {
  margin-left: auto;
  display: inline-flex;
  color: var(--dsw-alias-label-secondary);
}

/* ── JSON 树 ────────────────────────────────────────────────────── */
.dsh-json-tree {
  font-family: var(--ds-font-family-code, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
  font-size: 12px;
  line-height: 20px;
  color: var(--dsw-alias-json-tree-punctuation, var(--dsw-alias-label-primary));
}

.dsh-json-tree__row {
  display: flex;
  align-items: baseline;
  gap: 4px;
  min-width: 0;
  padding: 0 4px;
  border-radius: var(--dsw-radius-xs, 4px);
}

.dsh-json-tree__toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  flex: none;
  padding: 0;
  border: 0;
  background: none;
  color: var(--dsw-alias-json-tree-icon, var(--dsw-alias-label-tertiary));
  cursor: pointer;
}

.dsh-json-tree__key {
  color: var(--dsw-alias-json-tree-property, var(--dsw-alias-label-secondary));
  white-space: pre;
}

.dsh-json-tree__string {
  color: var(--dsw-alias-json-tree-string, var(--dsw-alias-label-primary));
  word-break: break-all;
}

.dsh-json-tree__number {
  color: var(--dsw-alias-json-tree-number, var(--dsw-alias-label-primary));
}

.dsh-json-tree__keyword {
  color: var(--dsw-alias-json-tree-keyword, var(--dsw-alias-label-primary));
}

.dsh-json-tree__punct {
  color: var(--dsw-alias-json-tree-punctuation, var(--dsw-alias-label-tertiary));
}

.dsh-json-tree__children {
  margin-left: 8px;
  border-left: 0.5px solid var(--dsw-alias-border-l1);
  padding-left: 8px;
}

.dsh-json-tree__summary {
  color: var(--dsw-alias-json-tree-icon, var(--dsw-alias-label-tertiary));
}

/* ── 代码块外壳 ─────────────────────────────────────────────────── */
.dsh-code-shell {
  display: flex;
  flex-direction: column;
  border-radius: var(--dsw-radius-lg, 16px);
  background-color: var(--dsw-alias-markdown-code-block);
  overflow: hidden;
}

.dsh-code-shell__banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex: none;
  padding: 6px 12px;
  background-color: var(--dsw-alias-markdown-code-block-banner);
  font-size: 12px;
  line-height: 18px;
  color: var(--dsw-alias-label-tertiary);
}

.dsh-code-shell__lang {
  font-family: var(--ds-font-family-code, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
}

.dsh-code-shell__actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.dsh-code-shell__body {
  min-height: 0;
  padding: 10px 12px;
  font-family: var(--ds-font-family-code, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
  font-size: 12px;
  line-height: 20px;
  color: var(--dsw-alias-label-primary);
  overflow: auto;
}

.dsh-code-shell__body pre {
  margin: 0;
  white-space: pre;
}

/* ── 文件类型徽标 ───────────────────────────────────────────────── */
.dsh-file-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  min-width: 24px;
  height: 16px;
  padding: 0 5px;
  border-radius: var(--dsw-radius-xs, 4px);
  font-family: var(--ds-font-family-code, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
  font-size: 10px;
  line-height: 16px;
  font-weight: 500;
  text-transform: uppercase;
  background-color: var(--dsw-alias-bg-module-platform);
  color: var(--dsw-alias-label-tertiary);
}

/* ── 状态行 ─────────────────────────────────────────────────────── */
.dsh-status-line {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  font-size: 13px;
  line-height: 20px;
  color: var(--dsw-alias-label-tertiary);
}

.dsh-status-line__text {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dsh-status-line__time {
  flex: none;
  font-variant-numeric: tabular-nums;
  color: var(--dsw-alias-label-caption);
}

@media (prefers-reduced-motion: reduce) {
  .dsh-menu-select__popup {
    animation: none;
  }
}
`

/**
 * 注入 DSH 专属组合件样式。幂等。
 *
 * @returns 释放函数。
 */
export function injectCompositeStyles(): () => void {
  return injectUiStyle('composites/components.css', COMPOSITES_CSS)
}

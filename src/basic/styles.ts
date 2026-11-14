/**
 * 基础控件追加样式。
 *
 * 桥接样式表已经把 Arco 的配色与圆角整体改指 DSH 令牌，这里只补充那些
 * 必须改结构而不是改变量的部分：控件高度、内边距、字重与勾选控件的几何。
 *
 * @module @dsh-plugin/dsh-ui-components/basic/styles
 */
import { injectUiStyle } from '../foundation/style.js'

/** 基础控件样式表。 */
export const BASIC_CSS = `
/* ── 按钮 ────────────────────────────────────────────────────────── */
/* Arco 的按钮基线是 inline-block，落进 flex 容器后会被块化，文字随即失去
   垂直居中并在小尺寸下被裁切。DSH 的按钮是 flex 居中的，这里显式改成同一
   语义，不再依赖容器的布局方式。 */
.dsh-ui .arco-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  font-weight: 500;
  box-sizing: border-box;
  gap: 6px;
}

.dsh-ui .dsh-btn-md .arco-btn,
.dsh-ui .arco-btn-size-default {
  height: 36px;
  font-size: 14px;
  line-height: 22px;
  padding: 0 14px;
}

.dsh-ui .arco-btn-size-small {
  height: 28px;
  font-size: 12px;
  line-height: 18px;
  padding: 0 10px;
}

.dsh-ui .arco-btn-size-large {
  height: 44px;
  font-size: 15px;
  line-height: 24px;
  padding: 0 18px;
  border-radius: var(--dsw-radius-lg, 16px);
}

.dsh-ui .arco-btn-shape-circle {
  border-radius: 50%;
  corner-shape: round;
  width: 36px;
  padding: 0;
}

.dsh-ui .arco-btn-shape-circle.arco-btn-size-small {
  width: 28px;
}

/* Arco 给所有按钮默认带上 shape="square"，只有真正省略文字的图标按钮才该是
   固定方形，因此这里按 icon-only 收紧而不是按 shape。 */
.dsh-ui .arco-btn.arco-btn-icon-only {
  width: 36px;
  padding: 0;
}

.dsh-ui .arco-btn.arco-btn-icon-only.arco-btn-size-small {
  width: 28px;
}

.dsh-ui .arco-btn.arco-btn-icon-only.arco-btn-size-large {
  width: 44px;
}

.dsh-ui .arco-btn-icon-only {
  gap: 0;
}

/* ── 输入类控件 ──────────────────────────────────────────────────── */
.dsh-ui .arco-input,
.dsh-ui .arco-input-inner-wrapper,
.dsh-ui .arco-textarea,
.dsh-ui .arco-input-number {
  font-family: inherit;
  font-size: 14px;
  line-height: 22px;
  border-radius: var(--dsw-radius-md, 12px);
}

.dsh-ui .arco-input-size-default,
.dsh-ui .arco-input-inner-wrapper-default {
  height: 32px;
}

.dsh-ui .arco-input-size-small,
.dsh-ui .arco-input-inner-wrapper-small {
  height: 28px;
  font-size: 12px;
  border-radius: var(--dsw-radius-sm, 8px);
}

.dsh-ui .arco-input-size-large,
.dsh-ui .arco-input-inner-wrapper-large {
  height: 44px;
  border-radius: var(--dsw-radius-lg, 16px);
}

.dsh-ui .arco-input::placeholder,
.dsh-ui .arco-textarea::placeholder {
  color: var(--dsw-alias-label-dimmed);
}

/* Arco 的错误态默认用整块浅红填充；DSH 的输入框只换描边与焦点环，填充保持
   背景色，避免表单错误时整片发红。 */
.dsh-ui .arco-input-error,
.dsh-ui .arco-textarea-error,
.dsh-ui .arco-input-wrapper-error,
.dsh-ui .arco-select-view-error {
  background-color: var(--dsw-alias-bg-layer-1);
  border-color: var(--dsw-alias-state-error-primary);
}

.dsh-ui .arco-input-error:hover,
.dsh-ui .arco-textarea-error:hover,
.dsh-ui .arco-input-wrapper-error:hover,
.dsh-ui .arco-select-view-error:hover {
  background-color: var(--dsw-alias-bg-layer-1);
  border-color: var(--dsw-alias-state-error-primary);
}

.dsh-ui .arco-input-wrapper.arco-input-error > .arco-input {
  background: transparent;
}

.dsh-ui .dsh-mono .arco-input,
.dsh-ui .arco-input.dsh-mono,
.dsh-ui .arco-textarea.dsh-mono {
  font-family: var(--ds-font-family-code, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
}

.dsh-ui .arco-textarea {
  padding: 7px 12px;
  min-height: 72px;
}

.dsh-ui .dsh-textarea-sm.arco-textarea {
  font-size: 12px;
  line-height: 18px;
  padding: 5px 10px;
  min-height: 60px;
  border-radius: var(--dsw-radius-sm, 8px);
}

.dsh-ui .dsh-textarea-lg.arco-textarea {
  font-size: 15px;
  line-height: 24px;
  padding: 10px 14px;
  min-height: 96px;
  border-radius: var(--dsw-radius-lg, 16px);
}

/* ── 选择器 ─────────────────────────────────────────────────────── */
.dsh-ui .arco-select-view,
.dsh-ui .arco-select-view-single {
  font-family: inherit;
  font-size: 14px;
  border-radius: var(--dsw-radius-md, 12px);
}

.dsh-ui .arco-select-size-default .arco-select-view {
  height: 32px;
}

.dsh-ui .arco-select-size-small .arco-select-view {
  height: 28px;
  font-size: 12px;
  border-radius: var(--dsw-radius-sm, 8px);
}

.dsh-ui .arco-select-popup,
.dsh-ui .arco-select-dropdown {
  border-radius: var(--dsw-radius-lg, 16px);
  padding: 4px;
}

.dsh-ui .arco-select-option {
  border-radius: var(--dsw-radius-sm, 8px);
  min-height: 32px;
  line-height: 22px;
  font-size: 14px;
}

.dsh-ui .arco-select-option-hover {
  background-color: var(--dsw-alias-interactive-bg-hover);
}

.dsh-ui .arco-select-option-selected {
  background-color: var(--dsw-alias-button-ghost-active-fill);
  color: var(--dsw-alias-label-primary);
  font-weight: 500;
}

/* ── 开关 ───────────────────────────────────────────────────────── */
.dsh-ui .arco-switch {
  min-width: 36px;
  height: 20px;
  border-radius: 999px;
  corner-shape: round;
  background-color: var(--dsw-alias-border-l3);
}

.dsh-ui .arco-switch-checked {
  background-color: var(--dsw-alias-brand-primary);
}

.dsh-ui .arco-switch-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  corner-shape: round;
  background-color: var(--dsw-alias-switch-thumb);
  top: 2px;
  left: 2px;
}

.dsh-ui .arco-switch-checked .arco-switch-dot {
  background-color: var(--dsw-alias-label-primary-foreground);
  left: calc(100% - 18px);
}

.dsh-ui .arco-switch[disabled] {
  opacity: 0.4;
}

/* ── 复选框与单选框 ─────────────────────────────────────────────── */
.dsh-ui .arco-checkbox,
.dsh-ui .arco-radio {
  font-size: 14px;
  line-height: 20px;
  padding-left: 24px;
}

.dsh-ui .arco-checkbox-mask,
.dsh-ui .arco-radio-mask {
  width: 16px;
  height: 16px;
  border-radius: var(--dsw-radius-xs, 4px);
  border-width: 1px;
  border-color: var(--dsw-alias-border-l4);
  background-color: transparent;
  top: 2px;
}

.dsh-ui .arco-radio-mask {
  border-radius: 50%;
  corner-shape: round;
}

.dsh-ui .arco-checkbox-checked .arco-checkbox-mask,
.dsh-ui .arco-radio-checked .arco-radio-mask {
  background-color: var(--dsw-alias-brand-primary);
  border-color: var(--dsw-alias-brand-primary);
}

.dsh-ui .arco-checkbox-checked .arco-checkbox-mask-icon {
  color: var(--dsw-alias-label-primary-foreground);
}

.dsh-ui .arco-radio-checked .arco-radio-mask::after {
  background-color: var(--dsw-alias-label-primary-foreground);
}

/* ── 数字输入与滑块 ─────────────────────────────────────────────── */
.dsh-ui .arco-input-number-step-button {
  border-color: transparent;
  color: var(--dsw-alias-label-tertiary);
}

.dsh-ui .arco-slider-road {
  background-color: var(--dsw-alias-border-l2);
}

.dsh-ui .arco-slider-bar {
  background-color: var(--dsw-alias-brand-primary);
}

.dsh-ui .arco-slider-btn {
  border-color: var(--dsw-alias-brand-primary);
  background-color: var(--dsw-alias-bg-layer-1);
}

/* ── 表单 ───────────────────────────────────────────────────────── */
.dsh-ui .arco-form-label-item > label {
  font-size: 13px;
  font-weight: 500;
  color: var(--dsw-alias-label-secondary);
}

.dsh-ui .arco-form-item-message {
  font-size: 12px;
  line-height: 18px;
}

.dsh-ui .arco-form-item-status-error .arco-input,
.dsh-ui .arco-form-item-status-error .arco-textarea,
.dsh-ui .arco-form-item-status-error .arco-select-view {
  border-color: var(--dsw-alias-state-error-primary);
}

/* ── 上传 ───────────────────────────────────────────────────────── */
.dsh-ui .arco-upload-trigger,
.dsh-ui .arco-upload-drag {
  border-radius: var(--dsw-radius-lg, 16px);
  border-color: var(--dsw-alias-border-l3);
  background-color: var(--dsw-alias-bg-layer-1);
}

.dsh-ui .arco-upload-drag:hover {
  border-color: var(--dsw-alias-state-business-primary);
}

/* 减少动效偏好下关闭过渡 */
@media (prefers-reduced-motion: reduce) {
  .dsh-ui .arco-btn,
  .dsh-ui .arco-switch-dot,
  .dsh-ui .arco-slider-btn {
    transition: none;
  }
}
`

/**
 * 注入基础控件样式。幂等，可在任意控件首次渲染时调用。
 *
 * @returns 释放函数。
 */
export function injectBasicStyles(): () => void {
  return injectUiStyle('basic/controls.css', BASIC_CSS)
}

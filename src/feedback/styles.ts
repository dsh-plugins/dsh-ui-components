/**
 * 反馈与浮层组件追加样式。
 *
 * 弹窗与抽屉按全局规范处理：与窗口上下各留至少 120px，最大高度
 * `calc(100dvh - 240px)`，超出部分在内部滚动，标题与操作行保持可见。
 *
 * @module @dsh-plugin/dsh-ui-components/feedback/styles
 */
import { injectUiStyle } from '../foundation/style.js'
import { G } from '../foundation/tokens.js'

/** 反馈与浮层样式表。 */
export const FEEDBACK_CSS = `
/* ── 提示条 ─────────────────────────────────────────────────────── */
.dsh-ui .arco-alert {
  border-radius: var(--dsw-radius-lg, 16px);
  border: 0.5px solid var(--dsw-alias-border-l2);
  font-size: 14px;
  line-height: 22px;
  padding: 12px 16px;
}

.dsh-ui .arco-alert-info {
  border-color: color-mix(in srgb, var(--dsw-alias-state-business-primary) 28%, transparent);
  background-color: color-mix(in srgb, var(--dsw-alias-state-business-primary) 8%, transparent);
  color: var(--dsw-alias-label-primary);
}

.dsh-ui .arco-alert-success {
  border-color: color-mix(in srgb, var(--dsw-alias-state-success-primary) 28%, transparent);
  background-color: color-mix(in srgb, var(--dsw-alias-state-success-primary) 8%, transparent);
  color: var(--dsw-alias-label-primary);
}

.dsh-ui .arco-alert-warning {
  border-color: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 32%, transparent);
  background-color: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 10%, transparent);
  color: var(--dsw-alias-label-primary);
}

.dsh-ui .arco-alert-error {
  border-color: color-mix(in srgb, var(--dsw-alias-state-error-primary) 28%, transparent);
  background-color: color-mix(in srgb, var(--dsw-alias-state-error-primary) 8%, transparent);
  color: var(--dsw-alias-label-primary);
}

.dsh-ui .arco-alert-title {
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;
}

.dsh-ui .arco-alert-content {
  font-size: 13px;
  line-height: 20px;
  color: var(--dsw-alias-label-secondary);
}

/* ── 弹窗 ───────────────────────────────────────────────────────── */
.dsh-ui-overlay .arco-modal-mask,
.dsh-ui .arco-modal-mask {
  background-color: var(--dsw-alias-bg-mask-1);
  backdrop-filter: none;
}

.dsh-ui-overlay .arco-modal,
.dsh-ui .arco-modal {
  border-radius: var(--dsw-radius-panel, 28px);
  border: 0;
  box-shadow: var(--dsw-elevation-prominent);
  background-color: var(--dsw-alias-bg-layer-2);
  max-height: calc(100dvh - ${G.overlayMargin * 2}px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.dsh-ui-overlay .arco-modal-header,
.dsh-ui .arco-modal-header {
  border-bottom: 0.5px solid var(--dsw-alias-border-l1);
  padding: 20px 24px 14px;
  flex: none;
}

.dsh-ui-overlay .arco-modal-title,
.dsh-ui .arco-modal-title {
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  color: var(--dsw-alias-label-primary);
  text-align: left;
}

.dsh-ui-overlay .arco-modal-content,
.dsh-ui .arco-modal-content {
  padding: 16px 24px;
  font-size: 14px;
  line-height: 22px;
  color: var(--dsw-alias-label-primary);
  overflow: auto;
  min-height: 0;
}

.dsh-ui-overlay .arco-modal-footer,
.dsh-ui .arco-modal-footer {
  border-top: 0.5px solid var(--dsw-alias-border-l1);
  padding: 14px 24px;
  flex: none;
}

/* ── 抽屉 ───────────────────────────────────────────────────────── */
.dsh-ui-overlay .arco-drawer,
.dsh-ui .arco-drawer {
  background-color: var(--dsw-alias-bg-layer-2);
  border: 0;
  max-height: calc(100dvh - ${G.overlayMargin * 2}px);
}

.dsh-ui-overlay .arco-drawer-header,
.dsh-ui .arco-drawer-header {
  border-bottom: 0.5px solid var(--dsw-alias-border-l1);
  height: auto;
  padding: 18px 24px;
}

.dsh-ui-overlay .arco-drawer-title,
.dsh-ui .arco-drawer-title {
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  color: var(--dsw-alias-label-primary);
}

.dsh-ui-overlay .arco-drawer-content,
.dsh-ui .arco-drawer-content {
  padding: 20px 24px;
  font-size: 14px;
  line-height: 22px;
  color: var(--dsw-alias-label-primary);
  overflow: auto;
}

/* ── 全局消息 ───────────────────────────────────────────────────── */
.dsh-ui-overlay .arco-message,
.dsh-ui .arco-message {
  border-radius: var(--dsw-radius-lg, 16px);
  border: 0;
  background-color: var(--dsw-alias-toast-bg);
  color: var(--dsw-alias-toast-label);
  box-shadow: var(--dsw-shadow-lv3);
  font-size: 14px;
  line-height: 22px;
  padding: 12px 16px;
}

.dsh-ui-overlay .arco-message-success .arco-message-icon,
.dsh-ui .arco-message-success .arco-message-icon {
  color: var(--dsw-alias-state-success-primary);
}

.dsh-ui-overlay .arco-message-error .arco-message-icon,
.dsh-ui .arco-message-error .arco-message-icon {
  color: var(--dsw-alias-state-error-primary);
}

.dsh-ui-overlay .arco-message-warning .arco-message-icon,
.dsh-ui .arco-message-warning .arco-message-icon {
  color: var(--dsw-alias-state-warn-label);
}

.dsh-ui-overlay .arco-notification,
.dsh-ui .arco-notification {
  border-radius: var(--dsw-radius-xl, 20px);
  border: 0;
  background-color: var(--dsw-alias-bg-layer-2);
  box-shadow: var(--dsw-elevation-prominent);
}

.dsh-ui-overlay .arco-notification-title,
.dsh-ui .arco-notification-title {
  font-size: 15px;
  line-height: 22px;
  font-weight: 500;
  color: var(--dsw-alias-label-primary);
}

.dsh-ui-overlay .arco-notification-content,
.dsh-ui .arco-notification-content {
  font-size: 13px;
  line-height: 20px;
  color: var(--dsw-alias-label-secondary);
}

/* ── 进度与结果 ─────────────────────────────────────────────────── */
.dsh-ui .arco-progress-line-outer {
  background-color: var(--dsw-alias-border-l2);
  border-radius: 999px;
  corner-shape: round;
}

.dsh-ui .arco-progress-line-inner {
  border-radius: 999px;
  corner-shape: round;
  background-color: var(--dsw-alias-brand-primary);
}

.dsh-ui .arco-progress-line-text {
  font-size: 12px;
  line-height: 18px;
  color: var(--dsw-alias-label-tertiary);
}

.dsh-ui .arco-result-title {
  font-size: 19px;
  line-height: 28px;
  color: var(--dsw-alias-label-primary);
}

.dsh-ui .arco-result-subtitle {
  font-size: 13px;
  line-height: 20px;
  color: var(--dsw-alias-label-tertiary);
}

/* ── 确认气泡 ───────────────────────────────────────────────────── */
.dsh-ui-overlay .arco-popconfirm-content,
.dsh-ui .arco-popconfirm-content {
  border-radius: var(--dsw-radius-lg, 16px);
  border: 0;
  background: var(--dsw-specific-menu, var(--dsw-alias-bg-layer-2));
  box-shadow: var(--dsw-elevation-prominent);
  color: var(--dsw-alias-label-primary);
}

@media (prefers-reduced-motion: reduce) {
  .dsh-ui-overlay .arco-modal,
  .dsh-ui .arco-modal {
    animation: none;
  }
}
`

/**
 * 注入反馈与浮层样式。幂等。
 *
 * @returns 释放函数。
 */
export function injectFeedbackStyles(): () => void {
  return injectUiStyle('feedback/components.css', FEEDBACK_CSS)
}

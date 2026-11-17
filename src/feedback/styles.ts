/**
 * 页面内反馈和全局消息的追加样式。
 *
 * @module @dsh-plugin/dsh-ui-components/feedback/styles
 */
import { injectUiStyle } from '../foundation/style.js'

/** 页面内反馈和全局消息样式表。 */
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

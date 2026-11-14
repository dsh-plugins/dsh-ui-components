/**
 * 反馈与浮层出口。
 *
 * @module @dsh-plugin/dsh-ui-components/feedback
 */
export {
  Message,
  Notification,
  Popconfirm,
  message,
  messageError,
  messageSuccess,
  messageWarning,
  type PopconfirmProps,
} from './global.js'
export { Alert, Progress, Result, type AlertProps, type ProgressProps, type ResultProps } from './inline.js'
export { Drawer, Modal, confirm, type DrawerProps, type ModalConfirmOptions, type ModalProps } from './panel.js'
export { FEEDBACK_CSS, injectFeedbackStyles } from './styles.js'

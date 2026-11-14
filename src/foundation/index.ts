/**
 * 基础层出口：桥接样式、根提供器、图标、尺寸令牌与样式工具。
 *
 * @module @dsh-plugin/dsh-ui-components/foundation
 */
export { BRIDGE_CSS, BRIDGE_PALETTE } from './bridge.js'
export { DshProvider, type DshProviderProps } from './provider.js'
export { G, OVERLAY_MAX_HEIGHT, overlayMaxHeight } from './tokens.js'
export { OWNER, PORTAL_ID, ROOT_CLASS, cx, injectUiStyle } from './style.js'
export {
  DSH_ICON_CONFIG,
  DshIconProvider,
  ICON_NAMES,
  Icon,
  IconProvider,
  Icons,
  icon,
  type IconByNameProps,
  type IconComponent,
  type IconName,
  type IconOfProps,
  type IconProps,
} from './icons.js'
export {
  BLACK,
  STATIC,
  WHITE,
  declareRamp,
  mixTriple,
  ramp,
  type Triple,
} from './palette.js'
export { ICON_COUNT, ICON_INDEX, type IconMeta } from '../icons-index.js'

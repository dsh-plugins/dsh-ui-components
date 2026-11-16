/**
 * Arco 变量到 DSH 令牌的桥接样式表。
 *
 * Arco 的外观有两层取值：`body` 上的原始色阶（`--primary-6` 这类 `R,G,B`
 * 三元组）与语义变量（`--color-text-1` 这类颜色字符串），组件规则同时直接
 * 引用这两层。自定义属性在声明它的元素上完成替换后才会向下继承，因此在
 * 后代元素上改 `--arcoblue-6` 不会影响已从 `body` 继承到的 `--primary-6`。
 * 桥接表因此在 `.dsh-ui` 容器上同时重绑两层，而不是只改一层。
 *
 * 语义层指向 `--dsw-alias-*` 令牌，随宿主深浅主题自动切换，无需在本文件
 * 另写深色分支；原始色阶需要三元组，深浅主题各写一份。
 *
 * 本文件是本包唯一允许出现字面色值的样式文件（色阶三元组与圆角像素），
 * `scripts/verify-no-literal-colors.mjs` 对本文件放行。
 *
 * @module @dsh-plugin/dsh-ui-components/foundation/bridge
 */
import { BLACK, STATIC, WHITE, declareRamp, mixTriple, ramp, type Triple } from './palette.js'

/** 把一组静态色值按顺序取成一个色阶。 */
function pick(steps: readonly Triple[]): Triple[] {
  return [...steps]
}

/**
 * 以第 6 级为基准展开深色主题的十级色阶。
 *
 * Arco 的深色色板把色阶顺序反转：`-1` 最深、`-10` 最浅。直接反转浅色色阶
 * 即可得到同样的走向，`-6` 仍是基准色。
 *
 * @param base - 第 6 级取值。
 * @returns 长度为 10 的反转色阶。
 */
function rampDark(base: Triple): Triple[] {
  return [...ramp(base)].reverse()
}

/** `b` 分组：Arco 原始色阶，浅色主题。 */
const RAMP_LIGHT: ReadonlyArray<readonly [string, Triple[]]> = [
  // DSH 的主色是中性近黑色（亮色）与近白色（暗色），蓝色只用于强调与链接。
  ['primary', ramp(STATIC.bluish[1000])],
  ['gray', pick([STATIC.bluish[50], STATIC.bluish[60], STATIC.bluish[100], STATIC.bluish[150], STATIC.bluish[200], STATIC.bluish[300], STATIC.bluish[400], STATIC.bluish[500], STATIC.bluish[600], STATIC.bluish[1000]])],
  ['arcoblue', ramp(STATIC.deepseek[500])],
  ['blue', ramp(STATIC.blue[500])],
  ['green', ramp(STATIC.green[500])],
  ['red', ramp(STATIC.red[600])],
  ['orange', ramp(STATIC.amber[500])],
  ['orangered', ramp(STATIC.amber[600])],
  ['gold', ramp(STATIC.amber[400])],
  ['success', ramp(STATIC.green[500])],
  ['warning', ramp(STATIC.amber[500])],
  ['danger', ramp(STATIC.red[600])],
  ['link', ramp(STATIC.deepseek[500])],
]

/** Arco 原始色阶，深色主题。 */
const RAMP_DARK: ReadonlyArray<readonly [string, Triple[]]> = [
  ['primary', rampDark(STATIC.bluish[50])],
  ['gray', pick([STATIC.bluish[900], STATIC.bluish[875], STATIC.bluish[850], STATIC.bluish[800], STATIC.bluish[750], STATIC.bluish[700], STATIC.bluish[600], STATIC.bluish[500], STATIC.bluish[400], STATIC.bluish[200]])],
  ['arcoblue', rampDark(STATIC.deepseek[400])],
  ['blue', rampDark(STATIC.blue[400])],
  ['green', rampDark(STATIC.green[400])],
  ['red', rampDark(STATIC.red[400])],
  ['orange', rampDark(STATIC.amber[400])],
  ['orangered', rampDark(STATIC.amber[500])],
  ['gold', rampDark(STATIC.amber[400])],
  ['success', rampDark(STATIC.green[400])],
  ['warning', rampDark(STATIC.amber[400])],
  ['danger', rampDark(STATIC.red[400])],
  ['link', rampDark(STATIC.deepseek[400])],
]

/** 把色阶组序列化为一份声明块。 */
function rampsDeclarations(ramps: ReadonlyArray<readonly [string, Triple[]]>): string {
  return ramps.map(([prefix, steps]) => declareRamp(prefix, steps)).join('\n')
}

/**
 * 语义变量桥接。
 *
 * 每条都指向 DSH 的语义令牌而不是具体色值，因此深浅主题切换由宿主的
 * `body[data-ds-dark-theme]` 驱动，本包不维护主题分支。
 */
const SEMANTIC = `
  /* 文字层级 */
  --color-text-1: var(--dsw-alias-label-primary, rgba(0, 0, 0, 0.9));
  --color-text-2: var(--dsw-alias-label-secondary, rgba(0, 0, 0, 0.7));
  --color-text-3: var(--dsw-alias-label-tertiary, rgba(0, 0, 0, 0.55));
  --color-text-4: var(--dsw-alias-label-caption, rgba(0, 0, 0, 0.35));
  --color-text-white: var(--dsw-alias-label-primary-foreground, #fff);

  /* 中性色：组件规则直接引用 --color-neutral-*，此处重绑指向文字与分割层级，
     避免再走一层原始色阶。 */
  --color-neutral-1: var(--dsw-alias-bg-layer-1);
  --color-neutral-2: var(--dsw-alias-bg-layer-2);
  --color-neutral-3: var(--dsw-alias-border-l2);
  --color-neutral-4: var(--dsw-alias-border-l3);
  --color-neutral-5: var(--dsw-alias-label-caption);
  --color-neutral-6: var(--dsw-alias-label-tertiary);
  --color-neutral-7: var(--dsw-alias-label-secondary);
  --color-neutral-8: var(--dsw-alias-label-secondary);
  --color-neutral-9: var(--dsw-alias-label-primary);
  --color-neutral-10: var(--dsw-alias-label-primary);

  /* 背景层级 */
  --color-bg-1: var(--dsw-alias-bg-base);
  --color-bg-2: var(--dsw-alias-bg-layer-1);
  --color-bg-3: var(--dsw-alias-bg-layer-2);
  --color-bg-4: var(--dsw-alias-bg-layer-3);
  --color-bg-5: var(--dsw-alias-bg-layer-3);
  --color-bg-white: var(--dsw-alias-bg-layer-1);
  --color-bg-popup: var(--dsw-alias-bg-layer-2);
  --color-white: var(--dsw-alias-label-primary-foreground);
  --color-black: var(--dsw-alias-label-primary);

  /* 边框与填充 */
  --color-border: var(--dsw-alias-border-l2);
  --color-border-1: var(--dsw-alias-border-l1);
  --color-border-2: var(--dsw-alias-border-l2);
  --color-border-3: var(--dsw-alias-border-l3);
  --color-border-4: var(--dsw-alias-border-l4);
  --color-fill-1: var(--dsw-alias-bg-layer-1);
  --color-fill-2: var(--dsw-alias-interactive-bg-hover);
  --color-fill-3: var(--dsw-alias-interactive-bg-hover-solid);
  --color-fill-4: var(--dsw-alias-interactive-bg-active);
  --color-secondary: var(--dsw-alias-interactive-bg-hover);
  --color-secondary-hover: var(--dsw-alias-interactive-bg-hover-solid);
  --color-secondary-active: var(--dsw-alias-interactive-bg-active);
  --color-secondary-disabled: var(--dsw-alias-bg-layer-1);

  /* 状态浅色填充，用于禁用态与提示背景 */
  --color-primary-light-1: color-mix(in srgb, var(--dsw-alias-state-business-primary) 8%, transparent);
  --color-primary-light-2: color-mix(in srgb, var(--dsw-alias-state-business-primary) 14%, transparent);
  --color-primary-light-3: color-mix(in srgb, var(--dsw-alias-state-business-primary) 22%, transparent);
  --color-primary-light-4: color-mix(in srgb, var(--dsw-alias-state-business-primary) 32%, transparent);
  --color-success-light-1: color-mix(in srgb, var(--dsw-alias-state-success-primary) 8%, transparent);
  --color-success-light-2: color-mix(in srgb, var(--dsw-alias-state-success-primary) 14%, transparent);
  --color-success-light-3: color-mix(in srgb, var(--dsw-alias-state-success-primary) 22%, transparent);
  --color-success-light-4: color-mix(in srgb, var(--dsw-alias-state-success-primary) 32%, transparent);
  --color-warning-light-1: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 8%, transparent);
  --color-warning-light-2: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 14%, transparent);
  --color-warning-light-3: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 22%, transparent);
  --color-warning-light-4: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 32%, transparent);
  --color-danger-light-1: color-mix(in srgb, var(--dsw-alias-state-error-primary) 8%, transparent);
  --color-danger-light-2: color-mix(in srgb, var(--dsw-alias-state-error-primary) 14%, transparent);
  --color-danger-light-3: color-mix(in srgb, var(--dsw-alias-state-error-primary) 22%, transparent);
  --color-danger-light-4: color-mix(in srgb, var(--dsw-alias-state-error-primary) 32%, transparent);
  --color-link-light-1: color-mix(in srgb, var(--dsw-alias-link) 8%, transparent);
  --color-link-light-2: color-mix(in srgb, var(--dsw-alias-link) 14%, transparent);
  --color-link-light-3: color-mix(in srgb, var(--dsw-alias-link) 22%, transparent);
  --color-link-light-4: color-mix(in srgb, var(--dsw-alias-link) 32%, transparent);

  /* 浮层表面与遮罩 */
  --color-menu-light-bg: var(--dsw-specific-menu, var(--dsw-alias-bg-layer-2));
  --color-menu-dark-bg: var(--dsw-specific-menu, var(--dsw-alias-bg-layer-2));
  --color-menu-dark-hover: var(--dsw-alias-interactive-bg-hover);
  --color-tooltip-bg: var(--dsw-alias-tooltip-bg);
  --color-tooltip-text: var(--dsw-alias-tooltip-label);
  --color-mask-bg: var(--dsw-alias-bg-mask-1);
  --color-spin-layer-bg: var(--dsw-alias-bg-mask-2);

  /* 圆角：按 DSH 圆角标准重绑。small 对应 28px 高的紧凑控件，medium 对应
     32–40px 的标准控件，large 对应分组内容。 */
  --border-radius-none: 0;
  --border-radius-small: var(--dsw-radius-sm, 8px);
  --border-radius-medium: var(--dsw-radius-md, 12px);
  --border-radius-large: var(--dsw-radius-lg, 16px);
  --border-radius-circle: 50%;
`

/**
 * 针对 DSH 具体控件契约的规则级覆盖。
 *
 * 变量桥接能覆盖绝大多数外观，但按钮填充在 DSH 里另有专门令牌（主按钮是
 * 中性近黑色，而非品牌蓝），且 Arco 在规则里写死了白字与蓝色焦点环，这两处
 * 需要直接改规则。
 */
const RULES = `
.dsh-ui .arco-btn {
  font-family: inherit;
  border-radius: var(--dsw-radius-md, 12px);
  transition: background-color 120ms ease, color 120ms ease, opacity 120ms ease;
}

.dsh-ui .arco-btn-size-mini,
.dsh-ui .arco-btn-size-small {
  border-radius: var(--dsw-radius-sm, 8px);
}

.dsh-ui .arco-btn-primary:not(.arco-btn-disabled) {
  background-color: var(--dsw-alias-button-primary-fill);
  color: var(--dsw-alias-label-primary-foreground);
}

/* Arco 的 hover 规则把文字硬编码成白色；DSH 的主色在深色主题下是浅色填充，
   白字会失去对比，因此背景与文字必须成对覆盖。 */
.dsh-ui .arco-btn-primary:not(.arco-btn-disabled):not(.arco-btn-loading):hover,
.dsh-ui .arco-btn-primary:not(.arco-btn-disabled):not(.arco-btn-loading):active {
  background-color: var(--dsw-alias-button-primary-hover);
  color: var(--dsw-alias-label-primary-foreground);
}

.dsh-ui .arco-btn-primary:not(.arco-btn-disabled):not(.arco-btn-loading):active {
  background-color: var(--dsw-alias-button-primary-hover);
}

.dsh-ui .arco-btn-primary.arco-btn-disabled {
  background-color: var(--dsw-alias-button-primary-dimmed);
  color: var(--dsw-alias-label-tertiary);
}

.dsh-ui .arco-btn-secondary:not(.arco-btn-disabled) {
  background-color: var(--dsw-alias-interactive-bg-hover);
  color: var(--dsw-alias-label-primary);
}

.dsh-ui .arco-btn-secondary:not(.arco-btn-disabled):hover {
  background-color: var(--dsw-alias-interactive-bg-hover-solid);
}

.dsh-ui .arco-btn-text:not(.arco-btn-disabled) {
  color: var(--dsw-alias-label-secondary);
}

.dsh-ui .arco-btn-text:not(.arco-btn-disabled):hover {
  background-color: var(--dsw-alias-interactive-bg-hover);
  color: var(--dsw-alias-label-primary);
}

.dsh-ui .arco-btn-status-danger:not(.arco-btn-disabled) {
  color: var(--dsw-alias-state-error-primary);
}

/* 危险操作的主按钮在 DSH 里是淡红色填充配错误色文字，而不是整块高饱和红底：
   后者在深色主题下会变成一块亮粉色，与宿主的删除确认弹窗不一致。 */
.dsh-ui .arco-btn-primary.arco-btn-status-danger:not(.arco-btn-disabled) {
  background-color: var(--dsw-alias-interactive-bg-hover-danger);
  color: var(--dsw-alias-state-error-primary);
}

.dsh-ui .arco-btn-primary.arco-btn-status-danger:not(.arco-btn-disabled):not(.arco-btn-loading):hover,
.dsh-ui .arco-btn-primary.arco-btn-status-danger:not(.arco-btn-disabled):not(.arco-btn-loading):active {
  background-color: color-mix(in srgb, var(--dsw-alias-state-error-primary) 16%, transparent);
  color: var(--dsw-alias-state-error-primary);
}

.dsh-ui :focus-visible {
  outline-color: var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
  outline-width: var(--dsw-focus-ring-width);
}

/* 输入类控件的聚焦用描边表达，与宿主 Input 的边框变色一致；不叠加外扩焦点
   环，否则边框外会多出一圈比控件本身更大的蓝框。这里必须显式写 outline-style
   与 outline-width，单写 outline: none 会被上面的 :focus-visible 规则盖掉。 */
.dsh-ui .arco-input:focus-visible,
.dsh-ui .arco-textarea:focus-visible,
.dsh-ui .arco-input-inner-wrapper:focus-within,
.dsh-ui .arco-input-number:focus-within,
.dsh-ui .arco-select-view:focus-visible,
.dsh-ui .arco-select-view:focus-within {
  box-shadow: none;
  outline-style: none;
  outline-width: 0;
  border-color: var(--dsw-alias-state-business-primary);
}

.dsh-ui .arco-btn:focus-visible {
  box-shadow: none;
  outline: var(--dsw-focus-ring-width) solid var(--dsw-alias-state-business-primary);
  outline-offset: 2px;
}

/* 浮层表面统一承载菜单材质，避免逐组件重复声明。 */
.dsh-ui-overlay .arco-dropdown-menu,
.dsh-ui-overlay .arco-select-popup,
.dsh-ui-overlay .arco-trigger-popup .arco-dropdown,
.dsh-ui-overlay .arco-picker-container {
  background: var(--dsw-specific-menu, var(--dsw-alias-bg-layer-2));
  backdrop-filter: var(--dsw-menu-backdrop-filter, none);
  border: 0;
  box-shadow: var(--dsw-elevation-panel);
}
`

/**
 * 完整桥接样式表。
 *
 * 容器类 `.dsh-ui` 由 {@link DshProvider} 加在包裹元素上，浮层容器同时带
 * `.dsh-ui-overlay`，因此弹出层即使挂在 `body` 下也能拿到同一套变量。
 */
export const BRIDGE_CSS = `
.${'dsh-ui'},
.dsh-ui-overlay {
${SEMANTIC}
${rampsDeclarations(RAMP_LIGHT)}
}

body[data-ds-dark-theme] .dsh-ui,
body[data-ds-dark-theme] .dsh-ui-overlay {
${rampsDeclarations(RAMP_DARK)}
}

${RULES}
`

/**
 * 供测试与门禁使用的深色基准色，避免在样式字符串之外再次写字面量。
 *
 * 导出它们只为让 `scripts/verify-tokens.mjs` 能核对桥接使用的 DSH 令牌名，
 * 组件代码不应直接引用。
 */
export const BRIDGE_PALETTE = {
  lightPrimaryBase: STATIC.bluish[1000],
  darkPrimaryBase: STATIC.bluish[50],
  white: WHITE,
  black: BLACK,
  mix: mixTriple,
} as const

/** 将已有 DSH 组合件绑定到同一套 HeroUI 主题，保留其布局和公开接口。 */
export const HERO_COMPONENT_CSS = `
.dsh-ui[data-theme][data-radius] {
  --dsw-alias-bg-base: var(--dsh-background);
  --dsw-alias-bg-layer-1: var(--dsh-surface);
  --dsw-alias-bg-layer-2: var(--dsh-surface-secondary);
  --dsw-alias-bg-layer-3: var(--dsh-surface-tertiary);
  --dsw-alias-bg-module-platform: var(--dsh-surface-secondary);
  --dsw-alias-bg-mask-1: var(--dsh-mask);
  --dsw-alias-bg-mask-2: color-mix(in srgb, var(--dsh-surface) 60%, transparent);
  --dsw-alias-bg-mask-3: var(--dsh-surface-tertiary);
  --dsw-alias-bg-mask-drop: var(--dsh-mask);
  --dsw-alias-bg-skeleton: var(--dsh-surface-tertiary);
  --dsw-alias-label-primary: var(--dsh-foreground);
  --dsw-alias-label-secondary: var(--dsh-muted);
  --dsw-alias-label-tertiary: var(--dsh-muted);
  --dsw-alias-label-caption: color-mix(in srgb, var(--dsh-muted) 70%, transparent);
  --dsw-alias-label-dimmed: color-mix(in srgb, var(--dsh-muted) 65%, transparent);
  --dsw-alias-label-primary-foreground: var(--dsh-accent-foreground);
  --dsw-alias-brand-primary: var(--dsh-accent);
  --dsw-alias-link: var(--dsh-accent);
  --dsw-alias-state-business-primary: var(--dsh-accent);
  --dsw-alias-state-success-primary: var(--dsh-success);
  --dsw-alias-state-error-primary: var(--dsh-danger);
  --dsw-alias-state-warn-primary: var(--dsh-warning);
  --dsw-alias-state-warn-label: var(--dsh-warning);
  --dsw-alias-state-idle-primary: var(--dsh-muted);
  --dsw-alias-border-l1: color-mix(in srgb, var(--dsh-border) 50%, transparent);
  --dsw-alias-border-l2: var(--dsh-border);
  --dsw-alias-border-l3: var(--dsh-border);
  --dsw-alias-border-l4: var(--dsh-muted);
  --dsw-alias-card-fill: var(--dsh-surface);
  --dsw-alias-settings-card-fill: var(--dsh-surface);
  --dsw-alias-settings-card-stroke: var(--dsh-border);
  --dsw-alias-interactive-bg-hover: var(--dsh-surface-secondary);
  --dsw-alias-interactive-bg-hover-solid: var(--dsh-surface-tertiary);
  --dsw-alias-interactive-bg-active: var(--dsh-border);
  --dsw-alias-interactive-bg-hover-danger: color-mix(in srgb, var(--dsh-danger) 12%, var(--dsh-surface));
  --dsw-alias-button-primary-fill: var(--dsh-accent);
  --dsw-alias-button-primary-hover: color-mix(in srgb, var(--dsh-accent) 85%, var(--dsh-foreground));
  --dsw-alias-button-primary-dimmed: color-mix(in srgb, var(--dsh-accent) 30%, var(--dsh-surface));
  --dsw-alias-button-ghost-active-fill: color-mix(in srgb, var(--dsh-accent) 12%, var(--dsh-surface));
  --dsw-alias-button-ghost-active-border: color-mix(in srgb, var(--dsh-accent) 35%, var(--dsh-border));
  --dsw-alias-switch-thumb: #fff;
  --dsw-alias-tooltip-bg: var(--dsh-foreground);
  --dsw-alias-tooltip-label: var(--dsh-background);
  --dsw-alias-toast-bg: var(--dsh-overlay);
  --dsw-alias-toast-label: var(--dsh-foreground);
  --dsw-alias-markdown-code-block: var(--dsh-surface-secondary);
  --dsw-alias-markdown-code-block-banner: var(--dsh-surface-tertiary);
  --dsw-alias-markdown-inline-code: var(--dsh-surface-tertiary);
  --dsw-alias-json-tree-property: var(--dsh-foreground);
  --dsw-alias-json-tree-keyword: var(--dsh-accent);
  --dsw-alias-json-tree-number: var(--dsh-warning);
  --dsw-alias-json-tree-string: var(--dsh-success);
  --dsw-alias-json-tree-icon: var(--dsh-muted);
  --dsw-alias-json-tree-punctuation: var(--dsh-muted);
  --dsw-radius-xs: min(4px, var(--dsh-radius));
  --dsw-radius-sm: min(8px, var(--dsh-radius));
  --dsw-radius-md: var(--dsh-radius);
  --dsw-radius-lg: var(--dsh-radius-lg);
  --dsw-radius-xl: var(--dsh-radius-lg);
  --dsw-radius-panel: var(--dsh-radius-lg);
  --border-radius-small: min(8px, var(--dsh-radius));
  --border-radius-medium: var(--dsh-radius);
  --border-radius-large: var(--dsh-radius-lg);
  --dsw-specific-menu: var(--dsh-overlay);
  --dsw-menu-backdrop-filter: none;
  --dsw-elevation-panel: var(--dsh-overlay-shadow);
  --dsw-elevation-prominent: var(--dsh-overlay-shadow);
  --dsw-elevation-soft: var(--dsh-shadow);
  --dsw-shadow-lv3: var(--dsh-shadow);
  --dsw-focus-ring-color: var(--dsh-accent);
  --dsw-focus-ring-width: 2px;
}
.dsh-ui[data-theme][data-radius] .arco-input-inner-wrapper {
  border-radius: var(--dsh-radius);
  background: var(--dsh-surface-secondary);
  border: 1px solid transparent;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}
.dsh-ui[data-theme][data-radius] .arco-input-inner-wrapper:focus-within {
  background: var(--dsh-surface);
  border-color: var(--dsh-accent);
  box-shadow: var(--dsh-focus);
}
.dsh-ui[data-theme][data-radius] .arco-card { box-shadow: var(--dsh-shadow); }
.dsh-ui[data-theme][data-radius] .arco-btn-primary:not(.arco-btn-disabled) { color: var(--dsh-accent-foreground); }
.dsh-ui[data-theme][data-radius] .arco-btn-status-danger { --dsh-button-status: var(--dsh-danger); }
.dsh-ui[data-theme][data-radius] .arco-btn-status-success { --dsh-button-status: var(--dsh-success); }
.dsh-ui[data-theme][data-radius] .arco-btn-status-warning { --dsh-button-status: var(--dsh-warning); }
.dsh-ui[data-theme][data-radius] .arco-btn:is(.arco-btn-status-danger, .arco-btn-status-success, .arco-btn-status-warning):not(.arco-btn-disabled) {
  --dsh-button-status-foreground: color-mix(in srgb, var(--dsh-button-status) 80%, var(--dsh-foreground));
  color: var(--dsh-button-status-foreground);
  background-color: color-mix(in srgb, var(--dsh-button-status) 10%, var(--dsh-surface));
}
.dsh-ui[data-theme][data-radius] .arco-btn:is(.arco-btn-status-danger, .arco-btn-status-success, .arco-btn-status-warning):is(.arco-btn-text, .arco-btn-outline):not(.arco-btn-disabled) {
  background-color: transparent;
}
.dsh-ui[data-theme][data-radius] .arco-btn:is(.arco-btn-status-danger, .arco-btn-status-success, .arco-btn-status-warning).arco-btn-outline:not(.arco-btn-disabled) {
  border-color: var(--dsh-button-status);
}
.dsh-ui[data-theme][data-radius] .arco-btn:is(.arco-btn-status-danger, .arco-btn-status-success, .arco-btn-status-warning):not(.arco-btn-disabled):not(.arco-btn-loading):hover {
  color: var(--dsh-button-status-foreground);
  background-color: color-mix(in srgb, var(--dsh-button-status) 16%, var(--dsh-surface));
}
.dsh-ui[data-theme][data-radius] .arco-btn:is(.arco-btn-status-danger, .arco-btn-status-success, .arco-btn-status-warning):not(.arco-btn-disabled):not(.arco-btn-loading):active {
  color: var(--dsh-button-status-foreground);
  background-color: color-mix(in srgb, var(--dsh-button-status) 22%, var(--dsh-surface));
}
.dsh-ui[data-theme][data-radius] .arco-btn:focus-visible { outline: 2px solid var(--dsh-accent); outline-offset: 3px; }
.dsh-ui[data-theme][data-radius] .arco-upload-drag {
  border: 1px dashed var(--dsh-border);
  border-radius: var(--dsh-radius-lg);
  background: var(--dsh-surface-secondary);
}
.dsh-ui[data-theme][data-radius] .arco-upload-drag:hover { border-color: var(--dsh-accent); background: var(--color-primary-light-1); }
.dsh-ui[data-theme][data-radius] :is(.arco-upload-list-item, .arco-mentions, .arco-color-picker, .arco-resizebox, .arco-anchor) { border-radius: var(--dsh-radius); }
.dsh-ui[data-theme][data-radius] .arco-layout { color: var(--dsh-foreground); background: var(--dsh-background); }
.dsh-ui[data-theme][data-radius] :is(.arco-layout-sider, .arco-layout-header, .arco-layout-footer) { color: var(--dsh-foreground); background: var(--dsh-surface); }
.dsh-ui[data-theme][data-radius] :is(.arco-tabs-header-title-active, .arco-link, .arco-anchor-link-active) { color: var(--dsh-accent); }
.dsh-ui[data-theme][data-radius] :is(.arco-menu-item, .arco-dropdown-menu-item, .arco-select-option) { border-radius: min(8px, var(--dsh-radius)); }
.dsh-ui[data-theme][data-radius] .arco-modal-content { display: flex; flex-direction: column; min-height: 0; overflow: hidden; }
.dsh-ui[data-theme][data-radius] .arco-drawer { top: 120px; bottom: 120px; height: auto; max-height: calc(100dvh - 240px); border-radius: var(--dsh-radius-lg); display: flex; flex-direction: column; }
.dsh-ui[data-theme][data-radius] .arco-drawer-content { flex: 1; display: flex; flex-direction: column; min-height: 0; overflow: hidden; }
.dsh-ui[data-theme][data-radius] :is(.arco-drawer-header, .arco-drawer-footer) { flex-shrink: 0; }
.dsh-ui[data-theme][data-radius] :is(.arco-modal-content, .arco-drawer-content) > .dshl-scrollbar { flex: 1; min-height: 0; }
.dsh-ui[data-theme][data-radius][data-motion="reduced"] *,
.dsh-ui[data-theme][data-radius][data-motion="reduced"] *::before,
.dsh-ui[data-theme][data-radius][data-motion="reduced"] *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
`

/** HeroUI 风格主题在组件根和独立浮层容器内生效。 */
export const HERO_CSS = `
/* 主题只作用于组件根和浮层容器，宿主变量由 Provider 的 host 主题使用。 */
.dsh-ui[data-theme][data-radius] {
  --dsh-background: #f5f5f7;
  --dsh-foreground: #202127;
  --dsh-muted: #6e707b;
  --dsh-surface: #fff;
  --dsh-surface-secondary: #f0f0f3;
  --dsh-surface-tertiary: #e9e9ef;
  --dsh-overlay: #fff;
  --dsh-accent: #2563eb;
  --dsh-accent-foreground: #fff;
  --dsh-success: #16844a;
  --dsh-warning: #a86507;
  --dsh-danger: #d52c42;
  --dsh-border: #dddfe6;
  --dsh-mask: rgb(15 18 30 / 44%);
  --dsh-shadow: 0 2px 4px rgb(20 22 35 / 4%), 0 1px 2px rgb(20 22 35 / 6%);
  --dsh-overlay-shadow: 0 18px 60px rgb(20 22 35 / 14%), 0 2px 8px rgb(20 22 35 / 8%);
  --dsh-radius: 12px;
  --dsh-radius-lg: 20px;
  --dsh-focus: 0 0 0 3px color-mix(in srgb, var(--dsh-accent) 24%, transparent);
  --dsh-ease: cubic-bezier(0.2, 0.8, 0.2, 1);
  color-scheme: light;
  color: var(--dsh-foreground);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 14px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

.dsh-ui[data-theme][data-radius][data-theme="dark"],
body[data-ds-dark-theme] .dsh-ui[data-theme="host"][data-radius] {
  --dsh-background: #101114;
  --dsh-foreground: #f2f3f7;
  --dsh-muted: #a5a7b3;
  --dsh-surface: #1c1e24;
  --dsh-surface-secondary: #252730;
  --dsh-surface-tertiary: #30333d;
  --dsh-overlay: #24262e;
  --dsh-accent: #78a5ff;
  --dsh-accent-foreground: #101c36;
  --dsh-success: #65ce92;
  --dsh-warning: #f0bc62;
  --dsh-danger: #ff8191;
  --dsh-border: #393c47;
  --dsh-mask: rgb(0 0 0 / 58%);
  --dsh-shadow: 0 0 0 1px rgb(255 255 255 / 5%);
  --dsh-overlay-shadow: 0 18px 60px rgb(0 0 0 / 35%), 0 0 0 1px rgb(255 255 255 / 8%);
  color-scheme: dark;
}

.dsh-ui[data-theme][data-radius][data-radius="none"] { --dsh-radius: 0px; --dsh-radius-lg: 0px; }
.dsh-ui[data-theme][data-radius][data-radius="sm"] { --dsh-radius: 6px; --dsh-radius-lg: 10px; }
.dsh-ui[data-theme][data-radius][data-radius="md"] { --dsh-radius: 12px; --dsh-radius-lg: 20px; }
.dsh-ui[data-theme][data-radius][data-radius="lg"] { --dsh-radius: 18px; --dsh-radius-lg: 28px; }
.dsh-ui[data-theme][data-radius][data-radius="full"] { --dsh-radius: 999px; --dsh-radius-lg: 28px; }

/* Arco 同时读取语义色和 RGB 色阶，因此两层均限定在当前组件树。 */
.dsh-ui[data-theme][data-radius] {
  --primary-1: 232, 240, 255;
  --primary-2: 210, 226, 255;
  --primary-3: 171, 200, 255;
  --primary-4: 121, 165, 255;
  --primary-5: 72, 126, 245;
  --primary-6: 37, 99, 235;
  --primary-7: 27, 76, 197;
  --primary-8: 23, 58, 152;
  --primary-9: 18, 43, 110;
  --primary-10: 14, 30, 74;
  --success-6: 22, 132, 74;
  --warning-6: 168, 101, 7;
  --danger-6: 213, 44, 66;
  --color-text-1: var(--dsh-foreground);
  --color-text-2: var(--dsh-muted);
  --color-text-3: var(--dsh-muted);
  --color-text-4: color-mix(in srgb, var(--dsh-muted) 60%, transparent);
  --color-text-white: var(--dsh-accent-foreground);
  --color-bg-1: var(--dsh-background);
  --color-bg-2: var(--dsh-surface);
  --color-bg-3: var(--dsh-surface-secondary);
  --color-bg-4: var(--dsh-surface-tertiary);
  --color-bg-5: var(--dsh-overlay);
  --color-bg-white: var(--dsh-surface);
  --color-bg-popup: var(--dsh-overlay);
  --color-border: var(--dsh-border);
  --color-border-1: color-mix(in srgb, var(--dsh-border) 50%, transparent);
  --color-border-2: var(--dsh-border);
  --color-border-3: var(--dsh-border);
  --color-border-4: var(--dsh-muted);
  --color-fill-1: var(--dsh-surface);
  --color-fill-2: var(--dsh-surface-secondary);
  --color-fill-3: var(--dsh-surface-tertiary);
  --color-fill-4: var(--dsh-border);
  --color-neutral-1: var(--dsh-surface);
  --color-neutral-2: var(--dsh-surface-secondary);
  --color-neutral-3: var(--dsh-border);
  --color-neutral-4: var(--dsh-border);
  --color-neutral-5: var(--dsh-muted);
  --color-neutral-6: var(--dsh-muted);
  --color-neutral-7: var(--dsh-muted);
  --color-neutral-8: var(--dsh-foreground);
  --color-neutral-9: var(--dsh-foreground);
  --color-neutral-10: var(--dsh-foreground);
  --color-secondary: var(--dsh-surface-secondary);
  --color-secondary-hover: var(--dsh-surface-tertiary);
  --color-secondary-active: var(--dsh-border);
  --color-secondary-disabled: var(--dsh-surface-secondary);
  --color-primary-light-1: color-mix(in srgb, var(--dsh-accent) 10%, transparent);
  --color-primary-light-2: color-mix(in srgb, var(--dsh-accent) 16%, transparent);
  --color-primary-light-3: color-mix(in srgb, var(--dsh-accent) 22%, transparent);
  --color-primary-light-4: color-mix(in srgb, var(--dsh-accent) 30%, transparent);
  --color-success-light-1: color-mix(in srgb, var(--dsh-success) 10%, var(--dsh-surface));
  --color-danger-light-1: color-mix(in srgb, var(--dsh-danger) 10%, var(--dsh-surface));
  --color-warning-light-1: color-mix(in srgb, var(--dsh-warning) 10%, var(--dsh-surface));
  --color-link-light-1: var(--color-primary-light-1);
  --color-tooltip-bg: var(--dsh-foreground);
  --color-tooltip-text: var(--dsh-background);
  --color-mask-bg: var(--dsh-mask);
}

.dsh-ui[data-theme][data-radius][data-theme="dark"],
body[data-ds-dark-theme] .dsh-ui[data-theme="host"][data-radius] {
  --primary-1: 25, 37, 62;
  --primary-2: 31, 48, 85;
  --primary-3: 38, 64, 118;
  --primary-4: 51, 87, 159;
  --primary-5: 84, 126, 210;
  --primary-6: 120, 165, 255;
  --primary-7: 155, 188, 255;
  --primary-8: 187, 209, 255;
  --primary-9: 214, 227, 255;
  --primary-10: 237, 243, 255;
  --success-6: 101, 206, 146;
  --warning-6: 240, 188, 98;
  --danger-6: 255, 129, 145;
}

.dsh-ui[data-theme][data-radius] :is(button, input, textarea, select) { font: inherit; }
.dsh-ui[data-theme][data-radius] :is(button, a, input, textarea, select, [tabindex]):focus-visible {
  outline: 2px solid var(--dsh-accent);
  outline-offset: 3px;
}
.dsh-ui[data-theme][data-radius] .arco-btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  height: 36px;
  padding: 0 16px;
  border-radius: var(--dsh-radius);
  font-weight: 600;
  transition: background-color 150ms var(--dsh-ease), box-shadow 150ms var(--dsh-ease), transform 200ms var(--dsh-ease);
}
.dsh-ui[data-theme][data-radius] .arco-btn-size-small { height: 30px; padding-inline: 12px; font-size: 12px; }
.dsh-ui[data-theme][data-radius] .arco-btn-size-large { height: 44px; padding-inline: 20px; font-size: 16px; }
.dsh-ui[data-theme][data-radius] .arco-btn:not(:disabled):not(.arco-btn-loading):active { transform: scale(0.97); }
.dsh-ui[data-theme][data-radius] .arco-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.dsh-ui[data-theme][data-radius] .arco-btn-group .arco-btn:not(:first-child):not(:last-child) { border-radius: 0; }
.dsh-ui[data-theme][data-radius] .arco-btn-group .arco-btn:first-child:not(:last-child) { border-start-end-radius: 0; border-end-end-radius: 0; }
.dsh-ui[data-theme][data-radius] .arco-btn-group .arco-btn:last-child:not(:first-child) { border-start-start-radius: 0; border-end-start-radius: 0; }

.dsh-ui[data-theme][data-radius] :is(.arco-input-wrapper, .arco-textarea, .arco-select-view, .arco-picker) {
  border: 1px solid var(--dsh-border);
  border-radius: var(--dsh-radius);
  background: var(--dsh-surface);
  box-shadow: var(--dsh-shadow);
  min-height: 38px;
  transition: border-color 150ms, box-shadow 150ms, background-color 150ms;
}
.dsh-ui[data-theme][data-radius] :is(.arco-input-wrapper, .arco-textarea, .arco-select-view, .arco-picker):focus-within {
  border-color: var(--dsh-accent);
  box-shadow: var(--dsh-focus);
}
.dsh-ui[data-theme][data-radius] :is(.arco-input, .arco-textarea) { color: var(--dsh-foreground); }
.dsh-ui[data-theme][data-radius] :is(.arco-input-error, .arco-textarea-error, .arco-select-view-error) { border-color: var(--dsh-danger); }
.dsh-ui[data-theme][data-radius] .arco-input-wrapper .arco-input:focus-visible, .dsh-ui[data-theme][data-radius] .arco-textarea:focus-visible { outline: 0; }
.dsh-ui[data-theme][data-radius] .arco-switch { min-width: 40px; height: 24px; border-radius: 999px; }
.dsh-ui[data-theme][data-radius] .arco-switch-dot { width: 18px; height: 18px; top: 3px; }
.dsh-ui[data-theme][data-radius] .arco-checkbox-icon { width: 18px; height: 18px; border-radius: 6px; }
.dsh-ui[data-theme][data-radius] :is(.arco-checkbox-checked .arco-checkbox-icon, .arco-switch-checked) { background: var(--dsh-accent); border-color: var(--dsh-accent); }
.dsh-ui[data-theme][data-radius] .arco-radio-icon { width: 18px; height: 18px; }

.dsh-ui[data-theme][data-radius] .arco-card {
  border: 1px solid color-mix(in srgb, var(--dsh-border) 60%, transparent);
  border-radius: var(--dsh-radius-lg);
  background: var(--dsh-surface);
  color: var(--dsh-foreground);
  box-shadow: var(--dsh-shadow);
}
.dsh-ui[data-theme][data-radius] .arco-card-header { padding: 18px 22px; height: auto; border-bottom-color: var(--color-border-1); }
.dsh-ui[data-theme][data-radius] .arco-card-header-title { font-weight: 600; font-size: 15px; }
.dsh-ui[data-theme][data-radius] .arco-card-body { padding: 22px; }
.dsh-ui[data-theme][data-radius] :is(.arco-tag, .arco-badge-number) { border-radius: 999px; font-weight: 500; }
.dsh-ui[data-theme][data-radius] .arco-tag { padding-inline: 10px; }
.dsh-ui[data-theme][data-radius] .arco-alert { border-radius: var(--dsh-radius); padding: 14px 16px; }
.dsh-ui[data-theme][data-radius] .arco-collapse { border-radius: var(--dsh-radius-lg); overflow: hidden; border-color: var(--dsh-border); }
.dsh-ui[data-theme][data-radius] .arco-collapse-item-header { background: var(--dsh-surface); padding-block: 16px; }
.dsh-ui[data-theme][data-radius] .arco-collapse-item-content { background: var(--dsh-surface); }
.dsh-ui[data-theme][data-radius] .arco-tabs-header-nav-capsule { background: var(--dsh-surface-secondary); padding: 4px; border-radius: var(--dsh-radius); }
.dsh-ui[data-theme][data-radius] .arco-tabs-header-nav-capsule .arco-tabs-header-title-active { background: var(--dsh-surface); border-radius: calc(var(--dsh-radius) * 0.75); box-shadow: var(--dsh-shadow); }
.dsh-ui[data-theme][data-radius] .arco-table-container { border-radius: var(--dsh-radius); overflow: hidden; }
.dsh-ui[data-theme][data-radius] .arco-pagination-item { border-radius: calc(var(--dsh-radius) * 0.6); }
.dsh-ui[data-theme][data-radius] .arco-pagination-item-active { background: var(--dsh-accent); color: var(--dsh-accent-foreground); }

.dsh-ui[data-theme][data-radius] :is(.arco-select-popup, .arco-dropdown-menu, .arco-popover-content, .arco-picker-container, .arco-popconfirm-content) {
  border: 1px solid var(--dsh-border);
  border-radius: var(--dsh-radius);
  box-shadow: var(--dsh-overlay-shadow);
  background: var(--dsh-overlay);
}
.dsh-ui[data-theme][data-radius] :is(.arco-select-option, .arco-dropdown-menu-item) { margin: 3px 5px; border-radius: calc(var(--dsh-radius) * 0.65); }
.dsh-ui[data-theme][data-radius] :is(.arco-modal-mask, .arco-drawer-mask) { background: var(--dsh-mask); backdrop-filter: blur(5px); }
.dsh-ui[data-theme][data-radius] .arco-scrollbar-track { background: transparent; }


/* HeroUI 没有对应的 Arco 组件继续使用相同表面、状态和焦点令牌。 */
.dsh-ui[data-theme][data-radius] :is(.arco-transfer-view, .arco-list, .arco-comment-inner, .arco-calendar, .arco-descriptions-bordered .arco-descriptions-body) { border-color: var(--dsh-border); border-radius: var(--dsh-radius); background: var(--dsh-surface); }
.dsh-ui[data-theme][data-radius] :is(.arco-transfer-view-header, .arco-list-header, .arco-table-th, .arco-descriptions-item-label) { background: var(--dsh-surface-secondary); color: var(--dsh-muted); }
.dsh-ui[data-theme][data-radius] :is(.arco-tree-node-title, .arco-cascader-list-item, .arco-transfer-view-item, .arco-menu-item, .arco-menu-inline-header) { border-radius: calc(var(--dsh-radius) * 0.6); }
.dsh-ui[data-theme][data-radius] .arco-tree-node-title { padding: 4px 8px; }
.dsh-ui[data-theme][data-radius] .arco-tree-node-selected .arco-tree-node-title { background: var(--color-primary-light-1); color: var(--dsh-accent); }
.dsh-ui[data-theme][data-radius] :is(.arco-cascader-popup, .arco-tree-select-popup, .arco-mentions-popup, .arco-color-picker-panel) { border-radius: var(--dsh-radius); background: var(--dsh-overlay); border-color: var(--dsh-border); box-shadow: var(--dsh-overlay-shadow); }
.dsh-ui[data-theme][data-radius] .arco-color-picker-trigger { border-radius: calc(var(--dsh-radius) * 0.6); border-color: var(--dsh-border); }
.dsh-ui[data-theme][data-radius] :is(.arco-upload-drag, .arco-upload-list-picture, .arco-upload-picture-card) { border-radius: var(--dsh-radius); background: var(--dsh-surface-secondary); border-color: var(--dsh-border); }
.dsh-ui[data-theme][data-radius] .arco-upload-list-item { border-radius: calc(var(--dsh-radius) * 0.6); }
.dsh-ui[data-theme][data-radius] .arco-input-tag { border-radius: var(--dsh-radius); background: var(--dsh-surface); border-color: var(--dsh-border); }
.dsh-ui[data-theme][data-radius] .arco-calendar-date { border-radius: calc(var(--dsh-radius) * 0.6); }
.dsh-ui[data-theme][data-radius] .arco-calendar-date-today .arco-calendar-date-value { background: var(--dsh-accent); color: var(--dsh-accent-foreground); border-radius: 50%; }
.dsh-ui[data-theme][data-radius] :is(.arco-picker-cell-in-view.arco-picker-cell-selected .arco-picker-date-value, .arco-picker-cell-selected .arco-picker-month-value) { border-radius: 6px; background: var(--dsh-accent); color: var(--dsh-accent-foreground); }
.dsh-ui[data-theme][data-radius] :is(.arco-message, .arco-notification) { background: var(--dsh-overlay); color: var(--dsh-foreground); border: 1px solid var(--dsh-border); border-radius: var(--dsh-radius); box-shadow: var(--dsh-overlay-shadow); }
.dsh-ui[data-theme][data-radius] :is(.arco-result-title, .arco-statistic-value, .arco-typography) { color: var(--dsh-foreground); }
.dsh-ui[data-theme][data-radius] :is(.arco-result-subtitle, .arco-statistic-title, .arco-timeline-item-label) { color: var(--dsh-muted); }
.dsh-ui[data-theme][data-radius] :is(.arco-image, .arco-carousel) { border-radius: var(--dsh-radius); overflow: hidden; }
.dsh-ui[data-theme][data-radius] .arco-back-top-btn { background: var(--dsh-overlay); color: var(--dsh-foreground); border-radius: var(--dsh-radius); box-shadow: var(--dsh-overlay-shadow); }
.dsh-ui[data-theme][data-radius] .arco-anchor-link-active > .arco-anchor-link { color: var(--dsh-accent); }
.dsh-ui[data-theme][data-radius] .arco-resizebox-trigger, .dsh-ui[data-theme][data-radius] .arco-split-trigger { background: var(--dsh-surface-secondary); }
.dsh-ui[data-theme][data-radius] .arco-layout-sider { background: var(--dsh-surface); }
.dsh-ui[data-theme][data-radius] .arco-menu { color: var(--dsh-foreground); background: transparent; }
.dsh-ui[data-theme][data-radius] .arco-menu-selected { background: var(--color-primary-light-1); color: var(--dsh-accent); }
.dsh-ui[data-theme][data-radius] .arco-menu-horizontal .arco-menu-item { padding-inline: 14px; }


.dsh-ui[data-theme][data-radius][data-motion="reduced"] *, .dsh-ui[data-theme][data-radius][data-motion="reduced"] *::before, .dsh-ui[data-theme][data-radius][data-motion="reduced"] *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
.dsh-ui[data-theme][data-radius][data-motion="reduced"] .arco-btn:active { transform: none; }
@media (prefers-reduced-motion: reduce) {
  .dsh-ui[data-theme][data-radius] *, .dsh-ui[data-theme][data-radius] *::before, .dsh-ui[data-theme][data-radius] *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
  .dsh-ui[data-theme][data-radius] .arco-btn:active { transform: none; }
}

`

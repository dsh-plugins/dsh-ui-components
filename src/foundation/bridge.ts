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

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
.dsh-ui .arco-input:where(:not(.arco-input-inner-wrapper > input)):focus-visible,
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

body[data-ds-dark-theme]:not([data-ds-dark-theme="false"], [data-ds-dark-theme="0"]) .dsh-ui,
body[data-ds-dark-theme]:not([data-ds-dark-theme="false"], [data-ds-dark-theme="0"]) .dsh-ui-overlay {
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
const HERO_REFERENCE_CSS = `
/* HeroUI 3.2.7，Apache-2.0；声明来自官方编译产物，选择器接入 Arco 结构。 */
.dsh-ui[data-theme][data-radius]{--font-sans:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--color-black:#000;--color-white:#fff;--spacing:.25rem;--container-xs:20rem;--container-sm:24rem;--container-md:28rem;--container-lg:32rem;--text-xs:.75rem;--text-xs--line-height:calc(1 / .75);--text-sm:.875rem;--text-sm--line-height:calc(1.25 / .875);--text-base:1rem;--text-base--line-height:calc(1.5 / 1);--text-lg:1.125rem;--text-lg--line-height:calc(1.75 / 1.125);--text-xl:1.25rem;--text-xl--line-height:calc(1.75 / 1.25);--text-2xl:1.5rem;--text-2xl--line-height:calc(2 / 1.5);--text-3xl:1.875rem;--text-3xl--line-height:calc(2.25 / 1.875);--text-4xl:2.25rem;--text-4xl--line-height:calc(2.5 / 2.25);--font-weight-normal:400;--font-weight-medium:500;--font-weight-semibold:600;--font-weight-bold:700;--tracking-tight:-.025em;--leading-relaxed:1.625;--radius-xs:calc(var(--radius) * .25);--radius-xl:calc(var(--radius) * 1.5);--radius-2xl:calc(var(--radius) * 2);--radius-3xl:calc(var(--radius) * 3);--radius-4xl:calc(var(--radius) * 4);--ease-out:cubic-bezier(0, 0, .2, 1);--animate-pulse:pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;--blur-sm:8px;--blur-md:12px;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono);--color-surface-secondary:var(--surface-secondary);--color-surface-tertiary:var(--surface-tertiary);--color-muted:var(--muted);--color-default:var(--default);--color-field:var(--field-background,var(--default));--color-field-hover:var(--field-hover);--radius-field:var(--field-radius,calc(var(--radius) * 1.5));--border-width-field:var(--field-border-width,var(--border-width));--color-default-hover:var(--default-hover);--color-accent-hover:var(--accent-hover);--color-success-hover:var(--success-hover);--color-warning-hover:var(--warning-hover);--color-danger-hover:var(--danger-hover);--color-accent-soft:var(--accent-soft);--color-danger-soft:var(--danger-soft);--color-warning-soft:var(--warning-soft);--color-success-soft:var(--success-soft);--ease-smooth:ease;--ease-out-quad:cubic-bezier(.25, .46, .45, .94);--ease-out-quart:cubic-bezier(.165, .84, .44, 1);--ease-out-fluid:cubic-bezier(.32, .72, 0, 1);--ease-linear:linear}
  .dsh-ui[data-theme][data-radius] {
    --white: oklch(100% 0 0);
    --black: oklch(0% 0 0);
    --snow: oklch(0.9911 0 0);
    --eclipse: oklch(0.2103 0.0059 285.89);
    --spacing: 0.25rem;
    --border-width: 1px;
    --field-border-width: 0px;
    --disabled-opacity: 0.5;
    --ring-offset-width: 2px;
    --cursor-interactive: pointer;
    --cursor-disabled: not-allowed;
    --radius: 0.5rem;
    --field-radius: calc(var(--radius) * 1.5);
    --dsh-color-outline: rgb(0 0 0 / .1);
    --dsh-color-checker: repeating-conic-gradient(#efefef 0% 25%, #f7f7f7 0% 50%);
    --dsh-color-spectrum-start: red;
    --dsh-color-spectrum: linear-gradient(to right, red, #ff0, lime, cyan, blue, #f0f, red);
    --accent: oklch(0.6204 0.195 253.83);
    --accent-foreground: var(--snow);
    --success: oklch(0.7329 0.1935 150.81);
    --success-foreground: var(--eclipse);
    --field-border: transparent;
    --skeleton-animation: shimmer;
    --tooltip-delay: 1500ms;
    --tooltip-close-delay: 500ms;
  }
  .dsh-ui[data-theme][data-radius] {
    color-scheme: light;
    --background: oklch(0.9702 0 0);
    --foreground: var(--eclipse);
    --dsh-markdown-quote-light: #ddd;
    --dsh-markdown-quote-dark: #1f1f20;
    --dsh-markdown-important: rgb(var(--purple-6));
    --surface: var(--white);
    --surface-foreground: var(--foreground);
    --surface-secondary: oklch(0.9524 0.0013 286.37);
    --surface-secondary-foreground: var(--foreground);
    --surface-tertiary: oklch(0.9373 0.0013 286.37);
    --surface-tertiary-foreground: var(--foreground);
    --overlay: var(--white);
    --overlay-foreground: var(--foreground);
    --muted: oklch(0.5517 0.0138 285.94);
    --scrollbar: var(--scrollbar-thumb);
    --scrollbar-thumb: color-mix(in oklch, var(--foreground) 15%, transparent);
    --scrollbar-track: transparent;
    --scrollbar-gutter: auto;
    --scrollbar-width: thin;
    --scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
    --default: oklch(94% 0.001 286.375);
    --default-foreground: var(--eclipse);
    --field-background: var(--white);
    --field-foreground: oklch(0.2103 0.0059 285.89);
    --field-placeholder: var(--muted);
    --warning: oklch(0.7819 0.1585 72.33);
    --warning-foreground: var(--eclipse);
    --danger: oklch(0.6532 0.2328 25.74);
    --danger-foreground: var(--snow);
    --segment: var(--white);
    --segment-foreground: var(--eclipse);
    --border: oklch(90% 0.004 286.32);
    --separator: oklch(92% 0.004 286.32);
    --focus: var(--accent);
    --link: var(--foreground);
    --backdrop: rgba(0, 0, 0, 0.5);
    --surface-hover: color-mix(in oklab, var(--surface) 92%, var(--surface-foreground) 8%);
    --background-secondary: color-mix(in oklab, var(--background) 96%, var(--foreground) 4%);
    --background-tertiary: color-mix(in oklab, var(--background) 92%, var(--foreground) 8%);
    --background-inverse: var(--foreground);
    --default-hover: color-mix(in oklab, var(--default) 96%, var(--default-foreground) 4%);
    --accent-hover: color-mix(in oklab, var(--accent) 90%, var(--accent-foreground) 10%);
    --success-hover: color-mix(in oklab, var(--success) 90%, var(--success-foreground) 10%);
    --warning-hover: color-mix(in oklab, var(--warning) 90%, var(--warning-foreground) 10%);
    --danger-hover: color-mix(in oklab, var(--danger) 90%, var(--danger-foreground) 10%);
    --field-hover: color-mix(
      in oklab,
      var(--field-background, var(--default)) 90%,
      var(--field-foreground, var(--foreground)) 2%
    );
    --field-focus: var(--field-background, var(--default));
    --field-border-hover: color-mix(
      in oklab,
      var(--field-border, var(--border)) 88%,
      var(--field-foreground, var(--foreground)) 10%
    );
    --field-border-focus: color-mix(
      in oklab,
      var(--field-border, var(--border)) 74%,
      var(--field-foreground, var(--foreground)) 22%
    );
    --default-soft: color-mix(in oklab, var(--default) 50%, transparent);
    --default-soft-foreground: var(--default-foreground);
    --default-soft-hover: color-mix(in oklab, var(--default) 60%, transparent);
    --accent-soft: color-mix(in oklab, var(--accent) 15%, transparent);
    --accent-soft-foreground: color-mix(in oklab, var(--accent) 70%, var(--foreground) 30%);
    --accent-soft-hover: color-mix(in oklab, var(--accent) 20%, transparent);
    --danger-soft: color-mix(in oklab, var(--danger) 15%, transparent);
    --danger-soft-foreground: color-mix(in oklab, var(--danger) 70%, var(--foreground) 40%);
    --danger-soft-hover: color-mix(in oklab, var(--danger) 20%, transparent);
    --warning-soft: color-mix(in oklab, var(--warning) 15%, transparent);
    --warning-soft-foreground: color-mix(in oklab, var(--warning) 80%, var(--foreground) 70%);
    --warning-soft-hover: color-mix(in oklab, var(--warning) 20%, transparent);
    --success-soft: color-mix(in oklab, var(--success) 15%, transparent);
    --success-soft-foreground: color-mix(in oklab, var(--success) 80%, var(--foreground) 60%);
    --success-soft-hover: color-mix(in oklab, var(--success) 20%, transparent);
    --separator-secondary: color-mix(in oklab, var(--surface) 85%, var(--surface-foreground) 15%);
    --separator-tertiary: color-mix(in oklab, var(--surface) 81%, var(--surface-foreground) 19%);
    --border-secondary: color-mix(in oklab, var(--surface) 78%, var(--surface-foreground) 22%);
    --border-tertiary: color-mix(in oklab, var(--surface) 66%, var(--surface-foreground) 34%);
    --surface-shadow:
      0 2px 4px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.06),
      0 0 1px 0 rgba(0, 0, 0, 0.06);
    --overlay-shadow:
      0 2px 8px 0 rgba(0, 0, 0, 0.06), 0 -6px 12px 0 rgba(0, 0, 0, 0.03),
      0 14px 28px 0 rgba(0, 0, 0, 0.08);
    --field-shadow:
      0 2px 4px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.06),
      0 0 1px 0 rgba(0, 0, 0, 0.06);
  }
  .dsh-ui[data-theme][data-radius][data-theme="dark"], body[data-ds-dark-theme]:not([data-ds-dark-theme="false"], [data-ds-dark-theme="0"]) .dsh-ui[data-theme="host"][data-radius] {
    color-scheme: dark;
    --background: oklch(12% 0.005 285.823);
    --foreground: var(--snow);
    --surface: oklch(0.2103 0.0059 285.89);
    --surface-foreground: var(--foreground);
    --surface-secondary: oklch(0.257 0.0037 286.14);
    --surface-secondary-foreground: var(--foreground);
    --surface-tertiary: oklch(0.2721 0.0024 247.91);
    --surface-tertiary-foreground: var(--foreground);
    --overlay: oklch(0.2103 0.0059 285.89);
    --overlay-foreground: var(--foreground);
    --muted: oklch(70.5% 0.015 286.067);
    --scrollbar: var(--scrollbar-thumb);
    --scrollbar-thumb: color-mix(in oklch, var(--foreground) 15%, transparent);
    --scrollbar-track: transparent;
    --scrollbar-gutter: auto;
    --scrollbar-width: thin;
    --scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
    --default: oklch(27.4% 0.006 286.033);
    --default-foreground: var(--snow);
    --field-background: oklch(0.2103 0.0059 285.89);
    --field-foreground: var(--foreground);
    --field-placeholder: var(--muted);
    --warning: oklch(0.8203 0.1388 76.34);
    --warning-foreground: var(--eclipse);
    --danger: oklch(0.594 0.1967 24.63);
    --danger-foreground: var(--snow);
    --segment: oklch(0.3964 0.01 285.93);
    --segment-foreground: var(--foreground);
    --border: oklch(28% 0.006 286.033);
    --separator: oklch(25% 0.006 286.033);
    --focus: var(--accent);
    --link: var(--foreground);
    --backdrop: rgba(0, 0, 0, 0.6);
    --surface-shadow: 0 0 0 0 transparent inset;
    --overlay-shadow: 0 0 1px 0 rgba(255, 255, 255, 0.3) inset;
    --field-shadow: 0 0 0 0 transparent inset;
    --surface-hover: color-mix(in oklab, var(--surface) 92%, var(--surface-foreground) 8%);
    --background-secondary: color-mix(in oklab, var(--background) 96%, var(--foreground) 4%);
    --background-tertiary: color-mix(in oklab, var(--background) 92%, var(--foreground) 8%);
    --background-inverse: var(--foreground);
    --default-hover: color-mix(in oklab, var(--default) 96%, var(--default-foreground) 4%);
    --accent-hover: color-mix(in oklab, var(--accent) 90%, var(--accent-foreground) 10%);
    --success-hover: color-mix(in oklab, var(--success) 90%, var(--success-foreground) 10%);
    --warning-hover: color-mix(in oklab, var(--warning) 90%, var(--warning-foreground) 10%);
    --danger-hover: color-mix(in oklab, var(--danger) 90%, var(--danger-foreground) 10%);
    --field-hover: color-mix(
      in oklab,
      var(--field-background, var(--default)) 90%,
      var(--field-foreground, var(--foreground)) 2%
    );
    --field-focus: var(--field-background, var(--default));
    --field-border-hover: color-mix(
      in oklab,
      var(--field-border, var(--border)) 88%,
      var(--field-foreground, var(--foreground)) 10%
    );
    --field-border-focus: color-mix(
      in oklab,
      var(--field-border, var(--border)) 74%,
      var(--field-foreground, var(--foreground)) 22%
    );
    --default-soft: color-mix(in oklab, var(--default) 50%, transparent);
    --default-soft-foreground: var(--default-foreground);
    --default-soft-hover: color-mix(in oklab, var(--default) 60%, transparent);
    --accent-soft: color-mix(in oklab, var(--accent) 12%, transparent);
    --accent-soft-foreground: color-mix(in oklab, var(--accent) 80%, var(--foreground) 30%);
    --accent-soft-hover: color-mix(in oklab, var(--accent) 16%, transparent);
    --danger-soft: color-mix(in oklab, var(--danger) 15%, transparent);
    --danger-soft-foreground: color-mix(in oklab, var(--danger) 80%, var(--foreground) 30%);
    --danger-soft-hover: color-mix(in oklab, var(--danger) 20%, transparent);
    --warning-soft: color-mix(in oklab, var(--warning) 12%, transparent);
    --warning-soft-foreground: color-mix(in oklab, var(--warning) 80%, var(--foreground) 30%);
    --warning-soft-hover: color-mix(in oklab, var(--warning) 16%, transparent);
    --success-soft: color-mix(in oklab, var(--success) 12%, transparent);
    --success-soft-foreground: color-mix(in oklab, var(--success) 80%, var(--foreground) 30%);
    --success-soft-hover: color-mix(in oklab, var(--success) 16%, transparent);
    --separator-secondary: color-mix(in oklab, var(--surface) 85%, var(--surface-foreground) 15%);
    --separator-tertiary: color-mix(in oklab, var(--surface) 81%, var(--surface-foreground) 19%);
    --border-secondary: color-mix(in oklab, var(--surface) 78%, var(--surface-foreground) 22%);
    --border-tertiary: color-mix(in oklab, var(--surface) 66%, var(--surface-foreground) 34%);
  }.dsh-ui[data-theme][data-radius] .arco-collapse{contain:layout style}.dsh-ui[data-theme][data-radius] .arco-collapse-item-content-box{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.dsh-ui[data-theme][data-radius] .arco-collapse-item{--tw-border-style:none;border-style:none;position:relative}.dsh-ui[data-theme][data-radius] .arco-collapse-item-header{cursor:var(--cursor-interactive);padding-inline:calc(var(--spacing) * 4);padding-block:calc(var(--spacing) * 4);text-align:start;font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height));--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium);-webkit-tap-highlight-color:transparent;transition:opacity .15s var(--ease-out), box-shadow .15s var(--ease-out);flex:1;justify-content:space-between;align-items:center;display:flex}.dsh-ui[data-theme][data-radius] .arco-breadcrumb{align-items:center;gap:calc(var(--spacing) * 1.5);display:flex}.dsh-ui[data-theme][data-radius] .arco-tabs{gap:calc(var(--spacing) * 2);display:flex}.dsh-ui[data-theme][data-radius] .arco-tabs-header-nav-line{padding:var(--spacing);display:inline-flex}.dsh-ui[data-theme][data-radius] .arco-tabs-header-nav-line .arco-tabs-header-title{height:calc(var(--spacing) * 8);border-radius:calc(var(--radius) * 3);padding-inline:calc(var(--spacing) * 4);text-align:center;font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height));--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium);color:var(--muted);--tw-outline-style:none;-webkit-tap-highlight-color:transparent;z-index:1;cursor:var(--cursor-interactive);transition:color .15s var(--ease-smooth), background-color .15s var(--ease-smooth), box-shadow .15s var(--ease-out), opacity .15s var(--ease-smooth);outline-style:none;justify-content:center;align-items:center;display:flex;position:relative}.dsh-ui[data-theme][data-radius] .arco-btn{isolation:isolate;height:calc(var(--spacing) * 10);transform-origin:50%;justify-content:center;align-items:center;gap:calc(var(--spacing) * 2);border-radius:calc(var(--radius) * 3);width:fit-content;padding-inline:calc(var(--spacing) * 4);font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height));--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium);white-space:nowrap;--tw-outline-style:none;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;outline-style:none;display:inline-flex;position:relative}@media (min-width:48rem){.dsh-ui[data-theme][data-radius] .arco-btn{height:calc(var(--spacing) * 9)}}.dsh-ui[data-theme][data-radius] .arco-btn{transition:transform .25s var(--ease-smooth), background-color .1s var(--ease-out), box-shadow .1s var(--ease-out);transform:translateZ(0) var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.dsh-ui[data-theme][data-radius] .arco-btn{cursor:var(--cursor-interactive);--button-bg:transparent;--button-bg-hover:var(--button-bg);--button-bg-pressed:var(--button-bg-hover);--button-fg:currentColor;background-color:var(--button-bg);color:var(--button-fg)}.dsh-ui[data-theme][data-radius] .arco-btn-size-small{height:calc(var(--spacing) * 9);padding-inline:calc(var(--spacing) * 3)}@media (min-width:48rem){.dsh-ui[data-theme][data-radius] .arco-btn-size-small{height:calc(var(--spacing) * 8)}}.dsh-ui[data-theme][data-radius] .arco-btn-size-large{height:calc(var(--spacing) * 11);font-size:var(--text-base);line-height:var(--tw-leading,var(--text-base--line-height))}@media (min-width:48rem){.dsh-ui[data-theme][data-radius] .arco-btn-size-large{height:calc(var(--spacing) * 10)}}.dsh-ui[data-theme][data-radius] .arco-btn-primary{--button-bg:var(--accent);--button-bg-hover:var(--accent-hover);--button-bg-pressed:var(--accent-hover);--button-fg:var(--accent-foreground)}.dsh-ui[data-theme][data-radius] .arco-btn-secondary{--button-bg:var(--default);--button-bg-hover:var(--default-hover);--button-bg-pressed:var(--default-hover);--button-fg:var(--accent-soft-foreground)}.dsh-ui[data-theme][data-radius] .arco-btn-text,
.dsh-ui[data-theme][data-radius] .arco-btn-outline{--button-bg:transparent;--button-bg-hover:var(--default);--button-bg-pressed:var(--default);--button-fg:var(--default-foreground)}.dsh-ui[data-theme][data-radius] .arco-btn-outline{border-style:var(--tw-border-style);border-width:1px;border-color:var(--border);--button-bg-hover:var(--default)}@supports (color:color-mix(in lab, red, red)){.dsh-ui[data-theme][data-radius] .arco-btn-outline{--button-bg-hover:color-mix(in srgb, var(--default) 60%, transparent)}}.dsh-ui[data-theme][data-radius] .arco-btn-status-danger{--button-bg:var(--danger);--button-bg-hover:var(--danger-hover);--button-bg-pressed:var(--danger-hover);--button-fg:var(--danger-foreground)}.dsh-ui[data-theme][data-radius] .arco-switch{border-radius:calc(var(--radius) * 1.5);background-color:var(--switch-control-bg);width:2.5rem;height:1.25rem;transition:background-color .25s var(--ease-smooth), box-shadow .15s var(--ease-out);flex-shrink:0;align-items:center;display:flex;position:relative;overflow:hidden}.dsh-ui[data-theme][data-radius] .arco-switch-dot{transform-origin:50%;transform:translateZ(0) var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,);border-radius:calc(var(--radius) * 1);background-color:var(--color-white);color:var(--color-black);--tw-shadow:var(--field-shadow);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);--switch-thumb-offset:calc(100% - 1.375rem - var(--spacing));width:1.375rem;height:1rem;transition:inset-inline-start .3s var(--ease-out-fluid), background-color .2s var(--ease-out);margin-inline-start:calc(var(--spacing) * .5);display:flex;position:relative;inset-inline-start:0}.dsh-ui[data-theme][data-radius] .arco-tag{align-items:center;gap:calc(var(--spacing) * .5);border-radius:calc(var(--radius) * 2);width:fit-content;padding-inline:calc(var(--spacing) * 2);padding-block:calc(var(--spacing) * .5);font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height));--tw-leading:calc(var(--spacing) * 5);line-height:calc(var(--spacing) * 5);--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium);--chip-bg:var(--default);--chip-fg:currentColor;background-color:var(--chip-bg);color:var(--chip-fg);flex-shrink:0;display:inline-flex}.dsh-ui[data-theme][data-radius] .arco-table table{border-collapse:separate;--tw-border-spacing-x:0px;--tw-border-spacing-y:0px;width:100%;border-spacing:var(--tw-border-spacing-x) var(--tw-border-spacing-y);font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.dsh-ui[data-theme][data-radius] .arco-table thead{border-bottom-style:var(--tw-border-style);border-bottom-width:1px;border-color:var(--separator)}@supports (color:color-mix(in lab, red, red)){.dsh-ui[data-theme][data-radius] .arco-table thead{border-color:color-mix(in oklab, var(--separator) 50%, transparent)}}.dsh-ui[data-theme][data-radius] .arco-table thead{background-color:var(--surface-secondary)}.dsh-ui[data-theme][data-radius] .arco-table th{padding-inline:calc(var(--spacing) * 4);padding-block:calc(var(--spacing) * 2.5);text-align:start;font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height));--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium);color:var(--muted);position:relative}.dsh-ui[data-theme][data-radius] .arco-table tr{border-bottom-style:var(--tw-border-style);border-bottom-width:1px;border-color:var(--separator);height:100%;position:relative}@supports (color:color-mix(in lab, red, red)){.dsh-ui[data-theme][data-radius] .arco-table tr{border-color:color-mix(in oklab, var(--separator) 50%, transparent)}}.dsh-ui[data-theme][data-radius] .arco-table td{background-color:var(--surface);height:100%;padding-inline:calc(var(--spacing) * 4);padding-block:calc(var(--spacing) * 3);vertical-align:middle;font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height));color:var(--foreground);border-bottom-style:var(--tw-border-style);border-bottom-width:1px;border-color:var(--separator-tertiary)}@supports (color:color-mix(in lab, red, red)){.dsh-ui[data-theme][data-radius] .arco-table td{border-color:color-mix(in oklab, var(--separator-tertiary) 50%, transparent)}}.dsh-ui[data-theme][data-radius] .arco-alert{justify-content:flex-start;align-items:flex-start;gap:calc(var(--spacing) * 4);background-color:var(--surface);padding-inline:calc(var(--spacing) * 4);padding-block:calc(var(--spacing) * 3);--tw-shadow:var(--surface-shadow);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);border-radius:min(32px, var(--radius-3xl));flex-direction:row;display:flex}.dsh-ui[data-theme][data-radius] .arco-alert-body{flex-direction:column;flex-grow:1;align-items:flex-start;height:100%;display:flex}.dsh-ui[data-theme][data-radius] .arco-alert-icon{padding:var(--spacing);-webkit-user-select:none;user-select:none;justify-content:center;align-items:center;display:flex}.dsh-ui[data-theme][data-radius] .arco-alert-title{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height));--tw-leading:calc(var(--spacing) * 6);line-height:calc(var(--spacing) * 6);--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.dsh-ui[data-theme][data-radius] .arco-alert-content{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height));color:var(--muted)}.dsh-ui[data-theme][data-radius] .arco-skeleton-header .arco-skeleton-image{pointer-events:none;border-radius:calc(var(--radius) * .5);background-color:var(--surface-tertiary);position:relative;overflow:hidden}@supports (color:color-mix(in lab, red, red)){.dsh-ui[data-theme][data-radius] .arco-skeleton-header .arco-skeleton-image{background-color:color-mix(in oklab, var(--surface-tertiary) 70%, transparent)}}.dsh-ui[data-theme][data-radius] .arco-checkbox-mask{width:calc(var(--spacing) * 4);height:calc(var(--spacing) * 4);border-radius:calc(var(--radius) * .75);border-style:var(--tw-border-style);border-width:1px;border-width:var(--border-width-field);border-color:var(--field-border,var(--border));background-color:var(--field-background,var(--default));--tw-shadow:var(--field-shadow);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);--tw-outline-style:none;-webkit-tap-highlight-color:transparent;transition:background-color .2s var(--ease-out), border-color .2s var(--ease-out), transform .1s var(--ease-out);outline-style:none;flex-shrink:0;justify-content:center;align-items:center;display:inline-flex;position:relative;overflow:hidden}.dsh-ui[data-theme][data-radius] .arco-checkbox-mask{cursor:var(--cursor-interactive)}.dsh-ui[data-theme][data-radius] .arco-checkbox-mask-icon{z-index:10;width:calc(var(--spacing) * 3);height:calc(var(--spacing) * 3);justify-content:center;align-items:center;display:flex;position:relative}.dsh-ui[data-theme][data-radius] .arco-input{border-radius:var(--field-radius,calc(var(--radius) * 1.5));border-style:var(--tw-border-style);background-color:var(--field-background,var(--default));padding-inline:calc(var(--spacing) * 3);padding-block:calc(var(--spacing) * 2);font-size:var(--text-base);line-height:var(--tw-leading,var(--text-base--line-height));color:var(--field-foreground,var(--foreground));--tw-shadow:var(--field-shadow);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);--tw-outline-style:none;border-width:1px;outline-style:none}@media (min-width:40rem){.dsh-ui[data-theme][data-radius] .arco-input{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}}.dsh-ui[data-theme][data-radius] .arco-input{border-width:var(--border-width-field);border-color:var(--field-border);--input-bg:var(--color-field);--input-bg-hover:var(--color-field-hover);--input-bg-focus:var(--field-focus);--input-autofill-shadow:0 0 0 1000px var(--input-bg) inset, var(--tw-inset-shadow,0 0 #0000), var(--tw-inset-ring-shadow,0 0 #0000), var(--tw-ring-offset-shadow,0 0 #0000), var(--tw-ring-shadow,0 0 #0000), var(--tw-shadow,0 0 #0000);transition:background-color .15s var(--ease-smooth), border-color .15s var(--ease-smooth), box-shadow .15s var(--ease-out)}.dsh-ui[data-theme][data-radius] .arco-radio-mask{width:calc(var(--spacing) * 4);height:calc(var(--spacing) * 4);border-radius:calc(var(--radius) * 1);border-style:var(--tw-border-style);border-width:1px;border-width:var(--border-width-field);border-color:var(--field-border,var(--border));background-color:var(--field-background,var(--default));--tw-shadow:var(--field-shadow);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);--tw-outline-style:none;-webkit-tap-highlight-color:transparent;transition:background-color .2s var(--ease-out), border-color .2s var(--ease-out), transform .1s var(--ease-out);outline-style:none;flex-shrink:0;justify-content:center;align-items:center;display:inline-flex;position:relative}.dsh-ui[data-theme][data-radius] .arco-radio-mask{cursor:var(--cursor-interactive)}.dsh-ui[data-theme][data-radius] .arco-radio-mask::after{pointer-events:none;justify-content:center;align-items:center;display:flex;position:absolute;inset:0}.dsh-ui[data-theme][data-radius] .arco-textarea{border-radius:var(--field-radius,calc(var(--radius) * 1.5));border-style:var(--tw-border-style);background-color:var(--field-background,var(--default));padding-inline:calc(var(--spacing) * 3);padding-block:calc(var(--spacing) * 2);font-size:var(--text-base);line-height:var(--tw-leading,var(--text-base--line-height));color:var(--field-foreground,var(--foreground));--tw-shadow:var(--field-shadow);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);--tw-outline-style:none;border-width:1px;outline-style:none}@media (min-width:40rem){.dsh-ui[data-theme][data-radius] .arco-textarea{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}}.dsh-ui[data-theme][data-radius] .arco-textarea{border-width:var(--border-width-field);border-color:var(--field-border);--textarea-bg:var(--color-field);--textarea-bg-hover:var(--color-field-hover);--textarea-bg-focus:var(--field-focus);--textarea-autofill-shadow:0 0 0 1000px var(--textarea-bg) inset, var(--tw-inset-shadow,0 0 #0000), var(--tw-inset-ring-shadow,0 0 #0000), var(--tw-ring-offset-shadow,0 0 #0000), var(--tw-ring-shadow,0 0 #0000), var(--tw-shadow,0 0 #0000);min-height:38px;transition:background-color .15s var(--ease-smooth), border-color .15s var(--ease-smooth), box-shadow .15s var(--ease-out)}.dsh-ui[data-theme][data-radius] .arco-card{gap:calc(var(--spacing) * 3);padding:calc(var(--spacing) * 4);--tw-shadow:var(--surface-shadow);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);border-radius:min(32px, var(--radius-3xl));flex-direction:column;display:flex;position:relative;overflow:visible}.dsh-ui[data-theme][data-radius] .arco-card-header{flex-direction:column;display:flex}.dsh-ui[data-theme][data-radius] .arco-card-header-title{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height));--tw-leading:calc(var(--spacing) * 6);line-height:calc(var(--spacing) * 6);--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium);color:var(--foreground)}.dsh-ui[data-theme][data-radius] .arco-card-body{gap:var(--spacing);flex-direction:column;flex:1;display:flex}.dsh-ui[data-theme][data-radius] .arco-avatar{--avatar-size:2.5rem;--avatar-radius:calc(var(--radius) * 3);width:calc(var(--spacing) * 10);height:calc(var(--spacing) * 10);background-color:var(--default);border-radius:var(--avatar-radius);flex-shrink:0;justify-content:center;align-items:center;display:flex;position:relative;overflow:hidden}.dsh-ui[data-theme][data-radius] .arco-avatar-text{background-color:var(--default);width:100%;height:100%;font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height));--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium);justify-content:center;align-items:center;display:flex}.dsh-ui[data-theme][data-radius] .arco-select-view{isolation:isolate;min-height:calc(var(--spacing) * 9);border-radius:var(--field-radius,calc(var(--radius) * 1.5));border-style:var(--tw-border-style);background-color:var(--field-background,var(--default));padding-inline:calc(var(--spacing) * 3);padding-block:calc(var(--spacing) * 2);font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height));color:var(--field-foreground,var(--foreground));--tw-shadow:var(--field-shadow);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);--tw-outline-style:none;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;transition:background-color .15s var(--ease-smooth), border-color .15s var(--ease-smooth), box-shadow .15s var(--ease-out);border-width:1px;outline-style:none;display:inline-flex;position:relative}.dsh-ui[data-theme][data-radius] .arco-select-view{cursor:var(--cursor-interactive);border-width:var(--border-width-field);border-color:var(--field-border)}.dsh-ui[data-theme][data-radius] .arco-select-view-value{text-align:start;font-size:var(--text-base);line-height:var(--tw-leading,var(--text-base--line-height));overflow-wrap:break-word;color:currentColor;flex:1}@media (min-width:40rem){.dsh-ui[data-theme][data-radius] .arco-select-view-value{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}}
/* ARCO_REFERENCE_ADAPTER */
.dsh-ui[data-theme][data-radius] {
  --dsh-background: var(--background);
  --dsh-foreground: var(--foreground);
  --dsh-muted: var(--muted);
  --dsh-surface: var(--surface);
  --dsh-surface-secondary: var(--surface-secondary);
  --dsh-surface-tertiary: var(--surface-tertiary);
  --dsh-overlay: var(--overlay);
  --dsh-accent: var(--accent);
  --dsh-accent-foreground: var(--accent-foreground);
  --dsh-success: var(--success);
  --dsh-warning: var(--warning);
  --dsh-danger: var(--danger);
  --dsh-border: var(--border);
  --dsh-mask: var(--backdrop);
  --dsh-shadow: var(--surface-shadow);
  --dsh-overlay-shadow: var(--overlay-shadow);
  --dsh-radius: var(--field-radius);
  --dsh-radius-lg: var(--radius-3xl);
  --border-width-field: var(--field-border-width);
  --radius-xs: calc(var(--radius) * 0.25);
  --radius-sm: calc(var(--radius) * 0.5);
  --radius-md: calc(var(--radius) * 0.75);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.5);
  --radius-2xl: calc(var(--radius) * 2);
  --radius-3xl: calc(var(--radius) * 3);
  font-size: 16px;
  line-height: 1.5;
  color: var(--foreground);
}
.dsh-ui[data-theme][data-radius="none"] { --radius: 0px; }
.dsh-ui[data-theme][data-radius="sm"] { --radius: 0.25rem; }
.dsh-ui[data-theme][data-radius="lg"] { --radius: 0.75rem; }
.dsh-ui[data-theme][data-radius="full"] { --radius: 999px; }
.dsh-ui[data-theme][data-radius] *,
.dsh-ui[data-theme][data-radius] *::before,
.dsh-ui[data-theme][data-radius] *::after {
  box-sizing: border-box;
  corner-shape: round;
  --tw-inset-shadow: 0 0 transparent;
  --tw-inset-ring-shadow: 0 0 transparent;
  --tw-ring-offset-shadow: 0 0 transparent;
  --tw-ring-shadow: 0 0 transparent;
  --tw-shadow: 0 0 transparent;
  --tw-border-style: solid;
}
.dsh-ui[data-theme][data-radius] .arco-btn {
  margin: 0;
  border: 0 solid transparent;
  padding-block: 0;
  font-family: inherit;
  letter-spacing: normal;
  box-shadow: none;
}
.dsh-ui[data-theme][data-radius] .arco-btn-size-small { font-size: 14px; line-height: 20px; }
.dsh-ui[data-theme][data-radius] .arco-btn:not(.arco-btn-disabled),
.dsh-ui[data-theme][data-radius] .arco-btn.arco-btn-disabled {
  color: var(--button-fg);
  background-color: var(--button-bg);
}
.dsh-ui[data-theme][data-radius] .arco-btn.arco-btn-disabled { opacity: var(--disabled-opacity); }
.dsh-ui[data-theme][data-radius] .arco-btn-outline {
  border: 1px solid var(--border);
  --button-bg: transparent;
  --button-fg: var(--default-foreground);
  --button-bg-hover: color-mix(in srgb, var(--default) 60%, transparent);
}
.dsh-ui[data-theme][data-radius] .arco-btn-text { --button-bg: transparent; --button-fg: var(--default-foreground); --button-bg-hover: var(--default); }
.dsh-ui[data-theme][data-radius] .arco-btn:not(.arco-btn-disabled):not(.arco-btn-loading):hover,
.dsh-ui[data-theme][data-radius] .arco-btn.arco-btn-primary.arco-btn-status-danger:not(.arco-btn-disabled):not(.arco-btn-loading):hover,
.dsh-ui[data-theme][data-radius] .arco-btn.arco-btn-primary.arco-btn-status-danger:not(.arco-btn-disabled):not(.arco-btn-loading):active {
  color: var(--button-fg);
  background-color: var(--button-bg-hover);
}
.dsh-ui[data-theme][data-radius] .arco-btn.arco-btn-status-danger:not(.arco-btn-disabled) { color: var(--danger-foreground); background: var(--danger); }
.dsh-ui[data-theme][data-radius] .arco-btn.arco-btn-status-danger:is(.arco-btn-outline, .arco-btn-text):not(.arco-btn-disabled) { color: var(--danger); background: transparent; }
.dsh-ui[data-theme][data-radius] .arco-input,
.dsh-ui[data-theme][data-radius] .arco-input-size-default,
.dsh-ui[data-theme][data-radius] .arco-textarea {
  height: auto;
  min-height: 36px;
  border: var(--border-width-field) solid var(--field-border);
  background: var(--field-background);
  color: var(--field-foreground);
  font-family: inherit;
  font-weight: 400;
  box-shadow: var(--field-shadow);
}
.dsh-ui[data-theme][data-radius] .arco-textarea { min-height: 38px; resize: vertical; }
.dsh-ui[data-theme][data-radius] .arco-input::placeholder,
.dsh-ui[data-theme][data-radius] .arco-textarea::placeholder { color: var(--field-placeholder); opacity: 1; }
.dsh-ui[data-theme][data-radius] .arco-input-wrapper { border: 0; padding: 0; background: transparent; box-shadow: none; min-height: 0; }
.dsh-ui[data-theme][data-radius] .arco-input-inner-wrapper { border: var(--border-width-field) solid var(--field-border); background: var(--field-background); box-shadow: var(--field-shadow); }
.dsh-ui[data-theme][data-radius] .arco-input-inner-wrapper .arco-input { box-shadow: none; border: 0; background: transparent; }
.dsh-ui[data-theme][data-radius] .arco-input:where(:not(.arco-input-inner-wrapper > input)):hover,
.dsh-ui[data-theme][data-radius] .arco-input-inner-wrapper:where(:not(.arco-input-inner-wrapper-error, .arco-input-inner-wrapper-disabled)):hover,
.dsh-ui[data-theme][data-radius] .arco-textarea:hover { border-color: var(--field-border-hover); background: var(--field-hover); }
.dsh-ui[data-theme][data-radius] :is(.arco-input:where(:not(.arco-input-inner-wrapper > input)), .arco-textarea):focus,
.dsh-ui[data-theme][data-radius] .arco-input-inner-wrapper:focus-within,
.dsh-ui[data-theme][data-radius] .arco-select-focused .arco-select-view { border-color: var(--field-border-focus); background: var(--field-focus); outline: none; box-shadow: 0 0 0 2px var(--focus), var(--field-shadow); }
.dsh-ui[data-theme][data-radius] :is(.arco-input-error, .arco-textarea-error),
.dsh-ui[data-theme][data-radius] .arco-select-error .arco-select-view { outline: 1px solid var(--danger); }
.dsh-ui[data-theme][data-radius] :is(.arco-checkbox-disabled, .arco-radio-disabled, .arco-switch-disabled, .arco-select-disabled, .arco-input-disabled, .arco-textarea-disabled),
.dsh-ui[data-theme][data-radius] .arco-slider:has(.arco-slider-road-disabled) { opacity: var(--disabled-opacity); cursor: var(--cursor-disabled); pointer-events: none; }
.dsh-ui[data-theme][data-radius] .arco-checkbox,
.dsh-ui[data-theme][data-radius] .arco-radio {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  padding: 0;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: var(--foreground);
}
.dsh-ui[data-theme][data-radius] .arco-checkbox-text,
.dsh-ui[data-theme][data-radius] .arco-radio-text { margin: 0; padding: 0; color: inherit; }
.dsh-ui[data-theme][data-radius] .arco-checkbox-mask-wrapper,
.dsh-ui[data-theme][data-radius] .arco-radio-mask-wrapper { display: flex; width: 16px; height: 16px; margin: 0; padding: 0; top: auto; vertical-align: middle; }
.dsh-ui[data-theme][data-radius] .arco-checkbox-mask,
.dsh-ui[data-theme][data-radius] .arco-radio-mask { width: 16px; height: 16px; border-width: var(--border-width-field); box-shadow: var(--field-shadow); background: var(--field-background); }
.dsh-ui[data-theme][data-radius] .arco-checkbox-checked .arco-checkbox-mask,
.dsh-ui[data-theme][data-radius] .arco-radio-checked .arco-radio-mask { background: var(--accent); border-color: transparent; }
.dsh-ui[data-theme][data-radius] .arco-checkbox-checked .arco-checkbox-mask { background: var(--field-background); }
.dsh-ui[data-theme][data-radius] .arco-checkbox-checked .arco-checkbox-mask::before { content: ''; position: absolute; inset: 0; z-index: 0; border-radius: inherit; background: var(--accent); }
.dsh-ui[data-theme][data-radius] .arco-checkbox-mask-icon { width: 10px; height: 10px; color: var(--accent-foreground); stroke-width: 2.5px; }
.dsh-ui[data-theme][data-radius] .arco-checkbox-mask-wrapper::before,
.dsh-ui[data-theme][data-radius] .arco-radio-mask-wrapper::before { display: none; }
.dsh-ui[data-theme][data-radius] .arco-radio-mask::after { border-radius: inherit; background: var(--field-background); width: 100%; height: 100%; margin: 0; top: 0; left: 0; transform: scale(1); }
.dsh-ui[data-theme][data-radius] .arco-radio-checked .arco-radio-mask::after { background: var(--accent-foreground); transform: scale(0.4286); }
.dsh-ui[data-theme][data-radius] .arco-radio-group-direction-vertical { display: flex; flex-direction: column; gap: 0; }
.dsh-ui[data-theme][data-radius] .arco-radio-group-direction-vertical .arco-radio { margin: 16px 0 0; line-height: 20px; }
.dsh-ui[data-theme][data-radius] .arco-switch { min-width: 40px; width: 40px; height: 20px; border: 0; padding: 0; background: var(--default); }
.dsh-ui[data-theme][data-radius] .arco-switch.arco-switch-checked { background: var(--accent); }
.dsh-ui[data-theme][data-radius] .arco-switch-dot { top: auto; left: auto; border: 0; width: 22px; height: 16px; transform: translateZ(0); box-shadow: var(--field-shadow); }
.dsh-ui[data-theme][data-radius] .arco-switch-checked .arco-switch-dot { inset-inline-start: var(--switch-thumb-offset); background: var(--accent-foreground); box-shadow: 0 0 5px 0 rgb(0 0 0 / 2%), 0 2px 10px 0 rgb(0 0 0 / 6%), 0 0 1px 0 rgb(0 0 0 / 30%); }
.dsh-ui[data-theme][data-radius] .arco-slider:not(.arco-slider-vertical) { height: 24px; padding: 4px 0 0; margin: 0; }
.dsh-ui[data-theme][data-radius] .arco-slider:not(.arco-slider-vertical) .arco-slider-wrapper { padding-inline: 12px; }
.dsh-ui[data-theme][data-radius] .arco-slider-road:not(.arco-slider-road-vertical) { height: 20px; border: 0; border-radius: var(--radius-xl); background: transparent; }
.dsh-ui[data-theme][data-radius] .arco-slider-road:not(.arco-slider-road-vertical)::before { display: block; inset: 0 -12px; width: auto; height: 20px; transform: none; border-inline: 12px solid transparent; border-radius: var(--radius-xl); background: var(--default); }
.dsh-ui[data-theme][data-radius] .arco-slider-road:not(.arco-slider-road-vertical):has(.arco-slider-bar[style*="left: 0%"])::before { border-left-color: var(--accent); }
.dsh-ui[data-theme][data-radius] .arco-slider-road:not(.arco-slider-road-vertical):has(.arco-slider-bar[style*="right: 0%"])::before { border-right-color: var(--accent); }
.dsh-ui[data-theme][data-radius] .arco-slider-bar { height: 20px; top: 0; transform: none; border-radius: 0; background: var(--accent); }
.dsh-ui[data-theme][data-radius] .arco-slider-button { width: 28px; height: 20px; border: 0; border-radius: var(--radius-xl); background: var(--accent); box-shadow: none; display: flex; align-items: center; justify-content: center; }
.dsh-ui[data-theme][data-radius] .arco-slider-button::after { content: ''; position: relative; inset: auto; border: 0; width: 24px; height: 16px; border-radius: var(--radius-lg); background: var(--accent-foreground); box-shadow: var(--field-shadow); }
.dsh-ui[data-theme][data-radius] .arco-slider-road-vertical { width: 20px; max-width: 20px; margin-block: 12px; background: transparent; }
.dsh-ui[data-theme][data-radius] .arco-slider-road-vertical::before { inset: -12px 0; width: 20px; height: auto; transform: none; border-block: 12px solid transparent; border-radius: var(--radius-xl); background: var(--default); }
.dsh-ui[data-theme][data-radius] .arco-slider-road-vertical:has(.arco-slider-bar[style*="bottom: 0%"])::before { border-bottom-color: var(--accent); }
.dsh-ui[data-theme][data-radius] .arco-slider-road-vertical:has(.arco-slider-bar[style*="top: 0%"])::before { border-top-color: var(--accent); }
.dsh-ui[data-theme][data-radius] .arco-slider-road-vertical .arco-slider-bar { width: 20px; height: auto; left: 0; transform: none; }
.dsh-ui[data-theme][data-radius] .arco-slider-road-vertical .arco-slider-button { width: 20px; height: 28px; top: auto; }
.dsh-ui[data-theme][data-radius] .arco-slider-road-vertical .arco-slider-button::after { width: 16px; height: 24px; }
.dsh-ui[data-theme][data-radius] .arco-select-view { border-width: var(--border-width-field); background: var(--field-background); box-shadow: var(--field-shadow); height: auto; line-height: 20px; }
.dsh-ui[data-theme][data-radius] .arco-select-view-input,
.dsh-ui[data-theme][data-radius] .arco-select-view-value { line-height: 20px; padding: 0; }
.dsh-ui[data-theme][data-radius] .arco-select-suffix { position: absolute; margin: 0; right: 8px; top: 50%; transform: translateY(-50%); }
.dsh-ui[data-theme][data-radius] .arco-select-arrow-icon { display: flex; align-items: center; }
.dsh-ui[data-theme][data-radius] .arco-select-suffix svg { width: 16px; height: 16px; color: var(--field-placeholder); }
.dsh-ui[data-theme][data-radius] .arco-card { border: 0; background: var(--surface); color: inherit; box-shadow: var(--surface-shadow); }
.dsh-ui[data-theme][data-radius] .arco-card-header { min-height: 0; height: auto; padding: 0; border: 0; flex-direction: row; align-items: center; }
.dsh-ui[data-theme][data-radius] .arco-card-header-title { flex: 1; padding: 0; margin: 0; }
.dsh-ui[data-theme][data-radius] .arco-card-body { padding: 0; font-size: 16px; line-height: 24px; color: inherit; }
.dsh-ui[data-theme][data-radius] .arco-card.dsh-card--flat { border: 1px solid var(--border); background: transparent; box-shadow: none; }
.dsh-ui[data-theme][data-radius] .arco-card.dsh-card--tight { padding: 12px 16px; gap: 8px; }
.dsh-ui[data-theme][data-radius] .dsh-card--tight .arco-card-body { padding: 0; }
.dsh-ui[data-theme][data-radius] .arco-tag { height: auto; border: 0; margin: 0; }
.dsh-ui[data-theme][data-radius] .arco-tag-size-small { padding: 0 4px; font-size: 12px; }
.dsh-ui[data-theme][data-radius] .arco-tag-size-large { padding: 4px 12px; font-size: 14px; }
.dsh-ui[data-theme][data-radius] .dsh-tag-label { padding-inline: 2px; }
.dsh-ui[data-theme][data-radius] .arco-avatar { color: var(--foreground); }
.dsh-ui[data-theme][data-radius] .arco-avatar-circle { border-radius: 50%; }
.dsh-ui[data-theme][data-radius] .arco-avatar-square { border-radius: min(var(--radius), 12.5%); }
.dsh-ui[data-theme][data-radius] .arco-avatar-with-trigger-icon { overflow: visible; }
.dsh-ui[data-theme][data-radius] .arco-avatar-with-trigger-icon::before { border-radius: inherit; }
.dsh-ui[data-theme][data-radius] .arco-avatar:has(.arco-avatar-text)::before { content: ''; display: flex; position: static; width: 100%; height: 100%; background: inherit; }
.dsh-ui[data-theme][data-radius] .arco-avatar-text { position: absolute; left: 50%; width: max-content; height: auto; background: transparent; transform: translateX(-50%); font-size: 14px; line-height: 20px; font-weight: 500; }
.dsh-ui[data-theme][data-radius] .arco-avatar-text[style*="scale("] { position: absolute; left: 50%; }
.dsh-ui[data-theme][data-radius] .arco-tabs { flex-direction: column; gap: 8px; overflow: visible; }
.dsh-ui[data-theme][data-radius] .arco-tabs-header-nav { border: 0; background: transparent; border-radius: 0; }
.dsh-ui[data-theme][data-radius] .arco-tabs-header-nav::before,
.dsh-ui[data-theme][data-radius] .arco-tabs-header-ink { display: none; }
.dsh-ui[data-theme][data-radius] .arco-tabs-header-scroll,
.dsh-ui[data-theme][data-radius] .arco-tabs-header-wrapper,
.dsh-ui[data-theme][data-radius] .arco-tabs-header { width: 100%; display: flex; padding: 0; }
.dsh-ui[data-theme][data-radius] .arco-tabs-header-wrapper { overflow: visible; }
.dsh-ui[data-theme][data-radius] .arco-tabs-header-scroll { overflow: visible; }
.dsh-ui[data-theme][data-radius] .arco-tabs-header { will-change: auto; width: max-content; min-width: 100%; }
.dsh-ui[data-theme][data-radius] :is(.arco-tabs-header-overflow-scroll, .arco-tabs-header-overflow-dropdown) .arco-tabs-header-wrapper { overflow: hidden; }
.dsh-ui[data-theme][data-radius] .arco-tabs-vertical { flex-direction: row; }
.dsh-ui[data-theme][data-radius] .arco-tabs-header-nav-vertical .arco-tabs-header { flex-direction: column; }
.dsh-ui[data-theme][data-radius] .arco-tabs-header-nav-line .arco-tabs-header-title { flex: 0 1 auto; width: 100%; margin: 0; padding-block: 0; border: 0; }
.dsh-ui[data-theme][data-radius] .arco-tabs-header-nav-line .arco-tabs-header-title:first-child { margin: 0; }
.dsh-ui[data-theme][data-radius] .arco-tabs-header-nav-line .arco-tabs-header-title-text { padding: 0; }
.dsh-ui[data-theme][data-radius] .arco-tabs-header-nav-line .arco-tabs-header-title-active,
.dsh-ui[data-theme][data-radius] .arco-tabs-header-nav-line .arco-tabs-header-title-active:hover { background: var(--segment); color: var(--segment-foreground); font-weight: 500; box-shadow: var(--surface-shadow); }
.dsh-ui[data-theme][data-radius] .arco-tabs-header-nav-card .arco-tabs-header-title:first-of-type { border-start-start-radius: min(2px, var(--radius)); }
.dsh-ui[data-theme][data-radius] .arco-tabs-header-nav-card .arco-tabs-header-title:last-of-type { border-start-end-radius: min(2px, var(--radius)); }
.dsh-ui[data-theme][data-radius] .arco-tabs-header-nav-card .arco-tabs-header-title-active:not(.arco-tabs-header-title-disabled) { color: var(--accent); }
.dsh-ui[data-theme][data-radius] .arco-tabs-card.arco-tabs-right { flex-direction: row-reverse; }
.dsh-ui[data-theme][data-radius] .arco-tabs-header-nav-card {
  --color-neutral-3: var(--border);
  --color-bg-2: var(--surface);
  --border-radius-small: min(2px, var(--radius));
}
.dsh-ui[data-theme][data-radius] .arco-tabs-card > .arco-tabs-content { border-color: var(--border); }
.dsh-ui[data-theme][data-radius] .arco-tabs-header-nav-card .arco-tabs-header-title:not(.arco-tabs-header-title-active, .arco-tabs-header-title-disabled, :hover) { color: var(--muted); }
.dsh-ui[data-theme][data-radius] .arco-tabs-content { padding: 0; }
.dsh-ui[data-theme][data-radius] .arco-tabs-content:has(.arco-tabs-pane:empty):not(:has(.arco-tabs-pane:not(:empty))) { display: none; }
.dsh-ui[data-theme][data-radius] .arco-progress-line { padding-top: 4px; }
.dsh-ui[data-theme][data-radius] .arco-progress-line-outer { position: relative; overflow: hidden; backface-visibility: hidden; border-radius: var(--radius-sm); background: var(--default); }
.dsh-ui[data-theme][data-radius] .arco-progress-line-inner { position: absolute; inset-inline-start: 0; top: 0; border-radius: var(--radius-sm); background: var(--accent); }
.dsh-ui[data-theme][data-radius] .arco-alert { border: 0; background: var(--surface); color: var(--foreground); box-shadow: var(--surface-shadow); }
.dsh-ui[data-theme][data-radius] .arco-alert-title { margin: 0; }
.dsh-ui[data-theme][data-radius] .arco-alert-content { font-size: 14px; line-height: 20px; }
.dsh-ui[data-theme][data-radius] .arco-alert-icon-wrapper { font-size: 16px; width: 24px; height: 24px; margin: 0; padding: 4px; display: flex; align-items: center; justify-content: center; flex: 0 0 24px; }
.dsh-ui[data-theme][data-radius] .arco-alert-icon-wrapper svg { width: 16px; height: 16px; }
.dsh-ui[data-theme][data-radius] .arco-alert-icon-wrapper .dsh-alert-status-icon { color: inherit; }
.dsh-ui[data-theme][data-radius] .arco-alert-info :is(.arco-alert-icon-wrapper,.arco-alert-title) { color: var(--accent-soft-foreground); }
.dsh-ui[data-theme][data-radius] .arco-alert-warning :is(.arco-alert-icon-wrapper,.arco-alert-title) { color: var(--warning-soft-foreground); }
.dsh-ui[data-theme][data-radius] .arco-alert-error :is(.arco-alert-icon-wrapper,.arco-alert-title) { color: var(--danger-soft-foreground); }
.dsh-ui[data-theme][data-radius] .arco-alert-success .arco-alert-icon-wrapper,
.dsh-ui[data-theme][data-radius] .arco-alert-success .arco-alert-icon-wrapper svg,
.dsh-ui[data-theme][data-radius] .arco-alert-success .arco-alert-title { color: var(--success-soft-foreground); }
.dsh-ui[data-theme][data-radius] .arco-collapse { border: 0; border-radius: 0; background: transparent; box-shadow: none; overflow: hidden; }
.dsh-ui[data-theme][data-radius] .arco-collapse-item { border: 0; }
.dsh-ui[data-theme][data-radius] .arco-collapse-item-header { border: 0; background: transparent; color: inherit; line-height: 20px; font-weight: 500; }
.dsh-ui[data-theme][data-radius] .arco-collapse-item-header-title { flex: 1; }
.dsh-ui[data-theme][data-radius] .arco-collapse-item-header .arco-collapse-item-icon-hover { order: 2; margin: 0 0 0 auto; width: 16px; height: 16px; right: 16px; color: var(--muted); }
.dsh-ui[data-theme][data-radius] .arco-collapse-item-header-icon svg { color: var(--muted); }
.dsh-ui[data-theme][data-radius] .arco-collapse-item-content { border: 0; background: transparent; }
.dsh-ui[data-theme][data-radius] .arco-collapse-item-content-box { padding: 0 16px 16px; }
.dsh-ui[data-theme][data-radius] .arco-table { border: 0; padding: 0 4px 4px; border-radius: min(32px, calc(var(--radius) * 2.5)); background: var(--surface-secondary); box-shadow: none; overflow: hidden; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-table-container { border: 0; overflow: clip; border-radius: calc(var(--radius) * 2); }
.dsh-ui[data-theme][data-radius] .arco-table-container::before { display: none; }
.dsh-ui[data-theme][data-radius] .arco-table th,
.dsh-ui[data-theme][data-radius] .arco-table td { border-left: 0; border-right: 0; }
.dsh-ui[data-theme][data-radius] .arco-table th.arco-table-th { border-bottom: 0; background: transparent; border-radius: 0; }
.dsh-ui[data-theme][data-radius] .arco-table th:not(:last-child)::after { content: ''; position: absolute; right: 0; top: 50%; transform: translateY(-50%); width: 1px; height: 16px; border-radius: var(--radius-sm); background: var(--separator); }
.dsh-ui[data-theme][data-radius] .arco-table th .arco-table-th-item { padding: 0; line-height: 16px; }
.dsh-ui[data-theme][data-radius] .arco-table td.arco-table-td { line-height: 20px; border-bottom: 1px solid color-mix(in oklab, var(--separator-tertiary) 50%, transparent); }
.dsh-ui[data-theme][data-radius] .arco-table tr:last-child td { border-bottom: 1px solid color-mix(in oklab, var(--separator-tertiary) 50%, transparent); }
.dsh-ui[data-theme][data-radius] .arco-table tbody tr:first-child td:first-child { border-top-left-radius: var(--radius-2xl); }
.dsh-ui[data-theme][data-radius] .arco-table tbody tr:first-child td:last-child { border-top-right-radius: var(--radius-2xl); }
.dsh-ui[data-theme][data-radius] .arco-table tbody tr:last-child td:first-child { border-bottom-left-radius: var(--radius-2xl); }
.dsh-ui[data-theme][data-radius] .arco-table tbody tr:last-child td:last-child { border-bottom-right-radius: var(--radius-2xl); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-table .arco-table-tr { --dsh-table-row-background: var(--surface); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-table-stripe .arco-table-tr:nth-child(even) { --dsh-table-row-background: var(--surface-secondary); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-table-hover .arco-table-tr:is(:hover,.arco-table-tr-hover) { --dsh-table-row-background: var(--surface-hover); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-table .arco-table-tr.arco-table-row-checked { --dsh-table-row-background: color-mix(in srgb, var(--accent) 14%, var(--surface)); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-table-hover .arco-table-tr.arco-table-row-checked:is(:hover,.arco-table-tr-hover) { --dsh-table-row-background: color-mix(in srgb, var(--accent) 20%, var(--surface)); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-table .arco-table-tr:not(.arco-table-empty-row,.arco-table-expand-content) > .arco-table-td { background: var(--dsh-table-row-background); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-table .arco-table-tr:not(.arco-table-empty-row,.arco-table-expand-content) > .arco-table-td::before { background: var(--dsh-table-row-background); border-radius: inherit; }
/* 固定列圆角下方使用表格外框底色，避免露出横向滚过的单元格。 */
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-table tbody > .arco-table-tr:where(:not(.arco-table-empty-row,.arco-table-expand-content)):is(:first-child,:last-child) > :is(.arco-table-col-fixed-left:first-child,.arco-table-col-fixed-right:last-child) { border-radius: 0; background: var(--surface-secondary); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-table tbody > .arco-table-tr:where(:not(.arco-table-empty-row,.arco-table-expand-content)):is(:first-child,:last-child) > :is(.arco-table-col-fixed-left:first-child,.arco-table-col-fixed-right:last-child)::before {
  content: ''; position: absolute; z-index: -1; inset: 0; border-radius: 0;
  background: var(--dsh-table-row-background); pointer-events: none;
}
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-table tbody > .arco-table-tr:where(:not(.arco-table-empty-row,.arco-table-expand-content)):first-child > .arco-table-col-fixed-left:first-child::before { border-top-left-radius: calc(var(--radius) * 2); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-table tbody > .arco-table-tr:where(:not(.arco-table-empty-row,.arco-table-expand-content)):first-child > .arco-table-col-fixed-right:last-child::before { border-top-right-radius: calc(var(--radius) * 2); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-table tbody > .arco-table-tr:where(:not(.arco-table-empty-row,.arco-table-expand-content)):last-child > .arco-table-col-fixed-left:first-child::before { border-bottom-left-radius: calc(var(--radius) * 2); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-table tbody > .arco-table-tr:where(:not(.arco-table-empty-row,.arco-table-expand-content)):last-child > .arco-table-col-fixed-right:last-child::before { border-bottom-right-radius: calc(var(--radius) * 2); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-table .arco-checkbox:not(.arco-checkbox-checked,.arco-checkbox-indeterminate) .arco-checkbox-icon { border: 1px solid var(--muted); background: var(--surface-secondary); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-table :is(.arco-table-content-scroll,.arco-table-body) { scrollbar-width: thin; scrollbar-color: transparent transparent; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-table:is(:hover,:focus-within) :is(.arco-table-content-scroll,.arco-table-body) { scrollbar-color: var(--muted) transparent; }
.dsh-ui[data-theme][data-radius] .arco-skeleton-header .arco-skeleton-image { margin: 0; background: color-mix(in oklab, var(--surface-tertiary) 70%, transparent); border-radius: var(--radius-sm); }
.dsh-ui[data-theme][data-radius] .arco-breadcrumb { gap: 6px; }
.dsh-ui[data-theme][data-radius] .arco-breadcrumb-item { padding: 0; font-size: 14px; line-height: 20px; font-weight: 500; color: var(--muted); }
.dsh-ui[data-theme][data-radius] .arco-breadcrumb-item:last-child { color: var(--link); }
.dsh-ui[data-theme][data-radius] .arco-breadcrumb-item-separator { width: 12px; height: 12px; margin: 0 0 0 -2px; display: flex; align-items: center; color: var(--muted); }

`

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
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-card { border-radius: min(32px, calc(var(--radius) * 2.5)); }
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
.dsh-ui[data-theme][data-radius] .arco-drawer-content { flex: 1; display: flex; flex-direction: column; min-height: 0; overflow: hidden; }
.dsh-ui[data-theme][data-radius] :is(.arco-drawer-header, .arco-drawer-footer) { flex-shrink: 0; }
.dsh-ui[data-theme][data-radius] :is(.arco-modal-content, .arco-drawer-content) > .dshl-scrollbar { flex: 1; min-height: 0; }
.dsh-ui[data-theme][data-radius][data-motion="reduced"] *,
.dsh-ui[data-theme][data-radius][data-motion="reduced"] *::before,
.dsh-ui[data-theme][data-radius][data-motion="reduced"] *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
` + HERO_REFERENCE_CSS

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
body[data-ds-dark-theme]:not([data-ds-dark-theme="false"], [data-ds-dark-theme="0"]) .dsh-ui[data-theme="host"][data-radius] {
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
body[data-ds-dark-theme]:not([data-ds-dark-theme="false"], [data-ds-dark-theme="0"]) .dsh-ui[data-theme="host"][data-radius] {
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
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-input:not(.arco-input-inner-wrapper > input, .arco-input-wrapper .arco-input, .arco-input-error):not(:focus),
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-input-inner-wrapper:not(.arco-input-inner-wrapper-error):not(:focus-within) { border-color: var(--border); background: var(--dsh-field-fill, var(--surface-secondary)); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-textarea:focus { border-color: var(--focus); box-shadow: inset 0 0 0 1px var(--focus); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-btn-icon-only.arco-btn-loading { color: var(--button-fg); background: var(--button-bg); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-btn-icon-only.arco-btn-loading::before { display: none; }
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


/* HeroUI 组件组与轻量反馈的默认布局。 */
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-btn-group > .arco-btn-primary { border-inline-width: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.dsh-link,.arco-link) { position: relative; display: inline-flex; align-items: center; width: fit-content; height: fit-content; padding: 0; margin: 0; border-radius: 12px; color: var(--link); background: transparent; font-size: 16px; line-height: 24px; font-weight: 500; text-decoration: none; text-decoration-thickness: 1.5px; text-underline-offset: 4px; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.dsh-link,.arco-link):hover { text-decoration: underline; text-decoration-color: color-mix(in oklab,var(--muted) 50%,transparent); }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.dsh-link,.arco-link):focus-visible { outline: none; box-shadow: 0 0 0 2px var(--background),0 0 0 4px var(--focus); }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.dsh-link,.arco-link)[aria-disabled=true] { opacity: var(--disabled-opacity); cursor: var(--cursor-disabled); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-divider-horizontal:not(.arco-divider-with-text) { box-sizing: border-box; flex-shrink: 0; width: 100%; min-width: 0; height: 1px; margin: 0; border: 0; border-radius: 2px; background: var(--separator); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-badge { display: inline-flex; flex-shrink: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-badge-number { box-sizing: border-box; display: inline-flex; align-items: center; justify-content: center; min-width: 28px; height: 28px; padding: 0 2px; right: 0; top: 0; border: 1px solid var(--background); border-radius: 24px; background: var(--danger); background-clip: padding-box; color: var(--danger-foreground); font-size: 12px; line-height: 1.34; font-weight: 500; box-shadow: none; transform: translate(25%,-25%); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-checkbox-group-direction-vertical { display: flex; flex-direction: column; width: 100%; gap: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-checkbox-group-direction-vertical > .arco-checkbox { margin: 16px 0 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-spinner-icon { display: inline-flex; width: 24px; height: 24px; flex-shrink: 0; color: var(--accent); animation: dsh-spinner-rotate .5s linear infinite; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-spin-icon:has(.dsh-spinner-icon) { display: inline-flex; line-height: 0; }
@keyframes dsh-spinner-rotate { to { transform: rotate(360deg); } }

.dsh-ui.dsh-ui[data-theme][data-radius] .arco-checkbox-checked:not(.arco-checkbox-indeterminate) .arco-checkbox-mask > svg.arco-checkbox-mask-icon { visibility: hidden; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-checkbox-checked:not(.arco-checkbox-indeterminate) .arco-checkbox-mask:has(> svg.arco-checkbox-mask-icon)::after { content: ''; position: absolute; width: 10px; height: 10px; left: 3px; top: 3px; transform: none; border-radius: 0; background: var(--accent-foreground); mask: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2210%22%20height%3D%2210%22%20viewBox%3D%220%200%2017%2018%22%3E%3Cpolyline%20points%3D%221%209%207%2014%2015%204%22%20fill%3D%22none%22%20stroke%3D%22black%22%20stroke-dasharray%3D%2222%22%20stroke-dashoffset%3D%2244%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E") center / contain no-repeat; }

.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-link-status-success,.arco-link-is-success) { color: var(--success); }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-link-status-danger,.arco-link-is-error) { color: var(--danger); }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-link-status-warning,.arco-link-is-warning) { color: var(--warning); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-link-disabled { opacity: var(--disabled-opacity); cursor: var(--cursor-disabled); text-decoration: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-link-loading { opacity: var(--disabled-opacity); cursor: default; text-decoration: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-badge-no-children .arco-badge-number { top: auto; right: auto; transform: none; }

.dsh-ui.dsh-ui[data-theme][data-radius] :is(h1,h2,h3,h4,h5,h6).arco-typography { color:var(--foreground); margin: 0; font-weight: 600; letter-spacing: -.025em; }
.dsh-ui.dsh-ui[data-theme][data-radius] h1.arco-typography { font-size:36px; line-height:40px; }
.dsh-ui.dsh-ui[data-theme][data-radius] h2.arco-typography { font-size:30px; line-height:36px; }
.dsh-ui.dsh-ui[data-theme][data-radius] h3.arco-typography { font-size:24px; line-height:32px; }
.dsh-ui.dsh-ui[data-theme][data-radius] h4.arco-typography { font-size:20px; line-height:28px; }
.dsh-ui.dsh-ui[data-theme][data-radius] h5.arco-typography { font-size:18px; line-height:28px; }
.dsh-ui.dsh-ui[data-theme][data-radius] h6.arco-typography { font-size:16px; line-height:24px; }
.dsh-ui.dsh-ui[data-theme][data-radius] div.arco-typography { color:var(--foreground); margin:0; font-size:16px; line-height:28px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-empty { padding:8px; font-size:14px; line-height:20px; text-align:start; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-empty-image:has(> .arco-icon-empty) { display:none; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-empty-description { margin:0; color:var(--muted); font-size:14px; line-height:20px; text-align:start; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-verification-code input:disabled { color: var(--muted); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-verification-code { justify-content:flex-start; gap:8px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-verification-code:not(:has(input:is(.arco-input-size-mini,.arco-input-size-small,.arco-input-size-large))) > :is(.arco-input-wrapper,input) { flex:0 0 38px; width:38px; min-width:38px; height:40px; padding:0; font-size:18px; line-height:24px; font-weight:600; letter-spacing:-.27px; text-align:center; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-verification-code:not(:has(input:is(.arco-input-size-mini,.arco-input-size-small,.arco-input-size-large))) .arco-input-wrapper > input { width:100%; height:24px; font-size:18px; line-height:24px; font-weight:600; letter-spacing:-.27px; text-align:center; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-pagination-list { display:flex; align-items:center; gap:4px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-pagination-item:has(.arco-icon-left,.arco-icon-right) { position:relative; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-pagination-item:has(.arco-icon-left,.arco-icon-right)::after { inset:0; margin:auto; pointer-events:none; }
.dsh-ui.dsh-ui[data-theme][data-radius] :where(.arco-pagination:not(.arco-pagination-size-mini,.arco-pagination-size-small,.arco-pagination-size-large)) .arco-pagination-item { position:relative; display:flex; align-items:center; justify-content:center; box-sizing:border-box; width:32px; min-width:32px; height:32px; margin:0; padding:0; border:0; border-radius:24px; font-size:14px; line-height:20px; font-weight:500; color:var(--foreground); background:transparent; transform:translateZ(0); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-pagination-item-active { color:var(--foreground); background:var(--default); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-pagination-item-disabled { color:var(--foreground); opacity:var(--disabled-opacity); }
.dsh-ui.dsh-ui[data-theme][data-radius] :where(.arco-pagination:not(.arco-pagination-size-mini,.arco-pagination-size-small,.arco-pagination-size-large)) :is(.arco-pagination-item-prev,.arco-pagination-item-previous,.arco-pagination-item-next) { width:36px; min-width:36px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-input-number-mode-button:not(.arco-input-number-size-mini,.arco-input-number-size-small,.arco-input-number-size-large) { box-sizing:border-box; height:36px; padding:0; overflow:hidden; border:var(--border-width-field) solid var(--field-border); border-radius:var(--field-radius); background:var(--field-background); box-shadow:var(--field-shadow); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-input-number-mode-button:not(.arco-input-number-size-mini,.arco-input-number-size-small,.arco-input-number-size-large) :is(.arco-input-wrapper,.arco-input-inner-wrapper) { display:flex; align-items:center; height:36px; padding:0; border:0; border-radius:0; background:transparent; box-shadow:none; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-input-number-mode-button:not(.arco-input-number-size-mini,.arco-input-number-size-small,.arco-input-number-size-large) .arco-input-group { display:flex; width:100%; height:36px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-input-number-mode-button:not(.arco-input-number-size-mini,.arco-input-number-size-small,.arco-input-number-size-large) :is(.arco-input-prepend,.arco-input-append,.arco-input-group-addbefore,.arco-input-group-addafter) { display:flex; flex:0 0 40px; width:40px; padding:0; border:0; border-radius:0; background:transparent; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-input-number-mode-button:not(.arco-input-number-size-mini,.arco-input-number-size-small,.arco-input-number-size-large) :is(.arco-input-wrapper,.arco-input-inner-wrapper) { flex:1; min-width:0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-input-number-mode-button:not(.arco-input-number-size-mini,.arco-input-number-size-small,.arco-input-number-size-large) input.arco-input { box-sizing:border-box; width:100%; height:36px; padding:8px 12px; border:0; border-radius:0; background:transparent; box-shadow:none; text-align:start; font-size:14px; line-height:20px; font-variant-numeric:tabular-nums; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-input-number-mode-button:not(.arco-input-number-size-mini,.arco-input-number-size-small,.arco-input-number-size-large) .arco-input-number-step-button { box-sizing:border-box; position:relative; display:flex; flex:0 0 40px; align-items:center; justify-content:center; width:40px; min-width:40px; height:36px; padding:0; border:0; border-radius:0; color:var(--field-foreground); background:transparent; box-shadow:none; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-input-number-mode-button:not(.arco-input-number-size-mini,.arco-input-number-size-small,.arco-input-number-size-large) :is(.arco-input-prepend,.arco-input-group-addbefore) .arco-input-number-step-button { border-inline-end:1px solid color-mix(in oklab,var(--field-placeholder) 15%,transparent); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-input-number-mode-button:not(.arco-input-number-size-mini,.arco-input-number-size-small,.arco-input-number-size-large) :is(.arco-input-append,.arco-input-group-addafter) .arco-input-number-step-button { border-inline-start:1px solid color-mix(in oklab,var(--field-placeholder) 15%,transparent); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-pagination-item:has(.arco-icon-left) .arco-icon-left { visibility:hidden; width:16px; height:16px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-pagination-item:has(.arco-icon-left)::after { content:""; display:block; position:absolute; width:16px; height:16px; background:currentColor; mask:url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22M10.53%202.97a.75.75%200%200%201%200%201.06L6.56%208l3.97%203.97a.75.75%200%201%201-1.06%201.06l-4.5-4.5a.75.75%200%200%201%200-1.06l4.5-4.5a.75.75%200%200%201%201.06%200%22%2F%3E%3C%2Fsvg%3E") center / contain no-repeat; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-pagination-item:has(.arco-icon-right) .arco-icon-right { visibility:hidden; width:16px; height:16px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-pagination-item:has(.arco-icon-right)::after { content:""; display:block; position:absolute; width:16px; height:16px; background:currentColor; mask:url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22M5.47%202.97a.75.75%200%200%201%201.06%200l4.5%204.5a.75.75%200%200%201%200%201.06l-4.5%204.5a.75.75%200%201%201-1.06-1.06L9.44%208%205.47%204.03a.75.75%200%200%201%200-1.06Z%22%2F%3E%3C%2Fsvg%3E") center / contain no-repeat; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-input-number-mode-button .arco-input-number-step-button:is(.arco-input-number-step-button-disabled,:disabled), .dsh-ui.dsh-ui[data-theme][data-radius] .arco-input-number-readonly .arco-input-number-step-button { opacity:var(--disabled-opacity); cursor:var(--cursor-disabled); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-autocomplete-popup .arco-select-popup { isolation:isolate; }


/* 默认垂直字段采用 TextField 排版，直属选择器保留嵌套表单和复合控件的布局。 */
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-form:is(.arco-form-layout-vertical,.arco-form-vertical):not(.arco-form-size-mini,.arco-form-size-small,.arco-form-size-large) { display:flex; flex-direction:column; gap:16px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-form:is(.arco-form-layout-vertical,.arco-form-vertical):not(.arco-form-size-mini,.arco-form-size-small,.arco-form-size-large) > .arco-form-item:not(.arco-form-item-layout-horizontal,.arco-form-layout-horizontal) { display:flex; flex-direction:column; align-items:stretch; gap:8px; margin:0; padding:0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-form:is(.arco-form-layout-vertical,.arco-form-vertical):not(.arco-form-size-mini,.arco-form-size-small,.arco-form-size-large) > .arco-form-item:not(.arco-form-item-layout-horizontal,.arco-form-layout-horizontal) > :is(.arco-form-item-label-col,.arco-form-label-item) { width:100%; min-height:0; margin:0; padding:0; line-height:20px; text-align:start; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-form:is(.arco-form-layout-vertical,.arco-form-vertical):not(.arco-form-size-mini,.arco-form-size-small,.arco-form-size-large) > .arco-form-item:not(.arco-form-item-layout-horizontal,.arco-form-layout-horizontal) > :is(.arco-form-item-label-col,.arco-form-label-item) > label { padding:0; margin:0; color:var(--foreground); font-size:14px; line-height:20px; font-weight:500; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-form:is(.arco-form-layout-vertical,.arco-form-vertical):not(.arco-form-size-mini,.arco-form-size-small,.arco-form-size-large) > .arco-form-item:not(.arco-form-item-layout-horizontal,.arco-form-layout-horizontal) > :is(.arco-form-item-wrapper-col,.arco-form-item-wrapper) { width:100%; display:flex; flex-direction:column; gap:4px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-form:is(.arco-form-layout-vertical,.arco-form-vertical):not(.arco-form-size-mini,.arco-form-size-small,.arco-form-size-large) > .arco-form-item:not(.arco-form-item-layout-horizontal,.arco-form-layout-horizontal) > :is(.arco-form-item-wrapper-col,.arco-form-item-wrapper) > :is(.arco-form-item-content-wrapper,.arco-form-item-control-wrapper) > :is(.arco-form-item-content,.arco-form-item-control) { min-height:0; line-height:20px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-form:is(.arco-form-layout-vertical,.arco-form-vertical):not(.arco-form-size-mini,.arco-form-size-small,.arco-form-size-large) > .arco-form-item:not(.arco-form-item-layout-horizontal,.arco-form-layout-horizontal) > .arco-form-item-wrapper > .arco-form-item-control-wrapper > .arco-form-item-control > .arco-form-item-control-children { min-height:0; line-height:20px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-form:is(.arco-form-layout-vertical,.arco-form-vertical):not(.arco-form-size-mini,.arco-form-size-small,.arco-form-size-large) > .arco-form-item:not(.arco-form-item-layout-horizontal,.arco-form-layout-horizontal) > :is(.arco-form-item-wrapper-col,.arco-form-item-wrapper) > :is(.arco-form-item-extra,.arco-form-extra) { margin:0; padding:0; color:var(--muted); font-size:12px; line-height:16px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-form:is(.arco-form-layout-vertical,.arco-form-vertical):not(.arco-form-size-mini,.arco-form-size-small,.arco-form-size-large) > .arco-form-item:not(.arco-form-item-layout-horizontal,.arco-form-layout-horizontal) > :is(.arco-form-item-wrapper-col,.arco-form-item-wrapper) > :is(.arco-form-item-message,.arco-form-message) { margin:0; padding:0 4px; color:var(--danger); font-size:12px; line-height:16px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-form:is(.arco-form-layout-vertical,.arco-form-vertical):not(.arco-form-size-mini,.arco-form-size-small,.arco-form-size-large) > .arco-form-item:not(.arco-form-item-layout-horizontal,.arco-form-layout-horizontal).arco-form-item-status-error > :is(.arco-form-item-label-col,.arco-form-label-item) > label { color:var(--danger); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-form:is(.arco-form-layout-vertical,.arco-form-vertical):not(.arco-form-size-mini,.arco-form-size-small,.arco-form-size-large) > .arco-form-item:not(.arco-form-item-layout-horizontal,.arco-form-layout-horizontal).arco-form-item-status-error > .arco-form-item-wrapper > .arco-form-item-control-wrapper > .arco-form-item-control > .arco-form-item-control-children > input.arco-input-size-default { height:36px; padding:7px 12px 9px; background:var(--field-background); border:0 solid transparent; outline:1px solid var(--danger); outline-offset:0; box-shadow:var(--field-shadow); }

/* 可删除标签对应 HeroUI Tag；普通标签仍对应 Chip。 */
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-tag:has(> .arco-tag-close-btn) { display: inline-flex; align-items: center; gap: 4px; height: auto; padding: 4px 8px; border-radius: calc(var(--radius) * 1.5); line-height: 16px; font-size: 12px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-tag:has(> .arco-tag-close-btn).arco-tag-size-small { padding: 2px 8px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-tag:has(> .arco-tag-close-btn).arco-tag-size-large { padding: 6px 10px; border-radius: calc(var(--radius) * 2); font-size: 14px; line-height: 20px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-tag-close-btn { display: inline-flex; align-items: center; justify-content: center; position: relative; isolation: isolate; flex-shrink: 0; width: 12px; height: 12px; padding: 0; margin: 0; border-radius: 12px; color: inherit; line-height: 16px; background: var(--default); cursor: var(--cursor-interactive); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-tag-close-btn::before { content: ''; position: absolute; inset: -6px; border-radius: inherit; background: transparent; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-tag-close-btn .dsh-tag-close-icon { display: block; width: 12px; height: 12px; flex-shrink: 0; stroke: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-tag:has(> .arco-tag-close-btn):hover { background: var(--default-hover); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-tag.arco-tag-hide { display: none; }

/* 操作确认使用 HeroUI Popover、Heading 与按钮组合。 */
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-popconfirm-body,.arco-popconfirm-title) { display: flex; align-items: center; gap: 8px; margin: 0; padding: 0; font-size: 14px; line-height: 20px; font-weight: 500; color: var(--foreground); }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-popconfirm-icon,.arco-popconfirm-title-icon) { flex: 0 0 16px; width: 16px; height: 16px; margin: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-popconfirm-footer,.arco-popconfirm-btn) { display: flex; justify-content: flex-end; gap: 8px; margin: 12px 0 0; padding: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-popconfirm-footer,.arco-popconfirm-btn) > .arco-btn { margin: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-btn.arco-popconfirm-open) { transform: translateZ(0) scale(.97); will-change: transform; background: var(--accent-hover); }

.dsh-ui.dsh-ui[data-theme][data-radius] .arco-popconfirm-content { padding: 16px; border: 0; border-radius: min(32px, calc(var(--radius) * 3)); background: var(--overlay); color: var(--foreground); box-shadow: var(--overlay-shadow); font-size: 14px; line-height: 20px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-popconfirm-wrapper { min-width: 0; }

/* 36 单位 SVG 在默认 28px 画布绘制，保持官方圆环描边比例。 */
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-hero-progress-circle { display: inline-flex; align-items: center; justify-content: center; width: 28px !important; height: 28px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-hero-progress-circle .arco-progress-circle-wrapper { width: 28px !important; height: 28px !important; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-hero-progress-circle .arco-progress-circle-svg { display: block; width: 28px; height: 28px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-hero-progress-circle :is(.arco-progress-circle-bg,.arco-progress-circle-mask) { stroke: var(--default); }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-hero-progress-circle-default-stroke :is(.arco-progress-circle-bg,.arco-progress-circle-mask) { stroke-width: 4; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-hero-progress-circle :is(.arco-progress-circle-bar,.arco-progress-circle-path) { stroke: var(--accent); stroke-linecap: round; }

/* 信息展示沿用 HeroUI Heading、Label、Description 与 Paragraph 的默认文字层级。 */
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-statistic { vertical-align: top; line-height: 24px; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-statistic-title,.arco-statistic-extra) { color: var(--muted); font-size: 12px; line-height: 16px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-statistic-title { margin-bottom: 8px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-statistic-extra { margin-top: 8px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-statistic-content { line-height: 32px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-statistic-content .arco-statistic-value { color: var(--foreground); font-size: 24px; line-height: 32px; font-weight: 600; letter-spacing: -.6px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-statistic-content .arco-statistic-value-decimal { font-size: inherit; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-descriptions-title { margin: 0 0 16px; color: var(--foreground); font-size: 16px; line-height: 24px; font-weight: 600; letter-spacing: -.4px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-descriptions.arco-descriptions-layout-horizontal.arco-descriptions-size-default:not(.arco-descriptions-border) > .arco-descriptions-body > table > tbody > .arco-descriptions-row > :is(.arco-descriptions-item-label,.arco-descriptions-item-value) { padding: 0 16px 12px 0; vertical-align: top; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-descriptions.arco-descriptions-layout-horizontal.arco-descriptions-size-default:not(.arco-descriptions-border) > .arco-descriptions-body > table > tbody > .arco-descriptions-row:last-child > :is(.arco-descriptions-item-label,.arco-descriptions-item-value) { padding-bottom: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-descriptions-item-label { background: transparent; color: var(--foreground); font-size: 14px; line-height: 20px; font-weight: 500; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-descriptions-item-value { color: var(--muted); font-size: 12px; line-height: 16px; font-weight: 400; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-comment-inner { background: transparent; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-comment-title-align-left { display: flex; align-items: center; gap: 8px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-comment-author { margin: 0; color: var(--foreground); font-size: 14px; line-height: 20px; font-weight: 500; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-comment-datetime { color: var(--muted); font-size: 12px; line-height: 16px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-comment-content { color: var(--foreground); font-size: 16px; line-height: 28px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-comment-avatar > img:not([width]):not([height]) { width: 40px; height: 40px; border-radius: calc(var(--radius) * 3); }

.dsh-ui.dsh-ui[data-theme][data-radius] .arco-result { padding: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-result-icon { margin: 0 0 16px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-result-icon-tip:has(> .dsh-result-icon) { display: flex; align-items: center; justify-content: center; width: 48px; height: 48px; margin: 0 auto; background: transparent; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-result-icon { display: block; width: 48px; height: 48px; stroke: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-result-icon-info .arco-result-icon-tip,.arco-result-icon-tip.arco-result-icon-info) { color: var(--accent); }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-result-icon-success .arco-result-icon-tip,.arco-result-icon-tip.arco-result-icon-success) { color: var(--success); }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-result-icon-warning .arco-result-icon-tip,.arco-result-icon-tip.arco-result-icon-warning) { color: var(--warning); }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-result-icon-error .arco-result-icon-tip,.arco-result-icon-tip.arco-result-icon-error) { color: var(--danger); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-result-title { color: var(--foreground); font-size: 24px; line-height: 32px; font-weight: 600; letter-spacing: -.6px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-result-subtitle { margin-top: 8px; color: var(--muted); font-size: 12px; line-height: 16px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-result-extra { margin-top: 16px; }

.dsh-ui.dsh-ui[data-theme][data-radius] .arco-page-header { padding: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-page-header-wrapper,.arco-page-header-head-wrapper) { padding: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-page-header-header,.arco-page-header-head) { gap: 16px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-page-header-title { color: var(--foreground); font-size: 20px; line-height: 28px; font-weight: 600; letter-spacing: -.5px; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-page-header-subtitle,.arco-page-header-sub-title) { overflow: visible; white-space: normal; color: var(--muted); font-size: 12px; line-height: 16px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-page-header-divider { width: 1px; height: 16px; margin: 0 12px; background: var(--separator); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-page-header-head-extra { margin-top: 0; }

/* 标签输入采用官方 InputGroup、TagGroup 与 Tag 的组合布局。 */
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.dsh-hero-input-tag.arco-input-tag,.dsh-hero-input-tag > .arco-input-tag) .arco-input-tag-tag { transform: translateZ(0); }

.dsh-ui.dsh-ui[data-theme][data-radius] :is(.dsh-hero-input-tag.arco-input-tag,.dsh-hero-input-tag > .arco-input-tag) { color: var(--field-foreground); background: var(--field-background); border: var(--border-width-field) solid var(--field-border); border-radius: var(--field-radius); box-shadow: var(--field-shadow); }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.dsh-hero-input-tag.arco-input-tag,.dsh-hero-input-tag > .arco-input-tag):is(.arco-input-tag-size-medium,.arco-input-tag-size-default) { padding: 6px 8px; min-height: 36px; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.dsh-hero-input-tag.arco-input-tag,.dsh-hero-input-tag > .arco-input-tag):is(.arco-input-tag-size-medium,.arco-input-tag-size-default) > .arco-input-tag-view { display: flex; align-items: center; flex-wrap: nowrap; padding: 0; margin: 0; width: 100%; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.dsh-hero-input-tag.arco-input-tag,.dsh-hero-input-tag > .arco-input-tag):is(.arco-input-tag-size-medium,.arco-input-tag-size-default) :is(.arco-input-tag-tag,.arco-input-tag-input) { margin: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.dsh-hero-input-tag.arco-input-tag,.dsh-hero-input-tag > .arco-input-tag):is(.arco-input-tag-size-medium,.arco-input-tag-size-default) .arco-input-tag-input { padding: 0; border-radius: var(--field-radius); min-height: 24px; height: 24px; color: inherit; font-size: 14px; line-height: 20px; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.dsh-hero-input-tag.arco-input-tag,.dsh-hero-input-tag > .arco-input-tag):not(.arco-input-tag-disabled):hover { background: var(--field-hover); border-color: var(--field-border-hover); }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.dsh-hero-input-tag.arco-input-tag,.dsh-hero-input-tag > .arco-input-tag):not(.arco-input-tag-disabled):focus-within { background: var(--field-focus); border-color: var(--field-border-focus); outline: 2px solid var(--focus); outline-offset: 2px; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.dsh-hero-input-tag.arco-input-tag,.dsh-hero-input-tag > .arco-input-tag).arco-input-tag-disabled { opacity: var(--disabled-opacity); cursor: not-allowed; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.dsh-hero-input-tag.arco-input-tag,.dsh-hero-input-tag > .arco-input-tag):is(.arco-input-tag-size-medium,.arco-input-tag-size-default) > .arco-input-tag-view > .arco-input-tag-inner { display: flex; align-items: center; flex-wrap: wrap; flex: 1; min-width: 0; gap: 6px; margin: 0; padding: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.dsh-hero-input-tag.arco-input-tag,.dsh-hero-input-tag > .arco-input-tag):is(.arco-input-tag-size-medium,.arco-input-tag-size-default) > .arco-input-tag-view { min-height: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.dsh-hero-input-tag.arco-input-tag,.dsh-hero-input-tag > .arco-input-tag).arco-input-tag-error { outline: 1px solid var(--danger); outline-offset: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.dsh-hero-input-tag.arco-input-tag,.dsh-hero-input-tag > .arco-input-tag).arco-input-tag-error:not(.arco-input-tag-disabled):focus-within { outline: 2px solid var(--focus); outline-offset: 2px; box-shadow: var(--field-shadow), inset 0 0 0 1px var(--danger); }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.dsh-hero-input-tag.arco-input-tag,.dsh-hero-input-tag > .arco-input-tag).arco-input-tag-warning { outline: 1px solid var(--warning); outline-offset: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.dsh-hero-input-tag.arco-input-tag,.dsh-hero-input-tag > .arco-input-tag).arco-input-tag-warning:not(.arco-input-tag-disabled):focus-within { outline: 2px solid var(--focus); outline-offset: 2px; box-shadow: var(--field-shadow), inset 0 0 0 1px var(--warning); }

/* 布局与展示列表继承官方 Surface 的默认文字与表面。 */
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-layout,.arco-space,.arco-row,.arco-list) { color: var(--foreground); font-size: 16px; line-height: 24px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-layout { background: var(--background); }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-layout-header,.arco-layout-footer,.arco-layout-sider) { color: var(--surface-foreground); background: var(--surface); box-shadow: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-list { border-color: var(--separator); border-radius: var(--radius); color: var(--surface-foreground); background: var(--surface); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-list-header { color: var(--foreground); background: transparent; font-size: 14px; line-height: 20px; font-weight: 500; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-list-split :is(.arco-list-header,.arco-list-item,.arco-list-footer) { border-color: var(--separator); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-list.arco-list-default > :is(.arco-list-header,.arco-list-footer),
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-list.arco-list-default > .arco-list-content > .arco-list-item { padding: 12px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-list > .arco-list-content > .arco-list-item { color: inherit; font-size: inherit; line-height: inherit; border-color: var(--separator); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-list > :is(.arco-list-header,.arco-list-footer) { border-color: var(--separator); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-list > .arco-list-content > .arco-list-item:last-child { border-bottom: 0; }

.dsh-ui.dsh-ui[data-theme][data-radius] .arco-layout-sider-dark { color: var(--snow); background: var(--eclipse); }

.dsh-ui.dsh-ui[data-theme][data-radius] :is(.dsh-hero-input-tag.arco-input-tag,.dsh-hero-input-tag > .arco-input-tag) > .arco-input-tag-view > .arco-input-tag-prefix { padding: 0; margin-inline-end: 12px; color: var(--field-placeholder); line-height: 20px; }

.dsh-ui.dsh-ui[data-theme][data-radius] :is(.dsh-hero-input-tag.arco-input-tag,.dsh-hero-input-tag > .arco-input-tag) .arco-input-tag-input::placeholder { color: var(--field-placeholder); opacity: 1; }

/* 全局反馈采用 HeroUI Toast 的表面、文字层级和边缘偏移。 */
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-message,.arco-notification) { overflow: visible; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-message-wrapper { padding: 0 16px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-message-wrapper > div { display: flex; flex-direction: column; align-items: center; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-message-wrapper-top { top: 16px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-message-wrapper-bottom { bottom: 16px; }
.dsh-ui[data-theme][data-radius] .arco-message-wrapper .fadeMessage-enter,
.dsh-ui[data-theme][data-radius] .arco-message-wrapper .fadeMessage-exit-active { opacity: 0; translate: 0 -24px; }
.dsh-ui[data-theme][data-radius] .arco-message-wrapper .fadeMessage-enter-active { opacity: 1; translate: 0 0; transition: translate 100ms ease, opacity 100ms ease; }
.dsh-ui[data-theme][data-radius] .arco-message-wrapper .fadeMessage-exit-active { transition: translate 220ms ease, opacity 220ms ease, height 220ms ease; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-notification-wrapper { width: min(460px, calc(100vw - 32px)); }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-notification-wrapper-topLeft,.arco-notification-wrapper-topRight) { top: 16px; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-notification-wrapper-bottomLeft,.arco-notification-wrapper-bottomRight) { bottom: 16px; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-notification-wrapper-topLeft,.arco-notification-wrapper-bottomLeft) { left: 16px; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-notification-wrapper-topRight,.arco-notification-wrapper-bottomRight) { right: 16px; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-message,.arco-notification) { box-sizing: border-box; display: grid; grid-template-columns: auto minmax(0, 1fr); align-items: start; column-gap: 6px; width: min(460px, calc(100vw - 32px)); margin: 0; padding: 12px 16px; border: 0; border-radius: min(32px, calc(var(--radius) * 3)); color: var(--overlay-foreground); background: var(--surface); box-shadow: var(--overlay-shadow); text-align: start; font-size: 14px; line-height: 20px; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-message,.arco-notification):not(:has(.arco-message-icon,.arco-notification-icon)) { grid-template-columns: minmax(0, 1fr); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-message-icon, .dsh-ui.dsh-ui[data-theme][data-radius] .arco-notification-left { display: flex; align-items: center; justify-content: center; margin: 0; padding: 4px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-notification-icon { display: flex; width: 16px; height: 16px; font-size: 16px; line-height: 16px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-notice-icon { display: block; width: 16px; height: 16px; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-message-content,.arco-notification-right) { min-width: 0; align-self: center; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-message-content,.arco-notification-title) { margin: 0; color: var(--overlay-foreground); font-size: 14px; line-height: 20px; font-weight: 500; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-notification-content { margin: 0; color: var(--muted); font-size: 14px; line-height: 20px; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-message-close-btn,.arco-notification-close-btn) { position: absolute; top: -4px; inset-inline-end: -4px; display: flex; align-items: center; justify-content: center; width: 20px; height: 20px; padding: 0; border: 1px solid var(--border); border-radius: 50%; color: var(--muted); background: var(--overlay); opacity: 0; pointer-events: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-message,.arco-notification):is(:hover,:focus-within) :is(.arco-message-close-btn,.arco-notification-close-btn) { opacity: 1; pointer-events: auto; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-notice-close-icon { display: block; width: 12px; height: 12px; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-message-close-btn,.arco-notification-close-btn) { transform: translateZ(0); }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-message-info,.arco-notification-info) :is(.arco-message-content,.arco-notification-title) { color: var(--accent-soft-foreground); }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-message-info,.arco-notification-info) :is(.arco-message-icon,.arco-notification-icon) { color: var(--overlay-foreground); }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-message-success,.arco-notification-success) :is(.arco-message-icon,.arco-message-content,.arco-notification-icon,.arco-notification-title) { color: var(--success-soft-foreground); }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-message-warning,.arco-notification-warning) :is(.arco-message-icon,.arco-message-content,.arco-notification-icon,.arco-notification-title) { color: var(--warning-soft-foreground); }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-message-error,.arco-notification-error) :is(.arco-message-icon,.arco-message-content,.arco-notification-icon,.arco-notification-title) { color: var(--danger-soft-foreground); }

/* 提示堆叠按最新消息置前，悬停与键盘焦点展开不同高度的消息。 */
.dsh-ui.dsh-ui[data-theme][data-radius] [data-dsh-toast-stack]:not([data-dsh-toast-stack="0"]):not([data-dsh-toast-stack="1"]) { display: block; height: var(--dsh-toast-front-height); pointer-events: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-message-wrapper[data-dsh-toast-stack]:not([data-dsh-toast-stack="0"]):not([data-dsh-toast-stack="1"]) { left: 50%; width: min(460px, calc(100vw - 32px)); padding: 0; transform: translateX(-50%); }
.dsh-ui.dsh-ui[data-theme][data-radius] [data-dsh-toast-stack]:not([data-dsh-toast-stack="0"]):not([data-dsh-toast-stack="1"]) > [data-dsh-toast-item]:not(.dsh-toast) { display: contents; }
.dsh-ui.dsh-ui[data-theme][data-radius] [data-dsh-toast-stack]:not([data-dsh-toast-stack="0"]):not([data-dsh-toast-stack="1"]) :is(.dsh-toast,.arco-message,.arco-notification) { position: absolute; z-index: var(--dsh-toast-layer); inset-inline: 0; top: 0; height: var(--dsh-toast-front-height); transform: translateY(calc(var(--dsh-toast-index) * 12px)) scale(calc(1 - var(--dsh-toast-index) * .05)) translateZ(0); transform-origin: top center; pointer-events: auto; }
.dsh-ui.dsh-ui[data-theme][data-radius] [data-dsh-toast-direction="bottom"]:not([data-dsh-toast-stack="0"]):not([data-dsh-toast-stack="1"]) :is(.dsh-toast,.arco-message,.arco-notification) { top: auto; bottom: 0; transform: translateY(calc(var(--dsh-toast-index) * -12px)) scale(calc(1 - var(--dsh-toast-index) * .05)) translateZ(0); transform-origin: bottom center; }
.dsh-ui.dsh-ui[data-theme][data-radius] [data-dsh-toast-stack]:not([data-dsh-toast-stack="0"]):not([data-dsh-toast-stack="1"]) :is(.dsh-toast,.arco-message,.arco-notification):not([data-dsh-toast-index="0"]) { overflow: hidden; }
.dsh-ui.dsh-ui[data-theme][data-radius] [data-dsh-toast-stack]:not(:hover):not(:focus-within):not([data-dsh-toast-stack="1"]) :is(.dsh-toast,.arco-message,.arco-notification):not([data-dsh-toast-index="0"]) > * { opacity: 0; pointer-events: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] [data-dsh-toast-stack]:is(:hover,:focus-within):not([data-dsh-toast-stack="1"]) :is(.dsh-toast,.arco-message,.arco-notification) { height: var(--dsh-toast-height); transform: translateY(var(--dsh-toast-offset)); overflow: visible; }
.dsh-ui.dsh-ui[data-theme][data-radius] [data-dsh-toast-direction="bottom"]:is(:hover,:focus-within):not([data-dsh-toast-stack="1"]) :is(.dsh-toast,.arco-message,.arco-notification) { transform: translateY(calc(-1 * var(--dsh-toast-offset))); }
.dsh-ui.dsh-ui[data-theme][data-radius] [data-dsh-toast-stack]:is(:hover,:focus-within) :is(.dsh-toast,.arco-message,.arco-notification)::after { content: ""; position: absolute; z-index: -1; inset-inline: 0; top: 0; bottom: -13px; }
.dsh-ui.dsh-ui[data-theme][data-radius] [data-dsh-toast-direction="bottom"]:is(:hover,:focus-within) :is(.dsh-toast,.arco-message,.arco-notification)::after { top: -13px; bottom: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] [data-dsh-toast-stack] :is(.dsh-toast,.arco-message,.arco-notification)[inert] { opacity: 0; pointer-events: none; }


/* 时间线使用 Paragraph、Description 与 Separator 的默认文字和颜色。 */
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-timeline-item-content { color: var(--foreground); font-size: 16px; line-height: 28px; margin-bottom: 4px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-timeline-item-label { color: var(--muted); font-size: 12px; line-height: 16px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-timeline-item-dot-solid { background: var(--accent); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-timeline-item-dot-hollow { border-color: var(--accent); background: var(--surface); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-timeline-item-dot-line { border-color: var(--separator); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-timeline:not(.arco-timeline-direction-horizontal) > .arco-timeline-item > .arco-timeline-item-dot-wrapper > .arco-timeline-item-dot-content { height: 28px; line-height: 28px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-timeline:not(.arco-timeline-direction-horizontal) > .arco-timeline-item > .arco-timeline-item-dot-wrapper > .arco-timeline-item-dot-line { top: 22px; bottom: 0; left: 2.5px; transform: none; }


.dsh-ui.dsh-ui[data-theme][data-radius] .arco-timeline-item-dot-line-is-horizontal { top: 2.5px; transform: none; }

.dsh-ui.dsh-ui[data-theme][data-radius] .arco-timeline-item-dot-custom { color: var(--accent); background: var(--surface); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-timeline:not(.arco-timeline-direction-horizontal) > .arco-timeline-item-label-relative > .arco-timeline-item-label { top: 6px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-timeline-alternate:not(.arco-timeline-direction-horizontal) > .arco-timeline-item { padding-left: 0; padding-right: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-timeline-alternate:not(.arco-timeline-direction-horizontal) > .arco-timeline-item > .arco-timeline-item-dot-wrapper { left: calc(50% - 3px); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-timeline-alternate:not(.arco-timeline-direction-horizontal) > .arco-timeline-item > .arco-timeline-item-content-wrapper { box-sizing: border-box; width: 50%; margin: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-timeline-alternate > .arco-timeline-item-vertical-left > .arco-timeline-item-content-wrapper { left: 50%; padding: 0 0 0 19px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-timeline-alternate > .arco-timeline-item-vertical-right > .arco-timeline-item-content-wrapper { left: 0; padding: 0 19px 0 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-timeline-alternate > .arco-timeline-item-vertical-left.arco-timeline-item-label-relative > .arco-timeline-item-label { padding-right: 19px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-timeline-alternate > .arco-timeline-item-vertical-right.arco-timeline-item-label-relative > .arco-timeline-item-label { padding-left: 19px; }


/* 锚点链接复用 Link 的字重与下划线，定位轴采用 Separator。 */
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-anchor:not(.arco-anchor-horizontal) { border-radius: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-anchor:not(.arco-anchor-horizontal) > .arco-anchor-list { margin: 0 0 0 16px; padding: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-anchor:not(.arco-anchor-horizontal) > .arco-anchor-list::before { left: -16px; width: 1px; border-radius: 2px; background: var(--separator); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-anchor:not(.arco-anchor-horizontal) > .arco-anchor-line-slider { width: 2px; height: 24px; margin-top: 8px; border-radius: 2px; background: var(--accent); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-anchor:not(.arco-anchor-horizontal) > .arco-anchor-line-slider:not([style]) { display: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-anchor:is(.arco-anchor-line-less,.arco-anchor-lineless):not(.arco-anchor-horizontal) > .arco-anchor-list { margin-left: 0; }
@scope (.dsh-ui.dsh-ui[data-theme][data-radius] .arco-anchor:not(.arco-anchor-horizontal)) to (.arco-anchor) {
  :scope.arco-anchor.arco-anchor :is(.arco-anchor-link-item,div.arco-anchor-link) { display: flow-root; margin-bottom: 0; }
  :scope.arco-anchor.arco-anchor :is(a.arco-anchor-link,.arco-anchor-link-title) { display: flex; align-items: center; width: fit-content; min-height: 24px; height: auto; margin: 8px 0; padding: 0; overflow: visible; border-radius: 12px; background: transparent; color: var(--muted); font-size: 16px; line-height: 24px; font-weight: 500; text-decoration: none; text-decoration-thickness: 1.5px; text-underline-offset: 4px; outline: none; }
  :scope.arco-anchor.arco-anchor .arco-anchor-link-active > :is(a.arco-anchor-link,.arco-anchor-link-title) { color: var(--link); background: transparent; }
  :scope.arco-anchor.arco-anchor :is(a.arco-anchor-link,.arco-anchor-link-title):hover { text-decoration-line: underline; text-decoration-color: color-mix(in oklab,var(--muted) 50%,transparent); }
  :scope.arco-anchor.arco-anchor :is(a.arco-anchor-link,.arco-anchor-link-title):focus-visible { outline: none; box-shadow: 0 0 0 2px var(--background),0 0 0 4px var(--focus); }
}


/* 圆形步骤以 Button、Label、Description 和 Separator 组合为基准。 */
@scope (.dsh-ui.dsh-ui[data-theme][data-radius] .arco-steps:not(.arco-steps-mode-dot,.arco-steps-mode-arrow,.arco-steps-mode-navigation)) to (.arco-steps) {
  :scope.arco-steps.arco-steps { --dsh-step-size: 36px; display: flex; }
  :scope.arco-steps.arco-steps.arco-steps-size-small { --dsh-step-size: 32px; }
  :scope.arco-steps.arco-steps > .arco-steps-item { display: flex; position: relative; flex: 1; min-width: 0; margin: 0; margin-inline-end: 8px; padding: 0; overflow: hidden; text-align: start; white-space: nowrap; }
  :scope.arco-steps.arco-steps > .arco-steps-item:last-child { flex: none; margin-inline-end: 0; }
  :scope.arco-steps.arco-steps > .arco-steps-item > :is(.arco-steps-item-node,.arco-steps-item-icon) { display: block; flex: none; width: var(--dsh-step-size); height: var(--dsh-step-size); margin: 0; margin-inline-end: 8px; }
  :scope.arco-steps.arco-steps .arco-steps-icon { box-sizing: border-box; display: flex; align-items: center; justify-content: center; width: var(--dsh-step-size); height: var(--dsh-step-size); border: 0; border-radius: 24px; isolation: isolate; transform: translateZ(0); background: var(--default); color: var(--foreground); font-size: 14px; line-height: 20px; font-weight: 500; }
  :scope.arco-steps.arco-steps .arco-steps-icon > svg { display: block; flex: none; width: 16px; height: 16px; }
  :scope.arco-steps.arco-steps > .arco-steps-item-process > :is(.arco-steps-item-node,.arco-steps-item-icon) > .arco-steps-icon { background: var(--accent); color: var(--accent-foreground); }
  :scope.arco-steps.arco-steps > .arco-steps-item-finish > :is(.arco-steps-item-node,.arco-steps-item-icon) > .arco-steps-icon { color: var(--accent-soft-foreground); }
  :scope.arco-steps.arco-steps > .arco-steps-item-error > :is(.arco-steps-item-node,.arco-steps-item-icon) > .arco-steps-icon { background: var(--danger); color: var(--danger-foreground); }
  :scope.arco-steps.arco-steps > .arco-steps-item > .arco-steps-item-content { display: block; min-width: 0; width: auto; text-align: inherit; }
  :scope.arco-steps.arco-steps > .arco-steps-item > .arco-steps-item-content > .arco-steps-item-title { display: inline-block; position: relative; margin: 0; padding: 0; padding-inline-end: 8px; color: var(--foreground); font-size: 14px; line-height: var(--dsh-step-size); font-weight: 500; }
  :scope.arco-steps.arco-steps > .arco-steps-item > .arco-steps-item-content > .arco-steps-item-description { max-width: none; margin: 0; color: var(--muted); font-size: 12px; line-height: 16px; font-weight: 400; white-space: normal; overflow-wrap: break-word; }
  :scope.arco-steps.arco-steps > .arco-steps-item:not(:last-child) > .arco-steps-item-content > .arco-steps-item-title::after { top: calc((var(--dsh-step-size) - 1px) / 2); left: auto; right: auto; inset-inline-start: 100%; width: 5000px; height: 1px; background: var(--separator); }
  :scope.arco-steps.arco-steps > .arco-steps-item-disabled > :is(.arco-steps-item-node,.arco-steps-item-icon,.arco-steps-item-content) { opacity: var(--disabled-opacity); cursor: var(--cursor-disabled); }
  :scope.arco-steps.arco-steps.arco-steps-vertical > .arco-steps-item { min-height: 80px; margin: 0; overflow: visible; }
  :scope.arco-steps.arco-steps.arco-steps-vertical > .arco-steps-item:last-child { min-height: 0; }
  :scope.arco-steps.arco-steps.arco-steps-vertical > .arco-steps-item > .arco-steps-item-tail { left: auto; right: auto; inset-inline-start: calc((var(--dsh-step-size) - 1px) / 2); top: calc(var(--dsh-step-size) + 8px); bottom: 8px; width: 1px; height: auto; padding: 0; transform: none; }
  :scope.arco-steps.arco-steps > .arco-steps-item:last-child > .arco-steps-item-tail { display: none; }
  :scope.arco-steps.arco-steps > .arco-steps-item > .arco-steps-item-tail::after { background: var(--separator); }
  :scope.arco-steps.arco-steps.arco-steps-label-vertical:not(.arco-steps-vertical) > .arco-steps-item { flex: 1; flex-direction: column; align-items: center; margin: 0; overflow: visible; }
  :scope.arco-steps.arco-steps.arco-steps-label-vertical:not(.arco-steps-vertical) > .arco-steps-item > :is(.arco-steps-item-node,.arco-steps-item-icon) { margin: 0; }
  :scope.arco-steps.arco-steps.arco-steps-label-vertical:not(.arco-steps-vertical) > .arco-steps-item > .arco-steps-item-content { text-align: center; }
  :scope.arco-steps.arco-steps.arco-steps-label-vertical:not(.arco-steps-vertical) > .arco-steps-item > .arco-steps-item-content > .arco-steps-item-title { margin-top: 8px; padding: 0; line-height: 20px; }
  :scope.arco-steps.arco-steps.arco-steps-label-vertical:not(.arco-steps-vertical) > .arco-steps-item > .arco-steps-item-tail { left: auto; right: auto; inset-inline-start: calc(50% + var(--dsh-step-size) / 2 + 8px); top: calc((var(--dsh-step-size) - 1px) / 2); width: calc(100% - var(--dsh-step-size) - 16px); height: 1px; padding: 0; }
}


/* 评分保留 Arco 半选命中区，视觉采用分离的 ToggleButton。 */
@scope (.dsh-ui.dsh-ui[data-theme][data-radius] .arco-rate) to (.arco-rate) {
  :scope.arco-rate.arco-rate { display: inline-flex; min-height: 36px; font-size: 24px; line-height: 1; }
  :scope.arco-rate.arco-rate > .arco-rate-inner { display: inline-flex; }
  :scope.arco-rate.arco-rate .arco-rate-character { position: relative; flex: none; width: 1.5em; height: 1.5em; margin: 0; border-radius: 24px; color: var(--default-foreground); background: transparent; isolation: isolate; transform: translateZ(0); }
  :scope.arco-rate.arco-rate .arco-rate-character:not(:last-child) { margin-inline-end: 4px; }
  :scope.arco-rate.arco-rate .arco-rate-character-right { position: relative; width: 100%; height: 100%; border-radius: inherit; color: inherit; }
  :scope.arco-rate.arco-rate .arco-rate-character-left { position: absolute; z-index: 1; top: 0; left: auto; right: auto; inset-inline-start: 0; width: 50%; height: 100%; border-radius: 0; overflow: hidden; opacity: 0; }
  :scope.arco-rate.arco-rate :is(.arco-rate-character-left,.arco-rate-character-right) > * { position: absolute; float: none; left: auto; right: auto; inset-inline-start: calc((1.5em - 0.666667em) / 2); top: calc((1.5em - 0.666667em) / 2); width: 0.666667em; height: 0.666667em; }
  :scope.arco-rate.arco-rate .arco-rate-character-full > .arco-rate-character-right, :scope.arco-rate.arco-rate .arco-rate-character-half > .arco-rate-character-left { color: var(--accent-soft-foreground); background: var(--accent-soft); }
  :scope.arco-rate.arco-rate .arco-rate-character-half { overflow: hidden; }
  :scope.arco-rate.arco-rate .arco-rate-character-half > .arco-rate-character-right { border-radius: 0; }
  :scope.arco-rate.arco-rate .arco-rate-character-half > .arco-rate-character-left { opacity: 1; border-radius: 0; }
  :scope.arco-rate.arco-rate:not(.arco-rate-disabled,.arco-rate-readonly) .arco-rate-character:hover { transform: translateZ(0); }
  :scope.arco-rate.arco-rate:not(.arco-rate-disabled,.arco-rate-readonly) .arco-rate-character:hover > .arco-rate-character-right { background: var(--default); }
  :scope.arco-rate.arco-rate:not(.arco-rate-disabled,.arco-rate-readonly) .arco-rate-character-full:hover > .arco-rate-character-right, :scope.arco-rate.arco-rate:not(.arco-rate-disabled,.arco-rate-readonly) .arco-rate-character-half:hover > .arco-rate-character-left { background: var(--accent-soft-hover); }
  :scope.arco-rate.arco-rate:not(.arco-rate-disabled,.arco-rate-readonly) .arco-rate-character-half:hover { background: var(--default); }
  :scope.arco-rate.arco-rate:not(.arco-rate-disabled,.arco-rate-readonly) .arco-rate-character-half:hover > .arco-rate-character-right { background: transparent; }
  :scope.arco-rate.arco-rate.arco-rate-disabled .arco-rate-character { opacity: var(--disabled-opacity); }
}


/* 树节点复用 ListBox 的行间距、Label 与选中指示，保留原有层级行为。 */
@scope (.dsh-ui.dsh-ui[data-theme][data-radius] .arco-tree:not(.arco-tree-show-line)) to (.arco-tree) {
  :scope.arco-tree.arco-tree.arco-tree { box-sizing: border-box; padding: 4px 4px 0; color: var(--foreground); }
  :scope.arco-tree.arco-tree.arco-tree .arco-tree-node { box-sizing: border-box; display: flex; align-items: center; min-height: 36px; margin: 0 0 4px; padding: 6px 8px; border-radius: 16px; color: var(--foreground); font-size: 14px; line-height: 20px; font-weight: 500; }
  :scope.arco-tree.arco-tree.arco-tree .arco-tree-node:not(.arco-tree-node-disabled):hover { background: var(--default); }
  :scope.arco-tree.arco-tree.arco-tree .arco-tree-node-indent-block { width: 24px; margin: 0; }
  :scope.arco-tree.arco-tree.arco-tree .arco-tree-node-switcher { display: flex; align-items: center; justify-content: center; flex: none; width: 16px; height: 20px; margin: 0; margin-inline-end: 12px; color: var(--foreground); font-size: 12px; }
  :scope.arco-tree.arco-tree.arco-tree .arco-tree-node-switcher-icon { display: flex; align-items: center; justify-content: center; width: 16px; height: 20px; }
  :scope.arco-tree.arco-tree.arco-tree .arco-tree-node-icon-hover::before { display: none; }
  :scope.arco-tree.arco-tree.arco-tree .arco-tree-node-title { box-sizing: border-box; display: flex; align-items: center; flex: 1; min-width: 0; min-height: 20px; margin: 0; padding: 0; border-radius: 0; color: inherit; background: transparent; font-size: 14px; line-height: 20px; font-weight: 500; }
  :scope.arco-tree.arco-tree.arco-tree .arco-tree-node-title:hover { color: inherit; background: transparent; }
  :scope.arco-tree.arco-tree.arco-tree .arco-tree-node-title-text { color: inherit; }
  :scope.arco-tree.arco-tree.arco-tree .arco-tree-node-selected:not(:has(> .arco-checkbox)) { padding-inline-end: 28px; }
  :scope.arco-tree.arco-tree.arco-tree .arco-tree-node-selected:not(:has(> .arco-checkbox))::after { content: ''; position: absolute; inset-inline-end: 11px; top: calc(50% - 5px); width: 10px; height: 10px; background: var(--default-foreground); mask: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2210%22%20height%3D%2210%22%20viewBox%3D%220%200%2017%2018%22%3E%3Cpolyline%20points%3D%221%209%207%2014%2015%204%22%20fill%3D%22none%22%20stroke%3D%22black%22%20stroke-dasharray%3D%2222%22%20stroke-dashoffset%3D%2244%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E") center / contain no-repeat; }
  :scope.arco-tree.arco-tree.arco-tree .arco-tree-node-disabled > .arco-tree-node-title { color: inherit; }
  :scope.arco-tree.arco-tree.arco-tree .arco-tree-node-disabled .arco-tree-node-title-text { opacity: var(--disabled-opacity); }
  :scope.arco-tree.arco-tree.arco-tree .arco-tree-node-disabled { opacity: var(--disabled-opacity); cursor: var(--cursor-disabled); }
  :scope.arco-tree.arco-tree.arco-tree .arco-tree-node > .arco-checkbox { flex: none; width: 16px; height: 20px; min-height: 20px; margin: 0; margin-inline-end: 12px; padding: 0; line-height: 20px; }
  :scope.arco-tree.arco-tree.arco-tree .arco-tree-node-selected > .arco-tree-node-title { color: inherit; background: transparent; }
  :scope.arco-tree.arco-tree.arco-tree .arco-tree-node > .arco-checkbox-indeterminate :is(.arco-checkbox-icon,.arco-checkbox-mask) { position: relative; overflow: hidden; background: var(--accent); color: var(--accent-foreground); }
  :scope.arco-tree.arco-tree.arco-tree .arco-tree-node > .arco-checkbox-indeterminate :is(.arco-checkbox-icon,.arco-checkbox-mask)::after { display: none; }
  :scope.arco-tree.arco-tree.arco-tree .arco-tree-node { anchor-scope: --dsh-tree-checkbox; }
  :scope.arco-tree.arco-tree.arco-tree .arco-tree-node > .arco-checkbox { anchor-name: --dsh-tree-checkbox; }
  :scope.arco-tree.arco-tree.arco-tree .dsh-tree-half-indicator { display: none; position: absolute; position-anchor: --dsh-tree-checkbox; left: calc(anchor(left) + 2px); top: calc(anchor(top) + 4px); width: 12px; height: 12px; color: var(--accent-foreground); pointer-events: none; }
  :scope.arco-tree.arco-tree.arco-tree .arco-tree-node:has(> .arco-checkbox-indeterminate) > .dsh-tree-half-indicator { display: block !important; }

  :scope.arco-tree.arco-tree.arco-tree .arco-tree-node-custom-icon { margin: 0; margin-inline-end: 12px; }
}


/* 穿梭框以 Surface、ListBox、Checkbox 和 Button 组合，保留 Arco 双列表状态。 */
@scope (.dsh-ui.dsh-ui[data-theme][data-radius] .arco-transfer) to (.arco-transfer) {
  :scope.arco-transfer.arco-transfer.arco-transfer { display: flex; align-items: center; gap: 12px; width: max-content; }
  :scope.arco-transfer.arco-transfer.arco-transfer > .arco-transfer-view { flex: none; box-sizing: border-box; display: flex; flex-direction: column; width: 180px; height: 224px; border: 1px solid var(--separator); border-radius: var(--radius); overflow: hidden; color: var(--foreground); background: var(--surface); }
  :scope.arco-transfer.arco-transfer.arco-transfer .arco-transfer-view > .arco-transfer-view-header { box-sizing: border-box; display: flex; align-items: center; justify-content: space-between; flex: none; gap: 8px; height: 44px; padding: 0 12px; border-bottom: 1px solid var(--separator); background: transparent; color: var(--foreground); font-size: 14px; line-height: 20px; font-weight: 500; }
  :scope.arco-transfer.arco-transfer.arco-transfer .arco-transfer-view-header > :first-child { margin: 0; overflow: visible; }
  :scope.arco-transfer.arco-transfer.arco-transfer .arco-transfer-view-header > :is(.arco-transfer-view-header-count,.arco-transfer-view-header-unit) { margin: 0; color: var(--muted); font-size: 12px; line-height: 16px; font-weight: 400; }
  :scope.arco-transfer.arco-transfer.arco-transfer :is(.arco-transfer-view-header-title,.arco-transfer-list-item,.arco-transfer-view-item) > .arco-checkbox { min-height: 20px; height: 20px; padding: 0; line-height: 20px; overflow: visible; }
  :scope.arco-transfer.arco-transfer.arco-transfer :is(.arco-transfer-view-header-title,.arco-transfer-list-item,.arco-transfer-view-item) > .arco-checkbox > :is(.arco-checkbox-label,.arco-checkbox-text) { color: inherit; }
  :scope.arco-transfer.arco-transfer.arco-transfer :is(.arco-transfer-view-header-title,.arco-transfer-list-item,.arco-transfer-view-item) > .arco-checkbox-disabled { isolation: isolate; transform: translateZ(0); }
  :scope.arco-transfer.arco-transfer.arco-transfer :is(.arco-transfer-view-header-title,.arco-transfer-list-item,.arco-transfer-view-item) > .arco-checkbox-disabled > :is(.arco-checkbox-label,.arco-checkbox-text) { opacity: var(--disabled-opacity); }
  :scope.arco-transfer.arco-transfer.arco-transfer .arco-transfer-view > .arco-transfer-view-body { flex: 1; min-height: 0; overflow: hidden; }
  :scope.arco-transfer.arco-transfer.arco-transfer :is(.arco-transfer-view > .arco-transfer-view-list,.arco-transfer-view-body > .arco-scrollbar > .arco-scrollbar-container > .arco-transfer-view-list) { box-sizing: border-box; flex: 1; margin: 0; padding: 4px; border: 0; border-radius: 0; background: transparent; }
  :scope.arco-transfer.arco-transfer.arco-transfer :is(.arco-transfer-view-list > .arco-list,.arco-transfer-view-list > .arco-list-spin > .arco-list) { background: transparent; overflow: visible; }
  :scope.arco-transfer.arco-transfer.arco-transfer :is(.arco-transfer-view-list > .arco-list > .arco-list-content,.arco-transfer-view-list > .arco-list-spin > .arco-list > .arco-list-content-wrapper > .arco-list-content) { margin: 0; padding: 0; overflow: visible; }
  :scope.arco-transfer.arco-transfer.arco-transfer :is(.arco-transfer-list-item,.arco-transfer-view-item) { box-sizing: border-box; display: flex; align-items: center; min-height: 36px; height: 36px; margin: 0 0 4px; padding: 6px 8px; border: 0 solid var(--border); border-radius: 16px; color: var(--foreground); background: transparent; font-size: 14px; line-height: 20px; font-weight: 500; }
  :scope.arco-transfer.arco-transfer.arco-transfer :is(.arco-transfer-list-item,.arco-transfer-view-item):not(.arco-transfer-list-item-disabled,.arco-transfer-view-item-disabled):hover { color: var(--foreground); background: var(--default); }
  :scope.arco-transfer.arco-transfer.arco-transfer > .arco-transfer-operations { display: flex; flex: none; flex-direction: column; gap: 12px; margin: 0; padding: 0; }
  :scope.arco-transfer.arco-transfer.arco-transfer > .arco-transfer-operations > .arco-btn { box-sizing: border-box; display: inline-flex; align-items: center; justify-content: center; flex: none; width: 32px; min-width: 32px; height: 32px; min-height: 32px; margin: 0; padding: 0; border: 0; border-radius: 24px; color: var(--accent-soft-foreground); background: var(--default); box-shadow: none; font-size: 14px; line-height: 20px; }
  :scope.arco-transfer.arco-transfer.arco-transfer > .arco-transfer-operations > .arco-btn:not(:disabled):hover { background: var(--default-hover); }
  :scope.arco-transfer.arco-transfer.arco-transfer > .arco-transfer-operations > .arco-btn:disabled { opacity: var(--disabled-opacity); cursor: var(--cursor-disabled); isolation: isolate; transform: translateZ(0); }
  :scope.arco-transfer.arco-transfer.arco-transfer > .arco-transfer-operations > .arco-btn svg { width: 16px; height: 16px; }
  :scope.arco-transfer.arco-transfer.arco-transfer .arco-transfer-view > .arco-transfer-view-list { overflow: auto; scrollbar-width: none; }
  :scope.arco-transfer.arco-transfer.arco-transfer .arco-transfer-view > .arco-transfer-view-list > .arco-list { height: 100%; }
  :scope.arco-transfer.arco-transfer.arco-transfer .arco-transfer-view-list > .arco-list > .arco-list-content:has(> .arco-empty) { height: 100%; }
  :scope.arco-transfer.arco-transfer.arco-transfer :is(.arco-transfer-view-body > .arco-empty,.arco-transfer-view-list > .arco-list > .arco-list-content > .arco-empty) { box-sizing: border-box; display: flex; align-items: center; justify-content: center; flex-direction: column; width: 100%; height: 100%; margin: 0; padding: 8px; }
  :scope.arco-transfer.arco-transfer.arco-transfer .arco-transfer-view-list > .arco-list > .arco-list-content > .arco-empty > .arco-empty-wrapper { width: auto; margin: 0; padding: 0; }
}

`

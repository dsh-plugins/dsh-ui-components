import { injectUiStyle } from './style.js'

/** HeroUI 3.2.7 同源浮层视觉，适配 Arco 的定位与交互结构。 */
export const HERO_OVERLAY_CSS = `
/* HeroUI 3.2.7 浮层视觉规则适配 Arco；来源及许可见 NOTICE。 */
.dsh-ui.dsh-ui[data-theme][data-radius] { --dsh-drawer-width: 384px; }
/* 保留二维浮层的子像素绘制，避免 Trigger 默认背面隐藏建立额外合成层。 */
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-trigger:is(.arco-tooltip,.arco-autocomplete-popup) { backface-visibility: visible; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-modal-container,
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-modal-wrapper { height: 100dvh; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-modal-wrapper-align-center {
  display: flex !important; flex-direction: column; align-items: center;
  padding: 120px 40px; overflow: hidden; box-sizing: border-box;
}
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-modal-wrapper-align-center::before,
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-modal-wrapper-align-center::after { display: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-modal-mask,
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-drawer-mask { background: var(--backdrop); backdrop-filter: none; height: 100dvh; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-modal {
  display: flex; flex-direction: column; flex-shrink: 0;
  position: relative; width: 448px; max-width: 100%;
  max-height: calc(100dvh - 240px); min-height: 0;
  margin-block: auto; padding: 24px; border: 0;
  border-radius: min(32px, calc(var(--radius) * 3));
  color: var(--foreground); background: var(--overlay); box-shadow: var(--overlay-shadow);
  font-size: 16px; line-height: 24px; overflow: clip; text-align: start;
}
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-modal > [data-focus-lock-disabled] { display: flex; flex-direction: column; min-height: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-modal-header,.arco-drawer-header) {
  display: flex; flex-direction: column; align-items: stretch; gap: 12px;
  flex: none; height: auto; margin: 0; padding: 0; border: 0;
}
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-modal-title,.arco-drawer-title,.arco-drawer-header-title) {
  margin: 0; padding: 0; font-size: 16px; line-height: 24px;
  font-weight: 500; text-align: start; justify-content: flex-start; color: var(--foreground);
}
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-modal-body,.arco-modal-content,.arco-drawer-body,.arco-drawer-content) {
  display: block; position: static; flex: 1 1 auto; min-height: 0; height: auto;
  margin: 8px -3px 0; padding: 3px; border: 0; overflow: hidden;
  color: var(--muted); font-size: 14px; line-height: 1.43;
}
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-modal-footer,.arco-drawer-footer) {
  display: flex; flex: none; align-items: center; justify-content: flex-end; gap: 8px;
  margin: 20px 0 0; padding: 0; border: 0; line-height: 24px;
}
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-modal-footer,.arco-drawer-footer) > .arco-btn { margin: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-modal-close-btn,.arco-modal-close-icon,.arco-drawer-close-btn,.arco-drawer-close-icon) {
  position: absolute; top: 16px; inset-inline-end: 16px; right: 16px;
  display: flex; align-items: center; justify-content: center;
  width: 24px; height: 24px; margin: 0; padding: 4px; border: 0; border-radius: 9999px;
  background: var(--default); color: var(--muted); cursor: pointer; line-height: 16px;
}
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-modal-close-btn,.arco-modal-close-icon,.arco-drawer-close-btn,.arco-drawer-close-icon)::before {
  content: ''; display: block; position: static; width: 16px; height: 16px; background: currentColor;
  transform: none; border-radius: 0;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M3.47 3.47a.75.75 0 0 1 1.06 0L8 6.94l3.47-3.47a.75.75 0 1 1 1.06 1.06L9.06 8l3.47 3.47a.75.75 0 1 1-1.06 1.06L8 9.06l-3.47 3.47a.75.75 0 0 1-1.06-1.06L6.94 8 3.47 4.53a.75.75 0 0 1 0-1.06Z'/%3E%3C/svg%3E") center / 16px 16px no-repeat;
}
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-modal-close-btn,.arco-modal-close-icon,.arco-drawer-close-btn,.arco-drawer-close-icon) > * { display: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-modal-close-btn,.arco-modal-close-icon,.arco-drawer-close-btn,.arco-drawer-close-icon):hover { background: var(--default-hover); }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-overlay-scroll { max-height: 100%; min-height: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-overlay-scroll > .arco-scrollbar-container { max-height: inherit; overflow: auto; scrollbar-width: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-modal-content,.arco-drawer-content) > .dshl-scrollbar { max-height: 100%; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-drawer-container { height: 100dvh; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-drawer {
  display: flex; flex-direction: column; padding: 24px; border: 0; border-radius: 0;
  max-height: 100dvh; overflow: hidden; will-change: translate; translate: 0 0; color: var(--foreground); background: var(--overlay);
  box-shadow: var(--overlay-shadow); font-size: 16px; line-height: 24px;
}
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-drawer-side .arco-drawer,
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-drawer.dsh-drawer-side { height: 100dvh; max-width: 85vw; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-drawer-bottom .arco-drawer,
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-drawer.dsh-drawer-bottom { max-height: 85dvh; border-radius: min(32px, calc(var(--radius) * 2)) min(32px, calc(var(--radius) * 2)) 0 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-drawer-top .arco-drawer,
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-drawer.dsh-drawer-top { max-height: 85dvh; border-radius: 0 0 min(32px, calc(var(--radius) * 2)) min(32px, calc(var(--radius) * 2)); }

/* 内容层与定位层分开：箭头和偏移由 Arco Trigger 保留交互语义。 */
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-tooltip-content,.arco-tooltip-inner) {
  max-width: 320px; padding: 8px; border: 0; border-radius: min(32px, calc(var(--radius) * 1.5));
  background: var(--overlay); color: var(--foreground); box-shadow: var(--overlay-shadow);
  font-size: 12px; line-height: 16px; overflow-wrap: break-word; word-break: break-all;
}
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-popover-popup-content,.arco-popover-content,.arco-popconfirm-content) {
  padding: 16px; border: 0; border-radius: min(32px, calc(var(--radius) * 3));
  background: var(--overlay); color: var(--foreground); box-shadow: var(--overlay-shadow);
  font-size: 14px; line-height: 20px;
}
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-popover-title,.arco-popover-popup-title) { margin: 0; padding: 0; border: 0; color: var(--foreground); font-size: 14px; line-height: 20px; font-weight: 500; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-popover-content,.arco-popover-popup-content) > .arco-popover-inner-content { margin: 0; padding: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-popover-popup-content > .arco-popover-content {
  padding: 0; margin: 0; border: 0; border-radius: 0; background: transparent; box-shadow: none;
}
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-popover-inner-content { margin: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-popover-popup-content,.arco-popover-content) p { margin: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-tooltip { margin: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-tooltip-popup-arrow,.arco-tooltip-arrow):has(> .dsh-tooltip-arrow) {
  display: block; width: 12px; height: 12px; background: transparent !important; border: 0; border-radius: 0; margin: 0; z-index: 1;
}
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-tooltip-popup-arrow,.arco-tooltip-arrow):has(> .dsh-tooltip-arrow)::before,
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-tooltip-popup-arrow,.arco-tooltip-arrow):has(> .dsh-tooltip-arrow)::after { display: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is([trigger-placement=top],[trigger-placement=tl],[trigger-placement=tr]) :is(.arco-tooltip-popup-arrow,.arco-tooltip-arrow):has(> .dsh-tooltip-arrow) { top: 100% !important; bottom: auto !important; transform: translateX(-50%) !important; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is([trigger-placement=bottom],[trigger-placement=bl],[trigger-placement=br]) :is(.arco-tooltip-popup-arrow,.arco-tooltip-arrow):has(> .dsh-tooltip-arrow) { top: auto !important; bottom: 100% !important; transform: translateX(-50%) rotate(180deg) !important; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is([trigger-placement=left],[trigger-placement=lt],[trigger-placement=lb]) :is(.arco-tooltip-popup-arrow,.arco-tooltip-arrow):has(> .dsh-tooltip-arrow) { left: 100% !important; right: auto !important; transform: translateY(-50%) rotate(-90deg) !important; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is([trigger-placement=right],[trigger-placement=rt],[trigger-placement=rb]) :is(.arco-tooltip-popup-arrow,.arco-tooltip-arrow):has(> .dsh-tooltip-arrow) { left: auto !important; right: 100% !important; transform: translateY(-50%) rotate(90deg) !important; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-tooltip-arrow { display: block; position: absolute; width: 12px; height: 12px; fill: var(--overlay); stroke: color-mix(in oklab, var(--border) 40%, transparent); }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-popover-open,.dsh-popover-trigger-open,.arco-btn.arco-dropdown-open,.dsh-overlay-trigger-open) { transform: translateZ(0) scale(.97); will-change: transform; background: var(--accent-hover); }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-popover-popup-arrow,.arco-popover-arrow) { background: var(--overlay); border: 0; }

/* Select、Autocomplete 和菜单共享 HeroUI ListBox 的视觉尺寸。 */
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-select-dropdown,.arco-select-popup,.arco-dropdown,.arco-dropdown-menu,.arco-auto-complete-popup) {
  padding: 0; border: 0; border-radius: min(32px, calc(var(--radius) * 2 + 6px));
  background: var(--overlay); color: var(--foreground); box-shadow: var(--overlay-shadow);
  font-size: 14px; line-height: 20px;
}
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-select-dropdown-list,.arco-select-popup-inner,.arco-dropdown-list) { padding: 6px; margin: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-select-option,.arco-dropdown-option,.arco-dropdown-menu-item) {
  position: relative; display: flex; align-items: center; justify-content: flex-start;
  gap: 12px; width: 100%; min-height: 36px; height: auto;
  padding: 6px 28px 6px 10px; border: 0; border-radius: calc(var(--radius) * 2);
  font-size: 14px; line-height: 20px; font-weight: 400; color: inherit; background: transparent;
}
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select-option-content { line-height: 20px; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-select-option,.arco-dropdown-option,.arco-dropdown-menu-item) + :is(.arco-select-option,.arco-dropdown-option,.arco-dropdown-menu-item) { margin-top: 4px; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-select-option-selected,.arco-select-option-active,.arco-select-option-hover,.arco-dropdown-option-active) { color: inherit; font-weight: 400; background: transparent; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-select-option,.arco-dropdown-option,.arco-dropdown-menu-item):hover { background: var(--default); }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-select-option-disabled,.arco-dropdown-option-disabled) { opacity: .5; color: inherit; cursor: not-allowed; pointer-events: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select-option-selected::after {
  content: ''; position: absolute; right: 11px; top: calc(50% - 5px); width: 10px; height: 10px;
  background: var(--default-foreground);
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18'%3E%3Cpolyline points='1 9 7 15 17 3' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / 10px 10px no-repeat;
}
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select-option-checkbox { display: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-select-dropdown-empty,.arco-empty) { color: var(--muted); }
@media (max-width: 639px) {
  .dsh-ui.dsh-ui[data-theme][data-radius] { --dsh-drawer-width: 320px; }
  .dsh-ui.dsh-ui[data-theme][data-radius] .arco-modal-wrapper-align-center { padding-inline: 16px; }
}
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-drawer-wrapper { position: fixed !important; inset: 0; height: 100dvh; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-drawer-inner { display: flex; flex-direction: column; flex: 1; min-height: 0; height: auto; overflow: visible; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-drawer-inner > [data-focus-lock-disabled] { display: flex; flex-direction: column; flex: 1; min-height: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-drawer-scroll { display: flex; flex-direction: column; flex: 1; min-height: 0; height: auto; overflow: hidden; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-drawer-content { flex: 1 1 auto; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-drawer-side { top: 0; bottom: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-drawer-bottom { top: auto; bottom: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-drawer-top { top: 0; bottom: auto; }

.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-modal,.arco-drawer):focus-visible { outline: none; }

.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-modal-body,.arco-modal-content,.arco-drawer-body,.arco-drawer-content) { display: flex; flex-direction: column; padding: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-overlay-scroll { display: flex; flex-direction: column; flex: 1; min-height: 0; max-height: none; overflow: hidden !important; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-overlay-scroll > .arco-scrollbar-container { box-sizing: border-box; flex: 1; min-height: 0; max-height: none; overflow: auto; padding: 3px; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-modal-content,.arco-drawer-content) > .dshl-scrollbar { display: flex; flex-direction: column; flex: 1; min-height: 0; max-height: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-modal-content,.arco-drawer-content) > .dshl-scrollbar > .dshl-scrollbar-viewport { padding: 3px; flex: 1; min-height: 0; box-sizing: border-box; }

.dsh-ui.dsh-ui[data-theme][data-radius] .arco-collapse-item { position: relative; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-collapse-item:not(:last-child)::after { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; height: 1px; border-radius: 2px; background: var(--separator); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-collapse-item-content { color: var(--muted); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-collapse-item-icon-hover { position: absolute; right: 16px; margin: 0; width: 16px; height: 16px; transform: none; background: var(--muted); mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M2.97 5.47a.75.75 0 0 1 1.06 0L8 9.44l3.97-3.97a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 0 1 0-1.06Z'/%3E%3C/svg%3E") center / 16px 16px no-repeat; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-collapse-item-icon-hover > * { visibility: hidden; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-collapse-item-header[aria-expanded=true] .arco-collapse-item-icon-hover { transform: rotate(180deg); }

.dsh-ui.dsh-ui[data-theme][data-radius] .arco-collapse-item-header { position: relative; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-collapse-item-icon-hover { left: auto; right: 16px; top: 18px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-collapse-item-icon-hover::before { display: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-collapse-item-active > .arco-collapse-item-header .arco-collapse-item-icon-hover { transform: rotate(180deg); }

.dsh-ui.dsh-ui[data-theme][data-radius] .arco-collapse-item-content-box { transform: translateZ(0); }

.dsh-ui.dsh-ui[data-theme][data-radius] .arco-drawer-wrapper:not(.arco-drawer-wrapper-hide):has(> :is(.dsh-drawer-bottom,.dsh-drawer-top)) { display: flex !important; align-items: flex-end; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-drawer-wrapper:has(> .dsh-drawer-top) { align-items: flex-start; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-drawer:is(.dsh-drawer-bottom,.dsh-drawer-top) { position: relative; inset: auto !important; overflow: visible; transform: translateZ(0); }

`

/** 注册浮层视觉规则。 */
export function injectHeroOverlayStyles(): void {
  injectUiStyle('foundation/hero-overlays.css', HERO_OVERLAY_CSS)
}

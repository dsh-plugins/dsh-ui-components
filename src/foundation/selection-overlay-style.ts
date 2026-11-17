/** HeroUI 3.2.7 选择与菜单视觉，保留 Arco 交互状态。 */
export const SELECTION_OVERLAY_CSS = `
/* HeroUI 3.2.7 ListBox 与菜单的尺寸；沿用 Arco 的键盘、过滤及选中状态。 */
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select:not(.arco-select-disabled,.arco-select-error) > .arco-select-view {
  background: var(--surface-secondary); border: 1px solid var(--border); border-radius: calc(var(--radius) * 3);
}
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select:not(.arco-select-disabled,.arco-select-error) > .arco-select-view:is(:focus-visible,:focus-within),
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select-focused:not(.arco-select-disabled,.arco-select-error) > .arco-select-view {
  border-color: var(--focus); box-shadow: 0 0 0 1px var(--focus); outline: none;
}
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select-view-input:focus-visible { outline: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-select-dropdown,.arco-select-popup) {
  padding: 0; border: 0; border-radius: min(32px, calc(var(--radius) * 2 + 6px));
  color: var(--foreground); background: var(--overlay); box-shadow: var(--overlay-shadow);
  font-size: 14px; line-height: 20px;
}
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-select-dropdown-list,.arco-select-popup-inner) {
  padding: 6px; margin: 0; border: 0; box-sizing: border-box; scrollbar-width: none;
}
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select-option {
  position: relative; display: flex; align-items: center; flex-shrink: 0;
  min-height: 36px; height: auto; width: 100%; padding: 6px 28px 6px 10px;
  margin: 0; border: 0; border-radius: var(--field-radius);
  font-size: 14px; line-height: 20px; font-weight: 400; color: inherit; background: transparent;
}
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select-option + .arco-select-option { margin-top: 4px; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-select-dropdown-list,.arco-select-popup-inner) :is(.arco-select-option:first-child:not(.arco-select-option-wrapper > .arco-select-option),.arco-select-option-wrapper:first-child > .arco-select-option) {
  border-start-start-radius: calc(var(--radius) * 2); border-start-end-radius: calc(var(--radius) * 2);
}
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-select-dropdown-list,.arco-select-popup-inner) :is(.arco-select-option:last-child:not(.arco-select-option-wrapper > .arco-select-option),.arco-select-option-wrapper:last-child > .arco-select-option) {
  border-end-start-radius: calc(var(--radius) * 2); border-end-end-radius: calc(var(--radius) * 2);
}
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select-option-content { line-height: 20px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select-option:not(.arco-select-option-disabled,.arco-select-option-selected):is(:hover,.arco-select-option-active,.arco-select-option-hover) { background: var(--default); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select-option.arco-select-option-selected:not(.arco-select-option-disabled) {
  background: var(--accent); color: var(--accent-foreground); box-shadow: none;
}
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select-option-disabled { opacity: .5; color: inherit; pointer-events: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select-option-selected::after {
  content: ''; position: absolute; inset-inline-end: 11px; top: calc(50% - 5px); width: 10px; height: 10px;
  background: currentColor;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 17 18'%3E%3Cpolyline points='1 9 7 14 15 4' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / 10px 10px no-repeat;
}
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select-option-checkbox { display: flex; padding: 0; margin: 0; color: inherit; font: inherit; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select-option-checkbox .arco-checkbox-icon { display: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select-option-checkbox .arco-checkbox-icon-hover { display: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select-option-checkbox .arco-checkbox-label { margin: 0; padding: 0; color: inherit; font: inherit; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select-option-wrapper { display: block; padding: 0; margin: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select-option-wrapper + .arco-select-option-wrapper { margin-top: 4px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select-option-wrapper > .arco-select-checkbox { display: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-select-dropdown-empty,.arco-select-popup-inner:has(> .dsh-select-empty)) { padding: 6px; color: color-mix(in oklab, var(--overlay-foreground) 60%, transparent); font-size: 14px; line-height: 20px; text-align: center; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-dropdown,.arco-dropdown-menu) {
  min-width: 220px; padding: 6px; margin: 0; border: 0;
  border-radius: min(32px, calc(var(--radius) * 2 + 6px)); background: var(--overlay); color: var(--foreground); box-shadow: var(--overlay-shadow);
  font-size: 14px; line-height: 20px;
}
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-dropdown-list,.arco-dropdown .arco-scrollbar-container,.arco-dropdown-menu .arco-menu-inner) { margin: 0; padding: 0; border: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-dropdown-menu .arco-menu { margin: 0; padding: 0; border: 0; background: transparent; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-dropdown > .arco-dropdown-menu { background: transparent; box-shadow: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-dropdown-option,.arco-dropdown-menu-item,.arco-dropdown-menu .arco-menu-item,.arco-dropdown-menu .arco-dropdown-menu-pop-header) {
  position: relative; display: flex; align-items: center; min-height: 36px; height: auto; width: 100%;
  padding: 6px 10px; margin: 0; border: 0; border-radius: calc(var(--radius) * 2);
  font-size: 14px; line-height: 20px; font-weight: 400; color: inherit; background: transparent;
}
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-dropdown-option,.arco-dropdown-menu-item,.arco-dropdown-menu .arco-menu-item,.arco-dropdown-menu .arco-dropdown-menu-pop-header) + :is(.arco-dropdown-option,.arco-dropdown-menu-item,.arco-dropdown-menu .arco-menu-item,.arco-dropdown-menu-pop-header) { margin-top: 2px; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-dropdown-option-disabled,.arco-dropdown-menu-item-disabled,.arco-menu-disabled) { opacity: .5; color: inherit; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-dropdown-option,.arco-dropdown-menu-item,.arco-dropdown-menu .arco-menu-item,.arco-dropdown-menu .arco-dropdown-menu-pop-header):hover { background: var(--default); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-menu:not(.arco-menu-horizontal):not(.arco-menu-collapsed):not(.arco-dropdown-menu .arco-menu) { padding: 4px 12px; border: 0; background: transparent; color: var(--foreground); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-menu:not(.arco-menu-horizontal) .arco-menu-item {
  position: relative; display: flex; align-items: center; min-height: 36px; height: auto;
  padding: 6px 8px; margin: 0; border: 0; border-radius: calc(var(--radius) * 2);
  font-size: 14px; line-height: 20px; font-weight: 400; color: inherit; background: transparent;
}
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-menu:not(.arco-menu-horizontal):not(.arco-dropdown-menu .arco-menu) .arco-menu-item + .arco-menu-item { margin-top: 10px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-menu-inner { padding: 0; overflow: visible; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-menu-selected::after,
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-menu-selected-label { display: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-menu:not(.arco-dropdown-menu .arco-menu) :is(.arco-menu-item,.arco-menu-inline-header,.arco-menu-pop-header) {
  border-radius: calc(var(--radius) * 3);
}
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-menu-horizontal :is(.arco-menu-item,.arco-menu-pop-header) { background: transparent; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-menu:not(.arco-dropdown-menu .arco-menu) :is(.arco-menu-item,.arco-menu-inline-header,.arco-menu-pop-header):not(.arco-menu-disabled,.arco-menu-selected):hover {
  background: var(--default-hover);
}
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-menu:not(.arco-dropdown-menu .arco-menu) :is(.arco-menu-item,.arco-menu-inline-header,.arco-menu-pop-header).arco-menu-selected {
  background: var(--accent); color: var(--accent-foreground);
}
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-menu :is(.arco-menu-icon,.arco-icon) { color: inherit; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-select-summary { display: inline; white-space: pre; font-size: 14px; line-height: 20px; color: var(--field-foreground); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select:has(.dsh-select-summary) { height: 36px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select:has(.dsh-select-summary) :is(.arco-select-view-inner,.arco-select-view,.arco-input-tag-inner) { display: flex; align-items: center; flex-wrap: nowrap; gap: 0; height: 36px; margin: 0; padding-block: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select:has(.dsh-select-summary) { padding-left: 12px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select:has(.dsh-select-summary) .arco-select-view { padding-left: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select:has(.dsh-select-summary) .arco-input-tag { margin: 0; padding: 0; border: 0; height: 20px; min-height: 20px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select:has(.dsh-select-summary) :is(.arco-input-tag,.arco-input-tag-inner) { overflow: visible; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select:has(.dsh-select-summary) .arco-select-suffix { padding: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select-open:focus-visible { outline: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select-view-input::placeholder { color: var(--muted); opacity: 1; }

.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select:has(.dsh-select-summary) .arco-select-view-tag { display: contents; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select:has(.dsh-select-summary) .arco-select-view-tag .arco-tag-close-btn { display: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select:has(.dsh-select-summary) .arco-select-view-inner { height: 20px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select:has(.dsh-select-summary) .arco-input-tag-inner { height: 20px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select:has(.dsh-select-summary) .arco-input-tag-view { display: flex; align-items: center; height: 20px; margin: 0; padding: 0; }

.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select-view-opened .arco-select-view-icon { transform: rotate(180deg); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select-view-opened .arco-icon-search { width: 16px; height: 16px; background: currentColor; mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M2.97 5.47a.75.75 0 0 1 1.06 0L8 9.44l3.97-3.97a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 0 1 0-1.06Z'/%3E%3C/svg%3E") center / 16px 16px no-repeat; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select-view-opened .arco-icon-search path { visibility: hidden; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select-arrow-icon svg { background: currentColor; mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M2.97 5.47a.75.75 0 0 1 1.06 0L8 9.44l3.97-3.97a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 0 1 0-1.06Z'/%3E%3C/svg%3E") center / 16px 16px no-repeat; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select-arrow-icon svg path { visibility: hidden; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select-open .arco-select-arrow-icon { transform: rotate(180deg); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select:has(.dsh-select-summary) .arco-select-view-tag .arco-tag-close-btn { display: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select:has(.dsh-select-summary) .arco-tag { background: transparent; padding: 0; margin: 0; border: 0; box-shadow: none; height: 20px; font: inherit; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select:has(.dsh-select-summary) .arco-tag-close-btn { display: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select:has(.dsh-select-summary) .arco-select-view-inner { display: flex; align-items: center; height: 20px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select:has(.dsh-select-summary) .arco-input-tag-inner { height: 20px; padding: 0; margin: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select:has(.dsh-select-summary) .arco-input-tag-view { display: inline-flex; align-items: center; line-height: 20px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-dropdown .arco-dropdown-menu { min-width: 208px; padding: 0; border-radius: 0; box-shadow: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-dropdown-menu-disabled { opacity: .5; }

.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-select-search { padding: 12px 12px 4px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-select-search input { display: block; box-sizing: border-box; width: 100%; height: 36px; border: 0; border-radius: 12px; padding: 8px 12px; background: var(--field-background); color: var(--field-foreground); font-size: 14px; line-height: 20px; box-shadow: var(--field-shadow); outline: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-select-search input:focus-visible { box-shadow: 0 0 0 2px var(--focus), var(--field-shadow); outline: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-select-search input::-webkit-search-cancel-button { appearance: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select-dropdown:has(.dsh-select-search) .arco-select-dropdown-empty { padding-top: 6px; padding-bottom: 6px; }

.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select:has(.dsh-select-summary) { vertical-align: top; align-items: center; position: relative; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select.arco-select-multiple:has(.dsh-select-summary) { padding: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select.arco-select-multiple:has(.dsh-select-summary) .arco-select-view { padding-left: 12px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select:has(.dsh-select-summary) .arco-input-tag-view { min-height: 20px; height: 20px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select-option-disabled .arco-checkbox { opacity: 1; }

.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select-dropdown-header { padding: 0; border: 0; }

.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-select-view-opened,.arco-select-view-open) .arco-select-view-icon { transform: rotate(180deg); }

.dsh-ui.dsh-ui[data-theme][data-radius] .arco-menu:not(.arco-menu-horizontal):not(.arco-dropdown-menu .arco-menu) .arco-menu-item { padding-inline: 16px; font-size: 16px; line-height: 24px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-dropdown-menu .arco-menu-item { padding-left: 10px; }

.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select-view-opened .arco-select-view-arrow-icon { transform: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select-open .arco-select-arrow-icon > svg { transform: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-select-search input { transform: translateZ(0); }

.dsh-ui.dsh-ui[data-theme][data-radius] .arco-dropdown-option-suffix { margin-left: auto; color: var(--muted); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-dropdown-option-suffix svg { width: 16px; height: 16px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-dropdown-menu :is(.arco-dropdown-menu-pop-header) { background: transparent; border-radius: calc(var(--radius) * 2); color: inherit; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-dropdown-menu .arco-dropdown-menu-pop-header { padding: 6px 10px; min-height: 36px; line-height: 20px; margin: 2px 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-dropdown-menu .arco-dropdown-menu-icon-suffix { margin-left: auto; color: var(--muted); }

.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-dropdown-option-suffix,.arco-dropdown-menu-icon-suffix) { position: absolute; right: 8px; top: 10px; display: flex; align-items: center; justify-content: center; width: 16px; height: 16px; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-dropdown-option-suffix,.arco-dropdown-menu-icon-suffix) svg { width: 14px; height: 14px; background: currentColor; mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M5.47 2.97a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06L9.44 8 5.47 4.03a.75.75 0 0 1 0-1.06Z'/%3E%3C/svg%3E") center / 14px 14px no-repeat; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-dropdown-option-suffix,.arco-dropdown-menu-icon-suffix) svg path { visibility: hidden; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select-dropdown:has(.dsh-select-search) .arco-select-dropdown-empty { text-align: left; }

.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select-dropdown:has(.dsh-select-search) .arco-select-dropdown-empty { color: var(--foreground); }

.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-select-search__group { height: 36px; overflow: hidden; border-radius: 12px; background: var(--field-background); box-shadow: var(--field-shadow); }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-select-search__group:has(input:focus-visible) { box-shadow: 0 0 0 2px var(--focus), var(--field-shadow); }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-select-search__group input { background: transparent; border-radius: inherit; box-shadow: none; transform: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-select-search__group input:focus-visible { box-shadow: none; }

.dsh-ui.dsh-ui[data-theme][data-radius] .arco-autocomplete { height: 36px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-autocomplete .arco-input { height: 20px; padding: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-input-wrapper:has(.dsh-combobox-indicator) { padding-right: 8px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-combobox-indicator { display: block; width: 16px; height: 16px; color: var(--muted); background: currentColor; mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M2.97 5.47a.75.75 0 0 1 1.06 0L8 9.44l3.97-3.97a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 0 1 0-1.06Z'/%3E%3C/svg%3E") center / 16px 16px no-repeat; }

.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-combobox-indicator--open { transform: rotate(180deg); }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-autocomplete-empty { padding: 6px; font-size: 14px; line-height: 20px; color: var(--foreground); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-auto-complete-dropdown .arco-select-dropdown-footer { padding: 0; border: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-autocomplete-popup .arco-select-option-content { display: block; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-autocomplete-popup .arco-select-option-content .arco-select-highlight { display: inline; }

.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-select-search__group input { appearance: auto; }

.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-select-search__group input { padding-block: 7px 9px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-auto-complete-dropdown:has(.dsh-autocomplete-empty) .arco-select-dropdown-list { display: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-autocomplete-popup .arco-select-popup-hidden:has(.dsh-autocomplete-empty) { display: block; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-autocomplete-popup:has(.dsh-autocomplete-empty) { pointer-events: auto !important; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-autocomplete .arco-input-inner-wrapper { height: 36px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-autocomplete .arco-input-group-suffix { padding: 0; margin-left: 0; }

.dsh-ui.dsh-ui[data-theme][data-radius] .arco-autocomplete .arco-input-inner-wrapper .arco-input { height: 20px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-autocomplete .arco-input-inner-wrapper { padding-right: 8px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-autocomplete-popup .arco-select-option { gap: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-autocomplete-popup .arco-select-highlight { font-weight: inherit; }


/* 不透明文字背景保留建议列表的子像素抗锯齿。 */
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-combobox-indicator { opacity: .7; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-auto-complete-dropdown,.arco-autocomplete-popup) .arco-select-option { background: var(--overlay); }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-auto-complete-dropdown,.arco-autocomplete-popup) .arco-select-option:hover { background: var(--default); }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-auto-complete-dropdown,.arco-autocomplete-popup) .arco-select-option > span { background: inherit; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-autocomplete-empty__text { background: var(--overlay); }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-autocomplete-empty__text > * { display: inline; background: inherit; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-autocomplete-popup .arco-select-option { filter: none; }
.dsh-ui.dsh-ui[data-theme=dark][data-radius] .arco-select-option { filter: opacity(1); }
.dsh-ui.dsh-ui[data-theme=dark][data-radius] .arco-select-option:has(.dsh-select-option-label) { filter: none; }
.dsh-ui.dsh-ui[data-theme=dark][data-radius] .dsh-select-option-label { filter: opacity(1); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-autocomplete-popup .arco-select-highlight { color: inherit; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-dropdown-menu-item { filter: opacity(1); }
`

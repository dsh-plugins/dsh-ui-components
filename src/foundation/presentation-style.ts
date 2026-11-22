export const PRESENTATION_CSS = `
@supports (backdrop-filter: blur(1px)) {
  .dsh-ui .dsh-card--glass { --dsh-glass-default-opacity: .36; }
  .dsh-ui[data-theme="dark"] .dsh-card--glass { --dsh-glass-default-opacity: .3; }
  .dsh-ui.dsh-ui[data-theme][data-radius] .arco-card.dsh-card--glass {
    background: color-mix(in srgb, var(--surface) calc(clamp(0, var(--dsh-glass-opacity, var(--dsh-glass-default-opacity)), 1) * 100%), transparent);
    border: 1px solid color-mix(in srgb, var(--foreground) 12%, transparent);
    backdrop-filter: blur(20px) saturate(115%);
  }
}

.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-table--content-sized table {
  width: max-content;
  min-width: 100%;
  table-layout: auto;
}
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-table--content-sized :is(th, td, .arco-table-cell) { white-space: nowrap; }

.dsh-ui .dsh-table-loading { position: relative; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-table-loading[data-loading="true"] .arco-table tbody {
  filter: blur(6px);
  clip-path: inset(0 round calc(var(--radius) * 2));
}
.dsh-ui .dsh-table-loading__indicator {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  pointer-events: none;
  z-index: 10;
}

.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-menu--centered.arco-menu-horizontal > .arco-menu-inner,
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-menu--centered.arco-menu-horizontal > .arco-menu-inner > .arco-menu-overflow-wrap {
  display: flex;
  flex: 1;
  min-inline-size: 0;
  justify-content: safe center;
}
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-menu--centered.arco-menu-horizontal .arco-menu-item {
  display: inline-flex;
  inline-size: var(--dsh-menu-item-width, 112px);
  flex: 0 0 auto;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-menu--centered.arco-menu-horizontal .arco-menu-item .arco-icon { margin-inline: 0; }
.dsh-ui .dsh-menu-item-content { display: flex; width: 100%; min-width: 0; align-items: center; justify-content: space-between; gap: 8px; }
.dsh-ui .dsh-menu-item-action { display: inline-flex; align-items: center; flex-shrink: 0; }

.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-select-label-inset { --dsh-select-label-inset: 18px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-select-label-inset :is(.dsh-label, .arco-form-item-label) {
  padding-inline-start: var(--dsh-select-label-inset);
}
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-select-label-inset :is(.arco-select-view-single, .arco-select-single .arco-select-view) {
  padding-inline-start: calc(var(--dsh-select-label-inset) - 1px);
}
.dsh-ui .dsh-hint-icon {
  display: inline-grid;
  place-items: center;
  inline-size: 16px;
  block-size: 16px;
  padding: 0;
  margin-inline-start: 4px;
  vertical-align: middle;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: var(--muted);
  cursor: help;
}
.dsh-ui .dsh-hint-icon:is(:hover, :focus-visible) { color: var(--foreground); }
.dsh-ui .dsh-hint-icon:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.dsh-ui .dsh-hint-icon svg { inline-size: 12px; block-size: 12px; }

.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-scroll-shadow--page {
  --dsh-edge-shadow: color-mix(in srgb, var(--foreground) 12%, transparent);
}
.dsh-ui.dsh-ui[data-theme][data-radius][data-theme="dark"] .dsh-scroll-shadow--page {
  --dsh-edge-shadow: color-mix(in srgb, var(--color-black, var(--black)) 46%, transparent);
}
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-scroll-shadow--page:is([data-top="true"], [data-bottom="true"])::before,
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-scroll-shadow--page[data-bottom="true"]::after {
  content: none;
}
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-scroll-shadow--page[data-top="true"]::before,
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-scroll-shadow--page[data-bottom="true"]::after {
  content: '';
  position: absolute;
  inset-inline: 0;
  inline-size: auto;
  block-size: 24px;
  z-index: 1;
  pointer-events: none;
  mask-image: linear-gradient(90deg, transparent, currentColor min(48px, 14%), currentColor max(calc(100% - 48px), 86%), transparent);
}
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-scroll-shadow--page[data-top="true"]::before {
  inset-block: 0 auto;
  background: linear-gradient(var(--dsh-edge-shadow), transparent);
}
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-scroll-shadow--page[data-bottom="true"]::after {
  inset-block: auto 0;
  background: linear-gradient(transparent, var(--dsh-edge-shadow));
}

.dsh-ui.dsh-ui[data-theme][data-radius][data-overlay-frame] :is(.arco-modal-mask, .arco-drawer-mask) {
  inset: var(--dsh-overlay-inset, 0px);
  width: auto;
  height: auto;
  border-radius: var(--dsh-overlay-radius, 0px);
}

.dsh-ui .dsh-markdown {
  --dsh-markdown-panel-radius: min(32px, calc(var(--radius) * 2.5));
  --dsh-markdown-quote: color-mix(in srgb, var(--foreground) 14%, var(--surface));
  line-height: 1.65;
  overflow-wrap: anywhere;
}
.dsh-ui[data-theme="light"] .dsh-markdown { --dsh-markdown-quote: var(--dsh-markdown-quote-light); }
.dsh-ui[data-theme="dark"] .dsh-markdown { --dsh-markdown-quote: var(--dsh-markdown-quote-dark); }
.dsh-ui .dsh-markdown blockquote {
  margin-inline: 0;
  padding: 4px 14px;
  border-inline-start: 3px solid var(--dsh-markdown-quote);
  background: transparent;
  color: var(--muted);
}
.dsh-ui .dsh-markdown blockquote > :first-child { margin-block-start: 0; }
.dsh-ui .dsh-markdown blockquote > :last-child { margin-block-end: 0; }
.dsh-ui .dsh-markdown :is(pre, table) {
  max-inline-size: 100%;
  border-radius: var(--dsh-markdown-panel-radius);
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
.dsh-ui .dsh-markdown :is(pre, table):is(:hover, :focus-within) { scrollbar-color: var(--muted) transparent; }
.dsh-ui .dsh-markdown :is(pre, table)::-webkit-scrollbar-button { display: none; }
.dsh-ui .dsh-markdown pre {
  padding: 14px 16px;
  background: var(--surface-secondary);
  overflow-wrap: normal;
}
.dsh-ui .dsh-markdown :not(pre) > code {
  padding: 1px 4px;
  border-radius: 4px;
  background: var(--surface-secondary);
}
.dsh-ui .dsh-markdown table {
  display: block;
  width: fit-content;
  background: var(--surface-secondary);
  border-spacing: 0;
  padding: 0 4px 4px;
}
.dsh-ui .dsh-markdown :is(th, td) {
  padding: 10px 16px;
  text-align: start;
  white-space: nowrap;
}
.dsh-ui .dsh-markdown th { color: var(--muted); font-size: .875em; font-weight: 500; }
.dsh-ui .dsh-markdown td { background: var(--surface); }
.dsh-ui .dsh-markdown tbody tr + tr td { border-block-start: 1px solid var(--separator); }
.dsh-ui .dsh-markdown tbody tr:first-child > :first-child { border-start-start-radius: calc(var(--radius) * 2); }
.dsh-ui .dsh-markdown tbody tr:first-child > :last-child { border-start-end-radius: calc(var(--radius) * 2); }
.dsh-ui .dsh-markdown tbody tr:last-child > :first-child { border-end-start-radius: calc(var(--radius) * 2); }
.dsh-ui .dsh-markdown tbody tr:last-child > :last-child { border-end-end-radius: calc(var(--radius) * 2); }
.dsh-ui .dsh-markdown :is(li.task-list-item, li:has(> input[type="checkbox"])) { list-style: none; }
.dsh-ui .dsh-markdown li input[type="checkbox"] {
  appearance: none;
  display: inline-grid;
  place-items: center;
  inline-size: 18px;
  block-size: 18px;
  margin: 0 6px 0 0;
  vertical-align: -.2em;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--surface);
  opacity: 1;
}
.dsh-ui .dsh-markdown li input[type="checkbox"]:checked { border-color: var(--accent); background: var(--accent); }
.dsh-ui .dsh-markdown li input[type="checkbox"]:checked::after {
  content: '';
  inline-size: 8px;
  block-size: 4px;
  margin-block-start: -2px;
  border-inline-start: 2px solid var(--accent-foreground);
  border-block-end: 2px solid var(--accent-foreground);
  transform: rotate(-45deg);
}
.dsh-ui .dsh-markdown mark {
  padding: 1px 5px;
  border-radius: 5px;
  color: inherit;
  background: color-mix(in srgb, var(--warning) 34%, transparent);
  backdrop-filter: blur(8px);
  box-decoration-break: clone;
}
.dsh-ui .dsh-markdown kbd {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  padding: 2px 6px;
  border-radius: 7px;
  background: var(--surface-secondary);
  color: var(--muted);
  font: 500 .875em/1.35 var(--font-sans, system-ui);
}
.dsh-ui .dsh-markdown .markdown-alert {
  --dsh-markdown-alert: var(--accent);
  padding: 13px 15px;
  margin-block: 12px;
  border: 1px solid color-mix(in srgb, var(--dsh-markdown-alert) 32%, transparent);
  border-radius: var(--dsh-markdown-panel-radius);
  background: color-mix(in srgb, var(--dsh-markdown-alert) 17%, transparent);
  backdrop-filter: blur(18px);
}
.dsh-ui .dsh-markdown .markdown-alert-tip { --dsh-markdown-alert: var(--success); }
.dsh-ui .dsh-markdown .markdown-alert-important { --dsh-markdown-alert: var(--dsh-markdown-important); }
.dsh-ui .dsh-markdown .markdown-alert-warning { --dsh-markdown-alert: var(--warning); }
.dsh-ui .dsh-markdown .markdown-alert-caution { --dsh-markdown-alert: var(--danger); }
.dsh-ui .dsh-markdown .markdown-alert-title { color: var(--dsh-markdown-alert); font-weight: 600; }
.dsh-ui .dsh-markdown .markdown-alert > :first-child { margin-block-start: 0; }
.dsh-ui .dsh-markdown .markdown-alert > :last-child { margin-block-end: 0; }

.dsh-ui.dsh-ui[data-theme][data-radius] .arco-table-body:has(.arco-table-empty-row),
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-table:has(.arco-table-empty-row) .arco-table-content-inner {
  border-radius: calc(var(--radius) * 2);
}
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-table :is(.arco-table-content-scroll, .arco-table-content-inner, .arco-table-body) {
  --dsh-table-thumb: transparent;
  scrollbar-width: thin;
  scrollbar-color: var(--dsh-table-thumb) transparent;
}
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-table:is(:hover, :focus-within) :is(.arco-table-content-scroll, .arco-table-content-inner, .arco-table-body) {
  --dsh-table-thumb: var(--muted);
  scrollbar-color: var(--dsh-table-thumb) transparent;
}
@supports selector(::-webkit-scrollbar) {
  .dsh-ui.dsh-ui[data-theme][data-radius] .arco-table.arco-table :is(.arco-table-content-scroll, .arco-table-content-inner, .arco-table-body) { scrollbar-width: auto; scrollbar-color: auto; }
  .dsh-ui.dsh-ui[data-theme][data-radius] .arco-table :is(.arco-table-content-scroll, .arco-table-content-inner, .arco-table-body)::-webkit-scrollbar { width: 6px; height: 6px; }
  .dsh-ui.dsh-ui[data-theme][data-radius] .arco-table :is(.arco-table-content-scroll, .arco-table-content-inner, .arco-table-body)::-webkit-scrollbar-thumb { border-radius: 999px; background: var(--dsh-table-thumb); }
  .dsh-ui.dsh-ui[data-theme][data-radius] .arco-table :is(.arco-table-content-scroll, .arco-table-content-inner, .arco-table-body)::-webkit-scrollbar-track { background: transparent; }
  .dsh-ui.dsh-ui[data-theme][data-radius] .arco-table :is(.arco-table-content-scroll, .arco-table-content-inner, .arco-table-body)::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}

.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-spin--blur.arco-spin-loading { overflow: clip; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-spin--blur.arco-spin-loading > .arco-spin-children:not(:has(> div > .arco-card:only-child)),
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-spin--blur.arco-spin-loading > .arco-spin-children > div > .arco-card:only-child > :is(.arco-card-header, .arco-card-body) { filter: blur(8px); }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-spin--blur > .arco-spin-loading-layer { background: transparent; }

.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-scroll-shadow--page .dshl-scrollbar-viewport { mask-image: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-scroll-shadow--page .dshl-scrollbar-thumb { z-index: 2; opacity: 0; border-radius: 999px; transition: opacity 150ms; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-scroll-shadow--page:is(:hover, :focus-within, [data-scrolling], :has(.dshl-scrollbar-thumb:active)) .dshl-scrollbar-thumb { opacity: 1; }
.dsh-ui.dsh-ui[data-theme][data-radius][data-motion="reduced"] .dsh-scroll-shadow--page .dshl-scrollbar-thumb { transition: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-overlay-scroll--gutter > .dshl-scrollbar-viewport { margin-inline-end: 16px; }

.dsh-ui.dsh-ui[data-theme][data-radius][data-overlay-frame] .arco-message-wrapper {
  inset-inline: var(--dsh-overlay-inset, 0px);
  width: auto;
}
.dsh-ui.dsh-ui[data-theme][data-radius][data-overlay-frame] :is(.arco-message-wrapper-top, .arco-notification-wrapper-topLeft, .arco-notification-wrapper-topRight, .dsh-toast-region[data-position^="top"]) {
  top: calc(16px + var(--dsh-overlay-inset, 0px));
}
.dsh-ui.dsh-ui[data-theme][data-radius][data-overlay-frame] :is(.arco-message-wrapper-bottom, .arco-notification-wrapper-bottomLeft, .arco-notification-wrapper-bottomRight, .dsh-toast-region[data-position^="bottom"]) {
  bottom: calc(16px + var(--dsh-overlay-inset, 0px));
}
.dsh-ui.dsh-ui[data-theme][data-radius][data-overlay-frame] :is(.arco-notification-wrapper-topLeft, .arco-notification-wrapper-bottomLeft, .dsh-toast-region[data-position$="Left"]) {
  left: calc(16px + var(--dsh-overlay-inset, 0px));
}
.dsh-ui.dsh-ui[data-theme][data-radius][data-overlay-frame] :is(.arco-notification-wrapper-topRight, .arco-notification-wrapper-bottomRight, .dsh-toast-region[data-position$="Right"]) {
  right: calc(16px + var(--dsh-overlay-inset, 0px));
}
.dsh-ui.dsh-ui[data-theme][data-radius][data-overlay-frame] :is(.arco-notification-wrapper, .dsh-toast-region) {
  width: min(460px, calc(100vw - 32px - 2 * var(--dsh-overlay-inset, 0px)));
}

/* 同一行内的控件按外框计算高度。多行选择与标签输入仍可随内容增高。 */
.dsh-ui.dsh-ui[data-theme][data-radius] {
  --dsh-field-height-sm: 28px;
  --dsh-field-height-md: 36px;
  --dsh-field-height-lg: 44px;
}
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-input:not(.arco-verification-code-input), .arco-input-inner-wrapper, .arco-input-number, .arco-select-single > .arco-select-view, .arco-cascader-single > .arco-cascader-view, .arco-tree-select-single > .arco-tree-select-view) {
  box-sizing: border-box;
  height: var(--dsh-control-height, var(--dsh-field-height-md));
  min-height: 0;
  padding-block: 0;
}
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-input-size-mini, .arco-input-inner-wrapper-mini, .arco-input-number-size-mini, .arco-select-size-mini, .arco-cascader-size-mini, .arco-tree-select-size-mini, .arco-input-group-wrapper-mini.arco-autocomplete) { --dsh-control-height: 24px; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-input-size-small, .arco-input-inner-wrapper-small, .arco-input-number-size-small, .arco-select-size-small, .arco-cascader-size-small, .arco-tree-select-size-small, .arco-input-group-wrapper-small.arco-autocomplete) { --dsh-control-height: var(--dsh-field-height-sm); }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-input-size-large, .arco-input-inner-wrapper-large, .arco-input-number-size-large, .arco-select-size-large, .arco-cascader-size-large, .arco-tree-select-size-large, .arco-input-group-wrapper-large.arco-autocomplete) { --dsh-control-height: var(--dsh-field-height-lg); }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-input-group-wrapper.arco-input-number, .arco-autocomplete.arco-input-group-wrapper) :is(.arco-input-group, .arco-input-inner-wrapper, .arco-input-inner-wrapper > input) { height: 100%; min-height: 0; }
/* 有前后缀或清除按钮时，外框负责底色、间距与焦点提示；输入元素只排文字。 */
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-input-inner-wrapper > input.arco-input {
  min-width: 0; min-height: 0; height: 100%; padding: 0; border: 0; background: transparent; outline: 0; box-shadow: none;
}
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-input-inner-wrapper-error {
  outline: 1px solid var(--danger);
}
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-input-inner-wrapper-error:focus-within {
  outline: 0; box-shadow: 0 0 0 2px var(--danger), var(--field-shadow);
}
.dsh-ui.dsh-ui[data-theme][data-radius] input.arco-input:not(.arco-verification-code-input):not(.arco-input-inner-wrapper > input) { border-width: 1px; border-style: solid; }
.dsh-ui.dsh-ui[data-theme][data-radius] input.arco-input:not(:focus, .arco-input-error, .arco-verification-code-input, .arco-input-inner-wrapper > input) { border-color: var(--border); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-autocomplete.arco-input-group-wrapper { height: var(--dsh-control-height, var(--dsh-field-height-md)); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select-single { display: inline-flex; vertical-align: middle; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-select-single > .arco-select-view { flex: 1; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-select-single, .arco-cascader-single, .arco-tree-select-single) > :is(.arco-select-view, .arco-cascader-view, .arco-tree-select-view) {
  box-sizing: border-box; height: var(--dsh-control-height, var(--dsh-field-height-md)); min-height: 0; padding-block: 0;
}
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-cascader-single, .arco-tree-select-single):not([class*="-disabled"],[class*="-error"]) > :is(.arco-cascader-view, .arco-tree-select-view) {
  background: var(--surface-secondary); border: 1px solid var(--border); border-radius: calc(var(--radius) * 3);
}
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-textarea[class*="dsh-textarea-"] {
  box-sizing: border-box; min-height: 72px; border-width: 1px; border-style: solid;
}
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-textarea.dsh-textarea-sm { min-height: 60px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-textarea.dsh-textarea-lg { min-height: 96px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-mentions :is(.arco-mentions-textarea, .arco-mentions-measure) {
  padding: 8px 12px; font-family: inherit; font-size: 14px; line-height: 20px;
}
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-mentions .arco-mentions-textarea {
  box-sizing: border-box; min-height: 0; color: var(--field-foreground); background: var(--field-background);
  border: var(--field-border-width) solid var(--field-border); border-radius: var(--field-radius); box-shadow: var(--field-shadow);
}
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-mentions .arco-mentions-textarea[rows="1"] { min-height: var(--dsh-field-height-md); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-mentions .arco-mentions-textarea:not(:disabled):hover { background: var(--field-hover); border-color: var(--field-border-hover); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-mentions .arco-mentions-textarea:not(:disabled):focus { background: var(--field-focus); border-color: var(--focus); box-shadow: inset 0 0 0 1px var(--focus); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-mentions .arco-mentions-textarea.arco-textarea-error { outline: 1px solid var(--danger); outline-offset: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-mentions .arco-mentions-textarea:disabled { background: var(--default); color: var(--muted); box-shadow: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-switch.arco-switch-small { width: 32px; min-width: 32px; height: 16px; --switch-thumb-offset: calc(100% - 18.5px); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-switch-small .arco-switch-dot { width: 16.5px; height: 12px; }
.dsh-ui.dsh-ui[data-theme][data-radius] :is(label.arco-checkbox, label.arco-radio) { min-height: 20px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-picker { border-width: 1px; border-style: solid; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-hero-input-tag.arco-input-tag-size-small { min-height: 32px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-hero-input-tag.arco-input-tag-size-large { min-height: 44px; }
`

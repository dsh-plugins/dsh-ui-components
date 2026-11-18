/** 日期面板使用官方 HeroUI 3.2.7 布局，随 Provider 注入。 */
export const PICKER_OVERLAY_CSS = String.raw`
/* HeroUI 3.2.7 Calendar/RangeCalendar 的布局与状态；所有规则仅在 Provider 内生效。 */
.dsh-ui.dsh-ui[data-theme][data-radius] :is(.arco-picker-container,.arco-picker-range-container):has(.dsh-picker-popover) { border: 0; padding: 0; background: transparent; border-radius: 0; box-shadow: none; overflow: visible; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-picker-popover { box-sizing: border-box; width: 276px; padding: 12px; border: 0; border-radius: min(32px, calc(var(--radius) * 2.5)); background: var(--overlay); color: var(--foreground); box-shadow: var(--overlay-shadow); font-size: 16px; line-height: 24px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-picker-popover--range { width: 552px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar { position: relative; width: 252px; max-width: 252px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar--range { width: 528px; max-width: 528px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar button { box-sizing: border-box; font-family: inherit; cursor: var(--cursor-interactive); border: 0; padding: 0; outline: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar__header { display: flex; align-items: center; justify-content: space-between; height: 40px; padding: 0 2px 16px; box-sizing: border-box; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar__nav { display: flex; align-items: center; justify-content: center; flex: 0 0 24px; width: 24px; height: 24px; border-radius: 16px; background: transparent; color: var(--accent-soft-foreground); }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar__nav svg { width: 16px; height: 16px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar__year-trigger { display: flex; align-items: center; justify-content: flex-start; flex: 1; height: 20px; gap: 4px; margin: 0; border-radius: 8px; background: transparent; color: inherit; font-size: 14px; font-weight: 500; line-height: 20px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar__year-trigger svg { width: 12px; height: 12px; color: var(--accent-soft-foreground); }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar__year-trigger[data-open] { color: var(--accent-soft-foreground); }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar__year-trigger[data-open] svg { transform: rotate(90deg); }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar__heading { flex: 1; font-size: 14px; font-weight: 500; line-height: 20px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar--range .dsh-calendar__header { position: relative; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; padding-inline: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar--range .dsh-calendar__heading { justify-self: center; background: transparent; color: inherit; text-align: center; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar--range .dsh-calendar__nav { position: absolute; inset-block-start: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar--range .dsh-calendar__nav:first-child { inset-inline-start: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar--range .dsh-calendar__nav:last-child { inset-inline-end: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar__grids { display: flex; align-items: flex-start; gap: 24px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar__grid { display: grid; flex: 0 0 252px; grid-template-columns: repeat(7, minmax(0, 1fr)); width: 252px; border: 0; border-collapse: collapse; border-spacing: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar__grid :is(thead, tbody, tr) { display: contents; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar__grid td { padding: 0; border: 0; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar__grid tbody > tr:first-child > td { margin-top: 4px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar__weekday { display: block; min-width: 0; padding: 0 0 8px; border: 0; text-align: center; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; color: var(--muted); font-size: 12px; line-height: 16px; font-weight: 500; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar .dsh-calendar__cell { position: relative; display: flex; align-items: center; justify-content: center; width: 100%; height: 36px; margin: 0; padding: 0; border: 0; border-radius: 24px; background: transparent; color: inherit; text-align: center; font-size: 14px; line-height: 20px; font-weight: 500; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar:not(.dsh-calendar--range) .dsh-calendar__cell[data-today] { background: var(--accent-soft); color: var(--accent-soft-foreground); }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar .dsh-calendar__cell[data-selected] { background: var(--accent); color: var(--accent-foreground); }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar .dsh-calendar__cell[data-outside-month] { color: var(--muted); opacity: 0.5; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar .dsh-calendar__cell[data-disabled] { opacity: var(--disabled-opacity); text-decoration: line-through; cursor: var(--cursor-disabled); }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar--range .dsh-calendar__cell { margin: 2px 0; height: 36px; background: transparent; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar__cell-button { display: flex; align-items: center; justify-content: center; width: 100%; height: 36px; border-radius: 24px; color: var(--foreground); }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar--range .dsh-calendar__cell[data-selected]:not([data-outside-month]) { border-radius: 0; background: var(--accent-soft); }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar--range .dsh-calendar__cell[data-today] .dsh-calendar__cell-button { background: var(--accent-soft); color: var(--accent-soft-foreground); }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar--range .dsh-calendar__cell:is([data-selection-start], [data-selection-end]):not([data-outside-month]) .dsh-calendar__cell-button { background: var(--accent); color: var(--accent-foreground); }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar--range :is(td:first-child, td:not(:has(> .dsh-calendar__cell[data-selected])) + td) > .dsh-calendar__cell[data-selected] { border-start-start-radius: 8px; border-end-start-radius: 8px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar--range td:not(:has(+ td > .dsh-calendar__cell[data-selected])) > .dsh-calendar__cell[data-selected] { border-start-end-radius: 8px; border-end-end-radius: 8px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar--range .dsh-calendar__cell[data-selection-start] { border-start-start-radius: 24px !important; border-end-start-radius: 24px !important; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar--range .dsh-calendar__cell[data-selection-end] { border-start-end-radius: 24px !important; border-end-end-radius: 24px !important; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar[data-year-open] :is(.dsh-calendar__nav,.dsh-calendar__heading--next) { visibility: hidden; pointer-events: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar[data-year-open] .dsh-calendar__grids { visibility: hidden; pointer-events: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar__years { position: absolute; inset-inline: 0; display: grid; grid-template-columns: repeat(3, 1fr); align-content: start; gap: 4px; padding-right: 4px; padding: 4px; box-sizing: border-box; overflow-y: auto; scrollbar-width: var(--scrollbar-width); scrollbar-color: var(--scrollbar-color); scrollbar-gutter: var(--scrollbar-gutter); will-change: opacity; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar__year { display: inline-flex; align-items: center; justify-content: center; height: 32px; transform: translateZ(0); padding-inline: 10px !important; border-radius: 24px; background: transparent; color: inherit; font-size: 14px; line-height: 20px; font-weight: 500; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar__year[data-selected] { background: var(--accent); color: var(--accent-foreground); }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar :is(.dsh-calendar__nav, .dsh-calendar__heading, .dsh-calendar__year-trigger, .dsh-calendar__year, .dsh-calendar__cell):focus-visible { outline: none; box-shadow: 0 0 0 2px var(--background), 0 0 0 4px var(--focus); z-index: 2; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar:not(.dsh-calendar--range) .dsh-calendar__cell:focus-visible { z-index: auto; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar--range .dsh-calendar__cell:focus-visible { outline: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar--range .dsh-calendar__cell:focus-visible .dsh-calendar__cell-button { outline: none; box-shadow: 0 0 0 2px var(--background), 0 0 0 4px var(--focus); }
@media (hover: hover) {
  .dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar__nav:hover, .dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar__year:not([data-selected]):hover, .dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar:not(.dsh-calendar--range) .dsh-calendar__cell:not([data-selected]):hover { background: var(--default); }
  .dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar--range .dsh-calendar__cell:not([data-selected],[data-outside-month]):hover .dsh-calendar__cell-button { background: var(--default); }
}

.dsh-ui.dsh-ui[data-theme][data-radius] .arco-picker { box-sizing: border-box; height: 36px; min-height: 36px; padding: 4px 12px; border-width: var(--border-width-field); color: var(--field-foreground); }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-picker input { color: var(--field-foreground); height: 20px; line-height: 20px; padding: 0; }

/* 年份面板按用户确认保留官方原生滚动条占位；官方改用无占位滚动后移除此例外。 */
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar__years { padding-right: 4px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .arco-picker-range { border-width: var(--border-width-field); }

.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-date-input { box-sizing: border-box; display: flex; align-items: center; height: 36px; min-width: 0; width: 100%; border: var(--border-width-field) solid var(--field-border); border-radius: calc(var(--radius) * 1.5); background: var(--field-background); box-shadow: var(--field-shadow); color: var(--field-foreground); font-size: 14px; line-height: 20px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-date-input__field { display: flex; align-items: center; flex-shrink: 0; gap: 1px; padding: 8px 8px 8px 12px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-date-input__segment { display: block; padding: 0 2px; border-radius: calc(var(--radius) * .75); outline: none; caret-color: transparent; white-space: nowrap; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-date-input__segment:focus { background: var(--accent); color: var(--accent-foreground); }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-date-input__literal, .dsh-ui.dsh-ui[data-theme][data-radius] .dsh-date-input__separator, .dsh-ui.dsh-ui[data-theme][data-radius] .dsh-date-input__segment[data-placeholder] { color: var(--muted); }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-date-input__trigger { display: flex; align-items: center; justify-content: center; flex-shrink: 0; width: 24px; height: 24px; padding: 4px; margin: 0; border: 0; border-radius: calc(var(--radius) * 1.5); background: transparent; color: var(--muted); font: inherit; cursor: pointer; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-date-input__indicator { display: flex; align-items: center; justify-content: center; width: 16px; height: 16px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-date-input__indicator svg { width: 14px; height: 14px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-date-input__clear { margin-left: auto; border: 0; color: var(--muted); background: transparent; cursor: pointer; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-date-input[data-disabled] { opacity: .5; pointer-events: none; }

.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-date-input__separator { padding-inline: 4px; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar__cell-button { border-radius: 9999px; }

.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar--range .dsh-calendar__cell:focus-visible { box-shadow: none; }

/* 深色浮层的文字单独合成，避免透明字缘使用 LCD 子像素混色。 */
.dsh-ui.dsh-ui[data-theme=dark][data-radius] :is(.dsh-calendar__year-trigger span,.dsh-calendar__heading,.dsh-calendar__cell,.dsh-calendar__cell-button,.dsh-calendar__nav) { transform: translateZ(0); }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar__cell-button { will-change: scale; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar__cell { will-change: scale; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar--range :is(.dsh-calendar__cell,.dsh-calendar__cell-button) { transform: translateZ(0); }
.dsh-ui.dsh-ui[data-theme=dark][data-radius] .dsh-calendar__weekday { background: var(--overlay); filter: opacity(1); }
.dsh-ui.dsh-ui[data-theme=dark][data-radius] .dsh-calendar[data-year-open] .dsh-calendar__year-trigger span { transform: none; }


.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-hero-calendar { width: 252px; border: 0; background: transparent; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar-standalone { width: 252px; padding: 0; border-radius: 0; background: transparent; box-shadow: none; }
.dsh-ui.dsh-ui[data-theme][data-radius] .dsh-calendar-standalone .dsh-calendar__weekday { background: transparent; filter: none; }

.dsh-ui.dsh-ui[data-theme=dark][data-radius] .dsh-calendar-standalone .dsh-calendar__year-trigger span { transform: none; }
`

/** 选择控件共享的选项；文本用于键盘检索及可访问名称。 */
export interface SelectionOption {
  value: string | number
  label: string
  description?: string
  disabled?: boolean
}

/** 单选和多选的 Vue 模型值。 */
export type SelectionValue = string | number | Array<string | number> | undefined

/** 按方向或首尾键寻找可用选项，空集合返回 -1。 */
export function nextEnabledIndex(options: readonly SelectionOption[], current: number, key: string, loop = true): number {
  const enabled = options.flatMap((option, index) => option.disabled ? [] : [index])
  if (enabled.length === 0) { return -1 }
  if (key === 'Home') { return enabled[0]! }
  if (key === 'End') { return enabled[enabled.length - 1]! }
  const direction = key === 'ArrowDown' || key === 'ArrowRight' ? 1 : key === 'ArrowUp' || key === 'ArrowLeft' ? -1 : 0
  if (direction === 0) { return current }
  const position = enabled.indexOf(current)
  if (position === -1) { return direction > 0 ? enabled[0]! : enabled[enabled.length - 1]! }
  const next = position + direction
  return enabled[loop ? (next + enabled.length) % enabled.length : Math.max(0, Math.min(enabled.length - 1, next))]!
}

/** 从当前项之后循环匹配文字前缀，跳过禁用项。 */
export function findByText(options: readonly SelectionOption[], current: number, query: string): number {
  const text = query.trim().toLocaleLowerCase()
  if (text.length === 0) { return -1 }
  for (let offset = 1; offset <= options.length; offset += 1) {
    const index = (current + offset + options.length) % options.length
    const option = options[index]!
    if (!option.disabled && option.label.toLocaleLowerCase().startsWith(text)) { return index }
  }
  return -1
}

/** 切换单项选择；多选保留顺序，必选模式阻止移除最后一项。 */
export function toggleSelection(value: SelectionValue, key: string | number, multiple: boolean, allowEmpty: boolean): SelectionValue {
  const keys = Array.isArray(value) ? value : value === undefined ? [] : [value]
  const selected = keys.includes(key)
  if (!multiple) { return selected && allowEmpty ? undefined : key }
  if (selected) { return !allowEmpty && keys.length === 1 ? value : keys.filter(item => item !== key) }
  return [...keys, key]
}

/** 过滤验证码输入，并保留前导零。 */
export function normalizeOtp(value: string, length: number, numeric: boolean): string {
  return (numeric ? value.replace(/[^0-9]/g, '') : value).slice(0, length)
}

/** 将粘贴文本插入当前选区；过滤后长度仍受验证码上限约束。 */
export function insertOtp(value: string, text: string, start: number, end: number, length: number, numeric: boolean): { value: string; cursor: number } {
  const inserted = normalizeOtp(text, length, numeric)
  const next = normalizeOtp(value.slice(0, start) + inserted + value.slice(end), length, numeric)
  return { value: next, cursor: Math.min(start + inserted.length, next.length) }
}

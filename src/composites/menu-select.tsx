/**
 * 与宿主选择器外观一致的下拉。
 *
 * 原生 `<select>` 的弹层由操作系统绘制，无法跟随 DSH 主题，因此设置页里需要
 * 一个自绘下拉。这个组件用触发器按钮加一个挂在同一 `.dsh-ui` 容器内的浮层实现，
 * 视觉与宿主自己的选择器一致：32px 高的描边触发器、圆角 12 的弹层、菜单材质
 * 与浮起阴影。
 *
 * 键盘行为：↑/↓ 在选项间移动，Home/End 跳到首尾，Enter 选中，Escape 关闭并
 * 把焦点还给触发器。
 *
 * @module @dsh-plugin/dsh-ui-components/composites/menu-select
 */
import * as React from 'react'
import { cx } from '../foundation/style.js'
import { Icon } from '../foundation/icons.js'
import { injectCompositeStyles } from './styles.js'

/** 一个选项。 */
export interface MenuSelectOption {
  /** 提交值。 */
  value: string
  /** 展示文本。 */
  label: string
  /** 不可选。 */
  disabled?: boolean
}

/** {@link MenuSelect} 的 props。 */
export interface MenuSelectProps {
  /** 选项列表。 */
  options: readonly MenuSelectOption[]
  /** 当前值。 */
  value?: string
  /** 无选中项时显示的占位文本。 */
  placeholder?: string
  /** 选中项变化时回调。 */
  onChange?: (value: string) => void
  /** 禁用。 */
  disabled?: boolean
  /** 输入框 id，用于与外部标签关联。 */
  id?: string
  /** 触发器与弹层的可访问名称。 */
  label?: string
  /** 追加类名。 */
  className?: string
}

/** 弹层向上展开时的最大高度预算，与样式表里的 `max-height` 一致。 */
const MAX_POPUP_HEIGHT = 264

/**
 * 宿主风格的下拉选择。
 *
 * @param props - 见 {@link MenuSelectProps}。
 * @returns 带触发器与浮层的下拉元素。
 */
export function MenuSelect({
  options,
  value,
  placeholder,
  onChange,
  disabled,
  id,
  label,
  className,
}: MenuSelectProps): React.ReactElement {
  injectCompositeStyles()
  const [open, setOpen] = React.useState(false)
  const [above, setAbove] = React.useState(false)
  const [activeIndex, setActiveIndex] = React.useState(-1)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const wrapperRef = React.useRef<HTMLDivElement>(null)

  const selectedIndex = options.findIndex(option => option.value === value)
  const selected = selectedIndex >= 0 ? options[selectedIndex] : undefined
  const text = selected === undefined ? placeholder ?? '' : selected.label

  /**
   * 根据触发器在窗口中的位置决定弹层向上还是向下展开。
   */
  const updatePlacement = React.useCallback((): void => {
    const trigger = triggerRef.current
    if (trigger === null) return
    const rect = trigger.getBoundingClientRect()
    const below = window.innerHeight - rect.bottom - 12
    const above = rect.top - 12
    setAbove(below < Math.min(MAX_POPUP_HEIGHT, above))
  }, [])

  /**
   * 关闭弹层并把焦点还给触发器。
   *
   * @param refocus - 是否把焦点移回触发器。
   */
  const close = React.useCallback((refocus: boolean): void => {
    setOpen(false)
    if (refocus) triggerRef.current?.focus()
  }, [])

  /** 打开时重置高亮项并监听外部点击。 */
  React.useEffect(() => {
    if (!open) return undefined
    updatePlacement()
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0)
    window.addEventListener('scroll', updatePlacement, true)
    window.addEventListener('resize', updatePlacement)

    /**
     * 点击弹层与触发器之外时关闭。
     *
     * @param event - 指针事件。
     */
    const onPointerDown = (event: PointerEvent): void => {
      const wrapper = wrapperRef.current
      if (wrapper !== null && event.target instanceof Node && !wrapper.contains(event.target)) close(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.removeEventListener('scroll', updatePlacement, true)
      window.removeEventListener('resize', updatePlacement)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open, selectedIndex, updatePlacement, close])

  /**
   * 选中一个选项并关闭。
   *
   * @param option - 被选中的选项。
   */
  const choose = (option: MenuSelectOption): void => {
    if (option.disabled === true) return
    onChange?.(option.value)
    close(true)
  }

  /**
   * 触发器与弹层共用的键盘处理。
   *
   * @param event - 键盘事件。
   */
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (disabled === true) return
    if (!open) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        setOpen(true)
      }
      return
    }

    const enabled = options.map((option, index) => (option.disabled === true ? -1 : index)).filter(index => index >= 0)
    if (enabled.length === 0) return
    const position = enabled.indexOf(activeIndex)

    if (event.key === 'Escape') {
      event.preventDefault()
      close(true)
      return
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      const option = options[activeIndex]
      if (option !== undefined) choose(option)
      return
    }

    let next: number | undefined
    if (event.key === 'ArrowDown') next = enabled[(position + 1) % enabled.length]
    else if (event.key === 'ArrowUp') next = enabled[(position - 1 + enabled.length) % enabled.length]
    else if (event.key === 'Home') next = enabled[0]
    else if (event.key === 'End') next = enabled[enabled.length - 1]
    if (next === undefined) return
    event.preventDefault()
    setActiveIndex(next)
  }

  return (
    <div ref={wrapperRef} className={cx('dsh-menu-select', className)} onKeyDown={onKeyDown}>
      <button
        ref={triggerRef}
        type="button"
        id={id}
        disabled={disabled === true}
        className="dsh-menu-select__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label === undefined ? text : `${label}: ${text}`}
        title={text}
        onClick={() => setOpen(previous => !previous)}
      >
        <span className={cx('dsh-menu-select__text', selected === undefined && 'dsh-menu-select__text--placeholder')}>{text}</span>
        <span className="dsh-menu-select__caret" aria-hidden="true">
          <Icon name="ChevronDown" size={14} />
        </span>
      </button>
      {open ? (
        <div
          role="listbox"
          aria-label={label}
          className={cx('dsh-menu-select__popup', above && 'dsh-menu-select__popup--above')}
        >
          {options.map((option, index) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={option.value === value}
              disabled={option.disabled === true}
              className={cx(
                'dsh-menu-select__option',
                option.value === value && 'dsh-menu-select__option--selected',
                index === activeIndex && 'dsh-menu-select__option--active',
              )}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => choose(option)}
            >
              {option.label}
              {option.value === value ? (
                <span className="dsh-menu-select__check" aria-hidden="true">
                  <Icon name="Check" size={14} />
                </span>
              ) : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

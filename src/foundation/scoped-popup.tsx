import * as React from 'react'
import { Arco } from '@dsh-plugin/dsh-loader/client'
import { useDshPopupContainer } from './provider.js'

/**
 * Arco Trigger 的 Portal 在 React 18 StrictMode 首次 effect 清理时移除自身容器。
 * 首次 effect 完成后才显示面板，使 controlled/defaultVisible 均能正常挂载；
 * 业务值、事件、实例引用和静态子组件保持原接口。
 */
export function wrapScopedPopup<C extends React.ElementType>(Component: C, triggerDefaults: Record<string, unknown> = {}, selection = false, nestedOnly = false): C {
  const Wrapped = React.forwardRef<unknown, Record<string, unknown>>((props, ref) => {
    const [ready, setReady] = React.useState(false)
    React.useEffect(() => { setReady(true) }, [])
    const [query, setQuery] = React.useState('')
    const selectInstance = React.useRef<{ dom?: HTMLElement } | null>(null)
    const bindSelect = React.useCallback((value: { dom?: HTMLElement } | null) => {
      selectInstance.current = value
      if (typeof ref === 'function') { ref(value) }
      else if (ref) { ref.current = value }
    }, [ref])
    // 非搜索多选将内置 input 设为 disabled，使用不占位的标签激活按钮转交焦点。
    const labelButton = selection && typeof props.id === 'string' && props.mode === 'multiple' && !props.showSearch && !props.allowCreate
    React.useEffect(() => {
      if (labelButton || !selection || typeof props.id !== 'string' || !props.id) { return }
      const root = selectInstance.current?.dom
      const input = root?.querySelector<HTMLInputElement>('input:not([type="hidden"])')
      const target = input ?? root
      if (!target) { return }
      target.id = props.id
      return () => { if (target.id === props.id) { target.removeAttribute('id') } }
    }, [labelButton, selection, props.id, props.mode, props.triggerElement])
    const [localValue, setLocalValue] = React.useState(props.defaultValue)
    const config = React.useContext(Arco.ConfigProvider.ConfigContext)
    const container = useDshPopupContainer()
    const trigger = props.triggerProps as Record<string, unknown> | undefined
    const anchor = React.useRef<HTMLElement | null>(null)
    const getPopupContainer = React.useCallback((node: HTMLElement) => {
      anchor.current = node
      const target = (trigger?.getPopupContainer ?? props.getPopupContainer) as ((node: HTMLElement) => HTMLElement) | undefined
      return target ? target(node) : container()
    }, [container, props.getPopupContainer, trigger?.getPopupContainer])
    const arrowOffset = triggerDefaults.showArrow === false && trigger?.showArrow === true && (triggerDefaults.popupAlign as Record<string, number> | undefined)?.top === 3
      ? { popupAlign: { top: 7, bottom: 7, left: 7, right: 7 } } : {}
    const defaults = { top: 8, bottom: 8, left: 8, right: 8, ...(triggerDefaults.popupAlign as Record<string, number> | undefined), ...arrowOffset.popupAlign }
    // 默认浮层容器原点为视口原点；自定义容器保留调用方的坐标规则。
    // React Aria 在主轴向下取整，访问器在 Arco 每次重新定位时读取当前锚点。
    const popupAlign = trigger?.popupAlign ?? (trigger?.getPopupContainer || props.getPopupContainer || trigger?.alignPoint ? defaults : {
      get top() { const value = anchor.current?.getBoundingClientRect().top ?? 0; return defaults.top + value - Math.ceil(value) },
      get bottom() { const value = anchor.current?.getBoundingClientRect().bottom ?? 0; return defaults.bottom + Math.floor(value) - value },
      get left() { const value = anchor.current?.getBoundingClientRect().left ?? 0; return defaults.left + value - Math.ceil(value) },
      get right() { const value = anchor.current?.getBoundingClientRect().right ?? 0; return defaults.right + Math.floor(value) - value },
    })
    const selectionProps: Record<string, unknown> = {}
    if ((Component as React.ElementType) === Arco.Popconfirm) {
      for (const key of ['cancelButtonProps', 'okButtonProps'] as const) {
        selectionProps[key] = { size: 'small', ...((props[key] === undefined ? config.componentConfig?.Popconfirm?.[key] : props[key]) as Record<string, unknown> | undefined) }
      }
    }
    if ((Component as React.ElementType) === Arco.Popconfirm && props.icon === undefined && config.componentConfig?.Popconfirm?.icon === undefined) {
      selectionProps.icon = <svg viewBox="0 0 16 16" width="16" height="16" fill="none" style={{ color: 'var(--accent)' }} aria-hidden><path d="M8 13.5a5.5 5.5 0 1 0 0-11a5.5 5.5 0 0 0 0 11M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14m1-9.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-.25 3a.75.75 0 0 0-1.5 0V11a.75.75 0 0 0 1.5 0z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg>
    }
    const arrowProps = trigger?.arrowProps as React.HTMLAttributes<HTMLDivElement> | undefined
    const arrowBackground = arrowProps?.style?.backgroundColor ?? arrowProps?.style?.background ?? props.color
    const tooltipArrow = (Component as React.ElementType) === Arco.Tooltip && trigger?.showArrow === true && arrowProps?.children === undefined && !arrowProps?.className
      ? { ...arrowProps, children: <svg className="dsh-tooltip-arrow" aria-hidden width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ fill: arrowBackground === undefined ? undefined : String(arrowBackground) }}><path d="M0 0C5.48483 8 6.5 8 12 0Z" /></svg> } : undefined
    if ((Component as React.ElementType) === Arco.AutoComplete) {
      const inputProps = props.inputProps as Record<string, unknown> | undefined
      const opened = (props.triggerProps as Record<string, unknown> | undefined)?.popupVisible
      selectionProps.inputProps = { ...inputProps, suffix: inputProps?.suffix ?? <span className={`dsh-combobox-indicator ${opened ? 'dsh-combobox-indicator--open' : ''}`} aria-hidden /> }
      if (Array.isArray(props.data) && !props.data.length) {
        selectionProps.dropdownRender = () => <div className="dsh-autocomplete-empty"><span className="dsh-autocomplete-empty__text">{(props.dropdownRender as ((menu: React.ReactNode) => React.ReactNode) | undefined)?.(null) ?? (config.locale?.locale?.startsWith('zh') ? '无结果' : 'No results found')}</span></div>
      }
    }
    if (selection && props.showSearch && Array.isArray(props.options) && props.dropdownRender === undefined) {
      const text = String(props.inputValue ?? query)
      selectionProps.showSearch = false
      // 保留原始 options，让 Arco 用真实的 Option 元素执行过滤和渲染。
      selectionProps.inputValue = text
      selectionProps.placeholder = props.placeholder ?? 'Select an item'
      selectionProps.dropdownRender = (menu: React.ReactNode) => <><div className="dsh-select-search"><div className="dsh-select-search__group"><input type="search" aria-label="搜索" value={text} autoFocus onChange={event => {
        const value = event.target.value
        setQuery(value)
        for (const name of ['onInputValueChange', 'onSearch']) { (props[name] as ((value: string, reason: string) => void) | undefined)?.(value, 'manual') }
      }} onKeyDown={event => {
        if (!['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(event.key)) { return }
        event.preventDefault()
        selectInstance.current?.dom?.dispatchEvent(new KeyboardEvent('keydown', { key: event.key, bubbles: true }))
      }} /></div></div>{menu}</>
    }
    if (selection && props.mode === 'multiple' && props.renderTag === undefined && !props.showSearch) {
      const values = (props.value ?? localValue ?? []) as unknown[]
      const parts = new Intl.ListFormat(config.locale?.locale ?? 'zh-CN').formatToParts(values.map((_, index) => String(index)))
      const separators = parts.filter(part => part.type === 'literal').map(part => part.value)
      selectionProps.showSearch = false
      selectionProps.renderTag = ({ value, label }: { value: unknown; label: React.ReactNode }) => {
        const index = values.findIndex(item => (typeof item === 'object' && item ? (item as { value: unknown }).value : item) === value)
        return <span className="dsh-select-summary">{label}{separators[index] ?? ''}</span>
      }
      selectionProps.onChange = (value: unknown, ...args: unknown[]) => { setLocalValue(value); (props.onChange as ((...args: unknown[]) => void) | undefined)?.(value, ...args) }
    }
    if (selection && !props.showSearch && props.dropdownRender === undefined) {
      const renderDropdown = selectionProps.dropdownRender as ((menu: React.ReactNode) => React.ReactNode) | undefined
      selectionProps.dropdownRender = (menu: React.ReactNode) => {
        if (React.isValidElement<{ children?: unknown }>(menu) && typeof menu.props.children === 'function') {
          const renderOption = menu.props.children as (option: React.ReactNode) => React.ReactNode
          // 只给实际选项内容建立绘制层，避免焦点环随文字一同参与透明合成。
          menu = React.cloneElement(menu, { children: (option: React.ReactNode) => {
            const rendered = renderOption(option)
            if (React.isValidElement<{ children?: React.ReactNode; value?: unknown }>(rendered) && React.isValidElement(option) && option.type === Arco.Select.Option) {
              const label = 'children' in rendered.props ? rendered.props.children : String(rendered.props.value)
              if (label !== undefined && label !== null && label !== false && !(typeof label === 'string' && !label.trim())) {
                return React.cloneElement(rendered, {}, <span className="dsh-select-option-label">{label}</span>)
              }
            }
            return rendered
          } })
        }
        return renderDropdown ? renderDropdown(menu) : menu
      }
    }
    const element = React.createElement(Component as React.ElementType, {
      ...props, ...selectionProps, ...(selection ? { ref: bindSelect, id: undefined } : { ref }),
      ...(!nestedOnly ? { ...(!ready ? { popupVisible: false } : {}), getPopupContainer } : {}),
      triggerProps: { ...triggerDefaults, ...arrowOffset, ...trigger, ...(tooltipArrow ? { arrowProps: tooltipArrow } : {}), getPopupContainer, popupAlign, ...(!ready ? { popupVisible: false } : {}) },
    })
    if (!labelButton) { return element }
    return <>{element}<button type="button" hidden id={props.id as string} disabled={props.disabled === true} onClick={() => {
      const root = selectInstance.current?.dom
      if (root && root.getAttribute('aria-disabled') !== 'true') { root.focus() }
    }} /></>
  })
  // 静态 Option/RangePicker 等入口由组件模块继续覆写为相同作用域的版本。
  for (const key of Object.keys(Component)) {
    if (['$$typeof', 'render', 'compare', 'type', 'displayName', 'defaultProps', 'propTypes'].includes(key)) { continue }
    Object.defineProperty(Wrapped, key, Object.getOwnPropertyDescriptor(Component, key)!)
  }
  return Wrapped as unknown as C
}

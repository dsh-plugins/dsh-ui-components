/**
 * JSON 树与代码块外壳。
 *
 * `JsonTree` 用于只读查看工具入参与结果，配色走宿主自己的 JSON 配色令牌；
 * `CodeBlockShell` 提供语言标签、右侧操作区与等宽内容区，供插件包裹自己的
 * 高亮结果。
 *
 * @module @dsh-plugin/dsh-ui-components/composites/data-view
 */
import * as React from 'react'
import { cx } from '../foundation/style.js'
import { Icon } from '../foundation/icons.js'
import { injectCompositeStyles } from './styles.js'

/** {@link JsonTree} 的 props。 */
export interface JsonTreeProps {
  /** 要展示的值，可以是任意可 JSON 化的数据。 */
  value: unknown
  /** 根节点的初始展开状态，默认展开。 */
  defaultExpanded?: boolean
  /** 追加类名。 */
  className?: string
}

/** 一个值的渲染种类。 */
type JsonKind = 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null'

/**
 * 判断一个值的渲染种类。
 *
 * @param value - 任意值。
 * @returns 渲染种类。
 */
function kindOf(value: unknown): JsonKind {
  if (value === null) return 'null'
  if (Array.isArray(value)) return 'array'
  const type = typeof value
  if (type === 'object') return 'object'
  if (type === 'number') return 'number'
  if (type === 'boolean') return 'boolean'
  return 'string'
}

/** 一个节点。 */
interface JsonNodeProps {
  /** 键名；根节点省略。 */
  name?: string
  /** 值。 */
  value: unknown
  /** 是否是最后一个同级节点，决定尾逗号。 */
  last: boolean
  /** 初始是否展开。 */
  defaultExpanded: boolean
  /** 缩进层级，仅用于渲染。 */
  depth: number
}

/**
 * 渲染一个 JSON 节点。
 *
 * @param props - 见 {@link JsonNodeProps}。
 * @returns 节点元素。
 */
function JsonNode({ name, value, last, defaultExpanded, depth }: JsonNodeProps): React.ReactElement {
  const kind = kindOf(value)
  const expandable = kind === 'object' || kind === 'array'
  const [expanded, setExpanded] = React.useState(defaultExpanded)
  const suffix = last ? '' : ','
  const keyPart = name === undefined ? null : <span className="dsh-json-tree__key">{name}: </span>

  if (!expandable) {
    const text = kind === 'string' ? JSON.stringify(value) : String(value)
    const className =
      kind === 'string'
        ? 'dsh-json-tree__string'
        : kind === 'number'
          ? 'dsh-json-tree__number'
          : 'dsh-json-tree__keyword'
    return (
      <div className="dsh-json-tree__row" style={{ paddingLeft: depth * 12 }}>
        <span style={{ width: 14, flex: 'none' }} />
        {keyPart}
        <span className={className}>{text}</span>
        <span className="dsh-json-tree__punct">{suffix}</span>
      </div>
    )
  }

  const entries = kind === 'array'
    ? (value as unknown[]).map((item, index) => [String(index), item] as const)
    : Object.entries(value as Record<string, unknown>)
  const open = kind === 'array' ? '[' : '{'
  const close = kind === 'array' ? ']' : '}'

  return (
    <div>
      <div className="dsh-json-tree__row" style={{ paddingLeft: depth * 12 }}>
        <button
          type="button"
          className="dsh-json-tree__toggle"
          aria-expanded={expanded}
          aria-label={expanded ? '收起' : '展开'}
          onClick={() => setExpanded(previous => !previous)}
        >
          <Icon name={expanded ? 'ChevronDown' : 'ChevronRight'} size={10} />
        </button>
        {keyPart}
        <span className="dsh-json-tree__punct">{open}</span>
        {expanded ? null : (
          <>
            <span className="dsh-json-tree__summary">{` ${entries.length} 项 `}</span>
            <span className="dsh-json-tree__punct">{close}{suffix}</span>
          </>
        )}
      </div>
      {expanded ? (
        <>
          <div className="dsh-json-tree__children">
            {entries.map(([key, item], index) => (
              <JsonNode
                key={key}
                name={kind === 'array' ? undefined : key}
                value={item}
                last={index === entries.length - 1}
                defaultExpanded={false}
                depth={depth + 1}
              />
            ))}
          </div>
          {/* 闭合括号属于当前层，必须与开括号同级缩进；放进子容器会多缩一层。 */}
          <div className="dsh-json-tree__row" style={{ paddingLeft: depth * 12 }}>
            <span style={{ width: 14, flex: 'none' }} />
            <span className="dsh-json-tree__punct">{close}{suffix}</span>
          </div>
        </>
      ) : null}
    </div>
  )
}

/**
 * 只读 JSON 树。
 *
 * @param props - 见 {@link JsonTreeProps}。
 * @returns JSON 树元素。
 */
export function JsonTree({ value, defaultExpanded = true, className }: JsonTreeProps): React.ReactElement {
  injectCompositeStyles()
  return (
    <div className={cx('dsh-json-tree', className)}>
      <JsonNode value={value} last defaultExpanded={defaultExpanded} depth={0} />
    </div>
  )
}

/** {@link CodeBlockShell} 的 props。 */
export interface CodeBlockShellProps {
  /** 语言标签，显示在横幅左侧。 */
  language?: string
  /** 横幅右侧的操作。 */
  actions?: React.ReactNode
  /** 代码内容，通常是 `<pre>` 或高亮后的节点。 */
  children?: React.ReactNode
  /** 追加类名。 */
  className?: string
}

/**
 * 代码块外壳：横幅加等宽内容区。
 *
 * @param props - 见 {@link CodeBlockShellProps}。
 * @returns 代码块元素。
 */
export function CodeBlockShell({ language, actions, children, className }: CodeBlockShellProps): React.ReactElement {
  injectCompositeStyles()
  return (
    <div className={cx('dsh-code-shell', className)}>
      {language === undefined && actions === undefined
        ? null
        : (
          <div className="dsh-code-shell__banner">
            <span className="dsh-code-shell__lang">{language}</span>
            {actions === undefined ? null : <span className="dsh-code-shell__actions">{actions}</span>}
          </div>
        )}
      <div className="dsh-code-shell__body">{children}</div>
    </div>
  )
}

/**
 * 设置页卡片与设置行。
 *
 * 这两个组件对应宿主设置页的实际结构：一张卡片包住若干行「标签 + 说明 +
 * 控件」，卡片用宿主的设置卡填充与描边令牌。插件写配置页时用它们，比直接用
 * `Card` 更贴近宿主外观。
 *
 * @module @dsh-plugin/dsh-ui-components/composites/settings
 */
import * as React from 'react'
import { cx } from '../foundation/style.js'
import { injectCompositeStyles } from './styles.js'

/** {@link SettingsCard} 的 props。 */
export interface SettingsCardProps {
  /** 卡片标题。 */
  title?: React.ReactNode
  /** 标题下方的说明。 */
  description?: React.ReactNode
  /** 卡片底部操作区，通常是保存与重置按钮。 */
  footer?: React.ReactNode
  /** 卡片内容，一般是一组 {@link SettingsRow}。 */
  children?: React.ReactNode
  /** 追加类名。 */
  className?: string
}

/**
 * 设置页中的一张卡片。
 *
 * @param props - 见 {@link SettingsCardProps}。
 * @returns 卡片元素。
 */
export function SettingsCard({ title, description, footer, children, className }: SettingsCardProps): React.ReactElement {
  injectCompositeStyles()
  return (
    <section className={cx('dsh-settings-card', className)}>
      {title === undefined ? null : <h3 className="dsh-settings-card__title">{title}</h3>}
      {description === undefined ? null : <p className="dsh-settings-card__desc">{description}</p>}
      <div className="dsh-settings-card__body">{children}</div>
      {footer === undefined ? null : <div className="dsh-settings-card__footer">{footer}</div>}
    </section>
  )
}

/** {@link SettingsRow} 的 props。 */
export interface SettingsRowProps {
  /** 行标签。 */
  label: React.ReactNode
  /** 标签下方的说明。 */
  description?: React.ReactNode
  /** 控件。 */
  children?: React.ReactNode
  /**
   * 布局。`inline` 让控件靠右，适合开关与短选择器；`stack` 让控件占满一行，
   * 适合输入框与文本域。
   */
  layout?: 'inline' | 'stack'
  /** 追加类名。 */
  className?: string
}

/**
 * 设置页中的一行。
 *
 * @param props - 见 {@link SettingsRowProps}。
 * @returns 设置行元素。
 */
export function SettingsRow({ label, description, children, layout = 'inline', className }: SettingsRowProps): React.ReactElement {
  injectCompositeStyles()
  return (
    <div className={cx('dsh-settings-row', layout === 'stack' && 'dsh-settings-row--stack', className)}>
      <div className="dsh-settings-row__text">
        <span className="dsh-settings-row__label">{label}</span>
        {description === undefined ? null : <span className="dsh-settings-row__desc">{description}</span>}
      </div>
      {children === undefined ? null : <div className="dsh-settings-row__control">{children}</div>}
    </div>
  )
}

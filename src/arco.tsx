import * as React from 'react'
import { Arco as HostArco } from '@dsh-plugin/dsh-loader/client'
import { Modal, Drawer, prepareModalOptions, type ModalConfirmOptions } from './feedback/panel.js'
import { useDshPopupContainer } from './foundation/provider.js'
import { Message, Notification } from './feedback/global.js'
import { wrapScopedPopup } from './foundation/scoped-popup.js'
import { HeroTree } from './data/hero-tree.js'
import { HeroColorPicker } from './data/hero-color.js'
import { HeroInputNumber } from './data/hero-input-number.js'
import { HeroInputTag } from './data/hero-input-tag.js'
import { HeroSpin } from './display/hero-spin.js'
import { HeroTag } from './display/hero-tag.js'
import { HeroProgress } from './feedback/hero-progress.js'
import { HeroResult } from './feedback/hero-result.js'
import { Image } from './data/info.js'
import { HeroDatePicker, HeroCalendar } from './data/hero-picker.js'

type ModalKind = 'confirm' | 'info' | 'success' | 'warning' | 'error'

/** 嵌套语言配置保留当前 Provider 的主题浮层容器。 */
function ScopedConfigProvider({ getPopupContainer, ...props }: React.ComponentPropsWithoutRef<typeof HostArco.ConfigProvider>): React.ReactElement {
  const container = useDshPopupContainer()
  return <HostArco.ConfigProvider {...props} getPopupContainer={getPopupContainer ?? container} />
}

export const ConfigProvider: typeof ScopedConfigProvider & Pick<typeof HostArco.ConfigProvider, 'ConfigContext'> =
  Object.assign(ScopedConfigProvider, { ConfigContext: HostArco.ConfigProvider.ConfigContext })

function openHookModal(api: ReturnType<typeof HostArco.Modal.useModal>[0], kind: ModalKind, options: ModalConfirmOptions, container: () => HTMLElement) {
  const open = api[kind]
  if (open === undefined) { throw new Error('调用弹窗前必须挂载 useModal 返回的 holder') }
  return open(prepareModalOptions(options, container))
}

/** 与 Arco 相同的静态弹窗操作，默认跟随宿主明暗主题。 */
const ScopedModal: typeof Modal & Pick<typeof HostArco.Modal, ModalKind | 'config' | 'destroyAll'> & { useModal: () => readonly [ReturnType<typeof HostArco.Modal.useModal>[0], React.ReactElement] } = Object.assign(Modal, {
  confirm: (options: ModalConfirmOptions) => HostArco.Modal.confirm(prepareModalOptions(options)),
  info: (options: ModalConfirmOptions) => HostArco.Modal.info(prepareModalOptions(options)),
  success: (options: ModalConfirmOptions) => HostArco.Modal.success(prepareModalOptions(options)),
  warning: (options: ModalConfirmOptions) => HostArco.Modal.warning(prepareModalOptions(options)),
  error: (options: ModalConfirmOptions) => HostArco.Modal.error(prepareModalOptions(options)),
  config: HostArco.Modal.config,
  destroyAll: HostArco.Modal.destroyAll,
  useModal() {
    const container = useDshPopupContainer()
    const [api, holder] = HostArco.Modal.useModal()
    return [{
      ...api,
      confirm: (options: ModalConfirmOptions) => openHookModal(api, 'confirm', options, container),
      info: (options: ModalConfirmOptions) => openHookModal(api, 'info', options, container),
      success: (options: ModalConfirmOptions) => openHookModal(api, 'success', options, container),
      warning: (options: ModalConfirmOptions) => openHookModal(api, 'warning', options, container),
      error: (options: ModalConfirmOptions) => openHookModal(api, 'error', options, container),
    }, holder] as const
  },
})

/** 全量 Arco 入口保留宿主组件实例，弹窗和抽屉使用 Provider 的独立主题容器。 */
const ScopedMenu = Object.assign(wrapScopedPopup(HostArco.Menu, {}, false, true), { SubMenu: wrapScopedPopup(HostArco.Menu.SubMenu, { popupAlign: { right: 8, left: 8, top: 0, bottom: 0 }, showArrow: false }, false, true) })

const scopedPopups = {
  Menu: ScopedMenu, Image,
  Select: wrapScopedPopup(HostArco.Select, {}, true), AutoComplete: wrapScopedPopup(HostArco.AutoComplete),
  Tooltip: wrapScopedPopup(HostArco.Tooltip, { showArrow: false, popupAlign: { top: 3, bottom: 3, left: 3, right: 3 } }), Popover: wrapScopedPopup(HostArco.Popover, { showArrow: false }),
  Popconfirm: wrapScopedPopup(HostArco.Popconfirm, { showArrow: false }), Dropdown: wrapScopedPopup(HostArco.Dropdown),
  DatePicker: HeroDatePicker, Calendar: HeroCalendar, TimePicker: wrapScopedPopup(HostArco.TimePicker),
  TreeSelect: wrapScopedPopup(HostArco.TreeSelect), Cascader: wrapScopedPopup(HostArco.Cascader),
  Tree: HeroTree, ColorPicker: HeroColorPicker, Spin: HeroSpin, InputNumber: HeroInputNumber, InputTag: HeroInputTag, Tag: HeroTag, Progress: HeroProgress, Result: HeroResult,
}

export const Arco: Omit<typeof HostArco, 'Modal' | 'Drawer' | 'Message' | 'Notification' | 'ConfigProvider'> & {
  Modal: typeof ScopedModal
  Drawer: typeof Drawer
  Message: typeof Message
  Notification: typeof Notification
  ConfigProvider: typeof ConfigProvider
} = { ...HostArco, ...scopedPopups, Modal: ScopedModal, Drawer, Message, Notification, ConfigProvider }

/** 完整保留上传请求、自定义请求、文件列表、校验和进度回调。 */
export const Upload: typeof HostArco.Upload = HostArco.Upload
/** 固定定位与滚动锚点组件。 */
export const Affix = HostArco.Affix
/** 章节锚点导航。 */
export const Anchor = HostArco.Anchor
/** 返回顶部操作。 */
export const BackTop = HostArco.BackTop
/** 色彩选择及透明度编辑。 */
export const ColorPicker = HeroColorPicker
/** 评论结构及操作区。 */
export const Comment = HostArco.Comment
/** 栅格及响应式列布局。 */
export const Grid = HostArco.Grid
/** 标签输入，保留自定义校验与受控列表。 */
export const InputTag = HeroInputTag
/** 分段验证码输入。 */
export const VerificationCode = HostArco.VerificationCode
/** 页面布局及 Header/Sider/Content/Footer 子组件。 */
export const Layout = HostArco.Layout
/** 原生链接交互与状态。 */
export const Link = HostArco.Link
/** 页面标题与导航操作。 */
export const PageHeader = HostArco.PageHeader
/** 自定义浮层挂载工具。 */
export const Portal = HostArco.Portal
/** 可调整尺寸的内容容器。 */
export const ResizeBox: typeof HostArco.ResizeBox = HostArco.ResizeBox
/** 统一行列间距。 */
export const Space = HostArco.Space
/** 触发器、定位及浮层交互。 */
export const Trigger = HostArco.Trigger
/** 文本提及与候选检索。 */
export const Mentions = HostArco.Mentions
/** 内容水印。 */
export const Watermark = HostArco.Watermark
/** 按钮组合。 */
export const ButtonGroup = HostArco.Button.Group
/** 头像组合。 */
export const AvatarGroup = HostArco.Avatar.Group
/** 表单动态字段列表。 */
export const FormList: typeof HostArco.Form.List = HostArco.Form.List
/** 嵌套菜单。 */
export const SubMenu = ScopedMenu.SubMenu
/** 菜单选项分组。 */
export const MenuItemGroup = HostArco.Menu.ItemGroup
/** 卡片媒体和描述区。 */
export const CardMeta = HostArco.Card.Meta
/** 卡片栅格。 */
export const CardGrid = HostArco.Card.Grid

/** 根导出对应组件的完整参数类型。 */
export type UploadProps = React.ComponentPropsWithoutRef<typeof Upload>
/** 颜色选择器参数。 */
export type ColorPickerProps = React.ComponentPropsWithoutRef<typeof ColorPicker>
/** 验证码参数。 */
export type VerificationCodeProps = React.ComponentPropsWithoutRef<typeof VerificationCode>

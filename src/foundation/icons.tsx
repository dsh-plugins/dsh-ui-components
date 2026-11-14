/**
 * 策划图标集与 `<Icon>` 组件。
 *
 * 这里只导出界面常用的图标，按意图命名（`Settings`、`Warning`、`GitBranch`），
 * 换图时不影响调用方。未列出的图标从 `@dsh-plugin/dsh-ui-components/icons/<pascal>`
 * 逐图标引入，或按 `ICON_INDEX` 元数据配合调用方自己的映射表渲染；两条通道
 * 都只为实际用到的图标付出体积。
 *
 * 图标默认 `outline` 主题、`currentColor` 填充，因此自动继承周围文字色。
 *
 * @module @dsh-plugin/dsh-ui-components/foundation/icons
 */
import * as React from 'react'
import Add from '../icons/Add.js'
import Alarm from '../icons/Alarm.js'
import AllApplication from '../icons/AllApplication.js'
import Api from '../icons/Api.js'
import Attention from '../icons/Attention.js'
import Book from '../icons/Book.js'
import Branch from '../icons/Branch.js'
import Briefcase from '../icons/Briefcase.js'
import Browser from '../icons/Browser.js'
import Bug from '../icons/Bug.js'
import Camera from '../icons/Camera.js'
import ChartHistogram from '../icons/ChartHistogram.js'
import ChartLine from '../icons/ChartLine.js'
import ChartPie from '../icons/ChartPie.js'
import Check from '../icons/Check.js'
import CheckOne from '../icons/CheckOne.js'
import CheckSmall from '../icons/CheckSmall.js'
import Close from '../icons/Close.js'
import CloseSmall from '../icons/CloseSmall.js'
import Code from '../icons/Code.js'
import Command from '../icons/Command.js'
import Compass from '../icons/Compass.js'
import Config from '../icons/Config.js'
import Copy from '../icons/Copy.js'
import Data from '../icons/Data.js'
import Delete from '../icons/Delete.js'
import Diamond from '../icons/Diamond.js'
import DoubleLeft from '../icons/DoubleLeft.js'
import DoubleRight from '../icons/DoubleRight.js'
import Down from '../icons/Down.js'
import Download from '../icons/Download.js'
import Edit from '../icons/Edit.js'
import Error from '../icons/Error.js'
import ExpandDown from '../icons/ExpandDown.js'
import ExpandLeft from '../icons/ExpandLeft.js'
import ExpandRight from '../icons/ExpandRight.js'
import ExpandUp from '../icons/ExpandUp.js'
import FileCode from '../icons/FileCode.js'
import FileText from '../icons/FileText.js'
import Filter from '../icons/Filter.js'
import Fire from '../icons/Fire.js'
import Flag from '../icons/Flag.js'
import Folder from '../icons/Folder.js'
import FolderOpen from '../icons/FolderOpen.js'
import FullScreen from '../icons/FullScreen.js'
import Globe from '../icons/Globe.js'
import GridFour from '../icons/GridFour.js'
import Help from '../icons/Help.js'
import History from '../icons/History.js'
import Home from '../icons/Home.js'
import Info from '../icons/Info.js'
import Keyboard from '../icons/Keyboard.js'
import Left from '../icons/Left.js'
import Level from '../icons/Level.js'
import Lightning from '../icons/Lightning.js'
import Link from '../icons/Link.js'
import Loading from '../icons/Loading.js'
import Lock from '../icons/Lock.js'
import Logout from '../icons/Logout.js'
import Magic from '../icons/Magic.js'
import Moon from '../icons/Moon.js'
import More from '../icons/More.js'
import MoreOne from '../icons/MoreOne.js'
import Mouse from '../icons/Mouse.js'
import NetworkTree from '../icons/NetworkTree.js'
import Pause from '../icons/Pause.js'
import People from '../icons/People.js'
import Pin from '../icons/Pin.js'
import Play from '../icons/Play.js'
import Plug from '../icons/Plug.js'
import Power from '../icons/Power.js'
import PreviewClose from '../icons/PreviewClose.js'
import PreviewOpen from '../icons/PreviewOpen.js'
import Radar from '../icons/Radar.js'
import Record from '../icons/Record.js'
import Redo from '../icons/Redo.js'
import Refresh from '../icons/Refresh.js'
import Return from '../icons/Return.js'
import Right from '../icons/Right.js'
import Rocket from '../icons/Rocket.js'
import Rotate from '../icons/Rotate.js'
import Save from '../icons/Save.js'
import Scan from '../icons/Scan.js'
import Search from '../icons/Search.js'
import Send from '../icons/Send.js'
import Server from '../icons/Server.js'
import Setting from '../icons/Setting.js'
import SettingTwo from '../icons/SettingTwo.js'
import Share from '../icons/Share.js'
import Shield from '../icons/Shield.js'
import Sort from '../icons/Sort.js'
import Star from '../icons/Star.js'
import Success from '../icons/Success.js'
import Sun from '../icons/Sun.js'
import Terminal from '../icons/Terminal.js'
import Time from '../icons/Time.js'
import Tool from '../icons/Tool.js'
import Translate from '../icons/Translate.js'
import Trophy from '../icons/Trophy.js'
import Undo from '../icons/Undo.js'
import Unlock from '../icons/Unlock.js'
import Up from '../icons/Up.js'
import Upload from '../icons/Upload.js'
import User from '../icons/User.js'
import Vip from '../icons/Vip.js'
import Wind from '../icons/Wind.js'
import Write from '../icons/Write.js'
import { DEFAULT_ICON_CONFIGS, IconProvider, type IIconProps, type Theme } from '@icon-park/react/es/runtime/index.js'
import { G } from './tokens.js'

/** 单个图标组件接受的 props，沿用 IconPark 自己的定义。 */
export type IconProps = IIconProps

/** 一个图标组件。 */
export type IconComponent = (props: IconProps) => React.ReactElement

/**
 * 策划图标集，按用途分组。键是意图名，值是 IconPark 组件。
 */
export const Icons = {
  // 结构与导航
  ChevronUp: Up,
  ChevronDown: Down,
  ChevronLeft: Left,
  ChevronRight: Right,
  PageFirst: DoubleLeft,
  PageLast: DoubleRight,
  More,
  MoreVertical: MoreOne,
  Sort,
  Expand: FullScreen,
  CollapseDown: ExpandDown,
  CollapseLeft: ExpandLeft,
  CollapseRight: ExpandRight,
  CollapseUp: ExpandUp,
  Compass,

  // 操作
  Add,
  Edit,
  Write,
  Delete,
  Copy,
  Save,
  Search,
  Refresh,
  Download,
  Upload,
  Undo,
  Redo,
  Play,
  Pause,
  Close,
  CloseSmall,
  Check,
  CheckOne,
  CheckSmall,
  Filter,
  Scan,
  Send,
  Share,
  Rotate,
  Power,
  Logout,
  Return,

  // 状态
  Info,
  Warning: Attention,
  Error,
  Success,
  Loading,
  Help,
  Alarm,
  Diamond,

  // 领域
  Settings: Setting,
  SettingsAlt: SettingTwo,
  Config,
  Terminal,
  Code,
  FileCode,
  Doc: FileText,
  Folder,
  FolderOpen,
  GitBranch: Branch,
  Link,
  Web: Globe,
  Browser,
  Lock,
  Unlock,
  EyeOpen: PreviewOpen,
  EyeClosed: PreviewClose,
  Apps: AllApplication,
  Home,
  User,
  People,
  Star,
  Magic,
  Shield,
  Vip,
  Trophy,
  Pin,
  Level,
  Grid: GridFour,
  Tool,
  Plug,
  Server,
  Rocket,
  Radar,
  Record,
  Camera,
  Book,
  Briefcase,
  Bug,
  Api,
  Data,
  ChartLine,
  ChartPie,
  ChartHistogram,
  History,
  Time,
  Fire,
  Flag,
  Lightning,
  Mouse,
  Keyboard,
  Command,
  Translate,
  Sun,
  Moon,
  Wind,
  NetworkTree,
} as const

/** 策划图标的名字。 */
export type IconName = keyof typeof Icons

/** 全部策划图标名，供选择器与测试使用。 */
export const ICON_NAMES = Object.keys(Icons) as IconName[]

/**
 * 按名取一个图标组件。未知名字退化为 `Help`，让过期名字显示成可见占位而
 * 不是抛错中断渲染。
 *
 * @param name - 策划图标名。
 * @returns 对应的图标组件。
 */
export function icon(name: IconName): IconComponent {
  return (Icons[name] ?? Icons.Help) as IconComponent
}

/** {@link Icon} 的 props。 */
export type IconByNameProps = { name: IconName } & IconProps

/** 用组件引用渲染图标时的 props。 */
export type IconOfProps = { of: IconComponent; size?: number | string } & Omit<IconProps, 'size'>

/**
 * 按策划名渲染一个图标，供数据驱动的场景使用（菜单项描述、设置行）。
 *
 * `<Icon of={SomeIcon} />` 走另一个重载，用于从逐图标子路径引入的组件。
 *
 * @param props - `name` 取自 {@link Icons}，其余 props 透传给 IconPark。
 * @returns 图标元素。
 */
export function Icon(props: IconByNameProps | IconOfProps): React.ReactElement {
  if ('of' in props) {
    const { of, size, ...rest } = props
    return React.createElement(of, size === undefined ? rest : { ...rest, size })
  }
  const { name, ...rest } = props
  return React.createElement(icon(name), rest)
}

/** 本包组件渲染图标时使用的默认配置。 */
export const DSH_ICON_CONFIG = {
  ...DEFAULT_ICON_CONFIGS,
  size: G.fontSize + 4,
  strokeWidth: 4,
  theme: 'outline' as Theme,
  colors: {
    ...DEFAULT_ICON_CONFIGS.colors,
    // `currentColor` 让图标跟随周围文字色，这是它能自动适配主题的前提。
    outline: { fill: 'currentColor', background: 'transparent' },
  },
}

/**
 * 为子树统一图标默认值（outline 主题、线宽、尺寸、`currentColor`）。
 *
 * 组件自身不要求它存在，但在插件根部挂一次能让自绘图标与其余图标一致。
 *
 * @param props.children - 子树。
 * @returns 携带 {@link DSH_ICON_CONFIG} 的上下文提供者。
 */
export function DshIconProvider({ children }: { children?: React.ReactNode }): React.ReactElement {
  return React.createElement(IconProvider, { value: DSH_ICON_CONFIG }, children)
}

export { IconProvider }

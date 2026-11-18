# dsh-ui-components

`@dsh-plugin/dsh-ui-components` 将 HeroUI 的视觉语言应用于完整 Arco Design React 组件能力，并提供 DSH 设置页组合组件和 IconPark 图标。

## 安装与集成

```sh
npm install @dsh-plugin/dsh-ui-components
```

`react`、`react-dom` 与 `@dsh-plugin/dsh-loader` 为 peer dependencies，由 DSH 宿主提供。本包以逐文件 ESM 和类型声明发布，由消费方打包器内联；组件样式通过 loader 按需注入，消费方无需增加 CSS 编译管线。

```tsx
import { Arco, Button, Card, DshProvider, Field, Input, Switch } from '@dsh-plugin/dsh-ui-components'

export function SettingsPage() {
  return (
    <DshProvider theme="host" radius="md">
      <Card title="工作区设置">
        <Field label="名称" description="用于区分工作区。" htmlFor="workspace-name">
          <Input id="workspace-name" placeholder="输入名称" />
        </Field>
        <Field label="自动保存" layout="inline"><Switch defaultChecked /></Field>
        <Arco.DatePicker />
        <Button variant="primary">保存</Button>
      </Card>
    </DshProvider>
  )
}
```

消费方打包时保持下列模块为外部依赖：

```js
const CLIENT_EXTERNALS = [
  'react',
  'react/jsx-runtime',
  'react-dom',
  'react-dom/client',
  '@dsh-plugin/dsh-loader/client',
]
```

## 主题

| Provider 属性 | 作用 |
| --- | --- |
| `theme` | `host` 跟随 DSH 明暗，`system` 跟随操作系统，或指定 `light` / `dark` |
| `radius` | `none`、`sm`、`md`、`lg`、`full`，默认 `md` |
| `reducedMotion` | 减少动画；同时遵循系统减少动画设置 |
| `direction` | `ltr` / `rtl` |
| `className`、`style` | 作用于当前组件根容器 |

浅色使用柔和背景和分层表面，深色采用更亮的浮层及低强度阴影。按钮、输入、卡片、菜单、表格、树、上传区等共享语义颜色和几何变量。焦点环、悬停、按下、禁用和错误状态均在当前主题内处理。

主题限定在 `.dsh-ui` 和当前 Provider 的浮层容器中，避免改变宿主其他组件。多个 Provider 可分别设置主题。DSH 组合件沿用已有语义令牌映射。

静态 `Message`、`Notification` 与 `confirm` 默认跟随宿主明暗。局部主题使用 Provider 后代中的 `Arco.Message.useMessage()`、`Arco.Notification.useNotification()`、`Arco.Modal.useModal()`，并渲染返回的 holder。消息和通知使用独立实例，其静态配置不会修改宿主的消息列表；更换挂载容器、类名前缀或方向会清理本库已有通知并应用新配置。

## 组件能力

根入口保留 Button、Input、Select、Checkbox、Radio、Switch、Form、Card、Tag、Avatar、Badge、Typography、Tooltip、Popover、Collapse、Alert、Progress、Modal、Drawer、Menu、Tabs、Breadcrumb、Pagination、Steps、Table、List、Tree、DatePicker、TimePicker、Cascader、TreeSelect、Transfer、Statistic、Timeline、Calendar、Carousel 和 Image 等 DSH 包装组件。

`Arco` 命名空间提供宿主 Arco Design 的完整组件与功能 API，包括 Upload、InputTag、Mentions、ColorPicker、Anchor、Affix、BackTop、Grid、Layout、Space、ResizeBox、PageHeader、Comment、Result、Watermark 等。原始组件遵循 Arco React 的 props、事件和子组件结构。

DSH 组合组件包括 `SettingsCard`、`SettingsRow`、`PanelShell`、`MenuSelect`、`JsonTree`、`CodeBlockShell`、`FileTypeBadge`、`StatusLine`、`SegmentedControl`、`DisclosureRow` 与 `StateDot`。Modal、Drawer 和 PanelShell 保留上下 120px 留白，并在内部使用宿主 Scrollbar。

完整对照与迁移差异见 [Arco 能力与 HeroUI 样式](docs/arco-coverage.md)。Vue 独立包 `@dsh-plugin/dsh-ui-components-vue` 位于 `vue` 分支。

## 可选界面样式

- `Table` 的 `contentSized` 按内容计算列宽并保持单行。固定列沿用 Arco 的 `fixed` 配置。`loadingStyle="blur"` 仅模糊数据区。`Spin` 的同名选项模糊卡片内容。
- `Card` 的 `variant="glass"` 启用半透明背景和模糊，`glassOpacity` 可设置 0 到 1 的背景不透明度。
- `ScrollShadow` 的 `variant="page"` 启用两端渐隐的滚动阴影。`Modal`、`Drawer` 的 `scrollGutter` 在内容和滚动条之间留空。`DshProvider` 的 `overlayInset`、`overlayRadius` 可调整作用域内的提示位置和遮罩轮廓。
- 横向 `Menu` 的 `centered` 和 `itemWidth` 控制整体居中及每项宽度。 `MenuItem` 的 `action` 属性可以放置独立操作。
- 在标签和单选 `Select` 的共同容器上添加 `dsh-select-label-inset` 可对齐文字。`HintIcon` 支持鼠标悬停和键盘聚焦显示 `content`。
- `dsh-markdown` 为调用方渲染的 Markdown HTML 设置样式，覆盖表格、代码块、引用块、任务列表、`mark`、`kbd` 和 GitHub 格式提示块。

## 图标

```tsx
import { Icon, Icons } from '@dsh-plugin/dsh-ui-components'
import Rocket from '@dsh-plugin/dsh-ui-components/icons/Rocket'
import { ICON_INDEX } from '@dsh-plugin/dsh-ui-components/icons-index'

<Icon name="Settings" size={18} />
<Icons.GitBranch />
<Icon of={Rocket} size={18} />
```

根入口提供常用命名集；`icons/<PascalName>` 按子路径导入全量 2658 个图标中的单项；`ICON_INDEX` 提供元数据，不导入图标模块。图标继承 `currentColor`。

## 预览与验证

运行 `npm run preview` 启动预览页，可切换明暗、圆角和减少动画，检查基础组件、完整 Arco 能力、DSH 组合件、浮层和图标。

```sh
npm run typecheck
npm run build
npm test
npm run verify
npm run preview:build
```

`verify` 检查主题令牌、图标通道、字面颜色和发布体积。图标重新生成使用 `npm run gen:icons`。宿主令牌参考与生成规则见 [docs/tokens.md](docs/tokens.md)。

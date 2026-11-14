<div align="center">

# dsh-ui-components

**一套用 DeepSeek Harness 设计令牌重塑 Arco Design 外观、并按名暴露全量 IconPark 图标的 React 组件库。**

[English](README.md) | 简体中文

</div>

## 这是什么

DSH 生态里的插件各自手写按钮、输入框与弹窗，同一个产品最后会出现三种圆角。本包是这些控件的统一实现：交互与键盘行为来自 [Arco Design](https://arco.design)，外观由 DeepSeek Harness 的 `--dsw-*` 设计令牌驱动，图标取自 [IconPark](https://iconpark.oceanengine.com)。

产物是不打包的 ESM 源码库。插件自己的构建器把它内联进产物，因此运行期 React 与 Arco 仍是宿主持有的唯一实例，插件侧也不需要任何 CSS 处理管线。

## 安装

```sh
npm install @dsh-plugin/dsh-ui-components
```

`react`、`react-dom` 与 `@dsh-plugin/dsh-loader` 是 peer 依赖，三者都由宿主提供。

## 使用

在插件的 React 树根部挂一次 `DshProvider`，随后从包根导入组件。

```tsx
import { DshProvider, Card, Field, Input, Button, Switch } from '@dsh-plugin/dsh-ui-components'

export function SettingsPage() {
  return (
    <DshProvider>
      <Card title="代理">
        <Field label="地址" description="仅影响走全局 fetch 的请求。" htmlFor="host">
          <Input id="host" mono placeholder="127.0.0.1" />
        </Field>
        <Field label="启用" layout="inline">
          <Switch defaultChecked />
        </Field>
        <Button variant="primary">保存</Button>
      </Card>
    </DshProvider>
  )
}
```

`DshProvider` 注入皮肤、统一图标默认值，并把 Arco 的全部浮层收进持有同一套 CSS 变量的容器。不挂它组件也能渲染，但浮层会挂到 `body` 下而丢掉皮肤。

打包配置里把这三项保持为 external：

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

颜色不是可配置的 props，也不需要是。皮肤是一张把 Arco 自身变量整体改指 DSH 语义令牌的 CSS 变量桥，因此深浅色跟随宿主的 `body[data-ds-dark-theme]` 属性自动切换，不涉及任何 JavaScript，组件代码里也没有主题分支。

桥接表挂在 `.dsh-ui` 类上而不是 `body` 上，宿主自己的 Arco 主题因此不受影响。`scripts/verify-tokens.mjs` 会把本包引用的每个宿主变量与宿主样式表比对，DSH 改名时在离线阶段直接报错，而不是等到样式静默失效。

## 图标

三条通道，因为把 2658 个图标全量内联进每个插件并不合理：

```tsx
// 1. 策划命名集（约 110 个，未使用的会被 tree-shaking 移除）
import { Icon, Icons } from '@dsh-plugin/dsh-ui-components'
<Icon name="Settings" size={18} />
<Icons.GitBranch />

// 2. 全量 2658 个，按子路径引入 —— 只有该图标进入产物
import Rocket from '@dsh-plugin/dsh-ui-components/icons/Rocket'
<Icon of={Rocket} size={18} />

// 3. 全量元数据，供选择器与搜索使用，不导入任何图标模块
import { ICON_INDEX } from '@dsh-plugin/dsh-ui-components/icons-index'
```

子路径名是 IconPark 名字的 PascalCase 形式：`a-cane` 对应 `ACane`，`setting` 对应 `Setting`。`ICON_INDEX` 的每条记录带 `name`、`pascal`、`title`、`titleZh`、`category`、`tags` 与 `rtl` 七个字段。

图标继承 `currentColor`，颜色跟随周围文字。

## 组件

| 分组 | 导出 |
|---|---|
| 基础层 | `DshProvider`、`Icon`、`Icons`、`ICON_NAMES`、`DshIconProvider`、`G`、`cx`、`ICON_INDEX` |
| 按钮 | `Button`、`IconButton` |
| 输入 | `Input`、`Textarea`、`InputNumber`、`Select`、`AutoComplete` |
| 选择 | `Checkbox`、`CheckboxGroup`、`Radio`、`RadioGroup`、`Switch`、`Slider`、`Rate` |
| 表单 | `Form`、`FormItem`、`Field` |
| 展示 | `Card`、`Tag`、`Pill`、`Avatar`、`Badge`、`Divider`、`Descriptions`、`Typography`、`Text`、`Paragraph`、`Empty`、`Skeleton`、`Spin`、`Tooltip`、`Popover`、`HoverCard`、`Collapse`、`CollapseItem` |
| 反馈 | `Alert`、`Progress`、`Result`、`Popconfirm`、`Modal`、`confirm`、`Drawer`、`Message`、`Notification`、`message`、`messageSuccess`、`messageError`、`messageWarning` |
| 导航 | `Menu`、`MenuItem`、`Dropdown`、`Tabs`、`TabPane`、`Breadcrumb`、`BreadcrumbItem`、`Pagination`、`Steps`、`Step`、`SegmentedControl`、`DisclosureRow`、`StateDot` |
| 数据 | `Table`、`List`、`ListItem`、`Tree`、`DatePicker`、`TimePicker`、`Cascader`、`TreeSelect`、`Transfer`、`Statistic`、`Timeline`、`TimelineItem`、`Calendar`、`Carousel`、`Image` |
| DSH 组合件 | `SettingsCard`、`SettingsRow`、`PanelShell`、`MenuSelect`、`JsonTree`、`CodeBlockShell`、`FileTypeBadge`、`StatusLine` |

所有控件都透传原生 props 与 `className`，因此想脱离默认样式时不必 fork 组件。

`SettingsCard` 加 `SettingsRow` 组成宿主设置页的卡片结构。`PanelShell` 是自带 120px 上下留白、内容区走宿主 `Scrollbar` 的浮层外壳。`MenuSelect` 是设置页用的自绘下拉，因为原生 `<select>` 的弹层无法跟随 DSH 主题。

## 预览

```sh
npm run gen:tokens   # 把宿主令牌样式表复制到 docs/preview/
npm run preview      # http://localhost:5178
```

预览站用宿主自己的令牌取值渲染全部组件，带深浅主题切换与覆盖 2658 个图标的可搜索索引。它直接读包源码，改完刷新即可看到效果，不必先构建。

## 开发

```sh
npm install
npm run gen:icons     # 重新生成 2658 个图标模块与元数据
npm run typecheck
npm run build
npm test
npm run verify        # 令牌名、图标通道、字面颜色、包体积
```

`npm run verify:tokens` 需要宿主样式表。把 `DSH_UI_THEME_DIR` 指向 DSH 检出里的 `packages/client/ui-theme/src/styles`，或在上级目录保留一份 `.dsh/temp/session-tree-harness`。

分批范围与当前进度见 [PLAN.md](PLAN.md)，令牌对照表见 [docs/tokens.md](docs/tokens.md)。

## 许可

MIT。IconPark 图形为 Apache-2.0，详见 [NOTICE](NOTICE)。

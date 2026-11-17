# Vue 组件覆盖与迁移

`@dsh-plugin/dsh-ui-components-vue` 以 Arco Design Vue 的完整导出为能力基线，使用 HeroUI v3 的视觉层级统一外观，并补充字段、验证码、列表选择与工具栏组件。

## 覆盖规则

根入口覆盖 `@arco-design/web-vue` 的全部组件及子组件名称，`Arco` 命名空间完整保留原生组件、实例类型和功能 API。表中的 HeroUI 名称用于说明用途对应关系；调用参数、插槽与事件以 Arco Vue 为准，额外包装的差异见下方迁移表。名称相似不代表可以直接替换导入。

HeroUI 没有直接对应组件时，保留 Arco 的完整交互能力，并统一表面、颜色、圆角、阴影和焦点状态；这类组件仍属于验收范围，包括层级选择、穿梭框、上传、评论、时间线、统计、水印和布局工具。

| Arco 组件族 | HeroUI 对应能力 | 本包主题处理 |
| --- | --- | --- |
| Button、ButtonGroup | Button、ButtonGroup、CloseButton | 主、次、三级、描边、幽灵、危险与柔和危险变体；三种尺寸、圆角、焦点及按压状态 |
| Link、Typography | Link、Typography、Heading、Paragraph、Label、Description、Kbd | 文字层级、链接强调色、键盘快捷键 |
| Divider、Space、Grid、Layout、Split、ResizeBox | Separator、布局容器 | 分割颜色、间距、表面色和拖动条 |
| Affix、Anchor、BackTop、PageHeader | 导航与页面结构 | 选中强调色、浮动表面、标题层级 |
| ConfigProvider | Provider | `DshProvider` 管理主题、圆角、减少动画及浮层容器 |
| Input、InputNumber、InputTag、Mention、VerificationCode | Input、TextArea、NumberField、TextField、SearchField、TagGroup、InputOTP | 统一字段背景、描边、焦点环、错误与禁用状态 |
| Form、FormItem | Form、Fieldset、Label、Description、FieldError | 保留 Arco 校验规则，提供关联标签和说明的字段组合 |
| AutoComplete、Select | Autocomplete、ComboBox、Select | 下拉容器沿用当前主题，选项与选中状态一致 |
| Checkbox、Radio、Switch | CheckboxGroup、RadioGroup、SwitchGroup | 选择控件的尺寸、圆角和选中语义色 |
| Slider、Rate | Slider、评分输入 | 刻度、轨道与选中强调色 |
| DatePicker、RangePicker、TimePicker、Calendar | DatePicker、DateRangePicker、TimeField、Calendar | 日期网格、选中态、字段与浮层表面 |
| ColorPicker | ColorPicker | 保留色彩输入与选择能力，统一触发器和面板 |
| Cascader、TreeSelect、Tree | 层级选择 | 复用统一字段、选项、树节点和选中态 |
| Transfer | 双列表选择 | 双列表表面、标题、选择状态与操作按钮 |
| Upload | 文件上传 | 拖入区、图片卡片和文件列表的边框与圆角 |
| Avatar、Badge、Tag | Avatar、Badge、Chip、Tag | 头像、圆角标签和状态颜色 |
| Card、Collapse | Card、Surface、Accordion、Disclosure | 三级表面、柔和阴影、大圆角和内容层级 |
| List、Table、Descriptions、OverflowList | ListBox、Table、信息展示 | 列表行、表头、描边及空状态；ListBox 另有选择与键盘实现 |
| Image、Carousel | 媒体展示组合，HeroUI 3.2.7 无 Image 根导出 | 媒体边界与容器圆角 |
| Comment、Timeline、Statistic、Watermark | 评论、活动、统计及水印 | 沿用 Arco 能力，匹配正文、弱化文字和表面色 |
| Menu、Dropdown、Breadcrumb、Pagination、Steps、Tabs | 菜单、Dropdown、Breadcrumbs、Pagination、Tabs | 菜单选中背景、胶囊标签、导航状态和步骤颜色 |
| Alert、Result、Empty | Alert、结果、EmptyState | 成功、警告、错误状态与内容层级 |
| Progress、Spin、Skeleton | ProgressBar、ProgressCircle、Meter、Spinner、Skeleton | 进度语义色、加载状态与减少动画 |
| Modal、Drawer | Modal、Drawer、AlertDialog | 独立主题浮层；Dialog 上下各 120px 留白与内部 Arco Scrollbar，Drawer 保留官方满高布局 |
| Tooltip、Popover、Popconfirm、Trigger | Tooltip、Popover、确认和触发器 | 浮层背景、阴影、描边与主题容器 |
| Message、Notification | Toast | 保留 Arco 功能入口；Provider 内优先使用 `useToast()` 获得隔离主题和生命周期 |
| Scrollbar | ScrollShadow | 统一滚动条；ScrollShadow 根据实际滚动边缘显示渐隐提示 |

## 补充组件

除上表中的 Arco 能力，本包提供 `Surface`、`Header`、`Label`、`Description`、`FieldError`、`ErrorMessage`、`Fieldset`、`InputGroup`、`TextField`、`SearchField`、`InputOTP`、`Kbd`、`ListBox`、`ToggleButton`、`ToggleButtonGroup`、`Toolbar`、`TagGroup` 和 `ScrollShadow`。

`TextField` 为输入框关联标签、说明与错误信息。`InputOTP` 使用单个原生输入处理粘贴、光标、删除及验证码自动填充，视觉上显示独立字符格。`ListBox` 和 `ToggleButtonGroup` 支持受控值、默认值、单选或多选、禁用项与键盘导航。`Toolbar` 管理组内焦点。`TagGroup` 处理删除后的焦点恢复。`ScrollShadow` 使用 Arco Scrollbar，并在内容或容器尺寸变化后重新计算边缘状态。

HeroUI 风格名称包括 `Accordion`、`AccordionItem`、`Disclosure`、`DisclosureGroup`、`Breadcrumbs`、`Chip`、`TextArea`、`NumberField`、`DateRangePicker`、`Text`、`Separator`、`EmptyState` 和 `Spinner`。这些名称用于适配组件用途；例如 `AccordionItem` 仍使用 Arco `CollapseItem` 的 `key`、`header` 和插槽。

## 从 hero-ui-vue 迁移

先将依赖改为 `@dsh-plugin/dsh-ui-components-vue`，在应用入口导入 `@dsh-plugin/dsh-ui-components-vue/style.css`，再使用 `DshProvider` 包裹应用。组件样式限定在 `.dsh-ui` 与其专属浮层容器内。

| 原有用法 | 本包用法与差异 |
| --- | --- |
| Tailwind CSS v4 与 HeroUI 样式包 | 导入本包 CSS；业务应用可以继续使用自己的 CSS 管线 |
| `isDisabled`、`isPending` | `disabled`、`loading`；按钮的 `iconOnly` 声明纯图标布局 |
| `modelValue` / `update:modelValue` | 通常仍用 `v-model`，具体值类型遵循 Arco 组件 |
| Modal 的 open 状态 | `v-model:visible`；使用 `title`、`header`、默认及 `footer` 插槽 |
| Card.Header / Card.Content 等组合部件 | 使用 Arco Card 的 `title`、`extra`、默认及 `actions` 插槽 |
| Tabs 的 selectedKey | Arco `active-key` 与 `v-model:active-key`，子项使用 TabPane |
| ListBox 的 selectedKeys | 本包 ListBox 使用 `v-model` 和 `options`；单选值为字符串或数字，多选值为数组 |
| InputOTP 的 maxLength | `length`；`type="numeric"` 或 `type="text"`，完成时触发 `complete` |
| TagGroup 的标签子部件 | `v-model` 为 `{ value, label, disabled? }[]` |
| Progress 的百分数 | Arco Progress 的 `percent` 为 `0–1`；ProgressBar、ProgressCircle、Meter 使用各自的数值属性 |
| 全局主题类 | `DshProvider theme="light\|dark\|auto"`；auto 跟随宿主或系统，支持多个隔离 Provider |

本包对标 Arco 的全部能力和 HeroUI 的视觉语言；HeroUI 的每个组合部件、事件名称与 React Aria 签名不属于直接兼容 API。

## 验收入口

执行 `pnpm typecheck`、`pnpm build`、`pnpm test` 和 `pnpm preview:build` 检查类型、发布产物、选择与验证码规则、预览构建。运行 `pnpm preview` 后检查浅色和深色、圆角切换、减少动画、按钮状态、输入与验证码、列表和工具栏键盘操作、下拉选择、日期、树、穿梭、表格以及浮层中的长内容滚动。

视觉依据来自 [HeroUI v3 设计原则](https://heroui.com/en/docs/react/getting-started/design-principles)、[HeroUI Vue 按钮样式](https://github.com/rysinal/hero-ui-vue/blob/main/packages/styles/src/components/button.css) 与[主题变量](https://github.com/rysinal/hero-ui-vue/blob/main/packages/styles/src/themes/default/variables.css)。功能范围以 [Arco Design Vue 源码](https://github.com/arco-design/arco-design-vue)和本包锁定依赖为准。

像素验收进度见[全量矩阵](comparison/coverage.md)，导出名称核对与逐像素验收分别记录。`Text` 是本包对 Arco TypographyText 的别名，HeroUI 3.2.7 正式根入口使用 Typography、Heading 和 Paragraph。

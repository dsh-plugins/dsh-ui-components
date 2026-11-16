# Arco 能力与 HeroUI 样式

React 包使用 `dsh-loader` 提供的 Arco 单例承担完整组件交互，通过 `DshProvider` 统一 HeroUI 风格的颜色、表面、圆角、焦点与动画。

## 组件范围

`Arco` 命名空间保留当前宿主版本的全部 Arco Design React 导出。根入口中的 DSH 包装组件提供既有的简化 API；同名原始组件通过 `Arco.X` 使用。HeroUI 对应关系描述用途，参数、子组件和事件仍遵循 Arco React。

| Arco 组件族 | HeroUI 对应与视觉处理 |
| --- | --- |
| Button、Link、Typography | Button、Link、Text；操作层级、字体与焦点环 |
| Affix、Anchor、BackTop、PageHeader | 导航定位、浮动表面与标题 |
| Divider、Grid、Layout、Space、ResizeBox | Separator、布局与分隔条 |
| ConfigProvider | DshProvider 管理主题、圆角、方向与浮层范围 |
| AutoComplete、Input、InputNumber、InputTag、Mentions | Autocomplete、Input、TextArea、NumberField；字段背景、轮廓、错误和禁用状态 |
| Form、Checkbox、Radio、Switch、Slider、Rate | Form、CheckboxGroup、RadioGroup、Switch、Slider；校验、选择和数值调节 |
| Select、Cascader、TreeSelect、Transfer | Select 与层级、双列表选择；字段和列表采用统一表面 |
| DatePicker、TimePicker、Calendar | DatePicker、DateRangePicker、TimeField、Calendar；保留日期交互与范围选择 |
| ColorPicker、Upload | 颜色与文件输入；统一触发器、面板、上传区 |
| Avatar、Badge、Tag | Avatar、Badge、Chip；身份标识、状态与标签 |
| Card、Collapse | Card、Surface、Accordion、Disclosure；表面层级、阴影和圆角 |
| List、Table、Descriptions、Tree | 表格、描述与层级内容；保留 Arco 数据能力 |
| Image、Carousel | 媒体容器圆角及状态 |
| Comment、Timeline、Statistic、Watermark | 评论、活动、统计与水印；继承当前主题文字与表面 |
| Menu、Dropdown、Breadcrumb、Pagination、Steps、Tabs | 菜单、路径、分页、步骤和标签；统一选中态与层次 |
| Alert、Result、Empty | 状态反馈、结果与空状态 |
| Progress、Spin、Skeleton | ProgressBar、ProgressCircle、Spinner、Skeleton；进度色与加载反馈 |
| Modal、Drawer、Popconfirm | 对话框、抽屉和确认；应用浮层主题与内部滚动规范 |
| Tooltip、Popover、Trigger | 提示、气泡与触发器；浮层表面、阴影和主题继承 |
| Message、Notification | Toast；保留程序化通知能力 |

`Arco` 实际可用成员由运行中的 `dsh-loader` 携带的 Arco 版本决定。新增 DSH 包装不应删减原始命名空间的其他能力。

## 主题与 API

`DshProvider` 的 `theme` 可选 `host`、`system`、`light`、`dark`，默认跟随宿主明暗。`radius` 可选 `none`、`sm`、`md`、`lg`、`full`；`reducedMotion` 控制减少动画，`direction` 控制文字与布局方向。主题同时应用于当前组件树和其浮层容器，不修改宿主 `body` 的主题。

静态 `Message`、`Notification` 与 `confirm` 默认跟随宿主明暗。局部主题使用 Provider 后代中的 `Arco.Message.useMessage()`、`Arco.Notification.useNotification()`、`Arco.Modal.useModal()`，并渲染返回的 holder。消息和通知实例与宿主独立；其 `config` 不修改宿主配置。

Button 保留 `primary`、`secondary`、`outline`、`text` 变体，以及 `sm`、`md`、`lg` 尺寸；危险操作仍通过 `danger` 表达。原有 DSH 组件与 Arco 组件共享设计令牌，输入框、卡片、菜单、表格、树和上传区采用一致视觉。

HeroUI 的同名组件可能使用不同的受控值、事件和组合部件。本包保留 Arco 的使用方式，例如 React Progress 的 `percent` 为 `0–100`，Tabs 使用 `activeTab`，DatePicker 的范围模式通过其 `RangePicker` 子组件使用。

## 验证

预览页提供明暗主题、圆角和减少动画切换；新增 Arco 完整能力分组覆盖日期、时间、颜色、文件上传、标签输入、提及、树、级联、穿梭、日历、评论和结果。既有示例继续覆盖按钮、输入、选择、卡片、表格、导航、浮层和图标。

执行 `npm run typecheck`、`npm run build`、`npm test`、`npm run verify` 和 `npm run preview:build` 验证类型、发布产物、既有规则、令牌/图标/颜色/体积门禁及预览构建。

视觉参考：[HeroUI v3 设计原则](https://heroui.com/en/docs/react/getting-started/design-principles)。基础交互参考：[Arco Design React](https://github.com/arco-design/arco-design)。

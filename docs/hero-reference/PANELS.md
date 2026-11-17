# 展开态对照规范

138 个固定状态使用官方 HeroUI 3.2.7 公开组件组合，三端共享状态标识和内容。

展开态基准修订 2：给 `body` 添加官方 `text-foreground` 主题类，使挂在 body 的日期等浮层继承正确前景色；原来只有 main 有文字色，脱离 main 的浮层在深色主题下会继承浏览器黑色。此修正不改变组件 token，22 个 main 内基础样本不受影响。同时修正双月组合宽度，以及年份网格必须与日期网格同级挂载的结构。

固定条件：1280×960、DPR 1、Arial、关闭动画、`en-US`、锚点左上角 `(480, 240)`，日期为 `2026-11-16`，区间为 `2026-11-12` 至 `2026-11-16`，颜色为 `#2563EB`。`theme` 参数接受 `light` 与 `dark`。

官方入口为 `http://127.0.0.1:5180/?theme=light&panel=<状态>`；Vue 为 `http://127.0.0.1:5179/?compare=1&theme=light&panel=<状态>`；React 为 `http://127.0.0.1:5178/?compare=1&theme=light&panel=<状态>`。

| 状态 | 内容 | 官方面板选择器 | Vue 面板选择器 | React 面板选择器 |
| --- | --- | --- | --- | --- |
| `select-single` | 单选列表 | `.select__popover` | `.arco-select-dropdown` | `.arco-select-popup` |
| `select-multiple` | 多选列表 | `.select__popover` | `.arco-select-dropdown` | `.arco-select-popup` |
| `autocomplete-filter` | 搜索选择：命中 | `.autocomplete__popover` | `.arco-select-dropdown` | `.arco-select-popup` |
| `autocomplete-empty` | 搜索选择：无结果 | `.autocomplete__popover` | `.arco-select-dropdown` | `.arco-select-popup` |
| `combobox-filter` | 输入建议：命中 | `.combo-box__popover` | `.arco-select-dropdown` | `.arco-autocomplete-popup` |
| `combobox-empty` | 输入建议：无结果 | `.combo-box__popover` | `.arco-select-dropdown` | `.arco-autocomplete-popup` |
| `dropdown-menu` | 操作菜单 | `.dropdown__popover` | `.arco-dropdown` | `.arco-dropdown-menu` |
| `dropdown-submenu` | 二级操作菜单 | `.dropdown__popover` | `.arco-dropdown` | `.arco-dropdown-menu` |
| `tooltip` | 文字提示 | `.tooltip` | `.arco-tooltip` | `.arco-tooltip` |
| `tooltip-arrow` | 带箭头文字提示 | `.tooltip` | `.arco-tooltip` | `.arco-tooltip` |
| `popover` | 内容气泡 | `.popover` | `.arco-popover` | `.arco-popover` |
| `popover-long` | 长内容气泡 | `.popover` | `.arco-popover` | `.arco-popover` |
| `date-picker` | 日期选择 | `.date-picker__popover` | `.dsh-picker-popover` | `.dsh-picker-popover` |
| `date-year` | 日期年份面板 | `.date-picker__popover` | `.dsh-picker-popover` | `.dsh-picker-popover` |
| `date-range` | 完整日期范围 | `.date-range-picker__popover` | `.dsh-picker-popover` | `.dsh-picker-popover` |
| `date-range-preview` | 日期范围选择中 | `.date-range-picker__popover` | `.dsh-picker-popover` | `.dsh-picker-popover` |
| `color-picker` | 颜色选择 | `.color-picker__popover` | `.arco-color-picker-panel` | `.arco-color-picker-panel` |
| `menu` | 动作菜单选中态 | `.menu` | `.arco-menu` | `.arco-menu` |
| `modal` | 短对话框 | `.modal__dialog` | `.arco-modal` | `.arco-modal` |
| `modal-long` | 长对话框内部滚动 | `.modal__dialog` | `.arco-modal` | `.arco-modal` |
| `drawer-right` | 右侧长抽屉 | `.drawer__dialog` | `.arco-drawer` | `.arco-drawer` |
| `drawer-bottom` | 底部抽屉 | `.drawer__dialog` | `.arco-drawer` | `.arco-drawer` |
| `accordion-single` | 单项折叠展开 | `.accordion` | `.arco-collapse` | `.arco-collapse` |
| `accordion-multiple` | 多项折叠展开 | `.accordion` | `.arco-collapse` | `.arco-collapse` |
| `button-group` | 按钮组 | `.button-group` | `.arco-btn-group` | `.arco-btn-group` |
| `link` | 链接 | `.link` | `.dsh-link` | `.arco-link` |
| `divider` | 分隔线 | `.separator` | `.arco-divider` | `.arco-divider` |
| `badge` | 徽章 | `.badge` | `.arco-badge` | `.arco-badge` |
| `spin` | 加载指示 | `.spinner` | `.arco-spin` | `.arco-spin` |
| `checkbox-group` | 复选组 | `.checkbox-group` | `.arco-checkbox-group` | `.arco-checkbox-group` |

| `input-number` | 数字输入 | `.number-field` | `.arco-input-number` | `.arco-input-number` |
| `pagination` | 分页 | `.pagination` | `.arco-pagination` | `.arco-pagination` |
| `typography` | 文字层级 | `.typography` | `.arco-typography` | `.arco-typography` |
| `empty` | 空状态 | `.empty-state` | `.arco-empty` | `.arco-empty` |
| `verification-code` | 验证码 | `.input-otp` | `.arco-verification-code` | `.arco-verification-code` |
| `form` | 表单字段 | `.textfield` | `.arco-form` | `.arco-form` |
| `form-error` | 表单校验 | `.textfield` | `.arco-form` | `.arco-form` |
| `scroll-shadow-start` | 滚动阴影：顶部 | `.scroll-shadow` | `.dsh-scroll-shadow` | `.dsh-scroll-shadow` |
| `scroll-shadow-middle` | 滚动阴影：中间 | `.scroll-shadow` | `.dsh-scroll-shadow` | `.dsh-scroll-shadow` |
| `scroll-shadow-end` | 滚动阴影：底部 | `.scroll-shadow` | `.dsh-scroll-shadow` | `.dsh-scroll-shadow` |

| `tag-removable` | 可删除标签 | `.tag-group` | `.arco-tag` | `.arco-tag` |
| `tag-group` | 可删除标签组 | `.tag-group` | `.arco-tag` | `.arco-tag` |
| `popconfirm` | 操作确认气泡 | `.popover` | `.arco-popconfirm-popup-content` | `.arco-popconfirm-content` |
| `progress-circle` | 环形进度 | `.progress-circle` | `.arco-progress` | `.arco-progress` |
| `calendar` | 独立卡片日历 | `.calendar` | `.dsh-hero-calendar` | `.dsh-hero-calendar` |
| `calendar-year` | 独立日历年份网格 | `.calendar` | `.dsh-hero-calendar` | `.dsh-hero-calendar` |
| `statistic` | 统计数值 | `#comparison-anchor > div` | `.arco-statistic` | `.arco-statistic` |
| `descriptions` | 描述列表 | `#comparison-anchor > div` | `.arco-descriptions` | `.arco-descriptions` |
| `comment` | 评论与操作 | `#comparison-anchor > div` | `.arco-comment` | `.arco-comment` |
| `result` | 操作结果页 | `#comparison-anchor > div` | `.arco-result` | `.arco-result` |
| `page-header` | 页面标题与操作 | `#comparison-anchor > div` | `.arco-page-header` | `.arco-page-header` |

| `input-tag` | 标签输入 | `.input-group` | `.arco-input-tag` | `.arco-input-tag` |
| `space` | 控件间距 | `#comparison-anchor > div` | `.arco-space` | `.arco-space` |
| `grid` | 栅格布局 | `#comparison-anchor > div` | `.arco-row` | `.arco-row` |
| `layout` | 页面布局 | `#comparison-anchor > div` | `.arco-layout` | `.arco-layout` |
| `list` | 展示列表 | `#comparison-anchor > div` | `.arco-list` | `.arco-list` |
| `input-tag-empty` | 标签输入：空值 | `.input-group` | `.arco-input-tag` | `.arco-input-tag` |
| `input-tag-error` | 标签输入：错误 | `.input-group` | `.arco-input-tag` | `.arco-input-tag` |
| `input-tag-disabled` | 标签输入：禁用 | `.input-group` | `.arco-input-tag` | `.arco-input-tag` |
| `input-tag-readonly` | 标签输入：只读 | `.input-group` | `.arco-input-tag` | `.arco-input-tag` |
| `input-tag-prefix` | 标签输入：前缀 | `.input-group` | `.arco-input-tag` | `.arco-input-tag` |
| `message` | 全局消息 | `.toast` | `.dsh-toast` | `.arco-message` |
| `notification` | 全局通知 | `.toast` | `.dsh-toast` | `.arco-notification` |
| `message-info` | 全局消息：信息 | `.toast` | `.dsh-toast` | `.arco-message` |
| `message-warning` | 全局消息：警告 | `.toast` | `.dsh-toast` | `.arco-message` |
| `message-error` | 全局消息：错误 | `.toast` | `.dsh-toast` | `.arco-message` |
| `message-hover` | 全局消息：悬停关闭 | `.toast` | `.dsh-toast` | `.arco-message` |
| `message-normal` | 全局消息：普通 | `.toast` | `.dsh-toast` | `.arco-message` |
| `notification-info` | 全局通知：信息 | `.toast` | `.dsh-toast` | `.arco-notification` |
| `notification-warning` | 全局通知：警告 | `.toast` | `.dsh-toast` | `.arco-notification` |
| `notification-error` | 全局通知：错误 | `.toast` | `.dsh-toast` | `.arco-notification` |
| `notification-hover` | 全局通知：悬停关闭 | `.toast` | `.dsh-toast` | `.arco-notification` |
| `message-stack` | 消息：折叠堆叠 | `.toast` | `.dsh-toast` | `.arco-message` |
| `message-stack-hover` | 消息：展开堆叠 | `.toast` | `.dsh-toast` | `.arco-message` |
| `notification-stack` | 通知：折叠堆叠 | `.toast` | `.dsh-toast` | `.arco-notification` |
| `notification-stack-hover` | 通知：展开堆叠 | `.toast` | `.dsh-toast` | `.arco-notification` |

| `timeline` | 时间线 | `#comparison-anchor > div` | `.arco-timeline` | `.arco-timeline` |
| `timeline-hollow` | 时间线：空心节点 | `#comparison-anchor > div` | `.arco-timeline` | `.arco-timeline` |
| `timeline-horizontal` | 时间线：横向 | `#comparison-anchor > div` | `.arco-timeline` | `.arco-timeline` |
| `timeline-right` | 时间线：右侧 | `#comparison-anchor > div` | `.arco-timeline` | `.arco-timeline` |
| `timeline-alternate` | 时间线：交替布局 | `#comparison-anchor > div` | `.arco-timeline` | `.arco-timeline` |
| `timeline-relative` | 时间线：相对标签 | `#comparison-anchor > div` | `.arco-timeline` | `.arco-timeline` |
| `timeline-alternate-relative` | 时间线：交替相对标签 | `#comparison-anchor > div` | `.arco-timeline` | `.arco-timeline` |
| `timeline-reverse` | 时间线：倒序 | `#comparison-anchor > div` | `.arco-timeline` | `.arco-timeline` |
| `timeline-custom` | 时间线：自定义节点与线型 | `#comparison-anchor > div` | `.arco-timeline` | `.arco-timeline` |
| `timeline-pending` | 时间线：待完成节点 | `#comparison-anchor > div` | `.arco-timeline` | `.arco-timeline` |
| `timeline-horizontal-bottom` | 时间线：横向底部 | `#comparison-anchor > div` | `.arco-timeline` | `.arco-timeline` |
| `timeline-horizontal-relative` | 时间线：横向相对标签 | `#comparison-anchor > div` | `.arco-timeline` | `.arco-timeline` |
| `timeline-horizontal-alternate` | 时间线：横向交替布局 | `#comparison-anchor > div` | `.arco-timeline` | `.arco-timeline` |
| `anchor` | 锚点导航 | `#comparison-anchor nav` | `.arco-anchor` | `.arco-anchor` |
| `anchor-active` | 锚点导航：选中 | `#comparison-anchor nav` | `.arco-anchor` | `.arco-anchor` |
| `anchor-nested` | 锚点导航：嵌套 | `#comparison-anchor nav` | `.arco-anchor` | `.arco-anchor` |
| `anchor-lineless` | 锚点导航：无轴线 | `#comparison-anchor nav` | `.arco-anchor` | `.arco-anchor` |
| `anchor-hover` | 锚点导航：悬停 | `#comparison-anchor nav` | `.arco-anchor` | `.arco-anchor` |
| `anchor-focus` | 锚点导航：键盘焦点 | `#comparison-anchor nav` | `.arco-anchor` | `.arco-anchor` |
| `anchor-custom` | 锚点导航：高自定义标题 | `#comparison-anchor nav` | `.arco-anchor` | `.arco-anchor` |

| `steps` | 步骤导航 | `#comparison-anchor > div` | `.arco-steps` | `.arco-steps` |
| `steps-vertical` | 步骤：纵向 | `#comparison-anchor > div` | `.arco-steps` | `.arco-steps` |
| `steps-label-vertical` | 步骤：底部标签 | `#comparison-anchor > div` | `.arco-steps` | `.arco-steps` |
| `steps-small` | 步骤：小尺寸 | `#comparison-anchor > div` | `.arco-steps` | `.arco-steps` |
| `steps-error` | 步骤：错误 | `#comparison-anchor > div` | `.arco-steps` | `.arco-steps` |
| `steps-disabled` | 步骤：禁用 | `#comparison-anchor > div` | `.arco-steps` | `.arco-steps` |
| `steps-lineless` | 步骤：无连线 | `#comparison-anchor > div` | `.arco-steps` | `.arco-steps` |
| `steps-custom` | 步骤：自定义图标 | `#comparison-anchor > div` | `.arco-steps` | `.arco-steps` |
| `rate` | 评分 | `.toggle-button-group` | `.arco-rate` | `.arco-rate` |
| `rate-empty` | 评分：空值 | `.toggle-button-group` | `.arco-rate` | `.arco-rate` |
| `rate-half` | 评分：半选 | `.toggle-button-group` | `.arco-rate` | `.arco-rate` |
| `rate-disabled` | 评分：禁用 | `.toggle-button-group` | `.arco-rate` | `.arco-rate` |
| `rate-readonly` | 评分：只读 | `.toggle-button-group` | `.arco-rate` | `.arco-rate` |
| `rate-custom` | 评分：自定义图标 | `.toggle-button-group` | `.arco-rate` | `.arco-rate` |
| `rate-hover` | 评分：悬停 | `.toggle-button-group` | `.arco-rate` | `.arco-rate` |
| `rate-selected` | 评分：点击选中 | `.toggle-button-group` | `.arco-rate` | `.arco-rate` |
| `steps-rtl` | 步骤：RTL | `#comparison-anchor > div` | `.arco-steps` | `.arco-steps` |
| `steps-vertical-rtl` | 步骤：RTL纵向 | `#comparison-anchor > div` | `.arco-steps` | `.arco-steps` |
| `rate-rtl` | 评分：RTL | `.toggle-button-group` | `.arco-rate` | `.arco-rate` |
| `rate-half-rtl` | 评分：RTL半选 | `.toggle-button-group` | `.arco-rate` | `.arco-rate` |
| `rate-half-hover` | 评分：半选悬停 | `.toggle-button-group` | `.arco-rate` | `.arco-rate` |
| `rate-half-selected` | 评分：半选点击 | `.toggle-button-group` | `.arco-rate` | `.arco-rate` |
| `tree` | 树：收起 | `.list-box` | `.arco-tree` | `.arco-tree` |
| `tree-expanded` | 树：展开 | `.list-box` | `.arco-tree` | `.arco-tree` |
| `tree-selected` | 树：选中 | `.list-box` | `.arco-tree` | `.arco-tree` |
| `tree-checkable` | 树：复选半选 | `.list-box` | `.arco-tree` | `.arco-tree` |
| `tree-checked` | 树：复选全选 | `.list-box` | `.arco-tree` | `.arco-tree` |
| `tree-disabled` | 树：禁用节点 | `.list-box` | `.arco-tree` | `.arco-tree` |
| `tree-hover` | 树：悬停 | `.list-box` | `.arco-tree` | `.arco-tree` |
| `tree-rtl` | 树：RTL | `.list-box` | `.arco-tree` | `.arco-tree` |
| `tree-expand-click` | 树：点击展开 | `.list-box` | `.arco-tree` | `.arco-tree` |
| `tree-select-click` | 树：点击选中 | `.list-box` | `.arco-tree` | `.arco-tree` |
| `tree-check-click` | 树：点击全选 | `.list-box` | `.arco-tree` | `.arco-tree` |
| `tree-checkable-rtl` | 树：RTL复选半选 | `.list-box` | `.arco-tree` | `.arco-tree` |

| `transfer` | 穿梭框 | `.comparison-transfer` | `.arco-transfer` | `.arco-transfer` |
| `transfer-selected` | 穿梭框：源选中 | `.comparison-transfer` | `.arco-transfer` | `.arco-transfer` |
| `transfer-target-selected` | 穿梭框：目标选中 | `.comparison-transfer` | `.arco-transfer` | `.arco-transfer` |
| `transfer-disabled` | 穿梭框：禁用 | `.comparison-transfer` | `.arco-transfer` | `.arco-transfer` |
| `transfer-hover` | 穿梭框：悬停 | `.comparison-transfer` | `.arco-transfer` | `.arco-transfer` |
| `transfer-move` | 穿梭框：点击移入 | `.comparison-transfer` | `.arco-transfer` | `.arco-transfer` |
| `transfer-return` | 穿梭框：点击移回 | `.comparison-transfer` | `.arco-transfer` | `.arco-transfer` |
| `transfer-rtl` | 穿梭框：RTL | `.comparison-transfer` | `.arco-transfer` | `.arco-transfer` |

日期范围展示两个月，单月网格保留官方 252px 宽度；组合容器宽 528px，网格间距 24px，防止默认单月容器挤压两个网格。年份面板与日期网格同级挂载，由官方 YearPickerGrid 测量日期网格并设置滚动区域。年份面板遵循用户确认的例外，三端保留官方主题原生细滚动条及其占位宽度；此例外只适用于年份网格，持续至官方年份选择器改用无占位滚动，再统一移除。范围选择中状态由公开状态方法或等效点击、悬停操作建立，先选择 12 日，再预览 16 日。

ColorPicker 组合固定为 HSB 饱和度/亮度平面、色相滑杆、透明度滑杆和十六进制输入框，不添加预设颜色或历史颜色。

Modal 短内容使用官方默认布局；长内容采用居中、内部滚动，并显式设置 `max-height: calc(100dvh - 240px)`，这是用户项目要求的上下各 120px 留白约束。Drawer 保留官方满高侧边或底部布局。长内容固定为 30 项，标题和底部操作保持可见。

TimePicker 对应官方 TimeField；Popconfirm 已采用官方 Popover 与按钮组合。TreeSelect、Cascader 等属于全量 Arco 验收范围，当前固定状态矩阵尚未覆盖，必须继续补充。Transfer 采用 Surface、ListBox、Checkbox 和 Button 建立组合基准，保留双列表选择、全选和移动行为。

`states.json` 保存机器可读的状态顺序与面板选择器；采样时必须确认对应选择器存在且有可见面积，不能将空面板作为有效样本。

消息和通知对应官方 Toast，默认宽 460px、窗口边距 16px。堆叠固定三条，最新消息置前，悬停后按实际高度与 12px 间距展开。Notification 中间消息使用长说明。`*-hover` 状态通过真实鼠标移动建立。React 使用作用域内 holder，避免静态 API 的宿主主题影响独立 Provider；`feedback-limit=1` 可在预览页检查同步新增三条时只保留两条的容量限制。

时间线由 Paragraph、Description 与 Separator 组合；自定义节点与待完成节点使用同一 SVG。竖向交替布局两侧各留 19px，相对标签与正文垂直居中。Anchor 使用 Link 和 Separator，选中、悬停和焦点通过浏览器实际点击、鼠标移动和 Tab 操作建立；高自定义标题为 64px，行高由内容撑开。

Steps 使用 Button、Label、Description 和 Separator 的默认样式组合；Rate 使用分离的 ToggleButtonGroup，半选保留一半背景和图形。Tree 使用扁平 ListBox 与层级缩进，Checkbox.Content 提供真实勾选交互；展开箭头阻止 pointer 事件冒泡，避免展开时误选父节点。点击态均通过浏览器真实点击建立，随后移开鼠标。

Transfer 固定单列宽 180px、高 224px、列间距 12px，标题为“可用模式”和“已启用”，计数使用 Description。内部基础 List 保持透明背景，外层列表承担滚动，避免多层滚动裁剪造成圆角抗锯齿差异。`transfer-move` 和 `transfer-return` 先点击复选框再点击移动按钮；两端 `transfer-long=1` 提供 20 条源数据的真实滚动行为检查入口。

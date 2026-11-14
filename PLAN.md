# dsh-ui-components 制作计划

本文件记录分批实施范围与当前进度，每批完成后更新勾选状态。

## 背景

`@dsh-plugin/dsh-ui-components` 为 DSH 插件提供一套与宿主视觉一致的 React 组件库。组件语义与交互由 `@arco-design/web-react` 承担，皮肤由 DSH 的 `--dsw-*` 语义令牌驱动，图标来自 IconPark。

样式依据来自 DSH 源码 `packages/client/ui-theme/src/styles/`（工作区已有副本 `.dsh/temp/session-tree-harness`，版本 `0.2.2-rc.2`），组件尺寸依据来自 `packages/client/ui-primitives/`，视觉规范见其 `docs/web-styling.md` 与 `docs/ui-radius.md`。

## 交付形态

本包是以 ESM 逐文件产出的源码库，不做 bundling，也不注册为 DSH 客户端模块：

- 消费方插件用自己的 `tsdown` 把本包内联，`react`、`react-dom`、`@dsh-plugin/dsh-loader/client` 三项声明为 external。
- 运行期 React 与 Arco 仍是宿主唯一实例，本包不自带副本。
- 样式以字符串常量通过 loader 的 `injectStyle` 注入，消费方无需任何 CSS 管线。
- 逐文件产物是 tree-shaking 与图标按需寻址的前提。

## 关键机制

**皮肤来自 CSS 变量重绑。** Arco 组件的颜色全部走 `rgb(var(--primary-6))`、`var(--color-text-1)` 这类自身变量，默认值声明在 `body` 上。桥接表把这些变量整体改指 DSH 语义令牌，因此多数控件的视觉差异不需要覆盖任何一条具体规则。

**变量挂在 `.dsh-ui` 容器类上，不写在 `body`。** 元素自身的声明优先于 `body` 的继承值，宿主 Arco 主题因此不受影响。Arco 原规则特异度是 (0,1,0)，`.dsh-ui .arco-btn` 是 (0,2,0)，无需 `!important`。

**色阶使用 `R,G,B` 三元组字面量。** Arco 以 `rgb(var(--primary-6))` 的形式消费，无法引用一个 `rgb(...)` 字符串令牌。品牌色、状态色与中性色的十级色阶因此以三元组常量写在桥接文件中，这是本项目唯一允许出现字面色值的文件。

**浮层挂到统一容器。** Arco 的 Modal、Select 下拉、Tooltip 默认挂到 `body`，会脱离 `.dsh-ui` 容器。`DshProvider` 通过 `ConfigProvider.getPopupContainer` 把全部浮层挂到带 `.dsh-ui` 类的 `#dsh-ui-portal`，随 provider 卸载移除。

**图标三条寻址通道。** 单一运行时按名查表会把 2658 个图标全部内联，且消费方 `codeSplitting: false` 使动态 `import()` 不可用，因此拆为三条通道：根导出的策划命名集、`./icons/<PascalName>` 全量逐图标子路径、`./icons-index` 全量元数据（不导入任何图标模块）。

## 批次

- [x] 批次 0：脚手架与基础层
  - [x] `package.json`、`tsconfig.json`、`tsconfig.build.json`、`vitest.config.ts`、`.gitignore`
  - [x] `LICENSE`（MIT）、`NOTICE`（IconPark Apache-2.0 声明）
  - [x] `.github/workflows/npm-publish.yml`
  - [x] 令牌桥 `src/foundation/bridge.ts`
  - [x] `DshProvider`、`injectStyle` 封装、`cx`
  - [x] 图标三通道与生成脚本 `scripts/gen-icons.mjs`
  - [x] 门禁脚本：`verify-tokens`、`verify-icons`、`verify-colors`、`check-size`
- [x] 批次 1：基础控件
  - [x] `Button`、`IconButton`、`Input`、`InputNumber`、`Textarea`
  - [x] `Select`、`AutoComplete`、`Checkbox`、`Radio`、`Switch`
  - [x] `Slider`、`Rate`、`Form`、`Field`
  - [x] `Upload` 由 `Form` 之外的批次 3 浮层一并处理
- [ ] 批次 2：展示
  - [ ] `Card`、`Tag`、`Pill`、`Avatar`、`Badge`、`Divider`、`Typography`
  - [ ] `Collapse`、`Descriptions`、`Empty`、`Skeleton`、`Spin`
  - [ ] `Tooltip`、`Popover`、`HoverCard`
- [ ] 批次 3：反馈与浮层
  - [ ] `Alert`、`Message`、`Notification`、`Progress`、`Result`
  - [ ] `Modal`、`Drawer`、`Popconfirm`（120px 留白外壳 + `Scrollbar`）
- [ ] 批次 4：导航
  - [ ] `Menu`、`Dropdown`、`Tabs`、`Breadcrumb`、`Pagination`
  - [ ] `Steps`、`SegmentedControl`、`DisclosureRow`、`StateDot`
- [ ] 批次 5：数据
  - [ ] `Table`、`Tree`、`List`、`Transfer`
  - [ ] `DatePicker`、`TimePicker`、`Cascader`、`TreeSelect`
  - [ ] `Statistic`、`Timeline`、`Calendar`、`Carousel`、`Image`
- [ ] 批次 6：DSH 专属组合件
  - [ ] `SettingsCard`、`SettingsRow`、`PanelShell`、`MenuSelect`
  - [ ] `JsonTree`、`CodeBlockShell`、`FileTypeBadge`、`StatusLine`
- [ ] 批次 7：文档与发布
  - [ ] `docs/preview/` 演示站（明暗切换、令牌面板、图标搜索）
  - [ ] `docs/tokens.md` 令牌对照表
  - [ ] 真实宿主截图比对
  - [ ] README 组件全表

## 质量门禁

`npm run verify` 串联三个脚本，任一失败即中止：

1. `verify-tokens`：扫描源码中出现的每个 `--dsw-` 变量名，与 DSH 三张样式表解析出的集合比对，出现未定义的名字直接报错。宿主升级后改名会在此最早暴露。
2. `verify-icons`：`ICON_INDEX` 条数等于 2658，每个条目的 `src/icons/<Pascal>.ts` 存在且为单行转导出，无多余或缺失文件。
3. `verify-colors`：除桥接文件与 `NOTICE` 外，源文件不得出现十六进制色值、`rgb(` 字面量或 `white` / `black`。

`npm test` 用 vitest + `@testing-library/react`，每个组件至少覆盖渲染可见内容、禁用态、受控值变化触发回调三类行为，断言用户可见行为。

## 边界

- **Arco 版本绑定**：Arco 由 dsh-loader 作为单例提供，本包不自带副本。宿主升级到破坏性版本时桥接表变量名可能失效，`verify-tokens` 覆盖不到这一层，测试用例固定在当前 Arco 版本上跑。
- **图标目录层级**：`src/icons/` 保持扁平 2658 个文件，`exports` 的 `./icons/*` 才能用单层通配符寻址。GitHub 目录浏览会变慢，分类信息改由 `ICON_INDEX` 元数据承载。
- **未覆盖的 Arco 变量**：少数无对应 DSH 令牌的视觉细节保留 Arco 原值，在桥接文件中逐条注释说明。
- **不做的事**：不发布独立 Client 插件行、不接管宿主 Arco 的安装与主题同步、不自绘滚动条（统一用 loader 的 `Scrollbar`）、不引入 CSS Modules 或 Tailwind。

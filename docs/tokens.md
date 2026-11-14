# DSH 令牌对照表

本表记录本包桥接的 Arco 变量与 DSH 语义令牌之间的对应关系。左边是 Arco 组件实际消费的变量，右边是本包改写成的宿主令牌。

修改 `src/foundation/bridge.ts` 时同步更新本表；`npm run verify:tokens` 会核对右列令牌名在宿主样式表中确实存在。

## 文字层级

| Arco 变量 | DSH 令牌 | 用途 |
|---|---|---|
| `--color-text-1` | `--dsw-alias-label-primary` | 正文与标题 |
| `--color-text-2` | `--dsw-alias-label-secondary` | 次要文字、说明 |
| `--color-text-3` | `--dsw-alias-label-tertiary` | 提示、单位、占位 |
| `--color-text-4` | `--dsw-alias-label-caption` | 禁用与极弱文字 |

## 背景与边框

| Arco 变量 | DSH 令牌 |
|---|---|
| `--color-bg-1` | `--dsw-alias-bg-base` |
| `--color-bg-2` | `--dsw-alias-bg-layer-1` |
| `--color-bg-3` | `--dsw-alias-bg-layer-2` |
| `--color-bg-4`、`--color-bg-5` | `--dsw-alias-bg-layer-3` |
| `--color-border`、`--color-border-2` | `--dsw-alias-border-l2` |
| `--color-border-1` | `--dsw-alias-border-l1` |
| `--color-border-3` | `--dsw-alias-border-l3` |
| `--color-border-4` | `--dsw-alias-border-l4` |
| `--color-fill-2` | `--dsw-alias-interactive-bg-hover` |
| `--color-fill-3` | `--dsw-alias-interactive-bg-hover-solid` |
| `--color-fill-4` | `--dsw-alias-interactive-bg-active` |

## 圆角

按 DSH 圆角标准重绑，取值与 `docs/ui-radius.md` 一致。

| Arco 变量 | 取值 | 对应角色 |
|---|---|---|
| `--border-radius-small` | `--dsw-radius-sm`（8px） | H20–28 的紧凑控件 |
| `--border-radius-medium` | `--dsw-radius-md`（12px） | H32–40 的标准控件 |
| `--border-radius-large` | `--dsw-radius-lg`（16px） | 分组内容与多行单元格 |
| `--border-radius-circle` | `50%` | 圆形头像与圆点 |

## 浮层与状态

| 用途 | DSH 令牌 |
|---|---|
| 菜单与下拉表面 | `--dsw-specific-menu` + `--dsw-menu-backdrop-filter` |
| 浮起阴影 | `--dsw-elevation-panel` / `--dsw-elevation-prominent` / `--dsw-elevation-soft` |
| Tooltip 背景与文字 | `--dsw-alias-tooltip-bg` / `--dsw-alias-tooltip-label` |
| 遮罩 | `--dsw-alias-bg-mask-1` |
| 业务强调（品牌蓝） | `--dsw-alias-state-business-primary` |
| 成功 | `--dsw-alias-state-success-primary` |
| 警告 | `--dsw-alias-state-warn-primary` |
| 错误 | `--dsw-alias-state-error-primary` |
| 主按钮 | `--dsw-alias-button-primary-fill` / `--dsw-alias-button-primary-hover` |
| 焦点环 | `--dsw-focus-ring-width` + `--dsw-alias-state-business-primary` |
| 等宽字体 | `--ds-font-family-code` |

## 需要三元组字面量的部分

Arco 以 `rgb(var(--primary-6))` 的形式消费色阶，无法引用一个 `rgb(...)` 字符串令牌，因此以下色阶以 `R,G,B` 三元组写死在 `src/foundation/bridge.ts`，深浅主题各一份：

`--primary-1..10`、`--gray-1..10`、`--arcoblue-1..10`、`--blue-*`、`--green-*`、`--red-*`、`--orange-*`、`--orangered-*`、`--gold-*`、`--success-*`、`--warning-*`、`--danger-*`、`--link-*`。

基准色取自 `src/foundation/palette.ts` 的 `STATIC`，该表逐项对应宿主 `design-platform.css` 的 `--dsw-static-*`。宿主换配色时改这张表，色阶由 `ramp()` 自动展开。

浅色主题的主色基准是宿主的中性近黑色 `rgb(15,17,21)`，深色主题是近白色 `rgb(249,250,251)`：DSH 的主按钮本来就是中性色，品牌蓝只用于链接与强调。

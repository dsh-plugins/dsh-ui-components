# HeroUI 官方组件对照

此页面直接使用官方 `@heroui/react` 与 `@heroui/styles` 3.2.7，提供 22 组组件和一个 Modal，用于与 DSH Vue、React 页面逐项比较。

运行环境固定为 React / React DOM 19.3.1、Tailwind CSS 4.3.5、Vite 8.3.8，精确依赖记录在 `package-lock.json`。安装后执行 `npm run typecheck`、`npm run build` 或 `npm run dev`，开发端口为 5180。

- 浅色：`http://127.0.0.1:5180/?theme=light`
- 深色：`http://127.0.0.1:5180/?theme=dark`
- 标准弹窗：`http://127.0.0.1:5180/?theme=light&state=modal`

样本顺序与标签使用相邻 `./cases.json`，固定画布、字体和动画规则使用 `./fixture.css`。页面通过 `html[data-theme]` 启用官方主题，通过 `html[data-reduce-motion="true"]` 禁用内置动画。组件颜色、圆角、阴影、边框和间距来自官方默认样式。

当前 API 中，Button 使用 `isDisabled` 与 `onPress`；Checkbox、Radio、Switch 使用 `Content` 包裹 `Control` 和标签；Select 使用 Trigger、Value、Popover 与 ListBox 组合；Modal 使用 Backdrop、Container、Dialog、Header、Body 和 Footer。默认 Modal 的布局由 HeroUI 决定。

官方来源：[快速开始](https://heroui.com/en/docs/react/getting-started/quick-start)、[主题](https://heroui.com/en/docs/react/getting-started/dark-mode)、[减少动画](https://heroui.com/en/docs/react/getting-started/animation)、[Button API](https://heroui.com/en/docs/react/components/button)。

# dsh-ui-components

`@dsh-plugin/dsh-ui-components` 为 DSH 插件提供采用 HeroUI 风格的 React 组件库，保留 Arco Design 全部能力、DSH 组合组件与 IconPark 图标。

组件交互使用 `dsh-loader` 提供的 Arco 单例，样式由本包按需注入。消费方将 React、React DOM 和 `@dsh-plugin/dsh-loader/client` 保持为外部依赖。

```sh
npm install @dsh-plugin/dsh-ui-components
```

```tsx
import { Arco, Button, DshProvider, Field, Input } from '@dsh-plugin/dsh-ui-components'

export function SettingsPage() {
  return (
    <DshProvider theme="host" radius="md">
      <Field label="工作区名称" htmlFor="workspace-name">
        <Input id="workspace-name" placeholder="输入名称" />
      </Field>
      <Arco.DatePicker />
      <Button variant="primary">保存</Button>
    </DshProvider>
  )
}
```

`DshProvider` 支持宿主、系统、浅色、深色主题以及圆角、减少动画和方向配置。组件树与浮层同步使用当前主题。完整 API 通过 `Arco.X` 访问；本包根导出继续提供 DSH 包装组件。

静态 `Message`、`Notification` 与 `confirm` 默认跟随宿主明暗。局部主题使用 Provider 后代中的 `Arco.Message.useMessage()`、`Arco.Notification.useNotification()`、`Arco.Modal.useModal()`，并渲染返回的 holder。

- [使用、主题与图标](README.zh_CN.md)
- [Arco 全量能力与 HeroUI 对照](docs/arco-coverage.md)
- [设计令牌](docs/tokens.md)

Vue 版本使用独立包 `@dsh-plugin/dsh-ui-components-vue`。主分支的 [packages/vue](packages/vue/README.md) 保留一份源码，npm 开发版由 `vue` 分支发布。

运行 `npm run preview` 查看组件预览；交付前执行 `npm run typecheck`、`npm run build`、`npm test`、`npm run verify` 和 `npm run preview:build`。

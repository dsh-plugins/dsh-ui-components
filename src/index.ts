/**
 * 包出口。
 *
 * 组件按批次分组再统一从这里导出，调用方只依赖一个入口。图标另有两条通道：
 * 根导出的策划命名集，以及 `./icons/<pascal>` 这类逐图标子路径。
 *
 * 组件需要 DSH 皮肤时，在插件根部挂一次 `DshProvider`；不挂也能渲染，但
 * Arco 的浮层会挂到 `body` 下而拿不到 `.dsh-ui` 的变量。
 *
 * @module @dsh-plugin/dsh-ui-components
 */
export * from './foundation/index.js'
export * from './basic/index.js'
export * from './display/index.js'
export * from './feedback/index.js'
export * from './navigation/index.js'

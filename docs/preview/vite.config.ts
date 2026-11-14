import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

/**
 * 演示站的 Vite 配置。
 *
 * 演示站直接引用仓库源码而不是 `lib/`，改完组件刷新即可看到效果。唯一的别名
 * 是把 `@dsh-plugin/dsh-loader/client` 指向演示站替身：那份产物在浏览器里只
 * 注册模块表、拿不到静态导出，替身按同样语义提供 Arco 单例、样式注入器与
 * 滚动容器（详见 `loader-shim.tsx`）。
 */
export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  server: {
    port: 5178,
    strictPort: false,
    open: false,
  },
  resolve: {
    // React 与 Arco 必须是单实例，否则组件里的 hook 拿不到调度器。
    dedupe: ['react', 'react-dom'],
    alias: {
      '@dsh-plugin/dsh-loader/client': fileURLToPath(new URL('./loader-shim.tsx', import.meta.url)),
    },
  },
  build: {
    outDir: fileURLToPath(new URL('./dist', import.meta.url)),
    emptyOutDir: true,
  },
})

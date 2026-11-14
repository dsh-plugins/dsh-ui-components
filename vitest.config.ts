import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      // loader 的客户端产物只有 window.__ModuleLoader__.load 一层注册，静态
      // import 拿不到任何导出；测试用同一套模块解析在沙箱里求值它的工厂。
      '@dsh-plugin/dsh-loader/client': fileURLToPath(new URL('./tests/loader-mock.ts', import.meta.url)),
    },
  },
  test: {
    include: ['tests/**/*.spec.ts', 'tests/**/*.spec.tsx'],
    environment: 'node',
    globals: false,
    setupFiles: ['tests/jsdom-setup.ts'],
  },
})

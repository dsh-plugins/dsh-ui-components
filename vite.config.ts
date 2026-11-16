import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
  build: {
    cssCodeSplit: true,
    lib: { entry: { index: resolve('src/index.ts'), icons: resolve('src/vue/icons.ts'), style: resolve('src/vue/styles.css') }, formats: ['es'], cssFileName: 'style' },
    rollupOptions: {
      external: id => id === 'vue' || (id.startsWith('@arco-design/web-vue') && !id.endsWith('.css')),
      output: { entryFileNames: '[name].js', assetFileNames: '[name][extname]' },
    },
  },
})

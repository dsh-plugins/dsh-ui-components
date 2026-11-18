import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'
import react from '@vitejs/plugin-react'
import { categories } from '../../src/data/types'

const rootDir = fileURLToPath(new URL('../..', import.meta.url))

function loadSidebarComponents() {
  const files = [
    'src/data/cat-general-layout-nav.ts',
    'src/data/cat-data-entry.ts',
    'src/data/cat-display-feedback.ts',
  ]
  const items: Array<{ slug: string; name: string; title: string; category: string }> = []
  for (const f of files) {
    const txt = fs.readFileSync(path.join(rootDir, f), 'utf8')
    const blocks = txt.split(/\n  \{\n    slug:/).slice(1)
    for (const b of blocks) {
      const slug = b.match(/^\s*'([^']+)'/)?.[1]
      const name = b.match(/\n    name:\s*'([^']+)'/)?.[1]
      const title = b.match(/\n    title:\s*'([^']+)'/)?.[1]
      const category = b.match(/\n    category:\s*'([^']+)'/)?.[1]
      if (slug && name && title && category) {
        items.push({ slug, name, title, category })
      }
    }
  }
  return items
}

const allComponents = loadSidebarComponents()

const componentSidebarGroups = categories.map((cat) => ({
  text: cat.label,
  collapsed: false,
  items: allComponents
    .filter((c) => c.category === cat.key)
    .map((c) => ({
      text: `${c.name} · ${c.title}`,
      link: `/components/${c.slug}`,
    })),
}))

const guideSidebarGroup = {
  text: '开发指南',
  collapsed: false,
  items: [
    { text: '快速开始', link: '/guide/quick-start' },
    { text: '主题与 DshProvider', link: '/guide/theme' },
    { text: '组件覆盖与迁移', link: '/guide/coverage' },
    { text: '组件总览', link: '/overview' },
  ],
}

export default defineConfig({
  title: 'DSH UI Components',
  description: '基于 Arco Design + HeroUI 视觉令牌进行微调的 Vue 3 & React 18 组件库',
  lang: 'zh-CN',
  base: process.env.GITHUB_PAGES_BASE || '/',
  outDir: '../dist',
  cleanUrls: false,
  ignoreDeadLinks: true,

  themeConfig: {
    siteTitle: 'DSH UI Components',
    nav: [
      { text: '指南', link: '/guide/quick-start', activeMatch: '/guide/' },
      { text: '组件总览', link: '/overview', activeMatch: '/overview' },
      { text: '组件', link: '/components/button', activeMatch: '/components/' },
      { text: '主题定制', link: '/guide/theme' },
    ],
    sidebar: {
      '/guide/': [guideSidebarGroup, ...componentSidebarGroups],
      '/overview': [guideSidebarGroup, ...componentSidebarGroups],
      '/components/': [guideSidebarGroup, ...componentSidebarGroups],
    },
    outline: {
      level: [2, 3],
      label: '本页目录',
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索组件',
            buttonAriaLabel: '搜索组件',
          },
          modal: {
            noResultsText: '未找到相关组件或文档',
            resetButtonTitle: '清除搜索条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换浅色模式',
    darkModeSwitchTitle: '切换深色模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/dsh-plugins/dsh-ui-components' },
    ],
  },

  vite: {
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url)),
        '@dsh-plugin/dsh-loader/client': fileURLToPath(
          new URL('../../src/shims/loader-shim.tsx', import.meta.url)
        ),
      },
      dedupe: ['vue', 'react', 'react-dom'],
    },
    ssr: {
      noExternal: [
        '@arco-design/web-vue',
        '@arco-design/web-react',
        '@dsh-plugin/dsh-ui-components',
        '@dsh-plugin/dsh-ui-components-vue',
      ],
    },
    build: {
      chunkSizeWarningLimit: 3000,
    },
  },
})

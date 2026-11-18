import { h, watch } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import '@dsh-plugin/dsh-ui-components-vue/style.css'
import './custom.css'
import { docsState } from '../../../src/state/docs-state'
import NavFrameworkSwitch from './NavFrameworkSwitch.vue'
import DemoBlockById from './DemoBlockById.vue'
import ApiSectionById from './ApiSectionById.vue'
import ComponentHeader from './ComponentHeader.vue'
import ComponentOverviewGrid from './ComponentOverviewGrid.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    const { isDark } = useData()
    watch(
      isDark,
      (val) => {
        docsState.theme = val ? 'dark' : 'light'
      },
      { immediate: true }
    )
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(NavFrameworkSwitch),
    })
  },
  enhanceApp({ app }) {
    app.component('DemoBlockById', DemoBlockById)
    app.component('ApiSectionById', ApiSectionById)
    app.component('ComponentHeader', ComponentHeader)
    app.component('ComponentOverviewGrid', ComponentOverviewGrid)
  },
}

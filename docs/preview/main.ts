import { createApp } from 'vue'
import '../../src/vue/styles.css'

if (new URLSearchParams(window.location.search).get('compare') === '1') {
  Promise.all([import('./Comparison.vue'), import('../comparison/fixture.css')]).then(([{ default: Comparison }]) => {
    createApp(Comparison).mount('#root')
  })
} else {
  Promise.all([import('./App.vue'), import('./preview.css')]).then(([{ default: App }]) => {
    createApp(App).mount('#root')
  })
}

import { createApp } from 'vue'
import '@dsh-plugin/dsh-ui-components-vue/style.css'
import './styles/docs.css'
import App from './App.vue'
import { router } from './router'

createApp(App).use(router).mount('#app')

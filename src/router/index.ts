import { createRouter, createWebHashHistory } from 'vue-router'
import GuidePage from '../pages/GuidePage.vue'
import ComponentOverview from '../pages/ComponentOverview.vue'
import ComponentDocPage from '../pages/ComponentDocPage.vue'

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/components/button' },
    { path: '/guide/:section?', component: GuidePage },
    { path: '/overview', component: ComponentOverview },
    { path: '/components', redirect: '/components/button' },
    { path: '/components/:name', component: ComponentDocPage },
    { path: '/:pathMatch(.*)*', redirect: '/components/button' },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

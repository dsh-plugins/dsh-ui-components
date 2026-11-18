import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import GuidePage from '../pages/GuidePage.vue'
import ComponentOverview from '../pages/ComponentOverview.vue'
import ComponentDocPage from '../pages/ComponentDocPage.vue'

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomePage },
    { path: '/guide/:section?', component: GuidePage },
    { path: '/components', component: ComponentOverview },
    { path: '/components/:name', component: ComponentDocPage },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

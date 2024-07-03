import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/main.vue'
import Explore from '../views/explore.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/explore/:api',
      name: 'Explore',
      component: Explore
    }
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import Anasayfa from '../views/Anasayfa.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Anasayfa
    },
    {
      path: '/studentDetails/:id',
      name: 'details',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/StudentDetails.vue')
    }
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import login from '@/views/login/login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: login,
    },
    {
      path: '/home',
      component: () => import('@/views/home/home.vue'),
    },
  ],
})

export default router

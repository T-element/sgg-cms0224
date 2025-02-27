import { createRouter, createWebHistory } from 'vue-router'
import login from '@/views/login/login.vue'
import useHomeStore from '@/stores/homeStore'

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
      component: () => import('@/views/home/main.vue'),
    },
  ],
})

router.beforeEach((to, from) => {
  const homeStore = useHomeStore()

  if (to.path.startsWith('/main')) {
    homeStore.fetchMenuList()
  }
})

export default router

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
      path: '/main',
      component: () => import('@/views/main/main.vue'),
      redirect: '/main/home',
      children: [
        {
          path: '/main/home',
          component: () => import('@/views/main/modules/home/home.vue'),
        },
        {
          path: '/main/permission/user',
          component: () => import('@/views/main/modules/permission/user/user.vue'),
        },
        {
          path: '/main/permission/role',
          component: () => import('@/views/main/modules/permission/role/role.vue'),
        },
        {
          path: '/main/permission/menu',
          component: () => import('@/views/main/modules/permission/menu/menu.vue'),
        },
      ],
    },
    {
      path: '/:pathMath(.*)',
      component: () => import('@/views/notFound/notFound.vue'),
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

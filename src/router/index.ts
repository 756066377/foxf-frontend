import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '../stores/user'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: {
      requiresAuth: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 简化路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const isLoggedIn = userStore.isLoggedIn

  // 如果需要登录但未登录，重定向到登录页
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ path: '/login', replace: true })
    return
  }

  // 如果已登录且访问登录页，重定向到首页
  if (to.path === '/login' && isLoggedIn) {
    next({ path: '/home', replace: true })
    return
  }

  // 其他情况正常放行
  next()
})

export default router 
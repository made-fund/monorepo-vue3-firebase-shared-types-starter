import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import handleAuthGuard from './middleware/handleAuthGuard'
import handleGuestGuard from './middleware/handleGuestGuard'

declare module 'vue-router' {
  interface RouteMeta {
    middleware: 'auth' | 'guest'
  }
}

const routes: RouteRecordRaw[] = [
  // preloaded routes
  { path: '/', name: 'home', component: HomeView, meta: { middleware: 'auth' } },

  /**
   * ❓ lazy loaded routes
   * These files / pages only get loaded IF the user routes to them.
   */
  { path: '/login', name: 'login', meta: { middleware: 'guest' }, component: () => import('@/views/LoginView.vue') },
  { path: '/register', name: 'register', meta: { middleware: 'guest' }, component: () => import('@/views/RegisterView.vue') },
]

const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes })

router.beforeEach((to, from, next) => {
  const { middleware } = to.meta

  if (middleware === 'auth') return handleAuthGuard(to, from, next)
  if (middleware === 'guest') return handleGuestGuard(to, from, next)

  return next()
})

export default router

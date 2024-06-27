import { type RouteLocationNormalized, type NavigationGuardNext } from 'vue-router'
import { useUser } from '@/stores/user.store'

/**
 * Use this middleware for routes that do not need an authenticated user, but should
 * not be accessible when the user is already authenticated (for instance: the login screen)
 */
export default async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const { isAuthenticated } = useUser()

  if (isAuthenticated) return next({ name: 'Home', replace: true })

  next()
}

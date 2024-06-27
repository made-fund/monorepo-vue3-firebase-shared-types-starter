import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { useUser } from '@/stores/user.store'

/**
 * Use this middleware for routes that should
 * only be accessible for authenticated users
 */
export default async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const { isAuthenticated, hasCompletedOnboarding } = useUser()

  // if (isAuthenticated && !hasCompletedOnboarding) return next('/auth?currentStepIndex=2')
  if (isAuthenticated) return next()

  return next('/login')
}

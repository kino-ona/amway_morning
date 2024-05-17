import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import generatedRoutes from '~pages'
import { setupLayouts } from 'virtual:generated-layouts'

const WHITE_NAME_LIST: string[] = []

// app router
export const router = createRouter({
  history: createWebHistory(),
  routes: setupLayouts(generatedRoutes),
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    return { top: 0, left: 0 }
  },
})

// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

// config router
export function setupRouter(app: App<Element>) {
  app.use(router)

  return router
}

import '~/assets/scss/style.scss'
import { createApp } from 'vue'
import { setupStore } from '~/stores'
import { setupRouter } from '~/routers'
import { setupGlobDirectives } from '~/directives'
import { setupGlobComponents } from '~/modules/components'
import { setupRouterGuard } from '~/routers/guard'
import App from './App.vue'

async function bootstrap() {
  const app = createApp(App)

  // mock server
  if (import.meta.env.VITE_GLOB_USE_MOCK === 'true') {
    const { createMock } = await import('../mocks')
    await createMock(false)
  }

  // Configure store
  setupStore(app)

  // Configure routing
  const router = setupRouter(app)

  // Register global directive
  setupGlobDirectives(app)

  // Register global component
  setupGlobComponents(app)

  // router-guard
  setupRouterGuard(router)

  app.mount('#app')
}

bootstrap()

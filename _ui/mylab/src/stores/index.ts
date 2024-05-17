import type { App } from 'vue'
import { createPinia } from 'pinia'
import { watch } from 'vue'
import { defaultKitStore } from '~/stores/kit'

const store = createPinia()

if (sessionStorage.getItem('kitState') && !store.state.value.kit) {
  const kitState = JSON.parse(sessionStorage.getItem('kitState') ?? '{}')
  store.state.value.kit = {
    ...defaultKitStore,
    ...kitState,
  }
}
watch(
  () => store.state.value.kit,
  (state) => {
    sessionStorage.setItem('kitState', JSON.stringify(state))
  },
  { deep: true }
)

export function setupStore(app: App<Element>) {
  app.use(store)
}

export { store }

import { App } from 'vue'
import VueFinalModal from 'vue-final-modal'

export function setupGlobComponents(app: App<Element>) {
  app.use(VueFinalModal)
}

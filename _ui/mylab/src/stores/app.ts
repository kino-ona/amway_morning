import { defineStore } from 'pinia'
import { store } from '~/stores'

interface AppState {
  // Page loading status
  pageLoading: boolean
  isAsideOpen: boolean
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    pageLoading: false,
    isAsideOpen: false,
  }),
  getters: {
    getPageLoading(): boolean {
      return this.pageLoading
    },
    getAsideOpen(): boolean {
      return this.isAsideOpen
    },
  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading
    },
    setAsideSideOpen(isAsideOpen: boolean): void {
      this.isAsideOpen = isAsideOpen
    },
    toggleASideOpen(): void {
      this.setAsideSideOpen(!this.isAsideOpen)
    },
  },
})

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store)
}

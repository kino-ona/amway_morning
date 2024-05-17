import { RouteRecordRaw } from 'vue-router'

declare global {
  const __APP_INFO__: {
    pkg: {
      name: string
      version: string
      dependencies: Recordable<string>
      devDependencies: Recordable<string>
    }
    lastBuildTime: string
  }

  export type Writable<T> = {
    -readonly [P in keyof T]: T[P]
  }

  type Nullable<T> = T | null
  type Recordable<T = any> = Record<string, T>
  type ReadonlyRecordable<T = any> = {
    readonly [key: string]: T
  }

  interface ImportMetaEnv extends ViteEnv {
    readonly __: unknown
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }

  interface ViteEnv {
    readonly VITE_GLOB_APP_TITLE: string
    readonly VITE_GLOB_APP_SHORT_NAME: string
    readonly VITE_GLOB_BASE_API_URL: string
    readonly VITE_HYBRIS_DOMAIN_URL: string
    // MOCK
    readonly VITE_GLOB_USE_MOCK: 'true' | 'false' | undefined
    // OKTA
    readonly VITE_OKTA_ISSUER: string
    readonly VITE_OKTA_CLIENT_ID: string
    // Kakao
    readonly VITE_KAKAO_API_KEY: string
  }
}

export {}

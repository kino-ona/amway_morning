declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    layout?: string
    roles?: '1' | '2' | '3' | '4' | '5' | '6'
    ignoreAuth?: boolean
    title?: string
  }
}

export {}

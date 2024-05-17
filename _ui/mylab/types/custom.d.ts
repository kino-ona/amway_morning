import type { RouteRecordRaw } from 'vue-router'

type Fn = (...arg: unknown[]) => unknown | void

type PromiseFn<T extends Fn> = (...args: Parameters<T>) => ReturnType<T>

type RouteMenu = Pick<RouteRecordRaw, 'meta' | 'path'>

type RouteMenuRow = RouteMenu & { children?: RouteMenu[] }

interface LabelNValue<T> {
  label: string
  value: T
  disabled?: boolean
}

type YorN = 'Y' | 'N'

interface MobileConfirmed {
  mobile: string
  certify: string
}

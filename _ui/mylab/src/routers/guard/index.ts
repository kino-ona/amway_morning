import { Router } from 'vue-router'
import { PageEnum } from '~/routers/pageEnum'
import { createPermissionGuard } from './permissionGuard'
import { createUserGuard } from './userGuard'

export const WHITE_PATHS: string[] = [PageEnum.LOGIN, PageEnum.PARTNER_LOGIN, PageEnum.NOT_FOUND, PageEnum.SYSTEM_ERROR]

export function setupRouterGuard(router: Router) {
  if (import.meta.env.MODE !== 'publishing') {
    createPermissionGuard(router)
    createUserGuard(router)
  }
}

import type { Router } from 'vue-router'
import { getHybrisUserInfo, LoginType } from '~/apis/user'
import { useUserStoreWithOut } from '~/stores/user'
import { usePermission } from '~/hooks/usePermission'
import { getToken } from '~/utils/storage'
import { PageEnum } from '../pageEnum'
import { WHITE_PATHS } from '~/routers/guard'
import { RoleEnum } from '~/apis/model/userModel'

export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithOut()
  const { hasPermission } = usePermission()

  router.beforeEach(async (to, from, next) => {
    if (to.path === PageEnum.PARTNER_WELCOME) {
      next({
        path: PageEnum.PARTNER_LOGIN,
      })
      return
    }

    // Whitelist can be directly entered
    if (WHITE_PATHS.includes(to.path)) {
      next()
      return
    }

    if (!getToken()) {
      const hybrisUserInfo = await getHybrisUserInfo()
      console.log('hybrisUserInfo :>> ', hybrisUserInfo)
      if (hybrisUserInfo.customerUid) {
        try {
          await userStore.login(
            {
              distNo: hybrisUserInfo.customerUid,
            },
            LoginType.MEMBER
          )
        } catch {
          window.alert('사용자 정보 조회에 실패하였습니다.\n잠시 후 다시 접속해 주세요.')
          next({ path: PageEnum.SYSTEM_ERROR })
          return
        }
      } else {
        userStore.resetState()
      }
    }

    if (userStore.getLastUpdateTime === 0) {
      try {
        await userStore.getUserInfoAction()
      } catch {
        // nothing
      }
    }

    if (to.meta.ignoreAuth) {
      next()
      return
    } else if (!getToken()) {
      const query = {
        ...to.query,
      }
      if (to.path !== PageEnum.ROOT_PATH) {
        query.redirect = to.path
      }
      next({ path: PageEnum.LOGIN, query })
      return
    }

    // Jump to the 404 page after processing the login
    if (from.path === PageEnum.LOGIN && to.path === PageEnum.NOT_FOUND && to.fullPath !== PageEnum.ROOT_PATH) {
      next(PageEnum.ROOT_PATH)
      return
    }

    if (to.path === PageEnum.NOT_FOUND) {
      next({ path: to.fullPath, replace: true, query: to.query })
    } else if (!hasPermission(to.meta.roles)) {
      // 권한 없는 경우
      next({ path: PageEnum.NOT_PERMISSION })
    } else {
      let redirectPath = (from.query.redirect || to.path) as string
      // 맴버 로그인 인 경우 메인 페이지 url 설정
      if (
        redirectPath === PageEnum.ROOT_PATH &&
        !userStore.getRoles.some((userRole) =>
          ([RoleEnum.MAIN, RoleEnum.SUB, RoleEnum.MEMBER, RoleEnum.CUSTOMER] as RoleEnum[]).includes(userRole)
        )
      ) {
        redirectPath = PageEnum.PARTNER_ROOT
      }
      const redirect = decodeURIComponent(redirectPath)

      if (to.path === redirect) {
        next()
      } else {
        next({ path: redirect })
      }
    }
  })
}

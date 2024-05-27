import type { Router } from 'vue-router'
import { KitStatus } from '~/apis/model/kitModel'
import { GetUserMyInfoRes } from '~/apis/model/userModel'
import { WHITE_PATHS } from '~/routers/guard'
import { useUserStoreWithOut } from '~/stores/user'
import { PageEnum } from '../pageEnum'

export function createUserGuard(router: Router) {
  const userStore = useUserStoreWithOut()

  router.beforeEach(async (to, _from, next) => {
    // Whitelist can be directly entered
    if (WHITE_PATHS.includes(to.path) || to.meta.ignoreAuth) {
      next()
      return
    }

    const userInfo = userStore.getUserInfo
    if (userStore.getLastUpdateTime > 0) {
      if (userInfo?.status === KitStatus.WITHDRAWAL) {
        window.alert('탈퇴 후 30일이 지나지 않아 로그인 할 수 없습니다.')
        userStore.resetState()
        next({ path: PageEnum.LOGIN, replace: true })
        return
      }
      // 최신 약관 미동의 체크
      else if (to.path !== PageEnum.MEMBER_TERMS && (userInfo?.status === KitStatus.BEFORE || userInfo?.latestTerms)) {
        const query = {
          ...to.query,
        }
        if (!([PageEnum.ROOT_PATH, PageEnum.PARTNER_ROOT] as string[]).includes(to.path as string)) {
          query.redirect = to.path
        }
        next({ path: PageEnum.MEMBER_TERMS, query })
        return
      }
    }

    next()
  })
}

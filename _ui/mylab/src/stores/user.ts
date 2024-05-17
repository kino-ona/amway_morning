import { defineStore } from 'pinia'
import { GetUserMyInfoRes, LoginParams, RoleEnum } from '~/apis/model/userModel'
import { router } from '~/routers'
import { store } from '~/stores'
import { PageEnum } from '~/routers/pageEnum'
import { getUserInfo as getMemberUserInfoAPI, login as loginAPI, LoginType } from '~/apis/user'
import { getToken, removeRefreshToken, removeToken, setToken } from '~/utils/storage'
import { ErrorMessageMode } from '#/axios'

export interface UserStore {
  userInfo: Nullable<GetUserMyInfoRes>
  lastUpdateTime: number
}

export const useUserStore = defineStore('user', {
  state: (): UserStore => ({
    userInfo: null,
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(): Nullable<GetUserMyInfoRes> {
      return this.userInfo
    },
    getRoles(): RoleEnum[] {
      return ([this.userInfo?.type] as RoleEnum[]) ?? []
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime
    },
  },
  actions: {
    setUserInfo(info: Nullable<GetUserMyInfoRes>): void {
      this.userInfo = info
      this.lastUpdateTime = new Date().getTime()
    },
    resetState(): void {
      this.userInfo = null
      this.lastUpdateTime = 0
      removeToken()
      removeRefreshToken()
    },
    async login(data: LoginParams, loginType?: LoginType, errorMessageMode?: ErrorMessageMode): Promise<void> {
      const result = await loginAPI(data, loginType, errorMessageMode)
      setToken(result)
    },
    async afterLoginAction(): Promise<Nullable<GetUserMyInfoRes>> {
      if (!getToken()) return null
      // get user info
      return await this.getUserInfoAction()
    },
    async getUserInfoAction(): Promise<Nullable<GetUserMyInfoRes>> {
      if (!getToken()) return null

      const userInfo = await getMemberUserInfoAPI()

      this.setUserInfo(userInfo)

      return userInfo
    },
    logout(goLogin = true): void {
      if (getToken()) {
        this.resetState()
      }
      goLogin && router.push(PageEnum.LOGIN)
    },
  },
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store)
}

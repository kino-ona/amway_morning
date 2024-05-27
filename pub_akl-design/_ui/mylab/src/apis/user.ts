import type { ErrorMessageMode } from '#/axios'
import { KitStatus, KitStatusRes } from '~/apis/model/kitModel'
import { GetTermsRes } from '~/apis/model/termsModel'
import { getGlobalAge } from '~/pages/members/components/useMember'
import { defHttp } from '~/utils/http/axios'
import {
  GetUserMyInfoRes,
  LoginParams,
  LoginRes,
  GetHybrisUserInfo,
  GetMemberKitHistoryRes,
  GetMemberParams,
  GetMemberRes,
  GetOrderParams,
  GetOrdersRes,
  PostMemberLeave,
  SaveMemberReq,
  PostMobileCertifyReq,
  PostCheckMobileCertifyReq,
  GetUpdateTermsRes,
} from './model/userModel'

export const LoginType = {
  MEMBER: 'member',
  SUB_MEMBER: 'submember',
} as const

export type LoginType = typeof LoginType[keyof typeof LoginType]

export async function login(data: LoginParams, loginType?: LoginType, errorMessageMode: ErrorMessageMode = 'none') {
  let url = '/v1/api/auth/signin'

  if (loginType) {
    url = `${url}/${loginType}`
  }

  return await defHttp.post<LoginRes>(
    url,
    data,
    {},
    {
      errorMessageMode,
    }
  )
}

/**
 * @deprecated 서버측 미개발로 사용 안함
 * @param refreshToken
 * @returns
 */
export async function getRefreshToken(refreshToken: string) {
  return await defHttp.post<unknown>('/v1/api/auth/refresh-token', { refreshToken })
}

/**
 * @description: getUserInfo
 */
export async function getUserInfo() {
  return await defHttp
    .get<GetUserMyInfoRes>('/v1/api/user/info', {}, { errorMessageMode: 'none' })
    .then(({ status, latestTerms, ...data }) => {
      const statusId = (status as KitStatusRes).id

      return {
        ...data,
        status: statusId,
        latestTerms: latestTerms && statusId !== KitStatus.BEFORE,
      }
    })
}

export async function doLogout() {
  return await defHttp.get<void>('/v1/api/logout')
}

export async function getHybrisUserInfo() {
  return await defHttp
    .get<GetHybrisUserInfo>('/api/v2/amwaykorea/sso/authorizeEvent', {
      baseURL: import.meta.env.VITE_HYBRIS_DOMAIN_URL,
      withCredentials: true,
    })
    .then((data) => ({
      ...data,
      customerUid: data.customerUid ? decodeURIComponent(window.atob(data.customerUid)) : undefined,
    }))
    .catch(() => ({
      header: {
        status: 500,
        message: 'Hybris Exception',
      },
      customerUid: null,
    }))
}

export async function getMembers({ distNo, ...params }: GetMemberParams) {
  return await defHttp.get<GetMemberRes[]>(`/v1/api/user/list/${distNo}`, { params }).then((data) =>
    data.map(({ status, ...data }) => ({
      ...data,
      status: (status as KitStatusRes).id,
    }))
  )
}

export async function getMemberInfo(id: number) {
  return await defHttp.get<GetMemberRes>(`/v1/api/user/info/${id}`).then(({ status, ...data }) => ({
    ...data,
    status: (status as KitStatusRes).id,
  }))
}

export async function saveMemberInfo(data: SaveMemberReq) {
  let url = '/v1/api/user'
  let method = 'post'
  if (data.id) {
    url += `/update/${data.id}`
    method = 'put'
  } else {
    url += '/add'
  }

  return await defHttp[method]<void>(url, data)
}

export async function getMemberKitHistories(id: number) {
  return await defHttp.get<GetMemberKitHistoryRes[]>(`/v1/api/user/${id}/kit-histories`)
}

export async function removeMemberKitHistory(id: number, seq: number) {
  return await defHttp.delete<void>(`/v1/api/users/${id}/kit-histories/${seq}`)
}

export async function getOrders({ id, ...params }: GetOrderParams) {
  return await defHttp.get<GetOrdersRes>(`/v1/api/users/${id}/orders`, { params })
}

export async function saveMemberLeave(data: PostMemberLeave) {
  return await defHttp.post<void>('/v1/api/user/secession', data)
}

export async function removeMember(id: number) {
  return await defHttp.delete<void>(`/v1/api/user/delete/${id}`)
}

export async function sendMobileCertify(data: PostMobileCertifyReq) {
  return await defHttp.post<void>('/v1/api/auth/otp/number', data)
}

export async function checkMobileCertify(data: PostCheckMobileCertifyReq) {
  return await defHttp.post<void>('/v1/api/auth/otp/check', data)
}

export async function getUpdateUserTerms() {
  return await defHttp.get<GetUpdateTermsRes[]>('/v1/api/user/terms/update/list').then((data) => {
    const tempTerms: GetTermsRes[] = []

    data?.forEach(({ termsInfo }) => {
      termsInfo.forEach((info) => {
        const tempTermIds = tempTerms.map(({ id }) => id)
        if (!tempTermIds.some((id) => id === info.id)) {
          tempTerms.push(info)
        }
      })
    })

    return {
      terms: tempTerms,
      minorInfos: data?.filter(({ user }) => getGlobalAge(user.birth) < 14).map(({ user }) => user),
    }
  })
}

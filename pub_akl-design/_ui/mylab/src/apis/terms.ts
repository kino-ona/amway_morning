import { GetFooterTermsParams, GetTermsRes, GetTermsReq, SaveTermsReq } from '~/apis/model/termsModel'
import { defHttp } from '~/utils/http/axios'

export async function getTerms(params: GetTermsReq) {
  return await defHttp.get<GetTermsRes[]>('/v1/api/terms/list', { params })
}

export async function getTerm(seq: number) {
  return await defHttp.get<GetTermsRes>(`/v1/api/terms/info/${seq}`)
}

export async function getFooterTerm(seq: number) {
  return await defHttp.get<GetTermsRes>(`/v1/api/terms/info/${seq}`)
}

export async function getFooterTerms(params: GetFooterTermsParams) {
  return await defHttp.get<GetTermsRes[]>('/v1/api/terms/footer/list', { params })
}

export async function saveTerms(data: SaveTermsReq | SaveTermsReq[], isUpdate: boolean) {
  let url = '/v1/api/user/terms'
  if (isUpdate) {
    url += '/update'
  }

  return await defHttp['post']<void>(url, data)
}

import {
  KitSerialInfo,
  SaveKitReq,
  KitItem,
  progressStep1Status,
  progressStep2Status,
  progressStep3Status,
  progressStep4Status,
  GetOrderParams,
  GetOrdersRes,
  kitOrderReq,
  SurveyReq,
  KitPickUpReq,
  KitSurveyData,
  KitPickupRes,
  KitSurveyInfoItem,
  ReSendEmailRes,
  GetSkuInfoRes,
  GetKitConfirm,
  GetHolyDayRes,
} from '~/apis/model/kitModel'
import { defHttp } from '~/utils/http/axios'
import type { ErrorMessageMode } from '#/axios'
import dayjs from 'dayjs'

export async function postKitDeliveryConfirm(data: KitSerialInfo, errorMessageMode: ErrorMessageMode = 'modal') {
  return await defHttp.post<boolean>('/v1/api/order-confrim', data, {}, { errorMessageMode })
}

export async function saveKit(data: SaveKitReq, errorMessageMode: ErrorMessageMode = 'modal') {
  let url = '/v1/api/kit'
  let method = 'post'
  if (data.seq) {
    url += `/${data.seq}`
    method = 'put'
  }

  return await defHttp[method]<void>(url, data, {}, { errorMessageMode })
}

// 키트목록
export async function getKitListInfo(seq: number) {
  return await defHttp.get<KitItem[]>(`/v1/api/kit/list/${seq}`).then((res) =>
    res
      .filter((e) => !!e.id)
      .map((e) => {
        let resultStatus = ''
        const KitStatus = e.status
        if ((!!KitStatus && progressStep1Status.includes(KitStatus)) || (!KitStatus && !e.deliveryNo)) {
          resultStatus = 'step1'
        } else if (
          (!!KitStatus && progressStep2Status.includes(KitStatus)) ||
          (!KitStatus && e.deliveryNo && !e.arrivalDate)
        ) {
          resultStatus = 'step2'
        } else if (
          (!!KitStatus && progressStep3Status.includes(KitStatus)) ||
          (!KitStatus && e.deliveryNo && !!e.arrivalDate && !e.completeDate)
        ) {
          resultStatus = 'step3'
        } else if (
          (!!KitStatus && progressStep4Status.includes(KitStatus)) ||
          (!KitStatus && e.deliveryNo && !!e.arrivalDate && e.completeDate)
        ) {
          resultStatus = 'step4'
        }
        return {
          ...e,
          stepStatus: resultStatus,
        }
      })
  )
}

// GET 키트 수거 최대 조회
export async function getKitPickupMaximum(pickupDate: string) {
  return await defHttp.get<number>(`/v1/api/kit/maximum/${pickupDate}`)
}

// 전달받은 키트 확인
export async function getKitOrderCheck(payload: kitOrderReq) {
  const params = {
    distNo: payload.distNo,
    singleOrderNumber: '180-' + payload.orderNo,
  }
  return await defHttp.get<GetKitConfirm>(`/v1/api/kit/order/confirm`, { params })
}

// 키트 구매 목록
export async function getKitOrders(params: GetOrderParams) {
  return await defHttp.get<GetOrdersRes>(`/v1/api/kit/order/list`, { params }).then((res) => ({
    ...res,
    resultData: res.resultData.map((e, idx) => ({
      ...e,
      no: (res.Paging?.totalNumberOfResults ?? 0) - (res.Paging?.currentPage ?? 0) * (res.Paging?.pageSize ?? 10) - idx,
    })),
  }))
}

// PUT 키트 수거일 수정
export async function updateSampleKitPickup(
  { kitSerial, ...data }: KitPickUpReq,
  errorMessageMode: ErrorMessageMode = 'modal'
) {
  return await defHttp.put<void>(`/v1/api/kit/pickup/${kitSerial}`, data, {}, { errorMessageMode })
}

// 키트등록 및 수정
export async function saveKitSample(payload: kitOrderReq, errorMessageMode: ErrorMessageMode = 'modal') {
  let url = '/v1/api/kit/sample'
  let method = 'post'
  console.log('saveKitSample', payload)
  const param = {
    kitId: payload.kitSerial,
    orderId: payload.orderNo,
    userId: payload.userId,
    sampleKitTerms: payload.sampleKitTerms,
    distNo: payload.distNo,
  }
  if (payload.type === 'update') {
    url += `/${payload.oldKitSerial}/${payload.oldOrderNo}`
    delete param.sampleKitTerms
    method = 'put'
  }
  return await defHttp[method]<void>(url, param, {}, { errorMessageMode })
}
// 키트 설문조사 등록 및 수정
export async function addSampleKitSurvey(data: SurveyReq, errorMessageMode: ErrorMessageMode = 'modal') {
  const url = '/v1/api/kit/survey'
  let method = 'post'
  // "sampleKitId": "string",
  // "surveyData": {}
  if (data.type === 'update') {
    method = 'put'
  }

  return await defHttp[method]<void>(
    url,
    {
      sampleKitId: data.sampleKitId,
      surveyData: data.surveyData,
      email: data.email,
    },
    {},
    { errorMessageMode }
  )
}

// 키트 삭제
export async function removeSampleKit(seq: number, kitId: string, errorMessageMode: ErrorMessageMode = 'modal') {
  console.log('removeSampleKit', kitId)
  return await defHttp.delete<void>(`/v1/api/users/${seq}/kit-histories/${seq}`, {}, { errorMessageMode })
}

// 키트 수거일 정보 조회
export async function getPickupInfo(kitId: string) {
  return await defHttp.get<KitPickupRes>(`/v1/api/kit/pickup/${kitId}`)
}

// 키트 설문조사 정보 조회
export async function getSurveyInfo(kitId: string) {
  return await defHttp.get<KitSurveyData>(`/v1/api/kit/survey/${kitId}`)
}

// 설문조사 내용중 firstSampleId
export async function getFirstSampleId(userId: string) {
  return await defHttp.get<string>(`/v1/api/kit/first/sample/${userId}`)
}

// hem 약관 동의 정보
export async function getKitTermsInfoItem(sampleKitId: string) {
  return await defHttp.get<KitSurveyInfoItem[]>(`/v1/api/kit/survey/terms/${sampleKitId}`)
}

// 키트 삭제
export async function deleteSampleKit(sampleKitId: string, errorMessageMode: ErrorMessageMode = 'modal') {
  return await defHttp.delete<string>(`/v1/api/kit/sample/${sampleKitId}`, {}, { errorMessageMode })
}

// 이메일 재전송
export async function sendReportEmail(sampleId: string, errorMessageMode: ErrorMessageMode = 'modal') {
  return await defHttp.post<ReSendEmailRes>(`/v1/api/admin/email/report/${sampleId}`, {}, {}, { errorMessageMode })
}

// 상품 정보 조회
export async function getProductInfo(microbiome: string) {
  return await defHttp
    .get<GetSkuInfoRes>(
      `/v1/api/kit/sku/info/${microbiome}`,
      {},
      {
        errorMessageMode: 'none',
      }
    )
    .then((data) => {
      data.imageUrl = data.images?.find(({ imageType, format }) => imageType === 'PRIMARY' && format === 'product')?.url
      delete data.images
      data.url = data.url.replace('api.', '')
      return data
    })
}

export async function getHolyDays(year: string | number, month: string) {
  return await defHttp
    .get<GetHolyDayRes>(
      `/v1/api/kit/holyday/${year}/${month}`,
      {
        timeout: 5000,
      },
      {
        errorMessageMode: 'none',
      }
    )
    .then(
      ({
        body: {
          items: { item },
        },
      }) => {
        return Array.isArray(item) ? item.map(({ locdate }) => dayjs(`${locdate}`, 'YYYYMMDD').toDate()) : []
      }
    )
}

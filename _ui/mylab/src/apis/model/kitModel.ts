import type { YorN } from '#/custom'
import { BasicPageResult } from '~/apis/model/baseModel'
import { TermsListUserRes } from '~/apis/model/termsModel'

export const KitStatus = {
  BEFORE: 'S001', // 맴버등록
  READY: 'S002', // 접수대기
  CREATED: 'S003', // 접수진행
  PROCEED: 'S004', // 접수완료
  SHIPPING: 'S005', // 키트배송
  ARRIVAL: 'S006', // 키트도착
  ANALYZING: 'S007', // 분석중
  DONE: 'S008', // 분석완료
  REJECT: 'S009', // 키트반려
  WITHDRAWAL: 'S010', // 회원탈퇴
} as const

export type KitStatus = typeof KitStatus[keyof typeof KitStatus]
export interface KitStatusRes {
  id: KitStatus
  name: string
  type: string
}

/**
 * 키트 진행 중 표시 상태
 */
export const progressStatus: Readonly<KitStatus[]> = [
  KitStatus.PROCEED,
  KitStatus.SHIPPING,
  KitStatus.ARRIVAL,
  KitStatus.ANALYZING,
]
export interface KitSurveyData extends KitSurveyInfo {
  surveyData: KitSurveyData
}
export interface KitSurveyInfo {
  p1q1?: string // 성명
  p1q2?: string // 성별
  p1q3?: string // 생년월일
  p1q4?: string // 전화번호
  'p1q5-1'?: string // prefixAddress
  'p1q5-2'?: string // prefixAddress2
  'p1q5-3'?: string // postCode
  p1q6?: string // 이메일
  p1q7?: string // 키
  p1q8?: string // 몸무게
  p2q1?: string // 배변횟수
  p2q2?: string // 배변 시간
  p2q3?: string // 배변 활동 시간
  p2q4?: string // 배변 상태
  p3q1?: string
  p3q2?: string
  p3q3?: string
  p3q4?: string
  p3q5?: string
  p3q6?: string
  p4q1?: string
  p4q2?: string
  p4q3?: string
  p4q4?: string
  p4q5?: string
  p4q6?: string
  p4q7?: string
  // p4q8?: LabelNValue<string>[]
  p4q9?: string
  p5q1?: string
  p4q10?: string
  p4q11?: string
  'p2q5-1'?: string
  'p2q5-2'?: string
  'p2q5-3'?: string
  'p2q5-4'?: string
  'p4q8-1'?: string
  'p4q8-2'?: string
  'p4q8-3'?: string
  'p4q8-4'?: string
  'p4q8-5'?: string
  'p4q8-6'?: string
  'p5q2-1'?: string
  'p5q2-2'?: string
  'p5q2-3'?: string
  'p5q2-4'?: string
  'p5q2-5'?: string
  'p5q3-1'?: string
  'p5q3-2'?: string
  sampleId?: string
  'terms1-1'?: string //분석대상물 수집 이용 동의
  'terms1-2'?: string // 분석대상물 수집 이용 동의 여부 시간
  'terms2-1'?: string // 개인정보제3자 제공 동의(선택)
  'terms2-2'?: string // 개인정보제3자 제공 동의(선택) 여부 시간
  'terms3-1'?: string // 민감정보제3자 제공 동의(선택)
  'terms3-2'?: string // 민감정보제3자 제공 동의 여부 시간
  firstSampleId?: string // 최초 샘플 번호
}

export interface KitSerialInfo {
  distNo: string
  orderNo: string
  kitSerial: string
}

export interface KitPickUpInfo {
  pickupAddress1: string
  pickupAddress2: string
  pickupDate: Date
  postCode: string
}
export interface KitPickUpReq {
  address: string
  addressDetail: string
  pickupDate: Date | string
  zipCode: string
  kitSerial?: string
}

export interface SaveKitReq extends KitSerialInfo, KitPickUpInfo, KitSurveyInfo {
  seq?: number
  terms: SampleKitTerms[]
}

export interface GetKitInfoRes extends KitSerialInfo, KitPickUpInfo, KitSurveyInfo {
  seq: number
  terms: SampleKitTerms[]
}

export interface GetOrderParams {
  currentPage: number
  distNo: string
  isASC: boolean
  isNotSerial: boolean
  pageSize: number
}
export interface GetOrderRes {
  orderNumber: string
  orderDate: Date
  orderStatus: string
  sopStatus: boolean
  isSopCancel: boolean
  hasSerial: boolean
  no: number
}

export type GetOrdersRes = BasicPageResult<GetOrderRes>

export interface kitOrderReq {
  distNo?: string
  orderNo: string
  oldOrderNo?: string
  kitSerial: string
  oldKitSerial?: string
  type?: string
  userId?: string
  sampleKitTerms?: SampleKitTerms[]
}
export interface SampleKitTerms {
  agree: string
  termsInfoId: number
}
// KitSerialInfo
export interface KitItem {
  id?: string
  deliveryNo?: string
  pickupDate?: Date
  completeDate?: Date
  createdDate?: Date
  surveyDate?: Date
  status?: kitStatusDetail
  stepStatus?: string
  orderId?: string
  arrivalDate?: Date
  microbiome?: string
  resultStatus?: string
  endDate?: Date
  distNo?: string
}

export const kitStatusDetail = {
  UNUSED_SAMPLE: 100, // 미사용 샘플 100 미사용 샘플(접수 이전)
  DELIVERY_RESERVE: 110, // "마이랩에서 택배를 예약신청한 경우
  DELIVERY_RESERVE_SUCCESS: 120, // 택배 예약완료
  DELIVERY_PICKUP: 130, // 지점에서 고객의 택배를 수거한 상태 상태 값 제공 미정
  LIMS_RECEIPT: 200, // HEM에 샘플이 도착해서 접수완료
  LIMS_RECEIPT_CANCEL: 290, // 접수 시, 샘플의 분석불가 상태-기간초과/양부족/이상
  LIMS_RECEIPT_PERIOD_CANCEL: 291, // 접수 시, 샘플의 분석불가 상태-채변기간 초과
  LIMS_ANALYSIS: 300, // 실험 분석이 시작 된 상태
  LIMS_LACK_OF_ANALYTE: 380, // 분석 중 샘플 양 부족이 발생한 경우
  LIMS_ANALYSIS_FAILURE: 390, // 분석 중 샘플 이상으로 실패 된 상태
  LIMS_ANALYSIS_COMPLETE: 400, // 분석 완료 (결과 데이터 수집중)
  LIMS_REPORT_IN_PROGRESS: 410, // 결과지 제작중
  LIMS_REPORT_COMPLETE: 430, // 결과지 검수 완료
  LIMS_REPORT_SEND_EMAIL: 550, // 결과지 메일 발송 완료 상태
  SAMPLE_ABNORMAL: 900, // 샘플 상태 이상
  SAMPLE_DELETE: 990, // "삭제한 샘플"
} as const
export type kitStatusDetail = typeof kitStatusDetail[keyof typeof kitStatusDetail]

export const kitStatusDetailMsg = {
  100: '접수 이전입니다.',
  110: '마이랩에서 택배를 예약신청 하였습니다.',
  120: '택배 예약완료하였습니다',
  130: '키트가 분석기관에 배송중입니다',
  200: 'HEM에 샘플이 도착하여 접수완료 되었습니다.',
  290: `분석이 <span class="red">반려</span>되었습니다.<br />채취량 부족, 신선도 등의 이유로 분석이
  <span class="red">반려</span>되었습니다. 자동 발송되는 새로운 키트를 받으신 후, 재 등록하여 다시 접수
  해주세요.`,
  291: `분석이 <span class="red">반려</span>되었습니다.<br />채취량 부족, 신선도 등의 이유로 분석이
  <span class="red">반려</span>되었습니다. 자동 발송되는 새로운 키트를 받으신 후, 재 등록하여 다시 접수
  해주세요.`,
  300: '분석중 입니다.',
  380: `분석이 <span class="red">반려</span>되었습니다.<br />채취량 부족, 신선도 등의 이유로 분석이
  <span class="red">반려</span>되었습니다. 자동 발송되는 새로운 키트를 받으신 후, 재 등록하여 다시 접수
  해주세요.`,
  390: `분석이 <span class="red">반려</span>되었습니다.<br />채취량 부족, 신선도 등의 이유로 분석이
  <span class="red">반려</span>되었습니다. 자동 발송되는 새로운 키트를 받으신 후, 재 등록하여 다시 접수
  해주세요.`,
  400: '분석이 완료(결과 데이터 수집중)',
  410: '결과지 제작중',
  430: '결과지 검수 완료',
  550: '분석이 완료되었습니다.<br />맞춤형 프로바이오틱스 추천 제품과 이메일로 발송된 결과 레포트를 확인해주세요.<br />',
  900: `분석이 <span class="red">반려</span>되었습니다.<br />신선도 이상으로 분석이<span class="red">반려</span>되었습니다.자동 발송되는 새로운 키트를 받으신 후, 재 등록하여 다시 접수
  해주세요.`,
  990: '삭제한 샘플입니다',
} as const

export const progressStep1Status: Readonly<kitStatusDetail[]> = [
  kitStatusDetail.UNUSED_SAMPLE,
  kitStatusDetail.DELIVERY_RESERVE,
  kitStatusDetail.DELIVERY_RESERVE_SUCCESS,
]
export const progressStep2Status: Readonly<kitStatusDetail[]> = [
  kitStatusDetail.DELIVERY_PICKUP,
  kitStatusDetail.LIMS_RECEIPT,
]
export const progressStep3Status: Readonly<kitStatusDetail[]> = [
  kitStatusDetail.LIMS_ANALYSIS,
  kitStatusDetail.LIMS_ANALYSIS_COMPLETE,
  kitStatusDetail.LIMS_REPORT_IN_PROGRESS,
  kitStatusDetail.LIMS_REPORT_COMPLETE,
]
export const progressStep4Status: Readonly<kitStatusDetail[]> = [
  kitStatusDetail.LIMS_RECEIPT_CANCEL,
  kitStatusDetail.LIMS_RECEIPT_PERIOD_CANCEL,
  kitStatusDetail.LIMS_LACK_OF_ANALYTE,
  kitStatusDetail.LIMS_ANALYSIS_FAILURE,

  kitStatusDetail.LIMS_REPORT_SEND_EMAIL,
  kitStatusDetail.SAMPLE_ABNORMAL,
  kitStatusDetail.SAMPLE_DELETE,
]
export const failResults: Readonly<kitStatusDetail[]> = [
  kitStatusDetail.LIMS_RECEIPT_CANCEL,
  kitStatusDetail.LIMS_RECEIPT_PERIOD_CANCEL,
  kitStatusDetail.LIMS_LACK_OF_ANALYTE,
  kitStatusDetail.LIMS_ANALYSIS_FAILURE,
  kitStatusDetail.SAMPLE_ABNORMAL,
  kitStatusDetail.SAMPLE_DELETE,
]
export const sucessResults: Readonly<kitStatusDetail[]> = [
  // kitStatusDetail.LIMS_ANALYSIS_COMPLETE, // 400
  // kitStatusDetail.LIMS_REPORT_IN_PROGRESS, // 410
  // kitStatusDetail.LIMS_REPORT_COMPLETE, // 430
  kitStatusDetail.LIMS_REPORT_SEND_EMAIL, // 550
]

export interface SurveyReq {
  email: string
  sampleKitId: string
  surveyData: object
  type: string
}

export interface KitPickupRes {
  address: string
  addressDetail: string
  pickupDate: Date
  zipCode: string
}

export interface KitSurveyInfoItem {
  termsInfo: {
    id: number
    termsType: {
      id: number
      type: string
      name: string
      order: number
      hem: string
    }
    version: number
    type: string
    member: string
    target: string
    necessary: string
    status: string
    title: string
    contents: string
    createdUser: TermsListUserRes
    modifiedUser: TermsListUserRes
    createdDate: Date
    modifiedDate: Date
  }
  agree: string
  createdDate: Date
}

export interface ReSendEmailRes {
  MESSAGE: string
  STATUS: number
}

export const emailResend = {
  100: '정상 발송 되었습니다',
  110: '샘플이 존재 하지 않습니다.',
  120: '샘플 상태 이상으로 이메일 발송이 불가능 합니다.',
  130: '결과지 파일이 존재 하지 않습니다.',
  140: '이메일 주소가 누락되었습니다.',
  150: '이메일 주소 형식이 잘못되었습니다.',
  160: '개인 정보가 존재하지 않습니다.',
  900: '발송이 실패하였습니다.',
} as const

interface GetSkuInfoImageRes {
  format: string
  imageType: string
  url: string
}
export interface GetSkuInfoRes {
  images?: GetSkuInfoImageRes[]
  imageUrl?: string
  name: string
  url: string
}

export interface GetKitConfirm {
  message: string
}

export interface GetHolyDayRes {
  header: {
    resultCode: string
    resultMsg: string
  }
  body: {
    items: {
      item: {
        dateKind: string
        dateName: string
        isHoliday: YorN
        locdate: number
        seq: number
      }[]
    }

    numOfRows: number
    pageNo: number
    totalCount: number
  }
}

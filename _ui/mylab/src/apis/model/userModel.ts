import { BasicPageParams, BasicFetchResult } from '~/apis/model/baseModel'
import { KitPickUpInfo, KitStatus, KitStatusRes } from '~/apis/model/kitModel'
import { GetTermsRes } from '~/apis/model/termsModel'

export const MemberType = {
  MAIN: '1',
  SUB: '2',
  MEMBER: '3',
  CUSTOMER: '4',
  FAMILY: '5',
  FRIEND: '6',
} as const
export type MemberType = typeof MemberType[keyof typeof MemberType]

export const RoleEnum = MemberType
export type RoleEnum = typeof RoleEnum[keyof typeof RoleEnum]

export const Sex = {
  MEN: 'M',
  WOMEN: 'F',
} as const
export type Sex = typeof Sex[keyof typeof Sex]

export interface LoginParams {
  distNo?: string
  username?: string
  mobile?: string
  otp?: string
}

export interface LoginRes {
  username: string
  type: string
  token: string
}

interface BaseUserInfo {
  id: number
  type: MemberType
  username: string
  sex: Sex
  birth: string
  zipCode: string
  address: string
  addressDetail: string
}

export interface GetUserInfoRes extends BaseUserInfo {
  kitId: string
  surveyDate: Nullable<Date>
  pickupDate: Nullable<Date>
  arrivalDate: Nullable<Date>
  completeDate: Nullable<Date>
}

export interface GetUserMyInfoRes extends BaseUserInfo {
  distNo: string
  mobile?: string
  lastAccessDate?: Date
  latestTerms: boolean
  status?: KitStatusRes | KitStatus
  email?: string
}

export interface GetHybrisUserInfo {
  header: {
    status: string
    message: string
  }
  customerUid?: string
  name?: string
}

export interface GetMemberParams {
  distNo: string
  sort: string
}
export interface GetMemberRes extends GetUserInfoRes {
  status?: KitStatusRes | KitStatus
  mobile?: string
  email?: string
  microbiome?: string
}

export interface SaveMemberReq extends Omit<BaseUserInfo, 'id' | 'birth'> {
  id?: number
  mobile: string
  email: string
  distNo?: string
  birth?: string
  otp?: string
  terms?: number[]
}

export interface GetMemberKitHistoryRes extends KitPickUpInfo {
  seq: number
  status: KitStatus
}

export interface GetOrderParams extends BasicPageParams {
  id: number
}

export interface GetOrderRes {
  orderNo: string
  orderDate: Date
  use: boolean
}

export type GetOrdersRes = BasicFetchResult<GetOrderRes>

export interface PostMemberLeave {
  userId: number
  reasonType?: string
  reason: string
}

export interface PostMobileCertifyReq {
  username: string
  mobile: string
}

export interface PostCheckMobileCertifyReq extends PostMobileCertifyReq {
  otp: string
}

export interface GetUpdateTermsRes {
  termsInfo: GetTermsRes[]
  user: GetUserInfoRes
}

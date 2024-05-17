import { MemberType, Sex } from '~/apis/model/userModel'

export interface GetFooterTermsParams {
  type?: 'service' | 'privacy'
}

export const TermType = {
  SIGN_IN: 'M',
  KIT: 'K',
  FOOTER: 'F',
} as const
export type TermType = typeof TermType[keyof typeof TermType]

export const TermStatus = {
  OPEN: 'O',
  CLOSE: 'C',
} as const
export type TermStatus = typeof TermStatus[keyof typeof TermStatus]

export const TermTarget = {
  COMMON: 'C',
  ADULT: 'A',
  TEENAGER: 'T',
  MINORS: 'M',
} as const
export type TermTarget = typeof TermTarget[keyof typeof TermTarget]

export const TermNecessary = {
  REQUIRED: 'Y',
  READONLY: 'R',
  CHOOSE: 'C',
} as const
export type TermNecessary = typeof TermNecessary[keyof typeof TermNecessary]

export const TermMember = {
  COMMON: 'C',
  AMWAY_MEMBER: 'A',
  MEMBER: 'M',
} as const
export type TermMember = typeof TermMember[keyof typeof TermMember]

export interface TermsTypeRes {
  id: number
  name: string
}

export interface TermUserRes {
  id: number
  distNo: string
  username: string
}

export interface GetTermsRes {
  id: number
  version: number
  status: TermStatus
  title: string
  contents: string
  createdDate: Date
  modifiedDate: Date

  type: TermType
  termsType: TermsTypeRes
  necessary: TermNecessary
  target: TermTarget
}

// start
export interface GetTermsReq {
  target: TermTarget
  type: TermType
  member?: TermMember
}

export interface UserRoles {
  id: number
  createdDate?: Date
  modifiedDate?: Date
  name: string
}

export interface TermsListUserRes {
  id: number
  createdDate: Date
  modifiedDate: Date
  distNo: string
  type: MemberType
  username: string
  password: string
  sex: Sex
  birth: string
  mobile: string
  email: string
  zipCode: string
  address: string
  addressDetail: string
  joinDate: Date
  lastAccessDate: Date
  roles: UserRoles[] | MemberType[]
}

export interface TermsType {
  id: number
  type: string
  name: string
  order: number
}

export interface SaveTermsReq {
  termInfo: number[]
  userId: number
}

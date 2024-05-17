import { BasicFetchResult, BasicPageParams } from '~/apis/model/baseModel'

export const boardType = {
  FAQ: 'faq',
} as const
export type boardType = typeof boardType[keyof typeof boardType]

export interface GetCategoryRes {
  code: string
  name: string
  order: number
}

export interface GetBoardParams extends BasicPageParams {
  type: boardType
  category: string
}

export interface GetBoardRes {
  no: number
  id: number
  category: string
  title: string
  contents: string
  createdDate: Date
  // front
  isActive?: boolean
}

export type GetBoardsRes = BasicFetchResult<GetBoardRes>

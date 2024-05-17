import type { LabelNValue } from '#/custom'
import { boardType, GetBoardParams, GetBoardRes, GetBoardsRes, GetCategoryRes } from '~/apis/model/boardModel'
import { defHttp } from '~/utils/http/axios'

export async function getBoardFaqCategories(): Promise<LabelNValue<string>[]> {
  return await defHttp.get<GetCategoryRes[]>('/v1/api/faq/category').then((data) =>
    data.map(({ code, name }) => ({
      label: name,
      value: code,
    }))
  )
}

export async function getBoards({ type, category, ...params }: GetBoardParams) {
  return await defHttp.get<GetBoardsRes>(`/v1/api/${type}/list/${category}`, { params }).then((data) => {
    const { page, size } = params
    data.content = data.content.map((item, index) => {
      item.no = (page - 1) * size + index + 1
      return item
    })
    return data
  })
}

export async function getBoard(type: boardType, seq: number) {
  return await defHttp.get<GetBoardRes>(`/v1/api/${type}/info/${seq}`)
}

export interface BasicPageParams {
  page: number
  size: number
}

export interface BasicFetchResult<T> {
  totalElements: number
  content: T[]
}

export interface BasicPageResult<T> {
  resultData: T[]
  totalCount: number
  Paging?: BasicPaging
}

export interface BasicPaging {
  pageSize: number
  currentPage: number
  numberOfPages: number
  totalNumberOfResults: number
  needsTotal: boolean
}

/**
 * Data processing class, can be configured according to the project
 */
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { RequestOptions, Result } from '#/axios'

export interface CreateAxiosOptions extends AxiosRequestConfig {
  authenticationScheme?: string
  transform?: AxiosTransform
  requestOptions?: RequestOptions
}

export abstract class AxiosTransform {
  /**
   * @description: Process configuration before request
   */
  beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig

  transformRequestHook?: (res: AxiosResponse<Result>, options: RequestOptions) => any

  requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>

  requestInterceptors?: (config: AxiosRequestConfig, options: CreateAxiosOptions) => AxiosRequestConfig

  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>

  requestInterceptorsCatch?: (error: Error) => void

  responseInterceptorsCatch?: (error: AxiosError) => void

  waitingQueue: (() => void)[] = []
  onTokenRefreshed?: (accessToken: string) => void
}

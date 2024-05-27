import type { AxiosError, AxiosResponse } from 'axios'
import type { RequestOptions, Result } from '#/axios'
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform'
import { VAxios } from './Axios'
import { clone } from 'lodash-es'
import { checkStatus } from './checkStatus'
import { RequestEnum, ContentTypeEnum } from './httpEnum'
import { isString } from '~/utils/is'
import { getToken, getTokenType } from '~/utils/storage'
import { setObjToUrlParams, deepMerge } from '~/utils'
import { joinTimestamp, formatRequestDate } from './helper'
import { getMessage } from '~/utils/messages'
import { ResultEnum } from './httpEnum'
import { useUserStoreWithOut } from '~/stores/user'

/**
 * @description
 */
const transform: AxiosTransform = {
  waitingQueue: [],
  /**
   * @description
   */
  transformRequestHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isTransformResponse, isReturnNativeResponse } = options
    const { data } = res

    if (!(typeof data === 'boolean') && !data) {
      // return '[HTTP] Request has no return value';
      throw ResultEnum.EMPTY_CONTENT
    }

    if (isReturnNativeResponse) {
      return res
    }
    if (!isTransformResponse) {
      return data
    }

    throw new Error(getMessage('sys.api.apiRequestFailed'))
  },

  beforeRequestHook: (config, options) => {
    const { apiUrl, joinParamsToUrl, formatDate, joinTime = true } = options

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`
    }
    const params = config.params || {}
    const data = config.data || false
    formatDate && data && !isString(data) && formatRequestDate(data)
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false))
      } else {
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`
        config.params = undefined
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params)
        if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length > 0) {
          config.data = data
          config.params = params
        } else {
          config.data = params
          config.params = undefined
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(config.url as string, Object.assign({}, config.params, config.data))
        }
      } else {
        config.url = config.url + params
        config.params = undefined
      }
    }
    return config
  },
  requestInterceptors: (config, options) => {
    const token = getToken()
    if (token && (config as CreateAxiosOptions)?.requestOptions?.withToken !== false) {
      // jwt token
      ;(config as Recordable).headers.Authorization = options.authenticationScheme
        ? `${options.authenticationScheme} ${token}`
        : token
    }
    return config
  },
  responseInterceptors: (res: AxiosResponse<any>) => {
    return res
  },
  onTokenRefreshed: () => {
    transform.waitingQueue.forEach((callback) => callback())
  },
  responseInterceptorsCatch: async (error: AxiosError) => {
    const { response, code, message, config } = error || {}
    const { errorMessageMode, refreshTokenApi } = (config as CreateAxiosOptions)?.requestOptions || {
      errorMessageMode: 'modal',
    }
    const msg: string = (response as any)?.data?.message ?? ''
    let errMessage: string | undefined = ''

    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        errMessage = getMessage('sys.api.apiTimeoutMessage') ?? ''
      }
      if (message?.includes('Network Error')) {
        errMessage = getMessage('sys.api.networkExceptionMsg') ?? ''
      }

      if (errMessage) {
        if (errorMessageMode === 'modal') {
          // createErrorModal({ title: getMessage('sys.api.errorTip'), content: errMessage })
          window.alert(errMessage)
        }
        return Promise.reject(error)
      }
    } catch (error) {
      throw new Error(error as unknown as string)
    }

    if (response?.status === 401) {
      if (refreshTokenApi) {
        if (transform.waitingQueue.length === 0) {
          await refreshTokenApi()
          // TODO: 재발급 받은 토큰 설정
          transform.waitingQueue.forEach((cb) => cb())
          transform.waitingQueue = []
        }
        const originalConfig = config
        const retryOriginalRequest = new Promise((resolve) => {
          transform.waitingQueue.push(() => {
            resolve(defHttp.getAxios()(originalConfig))
          })
        })

        return retryOriginalRequest
      } else {
        const userStore = useUserStoreWithOut()
        if (window.confirm('인증이 만료 되었습니다.\n재로그인 바랍니다.')) {
          userStore.resetState()
          userStore.logout()
        }
      }
    } else {
      checkStatus(response!.status, msg, errorMessageMode)
    }

    return Promise.reject(error)
  },
}

function createAxios(
  opt: Partial<CreateAxiosOptions> = {
    baseURL: import.meta.env.VITE_GLOB_BASE_API_URL,
  }
) {
  return new VAxios(
    deepMerge(
      {
        // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
        // authentication schemes，e.g: Bearer
        authenticationScheme: getTokenType() || 'Bearer',
        timeout: 3 * 1000,
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        transform: clone(transform),
        requestOptions: {
          isReturnNativeResponse: false,
          isTransformResponse: false,
          joinParamsToUrl: false,
          formatDate: true,
          errorMessageMode: 'modal',
          joinTime: true,
          ignoreCancelToken: true,
          withToken: true,
        },
      },
      opt
    )
  )
}
export const defHttp = createAxios()

import type { ErrorMessageMode } from '#/axios'
import { getMessage } from '~/utils/messages'

export function checkStatus(status: number, msg: string, errorMessageMode: ErrorMessageMode = 'modal'): void {
  let errMessage: string | undefined = ''

  switch (status) {
    case 400:
      errMessage = `${msg}`
      break
    case 403:
      errMessage = getMessage('sys.api.errMsg403')
      break
    case 404:
      errMessage = getMessage('sys.api.errMsg404')
      break
    case 405:
      errMessage = getMessage('sys.api.errMsg405')
      break
    case 408:
      errMessage = getMessage('sys.api.errMsg408')
      break
    case 500:
      errMessage = msg || getMessage('sys.api.errMsg500')
      break
    case 501:
      errMessage = getMessage('sys.api.errMsg501')
      break
    case 502:
      errMessage = getMessage('sys.api.errMsg502')
      break
    case 503:
      errMessage = getMessage('sys.api.errMsg503')
      break
    case 504:
      errMessage = getMessage('sys.api.errMsg504')
      break
    case 505:
      errMessage = getMessage('sys.api.errMsg505')
      break
    default:
  }

  if (errMessage) {
    if (errorMessageMode === 'modal') {
      // createErrorModal({ title: getMessage('sys.api.errorTip'), content: errMessage })
      window.alert(errMessage)
    }
  }
}

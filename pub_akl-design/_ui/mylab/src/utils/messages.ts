const messages: Record<string, string | object> = {
  button: {
    ok: '예',
  },
  sys: {
    api: {
      operationFailed: '작업 실패',
      errorTip: 'Error Tip',
      errorMessage: '작업에 실패했습니다. 시스템이 비정상입니다.',
      timeoutMessage: '로그인 시간이 초과되었습니다. 다시 로그인하십시오.',
      noContent: '데이터가 존재하지 않습니다.',
      apiTimeoutMessage: '인터페이스 요청 시간이 초과되었습니다. 페이지를 새로 고치고 다시 시도하십시오.',
      apiRequestFailed: '인터페이스 요청에 실패했습니다. 나중에 다시 시도하십시오.',
      networkException: '네트워크 이상 징후',
      networkExceptionMsg: '네트워크 연결이 정상인지 확인하십시오! 네트워크가 비정상입니다.',

      errMsg401: '사용자에게 권한(토큰, 사용자 이름, 암호 오류)이 없습니다.',
      errMsg403: '사용자는 권한이 있지만 액세스는 금지되어 있습니다.',
      errMsg404: '네트워크 요청 오류, 리소스를 찾을 수 없습니다.',
      errMsg405: '네트워크 요청 오류, 요청 메서드가 허용되지 않습니다.',
      errMsg408: '네트워크 요청 시간이 초과되었습니다.',
      errMsg500: '서버 오류, 관리자에게 문의하십시오.',
      errMsg501: '네트워크가 구현되지 않았습니다.',
      errMsg502: '네트워크 오류.',
      errMsg503: '서비스를 사용할 수 없습니다. 서버가 일시적으로 오버로드되었거나 유지 관리 중입니다.',
      errMsg504: '네트워크 시간 초과',
      errMsg505: 'http 버전이 요청을 지원하지 않습니다.',
    },
  },
}

function getValue(key: string, message: Record<string, string | object> = messages): string | undefined {
  const parts = key.split('.')
  let current: Record<string, string | object> | string = message

  for (let i = 0, size = parts.length; i < size; ++i) {
    if (current[parts[i]] == undefined) {
      return undefined
    } else {
      current = current[parts[i]]
    }
  }
  return current as string
}

export function getMessage(key: string): string | undefined {
  return getValue(key)
}

import type { Fn, PromiseFn } from '#/custom'
import { ref } from 'vue'

export function usePromise<F extends Fn>(promiseFn: PromiseFn<F>) {
  type ArgType = Parameters<F>
  type PromiseReturnType = Awaited<ReturnType<F>> | undefined

  const isLoading = ref<boolean>(false)
  const data = ref<PromiseReturnType>()

  async function callPromiseFn(...arg: ArgType): Promise<PromiseReturnType> {
    let result: PromiseReturnType = undefined
    try {
      isLoading.value = true
      result = (await promiseFn(...arg)) as PromiseReturnType
      data.value = result
    } finally {
      isLoading.value = false
    }

    return result
  }

  return {
    isLoading,
    data,
    callPromiseFn,
  }
}

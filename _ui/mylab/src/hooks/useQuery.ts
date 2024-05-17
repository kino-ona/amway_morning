import { getQuery2Object } from '~/utils'
import { useRoute } from 'vue-router'

export function useQuery<T>(options?: { defaultQuery: T }) {
  const { query: tempQuery } = useRoute()
  const query = getQuery2Object<T>(Object.assign(options?.defaultQuery || {}, tempQuery))

  return {
    query,
  }
}

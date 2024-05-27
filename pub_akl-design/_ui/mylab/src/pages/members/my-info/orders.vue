<script lang="ts" setup name="MemberOrdersPage">
import { computed, onMounted, ref } from 'vue'
import { useClipboard } from '@vueuse/core'
import { GetOrderParams, GetOrdersRes } from '~/apis/model/kitModel'
import { getKitOrders } from '~/apis/kit'
import { usePromise } from '~/hooks/usePromise'
import { useUserStore } from '~/stores/user'
import { getDateTime } from '~/utils/date-utils'

const userStore = useUserStore()

const searchForm = ref<GetOrderParams>({
  currentPage: 0,
  distNo: userStore.getUserInfo?.distNo ?? '',
  isASC: true,
  isNotSerial: true,
  pageSize: 10,
})

// const { callPromiseFn, data: kitOrderRes } = usePromise<typeof getKitOrders>(getKitOrders)

onMounted(async () => {
  await getMoreOrders()
})
const kitOrderRes = ref<Partial<GetOrdersRes>>({
  resultData: [],
  totalCount: 0,
  Paging: {
    pageSize: 0,
    currentPage: 0,
    numberOfPages: 0,
    totalNumberOfResults: 0,
    needsTotal: false,
  },
})

async function getMoreOrders(page = 0) {
  searchForm.value.currentPage = page
  const tmp = await getKitOrders({
    ...searchForm.value,
  })
  const olderResult = kitOrderRes.value.resultData ?? []
  if (tmp.totalCount != 0) {
    tmp.resultData = olderResult.concat(tmp.resultData)
  }
  kitOrderRes.value = tmp
}

const { isSupported, copy } = useClipboard()
async function copyClipboard(messages: string) {
  await copy(messages.split('-')[1])
  window.alert('클립보드에 복사 되었습니다.')
}
const togglePageButton = computed<boolean>(() => {
  // kitOrderRes.value ? kitOrderRes.value?.totalCount > kitOrderRes.value?.Paging?.totalNumberOfResults : false
  const currentPage = kitOrderRes.value?.Paging?.currentPage ?? 0
  const numberOfPages = kitOrderRes.value?.Paging?.numberOfPages ?? 0
  if (kitOrderRes.value) {
    return currentPage + 1 < numberOfPages
  }
  return false
})
</script>

<template>
  <div class="kit-buy">
    <form>
      <fieldset>
        <legend>키트 구매목록</legend>
        <h2 class="h2-title">키트 구매목록</h2>

        <div class="tbl">
          <table>
            <caption>
              키트 구매목록 상세
            </caption>
            <colgroup>
              <col style="width: 10%" />
              <col style="width: 19%" />
              <col style="width: 21%" />
              <col style="width: 36%" />
              <col style="width: 14%" />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">NO</th>
                <th scope="col">사용여부</th>
                <th scope="col">주문일자</th>
                <th scope="col">주문번호</th>
                <th scope="col">&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="kitOrderRes?.totalCount === 0">
                <!-- 2022-03-11 nodata 케이스 추가 -->
                <td colspan="5" class="nodata">구매내역이 없습니다.</td>
              </tr>
              <tr v-for="item in kitOrderRes?.resultData" v-else :key="item.orderNumber">
                <td>{{ item.no }}</td>
                <td class="color-red">{{ item.hasSerial ? '사용' : '미사용' }}</td>
                <td>{{ getDateTime(item.orderDate) }}</td>
                <td>{{ item.orderNumber }}</td>
                <td>
                  <button
                    v-if="isSupported && !item.hasSerial"
                    class="btn"
                    @click.prevent="copyClipboard(item.orderNumber)"
                  >
                    복사
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <button
            v-if="togglePageButton"
            type="button"
            class="btn-more"
            @click.prevent="getMoreOrders(searchForm.currentPage + 1)"
          >
            <span class="hide">더보기</span>
          </button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<route lang="yaml">
meta:
  title: 키트 구매 목록
</route>

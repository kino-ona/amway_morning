<script lang="ts" setup>
import type { LabelNValue } from '#/custom'
import { ref, onMounted, computed } from 'vue'
import { getKitOrderCheck, getKitOrders } from '~/apis/kit'
import { usePromise } from '~/hooks/usePromise'
import { useUserStore } from '~/stores/user'
import { useKitStore } from '~/stores/kit'
import { isEmpty } from 'lodash-es'
import { GetOrderParams, kitOrderReq, GetOrdersRes } from '~/apis/model/kitModel'
import { getDateTime } from '~/utils/date-utils'
import { MemberType } from '~/apis/model/userModel'
import Tab from '~/components/Tab.vue'
import { failResults } from '../../../apis/model/kitModel'

const props = defineProps({
  seq: {
    type: Number,
    default: null,
  },
  disabledSubmitButton: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['apply'])

const kitStore = useKitStore()

const form = ref<kitOrderReq>({
  distNo: '',
  orderNo: '',
  kitSerial: kitStore.getKitItem?.id ?? '',
  oldKitSerial: kitStore.getKitItem?.id ?? '',
  type: '',
  userId: '',
  sampleKitTerms: [],
})
const userStore = useUserStore()

const searchForm = ref<GetOrderParams>({
  distNo: userStore.getUserInfo?.distNo ?? '',
  currentPage: 0,
  isASC: true,
  isNotSerial: true,
  pageSize: 10,
})

const disabledDirectTab = computed(() =>
  ([MemberType.FAMILY, MemberType.FRIEND] as MemberType[]).includes(userStore.getUserInfo!.type)
)

const currentTab = ref<'delivery' | 'direct'>(disabledDirectTab.value ? 'delivery' : 'direct')
const tabs = ref<LabelNValue<string>[]>([
  { label: '직접 구매한 경우', value: 'direct', disabled: disabledDirectTab.value },
  { label: '전달 받은 경우', value: 'delivery' },
])

// eslint-disable-next-line vue/return-in-computed-property
const isConfirmSurvey = computed<boolean>(() => {
  switch (currentTab.value) {
    case 'direct':
      return !!(form.value.distNo && form.value.orderNo && form.value.kitSerial)
    case 'delivery':
      return !!(hasKitOrderNo.value && form.value.kitSerial)
  }
})

function changeTab(val: 'direct' | 'delivery') {
  switch (val) {
    case 'direct':
      searchForm.value.distNo = userStore.getUserInfo?.distNo ?? ''
      orderItems.value = {
        resultData: [],
        totalCount: 0,
        Paging: {
          pageSize: 0,
          currentPage: 0,
          numberOfPages: 0,
          totalNumberOfResults: 0,
          needsTotal: false,
        },
      }
      form.value.distNo = userStore.getUserInfo?.distNo ?? ''
      if (props.seq) {
        form.value.orderNo = kitStore.getKitItem?.orderId ?? ''
      } else {
        form.value.orderNo = ''
      }
      getKitOrderItems(0)
      break
    case 'delivery':
      hasKitOrderNo.value = undefined
      if (props.seq && kitStore.getKitItem?.orderId && kitStore.getKitItem?.orderId.split('-').length === 2) {
        form.value.orderNo = kitStore.getKitItem?.orderId.split('-')[1]
      } else {
        form.value.orderNo = ''
      }
      form.value.distNo = kitStore.getKitItem?.distNo ?? ''
      searchForm.value.distNo = kitStore.getKitItem?.distNo ?? ''
      break
  }

  form.value.kitSerial = kitStore.getKitItem?.id ?? ''
}

const {
  isLoading: isLoadingDelivery,
  callPromiseFn: getKitOrderCheckAPI,
  data: hasKitOrderNo,
} = usePromise<typeof getKitOrderCheck>(getKitOrderCheck)

function validationKitOrder(): boolean {
  const { distNo, orderNo } = form.value
  if (isEmpty(distNo)) {
    window.alert('ABO번호를 입력해 주세요.')
    return false
  } else if (isEmpty(orderNo)) {
    window.alert('주문번호를 입력해 주세요.')
    return false
  }
  return true
}

// 전달 받은 경우 주문번호 확인
async function checkKitOrderConfirm() {
  if (!validationKitOrder()) {
    return
  }
  // await getKitOrderCheckAPI(form.value)
  if (
    '180-' + form.value?.orderNo === kitStore.getKitItem?.orderId &&
    form.value?.distNo === kitStore.getKitItem?.distNo
  ) {
    hasKitOrderNo.value = {
      message: 'existed data',
    }
  } else {
    await getKitOrderCheckAPI(form.value)
  }
}

function validation(): boolean {
  const { distNo, orderNo, kitSerial } = form.value

  if (!isEmpty(distNo) && !isEmpty(orderNo) && isEmpty(kitSerial)) {
    window.alert('키트 시리얼을 입력해 주세요.')
    return false
  } else if (!form.value?.orderNo) {
    window.alert('주문 번호를 확인해 주세요.')
    return false
  }

  return true
}

function saveForm() {
  if (!validation()) {
    return
  }

  emits('apply', {
    ...form.value,
    kitSerial: form.value.kitSerial.toUpperCase().trim(),
    orderNo: currentTab.value === 'direct' ? form.value.orderNo : '180-' + form.value.orderNo,
    oldKitSerial: kitStore.getKitItem?.id,
    oldOrderNo: kitStore.getKitItem?.orderId,
    userId: kitStore.getMemberInfo?.id ?? '',
    sampleKitTerms: props.seq ? [] : kitStore.getTerms,
  })
}

// getKitOrders
const orderItems = ref<GetOrdersRes>({
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
const { callPromiseFn: getKitOrdersAPI } = usePromise<typeof getKitOrders>(getKitOrders)
async function getKitOrderItems(page = 0) {
  searchForm.value.currentPage = page
  const data = await getKitOrdersAPI(searchForm.value)
  /*
  if (!!props.seq && data?.totalCount === 0) {
    data.totalCount = 1
    data.resultData = [
      {
        orderNumber: kitStore.getKitItem?.orderId ?? '',
        orderDate: kitStore.getKitItem?.createdDate ?? new Date(),
        orderStatus: 'COMPLETED',
        sopStatus: false,
        isSopCancel: false,
        hasSerial: true,
        no: 1,
      },
    ]
  }
  */

  orderItems.value.totalCount = data?.totalCount ?? 0

  if (data?.resultData.length) {
    orderItems.value.resultData.push(...data.resultData)
  }

  form.value = {
    ...form.value,
    // orderNo: '',
    kitSerial: kitStore.getKitItem?.id ?? '',
  }
}

const togglePageButton = computed<boolean>(() => {
  const currentPage = orderItems.value?.Paging?.currentPage ?? 0
  const numberOfPages = orderItems.value?.Paging?.numberOfPages ?? 0
  if (orderItems.value) {
    return currentPage + 1 < numberOfPages
  }
  return false
})

onMounted(async () => {
  changeTab(currentTab.value)
})
</script>

<template>
  <div class="kit-enroll">
    <form>
      <fieldset>
        <legend>키트등록</legend>
        <h2 class="h2-title">키트등록</h2>

        <!-- tab// -->
        <Tab v-model="currentTab" :items="tabs" @change="changeTab">
          <template #tab-item-direct>
            <div class="formbox">
              <dl class="abo">
                <dt>ABO 번호</dt>
                <dd>
                  <input v-model="form.distNo" type="text" placeholder="선물자의 ABO번호를 입력하세요." disabled />
                </dd>
              </dl>
              <dl class="orderhistory">
                <dt>주문내역</dt>
                <dd>
                  <ul class="orderlist">
                    <!-- 기존주문번호 -->
                    <template v-if="orderItems?.totalCount === 0 && !kitStore.getKitItem?.orderId">
                      <li class="nodata">주문 내역이 없습니다.</li>
                    </template>
                    <template v-else>
                      <li v-if="!!seq" :key="kitStore.getKitItem?.orderId">
                        <label>
                          <input
                            v-model="form.orderNo"
                            type="radio"
                            name="orderNo"
                            :value="kitStore.getKitItem?.orderId"
                          />
                          <span>{{ kitStore.getKitItem?.orderId }}</span>
                          <em>{{ getDateTime(kitStore.getKitItem?.createdDate ?? new Date()) }}</em>
                        </label>
                      </li>
                      <!-- 사용가능한 주문번호 -->
                      <li v-for="order in orderItems?.resultData" :key="order?.orderNumber">
                        <label>
                          <input v-model="form.orderNo" type="radio" name="orderNo" :value="order.orderNumber" />
                          <span>{{ order.orderNumber }}</span>
                          <em>{{ getDateTime(order.orderDate) }}</em>
                        </label>
                      </li>
                    </template>
                  </ul>

                  <button
                    v-if="togglePageButton"
                    type="button"
                    class="btn-more"
                    @click="getKitOrderItems(searchForm?.currentPage + 1)"
                  >
                    <span class="hide">더보기</span>
                  </button>

                  <div class="guideinfo">
                    <ul>
                      <li class="color-red">* 주문내역 중 먼저 구매한 건부터 등록을 진행해주세요.</li>
                      <li class="color-red">* my LAB 프로필에 아직 등록하지 않은 주문번호만 조회 됩니다.</li>
                    </ul>
                  </div>
                </dd>
              </dl>
              <dl class="kitserial">
                <dt>키트 시리얼</dt>
                <dd>
                  <input
                    v-model="form.kitSerial"
                    type="text"
                    placeholder="10자리의 키트시리얼을 입력하세요."
                    style="text-transform: uppercase"
                  />

                  <div class="guideinfo">
                    <ul>
                      <li class="color-red">
                        * 사용하실 마이크로바이옴 테스트 키트 내 튜브에 적힌 시리얼 번호를 기입해주세요.
                      </li>
                    </ul>
                  </div>
                </dd>
              </dl>
            </div>

            <!-- 키트 수정일 경우 문구 노출// -->
            <div class="guideinfo">
              <ul>
                <li>※ 키트 수정 시 건강 설문을 다시 진행 하셔야 합니다.</li>
              </ul>
            </div>
            <!-- //키트 수정일 경우 문구 노출 -->
          </template>
          <template #tab-item-delivery>
            <div class="formbox">
              <dl class="abo">
                <dt>ABO 번호</dt>
                <dd>
                  <input
                    v-model="form.distNo"
                    :disabled="isConfirmSurvey"
                    type="text"
                    placeholder="키트를 전달해준 분의 ABO번호를 입력하세요"
                  />
                </dd>
              </dl>
              <dl class="ordernumber">
                <dt>주문번호</dt>
                <dd>
                  <div class="flexbox transparent">
                    <span class="number">180</span>
                    <span class="hyppen">-</span>
                    <input v-model="form.orderNo" type="text" :disabled="isConfirmSurvey" />
                  </div>

                  <!-- ABO 번호와 주문번호 체크가 확인 완료 시 문구 비노출// -->
                  <div class="guideinfo">
                    <ul>
                      <li class="color-red">* 키트를 전달 한 ABO분이 공유한 주문번호를 입력해주세요.</li>
                    </ul>
                  </div>
                  <!-- //ABO 번호와 주문번호 체크가 확인 완료 시 문구 비노출 -->

                  <button
                    type="button"
                    class="btn full large"
                    :disabled="isLoadingDelivery || isConfirmSurvey"
                    @click="checkKitOrderConfirm"
                  >
                    {{ isConfirmSurvey ? '완료' : '확인' }}
                  </button>
                  <!-- <button type="button" class="btn full large" :disabled="isLoadingDelivery || isActiveSurvey">
                    완료
                  </button> -->
                </dd>
              </dl>
              <dl class="kitserial">
                <dt>키트 시리얼</dt>
                <dd>
                  <input
                    v-model="form.kitSerial"
                    :disabled="!hasKitOrderNo"
                    type="text"
                    minlength="10"
                    maxlength="10"
                    placeholder="10자리의 키트시리얼을 입력하세요."
                    style="text-transform: uppercase"
                  />

                  <!-- ABO 번호와 주문번호 체크가 확인 완료 시 문구 비노출// -->
                  <div class="guideinfo">
                    <ul>
                      <li class="color-red">
                        * 사용하실 마이크로바이옴 테스트 키트 내 튜브에 적힌 시리얼 번호를 기입해주세요.
                      </li>
                    </ul>
                  </div>
                  <!-- //ABO 번호와 주문번호 체크가 확인 완료 시 문구 비노출 -->
                </dd>
              </dl>
            </div>

            <!-- 키트 수정일 경우 문구 노출// -->
            <div class="guideinfo">
              <ul>
                <li>※ 키트 수정 시 건강 설문을 다시 진행 하셔야 합니다.</li>
              </ul>
            </div>
            <!-- //키트 수정일 경우 문구 노출 -->
          </template>
        </Tab>

        <div class="bottom-btns">
          <button
            class="btn full xlarge blue"
            :disabled="disabledSubmitButton || !isConfirmSurvey"
            @click.prevent="saveForm"
          >
            <!-- {{ !!seq ? '저장' : '설문 시작' }} -->
            신청 완료
          </button>
          <button class="btn full xlarge gray" @click.prevent="$router.back()">취소</button>
        </div>
        <!-- //tab -->
      </fieldset>
    </form>
  </div>
</template>

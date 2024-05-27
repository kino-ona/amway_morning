<script lang="ts" setup>
import { isEmpty } from 'lodash-es'
import { computed, onMounted, ref } from 'vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { KitPickUpReq } from '~/apis/model/kitModel'
import { getPickupInfo, getKitPickupMaximum, getHolyDays } from '~/apis/kit'
import { usePromise } from '~/hooks/usePromise'
import { useKitStore } from '~/stores/kit'
import dayjs from 'dayjs'
import { getDateTime, nextBusinessDay } from '~/utils/date-utils'
import AddressInput from '~/components/AddressInput.vue'
import { getMemberInfo } from '~/apis/user'

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

const form = ref<Partial<KitPickUpReq>>({
  pickupDate: dayjs().add(3, 'day').toDate(),
  zipCode: kitStore.getMemberInfo?.zipCode,
  address: kitStore.getMemberInfo?.address,
  addressDetail: kitStore.getMemberInfo?.addressDetail,
})

// 공휴일
const { data: holyDates, callPromiseFn: getHolyDaysAPI } = usePromise<typeof getHolyDays>(getHolyDays)
const minDate = ref<Date>(dayjs().add(2, 'day').toDate())
const { isLoading, callPromiseFn, data: pickupInfo } = usePromise<typeof getPickupInfo>(getPickupInfo)
const { callPromiseFn: getMemberInfoAPI } = usePromise<typeof getMemberInfo>(getMemberInfo)

onMounted(async () => {
  const id = kitStore.getMemberInfo?.id
  id && (await getMemberInfoAPI(id).then((res) => res && kitStore.setMemberInfo(res)))

  if (props.seq && kitStore.getKitItem?.id) {
    const data = await callPromiseFn(kitStore.getKitItem?.id)
    const pickupDate = data?.pickupDate ?? dayjs().add(7, 'day').toDate()

    form.value = {
      pickupDate,
      zipCode: data?.zipCode ?? kitStore.getMemberInfo?.zipCode,
      address: data?.address ?? kitStore.getMemberInfo?.address,
      addressDetail: data?.addressDetail ?? kitStore.getMemberInfo?.addressDetail,
    }

    const holydays = await getHolyDaysAPI(pickupDate.getFullYear(), `${pickupDate.getMonth() + 1}`.padStart(2, '0'))
    if (!data?.pickupDate) {
      form.value.pickupDate = nextBusinessDay(dayjs().add(3, 'day'), holydays).toDate()
    }
  } else {
    const today = dayjs()
    const holydays = await getHolyDaysAPI(today.get('year'), `${today.get('months') + 1}`.padStart(2, '0'))
    form.value.pickupDate = nextBusinessDay(today.add(3, 'day'), holydays).toDate()
  }
})

const userAddress = computed(() =>
  kitStore.getMemberInfo?.zipCode ? `${kitStore.getMemberInfo?.address} ${kitStore.getMemberInfo?.addressDetail}` : null
)

const isAgree = ref<boolean>(false)

async function validation(): Promise<boolean> {
  const { pickupDate, address, addressDetail } = form.value
  console.log(63, pickupDate, isEmpty(pickupDate))
  if (!pickupDate && isEmpty(pickupDate)) {
    window.alert('희망 수거일을 입력해 주세요.')
    return false
  } else if (isEmpty(address)) {
    window.alert('주소를 입력해 주세요.')
    return false
  } else if (isEmpty(addressDetail) || addressDetail?.split('@').length === 2) {
    window.alert('상세 주소를 입력해 주세요')
    return false
  } else if (!isAgree.value) {
    window.alert('주의사항 확인을 체크 해주세요.')
  } else if (!(await getKitPickupMaximum(dayjs(pickupDate).format('YYYYMMDD')))) {
    // 해당 주 배송 신청 건수 체크
    window.alert('해당 주간에는 배송 신청이 어렵습니다. 다른 주간으로 날짜를 선택해 주세요.')
    return false
  }

  return true
}

async function saveForm() {
  if (!(await validation())) {
    return
  }
  emits('apply', {
    ...form.value,
    pickupDate: dayjs(form.value.pickupDate).format('YYYY-MM-DD HH:mm:ss'),
    kitSerial: kitStore.getKitItem?.id,
  })
}

let year = ''
let month = ''
async function changeMonthYear({ isMonth, value }) {
  if (isMonth) {
    month = value + 1
  } else {
    year = value
  }

  if (isMonth && month) {
    await getHolyDaysAPI(year || dayjs(form.value.pickupDate).format('YYYY'), `${month}`.padStart(2, '0'))
  }
}
</script>

<template>
  <div class="kit-apply">
    <form>
      <fieldset>
        <legend>키트 수거 신청</legend>
        <h2 class="h2-title">키트 수거 신청</h2>

        <div class="guideinfo box">
          <h3 class="h3-title">채변 진행전, 꼭! 키트 수거를 먼저 신청해주세요.</h3>
          <ul>
            <li>
              * 정확한 분석을 위해 채변은 꼭 수거 예정일 당일 혹은 예정일 1~2일전에 진행해주고, 채변 가능한 일정을
              고려하여 키트 수거 날짜를 신중하게 선택해주세요.
            </li>
            <li>* 키트 수거 예정일 이틀 전까지 수거지 주소 및 수거 날짜를 수정할 수 있습니다.</li>
          </ul>
        </div>

        <div class="formbox">
          <dl class="date datepicker">
            <dt><label for="userdate">희망 수거일</label></dt>
            <dd>
              <div class="flexbox">
                <Datepicker
                  v-model="form.pickupDate"
                  :min-date="minDate"
                  :format="getDateTime"
                  locale="kr"
                  week-start="0"
                  esc-close
                  auto-apply
                  :disabled-dates="holyDates"
                  :disabled-week-days="[0, 6]"
                  :enable-time-picker="false"
                  auto-position
                  @updateMonthYear="changeMonthYear"
                />
              </div>
            </dd>
          </dl>
          <!-- <dl v-if="userAddress">
            <dt><label for="useraddress">주소(수거지)</label></dt>
            <dd>{{ userAddress }}</dd>
          </dl> -->
          <address-input
            v-model:postCode="form.zipCode"
            v-model:prefixAddress="form.address"
            v-model:suffixAddress="form.addressDetail"
          >
            <!-- <div class="guideinfo">
              <ul>
                <li class="color-red">* 주소지 변경 시, 본인의 프로필 주소 정보도 함께 변경됩니다.</li>
              </ul>
            </div> -->
          </address-input>
        </div>

        <div class="aggrecheck">
          <label class="chkbig">
            <input v-model="isAgree" type="checkbox" name="agree" :value="true" />
            <span
              >주의사항을 모두 확인하였습니다. (제주 및 도서산간지역은 키트 수거가 어려울 수 있으니, 한국암웨이
              고객센터로 문의해주세요.)</span
            >
          </label>
        </div>
      </fieldset>

      <div class="bottom-btns">
        <button
          class="btn full xlarge blue"
          :disabled="disabledSubmitButton || !isAgree || isLoading"
          @click.prevent="saveForm"
        >
          키트 수거 신청하기
        </button>
        <button class="btn full xlarge gray" @click.prevent="$router.back()">취소</button>
      </div>
    </form>
  </div>
</template>

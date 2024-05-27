<script lang="ts" setup>
import { computed, onMounted, PropType, ref } from 'vue'
import { kitStatusDetailMsg, failResults, sucessResults, emailResend } from '~/apis/model/kitModel'
import { KitItem } from '~/apis/model/kitModel'
import { deleteSampleKit, getProductInfo, sendReportEmail } from '~/apis/kit'
import { usePromise } from '~/hooks/usePromise'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'
import { useKitStore } from '~/stores/kit'
import { getDateTime } from '~/utils/date-utils'
import MobileCertifyDialog from '~/components/dialog/MobileCertifyDialog.vue'

const props = defineProps({
  seq: {
    type: Number,
    required: true,
  },
  item: {
    type: Object as PropType<KitItem>,
    required: true,
  },
  isMine: {
    type: Boolean,
    default: false,
  },
  hasSubUser: {
    type: Boolean,
    default: false,
  },
  hasRemovePermission: {
    type: Boolean,
    default: false,
  },
  isProgress: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['removed'])

const { callPromiseFn: getProductInfoAPI, data: product } = usePromise<typeof getProductInfo>(getProductInfo)
onMounted(async () => {
  if (props.item.stepStatus === 'step4' && props.item.microbiome) {
    await getProductInfoAPI(props.item.microbiome)
  }
})

const isFolding = ref<boolean>(props.isProgress)
const serialButtonLabel = computed(() => (props.isMine ? '수정' : '완료'))
const surveyButtonLabel = computed(() => {
  if (!hasModifyPermission.value) {
    return '완료'
  } else if (props.isMine) {
    return !props.item.surveyDate ? '입력' : '수정'
  } else {
    return !props.item.surveyDate ? '미완료' : '완료'
  }
})
const pickupButtonLabel = computed(() => {
  if (!hasModifyPermission.value) {
    return '완료'
  } else if (props.isMine) {
    return !props.item.pickupDate ? '입력' : '수정'
  } else {
    return !props.item.pickupDate ? '미완료' : '완료'
  }
})

const today = dayjs()

const hasModifyPermission = computed(
  () =>
    props.isMine &&
    props.isProgress &&
    props.item?.stepStatus === 'step1' &&
    (!props.item.status || (props.item.status && props.item.status < 120)) &&
    (!props.item.pickupDate || (props.item.pickupDate && dayjs(props.item.pickupDate).diff(today, 'day') > 1))
)
const hasRemoveButton = computed(() => props.hasRemovePermission && hasModifyPermission.value)

const { isLoading, callPromiseFn } = usePromise<typeof deleteSampleKit>(deleteSampleKit)
async function removeHistory() {
  if (!window.confirm('삭제하시겠습니까?')) {
    return
  }

  props.item.id && (await callPromiseFn(props.item.id))

  window.alert('삭제되었습니다.')
  emits('removed', props.item.id)
}
// ${dayjs(item.arrivalDate).add(1, 'month').format('YYYY년 MM월 DD일')}입니다.`
const arrivalDateMsg = computed(() => {
  const date = props.item.completeDate
    ? dayjs(props.item.completeDate).format('YYYY년 MM월 DD일')
    : dayjs(props.item.arrivalDate).add(1, 'month').format('YYYY년 MM월 DD일')
  return '분석 완료 예정일은 ' + date + '입니다.'
})
const router = useRouter()
const kitStore = useKitStore()

const visibleMobileCertify = ref<boolean>(false)

async function movePage(type: 'serial' | 'survey' | 'pickup') {
  kitStore.setKitItem(props.item)

  switch (type) {
    case 'serial':
      router.push({ path: `/kit/${props.seq}/${type}` })
      break
    case 'survey':
      if (props.item.surveyDate) {
        router.push({ path: `/kit/${props.seq}/${type}` })
      } else {
        router.push({ path: `/kit/${type}` })
      }
      break
    case 'pickup':
      if (props.item.pickupDate) {
        router.push({ path: `/kit/${props.seq}/${type}` })
      } else {
        router.push({ path: `/kit/${type}` })
      }
      break
  }
}
const memberInfo = kitStore.getMemberInfo
function reSendEmail() {
  props.item.id && sendReportEmail(props.item.id).then((res) => res && window.alert(emailResend[res.STATUS]))
}
</script>

<template>
  <!-- :class="{ open: onProgress }" -->
  <div class="kit" :class="{ open: isProgress || isFolding }">
    <!-- 펼침형태 : open 클래스 추가 (진행중일때는 default: 펼침) -->
    <div class="acc-head">
      <strong class="kit-tit"># {{ item.id }} </strong>
      <p class="kit-date">
        <span>등록일 : {{ getDateTime(props.item.createdDate) }} </span>
        <span v-if="props.item.stepStatus === 'step4' && (props.item.endDate || props.item.completeDate)"
          >종료일 : {{ getDateTime(props.item.endDate || props.item.completeDate) }}</span
        ><!-- 결과 단계 도달 시 도달 일자 표시 -->
      </p>
      <button v-if="hasRemoveButton" type="button" class="btn-del" :disabled="isLoading" @click.prevent="removeHistory">
        <span class="hide">삭제</span>
      </button>
      <!-- 진행중이면서 step1일때만 삭제버튼 노출 -->
    </div>

    <div class="acc-cont">
      <ol class="step">
        <li :class="{ active: item.stepStatus === 'step1' }">
          <!-- 활성화 : active 클래스 추가 -->
          <strong class="step-tit">Step1 키트&amp;설문</strong>
          <template v-if="item.stepStatus === 'step1'">
            <dl>
              <dt>키트 시리얼 정보</dt>
              <dd>
                <template v-if="isMine && isProgress">
                  <MobileCertifyDialog
                    v-if="hasSubUser"
                    v-model="visibleMobileCertify"
                    :class="{ blue: !item.id }"
                    :disabled="!hasModifyPermission"
                    :name="memberInfo?.username"
                    :mobile="memberInfo?.mobile"
                    @confirmed="movePage('serial')"
                  >
                    {{ serialButtonLabel }}
                  </MobileCertifyDialog>
                  <button
                    v-else
                    class="btn"
                    :class="{ blue: !item.id }"
                    :disabled="!hasModifyPermission"
                    :name="memberInfo?.username"
                    :mobile="memberInfo?.mobile"
                    @click.prevent="movePage('serial')"
                  >
                    {{ serialButtonLabel }}
                  </button>
                </template>
                <template v-else>{{ serialButtonLabel }}</template>
              </dd>
              <dt>건강 설문 정보</dt>
              <dd>
                <template v-if="isMine && isProgress">
                  <MobileCertifyDialog
                    v-if="hasSubUser"
                    v-model="visibleMobileCertify"
                    :class="{ blue: !item.surveyDate }"
                    :disabled="!hasModifyPermission"
                    :name="memberInfo?.username"
                    :mobile="memberInfo?.mobile"
                    @confirmed="movePage('survey')"
                  >
                    {{ surveyButtonLabel }}
                  </MobileCertifyDialog>
                  <button
                    v-else
                    class="btn"
                    :class="{ blue: !item.surveyDate }"
                    :disabled="!hasModifyPermission"
                    :name="memberInfo?.username"
                    :mobile="memberInfo?.mobile"
                    @click.prevent="movePage('survey')"
                  >
                    {{ surveyButtonLabel }}
                  </button>
                </template>
                <template v-else>{{ surveyButtonLabel }}</template>
              </dd>

              <dt>수거 신청 정보</dt>
              <dd>
                <template v-if="isMine && isProgress">
                  <MobileCertifyDialog
                    v-if="hasSubUser"
                    v-model="visibleMobileCertify"
                    :class="{ blue: !item.pickupDate }"
                    :disabled="!hasModifyPermission"
                    :name="memberInfo?.username"
                    :mobile="memberInfo?.mobile"
                    @confirmed="movePage('pickup')"
                  >
                    {{ surveyButtonLabel }}
                  </MobileCertifyDialog>
                  <button
                    v-else
                    class="btn"
                    :class="{ blue: !item.pickupDate }"
                    :disabled="!hasModifyPermission"
                    @click.prevent="movePage('pickup')"
                  >
                    {{ surveyButtonLabel }}
                  </button>
                </template>
                <template v-else>{{ pickupButtonLabel }}</template>
              </dd>
            </dl>
            <div v-if="item.pickupDate" class="guideinfo">
              <!-- dot -->
              <ul>
                <li class="color-red">수거 예정일 : {{ getDateTime(item.pickupDate) }}</li>
                <li class="color-red">수거 예정일 이틀 전까지 수정 가능합니다.</li>
                <!-- eslint-disable-next-line vue/no-v-html -->
                <li v-if="item.status" class="color-red" v-html="`상태: ${kitStatusDetailMsg[item.status]}`"></li>
              </ul>
            </div>
          </template>
          <p v-else>
            {{ `키트 수거 예정일은 ${getDateTime(item.pickupDate)} 입니다` }}
          </p>
        </li>
        <li :class="{ active: item.stepStatus === 'step2' }">
          <strong class="step-tit">Step2 배송</strong>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <p v-if="item.stepStatus === 'step2'" v-html="kitStatusDetailMsg[item.status]"></p>
          <p v-else-if="['step3', 'step4'].includes(item.stepStatus || '') && item.arrivalDate">
            {{ `키트 도착일은 ${dayjs(item.arrivalDate).format('YYYY년 MM월 DD일')} 입니다.` }}
          </p>
        </li>
        <li :class="{ active: item.stepStatus === 'step3' }">
          <strong class="step-tit">Step3 분석</strong>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <!-- <p v-if="item.stepStatus === 'step3'" v-html="kitStatusDetailMsg[item.status]"></p> -->
          <!-- completeDate(hem에서 알려준 예상일)보여주고 없으면 키트도착일로 표현 -->
          <p v-if="['step3', 'step4'].includes(item.stepStatus || '') && item.arrivalDate">
            {{ arrivalDateMsg }}
          </p>
        </li>
        <li :class="{ active: item.stepStatus === 'step4' }">
          <strong class="step-tit">Step4 결과</strong>
          <template v-if="item.stepStatus === 'step4'">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p v-html="kitStatusDetailMsg[item.status]"></p>
            <template v-if="sucessResults.includes(item.status)">
              <!-- <p>
                분석이 완료되었습니다.<br />
                맞춤형 프로바이오틱스 추천 제품과 이메일로 발송된 결과 레포트를 확인해주세요.<br />
                마이랩 SOP를 신청하신 분들은 추천된 맞춤형 프로 바이오틱스 제품으로 정기배송이 시작됩니다.
              </p> -->
              <button class="btn full large" @click.prevent="reSendEmail">이메일 재발송 신청</button>
              <!-- 2022-04-12 SOP 문구 추가 -->
              <div class="guideinfo">
                <ul>
                  <li>
                    * 결과 레포트에 포함되는 정보는 마이랩 마이크로바이옴 프로바이오틱스 이외의 제품 추천에 활용할 수
                    없습니다.
                  </li>
                </ul>
              </div>
              <div v-if="product" class="product">
                <strong>{{ product?.name }}</strong>
                <span class="img"><img :src="product?.imageUrl" :alt="product?.name" /></span>
                <a :href="product?.url" class="btn full large blue">맞춤형 프로바이오틱스 제품 확인</a>
              </div>
            </template>
            <template v-else-if="failResults[item.status]">
              <div class="newkitbtn">
                <!-- 내역이 있으면서 & step4일 경우 노출 -->
                <router-link class="btn full large" to="/kit/terms">신규 키트 등록</router-link>
              </div>
            </template>
          </template>
        </li>
      </ol>
    </div>

    <!-- 진행중일 때는 비노출 -->
    <button v-if="!isProgress" type="button" class="btn-more" @click.prevent="isFolding = !isFolding">
      <span class="hide">열기/닫기</span>
    </button>
  </div>
</template>

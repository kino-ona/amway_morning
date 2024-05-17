<script lang="ts" setup>
import { computed, onMounted, PropType, ref } from 'vue'
import { GetMemberRes } from '~/apis/model/userModel'
import { KitStatus } from '~/apis/model/kitModel'
import { useMember } from '~/pages/members/components/useMember'
import dayjs from 'dayjs'
import { useUserStore } from '~/stores/user'
import { useRouter } from 'vue-router'
import { useKitStore } from '~/stores/kit'
import { usePromise } from '~/hooks/usePromise'
import { getKitListInfo, getProductInfo } from '~/apis/kit'

const props = defineProps({
  info: {
    type: Object as PropType<GetMemberRes>,
    required: true,
  },
})

const userStore = useUserStore()
const myId = computed(() => userStore.getUserInfo?.id)
const birthDate = computed(() => {
  const birthDate = dayjs(props.info.birth)

  return `${birthDate.get('year')}년 ${birthDate.get('months') + 1}월 ${birthDate.get('date')}일생`
})
const today = dayjs()
const hasModifyPermission = computed(() => !props.info.pickupDate || today.diff(props.info.pickupDate, 'day') < 2)

const { classNames, memberBadge, globalAge, profileImage, status } = useMember(props.info)

const isOpenDescription = ref<boolean>(false)
function toggleDescription() {
  isOpenDescription.value = !isOpenDescription.value
}

const { callPromiseFn: getProductInfoAPI, data: product } = usePromise<typeof getProductInfo>(getProductInfo)
onMounted(() => {
  if (props.info.status === KitStatus.DONE && props.info.microbiome) {
    getProductInfoAPI(props.info.microbiome)
  }
})

const router = useRouter()
const kitStore = useKitStore()
const { callPromiseFn: getKitListInfoAPI, data: histories } = usePromise<typeof getKitListInfo>(getKitListInfo)
async function movePage(url: string) {
  await getKitListInfoAPI(props.info.id)
  const item = histories.value?.find(({ id }) => id === props.info.kitId)
  item && kitStore.setKitItem(item)
  kitStore.setMemberInfo(props.info)
  console.log('move kit :>> ', url)
  router.push(url)
}
</script>

<template>
  <li :class="classNames">
    <router-link :to="myId === info.id ? '/members/my-info' : `/members/${info.id}`">
      <div class="box">
        <span class="img">
          <img :src="profileImage" loading="lazy" alt="" />
          <span v-if="!!memberBadge">{{ memberBadge }}</span>
        </span>
        <div class="info">
          <strong>
            {{ info.username }}
            <em v-if="globalAge">{{ `(${globalAge}세)` }}</em>
          </strong>
          <span class="birth">{{ birthDate }}</span>
        </div>
        <button class="btn-link">
          <span class="hide">바로가기</span>
        </button>
      </div>
    </router-link>

    <div class="toggle" :class="{ open: isOpenDescription }">
      <p>
        <span class="state" :class="status.classNames">{{ status.status }}</span>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-html="status.description"></span>
      </p>
      <button v-if="status.visibleToggleButton" type="button" class="btn-toggle" @click="toggleDescription">
        <span class="hide">열기/닫기</span>
      </button>
      <div class="toggle-cont">
        <template v-if="info.status === KitStatus.READY">
          <p class="text">서비스 이용을 위해 키트 등록, 건강 설문, 수거 신청을 진행해주세요.</p>
          <!-- <button class="btn full large blue" @click="movePage('/kit/terms')">키트 등록 시작</button> -->
        </template>
        <template v-else-if="info.status === KitStatus.CREATED">
          <p class="text">키트 등록, 건강 설문 작성, 수거 신청 정보 입력을 모두 완료 후 채변을 진행해주세요.</p>
          <div class="btn-area">
            <button
              type="button"
              class="btn large"
              :class="{ confirm: !!info.kitId }"
              @click="movePage(myId === info.id ? '/members/my-info' : `/members/${info.id}`)"
            >
              <!-- @click="movePage(!!info.id ? `/kit/${info.id}/serial` : '/kit/serial')" -->
              키트 등록
            </button>
            <!-- 완료된 항목 : confirm 클래스 추가 -->
            <button
              type="button"
              class="btn large"
              :class="{ confirm: !!info.surveyDate }"
              @click="movePage(myId === info.id ? '/members/my-info' : `/members/${info.id}`)"
            >
              <!-- @click="movePage(!!info.id ? `/kit/${info.id}/survey` : '/kit/survey')" -->
              건강 설문
            </button>
            <button
              type="button"
              class="btn large"
              :class="{ confirm: !!info.pickupDate }"
              @click="movePage(myId === info.id ? '/members/my-info' : `/members/${info.id}`)"
            >
              <!-- @click="movePage(!!info.id ? `/kit/${info.id}/pickup` : '/kit/pickup')" -->
              수거 신청
            </button>
          </div>
        </template>
        <template v-else-if="info.status === KitStatus.PROCEED">
          <p class="text">채변은 꼭 수거 예정일 당일 혹은 예정일 1~2일전에 진행해주세요.</p>
          <div class="btn-area">
            <button type="button" class="btn large confirm" disabled @click="movePage(`/kit/${info.id}/serial`)">
              {{ hasModifyPermission ? '키트 등록' : '완료' }}
            </button>
            <button type="button" class="btn large confirm" disabled @click="movePage(`/kit/${info.id}/survey`)">
              {{ hasModifyPermission ? '건강 설문' : '완료' }}
            </button>
            <button type="button" class="btn large confirm" disabled @click="movePage(`/kit/${info.id}/pickup`)">
              {{ hasModifyPermission ? '수거 신청' : '완료' }}
            </button>
          </div>
        </template>
        <template v-else-if="info.status === KitStatus.DONE">
          <p class="text">맞춤형 프로바이오틱스 추천 제품과 이메일로 발송된 결과 레포트를 확인해주세요.</p>
          <a :href="product?.url" class="btn full large">맞춤형 프로바이오틱스 제품 확인</a>
          <!-- <button class="btn full large blue" @click="movePage('/kit/terms')">신규 키트 등록</button> -->
        </template>
        <template v-else-if="info.status === KitStatus.REJECT">
          <p class="text">
            채취량 부족, 신선도 등의 이유로 분석이 <span class="color-red">반려</span>되었습니다.<br />자동 발송되는
            새로운 키트를 받으신 후, 재 등록하여 다시 접수 해주세요.
          </p>
          <!-- <button class="btn full large blue" @click="movePage('/kit/terms')">신규 키트 등록</button> -->
        </template>
        <template v-else-if="info.status === KitStatus.BEFORE">
          <p class="text">서비스 이용을 위해 멤버의 약관 동의 및 키트 등록이 필요합니다.</p>
        </template>
      </div>
    </div>
  </li>
</template>

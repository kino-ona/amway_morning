<script lang="ts" setup>
import type { LabelNValue } from '#/custom'
import { computed, ref, onMounted } from 'vue'
import MemberInfo from '~/pages/members/components/MemberInfo.vue'
import MemberKitHistory from '~/pages/members/components/MemberKitHistory.vue'
import { getMemberInfo, getMembers } from '~/apis/user'
import { usePromise } from '~/hooks/usePromise'
import Tab from '~/components/Tab.vue'
import { useRouter } from 'vue-router'
import { PageEnum } from '~/routers/pageEnum'
import { ResultEnum } from '~/utils/http/axios/httpEnum'
import { getKitListInfo } from '~/apis/kit'
import { useQuery } from '~/hooks/useQuery'
import { useKitStore } from '~/stores/kit'
import { useUserStore } from '~/stores/user'
import { MemberType, RoleEnum } from '~/apis/model/userModel'
import { getGlobalAge } from '~/pages/members/components/useMember'
import { maxBy, orderBy } from 'lodash-es'
import dayjs from 'dayjs'
import { usePermission } from '~/hooks/usePermission'

const props = defineProps({
  seq: {
    type: Number,
    required: true,
  },
  isMine: {
    type: Boolean,
    default: false,
  },
})

const userStore = useUserStore()
const kitStore = useKitStore()
const router = useRouter()
const { hasPermission } = usePermission()

const { callPromiseFn: getMemberInfoAPI, data: info } = usePromise<typeof getMemberInfo>(getMemberInfo)
const { callPromiseFn: getMembersAPI, data: members } = usePromise<typeof getMembers>(getMembers)
const { callPromiseFn: getKitListInfoAPI, data: histories } = usePromise<typeof getKitListInfo>(getKitListInfo)

try {
  const data = await getMemberInfoAPI(props.seq)
  kitStore.setMemberInfo(data!)
} catch (e) {
  if (e === ResultEnum.EMPTY_CONTENT) {
    window.alert('존재하지 않는 회원입니다.')
    router.back()
  }
}

onMounted(async () => {
  await getKitListInfoAPI(props.seq)
  // ABO 회원 및 해당 맴버가 주/부 인 경우 부 사업자 존재를 위해 맴버 목록 조회
  if (
    hasMasterPermission.value &&
    !!(info.value?.type && ([MemberType.MAIN, MemberType.SUB] as MemberType[]).includes(info.value?.type))
  ) {
    await getMembersAPI({ distNo: userStore.getUserInfo!.distNo, sort: 'registered' })
  }
})

const hasMasterPermission = computed<boolean>(() =>
  hasPermission([RoleEnum.MAIN, RoleEnum.SUB, RoleEnum.MEMBER, RoleEnum.CUSTOMER])
)
const isMasterOrSub = computed<boolean>(
  () => !!(info.value?.type && ([MemberType.MAIN, MemberType.SUB] as MemberType[]).includes(info.value?.type))
)
const hasSubUser = computed<boolean>(
  () => hasMasterPermission.value && isMasterOrSub.value && !!members.value?.some(({ type }) => type === MemberType.SUB)
)
const isMinors = computed<boolean>(
  () => info.value?.type === MemberType.FAMILY && getGlobalAge(info.value?.birth ?? '') < 14
)
const hasModifyPermission = computed<boolean>(
  () => props.isMine || (hasMasterPermission.value && (isMinors.value || isMasterOrSub.value))
)

const goingHistories = computed(() => {
  const goingHistories = histories.value?.filter(({ stepStatus }) => {
    return stepStatus !== 'step4'
  })
  const latedCreatedDate = maxBy(histories.value, ({ createdDate }) => createdDate)?.createdDate

  if (latedCreatedDate) {
    const latedCreatedDateVal = dayjs(latedCreatedDate)
    const oneMonthHistories = histories.value
      ?.filter(({ stepStatus }) => stepStatus === 'step4')
      ?.filter(({ createdDate, endDate }) => {
        return (
          // step4중에서 완료일보다 최신 등록일이 존재하면 이전내역 혹은 완료된지 한달이 넘으면 이전
          latedCreatedDateVal.diff(dayjs(createdDate)) < 0 ||
          (latedCreatedDate === createdDate && dayjs().diff(dayjs(endDate), 'month') < 1)
        )
      })

    if (oneMonthHistories?.length) {
      goingHistories?.push(...oneMonthHistories)
    }
  }

  return orderBy(goingHistories, ['createdDate'], ['desc'])
})
const doneHistories = computed(() => {
  const goingHistoriesIds = goingHistories.value?.map(({ id }) => id)
  return orderBy(
    histories.value?.filter(({ id }) => !goingHistoriesIds?.includes(id)),
    ['createdDate'],
    ['desc']
  )
})

const { query } = useQuery({
  defaultQuery: {
    tab: 'now',
  },
})
const currentTab = ref<string>(query.tab)
const tabItems: LabelNValue<string>[] = [
  { label: '진행 중', value: 'now' },
  { label: '이전 내역', value: 'before' },
]
function changeTab(val: string) {
  router.replace({ query: { tab: val } })
}
</script>

<template>
  <div class="member">
    <h2 class="h2-title">my LAB 멤버</h2>
    <member-info :info="info" :is-mine="isMine" @removed="$router.push(PageEnum.ROOT_PATH)" />
    <Tab v-model="currentTab" :items="tabItems" @change="changeTab">
      <template #tab-item-now>
        <div v-if="!goingHistories?.length" class="nodata">
          <p>진행중인 내역이 없습니다.</p>
        </div>
        <member-kit-history
          v-for="(history, index) in goingHistories"
          :key="history.id"
          :has-sub-user="hasSubUser"
          :is-mine="isMine || hasModifyPermission"
          :seq="seq"
          :item="history"
          :class="{ active: index === (goingHistories?.length ?? 0) - 1 }"
          :has-remove-permission="isMine || hasModifyPermission"
          is-progress
          @removed="getKitListInfoAPI(seq)"
        />
        <div v-if="hasModifyPermission" class="newkitbtn">
          <router-link to="/kit/terms" class="btn full large">신규 키트 등록</router-link>
        </div>
      </template>
      <template #tab-item-before>
        <div v-if="!doneHistories?.length" class="nodata">
          <p>진행중인 내역이 없습니다.</p>
          <!-- <router-link to="/kit/terms" class="btn full large">키트 등록 시작</router-link> -->
        </div>
        <member-kit-history
          v-for="(history, index) in doneHistories"
          :key="history.id"
          :seq="seq"
          :item="history"
          :class="{ active: index === (doneHistories?.length ?? 0) - 1 }"
        />
      </template>
    </Tab>

    <div v-if="isMine" class="btn-area tac">
      <router-link to="/members/my-info/leave" class="btn-withdrawal">my LAB 탈퇴</router-link>
    </div>
  </div>
</template>

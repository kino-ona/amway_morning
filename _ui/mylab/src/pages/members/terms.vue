<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue'
import { getTerms, saveTerms } from '~/apis/terms'
import { usePromise } from '~/hooks/usePromise'
import { useUserStore } from '~/stores/user'
import { GetTermsRes, SaveTermsReq, TermMember, TermNecessary, TermType } from '~/apis/model/termsModel'
import { useRouter } from 'vue-router'
import { PageEnum } from '~/routers/pageEnum'
import { TermTarget } from '~/apis/model/termsModel'
import { getGlobalAge } from '~/pages/members/components/useMember'
import { KitStatus } from '~/apis/model/kitModel'
import { GetUserInfoRes, RoleEnum } from '~/apis/model/userModel'
import Terms from '~/components/Terms.vue'
import { getUpdateUserTerms } from '~/apis/user'

const userStore = useUserStore()

const { callPromiseFn: getTermsAPI } = usePromise<typeof getTerms>(getTerms)
const { callPromiseFn: getUpdateUserTermsAPI } = usePromise<typeof getUpdateUserTerms>(getUpdateUserTerms)

// 전체 약관
const terms = ref<GetTermsRes[] | undefined>()
// 자녀 정보
const minorInfos = ref<GetUserInfoRes[] | undefined>()
// 선택한 내 약관 목록
const mineTermIds = ref<number[]>([])
// 선택한 자녀 id 목록
const minorUserIds = ref<number[]>([])
// 선택한 자녀 약관 목록
const minorTermIds = ref<number[]>([])

const mineTotalChecked = computed<boolean>({
  get() {
    const termsIds = mineTermIds.value
    return !!mineTerms.value?.length && !mineTerms.value?.some(({ id }) => !termsIds.includes(id))
  },
  set(val) {
    if (val) {
      mineTermIds.value = mineTerms.value?.map(({ id }) => id) ?? []
    } else {
      mineTermIds.value = []
    }
  },
})
const minorsTotalChecked = computed<boolean>({
  get() {
    const termsIds = minorTermIds.value
    return !!minorsTerms.value?.length && !minorsTerms.value?.some(({ id }) => !termsIds.includes(id))
  },
  set(val) {
    if (val) {
      minorTermIds.value = minorsTerms.value?.map(({ id }) => id) ?? []
    } else {
      minorTermIds.value = []
    }
  },
})

const requiredTerms = computed(() =>
  terms.value?.filter(({ necessary }) =>
    ([TermNecessary.REQUIRED, TermNecessary.READONLY] as TermNecessary[]).includes(necessary)
  )
)
const mineTerms = computed(() => terms.value?.filter(({ target }) => target !== TermTarget.MINORS))
const minorsTerms = computed(() =>
  terms.value?.filter(({ target }) => !!([TermTarget.MINORS, TermTarget.COMMON] as TermTarget[]).includes(target))
)
const totalRequiredChecked = computed(() => {
  const checkedTerms = [...mineTermIds.value, ...minorTermIds.value]
  return !requiredTerms.value?.some(({ id }) => !checkedTerms.includes(id))
})

const isFirst = computed(() => userStore.getUserInfo?.status === KitStatus.BEFORE)
onMounted(async () => {
  const age = getGlobalAge(userStore.getUserInfo?.birth ?? '')
  const roles = userStore.getRoles
  const member = [RoleEnum.MAIN, RoleEnum.SUB, RoleEnum.MEMBER, RoleEnum.CUSTOMER].some((role) => roles?.includes(role))
    ? TermMember.AMWAY_MEMBER
    : TermMember.MEMBER

  let target: TermTarget = TermTarget.ADULT

  if (age < 14) {
    target = TermTarget.MINORS
  } else if (age < 20) {
    target = TermTarget.TEENAGER
  }

  if (isFirst.value) {
    terms.value = await getTermsAPI({
      target,
      type: TermType.SIGN_IN,
      member,
    })
  } else {
    const data = await getUpdateUserTermsAPI()
    terms.value = data?.terms
    minorInfos.value = data?.minorInfos
  }
})

function validation(): boolean {
  if (!totalRequiredChecked.value) {
    window.alert('필수 동의사항에 동의하셔야 합니다.')
    return false
  } else if ((minorInfos.value?.length ?? 0) !== minorUserIds.value.length) {
    window.alert('만14세 미만 아동을 확인해 주세요.')
    return false
  }

  return true
}

const router = useRouter()
const { isLoading, callPromiseFn: saveTermsAPI } = usePromise<typeof saveTerms>(saveTerms)
async function saveForm() {
  if (!validation()) {
    return
  }

  let reqData: SaveTermsReq | SaveTermsReq[]

  if (isFirst.value) {
    reqData = {
      termInfo: mineTermIds.value,
      userId: userStore.getUserInfo!.id,
    }
  } else {
    reqData = [
      {
        termInfo: mineTermIds.value,
        userId: userStore.getUserInfo!.id,
      },
    ]

    const terms = Array.from(new Set(minorTermIds.value))

    minorUserIds.value?.forEach((id) =>
      (reqData as SaveTermsReq[]).push({
        termInfo: terms,
        userId: id,
      })
    )
  }

  await saveTermsAPI(reqData, !isFirst.value)

  await userStore.getUserInfoAction()

  const { redirect, ...query } = router.currentRoute.value.query
  const redirectPath = (redirect || PageEnum.ROOT_PATH) as string
  router.push({
    path: redirectPath,
    query,
  })
}
</script>

<template>
  <div class="agree-intro">
    <form>
      <fieldset>
        <legend>my LAB 멤버 약관 동의</legend>
        <h2 class="h2-title">my LAB 멤버 약관 동의</h2>

        <div class="agreesummary">
          <p>my LAB 서비스 이용을 위해 약관에 동의해주세요.</p>

          <label class="chkbig"><input v-model="mineTotalChecked" type="checkbox" /><span>전체 동의하기</span></label>
        </div>

        <Terms
          v-for="item in mineTerms"
          :key="item.id"
          v-model="mineTermIds"
          name="member-terms"
          :terms-seq="item.id"
          :subject="item?.termsType?.name"
          :contents="item.contents"
          :required="([TermNecessary.REQUIRED, TermNecessary.READONLY] as TermNecessary[]).includes(item.necessary)"
        />

        <br />
        <br />
        <br />

        <template v-if="!isFirst && minorInfos?.length">
          <div class="agreechildsummary">
            <p>
              본인은 아래 만14세 미만 아동의 법정대리인으로, 각 자녀를 대리하여 아래 이용약관 및 동의서에 모두
              동의합니다.
            </p>
            <div class="chk-area">
              <span class="chk-text">자녀 :</span>
              <ul class="chk-list">
                <li v-for="minor in minorInfos" :key="minor.id">
                  <label class="revert">
                    <input v-model="minorUserIds" type="checkbox" name="minors" :value="minor.id" />
                    <span>{{ minor.username }}</span>
                  </label>
                </li>
              </ul>
            </div>
          </div>

          <p class="gray-text">
            <!-- 2022-04-20 14세 미만 약관 내용 추가 -->
            위 자녀 중 현재 만14세 이상의 자녀가 있는 경우, 만14세 이상 자녀를 대리하여 동의하실 수 없습니다. 우선, 동의
            진행 하신 후 기존 자녀는 탈퇴 진행 or 만14세 이상의 자녀는 마이랩 (청소년) 맴버로 등록하시기 바랍니다.
          </p>

          <br />
          <br />

          <label class="chkbig">
            <input v-model="minorsTotalChecked" type="checkbox" />
            <span>전체 동의하기</span>
          </label>

          <Terms
            v-for="item in minorsTerms"
            :key="item.id"
            v-model="minorTermIds"
            name="member-terms"
            :terms-seq="item.id"
            :subject="item?.termsType?.name"
            :contents="item.contents"
            :required="([TermNecessary.REQUIRED, TermNecessary.READONLY] as TermNecessary[]).includes(item.necessary)"
          />
        </template>

        <div class="bottom-btns">
          <button class="btn full xlarge blue" :disabled="!totalRequiredChecked || isLoading" @click.prevent="saveForm">
            {{ isFirst ? '시작' : '동의' }}
          </button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<route lang="yaml">
meta:
  title: 약관 동의
</route>

<script lang="ts" setup name="KitTerms">
import { ref, onMounted } from 'vue'
import { uniqueId } from 'lodash-es'
import { getTerms } from '~/apis/terms'
import { useKitStore } from '~/stores/kit'
import { usePromise } from '~/hooks/usePromise'
import { MemberType } from '~/apis/model/userModel'
import { TermTarget, TermType, TermMember, TermNecessary } from '~/apis/model/termsModel'
import { getGlobalAge } from '~/pages/members/components/useMember'
import Terms from '~/components/Terms.vue'

defineProps({
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

const { isLoading, data: terms, callPromiseFn } = usePromise<typeof getTerms>(getTerms)
const termsName = ref(uniqueId('terms-'))

let form = ref<number[]>([])
onMounted(async () => {
  // 약관 목록 조회
  const type = kitStore.getMemberInfo?.type
  const birth = kitStore.getMemberInfo?.birth
  const aboMembers = [MemberType.MAIN, MemberType.SUB, MemberType.MEMBER, MemberType.CUSTOMER] as MemberType[]
  const typeParam = type && aboMembers.includes(type) ? TermMember.AMWAY_MEMBER : TermMember.MEMBER

  const age = getGlobalAge(birth ?? '')

  let target: TermTarget = TermTarget.ADULT

  if (age < 14) {
    target = TermTarget.MINORS
  } else if (age < 20) {
    target = TermTarget.TEENAGER
  }

  await callPromiseFn({ member: typeParam, target, type: TermType.KIT })
  // 신규 등록시 키트아이템 초기화
  kitStore.setKitItem({
    id: undefined,
    deliveryNo: undefined,
    pickupDate: undefined,
    completeDate: undefined,
    createdDate: undefined,
    surveyDate: undefined,
    status: undefined,
    stepStatus: undefined,
    orderId: undefined,
    arrivalDate: undefined,
    microbiome: undefined,
  })
})
function validation(): boolean {
  const checkedTerms = form.value
  const requiredTerms = terms.value?.filter(({ necessary }) => necessary === 'Y').map(({ id }) => id) || []
  if (!requiredTerms.every((seq) => checkedTerms.includes(seq))) {
    // FIXME: 필수 항목으로 스크롤 이동 시켜야 하지 않는가?
    window.alert('필수 동의사항에 동의하셔야 합니다.')
    return false
  }
  return true
}

function saveTerms(): void {
  if (!validation()) {
    return
  }
  const result = terms.value?.map(({ id }) => ({
    agree: form.value.includes(id) ? 'Y' : 'N',
    termsInfoId: id,
  }))
  emits('apply', result)
}
</script>

<template>
  <section class="kit-agree">
    <form>
      <fieldset>
        <legend>약관동의</legend>
        <h2 class="h2-title">약관동의</h2>

        <div class="guideinfo box">
          <ul>
            <li>
              선택 동의서에 동의를 해주시면 ㈜에이치엠 파마에서 데이터를 구축하여 앞으로 더욱 정교한 서비스를 제공해
              드릴 수 있으므로 많은 동의 부탁드립니다.
            </li>
          </ul>
        </div>

        <Terms
          v-for="item in terms"
          :id="`terms-${item.id}`"
          :key="item.id"
          v-model="form"
          :name="termsName"
          :terms-seq="item?.id"
          :contents="item?.contents"
          :subject="item?.termsType?.name"
          :required="item?.necessary === TermNecessary.REQUIRED || item?.necessary === TermNecessary.READONLY"
        />

        <div class="bottom-btns">
          <button class="btn full xlarge blue" :disabled="isLoading || disabledSubmitButton" @click.prevent="saveTerms">
            키트 등록
          </button>
          <button class="btn full xlarge gray" @click.prevent="$router.back()">취소</button>
        </div>
      </fieldset>
    </form>
  </section>
</template>

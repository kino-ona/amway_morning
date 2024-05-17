<script lang="ts" setup>
import type { LabelNValue } from '#/custom'
import dayjs from 'dayjs'
import { isEmpty } from 'lodash-es'
import { computed, reactive, ref, ComputedRef } from 'vue'
import { useRouter } from 'vue-router'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { TermMember, TermNecessary, TermTarget, TermType } from '~/apis/model/termsModel'
import { MemberType, Sex, SaveMemberReq, RoleEnum } from '~/apis/model/userModel'
import { getTerms } from '~/apis/terms'
import { saveMemberInfo } from '~/apis/user'
import { usePromise } from '~/hooks/usePromise'
import { PageEnum } from '~/routers/pageEnum'
import { useUserStore } from '~/stores/user'
import { getDateTime } from '~/utils/date-utils'
import { isEmail } from '~/utils/is'
import { getGlobalAge } from '~/pages/members/components/useMember'
import Terms from '~/components/Terms.vue'
import { usePermission } from '~/hooks/usePermission'

const userStore = useUserStore()
const { hasPermission } = usePermission()

const formOption = reactive<Record<string, ComputedRef<LabelNValue<MemberType>[]> | LabelNValue<Sex>[]>>({
  memberType: computed(() => [
    { label: '가족', value: MemberType.FAMILY },
    {
      label: '지인',
      value: MemberType.FRIEND,
      disabled: !!userStore.getRoles.length && !hasPermission([RoleEnum.MAIN, RoleEnum.SUB]),
    },
  ]),
  sex: [
    { label: '남', value: Sex.MEN },
    { label: '여', value: Sex.WOMEN },
  ],
})

const form = ref<SaveMemberReq>({
  distNo: userStore.getUserInfo?.distNo ?? '',
  username: '',
  type: MemberType.FAMILY,
  sex: Sex.MEN,
  birth: '',
  email: '',
  mobile: '',
  zipCode: '',
  address: '',
  addressDetail: '',
  terms: [],
})
const birth = ref<Date | undefined>()

const mobileNumber = reactive({
  first: ref<string>(''),
  second: ref<string>(''),
  three: ref<string>(''),
})

const isInfant = computed(() => getGlobalAge(form.value?.birth ?? '') < 14)
const { callPromiseFn, data: terms } = usePromise<typeof getTerms>(getTerms)
const requiredTerms = computed(() =>
  terms.value?.filter(({ necessary }) => necessary === TermNecessary.REQUIRED).map(({ id }) => id)
)
const totalChecked = computed<boolean>({
  get() {
    return !!terms.value?.length && form.value?.terms?.length === terms.value?.length
  },
  set(val) {
    if (val) {
      form.value.terms = terms.value?.map(({ id }) => id) ?? []
    } else {
      form.value.terms = []
    }
  },
})
function changeBirth(value: Date) {
  form.value.birth = dayjs(value).format('YYYY-MM-DD')
  if (isInfant.value && !terms.value?.length) {
    callPromiseFn({
      type: TermType.SIGN_IN,
      target: TermTarget.MINORS,
      member: TermMember.MEMBER,
    })
  }
}

function validation(): boolean {
  const { type, username, birth, email, zipCode, address, addressDetail, terms } = form.value
  const { first, second, three } = mobileNumber

  if (isEmpty(username)) {
    window.alert('이름을 입력해 주세요.')
    return false
  } else if (isEmpty(birth)) {
    window.alert('생년월일을 입력해 주세요.')
    return false
  } else if (isEmpty(email)) {
    window.alert('이메일을 입력해 주세요.')
    return false
  } else if (!isEmail(email)) {
    window.alert('abcd@amway.com 형태로 입력해 주세요.')
    return false
  } else if (isEmpty(first) || isEmpty(second) || isEmpty(three)) {
    window.alert('휴대폰번호를 입력해 주세요.')
    return false
  } else if (isEmpty(zipCode) || isEmpty(address) || isEmpty(addressDetail)) {
    window.alert('주소를 입력해 주세요.')
    return false
  }

  if (isInfant.value) {
    if (type !== MemberType.FAMILY) {
      window.alert('만 14세 미만의 경우 가족만 등록이 가능합니다.')
      return false
    } else if (requiredTerms.value && requiredTerms.value?.some((id) => !terms?.includes(id))) {
      window.alert('필수 동의사항에 동의하셔야 합니다.')
      return false
    }
  }

  return true
}

const router = useRouter()
const { isLoading, callPromiseFn: saveMemberInfoAPI } = usePromise<typeof saveMemberInfo>(saveMemberInfo)
async function saveForm() {
  if (!validation()) {
    return
  }

  if (!form.value.distNo) {
    form.value.distNo = userStore.getUserInfo!.distNo
  }

  form.value.mobile = [mobileNumber.first, mobileNumber.second, mobileNumber.three].join('-')

  await saveMemberInfoAPI(form.value)
  window.alert('저장되었습니다.')
  router.push(PageEnum.ROOT_PATH)
}
</script>

<template>
  <div class="member-add">
    <form>
      <fieldset>
        <legend>my LAB 멤버 추가</legend>
        <h2 class="h2-title">my LAB 멤버 추가</h2>

        <div class="guideinfo box">
          <h3 class="h3-title">추가할 멤버의 정보를 입력해주세요.</h3>
          <ul>
            <li>
              * 이름, 생년월일, 성별은 추후 수정이 불가하며, 이메일과 주소는 등록하실 멤버가 추후 직접 수정할 수
              있습니다.
            </li>
          </ul>
        </div>

        <div class="formbox">
          <dl class="sort">
            <dt>유형</dt>
            <dd>
              <label v-for="item in formOption.memberType" :key="item.value">
                <input v-model="form.type" type="radio" :value="item.value" :disabled="item.disabled" />
                <span>{{ item.label }}</span>
              </label>
              <div class="guideinfo">
                <ul>
                  <li class="color-red">*만 14세 미만의 경우 가족만 등록이 가능합니다.</li>
                </ul>
              </div>
            </dd>
          </dl>
          <dl class="name">
            <dt><label for="username">이름</label></dt>
            <dd><input id="username" v-model="form.username" type="text" /></dd>
          </dl>
          <dl class="gender">
            <dt>성별</dt>
            <dd>
              <label v-for="item in formOption.sex" :key="item.value">
                <input v-model="form.sex" type="radio" :value="item.value" />
                <span>{{ item.label }}</span>
              </label>
            </dd>
          </dl>
          <dl class="datepicker">
            <dt><label for="userdate">생년월일</label></dt>
            <dd>
              <Datepicker
                v-model="birth"
                :format="getDateTime"
                locale="kr"
                week-start="0"
                esc-close
                auto-apply
                auto-position
                :enable-time-picker="false"
                @update:model-value="changeBirth"
              />
            </dd>
          </dl>
          <dl class="tel">
            <dt><label for="usertel">휴대폰</label></dt>
            <dd>
              <div class="flexbox">
                <div id="usertel" class="selectbox">
                  <select v-model="mobileNumber.first">
                    <option>010</option>
                    <option>011</option>
                    <option>016</option>
                    <option>017</option>
                    <option>018</option>
                    <option>019</option>
                  </select>
                </div>
                <input v-model="mobileNumber.second" type="tel" minlength="3" maxlength="4" />
                <span class="hyppen">-</span>
                <input v-model="mobileNumber.three" type="tel" minlength="4" maxlength="4" />
              </div>
            </dd>
          </dl>
          <dl class="email">
            <dt><label for="useremail">이메일</label></dt>
            <dd>
              <input id="useremail" v-model="form.email" type="email" />
            </dd>
          </dl>
          <address-input
            v-model:postCode="form.zipCode"
            v-model:prefixAddress="form.address"
            v-model:suffixAddress="form.addressDetail"
          />
        </div>

        <div class="guideinfo">
          <ul>
            <li>
              ※ (주)한국암웨이 Member 또는 Customer 계정 이용자는 본인의 가족 외에 타인을 “my LAB 멤버"로 추가하실 수
              없습니다.
            </li>
            <li>※ my LAB 멤버로 등록하려는 가족 혹은 지인의 동의를 먼저 구하고 정보를 입력하시기 바랍니다.</li>
          </ul>
        </div>

        <div v-if="isInfant" class="agree-area">
          <!-- 2022-04-11 14세 미만의 멤버의 경우 약관영역 추가 -->
          <h3>14세 미만의 멤버의 경우 약관 대리동의 후 등록이 가능합니다.</h3>

          <div class="agreesummary">
            <label class="chkbig"><input v-model="totalChecked" type="checkbox" /><span>전체 동의하기</span></label>
          </div>

          <Terms
            v-for="item in terms"
            :key="item.id"
            v-model="form.terms"
            :terms-seq="item.id"
            :subject="item?.termsType?.name"
            :contents="item.contents"
            :required="item.necessary === TermNecessary.REQUIRED || item.necessary === TermNecessary.READONLY"
          />
        </div>

        <div class="bottom-btns">
          <button class="btn full xlarge blue" :disabled="isLoading" @click.prevent="saveForm">저장</button>
          <button class="btn full xlarge gray" @click.prevent="$router.back()">취소</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<route lang="yaml">
meta:
  title: my LAB 맴버 추가
</route>

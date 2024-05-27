<script lang="ts" setup>
import type { MobileConfirmed } from '#/custom'
import { computed, ref } from 'vue'
import { getMemberInfo, saveMemberInfo } from '~/apis/user'
import { MemberType, SaveMemberReq, Sex } from '~/apis/model/userModel'
import { usePromise } from '~/hooks/usePromise'
import { useMember } from '~/pages/members/components/useMember'
import MobileCertify from '~/components/MobileCertify.vue'
import AddressInput from '~/components/AddressInput.vue'
import { isEmpty } from 'lodash-es'
import { isEmail } from '~/utils/is'

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
const emits = defineEmits(['saved'])

const { callPromiseFn: getMemberInfoAPI, data: beforeForm } = usePromise<typeof getMemberInfo>(getMemberInfo)
const data = await getMemberInfoAPI(props.seq)
const { classNames, profileImage, memberBadge, birthDateText, sexText } = useMember(beforeForm.value)

const form = ref<SaveMemberReq>({
  id: data?.id ?? props.seq,
  username: data?.username ?? '',
  type: data?.type ?? MemberType.CUSTOMER,
  mobile: data?.mobile ?? '',
  email: data?.email ?? '',
  sex: Sex.MEN,
  zipCode: data?.zipCode ?? '',
  address: data?.address ?? '',
  addressDetail: data?.addressDetail ?? '',
  otp: undefined,
})

form.value.email = data?.email ?? ''
form.value.mobile = data?.mobile ?? ''
form.value.address = data?.address ?? ''
form.value.addressDetail = data?.addressDetail ?? ''
form.value.zipCode = data?.zipCode ?? ''

// 주/부 사업자
const isMaster = computed(
  () => beforeForm.value && ([MemberType.MAIN, MemberType.SUB] as MemberType[]).includes(beforeForm.value?.type)
)

// 휴대폰 번호 변경 시
const isConfirmCertify = computed(
  () => (props.isMine || isMaster.value) && beforeForm.value?.mobile !== form.value.mobile
)

function confirmed({ certify }: MobileConfirmed) {
  form.value.otp = certify
}

function validation(): boolean {
  const { email, mobile, zipCode, address, addressDetail, otp } = form.value
  if (isEmpty(mobile)) {
    window.alert('휴대폰 번호를 입력해 주세요.')
    return false
  } else if (isConfirmCertify.value && isEmpty(otp)) {
    window.alert('휴대폰 인증을 완료하셔야 합니다.')
    return false
  } else if (isEmpty(email)) {
    window.alert('이메일을 입력해 주세요.')
    return false
  } else if (!isEmail(email)) {
    window.alert('abcd@amway.com 형태로 입력해 주세요.')
    return false
  } else if (isEmpty(zipCode) || isEmpty(address) || isEmpty(addressDetail)) {
    window.alert('주소를 입력해 주세요.')
    return false
  }

  return true
}

const { isLoading, callPromiseFn: saveMember } = usePromise<typeof saveMemberInfo>(saveMemberInfo)
async function saveForm() {
  if (!validation()) {
    return
  }
  await saveMember(form.value)
  emits('saved', form.value)
}
</script>

<template>
  <div class="member-edit">
    <form>
      <fieldset>
        <legend>my LAB 멤버</legend>
        <h2 class="h2-title">my LAB 멤버</h2>

        <div class="formbox">
          <!-- member-info// -->
          <div class="member-info">
            <div class="img" :class="classNames">
              <img :src="profileImage" alt="profile" />
            </div>
            <div class="user">
              <span v-if="memberBadge" class="label primary">{{ memberBadge }}</span>
              <strong>{{ beforeForm?.username }}</strong>
              <span>({{ sexText }})</span>
            </div>
          </div>
          <!-- //member-info -->

          <dl class="type-row">
            <dt>생년월일</dt>
            <dd>
              <p>{{ birthDateText }}</p>
            </dd>
          </dl>
          <mobile-certify
            v-model:mobile="form.mobile"
            :name="beforeForm?.username"
            :visible-name="false"
            :confirm-certify="isConfirmCertify"
            @confirmed="confirmed"
          />
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
            <li>※ 이름, 생년월일, 성별은 수정이 불가합니다.</li>
            <li>※ 휴대폰 번호 수정이 필요한 경우, my LAB에 초대해준 회원에게 직접 수정을 요청해주세요.</li>
          </ul>
        </div>

        <div class="bottom-btns">
          <button class="btn full xlarge blue" :disabled="isLoading" @click.prevent="saveForm">저장</button>
          <button class="btn full xlarge gray" @click.prevent="$router.back()">취소</button>
        </div>

        <div v-if="isMine" class="btn-area tac">
          <router-link to="/members/my-info/leave" class="btn-withdrawal">my LAB 파트너 탈퇴</router-link>
        </div>
      </fieldset>
    </form>
  </div>
</template>

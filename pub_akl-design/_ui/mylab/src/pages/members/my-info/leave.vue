<script lang="ts" setup name="MyLeavePage">
import type { LabelNValue } from '#/custom'
import { isEmpty } from 'lodash-es'
import { ref } from 'vue'
import { PostMemberLeave } from '~/apis/model/userModel'
import { saveMemberLeave } from '~/apis/user'
import { usePromise } from '~/hooks/usePromise'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()

const leaveReasons: LabelNValue<string>[] = [
  { value: '1', label: '서비스가 유용하지 않습니다.' },
  { value: '2', label: '더 이상 서비스를 이용할 계획이 없습니다.' },
  { value: '3', label: '개인 정보가 우려됩니다.' },
  { value: '4', label: '기록을 모두 삭제하고 다시 시작하고 싶습니다.' },
  { value: '5', label: '서비스 이용이 불편합니다.' },
]

function changeReason() {
  form.value.reason = ''
}

const agree = ref<boolean>(false)
const form = ref<PostMemberLeave>({
  userId: userStore.getUserInfo!.id,
  reasonType: '',
  reason: '',
})

function validation(): boolean {
  if (!agree.value) {
    window.alert('안내사항에 동의를 하셔야 탈퇴가 가능 합니다.')
    return false
  } else if (isEmpty(form.value.reasonType)) {
    window.alert('탈퇴 이유를 선택해 주세요.')
    return false
  }
  return true
}

const { isLoading, callPromiseFn } = usePromise<typeof saveMemberLeave>(saveMemberLeave)
async function saveForm() {
  if (!validation()) {
    return
  }

  if (window.confirm('정말 탈퇴하시겠습니까?\n귀하의 모든 정보는 남기지 않고 삭제처리됩니다.')) {
    const { reasonType, reason } = form.value
    const data: PostMemberLeave = {
      userId: userStore.getUserInfo!.id,
      reason: reasonType !== 'direct' ? leaveReasons.find(({ value }) => value === reasonType)?.label ?? '' : reason,
    }
    await callPromiseFn(data)
    userStore.logout()
  }
}
</script>

<template>
  <div class="member-leave">
    <form>
      <fieldset>
        <legend>my LAB 탈퇴</legend>
        <h2 class="h2-title">my LAB 탈퇴</h2>

        <div class="title-area">
          <h3 class="h3-title">my LAB 서비스를 탈퇴하시겠습니까?</h3>
          <p>
            탈퇴시, 본인과 본인의 계정에 등록되어 있던 모든 my LAB 멤버(Amway 회원의 경우)의 모든 서비스 이용에 대한
            기록과 정보가 삭제되어 복구할 수 없으며 30일동안 재가입이 불가합니다.
            <span class="color-red">(레포트 재발행 불가)</span>
          </p>

          <label class="chkbig">
            <input v-model="agree" type="checkbox" /><span>위의 안내사항을 읽고 이에 동의합니다.</span>
          </label>
        </div>

        <h3 class="h3-title">my LAB 서비스를 탈퇴하시려는 이유를 선택해 주세요.</h3>
        <div class="formbox">
          <dl>
            <dt><span class="hide">선택</span></dt>
            <dd>
              <ul>
                <li v-for="reason in leaveReasons" :key="reason.value">
                  <label>
                    <input
                      v-model="form.reasonType"
                      type="radio"
                      name="leave"
                      :value="reason.value"
                      @change="changeReason"
                    />
                    <span>{{ reason.label }}</span>
                  </label>
                </li>
                <li class="direct">
                  <label>
                    <input v-model="form.reasonType" type="radio" name="leave" value="direct" />
                    <span>직접입력</span>
                  </label>
                  <input v-model="form.reason" type="text" maxlength="100" :disabled="form.reasonType !== 'direct'" />
                </li>
              </ul>
            </dd>
          </dl>
        </div>

        <div class="bottom-btns">
          <button class="btn full xlarge blue" :disabled="isLoading" @click.prevent="saveForm">탈퇴</button>
          <button class="btn full xlarge gray" @click.prevent="$router.back()">취소</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<route lang="yaml">
meta:
  title: my LAB 맴버 탈퇴
</route>

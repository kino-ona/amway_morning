<script lang="ts" setup>
import { isEmpty } from 'lodash-es'
import { computed, reactive, ref, nextTick } from 'vue'
import { checkMobileCertify, sendMobileCertify } from '~/apis/user'
import { usePromise } from '~/hooks/usePromise'

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  mobile: {
    type: String,
    default: '',
  },
  visibleName: {
    type: Boolean,
    default: true,
  },
  confirmCertify: {
    type: Boolean,
    default: true,
  },
})

const emits = defineEmits(['update:name', 'update:mobile', 'confirmed'])

function handleNameInput(e: InputEvent) {
  emits('update:name', (e.target as HTMLInputElement).value)
}

const splitMobile = computed<string[]>(() => (props.mobile.length ? props.mobile.split('-') : ['', '', '']))
const mobileNumber = reactive({
  first: computed<string>({
    get() {
      const [first] = splitMobile.value
      return first
    },
    set(val) {
      const [, second, three] = splitMobile.value
      emits('update:mobile', [val, second, three].join('-'))
    },
  }),
  second: computed<string>({
    get() {
      const [, second] = splitMobile.value
      return second
    },
    set(val) {
      const [first, , three] = splitMobile.value
      emits('update:mobile', [first, val, three].join('-'))
    },
  }),
  three: computed<string>({
    get() {
      const [, , three] = splitMobile.value
      return three
    },
    set(val) {
      const [first, second] = splitMobile.value
      emits('update:mobile', [first, second, val].join('-'))
    },
  }),
})

let timer: number | undefined = undefined
const isSend = ref<boolean>(false)
function validation(checkCertify = false): boolean {
  if (isEmpty(props.name)) {
    alert('성함을 입력해 주세요.')
    return false
  }

  if (isEmpty(mobileNumber.first) || isEmpty(mobileNumber.second) || isEmpty(mobileNumber.three)) {
    alert('휴대폰 번호를 입력해 주세요.')
    return false
  } else if (!/(^02.{0}|^01.{1}|[0-9]{3})-?([0-9]{3,4})-?([0-9]{4})/.test(splitMobile.value.join(''))) {
    alert('올바른 휴대폰 번호가 아닙니다.')
    return false
  }

  if (checkCertify && !certify.value) {
    alert('인증 번호를 입력해 주세요.')
    return false
  }

  return true
}

const TIME_LIMIT = 5 * 60
let timerSecondsRemaining = TIME_LIMIT
function runTimer() {
  if (timer) {
    window.clearInterval(timer)
  }
  timerSecondsRemaining = TIME_LIMIT

  timer = window.setInterval(tick(), 1000)
}

const timeCounter = ref<string>('')
const canResend = ref<boolean>(false)
function tick() {
  const min = Math.floor(timerSecondsRemaining / 60)
  const sec = timerSecondsRemaining - min * 60

  timeCounter.value = `${min}:${`${sec}`.padStart(2, '0')}`

  if (timerSecondsRemaining === 0) {
    window.clearInterval(timer)
  } else if (timerSecondsRemaining < TIME_LIMIT - 20) {
    canResend.value = true
  }

  timerSecondsRemaining--

  return tick
}

const { isLoading, callPromiseFn: sendMobileCertifyAPI } = usePromise<typeof sendMobileCertify>(sendMobileCertify)
const $certify = ref<HTMLInputElement>()
async function sendSMS() {
  if (!validation()) {
    return
  }

  await sendMobileCertifyAPI({
    username: props.name,
    mobile: props.mobile,
  })
  runTimer()
  isSend.value = true
  await nextTick(() => $certify.value?.focus())
}
const certify = ref<number>()
const valid = ref<boolean>(false)
const certifyMobile = ref<string | null>(null)
const { isLoading: isLoadingCertify, callPromiseFn: checkMobileCertifyAPI } =
  usePromise<typeof checkMobileCertify>(checkMobileCertify)
async function validSMS() {
  if (!validation(true)) {
    return
  }

  await checkMobileCertifyAPI({
    username: props.name,
    mobile: props.mobile,
    otp: `${certify.value}`,
  })

  certifyMobile.value = props.mobile
  window.alert('인증 되었습니다.')

  emits('confirmed', {
    mobile: certifyMobile.value,
    certify: `${certify.value}`,
  })
}
</script>

<template>
  <dl v-if="visibleName" class="name">
    <dt><label for="username">이름</label></dt>
    <dd><input id="username" type="text" :value="name" @input="handleNameInput" /></dd>
  </dl>
  <dl class="tel">
    <dt><label for="usertel">휴대폰</label></dt>
    <dd>
      <div class="flexbox">
        <div id="usertel" class="selectbox">
          <select v-model="mobileNumber.first" :disabled="valid">
            <option>010</option>
            <option>011</option>
            <option>016</option>
            <option>017</option>
            <option>018</option>
            <option>019</option>
          </select>
        </div>
        <input
          v-model="mobileNumber.second"
          type="tel"
          minlength="3"
          maxlength="4"
          :disabled="valid"
          @keydown.enter="sendSMS"
        />
        <span class="hyppen">-</span>
        <input
          v-model="mobileNumber.three"
          type="tel"
          minlength="4"
          maxlength="4"
          :disabled="valid"
          @keydown.enter="sendSMS"
        />
      </div>
      <template v-if="confirmCertify">
        <div class="verification">
          <input
            ref="$certify"
            v-model="certify"
            type="number"
            pattern="\\d*"
            placeholder="인증번호 입력"
            :disabled="!isSend || valid"
          />
          <span v-if="isSend" class="time">{{ timeCounter }}</span>
        </div>
        <div v-if="!isSend" class="transparent">
          <button
            type="button"
            class="btn full large blue"
            :disabled="!name || !mobileNumber.first || !mobileNumber.second || !mobileNumber.three || isLoading"
            @click.prevent="sendSMS"
          >
            인증번호 전송
          </button>
        </div>
        <template v-else>
          <div v-if="!valid" class="transparent">
            <button
              type="button"
              class="btn large blue btn-verify"
              :disabled="isLoadingCertify"
              @click.prevent="validSMS"
            >
              인증하기
            </button>
            <button type="button" class="btn large btn-resend" :disabled="!canResend" @click.prevent="sendSMS">
              재전송
            </button>
          </div>
          <div v-else class="transparent">
            <button type="button" class="btn full large" disabled>인증완료</button>
          </div>
        </template>
      </template>
    </dd>
  </dl>
</template>

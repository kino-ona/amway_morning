<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useClipboard } from '@vueuse/core'
import BaseDialog from '~/components/dialog/BaseDialog.vue'

const props = defineProps({
  messages: {
    type: String,
    required: true,
  },
  buttonLabel: {
    type: String,
    default: '공유하기',
  },
})

const isOpenDialog = ref<boolean>(false)
function closeDialog() {
  isOpenDialog.value = false
}

async function onLoadKaKaoSDKScript() {
  await new Promise<void>((resolve) => {
    const script = document.createElement('script')
    script.id = 'kakao-sdk'
    script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js'
    script.defer = true
    script.onload = () => {
      window.Kakao.init(import.meta.env.VITE_KAKAO_API_KEY)
      resolve()
    }
    document.body.appendChild(script)
  })
}

onMounted(async () => {
  if (!document.getElementById('kakao-sdk')) {
    await onLoadKaKaoSDKScript()
  }
})

const deviceType = computed<string>(() => navigator.userAgent)
const isMobileDevice = computed<boolean>(() => /Android|iPhone|iPad|iPod/.test(deviceType.value))

function sendKakaoMessage() {
  window.Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: 'MyLAB',
      description: props.messages,
      imageUrl: `${window.location.origin}/resource/images/views/mainvisual_bg.png`,
      link: {
        mobileWebUrl: window.location.origin,
      },
    },
  })
  closeDialog()
}

function sendSMS() {
  const device = deviceType.value
  let smsURL = ''
  if (/Android/.test(device)) {
    smsURL = `?body=${props.messages}`
  } else if (/iPhone|iPad|iPod/.test(device)) {
    smsURL = `&body=${props.messages}`
  }

  window.location.href = `sms:${smsURL}`
  closeDialog()
}

const { isSupported, copy } = useClipboard({ source: props.messages })

async function copyClipboard() {
  await copy(props.messages)
  window.alert('클립보드에 복사 되었습니다.')
  closeDialog()
}
</script>

<template>
  <template v-if="isMobileDevice || isSupported">
    <slot :button-label="{ buttonLabel }">
      <button type="button" class="btn" v-bind="$attrs" @click.prevent="isOpenDialog = true">
        {{ buttonLabel }}
      </button>
    </slot>
  </template>
  <base-dialog v-model="isOpenDialog">
    <template #title>
      <h1 class="hide">공유하기</h1>
    </template>
    <div class="modal-share">
      <ul class="link">
        <li class="kakao"><button @click="sendKakaoMessage">카카오톡</button></li>
        <li v-if="isMobileDevice" class="sms"><button @click="sendSMS">SMS전송</button></li>
        <li v-if="isSupported" class="url"><button @click="copyClipboard">URL 복사</button></li>
      </ul>

      <div class="guideinfo">
        <ul>
          <!-- 2022-04-12 색상 클래스 추가 -->
          <li>
            * 초대 링크 전송 후, my LAB 멤버가 키트 등 록 시 필요한 본인의
            <span class="color-black">ABO번호</span>와 <span class="color-black">키트 주문번호</span>를 꼭 전달해주세요.
          </li>
          <li>* 주문번호는 키트 구매목록에서 복사하여 전달 하실 수 있습니다.</li>
        </ul>
      </div>
    </div>
  </base-dialog>
</template>

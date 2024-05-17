<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import BaseDialog from '~/components/dialog/BaseDialog.vue'
import loadPostcode from '~/utils/loadPostcode'

const props = defineProps({
  postCode: {
    type: String,
    default: '',
  },
  prefixAddress: {
    type: String,
    default: '',
  },
  suffixAddress: {
    type: String,
    default: '',
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['update:postCode', 'update:prefixAddress', 'update:suffixAddress'])

const form = reactive({
  postCode: computed({
    get() {
      return props.postCode
    },
    set(val) {
      emits('update:postCode', val)
    },
  }),
  prefixAddress: computed({
    get() {
      return props.prefixAddress
    },
    set(val) {
      emits('update:prefixAddress', val)
    },
  }),
  suffixAddress: computed({
    get() {
      return props.suffixAddress
    },
    set(val) {
      emits('update:suffixAddress', val)
    },
  }),
})
const visiblePrefixAddress = computed<string | null>(() => {
  if (form.postCode) {
    return `(${form.postCode}) ${form.prefixAddress}`
  }
  return null
})

const $daumPostCode = ref<HTMLDivElement>()
const isOpenDaumPostCode = ref<boolean>(false)
function openDaumPostcode() {
  loadPostcode('//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js').then(
    (Postcode: typeof window.daum.Postcode) => {
      isOpenDaumPostCode.value = true

      const postcode = new Postcode({
        oncomplete: (address) => {
          isOpenDaumPostCode.value = false
          let prefixAddress = address.jibunAddress
          let suffixAddress = ''
          console.log('address result :>> ', address)
          if (address.addressType === 'R') {
            prefixAddress = address.roadAddress
          }

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if (address.userSelectedType === 'R') {
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (address.bname !== '' && /[동|로|가]$/g.test(address.bname)) {
              suffixAddress += address.bname
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (address.buildingName !== '' && address.apartment === 'Y') {
              suffixAddress += suffixAddress !== '' ? ', ' + address.buildingName : address.buildingName
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (suffixAddress !== '') {
              suffixAddress = '(' + suffixAddress + ')'
            }
          }
          form.postCode = address.zonecode
          form.prefixAddress = prefixAddress
          form.suffixAddress = suffixAddress
        },
        width: '100%',
        height: '100%',
      })

      postcode.embed($daumPostCode.value!, { autoClose: true })
    }
  )
}
</script>

<template>
  <dl class="address">
    <dt><slot name="label">주소</slot></dt>
    <dd>
      <button :disabled="isDisabled" type="button" class="btn" @click.prevent="openDaumPostcode">주소검색</button>
      <base-dialog v-model="isOpenDaumPostCode" class="daum-post-dialog">
        <div class="daum-postcode-content">
          <div ref="$daumPostCode" class="daum-postcode"></div>
        </div>
      </base-dialog>
      <input :disabled="isDisabled" :value="visiblePrefixAddress" type="text" readonly />
      <input v-model="form.suffixAddress" :disabled="isDisabled" type="text" />
      <slot />
    </dd>
  </dl>
</template>

<style lang="scss" scoped>
.daum-post-dialog {
  .daum-postcode-content {
    position: relative;
    width: 100%;
    min-width: 240px;
    max-width: 1000px;
    margin-left: -24px;
    margin-right: -24px;
    .daum-postcode {
      width: 100%;
      height: 470px;
      margin: 10px 0;
      position: relative;
    }
  }
}
</style>

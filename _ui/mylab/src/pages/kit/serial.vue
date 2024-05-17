<script lang="ts" setup name="KitRegisterSerialPage">
import { useRouter } from 'vue-router'
import { kitOrderReq } from '~/apis/model/kitModel'
import KitRegister from '~/pages/kit/components/Serial.vue'
import { useKitStore } from '~/stores/kit'
import { saveKitSample } from '~/apis/kit'
import { usePromise } from '~/hooks/usePromise'

const kitStore = useKitStore()
const router = useRouter()
const { isLoading, callPromiseFn } = usePromise<typeof saveKitSample>(saveKitSample)

function apply(form: kitOrderReq) {
  const param = {
    ...form,
    type: 'insert',
  }
  kitStore.setSerialInfo(param)
  callPromiseFn(param).then(() => {
    kitStore.setKitItem({
      id: form.kitSerial,
      deliveryNo: undefined,
      pickupDate: undefined,
      completeDate: undefined,
      createdDate: undefined,
      surveyDate: undefined,
      status: undefined,
      stepStatus: undefined,
      orderId: param.orderNo,
      arrivalDate: undefined,
      microbiome: '',
    })
    router.replace({ path: `/kit/survey` })
  })
}
</script>

<template>
  <KitRegister :disabled-submit-button="isLoading" @apply="apply" />
</template>

<route lang="yaml">
meta:
  title: 키트 등록
</route>

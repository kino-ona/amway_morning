<script lang="ts" setup name="KitModifySerialPage">
import { useRouter } from 'vue-router'
import { saveKitSample } from '~/apis/kit'
import { kitOrderReq, KitItem } from '~/apis/model/kitModel'
import KitRegister from '~/pages/kit/components/Serial.vue'
import { usePromise } from '~/hooks/usePromise'
import { useKitStore } from '~/stores/kit'
import { computed, ref } from 'vue'

const props = defineProps({
  seq: {
    type: Number,
    default: null,
  },
})

const kitStore = useKitStore()
const router = useRouter()
const kitItem = computed(() => kitStore.getKitItem)
const { isLoading, callPromiseFn } = usePromise<typeof saveKitSample>(saveKitSample)

function apply(form: kitOrderReq) {
  const param = {
    ...form,
    type: 'update',
  }

  callPromiseFn(param).then(() => {
    kitStore.setSerialInfo(param)
    if (kitItem.value) {
      kitStore.setKitItem({
        ...kitItem.value,
        id: form.kitSerial,
      })
    }
    if (param.oldKitSerial === param.kitSerial) {
      router.back()
    } else {
      // 수정을 하면 신규 등록
      router.replace({ path: `/kit/survey`, query: { from: 'serial' } })
      // router.back()
    }
  })
}
</script>

<template>
  <!-- :disabled-submit-button="isLoading" -->
  <KitRegister :seq="seq" :disabled-submit-button="isLoading" @apply="apply" />
</template>

<route lang="yaml">
meta:
  title: 키트 수정
</route>

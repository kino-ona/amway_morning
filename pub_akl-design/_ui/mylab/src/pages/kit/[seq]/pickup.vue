<script lang="ts" setup name="KitModifyPickupPage">
import { useRouter } from 'vue-router'
import { updateSampleKitPickup } from '~/apis/kit'
import { KitPickUpReq } from '~/apis/model/kitModel'
import KitPickup from '~/pages/kit/components/Pickup.vue'
import { usePromise } from '~/hooks/usePromise'
import { useKitStore } from '~/stores/kit'

defineProps({
  seq: {
    type: Number,
    default: null,
  },
})

const kitStore = useKitStore()
const router = useRouter()

const { isLoading, callPromiseFn } = usePromise<typeof updateSampleKitPickup>(updateSampleKitPickup)

function apply(form: KitPickUpReq) {
  callPromiseFn(form).then(() => {
    kitStore.setKitPickUpReq(form)
    router.back()
  })
}
</script>

<template>
  <KitPickup :seq="seq" :disabled-submit-button="isLoading" @apply="apply" />
</template>

<route lang="yaml">
meta:
  title: 키트 수거 변경
</route>

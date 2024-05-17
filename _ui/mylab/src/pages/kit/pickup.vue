<script lang="ts" setup name="KitRegisterPickupPage">
import { useRouter } from 'vue-router'
import { updateSampleKitPickup } from '~/apis/kit'
import { KitPickUpReq } from '~/apis/model/kitModel'
import KitPickup from '~/pages/kit/components/Pickup.vue'
import { usePromise } from '~/hooks/usePromise'
import { useKitStore } from '~/stores/kit'
import { PageEnum } from '~/routers/pageEnum'

const kitStore = useKitStore()
const router = useRouter()

const { isLoading, callPromiseFn } = usePromise<typeof updateSampleKitPickup>(updateSampleKitPickup)

function apply(form: KitPickUpReq) {
  callPromiseFn(form)
    .then(() => {
      kitStore.setKitPickUpReq(form)
      let url = kitStore.getMemberInfo?.id ? `/members/${kitStore.getMemberInfo?.id}` : PageEnum.ROOT_PATH
      url && router.push(url)
    })
    .catch((e) => {
      console.log(25, 'pickup Error', e)
    })
}
</script>

<template>
  <KitPickup :disabled-submit-button="isLoading" @apply="apply" />
</template>

<route lang="yaml">
meta:
  title: 키트 수거 신청
</route>

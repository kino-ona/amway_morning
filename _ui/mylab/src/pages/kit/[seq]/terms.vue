<script lang="ts" setup name="KitModifyTermsPage">
import { useRouter } from 'vue-router'
import { saveKit } from '~/apis/kit'
import KitTerms from '~/pages/kit/components/Terms.vue'
import { usePromise } from '~/hooks/usePromise'
import { useKitStore } from '~/stores/kit'
import { SampleKitTerms } from '~/apis/model/kitModel'

const props = defineProps({
  seq: {
    type: Number,
    default: null,
  },
})

const kitStore = useKitStore()
const router = useRouter()

const { isLoading, callPromiseFn } = usePromise<typeof saveKit>(saveKit)

function apply(form: SampleKitTerms[]) {
  callPromiseFn(kitStore.getSaveKitReq).then(() => {
    kitStore.setTerms(form)
    router.back()
  })
}
</script>

<template>
  <KitTerms :seq="seq" :disabled-submit-button="isLoading" @apply="apply" />
</template>

<route lang="yaml">
meta:
  title: 키트 약관
</route>

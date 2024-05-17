<script lang="ts" setup name="KitModifySurveyReqPage">
import { useRouter, useRoute } from 'vue-router'
import { addSampleKitSurvey } from '~/apis/kit'
import { KitSurveyInfo } from '~/apis/model/kitModel'
import KitSurvey from '~/pages/kit/components/Survey.vue'
import { usePromise } from '~/hooks/usePromise'
import { useKitStore } from '~/stores/kit'
import { computed } from 'vue'

defineProps({
  seq: {
    type: Number,
    default: null,
  },
})

const kitStore = useKitStore()
const router = useRouter()
const sampleKitId = computed<string>(() => kitStore.getKitItem?.id as string)
const type = computed<string>(() => (kitStore.getKitItem?.surveyDate ? 'update' : 'insert'))

const { isLoading, callPromiseFn } = usePromise<typeof addSampleKitSurvey>(addSampleKitSurvey)
function apply(form: KitSurveyInfo) {
  callPromiseFn({
    sampleKitId: sampleKitId.value,
    surveyData: { ...form },
    type: type.value,
    email: form.p1q6 ?? '',
  }).then(() => {
    kitStore.setKitSurveyInfo(form)
    router.back()
  })
}
</script>

<template>
  <KitSurvey :seq="seq" :disabled-submit-button="isLoading" @apply="apply" />
</template>

<route lang="yaml">
meta:
  title: 키트 건강 설문 변경
</route>

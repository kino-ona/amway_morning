<script lang="ts" setup name="KitRegisterSurveyReqPage">
import { useRouter } from 'vue-router'
import { KitSurveyInfo } from '~/apis/model/kitModel'
import KitSurvey from '~/pages/kit/components/Survey.vue'
import { useKitStore } from '~/stores/kit'
import { computed, ref } from 'vue'
import { usePromise } from '~/hooks/usePromise'
import { addSampleKitSurvey } from '~/apis/kit'

const kitStore = useKitStore()
const router = useRouter()
const sampleKitId = computed<string>(() => kitStore.getKitItem?.id as string)
const type = ref('insert')
const { isLoading, callPromiseFn } = usePromise<typeof addSampleKitSurvey>(addSampleKitSurvey)

function apply(form: KitSurveyInfo) {
  callPromiseFn({
    sampleKitId: sampleKitId.value,
    surveyData: { ...form },
    type: type.value,
    email: form.p1q6 ?? '',
  }).then(() => {
    kitStore.setKitSurveyInfo(form)
    router.replace('/kit/pickup')
  })
}
</script>

<template>
  <KitSurvey :disabled-submit-button="isLoading" @apply="apply" />
</template>

<route lang="yaml">
meta:
  title: 키트 건강 설문
</route>

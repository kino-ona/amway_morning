<script lang="ts" setup name="KitRegisterTermsPage">
import { useRouter } from 'vue-router'
import KitTerms from '~/pages/kit/components/Terms.vue'
import { useKitStore } from '~/stores/kit'
import { useUserStore } from '~/stores/user'
import { SampleKitTerms } from '~/apis/model/kitModel'

const kitStore = useKitStore()
const router = useRouter()
const userStore = useUserStore()

const userInfo = userStore.getUserInfo

async function apply(form: SampleKitTerms[]) {
  kitStore.setTerms(form)
  router.replace('/kit/serial')
}
</script>

<template>
  <KitTerms @apply="apply" />
</template>

<route lang="yaml">
meta:
  title: 키트 약관
</route>

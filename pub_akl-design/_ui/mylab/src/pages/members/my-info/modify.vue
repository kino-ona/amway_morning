<script lang="ts" setup name="MyModifyPage">
import { computed } from 'vue'
import { useUserStore } from '~/stores/user'
import MemberModify from '../components/MemberModify.vue'
import { useRouter } from 'vue-router'
import { PageEnum } from '~/routers/pageEnum'

const userStore = useUserStore()

const seq = computed(() => userStore.getUserInfo!.id)

const router = useRouter()
function savedForm() {
  router.push(PageEnum.PARTNER_ROOT)
}
</script>

<template><member-modify :seq="seq" is-mine class="channel" @saved="savedForm" /></template>

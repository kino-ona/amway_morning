<script lang="ts" setup name="MyInfoPage">
import { computed } from 'vue'
import { useUserStore } from '~/stores/user'
import MemberDetail from '../components/MemberDetail.vue'

const userStore = useUserStore()

const seq = computed(() => userStore.getUserInfo!.id)
</script>

<template><member-detail :seq="seq" is-mine /></template>

<route lang="yaml">
meta:
  title: my LAB 내 정보
</route>

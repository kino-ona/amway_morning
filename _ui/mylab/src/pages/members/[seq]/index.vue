<script lang="ts">
import { defineComponent } from 'vue'
import { PageEnum } from '~/routers/pageEnum'
import { useUserStoreWithOut } from '~/stores/user'
import MemberDetail from '../components/MemberDetail.vue'

export default defineComponent({
  name: 'MemberDetailPage',
  components: {
    MemberDetail,
  },
  beforeRouteEnter(to, _from, next) {
    const userStore = useUserStoreWithOut()
    if (userStore.getUserInfo?.id === parseInt(to.params.seq as string)) {
      next({
        path: PageEnum.PARTNER_ROOT,
        replace: true,
      })
      return
    }

    next()
  },
  props: {
    seq: {
      type: String,
      required: true,
    },
  },
  computed: {
    numSeq() {
      return parseInt(this.seq)
    },
  },
})
</script>

<template><member-detail :seq="numSeq" class="channel" /></template>

<route lang="yaml">
meta:
  title: my LAB 맴버 관리
</route>

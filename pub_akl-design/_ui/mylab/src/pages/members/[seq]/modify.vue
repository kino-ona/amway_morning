<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStoreWithOut } from '~/stores/user'
import MemberModify from '../components/MemberModify.vue'

export default defineComponent({
  name: 'MemberModifyPage',
  components: {
    MemberModify,
  },
  beforeRouteEnter(to, _from, next) {
    const userStore = useUserStoreWithOut()
    if (userStore.getUserInfo?.id === parseInt(to.params.seq as string)) {
      next({
        path: '/members/my-info/modify',
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
  methods: {
    savedForm() {
      this.$router.push(`/members/${this.seq}`)
    },
  },
})
</script>

<template><member-modify :seq="numSeq" class="channel" @saved="savedForm" /></template>

<route lang="yaml">
meta:
  title: my LAB 맴버 관리
</route>

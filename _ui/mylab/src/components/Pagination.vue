<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    default: 1,
  },
  total: {
    type: Number,
    default: 0,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
})

const emits = defineEmits(['update:currentPage', 'change'])

const totalPage = computed(() => Math.ceil(props.total / props.pageSize))
const hasPrev = computed(() => totalPage.value > 0 && props.currentPage > 1)
const hasNext = computed(() => totalPage.value > 0 && props.currentPage > totalPage.value)
const loopPages = computed(() => (totalPage.value > 10 ? 10 : totalPage.value || 1))

function movePage(page: number) {
  if (page !== props.currentPage) {
    emits('update:currentPage', page)
    emits('change', page)
  }
}
</script>

<template>
  <div class="paging">
    <button v-if="hasPrev" type="button" class="prev" @click="movePage(1)"><span class="hide">이전</span></button>
    <button v-for="n in loopPages" :key="n" type="button" :class="{ active: currentPage === n }" @click="movePage(n)">
      {{ n }}
    </button>
    <button v-if="hasNext" type="button" class="next" @click="movePage(1)"><span class="hide">다음</span></button>
  </div>
</template>

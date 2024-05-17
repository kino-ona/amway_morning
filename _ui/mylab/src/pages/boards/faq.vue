<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { getBoards, getBoardFaqCategories } from '~/apis/board'
import { GetBoardParams, GetBoardRes, boardType } from '~/apis/model/boardModel'
import { usePromise } from '~/hooks/usePromise'
import { unescape } from 'lodash-es'
import { useQuery } from '~/hooks/useQuery'
import { useRouter } from 'vue-router'
import Pagination from '~/components/Pagination.vue'

const { data: categories, callPromiseFn: getCategories } =
  usePromise<typeof getBoardFaqCategories>(getBoardFaqCategories)
const { data, callPromiseFn } = usePromise<typeof getBoards>(getBoards)

await getCategories()

const { query } = useQuery<GetBoardParams>({
  defaultQuery: {
    type: boardType.FAQ,
    category: categories.value?.[0].value ?? '',
    page: 1,
    size: 10,
  },
})
const form = ref<GetBoardParams>(query)
onMounted(async () => {
  await callPromiseFn(form.value)
})
const router = useRouter()
watch(
  () => router.currentRoute.value.query,
  async ({ category, page }) => {
    form.value.category = (category as string) ?? categories.value?.[0].value
    form.value.page = parseInt((page as string) ?? '1')
    await callPromiseFn(form.value)
  }
)

async function movePage(page: number, category: string = form.value.category) {
  router.push({ query: { category, page } })
}

function toggleContents(item: GetBoardRes) {
  item.isActive = !item.isActive
}
</script>

<template>
  <div class="faq">
    <form>
      <fieldset>
        <legend>FAQ</legend>
        <h2 class="h2-title">FAQ</h2>

        <div class="lnb">
          <button
            v-for="item in categories"
            :key="item.value"
            type="button"
            :class="{ active: form.category === item.value }"
            @click="movePage(1, item.value)"
          >
            {{ item.label }}
          </button>
        </div>

        <div class="faqcont">
          <div class="title">
            <span class="num">NO</span>
            <span>제목</span>
          </div>

          <ul class="list">
            <li v-if="data?.totalElements === 0" class="nodata">데이터가 없습니다.</li>
            <li v-for="item in data?.content" v-else :key="item.id" :class="{ active: item.isActive }">
              <button type="button" @click="toggleContents(item)">
                <span class="num">{{ item.no }}</span>
                <p>{{ item.title }}</p>
              </button>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <div class="content" v-html="unescape(item.contents)"></div>
            </li>
          </ul>

          <Pagination
            v-model:currentPage="form.page"
            :page-size="form.size"
            :total="data?.totalElements"
            @change="movePage"
          />
        </div>
      </fieldset>
    </form>
  </div>
</template>

<route lang="yaml">
meta:
  ignoreAuth: true
</route>

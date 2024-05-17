<script lang="ts" setup name="Dashboard">
import type { LabelNValue } from '#/custom'
import { computed, onMounted, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import MemberCard from '~/pages/members/components/MemberCard.vue'
import { GetMemberParams } from '~/apis/model/userModel'
import { getMembers } from '~/apis/user'
import { useQuery } from '~/hooks/useQuery'
import { usePromise } from '~/hooks/usePromise'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const { query } = useQuery<GetMemberParams>({
  defaultQuery: {
    distNo: userStore.getUserInfo?.distNo ?? '',
    sort: 'registered',
  },
})
const searchForm = ref<GetMemberParams>(query)
const { isLoading, data: members, callPromiseFn } = usePromise<typeof getMembers>(getMembers)
const currentSortLabel = computed(() => {
  const sort = searchForm.value.sort
  return sortFilters.value.find(({ value }) => value === sort)?.label
})

const isMaxMembers = computed(() => members.value && members.value.length > 100)

const sortFilters = ref<LabelNValue<string>[]>([
  { label: '등록순', value: 'registered' },
  { label: '이름순', value: 'name' },
  { label: '나이순', value: 'age' },
])
const $sortWrap = ref<HTMLDivElement>()
const isOpenSortSelect = ref<boolean>(false)
function changeSort(value: string) {
  searchForm.value.sort = value
  isOpenSortSelect.value = false
  callPromiseFn(searchForm.value)
}

const isMiniBanner = ref<boolean>(false)
function toggleBanner() {
  isMiniBanner.value = !isMiniBanner.value
}

onMounted(async () => {
  onClickOutside($sortWrap.value, () => {
    isOpenSortSelect.value = false
  })
  const members = await callPromiseFn(searchForm.value)
  isMiniBanner.value = (members?.length ?? 0) > 1
})
</script>

<template>
  <div class="main">
    <!-- main-visual// -->
    <div class="main-visual" :class="{ open: !isMiniBanner }">
      <div class="big">
        <div class="inner">
          <strong>미생물 생태계 균형에서 찾은 <em>나만의 건강</em></strong>
          <p>
            건강의 토대가 되는 몸 속 미생물 생태계, 마이크로바이옴 사람마다 다른 미생물 생태계 균형을 찾기 위해
            뉴트리라이트만의 기술로 집요하고 철저하게 분석하여 당신만의 마이크로바이옴 솔루션을 제안합니다
          </p>
        </div>
      </div>

      <div class="small">
        <div class="inner">
          <strong>미생물 생태계 균형에서 찾은 <em>나만의 건강</em></strong>
        </div>
      </div>

      <button type="button" class="btn-toggle" @click="toggleBanner"><span class="text">자세히보기</span></button>
    </div>
    <!-- //main-visual -->

    <!-- main-member// -->
    <div class="main-member">
      <div class="title-area">
        <h2 class="h2-tit">
          my LAB 멤버<span class="count">({{ members?.length ?? 0 }}명)</span>
        </h2>
        <router-link v-if="members && (members?.length || isMaxMembers)" to="/members/register" class="btn plus">
          멤버추가
        </router-link>

        <!-- listfilter// -->
        <section ref="$sortWrap" class="listfilter">
          <div class="select" :class="{ open: isOpenSortSelect }">
            <!-- 활성화 : open 클래스 추가 -->
            <button type="button" :disabled="isLoading" @click="isOpenSortSelect = !isOpenSortSelect">
              {{ currentSortLabel }}
            </button>
            <ul>
              <li v-for="sort in sortFilters" :key="sort.value" :class="{ active: sort.value === searchForm.sort }">
                <button @click="changeSort(sort.value)">{{ sort.label }}</button>
              </li>
            </ul>
          </div>
        </section>
        <!-- //listfilter -->
      </div>

      <ul class="list-area">
        <!-- 멤버추가 버튼 영역// -->
        <member-card v-for="member in members" :key="member.id" :info="member" />
        <li class="addbox">
          <router-link v-if="!isMaxMembers" to="/members/register" class="btn-add">
            <span>멤버추가</span>
            <p>my LAB 분석을 진행할<br />새로운 멤버(암웨이 비회원 가족/ 지인)를 추가하세요</p>
          </router-link>
        </li>
        <!-- //멤버추가 버튼 영역 -->
      </ul>
    </div>
    <!-- //main-member -->
  </div>
</template>

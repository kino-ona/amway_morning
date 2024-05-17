<script lang="ts" setup>
import { ref, watch, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useAppStore } from '~/stores/app'
import { PageEnum } from '~/routers/pageEnum'
import { useRoute } from 'vue-router'
import { RoleEnum } from '~/apis/model/userModel'

const appStore = useAppStore()

let isOpenLogo = ref(false)
function toggleLogo() {
  isOpenLogo.value = !isOpenLogo.value
}

let $logo = ref(null)
onClickOutside($logo, () => {
  isOpenLogo.value = false
})

function toggleAsideOpen() {
  appStore.toggleASideOpen()
}

const route = useRoute()
watch(
  () => route.fullPath,
  () => {
    appStore.setAsideSideOpen(false)
  }
)
const hybrisUrl = import.meta.env.VITE_HYBRIS_DOMAIN_URL?.replace('api.', '')
const title = computed(() => route.meta.title)
</script>

<template>
  <!-- 메인 헤더// -->
  <div class="inner">
    <template v-if="title">
      <div class="mobile">
        <h1 class="h1-title">my LAB by NUTRILITE</h1>
        <h2 class="h2-title">{{ title }}</h2>
        <button type="button" class="btn-prev" @click.prevent="$router.back()">이전</button>
        <button type="button" class="btn-home" @click.prevent="$router.push(PageEnum.ROOT_PATH)">홈</button>
        <button type="button" class="btn-menu" @click.prevent="toggleAsideOpen">메뉴</button>
      </div>

      <div class="pc">
        <div ref="$logo" class="logo-list" :class="{ open: isOpenLogo }">
          <ul>
            <li class="mylab">
              <h1>
                <router-link :to="PageEnum.ROOT_PATH"><span class="hide">my LAB by NUTRILITE</span></router-link>
              </h1>
            </li>
            <li v-auth="[RoleEnum.MAIN, RoleEnum.SUB, RoleEnum.MEMBER, RoleEnum.CUSTOMER]" class="amway">
              <a :href="hybrisUrl" target="_blank" title="새창으로 열림"><span class="hide">Amway</span></a>
            </li>
          </ul>
          <button
            v-auth="[RoleEnum.MAIN, RoleEnum.SUB, RoleEnum.MEMBER, RoleEnum.CUSTOMER]"
            type="button"
            class="btn-open"
            @click="toggleLogo"
          >
            열기/닫기
          </button>
        </div>
        <button type="button" class="btn-menu" @click="toggleAsideOpen">메뉴</button>
      </div>
    </template>
    <div ref="$logo" class="logo-list" :class="{ open: isOpenLogo }">
      <ul>
        <li class="mylab">
          <h1>
            <router-link :to="PageEnum.ROOT_PATH"><span class="hide">my LAB by NUTRILITE</span></router-link>
          </h1>
        </li>
        <li v-auth="[RoleEnum.MAIN, RoleEnum.SUB, RoleEnum.MEMBER, RoleEnum.CUSTOMER]" class="amway">
          <a :href="hybrisUrl" target="_blank" title="새창으로 열림"><span class="hide">Amway</span></a>
        </li>
      </ul>
      <button
        v-auth="[RoleEnum.MAIN, RoleEnum.SUB, RoleEnum.MEMBER, RoleEnum.CUSTOMER]"
        type="button"
        class="btn-open"
        @click="toggleLogo"
      >
        열기/닫기
      </button>
    </div>
    <button type="button" class="btn-menu" @click="toggleAsideOpen">메뉴</button>
  </div>
  <!-- //메인 헤더 -->
</template>

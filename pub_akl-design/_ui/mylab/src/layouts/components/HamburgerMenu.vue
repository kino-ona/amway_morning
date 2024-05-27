<script lang="ts" setup>
import { computed, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useAppStore } from '~/stores/app'
import { useUserStore } from '~/stores/user'
import { GetUserMyInfoRes } from '~/apis/model/userModel'
import { useMember } from '~/pages/members/components/useMember'
import { PageEnum } from '~/routers/pageEnum'
import { RoleEnum } from '~/apis/model/userModel'

const userStore = useUserStore()
const userInfo = computed<GetUserMyInfoRes | null>(() => {
  return userStore.getUserInfo
})
const isLogin = computed(() => !!userInfo.value)

const { classNames, profileImage } = useMember(userInfo.value)
const profileLink = computed(() => (isLogin.value ? PageEnum.PARTNER_ROOT : PageEnum.ROOT_PATH))

const appStore = useAppStore()

const isAsideOpen = computed(() => {
  return appStore.isAsideOpen
})
let $hamburgerMenu = ref<HTMLDivElement>()
onClickOutside($hamburgerMenu, () => {
  appStore.setAsideSideOpen(false)
})
</script>

<template>
  <aside class="sidemenu" :class="{ 'aside-open': isAsideOpen }">
    <div ref="$hamburgerMenu" class="sidemenu-inner">
      <div class="sidemenu-header">
        <button type="button" class="btn-close" @click="appStore.setAsideSideOpen(false)">닫기</button>
      </div>
      <div class="sidemenu-userinfo">
        <div class="user">
          <p class="img">
            <span v-if="isLogin" :class="classNames">
              <router-link :to="profileLink">
                <img :src="profileImage" loading="lazy" alt="profile" />
                <!-- 2022.06.20 -->
                <span class="edit-mark">
                  <span class="hide">edit profile</span>
                </span>
                <!-- 2022.06.20 -->
              </router-link>
            </span>
          </p>
          <h2>
            <template v-if="isLogin">
              <span>{{ userInfo?.username }}</span>
              <p>님 환영합니다.</p>
            </template>

            <router-link v-else :to="PageEnum.LOGIN"><p>로그인 해주세요</p></router-link>
          </h2>
        </div>
      </div>

      <div class="sidemenu-gnb">
        <ul>
          <li class="item1"><router-link to="/intro/solution">솔루션 소개</router-link></li>
          <li class="item2"><router-link to="/intro/product">제품 소개</router-link></li>
          <li class="item3"><router-link to="/intro/service">서비스 이용안내</router-link></li>
          <li class="item4"><router-link to="/intro/fecal">채변 가이드</router-link></li>
          <li v-auth="[RoleEnum.MAIN, RoleEnum.SUB, RoleEnum.MEMBER, RoleEnum.CUSTOMER]" class="item5">
            <router-link to="/members/my-info/orders">키트 구매목록</router-link>
          </li>
          <li class="item6"><router-link to="/boards/faq">FAQ</router-link></li>
        </ul>
      </div>

      <div class="sidemenu-bottom">
        <ul class="customer">
          <li>
            한국 암웨이 고객센터
            <strong><a href="tel:1588-0080">1588-0080</a></strong>
            <em>※ 서비스 이용에 대한 문의</em>
            <a href="tel:1588-0080" class="tel"><span class="hide">전화걸기</span></a>
          </li>
          <li>
            HEM Pharma 고객센터
            <strong><a href="tel:070-4490-9404">070-4490-9404</a></strong>
            <em>※ 결과 레포트 관련 문의</em>
            <a href="tel:070-4490-9404" class="tel"><span class="hide">전화걸기</span></a>
          </li>
        </ul>
        <div class="btn-wrap">
          <button class="btn" @click="userStore.logout()">로그아웃</button
          ><!-- 2022-04-20 버튼 클래스 추가 -->
        </div>
        <!-- 2022-05-12 div.btn-wrap 추가 및 button 클래스 삭제 -->
      </div>
    </div>
  </aside>
</template>

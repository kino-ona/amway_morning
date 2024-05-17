<script lang="ts" setup>
import HamburgerMenu from './components/HamburgerMenu.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const title = computed(() => route.meta.title)
</script>

<template>
  <div class="body">
    <header class="header" :class="[!!title ? 'type-sub' : 'type-main']">
      <!-- Main header -->
      <Header />
    </header>

    <hamburger-menu />
    <main class="container">
      <!-- 스크롤 시 go2Top 버튼 IntersectionObserver 용으로 추가 -->
      <div id="scroll-observe" />
      <router-view v-slot="{ Component }">
        <Suspense>
          <component :is="Component" />
        </Suspense>
      </router-view>
    </main>

    <Footer />
  </div>
</template>

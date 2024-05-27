<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

let isShowTopButton = ref(false)
let observer = ref<IntersectionObserver | undefined>(undefined)

onMounted(() => {
  const obs = new IntersectionObserver(([entry]) => {
    isShowTopButton.value = !entry.intersectionRatio
  })

  obs.observe(document.querySelector('#scroll-observe')!)

  observer.value = obs
})

onBeforeUnmount(() => {
  observer.value?.disconnect()
})

function go2Top() {
  document.body.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <footer class="footer">
    <div class="inner">
      <div class="info">
        <router-link to="/terms/service">이용약관</router-link>
        <router-link to="/terms/privacy" class="bold">개인정보처리방침</router-link>
      </div>
      <p class="etc">
        <span>
          한국암웨이(주) 서울특별시 강남구 영동대로 517 27층 (삼성동, 아셈타워) (대표이사 : 배수정, 아샤 굽타)<br />
          사업자 등록번호 : 120-81-03391
        </span>
        <span>고객센터/기술지원센터 : <a href="tel:1588-0080">1588-0080</a></span>
        <span class="copyright"> ALL CONTENT Copyright <em>© 2022 Amway Korea LTD. ALL RIGHTS RESERVED.</em> </span>
      </p>
      <span class="amway"><span class="hide">Amway</span></span>
    </div>
  </footer>
  <div v-show="isShowTopButton" class="scrolltop">
    <button type="button" class="btn-top" @click="go2Top"><span class="hide">TOP(위로이동)</span></button>
  </div>
</template>

<template>
  <div class="introfecal">
    <div class="content">
      <h1>채변 가이드</h1>
      <h2>마이크로바이옴 테스트 키트 구성품</h2>

      <!-- 2022-04-20 swiper 이미지 변경 -->
      <!-- swiper// -->
      <div class="swiper-area">
        <swiper
          :space-between="30"
          :centered-slides="true"
          :autoplay="{
            delay: 2500,
            disableOnInteraction: false,
          }"
          :pagination="{
            clickable: true,
          }"
          :navigation="true"
          :modules="modules"
        >
          <swiper-slide><img src="/resource/images/views/testkit_img01.jpg" alt="" /></swiper-slide>
          <swiper-slide><img src="/resource/images/views/testkit_img02.jpg" alt="" /></swiper-slide>
          <swiper-slide><img src="/resource/images/views/testkit_img03.jpg" alt="" /></swiper-slide>
          <swiper-slide><img src="/resource/images/views/testkit_img04.jpg" alt="" /></swiper-slide>
          <swiper-slide><img src="/resource/images/views/testkit_img05.jpg" alt="" /></swiper-slide>
          <swiper-slide><img src="/resource/images/views/testkit_img06.jpg" alt="" /></swiper-slide>
        </swiper>
      </div>
      <!-- //swiper -->
    </div>

    <div class="content">
      <h2>마이크로바이옴 테스트 키트 사용법</h2>
      <!-- 비디오영역// -->
      <video-player account-id="5588818578001" video-id="6300577552001" player-id="f7xGMoRdK" />
      <!-- //비디오영역 -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import VideoPlayer from '~/components/VideoPlayer.vue'

const modules = [Autoplay, Pagination, Navigation]
</script>

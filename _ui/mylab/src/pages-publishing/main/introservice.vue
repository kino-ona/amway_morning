<template>
  <div class="introservice">
    <div class="visual">
      <div class="inner">
        <h1>서비스 이용안내</h1>

        <div class="process">
          <ul>
            <li>
              <span class="img"><img src="/resource/images/views/service_process01.svg" alt="" /></span>
              <p>
                <span class="num-process blue">01</span>
                마이랩 마이크로바이옴 테스트 키트 구매
              </p>
            </li>
            <li class="item02">
              <span class="img"><img src="/resource/images/views/service_process02.svg" alt="" /></span>
              <p>
                <span class="num-process red">02</span>
                키트 등록<br />
                건강 설문 <br />
                수거 신청
              </p>
            </li>
            <li class="item03">
              <span class="img"><img src="/resource/images/views/service_process03.svg" alt="" /></span>
              <p>
                <span class="num-process red">03</span>
                채변<br />키트 수거
              </p>
            </li>
            <li class="item04">
              <span class="img"><img src="/resource/images/views/service_process04.svg" alt="" /></span>
              <p>
                <span class="num-process red">04</span>
                분석<br />레포트 수령
              </p>
            </li>
            <li>
              <span class="img"><img src="/resource/images/views/service_process05.svg" alt="" /></span>
              <p>
                <span class="num-process yellow">05</span>
                맞춤형 프로바이오틱스 섭취<br />식&생활습관 가이드 준수
              </p>
            </li>
            <li>
              <span class="img"><img src="/resource/images/views/service_process06.svg" alt="" /></span>
              <p>
                <span class="num-process green">06</span>
                재 테스트 (6개월마다 권장)
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="content">
      <h2>서비스 이용하기</h2>

      <!-- 2022-04-12 swiper 이미지 변경 -->
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
          @swiper="onSwiper"
          @slide-change="onSlideChange"
        >
          <swiper-slide
            ><img
              src="/resource/images/views/service_use_img01.jpg"
              alt="미생물 생태계 균형에서 찾은 나만의 건강 마이랩 마이크로바이옴 솔루션 이용방법"
          /></swiper-slide>
          <swiper-slide
            ><img src="/resource/images/views/service_use_img02.jpg" alt="STEP 1 테스트 키트 구매"
          /></swiper-slide>
          <swiper-slide><img src="/resource/images/views/service_use_img03.jpg" alt="STEP 2 키트 등록" /></swiper-slide>
          <swiper-slide
            ><img src="/resource/images/views/service_use_img04.jpg" alt="STEP 2 건강설문, 수거 신청"
          /></swiper-slide>
          <swiper-slide
            ><img src="/resource/images/views/service_use_img05.jpg" alt="STEP 3 채변 & 키트 수거"
          /></swiper-slide>
          <swiper-slide
            ><img src="/resource/images/views/service_use_img06.jpg" alt="STEP 4 분석 & 레포트 수령"
          /></swiper-slide>
          <swiper-slide
            ><img src="/resource/images/views/service_use_img07.jpg" alt="STEP 5 맞춤형 프로바이오틱스 섭취 & 재테스트"
          /></swiper-slide>
        </swiper>
      </div>
      <!-- //swiper -->
    </div>

    <div class="content">
      <h2>서비스 초대하기</h2>

      <!-- 2022-04-12 swiper 이미지 변경 -->
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
          @swiper="onSwiper"
          @slide-change="onSlideChange"
        >
          <swiper-slide
            ><img
              src="/resource/images/views/service_invite_img01.jpg"
              alt="Amway 비회원 마이크로바이옴 솔루션 초대 방법"
          /></swiper-slide>
          <swiper-slide
            ><img src="/resource/images/views/service_invite_img02.jpg" alt="STEP 1 my LAB 멤버 등록"
          /></swiper-slide>
          <swiper-slide
            ><img src="/resource/images/views/service_invite_img03.jpg" alt="STEP 2 my LAB 멤버 초대"
          /></swiper-slide>
          <swiper-slide
            ><img src="/resource/images/views/service_invite_img04.jpg" alt="STEP 3 my LAB 멤버 관리"
          /></swiper-slide>
        </swiper>
      </div>
      <!-- //swiper -->
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export default {
  name: 'Introservice',
  components: {
    Swiper,
    SwiperSlide,
  },
  data: function () {
    return {
      modules: [Autoplay, Pagination, Navigation],
    }
  },
  mounted() {
    // page start !!
    sessionStorage.clear()
  },
  methods: {
    onSwiper(swiper) {
      console.log(swiper)
    },
    onSlideChange() {
      console.log('slide change')
    },
  },
}
</script>

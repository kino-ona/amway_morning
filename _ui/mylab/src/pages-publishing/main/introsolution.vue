<template>
  <div class="introsolution">
    <div class="visual">
      <div class="inner">
        <h1>솔루션 소개</h1>
        <h2>
          미생물 생태계 균형에서 찾은 <em><span class="hide">나만의 건강</span></em>
        </h2>
        <div class="text">
          <p>
            우리 몸의 또 하나의 주인, 39조개의 미생물들은 “마이크로바이옴”이라고 불리는 생태계를 형성하며 우리 건강의
            토대를 이루고 있습니다.
          </p>
          <p>마이랩 바이 뉴트리라이트(my LAB by Nutrilite)의 마이크로바이옴 솔루션(Microbiome Solution)은</p>
          <p>
            사람마다 다른 마이크로바이옴 상태를 집요하고 철저하게 분석하여 한 사람 한 사람을 위한 균형 잡힌 건강을
            설계합니다.
          </p>
        </div>

        <div class="colbox">
          <div class="summary-area">
            <div class="summary item01">
              <span class="img"><img src="/resource/images/views/solution_item01.svg" alt="" /></span>
              <div class="cont">
                <!-- 2022-04-06 문구수정 -->
                <strong class="head">국내 유일 PMAS 특허 기술을 활용한 듀얼 장 건강 분석*</strong>
                <ul class="data">
                  <li>마이크로바이옴 분석으로 미생물 다양성과 분포 확인</li>
                  <li>포스트바이오틱스 분석으로 미생물 대사물질까지 체크</li>
                </ul>
              </div>
            </div>

            <div class="summary item02">
              <span class="img"><img src="/resource/images/views/solution_item02.svg" alt="" /></span>
              <div class="cont">
                <strong class="head">6가지 맞춤형 솔루션</strong>
                <ul class="data">
                  <li>PMAS 특허기술로 맞춤형 프로바이오틱스 추천</li>
                  <li>맞춤 식습관, 생활습관 가이드 제안</li>
                </ul>
              </div>
            </div>

            <div class="summary item03">
              <span class="img"><img src="/resource/images/views/solution_item03.svg" alt="" /></span>
              <div class="cont">
                <strong class="head">지속적인 관리</strong>
                <ul class="data">
                  <li>6개월 단위 모니터링으로 마이크로바이옴 밸런스 지속 관리</li>
                </ul>
              </div>
            </div>

            <div class="patent-desc">
              <!-- 2022-04-06 문구추가 -->
              *마이크로바이옴 전문 기업 HEM Pharma사의 PMAS 특허 기술(특허등 록번호 10-2124474,10-2227382)로 개인의 장
              환경 복제 후 미생물과 대사체를 동시에 분석하는 기술 (2022년 5월 기준)
            </div>
          </div>

          <!-- 비디오영역// -->
          <div class="video-area"></div>
          <!-- //비디오영역 -->
        </div>

        <div class="logo">
          <img src="/resource/images/common/logo_fullname.svg" alt="" />
        </div>
      </div>
    </div>

    <div class="content">
      <h2>더 자세히 알아보고 싶다면?</h2>

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
              src="/resource/images/views/why_mylab_img01.jpg"
              alt="미생물 균형에서 찾은 나만의 건강 마이랩 바이 뉴트리라이트 마이크로바이옴 솔루션"
          /></swiper-slide>
          <swiper-slide
            ><img
              src="/resource/images/views/why_mylab_img02.jpg"
              alt="Key Point 1 마이크로바이옴과 포스트바이오틱스를 동시에 국내 유일 PMAS 특허 기술을 활용한 듀얼 장 건강 분석"
          /></swiper-slide>
          <swiper-slide
            ><img
              src="/resource/images/views/why_mylab_img03.jpg"
              alt="Key Point 2 나에게 딱 맞는 프로바이오틱스를 찾아내는 PMAS 특허 기술과 맞춤형 솔루션"
          /></swiper-slide>
          <swiper-slide
            ><img
              src="/resource/images/views/why_mylab_img04.jpg"
              alt="PMAS 특허 기술은 채취한 변을 통해 사랑의 장 환경을 복제하고 다양한 프로바이오틱스를 적용하여 최적의 효과를 나타내는 맞춤형 프로바이오틱스를 찾아냅니다."
          /></swiper-slide>
          <swiper-slide
            ><img
              src="/resource/images/views/why_mylab_img05.jpg"
              alt="Key Point 3 건강하고 지속가능한 나만의 마이크로바이옴 관리 플랫폼"
          /></swiper-slide>
          <swiper-slide
            ><img
              src="/resource/images/views/why_mylab_img06.jpg"
              alt="마이크로바이옴의 선두기업, HEM Pharama 과학자들이 함께합니다"
          /></swiper-slide>
        </swiper>
      </div>
      <!-- //swiper -->
    </div>

    <div class="content">
      <h2>이런 분들께 추천합니다.</h2>
      <ul class="icon-list">
        <li class="item01">
          <p>나의 장 내 미생물<br />환경이 궁금하신분</p>
        </li>
        <li class="item02">
          <p>평소 장 건강을<br />개선하고 싶으신 분</p>
        </li>
        <li class="item03">
          <p>나에게 맞는 프로바이오틱스<br />섭취가 필요하신 분</p>
        </li>
        <li class="item04">
          <p>지속적으로 장내 환경을<br />관리하고 싶으신 분</p>
        </li>
        <li class="item05">
          <p>배변 건강 관리가<br />필요하신 분</p>
        </li>
        <li class="item06">
          <p>유익한 대사물질의 균형 유지와 관리를 하고 싶으신 분</p>
        </li>
        <li class="item07">
          <p>맞춤 식·생활습관을 통해<br />건강 관리를 하고싶으신 분</p>
        </li>
      </ul>
    </div>

    <div class="content">
      <h2>
        <span class="color-blue">마이크로바이옴 솔루션</span>을<br />
        먼저 체험해보신 분들의 <span class="color-blue">“리얼”</span>후기
      </h2>
      <ul class="speech-bubble">
        <li class="left">
          <img src="/resource/images/views/solution_speech01.svg" alt="" />
          <div class="cont">
            <blockquote>
              "테스트 키트가 세심하게 구성 되어 있어서 집에서 편하게 채변 하고 결과 레포트까지 받아볼 수 있어서
              좋았습니다!”
            </blockquote>
            <p>&lt;파일럿 참가자 ABO리더님(50대)&gt;</p>
          </div>
        </li>
        <li class="right">
          <div class="cont">
            <blockquote>
              "맞춤형 프로바이오틱스 섭취 후 재테스트를 통해 나의 마이크로바 이옴 상태 변화를 확인할 수 있어 서 신기하고
              유익했습니다”
            </blockquote>
            <p>&lt;파일럿 참가자 ABO리더님(30대)&gt;</p>
          </div>
          <img src="/resource/images/views/solution_speech02.svg" alt="" />
        </li>
        <li class="left">
          <img src="/resource/images/views/solution_speech03.svg" alt="" />
          <div class="cont">
            <blockquote>
              "결과 레포트를 받고 분석 프로세 스와 마이크로바이옴에 대해 쉽 게 이해할 수 있어서 좋았어요.”
            </blockquote>
            <p>&lt;파일럿 참가자 ABO리더님(40대)&gt;</p>
          </div>
        </li>
      </ul>
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
  name: 'Introsolution',
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

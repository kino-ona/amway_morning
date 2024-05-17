<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { PageEnum } from '~/routers/pageEnum'
import VideoPlayer from '~/components/VideoPlayer.vue'

const route = useRoute()
const redirectUrl = computed<string>(() => route.query.redirect as string)
const hybrisLoginUrl = computed<string>(
  () =>
    import.meta.env.VITE_HYBRIS_DOMAIN_URL.replace('api.', '') +
    '/login' +
    (redirectUrl.value ? `?redirect=${window.location.origin}${redirectUrl.value}` : '')
)
</script>

<template>
  <div class="intro">
    <div class="visual">
      <div class="logo">
        <img src="/resource/images/common/logo_fullname.svg" alt="" />
      </div>

      <div class="text">
        <h1>미생물 생태계 균형에서 찾은 <em>나만의 건강</em></h1>
      </div>

      <div class="btn-area">
        <a :href="hybrisLoginUrl" class="btn full xlarge blue">
          Amway 회원 로그인
          <span>(ABO, Member, Customer)</span>
        </a>
        <router-link :to="PageEnum.PARTNER_LOGIN" class="btn full xlarge">my LAB 로그인*</router-link>
      </div>
      <div class="guideinfo">
        <ul>
          <li>* my LAB에 초대 받으신 Amway 비회원 분들이 이용 가능합니다.</li>
        </ul>
      </div>
    </div>

    <div class="img">
      <!-- 2022-04-06 이미지 alt값 수정 -->
      <div class="mobile">
        <img
          src="/resource/images/views/introvisual_mobile.png"
          alt="국내 유일 PMAS 특허 기술을 활용한 듀얼 장 건강 분석* Dual Gut Analysis, 6가지 맞춤형 솔루션 Personallzed Solutions, 지속적인 관리 Sustainable Management"
        />
      </div>
      <div class="pc">
        <img
          src="/resource/images/views/introvisual_pc.png"
          alt="국내 유일 PMAS 특허 기술을 활용한 듀얼 장 건강 분석* Dual Gut Analysis, 6가지 맞춤형 솔루션 Personallzed Solutions, 지속적인 관리 Sustainable Management"
        />
      </div>
    </div>

    <div class="patent-desc">
      <!-- 2022-04-06 문구추가 -->
      *마이크로바이옴 전문 기업 HEM Pharma사의 PMAS 특허 기술(특허등록번호 10-2124474,10-2227382)로 개인의 장 환경 복제
      후 미생물과 대사체를 동시에 분석하는 기술 (2022년 5월 기준)
    </div>

    <!-- 비디오영역// -->
    <video-player account-id="5588818578001" video-id="6305143026001" player-id="f7xGMoRdK" />
    <!-- //비디오영역 -->
  </div>
</template>

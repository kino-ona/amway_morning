<script lang="ts" setup>
import type { LabelNValue } from '#/custom'
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import Tab from '~/components/Tab.vue'
import { useQuery } from '~/hooks/useQuery'
import pkg from '../../../package.json'

const tabs = reactive<LabelNValue<string>[]>([
  { label: '테스트 키트', value: 'test' },
  { label: '맞춤형 프로바이오틱스', value: 'custom' },
])

const {
  query: { tab },
} = useQuery({
  defaultQuery: {
    tab: 'test',
  },
})

const router = useRouter()
const currentTab = ref(tab)
function changeTab(val: string) {
  router.replace({ query: { tab: val } })
}

const hybrisUrl = import.meta.env.VITE_HYBRIS_DOMAIN_URL.replace('api.', '')

const testKitURL = computed(() => `${hybrisUrl}/shop/nutrition/basic/mylab-microbiome/p/305507K`)

function buyProduct() {
  // TODO: 6월 23일 배포 시 package.json 버전 업데이트
  if (pkg.version === '1.0.0') {
    window.alert(
      '마이랩 마이크로바이옴 프로바이오틱스 제품 6종은\n2022년 7월부터 한국 암웨이 홈페이지에서 구매하실 수 있습니다.'
    )
  } else {
    window.location.href = `${hybrisUrl}/shop/nutrition/basic/mylab-microbiome/c/mylab-microbiome`
  }
}
</script>

<template>
  <div class="introproduct">
    <h1>제품 소개</h1>

    <Tab v-model="currentTab" :items="tabs" @change="changeTab">
      <template #tab-item-test>
        <div class="visual">
          <div class="inner">
            <strong>마이랩 마이크로바이옴 테스트 키트</strong>
            <p class="desc">
              집에서 편리하게 나의 장내 마이크로바이옴 상태를 분석하고 나에게 맞는 맞춤형 프로바이오틱스와 식생활, 생활
              습관 가이드를 확인해보세요.
            </p>
            <span class="img">
              <img src="/resource/images/views/product_img01.png" alt="" />
            </span>
            <div class="btn-area">
              <a :href="testKitURL" class="btn full xlarge blue">구매하기</a>
            </div>
          </div>
        </div>

        <div class="content">
          <div class="inner">
            <h2>
              <em class="green"><span class="hide">01</span></em> 국내 유일 PMAS 특허 기술을 활용한 듀얼 장 건강 분석*
              으로 꼼꼼하게
            </h2>
            <div class="inspection">
              <div class="green">
                <strong class="head">마이크로바이옴 분석 NGS 검사</strong>
                <ul class="data">
                  <li>· 마이크로바이옴 다양성</li>
                  <li>· 장내 유익균과 장내 유해균</li>
                  <li>· 건강과 관련된 미생물 지수</li>
                </ul>
              </div>
              <div class="blue">
                <strong class="head">포스트바이오틱스 분석 LC-RID 검사</strong>
                <ul class="data">
                  <li>· 포스트바이오틱스(단쇄지방산) 균형지수</li>
                  <li>· 맞춤형 프로바이오틱스 도출</li>
                </ul>
              </div>
            </div>
            <div class="patent-desc">
              *마이크로바이옴 전문 기업 HEM Pharma사의 PMAS 특허 기술(특허등록번호 10-2124474,10-2227382)로 개인의 장
              환경 복제 후 미생물과 대사체를 동시에 분석하는 기술 (2022년 5월 기준)
            </div>
          </div>
        </div>

        <div class="content">
          <div class="inner">
            <h2>
              <em class="blue"><span class="hide">02</span></em> 나의 마이크로바이옴 & 포스트바이오틱스 상태를 한 눈에!
            </h2>
            <ul class="checklist">
              <li><span>포스트바이오틱스 균형</span></li>
              <li><span>마이크로바이옴 다양성</span></li>
              <li><span>장내 유익균 / 유해균</span></li>
              <li><span>건강 관련 장내 미생물</span></li>
              <li><span>PMAS 유형</span></li>
              <li><span>맞춤 식습관 & 생활습관 가이드</span></li>
            </ul>
          </div>
        </div>

        <div class="content">
          <div class="inner">
            <h2>
              <em class="purple"><span class="hide">03</span></em> 나에게 딱! 맞는 솔루션으로 효과적으로 관리
            </h2>
            <div class="productmanage">
              <div class="item01">
                <strong>맞춤형<br />프로바이오틱스</strong>
                <p>PMAS 특허기술을 통해 맞춤형 프로바이오틱스 선별</p>
              </div>
              <div class="item02">
                <strong>맞춤 식습관 &amp;<br />생활습관 가이드</strong>
                <p>지속적인 장 건강 관리를 위한<br />맞춤형 가이드 제공</p>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #tab-item-custom>
        <div class="visual">
          <div class="inner">
            <strong>마이랩 마이크로바이옴 1~6 프로바이오틱스</strong>
            <p class="desc">
              프로바이오틱스, 이제 나에게 맞는 제품으로 섭취하세요!
              <!-- <br />나의 마이크로바이옴 &amp; 포스트바이오틱스
              밸런스에 최적화 된 맞춤형 프로바이오틱스 6종 -->
            </p>
            <ul class="itemlist">
              <li>
                <img src="/resource/images/views/product_item01.svg" alt="" />
              </li>
              <li>
                <img src="/resource/images/views/product_item02.svg" alt="" />
              </li>
              <li>
                <img src="/resource/images/views/product_item03.svg" alt="" />
              </li>
              <li>
                <img src="/resource/images/views/product_item04.svg" alt="" />
              </li>
              <li>
                <img src="/resource/images/views/product_item05.svg" alt="" />
              </li>
              <li>
                <img src="/resource/images/views/product_item06.svg" alt="" />
              </li>
            </ul>
            <div class="btn-area">
              <button class="btn full xlarge blue" @click="buyProduct">구매하기</button>
            </div>
          </div>
        </div>
      </template>
    </Tab>
  </div>
</template>

<route lang="yaml">
meta:
  ignoreAuth: true
</route>

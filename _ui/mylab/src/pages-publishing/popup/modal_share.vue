<template>
  <div>
    <!-- modal : 모달 -->
    <app-modal v-model:visible="isOpen" title="샘플 모달">
      <div class="modal">
        <div class="modal-mask"></div>
        <div class="modal-dialog">
          <div class="modal-header">
            <h1 class="hide">공유하기</h1>
            <button type="button" class="modal-header-close" @click="openPop">
              <span class="hide">닫기</span>
            </button>
          </div>

          <div class="modal-body">
            <!-- modal-share : 공유하기 팝업// -->
            <div class="modal-share">
              <ul class="link">
                <li class="kakao"><button type="button">카카오톡</button></li>
                <li class="sms"><button type="button">SMS전송</button></li>
                <li class="url"><button type="button">URL 복사</button></li>
              </ul>

              <div class="guideinfo">
                <ul>
                  <!-- 2022-04-12 색상 클래스 추가 -->
                  <li>
                    * 초대 링크 전송 후, my LAB 멤버가 키트 등 록 시 필요한 본인의
                    <span class="color-black">ABO번호</span>와 <span class="color-black">키트 주문번호</span>를 꼭
                    전달해주세요.
                  </li>
                  <li>* 주문번호는 키트 구매목록에서 복사하여 전달 하실 수 있습니다.</li>
                </ul>
              </div>
            </div>
            <!-- //modal-share : 공유하기 팝업 -->
          </div>
        </div>
      </div>
    </app-modal>
    <!--// modal : 모달 -->
  </div>
</template>

<script>
export default {
  name: 'Modalshare',
  data: function () {
    return {}
  },
  mounted() {
    // page start !!
    this.AAA()
  },
  methods: {
    AAA() {
      console.log('aaaa')
    },
  },
}
</script>

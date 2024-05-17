<template>
  <div>
    <!-- modal : 모달 -->
    <app-modal v-model:visible="isOpen" title="샘플 모달">
      <div class="modal">
        <div class="modal-mask"></div>
        <div class="modal-dialog">
          <div class="modal-header">
            <h1 class="hide">휴대폰인증 팝업</h1>
            <button type="button" class="modal-header-close" @click="openPop">
              <span class="hide">닫기</span>
            </button>
          </div>

          <div class="modal-body">
            <!-- modal-certify : 휴대폰인증 팝업// -->
            <div class="modal-certify">
              <div class="guideinfo">
                <ul>
                  <li>* 주/부사업자의 경우 본인인증 후 수정 및 삭제가 가능합니다.</li>
                </ul>
              </div>

              <div class="formbox">
                <dl class="name">
                  <dt><label for="username">이름</label></dt>
                  <dd><input id="username" type="text" /></dd>
                </dl>
                <dl class="tel">
                  <dt><label for="usertel">휴대폰</label></dt>
                  <dd>
                    <div class="flexbox">
                      <div id="usertel" class="selectbox">
                        <select>
                          <option>선택</option>
                          <option>010</option>
                        </select>
                      </div>
                      <input type="text" />
                      <span class="hyppen">-</span>
                      <input type="text" />
                    </div>
                    <div class="verification">
                      <input type="text" placeholder="인증번호 입력" />
                      <span class="time">04:48</span>
                    </div>
                    <!-- 휴대폰 인증 버튼 : 프로세스에 맞게 버튼 보이게 해주세요.// -->
                    <div class="transparent">
                      <button type="button" class="btn full large blue">인증번호 전송</button>
                    </div>
                    <!-- 
                    <div class="transparent">
                      <button type="button" class="btn large blue btn-verify">인증하기</button>
                      <button type="button" class="btn large btn-resend">재전송</button>
                    </div>
                    <div class="transparent">
                      <button type="button" class="btn full large" disabled>인증완료</button>
                    </div>
                    -->
                    <!-- //휴대폰 인증 버튼 -->
                  </dd>
                </dl>
              </div>
            </div>
            <!-- //modal-certify : 휴대폰인증 팝업 -->
          </div>
        </div>
      </div>
    </app-modal>
    <!--// modal : 모달 -->
  </div>
</template>

<script>
export default {
  name: 'Modalconfirm',
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

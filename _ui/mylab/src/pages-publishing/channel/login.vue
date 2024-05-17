<template>
  <div class="channel login">
    <!-- 멤버 채널페이지는 channel 클래스를 별도로 꼭 넣어주세요 -->
    <form>
      <fieldset>
        <legend>my LAB 멤버 로그인</legend>
        <h2 class="h2-title">my LAB 멤버 로그인</h2>

        <div class="title-summary">
          <p>서비스 이용을 위해 본인인증을 통해 my LAB 멤버 로그인을 진행해주세요.</p>
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

        <!-- 휴대폰 인증 완료 시, 로그인 버튼 노출// -->
        <div class="bottom-btns">
          <a href="javascript:;" class="btn full xlarge blue">로그인</a>
        </div>
        <!-- //휴대폰 인증 완료 시, 로그인 버튼 노출 -->
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: function () {
    return {}
  },
  mounted() {
    // page start
    sessionStorage.clear()
  },
  methods: {},
}
</script>

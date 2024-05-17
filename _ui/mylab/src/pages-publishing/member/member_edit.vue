<template>
  <div class="member-edit">
    <form>
      <fieldset>
        <legend>my LAB 멤버 관리</legend>
        <h2 class="h2-title">my LAB 멤버 관리</h2>

        <div class="formbox">
          <!-- member-info// -->
          <div class="member-info">
            <div class="img primary">
              <!-- 주사업자일 경우 : '.img'에 primary 클래스 추가
                    부사업자일 경우 : '.img'에 sub 클래스 추가
              -->
              <img src="/resource/images/common/member_woman_adult.svg" alt="" />
            </div>
            <div class="user">
              <span class="label primary">주</span
              ><!-- 주사업자일 경우 -->
              <!-- <span class="label sub">부</span> --><!-- 부사업자일 경우 -->
              <strong>송지효</strong>
              <span>(여)</span>
            </div>
          </div>
          <!-- //member-info -->

          <dl class="type-row">
            <dt>생년월일</dt>
            <dd><p>1981/8/15</p></dd>
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
          <dl class="email">
            <dt><label for="useremail">이메일</label></dt>
            <dd>
              <input id="useremail" type="email" />

              <!-- <div class="emailbox">
                <span class="hyppen">@</span>
                <div class="selectbox">
                  <select>
                    <option>이메일 선택</option>
                    <option>gmail.com</option>
                    <option>naver.com</option>
                  </select>
                </div>
              </div> -->
            </dd>
          </dl>
          <dl class="address">
            <dt>주소</dt>
            <dd>
              <button type="button" class="btn">주소검색</button>
              <input type="text" readonly />
              <input type="text" />
            </dd>
          </dl>
        </div>

        <div class="guideinfo">
          <ul>
            <li>※ 이름, 생년월일, 성별은 수정이 불가합니다.</li>
            <li>※ 휴대폰 번호 수정이 필요한 경우, my LAB에 초대해준 회원에게 직접 수정을 요청해주세요.</li>
          </ul>
        </div>

        <div class="bottom-btns">
          <a href="javascript:;" class="btn full xlarge blue">저장</a>
          <a href="javascript:;" class="btn full xlarge gray">취소</a>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Memberedit',
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

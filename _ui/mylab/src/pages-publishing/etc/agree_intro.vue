<template>
  <div class="agree-intro">
    <form>
      <fieldset>
        <legend>my LAB 멤버 약관 동의</legend>
        <h2 class="h2-title">my LAB 멤버 약관 동의</h2>
        <p class="agree-desc">my LAB 서비스 이용을 위해 약관에 동의해주세요.</p>

        <div class="agreesummary">
          <label class="chkbig"><input type="checkbox" /><span>전체 동의하기</span></label>
        </div>

        <div class="agreebox">
          <strong class="agree-tit">my LAB 서비스 이용약관 <span class="color-blue">(필수)</span></strong>
          <div class="agree-cont ProseMirror">
            약관동의<br />
            약관동의<br />
            약관동의<br />
            약관동의<br />
            약관동의<br />
            약관동의<br />
            약관동의<br />
            약관동의<br />
            약관동의<br />
            약관동의
          </div>
          <div class="agree-check">
            <label><input type="checkbox" /><span>동의합니다</span></label>
          </div>
        </div>

        <div class="agreebox">
          <strong class="agree-tit">개인정보수집이용동의 <span class="color-blue">(필수)</span></strong>
          <div class="agree-cont ProseMirror">
            약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의
          </div>
          <div class="agree-check">
            <label><input type="checkbox" /><span>동의합니다</span></label>
          </div>
        </div>

        <div class="agreesummary">
          <!-- 2022-04-21 14세 미만 일경우 노출// -->
          <p class="text">
            본인은 아래 만14세 미만 아동의 법정대리인으로, 각 자녀를 대리하여 아래 이용약관 및 동의서에 모두 동의합니다.
          </p>
          <div class="chk-area">
            <span class="chk-text">자녀 :</span>
            <ul class="chk-list">
              <li>
                <label class="revert"><input type="checkbox" /><span>김장남</span></label>
              </li>
              <li>
                <label class="revert"><input type="checkbox" /><span>김차남</span></label>
              </li>
              <li>
                <label class="revert"><input type="checkbox" /><span>김막내</span></label>
              </li>
              <li>
                <label class="revert"><input type="checkbox" /><span>김장남</span></label>
              </li>
              <li>
                <label class="revert"><input type="checkbox" /><span>김차남</span></label>
              </li>
            </ul>
          </div>
          <!-- //2022-04-21 14세 미만 일경우 노출 -->

          <p class="gray-text">
            <!-- 2022-04-20 14세 미만 약관 내용 추가 -->
            위 자녀 중 현재 만14세 이상의 자녀가 있는 경우, 만14세 이상 자녀를 대리하여 동의하실 수 없습니다. 우선, 동의
            진행 하신 후 기존 자녀는 탈퇴 진행 or 만14세 이상의 자녀는 마이랩 (청소년) 맴버로 등록하시기 바랍니다.
          </p>

          <label class="chkbig"><input type="checkbox" /><span>전체 동의하기</span></label
          ><!-- 2022-04-20 클래스 추가 -->
        </div>

        <div class="agreebox">
          <strong class="agree-tit">my LAB 서비스 이용약관 <span class="color-blue">(필수)</span></strong>
          <div class="agree-cont ProseMirror">
            약관동의<br />
            약관동의<br />
            약관동의<br />
            약관동의<br />
            약관동의<br />
            약관동의<br />
            약관동의<br />
            약관동의<br />
            약관동의<br />
            약관동의
          </div>
          <div class="agree-check">
            <label><input type="checkbox" /><span>동의합니다</span></label>
          </div>
        </div>

        <div class="agreebox">
          <strong class="agree-tit">개인정보수집이용동의 <span class="color-blue">(필수)</span></strong>
          <div class="agree-cont ProseMirror">
            약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의
          </div>
          <div class="agree-check">
            <label><input type="checkbox" /><span>동의합니다</span></label>
          </div>
        </div>

        <div class="bottom-btns">
          <a href="javascript:;" class="btn full xlarge blue">시작</a>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Agreeintro',
  data: function () {
    return {}
  },
  mounted() {
    // page start !!
    sessionStorage.clear()
  },
  methods: {},
}
</script>

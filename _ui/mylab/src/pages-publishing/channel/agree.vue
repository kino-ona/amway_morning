<template>
  <div class="channel agree">
    <form>
      <fieldset>
        <legend>my LAB 멤버 약관 동의</legend>
        <h2 class="h2-title">my LAB 멤버 약관 동의</h2>

        <div class="agreesummary">
          <p>my LAB 서비스 이용을 위해 약관에 동의해주세요.</p>

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

        <div class="agreebox">
          <strong class="agree-tit">개인정보제3자제공동의 <span class="color-blue">(필수)</span></strong>
          <div class="agree-cont ProseMirror">약관동의</div>
          <div class="agree-check">
            <label><input type="checkbox" /><span>동의합니다</span></label>
          </div>
        </div>

        <div class="bottom-btns">
          <a href="javascript:;" class="btn full xlarge blue">시작</a>
          <a href="javascript:;" class="btn full xlarge gray">취소</a>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Agree',
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

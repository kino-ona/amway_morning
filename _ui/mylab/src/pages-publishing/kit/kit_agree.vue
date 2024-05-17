<template>
  <div class="kit-agree">
    <form>
      <fieldset>
        <legend>약관동의</legend>
        <h2 class="h2-title">약관동의</h2>

        <div class="guideinfo box">
          <ul>
            <li>* 주의사항 내용 미정</li>
          </ul>
        </div>

        <div class="agreebox">
          <strong class="agree-tit">개인정보수집이용동의 <span class="color-blue">(필수)</span></strong>
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
          <strong class="agree-tit">민감정보수집이용동의 <span class="color-blue">(필수)</span></strong>
          <div class="agree-cont ProseMirror">
            약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의
          </div>
          <div class="agree-check">
            <label><input type="checkbox" /><span>동의합니다</span></label>
          </div>
        </div>

        <div class="agreebox">
          <strong class="agree-tit">[HEM] 분석대상물 수집이용동의 <span class="color-blue">(필수)</span></strong>
          <div class="agree-cont ProseMirror">약관동의</div>
          <div class="agree-check">
            <label><input type="checkbox" /><span>동의합니다</span></label>
          </div>
        </div>

        <div class="agreebox">
          <strong class="agree-tit">[HEM] 개인정보 제3자 제공 동의 <span class="color-blue">(선택)</span></strong>
          <div class="agree-cont ProseMirror">약관동의</div>
          <div class="agree-check">
            <label><input type="checkbox" /><span>동의합니다</span></label>
          </div>
        </div>

        <div class="agreebox">
          <strong class="agree-tit">[HEM] 민감정보 제3자 제공 동의 <span class="color-blue">(선택)</span></strong>
          <div class="agree-cont ProseMirror">약관동의</div>
          <div class="agree-check">
            <label><input type="checkbox" /><span>동의합니다</span></label>
          </div>
        </div>

        <div class="agreebox">
          <strong class="agree-tit">개인정보민간정보분석대상물 처리위탁 고지</strong>
          <div class="agree-cont ProseMirror">약관동의</div>
        </div>

        <div class="agreebox">
          <strong class="agree-tit">서비스 이용 전 유의사항</strong>
          <div class="agree-cont ProseMirror">약관동의</div>
        </div>

        <div class="bottom-btns">
          <a href="javascript:;" class="btn full xlarge blue">키트 등록</a>
          <a href="javascript:;" class="btn full xlarge gray">취소</a>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Kitagree',
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

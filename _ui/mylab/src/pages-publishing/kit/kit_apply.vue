<template>
  <div class="kit-apply">
    <form>
      <fieldset>
        <legend>키트 수거 신청</legend>
        <h2 class="h2-title">키트 수거 신청</h2>

        <div class="guideinfo box">
          <h3 class="h3-title">채변 진행전, 꼭! 키트 수거를 먼저 신청해주세요.</h3>
          <ul>
            <li>
              * 정확한 분석을 위해 채변은 꼭 수거 예정일 당일 혹은 예정일 1~2일전에 진행해주고, 채변 가능한 일정을
              고려하여 키트 수거 날짜를 신중하게 선택해주세요.
            </li>
            <li>* 키트 수거 예정일 이틀 전까지 수거지 주소 및 수거 날짜를 수정할 수 있습니다.</li>
          </ul>
        </div>

        <div class="formbox">
          <dl class="date">
            <dt><label for="userdate">희망 수거일</label></dt>
            <dd>
              <div class="flexbox">
                <div id="usercollect" class="selectbox">
                  <select>
                    <option>년도</option>
                    <option>2022년</option>
                  </select>
                </div>
                <div class="selectbox">
                  <select>
                    <option>월</option>
                    <option>12월</option>
                  </select>
                </div>
                <div class="selectbox">
                  <select>
                    <option>일</option>
                    <option>30일</option>
                  </select>
                </div>
              </div>
            </dd>
          </dl>
          <dl>
            <dt><label for="useraddress">주소(수거지)</label></dt>
            <dd>서울시 마포구 ㅇㅇ동 ㅇㅇ 아파트 3동 1204호</dd>
          </dl>
          <dl class="address">
            <dt>변경 주소</dt>
            <dd>
              <button type="button" class="btn">주소검색</button>
              <input type="text" readonly />
              <input type="text" />
              <div class="guideinfo">
                <ul>
                  <li class="color-red">* 주소지 변경 시, 본인의 프로필 주소 정보도 함께 변경됩니다.</li>
                </ul>
              </div>
            </dd>
          </dl>
        </div>

        <div class="aggrecheck">
          <label class="chkbig"
            ><input type="checkbox" />
            <span
              >주의사항을 모두 확인하였습니다.<br />
              (제주 및 도서산간지역은 키트 수거가 어려울 수 있으니, 한국암웨이 고객센터로 문의해주세요.)</span
            > </label
          ><!-- 2022-04-20 클래스 추가 -->
        </div>

        <div class="bottom-btns">
          <a href="javascript:;" class="btn full xlarge blue">키트 수거 신청하기</a>
          <a href="javascript:;" class="btn full xlarge gray">취소</a>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Kitapply',
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

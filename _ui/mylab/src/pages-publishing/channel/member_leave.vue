<template>
  <div class="channel member-leave">
    <form>
      <fieldset>
        <legend>my LAB 멤버 탈퇴</legend>
        <h2 class="h2-title">my LAB 멤버 탈퇴</h2>

        <div class="title-area">
          <h3 class="h3-title">my LAB 서비스를 탈퇴하시겠습니까?</h3>
          <p>
            탈퇴하면 본인의 계정에 등록되어 있던 모든 서비스 이용에 대한 기록과 정보가 삭제되며 복구할 수 없습니다.
            <span class="color-red">(레포트 재발행 불가)</span>
          </p>

          <label class="chkbig"><input type="checkbox" /><span>위의 안내사항을 읽고 이에 동의합니다.</span></label
          ><!-- 2022-04-20 클래스 추가 -->
        </div>

        <h3 class="h3-title">my LAB 서비스를 탈퇴하시려는 이유를 선택해 주세요.</h3>
        <div class="formbox">
          <dl>
            <dt><span class="hide">선택</span></dt>
            <dd>
              <ul>
                <li>
                  <label><input type="radio" /><span>서비스가 유용하지 않습니다.</span></label>
                </li>
                <li>
                  <label><input type="radio" /><span>더 이상 서비스를 이용할 계획이 없습니다.</span></label>
                </li>
                <li>
                  <label><input type="radio" /><span>개인 정보가 우려됩니다.</span></label>
                </li>
                <li>
                  <label><input type="radio" /><span>기록을 모두 삭제하고 다시 시작하고 싶습니다.</span></label>
                </li>
                <li>
                  <label><input type="radio" /><span>서비스 이용이 불편합니다.</span></label>
                </li>
                <li class="direct">
                  <label><input type="radio" /><span>직접입력</span></label>
                  <input type="text" />
                </li>
              </ul>
            </dd>
          </dl>
        </div>

        <div class="bottom-btns">
          <a href="javascript:;" class="btn full xlarge blue">탈퇴</a>
          <a href="javascript:;" class="btn full xlarge gray">취소</a>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Memeberleave',
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

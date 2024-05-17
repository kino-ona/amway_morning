<template>
  <div class="faq">
    <form>
      <fieldset>
        <legend>FAQ</legend>
        <h2 class="h2-title">FAQ</h2>

        <div class="lnb">
          <button type="button" class="active">과학 정보</button
          ><!-- 활성화 : active 클래스 추가 -->
          <button type="button">솔루션</button>
          <button type="button">제품</button>
          <button type="button">마이랩 사이트</button>
          <button type="button">분석 및 결과 레포트</button>
        </div>

        <div class="faqcont">
          <div class="title">
            <span class="num">NO</span>
            <span>제목</span>
          </div>

          <ul class="list">
            <li>
              <button type="button">
                <span class="num">1</span>
                <p>FAQ 제목입니다.</p>
              </button>
              <div class="content">내용</div>
            </li>
            <li>
              <button type="button">
                <span class="num">2</span>
                <p>FAQ 제목입니다.</p>
              </button>
              <div class="content">내용</div>
            </li>
            <li>
              <button type="button">
                <span class="num">3</span>
                <p>FAQ 제목입니다.</p>
              </button>
              <div class="content">내용</div>
            </li>
            <li>
              <button type="button">
                <span class="num">4</span>
                <p>FAQ 제목입니다.</p>
              </button>
              <div class="content">내용</div>
            </li>
            <li>
              <button type="button">
                <span class="num">5</span>
                <p>FAQ 제목입니다. FAQ 제목입니다. FAQ 제목입니다. FAQ 제목입니다. FAQ 제목입니다.</p>
              </button>
              <div class="content">내용</div>
            </li>
            <li>
              <button type="button">
                <span class="num">6</span>
                <p>
                  FAQ 제목입니다. FAQ 제목입니다. FAQ 제목입니다. FAQ 제목입니다. FAQ 제목입니다. FAQ 제목입니다. FAQ
                  제목입니다. FAQ 제목입니다. FAQ 제목입니다. FAQ 제목입니다.
                </p>
              </button>
              <div class="content">내용</div>
            </li>
            <li>
              <button type="button">
                <span class="num">7</span>
                <p>FAQ 제목입니다.</p>
              </button>
              <div class="content">내용</div>
            </li>
            <li>
              <button type="button">
                <span class="num">8</span>
                <p>FAQ 제목입니다.</p>
              </button>
              <div class="content">내용</div>
            </li>
            <li>
              <button type="button">
                <span class="num">9</span>
                <p>FAQ 제목입니다.</p>
              </button>
              <div class="content">내용</div>
            </li>
            <li class="active">
              <!-- 활성화 : active 클래스 추가 -->
              <button type="button">
                <span class="num">10</span>
                <p>FAQ 제목입니다.</p>
              </button>
              <div class="content">
                네, 구매가 가능합니다.<br />나의 프로필 관리에서 키트 분석 결과지 하단에 추천 제품과 구매할 수 있는
                링크가 있습니다.<br />
                <strong>※ 프로필 바로가기 → 키트 등록 → 분석 결과 → 하단 링크</strong>
              </div>
            </li>
            <!-- 2022-03-24 nodata 케이스 추가 -->
            <li class="nodata">데이터가 없습니다.</li>
          </ul>

          <div class="paging">
            <!-- 활성화 : active 클래스 추가 -->
            <button type="button" class="prev"><span class="hide">이전</span></button>
            <button type="button" class="active">1</button>
            <button type="button">2</button>
            <button type="button">3</button>
            <button type="button">4</button>
            <button type="button">5</button>
            <button type="button" class="next active"><span class="hide">다음</span></button>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Faq',
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

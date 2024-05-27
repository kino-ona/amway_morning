<template>
  <div class="guideindex">
    <h1 class="guideh1">myLAB Front GUIDE</h1>

    <h2 class="guideh2">※ Page</h2>

    <h3 class="guideh3">vue 파일명 네이밍</h3>
    <div class="guidetxt">
      - 소문자만 사용하며, 대문자는 사용하지 않는다.<br />
      - 네이밍이 길경우에는 언더바("_")를 사용한다.<br />
    </div>

    <h3 class="guideh3">바닥 페이지 작업</h3>
    <div class="guidetxt">
      - 폴더구조에 적합하도록 파일을 생성한다.<br />
      - 만들어진 vue파일 내에서
      <span class="red">template 바로 아래에 있는 div에 해당페이지명에 맞는 클래스를 선언해준다.</span><br />
      - 네이밍이 길경우에는 하이픈("-")을 사용한다.<br />
      ex)<br />
      &lt;template&gt;<br />
      <div class="guideindent">
        &lt;div <span class="red">class="member"</span>&gt;<br />
        &lt;/div&gt;<br />
      </div>
      &lt;/template&gt; &lt;template&gt;<br />
      <div class="guideindent">
        &lt;div <span class="red">class="kit-agree"</span>&gt;<br />
        &lt;/div&gt;<br />
      </div>
      &lt;/template&gt;
    </div>

    <h3 class="guideh3">팝업 페이지 작업</h3>
    <div class="guidetxt">
      1. 신규페이지 만들경우 components/popup 아래에 퍼블본 만든다.<br />
      2. 생성된 팝업 퍼블본을 componenets/dialog 아래에 개발자가 생성해준다.<br />
      3. components/popup/index.vue에서 팝업 UI 확인 후 개발본에 맞게 css 수정한다.<br /><br />
      - modal-body 클래스 바로 아래에
      <span class="red">"div.modal-페이지명" 로 감싸서 작업한다. (페이지별로 관리하는데 용이하기 위함)</span><br />
      ex) 공유하기 팝업<br />
      &lt;div class="modal-body"&gt;<br />
      <div class="guideindent">
        &lt;div <span class="red">class="modal-share"</span>&gt;<br />

        <div class="guideindent">작업<br /></div>

        &lt;/div&gt;
      </div>
      &lt;/div&gt;
    </div>

    <h2 class="guideh2">※ images</h2>

    <h3 class="guideh3">폴더구조</h3>
    <div class="guidetxt">
      - 경로위치 : /assets/images/<br />
      <div class="guideindent">
        /common : 공통<br />
        /views : 페이지별<br />
        <br />
      </div>
    </div>

    <h3 class="guideh3">이미지 네이밍</h3>
    <div class="guidetxt">
      - 소문자만 사용하며, 대문자는 사용하지 않는다.<br />
      - 네이밍이 길경우에는 언더바("_")를 사용한다.<br />
      <div class="guideindent">
        로고 : logo_<br />
        폼 : form_<br />
        아이콘 : icon_<br />
        버튼 : btn_<br />
        리스트필터 : filter_<br />
        공통 사람 아이콘 : member_<br />
        공통 헤더에 있는 이미지 : header_<br />
        공통 메뉴에 있는 이미지 : gnb_<br />
        공통 팝업에 있는 이미지 : modal_<br />
        플러그인 : 플러그인명_<br />
      </div>
    </div>

    <h2 class="guideh2">※ SCSS</h2>

    <h3 class="guideh3">폴더구조</h3>
    <div class="guidetxt">
      - 경로위치 : /assets/scss/<br />
      <div class="guideindent">
        /mixins : setting &amp; util<br />
        /config : setting &amp; util<br />
        /base : 기본 layout<br />
        /component : 요소 Elements<br />
        /views : 각 페이지<br />
      </div>
    </div>

    <h3 class="guideh3">클래스와 변수 네이밍</h3>
    <div class="guidetxt">
      - 소문자만 사용하며, 대문자는 사용하지 않는다.<br />
      - 네이밍이 길경우에는 하이픈("-")을 사용한다.<br />
    </div>

    <h3 class="guideh3">style.scss</h3>
    <div class="guidetxt">
      - 나뉘어진 scss 파일을 한번에 불러와 관리하는 곳으로, 선언 순서는 아래와 같다.<br />
      <div class="guideindent">
        1. setting &amp; util<br />
        2. 기본 layout<br />
        3. 요소 Elements<br />
        4. page
      </div>
    </div>

    <h3 class="guideh3">header, footer</h3>
    <div class="guidetxt">
      - 퍼블본과 개발본이 상이하다. header, footer 작업할때 개발쪽에 확인 후 작업 진행한다.<br />
    </div>

    <h2 class="guideh2">※ 공통 마크업</h2>

    <h3 class="guideh3">form</h3>
    <div class="guidewrap">
      <!-- input// -->
      <input id="" type="text" />
      <!-- //input -->
      <br /><br />

      <!-- select// -->
      <div id="usertel" class="selectbox">
        <select>
          <option>선택</option>
          <option>010</option>
        </select>
      </div>
      <!-- //select -->
      <br /><br />

      <!-- checkbox// -->
      <label>
        <input type="checkbox" />
        <span>체크박스 default</span>
      </label>
      <label style="margin-left: 10px">
        <input type="checkbox" checked />
        <span>체크박스 checked</span>
      </label>
      <label style="margin-left: 10px">
        <input type="checkbox" disabled />
        <span>체크박스 disabled</span>
      </label>
      <label style="margin-left: 10px">
        <input type="checkbox" checked disabled />
        <span>체크박스 checked disabled</span>
      </label>
      <br /><br />

      <label class="chkbig">
        <input type="checkbox" />
        <span>체크박스 big</span>
      </label>
      <!-- //checkbox -->
      <br /><br />

      <!-- radio// -->
      <label>
        <input type="radio" />
        <span>라디오버튼 default</span>
      </label>
      <label style="margin-left: 10px">
        <input type="radio" checked />
        <span>라디오버튼 checked</span>
      </label>
      <label style="margin-left: 10px">
        <input type="radio" disabled />
        <span>라디오버튼 disabled</span>
      </label>
      <label style="margin-left: 10px">
        <input type="radio" checked disabled />
        <span>라디오버튼 checked disabled</span>
      </label>
      <!-- //radio -->
    </div>

    <h3 class="guideh3">titlearea</h3>
    <div class="guidewrap">
      <!-- titlearea// -->
      <div class="titlearea">
        <h2 class="h2-title">h2 대제목입니다.</h2>
        <h3 class="h3-title">h3 소제목입니다.</h3>
      </div>
      <!-- //titlearea -->
    </div>

    <h3 class="guideh3">btn (의미에 맞게 a태그, 버튼태그 사용할 것.)</h3>
    <div class="guidewrap">
      <!-- button// -->
      <button type="button" class="btn">.btn</button>
      <button type="button" class="btn" disabled>.btn:disabled</button>
      <button type="button" class="btn blue">.btn.blue</button>
      <button type="button" class="btn gray">.btn.gray</button>
      <button type="button" class="btn large">.btn.large</button>
      <button type="button" class="btn xlarge">.btn.xlarge</button>
      <button type="button" class="btn full">.btn.full</button>
      <button type="button" class="btn plus">.btn.plus</button>
      <button type="button" class="btn-more"><span class="hide">더보기</span></button>
      <a href="javascript:;" class="btn-edit"><span class="hide">수정</span></a>
      <button type="button" class="btn-del"><span class="hide">삭제</span></button>
      <div class="bottom-btns">
        <button type="button" class="btn full xlarge blue">.btn.full.xlarge.blue</button>
        <button type="button" class="btn full xlarge gray">.btn.full.xlarge.gray</button>
      </div>
      <!-- //button -->
    </div>

    <h3 class="guideh3">listfilter</h3>
    <div class="guidewrap">
      <!-- listfilter// -->
      <section class="listfilter">
        <div class="select">
          <!-- 활성화 : open 클래스 추가 -->
          <button type="button">최신순</button>
          <ul>
            <li class="active"><a href="javascript:;">최신순</a></li>
            <!-- 현재 선택값 : active 클래스 추가 -->
            <li><a href="javascript:;">인기순</a></li>
          </ul>
        </div>
      </section>
      <!-- //listfilter -->
    </div>

    <h3 class="guideh3">tab</h3>
    <div class="guidewrap">
      <!-- tab// -->
      <div class="tab">
        <ul class="tab-menu">
          <li class="active"><a href="javascript:;">탭제목1</a></li>
          <!-- 활성화 : active 클래스 추가 -->
          <li><a href="javascript:;">탭제목2</a></li>
        </ul>

        <div class="tab-cont">
          <!-- 탭제목1// -->
          <div class="cont active">
            <!-- 활성화 : active 클래스 추가 -->
            탭내용 1
          </div>
          <!-- //탭제목1 -->

          <!-- 탭제목2// -->
          <div class="cont">탭내용 2</div>
          <!-- //탭제목2 -->
        </div>
      </div>
      <!-- //tab -->
    </div>

    <h3 class="guideh3">table</h3>
    <div class="guidewrap">
      <!-- table// -->
      <div class="tbl">
        <table>
          <caption>
            키트 구매목록 상세
          </caption>
          <colgroup>
            <col style="width: 10%" />
            <col style="width: 19%" />
            <col style="width: 21%" />
            <col style="width: 36%" />
            <col style="width: 14%" />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">NO</th>
              <th scope="col">사용여부</th>
              <th scope="col">주문일자</th>
              <th scope="col">주문번호</th>
              <th scope="col">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>3</td>
              <td>사용</td>
              <td>21.02.08</td>
              <td><p>180-814849056</p></td>
              <td></td>
            </tr>
            <tr>
              <td>2</td>
              <td>사용</td>
              <td>19.12.05</td>
              <td><p>180-814849056</p></td>
              <td></td>
            </tr>
            <tr>
              <td>1</td>
              <td>사용</td>
              <td>19.11.02</td>
              <td><p>180-814849056</p></td>
              <td></td>
            </tr>
            <tr>
              <!-- 2022-03-11 nodata 케이스 추가 -->
              <td colspan="5" class="nodata">구매내역이 없습니다.</td>
            </tr>
          </tbody>
        </table>
        <button type="button" class="btn-more"><span class="hide">더보기</span></button>
      </div>
      <!-- //table -->
    </div>

    <h3 class="guideh3">guideinfo</h3>
    <div class="guidewrap">
      <!-- guideinfo// -->
      <div class="guideinfo">
        <ul>
          <li>※ 키트 수정 시 건강 설문을 다시 진행 하셔야 합니다.</li>
          <li>※ 키트 수정 시 건강 설문을 다시 진행 하셔야 합니다.</li>
        </ul>
      </div>
      <!-- //guideinfo -->
      <br />
      <!-- guideinfo dot// -->
      <div class="guideinfo dot">
        <ul>
          <li class="color-red">수거 예정일 : 2022.01.08</li>
          <li class="color-red">수거 예정일 이틀 전까지 수정 가능합니다.</li>
        </ul>
      </div>
      <!-- //guideinfo dot -->
      <br />
      <!-- guideinfo box// -->
      <div class="guideinfo box">
        <h3 class="h3-title">채변 진행전, 꼭! 키트 수거를 먼저 신청해주세요.</h3>
        <ul>
          <li>* 키트 수거 예정일 이틀 전까지 수거지 주소 및 수거 날짜를 수정할 수 있습니다.</li>
          <li>* 키트 수거 예정일 이틀 전까지 수거지 주소 및 수거 날짜를 수정할 수 있습니다.</li>
        </ul>
      </div>
      <!-- //guideinfo box -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Guide',
  data: function () {
    return {}
  },
  mounted() {
    // page start !!
  },
  methods: {},
}
</script>
<style>
.guideindex {
  padding: 50px 20px;
  background: #fff;
  color: #000;
  font-family: sans-serif, Malgungothic, '맑은고딕', Dotum, '돋움';
}
.guideindex .guideh1 {
  margin-bottom: 30px;
  font-size: 26px;
  font-weight: 600;
  text-align: center;
}
.guideindex .guideh2 {
  margin-top: 50px;
  font-size: 20px;
  font-weight: 600;
}
.guideindex .guideh3 {
  margin-top: 30px;
  padding-left: 10px;
  font-size: 16px;
  font-weight: 600;
  border-left: 4px solid #399aed;
}
.guideindex .guidetxt {
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.6;
}
.guideindex .guidetxt .guideindent {
  margin-left: 15px;
}
.guideindex .guidewrap {
  margin-top: 10px;
  max-width: 1500px;
  padding: 20px;
  overflow: hidden;
}
.guideindex .red {
  color: #f00 !important;
}
</style>

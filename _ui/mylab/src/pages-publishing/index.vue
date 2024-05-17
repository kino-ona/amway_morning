<template>
  <div class="guideindex">
    <h1 class="guideh1">myLAB Front INDEX</h1>
    <h2 class="guideh2">폴더구조</h2>
    <div class="guide-tbl">
      <table class="guideTbl01">
        <colgroup>
          <col width="33%" />
          <col width="33%" />
          <col width="34%" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">시스템</th>
            <th scope="col">분류</th>
            <th scope="col">폴더명</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="alL" rowspan="5">mylab-front-vue/</td>
            <td class="alL">공통파일(header, footer, layout, modal, sidemenu)</td>
            <td class="alL">/components/base/</td>
          </tr>
          <tr>
            <td class="alL">페이지</td>
            <td class="alL">/pages-publishing/</td>
          </tr>
          <tr>
            <td class="alL">scss</td>
            <td class="alL">/assets/scss/</td>
          </tr>
          <tr>
            <td class="alL">font</td>
            <td class="alL">/assets/scss/font</td>
          </tr>
          <tr>
            <td class="alL">img</td>
            <td class="alL">/assets/images/</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 class="guideh2">
      페이지 <span class="guide-desc">(개발에 공유할 경우, 개발공유일에 공유한 날짜를 기입한다.)</span>
    </h2>
    <div class="guide-tbl">
      <table>
        <colgroup>
          <col width="8%" />
          <col width="14%" />
          <col width="14%" />
          <col width="14%" />
          <col width="5%" />
          <col width="5%" />
          <col width="9%" />
          <col width="*" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" rowspan="2">1Depth</th>
            <th scope="col" rowspan="2">2Depth</th>
            <th scope="col" rowspan="2">경로</th>
            <th scope="col" rowspan="2">파일명&amp;Link</th>
            <th scope="col" colspan="3">완료여부</th>
            <th scope="col" rowspan="2">비고</th>
          </tr>
          <tr>
            <th scope="col">MO</th>
            <th scope="col">PC</th>
            <th scope="col">개발공유일</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="alL">공통</td>
            <td class="alL">gnb</td>
            <td class="alL">/layouts/components</td>
            <td class="alL">SideMenu 파일에서 '.sidemenu'에 aside-open 클래스추가하여 페이지 확인</td>
            <td>완료</td>
            <td>완료</td>
            <td>2022-03-11</td>
            <td class="alL red">2022-04-20 버튼 클래스 추가</td>
          </tr>
          <tr>
            <td class="alL" rowspan="6">메인</td>
            <td class="alL">메인</td>
            <td class="alL" rowspan="6">/pages-publishing/main</td>
            <td class="alL">
              <router-link to="/main/main"> main </router-link>
            </td>
            <td>완료</td>
            <td>완료</td>
            <td>2022-02-28</td>
            <td class="alL red">
              2022-03-04 캐릭터이미지 확장자 '.png'에서 '.svg'로 변경<br />2022-03-08 필터영역 a태그에서 button 태그로
              변경<br />
              2022-04-14 문구추가
            </td>
          </tr>
          <tr>
            <td class="alL">인트로</td>
            <td class="alL">
              <router-link to="/main/intro">intro </router-link>
            </td>
            <td>완료</td>
            <td>완료</td>
            <td>2022-03-31</td>
            <td class="alL red">2022-04-06 이미지 alt값 수정, 문구추가</td>
          </tr>
          <tr>
            <td class="alL">콘텐츠 &gt; 솔루션 소개</td>
            <td class="alL">
              <router-link to="/main/introsolution">introsolution </router-link>
            </td>
            <td>완료</td>
            <td>완료</td>
            <td>2022-03-18</td>
            <td class="alL red">
              2022-04-06 문구수정, 문구추가<br />
              2022-04-12 swiper 이미지 변경
            </td>
          </tr>
          <tr>
            <td class="alL">콘텐츠 &gt; 제품 소개</td>
            <td class="alL">
              <router-link to="/main/introproduct">introproduct </router-link>
            </td>
            <td>완료</td>
            <td>완료</td>
            <td>2022-03-24</td>
            <td class="alL red">2022-04-12 문구수정, 문구추가</td>
          </tr>
          <tr>
            <td class="alL">콘텐츠 &gt; 서비스 이용안내</td>
            <td class="alL">
              <router-link to="/main/introservice">introservice </router-link>
            </td>
            <td>완료</td>
            <td>완료</td>
            <td>2022-03-24</td>
            <td class="alL red">2022-04-12 swiper 이미지 변경</td>
          </tr>
          <tr>
            <td class="alL">콘텐츠 &gt; 채변 가이드</td>
            <td class="alL">
              <router-link to="/main/introfecal">introfecal </router-link>
            </td>
            <td>완료</td>
            <td>완료</td>
            <td>2022-03-18</td>
            <td class="alL red">2022-04-20 swiper 이미지 변경</td>
          </tr>
          <tr>
            <td class="alL" rowspan="6">멤버 관리</td>
            <td class="alL">my LAB 멤버 관리(멤버)</td>
            <td class="alL" rowspan="6">/pages-publishing/member</td>
            <td class="alL">
              <router-link to="/member/member"> member </router-link>
            </td>
            <td>완료</td>
            <td>완료</td>
            <td>2022-02-28</td>
            <td class="alL red">
              2022-03-08 캐릭터이미지 확장자 '.png'에서 '.svg'로 변경, step4결과 문구 변경<br />
              2022-03-31 탈퇴 버튼 가운데정렬 변경으로 클래스 수정, 문구수정, 추천제품이 Admin DB에 존재하지 않을 경우
              추가, 이미지 추가, 버튼명 수정<br />
              2022-04-12 상단 안내 문구 수정, SOP 문구 추가<br />
              2022-06-03 strong태그 제거
            </td>
          </tr>
          <tr>
            <td class="alL">my LAB 멤버 관리(본인)</td>
            <td class="alL">
              <router-link to="/member/member_me"> member_me </router-link>
            </td>
            <td>완료</td>
            <td>완료</td>
            <td>2022-02-28</td>
            <td class="alL red">
              2022-03-08 캐릭터이미지 확장자 '.png'에서 '.svg'로 변경, step4결과 문구 변경<br />
              2022-03-31 탈퇴 버튼 가운데정렬 변경으로 클래스 수정, 문구수정, 추천제품이 Admin DB에 존재하지 않을 경우
              추가, 이미지 추가, 버튼명 수정<br />
              2022-04-12 상단 안내 문구 수정, SOP 문구 추가<br />
              2022-06-03 strong태그 제거
            </td>
          </tr>
          <tr>
            <td class="alL">my LAB 멤버 수정</td>
            <td class="alL">
              <router-link to="/member/member_edit"> member_edit </router-link>
            </td>
            <td>완료</td>
            <td>완료</td>
            <td>2022-02-28</td>
            <td class="alL red">2022-03-08 캐릭터이미지 확장자 '.png'에서 '.svg'로 변경</td>
          </tr>
          <tr>
            <td class="alL">my LAB 멤버 추가(기본)</td>
            <td class="alL">
              <router-link to="/member/member_add"> member_add </router-link>
            </td>
            <td>완료</td>
            <td>완료</td>
            <td>2022-02-28</td>
            <td class="alL red">
              2022-03-04 생년월일 datepicker 클래스 수정<br />
              2022-03-08 하단 안내문구 수정<br />
              2022-04-11 14세 미만의 멤버의 경우 약관영역 추가<br />
              2022-04-12 상단 안내문구 수정, 하단 문구 띄어쓰기 수정<br />
              2022-04-20 label에 클래스 추가<br />
              2022-05-16 li에 클래스 추가<br />
            </td>
          </tr>
          <tr>
            <td class="alL">my LAB 멤버 추가(14세미만의 경우)</td>
            <td class="alL">
              <router-link to="/member/member_addchild"> member_addchild </router-link>
            </td>
            <td>완료</td>
            <td>완료</td>
            <td>2022-05-16</td>
            <td class="alL red"></td>
          </tr>
          <tr>
            <td class="alL">my LAB 탈퇴</td>
            <td class="alL">
              <router-link to="/member/member_leave"> member_leave </router-link>
            </td>
            <td>완료</td>
            <td>완료</td>
            <td>2022-02-28</td>
            <td class="alL red">
              2022-04-11 상단 문구 수정<br />
              2022-04-20 label에 클래스 추가
            </td>
          </tr>
          <tr>
            <td class="alL" rowspan="5">키트&amp;설문</td>
            <td class="alL">약관동의</td>
            <td class="alL" rowspan="5">/pages-publishing/kit</td>
            <td class="alL">
              <router-link to="/kit/kit_agree"> kit_agree </router-link>
            </td>
            <td>완료</td>
            <td>완료</td>
            <td>2022-02-28</td>
            <td class="alL red">상단 안내문구를 제외하고 완료</td>
          </tr>
          <tr>
            <td class="alL">키트등록</td>
            <td class="alL">
              <router-link to="/kit/kit_enroll"> kit_enroll </router-link>
            </td>
            <td>완료</td>
            <td>완료</td>
            <td>2022-02-28</td>
            <td class="alL red">2022-03-08 nodata 케이스 추가<br />2022-03-31 안내 문구 추가, 뱃지 추가</td>
          </tr>
          <tr>
            <td class="alL">건강 설문</td>
            <td class="alL">
              <router-link to="/kit/kit_survey"> kit_survey </router-link>
            </td>
            <td>완료</td>
            <td>완료</td>
            <td>2022-03-11</td>
            <td class="alL red">2022-04-06 문구삭제</td>
          </tr>
          <tr>
            <td class="alL">키트 수거 신청</td>
            <td class="alL">
              <router-link to="/kit/kit_apply"> kit_apply </router-link>
            </td>
            <td>완료</td>
            <td>완료</td>
            <td>2022-02-28</td>
            <td class="alL red">2022-04-20 label에 클래스 추가</td>
          </tr>
          <tr>
            <td class="alL">키트 구매목록</td>
            <td class="alL">
              <router-link to="/kit/kit_buy"> kit_buy </router-link>
            </td>
            <td>완료</td>
            <td>완료</td>
            <td>2022-02-28</td>
            <td class="alL red">
              2022-03-11 nodata 케이스 추가<br />
              2022-03-31 주문번호 p태그 추가, sop 뱃지 추가<br />
              2022-04-20 label에 클래스 추가
            </td>
          </tr>
          <tr>
            <td class="alL" rowspan="4">기타</td>
            <td class="alL">FAQ</td>
            <td class="alL" rowspan="4">/pages-publishing/etc</td>
            <td class="alL">
              <router-link to="/etc/faq">faq </router-link>
            </td>
            <td>완료</td>
            <td>완료</td>
            <td>2022-03-18</td>
            <td class="alL red">2022-03-24 nodata 케이스 추가</td>
          </tr>
          <tr>
            <td class="alL">약관동의</td>
            <td class="alL">
              <router-link to="/etc/agree_intro">agree_intro </router-link>
            </td>
            <td>완료</td>
            <td>완료</td>
            <td>2022-02-28</td>
            <td class="alL red">
              2022-04-20 label에 클래스 추가<br />
              2022-04-21 14세 미만 약관 내용 추가
            </td>
          </tr>
          <tr>
            <td class="alL">약관상세</td>
            <td class="alL">
              <router-link to="/etc/agree_detail">agree_detail </router-link>
            </td>
            <td>완료</td>
            <td>완료</td>
            <td>2022-02-28</td>
            <td class="alL red"></td>
          </tr>
          <tr>
            <td class="alL">시스템 점검</td>
            <td class="alL">
              <router-link to="/etc/system_check">system_check </router-link>
            </td>
            <td>완료</td>
            <td>완료</td>
            <td>2022-03-11</td>
            <td class="alL red"></td>
          </tr>
          <tr>
            <td class="alL" rowspan="2">팝업</td>
            <td class="alL">휴대폰인증 팝업</td>
            <td class="alL" rowspan="2">/pages-publishing/popup</td>
            <td class="alL">
              <router-link to="/popup">popup </router-link>
            </td>
            <td>완료</td>
            <td>완료</td>
            <td>2022-03-11</td>
            <td class="alL red"></td>
          </tr>
          <tr>
            <td class="alL">공유하기 팝업</td>
            <td class="alL">
              <router-link to="/popup">popup </router-link>
            </td>
            <td>완료</td>
            <td>완료</td>
            <td>2022-03-11</td>
            <td class="alL red">2022-04-12 색상 클래스 추가</td>
          </tr>
          <tr>
            <td class="alL" rowspan="10">멤버 채널</td>
            <td class="alL">로그인</td>
            <td class="alL" rowspan="10">/pages-publishing/channel</td>
            <td class="alL">
              <router-link to="/channel/login">login </router-link>
            </td>
            <td>완료</td>
            <td>완료</td>
            <td>2022-02-28</td>
            <td class="alL red"></td>
          </tr>
          <tr>
            <td class="alL">로그인 &gt; 약관 동의</td>
            <td class="alL">
              <router-link to="/channel/agree">agree </router-link>
            </td>
            <td>완료</td>
            <td>완료</td>
            <td>2022-02-28</td>
            <td class="alL red">2022-04-20 label에 클래스 추가</td>
          </tr>
          <tr>
            <td class="alL">메인</td>
            <td class="alL">
              <router-link to="/channel/member">member </router-link>
            </td>
            <td>완료</td>
            <td>완료</td>
            <td>2022-02-28</td>
            <td class="alL red">
              2022-03-08 캐릭터이미지 확장자 '.png'에서 '.svg'로 변경, step4결과 문구 변경<br />
              2022-03-31 탈퇴 버튼 가운데정렬 변경으로 클래스 수정, 문구수정, 추천제품이 Admin DB에 존재하지 않을 경우
              추가, 이미지 추가, 버튼명 수정<br />
              2022-04-12 SOP 문구 추가
            </td>
          </tr>
          <tr>
            <td class="alL">메인 &gt; 수정</td>
            <td class="alL">
              <router-link to="/channel/member_edit">member_edit </router-link>
            </td>
            <td>완료</td>
            <td>완료</td>
            <td>2022-02-28</td>
            <td class="alL red">
              2022-03-08 캐릭터이미지 확장자 '.png'에서 '.svg'로 변경<br />2022-03-08 하단 안내문구 수정<br />
              2022-03-31 탈퇴 버튼 가운데정렬 변경으로 클래스 수정<br />
              2022-04-12 문구 수정
            </td>
          </tr>
          <tr>
            <td class="alL">my LAB 멤버 탈퇴</td>
            <td class="alL">
              <router-link to="/channel/member_leave">member_leave </router-link>
            </td>
            <td>완료</td>
            <td>완료</td>
            <td>2022-02-28</td>
            <td class="alL red">2022-04-20 label에 클래스 추가</td>
          </tr>
          <tr class="overlap">
            <td class="alL">키트&amp;설문 &gt; 약관동의</td>
            <td class="alL">
              <router-link to="/channel/"> </router-link>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td rowspan="5" class="alL red">
              위 페이지들과 중복된 내용으로 추가로 페이지 생성안함. <br />
              멤버채널 페이지들은 channel 클래스를 맨 상단 태그 div에 공통으로 넣어주세요. <br /><br />
              ex) <br />
              "멤버 채널 &gt; 키트&amp;설문 &gt; 약관동의" : &lt;div class="channel kit-agree"&gt;<br />
              "멤버 채널 &gt; 키트&amp;설문 &gt; 키트등록" : &lt;div class="channel kit-enroll"&gt;<br />
              "멤버 채널 &gt; 키트&amp;설문 &gt; 건강 설문" : &lt;div class="channel kit-survey"&gt;<br />
              "멤버 채널 &gt; 키트&amp;설문 &gt; 키트 수거 신청" : &lt;div class="channel kit-apply"&gt;
            </td>
          </tr>
          <tr class="overlap">
            <td class="alL">키트&amp;설문 &gt; 키트등록</td>
            <td class="alL">
              <router-link to="/channel/"> </router-link>
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="overlap">
            <td class="alL">키트&amp;설문 &gt; 건강 설문</td>
            <td class="alL">
              <router-link to="/channel/"> </router-link>
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="overlap">
            <td class="alL">키트&amp;설문 &gt; 키트 수거 신청</td>
            <td class="alL">
              <router-link to="/channel/"> </router-link>
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="overlap">
            <td class="alL">약관상세</td>
            <td class="alL">
              <router-link to="/channel/"> </router-link>
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th scope="row" class="num">※</th>
            <td class="alL" colspan="2">퍼블리싱 가이드</td>
            <td class="alL">
              <router-link to="/guide"> guide </router-link>
            </td>
            <td colspan="4"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data: function () {
    return {}
  },
  mounted() {
    // page start !!
    sessionStorage.clear()
    //this.AAA();
  },
  methods: {
    // AAA() {
    //   console.log('aaaa');
    // }
  },
}
</script>

<style>
.guideindex {
  padding: 50px 10px;
  background: #fff;
  color: #000;
}
.guideindex .guideh1 {
  margin-bottom: 30px;
  font-size: 26px;
  font-weight: 600;
  text-align: center;
}
.guideindex .guideh2 {
  margin-top: 40px;
  font-size: 16px;
  font-weight: 600;
}
.guideindex .guide-tbl table {
  width: 100%;
  border-collapse: collapse;
  border-right: 1px #dedede solid;
}
.guideindex .guide-tbl table {
  margin-top: 10px;
  text-align: center;
  border-top: 2px #326dc2 solid;
}
.guideindex .guide-tbl table tr > th,
.guideindex .guide-tbl table tr > td {
  padding: 10px;
  border-left: 1px #dedede solid;
  border-top: 1px #dedede solid;
  vertical-align: top;
}
.guideindex .guide-tbl table thead tr:first-child > th,
.guideindex .guide-tbl table tbody tr:first-child > th,
.guideindex .guide-tbl table tbody tr:first-child > td {
  border-top: none;
}
.guideindex .guide-tbl table thead tr > th {
  background: #eee;
  font-size: 13px;
  vertical-align: middle;
}
.guideindex .guide-tbl table tbody tr > td {
  vertical-align: top;
}
.guideindex .guide-tbl table thead tr > th {
  color: #000;
  font-weight: bold;
}
.guideindex .guide-tbl table tbody {
  font-size: 13px;
  border-bottom: 1px #ccc solid;
  border-top: 1px #ccc solid;
}
.guideindex .guide-tbl .alC {
  text-align: center !important;
}
.guideindex .guide-tbl .alL {
  text-align: left !important;
}
.guideindex .guide-tbl .alR {
  text-align: right !important;
}
.guideindex .guide-tbl {
  min-width: 980px;
  margin: 0 auto;
  box-sizing: border-box;
}
.guideindex .guide-tbl a {
  color: #666;
}
.guideindex .guide-tbl a:hover {
  color: #326dc2;
}
.guideindex .guide-tbl .chk th,
.guideindex .guide-tbl .chk td {
  color: blue !important;
}
.guideindex .guide-tbl tbody.add th,
.guideindex .guide-tbl tbody.add td {
  color: #00a383 !important;
}
.guideindex .guide-tbl tbody.add2 th,
.guideindex .guide-tbl tbody.add2 td {
  color: #a38300 !important;
}
.guideindex .guide-tbl .red {
  color: #f00;
}
.guideindex .guide-tbl .complete {
  background-color: #ccc;
}
.guideindex .guide-tbl .remove {
  background-color: #fdeaea;
}
.guideindex .guide-tbl .overlap {
  background-color: #fff0f0;
}
.guideindex .guide-desc {
  margin-left: 10px;
  font-size: 13px;
}
</style>

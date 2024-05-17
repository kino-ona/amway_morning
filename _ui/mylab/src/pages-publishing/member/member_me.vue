<template>
  <div class="member">
    <h2 class="h2-title">my LAB 멤버 관리</h2>

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

      <div class="btn-wrap">
        <a href="javascript:;" class="btn-edit"><span class="hide">수정</span></a>
        <!-- 회원(본인)일경우 비노출
        <button type="button" class="btn-del"><span class="hide">삭제</span></button -->
      </div>

      <div class="summary">
        <dl>
          <dt>생년월일</dt>
          <dd>1981/8/15</dd>
          <dt>휴대폰</dt>
          <dd>010-0000-0000</dd>
          <dt>이메일</dt>
          <dd>fegoweg@gmail.com</dd>
          <dt>주소(수거지)</dt>
          <dd>서울시 마포구 ㅇㅇ동 ㅇㅇ 아파트 3동 1204호</dd>
        </dl>
      </div>

      <!-- 회원(본인)일경우// -->
      <div class="link">
        <a href="javascript:;" class="btn full large">키트 구매목록</a>
      </div>
      <!-- //회원(본인)일경우 -->

      <!-- 2022-04-12 상단 안내문구 수정 -->
      <!-- 2022-05-13 guideinfo li.txt-black 클래스 추가 -->
      <!-- 멤버일경우
      <div class="link">
        <button type="button" class="btn full large">my LAB 초대 링크 전송</button>
      </div>
      <div class="guideinfo bg-gray">
        <ul>
          <li class="txt-black">
            * my LAB 멤버로 등록할 가족/ 지인(Amway 비회원)에게 약관 동의 및 키트 등록을 진행하고 서비스를 이용할 수
            있도록 초대 링크를 전송해주세요.
          </li>
          <li class="txt-black">* 멤버 등록 후 10일 이내에 my LAB 멤버가 제3자 제공 동의를 하지 않으면 해당 프로필은 자동 삭제됩니다.</li>
          <li class="txt-black">* 등록된 my LAB 멤버는 추후 “my LAB 로그인”을 통해 my LAB 사이트 접속 및 서비스를 이용할 수 있습니다.</li>
        </ul>
      </div>
      -->
    </div>
    <!-- //member-info -->

    <!-- tab// -->
    <div class="tab">
      <ul class="tab-menu">
        <li class="active"><a href="javascript:;">진행중</a></li>
        <!-- 활성화 : active 클래스 추가 -->
        <li><a href="javascript:;">이전 내역</a></li>
      </ul>

      <div class="tab-cont">
        <!-- 진행중// -->
        <div class="cont active">
          <!-- 활성화 : '.cont'에 active 클래스 추가 -->

          <!-- 내역이 없을경우 노출// -->
          <div class="nodata">
            <p>진행중인 내역이 없습니다.</p>

            <a href="javascript:;" class="btn full large">키트 등록 시작</a
            ><!-- 회원(본인) 및 가족(14세 이하)일 경우 노출 -->
          </div>
          <!-- //내역이 없을경우 노출 -->

          <div class="kit open">
            <!-- 펼침형태 : open 클래스 추가 (진행중일때는 default: 펼침) -->
            <div class="acc-head">
              <strong class="kit-tit"># X1234Y1234</strong>
              <p class="kit-date">
                <span>등록일 : 2021.12.14</span>
                <span>종료일 : 2021.12.31</span
                ><!-- 결과 단계 도달 시 도달 일자 표시 -->
              </p>
              <!-- <button type="button" class="btn-del"><span class="hide">삭제</span></button> --><!-- 진행중이면서 step1일때만 삭제버튼 노출 -->
            </div>

            <div class="acc-cont">
              <ol class="step">
                <li>
                  <!-- 활성화 : active 클래스 추가 -->
                  <strong class="step-tit">Step1 문진</strong>
                  <p>키트 수거 예정일은 2021년 12월 28일 입니다.</p>
                </li>
                <li>
                  <strong class="step-tit">Step2 배송</strong>
                  <p>키트 도착일은 2021년 12월 20일 입니다.</p>
                </li>
                <li>
                  <strong class="step-tit">Step3 분석</strong>
                  <p>분석 완료 예정일은 2021년 12월 28일 입니다.</p>
                </li>
                <li class="active">
                  <strong class="step-tit">Step4 결과</strong>
                  <p>
                    <!-- 2022-03-08 문구 수정 --><!-- 2022-03-31 문구 수정 -->
                    분석이 완료되었습니다.<br />
                    맞춤형 프로바이오틱스 추천 제품과 이메일로 발송된 결과 레포트를 확인해주세요.<br />
                    <!-- 회원본인의 현황일 경우// -->
                    마이랩 SOP를 신청하신 분들은 추천된 맞춤형 프로 바이오틱스 제품으로 정기배송이 시작됩니다.
                    <!-- //회원본인의 현황일 경우 -->
                    <!-- 등록한 멤버의 현황일 경우//
                    제품 구매는, myLAB 서비스에 초대해준 ABO회원에게 문의해주세요.
                    -->
                  </p>
                  <a href="javascript:;" class="btn full large">이메일 재발송 신청</a>

                  <!-- 2022-04-12 SOP 문구 추가 -->
                  <div class="guideinfo">
                    <ul>
                      <li>
                        * 결과 레포트에 포함되는 정보는 마이랩 마이크로바이옴 프로바이오틱스 이외의 제품 추천에 활용할
                        수 없습니다.
                      </li>
                    </ul>
                  </div>

                  <div class="product">
                    <!-- 2022-03-31 추천제품이 Admin DB에 존재하지 않을 경우 추가, 이미지 추가, 버튼명 수정 -->
                    <!-- 추천제품이 Admin DB에 존재하지 않을 경우 표시//
                    <div class="nodata-text">
                      해당 제품이 존재하지 않습니다.<br />
                      관리자에게 문의해 주세요.
                    </div>
                    -->

                    <strong>마이크로바이옴 프로바이오틱스 1</strong>
                    <span class="img"><img src="/resource/images/views/member_probiotics.png" alt="" /></span>
                    <a href="javascript:;" class="btn full large blue">맞춤형 프로바이오틱스 제품 확인</a>
                  </div>
                </li>
              </ol>
            </div>

            <!-- <button type="button" class="btn-more"><span class="hide">열기/닫기</span></button> --><!-- 진행중일 때는 비노출 -->
          </div>

          <div class="newkitbtn">
            <!-- 내역이 있으면서 & step4이면서 & 회원(본인) 및 가족(14세 이하)일 경우 노출 -->
            <a href="javascript:;" class="btn full large">신규 키트 등록</a>
          </div>
        </div>
        <!-- //진행중 -->

        <!-- 이전 내역// -->
        <div class="cont">
          <!-- 내역이 없을경우 노출// -->
          <div class="nodata">
            <p>진행중인 내역이 없습니다.</p>
          </div>
          <!-- //내역이 없을경우 노출 -->

          <div class="kit">
            <!-- 펼침형태 : open 클래스 추가 (진행중일때는 default: 펼침) -->
            <div class="acc-head">
              <strong class="kit-tit"># X1234Y1234</strong>
              <p class="kit-date">
                <span>등록일 : 2021.12.14</span>
                <span>종료일 : 2021.12.31</span
                ><!-- 결과 단계 도달 시 도달 일자 표시 -->
              </p>
              <!-- <button type="button" class="btn-del"><span class="hide">삭제</span></button> --><!-- 진행중이면서 step1일때만 삭제버튼 노출 -->
            </div>

            <div class="acc-cont">
              <ol class="step">
                <li>
                  <!-- 활성화 : active 클래스 추가 -->
                  <strong class="step-tit">Step1 문진</strong>
                  <p>키트 수거 예정일은 2021년 12월 28일 입니다.</p>
                </li>
                <li>
                  <strong class="step-tit">Step2 배송</strong>
                  <p>키트 도착일은 2021년 12월 20일 입니다.</p>
                </li>
                <li>
                  <strong class="step-tit">Step3 분석</strong>
                  <p>분석 완료 예정일은 2021년 12월 28일 입니다.</p>
                </li>
                <li class="active">
                  <strong class="step-tit">Step4 결과</strong>
                  <p>
                    <!-- 2022-03-08 문구 수정 --><!-- 2022-03-31 문구 수정 -->
                    분석이 완료되었습니다.<br />
                    맞춤형 프로바이오틱스 추천 제품과 이메일로 발송된 결과 레포트를 확인해주세요.<br />
                    <!-- 회원본인의 현황일 경우// -->
                    마이랩 SOP를 신청하신 분들은 추천된 맞춤형 프로 바이오틱스 제품으로 정기배송이 시작됩니다.
                    <!-- //회원본인의 현황일 경우 -->
                    <!-- 등록한 멤버의 현황일 경우//
                    제품 구매는, myLAB 서비스에 초대해준 ABO회원에게 문의해주세요.
                    -->
                  </p>
                  <a href="javascript:;" class="btn full large">이메일 재발송 신청</a>

                  <!-- 2022-04-12 SOP 문구 추가 -->
                  <div class="guideinfo">
                    <ul>
                      <li>
                        * 결과 레포트에 포함되는 정보는 마이랩 마이크로바이옴 프로바이오틱스 이외의 제품 추천에 활용할
                        수 없습니다.
                      </li>
                    </ul>
                  </div>

                  <div class="product">
                    <!-- 2022-03-31 추천제품이 Admin DB에 존재하지 않을 경우 추가, 이미지 추가, 버튼명 수정 -->
                    <!-- 추천제품이 Admin DB에 존재하지 않을 경우 표시//
                    <div class="nodata-text">
                      해당 제품이 존재하지 않습니다.<br />
                      관리자에게 문의해 주세요.
                    </div>
                    -->

                    <strong>마이크로바이옴 프로바이오틱스 1</strong>
                    <span class="img"><img src="/resource/images/views/member_probiotics.png" alt="" /></span>
                    <a href="javascript:;" class="btn full large blue">맞춤형 프로바이오틱스 제품 확인</a>
                  </div>
                </li>
              </ol>
            </div>

            <button type="button" class="btn-more"><span class="hide">열기/닫기</span></button
            ><!-- 진행중일 때는 비노출 -->
          </div>
        </div>
        <!-- //이전 내역 -->
      </div>
    </div>
    <!-- //tab -->

    <!-- 2022-03-31 가운데정렬로 tar 클래스 변경 -->
    <!-- 회원(본인)일경우 노출// -->
    <div class="btn-area tac">
      <a href="javascript:;" class="btn-withdrawal">my LAB 탈퇴</a>
    </div>
    <!-- //회원(본인)일경우 노출 -->
  </div>
</template>

<script>
export default {
  name: 'Memeberme',
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

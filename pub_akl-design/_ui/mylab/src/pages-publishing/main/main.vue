<template>
  <div class="main">
    <!-- main-visual// -->
    <div class="main-visual open">
      <div class="big">
        <div class="inner">
          <strong>미생물 생태계 균형에서 찾은 <em>나만의 건강</em></strong>
          <p>
            건강의 토대가 되는 몸 속 미생물 생태계, 마이크로바이옴 사람마다 다른 미생물 생태계 균형을 찾기 위해
            뉴트리라이트만의 기술로 집요하고 철저하게 분석하여 당신만의 마이크로바이옴 솔루션을 제안합니다
          </p>

          <div class="patent-desc">
            <!-- 2022-04-14 문구추가 -->
            *마이크로바이옴 전문 기업 HEM Pharma사의 PMAS 특허 기술(특허등록번호 10-2124474,10-2227382)로 개인의 장 환경
            복제 후 미생물과 대사체를 동시에 분석하는 기술 (2022년 5월 기준)
          </div>
        </div>
      </div>

      <div class="small">
        <div class="inner">
          <strong>미생물 생태계 균형에서 찾은 <em>나만의 건강</em></strong>
        </div>
      </div>

      <button type="button" class="btn-toggle"><span class="text">자세히보기</span></button>
    </div>
    <!-- //main-visual -->

    <!-- main-member// -->
    <div class="main-member">
      <div class="title-area">
        <h2 class="h2-tit">my LAB 멤버<span class="count">(7명)</span></h2>
        <button type="button" class="btn plus">멤버추가</button>

        <!-- listfilter// -->
        <section class="listfilter">
          <div class="select">
            <!-- 활성화 : open 클래스 추가 -->
            <button type="button">등록순</button>
            <ul>
              <!-- 2022-03-08 필터영역 a태그에서 button 태그로 변경 -->
              <li class="active"><button type="button">등록순</button></li>
              <!-- 현재 선택값 : active 클래스 추가 -->
              <li><button type="button">최신순</button></li>
            </ul>
          </div>
        </section>
        <!-- //listfilter -->
      </div>

      <ul class="list-area">
        <!-- 사용자유형에 따라 클래스 추가 및 태그 추가됨.
          주사업자일 경우 : li class="primary" / <span>주</span>
          부사업자일 경우 : li class="sub" / <span>부</span>
          멤버, RC일 경우 : li class="rc" / <span>나</span>

          예외로, 멤버추가 버튼 영역은 : li class="addbox" 클래스 추가됨.
        -->

        <!-- 사용자유형 : 주사업자일 경우// -->
        <li class="primary">
          <div class="box">
            <span class="img">
              <img src="/resource/images/common/member_woman_adult.svg" alt="" />
              <span>주</span>
            </span>
            <div class="info">
              <strong>송지효</strong>
              <span class="birth">1981년 8월 15일생</span>
            </div>
            <a href="javascript:;" class="btn-link"><span class="hide">바로가기</span></a>
          </div>

          <div class="toggle">
            <!-- 펼침형태 : open 클래스 추가 -->
            <p><span class="state blue">접수대기</span>등록된 키트가 없습니다.</p>
            <button type="button" class="btn-toggle"><span class="hide">열기/닫기</span></button>
            <div class="toggle-cont">
              <p class="text">서비스 이용을 위해 키트 등록, 건강 설문, 수거 신청을 진행해주세요.</p>
              <a href="javascript:;" class="btn full large blue">키트 등록 시작</a>
            </div>
          </div>
        </li>
        <!-- //사용자유형 : 주사업자일 경우 -->

        <!-- 사용자유형 : 부사업자일 경우// -->
        <li class="sub">
          <div class="box">
            <span class="img">
              <img src="/resource/images/common/member_man_adult.svg" alt="" />
              <span>부</span>
            </span>
            <div class="info">
              <strong>송지효</strong>
              <span class="birth">1981년 8월 15일생</span>
            </div>
            <a href="javascript:;" class="btn-link"><span class="hide">바로가기</span></a>
          </div>

          <div class="toggle">
            <p><span class="state blue">접수진행</span> 정보입력이 완료되지 않았습니다.</p>
            <button type="button" class="btn-toggle"><span class="hide">열기/닫기</span></button>
            <div class="toggle-cont">
              <p class="text">키트 등록, 건강 설문 작성, 수거 신청 정보 입력을 모두 완료 후 채변을 진행해주세요.</p>
              <div class="btn-area">
                <button type="button" class="btn large confirm">키트 등록</button
                ><!-- 완료된 항목 : confirm 클래스 추가 -->
                <button type="button" class="btn large confirm">건강 설문</button>
                <button type="button" class="btn large">수거 신청</button>
              </div>
            </div>
          </div>
        </li>
        <!-- //사용자유형 : 부사업자일 경우 -->

        <!-- 사용자유형 : 멤버, RC일 경우// -->
        <li class="rc">
          <div class="box">
            <span class="img">
              <img src="/resource/images/common/member_woman_young.svg" alt="" />
              <span>나</span>
            </span>
            <div class="info">
              <strong>송지효 <em>(36세)</em></strong>
              <span class="birth">1981년 8월 15일생</span>
            </div>
            <a href="javascript:;" class="btn-link"><span class="hide">바로가기</span></a>
          </div>

          <div class="toggle">
            <p><span class="state blue">접수완료</span> 키트 수거 예정:<span class="color-black">2021.12.28</span></p>
            <button type="button" class="btn-toggle"><span class="hide">열기/닫기</span></button>
            <div class="toggle-cont">
              <p class="text">채변은 꼭 수거 예정일 당일 혹은 예정일 1~2일전에 진행해주세요.</p>
              <div class="btn-area">
                <button type="button" class="btn large confirm">키트 등록</button>
                <button type="button" class="btn large confirm">건강 설문</button>
                <button type="button" class="btn large confirm">수거 신청</button>
              </div>
            </div>
          </div>
        </li>
        <!-- //사용자유형 : 멤버, RC일 경우 -->

        <li>
          <div class="box">
            <span class="img">
              <img src="/resource/images/common/member_woman_young.svg" alt="" />
            </span>
            <div class="info">
              <strong>송지효 <em>(36세)</em></strong>
              <span class="birth">1981년 8월 15일생</span>
            </div>
            <a href="javascript:;" class="btn-link"><span class="hide">바로가기</span></a>
          </div>

          <div class="toggle">
            <p><span class="state yellow">키트배송</span> 키트가 분석기관으로 배송중입니다.</p>
          </div>
        </li>

        <li>
          <div class="box">
            <span class="img">
              <img src="/resource/images/common/member_man_young.svg" alt="" />
            </span>
            <div class="info">
              <strong>송지효 <em>(36세)</em></strong>
              <span class="birth">1981년 8월 15일생</span>
            </div>
            <a href="javascript:;" class="btn-link"><span class="hide">바로가기</span></a>
          </div>

          <div class="toggle">
            <p><span class="state yellow">키트도착</span> 키트가 분석기관에 도착했습니다.</p>
          </div>
        </li>

        <li>
          <div class="box">
            <span class="img">
              <img src="/resource/images/common/member_woman_infant.svg" alt="" />
            </span>
            <div class="info">
              <strong>송지효 <em>(36세)</em></strong>
              <span class="birth">1981년 8월 15일생</span>
            </div>
            <a href="javascript:;" class="btn-link"><span class="hide">바로가기</span></a>
          </div>

          <div class="toggle">
            <p><span class="state green">분석중</span> 분석완료 예정:<span class="color-black">2021.12.30</span></p>
          </div>
        </li>

        <li>
          <div class="box">
            <span class="img">
              <img src="/resource/images/common/member_man_infant.svg" alt="" />
            </span>
            <div class="info">
              <strong>송지효 <em>(36세)</em></strong>
              <span class="birth">1981년 8월 15일생</span>
            </div>
            <a href="javascript:;" class="btn-link"><span class="hide">바로가기</span></a>
          </div>

          <div class="toggle">
            <p><span class="state purple">분석완료</span> 분석이 <span class="color-blue">완료</span>되었습니다.</p>
            <button type="button" class="btn-toggle"><span class="hide">열기/닫기</span></button>
            <div class="toggle-cont">
              <p class="text">맞춤형 프로바이오틱스 추천 제품과 이메일로 발송된 결과 레포트를 확인해주세요.</p>
              <a href="javascript:;" class="btn full large">맞춤형 프로바이오틱스 제품 확인</a>
              <a href="javascript:;" class="btn full large blue">신규 키트 등록</a>
            </div>
          </div>
        </li>

        <li>
          <div class="box">
            <span class="img">
              <img src="/resource/images/common/member_man_adult.svg" alt="" />
            </span>
            <div class="info">
              <strong>송지효 <em>(36세)</em></strong>
              <span class="birth">1981년 8월 15일생</span>
            </div>
            <a href="javascript:;" class="btn-link"><span class="hide">바로가기</span></a>
          </div>

          <div class="toggle">
            <p><span class="state purple">키트반려</span> 분석이 <span class="color-red">반려</span>되었습니다.</p>
            <button type="button" class="btn-toggle"><span class="hide">열기/닫기</span></button>
            <div class="toggle-cont">
              <p class="text">
                채취 량 부족, 신선도 등의 이유로 분석이 <span class="color-red">반려</span>되었습니다.<br />자동
                발송되는 새로운 키트를 받으신 후, 재 등록하여 다시 접수 해주세요.
              </p>
              <a href="javascript:;" class="btn full large blue">신규 키트 등록</a>
            </div>
          </div>
        </li>

        <li>
          <div class="box">
            <span class="img">
              <img src="/resource/images/common/member_woman_adult.svg" alt="" />
            </span>
            <div class="info">
              <strong>송지효 <em>(36세)</em></strong>
              <span class="birth">1981년 8월 15일생</span>
            </div>
            <a href="javascript:;" class="btn-link"><span class="hide">바로가기</span></a>
          </div>

          <div class="toggle">
            <p><span class="state gray">멤버등록</span> 멤버 등록 완료 대기중입니다.</p>
            <button type="button" class="btn-toggle"><span class="hide">열기/닫기</span></button>
            <div class="toggle-cont">
              <p class="text">서비스 이용을 위해 멤버의 약관 동의 및 키트 등록이 필요합니다.</p>
            </div>
          </div>
        </li>

        <!-- 멤버추가 버튼 영역// -->
        <li class="addbox">
          <a href="javascript:;" class="btn-add">
            <span>멤버추가</span>
            <p>my LAB 분석을 진행할<br />새로운 멤버(암웨이 비회원 가족/ 지인)를 추가하세요</p>
          </a>
        </li>
        <!-- //멤버추가 버튼 영역 -->
      </ul>
    </div>
    <!-- //main-member -->
  </div>
</template>

<script>
export default {
  name: 'Main',
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

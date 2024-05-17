<template>
  <div class="kit-enroll">
    <form>
      <fieldset>
        <legend>키트등록</legend>
        <h2 class="h2-title">키트등록</h2>

        <!-- tab// -->
        <div class="tab">
          <ul class="tab-menu">
            <li class="active"><a href="javascript:;">직접 구매한 경우</a></li>
            <!-- 활성화 : active 클래스 추가 -->
            <li><a href="javascript:;">전달 받은 경우</a></li>
          </ul>

          <div class="tab-cont">
            <!-- 직접 구매한 경우// -->
            <div class="cont active">
              <!-- 활성화 : active 클래스 추가 -->

              <div class="formbox">
                <dl class="abo">
                  <dt>ABO 번호</dt>
                  <dd><input type="text" placeholder="선물자의 ABO번호를 입력하세요." value="7480001" disabled /></dd>
                </dl>
                <dl class="orderhistory">
                  <dt>주문내역</dt>
                  <dd>
                    <ul class="orderlist">
                      <li>
                        <!-- 2022-03-31 sop 뱃지 추가 -->
                        <label
                          ><input type="radio" /><span><strong>SOP</strong>180-814849056</span
                          ><em>2021.11.04</em></label
                        >
                      </li>
                      <li>
                        <label><input type="radio" /><span>180-814849056</span><em>2021.11.04</em></label>
                      </li>
                      <li>
                        <label><input type="radio" /><span>180-814849056</span><em>2021.11.04</em></label>
                      </li>
                      <li>
                        <label><input type="radio" /><span>180-814849056</span><em>2021.11.04</em></label>
                      </li>
                      <li>
                        <label><input type="radio" /><span>180-814849056</span><em>2021.11.04</em></label>
                      </li>
                      <li>
                        <label><input type="radio" /><span>180-814849056</span><em>2021.11.04</em></label>
                      </li>
                      <li>
                        <label><input type="radio" /><span>180-814849056</span><em>2021.11.04</em></label>
                      </li>
                      <li>
                        <label><input type="radio" /><span>180-814849056</span><em>2021.11.04</em></label>
                      </li>
                      <li>
                        <label><input type="radio" /><span>180-814849056</span><em>2021.11.04</em></label>
                      </li>
                      <li>
                        <label><input type="radio" /><span>180-814849056</span><em>2021.11.04</em></label>
                      </li>
                      <li class="nodata">주문 내역이 없습니다.</li>
                      <!-- 2022-03-08 nodata 케이스 추가 -->
                    </ul>

                    <button type="button" class="btn-more"><span class="hide">더보기</span></button>

                    <div class="guideinfo">
                      <ul>
                        <!-- 2022-03-31 문구 추가 -->
                        <li class="color-red">* 주문내역 중 먼저 구매한 건부터 등록을 진행해주세요.</li>
                        <li class="color-red">* my LAB 프로필에 아직 등록하지 않은 주문번호만 조회 됩니다.</li>
                        <li class="color-red">
                          * SOP를 신청하신 주문번호로 키트를 등록하시면, 분석 완료 후 분석 결과에 따른 맞춤형
                          프로바이오틱스 제품으로 SOP 정기배송이 자동으로 시작됩니다.
                        </li>
                      </ul>
                    </div>
                  </dd>
                </dl>
                <dl class="kitserial">
                  <dt>키트 시리얼</dt>
                  <dd>
                    <input type="text" placeholder="10자리의 키트시리얼을 입력하세요." />

                    <div class="guideinfo">
                      <ul>
                        <li class="color-red">
                          * 사용하실 마이크로바이옴 테스트 키트 내 튜브에 적힌 시리얼 번호를 기입해주세요.
                        </li>
                      </ul>
                    </div>
                  </dd>
                </dl>
              </div>

              <!-- 키트 수정일 경우 문구 노출// -->
              <div class="guideinfo">
                <ul>
                  <li>※ 키트 수정 시 건강 설문을 다시 진행 하셔야 합니다.</li>
                </ul>
              </div>
              <!-- //키트 수정일 경우 문구 노출 -->
            </div>
            <!-- //직접 구매한 경우 -->

            <!-- 전달 받은 경우// -->
            <div class="cont">
              <div class="formbox">
                <dl class="abo">
                  <dt>ABO 번호</dt>
                  <dd><input type="text" placeholder="키트를 전달해준 분의 ABO번호를 입력하세요" /></dd>
                </dl>
                <dl class="ordernumber">
                  <dt>주문번호</dt>
                  <dd>
                    <div class="flexbox transparent">
                      <span class="number">180</span>
                      <span class="hyppen">-</span>
                      <input type="text" />
                    </div>

                    <!-- ABO 번호와 주문번호 체크가 확인 완료 시 문구 비노출// -->
                    <div class="guideinfo">
                      <ul>
                        <li class="color-red">* 키트를 전달 한 ABO분이 공유한 주문번호를 입력해주세요.</li>
                      </ul>
                    </div>
                    <!-- //ABO 번호와 주문번호 체크가 확인 완료 시 문구 비노출 -->

                    <button type="button" class="btn full large">확인</button>
                    <button type="button" class="btn full large" disabled>완료</button>
                  </dd>
                </dl>
                <dl class="kitserial">
                  <dt>키트 시리얼</dt>
                  <dd>
                    <input type="text" placeholder="10자리의 키트시리얼을 입력하세요." />

                    <!-- ABO 번호와 주문번호 체크가 확인 완료 시 문구 비노출// -->
                    <div class="guideinfo">
                      <ul>
                        <li class="color-red">
                          * 사용하실 마이크로바이옴 테스트 키트 내 튜브에 적힌 시리얼 번호를 기입해주세요.
                        </li>
                      </ul>
                    </div>
                    <!-- //ABO 번호와 주문번호 체크가 확인 완료 시 문구 비노출 -->
                  </dd>
                </dl>
              </div>

              <!-- 키트 수정일 경우 문구 노출// -->
              <div class="guideinfo">
                <ul>
                  <li>※ 키트 수정 시 건강 설문을 다시 진행 하셔야 합니다.</li>
                </ul>
              </div>
              <!-- //키트 수정일 경우 문구 노출 -->
            </div>
            <!-- //전달 받은 경우 -->
          </div>

          <div class="bottom-btns">
            <a href="javascript:;" class="btn full xlarge blue">설문 시작</a>
            <a href="javascript:;" class="btn full xlarge gray" disabled>취소</a>
          </div>
        </div>
        <!-- //tab -->
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Kitenroll',
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

<template>
  <div class="kit-survey">
    <form>
      <fieldset>
        <legend>건강 설문</legend>
        <h2 class="h2-title">건강 설문</h2>

        <div class="guideinfo box">
          <h3 class="h3-title">정확한 분석을 위해 건강 설문 응답이 필요합니다.</h3>
          <ul>
            <li>
              * 설문 완료 전에는 응답 내용이 자동 저장되지 않으며, 설문 완료 후, 키트 수거 예정일 이틀 전까지는 응답
              내용을 수정할 수 있습니다."
            </li>
          </ul>
        </div>

        <!-- 2022-04-06 문구삭제
        <div class="infotop">
          <p>
            마이랩 바이 뉴트리라이트 마이크로바이옴 솔루션 서비스의 원활한 이용 및 결과 상담을 위해 건강 설문 응답이
            필요합니다.<br />등록하신 테스트 키트의 실사용자 정보를 기준으로 정확히 작성해주세요.
          </p>
        </div>
         -->

        <div class="survey-cont">
          <h3 class="h3-title">Part I. 개인정보</h3>
          <p class="title-desc">
            테스트 키트 실사용자의 개인 정보를 정확히 작성해주세요.<br />14세 미만의 사용자의 경우 휴대폰 번호,결과
            레포트 수령 주소지 및 이메일은 부모님의 정보로 작성해주세요.
          </p>

          <div class="formbox">
            <ul class="userinfo-list">
              <li>
                <em class="question">1. 성명</em>
                <p class="answer">송지효</p>
              </li>
              <li>
                <em class="question">2. 성별</em>
                <p class="answer">여자</p>
              </li>
              <li>
                <em class="question">3. 생년월일을 입력해 주세요</em>
                <p class="answer">1981년도 8월 15일</p>
              </li>
              <li>
                <em class="question">4. 프로필에 등록된 아래 휴대폰번호를 확인해주세요.</em>
                <p class="answer">010-1234-5678</p>
              </li>
              <li>
                <em class="question"
                  >5. 프로필에 등록된 아래 주소로 마이크로바이옴 결과 레포트가 발송될 예정입니다. 받으실 주소를
                  수정하겠습니까?</em
                >
                <dl class="address">
                  <dt>
                    <span class="hide">주소</span>
                    <label class="chkbig"><input type="checkbox" /><span>예</span></label
                    ><!-- 2022-04-20 클래스 추가 -->
                  </dt>
                  <dd>
                    <button type="button" class="btn">주소검색</button>
                    <input type="text" readonly />
                    <input type="text" />
                  </dd>
                </dl>
                <div class="guideinfo">
                  <ul>
                    <li class="color-red">* 본 주소 정보를 수정해도 본인의 프로필 주소 정보는 변경되지 않습니다.</li>
                  </ul>
                </div>
              </li>
              <li>
                <em class="question"
                  >6. 프로필에 등록된 아래 E-mail 주소로 마이크 로바이옴 레포트가 발송될 예정입니다. 수신할 이메일
                  주소를 수정하겠습니까?</em
                >
                <dl class="email">
                  <dt>
                    <span class="hide">이메일</span>
                    <label class="chkbig"><input type="checkbox" /><span>예</span></label
                    ><!-- 2022-04-20 클래스 추가 -->
                  </dt>
                  <dd>
                    <input id="useremail" type="text" />

                    <div class="emailbox">
                      <span class="hyppen">@</span>
                      <div class="selectbox">
                        <select>
                          <option>이메일 선택</option>
                          <option>gmail.com</option>
                          <option>naver.com</option>
                        </select>
                      </div>
                    </div>
                  </dd>
                </dl>
                <div class="guideinfo">
                  <ul>
                    <li class="color-red">* E-mail 변경 시, 본인의 프로필 E-mail 정보도 함께 변경됩니다.</li>
                  </ul>
                </div>
              </li>
              <li>
                <em class="question">7. 현재 키(숫자만)를 입력해주세요.</em>
                <dl class="inbody">
                  <dt class="hide"><label for="tall">키</label></dt>
                  <dd>
                    <input id="tall" type="number" />
                    <span class="dot">.</span>
                    <input type="number" value="0" />
                    <span class="unit">cm</span>
                  </dd>
                </dl>
              </li>
              <li>
                <em class="question">8. 현재 몸무게(숫자만)를 입력해주세요.</em>
                <dl class="inbody">
                  <dt class="hide"><label for="weigh">몸무게</label></dt>
                  <dd>
                    <input id="weigh" type="number" />
                    <span class="dot">.</span>
                    <input type="number" value="0" />
                    <span class="unit">kg</span>
                  </dd>
                </dl>
              </li>
            </ul>
          </div>

          <h3 class="h3-title">Part II. 장건강(배변건강) 설문</h3>
          <p class="title-desc">
            지금부터 장 건강(배변건강) 관련 질문을 드리겠습니다.<br />최근 1주일간을 떠올리며 응답해주세요
          </p>

          <div class="formbox">
            <ol class="survey-list">
              <li>
                <em class="question">최근 1주 동안 평균 배변 횟수는 어떻게 되십니까?</em>
                <ul class="answer type-col">
                  <li>
                    <label><input type="radio" checked /><span>주 0~1회</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>주 2~3회</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>주 4~5회</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>주 6~11회</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>주 12~14회</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>주 15~20회</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>주 21회 이상</span></label>
                  </li>
                </ul>
              </li>
              <li>
                <em class="question">최근 1주 동안 평균적으로 배변 시 변기에 앉 아 있는 시간은 어느 정도인가요?</em>
                <ul class="answer type-col">
                  <li>
                    <label><input type="radio" checked /><span>5분 내</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>5~10분</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>10~30분</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>30분 이상</span></label>
                  </li>
                </ul>
              </li>
              <li>
                <em class="question">최근 1주 동안 평균적으로 배변 활동을 했던 시간은 주로 하루 중 언제인가요?</em>
                <ul class="answer type-col">
                  <li>
                    <label><input type="radio" checked /><span>주로 아침</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>주로 점심</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>주로 저녁</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>불규칙, 매번 다름</span></label>
                  </li>
                </ul>
              </li>
              <li>
                <em class="question">최근 1주 동안 평균 변 상태와 가장 가까운 것 은 무엇인가요?</em>
                <ul class="answer type-img">
                  <li>
                    <label>
                      <input type="radio" checked />
                      <span>
                        <img src="/resource/images/views/kitsurvey_img01.png" alt="" />
                        <em>마치 견과류처럼 딱딱하게 분리된 덩어리들 (배변하기 어려움)</em>
                      </span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="radio" />
                      <span>
                        <img src="/resource/images/views/kitsurvey_img02.png" alt="" />
                        <em>울퉁불퉁한 소시지 형태</em>
                      </span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="radio" />
                      <span>
                        <img src="/resource/images/views/kitsurvey_img03.png" alt="" />
                        <em>소시지 형태지만 밖에 금이 가 있음</em>
                      </span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="radio" />
                      <span>
                        <img src="/resource/images/views/kitsurvey_img04.png" alt="" />
                        <em>소시지나 뱀을 닮았고 매끄럽고 부드럽다</em>
                      </span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="radio" />
                      <span>
                        <img src="/resource/images/views/kitsurvey_img05.png" alt="" />
                        <em>윤곽이 뚜렷한 가장자리의 부드러운 방울들 (배변이 쉬움)</em>
                      </span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="radio" />
                      <span>
                        <img src="/resource/images/views/kitsurvey_img06.png" alt="" />
                        <em>가장자리의 거품 같은 조각, 곤죽 같은 대변</em>
                      </span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="radio" />
                      <span>
                        <img src="/resource/images/views/kitsurvey_img07.png" alt="" />
                        <em>묽고 고체 조각이 없이 전부 액체</em>
                      </span>
                    </label>
                  </li>
                </ul>
              </li>
              <li>
                <em class="question">최근 1주 동안 다음 항목들에 대해 어떻게 느 끼셨는지 각각 응답해 주세요</em>

                <div class="quesitonbox">
                  <p>식사 후 배가 만성적으로 아프며, 배변 후 복 통이 호전되거나 더 심해진다.</p>
                  <ul class="answer">
                    <li>
                      <label><input type="radio" checked /><span>매우 편하다. 증상이 전혀 없다.</span></label>
                    </li>
                    <li>
                      <label><input type="radio" /><span>편한 편이다. 증상이 거의 없다.</span></label>
                    </li>
                    <li>
                      <label><input type="radio" /><span>약간 불편하다.</span></label>
                    </li>
                    <li>
                      <label><input type="radio" /><span>매우 불편하다.</span></label>
                    </li>
                  </ul>
                </div>

                <div class="quesitonbox">
                  <p>식사 후 배가 만성적으로 아프며, 배변 후 복 통이 호전되거나 더 심해진다.</p>
                  <ul class="answer">
                    <li>
                      <label><input type="radio" checked /><span>매우 편하다. 증상이 전혀 없다.</span></label>
                    </li>
                    <li>
                      <label><input type="radio" /><span>편한 편이다. 증상이 거의 없다.</span></label>
                    </li>
                    <li>
                      <label><input type="radio" /><span>약간 불편하다.</span></label>
                    </li>
                    <li>
                      <label><input type="radio" /><span>매우 불편하다.</span></label>
                    </li>
                  </ul>
                </div>

                <div class="quesitonbox">
                  <p>배변 후에도 찝찝한 느낌이 들거나 다시 화장 실에 가고 싶다.</p>
                  <ul class="answer">
                    <li>
                      <label><input type="radio" checked /><span>매우 편하다. 증상이 전혀 없다.</span></label>
                    </li>
                    <li>
                      <label><input type="radio" /><span>편한 편이다. 증상이 거의 없다.</span></label>
                    </li>
                    <li>
                      <label><input type="radio" /><span>약간 불편하다.</span></label>
                    </li>
                    <li>
                      <label><input type="radio" /><span>매우 불편하다.</span></label>
                    </li>
                  </ul>
                </div>

                <div class="quesitonbox">
                  <p>매끼 식사할 때마다 바로 화장실을 간다.</p>
                  <ul class="answer">
                    <li>
                      <label><input type="radio" checked /><span>매우 편하다. 증상이 전혀 없다.</span></label>
                    </li>
                    <li>
                      <label><input type="radio" /><span>편한 편이다. 증상이 거의 없다.</span></label>
                    </li>
                    <li>
                      <label><input type="radio" /><span>약간 불편하다.</span></label>
                    </li>
                    <li>
                      <label><input type="radio" /><span>매우 불편하다.</span></label>
                    </li>
                  </ul>
                </div>
              </li>
            </ol>
          </div>

          <h3 class="h3-title">Part III. 생활습관 설문</h3>
          <p class="title-desc">지금부터 생활 습관 관련 질문을 드리겠습니다.</p>
          <div class="formbox">
            <ol class="survey-list">
              <li>
                <em class="question">최근 1주 동안 평균 하루 수면 시간은 얼마나 됩니까?</em>
                <ul class="answer">
                  <li>
                    <label><input type="radio" checked /><span>5시간 미만</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>5시간 이상 6시간 미만</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>6시간 이상 7시간 미만</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>7시간 이상 8시간 미만</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>8시간 이상 9시간 미만</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>9시간 이상</span></label>
                  </li>
                </ul>
              </li>
              <li>
                <em class="question">최근 1주 동안 30분이상 숨이 찰 정도의 운동 을 한 횟수는 얼마나 됩니까?</em>
                <ul class="answer type-col">
                  <li>
                    <label><input type="radio" checked /><span>거의 하지않음</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>주 1~2회</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>주 3~4회</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>주 5~6회</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>매일</span></label>
                  </li>
                </ul>
              </li>
              <li>
                <em class="question">최근 1개월 동안 피로도는 얼마나 됩니까?</em>
                <ul class="answer">
                  <li>
                    <label><input type="radio" checked /><span>전혀 피곤하지 않음</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>약간 피곤함</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>피곤함</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>매우 피곤함</span></label>
                  </li>
                </ul>
              </li>
              <li>
                <em class="question">최근 1개월 동안 집중력, 기억력은 얼마나 됩 니까?</em>
                <ul class="answer type-col">
                  <li>
                    <label><input type="radio" checked /><span>아주 안 좋음</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>안 좋은 편</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>좋은 편</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>아주 좋음</span></label>
                  </li>
                </ul>
              </li>
              <li>
                <em class="question">최근 1개월 동안 스트레스 정도는 얼마나 됩 니까?</em>
                <ul class="answer type-col">
                  <li>
                    <label><input type="radio" checked /><span>전혀 없음</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>전혀 없음</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>많음</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>아주 많음</span></label>
                  </li>
                </ul>
              </li>
              <li>
                <em class="question">흡연은 얼마나 하십니까?</em>
                <ul class="answer type-col">
                  <li>
                    <label><input type="radio" checked /><span>흡연 안함</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>금연 중</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>가끔 흡연 중</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>매일 흡연 중</span></label>
                  </li>
                </ul>
              </li>
            </ol>
          </div>

          <h3 class="h3-title">Part IV. 식습관 설문</h3>
          <p class="title-desc">지금부터 식습관 관련 질문을 드리겠습니다. 최근 1주일간을 떠올려 주시며 응답해주세요</p>
          <div class="formbox">
            <ol class="survey-list">
              <li>
                <em class="question">한번 식사할 때 김치를 제외한 채소류를 몇 가 지나 드십니까?</em>
                <div class="guideinfo">
                  <ul>
                    <li>
                      * 시금치, 콩나물, 미역, 쌈채소, 김구이, 시래기 국 등 나물이나 국, 찌개를 통해 섭취한 채소류는 모두
                      포함합니다.
                    </li>
                  </ul>
                </div>
                <ul class="answer type-col">
                  <li>
                    <label><input type="radio" checked /><span>먹지 않음</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>1가지</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>2가지</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>3가지</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>4가지 이상</span></label>
                  </li>
                </ul>
              </li>
              <li>
                <em class="question">과일을 얼마나 자주 드십니까?</em>
                <div class="guideinfo">
                  <ul>
                    <li>
                      * 1회에 해당하는 양은 아래와 같습니다.<br />- 사과 1/2개, 귤(중) 1개, 참외 1/2개, 포도 1/3송이,
                      수박 1조각, 생과일주스 1/2컵
                    </li>
                  </ul>
                </div>
                <ul class="answer type-col">
                  <li>
                    <label><input type="radio" checked /><span>2주 1회 이하</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>주 1~3회</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>주 4~6회</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>일 1회</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>일 2회 이상</span></label>
                  </li>
                </ul>
              </li>
              <li>
                <em class="question">고기(닭고기, 소고기, 돼지고기 등)를 얼마나 자주 드십니까?</em>
                <ul class="answer type-col">
                  <li>
                    <label><input type="radio" checked /><span>2주 1회 이하</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>주 1~3회</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>주 4~6회</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>일 1회</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>일 2회 이상</span></label>
                  </li>
                </ul>
              </li>
              <li>
                <em class="question">발효음식(김치, 된장, 요거트 등)을 얼마나 자주 드십니까?</em>
                <ul class="answer type-col">
                  <li>
                    <label><input type="radio" checked /><span>2주 1회 이하</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>주 1~3회</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>주 4~6회</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>일 1회</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>일 2회 이상</span></label>
                  </li>
                </ul>
              </li>
              <li>
                <em class="question"
                  >5. 과자(초콜릿, 사탕 포함) 또는 달거나 기름진 빵(케이크, 도넛, 단팥빵 등)을 얼마나 자주
                  드셨습니까?</em
                >
                <ul class="answer type-col">
                  <li>
                    <label><input type="radio" checked /><span>2주 1회 이하</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>주 1~3회</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>주 4~6회</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>일 1회</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>일 2회 이상</span></label>
                  </li>
                </ul>
              </li>
              <li>
                <em class="question">가공식품이나 패스트푸드를 얼마나 자주 드셨 습니까?</em>
                <ul class="answer type-col">
                  <li>
                    <label><input type="radio" checked /><span>거의 먹지 않음</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>2주 1회</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>주 1~3회</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>주 4~6회</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>매일</span></label>
                  </li>
                </ul>
              </li>
              <li>
                <em class="question">평소에 음식을 얼마나 짜게 먹는 편입니까?</em>
                <ul class="answer type-col">
                  <li>
                    <label><input type="radio" checked /><span>매우 싱겁게</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>약간 싱겁게</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>보통</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>약간 짜게</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>매우 짜게</span></label>
                  </li>
                </ul>
              </li>
              <li>
                <em class="question"
                  >최근 섭취하신 보조식품이 있으면 모두 선택 해 주십시오.
                  <span class="color-blue">(중복 선택 가능)</span></em
                >
                <ul class="answer type-col">
                  <li>
                    <label><input type="checkbox" /><span>유산균</span></label>
                  </li>
                  <li>
                    <label><input type="checkbox" /><span>비타민류</span></label>
                  </li>
                  <li>
                    <label><input type="checkbox" /><span>홍삼류</span></label>
                  </li>
                  <li>
                    <label><input type="checkbox" /><span>프리바이오틱스</span></label>
                  </li>
                  <li>
                    <label><input type="checkbox" /><span>오메가3</span></label>
                  </li>
                  <li class="direct">
                    <label><input type="checkbox" /><span>기타</span></label>
                    <input type="text" />
                  </li>
                </ul>
              </li>
              <li>
                <em class="question">하루 평균 물 섭취량은 어느정도 입니까?</em>
                <div class="guideinfo">
                  <ul>
                    <li>*종이컵 기준, 1컵= 150~180 mL</li>
                  </ul>
                </div>
                <ul class="answer type-col">
                  <li>
                    <label><input type="radio" checked /><span>일 1~3컵</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>일 4~6컵</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>일 7~9컵</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>일 10컵 이상</span></label>
                  </li>
                </ul>
              </li>
              <li>
                <em class="question">술을 얼마나 자주 마십니까?</em>
                <ul class="answer type-col">
                  <li>
                    <label><input type="radio" checked /><span>전혀 마시지 않는다</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>월 1회 이하</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>월 2~4회</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>주 2~3회</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>주 4회 이상</span></label>
                  </li>
                </ul>
              </li>
              <li>
                <em class="question">식생활은 얼마나 규칙적이십니까? </em>
                <div class="guideinfo">
                  <ul>
                    <li>* 규칙적인 식생활의 기준은 삼시 세끼를 제때에 규칙적으로 먹는 것을 의미합니다.</li>
                  </ul>
                </div>
                <ul class="answer type-col">
                  <li>
                    <label><input type="radio" checked /><span>매우 규칙적</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>약간 규칙적</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>보통</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>약간 불규칙</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>매우 불규칙</span></label>
                  </li>
                </ul>
              </li>
            </ol>
          </div>

          <h3 class="h3-title">Part V. 질환 과거력 설문</h3>
          <div class="formbox">
            <ol class="survey-list">
              <li>
                <em class="question">최근 한달 동안 항생제를 섭취하신 적이 있습 니까?</em>
                <ul class="answer type-col">
                  <li>
                    <label><input type="radio" checked /><span>없음</span></label>
                  </li>
                  <li>
                    <label><input type="radio" /><span>있음</span></label>
                  </li>
                </ul>
              </li>
              <li>
                <em class="question"
                  >아래 질환 중 해당되는 질환을 진단받은 적이 있습니까?
                  <span class="color-blue">(중복선택 가능)</span></em
                >
                <div class="tbl">
                  <table>
                    <caption>
                      해당되는 질환 중 진단 여부 설문
                    </caption>
                    <tbody>
                      <tr>
                        <th scope="row">염증성 장질환 (궤양성대장염/ 크론병)</th>
                        <td>
                          <label><input type="checkbox" /><span>없음</span></label>
                          <label><input type="checkbox" /><span>있음</span></label>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">과민성 대장 증후군</th>
                        <td>
                          <label><input type="checkbox" /><span>없음</span></label>
                          <label><input type="checkbox" /><span>있음</span></label>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">유당 불내증</th>
                        <td>
                          <label><input type="checkbox" /><span>없음</span></label>
                          <label><input type="checkbox" /><span>있음</span></label>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">대장, 직장염</th>
                        <td>
                          <label><input type="checkbox" /><span>없음</span></label>
                          <label><input type="checkbox" /><span>있음</span></label>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">대장 용종</th>
                        <td>
                          <label><input type="checkbox" /><span>없음</span></label>
                          <label><input type="checkbox" /><span>있음</span></label>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </li>
              <li>
                <em class="question"
                  >아래 면역질환 중 해당되는 질환을 진단받은 적이 있습니까?
                  <span class="color-blue">(중복선택 가능)</span></em
                >
                <div class="tbl">
                  <table>
                    <caption>
                      면역질환 중 진단 여부 설문
                    </caption>
                    <tbody>
                      <tr>
                        <th scope="row">천식</th>
                        <td>
                          <label><input type="checkbox" /><span>없음</span></label>
                          <label><input type="checkbox" /><span>있음</span></label>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">아토피 피부염</th>
                        <td>
                          <label><input type="checkbox" /><span>없음</span></label>
                          <label><input type="checkbox" /><span>있음</span></label>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </li>
            </ol>
          </div>
        </div>

        <div class="bottom-btns">
          <a href="javascript:;" class="btn full xlarge blue">설문 완료</a>
          <a href="javascript:;" class="btn full xlarge gray">취소</a>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Kitsurvey',
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

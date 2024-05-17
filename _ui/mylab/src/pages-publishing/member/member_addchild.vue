<template>
  <div class="member-add">
    <form>
      <fieldset>
        <legend>my LAB 멤버 추가</legend>
        <h2 class="h2-title">my LAB 멤버 추가</h2>

        <div class="guideinfo box">
          <h3 class="h3-title">추가할 멤버의 정보를 입력해주세요.</h3>
          <ul>
            <!-- 2022-04-12 상단 안내문구 수정 -->
            <li>
              * 이름, 생년월일, 성별은 추후 수정이 불가하며, 이메일과 주소는 등록하실 멤버가 추후 직접 수정할 수
              있습니다.
            </li>
          </ul>
        </div>

        <div class="formbox">
          <dl class="sort">
            <dt>유형</dt>
            <dd>
              <label><input type="radio" /><span>가족</span></label>
              <label><input type="radio" /><span>지인</span></label>
              <div class="guideinfo">
                <ul>
                  <li class="color-red">*만 14세 미만의 경우 가족만 등록이 가능합니다.</li>
                </ul>
              </div>
            </dd>
          </dl>
          <dl class="name">
            <dt><label for="username">이름</label></dt>
            <dd><input id="username" type="text" /></dd>
          </dl>
          <dl class="gender">
            <dt>성별</dt>
            <dd>
              <label><input type="radio" /><span>남자</span></label>
              <label><input type="radio" /><span>여자</span></label>
            </dd>
          </dl>
          <dl class="datepicker">
            <!-- datepicker일경우 dl에 datepicker 클래스 넣어주세요 -->
            <!-- 2022-03-04 클래스명 수정 -->
            <dt><label for="userdate">생년월일</label></dt>
            <dd>
              <Datepicker v-model="date" :enable-time-picker="false" />
              <!-- <div class="flexbox">
                <div id="userdate" class="selectbox">
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
              </div> -->
            </dd>
          </dl>
          <dl class="tel">
            <dt><label for="usertel">휴대폰</label></dt>
            <dd>
              <div class="flexbox">
                <div id="usertel" class="selectbox">
                  <select>
                    <option>선택</option>
                    <option>010</option>
                  </select>
                </div>
                <input type="text" />
                <span class="hyppen">-</span>
                <input type="text" />
              </div>
            </dd>
          </dl>
          <dl class="email">
            <dt><label for="useremail">이메일</label></dt>
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
          <address-input
            v-model:postCode="zipCode"
            v-model:prefixAddress="address"
            v-model:suffixAddress="addressDetail"
          />
        </div>

        <div class="guideinfo">
          <ul>
            <!-- 2022-03-08 문구 수정 -->
            <!-- 2022-04-12 하단 문구 띄어쓰기 수정 -->

            <li class="txt-black">
              <!-- 2022-05-13 li.txt-black 클래스 추가 :: PPT_20220516ver 16페이지에 대한 수정 -->
              ※ (주)한국암웨이 Member 또는 Customer 계정 이용자는 본인의 가족 외에 타인을 “my LAB 멤버"로 추가하실 수
              없습니다.
            </li>
            <li class="txt-black">
              ※ my LAB 멤버로 등록하려는 가족 혹은 지인의 동의를 먼저 구하고 정보를 입력하시기 바랍니다.
            </li>
          </ul>
        </div>

        <div class="agree-area">
          <!-- 2022-04-11 14세 미만의 멤버의 경우 약관영역 추가 -->
          <h3>14세 미만의 멤버의 경우 약관 대리동의 후 등록이 가능합니다.</h3>

          <div class="agreesummary">
            <label class="chkbig"><input type="checkbox" /><span>전체 동의하기</span></label
            ><!-- 2022-04-20 클래스 추가 -->
          </div>

          <div class="agreebox">
            <strong class="agree-tit">my LAB 서비스 이용약관 <span class="color-blue">(필수)</span></strong>
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
            <strong class="agree-tit">개인정보수집이용동의 <span class="color-blue">(필수)</span></strong>
            <div class="agree-cont ProseMirror">
              약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의
            </div>
            <div class="agree-check">
              <label><input type="checkbox" /><span>동의합니다</span></label>
            </div>
          </div>

          <div class="agreebox">
            <strong class="agree-tit">개인정보 제3자 제공 동의 <span class="color-blue">(필수)</span></strong>
            <div class="agree-cont ProseMirror">약관동의</div>
            <div class="agree-check">
              <label><input type="checkbox" /><span>동의합니다</span></label>
            </div>
          </div>
        </div>

        <div class="bottom-btns">
          <a href="javascript:;" class="btn full xlarge blue">저장</a>
          <a href="javascript:;" class="btn full xlarge gray">취소</a>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  name: 'Memberadd',
  components: {
    Datepicker,
  },
  data: function () {
    return {
      date: null,
      zipCode: null,
      address: null,
      addressDetail: null,
    }
  },
  mounted() {
    // page start
    sessionStorage.clear()
  },
  methods: {},
}
</script>

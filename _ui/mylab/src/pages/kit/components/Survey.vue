<script lang="ts" setup>
import { onMounted, ref, reactive, computed, watch } from 'vue'
import { useKitStore } from '~/stores/kit'
import { useUserStore } from '~/stores/user'
import dayjs from 'dayjs'
import AddressInput from '~/components/AddressInput.vue'
import { getSurveyInfo, getFirstSampleId, getKitTermsInfoItem } from '~/apis/kit'
import { usePromise } from '~/hooks/usePromise'
import { isEmpty } from 'lodash-es'
import { isEmail } from '~/utils/is'
import { isUnDef } from '../../../utils/is'
import { getMemberInfo } from '~/apis/user'

const props = defineProps({
  seq: {
    type: Number,
    default: null,
  },
  disabledSubmitButton: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['apply'])

const userStore = useUserStore()
const kitStore = useKitStore()
const isAddressChk = ref<boolean>(false)
const isEmailChk = ref<boolean>(false)

const subForm = ref<any>({
  emailId: '',
  domain: '',
  height1: 0,
  height2: 0,
  weight1: 0,
  weight2: 0,
  p4q8: [],
  p4q8Etc: '',
})
const form = reactive<any>({
  p1q1: undefined, // 성명
  p1q2: undefined, // 성별
  p1q3: undefined, // 생년월일
  p1q4: undefined, // 휴대폰 번호
  'p1q5-1': undefined, // prefixAddress
  'p1q5-2': undefined, // prefixAddress2
  'p1q5-3': undefined, // postCode
  p1q6: computed({
    // 이메일
    set(val: string) {
      const tmpArray = val.split('@')
      // isEmailChk.value = true
      subForm.value.emailId = tmpArray[0]
      subForm.value.domain = tmpArray[1]
    },
    get() {
      return subForm.value.emailId.concat('@', subForm.value.domain)
    },
  }),
  p1q7: computed({
    // 키
    set(val: string) {
      const tmpArray = val.split('.')
      subForm.value.height1 = Number(tmpArray[0])
      subForm.value.height2 = Number(tmpArray[1])
    },
    get() {
      return [subForm.value.height1, subForm.value.height2].join('.')
    },
  }),
  p1q8: computed({
    // 몸무게
    set(val: string) {
      const tmpArray = val.split('.')
      subForm.value.weight1 = Number(tmpArray[0])
      subForm.value.weight2 = Number(tmpArray[1])
    },
    get() {
      return [subForm.value.weight1 ?? '0', subForm.value.weight2 ?? '0'].join('.')
    },
  }),
  p2q1: undefined,
  p2q2: undefined,
  p2q3: undefined,
  p2q4: undefined,
  p3q1: undefined,
  p3q2: undefined,
  p3q3: undefined,
  p3q4: undefined,
  p3q5: undefined,
  p3q6: undefined,
  p4q1: undefined,
  p4q2: undefined,
  p4q3: undefined,
  p4q4: undefined,
  p4q5: undefined,
  p4q6: undefined,
  p4q7: undefined,
  p4q9: undefined,
  p5q1: undefined,
  p4q10: undefined,
  p4q11: undefined,
  'p2q5-1': undefined,
  'p2q5-2': undefined,
  'p2q5-3': undefined,
  'p2q5-4': undefined,
  'p5q2-1': undefined,
  'p5q2-2': undefined,
  'p5q2-3': undefined,
  'p5q2-4': undefined,
  'p5q2-5': undefined,
  'p5q3-1': undefined,
  'p5q3-2': undefined,
  'p4q8-1': computed({
    set(val: any) {
      val && subForm.value.p4q8.push('1')
    },
    get() {
      return subForm.value.p4q8.find((e) => e === '1') ? '1' : ''
    },
  }),
  'p4q8-2': computed({
    set(val: any) {
      val && subForm.value.p4q8.push('2')
    },
    get() {
      return subForm.value.p4q8.find((e) => e === '2') ? '1' : ''
    },
  }),
  'p4q8-3': computed({
    set(val: any) {
      val && subForm.value.p4q8.push('3')
    },
    get() {
      return subForm.value.p4q8.find((e) => e === '3') ? '1' : ''
    },
  }),
  'p4q8-4': computed({
    set(val: any) {
      val && subForm.value.p4q8.push('4')
    },
    get() {
      return subForm.value.p4q8.find((e) => e === '4') ? '1' : ''
    },
  }),
  'p4q8-5': computed({
    set(val: any) {
      val && subForm.value.p4q8.push('5')
    },
    get() {
      return subForm.value.p4q8.find((e) => e === '5') ? '1' : ''
    },
  }),
  'p4q8-6': computed({
    set(val: any) {
      if (!isEmpty(val)) {
        subForm.value.p4q8.push('6')
        subForm.value.p4q8Etc = val
      }
    },
    get() {
      return subForm.value.p4q8.find((e) => e === '6') ? subForm.value.p4q8Etc : ''
    },
  }),
  sampleId: kitStore.getKitItem?.id,
  'terms1-1': undefined, //분석대상물 수집 이용 동의
  'terms1-2': undefined, // 분석대상물 수집 이용 동의 여부 시간
  'terms2-1': undefined, // 개인정보제3자 제공 동의(선택)
  'terms2-2': undefined, // 개인정보제3자 제공 동의(선택) 여부 시간
  'terms3-1': undefined, // 민감정보제3자 제공 동의(선택)
  'terms3-2': undefined, // 민감정보제3자 제공 동의 여부 시간
  firstSampleId: undefined, // 최초 샘플 번호
})

const email = ref<HTMLInputElement>()
const address = ref<HTMLInputElement>()
const height = ref<HTMLInputElement>()
const weight = ref<HTMLInputElement>()

const p2q1 = ref<HTMLInputElement>()
const p2q2 = ref<HTMLInputElement>()
const p2q3 = ref<HTMLInputElement>()
const p2q4 = ref<HTMLInputElement>()
const p2q5_1 = ref<HTMLInputElement>()
const p2q5_2 = ref<HTMLInputElement>()
const p2q5_3 = ref<HTMLInputElement>()
const p2q5_4 = ref<HTMLInputElement>()
const p3q1 = ref<HTMLInputElement>()
const p3q2 = ref<HTMLInputElement>()
const p3q3 = ref<HTMLInputElement>()
const p3q4 = ref<HTMLInputElement>()
const p3q5 = ref<HTMLInputElement>()
const p3q6 = ref<HTMLInputElement>()
const p4q1 = ref<HTMLInputElement>()
const p4q2 = ref<HTMLInputElement>()
const p4q3 = ref<HTMLInputElement>()
const p4q4 = ref<HTMLInputElement>()
const p4q5 = ref<HTMLInputElement>()
const p4q6 = ref<HTMLInputElement>()
const p4q7 = ref<HTMLInputElement>()
const p4q9 = ref<HTMLInputElement>()
const p4q10 = ref<HTMLInputElement>()
const p4q11 = ref<HTMLInputElement>()
const p5q1 = ref<HTMLInputElement>()
const p5q2_1 = ref<HTMLInputElement>()
const p5q2_2 = ref<HTMLInputElement>()
const p5q2_3 = ref<HTMLInputElement>()
const p5q2_4 = ref<HTMLInputElement>()
const p5q2_5 = ref<HTMLInputElement>()
const p5q3_1 = ref<HTMLInputElement>()
const p5q3_2 = ref<HTMLInputElement>()
const refObj = {
  p2q1,
  p2q2,
  p2q3,
  p2q4,
  p2q5_1,
  p2q5_2,
  p2q5_3,
  p2q5_4,
  p3q1,
  p3q2,
  p3q3,
  p3q4,
  p3q5,
  p3q6,
  p4q1,
  p4q2,
  p4q3,
  p4q4,
  p4q5,
  p4q6,
  p4q7,
  p4q9,
  p4q10,
  p4q11,
  p5q1,
  p5q2_1,
  p5q2_2,
  p5q2_3,
  p5q2_4,
  p5q2_5,
  p5q3_1,
  p5q3_2,
}
async function radioCheckFn() {
  const radioCheckKeys = Object.keys(refObj)

  let radioCheckProp = ''

  for (const tmp of radioCheckKeys) {
    if (!form[tmp.replace('_', '-')]) {
      radioCheckProp = tmp
      break
    }
  }
  return radioCheckProp
}
async function validation(): Promise<boolean> {
  // 건강 설문조사 유효성 검사

  const radioProp = await radioCheckFn()
  if (isEmpty(form.p1q6) || !isEmail(form.p1q6)) {
    window.alert('이메일을 확인해 주세요')
    email.value?.focus()
    return false
  } else if (!form['p1q5-1'] || !form['p1q5-2'] || !form['p1q5-3']) {
    window.alert('주소를 확인해 주세요')
    address.value?.focus()
    return false
  } else if (!form.p1q7 || !Number(form.p1q7) || Number(form.p1q7) < 0) {
    window.alert('키(신장)를 확인해 주세요')
    height.value?.focus()
    return false
  } else if (!form.p1q7 || !Number(form.p1q8) || Number(form.p1q8) < 0) {
    window.alert('몸무게를 확인해 주세요')
    weight.value?.focus()
    return false
  } else if (radioProp) {
    window.alert('반드시 설문내용을 선택하여 주세요')
    refObj[radioProp]?.value?.focus()
    return false
  }
  if (!form.firstSampleId) {
    form.firstSampleId = ''
  }
  return true
}

async function saveForm() {
  if (!(await validation())) {
    return
  }
  emits('apply', form)
}
function defaultInit() {
  const userInfo = kitStore.getMemberInfo || userStore.getUserInfo

  form.p1q1 = userInfo?.username
  form.p1q2 = userInfo?.sex
  form.p1q3 = userInfo?.birth // dayjs(userInfo?.birth, 'YYYY-MM-DD').format('YYYY년 MM월 DD일')
  form.p1q4 = userInfo?.mobile
  if (userInfo) {
    form['p1q5-1'] = userInfo?.address ?? '' // prefixAddress
    form['p1q5-2'] = userInfo?.addressDetail ?? '' // prefixAddress2
    form['p1q5-3'] = userInfo?.zipCode ?? '' // postCode

    const emailArray = userInfo?.email?.split('@')
    if (emailArray && emailArray?.length === 2) {
      subForm.value.emailId = emailArray[0]
      subForm.value.domain = emailArray[1]
    }
  }
}

const { callPromiseFn: getKitTermsInfoItemFn, data: kitSurveyInfoList } =
  usePromise<typeof getKitTermsInfoItem>(getKitTermsInfoItem)

onMounted(async () => {
  await getKitTermsInfoItemFn(form.sampleId)
  if (kitSurveyInfoList.value) {
    const tmpSurveyInfo = kitSurveyInfoList.value?.map((e) => ({
      id: e.termsInfo.id,
      agree: e.agree,
      createdDate: e.termsInfo.createdDate,
    }))
    form['terms1-1'] = tmpSurveyInfo[0]?.agree // 분석대상물 수집 이용 동의
    form['terms1-2'] = tmpSurveyInfo[0]?.createdDate // 분석대상물 수집 이용 동의 여부 시간
    form['terms2-1'] = tmpSurveyInfo[1]?.agree // 개인정보제3자 제공 동의(선택)
    form['terms2-2'] = tmpSurveyInfo[1]?.createdDate // 개인정보제3자 제공 동의(선택) 여부 시간
    form['terms3-1'] = tmpSurveyInfo[2]?.agree // 민감정보제3자 제공 동의(선택)
    form['terms3-2'] = tmpSurveyInfo[2]?.createdDate // 민감정보제3자 제공 동의 여부 시간\
  }
})
function initParam(payload: any = undefined) {
  // 프로필 정보
  defaultInit()
  if (payload) {
    if (firstSampleId) {
      form.firstSampleId = firstSampleId
    }
    const keys = Object.keys(payload)
    for (let key of keys) {
      // if (key === 'p1q5-1') isAddressChk.value = true
      form[key] = payload[key]
    }
  }
}
const { isLoading, callPromiseFn, data: surveyData } = usePromise<typeof getSurveyInfo>(getSurveyInfo)
const { callPromiseFn: fetchFirstSampleId, data: firstSampleId } = usePromise<typeof getFirstSampleId>(getFirstSampleId)
// getFirstSampleId
async function initOfEdit() {
  await callPromiseFn(form.sampleId)
  // await fetchFirstSampleId(String(props.seq))
  initParam(surveyData.value?.surveyData)
}

const { callPromiseFn: getMemberInfoAPI } = usePromise<typeof getMemberInfo>(getMemberInfo)

onMounted(async () => {
  const id = kitStore.getMemberInfo?.id
  id && (await getMemberInfoAPI(id).then((res) => res && kitStore.setMemberInfo(res)))

  if (props.seq) {
    // 수정
    initOfEdit()
  } else {
    // 신규
    initParam()
  }
})
function numberHeight1(e: Event) {
  const target = e.target as HTMLInputElement
  subForm.value.height1 = target.value
}
function numberHeight2(e: Event) {
  const target = e.target as HTMLInputElement
  subForm.value.height2 = target.value
}
function numberWeight1(e: Event) {
  const target = e.target as HTMLInputElement
  subForm.value.weight1 = target.value
}
function numberWeight2(e: Event) {
  const target = e.target as HTMLInputElement
  subForm.value.weight2 = target.value
}
watch(
  () => subForm.value.height1,
  (value) => {
    subForm.value.height1 = Number(String(value).replace(/[^0-9]/g, ''))
  }
)
watch(
  () => subForm.value.height2,
  (value) => {
    subForm.value.height2 = Number(
      String(value)
        .replace(/[^0-9]/g, '')
        .slice(-1)
    )
  }
)
watch(
  () => subForm.value.weight1,
  (value) => {
    subForm.value.weight1 = Number(String(value).replace(/[^0-9]/g, ''))
  }
)
watch(
  () => subForm.value.weight2,
  (value) => {
    subForm.value.weight2 = Number(
      String(value)
        .replace(/[^0-9]/g, '')
        .slice(-1)
    )
  }
)
</script>

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
                <p class="answer">{{ form.p1q1 }}</p>
              </li>
              <li>
                <em class="question">2. 성별</em>
                <p class="answer">{{ form.p1q2 }}</p>
              </li>
              <li>
                <em class="question">3. 생년월일을 입력해 주세요</em>
                <p class="answer">{{ dayjs(form.p1q3, 'YYYY-MM-DD').format('YYYY년 MM월 DD일') }}</p>
              </li>
              <li>
                <em class="question">4. 프로필에 등록된 아래 휴대폰번호를 확인해주세요.</em>
                <p class="answer">{{ form.p1q4 }}</p>
              </li>
              <li>
                <em class="question"
                  >5. 프로필에 등록된 아래 주소로 마이크로바이옴 결과 레포트가 발송될 예정입니다. 받으실 주소를
                  수정하겠습니까?</em
                >
                <dl class="address">
                  <address-input
                    v-model:postCode="form['p1q5-3']"
                    v-model:prefixAddress="form['p1q5-1']"
                    v-model:suffixAddress="form['p1q5-2']"
                    :is-disabled="!isAddressChk"
                  >
                    <template #label>
                      <span class="hide">주소</span>
                      <label class="chkbig"
                        ><input ref="address" v-model="isAddressChk" type="checkbox" /><span>예</span></label
                      >
                    </template>
                    <!-- <div class="guideinfo">
                      <ul>
                        <li class="color-red">* 주소지 변경 시, 본인의 프로필 주소 정보도 함께 변경됩니다.</li>
                      </ul>
                    </div> -->
                  </address-input>
                </dl>
              </li>
              <li>
                <em class="question"
                  >6. 프로필에 등록된 아래 E-mail 주소로 마이크 로바이옴 레포트가 발송될 예정입니다. 수신할 이메일
                  주소를 수정하겠습니까?</em
                >
                <dl class="email">
                  <dt>
                    <span class="hide">이메일</span>
                    <label class="chkbig"
                      ><input ref="email" v-model="isEmailChk" type="checkbox" /><span>예</span></label
                    >
                  </dt>
                  <dd>
                    <input id="useremail" v-model="subForm.emailId" type="text" :disabled="!isEmailChk" />

                    <div class="emailbox">
                      <span class="hyppen">@</span>
                      <input v-model="subForm.domain" type="text" :disabled="!isEmailChk" />
                      <!-- <div class="selectbox"> -->
                      <!-- <select v-model="subForm.domain" :disabled="!isEmailChk">
                          <option disabled value="">이메일 선택</option>
                          <option>gmail.com</option>
                          <option>naver.com</option>
                          <option>daum.net</option>
                        </select> -->
                      <!-- </div> -->
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
                    <input id="tall" ref="height" :value="subForm.height1" type="number" @input="numberHeight1" />
                    <span class="dot">.</span>
                    <input :value="subForm.height2" type="number" @input="numberHeight2" />
                    <span class="unit">cm</span>
                  </dd>
                </dl>
              </li>
              <li>
                <em class="question">8. 현재 몸무게(숫자만)를 입력해주세요.</em>
                <dl class="inbody">
                  <dt class="hide"><label for="weigh">몸무게</label></dt>
                  <dd>
                    <input id="weigh" ref="weight" :value="subForm.weight1" type="number" @input="numberWeight1" />
                    <span class="dot">.</span>
                    <input :value="subForm.weight2" type="number" @input="numberWeight2" />
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
                    <label
                      >1. <input ref="p2q1" v-model="form.p2q1" type="radio" value="1" /><span>주 0~1회</span></label
                    >
                  </li>
                  <li>
                    <label>2. <input v-model="form.p2q1" type="radio" value="2" /><span>주 2~3회</span></label>
                  </li>
                  <li>
                    <label>3. <input v-model="form.p2q1" type="radio" value="3" /><span>주 4~5회</span></label>
                  </li>
                  <li>
                    <label>4. <input v-model="form.p2q1" type="radio" value="4" /><span>주 6~11회</span></label>
                  </li>
                  <li>
                    <label>5. <input v-model="form.p2q1" type="radio" value="5" /><span>주 12~14회</span></label>
                  </li>
                  <li>
                    <label>6. <input v-model="form.p2q1" type="radio" value="6" /><span>주 15~20회</span></label>
                  </li>
                  <li>
                    <label>7. <input v-model="form.p2q1" type="radio" value="7" /><span>주 21회 이상</span></label>
                  </li>
                </ul>
              </li>
              <li>
                <em class="question">최근 1주 동안 평균적으로 배변 시 변기에 앉아 있는 시간은 어느 정도인가요?</em>
                <ul class="answer type-col">
                  <li>
                    <label>1. <input ref="p2q2" v-model="form.p2q2" type="radio" value="1" /><span>5분 내</span></label>
                  </li>
                  <li>
                    <label>2. <input v-model="form.p2q2" type="radio" value="2" /><span>5~10분</span></label>
                  </li>
                  <li>
                    <label>3. <input v-model="form.p2q2" type="radio" value="3" /><span>10~30분</span></label>
                  </li>
                  <li>
                    <label>4. <input v-model="form.p2q2" type="radio" value="4" /><span>30분 이상</span></label>
                  </li>
                </ul>
              </li>
              <li>
                <em class="question">최근 1주 동안 평균적으로 배변 활동을 했던 시간은 주로 하루 중 언제인가요?</em>
                <ul class="answer type-col">
                  <li>
                    <label
                      >1. <input ref="p2q3" v-model="form.p2q3" type="radio" value="1" /><span>주로 아침</span></label
                    >
                  </li>
                  <li>
                    <label>2. <input v-model="form.p2q3" type="radio" value="2" /><span>주로 점심</span></label>
                  </li>
                  <li>
                    <label>3. <input v-model="form.p2q3" type="radio" value="3" /><span>주로 저녁</span></label>
                  </li>
                  <li>
                    <label>4. <input v-model="form.p2q3" type="radio" value="4" /><span>불규칙, 매번 다름</span></label>
                  </li>
                </ul>
              </li>
              <li>
                <em class="question">최근 1주 동안 평균 변 상태와 가장 가까운 것은 무엇인가요?</em>
                <ul class="answer type-img">
                  <li>
                    <label
                      >1.
                      <input ref="p2q4" v-model="form.p2q4" type="radio" value="1" />
                      <span>
                        <img src="/resource/images/views/kitsurvey_img01.png" alt="" />
                        <em>마치 견과류처럼 딱딱하게 분리된 덩어리들 (배변하기 어려움)</em>
                      </span>
                    </label>
                  </li>
                  <li>
                    <label
                      >2.
                      <input v-model="form.p2q4" type="radio" value="2" />
                      <span>
                        <img src="/resource/images/views/kitsurvey_img02.png" alt="" />
                        <em>울퉁불퉁한 소시지 형태</em>
                      </span>
                    </label>
                  </li>
                  <li>
                    <label
                      >3.
                      <input v-model="form.p2q4" type="radio" value="3" />
                      <span>
                        <img src="/resource/images/views/kitsurvey_img03.png" alt="" />
                        <em>소시지 형태지만 밖에 금이 가 있음</em>
                      </span>
                    </label>
                  </li>
                  <li>
                    <label
                      >4.
                      <input v-model="form.p2q4" type="radio" value="4" />
                      <span>
                        <img src="/resource/images/views/kitsurvey_img04.png" alt="" />
                        <em>소시지나 뱀을 닮았고 매끄럽고 부드럽다</em>
                      </span>
                    </label>
                  </li>
                  <li>
                    <label
                      >5.
                      <input v-model="form.p2q4" type="radio" value="5" />
                      <span>
                        <img src="/resource/images/views/kitsurvey_img05.png" alt="" />
                        <em>윤곽이 뚜렷한 가장자리의 부드러운 방울들 (배변이 쉬움)</em>
                      </span>
                    </label>
                  </li>
                  <li>
                    <label
                      >6.
                      <input v-model="form.p2q4" type="radio" value="6" />
                      <span>
                        <img src="/resource/images/views/kitsurvey_img06.png" alt="" />
                        <em>가장자리의 거품 같은 조각, 곤죽 같은 대변</em>
                      </span>
                    </label>
                  </li>
                  <li>
                    <label
                      >7.
                      <input v-model="form.p2q4" type="radio" value="7" />
                      <span>
                        <img src="/resource/images/views/kitsurvey_img07.png" alt="" />
                        <em>묽고 고체 조각이 없이 전부 액체</em>
                      </span>
                    </label>
                  </li>
                </ul>
              </li>
              <li>
                <em class="question">최근 1주 동안 다음 항목들에 대해 어떻게 느끼셨는지 각각 응답해 주세요</em>

                <div class="quesitonbox">
                  <p>식사 후 배가 만성적으로 아프며, 배변 후 복통이 호전되거나 더 심해진다.</p>
                  <ul class="answer">
                    <li>
                      <label
                        >1. <input ref="p2q5_1" v-model="form['p2q5-1']" type="radio" value="1" /><span
                          >매우 편하다. 증상이 전혀 없다.</span
                        ></label
                      >
                    </li>
                    <li>
                      <label
                        >2. <input v-model="form['p2q5-1']" type="radio" value="2" /><span
                          >편한 편이다. 증상이 거의 없다.</span
                        ></label
                      >
                    </li>
                    <li>
                      <label
                        >3. <input v-model="form['p2q5-1']" type="radio" value="3" /><span>약간 불편하다.</span></label
                      >
                    </li>
                    <li>
                      <label
                        >4. <input v-model="form['p2q5-1']" type="radio" value="4" /><span>매우 불편하다.</span></label
                      >
                    </li>
                  </ul>
                </div>

                <div class="quesitonbox">
                  <p>식사 후 배가 빵빵해지고(팽만), 가스 차는 느낌이 불편하다.</p>
                  <ul class="answer">
                    <li>
                      <label
                        >1. <input ref="p2q5_2" v-model="form['p2q5-2']" type="radio" value="1" /><span
                          >매우 편하다. 증상이 전혀 없다.</span
                        ></label
                      >
                    </li>
                    <li>
                      <label
                        >2. <input v-model="form['p2q5-2']" type="radio" value="2" /><span
                          >편한 편이다. 증상이 거의 없다.</span
                        ></label
                      >
                    </li>
                    <li>
                      <label
                        >3. <input v-model="form['p2q5-2']" type="radio" value="3" /><span>약간 불편하다.</span></label
                      >
                    </li>
                    <li>
                      <label
                        >4. <input v-model="form['p2q5-2']" type="radio" value="4" /><span>매우 불편하다.</span></label
                      >
                    </li>
                  </ul>
                </div>

                <div class="quesitonbox">
                  <p>배변 후에도 찝찝한 느낌이 들거나 다시 화장실에 가고 싶다.</p>
                  <ul class="answer">
                    <li>
                      <label
                        >1. <input ref="p2q5_3" v-model="form['p2q5-3']" type="radio" value="1" /><span
                          >매우 편하다. 증상이 전혀 없다.</span
                        ></label
                      >
                    </li>
                    <li>
                      <label
                        >2. <input v-model="form['p2q5-3']" type="radio" value="2" /><span
                          >편한 편이다. 증상이 거의 없다.</span
                        ></label
                      >
                    </li>
                    <li>
                      <label
                        >3. <input v-model="form['p2q5-3']" type="radio" value="3" /><span>약간 불편하다.</span></label
                      >
                    </li>
                    <li>
                      <label
                        >4. <input v-model="form['p2q5-3']" type="radio" value="4" /><span>매우 불편하다.</span></label
                      >
                    </li>
                  </ul>
                </div>

                <div class="quesitonbox">
                  <p>매끼 식사할 때마다 바로 화장실을 간다.</p>
                  <ul class="answer">
                    <li>
                      <label
                        >1. <input ref="p2q5_4" v-model="form['p2q5-4']" type="radio" value="1" /><span
                          >매우 편하다. 증상이 전혀 없다.</span
                        ></label
                      >
                    </li>
                    <li>
                      <label
                        >2. <input v-model="form['p2q5-4']" type="radio" value="2" /><span
                          >편한 편이다. 증상이 거의 없다.</span
                        ></label
                      >
                    </li>
                    <li>
                      <label
                        >3. <input v-model="form['p2q5-4']" type="radio" value="3" /><span>약간 불편하다.</span></label
                      >
                    </li>
                    <li>
                      <label
                        >4. <input v-model="form['p2q5-4']" type="radio" value="4" /><span>매우 불편하다.</span></label
                      >
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
                    <label
                      >1. <input ref="p3q1" v-model="form.p3q1" type="radio" value="1" /><span>5시간 미만</span></label
                    >
                  </li>
                  <li>
                    <label
                      >2. <input v-model="form.p3q1" type="radio" value="2" /><span>5시간 이상 6시간 미만</span></label
                    >
                  </li>
                  <li>
                    <label
                      >3. <input v-model="form.p3q1" type="radio" value="3" /><span>6시간 이상 7시간 미만</span></label
                    >
                  </li>
                  <li>
                    <label
                      >4. <input v-model="form.p3q1" type="radio" value="4" /><span>7시간 이상 8시간 미만</span></label
                    >
                  </li>
                  <li>
                    <label
                      >5. <input v-model="form.p3q1" type="radio" value="5" /><span>8시간 이상 9시간 미만</span></label
                    >
                  </li>
                  <li>
                    <label>6. <input v-model="form.p3q1" type="radio" value="6" /><span>9시간 이상</span></label>
                  </li>
                </ul>
              </li>
              <li>
                <em class="question">최근 1주 동안 30분이상 숨이 찰 정도의 운동을 한 횟수는 얼마나 됩니까?</em>
                <ul class="answer type-col">
                  <li>
                    <label
                      >1. <input ref="p3q2" v-model="form.p3q2" type="radio" value="1" /><span
                        >거의 하지않음</span
                      ></label
                    >
                  </li>
                  <li>
                    <label>2. <input v-model="form.p3q2" type="radio" value="2" /><span>주 1~2회</span></label>
                  </li>
                  <li>
                    <label>3. <input v-model="form.p3q2" type="radio" value="3" /><span>주 3~4회</span></label>
                  </li>
                  <li>
                    <label>4. <input v-model="form.p3q2" type="radio" value="4" /><span>주 5~6회</span></label>
                  </li>
                  <li>
                    <label>5. <input v-model="form.p3q2" type="radio" value="5" /><span>매일</span></label>
                  </li>
                </ul>
              </li>
              <li>
                <em class="question">최근 1개월 동안 피로도는 얼마나 됩니까?</em>
                <ul class="answer">
                  <li>
                    <label
                      >1. <input ref="p3q3" v-model="form.p3q3" type="radio" value="1" /><span
                        >전혀 피곤하지 않음</span
                      ></label
                    >
                  </li>
                  <li>
                    <label>2. <input v-model="form.p3q3" type="radio" value="2" /><span>약간 피곤함</span></label>
                  </li>
                  <li>
                    <label>3. <input v-model="form.p3q3" type="radio" value="3" /><span>피곤함</span></label>
                  </li>
                  <li>
                    <label>4. <input v-model="form.p3q3" type="radio" value="4" /><span>매우 피곤함</span></label>
                  </li>
                </ul>
              </li>
              <li>
                <em class="question">최근 1개월 동안 집중력, 기억력은 얼마나 됩니까?</em>
                <ul class="answer type-col">
                  <li>
                    <label
                      >1. <input ref="p3q4" v-model="form.p3q4" type="radio" value="1" /><span
                        >아주 안 좋음</span
                      ></label
                    >
                  </li>
                  <li>
                    <label>2. <input v-model="form.p3q4" type="radio" value="2" /><span>안 좋은 편</span></label>
                  </li>
                  <li>
                    <label>3. <input v-model="form.p3q4" type="radio" value="3" /><span>좋은 편</span></label>
                  </li>
                  <li>
                    <label>4. <input v-model="form.p3q4" type="radio" value="4" /><span>아주 좋음</span></label>
                  </li>
                </ul>
              </li>
              <li>
                <em class="question">최근 1개월 동안 스트레스 정도는 얼마나 됩니까?</em>
                <ul class="answer type-col">
                  <li>
                    <label
                      >1. <input ref="p3q5" v-model="form.p3q5" type="radio" value="1" /><span>전혀 없음</span></label
                    >
                  </li>
                  <li>
                    <label>2. <input v-model="form.p3q5" type="radio" value="2" /><span>약간 있음</span></label>
                  </li>
                  <li>
                    <label>3. <input v-model="form.p3q5" type="radio" value="3" /><span>많음</span></label>
                  </li>
                  <li>
                    <label>4. <input v-model="form.p3q5" type="radio" value="4" /><span>아주 많음</span></label>
                  </li>
                </ul>
              </li>
              <li>
                <em class="question">흡연은 얼마나 하십니까?</em>
                <ul class="answer type-col">
                  <li>
                    <label
                      >1. <input ref="p3q6" v-model="form.p3q6" type="radio" value="1" /><span>흡연 안함</span></label
                    >
                  </li>
                  <li>
                    <label>2. <input v-model="form.p3q6" type="radio" value="2" /><span>금연 중</span></label>
                  </li>
                  <li>
                    <label>3. <input v-model="form.p3q6" type="radio" value="3" /><span>가끔 흡연 중</span></label>
                  </li>
                  <li>
                    <label>4. <input v-model="form.p3q6" type="radio" value="4" /><span>매일 흡연 중</span></label>
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
                <em class="question">한번 식사할 때 김치를 제외한 채소류를 몇가지나 드십니까?</em>
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
                    <label
                      >1. <input ref="p4q1" v-model="form.p4q1" type="radio" value="1" /><span>먹지 않음</span></label
                    >
                  </li>
                  <li>
                    <label>2. <input v-model="form.p4q1" type="radio" value="2" /><span>1가지</span></label>
                  </li>
                  <li>
                    <label>3. <input v-model="form.p4q1" type="radio" value="3" /><span>2가지</span></label>
                  </li>
                  <li>
                    <label>4. <input v-model="form.p4q1" type="radio" value="4" /><span>3가지</span></label>
                  </li>
                  <li>
                    <label>5. <input v-model="form.p4q1" type="radio" value="5" /><span>4가지 이상</span></label>
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
                    <label
                      >1. <input ref="p4q2" v-model="form.p4q2" type="radio" value="1" /><span
                        >2주 1회 이하</span
                      ></label
                    >
                  </li>
                  <li>
                    <label>2. <input v-model="form.p4q2" type="radio" value="2" /><span>주 1~3회</span></label>
                  </li>
                  <li>
                    <label>3. <input v-model="form.p4q2" type="radio" value="3" /><span>주 4~6회</span></label>
                  </li>
                  <li>
                    <label>4. <input v-model="form.p4q2" type="radio" value="4" /><span>일 1회</span></label>
                  </li>
                  <li>
                    <label>5. <input v-model="form.p4q2" type="radio" value="5" /><span>일 2회 이상</span></label>
                  </li>
                </ul>
              </li>
              <li>
                <em class="question">고기(닭고기, 소고기, 돼지고기 등)를 얼마나 자주 드십니까?</em>
                <ul class="answer type-col">
                  <li>
                    <label
                      >1. <input ref="p4q3" v-model="form.p4q3" type="radio" value="1" /><span
                        >2주 1회 이하</span
                      ></label
                    >
                  </li>
                  <li>
                    <label>2. <input v-model="form.p4q3" type="radio" value="2" /><span>주 1~3회</span></label>
                  </li>
                  <li>
                    <label>3. <input v-model="form.p4q3" type="radio" value="3" /><span>주 4~6회</span></label>
                  </li>
                  <li>
                    <label>4. <input v-model="form.p4q3" type="radio" value="4" /><span>일 1회</span></label>
                  </li>
                  <li>
                    <label>5. <input v-model="form.p4q3" type="radio" value="5" /><span>일 2회 이상</span></label>
                  </li>
                </ul>
              </li>
              <li>
                <em class="question">발효음식(김치, 된장, 요거트 등)을 얼마나 자주 드십니까?</em>
                <ul class="answer type-col">
                  <li>
                    <label
                      >1. <input ref="p4q4" v-model="form.p4q4" type="radio" value="1" /><span
                        >2주 1회 이하</span
                      ></label
                    >
                  </li>
                  <li>
                    <label>2. <input v-model="form.p4q4" type="radio" value="2" /><span>주 1~3회</span></label>
                  </li>
                  <li>
                    <label>3. <input v-model="form.p4q4" type="radio" value="3" /><span>주 4~6회</span></label>
                  </li>
                  <li>
                    <label>4. <input v-model="form.p4q4" type="radio" value="4" /><span>일 1회</span></label>
                  </li>
                  <li>
                    <label>5. <input v-model="form.p4q4" type="radio" value="5" /><span>일 2회 이상</span></label>
                  </li>
                </ul>
              </li>
              <li>
                <em class="question"
                  >과자(초콜릿, 사탕 포함) 또는 달거나 기름진 빵(케이크, 도넛, 단팥빵 등)을 얼마나 자주 드셨습니까?</em
                >
                <ul class="answer type-col">
                  <li>
                    <label
                      >1. <input ref="p4q5" v-model="form.p4q5" type="radio" value="1" /><span
                        >2주 1회 이하</span
                      ></label
                    >
                  </li>
                  <li>
                    <label>2. <input v-model="form.p4q5" type="radio" value="2" /><span>주 1~3회</span></label>
                  </li>
                  <li>
                    <label>3.<input v-model="form.p4q5" type="radio" value="3" /><span>주 4~6회</span></label>
                  </li>
                  <li>
                    <label>4. <input v-model="form.p4q5" type="radio" value="4" /><span>일 1회</span></label>
                  </li>
                  <li>
                    <label>5. <input v-model="form.p4q5" type="radio" value="5" /><span>일 2회 이상</span></label>
                  </li>
                </ul>
              </li>
              <li>
                <em class="question">가공식품이나 패스트푸드를 얼마나 자주 드셨습니까?</em>
                <ul class="answer type-col">
                  <li>
                    <label
                      >1. <input ref="p4q6" v-model="form.p4q6" type="radio" value="1" /><span
                        >거의 먹지 않음</span
                      ></label
                    >
                  </li>
                  <li>
                    <label>2. <input v-model="form.p4q6" type="radio" value="2" /><span>2주 1회</span></label>
                  </li>
                  <li>
                    <label>3. <input v-model="form.p4q6" type="radio" value="3" /><span>주 1~3회</span></label>
                  </li>
                  <li>
                    <label>4. <input v-model="form.p4q6" type="radio" value="4" /><span>주 4~6회</span></label>
                  </li>
                  <li>
                    <label>5. <input v-model="form.p4q6" type="radio" value="5" /><span>매일</span></label>
                  </li>
                </ul>
              </li>
              <li>
                <em class="question">평소에 음식을 얼마나 짜게 먹는 편입니까?</em>
                <ul class="answer type-col">
                  <li>
                    <label
                      >1. <input ref="p4q7" v-model="form.p4q7" type="radio" value="1" /><span>매우 싱겁게</span></label
                    >
                  </li>
                  <li>
                    <label>2. <input v-model="form.p4q7" type="radio" value="2" /><span>약간 싱겁게</span></label>
                  </li>
                  <li>
                    <label>3. <input v-model="form.p4q7" type="radio" value="3" /><span>보통</span></label>
                  </li>
                  <li>
                    <label>4. <input v-model="form.p4q7" type="radio" value="4" /><span>약간 짜게</span></label>
                  </li>
                  <li>
                    <label>5. <input v-model="form.p4q7" type="radio" value="5" /><span>매우 짜게</span></label>
                  </li>
                </ul>
              </li>
              <li>
                <em class="question"
                  >최근 섭취하신 보조식품이 있으면 모두 선택해 주십시오.
                  <span class="color-blue">(중복 선택 가능)</span></em
                >
                <ul class="answer type-col">
                  <li>
                    <label
                      >1. <input ref="p4q8" v-model="subForm.p4q8" type="checkbox" value="1" /><span
                        >유산균</span
                      ></label
                    >
                  </li>
                  <li>
                    <label>2. <input v-model="subForm.p4q8" type="checkbox" value="2" /><span>비타민류</span></label>
                  </li>
                  <li>
                    <label>3. <input v-model="subForm.p4q8" type="checkbox" value="3" /><span>홍삼류</span></label>
                  </li>
                  <li>
                    <label
                      >4. <input v-model="subForm.p4q8" type="checkbox" value="4" /><span>프리바이오틱스</span></label
                    >
                  </li>
                  <li>
                    <label>5. <input v-model="subForm.p4q8" type="checkbox" value="5" /><span>오메가3</span></label>
                  </li>
                  <li class="direct">
                    <label>6. <input v-model="subForm.p4q8" type="checkbox" value="6" /><span>기타</span></label>
                    <input v-model="subForm.p4q8Etc" type="text" />
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
                    <label
                      >1. <input ref="p4q9" v-model="form.p4q9" type="radio" value="1" /><span>일 1~3컵</span></label
                    >
                  </li>
                  <li>
                    <label>2. <input v-model="form.p4q9" type="radio" value="2" /><span>일 4~6컵</span></label>
                  </li>
                  <li>
                    <label>3. <input v-model="form.p4q9" type="radio" value="3" /><span>일 7~9컵</span></label>
                  </li>
                  <li>
                    <label>4. <input v-model="form.p4q9" type="radio" value="4" /><span>일 10컵 이상</span></label>
                  </li>
                </ul>
              </li>
              <li>
                <em class="question">술을 얼마나 자주 마십니까?</em>
                <ul class="answer type-col">
                  <li>
                    <label
                      >1. <input ref="p4q10" v-model="form.p4q10" type="radio" value="1" /><span
                        >전혀 마시지 않는다</span
                      ></label
                    >
                  </li>
                  <li>
                    <label>2. <input v-model="form.p4q10" type="radio" value="2" /><span>월 1회 이하</span></label>
                  </li>
                  <li>
                    <label>3. <input v-model="form.p4q10" type="radio" value="3" /><span>월 2~4회</span></label>
                  </li>
                  <li>
                    <label>4. <input v-model="form.p4q10" type="radio" value="4" /><span>주 2~3회</span></label>
                  </li>
                  <li>
                    <label>5. <input v-model="form.p4q10" type="radio" value="5" /><span>주 4회 이상</span></label>
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
                    <label
                      >1. <input ref="p4q11" v-model="form.p4q11" type="radio" value="1" /><span
                        >매우 규칙적</span
                      ></label
                    >
                  </li>
                  <li>
                    <label>2. <input v-model="form.p4q11" type="radio" value="2" /><span>약간 규칙적</span></label>
                  </li>
                  <li>
                    <label>3. <input v-model="form.p4q11" type="radio" value="3" /><span>보통</span></label>
                  </li>
                  <li>
                    <label>4. <input v-model="form.p4q11" type="radio" value="4" /><span>약간 불규칙</span></label>
                  </li>
                  <li>
                    <label>5. <input v-model="form.p4q11" type="radio" value="5" /><span>매우 불규칙</span></label>
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
                    <label>1. <input ref="p5q1" v-model="form.p5q1" type="radio" value="1" /><span>없음</span></label>
                  </li>
                  <li>
                    <label>2. <input v-model="form.p5q1" type="radio" value="2" /><span>있음</span></label>
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
                          <label
                            >1. <input ref="p5q2_1" v-model="form['p5q2-1']" type="radio" value="1" /><span
                              >없음</span
                            ></label
                          >
                          <label>2. <input v-model="form['p5q2-1']" type="radio" value="2" /><span>있음</span></label>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">과민성 대장 증후군</th>
                        <td>
                          <label
                            >1. <input ref="p5q2_2" v-model="form['p5q2-2']" type="radio" value="1" /><span
                              >없음</span
                            ></label
                          >
                          <label>2. <input v-model="form['p5q2-2']" type="radio" value="2" /><span>있음</span></label>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">유당 불내증</th>
                        <td>
                          <label
                            >1. <input ref="p5q2_3" v-model="form['p5q2-3']" type="radio" value="1" /><span
                              >없음</span
                            ></label
                          >
                          <label>2. <input v-model="form['p5q2-3']" type="radio" value="2" /><span>있음</span></label>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">대장, 직장염</th>
                        <td>
                          <label
                            >1. <input ref="p5q2_4" v-model="form['p5q2-4']" type="radio" value="1" /><span
                              >없음</span
                            ></label
                          >
                          <label>2. <input v-model="form['p5q2-4']" type="radio" value="2" /><span>있음</span></label>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">대장 용종</th>
                        <td>
                          <label
                            >1. <input ref="p5q2_5" v-model="form['p5q2-5']" type="radio" value="1" /><span
                              >없음</span
                            ></label
                          >
                          <label>2. <input v-model="form['p5q2-5']" type="radio" value="2" /><span>있음</span></label>
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
                          <label
                            >1. <input ref="p5q3_1" v-model="form['p5q3-1']" type="radio" value="1" /><span
                              >없음</span
                            ></label
                          >
                          <label>2. <input v-model="form['p5q3-1']" type="radio" value="2" /><span>있음</span></label>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">아토피 피부염</th>
                        <td>
                          <label
                            >1. <input ref="p5q3_2" v-model="form['p5q3-2']" type="radio" value="1" /><span
                              >없음</span
                            ></label
                          >
                          <label>2. <input v-model="form['p5q3-2']" type="radio" value="2" /><span>있음</span></label>
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
          <button class="btn full xlarge blue" :disabled="disabledSubmitButton || isLoading" @click.prevent="saveForm">
            설문 완료
          </button>
          <button class="btn full xlarge gray" @click.prevent="$router.back()">취소</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

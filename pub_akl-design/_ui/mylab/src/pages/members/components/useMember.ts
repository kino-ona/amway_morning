import dayjs from 'dayjs'
import { computed, UnwrapRef } from 'vue'
import { KitStatus } from '~/apis/model/kitModel'
import { GetMemberRes, GetUserMyInfoRes, MemberType, Sex } from '~/apis/model/userModel'
import { useUserStoreWithOut } from '~/stores/user'
import { getDateTime } from '~/utils/date-utils'

export function useMember(member: UnwrapRef<Nullable<GetMemberRes | GetUserMyInfoRes | undefined>>) {
  const userStore = useUserStoreWithOut()

  const classNames = computed<string[] | null>(() => {
    switch (member?.type) {
      case MemberType.MAIN:
        return ['primary']
      case MemberType.SUB:
        return ['sub']
      case MemberType.MEMBER:
        return ['rc']
    }

    return null
  })

  const memberBadge = computed<'주' | '부' | '나' | null>(() => {
    switch (member?.type) {
      case MemberType.MAIN:
        return '주'
      case MemberType.SUB:
        return '부'
    }

    if (userStore.getUserInfo?.id === member?.id) {
      return '나'
    }

    return null
  })

  const sexText = computed<string | null>(() => {
    let sexText: Nullable<string> = null
    switch (member?.sex) {
      case Sex.MEN:
        sexText = '남'
        break
      case Sex.WOMEN:
        sexText = '여'
        break
    }
    return sexText
  })

  const age = computed<number | null>(() => {
    if (member?.birth) {
      const today = dayjs()
      const birthDate = dayjs(member?.birth)

      return today.get('year') - birthDate.get('year') + 1
    }
    return null
  })

  const birthDateText = computed(() => {
    if (member?.birth) {
      const birthDate = dayjs(member?.birth, 'YYYY-MM-DD')

      return `${birthDate.get('year')}/${birthDate.get('month') + 1}/${birthDate.get('date')}`
    }

    return null
  })

  const profileImage = computed<string>(() => {
    if (!member) {
      return '/resource/images/common/member_default.svg'
    }

    const sex = member?.sex === Sex.MEN ? 'man' : 'woman'
    const ageVal = globalAge.value

    let ageType = 'adult'

    if (ageVal !== null) {
      if (ageVal < 14) {
        ageType = 'young'
      } else if (ageVal < 20) {
        ageType = 'infant'
      }
    }

    return `/resource/images/common/member_${sex}_${ageType}.svg`
  })

  const status = computed<{
    status: string
    classNames: string | string[] | undefined
    description: string
    visibleToggleButton: boolean
  }>(() => {
    let status = ''
    let classNames: string | string[] | undefined = undefined
    let description = ''
    let visibleToggleButton = false
    if (member && 'status' in member) {
      switch (member?.status) {
        case KitStatus.READY:
          status = '접수대기'
          classNames = 'blue'
          description = '등록된 키트가 없습니다.'
          visibleToggleButton = true
          break
        case KitStatus.CREATED:
          status = '접수진행'
          classNames = 'blue'
          description = ' 정보입력이 완료되지 않았습니다.'
          visibleToggleButton = true
          break
        case KitStatus.PROCEED:
          status = '접수완료'
          classNames = 'blue'
          if ('pickupDate' in member) {
            description = `키트 수거 예정: <span class="color-black">${getDateTime(member.pickupDate!)}</span>`
          }
          visibleToggleButton = true
          break
        case KitStatus.SHIPPING:
          status = '키트배송'
          classNames = 'yellow'
          description = '키트가 분석기관으로 배송중입니다.'
          break
        case KitStatus.ARRIVAL:
          status = '키트도착'
          classNames = 'yellow'
          description = '키트가 분석기관에 도착했습니다.'
          break
        case KitStatus.ANALYZING:
          status = '분석중'
          classNames = 'green'
          if ('completeDate' in member && member.completeDate) {
            description = `분석완료 예정:<span class="color-black">${getDateTime(member.completeDate)}</span>`
          } else if ('arrivalDate' in member && member.arrivalDate) {
            description = `분석완료 예정:<span class="color-black">${getDateTime(
              dayjs(member.arrivalDate).add(1, 'month').toDate()
            )}</span>`
          }
          break
        case KitStatus.DONE:
          status = '분석완료'
          classNames = 'purple'
          description = '분석이 <span class="color-blue">완료</span>되었습니다.'
          visibleToggleButton = true
          break
        case KitStatus.REJECT:
          status = '키트반려'
          classNames = 'purple'
          description = '분석이 <span class="color-red">반려</span>되었습니다.'
          visibleToggleButton = true
          break
        case KitStatus.BEFORE:
          status = '멤버등록'
          classNames = 'gray'
          description = '멤버 등록 완료 대기중입니다.'
          visibleToggleButton = true
          break
      }
    }

    return { status, classNames, description, visibleToggleButton }
  })

  const globalAge = computed<number | null>(() => {
    if (member?.birth) {
      return getGlobalAge(member?.birth)
    }
    return null
  })

  return {
    classNames,
    memberBadge,
    age,
    globalAge,
    sexText,
    birthDateText,
    profileImage,
    status,
  }
}

export function getGlobalAge(birth: string): number {
  const today = dayjs()
  const birthDate = dayjs(birth)
  let age = today.year() - birthDate.year()
  const m = today.month() - birthDate.month()
  if (m < 0 || (m === 0 && today.date() < birthDate.date())) {
    age--
  }

  return age
}

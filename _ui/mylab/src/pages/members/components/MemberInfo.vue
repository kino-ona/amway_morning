<script lang="ts" setup>
import { computed, PropType } from 'vue'
import { removeMember } from '~/apis/user'
import { GetMemberRes } from '~/apis/model/userModel'
import { useMember } from '~/pages/members/components/useMember'
import { usePromise } from '~/hooks/usePromise'
import { usePermission } from '~/hooks/usePermission'
import { RoleEnum } from '~/apis/model/userModel'
import ShareDialog from '~/components/dialog/ShareDialog.vue'

const props = defineProps({
  info: {
    type: Object as PropType<GetMemberRes | null | undefined>,
    required: true,
  },
  isMine: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['removed'])

const { hasPermission } = usePermission()

const hasMasterPermission = computed<boolean>(() =>
  hasPermission([RoleEnum.MAIN, RoleEnum.SUB, RoleEnum.MEMBER, RoleEnum.CUSTOMER])
)
const hasModifyPermission = computed<boolean>(() => props.isMine || hasMasterPermission.value)
const hasRemovePermission = computed<boolean>(() => props.isMine || hasMasterPermission.value)
const { isLoading, callPromiseFn } = usePromise<typeof removeMember>(removeMember)
async function handelRemoveMember() {
  // 맴버 삭제 - 해당 멤버의 상태가 키트등록시작부터 키트수거예정일 이틀전까지는 삭제 불가
  if (window.confirm('해당 멤버를 삭제하시겠습니까?\n해당 멤버의 모든 정보는 남기지 않고 삭제 처리됩니다.')) {
    const id = props.info!.id
    await callPromiseFn(id)
    emits('removed', id)
  }
}

const { classNames, profileImage, memberBadge, birthDateText, sexText } = useMember(props.info)
const modifyUrl = computed(() => (props.isMine ? '/members/my-info/modify' : `/members/${props.info?.id}/modify`))
const shareMessages = `${window.location.origin}`
</script>

<template>
  <div class="member-info">
    <div class="img" :class="classNames">
      <img :src="profileImage" alt="profile" />
    </div>
    <div class="user">
      <span v-if="memberBadge" class="label" :class="classNames">{{ memberBadge }}</span>
      <strong>{{ info?.username }}</strong>
      <span v-if="sexText">({{ sexText }})</span>
    </div>

    <div class="btn-wrap">
      <router-link v-if="hasModifyPermission" :to="modifyUrl" class="btn-edit">
        <span class="hide">수정</span>
      </router-link>
      <template v-if="hasRemovePermission">
        <router-link v-if="isMine" to="/members/my-info/leave" class="btn-del">
          <span class="hide">삭제</span>
        </router-link>
        <button v-else class="btn-del" :disabled="isLoading" @click="handelRemoveMember">
          <span class="hide">삭제</span>
        </button>
      </template>
    </div>
    <div class="summary">
      <dl>
        <dt>생년월일</dt>
        <dd>{{ birthDateText }}</dd>
        <dt>휴대폰</dt>
        <dd>{{ info?.mobile }}</dd>
        <dt>이메일</dt>
        <dd>{{ info?.email }}</dd>
        <dt>주소(수거지)</dt>
        <dd>{{ info ? `(${info.zipCode}) ${info.address} ${info.addressDetail}` : '' }}</dd>
      </dl>
    </div>

    <div v-if="isMine" v-auth="[RoleEnum.MAIN, RoleEnum.SUB, RoleEnum.MEMBER, RoleEnum.CUSTOMER]" class="link">
      <router-link to="/members/my-info/orders" class="btn full large">키트 구매목록</router-link>
    </div>

    <!-- 멤버일경우// -->
    <template v-else>
      <div class="link">
        <share-dialog :messages="shareMessages" button-label="my LAB 초대 링크 전송" class="btn full large" />
      </div>
      <div class="guideinfo bg-gray">
        <ul>
          <li>
            * my LAB 멤버로 등록할 가족/ 지인(Amway 비회원)에게 약관 동의 및 키트 등록을 진행하고 서비스를 이용할 수
            있도록 초대 링크를 전송해주세요.
          </li>
          <li>* 멤버 등록 후 10일 이내에 my LAB 멤버가 제3자 제공 동의를 하지 않으면 해당 프로필은 자동 삭제됩니다.</li>
          <li>* 등록된 my LAB 멤버는 추후 “my LAB 로그인”을 통해 my LAB 사이트 접속 및 서비스를 이용할 수 있습니다.</li>
        </ul>
      </div>
      <!-- //멤버일경우 -->
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import BaseDialog from '~/components/dialog/BaseDialog.vue'
import MobileCertify from '~/components/MobileCertify.vue'

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  mobile: {
    type: String,
    default: '',
  },
  visibleName: {
    type: Boolean,
    default: true,
  },
})
defineEmits(['confirmed'])
const isOpenDialog = ref<boolean>(false)
const name = ref<string>(props.name)
const mobile = ref<string>(props.mobile)
const visibleName = ref<boolean>(props.visibleName)
</script>

<template>
  <button type="button" class="btn" v-bind="$attrs" @click.prevent="isOpenDialog = true">
    <slot> 본인 인증 </slot>
  </button>
  <BaseDialog v-model="isOpenDialog">
    <template #title>
      <h1 class="hide">휴대폰인증 팝업</h1>
    </template>
    <div class="modal-certify">
      <div class="guideinfo">
        <ul>
          <li>* 주/부사업자의 경우 본인인증 후 수정 및 삭제가 가능합니다.</li>
        </ul>
      </div>

      <div class="formbox">
        <mobile-certify
          v-model:name="name"
          v-model:mobile="mobile"
          v-model:visibleName="visibleName"
          @confirmed="$emit('confirmed')"
        />
      </div>
    </div>
  </BaseDialog>
</template>

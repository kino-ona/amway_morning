<script lang="ts" setup name="PartnerLogin">
import type { AxiosError } from 'axios'
import type { MobileConfirmed } from '#/custom'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { LoginParams } from '~/apis/model/userModel'
import { LoginType } from '~/apis/user'
import { usePromise } from '~/hooks/usePromise'
import { PageEnum } from '~/routers/pageEnum'
import { useUserStore } from '~/stores/user'
import MobileCertify from '~/components/MobileCertify.vue'

const form = ref<LoginParams>({
  username: '',
  mobile: '',
  otp: '',
})

const router = useRouter()
const userStore = useUserStore()
const { isLoading, callPromiseFn } = usePromise<typeof userStore.login>(userStore.login)

async function confirmed({ certify }: MobileConfirmed) {
  form.value.otp = certify
  // await handleLogin()
}

async function handleLogin() {
  try {
    await callPromiseFn(form.value, LoginType.SUB_MEMBER)
    router.replace(PageEnum.ROOT_PATH)
  } catch (e) {
    const { response } = (e as AxiosError) || {}
    window.alert((response as any)?.data?.message)
  }
}
</script>

<template>
  <div class="channel login">
    <!-- 멤버 채널페이지는 channel 클래스를 별도로 꼭 넣어주세요 -->
    <form>
      <fieldset>
        <legend>my LAB 멤버 로그인</legend>
        <h2 class="h2-title">my LAB 멤버 로그인</h2>

        <div class="title-summary">
          <p>서비스 이용을 위해 본인인증을 통해 my LAB 멤버 로그인을 진행해주세요.</p>
        </div>

        <div class="formbox">
          <mobile-certify v-model:name="form.username" v-model:mobile="form.mobile" @confirmed="confirmed" />
        </div>

        <!-- 휴대폰 인증 완료 시, 로그인 버튼 노출// -->
        <!-- :disabled="!form.certify || isLoading" -->
        <div class="bottom-btns">
          <button
            type="submit"
            class="btn full xlarge blue"
            :disabled="isLoading || !form.otp"
            @click.prevent="handleLogin"
          >
            로그인
          </button>
        </div>
        <!-- //휴대폰 인증 완료 시, 로그인 버튼 노출 -->
      </fieldset>
    </form>
  </div>
</template>

<route lang="yaml">
meta:
  title: my LAB 맴버 로그인
</route>

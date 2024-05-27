<script lang="ts" setup>
import type { LabelNValue } from '#/custom'
import { unescape } from 'lodash-es'
import { onMounted, ref } from 'vue'
import { GetTermsRes } from '~/apis/model/termsModel'
import { getTerm, getFooterTerms } from '~/apis/terms'
import { usePromise } from '~/hooks/usePromise'

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
})

const currentVersion = ref<number | undefined>()

const { callPromiseFn: getTermAPI } = usePromise<typeof getTerm>(getTerm)
const { callPromiseFn: getFooterTermsAPI } = usePromise<typeof getFooterTerms>(getFooterTerms)

const form = ref<Partial<GetTermsRes>>({})
const versions = ref<LabelNValue<number>[]>([])

onMounted(async () => {
  const type = props.type
  const isFooter = ['service', 'privacy'].includes(type)
  const data = isFooter
    ? await getFooterTermsAPI({
        type: type as 'service' | 'privacy',
      })
    : await getTermAPI(Number(type))

  form.value = isFooter ? data?.[0] : data

  if (isFooter) {
    const items = data as GetTermsRes[]
    currentVersion.value = items?.[0].id
    versions.value = items?.map(({ id, version }) => ({
      label: `${version}`,
      value: id,
    }))
  }
})

async function changeVersion(e: Event) {
  const id = (e.target as HTMLSelectElement).value
  await getTermAPI(Number(id))
}
</script>

<template>
  <div class="agree-detail">
    <form>
      <fieldset>
        <legend>약관상세</legend>
        <h2 class="h2-title">{{ form?.termsType?.name }}</h2>

        <div class="agreecont">
          <div class="text">
            <h3>{{ form?.title }}</h3>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p class="ProseMirror" v-html="unescape(form?.contents)"></p>
          </div>
          <div v-if="versions.length" class="selectbox">
            <select v-model="currentVersion" placeholder="이전 약관 보기" @change="changeVersion">
              <option v-for="item in versions" :key="item.value" :value="item.value">{{ item.label }}</option>
            </select>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<route lang="yaml">
meta:
  ignoreAuth: true
  title: 약관 상세
</route>

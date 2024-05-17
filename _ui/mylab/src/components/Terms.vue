<script lang="ts" setup>
import { unescape, uniqueId } from 'lodash-es'
import { computed, PropType } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array as PropType<number[]>,
    default: () => [] as number[],
  },
  termsSeq: {
    type: Number,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  contents: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: () => uniqueId('terms-'),
  },
})

const emits = defineEmits(['update:modelValue'])

const checked = computed(() => props.modelValue.includes(props.termsSeq))

function changed(e: Event) {
  const target = e.target as HTMLInputElement
  const isChecked = target.checked

  const agreeId = props.termsSeq
  const checkedItems = props.modelValue
  if (isChecked) {
    checkedItems.push(agreeId)
  } else {
    checkedItems.splice(
      checkedItems.findIndex((val) => val === agreeId),
      1
    )
  }

  emits('update:modelValue', checkedItems)
}
</script>

<template>
  <div class="agreebox">
    <strong class="agree-tit">
      {{ subject }}
      <span v-if="required" class="color-blue">(필수)</span>
      <span v-else>(선택)</span>
    </strong>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="agree-cont ProseMirror" v-html="unescape(contents)"></div>
    <div class="agree-check">
      <label>
        <input
          type="checkbox"
          :name="name"
          :value="termsSeq"
          :required="required"
          :checked="checked"
          @input="changed"
        />
        <span>동의합니다</span>
      </label>
    </div>
  </div>
</template>

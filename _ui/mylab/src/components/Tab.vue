<script lang="ts" setup>
import type { LabelNValue } from '#/custom'
import { PropType } from 'vue'

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  items: {
    type: Array as PropType<LabelNValue<string>[]>,
    default: () => [],
  },
})

const emits = defineEmits(['update:modelValue', 'change'])

function handelTabChange(item: LabelNValue<string>) {
  emits('update:modelValue', item.value)
  emits('change', item.value, item)
}
</script>

<template>
  <div class="tab">
    <ul class="tab-menu">
      <li v-for="item in items" :key="item.value" :class="{ active: item.value === modelValue }">
        <button type="button" :disabled="item.disabled" @click.prevent="handelTabChange(item)">{{ item.label }}</button>
      </li>
    </ul>
    <div class="tab-cont">
      <div v-for="item in items" :key="item.value" class="cont" :class="{ active: item.value === modelValue }">
        <slot :name="`tab-item-${item.value}`" />
      </div>
    </div>
  </div>
</template>

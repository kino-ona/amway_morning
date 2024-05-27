<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseDialog',
  inheritAttrs: false,
  emits: ['confirm', 'cancel'],
})
</script>

<template>
  <Teleport to="#modal-container">
    <vue-final-modal
      v-slot="{ params, close }"
      v-bind="$attrs"
      class="modal"
      classes="modal-container"
      content-class="modal-content"
    >
      <span class="modal-header">
        <slot name="title"></slot>
        <button type="button" class="modal-header-close" @click="close">
          <span class="hide">닫기</span>
        </button>
      </span>
      <div class="modal-body">
        <slot :params="params"></slot>
      </div>
    </vue-final-modal>
  </Teleport>
</template>

<template>
  <div class="system-check">
    <div class="inner">
      <p class="text">시스템 점검중입니다.<br />불편을 드려 죄송합니다.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Systemcheck',
  data: function () {
    return {}
  },
  mounted() {
    // page start !!
    sessionStorage.clear()
  },
  methods: {},
}
</script>

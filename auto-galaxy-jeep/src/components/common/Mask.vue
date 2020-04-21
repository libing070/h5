<template>
  <div class="mask" v-if="isShow"></div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.mask {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  overflow: hidden;
}
</style>

<template>
  <button :class="['submit-btn', disabled  ? 'button-disabled' : 'button-enabled']" :disabled="disabled"
          @click="handleClick">{{ title }}
  </button>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      handleClick (evt) {
        this.$emit('click', evt)
      }
    }
  }
</script>

<style scoped>
  .submit-btn {
    width: 295px;
    height: 25px;
    font-size: 12px;
    color: #fff;
    background: #0094fa;
    border: none;
    outline: none;
    border-radius: 2px;
    cursor: pointer;
  }

  .button-enabled {
    background: #0094fa;
    color: #fff;
  }

  .button-disabled {
    background: #f2f2f2;
    color: #333;
    cursor: default;
  }
</style>

<template>
  <div class="input-box">
    <span class="title">{{ title }}</span>
    <input :type="type" :value="value" :placeholder="placeholder" @input="handleInput" :class="['input', {'error': isError}]">
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'text'
      },
      placeholder: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      isError: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      handleInput (e) {
        this.$emit('input', e.target.value)
      }
    }
  }
</script>

<style>
  .input-box {
    display: inline-block;
    position: relative;
    font-size: 12px;
    text-align: left;
  }

  .title {
    display: inline-block;
    width: 50px;
  }

  .input {
    width: 240px;
    height: 25px;
    border: 1px solid #e4e4e4;
    box-sizing: border-box;
    outline: none;
    padding: 0 5px;
    color: #666;
  }

  .error {
    border: 1px solid #ff004a;
  }

  .input::-webkit-input-placeholder {
    font-size: 10px;
    transform: scale(0.83);
    position: relative;
    left: -20px;
  }

  .input:focus {
    border: 1px solid #0094fa;
  }

  .input::-webkit-outer-spin-button,
  .input::-webkit-inner-spin-button{
    -webkit-appearance: none !important;
    margin: 0;
  }
</style>

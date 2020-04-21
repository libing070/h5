<template>
  <div class="input-containner">
    <span class="input-dis">
      验证码
    </span>
    <input ref="veri-input" placeholder="请输入验证码" :value="value" @input="handleInput"  :class="['input', {'error': isError}]">
    <button :class="['verification-btn', 'button-code', countDownSecond === 0 ? 'button-enabled' : 'button-disabled']"
            id="button-get-code"
            :disabled = "countDownSecond > 0"
            @click="onClickGetVerificationCode">{{ buttonText }}</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      countDownSecond: 0,
      intervalId: 0,
      verifyCode: ''
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    isCountDown: false,
    isError: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    buttonText () {
      if (this.countDownSecond > 0) {
        return `${this.countDownSecond}秒后重发`
      } else {
        return '获取验证码'
      }
    }
  },
  watch: {
    isCountDown () {
      if (this.isCountDown) {
        this.countDownSecond = 60
        this.intervalId = setInterval(this.countDown, 1000)
      }
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('input', e.target.value)
    },
    onClickGetVerificationCode () {
      this.$refs['veri-input'].focus()
      this.$emit('getVerifyCode')
      if (this.isCountDown) {
        this.countDownSecond = 60
        this.intervalId = setInterval(this.countDown, 1000)
      }
    },
    countDown () {
      this.countDownSecond = this.countDownSecond - 1
      if (this.countDownSecond === 0) {
        clearInterval(this.intervalId)
      }
    }
  }
}
</script>

<style scoped>
  .input-containner {
    display: inline-block;
    font-size: 12px;
    text-align: left;
    width: 295px;
  }

  .input-dis {
    display: inline-block;
    width: 50px;
  }

  .input {
    width: 160px;
    height: 25px;
    border: 1px solid #e4e4e4;
    box-sizing: border-box;
    outline: none;
    padding: 0 5px;
    color: #666;
  }

  .input:focus {
    border: 1px solid #0094fa;
  }

  .input::-webkit-input-placeholder {
    font-size: 10px;
    transform: scale(0.83);
    position: relative;
    left: -12px;
  }

  .error {
    border: 1px solid #ff004a;
  }

  .verification-btn {
    width: 85px;
    height: 29px;
    color: #fff;
    font-size: 10px;
    transform: scale(0.83);
    background: #0094fa;
    border: none;
    outline: none;
    border-radius: 2px;
    cursor: pointer;
    box-sizing: border-box;
    float: right;
    margin: -2px -5px 0 0;
  }

  .button-enabled {
    background: #18a9ff;
  }

  .button-disabled {
    background: #c2c2c2;
  }
</style>

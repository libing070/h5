<template>
  <transition name="fade">
    <div v-if="isShow" class="login-panel">
      <p class="title-box">
        <span class="title-img">Auto Galaxy</span>
        <span class="title-text" @click="changePanel(1)">注册</span>
        <span class="title-text active">密码登录</span>
        <span class="title-text" @click="changePanel(2)">验证码登录</span>
      </p>
      <div class="form-set">
        <custom-input v-model="account" title="账号" :isError="isPhoneError"  placeholder="手机号"></custom-input>
        <div class="error-block">{{ phoneErrorMessage }}</div>
        <custom-input v-model="password" title="密码" :isError="isPasswordError"  placeholder="密码" type="password"></custom-input>
        <!--<verification-code v-model="verifyCode" @getVerifyCode="getVerifyCode" :isCountDown="isCountDown" :isError="isVerifyError"></verification-code>-->
        <div class="error-block" style="height: 45px;">{{ verifyErrorMessage }}</div>
        <submit-btn title="密码登录" :disabled="isLogin" @click="login"></submit-btn>
      </div>
    </div>
  </transition>
</template>

<script>
  import CustomInput from './CustomInput'
  import VerificationCode from './VerificationCode'
  import SubmitBtn from './SubmitBtn'
  import qs from 'querystring'
  import * as types from '../../store/mutation-types'
  export default {
    data () {
      return {
        account: localStorage.UserPhone || '',
        password: '',
        isPhoneNum: true,
        isCountDown: false,
        isLogin: true,
        isPhoneError: false,
        isPasswordError: false,
        verifyErrorMessage: '',
        phoneErrorMessage: ''
      }
    },
    props: {
      isShow: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      account() {
        if (this.account && this.password) {
          this.isLogin = false
        }
      },
      password() {
        if (this.account && this.password) {
          this.isLogin = false
        }
      },
      isShow () {
        if (this.isShow) {
          this.account = ''
          this.password = ''
          this.isPhoneError = false
          this.isPasswordError = false
          this.verifyErrorMessage = ''
          this.phoneErrorMessage = ''
          this.isCountDown = false
        }
      }
    },
    methods: {
      changePanel (index) {
        if (index === 1) {
          this.$emit('changePanel', 'login')
        } else if (index === 2) {
          this.$emit('changePanel', 'reg')
        }
      },
      login () {
        if (this.account === 'guest' && this.password === 'guest') {
          this.$message.success('登录成功')
          localStorage.setItem('GalaxyToken', 'guest')
          localStorage.setItem('UserPhone', this.account)
          this.$store.commit(types.CHANGE_GLOBAL_STATE, true)
          this.$store.commit(types.SET_USER_PHONE, this.account)
          this.$emit('close')
          this.$router.push('/')
        }
      }
    },
    components: {
      CustomInput,
      VerificationCode,
      SubmitBtn
    }
  }
</script>

<style scoped>
  .login-panel {
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translateX(-50%);
    width: 420px;
    height: 275px;
    border: 1px solid #E4E4E4;
    box-shadow: 1px 1px 15px #ccc;
    background-color: #fff;
    z-index: 101;
  }

  /* 弹框进入退出动画效果 */
  .fade-enter /* .fade-leave-active below version 2.1.8 */ {
    top: 15%;
    opacity: 0;
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }
  .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    top: 35%;
    opacity: 0;
  }

  .error-block {
    height: 30px;
    width: 290px;
    font-size: 12px;
    text-align: left;
    color: #999;
    padding-left: 120px;
  }

  .title-box {
    margin: 15px 0 0 0;
    width: 100%;
    padding: 0 30px;
    font-size: 12px;
    box-sizing: border-box;
    overflow: hidden;
  }

  .title-img {
    color: #999;
    font-size: 15px;
    float: left;
  }

  .title-text {
    text-decoration: underline;
    float: right;
    margin-left: 5px;
    cursor: pointer;
  }

  .active {
    color: #f9bd00;
  }

  .form-set {
    text-align: center;
    margin-top: 40px;
  }
</style>

<template>
  <transition name="fade">
    <div v-if="isShow" class="login-panel">
      <p class="title-box">
        <span class="title-img">Auto Galaxy</span>
        <span class="title-text" @click="changePanel(1)">注册</span>
        <span class="title-text" @click="changePanel(2)">密码登录</span>
        <span class="title-text active">验证码登录</span>
      </p>
      <div class="form-set">
        <custom-input v-model="phoneNum" title="手机号" :isError="isPhoneError"  placeholder="手机号" type="number"></custom-input>
        <div class="error-block">{{ phoneErrorMessage }}</div>
        <verification-code v-model="verifyCode" @getVerifyCode="getVerifyCode" :isCountDown="isCountDown" :isError="isVerifyError"></verification-code>
        <div class="error-block" style="height: 45px;">{{ verifyErrorMessage }}</div>
        <submit-btn title="登录" :disabled="isLogin" @click="login"></submit-btn>
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
        phoneNum: localStorage.UserPhone || '',
        verifyCode: '',
        isPhoneNum: true,
        isCountDown: false,
        isLogin: true,
        isPhoneError: false,
        isVerifyError: false,
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
      phoneNum () {
        if (this.phoneNum.match(/^1\d{10}$/) != null) {
          // this.isCountDown = true
          this.isPhoneNum = true
          this.isPhoneError = false
          this.phoneErrorMessage = ''
        } else {
          this.isPhoneNum = false
          this.isPhoneError = true
        }
        this.enableLogin()
      },
      verifyCode () {
        this.enableLogin()
      },
      isShow () {
        if (this.isShow) {
          this.phoneNum = ''
          this.verifyCode = ''
          this.isPhoneError = false
          this.isVerifyError = false
          this.verifyErrorMessage = ''
          this.phoneErrorMessage = ''
          this.isCountDown = false
        }
      }
    },
    methods: {
      getVerifyCode () {
        if (this.phoneNum) {
          if (this.isPhoneNum) {
            this.$axios ({
              method: 'POST',
              url: '/v2/getIdentifyingCode',
              data: {
                mobile: this.phoneNum
              },
              headers: {
                'Content-Type': 'application/json'
              }
            }).then((res) => {
              if (res.data.code === 0) {
                this.isCountDown = true
                this.verifyErrorMessage = '验证码已发送，请查收！'
              } else if (res.data.code === -1) {
                this.isCountDown = false
                this.$message.warning(res.data.msg)
              }
            })
          } else {
            this.isCountDown = false
            this.phoneErrorMessage = '手机号格式不正确！'
          }
        } else {
          this.isCountDown = false
          this.phoneErrorMessage = '需要填写手机号！'
        }
      },
      enableLogin () {
        if (this.verifyCode && this.phoneNum) {
          this.isLogin = false
        } else {
          this.isLogin = true
        }
      },
      changePanel (index) {
        if (index === 1) {
          this.$emit('changePanel', 'login')
        } else if (index === 2) {
          console.log('loginByPassword')
          this.$emit('changePanel', 'loginByPassword')
        }
      },
      login () {
        if (!this.isPhoneNum) {
          this.isPhoneError = true
          this.phoneErrorMessage = '手机号格式不正确！'
        } else {
          let params = {
            mobile: this.phoneNum,
            identifyingCode: this.verifyCode
          }
          this.$axios ({
            method: 'POST',
            url: '/v2/checkIdentifyingCode',
            data: params,
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((res) => {
            this.verifyCode = ''
            if (res.data.code === 0) {
              this.$message.success(res.data.msg)
              localStorage.setItem('GalaxyToken', res.data.data.token)
              localStorage.setItem('UserPhone', this.phoneNum)
              this.$store.commit(types.CHANGE_GLOBAL_STATE, true)
              this.$store.commit(types.SET_USER_PHONE, this.phoneNum)
              this.$emit('close', 'login')
              this.$router.push('/')
            } else {
              this.$message.success(res.data.msg)
            }
          })
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

<template>
  <transition name="fade">
    <div v-if="isShow" class="login-panel">
      <p class="title-box">
        <span class="title-img">Auto Galaxy</span>
        <span class="title-text active">注册</span>
        <span class="title-text" @click="changePanel">登录</span>
      </p>
      <div class="title">
        <div v-for="(item, index) in titleBtn" :key="index" :class="['title-inner-box', {'active-box': index === activeIndex}]">
          <span class="step-index">{{ item.count }}</span>
          <span class="code">{{ item.label }}</span>
        </div>
      </div>
      <div v-if="activeIndex === 0" style="margin-top: 25px">
        <custom-input v-model="inviteCode" title="邀请码" placeholder="邀请码"></custom-input>
        <div class="error-block">{{ inviteCodeMsg }}</div>
        <p class="note">没有邀请码？点击这里
          <a href="mailto:wujiacong1@auto-smart.com?cc=litong4@auto-smart.com;&subject=慧星登录权限申请&body=您正在申请“慧星大数据洞察系统”的登录权限，请在下方如实填写您的信息，审核通过后，会邮件回复您权限是否开通，请注意查收！%0D%0D域账号：%0D%0D用户名称（中文全称）：%0D%0D工号：%0D%0D手机号：%0D%0D邮件地址：%0D%0D公司名称：%0D%0D部门及职位名称：%0D%0D工作地点：" class="admin-note">联系管理员</a>
        </p>
        <div style="height: 20px;"></div>
        <submit-btn title="下一步" :disabled="next" @click="nextStep"></submit-btn>
      </div>
      <div class="form-set" v-if="activeIndex === 1">
        <custom-input v-model="phoneNum" title="手机号" :isError="isPhoneError"  placeholder="手机号" type="number"></custom-input>

        <div class="error-block">
          {{ phoneErrorMessage }}
          <span v-if="reBindStatus === 0" class="text-btn" @click="rebindInvitedCode">已清楚仍要继续</span>
          <span v-if="reBindStatus === 1" class="text-btn" @click="rebindInvitedCode">点击重试</span>
        </div>
        <verification-code v-model="verifyCode" @getVerifyCode="getVerifyCode" :isCountDown="isCountDown" :isError="isVerifyError"></verification-code>
        <div class="error-block" style="height: 30px;">{{ verifyErrorMessage }}</div>
        <submit-btn title="注册" :disabled="isLogin" @click="login"></submit-btn>
      </div>
    </div>
  </transition>
</template>

<script>
import CustomInput from './CustomInput'
import VerificationCode from './VerificationCode'
import SubmitBtn from './SubmitBtn'
export default {
  data() {
    return {
      inviteCode: '',
      phoneNum: '',
      verifyCode: '',
      isPhoneNum: true,
      isCountDown: false,
      isLogin: true,
      next: true,
      isPhoneError: false,
      isVerifyError: false,
      verifyErrorMessage: '',
      phoneErrorMessage: '',
      activeIndex: 0,
      inviteCodeMsg: '',
      reBindStatus: null,
      titleBtn: [
        {
          count: 1,
          label: '填写邀请码'
        },
        {
          count: 2,
          label: '设置登录账号'
        }
      ]
    }
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    phoneNum() {
      if (this.phoneNum.match(/^1\d{10}$/) != null) {
        // this.isCountDown = true
        this.isPhoneNum = true
        this.isPhoneError = false
        this.phoneErrorMessage = ''
        this.checkCodeBind()
      } else {
        this.isPhoneNum = false
        this.isPhoneError = true
      }
      this.enableLogin()
    },
    verifyCode() {
      this.enableLogin()
    },
    inviteCode() {
      this.enableNext()
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
          this.activeIndex = 0
          this.inviteCode = ''
        }
      }
  },
  methods: {
    getVerifyCode() {
      if (this.phoneNum) {
        if (this.isPhoneNum) {
          this.isCountDown = true
          this.verifyErrorMessage = '验证码已发送，请查收！'
          this.$axios({
            method: 'POST',
            url: '/v2/getRegisterIdentifyingCode',
            data: {
              mobile: this.phoneNum
            },
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(res => {
            console.log(res)
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
    enableLogin() {
      if (this.verifyCode && this.phoneNum) {
        this.isLogin = false
      } else {
        this.isLogin = true
      }
    },
    enableNext() {
      if (this.inviteCode) {
        this.next = false
      } else {
        this.next = true
      }
    },
    login() {
      if (!this.isPhoneNum) {
        this.isPhoneError = true
        this.phoneErrorMessage = '手机号格式不正确！'
      } else {
        const regParams = {
          phone: this.phoneNum,
          name: '',
          company: '',
          title: '',
          identifyingCode: this.verifyCode,
          inviteCode: this.inviteCode
        }
        this.$axios({
          method: 'POST',
          url: '/v2/addUser',
          data: regParams,
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => {
          if (res.data.code === 1) {
            this.$message.success(res.data.msg)
            this.$emit('close', 'reg')
          }
        })
      }
    },
    nextStep() {
      this.activeIndex = 1
      this.$axios({
        method: 'POST',
        url: '/v2/isValidInviteCode',
        data: {
          code: 'ERSFD',
          phone: ''
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        console.log(res)
        this.activeIndex = 1
      })
    },
    checkCodeBind() {
      let params = {
        phone: this.phoneNum
      }
      this.$axios({
        method: 'POST',
        url: '/v2/isHasBindedInvitedCode',
        data: params,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (res.data.code === 1) {
          if (res.data.result) {
            this.reBindStatus = 0
            this.phoneErrorMessage = '此账号已激活，绑定新的邀请码会使就邀请码失效，'
          } else {
            this.reBindStatus = null
            this.phoneErrorMessage = '账户有效！'
          }
        }
      })
    },
    changePanel() {
      this.$emit('changePanel', 'reg')
    },
    rebindInvitedCode() {
      let params = {
        phone: this.phoneNum,
        inviteCode: this.inviteCode
      }
      this.$axios({
        method: 'POST',
        url: '/v2/rebindInvitedCode',
        data: params,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (res.data.code === 1) {
          this.reBindStatus = null
          this.phoneErrorMessage = '已成功绑定新的邀请码，'
        } else {
          this.reBindStatus = 1
          this.phoneErrorMessage = '邀请码重新绑定失败，'
        }
      })
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
  border: 1px solid #e4e4e4;
  box-shadow: 1px 1px 15px #ccc;
  background-color: #fff;
  z-index: 101;
}

/* 弹框进入退出动画效果 */
.fade-enter {
  top: 15%;
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-leave-to {
  top: 35%;
  opacity: 0;
}

.error-block {
  height: 30px;
  width: 290px;
  font-size: 12px;
  text-align: left;
  color: #999;
  padding-left: 100px;
  -webkit-transform: scale(0.8);
}

.text-btn {
  text-decoration: underline;
  color: #0094fa;
  cursor: pointer;
}

.note {
  font-size: 12px;
  color: #333;
  margin: 0;
}

.admin-note {
  color: #0094fa;
  /* text-decoration: underline; */
  /* cursor: pointer; */
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
  margin-top: 5px;
}

.title {
  width: 360px;
  margin: 20px auto;
  border-bottom: 1px solid #ccc;
  font-size: 12px;
}

.title-inner-box {
  display: inline-block;
  width: 140px;
  padding: 0 0 5px 0;
}

.active-box {
  border-bottom: 1px solid #0094fa;
  /*margin-bottom: -1px;*/
}

.step-index {
  display: inline-block;
  width: 15px;
  height: 15px;
  background-color: #0094fa;
  border-radius: 50%;
  color: #fff;
  font-size: 12px;
}

.code {
  vertical-align: middle;
}
</style>

<template>
  <div v-title="'Auto Galaxy'" class="home">
    <vue-particles
      color="#b1d4dd"
      :particlesNumber="50"
      shapeType="circle"
      :particleSize="6"
      linesColor="#b1d4dd"
      :linesDistance="150"
      :hoverEffect="true"
      hoverMode="#e1f0e9"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <div class="selecte-box">
      <div class="logo-wrap">
        <img src="../../assets/parse/home-logo.png" class="home-logo">
      </div>
      <!-- <span>fasdfas</span> -->
      <sample-select></sample-select>
      <!-- 如果没有登录，就提示登录和注册 -->
      <p class="login-text" v-if="!globalLoginStatues">
        <span class="login" @click="changeLogin('login')">登录</span> 或
        <span class="login" @click="changeLogin('reg')">注册</span>
      </p>
      <!-- 如果已经登录，就显示用户信息 -->
      <p class="login-text" v-else>
        {{phone}}，欢迎使用
        <span class="logout-text" @click="logout">退出登录</span>
      </p>
    </div>
    <login-panel :isShow="isLogin" @close="close" @changePanel="changePanel"></login-panel>
    <reg-panel :isShow="isReg" @close="close" @changePanel="changePanel"></reg-panel>
    <login-by-password-panel :isShow="isLoginByPassword" @close="close" @changePanel="changePanel"></login-by-password-panel>
    <div class="mask" v-if="maskState" @click="handleMaskClick"></div>
  </div>
</template>
<script>
import SampleSelect from '../common/SampleSelect'
import LoginPanel from './LoginPanel'
import RegPanel from './RegPanel'
import LoginByPasswordPanel from './LoginByPasswordPanel'
import * as types from '../../store/mutation-types'
export default {
  name: 'home',
  data() {
    return {
      isLogin: false,
      isReg: false,
      isLoginByPassword: false,
      maskState: false
    }
  },
  computed: {
    globalLoginStatues() {
      return this.$store.state.common.isLoginGlobal
    },
    phone() {
      return this.$store.state.common.userPhone
    }
  },
  created() {
    this.$store.commit(types.RESET)
  },
  methods: {
    handleMaskClick() {
      this.isLogin = false
      this.isReg = false
      this.maskState = false
      // this.isLogin = !this.isLogin
      // console.log(this.isLogin)
      // this.$store.commit(types.CHANGE_MASK_STATE, this.isLogin)
    },
    close (val) {
      if (val === 'reg') {
        this.isReg = false
      } else if (val === 'login') {
        this.isLogin = false
      } else {
        this.isLoginByPassword = false
      }
      this.handleMaskClick()
    },
    closeLogin() {
      this.isLogin = false
      this.handleMaskClick()
    },
    closeReg() {
      this.isReg = false
      this.handleMaskClick()
    },
    changePanel(type) {
      this.isLogin = false
      this.isReg = false
      this.isLoginByPassword = false
      if (type === 'reg') {
        this.isLogin = true
      } else if (type === 'login') {
        this.isReg = true
      } else {
        console.log(type)
        this.isLoginByPassword = true
      }
    },
    changeLogin(type) {
      if (type === 'login') {
        this.isReg = false
        this.isLogin = !this.isLogin
        this.maskState = this.isLogin
      } else {
        this.isLogin = false
        this.isReg = !this.isReg
        this.maskState = this.isReg
      }
    },
    logout() {
      localStorage.setItem('GalaxyToken', '')
      this.$store.commit(types.CHANGE_GLOBAL_STATE, false)
      this.$router.push('/')
    }
  },
  components: {
    SampleSelect,
    LoginPanel,
    RegPanel,
    LoginByPasswordPanel
  }
}
</script>
<style scoped lang="less">
.mask {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  overflow: hidden;
  z-index: 100;
}

.home {
  width: 100%;
  height: 100%;
  position: relative;
  text-align: center;
}

.circle {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.selecte-box {
  position: absolute;
  top: 30%;
  width: 100%;
  /*transform: translateY(-30%);*/
  text-align: center;
}

.home-logo {
  width: 445px;
  height: 65px;
  margin-bottom: 40px;
}
.logo-wrap:after {
  content: 'alpha版';
  margin-bottom: 50px;
  display: inline-block;
  vertical-align: bottom;
  font-family: cursive;
  font-weight: bold;
  color: #444;
}

.login-text {
  margin: 20px 0 0 0;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.9);
  span {
    &:hover {
      cursor: pointer;
    }
  }
}

.logout-text {
  text-decoration: underline;
  color: #50bfff;
  padding-left: 5px;
  cursor: pointer;
}

.login {
  text-decoration: underline;
}

.login:hover {
  color: #f9bd00;
}
</style>

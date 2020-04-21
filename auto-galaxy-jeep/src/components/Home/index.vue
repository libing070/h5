<template>
  <div class="home">
    <div data-v-6f8da9b6 class="container">
      <div data-v-6f8da9b6 class="login-img"></div>
      <div data-v-6f8da9b6 class="login">
        <div data-v-6f8da9b6 class="login-img">
          <img
            data-v-6f8da9b6
            src="data:image/png;base64,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"
            alt
            class="logo"
          >
          <p data-v-6f8da9b6>{{$t('m.login.introduction')}}</p>
          <span data-v-6f8da9b6 class="sponsor">Version 1.0.5</span>
        </div>
        <div data-v-6f8da9b6 class="login-input">
          <div data-v-6f8da9b6 class="login-title">{{$t('m.login.info')}}</div>
          <div data-v-6f8da9b6 class="form-wp">
            <form data-v-6f8da9b6 class="el-form">
              <div data-v-6f8da9b6 class="el-form-item">
                <label class="el-form-item__label" style="width: 80px;">{{$t('m.login.name_label')}}</label>
                <div class="el-form-item__content" style="margin-left: 80px;">
                  <div data-v-6f8da9b6 class="el-input">
                    <!---->
                    <input type="text" class="el-input__inner" v-model="username">
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <!---->
                </div>
              </div>
              <div data-v-6f8da9b6 class="el-form-item">
                <label class="el-form-item__label" style="width: 80px;">{{$t('m.login.password_label')}}</label>
                <div class="el-form-item__content" style="margin-left: 80px;">
                  <div data-v-6f8da9b6 class="el-input">
                    <!---->
                    <input type="password" class="el-input__inner" v-model="password" @keyup.enter="loginSystem">
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <!---->
                </div>
              </div>
            </form>
          </div>
          <div data-v-6f8da9b6 class="login-botton" @click="loginSystem">{{$t('m.login.button')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    loginSystem() {
      if (this.username === "") {
        this.$message.warning(this.$i18n.t("m.login.name_tip[0]"));
      } else if (this.password === "") {
        this.$message.warning(this.$i18n.t("m.login.password_tip"));
      } else {
        this.$axios
          .post("v2/login", {
            username: this.username,
            password: this.password
          })
          .then(res => {
            if (res.data.status === 1) {
              localStorage.hasLogin = true;
              localStorage.isSuperAdmin = res.data.data.isAdmin;
              localStorage.name = res.data.data.username;
              localStorage.UserPhone = res.data.data.username;
              this.$router.push("/");
            } else {
              this.$message.warning(res.data.msg);
            }
          });
      }
    },
    logout() {
      localStorage.setItem("hasLogin", false);
      this.$router.push("/");
    }
  }
};
</script>
<style scoped lang="less">
.container[data-v-6f8da9b6] {
  background: #ebebeb;
  height: 100vh;
}
.login[data-v-6f8da9b6] {
  width: 640px;
  height: 425px;
  background: #fff;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  -webkit-box-shadow: 0px 5px 12px 1px rgba(2, 2, 2, 0.09);
  box-shadow: 0px 5px 12px 1px rgba(2, 2, 2, 0.09);
  zoom: 1;
  overflow: hidden;
}
.login .login-img[data-v-6f8da9b6] {
  background: #000;
  height: 100%;
  float: left;
  width: 290px;
}
.login .login-img .logo[data-v-6f8da9b6] {
  margin-top: 40px;
  margin-left: 30px;
}
.login .login-img p[data-v-6f8da9b6] {
  margin-top: 30px;
  margin-left: 30px;
  color: #fff;
  font-size: 30px;
}
.login .login-img .slogan[data-v-6f8da9b6] {
  margin-top: 20px;
  margin-left: 30px;
  color: #fff;
  font-size: 20px;
  display: inline-block;
  padding-right: 20px;
}
.login .login-img .slogan .icon-baojiaquotation2[data-v-6f8da9b6],
.login .login-img .slogan .icon-baojiaquotation2-copy[data-v-6f8da9b6] {
  font-size: 20px;
  margin-left: -5px;
}
.login .login-img .sponsor[data-v-6f8da9b6] {
  color: #fff;
  text-align: left;
  margin-left: 35px;
  font-weight: bold;
  cursor: pointer;
  display: block;
  position: absolute;
  bottom: 35px;
}
.login .login-input[data-v-6f8da9b6] {
  float: right;
  height: 100%;
  width: 350px;
}
.login .login-input .login-title[data-v-6f8da9b6] {
  font-family: "Microsoft Yahei";
  width: 170px;
  margin-left: 30px;
  margin-top: 30px;
  padding-left: 15px;
  font-size: 20px;
  border-left: 5px solid #000;
}
.login .login-input .form-wp[data-v-6f8da9b6] {
  margin-top: 80px;
}
.login .login-input .form-wp[data-v-6f8da9b6] .el-form-item__label {
  color: #000;
}
.login .login-input .form-wp[data-v-6f8da9b6] .el-input {
  width: 230px;
}
.login .login-input .form-wp[data-v-6f8da9b6] .el-input .el-input__inner {
  border-radius: 0;
  border: none;
  border-bottom: 2px solid #000;
}
.login .login-input .form-wp[data-v-6f8da9b6] .el-checkbox__inner,
.login
  .login-input
  .form-wp
  .el-checkbox__input.is-focus
  .el-checkbox__inner[data-v-6f8da9b6] {
  border: 1px solid #000;
}
.login .login-input .login-botton[data-v-6f8da9b6] {
  background: #fabe00;
  width: 170px;
  height: 45px;
  line-height: 45px;
  font-size: 20px;
  color: #000;
  text-align: center;
  margin: 0 auto;
  margin-top: 104px;
  cursor: pointer;
  font-family: "Microsoft Yahei";
}
.el-form-item__label {
  text-align: right;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
}
.el-form-item {
  margin-bottom: 22px;
}
</style>

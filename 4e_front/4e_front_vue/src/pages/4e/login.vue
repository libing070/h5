<!--登录页面-->
<template>
<div class="e-login">
	<div class="form">
		<div class="block">
			<input type="text" class="userName"  v-model.trim="obj.userName" placeholder="ID." ref="username"/>
			<input type="password" class="password"  v-model.trim="obj.password" placeholder="PW." @keyup.enter="submit" ref="password"/>
			<div v-show="isLock==true" class="submit logging">
				<a>登录中 .....</a>
			</div>
			<div v-show="isLock==false" class="submit" @click="submit">
				<a>登录</a>
			</div>

		</div>

	</div>
	<div class="login-bottom">
		<div class="login-marquee">
			<marquee scrollamount="5" direction="left"  vspace="10" onmouseover="this.stop()" onmouseout="this.start()" >
				<p><span>若您使用的浏览器操作效果不佳，可以下载免安装版chrome浏览器。</span>
					<a href="/chrome.7z" target="_blank">跳转下载</a>
				</p>
			</marquee>
		</div>
		<div class="end">©一汽-大众汽车有限公司 版权所有</div>
	</div>
</div>
</template>

<script>
import Vue from 'vue'

import global_css from '@/assets/4e/css/global.css'
import font_css from '@/assets/4e/css/font.css'
import favicon_js from '@/assets/4e/js/favicon.js'

import util_js from '@/assets/4e/js/util.js'
Vue.use(util_js)

if(!"placeholder" in document.createElement("input")){
    $.getScript("../../assets/jieda/js/jquery.placeholder.js",function(){
        $(".username input").placeholder();
        $(".password input").placeholder();
    })
}

var base = localStorage.getItem("base");

export default {
	data: function(){
		return {
			base: base,
			isLock: false,
			obj: {
				userName: "",
				password: ""
			}
		}
	},
	methods: {
		submit: function(){
			if (this.isLock) {
				return;
			}
			this.isLock = true;
			var that = this;
			if (this.obj.userName=="") {
				this.showMsg("请输入登录用户名");
				this.$refs.username.focus()
				that.isLock = false;
				return;
			}
			if (this.obj.password=="") {
				this.showMsg("请输入密码");
				this.$refs.password.focus()
				that.isLock = false;
				return;
			}
			this.post(this.base+"/api/user/login", this.ccc(this.obj), function(data){
				if (data.code==200) {
					window.location = "/";
				}else {
					that.showMsg(data.msg);
					that.obj.userName = "";
					that.obj.password = "";
					that.$refs.username.focus();
				}
				that.isLock = false;
			});
		}
	},
	created: function(){
		var that = this;
		this.get(this.base+"/api/user/islogin", null, function(data){
			if (data.code==200) {
				window.location = "/";
			}
			that.$refs.username.focus();
		});
	}
}
</script>

<style lang="scss" scope>
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
  color: #cacdd4;
}

input:-moz-placeholder, textarea:-moz-placeholder {
  color: #cacdd4;
}

input::-moz-placeholder, textarea::-moz-placeholder {
  color: #cacdd4;
}

input:-ms-input-placeholder, textarea:-ms-input-placeholder {
  color: #cacdd4;
}
.e-login {
	width: 100%;
	height: 100%;
	min-width: 1280px;

	background: url(../../assets/4e/img/login_bg.png) no-repeat;
	background-size: cover;

	.form {
		width: 100%;
		height: 100%;
		min-width: 1280px;
		position: absolute;
		.block {
			position: absolute;
			width: 380px;
			top: calc(380px + (100% - 700px) * 0.6);
			margin-left: 59%;
			input {
				width: 100%;
				height: 38px;
				display: block;
				font-size: 20px;
				font-family: 'font-hy-55';
				border: unset;
				border-bottom: 1px solid #2c466f;
				background: transparent;
				margin-top: 15px;
				color: #cacdd4;
				background: transparent \9;
				border: none \9;
				border-bottom: 1px solid #2c466f \9;
			}
			.submit {
				margin-top: 40px;
				height: 44px;
				width: 90px;
				background: #01b0f1;
				border-radius: 30px;
				display: inline-block;
				text-align: center;
				cursor: pointer;
				a {
					display: inline-block;
					color: #001e50;
					font-size: 16px;
					margin-top: 10px;
				}
			}
			.logging {
				width: 130px;
			}
		}

	}
  .login-bottom{
	  position: absolute;
	  width: 450px;
	  height: 80px;
	   bottom: 20px;
	  margin-left: 59%;
	  .login-marquee{
		  margin-top: 10px;
		  margin-bottom: 10px;
		  a{
			  color: #0c6ce1;
		  }
	  }
  }

}

/*ie11 css hack*/
@media all and (-ms-high-contrast:none) {
	*::-ms-backdrop, .e-login .form .block input{
		background: transparent;
		border: none;
		border-bottom: 1px solid #2c466f;
	}
	*::-ms-backdrop, .e-login .form .login-marquee{
		background-color: rgba(255,255,255,0) !important;
	}
}
</style>
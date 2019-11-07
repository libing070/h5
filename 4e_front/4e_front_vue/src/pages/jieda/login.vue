<template>
<div class="jieda-login">
	<app-header :page_tab="page_tab"></app-header>
	<div class="form">
		<div class="username input">
			<input type="text" placeholder="请输入用户名" v-model.trim="obj.userName" ref="username"/>
		</div>
		<div class="password input">
			<input type="password" placeholder="请输入密码" v-model.trim="obj.password" @keyup.enter="submit" ref="password"/>
		</div>
		<div class="submit" @click="submit">
			<a><img src="../../assets/jieda/img/login_btn.png" v-show="isLock==false"></a>
			<a><img src="../../assets/jieda/img/login_progress.png" v-show="isLock==true"></a>
		</div>
	</div>
</div>
</template>
<script>
import Vue from 'vue'
import font_css from '@/assets/jieda/css/font.css'
import global_css from '@/assets/jieda/css/global.css'

import util_js from '@/assets/jieda/js/util.js'
Vue.use(util_js)

if(!"placeholder" in document.createElement("input")){
    $.getScript("../../assets/jieda/js/jquery.placeholder.js",function(){
        $(".username input").placeholder();
        $(".password input").placeholder();
    })
}

import Header from './header.vue'

var base = localStorage.getItem("base");

export default {
	data: function(){
		return {
			base: base,
			page_tab: "login",
			isLock: false,
			obj: {
				userName: "",
				password: ""
			}
		}
	},
	components : {
		"app-header": Header
	},
	methods: {
		submit: function() {
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
	created: function() {
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
.jieda-login {
	width: 100%;
	height: 100%;
	min-width: 1280px;
	min-height: 540px;
	background: url(../../assets/jieda/img/login_bg.png) no-repeat;
	background-size: cover;

	.form {
		width: 80%;
		min-width: 980px;
		position: absolute;
		bottom: 15%;
		height: 120px;
		padding-left: 153px;
		.input {
			width: 300px;
			height: 30px;
			float: left;
			border-bottom: 1px solid #fff;
			padding-bottom: 5px;
			input {
				height: 100%;
				width: 100%;
				background: transparent;
				border: none;
				font-size: 20px;
				font-family: "font-hy";
				color: #fff;
			}
		}
		.username {
			
		}
		.password {
			margin-left: 40px;
		}
		.submit {
			position: absolute;
			bottom: 0%;
			cursor: pointer;
		}
	}
}
</style>
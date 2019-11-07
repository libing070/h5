<template>
<div class="jieda-header">
	<div class="jieda_logo">
		<img src="../../assets/jieda/img/jieda_logo.png"/>
	</div>
	<div class="menu" v-if="page_tab!='login'">
		
		<ul>
			<li :class="page_tab=='index'?'current':''" @click="go2url('/')">
				<div>
				<span>{{"首页"|dz}}</span>
				<img src="../../assets/jieda/img/narrow.png" :style="page_tab!='index'?'visibility:hidden':''"/>
				</div>
			</li>
			<li :class="page_tab=='J-marketing'?'current':''" @click="go2url('/library')">
				<div>
				<span>J-marketing</span>
				<img src="../../assets/jieda/img/narrow.png" :style="page_tab!='J-marketing'?'visibility:hidden':''"/>
				</div>
			</li>
			<li :class="page_tab=='J-office'?'current':''" @click="go2url('/office')">
				<div>
				<span>J-office</span>
				<img src="../../assets/jieda/img/narrow.png" :style="page_tab!='J-office'?'visibility:hidden':''"/>
				</div>
			</li>
		</ul>
		<span class="info">
			<span class="split">|</span>
			<span class="login">
				<span class="avatar"><img :src="user.avatar"></span>
				<span class="username" @click="go2url('/my')">{{user.username}}</span>
			</span>
			<span class="split">|</span>
			<span class="language" v-if="languageType==0" @click="updateUserLanguage(1)">EN</span>
			<span class="language" v-if="languageType==1" @click="updateUserLanguage(0)">中</span>
			<span class="split">|</span>
			<span class="logout" @click="logout">{{"退出"|dz}}</span>
		</span>

	</div>
	<div class="faw_logo">
		<img src="../../assets/jieda/img/faw.png"/>
	</div>
</div>
</template>

<script>
import Vue from 'vue'
import util_js from '@/assets/jieda/js/util.js'
Vue.use(util_js)

var base = localStorage.getItem("base")
export default {
	data: function() {
		return {
			base: base,
			user: {
				username: "个人中心",
				avatar: require("../../assets/jieda/img/avatar.png")
			},
			isback: 0,
			foreignTypeList: [{id: 0, name: '中文'},{id: 1, name: 'English'}],
			languageType: 0,
		}
	},
    props:['page_tab'],
    created: function() {
    	var languageType = localStorage.getItem("languageType");
    	if (languageType!=null) {
    		this.languageType = languageType;
    	}
    },
    methods: {
    	go2url: function(url) {
    		window.location = url
    	},
    	logout: function() {
    		var that = this;
    		this.get(this.base+"/api/user/logout", null, function(data){
    			if (data.code==200) {
    				window.location = "/login";
    			}else{
    				that.showMsg("退出失败");
    			}
    		})
    	},
    	updateUserLanguage: function(languageType) {
    		var that = this;
	        $.ajax({
	            url: this.base+"/api/updateUserLanguageType",
	            data: {"languageType": languageType},
	            xhrFields: {
	                withCredentials: true
	            },
	            crossDomain: true,
	            success: function (data) {
	                localStorage.setItem("languageType", languageType);
	                that.languageType = languageType;
	                window.location.href=window.location.href;
	            }
	        });
	    }
    }
}
</script>

<style lang="scss" scope>
.jieda-header {
	width: 100%;
	height: 100px;
	background: #fff;
	min-width: 1280px;
	.jieda_logo {
		float: left;
		height: 100%;
		margin-left: 2%;
		img {
			height: 70%;
			margin-top: 8px;
		}
	}
	.menu {
		width: 67%;
		height: 90px;
		float: left;
		margin-top:10px;
		
		ul {
			list-style: none;
		    height: 30%;
		    width: 370px;
		    font-size: 18px;
		    font-family: "font-vw";
		    font-weight: 200;
		    margin-top: 21px;
		    padding-left: 6%;
		    display: inline-block;
		    float: left;

			li {
				padding-left: 30px;
				display: inline-block;
				color: #82868b;
				vertical-align: top;
				cursor: pointer;
				div {
					height: 50px;
					display: inline-block;
    				text-align: center;
					span {
						line-height: 36px;
						display: block;
						cursor: pointer;
					}
				}
				img {
					width: 10px;
					height: 6px;
					display: inline-block;
					margin-bottom: 9px;
				}
			}
			.current {
				font-family: "font-hy-55";
				font-weight: bold;
				color: #2e3e4e;
				vertical-align: sub;
				span {
					line-height: 34px;
				}
			}
		}
		.info {
			width: 35%;
		    height: 30%;
		    float: left;
		    margin-top: 27px;
		    font-size: 14px;
		    font-family: "font-hy-55";
		    font-weight: 300;
		    color: #2e3e4d;
			.split {
				color: #2e3e4d;
			    padding-left: 15px;
			    padding-right: 15px;
			    font-size: 12px;
			    font-weight: 100;
			}
			.login {
				.avatar {
					img {
						vertical-align: sub;
					}
				}
				.username {
					padding-left: 5px;
					line-height: 100%;
					vertical-align: middle;
				}
			}
			.language {
				width: 20px;
				height: 20px;
				line-height: 20px;
				background: #272f3a;
				display: inline-block;
				font-size: 12px;
				text-align: center;
				vertical-align: middle;
				border-radius: 50%;
				color: #fff;
				font-weight: 800;
				padding: 1px;
				cursor: pointer;
				font-family: 'font-hy-75';
			}
			.logout {
				cursor: pointer;
				display: inline-block;
    			vertical-align: middle;
			}
		}
	}
	
	.faw_logo {
		float: right;
		height: 100%;
		margin-right: 2%;
		img {
			height: 70%;
			margin-top: 15px;
		}
	}
}
</style>
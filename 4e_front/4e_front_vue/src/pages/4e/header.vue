<!-- header -->
<template>
	<div class="e-header">
		<div class="menu">
			<ul>
				<li :class="page_tab=='index'?'current':''" @click="go2url('/')">
					<div>
						<span>{{'首页'|dz}}</span>
						<img src="../../assets/4e/img/narrow.png" :style="page_tab!='index'?'visibility:hidden':''">
					</div>
				</li>
				<li :class="page_tab=='library'?'current':''" @click="go2url('/library')">
					<div>
						<span>{{'e-library'|dz}}</span>
						<img src="../../assets/4e/img/narrow.png" :style="page_tab!='library'?'visibility:hidden':''">
					</div>
				</li>
				<li :class="page_tab=='shop'?'current':''" @click="go2url('/shop')">
					<div>
						<span>{{'e-shop'|dz}}</span>
						<img src="../../assets/4e/img/narrow.png" :style="page_tab!='shop'?'visibility:hidden':''">
					</div>
				</li>
				<li :class="page_tab=='office'?'current':''" @click="go2url('/office')">
					<div>
						<span>{{'e-office'|dz}}</span>
						<img src="../../assets/4e/img/narrow.png" :style="page_tab!='office'?'visibility:hidden':''">
					</div>
				</li>
				<li :class="page_tab=='study'?'current':''" @click="go2url('/study')">
					<div>
						<span>{{'e-study'|dz}}</span>
						<img src="../../assets/4e/img/narrow.png" :style="page_tab!='study'?'visibility:hidden':''">
					</div>
				</li>
				<li :class="page_tab=='my'?'current':''" @click="go2url('/my')">
					<div class="avatar">
						<div class="img_d">
							<img class="ttt" src="../../assets/4e/img/avatar.png"/>
							<span>{{'个人中心'|dz}}</span>
						</div>
						<div class="nnn">
							<img src="../../assets/4e/img/narrow.png" :style="page_tab!='my'?'visibility:hidden':''">
						</div>
					</div>
				</li>
				<li>
					<div class="logout" @click="logout">
						<span>{{'退出'|dz}}</span>
					</div>
				</li>
				<li>
					<div class="language">
						<span v-if="languageType==0" @click="updateUserLanguage(1)">EN</span>
						<span v-if="languageType==1" @click="updateUserLanguage(0)">中</span>
					</div>
				</li>
			</ul>
		</div>
		<div class="faw_logo">
			<img src="../../assets/4e/img/faw.png"/>
		</div>
		<div class="line">
			<div class="line1"></div>
			<img src="../../assets/4e/img/faw-b.png"/>
			<div class="line2"></div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import util_js from '@/assets/4e/js/util.js'
Vue.use(util_js)

import favicon_js from '@/assets/4e/js/favicon.js'


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
    	this.get(this.base+"/api/user/islogin", null, function(data){
			if (data.code==200) {
				//同步语言种类
				localStorage.setItem("languageType", data.data.lastLanguageType);
			}
		}, false);
    	var languageType = localStorage.getItem("languageType");
    	if (languageType==2) {
    		this.languageType = 0;
    		//纠正语言错误
    		this.updateUserLanguage(0);
    	}
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
.e-header {
	width: 100%;
	height: 100px;
	position: absolute;
	top: 0px;
	z-index: 999;
	min-width: 1280px;
	.menu {
		width: 77%;
		height: 60px;
		float: left;
		margin-top:10px;
		
		ul {
			list-style: none;
		    height: 50%;
		    width: 1100px;
		    font-size: 18px;
		    font-family: "font-hy-55";
		    font-weight: 200;
		    margin-top: 21px;
		    padding-left: 3%;
		    display: inline-block;
		    float: left;

			li {
				padding-left: 30px;
				display: inline-block;
				color: #fff;
				vertical-align: top;
				cursor: pointer;
				div {
					height: 50px;
					display: inline-block;
    				text-align: center;
					span {
						display: block;
						cursor: pointer;
					}
				}
				

			}
			.current {
				font-family: "font-hy-75";
				font-weight: bold;
				vertical-align: top;
				
			}
		}
		.avatar {
			margin-left: 50px;
			.img_d {
				span {
					display: inline-block;
					vertical-align: top;
				}
				.ttt {
				    width: 20px;
				    height: 20px;
				    display: inline-block;
				    vertical-align: baseline;
				}
				height: 33px;
			}
			.nnn {
				display: block;
				height: 10px;
				text-align: center;
				img {
					display: inline-block;
					margin-bottom: 12px;
				}
			}
		}
		.language {
			width: 20px;
			height: 20px;
			line-height: 20px;
			//line-height: 24px \9;
			background: #4e009a;
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
			margin-top: -3px;
			span{
				line-height: 24px \9;
			}
		}
		.logout {
			cursor: pointer;
			display: inline-block;
			vertical-align: middle;
		}
		
	}
	
	.faw_logo {
		float: right;
		height: 95%;
		margin-right: 4%;
		img {
			height: 30%;
			margin-top: 31px;
		}
	}
	.line {
		height: 52px;
		float: left;
		width: 100%;
		margin-top: -40px;

		.line1 {
			margin-top: 25px;
			height: 2px;
			width: 70%;
			background: #fff;
			float: left;
		}
		img {
			height: 100%;
			display: inline-block;
			float: left;
		}
		.line2 {
			margin-top: 25px;
			height: 2px;
			width: calc(30% - 78px);
			background: #fff;
			float: right;
		}
	}
}


/*ie11注意里面的标点符号*/
/*ie10 css hack*/
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
	.e-header .menu .language span{
		line-height: 24px;
	}
}
</style>
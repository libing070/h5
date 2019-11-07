<!--问卷调查问卷审核-->
<template>
<div class="w-list-wenjuan-w" v-cloak>
	<div class="nav">
		<div class="back">
			<img src="../../assets/4e/img/back.png"/>
			<span>返回</span>
		</div>
	</div>
	<div class="submit" v-if="userManage==1">
		<div @click="pass">
			<span>审核通过</span>
		</div>
		<div @click="deny">
			<span>驳回</span>
		</div>
	</div>
	<div class="wenjuan">
		<div class="title"><span>{{info.title}}</span></div>
		<div class="list">
			<ul>
				<li v-for="(item, index) in data">
					<div class="item ok" :data-id="item.id" :data-type="item.type" :answer="item.answer.answerText">
						<div v-if="item.type==1" class="cccc">
							<div class="des">
								<span>{{index+1}}. </span>
								<span>{{item.title}}</span>
								<span class="type">(问答题)</span>
							</div>
							<div class="contents">
								<textarea placeholder="请填写答案" :value="item.answer.answerText"></textarea>
							</div>
						</div>
						<div v-if="item.type==2" class="cccc">
							<div class="des">
								<span>{{index+1}}. </span>
								<span>{{item.title}}</span>
								<span class="type">(上传文件题)</span>
							</div>
							<div class="contents">
								<form enctype="multipart/form-data" method="post" style="opacity: 0">
									<input name="file" type="file" class="upload_h"/>
									<input type="button" value="上传文件" class="upload"/>
								</form>
								<div class="uploadinfo">
									<div>
									<span>上传文件名称：</span>
									<span class="filename">{{item.answer.answerTextJson.name}}</span>
									</div>
									<div>
									<span>上传文件大小：</span>
									<span class="filesize">{{item.answer.answerTextJson.sizeStr}}</span>
									</div>
									<div>
									<span>上传文件类型：</span>
									<span class="filetype">{{item.answer.answerTextJson.type}}</span>
									<span class="download">
										<a :href="item.answer.answerTextJson.path" target=_blank>下载</a>
									</span>
									</div>
								</div>
							</div>
							<div class="preview" v-if="item.answer.answerTextJson.type=='jpg' || item.answer.answerTextJson.type=='jpeg' || item.answer.answerTextJson.type=='png' || item.answer.answerTextJson.type=='gif'" :style="{backgroundImage: 'url(\'' + item.answer.answerTextJson.path + '\')', backgroundSize:'contain',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}">
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</div>
</template>

<script>
	import Vue from 'vue'
	var base = localStorage.getItem("base")
	import util_js from '@/assets/4e/js/util.js'
	import font_css from '@/assets/4e/css/font.css'
	import global_css from '@/assets/4e/css/global.css'
	Vue.use(util_js)
	export default {
		data: function(){
			return {
				base: base,
				info: {},
				qaUser: {},
				data: [],
				qaId: 0,
				userId: 0,
				userManage: 0
			}
		},
		created: function() {
			var that = this;
			this.qaId = this.$route.query.qaId;
			this.userId = this.$route.query.userId;
			this.get(this.base+"/api/user/islogin", null, function(data){
				if (data.code==0) {
					parent.window.location = "/login";
					return;
				}
				that.user = data.data;
			});
			this.getInfo();
			this.getData();
			$("body").on("click", '.nav div', function(){
				history.go(-1);
			})
		},
		methods: {
			getInfo: function() {
				var that = this;
				this.get(this.base+"/api/policy/detail?qaId="+this.qaId+"&userId="+this.userId, null, function(data){
					if (data.code==200) {
						that.info = data.data.info;
						that.qaUser = data.data.qaUser;
						if (that.qaUser.verifyStatus!=null && that.qaUser.verifyStatus!=1 && that.info.status==2) {
							that.userManage = 1;
						}
					}
				});
			},
			getData: function() {
				var that = this;
				this.get(this.base+"/api/policy/qstn/fulllist?qaId="+this.qaId+"&userId="+this.userId, null, function(data){
					if (data.code==200) {
						that.data = data.data;
						for(var key in that.data) {
							var item = that.data[key];
							if (item.type==2 && item.answer!=null) {
								item.answer.answerTextJson = JSON.parse(item.answer.answerText);
							}
						}
						that.parentHeight();
					}
				});
			},
			pass: function() {
				var params = {};
				params.qaId = this.qaId;
				params.userId = this.userId;
				this.json(this.base+"/api/policy/pass", this.cc(params), function(data){
					if (data.code==200) {
						history.go(-1);
					}else{
						parent.window.location = "/login";
					}
				});
			},
			deny: function() {
				var params = {};
				params.qaId = this.qaId;
				params.userId = this.userId;
				this.json(this.base+"/api/policy/deny", this.cc(params), function(data){
					if (data.code==200) {
						history.go(-1);
					}else{
						parent.window.location = "/login";
					}
				});
			},
			parentHeight: function() {
				$(window.parent.document).find("iframe").height(($(".w-list-wenjuan-w").height()+100)+'px');
			}
		}
	}

</script>


<style lang="scss" scope>
	.w-list-wenjuan-w {
		min-height: 600px;
		.nav {
			height: 30px;
			width: 100px;
			display: inline-block;
			.back {
				cursor: pointer;
				img {
					margin-top: -5px;
					display: inline-block;
				}
				span {
					display: inline-block;
					margin-left: 3px;
					color: #193461;
				}
			}
		}
		.submit {
			display: inline-block;
    		float: right;
    		margin-right: 10%;
			text-align: center;
			height: 25px;
			div {
				width: 90px;
				height: 100%;
				color: #001e50;
				border-radius: 20px 20px;
				border: 1px solid #001e50;
				font-size: 14px;
				cursor: pointer;
				margin-right: 10px;
				display: inline-block;
				span {
					margin-top: 2px;
					display: block;
				}
			}
		}
	
		.wenjuan {
			min-width: 900px;
			width: 90%;
			height: 600px;
			overflow-y: auto;
			border-top: 1px solid #00437a;
			margin-left: 18px;
			margin-top: 20px;
			.title {
				background: #fff;
			    position: absolute;
			    padding-top: 10px;
			    padding-right: 10px;
			    text-align: center;
			    font-size: 18px;
			    color: #00437a;
			}
			.list {
				padding-top: 40px;
				ul {
					list-style: none;
					width: 100%;
					li {
						margin-top: 20px;
						width: 100%;
						border-top: 1px solid #dcdddd;
						border-bottom: 1px solid #dcdddd;
						.item {
							.cccc {
								.des {
									height: 30px;
									width: 80%;
									color: #00437a;
									display: inline-block;
									margin-top: 5px;
									.type {
										margin-left: 20px;
										color: #e2e2e2;
									}
									span:nth-child(1) {
										margin-right: 6px;
									}
									span:nth-child(2) {
										font-weight: bold;
									}
								}
								.preview {
									width: 200px;
								    height: 158px;
								    float: right;
								    margin-top: -35px;
								}
								.contents {
									margin-top: 10px;
									margin-left: 20px;
									width: 600px;
									display: inline-block;
									textarea {
										width: 100%;
										height: 100px;
										padding: 15px;
										border-radius: 5px 5px;
										color: #000;
									}
									.upload {
										color: #00437a;
										width: 90px;
										border: 2px solid #00437a;
										border-radius: 10px 10px;
										cursor: pointer;
									}
									.upload_h {
										width: 90px;
										position: absolute;
										opacity: 0;
										cursor: pointer;
									}
									.uploadinfo {
									    height: 59px;
									    width: 505px;
									    margin-top: 30px;
									    color: #28426c;
									    div {
									    	height: 20px;
									    	float: left;
									    	width: 90%;
									    }
									    img {
									    	float: right;
									    }
									    .download {
									    	margin-left: 80px;
									    	a {
									        margin-left: 10px;
										    text-decoration: none;
										    color: #00437a;
										    padding: 3px 7px;
										    border: 2px solid #00437a;
										    border-radius: 10px 10px;
										    cursor: pointer;
										    }
									    }
									}
								}
								padding-bottom: 20px;
							}
						}
					}
				}
			}
		}

		
	}
</style>
<!--问卷调查问卷-->
<template>
<div class="w-list-wenjuan" v-cloak>
	<div class="nav">
		<div class="back">
			<img src="../../assets/4e/img/back.png"/>
			<span>返回</span>
		</div>
	</div>
	<div class="submit">
		<div @click="submit">
			<span>上传提交</span>
		</div>
	</div>
	<div class="wenjuan">
		<div class="title"><span>{{info.title}}</span></div>
		<div class="list">
			<ul>
				<li v-for="(item, index) in data">
					<div class="item" :data-id="item.id" :data-type="item.type">
						<div v-if="item.type==1" class="cccc">
							<div class="des">
								<span>{{index+1}}. </span>
								<span>{{item.title}}</span>
								<span class="type">(问答题)</span>
							</div>
							<div class="contents">
								<textarea placeholder="请填写答案"></textarea>
							</div>
						</div>
						<div v-if="item.type==2" class="cccc">
							<div class="des">
								<span>{{index+1}}. </span>
								<span>{{item.title}}</span>
								<span class="type">(上传文件题)</span>
							</div>
							<div class="contents">
								<form enctype="multipart/form-data" method="post">
									<input name="file" type="file" class="upload_h"/>
									<input type="button" value="上传文件" class="upload"/>
								</form>
								<div class="uploadinfo">
									<div>
									<span>上传文件名称：</span>
									<span class="filename"></span>
									</div>
									<div>
									<span>上传文件大小：</span>
									<span class="filesize"></span>
									</div>
									<div>
									<span>上传文件类型：</span>
									<span class="filetype"></span>
									<span class="download">
										<a href="" target=_blank>下载</a>
										<a class="close">删除</a>
									</span>
									</div>
								</div>
							</div>
							<div class="preview">
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
				qaId: 0
			}
		},
		created: function() {
			var that = this;
			this.qaId = this.$route.query.qaId;
			this.get(this.base+"/api/user/islogin", null, function(data){
				if (data.code==0) {
					parent.window.location = "/login";
					return;
				}
				that.user = data.data;
			});
			this.getInfo();
			this.getData();
			$("body").on("change", "textarea", function(){
				var text = $.trim($(this).val());
				var item = $(this).parent().parent().parent();
				if (text!="") {
					item.addClass("ok");
					item.attr("answer", text);
				}else{
					item.removeClass("ok");
					item.removeAttr("answer");
				}
			});
			$("body").on("click", ".uploadinfo .close", function(){
				$(this).parent().parent().parent().hide();
				var item = $(this).parent().parent().parent().parent().parent().parent();
				item.removeClass("ok");
				item.removeAttr("answer");
				item.find(".preview").hide();
			});
			$("body").on("change", ".upload_h", function(){
				var form = $(this).parent();
				var formData = new FormData(form[0]);
				$.ajax({
	                type: 'post',
	                url: that.base+"/api/image/upload",
	                data: formData,
	                cache: false,
	                processData: false,
	                contentType: false,
	            	success: function (data) {
	            		var info = form.next(".uploadinfo");
	            		info.show();
	            		info.find(".filename").text(data.data.name);
	            		info.find(".download").html("<a href='"+data.data.path+"' target=_blank>下载</a><a class='close'>删除</a>");
	            		info.find(".filesize").text(data.data.sizeStr);
	            		info.find(".filetype").text(data.data.type);
	            		var item = info.parent().parent().parent();
	            		item.addClass("ok");
	            		item.attr('answer', JSON.stringify(data.data));
	            		form.find("input[type=file]").val("");
	            		if ($.inArray(data.data.type, ['jpg','jpeg','png','gif'])!=-1) {
	            			info.parent().next(".preview").show();
	            			info.parent().next(".preview").css({backgroundImage: 'url(\'' + data.data.path + '\')', backgroundSize:'contain',backgroundRepeat:'no-repeat',backgroundPosition:'center center'})
	            		}else{
	            			info.parent().next(".preview").hide();
	            		}
	            	},
	            	error: function () {
	                	util.showMsg("上传失败");
	            	}
	            });
			});
			$("body").on("click", '.nav div', function(){
				history.go(-1);
			})
		},
		methods: {
			getInfo: function() {
				var that = this;
				this.get(this.base+"/api/policy/detail?qaId="+this.qaId, null, function(data){
					if (data.code==200) {
						that.info = data.data.info;
						that.qaUser = data.data.qaUser;
					}
				});
			},
			getData: function() {
				var that = this;
				this.get(this.base+"/api/policy/qstn/list?qaId="+this.qaId, null, function(data){
					if (data.code==200) {
						that.data = data.data;
						that.parentHeight();
					}
				});
			},
			submit: function() {
				var params = {};
				params.qaId = this.qaId;
				var item_length = $(".item").length;
				var ok_length = $(".ok").length;
				if (ok_length!=item_length) {
					this.showMsg("您有题目未完成，请完成回答后提交");
					return;
				}
				var list = [];
				var items = $(".ok");
				items.each(function(){
					var item = $(this);
					var tmp = {};
					tmp.id = item.attr('data-id');
					tmp.type = item.attr('data-type');
					tmp.answer = item.attr('answer');
					list.push(tmp);
				});
				params.data = list;
				console.log(params);
				this.json(this.base+"/api/policy/answer", this.cc(params), function(data){
					if (data.code==200) {
						window.location = "/list_w_answered";
					}else{
						parent.window.location = "/login";
					}
				});
			},
			parentHeight: function() {
				$(window.parent.document).find("iframe").height(($(".w-list-wenjuan").height()+100)+'px');
			}
		}
	}

</script>


<style lang="scss" scope>
	.w-list-wenjuan {
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
    		margin-right: 5%;
			text-align: center;
			height: 25px;
			div {
				width: 90px;
				height: 100%;
				color: #001e50;
				border-radius: 20px 20px;
				border: 2px solid #001e50;
				margin-left: calc(50% - 45px);
				font-size: 14px;
				cursor: pointer;
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
								    display: none;
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
										float: left;
										margin-left: -90px;
									}
									.upload_h {
										width: 90px;
										opacity: 0;
										cursor: pointer;
    									
										float: left;
									}
									.uploadinfo {
										display: none;
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
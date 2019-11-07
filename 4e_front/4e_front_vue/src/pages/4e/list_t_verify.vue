<!--物料提报审核页-->
<template>
<div class="t-list-verify">
	<div class="nav">
		<div>
			<img src="../../assets/4e/img/back.png"/>
			<span>返回</span>
		</div>
	</div>
	<div class="list">
		<ul>
			<li :class="index==0?'template ok':'ok'" v-for="(log,index) in list" :data-sid="log.sid" :data-state="log.verifystate">
				<div class="item">
					<div class="body" :style="{backgroundImage: 'url(\'' + log.img + '\')', backgroundSize:'contain',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
					<div class="ifooter">
						<span class="left">{{log.carname}}</span>
						<span class="right">{{log.typename}}</span>
					</div>
					<div class="check">
						<div class="left nocheck" :data-id="log.sid">
							<div></div>
						</div>
						<div class="right">
							<span>{{log.size}}<img src="../../assets/4e/img/file_size.png"></span>
							<span>{{log.addtime}}<img src="../../assets/4e/img/file_time.png"></span>
						</div>
					</div>
				</div>
			</li>
		</ul>
	</div>
	<div class="operations">
		<div class="title">
			<span>以上所选素材</span>
		</div>
		<div class="pass">
			<div class="nochoice" data-value="1"></div>
			<span>无问题通过</span>
		</div>
		<div class="deny">
			<div class="nochoice" data-value="2"></div>
			<span>提交有问题驳回</span>
		</div>
		<div class="reason">
			<textarea class="input"></textarea>
		</div>
	</div>
	<div class="submit" v-if="userManage==1">
		<div @click="submit">
			<span>审核完毕</span>
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
			list: [],
			user: {},
			userManage: 0
		}
	},
	created: function() {
		var that = this;
		this.batch = this.$route.query.batch;
		this.dealerId = this.$route.query.dealerid;
		this.get(this.base+"/api/user/islogin", null, function(data){
			if (data.code==0) {
				parent.window.location = "/login";
				return;
			}
			that.user = data.data;
			if ($.inArray(that.user.roleId, [1, 5, 8, 9, 11, 13, 15] )!=-1) {
				that.userManage = 1;
			}else{
				that.userManage = 0;
			}
		}, false);
		that.parentHeight();
		this.getList();
		$("body").on("click", '.nav div', function(){
			history.go(-1);
		})

		$("body").on('click', ".nocheck,.checkin", function(){
			if ($(this).hasClass('nocheck')) {
				$(this).removeClass('nocheck');
				$(this).addClass('checkin');
			}else{
				$(this).removeClass('checkin');
				$(this).addClass('nocheck');
			}
		});
		$("body").on('click', ".nochoice", function(){
			$(this).removeClass('nochoice');
			var old = $('.choice');
			if (old!=null) { 
				old.removeClass('choice');
				old.addClass('nochoice');
			}
			$(this).addClass('choice');

		});

		$("body").on('click', ".pass", function(){
			$(".nocheck,.checkin").find("div").hide();
		});
		$("body").on('click', ".deny", function(){
			$(".nocheck,.checkin").find("div").show();
		});

	},
	methods: {
		getList: function() {
			var that = this;
			this.get(this.base + "/api/fawvwmaterial/log/list?dealerId="+that.dealerId+"&batchId="+that.batch, null, function(data){
				if (data.code==200) {
					that.list = data.data;
					that.parentHeight();
				}
			})
		},
		submit: function() {
			if ($(".choice").length==0) {
				this.showMsg("请选择审核结果后提交");
				return;
			}
			if ($(".choice").attr("data-value")==2 && $.trim($(".reason").find("textarea").val())=='') {
				this.showMsg("请填写审核驳回原因");
				return;
			}
			var that = this;
			var params = {};
			params.batchId = that.batch;
			params.dealerId = that.dealerId;
			params.verifystatus = $(".choice").attr("data-value");
			params.reason = $(".reason").find("textarea").val();
			var checks = [];
			$(".checkin").each(function(){
				checks.push($(this).attr("data-id"));
			});
			params.checks = checks;
			this.json(this.base + "/api/fawvwmaterial/verify", this.cc(params), function(data){
				if (data.code==200) {
					that.showMsg("提交成功");
					history.go(-1);
				}else{
					that.showMsg("提交失败");
				}
			})
		},
		parentHeight: function() {
			$(window.parent.document).find("iframe").height(($(".t-list-verify").height()+800)+'px');
		},
	}
}
</script>

<style lang="scss" scope>
	.t-list-verify {
		width: 100%;
		.nav {
			height: 30px;
			div {
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
		.list {
			width: 100%;
			ul {
				list-style: none;
				padding: unset;
				display: inline-block;
				li {
					width: 280px;
					height: 350px;
					margin-right: 20px;
					margin-bottom: 20px;
					display: inline-block;
					float: left;
					.item {
						text-align: center;
						.body {
							width: 100%;
							height: 230px;
							display: inline-block;
							margin-top: 10px;
							border: 1px solid #e1e6e9;
						}
						.ifooter {
							height: 40px;
							margin-top: 8px;
							font-size: 14px;
							.left {
								float: left;
								margin-left: 3px;
							}
							.right {
								float: right;
								color: #58c3f3;
								margin-right: 3px;
							}
							border-bottom: 1px solid #e1e6e9;
						}
						.check {
							height: 60px;
							.left {
								height: 60px;
								width: 40px;
								float: left;
								margin-top: 10px;
							}
							.nocheck {
								div {
									width: 20px;
									height: 20px;
									margin-left: 10px;
									margin-top: 20px; 
									background: url(../../assets/4e/img/nocheck.png) no-repeat;
									background-size: 100% 100%;
									cursor: pointer;
								}
								border-bottom: 1px solid #e1e6e9;
							}
							.checkin {
								div {
									width: 20px;
									height: 20px;
									margin-left: 10px;
									margin-top: 20px; 
									background: url(../../assets/4e/img/checkin.png) no-repeat;
									background-size: 100% 100%;
									cursor: pointer;
								}
								border-bottom: 1px solid #001e50;
							}
							.right {
								height: 60px;
								width: 220px;
								float: right;
								margin-top: 10px;
								text-align: right;
								color: #e1e6e9;
								span {
									display: block;
									margin-top: 10px;
									img {
										margin-left: 5px;
										margin-top: 2px;
									    display: inline-block;
									    vertical-align: text-top;
									}
								}
								border-bottom: 1px solid #e1e6e9;
							}
						}

					}
				}
			}
		}
		.operations {
			width: 100%;
			height: 300px;
			padding-top: 50px;
			.title {
				height: 30px;
				width: 100px;
				display: inline-block;
				span {
					font-size: 14px;
				}
			}
			.pass {
				height: 30px;
				width: 140px;
				display: inline-block;
				.choice {
					width: 20px;
					height: 20px;
					margin-left: 10px;
					margin-right: 10px;
					float: left;
    				margin-top: 3px; 
					background: url(../../assets/4e/img/checkin.png) no-repeat;
					background-size: 100% 100%;
					cursor: pointer;
					display: inline-block;
				}
				.nochoice {
					width: 20px;
					height: 20px;
					margin-left: 10px;
					margin-right: 10px;
					float: left;
    				margin-top: 3px; 
					background: url(../../assets/4e/img/nocheck.png) no-repeat;
					background-size: 100% 100%;
					cursor: pointer;
					display: inline-block;
				}
				span {
					font-size: 14px;
				}
			}
			.deny {
				height: 30px;
				width: 140px;
				display: inline-block;
				.choice {
					width: 20px;
					height: 20px;
					margin-left: 10px;
					margin-right: 10px;
					float: left;
    				margin-top: 3px; 
					background: url(../../assets/4e/img/checkin.png) no-repeat;
					background-size: 100% 100%;
					cursor: pointer;
					display: inline-block;
				}
				.nochoice {
					width: 20px;
					height: 20px;
					margin-left: 10px;
					margin-right: 10px;
					float: left;
    				margin-top: 3px; 
					background: url(../../assets/4e/img/nocheck.png) no-repeat;
					background-size: 100% 100%;
					cursor: pointer;
					display: inline-block;
				}
				span {
					font-size: 14px;
				}
			}
			.reason {
				margin-top: 10px;
				width: 90%;
				height: 170px;
				.input {
					width: 100%;
					height: 100%;
				}
			}

		}
		.submit {
			width: 100%;
			margin-top: 0px;
			text-align: center;
			height: 30px;
			div {
				width: 90px;
				height: 100%;
				color: #001e50;
				border-radius: 20px 20px;
				border: 2px solid #001e50;
				margin-left: calc(50% - 45px);
				font-size: 16px;
				cursor: pointer;
				span {
					margin-top: 2px;
					display: block;
				}
			}
		}

	}
</style>


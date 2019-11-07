<!--广告创意提报查看更新页-->
<template>
<div class="g-list-show">
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
					<div class="iheader">
						<span>车型</span>
						<div class="car_c">
							<select class="car" :value="log.car">
								<option v-for="(item,index) in carList" :value="item.id">{{item.name}}</option>
							</select>
						</div>
						<img src="../../assets/4e/img/close.png" class="iclose" v-if="log.verifystate!=1 && userManage==1"/>
					</div>
					<div class="body" :style="{backgroundColor: '#fff',backgroundImage: 'url(\'' + log.img + '\')', backgroundSize:'contain',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}">
						<form enctype="multipart/form-data" method="post">
							<input type="button" class="upload" value="上传图片"></input>
							<input type="file" name="file" class="upload_h"></input>
						</form>
					</div>
					<div class="ifooter">
						<img src="../../assets/4e/img/close1.png" class="close1" v-if="log.verifystate!=1 && userManage==1"/><span>{{log.name}}</span>
						<span style="color:#001e50" v-if="log.verifystate==1">(已审核通过)</span>
						<span style="color:red" v-if="log.verifystate==2 && log.ischeck==true">(被驳回)</span>
					</div>
				</div>
			</li>
			<li>
				<div class="new">
					<span>+</span>
				</div>
			</li>
		</ul>
	</div>
	<div class="submit" v-if="userManage==1">
		<div @click="submit">
			<span>上传提交</span>
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
			carList: [],
			typeList: [],
			batch: "",
			dealerId: 0,
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
			if (that.user.dealerId == that.dealerId) {
				that.userManage = 1;
			}else{
				that.userManage = 0;
			}
			that.parentHeight();
		});
		this.getCarList();
		this.getList();
		setInterval(function(){that.parentHeight();}, 1000);
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
                	form.parent().css({backgroundColor: '#fff',backgroundImage: 'url(\'' + data.data.path + '\')', backgroundSize:'contain',backgroundRepeat:'no-repeat',backgroundPosition:'center center'});
                	form.parent().attr('path', data.data.path);
                	form.hide();
                	form.parent().next(".ifooter").find("span").text(data.data.name);
                	form.parent().next(".ifooter").find("span").attr('size',data.data.size);
                	form.parent().next(".ifooter").show();
                	form.parent().parent().parent().addClass("ok");
            	},
            	error: function () {
                	that.showMsg("上传失败");
            	}
            });
		})
		$("body").on('click', '.new', function(){
			var html = $(".template").clone();
			$(".new").parent().before(html);
			var item = $(".list .item:last").parent();
			item.removeAttr('class');
			item.removeAttr('data-sid');
			item.find(".body").removeAttr("style");
			item.find(".body").removeAttr("path");
			item.find(".body").find("form").show();
			item.find(".ifooter").find("span").text("");
			item.find(".ifooter").find("span").attr("size", 0);
			item.find(".ifooter").hide();
			item.show();
			that.parentHeight();
		});
		$("body").on('click', '.iclose', function(){
			var item = $(this).parent().parent().parent();
			item.removeClass("ok");
			if (item.hasClass("template")) {
				item.hide();
			}else{
				item.remove();
			}
			that.parentHeight();
		});

		$("body").on('click', '.close1', function(){
			var body = $(this).parent().prev(".body");
			body.removeAttr('path');
			body.removeAttr('style');
			body.find('form').show();
			body.parent().parent().removeClass('ok');
			$(this).next('span').text('');
			$(this).parent().hide();
		});

		$("body").on("click", '.nav div', function(){
			history.go(-1);
		})

	},
	methods: {
		getCarList: function() {
			var that = this;
			this.get(this.base + "/api/dealer/cars", null, function(data){
				if (data.code==200) {
					that.carList = data.data;
				}
			})
		},
		getList: function() {
			var that = this;
			this.get(this.base + "/api/fawvwmaterial/log/list?dealerId="+that.dealerId+"&batchId="+that.batch, null, function(data){
				if (data.code==200) {
					that.list = data.data;
					for(var key in that.list) {
						var tmp = that.list[key];
						tmp.checks = JSON.parse(tmp.checks);
						tmp.ischeck = false;
						for(var i in tmp.checks) {
							var check = tmp.checks[i];
							if (parseInt(check)==tmp.sid) {
								tmp.ischeck = true;
								break;
							}
						}
					}
				}
			})
		},
		submit: function() {
			var that = this;
			var datas = $(".list .ok");
			var items = [];
			for(var i=0;i<datas.length;i++) {
				var item = $(datas[i]);
				var state = item.data('state');
				if (state==1) {
					continue;
				}
				items.push(item);
			}
			if (items.length==0) {
				that.showMsg("请先上传物料后提报");
				return;
			}
			var params = {};
			var data = [];
			for(var i=0;i<items.length;i++) {
				var item = $(items[i]);
				var sid = item.data('sid');
				var car = item.find(".car").val();
				var img = item.find(".body").attr('path');
				var name = item.find(".ifooter").find('span').text();
				var size = item.find(".ifooter").find('span').attr('size');
				var tmp = {};
				tmp.sid = sid;
				tmp.car = car;
				tmp.img = img;
				tmp.name = name;
				tmp.size = size;
				tmp.dealer = that.dealerId;
				data.push(tmp);
			}
			params.data = data;
			params.batch = that.batch;
			this.json(this.base + "/api/fawvwad/submit", this.cc(params), function(data){
				if (data.code==200) {
					that.showMsg("提交成功");
					history.go(-1);
				}else{
					parent.window.location = "/login";
				}
			})
		},
		parentHeight: function() {
			$(window.parent.document).find("iframe").height(($(".g-list-show").height()+400)+'px');
		},
	}
}
</script>

<style lang="scss" scope>
	.g-list-show {
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
					width: 350px;
					height: 350px;
					background: #eff1f3;
					margin-right: 15px;
					margin-bottom: 15px;
					display: inline-block;
					float: left;
					.item {
						text-align: center;
						.iheader {
							height: 30px;
							font-size: 14px;
							margin-top: 20px;
							text-align: center;
							color: #001e50;
							.car_c {
								display: inline-block;
								width: 70px;
								.car {
									border: unset;
									background: transparent;
									font-size: 14px;
									width: 100%;
									color: #001e50;
								}
								border-bottom: 1px solid #00437a;
							}
							.type_c {
								display: inline-block;
								width: 90px;
								.type {
									border: unset;
									background: transparent;
									font-size: 14px;
									width: 100%;
									color: #001e50;
								}
								border-bottom: 1px solid #00437a;
							}
							.gap {
								width: 10px;
								display: inline-block;
							}
							.iclose {
								width: 20px;
							    margin-right: 25px;
							    cursor: pointer;
							    float: right;
							}
						}
						.body {
							width: 280px;
							height: 230px;
							background: #6bc8f4;
							display: inline-block;
							margin-top: 10px;
							img {
								width: 100%;
								height: 100%;
							}
							form {
								display: none;
								.upload_h {
									width: 80px;
									height: 30px;
									display: inline-block;
									font-size: 14px;
									border-radius: 10px 10px;
									-webkit-appearance: none;
									margin-top: 70px;
									color: #001e50;
									margin-left: -86px;
									opacity: 0;
									cursor: pointer;
								}
								.upload {
									width: 80px;
									height: 30px;
									display: inline-block;
									font-size: 14px;
									border-radius: 10px 10px;
									-webkit-appearance: none;
									margin-top: 70px;
									color: #001e50;
									
								}
							}
						}
						.ifooter {
							margin-left: 34px;
							text-align: left;
							margin-top: 5px;
							font-size: 14px;
							span {
								display: inline-block;
								margin-left: 5px;
							}
							img {
								cursor: pointer;
								width: 13px;
							}
						}

					}
				}
				.new {
					height: 350px;
					text-align: center;
					color: #fff;
    				cursor: pointer;
					span {
						display: inline-block;
						width: 100%;
						height: 100%;
						margin-top: 15px;
						font-weight: 900;
						font-size: 200px;
					}
				}
			}
		}
		.submit {
			width: 100%;
			margin-top: 50px;
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


<!--新标准展厅平面图例-->
<template>
	<div class="platform-standard">
		<div class="operations" v-if="userManage==1">
			<div class="addbtn">添加标记点</div>
		</div>
		<div class="background">
			<div class="platform" ref="platform">
			</div>
		</div>
		<div class="setting" v-show="isShowSetting==true">
			<div class="block">
				<span>物料种类:</span>
				<div class="cc">
					<select class="component cctype">
						<option value="0">请选择</option>
						<option v-for="(item,index) in typeList" :value="item.tid">{{item.typename}}</option>
					</select>
				</div>
			</div>
			<div class="block">
				<span>物料名称:</span>
				<div class="cc">
					<select class="component ccmaterial">
						<option value="0">请选择</option>
						<option v-for="(item,index) in materialList" :value="item.id">{{item.materialname}}</option>
					</select>
				</div>
			</div>
			<div class="block">
				<span>尺寸规划:</span>
				<div class="cc">
					<span class="component ccsize"></span>
				</div>
			</div>
			<div class="block">
				<span>安装位置:</span>
				<div class="cc">
					<span class="component cclocation"></span>
				</div>
			</div>
			<div class="block">
				<span>开始时间:</span>
				<div class="cc">
					<input class="component ccstarttime" type="text"/>
				</div>
			</div>
			<div class="block">
				<span>物料代码:</span>
				<div class="cc">
					<span class="component ccmaterialcode"></span>
				</div>
			</div>
			<div class="block">
				<span>物料图示:</span>
				<div class="bg"></div>
			</div>
			<div class="block btnopt">
				<div class="btn submit" v-show="isAdd==true">设置该物料</div>
				<div class="btn cancel" v-show="isAdd==true">取消</div>
				<div class="btn delete" v-show="isAdd==false && userManage==1">删除</div>
				<div class="btn close" v-show="isAdd==false">关闭</div>
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
				user: {},
				typeList: [],
				materialList: [],
				inPlatform: false,
				type: 1,
				isShowSetting: false,
				isAdd: false,
				userManage: 0
			}
		},
		created: function() {
			var that = this;
			this.get(this.base+"/api/user/islogin", null, function(data){
				if (data.code==0) {
					parent.window.location = "/login";
					return;
				}
				that.user = data.data;
				console.log(that.user);
				if (that.user.roleId == "1") {
					that.userManage = 1;
				}
			}, false);
			this.getMaterialTypeList();
			this.getData();

			$("body").on("click", ".addbtn", function(){
				var point = document.createElement('img');
				point.src = require("../../assets/4e/img/pointer.png");
				$(point).addClass("flag");
				point.style.width = '20px';
				point.style.height = '30px';
				point.style.position = 'absolute';
				point.style.display = 'none';
				point.style.cursor = 'pointer';
				point.id = "point"+(new Date().getTime());
				$(".background").append(point);
				
				$("body").on("mousemove", ".platform-standard", function(e){
					e = e || window.event;
					var rects = that.$refs['platform'].getBoundingClientRect();
					if (e.pageX > rects.x && e.pageX < (rects.x + rects.width) && e.pageY > rects.y && e.pageY < (rects.y + rects.height)) {
						point.style.display = "block";
						point.style.left = (e.pageX - 7)+"px";
						point.style.top = (e.pageY - 5)+"px";
						that.inPlatform = true;
					}else{
						point.style.display = "none";
						that.inPlatform = false;
					}
				});
				
				$("body").on("click", function(e){
					if (that.inPlatform == true) {
						$("body").off("mousemove", ".platform-standard");
						e.stopPropagation();
						that.inPlatform = false;
						that.isShowSetting = true;
						that.isAdd = true;
						$(".setting").data('point', point.id);
					}
				});
			});

			$("body").on('change', '.cctype', function(){
				var tid = $(this).val();
				that.getFawvwmaterialLocationList(tid);
			});
			$("body").on('change', '.ccmaterial', function(){
				var id = $(this).val();
				var item = null;
				for(var key in that.materialList) {
					var tmp = that.materialList[key];
					if (tmp.id == id) {
						item = tmp;
						break;
					}
				}
				if (item != null) {
					$(".ccsize").text(item.imgsize);
					$(".cclocation").text(item.installposition);
					$(".ccstarttime").text(item.startdescribe);
					$(".ccmaterialcode").text(item.id);
					$(".bg").css({backgroundImage: 'url(\'' + item.thumb1 + '\')', backgroundSize:'contain',backgroundRepeat:'no-repeat',backgroundPosition:'center center'});
				}
			});
			$("body").on('click', '.cancel', function(){
				that.isShowSetting = false;
				$('#'+$('.setting').data('point')).remove();
				$('.setting').removeAttr('point');
				that.materialList = [];
				$(".cctype").val('0');
				$(".ccsize").text('');
				$(".cclocation").text('');
				$(".ccstarttime").text('');
				$(".ccmaterialcode").text('');
				$(".bg").removeAttr('style');
			});
			$("body").on('click', '.close', function(){
				that.isShowSetting = false;
				$('.setting').removeAttr('point');
				that.materialList = [];
				$(".cctype").val('0');
				$(".ccsize").text('');
				$(".cclocation").text('');
				$(".ccstarttime").text('');
				$(".ccmaterialcode").text('');
				$(".bg").removeAttr('style');
			});
			$("body").on('click', '.delete', function(){
				that.isShowSetting = false;
				$('.setting').removeAttr('point');
				that.materialList = [];
				$(".cctype").val('0');
				$(".ccsize").text('');
				$(".cclocation").text('');
				$(".ccstarttime").text('');
				$(".ccmaterialcode").text('');
				$(".bg").removeAttr('style');

			});
			$("body").on('click', '.submit', function(){
				$('#'+$('.setting').data('point')).data('id', $('.ccmaterial').val());
				var params = {};
				params.tid = $('.ccmaterial').val();
				params.x = $('#'+$('.setting').data('point')).css('left');
				params.y = $('#'+$('.setting').data('point')).css('top');
				params.type = that.type;
				that.json(that.base+'/api/location/submit', that.cc(params), function(data){
					if (data.code==200) {
						that.showMsg("添加标注点成功");
						that.isShowSetting = false;
					}else{
						that.showMsg("添加标注点失败");
					}
				});
				$('.setting').removeAttr('point');
				that.materialList = [];
				$(".cctype").val('0');
				$(".ccsize").text('');
				$(".cclocation").text('');
				$(".ccstarttime").text('');
				$(".ccmaterialcode").text('');
				$(".bg").removeAttr('style');
			});

			$("body").on("click", ".flag", function(){
				that.isShowSetting = true;
				that.isAdd = false;
				$(".setting").data('point', $(this).attr('id'));
				var tid = $(this).data('tid');
				that.get(that.base+"/api/fawvwmaterial/detail?tid="+tid, null, function(data){
					if (data.code==200) {
						var materialtype = data.data.materialtype;
						var marerialid = data.data.id;
						$(".cctype").val(materialtype);
						that.get(that.base+"/api/fawvwmaterial/location/list?usetype="+that.type+"&tid="+materialtype, null, function(data){
							if (data.code==200) {
								that.materialList = data.data;
								setTimeout(function(){
									$(".ccmaterial").val(marerialid);
									$(".ccmaterial").change();
								}, 1000);
								
							}

						});
					}
				})
			});
		},
		methods: {
			getData: function() {
				var that = this;
				this.get(this.base+"/api/location/list?type="+this.type, null, function(data){
					if (data.code==200) {
						that.data = data.data;
						for(var key in that.data) {
							var tmp = that.data[key];
							var p = document.createElement("img");
							p.src = require("../../assets/4e/img/pointer.png");
							$(p).addClass("flag");
							p.style.width = '20px';
							p.style.height = '30px';
							p.style.position = 'absolute';
							p.style.display = 'block';
							p.id = "point"+(new Date().getTime());
							var d = JSON.parse(tmp.data);
							p.style.left = d.x;
							p.style.top = d.y;
							p.style.cursor = 'pointer';
							$(p).data('tid', d.tid);
							$(p).data('id', tmp.id);
							$(".background").append(p);
						}
					}
				})
			},
			getMaterialTypeList: function() {
				var that = this;
				this.get(this.base+"/api/fawvwmaterial/type/list?type="+this.type, null, function(data){
					if (data.code==200) {
						that.typeList = data.data;
					}
				});
			},
			getFawvwmaterialLocationList: function(tid) {
				var that = this;
				this.get(this.base+"/api/fawvwmaterial/location/list?usetype="+this.type+"&tid="+tid, null, function(data){
					if (data.code==200) {
						that.materialList = data.data;
					}
				});
			},
			parentHeight: function() {
				$(window.parent.document).find("iframe").height(($(".list").height()+400)+'px');
			}
		}
	}
</script>


<style lang="scss" scope>
	.platform-standard {
		width: 100%;
		min-height: 400px;
		.operations {
			.addbtn {
				width: 85px;
				height: 20px;
				text-align: center;
				display: block;
				font-size: 14px;
				margin-left: 50px;
				margin-top: 0px;
				border: 1px solid #00b0f0;
				border-radius: 5px 5px;
				color: #00b0f0;
				cursor: pointer;
			}
		}
		.background {
			width: 100%;
			height: 800px;
			.platform {
				background: url(/static/4e/platform.jpg) no-repeat;
			    background-size: contain;
			    height: 500px;
			    width: 837px;
			    text-align: center;
			    margin-left: 80px;
			    margin-top: 50px;
			}
		}
		.setting {
			width: 500px;
			height: 550px;
			background: #fff;
			border: 1px solid #e3e3e3;
			color: #001c4c;
			position: absolute;
			top: 10%;
			left: calc(50% - 250px);

			.block {
				width: 90%;
				margin-left: 5%;
				margin-top: 15px;
				text-align: center;
				.cc {
					display: inline-block;
					width: 300px;
					border: unset;
					margin-left: 3%;
					border-bottom: 1px solid #00437a;
					.component {
						border: unset;
						width: 100%;
						display: inline-block;
					}
				}
				.bg {
					height: 200px;
					width: 66%;
					background: #6bc8f4;
					display: inline-block;
    				vertical-align: top;
    				margin-top: 2px;
    				margin-left: 3%;
				}


			}
			.btnopt {
				width: 80%;
				height: 30px;
				margin-left: 10%;
				margin-top: 20px;
				display: inline-block;
				.btn {
					color: #fff;
					display: inline-block;
					margin: 10px;
					background: #6bc8f4;
					width: 80px;
					height: 20px;
					border-radius: 5px 5px;
					cursor: pointer;
				}
			}
			
		}
	}

</style>
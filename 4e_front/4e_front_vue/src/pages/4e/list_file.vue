<!--素材文件列表页-->
<template>
	<div class="file-list">
		<div class="nav">
			<div class="back" @click="back()">
				<img src="../../assets/4e/img/back.png"/>
				<span>返回</span>
			</div>
		</div>
		<div class="list">
			<ul>
				<li v-for="(item,index) in data.list">
					<div class="img" :style="{backgroundImage: 'url(\'' + item.imageUrlOf310x198 + '\')', backgroundSize:'contain',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}" @click="go2detail(item.file_id)"></div>
					<div class="name" @click="go2detail(item.file_id)">{{(item.file_name2.length>35?item.file_name2.substring(0,35)+'...':item.file_name2)}}</div>
					<div class="txt"><img src="../../assets/4e/img/file_size.png"/><span>{{item.fileSizeStr}}</span></div>
					<div class="txt"><img src="../../assets/4e/img/file_time.png"/><span>{{item.addTimeStr}}</span></div>
					<div class="txt"><img src="../../assets/4e/img/file_down.png"/><span>{{item.downloadTimes}}次</span></div>
					<div class="txt"><img src="../../assets/4e/img/file_code.png"/><span>{{item.fileCode}}</span></div>
				</li>
			</ul>
		</div>
		<div class="paging" v-if="data.pagination">
			<span class="total">共 {{data.pagination.totalPages}} 页 - 共 {{data.pagination.totalCount}} 条 数据</span>
			<ul class="numbers">
				<li><div class="prev" @click="go2prev"></div></li>
				<li v-for="(item,index) in data.pagination.slider" :class="item==data.pagination.pageNumber?'current':''" @click="go2page(item)">
					<div><span>{{item}}</span></div>
				</li>
				<li><div class="next" @click="go2next"></div></li>
			</ul>
			<span class="limit">每页显示<input type="text" v-model.trim="pageSize">条</span>
			<div class="submit" @click="go2pagesize"><span>确认</span></div>
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
				data: {},
				pageSize: 12,
				pageNumber: 1,
				pageCount: 1,
				secondCatId: 0,
				thirdCatId: 0,
				fourCatId: 0,
				activityId: 0,
				cond: {
					year: new Date().getFullYear(),
					name: '',
					code: '',
					sort: '',
					enable: false
				}
			}
		},
		created: function() {
			var that = this;
			this.get(this.base+"/api/user/islogin", null, function(data){
				if (data.code==0) {
					parent.window.location = "/login";
					return;
				}
			},false);
			this.id = this.$route.query.id;
			if (this.$route.query.activity_id) {
				this.activityId = this.$route.query.activity_id;
			}else{
				//设置menuId
				this.get(this.base+"/api/material/detail?id="+this.id, null, function(data){
					if (data.code!=0) {
						that.secondCatId = data.data.secondCatId;
						that.thirdCatId = data.data.thirdCatId;
						that.fourCatId = data.data.fourthCatId;
						if (data.code==199){
							that.isActivity = true;
						}
					}
				}, false);
			}
			this.getData();
		},
		methods: {
			getData: function() {
				var that = this;
				var params = {};
				params.pageSize = this.pageSize;
				params.pageNumber = this.pageNumber;
				params.id = this.id;
				this.get(this.base + "/api/material/file/list", params, function(data){
					if (data.code==200) {
						that.data = data.data;
						that.pageCount = data.data.pagination.totalPages;
						that.pageNumber = data.data.pagination.pageNumber;
						that.$nextTick(function(){
							that.parentHeight();
						})
					}
				});
			},
			
			go2page: function(page) {
				this.pageNumber = page;
				this.getData();
			},
			go2prev: function() {
				this.pageNumber = this.pageNumber - 1;
				if (this.pageNumber < 1) {
					this.pageNumber = 1;
				}
				this.getData();
			},
			go2next: function() {
				this.pageNumber = this.pageNumber + 1;
				if (this.pageNumber > this.pageCount) {
					this.pageNumber = this.pageCount;
				}
				this.getData();
			},
			go2pagesize: function() {
				this.getData();
			},
			go2detail: function(id) {
				if (this.activityId==0) {
					window.location = this.base+"/jsp/pc/material/do.jsp?method=detail&id="+id+"&activityName=&back=vue";
				}else{
					window.location = this.base+"/jsp/pc/material/do.jsp?method=detail&id="+id+"&activityName=&back=vue_a&activityId="+this.activityId;
				}
			},
			parentHeight: function() {
				$(window.parent.document).find("iframe").height(($(".list").height()+400)+'px');
			},
			changeThirdMenu: function(id) {
				this.third_cat_id = id;
				this.getData();
				$(".tab li span").removeClass("current");
				$(".tab li[data-id="+id+"]").find('span').addClass("current");
			},
			search: function() {
				var that = this;
				var params = {};
				params.addTime = $('.year').val();
				params.name =  $('.name input').val();
				params.fileCode = $('.code input').val();
				params.sortType = $('input[name=sort]').val();
				params.pageSize = this.pageSize;
				that.cond.enable = true;
				this.get(this.base + "/api/material/search", params, function(data){
					if (data.code==200) {
						that.data = data.data;
						that.$nextTick(function(){
							that.parentHeight();
						})
					}
				});
			},
			back: function() {
				var path = "";
				if (this.isActivity==true || this.activityId>0) {
					path = "/list_activity";
				}else{
					path = "/list"
				}
				if (this.fourCatId!=null) {
					path = path+"?second_cat_id="+this.secondCatId+"&third_cat_id="+this.thirdCatId+"&four_cat_id="+this.fourCatId+"&inner=1";
				}else{
					path = path+"?second_cat_id="+this.secondCatId+"&third_cat_id="+this.thirdCatId;
				}
				if (this.isActivity==true || this.activityId>0) {
					path = path+"&activityId="+this.activityId;
				}else{
					path = path;
				}
				window.location = path;
			}
		}
	}

</script>

<style lang="scss" scope>
	body {
		min-height: 700px;
	}
	.file-list {
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
		.tab {
			font-size: 14px;
			font-family: 'font-hy-55';
			height: 33px;
			ul {
				list-style: none;
				height: 100%;
				border-top: 2px solid #dfe4e8;
				border-bottom: 2px solid #dfe4e8;
				text-align: center;
				color: #778288;
				li {
					margin-left: 30px;
					display: inline-block;
					height: 100%;
					cursor: pointer;
					span {
						margin-top: 7px;
						display: inline-block;
						text-align: center;
					}
					float: left;
				}
				.first {
					margin-left: 50px;
				}
				.current {
					color: #00b0f0;
				    padding: 0px;
				    border-bottom: 2px solid #00b0f0;
				    display: block;
				    height: 26px;
				}
			}
		}

		.list {
			width: 100%;
			min-width: 900px;
			height: 70%;
			min-height: 500px;
			ul {
				list-style: none;
				width: 100%;
				overflow-y: auto;
				min-height: 500px;
				li {
				    width: 18%;
				    display: flex;
				    padding: 1% 3%;
				    text-align: center;
				    align-items: center;
				    justify-content: center;
				    flex-direction: column;
				    float: left;
				    margin-bottom: 40px;
				    
				    font-family: "font-hy-75";

					.img {
						width: 100%;
						height: 240px;
						display: flex;
						border: 1px solid #0000001e;
						align-items: center;
    					justify-content: center;
    					cursor: pointer;
					}
					.name {
						margin-top: 10px;
						width: 100%;
						text-align: left;
						margin-bottom: 55px;
						display:block;
						height: 0px;
						font-size: 14px;
						color: #222222;
						cursor: pointer;
					}
					.txt {
						width: 100%;
						text-align: left;
						display: flex;
						vertical-align: middle;
						margin-top: 3px;
						font-size: 12px;
						color: #96a3a8;
						img {
							width: 14px;
							height: 14px;
						}
						span {
							margin-left: 5px;
							
						}
					}
				}
			}
		}

		.paging {
			margin-top: 20px;
			text-align: center;
			.total {
				font-size: 14px;
				color: #778288;
				vertical-align: super;
				margin-right: 10px;
			}
			.numbers {
				list-style: none;
				display: inline-block;
				li {
					float: left;
					display: inline-block;
					div {
						width: 20px;
						height: 20px;
						margin-right: 5px;
						border: 1px solid #072455;
						border-radius: 50%;
						color: #6a767d;
						span {
							display: inline-block;
							font-size: 12px;
							margin-top: 1px;
						}
						cursor: pointer;
					}
				}
				.prev {
					background: url(../../assets/4e/img/prev.png) no-repeat;
					background-size: 100%;
				}
				.next {
					background: url(../../assets/4e/img/next.png) no-repeat;
					background-size: 100%;
				}
				.current {
					div {
						background: #001e50;
						color: #fff;
					}
				}
			}
			.limit {
				font-size: 14px;
				color: #778288;
				vertical-align: super;
				input {
					border-radius: 15px;
					width: 40px;
					border: 1px solid #072455;
					text-align: center;
					margin-left: 10px;
					margin-right: 10px;
				}
				margin-right: 10px;
			}
			.submit {
				display: inline-block;
				width: 50px;
				height: 24px;
				background: #001e50;
				color: #fff;
				vertical-align: top;
				border-radius: 15px;
				font-size: 12px;
				cursor: pointer;
				span {
					display: inline-block;
					margin-top: 3px;
				}
			}

		}
	}
</style>
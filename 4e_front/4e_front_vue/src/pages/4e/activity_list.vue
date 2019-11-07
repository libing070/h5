<!--activityList-->
<template>
	<div class="e-activity-list">
		<!--<div class="tab" v-if="data.catListSize>0">
			<ul>
				<li v-if="data.catListSize>0" v-for="(item,index) in data.catList" @click="changeThirdMenu(item.id)" :data-id="item.id" :class="index==0?'first':''">
					<span :class="index==0?'current':''">{{item.name}}</span>
				</li>
			</ul>
		</div>-->
		<div class="nav">
			<div class="back" @click="goback()">
				<img src="../../assets/4e/img/back.png"/>
				<span>返回</span>
			</div>
		</div>
		<div class="cond">
			<div class="select">
				<select class="year" v-model.trim="cond.year">
					<option value="2019">2019</option>
					<option value="2018">2018</option>
					<option value="2017">2017</option>
					<option value="2016">2016</option>
					<option value="2015">2015</option>
				</select>
			</div>
			<div class="name">
				<span>素材名称</span>
				<input type="text" placeholder="多关键词用”%“连接" v-model.trim="cond.name"/>
			</div>
			<div class="code">
				<span>素材编码</span>
				<input type="text" placeholder="输入素材编码" v-model.trim="cond.code"/>
			</div>
			<div class="check">
				<span>排序</span>
				<div>
					<input type="radio" value="add_time" id="uploadtime" name="sort" v-model.trim="cond.sort"/>
		  			<label>按上传时间</label>
	  			</div>
	  			<div>
					<input type="radio" value="download_times" id="downloads" name="sort" v-model.trim="cond.sort"/>
		  			<label>按下载次数</label>
	  			</div>
			</div>
			<div class="search_btn" @click="search">
				<span>搜索</span>
			</div>
		</div>
		<div class="list">
			<ul>
				<li v-for="(item,index) in data.materials" @click="go2detail(item.id, item.secondCatId, item.thirdCatId, item.fourCatId)">
					<div class="img" :style="{backgroundImage: 'url(\'' + item.imageUrlOf310x198 + '\')', backgroundSize:'contain',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
					<div class="name">{{item.name}}</div>
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
				activity_id: 0,
				second_cat_id: 0,
				third_cat_id: 0,
				data: {},
				pageSize: 12,
				pageNumber: 1,
				pageCount: 1,
				cond: {
					year: new Date().getFullYear(),
					name: '',
					code: '',
					sort: '',
					enable: false
				}
			}
		},
		created: function(){
			var that = this;
			this.get(this.base+"/api/user/islogin", null, function(data){
				if (data.code==0) {
					parent.window.location = "/login";
					return;
				}
			});
			this.activity_id = this.$route.query.activityId;
			this.id = this.$route.query.id;
			if (this.id!=null) {
				this.get(this.base+"/api/material/detail?id="+this.id, null, function(data){
					if (data.code==200) {
						console.log(data.data);
						that.second_cat_id = data.data.seondCatId;
					}
				}, false);
			}else{
				this.second_cat_id = this.$route.query.secondCatId;
			}
			this.getData();
		},
		methods: {
			getData: function() {
				var that = this;
				var params = {};
				params.pageSize = this.pageSize;
				params.pageNumber = this.pageNumber;
				params.activityId = this.activity_id;
				params.secondCatId = this.second_cat_id;
				if (this.third_cat_id) {
					params.thirdCatId = this.third_cat_id;
				}
				if (this.cond.enable == true) {
					params.addTime = $('.year').val();
					params.name =  $('.name input').val();
					params.fileCode = $('.code input').val();
					params.sortType = $('input[name=sort]').val();
				}
				this.get(this.base + "/api/libarary/activityXiang", params, function(data){
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
			go2detail: function(id, second_cat_id, third_cat_id, four_cat_id) {
				if (four_cat_id==null){
					window.location = "/list_file?id="+id+"&second_cat_id="+second_cat_id+"&third_cat_id="+third_cat_id+"&activity_id="+this.activity_id;
				}else{
					window.location =
					"/list_file?id="+id+"&second_cat_id="+second_cat_id+"&third_cat_id="+third_cat_id+"&four_cat_id="+four_cat_id+"&activity_id="+this.activity_id;
				}
			},
			goback: function(){
				window.location = "/list_o?second_cat_id=10";
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
			}
		}
	}

</script>

<style lang="scss" scope>
	body {
		min-height: 700px;
	}
	.e-activity-list {
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
			height: 50px;
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
						margin-top: 13px;
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
				    padding: 2px;
				    border-bottom: 2px solid #00b0f0;
				    display: block;
				    height: 30px;
				}
			}
		}

		.cond {
			width: 90%;
			min-width: 980px;
			height: 50px;
			margin-top: 30px;
			color: #2e3e4d;
			text-align: center;
			font-size: 14px;
			font-family: 'font-hy-55';
			.select {
				display: inline-block;
				width: 70px;
				border-bottom: 1px solid #2e3e4d;
				text-align: left;
				select {
					width: 100%;
					border: none;
				}
				select:focus {
					outline: none;
				}
			}
			.name {
				margin-left: 20px;
				display: inline-block;
				input {
					background: transparent;
					border: unset;
					border-bottom: 1px solid #2e3e4d;
					border-top: none \9;/*IE6.7.8.9.10都生效*/
					border-left: none \9;
					border-right: none \9;
				}
			}
			.code {
				margin-left: 30px;
				display: inline-block;
				input {
					background: transparent;
					border: unset;
					border-bottom: 1px solid #2e3e4d;
					border-top: none \9;/*IE6.7.8.9.10都生效*/
					border-left: none \9;
					border-right: none \9;
				}
			}
			.check {
				margin-left: 30px;
				display: inline-block;
				div {
					display: inline-block;
					input {
						display: inline-block;
						text-align: center;
					}
					label {
					    left: 30px;
					    height: 20px;
					}
				}
			}
			.search_btn {
			    width: 60px;
			    height: 30px;
			    display: inline-block;
			    margin-left: 27px;
			    background: #001e50;
			    border-radius: 20px;
			    color: #fff;
			    vertical-align: middle;
			    cursor: pointer;
			    span {
			    	margin-top: 5px;
			    	display: inline-block;
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
				overflow-y: scroll;
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
					}
					.name {
						margin-top: 10px;
						width: 100%;
						text-align: left;
						margin-bottom: 50px;
						display:block;
						height: 20px;
						font-size: 14px;
						color: #222222;
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

	/*ie11 css hack*/
	@media all and (-ms-high-contrast:none) {
		*::-ms-backdrop, .e-activity-list .cond .name input,.e-activity-list .cond .code input{
			border: none;
			border-bottom: 1px solid #2e3e4d;

		}
	}

</style>
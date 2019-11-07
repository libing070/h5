<template>
	<div class="jieda-list">
		<div class="tab">
			<ul>
				<li v-if="data.catListSize>0" v-for="(item,index) in data.catList" @click="changeThirdMenu(item.id)" :data-id="item.id"><span :class="index==0?'current':''">{{item.name}}</span></li>
			</ul>
		</div>
		<div class="cond">
			<div class="select">
				<select class="year">
					<option value="2019">2019</option>
					<option value="2018">2018</option>
					<option value="2017">2017</option>
					<option value="2016">2016</option>
					<option value="2015">2015</option>
				</select>
			</div>
			<div class="name">
				<span>素材名称</span>
				<input type="text" placeholder="多关键词用”%“连接"/>
			</div>
			<div class="code">
				<span>素材编码</span>
				<input type="text" placeholder="输入素材编码"/>
			</div>
			<div class="check">
				<span>排序</span>
				<div>
					<input type="radio" value="add_time" id="uploadtime" name="sort" />
		  			<label>按上传时间</label>
	  			</div>
	  			<div>
					<input type="radio" value="download_times" id="downloads" name="sort" />
		  			<label>按下载次数</label>
	  			</div>
			</div>
			<div class="search_btn" @click="search">
				<span>搜索</span>
			</div>
		</div>
		<div class="list">
			<ul>
				<li v-for="(item,index) in data.materials" @click="go2detail(item.file_id)">
					<div class="img" :style="{backgroundImage: 'url(' + item.imageUrlOf310x198 + ')', backgroundSize:'contain',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
					<div class="name">{{item.name}}</div>
					<div class="txt"><img src="../../assets/jieda/img/file_size.png"/><span>{{item.fileSizeStr}}</span></div>
					<div class="txt"><img src="../../assets/jieda/img/file_time.png"/><span>{{item.addTimeStr}}</span></div>
					<div class="txt"><img src="../../assets/jieda/img/file_down.png"/><span>{{item.downloadTimes}}次</span></div>
					<div class="txt"><img src="../../assets/jieda/img/file_code.png"/><span>{{item.fileCode}}</span></div>
				</li>
			</ul>
		</div>
		<div class="paging">
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	var base = localStorage.getItem("base")
	import util_js from '@/assets/jieda/js/util.js'
	import font_css from '@/assets/jieda/css/font.css'
	import global_css from '@/assets/jieda/css/global.css'
	Vue.use(util_js)
	export default {
		data: function(){
			return {
				base: base,
				second_cat_id: 0,
				data: {},
				pageSize: 12,
				pageNumber: 1
			}
		},
		created: function() {
			var that = this;
			this.second_cat_id = this.$route.query.second_cat_id;
			this.getData();
		},
		methods: {
			getData: function(thirdid) {
				var that = this;
				var params = {};
				params.pageSize = this.pageSize;
				params.pageNumber = this.pageNumber;
				params.secondCatId = this.second_cat_id;
				if (thirdid) {
					params.thirdCatId = thirdid;
				}
				this.get(this.base + "/api/material/list", params, function(data){
					if (data.code==200) {
						that.data = data.data;
						console.log(that.data);
						that.$nextTick(function(){
							that.parentHeight();
						})
					}
				});
			},
			go2detail: function(id) {
				window.location = this.base+"/jsp/pc/material/do.jsp?method=detail&id="+id+"&activityName=";
			},
			parentHeight: function() {
				$(window.parent.document).find("iframe").height(($(".list").height()+300)+'px');
			},
			changeThirdMenu: function(id) {
				this.getData(id);
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
				params.pageSize = 12;
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
	.jieda-list {
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
					}
				}
				.first {
					margin-left: 0px;
				}
				.current {
					background: #2e3e4d;
				    padding: 2px;
				    color: #fff;
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
				}
			}
			.code {
				margin-left: 30px;
				display: inline-block;
				input {
					background: transparent;
					border: unset;
					border-bottom: 1px solid #2e3e4d;
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
			    background: #272f3a;
			    border-radius: 20px;
			    color: #fff;
			    vertical-align: middle;
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
			
			ul {
				list-style: none;
				width: 100%;
				overflow: scroll;

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
		}
	}
</style>
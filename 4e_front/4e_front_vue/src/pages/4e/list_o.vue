<template>
	<div class="e-list-o">
		<div class="nav" v-if="data!=null">
			<span>{{data.firstCat.name}}/{{data.secondCat.name}}</span>
		</div>
		<div class="list" v-if="data!=null">
			<table class="table">
				<thead>
					<tr>
						<th>活动名称</th>
						<th>活动时间</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) in data.activityList">
						<td @click="go2detail(item.id, data.secondCatId)">{{item.name}}</td>
						<td>{{item.startTimeStr}} 到 {{item.endTimeStr}}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="paging" v-if="data!=null && data.pagination">
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
				second_cat_id: 0,
				data: null,
				pageSize: 12,
				pageNumber: 1,
				pageCount: 1,
			}
		},
		created: function() {
			var that = this;
			this.get(this.base+"/api/user/islogin", null, function(data){
				if (data.code==0) {
					parent.window.location = "/login";
					return;
				}
			});
			this.second_cat_id = this.$route.query.second_cat_id;
			this.getData();
		},
		methods: {
			getData: function() {
				var that = this;
				var params = {};
				params.pageSize = this.pageSize;
				params.pageNumber = this.pageNumber;
				params.secondCatId = this.second_cat_id;
				this.get(this.base + "/api/library/oneLists", params, function(data){
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
			go2detail: function(id, secondCatId) {
				window.location = "/list_activity?activityId="+id+"&secondCatId="+secondCatId;
			},
			parentHeight: function() {
				$(window.parent.document).find("iframe").height(($(".list").height()+400)+'px');
			},
		}
	}

</script>

<style lang="scss" scope>
	body {
		min-height: 700px;
	}
	.e-list-o {
		min-height: 600px;

		.nav {
			height: 50px;
			span {
				font-size: 13px;
				display: inline-block;
				vertical-align: middle;
			}
		}

		.list {
			.table {
				width: 100%;
				thead {
					tr {
						height: 30px;
						font-weight: 800;
						font-size: 15px;
						th:nth-child(1) {
							border-right: 1px solid #e1e6eb;
							width: 50%;
						}
					}
				}
				tbody {
					tr {
						
						td:nth-child(1) {
							color: #2e2e2e;
							cursor: pointer;
							height: 50px;
							text-indent: 30px;
						}
						td:nth-child(2) {
							text-align: center;
						}
						td {
							border-top: 1px solid #dcdddd;
						}
						border-top: 1px solid #dcdddd;
					}
				}

			}

		}



		.paging {
			margin-top: 60px;
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

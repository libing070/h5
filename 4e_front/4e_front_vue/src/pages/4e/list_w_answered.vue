<!--问卷调查问卷已提报列表-->
<template>
<div class="w-list-answered" v-cloak>
	<div class="list">
		<table>
			<thead>
				<tr>
				<th>问卷类型</th>
				<th>问卷名称</th>
				<th>参与人数</th>
				<th>审核状态</th>
				<th>结束时间</th>
				<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item,index) in data.list">
					<td>{{item.category}}</td>
					<td>{{item.title}}</td>
					<td>{{item.user_cnt}}</td>
					<td v-if="item.verify_status==0">未审核</td>
					<td v-if="item.verify_status==1">通过</td>
					<td v-if="item.verify_status==2">驳回</td>
					<td>{{item.endTimeStr}}</td>
					<td><span @click="show(item.id)">查看</span></td>
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
				data: {},
				pageSize: 12,
				pageNumber: 1,
				pageCount: 1,
				user: {},
				userManage: 0,
				list: []
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
			});
			this.getData();
		},
		methods: {
			getData: function() {
				var that = this;
				var params = {};
				params.pageSize = this.pageSize;
				params.pageNumber = this.pageNumber;
				this.get(this.base + "/api/policy/list/answered", params, function(data){
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
			show: function(id) {
				window.location = "/list_w_wenjuan_c?qaId="+id;
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
			parentHeight: function() {
				$(window.parent.document).find("iframe").height(($(".list").height()+400)+'px');
			},
			sort: function() {
				if (this.cond.sort=='0') {
					this.cond.sort='1';
				}else{
					this.cond.sort='0';
				}
				this.getData();
			}
		}
	}

</script>


<style lang="scss" scope>
	.w-list-answered {
		min-height: 600px;
		.list {
			padding-bottom: 30px;
			width: 98%;
			margin-top: 10px;
			margin-left: calc(10% - 100px);
			table {
				width: 100%;
				thead {
					tr {
						height: 30px;

						th:nth-child(1) {
							width: 15%;
							img {
								margin-left: 10px;
							}
							
						}
						th:nth-child(2) {
							width: 25%;
							img {
								margin-left: 10px;
								margin-bottom: -5px;
							}
							.rotate {
								margin-bottom: -4px;
    							transform: rotateZ(180deg);
							}
						}
						th:nth-child(3) {
							width: 8%;
						}
						th:nth-child(4) {
							width: 12%;
						}
						th:nth-child(5) {
							width: 10%;
						}
						th {
							border-bottom: 1px solid #e7eaec;
							border-right: 1px solid #e7eaec;
							width: 15%;
							text-align: center;
							color: #b4c3ce;
							
						}
					}

				}
				tbody {
					tr {
						height: 50px;

						td:nth-child(1) {
							width: 15%;

						}
						td:nth-child(2) {
							width: 25%;
						}
						td:nth-child(3) {
							width: 8%;
						}
						td:nth-child(4) {
							width: 12%;
						}
						td:nth-child(5) {
							width: 10%;
						}
						td:nth-child(6) {
							width: 10%;
							color: #3b557c;
							cursor: pointer;
						}
						td {
							border-bottom: 1px solid #e7eaec;
							width: 15%;
							text-align: center;
							color: #000;
							
						}
					}
				}
			}
		}

		.paging {
			margin-top: 20px;
			margin-left: -100px;
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
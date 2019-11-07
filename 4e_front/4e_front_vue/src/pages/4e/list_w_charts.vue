<!--问卷调查问卷管理-数据统计-->
<template>
<div class="t-list-w-charts" v-cloak>
	<div class="nav">
		<div>
			<img src="../../assets/4e/img/back.png"/>
			<span>返回</span>
		</div>
	</div>
	<div class="cond">
		<div class="dq">
			<span>大区</span>
			<div class="cc">
			<select v-model.trim="cond.dq" @change="getCommunityList(cond.dq)">
				<option value="0">全部</option>
				<option  v-for="item in bigCommunityList" v-bind:value="item.id">{{item.name}}</option>
			</select>
			</div>
		</div>
		<div class="xq">
			<span>小区</span>
			<div class="cc">
			<select v-model.trim="cond.xq" @change="getDealerList(cond.xq)">
				<option value="0">全部</option>
				<option v-for="item in smallCommunityList" v-bind:value="item.id">{{item.name}}</option>
			</select>
			</div>
		</div>
		<div class="dealer">
			<span>经销商</span>
			<div class="cc">
			<select v-model.trim="cond.dealer">
				<option value="0">全部</option>
				<option v-for="item in dealerList" v-bind:value="item.codeNumber">{{item.name}}</option>
			</select>
			</div>
		</div>
		<div class="pushstatus">
			<span>提交状态</span>
			<div class="cc">
			<select v-model.trim="cond.pushstatus">
				<option value="0">全部</option>
				<option value="1">已提交</option>
				<option value="2">未提交</option>
			</select>
			</div>
		</div>
		<div class="verifystatus">
			<span>审核状态</span>
			<div class="cc">
			<select v-model.trim="cond.verifystatus">
				<option value="0">全部</option>
				<option value="1">已审核</option>
				<option value="2">已驳回</option>
			</select>
			</div>
		</div>
		<div class="search_btn" @click="search">
			<span>搜索</span>
		</div>
	</div>

	<div class="charts">
		<div class="bar" id="barChart">
		</div>
		<div class="pie" id="pieChart">
		</div>
	</div>

	<div class="list">
		<table>
			<thead>
				<tr>
				<th>销售代码</th>
				<th>经销商名称</th>
				<th>提交状态</th>
				<th>提交时间</th>
				<th>审批状态</th>
				<th>审批时间</th>
				<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item,index) in data.list">
					<td>{{item.sale_number}}</td>
					<td>{{item.dealername}}</td>
					<td v-if="item.is_push==1">已提交</td>
					<td v-if="item.is_push==0">未提交</td>
					<td>{{item.add_time}}</td>

					<td v-if="item.is_push==1 && item.verify_status==0">未审核</td>
					<td v-if="item.is_push==1 && item.verify_status==1">通过</td>
					<td v-if="item.is_push==1 && item.verify_status==2">驳回</td>
					<td v-if="item.is_push==0"></td>

					<td v-if="item.is_push==1 && item.verify_status!=0">{{item.verify_time}}</td>
					<td v-if="item.is_push==1 && item.verify_status==0"></td>
					<td v-if="item.is_push==0"></td>

					<td v-if="item.is_push==1 && item.verify_status==0"><div class="op"><span @click="verify(item.qa_id, item.user_id)">审批</span></div></td>
					<td v-if="item.is_push==1 && item.verify_status>=1"><div class="op"><span @click="detail(item.qa_id, item.user_id)">查看</span></div></td>
					<td v-if="item.is_push==0"></td>

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
				charts: [],
				pageSize: 12,
				pageNumber: 1,
				pageCount: 1,
				cond: {
					dq: '0',
					xq: '0',
					dealer: '0',
					pushstatus: '0',
					verifystatus: '0',
					enable: false,
					sort: '0'
				},
				user: {},
				id: 0,
				userManage: 0,
				bigCommunityList: [],
				smallCommunityList: [],
				dealerList: []
			}
		},
		created: function() {
			var that = this;
			this.id = this.$route.query.id;
			this.get(this.base+"/api/user/islogin", null, function(data){
				if (data.code==0) {
					parent.window.location = "/login";
					return;
				}
				that.user = data.data;
			});
			this.getCommunityList(0);
			that.getData();
			that.getCharts();
			$("body").on("click", '.nav div', function(){
				history.go(-1);
			})
		},
		methods: {
			getCommunityList: function(parentId) {
				var that = this;
				this.get(this.base + "/api/dealer/community/list", {parentId: parentId}, function(data){
					if (data.code==200) {
						if (parentId==0) {
							that.bigCommunityList = data.data;
						}else{
							that.smallCommunityList = data.data;
						}
					}
				})
			},
			getDealerList: function(smallCommunityId) {
				var that = this;
				this.get(this.base + "/api/dealer/list", {smallCommunityId: smallCommunityId}, function(data){
					if (data.code==200) {
						that.dealerList = data.data;
					}
				})
			},
			getData: function() {
				var that = this;
				var params = {};
				params.pageSize = this.pageSize;
				params.pageNumber = this.pageNumber;
				params.id = that.id;
				params.orderBy = that.cond.sort;
				if (this.cond.enable == true) {
					if (that.cond.dq!=0) {
						params.bigCommunityId = that.cond.dq;
					}
					if (that.cond.xq!=0) {
						params.smallCommunityId = that.cond.xq;
					}
					if (that.cond.dealer!=0)  {
						params.dealerCode = that.cond.dealer;
					}
					if (that.cond.pushstatus!=0) {
						params.pushstatus = that.cond.pushstatus;
					}
					if (that.cond.verifystatus!=0) {
						params.verifystatus = that.cond.verifystatus;
					}
				}
				this.get(this.base + "/api/policy/detail/list", params, function(data){
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
			getCharts: function() {
				var that = this;
				var params = {};
				params.id = that.id;
				if (this.cond.enable == true) {
					if (that.cond.dq!=0) {
						params.bigCommunityId = that.cond.dq;
					}
					if (that.cond.xq!=0) {
						params.smallCommunityId = that.cond.xq;
					}
					if (that.cond.dealer!=0)  {
						params.dealerCode = that.cond.dealer;
					}
					if (that.cond.pushstatus!=0) {
						params.pushstatus = that.cond.pushstatus;
					}
					if (that.cond.verifystatus!=0) {
						params.verifystatus = that.cond.verifystatus;
					}
				}
				this.get(this.base + "/api/policy/detail/charts", params, function(data){
					if (data.code==200) {
						that.charts = data.data;
						that.drawBarCharts();
						that.drawPieCharts();
						that.$nextTick(function(){
							that.parentHeight();
						})
					}
				});
			},
			drawBarCharts: function(){
		        var barChart = this.$echarts.init(document.getElementById('barChart'));
		        var names = [];
		        var series = [{
		        	name: '已审批',
		        	type: 'bar',
		        	data: []
		        },{
		        	name: '未审批',
		        	type: 'bar',
		        	data: []
		        },{
		        	name: '已驳回及未提交',
		        	type: 'bar',
		        	data: []
		        }];
		        for(var t in this.charts) {
		        	var tmp = this.charts[t];
		        	names.push(tmp.name);
		        	series[0].data.push(tmp.pass);
		        	series[1].data.push(tmp.waiting);
		        	series[2].data.push(tmp.deny);
		        }

		        // 绘制图表
		        barChart.setOption({
		        	color: ['#00427c', '#44c6f7', '#c2c9cf'],
		            legend: {
				        data: ['已审批', '未审批', '已驳回及未提交'],
				        x: 'center',
				        y: 'bottom'
				    },
				    tooltip: {
				      	trigger: 'axis',
				      	axisPointer: {    
				        	type: 'shadow'
				      	},
				    },
				    calculable: true,
				    xAxis: [
				        {
				            type: 'category',
				            axisTick: {show: false},
				            data: names
				        }
				    ],
				    yAxis: [
				        {
				            type: 'value'
				        }
				    ],
				    series: series
		        });
		    },
		    drawPieCharts(){
		        var pieChart = this.$echarts.init(document.getElementById('pieChart'));
		        var series = [{
		        	name: 'xxx',
		        	type: 'pie',
		        	radius: '70%',
		        	center: ['50%', '50%'],
		        }];
		        var waiting = 0;
		        var pass = 0;
		        var deny = 0;
		        for(var t in this.charts) {
		        	var tmp = this.charts[t];
		        	pass = pass + parseInt(tmp.pass);
		        	waiting = waiting + parseInt(tmp.waiting);
		        	deny = deny + parseInt(tmp.deny);
		        }
		        series[0].data = [
		        	{name: '已审批', value: pass},
		        	{name: '未审批', value: waiting},
		        	{name: '已驳回及未提交', value: deny}
		        ];

		        // 绘制图表
		        pieChart.setOption({
		        	color: ['#00427c', '#44c6f7', '#c2c9cf'],
		            legend: {
				        data: ['已审批', '未审批', '已驳回及未提交'],
				        x: 'center',
				        y: 'bottom',
				        textStyle: {
				        	fontSize: 12
				        }
				    },
				    tooltip : {
		                trigger: 'item',
		                formatter: "{b} : {c} ({d}%)"
		            },
				    series: series
		        });
		    },
		    verify: function(qaId, userId) {
		    	window.location = '/list_w_wenjuan_w?qaId='+qaId+'&userId='+userId;
		    },
		    detail: function(qaId, userId) {
		    	window.location = '/list_w_wenjuan_c?qaId='+qaId+'&userId='+userId;
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
				$(window.parent.document).find("iframe").height(($(".t-list-w-charts").height()+200)+'px');
			},
			search: function() {
				this.cond.enable = true;
				this.getData();
				this.getCharts();
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
	.t-list-w-charts {
		min-height: 600px;
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
		.cond {
			width: 90%;
			margin-left: calc(5% - 80px);
			min-width: 1100px;
			height: 50px;
			margin-top: 30px;
			color: #2e3e4d;
			text-align: center;
			font-size: 14px;
			font-family: 'font-hy-55';
			.select {
				display: inline-block;
				width: 200px;
				text-align: left;
				.cc {
					width: 70%;
					display: inline-block;
					border-bottom: 1px solid #2e3e4d;
					select {
						border: unset;
						font-size: 14px;
						width: 100%;
						text-indent: 10px;
					}
					select:focus {
						outline: none;
					}
				}
				
			}
			.dq {
				display: inline-block;
				width: 120px;
				text-align: left;
				.cc {
					width: 70%;
					display: inline-block;
					border-bottom: 1px solid #2e3e4d;
					select {
						border: unset;
						font-size: 14px;
						width: 100%;
						text-indent: 10px;
					}
					select:focus {
						outline: none;
					}
				}
			}
			.xq {
				display: inline-block;
				width: 180px;
				text-align: left;
				.cc {
					width: 70%;
					display: inline-block;
					border-bottom: 1px solid #2e3e4d;
					select {
						border: unset;
						font-size: 14px;
						width: 100%;
						text-indent: 10px;
					}
					select:focus {
						outline: none;
					}
				}
			}
			.dealer {
				display: inline-block;
				width: 160px;
				text-align: left;
				.cc {
					width: 70%;
					display: inline-block;
					border-bottom: 1px solid #2e3e4d;
					select {
						border: unset;
						font-size: 14px;
						width: 100%;
						text-indent: 10px;
					}
					select:focus {
						outline: none;
					}
				}
			}
			.pushstatus {
				display: inline-block;
				width: 154px;
				text-align: left;
				.cc {
					width: 50%;
					display: inline-block;
					border-bottom: 1px solid #2e3e4d;
					select {
						border: unset;
						font-size: 14px;
						width: 100%;
						text-indent: 10px;
					}
					select:focus {
						outline: none;
					}
				}
			}
			.verifystatus {
				display: inline-block;
				width: 154px;
				text-align: left;
				.cc {
					width: 50%;
					display: inline-block;
					border-bottom: 1px solid #2e3e4d;
					select {
						border: unset;
						font-size: 14px;
						width: 100%;
						text-indent: 10px;
					}
					select:focus {
						outline: none;
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

		.charts {
			height: 400px;
			width: 100%;
			.bar {
				height: 100%;
				width: 60%;
				display: inline-block;
			}
			.pie {
				height: 100%;
				width: 30%;
				display: inline-block;
			}

		}

		.list {
			padding-bottom: 30px;
			width: 90%;
			margin-top: 30px;
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
							width: 8%;
						}
						th:nth-child(6) {
							width: 8%;
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
							width: 8%;
						}
						td:nth-child(6) {
							width: 8%;
						}
						td {
							width: 15%;
							text-align: center;
							color: #000;
							border-bottom: 1px solid #e7eaec;
							.op {
								width: 44px;
								height: 23px;
								background: #2cb0f0;
								border-radius: 13px 13px;
								margin-left: calc(50% - 22px);
								span {
									margin-top: 3px;
									display: inline-block;
									color: #fff;
								}
								cursor: pointer;
							}
						}
						.waiting {
							color: #c2cacf;
						}
						.pass {
							color: #4cc7f4;
						}
						.deny {
							color: #3c484d;
						}
						.active {
							color: #3b557c;
							cursor: pointer;
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
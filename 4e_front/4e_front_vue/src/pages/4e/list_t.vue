<!--物料提报管理页面-->
<template>
<div class="t-list" v-cloak>
	<div class="cond" v-if="userManage==1 && (user.userName.indexOf('管理')!=-1 || user.roleId==1)">
		<div class="select">
			<span>{{'批次'|dz}}</span>
			<div class="cc" >
				<select class="batch" v-model="cond.batch">
					<option v-for="(item,index) in materialBatchList" v-bind:value="item.id">{{item.name}}</option>
				</select>
			</div>
		</div>
		<div class="dq">
			<span>{{'大区'|dz}}</span>
			<div class="cc">
			<select v-model.trim="cond.dq" @change="getCommunityList(cond.dq)">
				<option value="0">{{'全部'|dz}}</option>
				<option  v-for="item in bigCommunityList" v-bind:value="item.id">{{item.name}}</option>
			</select>
			</div>
		</div>
		<div class="xq">
			<span>{{'小区'|dz}}</span>
			<div class="cc">
			<select v-model.trim="cond.xq" @change="getDealerList(cond.xq)">
				<option value="0">{{'全部'|dz}}</option>
				<option v-for="item in smallCommunityList" v-bind:value="item.id">{{item.name}}</option>
			</select>
			</div>
		</div>
		<div class="dealer">
			<span>{{'经销商'|dz}}</span>
			<div class="cc">
			<select v-model.trim="cond.dealer">
				<option value="0">{{'全部'|dz}}</option>
				<option v-for="item in dealerList" v-bind:value="item.codeNumber">{{item.name}}</option>
			</select>
			</div>
		</div>
		<div class="status">
			<span>{{'状态'|dz}}</span>
			<div class="cc">
			<select v-model.trim="cond.status">
				<option value="0">{{'全部'|dz}}</option>
				<option value="1">{{'已提交'|dz}}</option>
				<option value="-1">{{'未提交'|dz}}</option>
				<option value="2">{{'已审核'|dz}}</option>
				<option value="-2">{{'已驳回'|dz}}</option>
			</select>
			</div>
		</div>
		<div class="search_btn" @click="search">
			<span>{{'搜索'|dz}}</span>
		</div>
	</div>

	<div class="list">
		<table>
			<thead>
				<tr>
				<th>{{'提交批次'|dz}}<img src='../../assets/4e/img/list.png'></th>
				<th>{{'经销商'|dz}}'
				<img src='../../assets/4e/img/sort.png' @click="sort" v-if="cond.sort=='1'" class="rotate">
				<img src='../../assets/4e/img/sort.png' @click="sort" v-if="cond.sort=='0'"></th>
				<th>{{'大区'|dz}}</th>
				<th>{{'销售代码'|dz}}</th>
				<th>{{'提交状态'|dz}}</th>
				<th>{{'审批状态'|dz}}</th>
				<th>{{'操作'|dz}}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item,index) in data.list">
					<td>{{item.name}}</td>
					<td>{{item.dealername}}</td>
					<td>{{item.bigCommunityName}}</td>
					<td>{{item.saleNumber}}</td>

					<td class="waiting" v-if="item.count==0">{{'未提交'|dz}}</td>
					<td class="pass" v-if="item.count>0">{{'已提交'|dz}}</td>

					<td class="active" v-if="item.count>0 && item.verifystate==0">{{'待审核'|dz}}</td>
					<td class="pass" v-if="item.count>0 && item.verifystate==1">{{'已通过'|dz}}</td>
					<td class="deny" v-if="item.count>0 && item.verifystate==2">{{'已驳回'|dz}}</td>
					<td v-if="item.count==0"></td>
					
					<td class="active" v-if="item.count>0 && item.verifystate==0 && userManage==1 && (item.bigCommunityName+'管理'==user.userName || user.roleId==1)" @click="verify(item.dealerid, item.batchid)">{{'审核'|dz}}</td>
					<td class="active" v-else-if="item.count>0" @click="show(item.dealerid, item.batchid)">{{'查看'|dz}}</td>
					<td class="active" v-else-if="item.count==0 && userManage==0 && item.dealerid==user.dealerId" @click="edit(item.dealerid, item.batchid)">{{'提报'|dz}}</td>
					<td v-else></td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="paging" v-if="data.pagination">
		<span class="total">{{'共'|dz}} {{data.pagination.totalPages}} {{'页'|dz}} - {{'共'|dz}}{{data.pagination.totalCount}} {{'条'|dz}} {{'数据'|dz}}</span>
		<ul class="numbers">
			<li><div class="prev" @click="go2prev"></div></li>
			<li v-for="(item,index) in data.pagination.slider" :class="item==data.pagination.pageNumber?'current':''" @click="go2page(item)">
				<div><span>{{item}}</span></div>
			</li>
			<li><div class="next" @click="go2next"></div></li>
		</ul>
		<span class="limit">{{'每页显示'|dz}}<input type="text" v-model.trim="pageSize">{{'条'|dz}}</span>
		<div class="submit" @click="go2pagesize"><span>{{'确认'|dz}}</span></div>
	</div>
</div>
</template>

<script>
	import Vue from 'vue'
	let base = localStorage.getItem("base")
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
				cond: {
					batch: '0',
					dq: '0',
					xq: '0',
					dealer: '0',
					status: '0',
					enable: false,
					sort: '0'
				},
				user: {},
				userManage: 0,
				materialBatchList: [],
				bigCommunityList: [],
				smallCommunityList: [],
				dealerList: []
			}
		},
		created: function() {
			let that = this;
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
					if (that.user.dealerId!=0) {
						that.get(that.base+"/api/dealer/code?dealerId="+that.user.dealerId, null, function(data){
							if (data.code==200 && data.data != null) {
								that.cond.dealer = data.data.codeNumber;
								that.cond.enable = true;
							}
						}, false);
					}
				}
			}, false);
			this.getFawvwMaterialBatchList();
			this.getCommunityList(0);
		},
		methods: {
			getFawvwMaterialBatchList: function() {
				let that = this;
				this.get(this.base + "/api/fawvwmaterial/batch/list", null, function(data){
					if (data.code==200) {
						that.materialBatchList = data.data;
						if (data.data.length>0) {
							that.cond.batch = data.data[0].id.toString();
							that.getData();
						}
					}
				})
			},
			getCommunityList: function(parentId) {
				let that = this;
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
				let that = this;
				this.get(this.base + "/api/dealer/list", {smallCommunityId: smallCommunityId}, function(data){
					if (data.code==200) {
						that.dealerList = data.data;
					}
				})
			},
			getData: function() {
				let that = this;
				var params = {};
				params.pageSize = this.pageSize;
				params.pageNumber = this.pageNumber;
				params.batchId = that.cond.batch;
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
					if (that.cond.status!=0) {
						params.status = that.cond.status;
					}
				}
				this.get(this.base + "/api/fawvwmaterial/list", params, function(data){
					if (data.code==200) {
						that.data = data.data;
						for(var key in that.data.list) {
							var item = that.data.list[key];
							if (item.verifystate!=null) {
								var state = item.verifystate.split(",");
								for(var i in state) {
									if (state[i]==0) {
										that.data.list[key].verifystate = 0;
										break;
									}
									if (state[i]==2) {
										that.data.list[key].verifystate = 2;
										break;
									}
									that.data.list[key].verifystate = state[i];
								}
							}
						}
						that.pageCount = data.data.pagination.totalPages;
						that.pageNumber = data.data.pagination.pageNumber;
						that.$nextTick(function(){
							that.parentHeight();
						})
					}
				});
			},
			edit: function(dealerid, batch) {
				window.location = "/list_t_edit?dealerid="+dealerid+"&batch="+batch;
			},
			show: function(dealerid, batch) {
				window.location = "/list_t_show?dealerid="+dealerid+"&batch="+batch+"&show=1";
			},
			verify: function(dealerid, batch) {
				window.location = "/list_t_verify?dealerid="+dealerid+"&batch="+batch;
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
			search: function() {
				this.cond.enable = true;
				this.getData();
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
	.t-list {
		min-height: 600px;
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
						border: none;
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
						border: none;
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
						border: none;
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
				width: 180px;
				text-align: left;
				.cc {
					width: 70%;
					display: inline-block;
					border-bottom: 1px solid #2e3e4d;
					select {
						border: none;
						font-size: 14px;
						width: 100%;
						text-indent: 10px;
					}
					select:focus {
						outline: none;
					}
				}
			}
			.status {
				display: inline-block;
				width: 120px;
				text-align: left;
				.cc {
					width: 70%;
					display: inline-block;
					border-bottom: 1px solid #2e3e4d;
					select {
						border: none;
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

		.list {
			padding-bottom: 30px;
			width: 90%;
			margin-top: 20px;
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
							border-bottom: 1px solid #e7eaec;
							width: 15%;
							text-align: center;
							color: #000;
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
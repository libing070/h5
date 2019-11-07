<!--分析-->
<template>
	<div class="wenjuan_analytics">
		<div class="title">
			<span>问卷数据汇总表</span>
		</div>
		<div class="first">
			<ul class="table">
				<li class="head">
					<ul class="tr">
						<li class="th">
							<span>大区</span>
						</li>
						<li class="th">
							<span>执行家数</span>
						</li>
						<li class="th">
							<span>邀约总数</span>
						</li>
						<li class="th">
							<span>进店总数</span>
						</li>
						<li class="th">
							<span>邀约进店率</span>
						</li>
						<li class="th">
							<span>订单总数</span>
						</li>
						<li class="th">
							<span>未交车总数</span>
						</li>
					</ul>
				</li>
				<li class="item">
				</li>
			</ul>
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
		}
	}
</script>

<style lang="scss" scope>
	.wenjuan_analytics {
		.title {
			height: 30px;
			span {
				color: #3c484d;
				font-size: 18px;
			}
			padding-bottom: 10px;
			border-bottom: 2px solid #dfe4e8;
		}
		.first {
			width: 90%;
			height: 100px;
			margin-top: 10px;

			.table {
				width: 100%;
				list-style: none;
				.head {
					width: 100%;
					.tr {
						width: 100%;
						list-style: 100%;
						border-bottom: 1px solid #dfe4e8;
						.th {
							width: 13.3%;
							height: 30px;
							display: inline-block;
							text-align: center;

						}
					}
				}
			}
		}
	}
</style>
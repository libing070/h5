<template>
<div class="jieda-footer">
	<span class="copyright">©一汽-大众汽车有限公司 版权所有</span>
	<!--<span class="back_enter" @click="go2back">进入后台 -></span>-->
</div>
</template>
<style lang="scss" scope>
.jieda-footer {
	width: 100%;
	min-width: 1280px;
	height: 40px;
	text-align: center;
	background: #e3e3e3;
	.copyright {
		color: gray;
		font-size: 14px;
		font-family: "font-hy-55";
		display: inline-block;
		margin-top: 10px;
	}
	.back_enter {
		float: right;
		font-size: 14px;
		margin-top: 10px;
		margin-right: 20px;
		color: #8e99ad;
	}
}
</style>
<script>
export default {
	methods: {
		go2back: function() {
			window.location = "/jsp/admin/yiqidazhong/index.jsp";
		}
	}
}
</script>
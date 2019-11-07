<!--footer-->
<template>
	<div class="e-footer">
	<span class="copyright">©一汽-大众汽车有限公司 版权所有</span>
	<span class="back_enter" @click="go2back">{{'进入后台'|dz}} -></span>
</div>
</template>
<style lang="scss" scope>
.e-footer {
	width: 100%;
	min-width: 1280px;
	height: 40px;
	text-align: center;
	background: #656c7f;
	.copyright {
		color: #fff;
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
		cursor: pointer;
	}
}
</style>
<script>
export default {
	methods: {
		go2back: function() {
			window.location = "https://4em.cig.com.cn/jsp/admin/index.jsp";
		}
	}
}
</script>

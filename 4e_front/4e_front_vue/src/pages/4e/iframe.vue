<template>

</template>
<script>
import Vue from 'vue'
var base = localStorage.getItem("base")
import util_js from '@/assets/4e/js/util.js'
Vue.use(util_js)
export default {
	data: function(){
		return {
			height: ''
		}
	},
	created: function() {
		this.height = this.$route.query.height;
		$("#main_frame" , parent.parent.document).css('height', this.height);
	}
}
</script>
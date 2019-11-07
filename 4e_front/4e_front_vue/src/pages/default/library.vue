<!--e-library-->
<template>
<div class="page-frame">
	<app-header :page_tab="page_tab"></app-header>
	<div class="left">
		<ul>
			<li v-for="(item,index,key) in menu" :class="key==0?'active':''">
				<img :src="item.ico" :data-src="item.ico_white"/><span>{{item.name}}</span>
			</li>
		</ul>
	</div>
	<div class="sub">
		<ul></ul>
	</div>
	<div class="iframe">

	</div>
</div>
</template>
<script>
import Header from './header.vue'

import layui_css from '@/assets/default/css/layui.css'
import style_css from '@/assets/default/css/style_main.css'

let base = localStorage.getItem("base")
export default {
	data: function(){
		return {
			base: base,
			page_tab: "e-library",
			menu: {}
		}
	},
	components : {
		"app-header": Header,
	},
	created(){
		let that = this;
		$.ajax({
			url: this.base+"/api/menu/left",
			data: {topName: 'e-library'},
			dataType: 'json',
			xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
			success: function(data){
				if (data.code==200) {
					var menu = {};
					for(var key in data.data) {
						var item = data.data[key];
						item.ico = that.base+"/static/pc/adminStyles/images/ico_dark/ico"+item.id+".png";
						item.ico_white = that.base+"/static/pc/adminStyles/images/ico_white/ico"+item.id+".png";
						switch(item['level']) {
							case 2:
								if (menu[item['id']]==null) {
									item.children = {};
									menu[item['id']] = item;
								}
								break;
							case 3:
								if (menu[item['parentId']]!=null) {
									item.children = {};
									menu[item['parentId']].children[item['id']] = item;
								}
								break;
							case 4:
								var idPath = item['idPath'].split(",");
								var first = idPath[1];
								var second = idPath[2];
								if (menu[first]!=null && menu[first].children[second]!=null) {
									menu[first].children[second].children[item['id']] = item;
								}
								break;
						}
					}
					that.menu = menu;
				}
			}
		});
	},
	methods: {
		
	}
}
</script>
<style lang="scss">
.page-frame {
	width: 100%;
	height: 100%;
	.left {
		height: 100%;
	    width: 193px;
	    background: #fff;
	    border-right: 1px solid #dce2e8;
	    font-size: 14px;
	    font-family: "Microsoft YaHei";
	    color: #818991;
		ul {
			text-align: left;
    		list-type: none;
    		color: #afb5ba;
			li {
				line-height: 50px;
				padding-left: 10%;
				img {
					width: 19px;
					margin-left: 11%;
				}
				span {
					font-weight: 700;
				    text-align: left;
				    margin-left: 6%;
				    vertical-align: middle;
				}
			}
			.active {
				background: #2874d6;
			}
		}
	}
}
</style>
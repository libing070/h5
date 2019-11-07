<!--e-library-->
<template>
	<div class="e-library">
		<app-header :page_tab="page_tab"></app-header>

		<!--tab-->
		<div class="tab">
			<div class="search_code">
				<input @keyup.enter="search" :placeholder="search_placeholder" v-model.trim="filecode"/>
				<div @click="search"><img src="../../assets/4e/img/find.png"/></div>
			</div>
			<div class="submenu">
				<ul class="slist">
					<li v-for="(item,index) in submenu_s" :class="item.active==1?'active item':'item'" :data-id="item.id">
						<div class="tt" v-if="item.emptyChild==true" @click="changeSubMenu(item.id, item.permissionCode)"><span class="txt">{{item.name|dz}}</span></div>
						<div class="childMenu tt" v-if="item.emptyChild==false" :data-children="JSON.stringify(item.children)"><span class="txt">{{item.name|dz}}</span>
						</div>
					</li>
				</ul>
			</div>
		</div>

		<!--left-->
		<div class="left">
			<ul>
				<li  v-for="(item,index) in menu" :class="item.active==1?'active':''" :data-id="item.id" @click="changeLeftMenu(item.id)">
					<img  :src="(item.active==1?item.icoblue:item.ico)"/>
					<span>{{item.name|dz}}</span>
				</li>
				
			</ul>
		</div>
		<!--split-->
		<div class="frame_split">
			<img src="../../assets/4e/img/frame_split.png" />
		</div>
		<div class="frame_main">
			<iframe id="main_frame" :src="main_url" style="width:100%;" scrolling="no" frameborder="0"></iframe>
		</div>
		<div class="block">
			<div class="narrow"></div>
			<ul class='list'>
				<li v-for="(item,index) in childMenu"><span @click="changeSubMenu(item.id, item.permissionCode, item.parentId)">{{item.name|dz}}</span></li>
			</ul>
		</div>
	</div>
</template>

<script>

import font_css from '@/assets/4e/css/font.css'
import global_css from '@/assets/4e/css/global.css'

import Header from './header_s.vue';
import Footer from './footer.vue';

var base = localStorage.getItem("base")
export default {
	data: function(){
		var that = this;
		return {
			search_placeholder: this.dz("输入素材编码搜索"),
			page_tab: "library",
			base: base,
			menu: {},
			current_left_menu_id : 0,
			submenu: {},
			submenu_s: {},
			childMenu: [],
			changeLeft: false,
			current_sub_menu_id : 0,
			activityId: 0,
			main_url: "",
			id: 0,
			filecode: ''
		}
	},
	components : {
		"app-header": Header,
		"app-footer": Footer
	},
	methods: {
		init: function() {
			this.submenu = this.menu[this.current_left_menu_id].children;
			var tmp = [];
			var active = 1;
			for(var key in this.submenu) {
				var item = this.submenu[key];
				if (this.changeLeft==false && this.current_sub_menu_id==0) {
					if (active==1) {
						item.active = active;
						this.current_sub_menu_id = item.id;
						active = 0;
					}else {
						item.active = active;
					}
				}else if(this.changeLeft==false && this.current_sub_menu_id!=0){
					if (this.current_sub_menu_id == item.id) {
						item.active = active;
						active = 0;
					}else{
						item.active = 0;
					}
				}else{
					if (active==1) {
						item.active = active;
						this.current_sub_menu_id = item.id;
						active = 0;
					}else {
						item.active = active;
					}
				}
				item.emptyChild = JSON.stringify(item.children) == "{}";
				this.submenu[key] = item;
				tmp.push(item);
			}
			this.submenu_s = tmp.sort(function(a, b){
				if (a.sortId>b.sortId) return 1;
				if (a.sortId<b.sortId) return -1;
				return 0;
			});
			if (this.id==0) {
				this.changeSubMenu(this.current_sub_menu_id, this.submenu[this.current_sub_menu_id].permissionCode);
			}
		},
		changeLeftMenu: function(id) {
			this.menu[id].active = 1;
			this.menu[this.current_left_menu_id].active = 0;
			this.current_left_menu_id = id;
			this.changeLeft = true;
			this.id = 0;
            this.init();
        },
		changeSubMenu: function(id, code, parent=null) {
			if (parent!=null) {
				this.submenu[parent].active = 1;
				if (this.current_sub_menu_id != parent) {
					this.submenu[this.current_sub_menu_id].active = 0;
					this.current_sub_menu_id = parent;
				}
				$(".block").hide();
				var parent_code = this.submenu[parent].permissionCode;
				var parent_x = this.getNumber(parent_code);
				this.main_url = "/list?second_cat_id="+parent_x+"&third_cat_id="+this.getNumber(code)+"&inner=1";
				return;
			}else{
				this.submenu[id].active = 1;
				if (this.current_sub_menu_id != id) {
					this.submenu[this.current_sub_menu_id].active = 0;
					this.current_sub_menu_id = id;
				}
			}
			var cat_id = this.getNumber(code);
			if (cat_id==10 || cat_id==17 || cat_id==22 || cat_id==145 || cat_id==146 || cat_id==346) {
				this.main_url = "/list_o?second_cat_id="+cat_id;
				return;
			}
			this.main_url = "/list?second_cat_id="+cat_id;
		},
		search: function() {
			var that = this;
			if (this.filecode=='') {
				this.showMsg('请输入素材编码');
				return;
			}
			this.get(this.base+"/api/search/code?filecode="+this.filecode, null, function(data){
				if(data.code==0) {
					that.showMsg("未找到您输入编码对应的素材");
					return;
				}
				var material = data.data;
				that.detail(material.id, material.file_id);
			});
		},
		detail: function(id, file_id) {
			var that = this;
			this.get(this.base+"/api/cate/change?materialId="+id, null, function(data){
				if (data.code==200) {
					var url = "/library?id="+id;
					if (file_id!=null) {
						url += "&file_id="+file_id;
					}
					window.location = url;
				}
			});
		}
	},
	created: function(){
		this.get(this.base+"/api/user/islogin", null, function(data){
			if (data.code==0) {
				window.location = "/login";
				return;
			}
		},false);
		var that = this;
		//打开素材详情
		if (this.$route.query.fileId!=null) {
			this.file_id = this.$route.query.file_id;
		}
		if (this.$route.query.activityId!=null) {
			this.activityId = this.$route.query.activityId;
		}
		//文件列表
		if (this.$route.query.id!=null) {
			this.id = this.$route.query.id;
			//检查素材权限
			this.get(this.base+"/api/cate/change?materialId="+this.id, null, function(data){
				if (data.code==200) {
					var id_path = data.data.id_path;
					var path = id_path.split(",");
					var first = 0;
					var second = 0;
					var third = 0;
					var four = 0;
					if (path.length>=1) {
						first = path[0];
					}
					if (path.length>=2) {
						second = path[1];
						that.current_left_menu_id = second;
					}
					if (path.length>=3) {
						third = path[2];
						that.current_sub_menu_id = third;
					}
					if (path.length>=4) {
						four = path[3];
					}
					if (that.activityId==0) {
						var url = "/list_file?id="+that.id;
						if (second>0) {
							url = url + "&second_cat_id="+second;
						}
						if (third>0) {
							url = url + "&third_cat_id="+third;
						}
						if (four>0) {
							url = url + "&four_cat_id="+four;
						}
						that.main_url = url;
					}else{
						//获取活动详情数据
						that.get(that.base+"/api/activity/detail?activityId="+that.activityId, null, function(data){
							if (data.code==200) {
								that.get(that.base+"/api/cate/change?cateId="+data.data.materialCatId, null, function(data){
									if (data.code==200) {
										var id_path = data.data.idPath;
										var path = id_path.split(",");
										var first = 0;
										var second = 0;
										var third = 0;
										var four = 0;
										if (path.length>=1) {
											first = path[0];
										}
										if (path.length>=2) {
											second = path[1];
											that.current_left_menu_id = second;
										}
										if (path.length>=3) {
											third = path[2];
											that.current_sub_menu_id = third;
										}
										if (path.length>=4) {
											four = path[3];
										}
										var url = "/list_activity?activityId="+that.activityId;
										if (second>0) {
											url = url + "&secondCatId="+second;
										}
										if (third>0) {
											url = url + "&thirdCatId="+third;
										}
										if (four>0) {
											url = url + "&fourCatId="+four;
										}
										url = url + "&id="+that.id;
										that.main_url = url;
									}
								}, false);
							}
						}, false)
					}
				}
			}, false);
		}
		//分类列表
		if (this.$route.query.menuId!=null) {
			this.get(this.base+"/api/cate/change?menuId="+this.$route.query.menuId, null, function(data){
				if (data.code==200) {
					var id_path = data.data.idPath;
					var path = id_path.split(",");
					var first = 0;
					var second = 0;
					var third = 0;
					var four = 0;
					if (path.length>=1) {
						first = path[0];
					}
					if (path.length>=2) {
						second = path[1];
						that.current_left_menu_id = second;
					}
					if (path.length>=3) {
						third = path[2];
						that.current_sub_menu_id = third;
					}
				}
			}, false);
		}

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
					var active = 1;
					for(var key in data.data) {
						var item = data.data[key];
						item.ico = that.base+"/static/pc/adminStyles/images/ico_dark/ico"+item.id+".png";
                        item.icoblue = that.base+"/static/pc/adminStyles/images/ico_blue/ico"+item.id+".png";
						switch(item['level']) {
							case 2:
								if (menu[item['id']]==null) {
									item.children = {};
									if (active==1 && that.current_left_menu_id==0) {
										that.current_left_menu_id = item['id'];
										item.active = active;
										active = 0;
									}else if(that.current_left_menu_id!=0 && item['id']==that.current_left_menu_id){
										item.active = active;
										active = 0;
									}
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
					that.$nextTick(function(){
						that.init();

                    })
				}
			}
		});
		$("body").on("mouseleave", ".childMenu", function(e){
			$(".block").hide();
			$(".block").parent().removeClass("ctx");
			$("body").append($(".block"));
			that.childMenu = [];
		});
		$("body").on("mouseenter", ".childMenu", function(e){
			e = e || window.event;
			var children = JSON.parse($(this).attr("data-children"));
			var items = [];
			for(var key in children) {
				var tmp = children[key];
				items.push(tmp);
			}
			items = items.sort(function(a, b){
				if (a.sortId>b.sortId) return 1;
				if (a.sortId<b.sortId) return -1;
				return 0;
			});
			that.childMenu = items;
			var obj = this;
			var block = $(".block");
			$(this).append(block);
			$(this).addClass("ctx");
			setTimeout(function(){
				if (block.parent().hasClass("ctx")==true) {
					var x = $(obj).offset().left;
					var y = $(obj).offset().top;
					var w = $(obj).width();
					var h = $(obj).height();
					var bx = x-(block.width() - w)/2;
					var by = y+33;
					block.css("left", bx+'px');
					block.css("top", by+'px');
					block.show();
				}
			}, 100);
			
		});
	}
}

</script>

<style lang="scss" scope>
	.e-library {
		letter-spacing: 1px;
		width: 100%;
		min-width: 1280px;
		height: 100%;
		.tab {
			height: 50px;
			width: 100%;
			background: transparent;
			margin-top: -50px;

			.search_code {
				width: 320px;
				height: 100%;
				float: left;
				font-family: 'font-hy-55';
				input {
					height: 34px;
					margin-top: 6px;
					margin-left: 60px;
					width: 60%;
					font-size: 14px;
					background: transparent;
					border: unset;
					color: #fff;
					background: transparent \9;
					border: none \9;
				}
				
				div {
					display: inline-block;
				    height: 30px;
				    margin-top: 14px;
				    float: right;
				    margin-right: 23px;
				    cursor: pointer;
				}
			}

			.submenu {
				width: 70%;
				height: 100%;
				display:inline-block;
				margin-left: 15px;
				cursor: pointer;
				.slist {
					list-style: none;
					height: 100%;
					font-size: 14px;
					color: #fff;
					font-family: 'font-hy-55';
					.item {
						float: left;
						line-height: 100%;
						height: 100%;
						padding-left: 20px;
						.tt {
							height: 100%;
							.txt {
								display: inline-block;
								margin-top: 18px;
							}	
						}
					}
					.active {
						color: #00b0f0;
					}
				}
			}

		}
		.left {
			width: 320px;
			display: inline-block;
			position: absolute;
			ul {
				width: 80%;
				height: 90%;
				margin-left: 20%;
				padding-top: 10%;
				list-style: none;
				font-size: 16px;
				color: rgb(46, 62, 77);
				font-family: "font-hy";
				font-weight: 500;
				display: inline-block;
				overflow: hidden;
				li {
					width: 100%;
					height: 40px;
    				padding-top: 20px;
    				font-family: 'font-hy-55';
    				color: #2e2e2e;
    				cursor: pointer;
					img {
						opacity: 0.3;
					    width: 20px;
					    height: 20px;
					   // margin-left: -20px;
					   // margin-right: 20px;
					  //  filter: drop-shadow(20px 0px 0rem gray);
					}
					span {
						margin-left: 15px;
					    vertical-align: top;
					    line-height: 20px;
					    display: inline-block;
					}
				}
				li:hover {
					color: #00b0f0;
					font-family: 'font-hy-75';
					img {
						opacity: 1;
					    width: 20px;
					    height: 20px;
					    //margin-left: -20px;
					    //margin-right: 20px;
					  //  filter: drop-shadow(20px 0px 0rem #00b0f0);
					}
				}
				.active {
					color: #00b0f0;
					font-family: 'font-hy-75';
					img {
						opacity: 1;
					    width: 20px;
					    height: 20px;
					   // margin-left: -20px;
					    //margin-right: 20px;
					   // filter: drop-shadow(20px 0px 0rem #00b0f0);
					}
				}
			}
		}
		.frame_split {
			width:5px;
			height: 85%;
			display: inline-block;
			position: absolute;
			margin-top: -35px;
			left: 320px;
			img {
				height: 100%;
			}
		}
		.frame_main {
			margin-top: 35px;
		    height: 100%;
		    display: block;
		    margin-left: 340px;
		    width: calc(100% - 340px);
		}
		.block {
			min-width: 100px;
			min-height: 100px;
			background: transparent;
			display: none;
			position: absolute;
			text-align: center;
			.narrow {
				display: inline-block;
				width: 10px;
				height: 10px;
				background: url(../../assets/4e/img/narrows.png) no-repeat;
				background-size: 100% 100%;
				clear: both;
				opacity: 0;
			}
			.list {
				margin-top: -4px;
				background: #001c4c;
				list-style: none;
				width: auto;
				text-align: center;
				padding: 10px 0px;
				opacity: 0.5;
				li {
					height: 20px;
					min-width: 80px;
					display: block;
					padding: 5px 20px 5px 20px;
					span {
						border-bottom: 1px solid #fff;
						color: #fff;
						display: block;
						width: 100%;
						font-size: 14px;
						margin-top: 0px;
						cursor: pointer;
						padding-bottom: 2px;
					}
					
				}
			}
		}
	}

	/*ie11 css hack*/
	@media all and (-ms-high-contrast:none) {
		*::-ms-backdrop, .e-library .tab .search_code input{
			background: transparent;
			border: none;
		}
	}
</style>

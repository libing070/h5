<template>
<div class="jieda-index" v-show="showPage">
	<app-header :page_tab="page_tab"></app-header>
	<!--banner-->
	<div class="banner">
		<swiper :options="swiperOption" class="swiper-wrap"  ref="bannerSwiper" v-if="banners.length!=0">
		  <swiper-slide v-for="(item,index) in banners" :key="index" >
		    <div class="swiper-item">
		    	<img :src="item.url" alt="" />
		    	<span class="dd">
		    		<a :href="item.linkStr"><img src="../../assets/jieda/img/jk_down.png"/></a>
		    	</span>
		    </div>
		  </swiper-slide>
		  <div class="swiper-pagination"  v-for="(item,index) in banners" :key="index" slot="pagination" ></div>
		</swiper>
	</div>
	<!--J-marketing-->
	<div class="library">
		<div class="title">
			<span class="text">{{"素材中心"|dz}}</span>
			<span class="line"></span>
			<span class="en">J-marketing</span>
		</div>
		<ul class="tab">
			<li data-tab="brands" @click="changeTab('brands')" class="left current">{{"产品与品牌"|dz}}</li>
			<li data-tab="actives" @click="changeTab('actives')">{{"活动专区"|dz}}</li>
			<!--<li data-tab="statusTab" @click="changeTab('statusTab')" >{{"展厅物料状态表"|dz}}</li>-->
			<li data-tab="shiyes" @click="changeTab('shiyes')" >{{"区域事业部"|dz}}</li>
			<li data-tab="qiyes" @click="changeTab('qiyes')" >{{"企业标示"|dz}}</li>
			<li data-tab="peixus" @click="changeTab('peixus')"  class="right">{{"培训文件"|dz}}</li>
		</ul>
		<ul class="brands tab-item">
			<li v-for="(item) in brands" :mid='item.id' :pid='item.mid' :thirdCatId='item.thirdCatId'>
				<div class="img" :style="{backgroundImage: 'url(' + item.imageUrl + ')', backgroundSize:'contain',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
				<div class="tab_text">
					<span class="txt">{{item.name}}</span>
					<div>{{"素材编码"|dz}}：<span>{{item.fileCode}}</span></div>
				</div>
			</li>
			<div class="tab_more">
				<div>
					<a>全部列表</a>
				</div>
			</div>
		</ul>
		<ul class="actives tab-item hide">
			<li v-for="(item) in actives" :mid='item.id' :pid='item.mid' :thirdCatId='item.third_cat_id'>
				<div class="img" :style="{backgroundImage: 'url(' + item.imageUrl + ')', backgroundSize:'contain',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
				<div class="tab_text">
					<span class="txt">{{item.name}}</span>
					<div>{{"素材编码"|dz}}：<span>{{item.fileCode}}</span></div>
				</div>
			</li>
			<div class="tab_more">
				<div>
					<a>全部列表</a>
				</div>
			</div>
		</ul>
		<ul class="statusTab tab-item hide">
			<li v-for="(item) in statusTab" :mid='item.id' :pid='item.mid' :thirdCatId='item.thirdCatId'>
				<div class="img" :style="{backgroundImage: 'url(' + item.imageUrl + ')', backgroundSize:'contain',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
				<div class="tab_text">
					<span class="txt">{{item.name}}</span>
					<div>{{"素材编码"|dz}}：<span>{{item.fileCode}}</span></div>
				</div>
			</li>
			<div class="tab_more">
				<div>
					<a>全部列表</a>
				</div>
			</div>
		</ul>
		<ul class="shiyes tab-item hide">
			<li v-for="(item) in shiyes" :mid='item.id' :pid='item.mid' :thirdCatId='item.thirdCatId'>
				<div class="img" :style="{backgroundImage: 'url(' + item.imageUrl + ')', backgroundSize:'contain',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
				<div class="tab_text">
					<span class="txt">{{item.name}}</span>
					<div>{{"素材编码"|dz}}：<span>{{item.fileCode}}</span></div>
				</div>
			</li>
			<div class="tab_more">
				<div>
					<a>全部列表</a>
				</div>
			</div>
		</ul>
		<ul class="qiyes tab-item hide">
			<li v-for="(item) in qiyes" :mid='item.id' :pid='item.mid' :thirdCatId='item.thirdCatId'>
				<div class="img" :style="{backgroundImage: 'url(' + item.imageUrl + ')', backgroundSize:'contain',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
				<div class="tab_text">
					<span class="txt">{{item.name}}</span>
					<div>{{"素材编码"|dz}}：<span>{{item.fileCode}}</span></div>
				</div>
			</li>
			<div class="tab_more">
				<div>
					<a>全部列表</a>
				</div>
			</div>
		</ul>
		<ul class="peixus tab-item hide">
			<li v-for="(item) in peixus" :mid='item.id' :pid='item.mid' :thirdCatId='item.thirdCatId'>
				<div class="img" :style="{backgroundImage: 'url(' + item.imageUrl + ')', backgroundSize:'contain',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
				<div class="tab_text">
					<span class="txt">{{item.name}}</span>
					<div>{{"素材编码"|dz}}：<span>{{item.fileCode}}</span></div>
				</div>
			</li>
			<div class="tab_more">
				<div>
					<a>全部列表</a>
				</div>
			</div>
		</ul>
	</div>
	<!--J-office-->
	<div class="office" v-if="1==2">
		<div class="title">
			<span class="text">{{"办公中心"|dz}}</span>
			<span class="line"></span>
			<span class="en">J-office</span>
		</div>
		<ul>
			<li @click="go2office(633)">
				<div><img src="../../assets/jieda/img/office_tab1.png"></div>
				<div>销售促进系统</div>
			</li>
			<li @click="go2office(627)">
				<div><img src="../../assets/jieda/img/office_tab1.png"></div>
				<div>物料提报管理</div>
			</li>
			<li @click="go2office(629)">
				<div><img src="../../assets/jieda/img/office_tab1.png"></div>
				<div>印刷品监控管理</div>
			</li>
			<li @click="go2office(631)">
				<div><img src="../../assets/jieda/img/office_tab1.png"></div>
				<div>物料反馈管理</div>
			</li>
		</ul>
	</div>
	<!--search-->
	<div class="search">
		<div class="title">想快速找到你要的素材？</div>
		<div class="search_input">
			<span>请输入</span>
			<input type="text" placeholder="素材所对应的编码"/>
			<div><img src="../../assets/jieda/img/search_btn_b.png"/></div>
		</div>
		<div class="line"></div>
	</div>
	<!--download-->
	<div class="download">
		<ul>
			<li>
				<div class="title">捷达品牌营销支持中心APP</div>
				<div class="ercode">
					<img class="app_btn" src="../../assets/jieda/img/iphone_app.png"/>
					<img class="app_btn" src="../../assets/jieda/img/android_app.png"/>
				</div>
				<div class="tip">点击按钮下载安装包</div>
			</li>
			<li class='line'></li>
			<li>
				<div class="title">捷达品牌营销支持中心APP</div>
				<div class="ercode"><img src="static/ercode.png"/></div>
				<div class="tip">扫描二维码下载APP</div>
			</li>
			<li class="line"></li>
			<li>
				<div class="title">微信公众账号</div>
				<div class="ercode"><img src="static/wx.png"/></div>
				<div class="tip">扫描二维码关注我们</div>
			</li>
		</ul>
	</div>
	<app-footer></app-footer>
</div>
</template>

<script>

import font_css from '@/assets/jieda/css/font.css'
import global_css from '@/assets/jieda/css/global.css'

import Header from './header.vue';
import Footer from './footer.vue';

import { swiper, swiperSlide } from "vue-awesome-swiper";
require("swiper/dist/css/swiper.css");

var base = localStorage.getItem("base")
export default {
	data: function(){
		var that = this;
		return {
			showPage: false,
			page_tab: "index",
			base: base,
			swiperOption: {
				notNextTick: true,
				loop: true,
				initialSlide: 0,
				autoplay: {
				  delay: 1000*60*2,
				  stopOnLastSlide: false,
				  disableOnInteraction: true
				},
				speed: 800,
				direction: "horizontal",
				grabCursor: false,
				on: {
				  slideChangeTransitionStart: function() {
				    that.imgIndex= that.realIndex - 1;
				  },
				},
				pagination: {
				  el: ".swiper-pagination",
				  clickable: true,
				  type: "bullets"
				}
			},
			banners: [],
			shiyecnt: 1,
			brands: [],
			actives: [],
			shiyes: [],
			qiyes: [],
			statusTab: [],
			peixus: [],
		}
	},
	components : {
		"app-header": Header,
		"app-footer": Footer,
		swiper,
  		swiperSlide
	},
	methods: {
		getBannerList: function() {
			var that = this;
			this.get(this.base+"/api/banner/list", null, function(data){
				if (data.code == 200) {
					that.banners = data.data;
				}
			});
		},
		getMatrialList: function() {
			var that = this;
			this.get(this.base+"/api/material/index/list", null, function(data){
				if (data.code==200) {
					that.brands = data.data.brands;
					that.qiyes = data.data.qiyes;
					that.statusTab = data.data.statusTab;
					that.peixus = data.data.peixus;
					that.actives = data.data.actives;
					that.shiyes = data.data.shiyes;
					that.shiyecnt = data.data.shiyecnt;
					that.showpage = true;
				}else{
					window.location = '/login';
				}
			});
		},
		init: function() {
		},
		changeTab: function(type) {
			$(".tab-item").each(function(){
				if ($(this).hasClass(type)==false) {
					$(this).addClass("hide");
				}else{
					$(this).removeClass("hide");
				}
			});
			$(".tab li").not("[data-tab='"+type+"']").removeClass("current");
			$(".tab li[data-tab='"+type+"']").addClass("current");
		},
		go2office: function(menu_id) {
			window.location = '/office?menu_id='+menu_id;
		}
	},
	created: function() {
		var that = this;
		this.get(this.base+"/api/user/islogin", null, function(data){
			if (data.code==0) {
				window.location = "/login";
			}
		});
		this.getBannerList();
		this.getMatrialList();
		this.$nextTick(function(){
			that.init();
			that.showPage = true;
		})
	}
}
</script>

<style lang="scss" scope>
.jieda-index {
	width: 100%;
	height: 100%;
	min-width: 1280px;
	min-height: 1000px;
	.banner {
		height: 42%;
		min-height: 400px;
		.swiper-container {
			height: 100%;
			.swiper-pagination {
				margin-top: -10px;
				.swiper-pagination-bulvar {
					width: 50px;
					height: 3px;
					background-color: #ece5e5;
  					opacity: 0.702;
  					border-radius: unset;
				}
				.swiper-pagination-bullet-active {
					width: 50px;
					height: 3px;
					background-color: #2d46ff;
  					opacity: 0.702;
  					border-radius: unset;
				}
			}
			img {
				width: 100%;
			}
			.dd {
				position: absolute;
				bottom: 4%;
				left: 100px;
			}
		}	
	}

	.library {
		width: 100%;
		min-width: 1280px;
		height: 58%;
		background: #d9dbdd;
		text-align: center;
		letter-spacing: 2px;
		.title {
			width: 30%;
			margin-left: 35%;
			position: relative;
			top: 30px;
			height: 80px;

			.text {
				font-size: 30px;
				text-align: center;
				display: block;
				color: #212121;
				font-family: "font-hy-x4-75";
			}

			.line {
				display: block;
				width: 20%;
				margin-top: 10px;
				margin-left: 40%;
				height: 3px;
				background: #000;
			}

			.en {
				display: block;
				width: 24%;
				text-align: center;
				font-size: 12px;
				margin-top: 10px;
				margin-left: 38%;
				color: #262626;
				font-family: "Arial";
			}
		}

		.tab {
			width: 70%;
			height: 30px;

			margin-top: 70px;
			list-style: none;
			display: inline-block;
			text-align: center;
			li {
				padding-left: 3%;
				padding-right: 3%;
				line-height: 10px;
				
				text-align: center;
				display: inline-block;
				vertical-align: middle;
				border-left: 0.5px solid #131313;
				font-size: 14px;
				color: #131313;
				cursor: pointer;
				font-family: "font-hy-55";
			}

			.right {
				border-right: 0.5px solid #131313;
			}
			.current {
				color: #272f3a;
				font-weight: bold;
				font-family: "font-hy-75";
			}
		}

		.tab-item {
			width: 100%;
			height: 400px;
			li {
				width: 20%;
				height: 45%;
				display: inline-block;
				padding-left: 2%;
				padding-top: 2%;
				vertical-align: top;
				.img {
					width: 100%;
					height: 80%;
					border: 1px solid #cac4c4;
				}
				.tab_text {
					.txt {
						color: #191919;
						font-size: 14px;
						overflow: hidden; 
				        text-overflow: ellipsis; 
				        -o-text-overflow: ellipsis;
				        white-space:nowrap;
				        width: 100%;
				        display: inline-block;
				        margin-top: 8px;
				        color: #313131;
				        font-family: "font-hy-55";
					}
					div {
						color: #8f9092;
						font-size: 12px;
						font-family: "font-hy-55";
					}
				}
			}
			li:nth-child(1) {
				padding-left: unset;
			}
			.tab_more {
				width: 100%;
				margin-top: 65px;
				div {
					width: 240px;
					height: 42px;
					background: #272f3a;
					border-radius: 40px;
					color: #fff;
					font-size: 15px;
					letter-spacing: 7px;
					display: inline-block;
					a {
						margin-top: 9px;
						display: inline-block;
						color: #fff;
					}
				}
			}
		}
		.hide {
			display: none;
		}
	}

	.office {
		width: 100%;
		height: auto;
		min-width: 1280px;

		background: url(../../assets/jieda/img/link_bg.png);
	    background-repeat: no-repeat;
	    background-size: 100% 100%;
		.title {
			width: 30%;
			margin-left: 35%;
			position: relative;
			top: 30px;
			height: 80px;
			color: #fff;
			.text {
				font-size: 30px;
				text-align: center;
				display: block;
				font-family: "font-hy-x4-75";
				letter-spacing: 2px;
			}

			.line {
				display: block;
				width: 20%;
				margin-top: 10px;
				margin-left: 40%;
				height: 3px;
				background: #fff;
			}

			.en {
				display: block;
				width: 24%;
				text-align: center;
				font-size: 12px;
				margin-top: 10px;
				margin-left: 38%;
				font-family: "Arial";
			}
		}
		ul {
			width: 80%;
			margin-left: 10%;
			margin-top: 90px;
			text-align: center;
			height: 150px;
			list-style: none;
			position: relative;
			li {
				width: 17%;
				height: 100%;
				display: inline-block;
				text-align: center;
				div {
					width: 100%;
					color: #fff;
					letter-spacing: 2px;
					margin-bottom: 10px;
					font-family: "font-hy";
					display: inline-block;
					img {
						width: 35%;
					}
				}
				
			}
		}
	}

	.search {
		width: 100%;
		min-width: 1280px;
		height: 30%;
		text-align: center;
		.title {
			margin-top: 100px;
			width: 50%;
			margin-left: 25%;
			text-align: center;
			font-size: 43px;
			color: #2a3644;
			font-family: 'font-hy-x4-75';
			-webkit-text-size-adjust:none;
		}
		.search_input {
			width: 100%;
			margin-top: 30px;
			font-size: 18px;
			font-family: 'font-hy-55';
			input {
				width: 16%;
				border: unset;
				border-bottom: 1px solid #000;
				margin-left: 5px;
				line-height: 30px;
			}
			input::placeholder {
				color: rgba(0, 29, 83, 0.529);
			}
			div {
				display: inline-block;
				vertical-align: middle;
				width: 18px;
				margin-left: -25px;
				img {
					width: 100%;
				}
			}
		}
		.line {
			display:none;
			height: 3px;
			background: #e8e8e8;
			width: 86%;
			margin-top: 90px;
			margin-left: 7%;
		}
	}

	.download {
		display: none;
		width: 100%;
		min-width: 1280px;
		height: 500px;
		ul {
			width: 80%;
			margin-left: 10%;
			height: 60%;
			text-align: center;
			list-style: none;
			li {
				vertical-align: top;
				width: 32%;
				height: 100%;
				display: inline-block;
				font-family: "font-hy-55";
				.title {
					height: 30px;
					font-size: 14px;
					color: #464646;
				}
				.ercode {
					margin-top: 20px;
					img {
						width: 180px;
					}
					.app_btn {
						width: 50%;
						margin-left: 25%;
						padding-top: 30px;
						padding-bottom: 20px;
						display: block;
					}
				}
				.tip {
					margin-top: 50px;
					font-size: 14px;
					color: #9a9a9a;
				}
			}
			.line {
				width: 1px;
				border-left: 2px dashed #e6e6e6;
			}
		}
	}

}

</style>
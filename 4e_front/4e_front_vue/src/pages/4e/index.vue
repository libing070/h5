<!--首页-->
<template>
	<div class="e-index" v-show="showPage">
		<app-header :page_tab="page_tab"></app-header>
		<!--banner-->
		<div class="banner" style="min-width: auto">
			<swiper :options="swiperOption" class="swiper-wrap"  ref="bannerSwiper" v-if="banners.length!=0">
			  <swiper-slide v-for="(item,index) in banners" :key="index" >
			    <div class="swiper-item">
			    	<img :src="item.url" alt="" />
			    	<span class="dd"><a>即刻下载</a></span>
			    </div>
			  </swiper-slide>
			  <div class="swiper-pagination"  v-for="(item,index) in banners" :key="index" slot="pagination" ></div>
			</swiper>
		</div>

		<!--素材中心 e-libray-->
		<div class="library">
			<div class="title">
				<span class="text">素材中心</span>
				<span class="line"></span>
				<span class="en">e-libray</span>
			</div>
			<ul class="tab">
				<li data-tab="brands" @click="changeTab('brands')" class="left">{{"产品与品牌"|dz}}</li>
				<li data-tab="actives" @click="changeTab('actives')">{{"活动专区"|dz}}</li>
				<li data-tab="statusTab" @click="changeTab('statusTab')" >{{"展厅物料状态表"|dz}}</li>
				<li data-tab="shiyes" @click="changeTab('shiyes')" >{{"区域事业部"|dz}}</li>
				<li data-tab="qiyes" @click="changeTab('qiyes')" class="current">{{"企业标示"|dz}}</li>
				<li data-tab="peixus" @click="changeTab('peixus')"  class="right">{{"培训文件"|dz}}</li>
			</ul>
			<ul class="brands tab-item hide">
				<li v-for="(item) in brands" :mid='item.id' :pid='item.mid' :thirdCatId='item.thirdCatId'>
					<div class="img" :style="{backgroundImage: 'url(\'' + item.imageUrl + '\')', backgroundSize:'contain',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}" @click="detail(item.id)">
					</div>
					<div class="tab_text">
						<span class="txt" @click="detail(item.id)">{{item.name}}</span>
						<div>{{"素材编码"|dz}}：<span>{{item.fileCode}}</span></div>
					</div>
				</li>
				<div class="tab_more">
					<div>
						<a href="/library?menuId=426">全部列表</a>
					</div>
				</div>
			</ul>
			<ul class="actives tab-item hide">
				<li v-for="(item) in actives" :mid='item.id' :pid='item.mid' :thirdCatId='item.third_cat_id'>
					<div class="img" :style="{backgroundImage: 'url(\'' + item.imageUrl + '\')', backgroundSize:'contain',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}" @click="detail(item.id, item.activity_id)"></div>
					<div class="tab_text">
						<span class="txt" @click="detail(item.id, item.activity_id)">{{item.name}}</span>
						<div>{{"素材编码"|dz}}：<span>{{item.fileCode}}</span></div>
					</div>
				</li>
				<div class="tab_more">
					<div>
						<a href="/library?menuId=577">{{'全部列表'|dz}}</a>
					</div>
				</div>
			</ul>
			<ul class="statusTab tab-item hide">
				<li v-for="(item) in statusTab" :mid='item.id' :pid='item.mid' :thirdCatId='item.thirdCatId'>
					<div class="img" :style="{backgroundImage: 'url(\'' + item.imageUrl + '\')', backgroundSize:'contain',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}" @click="detail(item.id)"></div>
					<div class="tab_text">
						<span class="txt" @click="detail(item.id)">{{item.name}}</span>
						<div>{{"素材编码"|dz}}：<span>{{item.fileCode}}</span></div>
					</div>
				</li>
				<div class="tab_more">
					<div>
						<a href="/library?menuId=426&subId=427">{{'全部列表'|dz}}</a>
					</div>
				</div>
			</ul>
			<ul class="shiyes tab-item hide">
				<li v-for="(item) in shiyes" :mid='item.id' :pid='item.mid' :thirdCatId='item.thirdCatId'>
					<div class="img" :style="{backgroundImage: 'url(\'' + item.imageUrl + '\')', backgroundSize:'contain',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}" @click="detail(item.id)"></div>
					<div class="tab_text">
						<span class="txt" @click="detail(item.id)">{{item.name}}</span>
						<div>{{"素材编码"|dz}}：<span>{{item.fileCode}}</span></div>
					</div>
				</li>
				<div class="tab_more">
					<div>
						<a href="/library?menuId=472">{{'全部列表'|dz}}</a>
					</div>
				</div>
			</ul>
			<ul class="qiyes tab-item">
				<li v-for="(item) in qiyes" :mid='item.id' :pid='item.mid' :thirdCatId='item.thirdCatId'>
					<div class="img" :style="{backgroundImage: 'url(\'' + item.imageUrl + '\')', backgroundSize:'contain',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}" @click="detail(item.id)"></div>
					<div class="tab_text">
						<span class="txt" @click="detail(item.id)">{{item.name}}</span>
						<div>{{"素材编码"|dz}}：<span>{{item.fileCode}}</span></div>
					</div>
				</li>
				<div class="tab_more">
					<div>
						<a href="/library?menuId=576">{{'全部列表'|dz}}</a>
					</div>
				</div>
			</ul>
			<ul class="peixus tab-item hide">
				<li v-for="(item) in peixus" :mid='item.id' :pid='item.mid' :thirdCatId='item.thirdCatId'>
					<div class="img" :style="{backgroundImage: 'url(\'' + item.imageUrl + '\')', backgroundSize:'contain',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}" @click="detail(item.id)"></div>
					<div class="tab_text">
						<span class="txt" @click="detail(item.id)">{{item.name}}</span>
						<div>{{"素材编码"|dz}}：<span>{{item.fileCode}}</span></div>
					</div>
				</li>
				<div class="tab_more">
					<div>
						<a href="/library?menuId=545&subId=548">{{'全部列表'|dz}}</a>
					</div>
				</div>
			</ul>
		</div>

		<!--物料中心 e-shop-->
		<div class="shop">
			<div class="info">
				<div class="title">物料中心</div>
				<div class="line"></div>
				<div class="subtitle">e-shop</div>
			</div>
			<div class="list">
				<ul>
					<li class="item">
						<div class="icon">
							<img src="../../assets/4e/img/good-icon.png">
						</div>
						<div class="title">
							<span>{{'平台商店'|dz}}</span>
						</div>
						<div class="des">
							<span>{{'在这里方便查看更多平台商品'|dz}}</span>
						</div>
						<div class="link" @click='goShop(480)'><span>{{'查看更多'|dz}}</span></div>
					</li>
					<li class="item">
						<div class="icon">
							<img src="../../assets/4e/img/car-icon.png">
						</div>
						<div class="title">
							<span>{{'展厅管理'|dz}}</span>
						</div>
						<div class="des">
							<span>{{'在这里方便管理展厅'|dz}}</span>
						</div>
						<div class="link" @click='goShop(481)'><span>{{'查看更多'|dz}}</span></div>
					</li>
					<li class="item">
						<div class="icon">
							<img src="../../assets/4e/img/order-icon.png">
						</div>
						<div class="title">
							<span>{{'我的订单'|dz}}</span>
						</div>
						<div class="des">
							<span>{{'在这里方便查看更多平台商品'|dz}}</span>
						</div>
						<div class="link" @click='goShop(579)'><span>{{'查看更多'|dz}}</span></div>
					</li>
					<li class="item">
						<div class="icon">
							<img src="../../assets/4e/img/manage-icon.png">
						</div>
						<div class="title">
							<span>{{'物料管理'|dz}}</span>
						</div>
						<div class="des">
							<span>{{'在这里方便查看更多平台商品'|dz}}</span>
						</div>
						<div class="link" @click='goShop(648)'><span>{{'查看更多'|dz}}</span></div>
					</li>
				</ul>
			</div>
		</div>

		<!--办公中心 e-office e-study-->
		<div class="business">
			<ul class="business_d">
				<li class="item">
					<div class="info">
						<div class="title">办公中心</div>
						<div class="line"></div>
						<div class="subtitle">e-office</div>
					</div>
					<div class="list">
						<ul>
							<li>
								<div @click="goOffice(633)">
									<img src="../../assets/4e/img/xc-icon.png">
								</div>
								<span @click="goOffice(633)">{{'销售促进系统'|dz}}</span>
							</li>
							<li>
								<div @click="goOffice(627)">
									<img src="../../assets/4e/img/wltb-icon.png">
								</div>
								<span @click="goOffice(627)">{{'物料提报系统'|dz}}</span>
							</li>
							<li>
								<div @click="goOffice(629)">
									<img src="../../assets/4e/img/jk-icon.png">
								</div>
								<span @click="goOffice(629)">{{'印刷品监控系统'|dz}}</span>
							</li>
							<li>
								<div @click="goOffice(631)">
									<img src="../../assets/4e/img/fk-icon.png">
								</div>
								<span @click="goOffice(631)">{{'物料反馈系统'|dz}}</span>
							</li>
						</ul>
					</div>
				</li>
				<li class="item">
					<div class="info">
						<div class="title">学习中心</div>
						<div class="line"></div>
						<div class="subtitle">e-study</div>
					</div>
					<div class="list">
						<ul>
							<li>
								<div @click="goStudy(492)">
									<img src="../../assets/4e/img/dt-icon.png">
								</div>
								<span @click="goStudy(492)">{{'行业动态'|dz}}</span>
							</li>
							<li>
								<div @click="goStudy(493)">
									<img src="../../assets/4e/img/xx-icon.png">
								</div>
								<span @click="goStudy(493)">{{'学习中心'|dz}}</span>
							</li>
							<li>
								<div @click="goStudy(494)">
									<img src="../../assets/4e/img/tp-icon.png">
								</div>
								<span @click="goStudy(494)">{{'在线投票'|dz}}</span>
							</li>
							<li>
								<div @click="goStudy(495)">
									<img src="../../assets/4e/img/dy-icon.png">
								</div>
								<span @click="goStudy(495)">{{'问卷调研'|dz}}</span>
							</li>
						</ul>
					</div>
				</li>
			</ul>
		</div>

		<!--search-->
		<div class="search">
			<div class="title">{{'想快速找到你要的素材'|dz}}？</div>
			<div class="search_input">
				<span>{{'请输入'|dz}}</span>
				<input @keyup.enter="search" type="text" :placeholder="'素材所对应的编码'|dz" v-model.trim="filecode"/>
				<div @click="search"><img src="../../assets/4e/img/search_btn_b.png"/></div>
			</div>
		</div>
		<!--download-->
		<div class="download">
			<div class="left">
				<img src="../../assets/4e/img/bgg.png"/>
			</div>
			<ul>
				<li>
					<div class="title">{{'营销支持中心APP'|dz}}</div>
					<div class="ercode"><img src="../../../static/4e/ercode.png"/></div>
					<div class="tip">{{'扫描二维码下载APP'|dz}}</div>
				</li>
				<li class="line"></li>
				<li>
					<div class="title">{{'微信公众账号'|dz}}</div>
					<div class="ercode"><img src="../../../static/4e/wx.png"/></div>
					<div class="tip">{{'扫描二维码关注我们'|dz}}</div>
				</li>
				<li class="line"></li>
				<li>
					<div class="title">{{'QQ运营支持群'|dz}}</div>
					<div class="ercode"><img src="../../../static/4e/qq.png"/></div>
					<div class="tip">{{'扫描二维码加入'|dz}}</div>
				</li>
			</ul>
		</div>
		<app-footer></app-footer>

	</div>
</template>

<script>

import font_css from '@/assets/4e/css/font.css'
import global_css from '@/assets/4e/css/global.css'

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
				  delay: 6000,
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
			filecode: ''
		}
	},
	components : {
		"app-header": Header,
		"app-footer": Footer,
		swiper,
  		swiperSlide
	},
	methods : {
		init: function(){

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
		goShop: function(menuId) {
			var that = this;
			this.get(this.base+"/api/cate/change?menuId="+menuId, null, function(data){
				if (data.code==0) {
					that.showMsg("您的权限不够，请联系管理员");
					return;
				}
				window.location = '/shop?leftId='+menuId;
			});
		},
		goOffice: function(menuId) {
			var that = this;
			this.get(this.base+"/api/cate/change?menuId="+menuId, null, function(data){
				if (data.code==0) {
					that.showMsg("您的权限不够，请联系管理员");
					return;
				}
				window.location = '/office?leftId='+menuId;
			});
		},
		goStudy: function(menuId) {
			var that = this;
			this.get(this.base+"/api/cate/change?menuId="+menuId, null, function(data){
				if (data.code==0) {
					that.showMsg("您的权限不够，请联系管理员");
					return;
				}
				window.location = '/study?leftId='+menuId;
			});
		},
		detail: function(id, activity_id) {
			this.get(this.base+"/api/cate/change?materialId="+id, null, function(data){
				if (data.code==200) {
					var url = "/library?id="+id;
					if (activity_id!=null) {
						url += "&activityId="+activity_id;
					}
					window.location = url;
				}
			});
		}
	},
	created: function(){
		var that = this;
		this.get(this.base+"/api/user/islogin", null, function(data){
			if (data.code==0) {
				window.location = "/login";
				return;
			}else{
				//同步语言
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
	.e-index {
		width: 100%;
		min-width: 1280px;
		.banner {
			height: 42%;
			min-height: 400px;
			margin-top: 0;
			.swiper-container {
				height: 100%;
				.swiper-pagination {
					margin-bottom: 15px;
					.swiper-pagination-bullet {
						width: 3px;
						height: 3px;
						background-color: #fff;
						opacity: 1;
						border-radius: 50%;
					}
					.swiper-pagination-bullet-active {
						width: 10px;
						height: 10px;
						background-color: #fff;
						opacity: 1;
						border-radius: 50%;
					}
				}
				img {
					width: 100%;
				}
				.dd {
					display: none;
					position: absolute;
					bottom: 120px;
					left: 100px;
					color: #fff;
					font-size: 18px;
					font-family: 'font-hy-55';
					text-align: center;
					width: 140px;
					height: 40px;
					border-radius: 30px;
					border: 2px solid #fff;
					a {
						margin-top: 7px;
						display: inline-block;
					}
				}
			}
		}

		.library {
			width: 100%;
			min-width: 1280px;
			height: 58%;
			//background: #aab8bd;
			background: url(../../assets/4e/img/library_bg.png) no-repeat;
			background-size: cover;
			text-align: center;
			letter-spacing: 2px;
			.title {
				width: 30%;
				margin-left: 35%;
				position: relative;
				top: 30px;
				height: 80px;

				.text {
					font-size: 3.0rem;
					text-align: center;
					display: block;
					color: #fff;
					font-family: "font-hy-55";
				}

				.line {
					display: block;
					width: 20%;
					margin-top: 10px;
					margin-left: 40%;
					height: 2px;
					background: #fff;
				}

				.en {
					display: block;
					width: 24%;
					text-align: center;
					font-size: 12px;
					margin-top: 10px;
					margin-left: 38%;
					color: #fff;
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
					border-left: 0.5px solid #fff;
					font-size: 14px;
					color: #fff;
					cursor: pointer;
					font-family: "font-hy-55";
				}

				.right {
					border-right: 0.5px solid #fff;
				}
				.current {
					color: #01b0f1;
				}
			}

			.tab-item {
				width: 100%;
				height: 500px;
				li {
					width: 20%;
					height: 65%;
					display: inline-block;
					padding-left: 2%;
					padding-top: 2%;
					vertical-align: top;
					.img {
						width: 100%;
						height: 80%;
						border: 1px solid #cac4c4;
						background-color: #fff;
						cursor: pointer;
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
							margin-top: 10px;
							color: #fff;
							font-family: "font-hy-55";
							font-weight: bold;
							cursor: pointer;
						}
						div {
							color: #fff;
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
						background: #01b0f1;
						border-radius: 40px;
						color: #fff;
						font-size: 15px;
						letter-spacing: 7px;
						display: inline-block;
						a {
							margin-top: 9px;
							display: inline-block;
							color: #fff;
							text-decoration: none;
						}
					}
				}
			}
			.hide {
				display: none;
			}
		}

		.shop {
			width: 100%;
			min-width: 1280px;
			height: 400px;
			.info {
				margin-left: 90px;
				margin-top: 60px;
				width: 200px;
				height: 100%;
				display: inline-block;
				.title {
					height: 50px;
					font-size: 3.0rem;
					font-family: "font-hy-55";
					color: #001d53;
				}
				.line {
					margin-top: 10px;
					height: 2px;
					width: 40px;
					background: #cbcbcb;
				}
				.subtitle {
					margin-top: 10px;
					font-size: 1.5rem;
					color: #797e82;
				}
			}
			.list {
				height: 250px;
				width: calc(100% - 300px);
				display: inline-block;
				margin-top: 73px;
				vertical-align: top;
				ul {
					list-style: none;
					height: 100%;
					.item {
						width: 16%;
						height: 280px;
						margin-right: 5%;
						display: inline-block;
						border: 1px solid #e7e7e7;
						border-radius: 10px;
						vertical-align: top;
						.icon {
							margin-left: 15%;
							margin-top: 15%;
						}
						.title {
							margin-top: 5%;
							margin-left: 17%;
							color: #4c5359;
							font-family: "font-hy-55";
						}
						.des {
							margin-top: 5%;
							margin-left: 17%;
							width: 50%;
							color: #c3c3c3;
							height: 30px;
							font-family: "font-hy-55";
						}
						.link {
							margin-top: 30%;
							margin-left: 17%;
							color: #26b4f2;
							cursor: pointer;
						}
					}
				}
			}
		}

		.business {
			width: 100%;
			height: 25%;
			min-height: 277px;
			min-width: 1280px;
			background: url(../../assets/4e/img/business_bg.png) no-repeat;
			background-size: cover;
			.business_d {
				width: 100%;
				height: 100%;
				min-height: 277px;
				list-style: none;
				.item {
					width: 50%;
					height: 100%;
					min-height: 277px;
					display: inline-block;
					float: left;
					.info {
						margin-top: 25px;
						height: 70px;
						text-align: center;

						.title {
							font-size: 3.0rem;
							text-align: center;
							display: block;
							color: #fff;
							font-family: "font-hy-55";
						}
						.line {
							display: block;
							width: 20%;
							margin-top: 10px;
							margin-left: 40%;
							height: 2px;
							background: #fff;
						}
						.subtitle {
							display: block;
							width: 24%;
							text-align: center;
							font-size: 12px;
							margin-top: 10px;
							margin-left: 38%;
							color: #fff;
							font-family: "Arial";
						}
					}
					.list {
						list-style: none;
						width: 80%;
						margin-left: 10%;
						height: 80px;
						text-align: center;
						li {
							padding-top: 50px;
							width: 20%;
							height: 100%;
							display: inline-block;
							text-align: center;
							div {
								width: 60px;
								height: 60px;
								display: inline-block;
								background: #00b1f1;
								text-align: center;
								border-radius: 50%;
								cursor: pointer;
								img {
									margin-top: 14px;
								}
							}
							span {
								margin-top: 10px;
								display: block;
								color: #fff;
								font-size: 14px;
								font-family: "font-hy-55";
								cursor: pointer;
							}
						}
					}
				}
			}

		}

		.search {
			width: 100%;
			min-width: 1280px;
			height: 240px;
			text-align: center;
			.title {
				margin-top: 100px;
				width: 50%;
				margin-left: 25%;
				text-align: center;
				font-size: 45px;
				color: #001d53;
				font-family: 'font-hy-75';
				-webkit-text-size-adjust:none;
				span {
					font-family: 'font-hy-55';
				}
			}
			.search_input {
				width: 100%;
				margin-top: 30px;
				font-size: 18px;
				font-family: 'font-hy-55';
				span {
					vertical-align: middle;
					color: #001d53;
				}
				input {
					width: 16%;
					border: unset;
					border-bottom: 1px solid #001d53;
					margin-left: 5px;
					line-height: 30px;
					border-top: none \9;/*IE6.7.8.9.10都生效*/
					border-left: none \9;
					border-right: none \9;
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
						cursor: pointer;
					}
				}
			}
		}

		.download {
			width: 100%;
			min-width: 1280px;
			height: 300px;
			background: #e0e1e5;
			text-align: center;
			.left {
				bottom: 5%;
				width: 250px;
				height: 100%;
				img {
					width: 100%;
					margin-top: 62px;
				}
				display: inline-block;
			}
			ul {
				width: 45%;
				height: 100%;
				text-align: center;
				list-style: none;
				display: inline;
				margin-left: 4%;
				li {
					vertical-align: top;
					width: 12%;
					height: 100%;
					display: inline-block;
					font-family: "font-hy-55";
					.title {
						height: 30px;
						font-size: 17px;
						color: #36466b;
						margin-top: 103px;
						font-family: "font-hy-55";
					}
					.ercode {
						margin-top: 9px;
						img {
							width: 100px;
						}
					}
					.tip {
						margin-top: 5px;
						color: #727272;
					}
				}
                li:nth-child(1) {
                    opacity: 0;
                }
				.line {
					width: 1px;
					height: 27px;
					border-left: 1px dashed #b4bac7;
					margin-top: 176px;
				}
			}
		}

	}

	/*!*ie11 css hack*!*/
	/*@media all and (-ms-high-contrast:none) {*/
		/**::-ms-backdrop, .e-index .search .search_input input{*/
			/*border: none;*/
			/*border-bottom: 1px solid #001d53;*/
		/*}*/
	/*}*/

	/*ie11注意里面的标点符号*/
	/*ie10 css hack*/
	@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
		//.class名字 { 里面的样式:样式值;}
		.search .search_input input{
			border: none;
			border-bottom: 1px solid #001d53;
		}

	}
</style>

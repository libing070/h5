<template>
<div v-show="showpage">
   
	<app-header :page_tab="page_tab"></app-header>
 
	<carousel class="banner" :data="banner" :interval="3000" :autoplay="true" :loop="true" :indicators="false"></carousel>

	       
	<div class="content">
		<!--素材中心-->
		<div class="content_row">
			<div class="row_title">
				<h2><span>e-</span>library</h2>
				<h3>{{'素材中心'|dz}}</h3>
				<div class="row_title_line"></div>
			</div>
			<div class="row_content">
				<div  id="libaray"  class="layui-tab layui-tab-brief tab_box" lay-filter="docDemoTabBrief">
				    <ul class="layui-tab-title">
					    <li class="layui-this" @click="changeLibUrl(1)" data-tab="tab-brands">{{'产品与品牌'|dz}}</li>
					    <li @click="changeLibUrl(2)" data-tab="tab-actives">{{'活动专区'|dz}}</li>
					    <li v-if="shiyecnt>0" @click="changeLibUrl(3)" data-tab="tab-shiyes">{{'区域事业部'|dz}}</li>
					    <li @click="changeLibUrl(4)" data-tab="tab-qiyes">{{'企业标识'|dz}}</li>
					    <li @click="changeLibUrl(5)" data-tab="tab-statusTab">{{'展厅物料状态表'|dz}}</li>
					    <li @click="changeLibUrl(6)" data-tab="tab-peixus">{{'培训文件'|dz}}</li>
				    </ul>
				    <div class="layui-tab-content">
					    <div class="layui-tab-item tab-brands layui-show">
				    		<ul class="tab_ul">
				    			<li urlid='1'  v-for="(item) in brands" redirect='1' :thirdCatId='item.thirdCatId' :mid='item.id' >
				    				<a href="javascript:;" class="tab_img"><img height="172px"  :src="item.imageUrl" width="100%" /></a>
				    				<div class="tab_text">
				    					<h2>{{item.name}}</h2>
				    					<div>附件类别：<span>{{item.fileType}}</span></div>
				    					<div>下载次数：<span>{{item.downloadNum}}次</span></div>
				    				</div>
				    			</li>
				    		</ul>
					    </div>
					    <div class="layui-tab-item tab-actives">
				    		<ul class="tab_ul">
				    			<li urlid='2' v-for="(item) in actives" redirect='8' :thirdCatId='item.name' v-bind:mid="item.id+','+item.mid" >
				    				<a href="javascript:;" class="tab_img"><img height="172px"  :src="item.imageUrl" width="100%" /></a>
				    				<div class="tab_text">
				    					<h2>{{item.name}}</h2>
				    					<div>附件类别：<span>{{item.fileType}}</span></div>
				    					<div>下载次数：<span>{{item.downloadNum}}次</span></div>
				    				</div>
				    			</li>
				    		</ul>
					    </div>
					    <div class="layui-tab-item tab-shiyes" v-if="shiyecnt > 0">
				    		<ul class="tab_ul">
				    			<li urlid='3'  v-for="(item) in shiyes" redirect='1' :thirdCatId='item.thirdCatId' :mid='item.id'>
				    				<a href="javascript:;" class="tab_img"><img height="172px" :src="item.imageUrl" width="100%" /></a>
				    				<div class="tab_text">
				    					<h2>{{item.name}}</h2>
				    					<div>附件类别：<span>{{item.fileType}}</span></div>
				    					<div>下载次数：<span>{{item.downloadNum}}次</span></div>
				    				</div>
				    			</li>
				    		</ul>
					    </div>
					    <div class="layui-tab-item tab-qiyes">
				    		<ul class="tab_ul">
				    			<li urlid='4'  v-for="(item) in qiyes" redirect='1' :thirdCatId='item.thirdCatId' :mid='item.id'>
				    				<a href="javascript:;" class="tab_img"><img height="172px"  :src="item.imageUrl" width="100%" /></a>
				    				<div class="tab_text">
				    					<h2>{{item.name}}</h2>
				    					<div>附件类别：<span>{{item.fileType}}</span></div>
				    					<div>下载次数：<span>{{item.downloadNum}}次</span></div>
				    				</div>
				    			</li>
				    		</ul>
					    </div>
					    <div class="layui-tab-item tab-statusTab">
				    		<ul class="tab_ul">
				    			<li id="statusTab" v-for="(item) in statusTab" urlid='5' redirect='2'  :mid='item.fileid' :pid='item.mid' :thirdCatId='item.thirdCatId'>
				    				<a href="javascript:;" class="tab_img"><img height="172px"  :src="item.imageUrl" width="100%" /></a>
				    				<div class="tab_text">
				    					<h2>{{item.name}}</h2>
				    					<div>附件类别：<span>{{item.fileType}}</span></div>
				    					<div>下载次数：<span>{{item.downloadNum}}次</span></div>
				    				</div>
				    			</li>
				    		</ul>
					    </div>
					    <div class="layui-tab-item tab-peixus">
				    		<ul class="tab_ul">
				    			<li urlid='6'  v-for="(item) in peixus" redirect='1' :thirdCatId='item.thirdCatId' :mid='item.id'>
				    				<a href="javascript:;" class="tab_img"><img height="172px"  :src="item.imageUrl" width="100%" /></a>
				    				<div class="tab_text">
				    					<h2>{{item.name}}</h2>
				    					<div>附件类别：<span>{{item.fileType}}</span></div>
				    					<div>下载次数：<span>{{item.downloadNum}}次</span></div>
				    				</div>
				    			</li>
				    		</ul>
					    </div>
					</div>
				</div> 
			</div>
			<div class="row_btn">
				<a id="moreLib" urlid='1' href="javascript:;"  class="layui-btn layui-btn-primary">{{'更多内容'|dz}}</a>
			</div>
		</div>
		<!--物料中心-->
		<div class="content_row content_row-office">
			<div class="row_title">
				<h2><span>e-</span>shop</h2>
				<h3>{{'物料中心'|dz}}</h3>
				<div class="row_title_line"></div>
					
			</div>
			<div class="row_content" id="shop">
				<ul>
					<li onclick="toUrl(7)">
						<a href="javascript:;" class="office_icon office_icon5"></a>
						<div class="office_text">{{'平台商品'|dz}}</div>
					</li>
					<li onclick="toUrl(8)">
						<a href="javascript:;" class="office_icon office_icon6"></a>
						<div class="office_text">{{'展厅管理'|dz}}</div>
					</li>
					<li onclick="toUrl(9)">
						<a href="javascript:;" class="office_icon office_icon7"></a>
						<div class="office_text">{{'我的订单'|dz}}</div>
					</li>
					<li onclick="toUrl(10)">
						<a href="javascript:;" class="office_icon office_icon8"></a>
						<div class="office_text">{{'物料管理'|dz}}</div>
					</li>
				</ul>
			</div>
		</div>
		<!--办公中心-->
		<div class="content_row content_row-office">
			<div class="row_title">
				<h2><span>e-</span>office</h2>
				<h3>{{'办公中心'|dz}}</h3>
				<div class="row_title_line"></div>
			</div>
			<div class="row_content">
				<ul>
					<li><!-- 判断权限 -->
						<a href="${ctx}/jsp/pc/interface/faw/do.jsp?method=doLogin" class="office_icon office_icon1"></a>
						<div class="office_text">{{'销售促进系统'|dz}}</div>
					</li>
					<li onclick="toUrl(12)">
						<a href="javascript:;" class="office_icon office_icon2"></a>
						<div class="office_text">{{'物料提报管理'|dz}}</div>
					</li>
					<li onclick="toUrl(13)">
						<a href="javascript:;" class="office_icon office_icon3"></a>
						<div class="office_text">{{'印刷品监控管理'|dz}}</div>
					</li>
					<li onclick="toUrl(14)">
						<a href="javascript:;" class="office_icon office_icon4"></a>
						<div class="office_text">{{'物料反馈管理'|dz}}</div>
					</li>
				</ul>
			</div>
		</div>
		<!--学习中心-->
		<div class="content_row">
			<div class="row_title">
				<h2><span>e-</span>study</h2>
				<h3>{{'学习中心' | dz}}</h3>
				<div class="row_title_line"></div>	
			</div>
			<div class="row_content" id="study">
				<div class="layui-tab layui-tab-brief tab_box" lay-filter="docDemoTabBrief">
				    <ul class="layui-tab-title">
					    <li  @click="changeStudyUrl(15)" class="layui-this" data-tab="tab-newss">{{'行业动态'|dz}}</li>
					    <li  @click="changeStudyUrl(16)" data-tab="tab-documents">{{'学习中心'|dz}}</li>
					    <li  @click="changeStudyUrl(17)" data-tab="tab-votes">{{'在线投票'|dz}}</li>
					    <li  @click="changeStudyUrl(18)" data-tab="tab-qaList">{{'问卷调研'|dz}}</li>
				    </ul>
				    <div class="layui-tab-content">
					    <div class="layui-tab-item tab-newss layui-show">
				    		<ul class="tab_ul">
				    			<li urlid="15"  v-for="(item,index) in newss" redirect='4' :mid="item.id">
				    				<a href="javascript:;" class="tab_img"><img :src="item.img" width="100%" /></a>
				    				<div class="tab_text">
				    					<h2>{{item.title}}</h2>
				    				</div>
				    			</li>
				    		</ul>
					    </div>
					    <div class="layui-tab-item tab-documents">
				    		<ul class="tab_ul">
				    			<li urlid="16"  v-for="(item,index) in documents" redirect='5' :mid="item.id">
				    				<a href="javascript:;" class="tab_img"><img :src="item.img" width="100%" /></a>
				    				<div class="tab_text">
				    					<h2>{{item.title}}</h2>
				    				</div>
				    			</li>
				    		</ul>
					    </div>
					    <div class="layui-tab-item tab-votes">
				    		<ul class="tab_ul">
				    			<li urlid="17" v-for="(item,index) in votes" redirect='6' :mid="item.id">
				    				<a href="javascript:;" class="tab_img"><img :src="item.img" width="100%" /></a>
				    				<div class="tab_text">
				    					<h2>{{item.title}}</h2>
				    				</div>
				    			</li>
				    		</ul>
					    </div>
					    <div class="layui-tab-item tab-qaList">
					    	<ul class="tab_ul">
				    			<li urlid="18"  v-for="(item,index) in qaList" redirect='7' :mid="item.id" :thirdCatId="item.isJoined">
				    				<a href="javascript:;" class="tab_img"><img :src="item.img" width="100%" /></a>
				    				<div class="tab_text">
				    					<h2>{{item.title}}</h2>
				    				</div>
				    			</li>
					    	</ul>
					    </div>
					</div>
				</div> 
			</div>
			 <div class="row_btn">
				<a id="moreStudy" urlid='15' href="javascript:;"  class="layui-btn layui-btn-primary">{{'更多内容'|dz}}</a>
			</div> 
		</div>
	</div>
	
	<app-footer></app-footer>
</div>
</template>

<script>
import Vue from 'vue';
import VueCarousel from '@chenfengyuan/vue-carousel';
Vue.use(VueCarousel);

import layui_css from '@/assets/default/css/layui.css'
import style_css from '@/assets/default/css/style_main.css'
import layer_css from '@/assets/default/css/layer.css'

import jquery_base_js from '@/assets/default/js/jquery.base.js'

import Header from './header.vue'
import Footer from './footer.vue'

let base = localStorage.getItem("base")
export default {
	data: function(){
		return {
			base: base,
			page_tab: "index",
			showpage: false,
			banner: [
				'<div class="banner-slider"><img src="'+require('@/assets/default/img/banner.jpg')+'" width="100%" /></div>',
				'<div class="banner-slider"><img src="'+require('@/assets/default/img/banner2.jpg')+'" width="100%" /></div>',
				'<div class="banner-slider"><img src="'+require('@/assets/default/img/banner3.jpg')+'" width="100%" /></div>'
			],
			shiyecnt: 1,
			brands: [],
			actives: [],
			shiyes: [],
			qiyes: [],
			statusTab: [],
			peixus: [],
			newss: [],
			documents: [],
			votes: [],
			qaList: [],
		}
	},
	created() {
		let that = this;
		$.ajax({
			url: this.base+"/api/material/index/list",
			dataType: 'json',
			xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
			success: function(data){
				if (data.code==200) {
					that.brands = data.data.brands;
					that.qiyes = data.data.qiyes;
					that.statusTab = data.data.statusTab;
					for(var i in data.data.documents) {
						var item = data.data.documents[i];
						item.img = require('@/assets/default/img/study'+(parseInt(i)+1)+'.png');
					}
					that.documents = data.data.documents;
					for(var i in data.data.news) {
						var item = data.data.news[i];
						item.img = require('@/assets/default/img/news'+(parseInt(i)+1)+'.png');
					}
					that.newss = data.data.news;
					for(var i in data.data.votes) {
						var item = data.data.votes[i];
						item.img = require('@/assets/default/img/vote'+(parseInt(i)+1)+'.png');
					}
					that.votes = data.data.votes;
					for(var i in data.data.qaList) {
						var item = data.data.qaList[i];
						item.img = require('@/assets/default/img/qa'+(parseInt(i)+1)+'.png');
					}
					that.qaList = data.data.qaList;
					that.peixus = data.data.peixus;
					that.actives = data.data.actives;
					that.shiyes = data.data.shiyes;
					that.shiyecnt = data.data.shiyecnt;
					that.showpage = true;
					that.$nextTick(function(){
						that.init();
					})
				}else{
					window.location = '/login';
				}
			}
		})
	},
	methods: {
		init(){
			$("#libaray li:first").click();
		},
		//素材切换
		changeLibUrl(urlid) {
			//$("#moreLib").attr("url",url);
		},
		//study 切换tab
		changeStudyUrl(urlid) {
			//$("#moreStudy").attr("url",url);
		}
	},
	components : {
		"app-header": Header,
		"app-footer": Footer
	}
}
$(function() {
	$("li").click(function(){
		$(this).parent().find("li").not($(this)).removeClass("layui-this");
		$(this).addClass("layui-this");
		let that = this;
		$(this).parent().next(".layui-tab-content").find(".layui-tab-item").not("."+$(this).data('tab')).removeClass("layui-show");
		$("."+$(this).data('tab')).addClass("layui-show");
		
	})
	$("#moreLib").click(function(){
		var url = $(this).attr("url");
		
	})
	$("#moreStudy").click(function(){
		var url = $(this).attr("url");
		
	})
	$("#libaray").on("click",'ul.layui-tab-title li',function(){
		var cnt = $("#libaray").find("div.layui-tab-item").eq($(this).index()).find("li").length;
		if(cnt<3) {
			$("#moreLib").hide();
		}else{
			$("#moreLib").show();
		}
	})
	//判断 shop  更多内容是否隐藏
	$("#shop").on("click",'ul.layui-tab-title li',function(){
		var cnt = $("#shop").find("div.layui-tab-item").eq($(this).index()).find("li").length;
		if(cnt<3){
			$("#moreShop").hide();
		}else{
			$("#moreShop").show();
		}
	})
	//判断 study  更多内容是否隐藏
	$("#study").on("click",'ul.layui-tab-title li',function(){
		var cnt = $("#study").find("div.layui-tab-item").eq($(this).index()).find("li").length;
		if(cnt<3){
			$("#moreStudy").hide();
		}else{
			$("#moreStudy").show();
		}
	})

});
</script>

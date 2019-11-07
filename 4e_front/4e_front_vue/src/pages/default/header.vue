<template>
<div class="header">
	<div class="layui-row">
	    <div class="layui-col-sm12 layui-col-md1">
	      	<a href="javascript:;" class="header_logo"></a>
	    </div>
	    <div class="header_center">
    		<ul class="header_nav">
    			<li :class="page_tab=='index'?'actived':''"><a href="/">{{'首页' | dz}}</a></li>
    			<li :class="page_tab=='e-library'?'actived':''"><a href="/e-library">e-library</a></li>
    			<li><a href="/e-shop">e-shop</a></li>
    			<li><a href="/e-office">e-office</a></li>
    			<li><a href="/e-study">e-study</a></li>
    			<li><a href="/my">{{'个人中心'|dz}}</a></li>
    			<li class="size_12"><a href="javascript:;">{{username}}</a></li>
    			<li class="size_12" v-if="isback==1">
    				<a href="/jsp/admin/do.jsp?method=page">{{'进入后台'|dz}}</a>
    			</li>
    			<li class="size_12" v-for="(item) in foreignTypeList">
                    <a href="javascript:;" v-if="languageType != item.id" @click="updateUserLanguage(item.id)">{{item.name}}</a>
                </li>
    			<li class="li_search"><div class="input_box"><input type="text" id="code" placeholder="请输入素材编码" /><span class="input_box_icon" id="searchid"></span></div></li>
    			<li class="size_12"><a :href="base + '/jsp/admin/login/doLogout.jsp?from=pcFront'">{{'退出'|dz}}</a></li>
    		</ul>
		</div>
		<div class="header_right"></div>
	</div>
</div>
</template>
<script>
let base = localStorage.getItem("base")
export default {
	data() {
		return {
			base: base,
			username: "abc",
			isback: 0,
			foreignTypeList: [{id: 0, name: '中文'},{id: 1, name: 'English'}],
			languageType: 1,
		}
	},
    props:['page_tab'],
	created() {
		let that = this
		$.ajax({
			url: this.base+"/api/user/info",
			dataType: 'json',
			xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function(data){
            	if (data.code==0) {
            		window.location = "/login";
            		return;
            	}
            	if (data.code==200) {
            		that.username = data.data.userName;
            		that.languageType = data.data.lastLanguageType;
            		localStorage.setItem("languageType", data.data.lastLanguageType);
            	}
            }
		});
	},
    updateUserLanguage(type) {
        var languageType = type==""||type==null?0:type+"";
        $.ajax({
            url: this.base+"/api/updateUserLanguageType",
            data: {"languageType": languageType},
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (json) {
                localStorage.setItem("languageType", languageType);
                window.location.href=window.location.href;
            }
        });
    }
}
$(function() {
    $("#searchid").click(function(){
        var fileCode = $("#code").val();
        if(fileCode==null||fileCode=="") return ;
        var obj = $(this);
        if(isLock(obj)) return ;
        lock(obj);
        $.get("${ctx}/jsp/pc/main/do.jsp?method=ajaxFindCode",{fileCode:fileCode},function(data){
            var data = eval('('+data+')');
            if(data.data !=null && data.data!=''){
                $.get("${ctx}/jsp/pc/main/do.jsp?method=ajaxFindMenu",{leftName:data.data.first_cat,navName:data.data.second_cat},function(obj){
                    var obj = eval('('+obj+')');
                    if(obj.data !=null && obj.data!=''){
                    window.location.href='${ctx}/jsp/pc/index.jsp?menuIndex=1&leftindex='+obj.data.leftIndex+'&navindex='+obj.data.navIndex+'&redirect=9&mid='+data.data.id+'&thirdCatId='+data.data.third_cat_id+','+data.data.fourth_cat_id
                    }else{
                        layer.msg("素材编码有误");
                    }
                
                })
                
            }else{
                layer.msg("素材编码有误");
            }
        })
        unlock(obj);
    })
});
</script>
<style lang="scss" scope>
    .header {
        height: 63px;
    }
</style>

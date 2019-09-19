$(function () {
    var nav = '<div class="nav2"><img style="cursor: pointer" class="log" src="./../images/page/logo.png" alt=""><ul class="navBar"><li><a class="sibmenu" href="./about_us.html">关于我们</a><div class="submenu"><div class="triangle"></div><div class="subList"><a href="./about_us.html">公司介绍</a></div><div class="subList"><a href="./about_us.html#about_2">经营理念</a></div><div class="subList"><a href="./about_us.html#about_3">发展历程</a></div><div class="subList"><a href="./about_us.html#about_3_4">行业荣誉</a></div><div class="subList"><a href="./about_us.html#about_4">服务客户</a></div><div class="subList"><!--<a href="./about_us.html#about_5">高管团队</a>--></div></div></li><li><a class="sibmenu" href="./bigData_1.html">服务与产品</a><div class="submenu"><div class="triangle"></div><div class="subList"><a href="./bigData_1.html">数字整合营销</a></div><div class="subList"><a href="./bigData_2.html">大数据应用</a></div><div class="subList"><a href="./bigData_3.html">数字影像</a></div></div></li><li><a class="sibmenu" href="./case.html">案例展示</a><div class="submenu" id="caseClick"><div class="triangle"></div><div class="subList"><a href="javascript:;">整合营销</a></div><div class="subList"><a href="javascript:;">内容营销</a></div><div class="subList"><a href="javascript:;">社会化与用户营销</a></div><div class="subList"><a href="javascript:;">大数据营销</a></div><div class="subList"><a href="javascript:;">视频营销</a></div><div class="subList"><a href="javascript:;">技术营销</a></div><div class="subList"><a href="javascript:;">互动体验</a></div><div class="subList"><a href="javascript:;">媒介营销</a></div></div></li><li><a class="sibmenu" href="./news.html">新意资讯</a><div class="submenu" id="newsClick"><div class="triangle"></div><div class="subList"><a href="javascript:;">新意动态</a></div><div class="subList"><a href="javascript:;">新意荣誉</a></div><div class="subList"><a href="javascript:;">新意观点</a></div><div class="subList"><a href="javascript:;">行业观察</a></div></div></li><li><a class="sibmenu" href="./job.html">职达新意</a><div class="submenu"><div class="triangle"></div><div class="subList"><a href="./job.html">意起精彩</a></div><div class="subList"><a href="//cig.zhiye.com/Social" target="_blank">社会招聘</a></div><div class="subList"><!--<a href="./job.html">校园招聘</a>--></div><div class="subList"><a href="//cig.zhiye.com/Intern" target="_blank">实习生招聘</a></div><div class="subList"><a href="//neitui.zhiye.com/cig#vertify%2Fwechat"target="_blank">内部推荐</a></div></div></li><li style="display: none"><a class="sibmenu" href="javascript:;">营销智库</a><div class="submenu"><div class="triangle"></div><div class="subList"><a href="javascript:;">资讯</a></div><div class="subList"><a href="javascript:;">知识</a></div><div class="subList"><a href="javascript:;">活动</a></div></div></li></ul></div>'
    var footer = '<div class="footer"><div class="footer_cont"><ul><li class="footer_txt"><span><p class="footer_tit">关于我们</p><a href="./about_us.html#about_1">公司介绍</a><a                        href="./about_us.html#about_2">经营理念</a><a href="./about_us.html#about_3">发展历程</a><a href="./about_us.html#about_3_4">行业荣誉</a><a href="./about_us.html#about_4">服务客户</a><!--<a href="./about_us.html#about_5">高管团队</a>--></span></li><li class="footer_txt"><span><p class="footer_tit">服务与产品</p><a href="./bigData_1.html">数字整合营销</a><a                        href="./bigData_2.html">大数据应用</a><a href="./bigData_3.html">数字影像</a></span></li><li class="footer_txt"><span><p class="footer_tit">案例展示</p><a href="./case.html?index=1">整合营销</a><a                        href="./case.html?index=2">内容营销</a><a href="./case.html?index=3">社会化与用户营销</a><a                        href="./case.html?index=4">大数据营销</a><a href="./case.html?index=5">视频营销</a><a                        href="./case.html?index=6">技术营销</a><a href="./case.html?index=7">互动体验</a><a                        href="./case.html?index=8">媒介营销</a></span></li><li class="footer_txt"><span><p class="footer_tit">新意资讯</p><a href="./news.html?index=1">新意动态</a><a                        href="./news.html?index=2">新意荣誉</a><a href="./news.html?index=3">新意观点</a><a                        href="./news.html?index=4">行业观察</a></span></li><li class="footer_txt"><span><p class="footer_tit">职达新意</p><a href="./job.html">意起精彩</a><a href="//cig.zhiye.com/Social"target="_blank">社会招聘</a><!--<a                        href="./job.html">校园招聘</a>--><a href="//cig.zhiye.com/Intern"target="_blank">实习生招聘</a><a href="//neitui.zhiye.com/cig#vertify%2Fwechat" target="_blank">内部推荐</a></span></li><li class="footer_txt" style="display: none"><span><p class="footer_tit">营销智库</p><a href="javascript:;">资讯</a><a href="javascript:;">知识</a><a                        href="javascript:;">活动</a></span></li></ul></div></div><div class="copy2"><div class="text"><a class="s1" href="./../page/disclaimer.html" target="_blank">免责声明</a><a target="_blank" href="./../page/privacy.html" class="s2">隐私条款</a></div><img src="./../images/page/copy_bg.jpg" alt=""></div>';
    var scrollTop='<div class="scrollTop" style="display: none;cursor: pointer;z-index:666;position: fixed;right: 0;top: 0;bottom:0;margin: auto;height: 0.5rem;width: 0.5rem"><img style="width: 100%" src="./../images/scrollTop.jpg"></div>'
    $('.container').prepend(nav);
    $('.container').append(footer);
    $('.container').append(scrollTop);
    $('.nav2 ul li').hover(function () {
        $(this).find('.submenu').stop().slideDown();
    }, function () {
        $(this).find('.submenu').stop().slideUp();
    });
    $('#caseClick .subList').on('click', function () {
        console.log($(this).index())
        window.location.href = './case.html?index=' + $(this).index();
    });
    $('#newsClick .subList').on('click', function () {
        console.log($(this).index())
        window.location.href = './news.html?index=' + $(this).index();
    });

    $(window).scroll(function(){
        if($(window).scrollTop()>400){
            $('.container').find(".scrollTop").fadeIn(300);
        }else{
            $('.container').find(".scrollTop").fadeOut(200);
        }

    });


$('body').on("click",'.scrollTop',function () {
    $('html, body').animate({
        scrollTop: $("body").offset().top
    }, 500);
})
$('.container').find(".scrollTop img").hover(function () {
    $(this).attr("src","./../images/scrollTop_red.jpg");

}, function () {
    $(this).attr("src","./../images/scrollTop.jpg");
});


    $(".container").on("click",'.nav2 .log',function () {
         window.location.href='./../index.html';
    })
});

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}
$(function () {
    var nav = '<div class="nav2"><img src="./../images/page/logo.png" alt=""><ul class="navBar"><li><a class="sibmenu" href="./about_us.html">关于我们</a><div class="submenu"><div class="triangle"></div><div class="subList"><a href="#about_1">公司介绍</a></div><div class="subList"><a href="#about_2">经营理念</a></div><div class="subList"><a href="#about_3">发展历程</a></div><div class="subList"><a href="#about_4">服务客户</a></div><div class="subList"><a href="#about_5">高管团队</a></div></div></li><li><a class="sibmenu" href="./bigData_1.html">服务与产品</a><div class="submenu"><div class="triangle"></div><div class="subList"><a href="./bigData_1.html">数字整合营销</a></div><div class="subList"><a href="./bigData_2.html">大数据技术与工具</a></div><div class="subList"><a href="./bigData_3.html">数字影像</a></div></div></li><li><a class="sibmenu" href="./case.html">案例展示</a><div class="submenu" id="caseClick"><div class="triangle"></div><div class="subList"><a href="javascript:;">整合营销</a></div><div class="subList"><a href="javascript:;">内容营销</a></div><div class="subList"><a href="javascript:;">社会化与用户营销</a></div><div class="subList"><a href="javascript:;">大数据营销</a></div><div class="subList"><a href="javascript:;">视频营销</a></div><div class="subList"><a href="javascript:;">技术营销</a></div><div class="subList"><a href="javascript:;">互动体验</a></div><div class="subList"><a href="javascript:;">媒介营销</a></div></div></li><li><a class="sibmenu" href="./news.html">新意资讯</a><div class="submenu" id="newsClick"><div class="triangle"></div><div class="subList"><a href="javascript:;">新意动态</a></div><div class="subList"><a href="javascript:;">新意荣誉</a></div><div class="subList"><a href="javascript:;">新意观点</a></div><div class="subList"><a href="javascript:;">行业观察</a></div></div></li><li><a class="sibmenu" href="./job.html">职达新意</a><div class="submenu"><div class="triangle"></div><div class="subList"><a href="javascript:;">意起精彩</a></div><div class="subList"><a href="javascript:;">社会招聘</a></div><div class="subList"><a href="javascript:;">校园招聘</a></div><div class="subList"><a href="javascript:;">实习生招聘</a></div><div class="subList"><a href="javascript:;">活水计划</a></div></div></li><li><a class="sibmenu" href="javascript:;">营销智库</a><div class="submenu"><div class="triangle"></div><div class="subList"><a href="javascript:;">资讯</a></div><div class="subList"><a href="javascript:;">知识</a></div><div class="subList"><a href="javascript:;">活动</a></div></div></li></ul></div>'
    var footer = '<div class="footer"><div class="footer_cont"><ul><li class="footer_txt"><span><p class="footer_tit">关于我们</p><a href="javascript:;">公司介绍</a><a href="javascript:;">经营理念</a><a href="javascript:;">发展历程</a><a href="javascript:;">服务客户</a><a href="javascript:;">高管团队</a></span></li><li class="footer_txt"><span><p class="footer_tit">服务与产品</p><a href="javascript:;">数字整合营销</a><a href="javascript:;">大数据应用</a><a href="javascript:;">数字影像</a></span></li><li class="footer_txt"><span><p class="footer_tit">案例展示</p><a href="javascript:;">整合营销</a><a href="javascript:;">内容营销</a><a href="javascript:;">社会化与用户营销</a><a href="javascript:;">大数据营销</a><a href="javascript:;">视频营销</a><a href="javascript:;">技术营销</a><a href="javascript:;">互动体验</a><a href="javascript:;">媒介营销</a></span></li><li class="footer_txt"><span><p class="footer_tit">新意资讯</p><a href="javascript:;">新意动态</a><a href="javascript:;">新意荣誉</a><a href="javascript:;">新意观点</a><a href="javascript:;">行业观察</a></span></li><li class="footer_txt"><span><p class="footer_tit">职达新意</p><a href="javascript:;">意起精彩</a><a href="javascript:;">社会招聘</a><a href="javascript:;">校园招聘</a><a href="javascript:;">实习生招聘</a><a href="javascript:;">活水计划</a></span></li><li class="footer_txt"><span><p class="footer_tit">营销智库</p><a href="javascript:;">资讯</a><a href="javascript:;">知识</a><a href="javascript:;">活动</a></span></li></ul></div></div><div class="copy2"><img src="./../images/page/copy_bg.jpg" alt=""></div>';
    $('.container').prepend(nav);
    $('.container').append(footer);
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
});

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}
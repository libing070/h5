// 01 首页
// 02 关于我们
// 03 数字整合营销
// 04 案例
// 05 新闻
// 06 联系
// 07 招聘
// 08 智库
// 09 OA





var host = 'http://219.143.155.183:8899';
// var host = 'http://172.16.101.119:8899';
jQuery.extend({
    request: function (url, parame, cb) {
        $.ajax({
            url: host + url,
            type: 'post',
            data: parame,
            async: false, //默认为true 异步  
            dataType: 'json',
            success: function (res) {
                if (res.code == 1) {
                    cb(res);
                } else {
                    layer.msg(res.message);
                }
            },
            error: function () {
                layer.msg('网络出现问题，请稍后再试!');
            },
        })
    },
    requestLogin: function (url, parame, cb) {
        $.ajax({
            url: host + url,
            type: 'post',
            xhrFields: {
                withCredentials: true
            },
            data: parame,
            async: false, //默认为true 异步  
            dataType: 'json',
            success: function (res) {
                if (res.code == 1) {
                    cb(res);
                } else {
                    layer.msg(res.message);
                }
            },
            error: function () {
                layer.msg('网络出现问题，请稍后再试!');
            },
        })
    },
    requestGet: function (url, cb) {
        $.ajax({
            url: host + url,
            type: 'get',
            async: false, //默认为true 异步  
            dataType: 'json',
            success: function (res) {
                if (res.code == 1) {
                    cb(res);
                }
            },
            error: function () {
                console.log('error');
            },
        })
    }

});
//1.1 文字向上淡入 1.2白框升上来，图标上升复现 1.3白框从右到左出现结束红色继续，图标要类似效果
//2.1背景下向上，文字上向下，数字变化
//3.1左到右出现，鼠标浮动背景放大
//4.1播放按钮鼠标浮动有变大效果，底图文字动效仿首页
//5.1轮播有点节奏感，轮播文字从下到上
//6.1文字从左到右移动，线条进度生长 6.2弹出层下到上6.3关闭按钮鼠标浮动旋转变红6.3关闭淡出
//7.1 背景文字跟联系我们类似
//8.1 类似新闻，轮播从右到左移动，进入智库按钮划过变实，8.2弹出框同上
//9.1从下到上生长，背景先，文案后，9.2登录后右边下到上淡入9.3图标划过变大
// 新建md5加密值
function createSign(dic) {
    var jsonstr = JSON.stringify(objKeySort(dic));
    var str1 = jsonstr.replace(new RegExp(':', 'g'), '=');
    var str2 = str1.replace(new RegExp(',', 'g'), '&');
    var str3 = str2.substring(1, str2.length - 1);
    str3 = str3.replace(/\"/g, "");
    var str = str3 + '&661C9A9B-6E9A-4C1E-92AA-B4F7B8D4DD3C'
    var sign = hex_md5(str);
    return sign;
}
//重置动画
function aniReset() {
    for (let i = 0; i < 100; i++) {
        $('.ani_' + i).css('opacity', '0');
    }
}
//时间戳
function ts() {
    return Math.round(new Date() / 1000);
}
// 新建md5加密值
function createSign(dic) {
    var jsonstr = JSON.stringify(objKeySort(dic));
    var str1 = jsonstr.replace(new RegExp(':', 'g'), '=');
    var str2 = str1.replace(new RegExp(',', 'g'), '&');
    var str3 = str2.substring(1, str2.length - 1);
    str3 = str3.replace(/\"/g, "");
    var str = str3 + '&661C9A9B-6E9A-4C1E-92AA-B4F7B8D4DD3C'
    var sign = hex_md5(str);
    return sign;
}
//排序的函数
function objKeySort(arys) {
    //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
    var newkey = Object.keys(arys).sort();
    //console.log('newkey='+newkey);
    var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
    for (var i = 0; i < newkey.length; i++) {
        //遍历newkey数组
        newObj[newkey[i]] = arys[newkey[i]];
        //向新创建的对象中按照排好的顺序依次增加键值对
    }
    return newObj; //返回排好序的新对象
}

function playVideo(_this, k) {
    var eleName = 'video' + k;
    var videoName = document.getElementById(eleName);
    // console.log(videoName);
    videoName.play();
    $(_this).hide();
    videoName.addEventListener('ended', function () {
        $(_this).show();
    })
}
$(function () {

    var nav = '<div class="nav"><ul class="navBar"><li><a class="sibmenu" href="javascript:;">营销智库</a><div class="submenu"><div class="triangle"></div><div class="subList"><a href="javascript:;">资讯</a></div><div class="subList"><a href="javascript:;">知识</a></div><div class="subList"><a href="javascript:;">活动</a></div></div></li><li><a class="sibmenu" href="./page/job.html">职达新意</a><div class="submenu"><div class="triangle"></div><div class="subList"><a href="javascript:;">意起精彩</a></div><div class="subList"><a href="javascript:;">社会招聘</a></div><div class="subList"><a href="javascript:;">校园招聘</a></div><div class="subList"><a href="javascript:;">实习生招聘</a></div><div class="subList"><a href="javascript:;">活水计划</a></div></div></li><li><a class="sibmenu" href="./page/news.html">新意资讯</a><div class="submenu" id="newsClick"><div class="triangle"></div><div class="subList"><a href="./page/news.html?index=1">新意动态</a></div><div class="subList"><a href="./page/news.html?index=2">新意荣誉</a></div><div class="subList"><a href="./page/news.html?index=3">新意观点</a></div><div class="subList"><a href="./page/news.html?index=4">行业观察</a></div></div></li><li><a class="sibmenu" href="./page/case.html">案例展示</a><div class="submenu" id="caseClick"><div class="triangle"></div><div class="subList"><a href="./page/case.html?index=1">整合营销</a></div><div class="subList"><a href="./page/case.html?index=2">内容营销</a></div><div class="subList"><a href="./page/case.html?index=3">社会化与用户营销</a></div><div class="subList"><a href="./page/case.html?index=4">大数据营销</a></div><div class="subList"><a href="./page/case.html?index=5">视频营销</a></div><div class="subList"><a href="./page/case.html?index=6">技术营销</a></div><div class="subList"><a href="./page/case.html?index=7">互动体验</a></div><div class="subList"><a href="./page/case.html?index=8">媒介营销</a></div></div></li><li><a class="sibmenu" href="./page/bigData_1.html">服务与产品</a><div class="submenu"><div class="triangle"></div><div class="subList"><a href="./page/bigData_1.html">数字整合营销</a></div><div class="subList"><a href="./page/bigData_2.html">大数据技术与工具</a></div><div class="subList"><a href="./page/bigData_3.html">数字影像</a></div></div></li><li><a class="sibmenu" href="./page/about_us.html">关于我们</a><div class="submenu"><div class="triangle"></div><div class="subList"><a href="./page/about_us.html#about_1">公司介绍</a></div><div class="subList"><a href="./page/about_us.html#about_2">经营理念</a></div><div class="subList"><a href="./page/about_us.html#about_3">发展历程</a></div><div class="subList"><a href="./page/about_us.html#about_4">服务客户</a></div><div class="subList"><a href="./page/about_us.html#about_5">高管团队</a></div></div></li></ul></div>'
    $('#pc').prepend(nav);
    $('.nav ul li').hover(function () {
        $(this).find('.submenu').stop().slideDown();
    }, function () {
        $(this).find('.submenu').stop().slideUp();
    });
});
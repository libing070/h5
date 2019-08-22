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
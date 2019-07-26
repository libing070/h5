/**
 * 接口封装
 */

//获取经销商 
// var host = 'http://ai.audi.cn';
var host = 'http://h5tt.skyengine.cn';
jQuery.extend({
    /**
     * @param 参数对象 包含url(请求路径)，type(请求方式get,post),data等
     * @cb 回调函数
     * @url [get] 省 /api/index.php?c=home&a=getprovice
     *      [get] 市 /api/index.php?c=home&a=getcity&provinceid=[provinceid]
     *      [get] 城市经销商 /api/index.php?c=home&a=getjxss&format=json&city=[cityname]
     *      [get] 所有经销商 /api/index.php?c=home&a=getjxss&format=json&moren=1
     *      [get] 城市所有经销商 http://ai.audi.cn/api/index.php?c=home&a=getjxss&format=json&webtype=mobile&che=q3&utm=[utms]&city=[城市名]
     *      [post] 预约试驾 /api/index.php?c=home&a=postleads
     *      [get] 搜索 /api/index.php?c=home&a=getjxss&format=json&q=q&webtype=mobile&che=q3&q=1&utm=[utms]&_keyword=[关键字]&city=[城市]
     *      [get] 当前位置经销商数据 /api/index.php?c=home&a=getjxss&format=json&q=q&webtype=mobile&che=q3&utm=[utms]&city=[城市名]&lat=[纬度]&lng=[经度]
     */
    getProvince: function (param,cb) {
        if (param.type == 'get') param.data = null;
        $.ajax({
            type: param.type,
            url: host + '/api/index.php' + param.url + '&timestamp=' + new Date().getTime(),
            dataType: 'json',
            async: true, //异步
            cache: false, //不需要缓存
            data: param.data,
            success: function (res) {
                cb(res);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {}
        });
    },
    getDistri: function (param, cb) {
        if (param.type == 'get') param.data = null;
        $.ajax({
            type: param.type,
            url: host + param.url + '&timestamp=' + new Date().getTime(),
            dataType: 'json',
            async: true, //异步
            cache: false, //不需要缓存
            data: param.data,
            success: function (res) {
                cb(res);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {}
        });
    },
    /**
     * 调用微信分享
     * @param {title,desc,imgUrl} cfgs
     * @param {type,url} param 
     */
    share: function (cfgs) {
        var wxInfo = {};
        var locaH = window.location.href;
        var baseurl = locaH.substring(0, window.location.href.lastIndexOf('/') + 1);
        var cfg = {
            share_url: locaH,
            title: cfgs.title,
            desc: cfgs.desc,
            imgUrl: baseurl + cfgs.imgUrl
        };
        $.ajax({
            method: 'post',
            url: host + '/api' + '?timestamp=' + new Date().getTime(),
            dataType: 'json',
            async: true, //异步
            cache: false, //不需要缓存
            data: {
                url: encodeURI(locaH)
            },
            success: function (e) {
                wxInfo = e.weixinjs;
                wx.config({
                    debug: false,
                    appId: wxInfo.appId,
                    timestamp: wxInfo.timestamp,
                    nonceStr: wxInfo.nonceStr,
                    signature: wxInfo.signature,
                    jsApiList: [
                        'onMenuShareTimeline', 'onMenuShareAppMessage'
                    ]

                });
                wx.ready(function () {
                    wx.onMenuShareTimeline({
                        title: cfg.title, // 分享标题
                        desc: cfg.desc, // 分享描述
                        link: cfg.share_url, // 分享链接
                        imgUrl: cfg.imgUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                    wx.onMenuShareAppMessage({
                        title: cfg.title, // 分享标题
                        desc: cfg.desc, // 分享描述
                        link: cfg.share_url, // 分享链接
                        imgUrl: cfg.imgUrl, // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                });
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {}
        })
    },
    //获取定位
    getLocationInfo: function (cb) {
        $.ajax({
            type: 'get',
            url: host + '/ipmaster/getLocationInfo.php',
            dataType: 'json',
            async: true, //异步
            cache: false, //不需要缓存
            success: function (res) {
                cb(res);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {}
        });
    },
    //奥迪q5智能问答接口
    intelligence: function (obj, isVR) {
        var url = '';
        if (isVR && isVR == 'VR') {
            url = 'http://www1.pcauto.com.cn/zt/vr/681/681.html'
        } else {
            url = 'http://ai.auto-smart.com/audi_a6l_mobile/robot.html';
        }
        // console.log($(obj.ele + ':has(iframee)').length == 0)
        if ($(obj.ele + ':has(iframe)').length == 0) {
            $(obj.ele).append('<iframe src=' + url + '></iframe>');
            $(obj.ele + ' iframe').css({
                'width': '100%',
                'height': '100%',
                'position': 'fixed',
                'bottom': '0',
                'left': '0'
            });
        }

    },
    getCarEvaluate: function (cb) {
        // var url = '';
        // console.log(type)
        // if (type) {
        //     url = host + '/audi-a6l/controller/index.php?action=add&type=' + type;
        // } else {
        //     url = host + '/audi-a6l/controller/index.php?action=query'
        // }
        $.ajax({
            type: 'get',
            url: 'controller/index.php?action=query',
            headers: {
                Accept: "application/json; charset=utf-8"
            },
            dataType: 'json',
            async: true, //异步
            cache: false, //不需要缓存
            success: function (res) {
                cb(res);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {}
        });
    },
    addCarEvaluate: function (type, cb) {
        var data = {
            type: type
        };
        $.ajax({
            type: 'post',
            url: 'controller/index.php?action=add',
            headers: {
                Accept: "application/json; charset=utf-8"
            },
            data: JSON.stringify(data),
            dataType: 'json',
            async: true, //异步
            cache: false, //不需要缓存
            success: function (res) {
                cb(res);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {}
        });
    }
    // vr接入
    // https://www1.pcauto.com.cn/appearance/260.html
});
//var host = 'https://ai.audi.cn';
var host = 'http://h5tt.skyengine.cn';

var base = "controller/index.php?action=getServerData&url=";

function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}

jQuery.extend({
    getProvince: function (cb) {
        $.ajax({
            type: 'get',
            url: base + encodeURIComponent(host + '/api/index.php?c=home&a=getprovice' + '&stimestamp=' + new Date().getTime()),
            dataType: 'json',
            async: true, //异步
            cache: false, //不需要缓存
            data: {},
            success: function (res) {
                cb(res);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });
    },
    getCity: function (province_id, cb) {
        $.ajax({
            type: 'get',
            url: base + encodeURIComponent(host + '/api/index.php?c=home&a=getcity&provinceid=' + province_id + '&stimestamp=' + new Date().getTime()),
            dataType: 'json',
            async: true, //异步
            cache: false, //不需要缓存
            data: {},
            success: function (res) {
                cb(res);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });
    },
    getDealer: function (utm, city, cb) {
        $.ajax({
            type: 'get',
            url: base + encodeURIComponent(host + '/api/index.php?c=home&a=getjxss&format=json&utm=' + utm + '&city=' + city + '&stimestamp=' + new Date().getTime()),
            dataType: 'json',
            async: true, //异步
            cache: false, //不需要缓存
            data: {},
            success: function (res) {
                cb(res);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
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
            type: "POST",
            url: host + '/api/index.php?timestamp=' + new Date().getTime() + '&url=' + encodeURIComponent(locaH),
            dataType: 'json',
            async: true, //异步
            cache: false, //不需要缓存
            data: {},
            success: function (e) {
                wxInfo = e.weixinjs;
                if (isWeiXin()) {
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
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        })
    },
    //获取定位
    getLocationInfo: function (cb, errorFun) {
        $.ajax({
            type: 'get',
            url: host + '/ipmaster/getLocationInfo.php',
            dataType: 'json',
            async: true, //异步
            cache: false, //不需要缓存
            success: function (res) {
                cb(res);
            },
            error: function (e) {
                errorFun(e);
            }
        });
    },
    sendData: function (data, cb, errorFun) {
        $.ajax({
            url: 'controller/index.php?action=send',
            type: 'post',
            dataType: 'json',
            headers: {
                Accept: "application/json; charset=utf-8"
            },
            data: JSON.stringify(data),
            success: function (res) {
                cb(res);
            },
            error: function (e) {
                errorFun(e);
            }
        })
    },
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
    getResultByParams: function (param,cb) {
        if (param.type == 'get') param.data = null;
        $.ajax({
            type: param.type,
          url: base + encodeURIComponent(host + '/api/index.php' + param.url + '&stimestamp=' + new Date().getTime()),
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

})
jQuery.extend({
    share: function (cfgs) {
        var wxInfo = {};
        var locaH = window.location.href;
        //cfgs.share_url = encodeURIComponent(locaH.split('#')[0]);
        cfgs.share_url = locaH;
        var baseurl = locaH.substring(0, window.location.href.lastIndexOf('/') + 1);
        var cfg = {
            share_url: cfgs.share_url,
            title: cfgs.title,
            desc: cfgs.desc,
            imgUrl: baseurl + cfgs.imgUrl
        };
        $.ajax({
            type: "POST",
            url: 'wxapi/jssdk.php?timestamp=' + new Date().getTime(),
            dataType: 'json',
            async: true, //异步
            cache: false, //不需要缓存
            data: {url: cfgs.share_url},
            success: function (data) {
                wxInfo = data;
                console.log(wxInfo);
                wx.config({
                    debug: false,
                    appId: wxInfo.appid,
                    timestamp: wxInfo.timestamp,
                    nonceStr: wxInfo.noncestr,
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
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        })
    }
});
/**
 * Created by shiqm on 2018/9/21.
 */
$(function () {
    window.baseurl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1);
    window.shareData = {
        title:'寻找K3第一人，开心招募ing',
        desc :'分享你与K3的难忘经历，期待你的开心故事比任何一本书都精彩。',
        link : window.baseurl + 'index.html',
        imgUrl : window.baseurl + 'shares.jpg',
        trigger: function (res) {
            //alert('用户点击发送给朋友');
        },
        cancel: function (res) {
        },
        fail: function (res) {
            //没分享
        }
    };
   
   if (/MicroMessenger/i.test(navigator.userAgent)) {
        $.getScript("//res.wx.qq.com/open/js/jweixin-1.2.0.js", function callback() {
            $.ajax({
                type: "post",
                url: "./wxapi/jssdk.php",
                dataType: 'json',
                data: {
                    url: window.location.href
                },
                success: function (data) {
                    window.token = data.token;
                    wx.config({
                        debug: false,
                        appId: data.appid,
                        timestamp: data.timestamp,
                        nonceStr: data.noncestr,
                        signature: data.signature,
                        jsApiList: [
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage'
                        ]
                    });
                    wx.ready(function () {
                        wx.onMenuShareAppMessage(window.shareData);
                        wx.onMenuShareTimeline(window.shareData);
                    });
                    wx.error(function (res) {
                       // alert(JSON.stringify(res));
                    })
                },
                error: function (xhr, ajaxOptions, thrownError) {
                  
                }
            })
        })
    }
})




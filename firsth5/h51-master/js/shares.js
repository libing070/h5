/**
 * Created by shiqm on 2018/9/21.
 */
$(function () {
    window.shareData = {
        title:'星探紧急寻人！',
        desc :'是你身边的人，或者就是你',
        link :'http://h5tt.skyengine.cn/star/index.html',
        imgUrl :'http://h5tt.skyengine.cn/star/shares.jpeg',
        trigger: function (res) {
            //alert('用户点击发送给朋友');
        },
        cancel: function (res) {
        },
        fail: function (res) {
            //没分享
        }
    };
   
   // if (/MicroMessenger/i.test(navigator.userAgent)) {
        $.getScript("//res.wx.qq.com/open/js/jweixin-1.2.0.js", function callback() {
            $.ajax({
                type: "post",
                url: "../wxapi/jssdk.php",
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
    // }
})




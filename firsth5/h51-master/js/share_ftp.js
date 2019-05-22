$(function () {
    var titles = [
        ['情怀不灭，经典再燃！', '加入高尔夫众星计划，燃力全开！'],
        ['情怀不灭，经典再燃！', '加入高尔夫众星计划，燃力全开！']
    ];
    var idx = Math.floor(Math.random() * 2);
    if (idx >= 1)
        idx = 1;
    console.log(idx);
    console.log(titles);
    window.baseurl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1);
    window.shareData = {
        title: titles[idx][0],
        desc: titles[idx][1],
        desc2: '',
        link: window.baseurl + 'index.html',
        imgUrl: window.baseurl + 'shares.jpeg',
        success: function () {
            ShareCallback();
        },
        cancel: function () {
        }
    };
    console.log(window.shareData);
    window.shareData.desc2 = window.shareData.desc;
    if (/MicroMessenger/i.test(navigator.userAgent)) {
    $.getScript("//res.wx.qq.com/open/js/jweixin-1.2.0.js", function callback() {
        $.ajax({
            type: "post",
            url: "wxapi/wxx.php",
            dataType: 'json',
            data: {
                url: window.location.href
            },
            success: function (data) {
                window.token = data.token;
                wx.config({
                    debug: false,
                    appId: data.appId,
                    timestamp: data.timestamp,
                    nonceStr: data.nonceStr,
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



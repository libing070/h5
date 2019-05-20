$(function () {
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
        handleFontSize();
    } else {
        if (document.addEventListener) {
            document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
        } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", handleFontSize);
            document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
        }
    }

    function handleFontSize() {
        /*设置网页字体为默认大小*/
        WeixinJSBridge.invoke('setFontSizeCallback', {
            'fontSize': 0
        });
        /*重写设置网页字体大小的事件*/
        WeixinJSBridge.on('menu:setfont', function () {
            WeixinJSBridge.invoke('setFontSizeCallback', {
                'fontSize': 0
            });
        });
    }
    // -------------- 计算body高度，保障软键盘消失后回弹---------------------
    var Height = $('body').height();
    $(window).resize(function () {
        $('body').height(Height);
    });

    $("input").blur(function () {
        $(window).scrollTop(0, 0);
    });
    $("textarea").blur(function () {
        $(window).scrollTop(0, 0);
    });
    $("select").blur(function () {
        $(window).scrollTop(0, 0);
    });

    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if(isiOS){
       $(".zhuanpan-box .point-right,.zhuanpan-box .point-left").css("bottom","1%");
    }
});


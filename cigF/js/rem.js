var deviceWidth
setHtmlFontSize()

if (window.addEventListener) {
    window.addEventListener('resize', function () {
        setHtmlFontSize()
    }, false)
}

function setHtmlFontSize() {
    var w;
    if (browserRedirect() == 0) {

        if(window.screen.width>1920){
            w = 3800;
        }else{
            w = 1900;
        }
        console.log("document.documentElement.clientWidth "+document.documentElement.clientWidth +" 屏幕宽度："+window.screen.width+"  设置宽度："+w);
    }
    if (browserRedirect() == 1) {
        w = 750
    }
    // 1366是设计稿的宽度，当大于1366时采用1366宽度，比例也是除以13.66
    if(window.screen.width>1920){
        deviceWidth = w;
    }else{
        deviceWidth = document.documentElement.clientWidth > w ? w : document.documentElement.clientWidth

    }
    document.getElementsByTagName('html')[0].style.cssText = 'font-size:' + deviceWidth / (w / 100) + 'px !important'
}

function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

    if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
        return checkBrowser = 0; //pc
    } else {
        return checkBrowser = 1; //wap
    }
}
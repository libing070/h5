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


if(browserRedirect()==0){
    document.getElementById("pc").style.display="block";
    $("#wap").remove();
    $("#pc .header").load("header.html");//加载头部导航
    $("#pc .index-banner1").load("topswiper.html");//加载头部轮播
    $("#pc .index-banner2").load("weeklyleaderboard.html");//加载一周阅读排行榜
    $("#pc .footer").load("footer.html");//加载底部导航
    document.write('<script src="./js/interFacePc.js?v=2"></script>');
    document.write('<script src="./js/swiperInitPc.js"></script>');
    document.write('<script src="./js/basePc.js"></script>');
    document.write('<script src="./js/index.js"></script>');
}else{
    document.getElementById("wap").style.display="block";
    $("#pc").remove();
    if(window.location.href.indexOf("index")>-1){
        document.write('<script src="./wap/js/baseWap.js"></script>');
        document.write('<script src="./js/common/baiduTemplate.js"></script>');
        document.write('<script src="./wap/js/index.js"></script>');//移动端首页要用的js
    }else{
        document.write('<script src="./js/baseWap.js"></script>');
        document.write('<script src="./js/common/baiduTemplate.js"></script>');
    }



}
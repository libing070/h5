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
    document.write('<script src="./js/interFace.js"></script>');
    document.write('<script src="./js/swiperInit.js"></script>');
    document.write('<script src="./js/base.js"></script>');
}else{
    document.getElementById("wap").style.display="block";
    $("#pc").remove();
    $(".scrollBar,.phoneIcon,.mouseIcon").hide();
    document.write('<script src="./js/interFaceWap.js"></script>');
    document.write('<script src="./js/swiperInitWap.js"></script>');
    document.write('<script src="./js/basewap.js"></script>');



}
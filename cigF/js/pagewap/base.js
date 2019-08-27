$(function () {

    //wap移动端导航事件
    $(".container").on("click"," .nav .menu",function () {
        var that=this;
        if($(".menu-content").hasClass("close")){
            aniTranslateX(['.menu-content'], ['100%', '0', ], 200, 200);
            $(".menu-content").removeClass("close");
            setTimeout(function () {
                $(that).attr("src","../images/wap/nav-menu-close.jpg");
            },200)

        }else{
            aniTranslateX(['.menu-content'], ['0', '100%', ], 200, 200);
            $(".menu-content").addClass("close");
            setTimeout(function () {
                $(that).attr("src","../images/wap/nav-menu.jpg");
            },200)
        }
    });

});

//动画
function aniTranslateX(className, unit, duration, delay, loop) {
    anime({
        targets: className,
        translateX: unit,
        opacity: 1,
        duration: 1000,
        delay: delay,
        loop: false,
        easing: 'easeOutQuad'
    });
}

function aniTranslateY(className, unit, duration, delay) {
    anime({
        targets: className,
        translateY: unit,
        opacity: 1,
        duration: 1000,
        delay: delay,
        loop: false,
        easing: 'easeOutQuad'
    });
}

function aniTranslateW(className, unit, duration, delay) {
    anime({
        targets: className,
        width: unit,
        opacity: 1,
        duration: 1000,
        delay: delay,
        loop: false,
        easing: 'easeOutQuad'
    });
}

function aniRound(className, range, round) {
    anime({
        targets: className,
        innerHTML: range,
        opacity: 1,
        easing: 'linear',
        round: round, // Will round the animated value to 1 decimal
        delay: 100,
        easing: 'easeOutQuad'
    });
}

function aniScale(className, unit, duration, delay) {
    anime({
        targets: className,
        scale: unit,
        duration: 2000,
        delay: delay,
        loop: false,
        easing: 'easeOutQuad'
    });
}

//重置动画
function aniResetWap() {
    for (let i = 0; i < 100; i++) {
        $('.wap_ani_' + i).css('opacity', '0');
    }
}


//时间戳
function ts() {
    return Math.round(new Date() / 1000);
}
// 新建md5加密值
function createSign(dic) {
    var jsonstr = JSON.stringify(objKeySort(dic));
    var str1 = jsonstr.replace(new RegExp(':', 'g'), '=');
    var str2 = str1.replace(new RegExp(',', 'g'), '&');
    var str3 = str2.substring(1, str2.length - 1);
    str3 = str3.replace(/\"/g, "");
    var str = str3 + '&661C9A9B-6E9A-4C1E-92AA-B4F7B8D4DD3C'
    var sign = hex_md5(str);
    return sign;
}
//排序的函数
function objKeySort(arys) {
    //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
    var newkey = Object.keys(arys).sort();
    //console.log('newkey='+newkey);
    var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
    for (var i = 0; i < newkey.length; i++) {
        //遍历newkey数组
        newObj[newkey[i]] = arys[newkey[i]];
        //向新创建的对象中按照排好的顺序依次增加键值对
    }
    return newObj; //返回排好序的新对象
}
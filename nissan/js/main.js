(function () {
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
})();

var perBli = 1;
var url = "http://activity.skyengine.cn";
var num;
var reqImage = false;
//抽奖插件
var pars = {
    rotateNum: 8,
    body: '.turntable',
    clickCb: clickCbFun,
    renderCb: renderCbFun
}
var lottery = new Lottery(pars);

function clickCbFun() {//点击转盘开始抽奖
    var random = randomNum((num - 1) * 45, num * 45);
    lottery.goRotate(random);
}

function randomNum(minNum, maxNum) {//随机数n-m
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}

function renderCbFun(deg) {//按照区域对照奖品
    //抽奖结束后边框变化并显示下层页面
    setTimeout(function () {
        checkBlock_4();
    }, 1000);
}

//第四屏动画
function checkBlock_4() {
    $(".region").hide();
    $('.join_now').show();
    $('.technology_box').hide();
    if (clientWidth == 375 && (clientHeight == 812 || clientHeight == 724)) {//兼容iphone x
        $('.before').animate({ 'top': '4%', 'left': '0%' }, 500);
        $(".after").animate({ 'bottom': '-17.5%', 'right': '20%' }, 500);
    } else if (clientWidth == 414 && (clientHeight >= 808 && clientHeight <= 896)) {//xr
        $('.before').animate({ 'top': '5%', 'left': '0%' }, 500);
        $(".after").animate({ 'bottom': '-17.5%', 'right': '20%' }, 500);
    } else if (clientWidth == 414 && (clientHeight >= 672)) {//iphone 6,7,8 plus
        $('.before').animate({ 'top': '5%', 'left': '0%' }, 500);
        $(".after").animate({ 'bottom': '-21.5%', 'right': '20%' }, 500);
    } else {
        $('.before').animate({ 'top': '5%', 'left': '0%' }, 500);
        $(".after").animate({ 'bottom': '-20.5%', 'right': '20%' }, 500);
    }
    $('.before_horn').animate({ 'right': '-29%' }, 500);
    $('.after_horn').animate({ 'right': '-21%' }, 500, function () {
        $(".xiaoke").hide();
        $('.draw_rule').hide();
        $('.winning_title').css('opacity', '0');
        $(".block_4").slideDown(500, function () {
            setTimeout(() => {
                $(".xiaoke").fadeIn(500);
                $('.draw_rule').fadeIn(500);
                $('.winning_title').animate({ 'opacity': '1' }, 500);
                $('.petal_left').animate({}, function () {
                    $(".petal_left").css({ 'transform': 'rotate(0deg) scale(1)' })
                });
                $('.petal_center').animate({}, function () {
                    $(".petal_center").css({ 'transform': 'rotate(0deg) scale(1)' })
                });
                $('.petal_right').animate({}, function () {
                    $(".petal_right").css({ 'transform': 'rotate(0deg) scale(1)' })
                });
            }, 500);
        });
    });
}

//已中奖跳转第四页
function checkBlock_4_2() {
    $(".region").hide();
    $('.join_now').show();
    $('.technology_box').hide();
    $('.join_now').animate({ 'top': '1%' }, 500);
    if (clientWidth == 375 && (clientHeight == 812 || clientHeight == 724)) {//兼容iphone x
        $('.before').animate({ 'top': '4%', 'left': '0%' }, 500);
        $(".after").animate({ 'bottom': '-20.5%', 'right': '20%' }, 500);
        $('.before_handle').animate({ 'left': '-15%' }, 500);
        $('.before_horn').animate({ 'right': '-17%' }, 500);
    } else if (clientWidth == 414 && (clientHeight >= 808 && clientHeight <= 896)) {//xr
        $('.before').animate({ 'top': '5%', 'left': '0%' }, 500);
        $(".after").animate({ 'bottom': '-19.5%', 'right': '20%' }, 500);
        $('.before_handle').animate({ 'left': '-14%' }, 500);
        $('.before_horn').animate({ 'right': '-15%' }, 500);
    } else if (clientWidth == 414 && (clientHeight >= 672)) {//iphone 6,7,8 plus
        $('.before').animate({ 'top': '6%', 'left': '0%' }, 500);
        $(".after").animate({ 'bottom': '-24.5%', 'right': '20%' }, 500);
        $('.before_handle').animate({ 'left': '-13%' }, 500);
        $('.before_horn').animate({ 'right': '-14%' }, 500);
    } else {
        $('.before').animate({ 'top': '5%', 'left': '-13%' }, 500);
        $(".after").animate({ 'bottom': '-24.5%', 'right': '20%' }, 500);
        $('.before_handle').animate({ 'left': '1%' }, 500);
        $('.before_horn').animate({ 'right': '-29%' }, 500);
    }


    $('.after_horn').animate({ 'right': '-38%' }, 500, function () {
        $(".xiaoke").hide();
        $('.draw_rule').hide();
        $('.winning_title').css('opacity', '0');
        $(".block_4").slideDown(500, function () {
            setTimeout(() => {
                $(".xiaoke").fadeIn(500);
                $('.draw_rule').fadeIn(500);
                $('.winning_title').animate({ 'opacity': '1' }, 500);
                $('.petal_left').animate({}, function () {
                    $(".petal_left").css({ 'transform': 'rotate(0deg) scale(1)' })
                });
                $('.petal_center').animate({}, function () {
                    $(".petal_center").css({ 'transform': 'rotate(0deg) scale(1)' })
                });
                $('.petal_right').animate({}, function () {
                    $(".petal_right").css({ 'transform': 'rotate(0deg) scale(1)' })
                });
            }, 500);
        });
    });
}

$(function () {
    var Height = $('body').height();
    $(window).resize(function() {
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


    //获取验证码
    var content = '发送验证码', totalTime = 60, canClick = true;
    $("#countDown").html(content);
    $("#countDown").on("click", function () {
        if (reqImage == false) {
            swal({
                title: "操作",
                text: '请先通过滑动验证',
                button: "确定",
            });
            return;
        }
        var phone = $("#content2wrap2Phone").val();
        if (!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(phone)) {
            swal({
                title: "输入有误",
                text: '请输入正确的手机号',
                button: "确定",
            });
            return;
        }
        if (!canClick) return;
        canClick = false;
        content = totalTime + 'S';
        $("#countDown").html(content);
        var clock = window.setInterval(function () {
            totalTime--;
            content = totalTime + 'S';
            $("#countDown").html(content);
            if (totalTime < 0) {
                window.clearInterval(clock);
                content = '重新发送';
                $("#countDown").html(content);
                totalTime = 60;
                canClick = true; //这里重新开启
            }
        }, 1000);
        //请求后台 获取短信验证码
        $.ajax({
            type: "GET",
            url: url + "/api/mobileCode",
            dataType: 'jsonp',
            data: { mobile: $("#content2wrap2Phone").val() },
            success: function (result) {
            },
            error: function (errormsg) {
            }
        });

    })


    //输入框基本校验
    function validateRequired() {
        var flag = true;
        var name = $("#content2wrap2Name").val();
        var gys = $("#content2wrap2GYS option:selected").html();
        var phone = $("#content2wrap2Phone").val();
        var yzm = $("#content2wrap2YZM").val();
        if (name == "" || name == null || name == undefined) { // "",null,undefined
            swal({
                title: "输入有误",
                text: '请输入姓名',
                button: "确定",
            });
            flag = false;
            return
        }
        if (phone == "" || phone == null || phone == undefined) {
            swal({
                title: "输入有误",
                text: '请输入手机',
                button: "确定",
            });
            flag = false;
            return
        } else if (!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(phone)) {
            swal({
                title: "输入有误",
                text: '请输入正确的手机号',
                button: "确定",
            });
            flag = false;
            return
        }

        if (gys == "" || gys == null || gys == undefined) { // "",null,undefined
            swal({
                title: "输入有误",
                text: '请选择供应商',
                button: "确定",
            });
            flag = false;
            return
        }
        if (yzm == "" || yzm == null || yzm == undefined) { // "",null,undefined
            swal({
                title: "输入有误",
                text: '请输入验证码',
                button: "确定",
            });
            flag = false;
            return
        }
        return flag;
    }


    //提交按钮
    var tijao = 1;
    $("#content2Wrap4btn").on("click", function () {
        if (validateRequired()) {
            if (tijao != 1) {
                return;
            }
            tijao = 2;
            var name = $("#content2wrap2Name").val();//姓名
            var gys = $("#content2wrap2GYS option:selected").html();//供应商
            var phone = $("#content2wrap2Phone").val();//电话
            var yzm = $("#content2wrap2YZM").val();
            var cond = "name=" + name + "&mobile=" + phone + "&dealer=" + gys + "&code=" + yzm;
            $.ajax({
                type: "get",
                url: url + "/api/save?" + cond,
                dataType: 'jsonp',
                success: function (result) {
                    if (result.code != 200) {
                        tijao = 1;
                        swal({
                            title: "提示",
                            text: result.message,
                            button: "确定",
                        });
                        return;

                    }
                    var name = result.data.name;
                    var code = result.data.code;
                    var desc = '&nbsp;&nbsp;';
                    switch (name) {
                        case "蓝牙音响":
                            num = 1;
                            break;
                        case "扫地机":
                            num = 2;
                            break;
                        case "智能表":
                            num = 3;
                            break;
                        case "加油卡":
                            num = 4;
                            break;
                        case "优惠券":
                            num = 5;
                            name = "9999元";
                            desc = "购车优惠券";
                            break;
                        case "双人游":
                            num = 6;
                            break;
                        case "ipad":
                            num = 7;
                            break;
                        case "iphone8":
                            num = 8;
                            break;
                    }
                    $("#res_code").html("核销码：" + code);
                    $("#res_name").html(name);
                    $("#res_desc").html(desc);
                    $.cookie('code', code, { expires: 30 });
                    $.cookie('name', name, { expires: 30 });
                    $.cookie('desc', desc, { expires: 30 });
                    $('.border_bg').hide();
                    $(".before").animate({ 'width': '70%', 'top': '20%', 'left': '10%' }, 500);
                    $(".after").animate({ 'width': '70%', 'bottom': '-35%', 'right': '10%' }, 500, function () {
                        $(".region").hide();
                        $(".block_3").show();
                        $('.join_now').hide()
                    });
                },
                error: function (errormsg) {
                }
            });
        }
    });




    var bili = 173 / 350;
    bili = bili.toFixed(2)
    var yzmHeight = bili * clientWidth * 0.8 * 0.8;
    $('.form-item').css({ 'width': '100%', 'height': yzmHeight + 'px' });
    $('.yzm').css({ 'width': '100%', 'height': yzmHeight + 'px' });
    $('.yzm_image_source').css('height', yzmHeight + 'px');
    perBli = yzmHeight / 173;
    $('#xy_img').css({ 'width': (50 * perBli) + 'px', 'height': (50 * perBli) + 'px' })
    //初始化图形验证码
    initYzm();
    //注册验证码拖动事件
    $('#drag').drag(null, null, initYzm);

    function initYzm(index) {
        //加载中
        $("#xy_img").css("display", "none");
        $("#yzm_image_source").css("display", "none");
        $(".yzm_image_cut_big").css("display", "none");
        $(".yzm_image_cut_loading").show();
        $.ajax({
            type: "GET",
            url: url + "/api/reqCode",
            dataType: 'jsonp',
            success: function (result) {
                if (result.code == 200) {
                    //设置大图，小图，及其位置http://image.cn/valid
                    $(".yzm_image_source").css({
                        "background-image": "url(" + result.data.sourceImgName + ")",
                        'backgroundSize': '100%',
                        'backgroundRepeat': 'no-repeat'
                    });
                    $(".yzm_image_cut_big").css({
                        "background-image": "url(" + result.data.bigImgName + ")",
                        'backgroundSize': '100%',
                        'backgroundRepeat': 'no-repeat'
                    });
                    $("#xy_img").css({
                        "background-image": "url(" + result.data.smallImgName + ")",
                        'backgroundSize': '100% 100%',
                        'backgroundRepeat': 'no-repeat'
                    });
                    $("#xy_img").css("top", Number(result.data.location_y * perBli) + "px");
                    $(".yzm_image_cut_loading").css("display", "none");
                    $("#xy_img").show();
                    if(index!=3){
                        $(".yzm_image_cut_big").show();
                    }
                    if(index==3){
                        $(".yzm_image_source").css("display", "none");
                        $(".yzm_image_cut_big").show();

                    }
                    //$(".yzm_image_source").show();
                    //$(".yzm_image_cut_big").css("display", "none");
                }
            },
            error: function (errormsg) {
            }
        });
    }
})

function resetPrize() {
    if ($.cookie('code') != null && $.cookie('code') != '' && $.cookie('code') != undefined) {
        $("#res_code").html("核销码：" + $.cookie('code'));
        $("#res_name").html($.cookie('name'));
        $("#res_desc").html($.cookie('desc'));
        return true;
    }
    return false;
}

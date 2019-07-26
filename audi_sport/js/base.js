var speed = 500;
var distance = 0;
var scanSwiper = new Swiper('.scan', {
    loop: true,
    speed: speed
});

var backSwiper = new Swiper('.back', {
    loop: true,
    effect: 'fade',
    speed: speed
});

function hiddenBody() {
    $('html').addClass('html-hidden');
    $('body').addClass('body-hidden');
    $('.all').css('opacity', '0');
}

function visibleBody() {
    $('html').removeClass('html-hidden');
    $('body').removeClass('body-hidden');
    $(document).scrollTop(distance);
    $('.all').css('opacity', '1');
}

var carSwiper = new Swiper('.car', {
    effect: 'flip',
    grabCursor: true,
    loop: true,
    speed: speed,
    flipEffect: {
        slideShadows: false
    },
    controller: {
        control: [scanSwiper, backSwiper],
        inverse: true,
        by: 'slide',
    },
    navigation: {
        nextEl: '.btn-next'
    },
    on: {
        click: function () {
            var x = document.getElementById("myVideo");
            x.pause();
            distance = $(document).scrollTop();
            catTypeSwiper.slideTo(this.activeIndex, 0);
            $(".detail").fadeIn();
            hiddenBody();
        },
        transitionEnd: function () {
            var txt = $('.car .swiper-slide-active img').attr('tag');
            $('.tag').attr('src', "images/" + txt);
        },
    }
});

var catTypeSwiper = new Swiper('.car-type', {
    loop: true,
    autoHeight: true,
    observer: true,
    observeParents: true,
    speed: speed
});

var r4Swiper = new Swiper('.r4-pic', {
    loop: true,
    observer: true,
    observeParents: true,
    speed: speed,
    pagination: {
        el: '.swiper-pagination'
    },
});

var r5Swiper = new Swiper('.r5-pic', {
    loop: true,
    observer: true,
    observeParents: true,
    speed: speed,
    pagination: {
        el: '.swiper-pagination'
    }
});


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


function isEmpty(val) {
    if (val == undefined || val == null || val == '') {
        return true;
    }
    return false;
}

function mobileFun() {
    var value = $("#user_mobile").val();
    value = value.replace(/[^\d]/g, "");
    if (value.length > 11) {
        value = value.slice(0, 11);
    }
    $("#user_mobile").val(value);
}

function getDealerUtm() {
    return "m1";
}

//初始化页面定位处理
var position;

function initPosition(cb) {
    baiduPosition(function () {
        if (isEmpty(position)) {
            ipPosition(function () {
                cb();
            })
        } else {
            cb();
        }
    })
}

function baiduPosition(cb) {
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
        position = r.address;
        cb();
    }, function () {
        cb();
    });
}

function ipPosition(cb) {
    $.getLocationInfo(function (r) {
        position = r.data;
        cb();
    }, function () {
        cb();
    })
}

function makeProvince(provinceName, cb) {
    var provinceId;
    $.getProvince(function (res) {
        var str = "";
        $.each(res.items, function (index, obj) {
            if (isEmpty(provinceId)) {
                provinceId = obj.id;
            }
            if (!isEmpty(provinceName) && provinceName.indexOf(obj.name) > -1) {
                provinceId = obj.id;
                str += "<option selected='selected' value='" + obj.id + "'>" + obj.name + "</option>";
            } else {
                str += "<option value='" + obj.id + "'>" + obj.name + "</option>";
            }
        })
        $("#province").html(str);
        cb(provinceId);
    })
}

function makeCity(provinceId, cityName) {
    var city;
    if (!isEmpty(cityName)) {
        city = cityName;
        makeDealer(cityName);
    }
    $.getCity(provinceId, function (res) {
        var str = "";
        $.each(res.items, function (index, obj) {
            if (isEmpty(city)) {
                city = obj.name;
                makeDealer(city);
            }
            if (!isEmpty(cityName) && cityName.indexOf(obj.name) > -1) {
                str += "<option selected='selected' value='" + obj.id + "'>" + obj.name + "</option>";
            } else {
                str += "<option value='" + obj.id + "'>" + obj.name + "</option>";
            }
        })
        $("#city").html(str);
    })

}

function makeDealer(cityName) {
    $.getDealer(getDealerUtm(), cityName, function (res) {
        var str = "";
        if (res.items.length == 0) {
            $('.message').hide();
            $('.no-message').show();
            str += "<option   value=''>无</option>";
        }
        $.each(res.items, function (index, obj) {
            if (index == 0) {
                $('.no-message').hide();
                $('.message').show();
                str += "<option address='" + obj.dizhi + "' phone='" + obj.dianhua + "' tel='" + obj.tel + "' selected='selected'  value='" + obj.jingxiaoshangid + "' >" + obj.gongsi + "</option>";
                $("#dealer_title").html(obj.gongsi);
                $("#dealer_address").html(obj.dizhi);
                $("#dealer_mobile").html(obj.dianhua);
                $('.call_now').attr('href', 'tel:' + obj.tel);
            } else {
                str += "<option address='" + obj.dizhi + "' phone='" + obj.dianhua + "' tel='" + obj.tel + "'  value='" + obj.jingxiaoshangid + "'>" + obj.gongsi + "</option>";
            }
        })
        $("#dealer").html(str);
    })
}

var utm = 'm42';

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return utm;
}

$(function () {
    utm = getQueryVariable('utm');
    if (utm.indexOf("?") > -1) {
        utm = utm.split("?")[0];
    }

    var index = getQueryVariable('index');
    if (index == '8') {
        $('html, body').animate({
            scrollTop: $(".liuzi").offset().top
        }, 500);
    }
    $(".video").css("height", $(".video").height() + 'px');
    $(".video").css("width", $(".video").width() + 'px');


    if (/MicroMessenger/i.test(navigator.userAgent)) {
        $(".tmall").hide();
    }

    $("#to_tmall").on('click',function(){
        window.location.href='https://audi.m.tmall.com/?spm=a230r.1.14.10.677f162eWIO7Ql&user_number_id=2474540214';
    })



    // //获取焦点后回退
    $("input").focus(function () {
        distance = $(document).scrollTop();
    });
    $("textarea").focus(function () {
        distance = $(document).scrollTop();
    });
    $("select").focus(function () {
        distance = $(document).scrollTop();
    });

    //失去焦点后回退
    $("input").blur(function () {
        $(document).scrollTop(distance);
    });
    $("textarea").blur(function () {
        $(document).scrollTop(distance);
    });
    $("select").blur(function () {
        $(document).scrollTop(distance);
    });


    $(".btn-play").on('click', function () {
        $('.btn-play').hide();
        $('.video_post').hide();
        $('#myVideo').show();
        var x = document.getElementById("myVideo");
        x.play();
    })

    $(".btn-next").on('click', function () {
        var tag = $(this).find(".tag");
        if (tag.attr("src") == 'images/pre.png') {
            tag.attr("src", "images/next.png");
            return;
        }
        tag.attr("src", "images/pre.png")
    })

    $("#toBack").on('click', function () {
        visibleBody();
        $(".detail").hide();
    })

    $(".btn-change").on('click', function () {
        catTypeSwiper.slideNext(speed);
    })

    //根据定位设置省份
    initPosition(function () {
        makeProvince(position.province, function (provinceId) {
            makeCity(provinceId, position.city);
        });
    });

    $("#province").on('change', function () {
        var provinceId = $('#province option:selected').val();
        makeCity(provinceId);
    });

    $("#city").on('change', function () {
        var city = $('#city option:selected').html();
        makeDealer(city);
    });

    $("#dealer").on('change', function () {
        var obj = $('#dealer option:selected');
        $("#dealer_title").html(obj.html());
        $("#dealer_address").html(obj.attr('address'));
        $("#dealer_mobile").html(obj.attr('phone'));
        $('.call_now').attr('href', 'tel:' + obj.attr('tel'));
    });


    var tijiao = 0;
    var myregmobile = /^(1(([34578][0-9])|(47)|[8][01236789]))\d{8}$/;
    $('.app_now').mousedown (function () {
        if (tijiao == 1) {
            return;
        }
        tijiao = 1;
        var car = $("#car").val();
        if (isEmpty(car)) {
            tijiao = 0;
            layer.msg('请选择车型');
            return;
        }
        var realname = $("#realname").val();
        if (isEmpty(realname)) {
            tijiao = 0;
            layer.msg('请填写您的姓名');
            return;
        }
        var user_mobile = $("#user_mobile").val();
        if (isEmpty(user_mobile)) {
            tijiao = 0;
            layer.msg('请填写您的手机号');
            return;
        }
        if (!myregmobile.test(user_mobile)) {
            tijiao = 0;
            layer.msg('请输入正确手机号');
            return;
        }
        var provinceId = $('#province option:selected').val();
        if (isEmpty(provinceId)) {
            tijiao = 0;
            layer.msg('请选择省份');
            return;
        }
        var cityId = $('#city option:selected').val();
        if (isEmpty(cityId)) {
            tijiao = 0;
            layer.msg('请选择城市');
            return;
        }
        var jxsId = $('#dealer option:selected').val();
        if (isEmpty(jxsId)) {
            tijiao = 0;
            layer.msg('请选择经销商');
            return;
        }
        var data = {
            name: realname,
            car: car,
            mobile: user_mobile,
            cityId: cityId, //预约市
            jxs_id: jxsId, //经销商id
            provinceId: provinceId, //预约省
            utm: utm
        }
        $.sendData(data, function (res) {
            if (res.msg.indexOf('成功') > -1) {
                layer.msg('预约成功', function () {
                    tijiao = 0;
                    $("#realname").val('');
                    $("#user_mobile").val('');
                });
            } else {
                layer.msg(res.msg, function () {
                    tijiao = 0;
                    $("#realname").val('');
                    $("#user_mobile").val('');
                });
            }
        }, function () {
            layer.msg("网络错误，请重试");
            tijiao = 0;
        })
    })


    //打开发现媒体
    $('.faxian').on('click', function (event) {
        event.preventDefault();
        $('.find_pop').fadeIn();
        $('body').css('overflow', 'hidden');
    });

    //关闭发现媒体
    $('.find_pop .mask').on('click', function (event) {
        event.preventDefault();
        $('.find_pop').fadeOut();
        $('.media').fadeOut();
        $('body').css('overflow', 'scroll');
    });

    //分享
    $('.share').on('click', function () {
        $('.media').fadeOut();
        $('.shareBox').fadeIn();
    });
    //官方微信
    $('.weixin').on('click', function () {
        $('.media').fadeOut();
        $('.wxBox').fadeIn();
    });
    //小程序
    $('.xiaochengxu').on('click', function () {
        $('.media').fadeOut();
        $('.xcxBox').fadeIn();
    });

    // $('.wenda').on('click', function () {
    //     window.location.href = 'http://ai.auto-smart.com/audi_a6l_mobile/robot.html?utm=' + utm;
    // });

    $('.yuyue').on('click', function () {
        $('html, body').animate({
            scrollTop: $(".liuzi").offset().top
        }, 500);
    })


})







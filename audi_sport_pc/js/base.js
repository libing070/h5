
var cheName = 'che';
var utms = 'm42';

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return utms;
}

$(function () {
    utms = getQueryVariable('utm');
    var index = getQueryVariable('index');
    setTimeout(function () {
        if (index == '5' || index == 5) { //参数配置
            $('html, body').animate({
                scrollTop: $(".configuration").offset().top
            }, 500);
        }
        // if (index == '7' || index == 7) { //金融政策
        //     $('html, body').animate({
        //         scrollTop: $("#policy").offset().top - 150
        //     }, 500);
        // }
        if (index == '8' || index == 8) { //询底价
            $('html, body').animate({
                scrollTop: $("#inquiry").offset().top
            }, 500);
        }
    }, 1000);



    var swiper1 = new Swiper('#rs4Swpier .rs4-swiper-container', {
        loop:true,
        pagination: {
            el: '#rs4Swpier .swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '"></span>';
            },
        },
    });
    var swiper2 = new Swiper('#rs5Swpier .rs5-swiper-container', {
        loop:true,
        pagination: {
            el: '#rs5Swpier .swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '"></span>';
            },
        },
    });

    $("#to-tmall").on('click',function(){
        window.open("https://audi.tmall.com/shop/view_shop.htm?spm=a230r.1.14.10.677f162eWIO7Ql&user_number_id=2474540214");
    })

});
//获取定位位置
$.getLocationInfo(function (res) {
    //获取省份
    getProviceDefult(res.data.province, res.data.city);
});

//获取省份
function getProviceDefult(provinceName, cityName) {
    $.getProvince( function (res) {
        var str = '';
        res.items.forEach((val, key) => {
            str += '<option pro_id="' + val.id + '">' + val.name + '</option>';
    });
        $('.select').eq(1).append(str);
        $('.pro_local').append(str);

        //获取默认省份
        res.items.forEach((val, key) => {
            if (provinceName == val.name) {
            // var k = key++;
            $('.select').eq(1).find('option').eq(key + 1).attr("selected", 'selected');
            $('.pro_local').find('option').eq(key).attr("selected", 'selected');
            //获取默认城市
            getCityDefult(val.id, cityName);
        }
    });
    });
}

//获取默认城市
function getCityDefult(pro_id, cityName) {
    $.getCity(pro_id, function (res) {
        var str = '';
        res.items.forEach((val, key) => {
            str += '<option city_id="' + val.id + '">' + val.name + '</option>';
    });
        $('.select').eq(2).append(str);
        $('.city_local').append(str);
        //获取默认城市
        res.items.forEach((val, key) => {
            if (cityName == val.name) {
            $('.select').eq(2).find('option').eq(key + 1).attr("selected", 'selected');
            $('.city_local').find('option').eq(key).attr("selected", 'selected');
            //获取默认经销行
            getJxsDefult(val.name);
            // 留资获取默认城市经销商
           // var proName = $('.pro_local').val();
           // var searchVal = $('.search_put input').val();
           // getInquiryJxs(proName, val.name, searchVal);
        }
    });

    });
}

//获取默认经销商
function getJxsDefult(cityName) {
    $.getDealer(utms,cityName, function (res) {
        var str = '';
        res.items.forEach((val, key) => {
            str += '<option jxs_id="' + val.jingxiaoshangid + '" dizhi="' + val.dizhi + '" dianhua="' + val.dianhua + '">' + val.gongsi + '</option>';

    });
        $('.select').eq(3).append(str);
        //留资默认经销商
        $('.select').eq(3).find('option').eq(1).attr("selected", 'selected');
        $('.address-msg .title').text(res.items[0].gongsi);
        $('.address-msg .t').eq(0).find('span').text(res.items[0].dizhi);
        $('.address-msg .t').eq(1).find('span').text(res.items[0].dianhua);
    });
};

//留资省份选择
$('.select').eq(1).on('change', function () {
    var pro_id = $(this).find('option:selected').attr('pro_id');
    getCitySelect(pro_id);
});
//留资城市选择
$('.select').eq(2).on('change', function () {
    var cityName = $(this).find('option:selected').val();
    updateJxs(cityName);
});
//留资经销商选择
$('.select').eq(3).on('change', function () {
    var dizhi = $(this).find('option:selected').attr('dizhi');
    var dianhua = $(this).find('option:selected').attr('dianhua');
    var gongsi = $(this).find('option:selected').val();
    $('.address-msg .title').text(gongsi);
    $('.address-msg .t').eq(0).find('span').text(dizhi);
    $('.address-msg .t').eq(1).find('span').text(dianhua);
});

//选择框选择省份拉取城市
function getCitySelect(pro_id, type) {
    $.getCity(pro_id, function (res) {
        var str = '';
        res.items.forEach((val, key) => {
            str += '<option city_id="' + val.id + '">' + val.name + '</option>';
        });
        $('.select').eq(2).html(str);
        //更新经销商信息
        updateJxs(res.items[0].name);
    });

};

//更新经销商信息
function updateJxs(cityName, type) {
    $.getDealer(utms,cityName, function (res) {
        var str = '';
        res.items.forEach(function (val, key) {
            str += '<option jxs_id="' + val.jingxiaoshangid + '" dizhi="' + val.dizhi + '" dianhua="' + val.dianhua + '">' + val.gongsi + '</option>';
        });
        if (res.items.length == 0) {
            $(".address-msg").children().css("visibility", "hidden");
            $(".address-msg .t").eq(0).find('img').css("visibility", "hidden");
            str += '<option>无</option>';
            $('.select').eq(3).html(str);
            $('.address-msg .title').text('');
            $(".address-msg .t").eq(0).find('span').html('该城市暂无经销商，请搜索周边城市！');
            $(".address-msg .t").eq(0).css("visibility", "visible");
            $('.address-msg .t').eq(1).find('span').text('');
        } else {
            $('.select').eq(3).html(str);
            $(".address-msg").children().css("visibility", "visible");
            $(".address-msg .t").eq(0).find('img').css("visibility", "visible");
            $('.select').eq(3).find('option').eq(0).attr("selected", 'selected');
            $('.address-msg .title').text(res.items[0].gongsi);
            $('.address-msg .t').eq(0).find('span').text(res.items[0].dizhi);
            $('.address-msg .t').eq(1).find('span').text(res.items[0].dianhua);

        }
    });
};

var tip_index;
$('.tips').on('mouseenter', function () {
    tip_index = layer.tips($(this).text(), $(this), {
        tips: 3,
        time: 0
    });
    // console.log(tip_index)
}).on('mouseleave', $(this), function () {
    layer.close(tip_index);
});

/**
 * 预约试驾提交
 */
var tijiao = 0;
$('.form .btn .r').on('click', function () {
    if (tijiao == 1) {
        return;
    }
    tijiao = 1;
    var chexing = $('.select').eq(0).find('option:selected').val();
    var name = $('.form-div').eq(0).val();
    var mobile = $('.form-div').eq(1).val();
    var pro_id = $('.select').eq(1).find('option:selected').attr('pro_id');
    var city_id = $('.select').eq(2).find('option:selected').attr('city_id');
    var jxs_id = $('.select').eq(3).find('option:selected').attr('jxs_id');
    var myregmobile = /^(1(([34578][0-9])|(47)|[8][01236789]))\d{8}$/;

    // console.log(name);
    if (!chexing || chexing == '') {
        tijiao = 0;
        layer.msg('请选择车型');
        return false
    }
    if (!name || name == '') {
        tijiao = 0;
        layer.msg('请填写您的姓名');
        return false
    }
    if (!mobile) {
        tijiao = 0;
        layer.msg('请填写手机号');
        return false
    }
    if (!myregmobile.test(mobile)) {
        tijiao = 0;
        layer.msg('请输入正确手机号');
        return false
    }
    if (!pro_id) {
        tijiao = 0;
        layer.msg('请选择省份');
        return false
    }
    if (!city_id) {
        tijiao = 0;
        layer.msg('请选择城市');
        return false
    }
    if (!jxs_id) {
        tijiao = 0;
        layer.msg('请选择经销商');
        return false
    }
    var data = {
        car:chexing,
        name: name,
        mobile: mobile,
        cityId: city_id, //预约市
        jxs_id: jxs_id, //经销商id
        provinceId: pro_id, //预约省
        utm: utms
    }
    $.sendData(data, function (res) {
        if (res.msg.indexOf('成功') > -1) {
            layer.msg('预约成功',function(){
                tijiao = 0;
                $('.form-div').eq(0).val('');
                $('.form-div').eq(1).val('');
                $('.form-div').eq(2).val('');
            });
        } else {
            layer.msg(res.msg,function(){
                tijiao = 0;
                $('.form-div').eq(0).val('');
                $('.form-div').eq(1).val('');
                $('.form-div').eq(2).val('');
            });
        }
    }, function () {
        layer.msg("网络错误，请重试");
        tijiao = 0;
    })
});

// 播放视频
$('.videoBox .video-btn').on('click', function () {
    $('.videoMask').show();
    video1.play();
});
$('.closeVideo').on('click', function () {
    $('.videoMask').hide();
    video1.pause();
});
$('.mask-v').on('click', function () {
    $('.videoMask').hide();
    video1.pause();
})

//进入全屏
function FullScreen() {
    var video = document.getElementById("video1");
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullScreen) {
        video.webkitRequestFullScreen();
    }
}
//退出全屏
function exitFullscreen() {
    var de = document;
    if (de.exitFullscreen) {
        de.exitFullscreen();
    } else if (de.mozCancelFullScreen) {
        de.mozCancelFullScreen();
    } else if (de.webkitCancelFullScreen) {
        de.webkitCancelFullScreen();
    }
}

$(".yuyue").on("click",function () {
    //滚动到顶部
    $('html, body').animate({
        scrollTop: $(".form").offset().top-80
    }, 500);
})

// $('.bottom-btn').on("click",function () {
//     window.open('https://www.audi.cn/cn/web/zh.html');
// })

$("#wenda").on('click',function(){
    window.open('http://ai.auto-smart.com/audi_a6l/robot.html');
})

$("#show-find").on('click',function(){
    $("#find_pop").fadeIn();
})

$(".mask").on('click',function(){
    $("#find_pop").fadeOut();
    hide_pop();
})

function hide_pop(){
    $('.share_pop').fadeOut();
    $('.xcx_pop').fadeOut();
    $('.ewm_pop').fadeOut();
}

$('.share').on('click',function(){
    hide_pop();
    $('.share_pop').fadeIn();
})

$('.xiaochengxu').on('click',function(){
    hide_pop();
    $('.xcx_pop').fadeIn();
})
$('.weixin').on('click',function(){
    hide_pop();
    $('.ewm_pop').fadeIn();
})
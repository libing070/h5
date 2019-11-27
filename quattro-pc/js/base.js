
var cheName = 'che';
var utm = 'm91';
var channel=1;

function getDealerUtm() {
    var mm = getQueryVariable("utm");
    switch(mm) {
        case 'm91': return 'm45';
        case 'm92': return 'm40';
        case 'm93': return 'm41';
        case 'm94': return 'm61';
        case 'm95': return 'm62';
        case 'm96': return 'm63';
        case 'm97': return 'm64';
        case 'm98': return 'm65';
        case 'm99': return 'm66';
        case 'm100': return 'm66';
    }
    return "m91";
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    if(query.length>0){
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    }
    return variable=="utm"?utm:1;
}

window._pt_lt = new Date().getTime();
window._pt_sp_2 = [];
_pt_sp_2.push('setAccount,79caef96');
var _protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
(function () {
    var atag = document.createElement('script'); atag.type = 'text/javascript'; atag.async = true;
    atag.src = _protocol + 'js.ptengine.cn/79caef96.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(atag, s);
})();

$(function () {
    utm = getQueryVariable('utm');
    channel = getQueryVariable('channel');
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


});



var pt_mark = 1;
document.addEventListener("scroll",function(){ 
 var y = document.documentElement.scrollTop || window.pageYOffset;
 if((y >= 400 && pt_mark == 1) &&  document.location.href.indexOf("http://ai.audi.cn/wap/QC-3/index.html") > -1){
   _pt_sp_2.push('setCustomEvent',{eventName:'SP到达第二屏'});
   pt_mark = 0;
 }else if((y >= 400 && pt_mark == 1) && document.location.href.indexOf("http://ai.audi.cn/pc/QC-3/index.html") > -1){
  _pt_sp_2.push('setCustomEvent',{eventName:'PC到达第二屏'});
   pt_mark = 0;
 }
},false)



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
            str += '<option name="'+val.name+'" pro_id="' + val.id + '">' + val.name + '</option>';
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
            str += '<option name="'+val.name+'" city_id="' + val.id + '">' + val.name + '</option>';
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
            getInquiryJxs(val.name);
        }
    });

    });
}

function isEmpty(val) {
    if (val == undefined || val == null || val == '') {
        return true;
    }
    return false;
}

//获取默认经销商
function getJxsDefult(cityName) {
    
    $.getDealer(getDealerUtm(),cityName, function (res) {
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
function getInquiryCity(pro_id) {
    $.getResultByParams({
        url: '?c=home&a=getcity&provinceid=' + pro_id + '&utm=' + utm + '&channel=' + channel,
        type: 'get'
    }, function (res) {
        var str = '';
        str += '<option city_id="">请选择</option>';
        res.items.forEach((val, key) => {
            str += '<option name="'+val.name+'" city_id="' + val.id + '">' + val.name + '</option>';
        });
        $('.city_local').html(str);
    });
};

/**
 * 询底价处 按关键字搜索经销商
 */
function getInquiryJxs( cityName) {
    var keyword = $('.keyword').val();
        $.getResultByParams({
            url: '?c=home&a=getjxss&format=json&utm=' + getDealerUtm() + '&_keyword=' + keyword + '&city=' + cityName + '&channel=' + channel,
            type: 'get'
        }, function (res) {
        var str = '';
        res.items.forEach((val, key) => {
            str += '<li class="">' +
                '<div class="jxs_info">' +
                '<h4>' + val.gongsi + '</h4>' +
                '<p class=""><span class="local_icon"></span>' + val.dizhi + '</p>' +
                '<p><span class="phone_icon"></span>' + val.dianhua + '</p>' +
                '<a class="app-fun" jingxiaoshangid="'+val.jingxiaoshangid+'" href="javascript:void(0);"  vid="' + key + '">立即预约</a>' +
                '</div>' +
                '</li>';
        });
        if (res.items == null || res.items.length == 0) {
            $('.moreThan').hide();
            str += '<p style="text-align: center;color: white;padding: 10px 0">抱歉，没有搜索到相关信息</p>';
        } else {
            $('.moreThan').show();
        }
        $('.jxs_list').html(str);

        var h3_index;
        $('.jxs_info h3').on('mouseenter', function () {
            tip_index = layer.tips($(this).text(), $(this), {
                tips: 3,
                time: 0
            });
        }).on('mouseleave', $(this), function () {
            layer.close(tip_index);
        });
        var tip_index;
        $('.tips').on('mouseenter', function () {
            tip_index = layer.tips($(this).text(), $(this), {
                tips: 3,
                time: 0
            });
        }).on('mouseleave', $(this), function () {
            layer.close(tip_index);
        });
    });
};

//询底价 立即预约按钮
$(".jxs_list").on("click",' .app-fun',function () {
    var vid = $(this).attr('vid');
    var jingxiaoshangid=$(this).attr("jingxiaoshangid");
    var pro_id = $('.pro_local').find('option:selected').attr('pro_id');
    var city_id = $('.city_local').find('option:selected').attr('city_id');
    var pro = $('.pro_local').find('option:selected').attr('name');
    var city = $('.city_local').find('option:selected').attr('name');
    $("#province").find("option").each(function () {
        if($(this).attr("name")==pro){
            $(this).prop('selected', 'selected').siblings().removeAttr("selected");
        }
    })
    var cityName=$('#province option:selected').attr("name");
    $("#city").html('');
    $.getCity(pro_id, function (res) {
        var str = "";
        $.each(res.items, function (index, obj) {
            if (!isEmpty(cityName) && city.indexOf(obj.name) > -1) {
                str += "<option city_id='"+obj.id+"' selected='selected'  name='"+obj.name+"'  value='" + obj.id + "'>" + obj.name + "</option>";
            } else {
                str += "<option city_id='"+obj.id+"'   name='"+obj.name+"'  value='" + obj.id + "'>" + obj.name + "</option>";
            }
        })
        $("#city").html(str);
    })

    $("#city").find("option[name = '"+city+"']").attr('selected', 'selected');
    $(".select-jxs").html('');
    $.getDealer(getDealerUtm(),city, function (res) {
        var str = '';
        $.each(res.items, function (index, val) {
            if (jingxiaoshangid == val.jingxiaoshangid) {
                str += '<option selected="selected" jxs_id="' + val.jingxiaoshangid + '" dizhi="' + val.dizhi + '" dianhua="' + val.dianhua + '">' + val.gongsi + '</option>';
                $(".address-msg").children().css("visibility", "visible");
                $(".address-msg .t").eq(0).find('img').css("visibility", "visible");
                $('.address-msg .title').text(val.gongsi);
                $('.address-msg .t').eq(0).find('span').text(val.dizhi);
                $('.address-msg .t').eq(1).find('span').text(val.dianhua);
            }else{
                str += '<option jxs_id="' + val.jingxiaoshangid + '" dizhi="' + val.dizhi + '" dianhua="' + val.dianhua + '">' + val.gongsi + '</option>';

            }

        });
        $(".select-jxs").html(str);
    });
    //滚动到顶部
    $('html, body').animate({
        scrollTop: $("#liuzi").offset().top+50
    }, 500);
})


/**
 * 询底价 是省份城市经销商联动
 */
$('.pro_local').on('change', function () {
    var pro_id = $(this).find('option:selected').attr('pro_id');
    getInquiryCity(pro_id);
});
//询底价 城市选择框触发
$('.city_local').on('change', function () {
    var cityName = $('.city_local').find('option:selected').val();
    getInquiryJxs(cityName);
    $('.jxs_list').html('');
    $('html,body').animate({
        scrollTop: $(".inquiry").offset().top - 200
    })
});
//搜索经销商
$('.icon_search').on('click', function () {
    var cityName = $('.city_local').find('option:selected').val();
    getInquiryJxs(cityName);
    $('.jxs_list').html('');
});


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
            str += '<option name="'+val.name+'" city_id="' + val.id + '">' + val.name + '</option>';
        });
        $('.select').eq(2).html(str);
        //更新经销商信息
        updateJxs(res.items[0].name);
    });

};

//更新经销商信息
function updateJxs(cityName, type) {
    $.getDealer(getDealerUtm(), cityName, function (res) {
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
   // var chexing = $('.select').eq(0).find('option:selected').val();
    var name = $('.form-div').eq(0).val();
    var mobile = $('.form-div').eq(1).val();
    var pro_id = $('#province').find('option:selected').attr('pro_id');
    var city_id = $('#city').find('option:selected').attr('city_id');
    var jxs_id = $('.select').eq(3).find('option:selected').attr('jxs_id');
    var myregmobile = /^(1(([34578][0-9])|(47)|[8][01236789]))\d{8}$/;

    // console.log(name);
    // if (!chexing || chexing == '') {
    //     tijiao = 0;
    //     layer.msg('请选择车型');
    //     return false
    // }
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
    if (!$("#js_agreement").is(":checked")) {
        tijiao = 0;
        layer.msg('请点击同意隐私条款');
        return false
    }
    var data = {
        // car:chexing,
        name: name,
        mobile: mobile,
        cityId: city_id, //预约市
        jxs_id: jxs_id, //经销商id
        provinceId: pro_id, //预约省
        utm: utm,
        channel:channel
    }
    $.sendData(data, function (res) {
        if (res.msg.indexOf('成功') > -1) {
            layer.msg('预约成功',function(){
                _pt_sp_2.push('setCustomEvent',{eventName:'QC PC 预约成功'});
                tijiao = 0;
                $('.form-div').eq(0).val('');
                $('.form-div').eq(1).val('');
                $('.form-div').eq(2).val('');
                $("#js_agreement").removeAttr("checked");
            });
        } else {
            layer.msg(res.msg,function(){
                tijiao = 0;
                $('.form-div').eq(0).val('');
                $('.form-div').eq(1).val('');
                $('.form-div').eq(2).val('');
                $("#js_agreement").removeAttr("checked");
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
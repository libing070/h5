var utm = 'm75';
var channel=1;
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

function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}

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
    var mm = getQueryVariable("utm");
    switch(mm) {
        case 'm75': return 'm21';
        case 'm76': return 'm22';
        case 'm77': return 'm23';
        case 'm78': return 'm24';
        case 'm79': return 'm1';
        case 'm80': return 'm2';
        case 'm81': return 'm3';
        case 'm82': return 'm5';
    }
    return "m21";
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
                str += "<option selected='selected' name='"+obj.name+"'  value='" + obj.id + "'>" + obj.name + "</option>";
            } else {
                str += "<option  name='"+obj.name+"'  value='" + obj.id + "'>" + obj.name + "</option>";
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
                str += "<option selected='selected'  name='"+obj.name+"'  value='" + obj.id + "'>" + obj.name + "</option>";
            } else {
                str += "<option  name='"+obj.name+"'  value='" + obj.id + "'>" + obj.name + "</option>";
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
            $('#liuzi_call_now').attr('href','javascript:return false;');
        }
        $.each(res.items, function (index, obj) {
            if (index == 0) {
                $('.no-message').hide();
                $('.message').show();
                str += "<option address='" + obj.dizhi + "' phone='" + obj.dianhua + "' tel='" + obj.tel + "' selected='selected'  value='" + obj.jingxiaoshangid + "' >" + obj.gongsi + "</option>";
                $("#dealer_title").html(obj.gongsi);
                $("#dealer_address").html(obj.dizhi);
                $("#dealer_mobile").html(obj.dianhua);
                $('#liuzi_call_now').attr('href', 'tel:' + obj.tel);
            } else {
                str += "<option address='" + obj.dizhi + "' phone='" + obj.dianhua + "' tel='" + obj.tel + "'  value='" + obj.jingxiaoshangid + "'>" + obj.gongsi + "</option>";
            }
        })
        $("#dealer").html(str);
    })
}


// window._pt_lt = new Date().getTime();
// window._pt_sp_2 = [];
// _pt_sp_2.push('setAccount,79caef96');
// var _protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
// (function () {
//     var atag = document.createElement('script'); atag.type = 'text/javascript'; atag.async = true;
//     atag.src = _protocol + 'js.ptengine.cn/79caef96.js';
//     var s = document.getElementsByTagName('script')[0];
//     s.parentNode.insertBefore(atag, s);
// })();
//
// var pt_mark = 1;
// document.addEventListener("scroll",function(){
//  var y = document.documentElement.scrollTop || window.pageYOffset;
//     console.log(y)
//  if((y >= 400 && pt_mark == 1) &&  document.location.href.indexOf("http://ai.audi.cn/wap/sports-3/index.html") > -1){
//    _pt_sp_2.push('setCustomEvent',{eventName:'SP到达第二屏'});
//    pt_mark = 0;
//  }else if((y >= 400 && pt_mark == 1) && document.location.href.indexOf("http://ai.audi.cn/pc/sports-3/index.html") > -1){
//   _pt_sp_2.push('setCustomEvent',{eventName:'PC到达第二屏'});
//    pt_mark = 0;
//  }
// },false)

$(function () {
    utm = getQueryVariable('utm');
    channel = getQueryVariable('channel');
    var itemsJpg=['kv1.jpg','kv1.jpg'];
    var pos = Math.floor(Math.random()*itemsJpg.length);
    var item = itemsJpg[pos];
    $('.first').css("background-image","url(./images/"+item+")");
    setTimeout(function () {
        $('.first').css("display","none");
        $('.contentBody').css("display","block");
    $(".video").css("height", $(".video").height() + 'px');
    $(".video").css("width", $(".video").width() + 'px');

    }, 1500);


    var index = getQueryVariable('index');
    if (index == '8') {
        $('html, body').animate({
            scrollTop: $(".liuzi").offset().top
        }, 500);
    }

    $.share({
        title: '奥迪旅行车家族，活出生命的辽阔',
        desc: 'allroad邀您共同打开辽阔人生',
        imgUrl: 'weixin_share.jpg'
    });

$(".inquiryPrice").on("mousedown",'.app-fun',function () {
    $(this).css("background-color","rgb( 173, 38, 53 )");
    var vid = $(this).attr('vid');
    var jingxiaoshangid=$(this).attr("jingxiaoshangid");
    var pro = $('.inquiryPrice .replaceInput').val().replace(/\s+/g, "").split('/')[0];
    var city = $('.inquiryPrice .replaceInput').val().replace(/\s+/g, "").split('/')[1];
    var keyword = $('.keyword').val();
    $("#province").find("option").each(function () {
        if(pro.indexOf($(this).attr("name"))>-1){
            $(this).prop('selected', 'selected').siblings().removeAttr("selected");
        }
    })
    var provinceId = $('#province option:selected').val();
    var cityName=$('#province option:selected').attr("name");
    $("#city").html('');
    $.getCity(provinceId, function (res) {
        var str = "";
        $.each(res.items, function (index, obj) {
            if (!isEmpty(cityName) && city.indexOf(obj.name) > -1) {
                str += "<option selected='selected'  name='"+obj.name+"'  value='" + obj.id + "'>" + obj.name + "</option>";
            } else {
                str += "<option  name='"+obj.name+"'  value='" + obj.id + "'>" + obj.name + "</option>";
            }
        })
        $("#city").html(str);
    })

    $("#city").find("option[name = '"+city+"']").attr('selected', 'selected');
    $("#dealer").html('');
    $.getDealer(getDealerUtm(), city, function (res) {
        var str = "";
        if (res.items.length == 0) {
            $('.message').hide();
            $('.no-message').show();
            str += "<option   value=''>无</option>";
            $('#liuzi_call_now').attr('href','javascript:return false;');
        }
        $.each(res.items, function (index, obj) {
            if (jingxiaoshangid == obj.jingxiaoshangid) {
                $('.no-message').hide();
                $('.message').show();
                str += "<option address='" + obj.dizhi + "' phone='" + obj.dianhua + "' tel='" + obj.tel + "' selected='selected'  value='" + obj.jingxiaoshangid + "' >" + obj.gongsi + "</option>";
                $("#dealer_title").html(obj.gongsi);
                $("#dealer_address").html(obj.dizhi);
                $("#dealer_mobile").html(obj.dianhua);
                $('#liuzi_call_now').attr('href', 'tel:' + obj.tel);
            } else {
                str += "<option address='" + obj.dizhi + "' phone='" + obj.dianhua + "' tel='" + obj.tel + "'  value='" + obj.jingxiaoshangid + "'>" + obj.gongsi + "</option>";
            }
        })
        $("#dealer").html(str);
    })

    $('html, body').animate({
        scrollTop: $("#liuzi").offset().top
    }, 500);

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


    $(".btn-change").on('click', function () {
        catTypeSwiper.slideNext(speed);
    })

    //根据定位设置省份
    initPosition(function () {
        makeProvince(position.province, function (provinceId) {
            makeCity(provinceId, position.city);
            var str = '';
            str = position.province + ' / ' + position.city;
            $('#replaceInput').val(str);
            if (str) {
                //获取搜索默认经销商
                getSearchDistri($('.replaceInput').val().replace(/\s+/g, "").split('/')[1]);
            }
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
        $('#liuzi_call_now').attr('href', 'tel:' + obj.attr('tel'));
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
        if (!$("#js_agreement").is(":checked")) {
            tijiao = 0;
            layer.msg('请点击同意隐私条款');
            return false
        }
        var data = {
            name: realname,
            car: car,
            mobile: user_mobile,
            cityId: cityId, //预约市
            jxs_id: jxsId, //经销商id
            provinceId: provinceId, //预约省
            utm: utm,
            channel:channel
        }
        $.sendData(data, function (res) {
            if (res.msg.indexOf('成功') > -1) {
                layer.msg('预约成功', function () {
                    _pt_sp_2.push('setCustomEvent',{eventName:'sports wap 预约成功'});
                    tijiao = 0;
                    $("#realname").val('');
                    $("#user_mobile").val('');
                    $("#js_agreement").removeAttr("checked");
                });
            } else {
                layer.msg(res.msg, function () {
                    tijiao = 0;
                    $("#realname").val('');
                    $("#user_mobile").val('');
                    $("#js_agreement").removeAttr("checked");

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
    $('.find_pop .mask,.shareBox .dn').on('click', function (event) {
        event.preventDefault();
        $('.find_pop').fadeOut();
        $('.media').fadeOut();
        $('body').css('overflow', 'scroll');
    });

    //分享
    $('.share').on('click', function () {
        $('.media').fadeOut();
        $('.shareBox').fadeIn();
        if(isWeiXin()){
            $('.shareBox').find('.wx').show();
        }else{
            $('.shareBox').find('.dn').show();

        }


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


    // 定位
    // function localBmap(cb) {
    //     var geolocation = new BMap.Geolocation();
    //     geolocation.getCurrentPosition(function (r) {
    //         // console.log(this.getStatus(), r, BMAP_STATUS_SUCCESS)
    //         if (this.getStatus() == BMAP_STATUS_SUCCESS) {
    //             position = r.address;
    //             var str = position.province + ' / ' + position.city;
    //             $(".tab1_4 .province").html(str);
    //             $('#replaceInput').val(str);
    //             if (str) {
    //                 //获取默认经销商
    //               //  defaultDistri(str.replace(/\s+/g, "").split('/')[1]);
    //               //  getProCity(str.replace(/\s+/g, "").split('/')[0], str.replace(/\s+/g, "").split('/')[1]);
    //                 //获取搜索默认经销商
    //                 getSearchDistri($('#replaceInput').val().replace(/\s+/g, "").split('/')[1]);
    //             }
    //             cb(r)
    //         }
    //     });
    // }
    // localBmap(function (r) {
    //     if (!r.address || r.address.province == '' || !r.address.province) {
    //         console.log(r);
    //         $.getLocationInfo(function (res) {
    //             if (res.code == 200) {
    //                 var str = '';
    //                 str = res.data.province + ' / ' + res.data.city;
    //                 $(".tab1_4 .province").html(str);
    //                 $('#replaceInput').val(str);
    //                 if (str) {
    //                     //获取默认经销商
    //                   //  defaultDistri(str.replace(/\s+/g, "").split('/')[1]);
    //                     //getProCity(str.replace(/\s+/g, "").split('/')[0], str.replace(/\s+/g, "").split('/')[1]);
    //                     //获取搜索默认经销商
    //                    getSearchDistri($('.replaceInput').val().replace(/\s+/g, "").split('/')[1]);
    //                 }
    //             }
    //         });
    //     }
    // });
    //获取搜索区域经销商
    function getSearchDistri(cityName) {
        var keyword = $('.keyword').val();
        // utm='m42';
        // channel='m42';
        $.getResultByParams({
            url: '?c=home&a=getjxss&format=json&utm=' + getDealerUtm() + '&_keyword=' + keyword + '&city=' + cityName + '&channel=' + channel,
            type: 'get'
        }, function (res) {
           //console.log(res);
                var dataPage = $('.look_more').attr('data-page'); //懒加载
                $('.inquiryPrice .distributor').html('');
                var distriStr = '';
                res.items.forEach((val, i) => {
                    distriStr += '<div class="list">' +
                        '<h3>' + val.gongsi + '</h3>' +
                        '<p><span class="icon dizhi"></span><span>' + val.dizhi + '</span></p>' +
                        '<p><span class="icon dianhua"></span><span>' + val.dianhua + '</span></p>' +
                        '<div class="btns">' +
                        '<a  jingxiaoshangid="'+val.jingxiaoshangid+'" class="app_now2 app-fun" vid="' + i + '" belong_id="' + val.id + '">立即预约</a>' +
                        '<a class="call_now" href="tel:' + val.tel + '">一键呼叫</a>' +
                        '</div>' +
                        '</div>';
                });
                $('.distributor').append(distriStr);
                if ((dataPage - 2) > $('.inquiryPrice .distributor').children().length || res.items.length <= 0) {
                    $('.look_more p').html('没有更多了!');
                    $('.look_more img').hide();
                } else {
                    $('.look_more p').html('滑动查看更多');
                    $('.look_more img').show();
                    $('.inquiryPrice .distributor').children().hide();
                    $('.inquiryPrice .distributor').children().slice(0, dataPage).show();
                    $('.look_more').attr('data-page', parseInt(dataPage) + 2);
                }
        });
    }


    //遮罩层事件
    $('.doubleSelect .mask').on('click', function (event) {
        event.preventDefault();
        $('.doubleSelect').hide();
        $('body').css('overflow', 'scroll');
    });
    //取消按钮事件
    $('.cancelBtn').on('click', function () {
        $('.doubleSelect').hide();
        $('body').css('overflow', 'scroll');
    });
    //搜索区域 定位框事件
    $('.replaceInput').on('click', function () {
        $('.doubleSelect2').show();
        $('body').css('overflow', 'hidden');
        var pro_city = $(this).val().replace(/\s+/g, "")
        var pro_name = pro_city.split('/')[0];
        var city_name = pro_city.split('/')[1];
        $('.look_more').attr('data-page', '2');
        getSearchPro(pro_name, city_name);
    });
    //搜索区域获取省份
    function getSearchPro(pro_name, city_name) {
        $.getResultByParams({
            url: '?c=home&a=getprovice',
            type: 'get'
        }, function (res) {
            var proStr = '';
            res.items.forEach((ele, index) => {
                if (pro_name == ele.name || pro_name.indexOf(ele.name) > -1) {
                    proStr += '<li id="' + ele.id + '" class="act">';
                    getSearchCity(ele.id, city_name);
                } else {
                    proStr += '<li id="' + ele.id + '" class="">';
                }
                proStr += '<span >' + ele.name + '</span>' +
                    '<span class="icon j_active"></span>' +
                    '</li>'
            });
            $('.doubleSelect2 .selectPro ul').html(proStr);
            $('.doubleSelect2 .selectPro ul li').on('click', function () {
                $('.doubleSelect2 .selectPro ul li').attr('class', '');
                $(this).attr('class', 'act');
                getSearchCity($(this).attr('id'), city_name);
            });
        });
    };
    //获取搜索区域城市列表
    function getSearchCity(id, city_name) {
        // utm='m42';
        // channel='m42';
        $.getResultByParams({
            url: '?c=home&a=getcity&provinceid=' + id + '&utm=' + utm + '&channel=' + channel,
            type: 'get'
        }, function (res) {
            var cityStr = '';
            res.items.forEach((ele, index) => {
                if (city_name == ele.name || city_name.indexOf(ele.name) > -1) {
                    cityStr += '<li class="act" city_id="' + ele.id + '">' +
                        '<span >' + ele.name + '</span>' +
                        '<span class="icon j_active"></span>' +
                        '</li>';
                } else {
                    cityStr += '<li class="" city_id="' + ele.id + '">' +
                        '<span >' + ele.name + '</span>' +
                        '<span class="icon j_active"></span>' +
                        '</li>';
                }
            });
            $('.doubleSelect2 .selectCity ul').html(cityStr);
            $('.doubleSelect2 .selectCity ul li').on('click', function () {
                $('.doubleSelect2 selectCity ul li').attr('class', '');
                $(this).attr('class', 'act');
                $('.doubleSelect2').hide();
                $('body').css('overflow', 'scroll');
                $('.replaceInput').val($(".doubleSelect2 .selectPro ul li[class='act']").find('span').html() + ' / ' + $(this).find('span').html());
                getSearchDistri($(this).find('span').html());
            });
        });
    };
    //滚动加载
    $(window).on('scroll', function () {
        var dataPage = $('.look_more').attr('data-page');
        if ((dataPage - 2) > $('.inquiryPrice .distributor').children().length || $('.inquiryPrice .distributor').children().length <= 0) {
            $('.look_more p').html('没有更多了!');
            $('.look_more img').hide()
        } else {
            $('.look_more p').html('滑动查看更多');
            $('.look_more img').show()
            if (getScrollHeight() == getWindowHeight() + getDocumentTop()) {
                $('.inquiryPrice .distributor').children().hide();
                $('.inquiryPrice .distributor').children().slice(0, dataPage).show();
                $('.look_more').attr('data-page', parseInt(dataPage) + 2);
            }
        }
    });
    //点击加载
    $('.look_more').on('click', function () {
        if ($('.look_more p').html() != '没有更多了!') {
            var dataPage = $('.look_more').attr('data-page');
            if ((dataPage - 2) > $('.inquiryPrice .distributor').children().length || $('.inquiryPrice .distributor').children().length <= 0) {
                $('.look_more p').html('没有更多了!');
                $('.look_more img').hide()
            } else {
                $('.look_more p').html('滑动查看更多');
                $('.look_more img').show()
                $('.inquiryPrice .distributor').children().hide();
                $('.inquiryPrice .distributor').children().slice(0, dataPage).show();
                $('.look_more').attr('data-page', parseInt(dataPage) + 2);
            }
        }
    });

    //搜索经销商
    $('.search .local2').on('click', function () {
        $('.look_more').attr('data-page', '2');
        var city = $('.inquiryPrice .replaceInput').val().replace(/\s+/g, "").split('/')[1];
        getSearchDistri(city);
    });


    //文档高度
    function getDocumentTop() {
        var scrollTop = 0,
            bodyScrollTop = 0,
            documentScrollTop = 0;
        if (document.body) {
            bodyScrollTop = document.body.scrollTop;
        }
        if (document.documentElement) {
            documentScrollTop = document.documentElement.scrollTop;

        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
    }

//可视窗口高度
    function getWindowHeight() {
        var windowHeight = 0;
        if (document.compatMode == "CSS1Compat") {
            windowHeight = document.documentElement.clientHeight;
        } else {
            windowHeight = document.body.clientHeight;
        }
        return windowHeight;
    }

//滚动条滚动高度
    function getScrollHeight() {
        var scrollHeight = 0,
            bodyScrollHeight = 0,
            documentScrollHeight = 0;
        if (document.body) {
            bodyScrollHeight = document.body.scrollHeight;
        }
        if (document.documentElement) {
            documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
        return scrollHeight;
    }

})







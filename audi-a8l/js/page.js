var utms = '';
var channel;

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return 'm42';
}
$(function () {
    utms = getQueryVariable('utm');
    channel = getQueryVariable('channel');
    console.log(utms);
    $("#utms").val(utms);
    setTimeout(function () {
        $('.first').hide();
        $('.content1').show();
    }, 1500);
    setTimeout(function () {
        if ($('.content2').css('display') != 'block') {
            $('.first').hide();
            $('.content1').show();
            goTop();
            var index = getQueryVariable('index');
            if (index == '5' || index == 5) {
                $('.content').hide();
                $('.content2').show();
                $('.tab_btns div').attr('class', 'float_left ');
                $('.tab_btns div').eq(1).attr('class', 'float_left act');
                $('html, body').animate({
                    scrollTop: $(".tab2_2").offset().top - 50
                }, 500);
            }
            // if (index == '7' || index == 7) {
            //     $('html, body').animate({
            //         scrollTop: $("#policy").offset().top - 200
            //     }, 500);
            // }
            if (index == '8' || index == 8) {
                $('html, body').animate({
                    scrollTop: $(".tab1_5").offset().top - 200
                }, 500);
            }
        }
    }, 1500);
});
$(function () {
    if (!document.getElementById) return false;
    //定义一个按钮，并获取这个按钮存在变量pingguo中
    if (isWeiXin()) {
        $(".shareBox").find(".wx").show();
        $(".shareBox").find(".dn").hide();
    } else {
        $(".shareBox").find(".wx").hide();
        $(".shareBox").find(".dn").show();
    }
    // 切换按钮
    $('.tab_btns div').on('click', function () {
        if ($(this).index() == 0) {
            $('.content').hide();
            $('.content1').show();
            $('.tab_btns div').attr('class', 'float_left')
            $(this).attr('class', 'float_left act');
            goTop();
            video1.pause();
        } else {
            $('.content').hide();
            $('.content2').show();
            $('.tab_btns div').attr('class', 'float_left')
            $(this).attr('class', 'float_left act');
            goTop();
            $('.video img').show();
        }
    });
    //跳转到留资
    $('.liuzi').on('click', function () {
        $('.content').hide();
        $('.content1').show();
        $('html, body').animate({
            scrollTop: $("#liuzi").offset().top
        }, 500);
        $('.tab_btns div').attr('class', 'float_left')
        $('.tab_btns div').eq(0).attr('class', 'float_left act');
    });

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
    // 留资省市列表唤起
    $('.province').on('click', function () {
        $('.doubleSelect').hide();
        $('.doubleSelect1').show();
        $('body').css('overflow', 'hidden');
    });

    // 定位
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
        console.log(this.getStatus(),r,BMAP_STATUS_SUCCESS)
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            position = r.address;
            var str = position.province + ' / ' + position.city;
            $(".tab1_4 .province").html(str);
            $('.InquiryPrice .replaceInput').html(str)
            if (str) {
                //获取默认经销商
                defaultDistri(str.replace(/\s+/g, "").split('/')[1]);
                getProCity(str.replace(/\s+/g, "").split('/')[0], str.replace(/\s+/g, "").split('/')[1]);
                //获取搜索默认经销商
                getSearchDistri($('.replaceInput').html().replace(/\s+/g, "").split('/')[1]);
            }
        } else {
            $.getLocationInfo(function (res) {
                if (res.code == 200) {
                    var str = '';
                    str = res.data.province + ' / ' + res.data.city;
                    $(".tab1_4 .province").html(str);
                    $('.InquiryPrice .replaceInput').html(str)
                    if (str) {
                        //获取默认经销商
                        defaultDistri(str.replace(/\s+/g, "").split('/')[1]);
                        getProCity(str.replace(/\s+/g, "").split('/')[0], str.replace(/\s+/g, "").split('/')[1]);
                        //获取搜索默认经销商
                        getSearchDistri($('.replaceInput').html().replace(/\s+/g, "").split('/')[1]);
                    }
                }
            });
        }
    });

    // 获取默认经销商
    function defaultDistri(localVal) {
        $.getProvince({
            url: '?c=home&a=getjxss&format=json&city=' + localVal + '&utm=' + utms + '&channel=' + channel,
            type: 'get'
        }, function (res) {
            if (res.items.length == 0) {
                haveData(true);
            } else {
                haveData(false);
            }
            $("#selectDistri").html('');
            res.items.forEach((val, i) => {
                $("#selectDistri").append('<option jxs_id="' + val.jingxiaoshangid + '" gongsi="' + val.gongsi + '" dizhi="' + val.dizhi + '" dianhua="' + val.dianhua + '" tel="' + val.tel + '">' + val.gongsi + '</option>')
            });
            $('.distri_local h3').html(res.items[0].gongsi);
            $('.distri_local .dizhi').html(res.items[0].dizhi);
            $('.distri_local .dianhua').html(res.items[0].dianhua);
            $('.call_now').attr('href', 'tel:' + res.items[0].tel);
            $('.app_now').attr('belong_id', res.items[0].id);
        });
    };

    // 省市列表
    function getProCity(pro_name, city_name) {
        $.getProvince({
            url: '?c=home&a=getprovice&utm=' + utms + '&channel=' + channel,
            type: 'get'
        }, function (res) {
            var proStr = '';
            res.items.forEach((ele, index) => {
                if (pro_name == ele.name || pro_name.indexOf(ele.name) > -1) {
                    proStr += '<li id="' + ele.id + '" class="act">';
                    $('.province').attr('yuyuesheng', ele.id);
                    getCity(ele.id, city_name);
                } else {
                    proStr += '<li id="' + ele.id + '" class="">';
                }
                proStr += '<span >' + ele.name + '</span>' +
                    '<span class="icon j_active"></span>' +
                    '</li>'
            });
            $('.doubleSelect1 .selectPro ul').html(proStr);
            $('.doubleSelect1 .selectPro ul li').on('click', function () {
                $('.doubleSelect1 .selectPro ul li').attr('class', '');
                $(this).attr('class', 'act');
                getCity($(this).attr('id'), $('.province').html().replace(/\s+/g, "").split('/')[1]);
            });
        });
    }
    //获取城市
    function getCity(id, city_name) {
        $.getProvince({
            url: '?c=home&a=getcity&provinceid=' + id + '&utm=' + utms + '&channel=' + channel,
            type: 'get'
        }, function (res) {
            var cityStr = '';
            res.items.forEach((ele, index) => {
                if (city_name == ele.name || city_name.indexOf(ele.name) > -1) {
                    cityStr += '<li class="act" city_id="' + ele.id + '">' +
                        '<span >' + ele.name + '</span>' +
                        '<span class="icon j_active"></span>' +
                        '</li>';
                    $('.province').attr('city_id', ele.id);
                } else {
                    cityStr += '<li class="" city_id="' + ele.id + '">' +
                        '<span >' + ele.name + '</span>' +
                        '<span class="icon j_active"></span>' +
                        '</li>';
                }
            });
            $('.doubleSelect1 .selectCity ul').html(cityStr);
            $('.doubleSelect1 .selectCity ul li').on('click', function () {
                $('.doubleSelect1 .selectCity ul li').attr('class', '');
                $(this).attr('class', 'act');
                $('.doubleSelect1').hide();
                $('body').css('overflow', 'scroll');
                $('.province').html($(".doubleSelect1 .selectPro ul li[class='act']").find('span').html() + ' / ' + $(this).find('span').html());
                getDistri($(this).find('span').html());
            });
        });
    }
    //获取经销商
    function getDistri(cityName) {
        console.log(cityName);
        $.getProvince({
            url: '?c=home&a=getjxss&format=json&city=' + cityName + '&utm=' + utms + '&channel=' + channel,
            type: 'get'
        }, function (res) {
            console.log(res)
            $("#selectDistri").html('');
            res.items.forEach((val, i) => {
                $("#selectDistri").append('<option jxs_id="' + val.jingxiaoshangid + '" gongsi="' + val.gongsi + '" dizhi="' + val.dizhi + '" dianhua="' + val.dianhua + '" tel="' + val.tel + '">' + val.gongsi + '</option>')
            });
            if (res.items.length == 0) {
                haveData(true);
            } else {
                haveData(false);
                $('.distri_local h3').html(res.items[0].gongsi);
                $('.distri_local .dizhi').html(res.items[0].dizhi);
                $('.distri_local .dianhua').html(res.items[0].dianhua);
                $('.call_now').attr('href', 'tel:' + res.items[0].tel);
                $('.app_now').attr('belong_id', res.items[0].id);
            }
        });
    }
    //选择框选中事件
    $('#selectDistri').change(function () {
        var dianhua = $(this).find("option:selected").attr('dianhua');
        var gongsi = $(this).find("option:selected").attr('gongsi');
        var dizhi = $(this).find("option:selected").attr('dizhi');
        var tel = $(this).find("option:selected").attr('tel');
        $('.distri_local h3').html(gongsi);
        $('.distri_local .dizhi').html(dizhi);
        $('.distri_local .dianhua').html(dianhua);
        $(".call_now").attr('href', 'tel:' + tel);
    });

    //搜索区域 定位框事件
    $('.replaceInput').on('click', function () {
        $('.doubleSelect2').show();
        $('body').css('overflow', 'hidden');
        var pro_city = $(this).text().replace(/\s+/g, "")
        var pro_name = pro_city.split('/')[0];
        var city_name = pro_city.split('/')[1];
        $('.look_more').attr('data-page', '2');
        getSearchPro(pro_name, city_name);
    });

    //搜索区域获取省份
    function getSearchPro(pro_name, city_name) {
        $.getProvince({
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
        $.getProvince({
            url: '?c=home&a=getcity&provinceid=' + id + '&utm=' + utms + '&channel=' + channel,
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
                $('.replaceInput').html($(".doubleSelect2 .selectPro ul li[class='act']").find('span').html() + ' / ' + $(this).find('span').html());
                getSearchDistri($(this).find('span').html());
            });
        });
    };

    //获取搜索区域经销商
    function getSearchDistri(cityName) {
        var keyword = $('.keyword').val();
        $.getProvince({
            url: '?c=home&a=getjxss&format=json&utm=' + utms + '&_keyword=' + keyword + '&city=' + cityName + '&channel=' + channel,
            type: 'get'
        }, function (res) {
            var dataPage = $('.look_more').attr('data-page'); //懒加载
            $('.InquiryPrice .distributor').html('');
            var distriStr = '';
            res.items.forEach((val, i) => {
                distriStr += '<div class="list">' +
                    '<h3>' + val.gongsi + '</h3>' +
                    '<p><span class="icon dizhi"></span><span>' + val.dizhi + '</span></p>' +
                    '<p><span class="icon dianhua"></span><span>' + val.dianhua + '</span></p>' +
                    '<div class="btns">' +
                    '<a class="app_now2" vid="' + i + '"onclick="appFun(this)" belong_id="' + val.id + '">立即预约</a>' +
                    '<a class="call_now" href="tel:' + val.tel + '">一键呼叫</a>' +
                    '</div>' +
                    '</div>';
            });
            $('.InquiryPrice .distributor').append(distriStr);
            if ((dataPage - 2) > $('.InquiryPrice .distributor').children().length || res.items.length <= 0) {
                $('.look_more p').html('没有更多了!');
                $('.look_more img').hide();
            } else {
                $('.look_more p').html('滑动查看更多');
                $('.look_more img').show();
                $('.InquiryPrice .distributor').children().hide();
                $('.InquiryPrice .distributor').children().slice(0, dataPage).show();
                $('.look_more').attr('data-page', parseInt(dataPage) + 2);
            }
        });
    }
    //滚动加载
    $(window).on('scroll', function () {
        var dataPage = $('.look_more').attr('data-page');
        if ((dataPage - 2) > $('.InquiryPrice .distributor').children().length || $('.InquiryPrice .distributor').children().length <= 0) {
            $('.look_more p').html('没有更多了!');
            $('.look_more img').hide()
        } else {
            $('.look_more p').html('滑动查看更多');
            $('.look_more img').show()
            if (getScrollHeight() == getWindowHeight() + getDocumentTop()) {
                $('.InquiryPrice .distributor').children().hide();
                $('.InquiryPrice .distributor').children().slice(0, dataPage).show();
                $('.look_more').attr('data-page', parseInt(dataPage) + 2);
            }
        }
    });
    //点击加载
    $('.look_more').on('click', function () {
        if ($('.look_more p').html() != '没有更多了!') {
            var dataPage = $('.look_more').attr('data-page');
            if ((dataPage - 2) > $('.InquiryPrice .distributor').children().length || $('.InquiryPrice .distributor').children().length <= 0) {
                $('.look_more p').html('没有更多了!');
                $('.look_more img').hide()
            } else {
                $('.look_more p').html('滑动查看更多');
                $('.look_more img').show()
                $('.InquiryPrice .distributor').children().hide();
                $('.InquiryPrice .distributor').children().slice(0, dataPage).show();
                $('.look_more').attr('data-page', parseInt(dataPage) + 2);
            }
        }
    });
    //搜索经销商
    $('.search .local2').on('click', function () {
        $('.look_more').attr('data-page', '2');
        var city = $('.InquiryPrice .replaceInput').html().replace(/\s+/g, "").split('/')[1];
        getSearchDistri(city);
    });
    //预约试驾
    //预约试驾
    var tijiao = 0;
    $('.app_now').on('click', function () {
        if (tijiao == 1) {
            return;
        }
        tijiao = 1;
        var name = $('.lc_input').eq(0).val();
        var mobile = $('.lc_input').eq(1).val();
        var cityId = $('.province').attr('city_id');
        var jxs_id = $('.distri').find('option:selected').attr('jxs_id');
        var myregmobile = /^(1(([34578][0-9])|(47)|[8][01236789]))\d{8}$/;
        var provinceId = $('.province').attr('yuyuesheng');
        // console.log(name, mobile, cityId, jxs_id, provinceId);
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
        if (!cityId) {
            tijiao = 0;
            layer.msg('请选择城市');
            return false
        }
        if (!jxs_id) {
            tijiao = 0;
            layer.msg('请选择经销商');
            return false
        }
        var utm = $('#utms').val();
        var data = {
            name: name,
            mobile: mobile,
            cityId: cityId, //预约市
            jxs_id: jxs_id, //经销商id
            provinceId: provinceId, //预约省
            utm: utm
        }
        $.ajax({
            url: 'controller/index.php?action=send',
            type: 'post',
            dataType: 'json',
            headers: {
                Accept: "application/json; charset=utf-8"
            },
            data: JSON.stringify(data),
            success: function (res) {
                console.log(res);
                if (res.msg.indexOf('成功') > -1) {
                    layer.msg('预约成功', function () {
                        tijiao = 0;
                        $('.lc_input').eq(0).val('');
                        $('.lc_input').eq(1).val('');
                    });
                    _pt_sp_2.push('setCustomEvent', {
                        eventName: 'A8L wap 预约成功'
                    });
                } else {
                    layer.msg(res.msg, function () {
                        tijiao = 0;
                        $('.lc_input').eq(0).val('');
                        $('.lc_input').eq(1).val('');
                    });
                }
            },
            error: function () {
                tijiao = 0;
                $('.lc_input').eq(0).val('');
                $('.lc_input').eq(1).val('');
            }
        })
    });
    //智能问答
    $('.medias img').eq(1).on('click', function () {
        window.location.href = 'http://ai.auto-smart.com/audi_a8l_mobile/robot.html?utm=' + utms + '&channel=' + channel;
    });
    //发现按钮
    $('.medias img').eq(0).on('click', function () {
        console.log(12)
        $('.find_pop').fadeIn();
        $('body').css('overflow', 'hidden');
    });
    //关闭发现媒体
    $('.find_pop .mask').on('click', function (event) {
        event.preventDefault();
        $('.find_pop').fadeOut();
        $('body').css('overflow', 'scroll');
        $('.media').fadeOut();
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
    //监控滚动高度位置变化
    $(window).on('scroll', function () {
        var offsetTop = $('header .headImg').height();
        if ($(window).scrollTop() >= offsetTop) {
            $('.tabSwitch').css({
                'position': 'fixed',
                'top': '0px'
            });
        } else {
            $('.tabSwitch').css({
                'position': 'absolute',
                'top': '100%'
            });
        }
        // 视频区域滑动过后暂停
        if ($('.tab2_2').offset().top - $(window).scrollTop() <= 0) {
            video1.pause();
            $('.video img').show();
        }

    });


    //文章列表滚动加载
    function articleScrollLoad() {
        var artNum = $('.look_more2').attr('artNum');
        if ((artNum - 2) > $('.tab2_4 .articles li').length) {
            $('.look_more2 p').html('已经到底了!');
            $('.look_more2 img').hide();
        } else {
            $('.tab2_4 .articles li').hide();
            $('.tab2_4 .articles li').slice(0, artNum).show();
            $('.look_more2').attr('artNum', parseInt(artNum) + 2);
        }
    }
    articleScrollLoad();
    //文章列表滚动加载
    $(window).on('scroll', function () {
        // console.log(0)
        if ($('.content2').css('display') == 'block') {
            if (getScrollHeight() == getWindowHeight() + getDocumentTop()) {
                articleScrollLoad();
            }
        }
    });
    //vr
    $('.vr').on('click', function () {
        $('#app2').show();
        $('body').css('overflow', 'hidden');
        $.intelligence({
            ele: '#app2'
        }, 'VR');
    });
    //关闭按钮
    $('#app2 .closeIframe').on('click', function () {
        $('body').css('overflow', 'scroll');
        $('#app2').hide();
    });
    //手机号长度限制
    $('.lc_input').eq(1).on('keyup', function () {
        var str = $(this).val();
        if (str.length > 11) {
            str = str.substring(0, 11);
            $(this).val('');
            $(this).val(str);
            layer.msg('长度不能超过11位');
        }
    });
    //视频播放
    $('.video img').on('click', function () {
        $(this).hide();
        video1.play();
    });
    // 视频暂停
    $('#video1').on('click', function () {
        console.log(1);
        video1.pause();
        $('.video img').show();
    });
    video1.addEventListener('ended', function () {
        this.currentTime = 0;
        $('.video img').show();
    });
    //点赞按钮
    $('.heart').on('click', function () {
        var evClick = $(this).attr('evClick');
        if (!evClick) {
            $(this).attr('evClick', true);
            var typeState = $(this).attr('type');
            var _this = $(this);
            $.addCarEvaluate(typeState, function (res) {
                if (res.code == 0) {
                    layer.msg('点赞成功');
                    _this.attr('src', './images/heart.png');
                    carEvaluat();
                }
            });
        } else {
            layer.msg('您已经点赞');
        }
    });
    //首屏滑动事件
    $('.first').on('touchend', function () {
        $(this).fadeOut(function () {});
        $('.content').fadeOut(function () {});
        $('.content1').fadeIn();
        goTop();
    });

});
//获取点赞列表
function carEvaluat() {
    $.getCarEvaluate(function (res) {
        if (res.code == 0) {
            var num = null;
            for (let i = 0; i < res.data.length; i++) {
                $('.eva_txt').eq(i).text(res.data[i].num);
                $('.heart').eq(i).attr('type', res.data[i].type);
                num += parseInt(res.data[i].num);
            }
            // rolling(num);
        }
    });
}
carEvaluat();
//没有数据的显示
function haveData(state) {
    if (state) {
        $('.distri').html('<option>暂无经销商</option>');
        $('.call_now').attr('href', 'javascript:;');
        $(".distri_local").children().css("visibility", "hidden");
        $(".distri_local .dizhi").css("visibility", "visible").html('该城市暂无经销商，请搜索周边城市！');
        $(".distri_local p").eq(0).css("text-align", "center");
        $(".distri_local .local").css("visibility", "hidden");
    } else {
        $(".distri_local p").eq(0).css("text-align", "left");
        $(".distri_local .local").css("visibility", "visible");
        $(".distri_local").children().css("visibility", "visible");
    }
}
//立即预约搜索区域传递留资
function appFun(_this) {
    var vid = $(_this).attr('vid');
    $('.province').html($('.InquiryPrice .replaceInput').html());
    //获取默认经销商
    // defaultDistri($('.InquiryPrice .replaceInput').html().replace(/\s+/g, "").split('/')[1]);
    var pro = $('.InquiryPrice .replaceInput').html().replace(/\s+/g, "").split('/')[0];
    var city = $('.InquiryPrice .replaceInput').html().replace(/\s+/g, "").split('/')[1];
    var keyword = $('.keyword').val();
    $.getProvince({
        url: '?c=home&a=getjxss&format=json&utm=' + utms + '&_keyword=' + keyword + '&city=' + city + '&channel=' + channel,
        type: 'get'
    }, function (res) {
        if (res.items.length == 0) {
            haveData(true);
        } else {
            haveData(false);
        }
        $("#selectDistri").html('');
        res.items.forEach((val, i) => {
            $("#selectDistri").append('<option jxs_id="' + val.jingxiaoshangid + '" gongsi="' + val.gongsi + '" dizhi="' + val.dizhi + '" dianhua="' + val.dianhua + '" tel="' + val.tel + '">' + val.gongsi + '</option>')
        });
        $("#selectDistri option").eq(vid).attr('selected', 'selected');
        $('.distri_local h3').html(res.items[vid].gongsi);
        $('.distri_local .dizhi').html(res.items[vid].dizhi);
        $('.distri_local .dianhua').html(res.items[vid].dianhua);
        $('.tab1_4 .call_now').attr('href', 'tel:' + res.items[vid].tel);
        $('.app_now').attr('belong_id', res.items[vid].id);
        $('.province').attr('yuyuesheng', $('.doubleSelect2 .selectPro .act').attr('id')).attr('city_id', $('.doubleSelect2 .selectCity .act').attr('city_id'));
        console.log()
    });
    $('html, body').animate({
        scrollTop: $("#liuzi").offset().top
    }, 500);

};
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

function isWeiXin() {
    //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
    var ua = window.navigator.userAgent.toLowerCase();
    //通过正则表达式匹配ua中是否含有MicroMessenger字符串
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

function goTop() {
    $('html,body').scrollTop(0);
}
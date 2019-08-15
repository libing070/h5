var fade = true;
window.onload = function () {
    //页面刷新回到顶部
    addEventListener("load", function () {
        setTimeout(hideURLbar, 0);
    }, false);

    function hideURLbar() {
        $('body').scrollTo(0, 1);
    };
    setTimeout(function () {
        if ($('.content2').css('display') != 'block') {
            $('.first').hide();
            $('.content1').show();
            goTop();
            var index = getQueryVariable('index');
            if (index == '5' || index == 5) {
                $('.content').hide();
                $('.content2').show();
                $('.header2 .btns a').attr('class', '');
                $('.header2 .btns a').eq(1).attr('class', 'active');
            }
            if (index == '7' || index == 7) {
                $('html, body').animate({
                    scrollTop: $("#policy").offset().top - 200
                }, 500);
            }
            if (index == '8' || index == 8) {
                $('html, body').animate({
                    scrollTop: $("#p4").offset().top - 200
                }, 500);
            }
        }
    }, 1500);
};


var utms = '';
// var pagesizedings = 2;
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return 'm43';
}


function getUtms() {
    if (utms == 'm70') {
        return 'm16';
    }
    if (utms == 'm71') {
        return 'm17';
    }
    if (utms == 'm72') {
        return 'm18';
    }
    if (utms == 'm73') {
        return 'm19';
    }
    if (utms == 'm74') {
        return 'm20';
    }
    return utms;
}




$(function () {
    utms = getQueryVariable('utm');
    if (utms.indexOf("?") > -1) {
        utms = utms.split("?")[0];
    }
    $(".distri_btns").css('margin-top', '0.4rem');
    $("#tiaokuan").show();

    $("#utms").val(utms);
})

var position;
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

    // 定位
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            position = r.address;
            var str = position.province + ' / ' + position.city;
            $(".p4 .replaceInput").html(str);
            var localVal = $('.InquiryPrice .replaceInput').html();
            localVal = localVal.replace(/\s+/g, "")
            localVal = localVal.split('/')[1];
            // console.log(localVal);
            if (localVal) {
                getDistri(localVal, 'search');
            }
        } else {
            //定位数据获取成功响应
            $.getLocationInfo(function (res) {
                // console.log(res);
                if (res.code == 200) {
                    var str = '';
                    str = res.data.province + ' / ' + res.data.city;
                    $(".p4 .replaceInput").html(str);
                    var localVal = $('.InquiryPrice .replaceInput').html();
                    localVal = localVal.replace(/\s+/g, "")
                    localVal = localVal.split('/')[1];
                    // console.log(localVal);
                    if (localVal) {
                        getDistri(localVal, 'search');
                    }
                }
            });
        }
        getPro('normal');
    }, function () {
        $.getLocationInfo(function (res) {
            // console.log(res);
            if (res.code == 200) {
                var str = '';
                str = res.data.province + ' / ' + res.data.city;
                $(".p4 .replaceInput").html(str);
                var localVal = $('.InquiryPrice .replaceInput').html();
                localVal = localVal.replace(/\s+/g, "")
                localVal = localVal.split('/')[1];
                // console.log(localVal);
                if (localVal) {
                    getDistri(localVal, 'search');
                }
            }
        });
        getPro('normal');
    });




    // 获取城市，省份列表
    function getPro(type, pro_name, city_name) {
        var curUtm = getUtms();
        if (type == 'app') { //预约
            $.getDistri({
                url: '/api/index.php?c=home&a=getprovice' + '&utm=' + curUtm
            }, function (res) {
                var proStr = '';
                res.items.forEach((ele, index) => {
                    if (pro_name == ele.name) {
                        proStr += '<li id="' + ele.id + '" class="act">';
                        getCity(ele.id, null, city_name);
                    } else {
                        proStr += '<li id="' + ele.id + '" class="">';
                    }
                    proStr += '<span >' + ele.name + '</span>' +
                        '<span class="icon j_active"></span>' +
                        '</li>'
                });
                $('.selectPro ul').html(proStr);

                $('.selectPro ul li').on('click', function () {
                    $('.selectPro ul li').attr('class', '');
                    $(this).attr('class', 'act');
                    getCity($(this).attr('id'));
                });
            });
        } else if (type == 'search') { //搜索
            $.getDistri({
                url: '/api/index.php?c=home&a=getprovice' + '&utm=' + curUtm
            }, function (res) {
                var proStr = '';
                res.items.forEach((ele, index) => {
                    if (pro_name == ele.name) {
                        proStr += '<li id="' + ele.id + '" class="act">';
                        getCity(ele.id, null, city_name);
                    } else {
                        proStr += '<li id="' + ele.id + '" class="">';
                    }
                    proStr += '<span >' + ele.name + '</span>' +
                        '<span class="icon j_active"></span>' +
                        '</li>'
                });
                $('.selectPro ul').html(proStr);
                // getCity($('.selectPro li').eq(0).attr('id'), type);
                $('.selectPro ul li').on('click', function () {
                    $('.selectPro ul li').attr('class', '');
                    $(this).attr('class', 'act');
                    getCity($(this).attr('id'), 'search');
                });
            });
        } else if (type == 'normal') {
            $.getDistri({
                url: '/api/index.php?c=home&a=getprovice' + '&utm=' + curUtm
            }, function (res) {
                // console.log(res);
                if (position == null || position == undefined) {
                    $.getLocationInfo(function (res2) {
                        // console.log(res2)
                        if (res2.code == 200) {
                            for (let i = 0; i < res.items.length; i++) {
                                if (res.items[i].name == res2.data.province) {
                                    var pro_id = res.items[i].id;
                                    // console.log(pro_id);
                                    $('.cityPut').html(res2.data.province + '/' + res2.data.city).attr('yuyuesheng', pro_id);
                                    getDistri(res2.data.city);
                                    $.getDistri({
                                        url: '/api/index.php?c=home&a=getcity&provinceid=' + pro_id + '&utm=' + curUtm
                                    }, function (resCity) {
                                        // console.log(resCity)
                                        resCity.items.forEach((val, k) => {
                                            if (val.name == res2.data.city) {
                                                $('.cityPut').attr('city_id', val.id);
                                            }
                                        });
                                    });
                                }
                            }
                        }
                    })
                } else {
                    for (let i = 0; i < res.items.length; i++) {
                        if (position.province.indexOf(res.items[i].name) > -1) {
                            var pro_id = res.items[i].id;
                            // console.log(pro_id);
                            $('.cityPut').html(position.province + '/' + position.city).attr('yuyuesheng', pro_id);
                            getDistri(position.city);
                            $.getDistri({
                                url: '/api/index.php?c=home&a=getcity&provinceid=' + pro_id + '&utm=' + curUtm
                            }, function (resCity) {
                                // console.log(resCity)
                                resCity.items.forEach((val, k) => {

                                    if (position.city.indexOf(val.name) > -1) {
                                        $('.cityPut').attr('city_id', val.id);
                                    }

                                });
                            });
                        }
                    }
                }
            });
        }

    };
    //获取城市关联列表
    function getCity(id, type, city_name) {
        var curUtm = getUtms();
        $.getDistri({
            url: '/api/index.php?c=home&a=getcity&provinceid=' + id + '&utm=' + curUtm
        }, function (res) {
            var cityStr = '';
            res.items.forEach((ele, index) => {
                if (city_name == ele.name) {
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
            $('.selectCity ul').html(cityStr);
            $('.selectCity ul li').on('click', function () {
                $('.look_more p').html('滑动查看更多');
                $('.look_more img').show();
                $('.selectCity ul li').attr('class', '');
                $(this).attr('class', 'act');
                $('.doubleSelect').hide();
                if ($('#click_type').attr('type2') != 'search') {
                    $('.cityPut').html($(".selectPro ul li[class='act']").find('span').html() + ' / ' + $(this).find('span').html());
                    getDistri($(this).find('span').html());
                    $('.cityPut').attr('city_id', $(this).attr('city_id'));
                } else {
                    $('.look_more').attr('data-page', '2');
                    $('.p4 .replaceInput').html($(".selectPro ul li[class='act']").find('span').html() + ' / ' + $(this).find('span').html());
                    getDistri($(this).find('span').html(), $('#click_type').attr('type2'));
                }
            });
        });
    };
    //获取城市经销商
    var showList = 0;

    function getDistri(val, type, searchVal) {
        var curUtm = getUtms();
        showList = 0;
        var valStr = val;
        var cheName = 'che';
        var url = {};
        if (searchVal != '' && searchVal) {
            url = {
                url: '/api/index.php?c=home&a=getjxss&format=json&q=q&webtype=mobile&che=' + cheName + '&q=1&utm=' + curUtm + '&_keyword=' + searchVal + '&city=' + valStr
            }
        } else {
            url = {
                url: '/api/index.php?c=home&a=getjxss&format=json&city=' + valStr + '&utm=' + curUtm
            }
        }
        $.getDistri(url, function (res) {
            if (type != 'search') {
                // console.log(res)
                $("#selectDistri").html('');
                res.items.forEach((val, i) => {
                    $("#selectDistri").append('<option jxs_id="' + val.jingxiaoshangid + '" gongsi="' + val.gongsi + '" dizhi="' + val.dizhi + '" dianhua="' + val.dianhua + '" tel="' + val.tel + '">' + val.gongsi + '</option>')
                });
                if (res.items.length == 0) {
                    $("#selectDistri").append('<option>无</option>');
                    $(".distri_local").children().css("visibility", "hidden");
                    $(".distri_local .dizhi").css("visibility", "visible").html('该城市暂无经销商，请搜索周边城市！');
                    $(".distri_local p").eq(0).css("text-align", "center");
                    $(".distri_local .local").css("visibility", "hidden");
                } else {
                    $(".distri_local p").eq(0).css("text-align", "left");
                    $(".distri_local .local").css("visibility", "visible");
                    $(".distri_local").children().css("visibility", "visible");
                    $('.distri_local h3').html(res.items[0].gongsi);
                    $('.distri_local .dizhi').html(res.items[0].dizhi);
                    $('.distri_local .dianhua').html(res.items[0].dianhua);
                    $('.call_now').attr('href', 'tel:' + res.items[0].tel);
                    $('.app_now').attr('belong_id', res.items[0].id);
                }
            } else { //搜索区域
                var dataPage = $('.look_more').attr('data-page'); //懒加载
                $('.InquiryPrice .distributor').html('');
                var distriStr = '';
                res.items.forEach((val, i) => {
                    if (++i <= dataPage) {
                        distriStr += '<div class="list">' +
                            '<h3>' + val.gongsi + '</h3>' +
                            '<p><span class="icon dizhi"></span><span>' + val.dizhi + '</span></p>' +
                            '<p><span class="icon dianhua"></span><span>' + val.dianhua + '</span></p>' +
                            '<div class="btns">' +
                            '<button class="app_now2" vid="' + (i - 1) + '" onclick="appFun(this)" belong_id="' + val.id + '">立即预约</button>' +
                            '<a class="call_now" href="tel:' + val.tel + '">一键呼叫</a>' +
                            '</div>' +
                            '</div>';
                    }
                });
                $('.InquiryPrice .distributor').append(distriStr);
                $('.look_more').attr('data-page', parseInt(dataPage) + 2);
                if (dataPage > res.items.length) {
                    // alert('没有更多了');
                    showList = 1;
                    $('.look_more p').html('已经到底了！');
                    $('.look_more img').hide();
                }
            }
            $('body').css('overflow', 'scroll');
        });
    }

    // 留咨输入框点击事件
    $('.cityPut').on('click', function () {
        $('#click_type').attr('type2', 'noSearch');
        $('.doubleSelect').show();
        $('body').css('overflow', 'hidden');
        var pro_city = $(this).text().replace(/\s+/g, "")
        var pro_name = pro_city.split('/')[0];
        var city_name = pro_city.split('/')[1];

        getPro('app', pro_name, city_name);
    });
    //取消按钮事件
    $('.cancelBtn').on('click', function () {
        $('.doubleSelect').hide();
        $('body').css('overflow', 'scroll');
    });
    //遮罩层事件
    $('.doubleSelect .mask').on('click', function (event) {
        event.preventDefault();
        $('.doubleSelect').hide();
        $('body').css('overflow', 'scroll');
    });
    //搜索区域 定位框事件
    $('.replaceInput').on('click', function () {
        $('#click_type').attr('type2', 'search');
        $('.doubleSelect').show();
        $('body').css('overflow', 'hidden');
        var pro_city = $(this).text().replace(/\s+/g, "")
        var pro_name = pro_city.split('/')[0];
        var city_name = pro_city.split('/')[1];
        console.log(pro_name)
        getPro('search', pro_name, city_name);
    });
    //滚动加载
    $(window).on('scroll', function () {
        if (showList == 1) {
            return;
        }
        var curUtm = getUtms();
        if (getScrollHeight() == getWindowHeight() + getDocumentTop()) {
            var localVal = $('.InquiryPrice .replaceInput').html();
            localVal = localVal.replace(/\s+/g, "").split('/')[1];
            var searchVal = $('.search_distri input').val();
            var localVal_1 = $('.InquiryPrice .replaceInput').html().replace(/\s+/g, "").split('/')[0];
            var localVal_2 = $('.InquiryPrice .replaceInput').html().replace(/\s+/g, "").split('/')[1];
            var localValS = localVal_1 + '-' + localVal_2;
            var url = {};
            if (searchVal) {
                url = {
                    url: '/api/index.php?c=home&a=getjxss&format=json&q=q&webtype=mobile&che=che&q=1&utm=' + curUtm + '&_keyword=' + searchVal + '&city=' + localValS
                }
            } else {
                url = {
                    url: '/api/index.php?c=home&a=getjxss&format=json&city=' + localVal + '&utm=' + curUtm
                }
            }
            $.getDistri(url, function (res) {
                var dataPage = $('.look_more').attr('data-page'); //懒加载
                $('.InquiryPrice .distributor').html('');
                var distriStr = '';
                res.items.forEach((val, i) => {
                    if (++i <= dataPage) {
                        distriStr += '<div class="list">' +
                            '<h3>' + val.gongsi + '</h3>' +
                            '<p><span class="icon dizhi"></span><span>' + val.dizhi + '</span></p>' +
                            '<p><span class="icon dianhua"></span><span>' + val.dianhua + '</span></p>' +
                            '<div class="btns">' +
                            '<button class="app_now2" vid="' + (i - 1) + '" onclick="appFun(this)" belong_id="' + val.id + '">立即预约</button>' +
                            '<a class="call_now" href="tel:' + val.tel + '">一键呼叫</a>' +
                            '</div>' +
                            '</div>';
                    }
                });
                $('.InquiryPrice .distributor').append(distriStr);
                $('.look_more').attr('data-page', parseInt(dataPage) + 2);
                if (dataPage > res.items.length) {
                    // alert('没有更多了');
                    $('.look_more p').html('已经到底了！');
                    $('.look_more img').hide();
                }
            });
        }
    });
    //点击加载
    $('.look_more').on('click', function () {
        if (showList == 1) {
            return;
        }
        var curUtm = getUtms();
        if (getScrollHeight() == getWindowHeight() + getDocumentTop()) {
            var localVal = $('.InquiryPrice .replaceInput').html();
            localVal = localVal.replace(/\s+/g, "").split('/')[1];
            var searchVal = $('.search_distri input').val();
            var localVal_1 = $('.InquiryPrice .replaceInput').html().replace(/\s+/g, "").split('/')[0];
            var localVal_2 = $('.InquiryPrice .replaceInput').html().replace(/\s+/g, "").split('/')[1];
            var localValS = localVal_1 + '-' + localVal_2;
            var url = {};
            if (searchVal) {
                url = {
                    url: '/api/index.php?c=home&a=getjxss&format=json&q=q&webtype=mobile&che=che&q=1&utm=' + curUtm + '&_keyword=' + searchVal + '&city=' + localValS
                }
            } else {
                url = {
                    url: '/api/index.php?c=home&a=getjxss&format=json&city=' + localVal + '&utm=' + curUtm
                }
            }
            $.getDistri(url, function (res) {
                var dataPage = $('.look_more').attr('data-page'); //懒加载
                $('.InquiryPrice .distributor').html('');
                var distriStr = '';
                res.items.forEach((val, i) => {
                    if (++i <= dataPage) {
                        distriStr += '<div class="list">' +
                            '<h3>' + val.gongsi + '</h3>' +
                            '<p><span class="icon dizhi"></span><span>' + val.dizhi + '</span></p>' +
                            '<p><span class="icon dianhua"></span><span>' + val.dianhua + '</span></p>' +
                            '<div class="btns">' +
                            '<button class="app_now2" vid="' + (i - 1) + '" onclick="appFun(this)" belong_id="' + val.id + '">立即预约</button>' +
                            '<a class="call_now" href="tel:' + val.tel + '">一键呼叫</a>' +
                            '</div>' +
                            '</div>';
                    }
                });
                $('.InquiryPrice .distributor').append(distriStr);
                $('.look_more').attr('data-page', parseInt(dataPage) + 2);
                if (dataPage > res.items.length) {
                    // alert('没有更多了');
                    $('.look_more p').html('已经到底了！');
                    $('.look_more img').hide();
                }
            });
        }
    })
    //搜索经销商
    $('.local2').on('click', function () {
        $('.look_more p').html('滑动查看更多');
        $('.look_more img').show();
        $('.look_more').attr('data-page', 2);
        var localVal = $('.InquiryPrice .replaceInput').html();
        localVal = localVal.replace(/\s+/g, "");
        var localVal_1 = localVal.replace(/\s+/g, "").split('/')[0];
        var localVal_2 = localVal.replace(/\s+/g, "").split('/')[1];
        var localValS = localVal_1 + '-' + localVal_2;
        var value = $('.search_distri input').val();
        if (value == undefined || value == '' || value == null) {
            getDistri(localVal_2, 'search');
        } else {
            getDistri(localValS, 'search', value);
        }
    });
    //选择框选中事件
    $('#selectDistri').change(function () {
        // console.log($(this).find("option:selected").attr('dianhua'));
        var dianhua = $(this).find("option:selected").attr('dianhua');
        var gongsi = $(this).find("option:selected").attr('gongsi');
        var dizhi = $(this).find("option:selected").attr('dizhi');
        var tel = $(this).find("option:selected").attr('tel');
        $('.distri_local h3').html(gongsi);
        $('.distri_local .dizhi').html(dizhi);
        $('.distri_local .dianhua').html(dianhua);
        $(".call_now").attr('href', 'tel:' + tel);
    });
    //智能问答
    $('.footer ul li').eq(1).on('click', function () {
        // $('#app').show();
        // $('body').css('overflow', 'hidden');
        // $.intelligence({
        //     ele: '#app'
        // });
        window.location.href = 'http://ai.auto-smart.com/audi_q5l_mobile/robot.html?utm=' + utms;
    });
    //关闭智能问答区域
    $('.closeIframe').on('click', function () {
        $('#app,#app2').hide();
        $('body').css('overflow', 'scroll');
    });
    //回到顶部
    $('.footer ul li').eq(0).on('click', function () {
        $('.content').hide();
        $('.content1').show();
        $('html,body').animate({
            scrollTop: 0
        }, 'slow');
        goTop();
    });
    //发现按钮
    $('.footer ul li').eq(2).on('click', function () {
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
    //分享
    $('.xiaochengxu').on('click', function () {
        $('.media').fadeOut();
        $('.xcxBox').fadeIn();
    });
    //预约试驾
    var tijiao = 0;
    $('.app_now').on('click', function () {
        if (tijiao == 1) {
            return;
        }
        tijiao = 1;
        var utm = $('#utms').val();

        if ($('#xieyi').is(':checked') == true) {} else {
            tijiao = 0;
            layer.msg('请点击同意隐私条款');
            return false;
        }

        var name = $('.liuzi .put').eq(0).find('input').val();
        var mobile = $('.liuzi .put').eq(1).find('input').val();
        var city = $('.liuzi .put').eq(2).find('div').attr('city_id');
        var distritor = $('.liuzi .put').eq(3).find('option:selected').attr('jxs_id');
        var myregmobile = /^(1(([34578][0-9])|(47)|[8][01236789]))\d{8}$/;
        var yuyuesheng = $('.liuzi .put').eq(2).find('div').attr('yuyuesheng');
        // console.log(name);
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
        if (!city) {
            tijiao = 0;
            layer.msg('请选择城市');
            return false
        }
        if (!distritor) {
            tijiao = 0;
            layer.msg('请选择经销商');
            return false
        }
        var data = {
            name: name,
            mobile: mobile,
            cityId: city, //预约市
            jxs_id: distritor, //经销商id
            provinceId: yuyuesheng, //预约省
            utm: utm
        }
        var channel = getQueryVariable('channel');
        if (channel != 'm43') {
            if (channel.indexOf("?") > -1) {
                channel = utms.split("?")[0];
            }
            console.log(channel);
            data.channel = channel;
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
                if (res.msg.indexOf('成功') > -1) {
                    layer.msg('预约成功', function () {
                        tijiao = 0;
                        $('.liuzi .put').eq(0).find('input').val('');
                        $('.liuzi .put').eq(1).find('input').val('');
                        $('#xieyi').prop("checked", false);
                    });
                    _pt_sp_2.push('setCustomEvent', {
                        eventName: 'Q5L wap 预约成功'
                    });
                } else {
                    layer.msg(res.msg, function () {
                        tijiao = 0;
                        $('.liuzi .put').eq(0).find('input').val('');
                        $('.liuzi .put').eq(1).find('input').val('');
                    });
                }
                try {
                    stm_clicki('send', 'event', {
                        customActionId: 1,
                        customActionLabel1: name,
                        customActionLabel2: mobile,
                        customActionLabel3: $('.liuzi .put').eq(2).find('div').html(),
                        customActionLabel4: $('.liuzi .put').eq(3).find('option:selected').html(),
                        customActionLabel5: utm
                    });

                } catch (e) {

                }

            },
            error: function () {
                tijiao = 0;
                $('.liuzi .put').eq(0).find('input').val('');
                $('.liuzi .put').eq(1).find('input').val('');
            }
        })
    });

    //手机号长度限制
    $('.put').eq(1).find('input').on('keyup', function () {
        var str = $(this).val();
        if (str.length > 11) {
            str = str.substring(0, 11);
            $(this).val('');
            $(this).val(str);
            layer.msg('长度不能超过11位');
        }
    });
    //首屏滑动事件
    $('.first').on('touchend', function () {
        $(this).fadeOut(function () {});
        $('.content').fadeOut(function () {});
        $('.content1').fadeIn();
        goTop();
    });
    //尊享礼遇
    $('.header2 .btns a').eq(0).on('click', function () {
        $('.header2 .btns a').attr('class', '');
        $(this).attr('class', 'active');
        $('.content').hide();
        $('.content1').show();
        goTop();
    });
    $('.header2 .btns a').eq(1).on('click', function () {
        fade = false;
        $('.header2 .btns a').attr('class', '');
        $(this).attr('class', 'active');
        $('.content').hide();
        $('.content2').show();
        goTop();
    });

    //解决fixed被软键盘顶起
    $("body").find("input[type=text]").each(function () {
        $(this).bind('focus', function () {
            $('footer').css('position', 'static');
        }).bind('blur', function () {
            $('footer').css({
                'position': 'fixed',
                'bottom': '0'
            });
        });
    });
    $('.goPolicy').on('click', function () {
        $('html, body').animate({
            scrollTop: $("#policy").offset().top - 200
        }, 500);
    });
});


function appFun(_this) {
    var curUtm = getUtms();
    $('.cityPut').html($('.InquiryPrice .replaceInput').html());
    var city = $('.InquiryPrice .replaceInput').html();
    city = city.replace(/\s+/g, "")
    city = city.split('/')[1];
    var vid = $(_this).attr('vid');
    var url = {
        url: '/api/index.php?c=home&a=getjxss&format=json&city=' + city + '&utm=' + curUtm
    }
    var searchVal = $('.search_distri input').val();
    if (searchVal != null && searchVal != undefined && searchVal != '') {
        var localVal = $('.InquiryPrice .replaceInput').html();
        localVal = localVal.replace(/\s+/g, "");
        var localVal_1 = localVal.replace(/\s+/g, "").split('/')[0];
        var localVal_2 = localVal.replace(/\s+/g, "").split('/')[1];
        var localValS = localVal_1 + '-' + localVal_2;
        var cheName = 'che';
        url = {
            url: '/api/index.php?c=home&a=getjxss&format=json&q=q&webtype=mobile&che=' + cheName + '&q=1&utm=' + curUtm + '&_keyword=' + searchVal + '&city=' + localValS
        }
    }
    $.getDistri(url, function (res) {
        $("#selectDistri").html('');
        res.items.forEach((val, i) => {
            $("#selectDistri").append('<option jxs_id="' + val.jingxiaoshangid + '" gongsi="' + val.gongsi + '" dizhi="' + val.dizhi + '" dianhua="' + val.dianhua + '" tel="' + val.tel + '">' + val.gongsi + '</option>')
        });
        $("#selectDistri option").eq(vid).attr('selected', 'selected');
        $('.distri_local h3').html(res.items[vid].gongsi);
        $('.distri_local .dizhi').html(res.items[vid].dizhi);
        $('.distri_local .dianhua').html(res.items[vid].dianhua);
        $('.call_now').attr('href', 'tel:' + res.items[vid].tel);
        $('.app_now').attr('belong_id', res.items[vid].id);
        $(".distri_local p").eq(0).css("text-align", "left");
        $(".distri_local .local").css("visibility", "visible");
        $(".distri_local").children().css("visibility", "visible");
    });
    $('html,body').animate({
        scrollTop: 0
    }, 'slow');
}

// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(onSuccess, onError);
// } else {
//     console.log("您的浏览器不支持使用HTML 5来获取地理位置服务");
// }
//定位数据获取成功响应
function onSuccess(position) {
    console.log('纬度: ' + position.coords.latitude + '\n' +
        '经度: ' + position.coords.longitude + '\n' +
        '海拔: ' + position.coords.altitude + '\n' +
        '水平精度: ' + position.coords.accuracy + '\n' +
        '垂直精度: ' + position.coords.altitudeAccura)
}
//定位数据获取失败响应
function onError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.log("您拒绝对获取地理位置的请求");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("位置信息是不可用的");
            break;
        case error.TIMEOUT:
            console.log("请求您的地理位置超时");
            break;
        case error.UNKNOWN_ERROR:
            console.log("未知错误");
            break;
    }
}

function goTop() {
    $('html,body').scrollTop(0);
}

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
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
    return 'm42';
}

$(function () {
    utms = getQueryVariable('utm');
    var index = getQueryVariable('index');
    if (index == '5' || index == 5) {
        $('html, body').animate({
            scrollTop: $("#paramete").offset().top - 200
        }, 500);
    }
    if (index == '7' || index == 7) {
        $('html, body').animate({
            scrollTop: $("#policy").offset().top - 150
        }, 500);
    }
    if (index == '8' || index == 8) {
        $('html, body').animate({
            scrollTop: $("#inquiry").offset().top - 200
        }, 500);
    }
});


$(function () {


    //获取定位位置
    $.getLocationInfo(function (res) {
        //获取省份
        getProviceDefult(res.data.province, res.data.city);
    });

    //获取省份
    function getProviceDefult(provinceName, cityName) {
        var parame = {
            url: '/api/index.php?c=home&a=getprovice'+'&utm='+utms
        };
        $.getDistri(parame, function (res) {
            var str = '';
            res.items.forEach((val, key) => {
                str += '<option pro_id="' + val.id + '">' + val.name + '</option>';
            });
            $('.select').eq(0).append(str);
            $('.pro_local').append(str);

            //获取默认省份
            res.items.forEach((val, key) => {
                if (provinceName == val.name) {
                    // var k = key++;
                    $('.select').eq(0).find('option').eq(key + 1).attr("selected", 'selected');
                    $('.pro_local').find('option').eq(key).attr("selected", 'selected');
                    //获取默认城市
                    getCityDefult(val.id, cityName);
                }
            });
        });
    }

    //获取默认城市
    function getCityDefult(pro_id, cityName) {
        var parame = {
            url: '/api/index.php?c=home&a=getcity&provinceid=' + pro_id+'&utm='+utms
        };
        $.getDistri(parame, function (res) {
            var str = '';
            res.items.forEach((val, key) => {
                str += '<option city_id="' + val.id + '">' + val.name + '</option>';
            });
            $('.select').eq(1).append(str);
            $('.city_local').append(str);
            //获取默认城市
            res.items.forEach((val, key) => {
                if (cityName == val.name) {
                    $('.select').eq(1).find('option').eq(key + 1).attr("selected", 'selected');
                    $('.city_local').find('option').eq(key).attr("selected", 'selected');
                    //获取默认经销行
                    getJxsDefult(val.name);
                    // 留资获取默认城市经销商
                    var proName = $('.pro_local').val();
                    var searchVal = $('.search_put input').val();
                    getInquiryJxs(proName, val.name, searchVal);
                }
            });

        });
    }

    //获取默认经销商
    function getJxsDefult(cityName) {
        var parame = {
            url: '/api/index.php?c=home&a=getjxss&format=json&city=' + cityName+'&utm='+utms
        };
        $.getDistri(parame, function (res) {
            var str = '';
            res.items.forEach((val, key) => {
                str += '<option jxs_id="' + val.jingxiaoshangid + '" dizhi="' + val.dizhi + '" dianhua="' + val.dianhua + '">' + val.gongsi + '</option>';

            });
            $('.select').eq(2).append(str);
            //留资默认经销商
            $('.select').eq(2).find('option').eq(1).attr("selected", 'selected');
            $('.address-msg .title').text(res.items[0].gongsi);
            $('.address-msg .t').eq(0).find('span').text(res.items[0].dizhi);
            $('.address-msg .t').eq(1).find('span').text(res.items[0].dianhua);
        });
    };
    /**
     * 各类页面交互事件
     */

    //留资省份选择
    $('.select').eq(0).on('change', function () {
        var pro_id = $(this).find('option:selected').attr('pro_id');
        getCitySelect(pro_id);
    });
    //留资城市选择
    $('.select').eq(1).on('change', function () {
        var cityName = $(this).find('option:selected').val();
        updateJxs(cityName);
    });
    //留资经销商选择
    $('.select').eq(2).on('change', function () {
        var dizhi = $(this).find('option:selected').attr('dizhi');
        var dianhua = $(this).find('option:selected').attr('dianhua');
        var gongsi = $(this).find('option:selected').val();
        $('.address-msg .title').text(gongsi);
        $('.address-msg .t').eq(0).find('span').text(dizhi);
        $('.address-msg .t').eq(1).find('span').text(dianhua);
    });

    //选择框选择省份拉取城市
    function getCitySelect(pro_id, type) {
        var parame = {
            url: '/api/index.php?c=home&a=getcity&provinceid=' + pro_id+'&utm='+utms
        };
        $.getDistri(parame, function (res) {
            var str = '';
            res.items.forEach((val, key) => {
                str += '<option city_id="' + val.id + '">' + val.name + '</option>';
            });
            $('.select').eq(1).html(str);
            //更新经销商信息
            updateJxs(res.items[0].name);
        });

    };

    //更新经销商信息
    function updateJxs(cityName, type) {
        var parame = {
            url: '/api/index.php?c=home&a=getjxss&format=json&city=' + cityName+'&utm='+utms
        };
        $.getDistri(parame, function (res) {
            var str = '';
            res.items.forEach(function (val, key) {
                str += '<option jxs_id="' + val.jingxiaoshangid + '" dizhi="' + val.dizhi + '" dianhua="' + val.dianhua + '">' + val.gongsi + '</option>';
            });
            if (res.items.length == 0) {
                $(".address-msg").children().css("visibility", "hidden");
                $(".address-msg .t").eq(0).find('img').css("visibility", "hidden");
                str += '<option>无</option>';
                $('.select').eq(2).html(str);
                $('.address-msg .title').text('');
                $(".address-msg .t").eq(0).find('span').html('该城市暂无经销商，请搜索周边城市！');
                $(".address-msg .t").eq(0).css("visibility", "visible");
                $('.address-msg .t').eq(1).find('span').text('');
            } else {
                $('.select').eq(2).html(str);
                $(".address-msg").children().css("visibility", "visible");
                $(".address-msg .t").eq(0).find('img').css("visibility", "visible");
                $('.select').eq(2).find('option').eq(0).attr("selected", 'selected');
                $('.address-msg .title').text(res.items[0].gongsi);
                $('.address-msg .t').eq(0).find('span').text(res.items[0].dizhi);
                $('.address-msg .t').eq(1).find('span').text(res.items[0].dianhua);
            }

        });
    };


    /**
     * 询底价 是省份城市经销商联动
     */
    $('.pro_local').on('change', function () {
        var pro_id = $(this).find('option:selected').attr('pro_id');
        getInquiryCity(pro_id);
    });
    //询底价 城市选择框触发
    $('.city_local').on('change', function () {
        var proName = $('.pro_local').find('option:selected').val();
        var cityName = $('.city_local').find('option:selected').val();
        var searchVal = $('.search_put input').val();
        getInquiryJxs(proName, cityName, searchVal);
        $('.jxs_list').html('');
    });
    //搜索经销商
    $('.icon_search').on('click', function () {
        var proName = $('.pro_local').find('option:selected').val();
        var cityName = $('.city_local').find('option:selected').val();
        var searchVal = $('.search_put input').val();
        getInquiryJxs(proName, cityName, searchVal);
        $('.jxs_list').html('');
    });
    // 查看更多点击事件
    // $('.moreThan').on('click', function () {
    //     var proName = $(this).find('option:selected').val();
    //     var cityName = $('.city_local').find('option:selected').val();
    //     var searchVal = $('.search_put input').val();
    //     var load_num = parseInt($(this).attr('load_num'));
    //     getInquiryJxs(proName, cityName, searchVal, load_num);
    //     $(this).attr('load_num', load_num += 2);
    // });

    /**
     * 询底价处 按关键字搜索经销商
     */
    function getInquiryJxs(proName, cityName, searchVal, load_num) {
        var pro_city = proName + '-' + cityName;
        // $('.jxs_list').html(''); //清空经销商信息列表
        // if (!load_num) {
        //     var load_num = 2;
        // }
        var parame = {
            url: '/api/index.php?c=home&a=getjxss&format=json&q=q&webtype=mobile&che=' + cheName + '&q=1&utm=' + utms + '&_keyword=' + searchVal + '&city=' + pro_city
        };
        $.getDistri(parame, function (res) {
            var str = '';
            res.items.forEach((val, key) => {
                str += '<li class="">' +
                    '<div class="jxs_info">' +
                    '<h3>' + val.gongsi + '</h3>' +
                    '<p><span class="local_icon"></span>' + val.dizhi + '</p>' +
                    '<p><span class="phone_icon"></span>' + val.dianhua + '</p>' +
                    '<a href="javascript:void(0);" onclick="appFun(this)" vid="' + key + '">立即预约</a>' +
                    '</div>' +
                    '</li>';
            });
            if (res.items == null || res.items.length == 0) {
                $('.moreThan').hide();
                str += '<p style="text-align: center">抱歉，没有搜索到相关信息</p>';
            } else {
                $('.moreThan').show();
            }
            $('.jxs_list').html(str);
        });
    };

    function getInquiryCity(pro_id) {
        var parame = {
            url: '/api/index.php?c=home&a=getcity&provinceid=' + pro_id+'&utm='+utms
        };
        $.getDistri(parame, function (res) {
            var str = '';
            str += '<option city_id="">请选择</option>';
            res.items.forEach((val, key) => {
                str += '<option city_id="' + val.id + '">' + val.name + '</option>';
            });
            $('.city_local').html(str);
            // var proName = $(this).find('option:selected').val();
            // var cityName = $('.city_local').find('option:selected').val();
            // var searchVal = $('.search_put input').val();
            //getInquiryJxs(proName, cityName, searchVal);
        });
    };

    /**
     * 预约试驾提交
     */
    var tijiao = 0;
    $('.btn-msg').on('click', function () {
        if (tijiao == 1) {
            return;
        }
        tijiao = 1;
        var name = $('.form-div').eq(0).find('input').val();
        var mobile = $('.form-div').eq(1).find('input').val();
        var pro_id = $('.form-div').eq(2).find('option:selected').attr('pro_id');
        var city_id = $('.form-div').eq(3).find('option:selected').attr('city_id');
        var jxs_id = $('.form-div').eq(4).find('option:selected').attr('jxs_id');
        var myregmobile = /^(1(([34578][0-9])|(47)|[8][01236789]))\d{8}$/;

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
        // var utm = $('#utms').val();
        var data = {
            name: name,
            mobile: mobile,
            cityId: city_id, //预约市
            jxs_id: jxs_id, //经销商id
            provinceId: pro_id, //预约省
            utm: utms
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
                    tijiao = 0;
                    $('.form-div').eq(0).find('input').val('');
                    $('.form-div').eq(1).find('input').val('');
                    layer.msg('预约成功', function () {});
                    _pt_sp_2.push('setCustomEvent', {
                        eventName: 'A6L pc 预约成功'
                    });
                } else {
                    tijiao = 0;
                    $('.form-div').eq(0).find('input').val('');
                    $('.form-div').eq(1).find('input').val('');
                    layer.msg(res.msg, function () {});
                }
            },
            error: function () {
                tijiao = 0;
                $('.form-div').eq(0).find('input').val('');
                $('.form-div').eq(1).find('input').val('');
            }
        });
    });
    //手机号长度限制
    $('.form-div').eq(1).find('input').on('keyup', function () {
        var str = $(this).val();
        if (str.length > 11) {
            str = str.substring(0, 11);
            $(this).val('');
            $(this).val(str);
            layer.msg('长度不能超过11位');
        }
    });

    $('.c2_5 .articles li a').on('click', function () {
        $('.evaluation_pop').show();
        // $('.evaluation_pop iframe').attr('src', $(this).attr('data-framescure'));
        var framescure = $(this).attr('data-framescure')
        $('#myframe1Div').load(framescure);
    });
    $('.evaluation_pop .closeIframe').on('click', function () {
        $('.evaluation_pop').hide();
    });

    //获取点赞列表
    function carEvaluat() {
        $.getCarEvaluate(function (res) {
            if (res.code == 0) {
                var num = null;
                for (let i = 0; i < res.data.length; i++) {
                    $('.eva_1').eq(i).find('.eva_num').text(res.data[i].num);
                    $('.eva_1').eq(i).find('.eva_icon').attr('type', res.data[i].type);
                    num += parseInt(res.data[i].num);
                }
                rolling(num);
            }
        });
    }

    carEvaluat();
    //计算轮子滚动距离
    // 宽度最小55 最大70
    function rolling(num) {
        for (let i = 0; i < $('.eva_1').length; i++) {
            var cur_num = parseInt($('.eva_1').eq(i).find('.eva_num').text()); //当前点赞数
            var total_length = 75 - 45; //25 可操作区间
            var proportion = cur_num / num; //比例
            var finish_w = total_length * proportion; //最终的宽度百分比
            $('.eva_1').eq(i).find('.grad_left').css('width', (45 + finish_w) + '%');
            $('.eva_1').eq(i).find('.grad_right').css('width', (55 - finish_w) + '%');
            // console.log(finish_w)
        }
    };
    //点赞按钮
    $('.eva_icon').on('click', function () {
        var evClick = $(this).attr('evClick');
        if (!evClick) {
            $(this).attr('evClick', true);
            var type = $(this).attr('type');
            var _this = $(this);
            $.addCarEvaluate(type, function (res) {
                if (res.code == 0) {
                    layer.msg('点赞成功');
                    _this.find('img').attr('src', './images/hreat_2.png');
                    carEvaluat();
                }
            });
        } else {
            layer.msg('您已经点赞');
        }
    });
    //滚动到金融政策
    $('.goPolicy').on('click', function () {
        $('html, body').animate({
            scrollTop: $("#policy").offset().top - 150
        }, 500);
    });

});

//询底价 立即预约按钮
function appFun(_this) {
    var vid = $(_this).attr('vid');
    //vid++;
    var pro_id = $('.pro_local').find('option:selected').attr('pro_id');
    var city_id = $('.city_local').find('option:selected').attr('city_id');
    // var jxs_id = $('.city_local').find('option:selected').attr('city_id');
    $('.form-div').eq(2).find('option[pro_id="' + pro_id + '"]').attr('selected', true);

    // $('.form-div').eq(3).find('option[city_id="' + city_id + '"]').attr('selected', true);
    var parame = {
        url: '/api/index.php?c=home&a=getcity&provinceid=' + pro_id+'&utm='+utms
    };
    $.getDistri(parame, function (res) {
        var str = '';
        res.items.forEach((val, key) => {
            str += '<option city_id="' + val.id + '">' + val.name + '</option>';
        });
        $('.select').eq(1).html(str);
        $('.select').eq(1).find('option[city_id="' + city_id + '"]').attr('selected', true);

        var proName = $('.pro_local').find('option:selected').val();
        var cityName = $('.city_local').find('option:selected').val();
        var searchVal = $('.search_put input').val();
        var localValS = proName + '-' + cityName;
        var url = {
            url: '/api/index.php?c=home&a=getjxss&format=json&city=' + cityName+'&utm='+utms
        };
        if (searchVal != null && searchVal != undefined && searchVal != '') {
            url = {
                url: '/api/index.php?c=home&a=getjxss&format=json&q=q&webtype=mobile&che=che&q=1&utm=' + utms + '&_keyword=' + searchVal + '&city=' + localValS
            }
        }
        $.getDistri(url, function (res2) {
            console.log(res2);
            var str2 = '';
            res2.items.forEach((val2, key) => {
                str2 += '<option jxs_id="' + val2.jingxiaoshangid + '" dizhi="' + val2.dizhi + '" dianhua="' + val2.dianhua + '">' + val2.gongsi + '</option>';

            });
            $('.select').eq(2).html(str2);
            $('.select').eq(2).find('option:eq(' + vid + ')').attr('selected', true);
            $('.address-msg .title').text(res2.items[vid].gongsi);
            $('.address-msg .t').eq(0).find('span').text(res2.items[vid].dizhi);
            $('.address-msg .t').eq(1).find('span').text(res2.items[vid].dianhua);
            $(".address-msg").children().css("visibility", "visible");
            $(".address-msg .t").eq(0).find('img').css("visibility", "visible");
        });
    });
    //滚动到顶部
    $('html,body').animate({
        scrollTop: 0
    }, 'slow');
}
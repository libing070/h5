var seed={};
function getSeed(length){
    if(seed[length] == undefined || seed[length] == null){
        var arr = new Array();
        for(var i=length;i>0;i--){
            arr.push(Math.ceil(Math.random() * i) - 1);
        }
        seed[length]=arr;
    }
    return seed[length];
}

function randomSort(arr){
    if (arr==null) return [];
    var arrLen=arr.length;
    if(arrLen == 1 || arrLen == 0) {
        return arr;
    }
    var newArr=[];
    var curSeed=getSeed(arrLen);
    for(var i = 0; i < arrLen; i++){
        newArr.push(arr[curSeed[i]]);
        arr.splice(curSeed[i],1)
    }
    return newArr;
}
var cheName = 'che';
var utm = 'm427';
var channel=1;

function getDealerUtm() {
    var mm = getQueryVariable("utm");
    switch(mm) {
        case 'm427': return 'm73';
        case 'm428': return 'm73';
        case 'm429': return 'm74';
        case 'm430': return 'm75';
        case 'm431': return 'm75';
        case 'm432': return 'm76';
        case 'm433': return 'm77';
        case 'm434': return 'm78';
        case 'm435': return 'm79';
        case 'm436': return 'm80';
        case 'm437': return 'm81';
        case 'm438': return 'm81';
        case 'm439': return 'm82';
        case 'm440': return 'm83';
        case 'm441': return 'm84';
        case 'm442': return 'm84';
        case 'm443': return 'm85';
        case 'm444': return 'm86';
        case 'm445': return 'm87';
        case 'm446': return 'm88';
        case 'm447': return 'm89';
        case 'm448': return 'm73';
    }
    return "m73";
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


//添加元素显示事件处理
var orgShow = $.fn.show;
$.fn.show = function() {
	if ($(this).attr("onShowEvent")!=null) {
		$(this).trigger('onShowEvent');
	}
    orgShow.apply( this, arguments );
    return this;
}

//数组中删除指定元素
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

function resetVideo() {
    videoLen=$("video").length;
    for(var i=0;i<videoLen;i++){
        $("video").get(i).pause();
        $("video").eq(i).hide().prev().show();
        $("video").eq(i).prev().css("opacity","1");
    }
}


$(function(){
    utm = getQueryVariable('utm');
    channel = getQueryVariable('channel');

    var pt_mark = 1;
    document.addEventListener("scroll",function(){
        var y = document.documentElement.scrollTop || window.pageYOffset;
        if((y >= 400 && pt_mark == 1) &&  document.location.href.indexOf("ai.audi.cn/wap/") > -1){
            _pt_sp_2.push('setCustomEvent',{eventName:'q3 wap 到达第二屏'});
            pt_mark = 0;
        }else if((y >= 400 && pt_mark == 1) && document.location.href.indexOf("ai.audi.cn/pc/") > -1){
            _pt_sp_2.push('setCustomEvent',{eventName:'q3 pc 到达第二屏'});
            pt_mark = 0;
        }
    },false)


    var banner1 = new Swiper('.banner1 .swiper-container', {
        slidesPerView: 1,
        loop:true,
        // spaceBetween: 30,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        preventClicksPropagation: false,
        pagination: {
            el: '.banner1 .swiper-pagination',
            clickable: true,
        },
        // navigation: {
        //     nextEl: '.banner1 .swiper-button-next',
        //     prevEl: '.banner1 .swiper-button-prev',
        // },
        autoplay: {
            disableOnInteraction: false, //手动滑动之后不打断播放
            delay: 3000
        },
    });

    var banner2 = new Swiper('.banner2 .swiper-container', {
        slidesPerView: 1,
        loop:true,
        // spaceBetween: 30,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        preventClicksPropagation: false,
        pagination: {
            el: '.banner2 .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.banner2 .swiper-button-next',
            prevEl: '.banner2 .swiper-button-prev',
        },
        autoplay: {
            disableOnInteraction: false, //手动滑动之后不打断播放
            delay: 3000
        },
    });



    var peizhi = new Swiper('.peizhi .swiper-container', {
        slidesPerView: 1,
        // spaceBetween: 30,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        preventClicksPropagation: false,
        on:{
            slideChangeTransitionStart: function(event){
                console.log(this.activeIndex);
                if(this.activeIndex==4){
                    $(".tmall-wrap").fadeIn();
                }else{
                    $(".tmall-wrap").fadeOut();
                }
            },
        },
        pagination: {
            el: '.peizhi .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.peizhi .swiper-button-next',
            prevEl: '.peizhi .swiper-button-prev',
        },
    });

    var activeswiperleft=$(".active-swiper-left");
    for(var i=0;i<activeswiperleft.length;i++){
       new Swiper($(activeswiperleft[i]).find('.swiper-container'), {
            slidesPerView: 1,
            // spaceBetween: 30,
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true, //修改swiper的父元素时，自动初始化swiper
            preventClicksPropagation: false,
           loop:true,
            pagination: {
                el: '.left-swiper-pagination-'+(i+1),
                clickable: true,
            },
        });

    }
    var activeswiperright=$(".active-swiper-right");
    for(var i=0;i<activeswiperright.length;i++){
     new Swiper($(activeswiperright[i]).find('.swiper-container'), {
            slidesPerView: 1,
            // spaceBetween: 30,
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true, //修改swiper的父元素时，自动初始化swiper
            preventClicksPropagation: false,
            pagination: {
                el: '.right-swiper-pagination-'+(i+1),
                clickable: true,
            },
            on:{
                'click':function (e) {

                    var dom=e.target;
                    var type= $(".city-list .item.active").attr("type");
                    if($(dom).hasClass("video-bg1")){
                        resetVideo();
                        $(".active-swiper-box"+type+" .active-swiper-right").find(".swiper-slide").eq(this.clickedIndex).find(".video-bg1").css("z-index","-1").css("opacity","0").next().css("z-index","1");
                        $(".active-swiper-box"+type+" .active-swiper-right").find(".swiper-slide").eq(this.clickedIndex).find("video").css("display","block");
                        $(".active-swiper-box"+type+" .active-swiper-right").find(".swiper-slide").eq(this.clickedIndex).find("video").get(0).play();
                    }

                },
                slideChangeTransitionEnd: function(event){
                    var type= $(".city-list .item.active").attr("type");
                    $(".active-swiper-box"+type+" .active-swiper-right").each(function () {
                        $(this).find("video").get(0).pause();
                        $(this).find("video").get(1).pause();
                        $(this).find("video").get(2).pause();
                        $(this).find("video").get(3).pause();
                        $(this).find(".video-bg1").css("z-index","1").css("opacity","1");
                        $(this).find("video").css("z-index","-1");
                    })
                },
            }
        });
    }


    $(".active-swiper-right").on("click",function (e) {
        var dom=e.target;
        var type= $(".city-list .item.active").attr("type");
        if($(dom).hasClass("video-bg1")){
            resetVideo();
            $(".active-swiper-box"+type+" .active-swiper-right").find(".video-bg1").css("z-index","-1").css("opacity","0").next().css("z-index","1");
            $(".active-swiper-box"+type+" .active-swiper-right").find("video").css("display","block");
            $(".active-swiper-box"+type+" .active-swiper-right").find("video").get(0).play();
        }
    });

//---------视频播放处理开始-----------
//     var video = document.getElementById("video");
//     $(".video-bg").on('click', function () {
//         resetVideo();
//         $('.video-bg').hide();
//         $("#video").fadeIn();
//         video.play();
//
//     })
//     video.addEventListener('pause',function(){
//         // $("#video").fadeOut();
//         // $('.video-bg').show();
//     })
    //---------视频播放处理结束-----------

    //获取定位位置
    $.getLocationInfo(function (res) {
        //获取省份
        getProviceDefult(res.data.province, res.data.city);
    });
//获取省份
    function getProviceDefult(provinceName, cityName) {
        $.getProvince( function (res) {
            var str = '';
            res.items.forEach(function(val, key) {
                str += '<option name="'+val.name+'" pro_id="' + val.id + '">' + val.name + '</option>';
            });
            $('#province').append(str);
            $('.pro_local').append(str);

            //获取默认省份
            res.items.forEach(function(val, key) {
                if (provinceName == val.name) {
                    $('#province').find('option').eq(key + 1).attr("selected", 'selected');
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
            res.items.forEach(function(val, key) {
                str += '<option name="'+val.name+'" city_id="' + val.id + '">' + val.name + '</option>';
            });
            $('#city').append(str);
            $('.city_local').append(str);
            //获取默认城市
            res.items.forEach(function(val, key) {
                if (cityName == val.name) {
                    $('#city').find('option').eq(key + 1).attr("selected", 'selected');
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
            res.items=randomSort(res.items);
            var str = '';
            res.items.forEach(function(val, key)  {
                str += '<option jxs_id="' + val.jingxiaoshangid + '" dizhi="' + val.dizhi + '" dianhua="' + val.dianhua + '">' + val.gongsi + '</option>';

            });
            $('#jxsSelect').append(str);
            //留资默认经销商
            $('#jxsSelect').find('option').eq(1).attr("selected", 'selected');
            $('.address-msg .title').text(res.items[0].gongsi);
            $('.address-msg .t').eq(0).find('.key').text(res.items[0].dizhi);
            $('.address-msg .t').eq(1).find('.key').text(res.items[0].dianhua);
        });
    };
    function getInquiryCity(pro_id) {
        $.getResultByParams({
            data:{
                'c':'home',
                'a':'getcity',
                'provinceid':pro_id,
                'utm':utm,
                'channel':channel
            }
            // url: '?c=home&a=getcity&provinceid=' + pro_id + '&utm=' + utm + '&channel=' + channel,
            // type: 'get'
        }, function (res) {
            var str = '';
            str += '<option city_id="">请选择</option>';
            res.items.forEach(function(val, key) {
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
            data:{
                'c':'home',
                'a':'getjxss',
                'format':'json',
                'utm':getDealerUtm(),
                '_keyword':keyword,
                'city':cityName,
                'channel':channel

            }
            // url: '?c=home&a=getjxss&format=json&utm=' + getDealerUtm() + '&_keyword=' + keyword + '&city=' + cityName + '&channel=' + channel,
            // type: 'get'
        }, function (res) {
            res.items=randomSort(res.items);
            var str = '';
            res.items.forEach(function(val, key) {
                str += '<li class="">' ;
                str += '<div class="jxs_info">' ;
                str += '<h4>' + val.gongsi + '</h4>' ;
                str += '<p class=""><span class="local_icon"></span>' + val.dizhi + '</p>' ;
                str += '<p><span class="phone_icon"></span>' + val.dianhua + '</p>' ;
                str +=  '<a class="app-fun" jingxiaoshangid="'+val.jingxiaoshangid+'" href="javascript:void(0);"  vid="' + key + '">立即预约</a>' ;
                str +=  '</div>' ;
                str +=  '</li>';
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


//留资省份选择
    $('#province').on('change', function () {
        var pro_id = $(this).find('option:selected').attr('pro_id');
        getCitySelect(pro_id);
    });
//留资城市选择
    $('#city').on('change', function () {
        var cityName = $(this).find('option:selected').val();
        updateJxs(cityName);
    });
//留资经销商选择
    $('#jxsSelect').on('change', function () {
        var dizhi = $(this).find('option:selected').attr('dizhi');
        var dianhua = $(this).find('option:selected').attr('dianhua');
        var gongsi = $(this).find('option:selected').val();
        $('.address-msg .title').text(gongsi);
        $('.address-msg .t').eq(0).find('.key').text(dizhi);
        $('.address-msg .t').eq(1).find('.key').text(dianhua);
    });

//选择框选择省份拉取城市
    function getCitySelect(pro_id, type) {
        $.getCity(pro_id, function (res) {
            var str = '';
            res.items.forEach(function(val, key) {
                str += '<option name="'+val.name+'" city_id="' + val.id + '">' + val.name + '</option>';
            });
            $('#city').html(str);
            //更新经销商信息
            updateJxs(res.items[0].name);
        });

    };

//更新经销商信息
    function updateJxs(cityName, type) {
        $.getDealer(getDealerUtm(), cityName, function (res) {
            res.items=randomSort(res.items);
            var str = '';
            res.items.forEach(function (val, key) {
                str += '<option jxs_id="' + val.jingxiaoshangid + '" dizhi="' + val.dizhi + '" dianhua="' + val.dianhua + '">' + val.gongsi + '</option>';
            });
            if (res.items.length == 0) {
                $(".address-msg").find('.no-data').show();
                $(".address-msg").find('.title').hide();
                $(".address-msg").find('.address_phone').hide();
                str += '<option>无</option>';
                $('#jxsSelect').html(str);
            } else {
                $('#jxsSelect').html(str);
                $('#jxsSelect').find('option').eq(0).attr("selected", 'selected');
                $('.address-msg .title').text(res.items[0].gongsi);
                $('.address-msg .t').eq(0).find('.key').text(res.items[0].dizhi);
                $('.address-msg .t').eq(1).find('.key').text(res.items[0].dianhua);
                $(".address-msg").find('.no-data').hide();
                $(".address-msg").find('.title').show();
                $(".address-msg").find('.address_phone').show();
            }
        });
    };

    /**
     * 预约试驾提交
     */
    var tijiao = 0;
    $('.book .submit .r').on('click', function () {
        if (tijiao == 1) {
            return;
        }
        tijiao = 1;
         var chexing = $('.select').eq(0).find('option:selected').val();
        var name = $("#inputName").val();
        var mobile = $("#inputPhone").val();
        var pro_id = $('#province').find('option:selected').attr('pro_id');
        var city_id = $('#city').find('option:selected').attr('city_id');
        var jxs_id = $('#jxsSelect').find('option:selected').attr('jxs_id');
        var myregmobile = /^(1(([3456789][0-9])|(47)|[8][01236789]))\d{8}$/;

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
        //验证姓名
        var nameReg = /^[\u4E00-\u9FA5]{2,6}$/;
        if (!nameReg.test(name)) {
            tijiao = 0;
            layer.msg('请输入正确姓名');
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
                    _pt_sp_2.push('setCustomEvent',{eventName:'q3 pc 预约成功'});
                    try {
                        stm_clicki('send', 'event', {
                            customActionId: 1,
                            customActionLabel1: '',
                            customActionLabel2: '',
                            customActionLabel3: $("#province option:selected").html() + "/" + $("#city option:selected").html(),
                            customActionLabel4: $("#dealer option:selected").html(),
                            customActionLabel5: 'Q3'
                        });
    
                    } catch (e) {
    
                    }
                    tijiao = 0;
                    $('#inputName').val('');
                    $('#inputPhone').val('');
                    $("#js_agreement").removeAttr("checked");
                });
            } else {
                layer.msg(res.msg,function(){
                    tijiao = 0;
                    $('#inputName').val('');
                    $('#inputPhone').val('');
                    $("#js_agreement").removeAttr("checked");
                });
            }
        }, function () {
            layer.msg("网络错误，请重试");
            tijiao = 0;
        })
    });


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
            res.items=randomSort(res.items);
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
            $("#jxsSelect").html(str);
        });
        //滚动到顶部
        $('html, body').animate({
            scrollTop: $(".form").offset().top
        }, 500);
    })

    //右侧菜单事件
    $(".right-menu").on("click",'img',function () {
        if($(this).hasClass("yuyue")){
            $('html, body').animate({
                scrollTop: $(".form").offset().top
            }, 500);
        }else{
           $(".bottom-menu").fadeIn();
          //   $(".dialog-faxian-menu").fadeIn();
          //   $("body").css("overflow","hidden");
          //   $(".dialog-faxian-menu .mask").getNiceScroll().resize();
        }
    });

    $(".bottom-menu").on("click",function () {
        $(".bottom-menu").fadeOut();
        $(".dialog-pop").fadeOut();
    });
    $(".bottom-menu .item").on("click",function (e) {
        window.event? window.event.cancelBubble = true : e.stopPropagation();
        if($(this).hasClass("share")){
            $(".share-dialog").fadeIn();
            $(".weixin-dialog").fadeOut();
            $(".xiaochengxu-dialog").fadeOut();
        }else if($(this).hasClass("weixin")){
            $(".weixin-dialog").fadeIn();
            $(".share-dialog").fadeOut();
            $(".xiaochengxu-dialog").fadeOut();
        }else if($(this).hasClass("xiaochengxu")){
            $(".xiaochengxu-dialog").fadeIn();
            $(".share-dialog").fadeOut();
            $(".weixin-dialog").fadeOut();
        }
    });
    $(".dialog-faxian-menu").on("click",'.mask',function (e){
        $(".xiaochengxu-dialog").fadeOut();
        $(".share-dialog").fadeOut();
        $(".weixin-dialog").fadeOut();
        $(".club-dialog").fadeOut();

    });
    $(".dialog-faxian-menu .box").on("click",'.btn',function (e) {
       window.event? window.event.cancelBubble = true : e.stopPropagation();
        if($(this).hasClass("share")){
            $(".share-dialog").fadeIn();
            $(".weixin-dialog").fadeOut();
            $(".xiaochengxu-dialog").fadeOut();
            $(".club-dialog").fadeOut();
        }else if($(this).hasClass("weixin")){
            $(".weixin-dialog").fadeIn();
            $(".share-dialog").fadeOut();
            $(".xiaochengxu-dialog").fadeOut();
            $(".club-dialog").fadeOut();
        }else if($(this).hasClass("xiaochengxu")){
            $(".xiaochengxu-dialog").fadeIn();
            $(".share-dialog").fadeOut();
            $(".weixin-dialog").fadeOut();
            $(".club-dialog").fadeOut();
        }else if($(this).hasClass("audi")){
            window.open('https://www.audi.cn/cn/web/zh.html','_blank');
        }else if($(this).hasClass("weibo")){
            window.open('https://weibo.com/iaudi','_blank');
        }else if($(this).hasClass("shop")){
            window.open('https://4s.audi.cn','_blank');
        }else if($(this).hasClass("club")){
            $(".xiaochengxu-dialog").fadeOut();
            $(".share-dialog").fadeOut();
            $(".weixin-dialog").fadeOut();
            $(".club-dialog").fadeIn();
          //  window.open('https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIxMjU1NDAwNg==&scene=124#wechat_redirect','_blank');
        }else if($(this).hasClass("apple")){
            window.open('https://apps.apple.com/cn/app/my-audi/id1119081688','_blank');
        }else if($(this).hasClass("android")){
            window.open('https://android.myapp.com/myapp/detail.htm?apkName=com.timanetworks.android.frame.audisuper.release&ADTAG=mobile','_blank');

        }
    });

    $(".dialog-faxian-menu").on("click",function (e) {
        if(e.target==this){
            $(".dialog-faxian-menu").fadeOut();
            $(".dialog-pop").fadeOut();
           $("body").css("overflow","");
        }

    });
    $(".dialog-faxian-menu").on("click",'.mask .close',function (e) {
        $(".dialog-faxian-menu").fadeOut();
        $(".dialog-pop").fadeOut();
       $("body").css("overflow","");

    });

});


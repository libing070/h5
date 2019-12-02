$(function () {

    var ttName = localStorage.getItem('ttName');
    var OAName = localStorage.getItem('OAName');
    console.log(ttName);
    if (ttName && localStorage.getItem('ttToken')) {
        $('.margin_tt_1').html('<b>' + ttName + '</b>你好');
        $('.tt_loginBtn').html('进入智库');
    }
    if (OAName && localStorage.getItem('OAToken')) {
        $('.oaDesc').show();
        $('.loginOA').hide();
        $('.contact_mask').hide();
        $('.OAName').html('<b>' + OAName + '</b>你好');
        GetHomeInfo(localStorage.getItem('OAToken'));
    }


    // 滚动条
    console.log($('.outerSlide').length);
    for (let i = 0; i < $('.outerSlide').length; i++) {
        $('.scrollBar ul').append('<li></li>');
        $('.scrollBar ul li').eq(0).attr('class', 'active');
    }
    $('.p2').html('0' + $('.outerSlide').length);
    //
    $('.products li').hover(function () {
        var index = $(this).index();
         console.log(index);
         if(index==0){
             $('.logo').attr("src",'./images/logo-white2.png');

         }
        $(this).find('.product_bg1').stop().animate({
            'opacity': '0'
        }, 500);
        $(this).find('.pro_p2').css('color', '#e90010');
        $(this).find('.pro_arrow').attr('src', './images/arrow_red.png');
        $(this).find('.pro_img').addClass('pro_imgHover');
        // console.log($(this).find('.pro_arrow'))
    }, function () {
        var index = $(this).index();
        $('.logo').attr("src",'./images/logo.png');

        $(this).find('.product_bg1').stop().animate({
            'opacity': '1'
        }, 500);
        $(this).find('.pro_p2').css('color', '#fff');
        $(this).find('.pro_arrow').attr('src', './images/arrow_icon.png');
        $(this).find('.pro_img').removeClass('pro_imgHover');
    });
    //    弹层关闭按钮
    $('.close_btn').on('click', function (e) {
        e.stopPropagation();
        $('.contact_mask').hide();
        clearCm();
    });
    $('.contact_us .arrow_icon').on('click', function () {
        $('.cm_1').show();
    });
    //联系我们留资
    $('.selectIdentity img').on('click', function (e) {
        e.stopPropagation();
        var index = $(this).index();
        console.log(index)
        if (index == 0) {
            $('.cm_2').attr('cmid', 1);
        } else {
            $('.cm_2').attr('cmid', 2);
        }
        $('.cm_2').show()
    });
    $('.tijiao a').eq(1).on('click', function () {
        $('.cm_2').hide();
        $('.cm_1').show();
        clearCm();
    });
    $('.tijiao a').eq(0).on('click', function () {
        var type = $('.cm_2').attr('cmid');
        var name = $('.contact_mask').find('.name').val();
        var companyName = $('.contact_mask').find('.companyName').val();
        var companyAddr = $('.contact_mask').find('.companyAddr').val();
        var contact = $('.contact_mask').find('.contact').val();
        var remark = $('.contact_mask').find('.remark').val();
        console.log(name, companyName, companyAddr, contact, remark);
        if(name==""){
            layer.msg("请填写姓名");
            return;
        }
        if(companyName==""){
            layer.msg("请填写公司姓名");
            return;
        }
        if(companyAddr==""){
            layer.msg("请填写公司地址");
            return;
        }
        if(contact==""){
            layer.msg("请填写联系方式");
            return;
        }
        $.request('/api/Client/ContactUs', {
            type: type,
            name: name,
            companyName: companyName,
            companyAddr: companyAddr,
            contact: contact,
            remark: remark,
            timestamp: ts(),
            sign: createSign({
                type: type,
                name: name,
                companyName: companyName,
                companyAddr: companyAddr,
                contact: contact,
                remark: remark,
                timestamp: ts(),
            })
        }, function (res) {
            if(res.code==1){
             localStorage.setItem('roleId',"3");
            }
            layer.msg(res.message);
            $('.cm_1').hide();
            $('.cm_2').hide();
            clearCm();
        });
    });
    //登录智库
    $('.tt_loginBtn').on('click', function () {
        $('.cm_tt').show();
        $('.verifyCodeImg img').attr('src', host + '/api/VerifyCode/CreateCode?' + ts());
    });
    $('.tt_login').on('click', function () {
        var userName = $('.cm_tt .userName').val();
        var password = $('.cm_tt .password').val();
        var verifyCode = $('.cm_tt .verifyCode').val();
        $.request('/api/User/Login', {
                userName: userName,
                password: password,
                verifyCode: verifyCode,
                timestamp: ts(),
                sign: createSign({
                    userName: userName,
                    password: password,
                    verifyCode: verifyCode,
                    timestamp: ts(),
                })
            },
            function (res) {
                console.log(res);
                layer.msg(res.message, function () {
                    $('.contact_mask').hide();
                    cleartt();
                    localStorage.setItem('ttToken', res.data.userToken);
                    localStorage.setItem('ttName', res.data.userName);
                    $('.margin_tt_1').html('<b>' + res.data.userName + '</b>你好');
                    $('.tt_loginBtn').html('进入智库');
                });
            }
        );
    });
    // 登录OA
    $('.loginOA a').on('click', function () {
        $('.oa_tt').show();
        $('.verifyCodeImg img').attr('src', host + '/api/VerifyCode/CreateCode?' + ts());
    });

    $('.oa_login').on('click', function () {
        var userName = $('.oa_tt .userName').val();
        var password = $('.oa_tt .password').val();
        var verifyCode = $('.oa_tt .verifyCode').val();
        $.request('/api/OA/OALogin', {
                userName: userName,
                password: password,
                verifyCode: verifyCode,
                timestamp: ts(),
                sign: createSign({
                    userName: userName,
                    password: password,
                    verifyCode: verifyCode,
                    timestamp: ts(),
                })
            },
            function (res) {
                if(res.code==1){
                    $('.oaDesc').show();
                    $('.loginOA').hide();
                    $('.contact_mask').hide();
                    clearOA();
                    $('.OAName').html('<b>' + res.data.userName + '</b> 你好');
                    localStorage.setItem('OAToken', res.data.userToken);
                    localStorage.setItem('OAName', res.data.userName);
                    $.cookie('OAToken', res.data.userToken, {
                        expires: 7,
                        path: '/',
                        domain: '.cig.com.cn',
                        secure: true
                    });
                    console.log($.cookie('OAToken'));
                    GetHomeInfo(res.data.userToken);
                }
                layer.msg(res.message);
            }
        );
    });

    function GetHomeInfo(token) {
        $.request('/api/OA/GetHomeInfo', {
            userToken: token,
            timestamp: ts(),
            sign: createSign({
                userToken: token,
                timestamp: ts(),
            })
        }, function (res) {
            $(".OA .oaDesc .joinOA").attr("href",res.oaUrl);
            var len=res.data.length;
            let n = 3; //每行三条数据
            var twolabelSetArr = [];
            if(len>0){
                var rowNumber = len % 3 == 0 ? (len / 3) : (parseInt(len / 3) + 1);
                for (let i = 0; i < rowNumber; i++) {
                    // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
                    let temp = res.data.slice(i * n, i * n + n);
                    twolabelSetArr.push(temp);
                }
            }
            var str='';
            for(var s=0;s<twolabelSetArr.length;s++){
                str+='<ul class="oa_menu_ul">';
                var list=twolabelSetArr[s];
                for(var k=0;k<list.length;k++){
                    str+=' <li>';
                    str+=' <a class="bell" href="'+list[k].url+'" target="_blank">';
                    str+='<img src="'+list[k].icon+'" alt="">';
                    str+='<p class="fontSize16">'+list[k].name+'</p>';
                    if(k==0){
                        str+='<span class="oa_circle"></span>';
                    }
                    str+='</a>';
                    str+='</li>';
                }
                str+='</ul>';
            }
            $(".oa_menu").prepend(str);
            // res.data.forEach((ele, k) => {
            //     $('.oa_menu_ul li').eq(k).find('a').attr('href', res.data[0].url);
            //     if (ele.extra != 0) {
            //         $('.oa_menu_ul li').eq(k).find('.oa_circle').show();
            //     }
            // });
        });
    }
});

function clearCm() {
    $('.cm_2').attr('cmid', '');
    $('.contact_mask').find('.name').val('');
    $('.contact_mask').find('.companyName').val('');
    $('.contact_mask').find('.companyAddr').val('');
    $('.contact_mask').find('.contact').val('');
    $('.contact_mask').find('.remark').val('');
}

function clearOA() {
    // $('.cm_2').attr('cmid', '');
    $('.OA .userName').val('');
    $('.OA .password').val('');
    $('.OA .verifyCode').val('');

}

function cleartt() {
    $('.cm_tt .userName').val('');
    $('.cm_tt .password').val('');
    $('.cm_tt .verifyCode').val('');
}
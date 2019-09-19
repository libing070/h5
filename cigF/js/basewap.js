$(function () {
    var ttName = localStorage.getItem('ttName');
    var OAName = localStorage.getItem('OAName');
    console.log(ttName);
    if (ttName && localStorage.getItem('ttToken')) {
        $('.module8 .top .text1 .tt1').html('');
        $('.module8 .top .text1 .tt2').html(ttName);
    }
    if (OAName && localStorage.getItem('OAToken')) {
        $('.module9 .login-after').fadeIn();
        $('.module9 .login-before').fadeOut();
        $('.module9 .login-after .top .p1 .name').html(OAName);
        GetHomeInfo(localStorage.getItem('OAToken'));
    }

    //获取焦点后回退
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



    //案例视频点击事件
    $(".caseSwiper").on("click",".case-swiper-video-btn",function () {
        var len=$(".caseSwiper").find("video").length;
        $(".caseSwiper .case-swiper-video-btn").show();
        for(var i=0;i<len;i++){
            $(".caseSwiper").find("video").get(i).pause();
        }
        $(this).hide();
        var myVideo=$(this).siblings("video").get(0);
        myVideo.play();
        myVideo.addEventListener('ended', playsss);
        function playsss() {
            $(".caseSwiper .case-swiper-video-btn").show();
            myVideo.removeEventListener("ended", playsss);

        }

    });

    //联系我们 二级页点击按钮事件
    $("#module6Page2Btn").on("click",function () {
        $(".module6 .dialog").fadeIn();
        $(".module6 .dialog .mask1").fadeIn();
    })
    // mask1 关闭按钮事件
    $(".module6 .dialog .mask1").on("click",'.close',function () {
        $(".module6 .dialog").hide();
        $(".module6 .dialog .mask1").fadeOut();
    })
    //客户 供应商点击事件
    $(".module6 .dialog .mask1").on("click",'.image',function () {
        $(".module6 .dialog .mask2").fadeIn();
        $("#concatCmid").val($(this).attr("cmid"));
    })
    // mask2 关闭按钮事件
    $(".module6 .dialog .mask2").on("click",'.close',function () {
        $(".module6 .dialog").fadeOut();
        $(".module6 .dialog .mask1").fadeOut();
        $(".module6 .dialog .mask2").fadeOut();
        clearCm();
    })

    //mask2 提交按钮事件
    $(".module6 .dialog .mask2").on("click",'.submit',function () {
        var type=$("#concatCmid").val();
        var name=$(".module6 .dialog .mask2 .concatName").val();
        var companyName=$(".module6 .dialog .mask2 .concatComName").val();
        var companyAddr=$(".module6 .dialog .mask2 .concatComAddress").val();
        var contact=$(".module6 .dialog .mask2 .concatMobile").val();
        var remark=$(".module6 .dialog .mask2 .concatContent").val();
        console.log(type,name, companyName, companyAddr, contact, remark);
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
            layer.msg(res.message, function () {
                $(".module6 .dialog .mask2 .close").click();
            });
            clearCm();
        });
    });

    //mask2 返回按钮事件
    $(".module6 .dialog .mask2").on("click",'.back',function () {
        $(".module6 .dialog .mask2").fadeOut();
        clearCm();
    });

    //登录智库
    $('.module8 .top').on('click','.btn', function () {
        $('.module8 .dialog,.module8 .dialog .mask').fadeIn();
        $('.verifyCodeImg img').attr('src', host + '/api/VerifyCode/CreateCode?' + ts());
    });
    $('.module8 .dialog .mask').on('click','.close', function () {
        $('.module8 .dialog,.module8 .dialog .mask').fadeOut();
    });
    $('.module8 .dialog .mask .login').on('click', function () {
        var userName = $('.module8 .dialog .mask .userName').val();
        var password = $('.module8 .dialog .mask  .userPwd').val();
        var verifyCode = $('.module8 .dialog .mask  .verifyCode').val();
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
                    $('.module8 .dialog,.module8 .dialog .mask').fadeOut();
                    cleartt();
                    localStorage.setItem('ttToken', res.data.userToken);
                    localStorage.setItem('ttName', res.data.userName);
                    $('.module8 .top .text1 .tt1').html('');
                    $('.module8 .top .text1 .tt2').html(res.data.userName);
                });
            }
        );
    });

    //登录oa
    $('.module9 .login-before').on('click','.login-btn', function () {
        $('.module9 .dialog,.module9 .dialog .mask').fadeIn();
        $('.verifyCodeImg img').attr('src', host + '/api/VerifyCode/CreateCode?' + ts());
    });
    $('.module9 .dialog .mask').on('click','.close', function () {
        $('.module9 .dialog,.module9 .dialog .mask').fadeOut();
    });

    $('.module9 .dialog .mask .login').on('click', function () {
        var userName = $('.module9 .dialog .mask .userName').val();
        var password = $('.module9 .dialog .mask  .userPwd').val();
        var verifyCode = $('.module9 .dialog .mask  .verifyCode').val();
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
                    $('.module9 .dialog,.module9 .dialog .mask').fadeOut();
                    $('.module9 .login-before').fadeOut();
                    $('.module9 .login-after').fadeIn();
                    clearOA();
                    $('.module9 .login-after .top .p1 .name').html(res.data.userName);
                    localStorage.setItem('OAToken', res.data.userToken);
                    localStorage.setItem('OAName', res.data.userName);
                    $.cookie('OAToken', res.data.userToken, {
                        expires: 7,
                        path: '/',
                        domain: '.cig.com.cn',
                        secure: true
                    });
                   GetHomeInfo(res.data.userToken);
                };
                layer.msg(res.message);
            }
        );
    });
    function GetHomeInfo(token) {
       //  var res={"code":1,"message":"操作成功!","data":[{"name":"待办事宜","icon":"http://webimg.cig.com.cnoa_icon/bell-icon.png","url":"http://oa.cig.com.cn","extra":"34"},{"name":"日常办公","icon":"http://webimg.cig.com.cnoa_icon/soipt-icon.png","url":"http://oa.cig.com.cn","extra":""},{"name":"公共资源","icon":"http://webimg.cig.com.cnoa_icon/coins-icon.png","url":"http://oa.cig.com.cn","extra":""},{"name":"平台链接","icon":"http://webimg.cig.com.cnoa_icon/link-icon.png","url":"http://oa.cig.com.cn","extra":""},{"name":"成长体系","icon":"http://webimg.cig.com.cnoa_icon/forest-icon.png","url":"http://oa.cig.com.cn","extra":""},{"name":"新意新桥","icon":"http://webimg.cig.com.cnoa_icon/clipmark-icon.png","url":"http://oa.cig.com.cn","extra":""},{"name":"考勤","icon":"http://webimg.cig.com.cnoa_icon/kaoqin-icon.png","url":"http://oa.cig.com.cn","extra":""},{"name":"会议室预定","icon":"http://webimg.cig.com.cnoa_icon/huiyishi-icon.png","url":"http://oa.cig.com.cn","extra":""},{"name":"费用报销","icon":"http://webimg.cig.com.cnoa_icon/feiyongbaoxiao-icon.png","url":"http://oa.cig.com.cn","extra":""}],"oaUrl":"http://oa.cig.com.cn"}
        $.request('/api/OA/GetHomeInfo', {
            userToken: token,
            timestamp: ts(),
            sign: createSign({
                userToken: token,
                timestamp: ts(),
            })
        }, function (res) {
            $(".login-after .joinoa").attr("href",res.oaUrl);
            var str='';
            for(var i=0;i<res.data.length;i++){
                str+='<div class="item">';
                str+='     <a class="bell" style="position: relative" href="'+res.data[i].url+'" target="_blank">';
                str+='   <img src="'+res.data[i].icon+'" alt="">';
                str+='   <p class="fontSize16">'+res.data[i].name+'</p>';
                if(i==0){
                    str+='  <span class="oa_circle"></span>';
                }
                str+='  </a>';
                str+='  </div>';
            }
            $(".oa-swiper .oa-menu").append(str);
        });
    }

});


function clearCm() {
    $(".module6 .dialog .mask2 .concatName").val('');
    $(".module6 .dialog .mask2 .concatComName").val('');
    $(".module6 .dialog .mask2 .concatComAddress").val('');
    $(".module6 .dialog .mask2 .concatMobile").val('');
    $(".module6 .dialog .mask2 .concatContent").val('');
}
function cleartt() {
    $('.module8 .dialog .mask .userName').val('');
    $('.module8 .dialog .mask .password').val('');
    $('.module8 .dialog .mask .verifyCode').val('');
}


function clearOA() {
    $('.module9 .dialog .mask .userName').val('');
    $('.module9 .dialog .mask .password').val('');
    $('.module9 .dialog .mask .verifyCode').val('');

}
$(function () {
    init();

    //作品推荐
    ///api/Forum/GetForumInfo(Thinktank_019~Thinktank_022)获取智库首页内容-作品推荐

    function GetForumInfo() {
        $.request('/api/Forum/GetForumInfo', {
                "timestamp": ts(),
                sign: createSign({
                    "timestamp": ts(),
                })
            },
            function (res) {
                //作品推荐
                var str4='';
                var recommendList=res.data.recommendList;
                for(var i=0;i<recommendList.length;i++){
                        str4+='<div class="box click-list">';
                        str4+='  <img class="click-img" forumId="'+recommendList[i].id+'"   style="width: 100%" src="'+recommendList[i].picUrl+'">';
                        str4+='  <div class="content">';
                        str4+='   <p class="time">'+recommendList[i].createTime+'</p>';
                        str4+='   <p class="title">'+recommendList[i].title+'</p>';
                        str4+='  <p class="desc">'+recommendList[i].summary+'</p>';
                        str4+='</div>';
                        str4+=' <p class="bottom">';
                        str4+='    <span class="item"><img src="./images/message-icon.png"><span >'+recommendList[i].commentCount+'</span></span>';
                        str4+=' <span class="item"><img src="./images/view-icon.png"><span>'+recommendList[i].visitCount+'</span></span>';
                        str4+='  <span class="item"><img src="./images/vote-icon.png"><span>'+recommendList[i].likeCount+'</span></span>';
                        str4+=' </p>';
                        str4+=' </div>';
                }
                $('.all-list-layout').append(str4);
            }
        );
    }
    GetForumInfo();

    //活动点击事件跳转到活动详情
    $(".all-list-layout").on("click",'.click-list .click-img',function () {
        console.log($(this).attr("forumId"));
        window.location.href='./active-details.html?forumId='+$(this).attr("forumId");
    })



     if(GetUrlParam("type")==0){//登录
         $.get("userlogin.html",function(data,status){
             $(".container .index-banner1").append(data);
         });
         setTimeout(function () {
             $('.container .yzmright img').attr('src', host + '/api/VerifyCode/CreateCode?' + ts());
         },500);
     }else if(GetUrlParam("type")==1){//注册
         $.get("userregister.html",function(data,status){
             $(".container").append(data);
         });
         setTimeout(function () {
             $('.container .yzmright img').attr('src', host + '/api/VerifyCode/CreateCode?' + ts());
         },500);
     }else if(GetUrlParam("type")==2){//忘记密码
         $.get("findpassword.html",function(data,status){
             $(".container").append(data);
         });
     }



/////////////////////////登录开始///////////////////////

    //加入智库
    $(".container").on("click",'.user-dialog .login .register',function () {
        window.location.href='./userhome.html?type=1';
    });
    //忘记密码
    $(".container").on("click",'.user-dialog .login .forgotPwd',function () {
        window.location.href='./userhome.html?type=2';
    });

    //登录事件
    $(".container").on("click",'.user-dialog .login .btn',function () {
        var userName=$(".container .user-dialog .login .userName").val();
        var password=$(".container .user-dialog .login .password").val();
        var verifyCode=$(".container .user-dialog .login .verifyCode").val();
        if (!userName) {
            layer.msg('请填写用户名');
            return;
        }
        if (!password) {
            layer.msg('请填写密码');
            return;
        }
        if (!verifyCode) {
            layer.msg('请填写验证码');
            return;
        }

        $.request('/api/User/Login', {
                userName:userName,
                password:password,
                verifyCode:verifyCode,
                timestamp: ts(),
                sign: createSign({
                    userName:userName,
                    password:password,
                    verifyCode:verifyCode,
                    timestamp: ts(),
                })
            },
            function (res) {
                if(res.code==1){

                    localStorage.setItem('ttToken', res.data.userToken);
                    localStorage.setItem('ttName', res.data.userName);
                    setTimeout(function () {
                        window.location.href='./index.html';//登录
                    },2000);
                }
                layer.msg(res.message);
            }
        );
    });

    //获取验证码事件
    $('.container').on('click', '.yzmright img',function () {
        $('.container .yzmright img').attr('src', host + '/api/VerifyCode/CreateCode?' + ts());
    });
/////////////////////////登录结束///////////////////////


    /////////////////////////注册开始///////////////////////

    //api/User/UserNameIsExists用户名是否存在
    //获取焦点
    $(".container").on("blur",'.registeruserName',function () {
        var that=this;
        var userName=$(that).val();
        if (!userName) {
            layer.msg('请填写用户名');
            return;
        }
        $.request('/api/User/UserNameIsExists', {
                userName: userName,
                timestamp: ts(),
                sign: createSign({
                    userName: userName,
                    timestamp: ts(),
                })
            },
            function (res) {
                if(res.data.isExists){//用户名已经存在
                    $(".container").find(".checkusername").css("color","red").html(res.message);
                    $(".container").find(".checkusername").attr("isExists","true");
                }else{
                    $(".container").find(".checkusername").css("color","green").html('该用户名可以使用');
                    $(".container").find(".checkusername").attr("isExists","");
                }
            }
        );
    });
    //失去焦点
    $(".container").on("focus",'.registeruserName',function () {
        $(".container").find(".checkusername").html("");
    });



    ///api/User/MobileIsExists手机号是否存在
    // api/Mobile/SendMessage手机验证码发送
    //获取手机验证码事件
    var totalTime=10;
    $(".container").on("click",".register .countDown",function () {
        var that=this;
        var mobile=$(".container .register .yzmleft .mobile").val();
        var myregmobile = /^(1(([34578][0-9])|(47)|[8][01236789]))\d{8}$/;
        if (!mobile) {
            layer.msg('请填写手机号');
            return;
        }
        if (!myregmobile.test(mobile)) {
            layer.msg('请填写正确手机号');
            return;
        }
        if(!$(that).hasClass("canClick")){
            return;
        }
        $.request('/api/User/MobileIsExists', {
                mobile: mobile,
                timestamp: ts(),
                sign: createSign({
                    mobile: mobile,
                    timestamp: ts(),
                })
            },
            function (res) {
                if(res.data.isExists){//手机号码已经存在
                    layer.msg(res.message);
                    $(".container .register .yzmleft .mobile").attr("isExists","true");

                }else{
                    $(".container .register .yzmleft .mobile").attr("isExists","");
                    $.request('/api/Mobile/SendMessage', {
                            mobile: mobile,
                            timestamp: ts(),
                            sign: createSign({
                                mobile: mobile,
                                timestamp: ts(),
                            })
                        },
                        function (res) {
                            if(res.code==1){
                                $(that).removeClass("canClick");
                                $(that).html(totalTime+'S');
                                let clock = window.setInterval(() => {
                                    totalTime--;
                                    $(that).html(totalTime + 'S');
                                    if (totalTime < 0) {
                                        window.clearInterval(clock);
                                        $(that).html('重新发送');
                                        totalTime = 10;
                                        $(that).addClass("canClick");
                                    }
                                },1000);
                            }
                            layer.msg(res.message);
                        }
                    );
                }
            }
        );
    });
    //api/User/Register(TT_001)用户注册
    //注册提交按钮事件
    $(".container").on("click",'.register .btn',function () {
        var that=this;
        var userName=$(".container .register .registeruserName").val();
        var password=$(".container .register .password").val();
        var confirmpassword=$(".container .register .confirmpassword").val();
        var myregmobile = /^(1(([34578][0-9])|(47)|[8][01236789]))\d{8}$/;
        var mobile=$(".container .register .yzmleft .mobile").val();
        var mobileCode=$(".container .register .yzmInput").val();
        // console.log(`--------------------`);
        // console.log(`userName:`+userName);
        // console.log(`password:`+password);
        // console.log(`mobile:`+mobile);
        // console.log(`mobileCode:`+mobileCode);
        // console.log(`--------------------`);
        if($(".container").find(".checkusername").attr("isExists")=="true"){
            return;
        }
        if (!userName) {
            layer.msg('请填写用户名');
            return;
        }
        if (!password) {
            layer.msg('请填写密码');
            return;
        }
        if (password!=confirmpassword) {
            layer.msg('两次密码不一致');
            return;
        }
        if (!mobile) {
            layer.msg('请填写手机号');
            return;
        }
        // if($(".container .register .yzmleft .mobile").attr("isExists")=="true"){
        //     layer.msg('手机号已存在');
        //     return;
        // }
        if (!myregmobile.test(mobile)) {
            layer.msg('请填写正确手机号');
            return;
        }
        if (!mobileCode) {
            layer.msg('请填写验证码');
            return;
        }

        if (!$(".container #inputcheckbox").is(":checked")) {
            layer.msg('请点击同意隐私条款');
            return;
        }
        $.request('/api/User/Register', {
                userName:userName,
                password:password,
                mobile: mobile,
                mobileCode:mobileCode,
                timestamp: ts(),
                sign: createSign({
                    userName:userName,
                    password:password,
                    mobile: mobile,
                    mobileCode:mobileCode,
                    timestamp: ts(),
                })
            },
            function (res) {
                if(res.code==1){
                    localStorage.setItem('ttToken', res.data.userToken);
                    localStorage.setItem('ttName', res.data.userName);
                    setTimeout(function () {
                        window.location.href='./index.html';//登录
                    },2000);
                }
                layer.msg(res.message);
            }
        );
    });
    /////////////////////////注册结束///////////////////////


    /////////////////////////找回密码开始///////////////////////
    $(".container").on("click",".findpassword .countDown",function () {
        var that=this;
        var mobile=$(".container .findpassword .yzmleft .mobile").val();
        var myregmobile = /^(1(([34578][0-9])|(47)|[8][01236789]))\d{8}$/;
        if (!mobile) {
            layer.msg('请填写手机号');
            return;
        }
        if (!myregmobile.test(mobile)) {
            layer.msg('请填写正确手机号');
            return;
        }
        if(!$(that).hasClass("canClick")){
            return;
        }
        $.request('/api/Mobile/SendMessage', {
                mobile: mobile,
                timestamp: ts(),
                sign: createSign({
                    mobile: mobile,
                    timestamp: ts(),
                })
            },
            function (res) {
                if(res.code==1){
                    $(that).removeClass("canClick");
                    $(that).html(totalTime+'S');
                    let clock = window.setInterval(() => {
                        totalTime--;
                        $(that).html(totalTime + 'S');
                        if (totalTime < 0) {
                            window.clearInterval(clock);
                            $(that).html('重新发送');
                            totalTime = 10;
                            $(that).addClass("canClick");
                        }
                    },1000);
                }
                layer.msg(res.message);
            }
        );
    });

    $(".container").on("click",".findpassword .btn",function () {
        var that=this;
        var mobile=$(".container .findpassword .yzmleft .mobile").val();
        var myregmobile = /^(1(([34578][0-9])|(47)|[8][01236789]))\d{8}$/;
        var password=$(".container .findpassword .password").val();
        var confirmpassword=$(".container .findpassword .confirmpassword").val();
        var mobileCode=$(".container .findpassword .yzmInput").val();
        if (!mobile) {
            layer.msg('请填写手机号');
            return;
        }
        if (!myregmobile.test(mobile)) {
            layer.msg('请填写正确手机号');
            return;
        }
        if (!mobileCode) {
            layer.msg('请填写验证码');
            return;
        }

        if (!password) {
            layer.msg('请填写密码');
            return;
        }
        if (password!=confirmpassword) {
            layer.msg('两次密码不一致');
            return;
        }
        $.request('/api/User/ForgetPwd', {
                password:password,
                mobile: mobile,
                mobileCode:mobileCode,
                timestamp: ts(),
                sign: createSign({
                    password:password,
                    mobile: mobile,
                    mobileCode:mobileCode,
                    timestamp: ts(),
                })
            },
            function (res) {
                if(res.code==1){
                    setTimeout(function () {
                        window.location.href='./userhome.html?type=0';//登录
                    },2000);
                }
                layer.msg(res.message);
            }
        );

    });
    /////////////////////////找回密码结束///////////////////////


});

async  function init() {
    await loadModule();
    await activemouseEvents();
}
 loadModule = () => {
    $("#home .header").load("header.html");//加载头部导航
    $("#home .footer").load("footer.html");//加载底部导航
}
 activemouseEvents = () => {
    setTimeout(function () {
        $('#home .header .nav ul li').hover(function () {
            $(this).find('.submenu').stop().slideDown();
        }, function () {
            $(this).find('.submenu').stop().slideUp();
        });
    },100);
}


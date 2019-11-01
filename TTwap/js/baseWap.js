localStorage.setItem('ttToken','jhi8jybFw3VTKZOarrhy17ED+ApycExc5UIgrfuslTj8WnN3f28xYB7zSalnnhdZlFQXkRNqccgf4Fnl+xMyNQ==');
localStorage.setItem('ttName','libing');
function UserManager(){}
UserManager.base = "./";
$(function () {

    var  url=window.location.href;
    if(url.indexOf("user")>-1) {//个人中心  注意 凡是个人中心 html文件命名加上user前缀
       var header = '<div class="header"><div class="wap_menuBox"><img src="./images/wap/c-menuClose.png" alt=""><ul><li><a href="./index.html">首页</a></li><li><a href="./active.html">资讯</a></li><li><a href="./know.html">知识</a></li><li><a href="./active.html">活动</a></li></ul></div><div class="wap-nav"><a class="wap-menu" href="javascript:;"><img src="./images/wap/c-menu.png" alt=""></a><a class="wap-logo" href="javascript:;"><img class="" src="./images/wap/w-logo.png" alt=""></a><a class="wap-nav_my" href="javascript:;"><img src="./images/wap/c-my.png" alt=""></a><a style="display: none;width: 0.32rem;position: absolute;top: 0.3rem;" class="wap-nav_reg" href="javascript:;"><img src="./images/wap/c-edit.png" alt=""></a><a style="display: none" class="wap-nav_close" href="javascript:;"><img src="./images/wap/c_close.png" alt=""></a></div></div>'
       var footer = '<div class="footer"><div class="footer_1"><div class="footer_img"><img class="" src="./images/wap/w-logo.png" alt=""></div><div><p>CIG数字营销智库是新意互动联合国际、国内营销圈资深同仁及意见领袖打造的营销知识及培训课程共享平台，本平台面向数字营销全行业人士，包括但不限于学界、业界、数字营销爱好者及在校学生等，通过整合线上、线下多方资源，聚力共赢，联合全行业的力量，共同打造数字营销行业的“黄埔军校”。</p></div></div><div class="footer_2"><div class="footer_nav"><span>文章投稿</span><span>丨</span><span>内容合作</span><span>丨</span><span>活动咨询</span></div><div class="footer_contact"><span><i>T</i>010 - 6839 3288</span><span><i>F</i>010 - 6839 3666</span><span><i>F</i>info@cig.com.cn</span><p>北京市海淀区西外大街168号腾达大厦30F</p></div></div><img src="./images/wap/footer_copy.jpg" alt=""></div>';

    }else{
        var header = '<div class="header"><div class="wap_menuBox"><img src="'+UserManager.base+'images/wap/nav_menuClose.png" alt=""><ul><li><a href="'+UserManager.base+'index.html">首页</a></li><li><a href="'+UserManager.base+'article.html">资讯</a></li><li><a href="'+UserManager.base+'know.html">知识</a></li><li><a href="'+UserManager.base+'active.html">活动</a></li></ul></div><div class="wap-nav"><a class="wap-menu" href="javascript:;"><img src="'+UserManager.base+'images/wap/nav_menu.png" alt=""></a><a class="wap-logo" href="javascript:;"><img class="" src="'+UserManager.base+'images/wap/w-logo.png" alt=""></a><a class="wap-nav_my" isLogin="fasle" href="javascript:;"><img src="'+UserManager.base+'images/wap/nav_my.png" alt=""></a><a style="display: none" class="wap-nav_reg" href="javascript:;"><img src="'+UserManager.base+'images/wap/nav-reg.png" alt=""></a><a style="display: none" class="wap-nav_close" href="javascript:;"><img src="'+UserManager.base+'images/wap/nav_close.png" alt=""></a></div></div>'
        var footer = '<div class="footer"><div class="footer_1"><div class="footer_img"><img class="" src="'+UserManager.base+'images/wap/w-logo.png" alt=""></div><div><p>CIG数字营销智库是新意互动联合国际、国内营销圈资深同仁及意见领袖打造的营销知识及培训课程共享平台，本平台面向数字营销全行业人士，包括但不限于学界、业界、数字营销爱好者及在校学生等，通过整合线上、线下多方资源，聚力共赢，联合全行业的力量，共同打造数字营销行业的“黄埔军校”。</p></div></div><div class="footer_2"><div class="footer_nav"><span>文章投稿</span><span>丨</span><span>内容合作</span><span>丨</span><span>活动咨询</span></div><div class="footer_contact"><span><i>T</i>010 - 6839 3288</span><span><i>F</i>010 - 6839 3666</span><span><i>F</i>info@cig.com.cn</span><p>北京市海淀区西外大街168号腾达大厦30F</p></div></div><img src="'+UserManager.base+'images/wap/footer_copy.jpg" alt=""></div>';
    }

    if ($(".header").length==0) {
        $('#wap').prepend(header);
    }
    if ($(".footer").length==0) {
        $('#wap').append(footer);
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

    $('.wap-menu').on('click', function () {
        $('.wap_menuBox').slideDown();
        $('body').css('overflow', 'hidden');
    });
    $('.wap_menuBox img').on('click', function () {
        $('.wap_menuBox').slideUp();
        $('body').css('overflow', 'auto');
    });

    if (localStorage.getItem('ttToken')) {//登录状态
        $('#wap .header .wap-nav_close').show(); //退出按钮展示
    }else{
        $('#wap .header .wap-nav_reg').show();//注册按钮展示
    }



    $('#wap').on("click",'.header .wap-nav_my',function () {
        if (localStorage.getItem('ttToken')) {//登录状态
            window.location.href='./usercenter.html';//跳转到个人中心
        }else{
            window.location.href='./userhome.html?type=0';//登录';//跳转到登录页面
        }
    });
    $('#wap').on("click",'.header .wap-nav_reg',function () {
        window.location.href='./userhome.html?type=1';//注册 跳转到登录页面
    });
    $('#wap').on("click",'.header .wap-nav_close',function () {

        layer.confirm('确定退出?', {
            icon: 3, title: '提示', yes: function (index) {
                layer.close(index);
                localStorage.removeItem('ttToken');
                localStorage.removeItem('ttName');
                localStorage.removeItem('UserId');
                window.location.href='./index.html'
            },
            cancel: function (index, layero) {
                layer.close(index);
            }
        });
    });


    //api/Forum/UserLike用户点赞接口
    $(".detail-ct").on("click",'.vote-icon-img',function () {
        var that=this;
        if((!localStorage.getItem("ttToken"))||localStorage.getItem("ttToken")===""){
            layer.msg('请先登录');
            setTimeout(function () {
                window.location.href='./userhome.html?type=0';//登录
            },2000);
            return;
        }
        if($(this).css("background").indexOf('heart-icon-red.png')>-1){
            layer.msg('您已点过赞');
            return;
        }
        var forumId=$(this).attr("forumId");
        var commentId=$(this).attr("commentId");
        $.request('/api/Forum/UserLike', {
                timestamp: ts(),
                forumId:forumId,
                commentId:commentId||0,
                likeType:commentId==undefined?1:2,//1 帖子 2 评论
                userToken:localStorage.getItem("ttToken")||'',
                sign: createSign({
                    userToken:localStorage.getItem("ttToken")||'',
                    forumId:forumId,
                    likeType:commentId==undefined?1:2,//1 帖子 2 评论
                    commentId:commentId||0,
                    timestamp: ts(),
                })
            },
            function (res) {
                layer.msg(res.message);
                if(res.code==1){
                    var bg="background:url('./images/wap/heart-icon-red.png') no-repeat;background-size:100%";

                    $(that).attr("style",bg);
                    var num=$(that).siblings('span').html();
                    num++;
                    $(that).siblings('span').html(num);
                }
            }
        );
    });



});

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}
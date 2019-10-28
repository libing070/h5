$(function () {
    var scrollTop='<div class="scrollTop" style="display: none;cursor: pointer;z-index:666;position: fixed;right: 0;top: 0;bottom:0;margin: auto;height: 0.5rem;width: 0.5rem"><img style="width: 100%" src="./images/scrollTop.jpg"></div>'
    $('body .container').append(scrollTop);

    $(window).scroll(function(){
        if($(window).scrollTop()>400){
            $('.container').find(".scrollTop").fadeIn(300);
        }else{
            $('.container').find(".scrollTop").fadeOut(200);
        }

    });
    $('body').on("click",'.scrollTop',function () {
        $('html, body').animate({
            scrollTop: $("body").offset().top
        }, 500);
    })
    $('.container').find(".scrollTop img").hover(function () {
        $(this).attr("src","./images/scrollTop_red.jpg");

    }, function () {
        $(this).attr("src","./images/scrollTop.jpg");
    });

    //api/Forum/UserLike用户点赞接口
    $(".container").on("click",'.vote-icon-img-detail',function () {
        var that=this;
        if((!localStorage.getItem("ttToken"))||localStorage.getItem("ttToken")===""){
            layer.msg('请先登录');
            setTimeout(function () {
                window.location.href='./userhome.html?type=0';//登录
            },2000);
            return;
        }
        if($(this).attr("src").indexOf('vote-icon-red.png')>-1){
            layer.msg('您已点过赞');
            return;
        }
        var forumId=$(this).attr("forumId");
        var commentId=$(this).attr("commentId");
        console.log(forumId+"   "+commentId);
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
                    $(that).attr("src","./images/vote-icon-red.png");
                    var num=$(that).siblings('span').html();
                    num++;
                    $(that).siblings('span').html(num);
                }
            }
        );
    });


});


$(function () {

    setTimeout(function () {
        $('#pc .header .nav ul li').hover(function () {
            $(this).find('.submenu').stop().slideDown();
        }, function () {
            $(this).find('.submenu').stop().slideUp();
        });
        //一周阅读排行榜hover事件
        $('.weeklyleaderboard .swiper-slide').hover(function () {
            $(this).find('.desc').stop().slideDown();
        }, function () {
            $(this).find('.desc').stop().slideUp();
        });

        $('.index-banner3 .swiper-slide .content,.index-banner4 .swiper-slide .content,.index-banner5 .box .content').hover(function () {
            $(this).find('.desc').stop().slideDown();
        }, function () {
            $(this).find('.desc').stop().slideUp();
        });

        $("#pc .header .nav .navBar").find("li").find("a.index").css("color","#ff0000");


        //活动点击事件跳转到活动详情
        $(".index-banner5").on("click",'.click-list .click-img',function () {
            window.location.href='./active-details.html?forumId='+$(this).attr("forumId");
        })
    },100);


});

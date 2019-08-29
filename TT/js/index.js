$(function () {

    //一周阅读排行榜hover事件
    $('.weeklyleaderboard .swiper-slide').hover(function () {
        $(this).find('.desc').stop().slideDown();
    }, function () {
        $(this).find('.desc').stop().slideUp();
    });

    $('.index-banner3 .swiper-slide .content,.index-banner4 .swiper-slide .content,.index-banner5 .box .content').hover(function () {
        $(this).find('.desc').stop().slideDown()
    }, function () {
        $(this).find('.desc').stop().slideUp()
    });


});

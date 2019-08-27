$(function () {
    var newsSwiper = new Swiper('.swiper1', {
        loop:true,
        // freeMode: true,
        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 0,
        navigation: {
            nextEl: '.indexSwiper_next',
            prevEl: '.indexSwiper_prev',
        },
        on:{
            slideNextTransitionStart: function () {
                $('.indexSwiper_prev').css("cssText", "background:url(../images/turn_left_black.png) no-repeat center !important;background-size:cover !important;");
                $('.indexSwiper_next').css("cssText", "background:url(../images/turn_right_act.png) no-repeat center !important;background-size:cover !important;");
            },
            slidePrevTransitionStart: function () {
                $('.indexSwiper_prev').css("cssText", "background:url(../images/turn_left_act.png) no-repeat center !important;background-size:cover !important;");
                $('.indexSwiper_next').css("cssText", "background:url(../images/turn_right_black.png) no-repeat center !important;background-size:cover !important;");
            }
        }
    });

    $(function () {
        $(".banner3").on("click",'.item .ch',function () {
            if($(this).hasClass("active")){
                $(this).removeClass("active").css("display","none");
                $(this).siblings().addClass("active").css("display","block");
            }
        })
    });

});
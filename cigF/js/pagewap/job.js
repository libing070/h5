$(function () {
    var job_1 = new Swiper('.job_1,swiper-container', {
        loop: true,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        navigation: {
            nextEl: '.job_next1',
            prevEl: '.job_prev1',
        },
         on:{
                slideNextTransitionStart: function () {
                    $('.job_prev1').css("cssText", "background:url(../images/turn_left_def.png) no-repeat center !important;background-size:cover !important;");
                    $('.job_next1').css("cssText", "background:url(../images/turn_right_act.png) no-repeat center !important;background-size:cover !important;");
                },
                slidePrevTransitionStart: function () {
                    $('.job_prev1').css("cssText", "background:url(../images/turn_left_act.png) no-repeat center !important;background-size:cover !important;");
                    $('.job_next1').css("cssText", "background:url(../images/turn_right_def.png) no-repeat center !important;background-size:cover !important;");
                }

        },
    });
    var job_2 = new Swiper('.job_2,swiper-container', {
        loop: true,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        navigation: {
            nextEl: '.job_next2',
            prevEl: '.job_prev2',
        },
        on: {
            slideNextTransitionStart: function () {
                $('.job_prev2').css("cssText", "background:url(../images/turn_left_def.png) no-repeat center !important;background-size:cover !important;");
                $('.job_next2').css("cssText", "background:url(../images/turn_right_act.png) no-repeat center !important;background-size:cover !important;");
            },
            slidePrevTransitionStart: function () {
                $('.job_prev2').css("cssText", "background:url(../images/turn_left_act.png) no-repeat center !important;background-size:cover !important;");
                $('.job_next2').css("cssText", "background:url(../images/turn_right_def.png) no-repeat center !important;background-size:cover !important;");
            }
        },
    });

    var job_3= new Swiper('.job_3,swiper-container', {
        loop: true,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        navigation: {
            nextEl: '.job_next3',
            prevEl: '.job_prev3',
        },
        on: {
            slideNextTransitionStart: function () {
                $('.job_prev3').css("cssText", "background:url(../images/turn_left_def.png) no-repeat center !important;background-size:cover !important;");
                $('.job_next3').css("cssText", "background:url(../images/turn_right_act.png) no-repeat center !important;background-size:cover !important;");
            },
            slidePrevTransitionStart: function () {
                $('.job_prev3').css("cssText", "background:url(../images/turn_left_act.png) no-repeat center !important;background-size:cover !important;");
                $('.job_next3').css("cssText", "background:url(../images/turn_right_def.png) no-repeat center !important;background-size:cover !important;");
            }
        },
    });

});
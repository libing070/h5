$(function () {
    var indexbanner1 = new Swiper('.index-banner1 .swiper-container', {
        loop:true,
        // freeMode: true,
        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 0,
        pagination: {
            el: '.index-banner1 .swiper-pagination',
            clickable: true,

        },
        on:{
            slideChangeTransitionEnd: function () {
            },
            slideChangeTransitionStart:function () {
                var index = $('.index-banner1 .swiper-slide-active').attr('data-swiper-slide-index');
                    console.log(index);
                aniReset();
                aniTranslateY(['.ani_1'], ['1rem', '0', ], 1000, 500);
                aniTranslateY(['.ani_2'], ['1rem', '0', ], 1000, 1000);
                aniTranslateY(['.ani_3'], ['1rem', '0', ], 1000, 1500);
                aniTranslateY(['.ani_4'], ['1rem', '0', ], 1000, 500);
                aniTranslateY(['.ani_5'], ['1rem', '0', ], 1000, 1000);
                aniTranslateY(['.ani_6'], ['1rem', '0', ], 1000, 1500);
                aniTranslateY(['.ani_7'], ['1rem', '0', ], 1000, 500);
                aniTranslateY(['.ani_8'], ['1rem', '0', ], 1000, 1000);
                aniTranslateY(['.ani_9'], ['1rem', '0', ], 1000, 1500);
                aniTranslateY(['.ani_10'], ['1rem', '0', ], 1000, 500);
                aniTranslateY(['.ani_11'], ['1rem', '0', ], 1000, 1000);
                aniTranslateY(['.ani_12'], ['1rem', '0', ], 1000, 1500);
            }
        }
    });

    var indexbanner2 = new Swiper('.index-banner2 .swiper-container', {
        loop:true,
        slidesPerView: 5,
        centeredSlides: true,
        spaceBetween: 40,
        pagination: {
            el: '.index-banner2 .swiper-pagination',
            clickable: true,

        },
        navigation: {
            nextEl: '.index_next1',
            prevEl: '.index_prev1',
        },
        on:{
            slideChangeTransitionEnd: function () {
            },
            slideChangeTransitionStart:function () {
                var index = $('.index-banner2 .swiper-slide-active').attr('data-swiper-slide-index');
                console.log(index);
            },
            slideNextTransitionStart: function () {
                $('.index_prev1').css("cssText", "background:url(./images/turn_left_def.png) no-repeat center !important;background-size:cover !important;");
                $('.index_next1').css("cssText", "background:url(./images/turn_right_act.png) no-repeat center !important;background-size:cover !important;");
            },
            slidePrevTransitionStart: function () {
                $('.index_prev1').css("cssText", "background:url(./images/turn_left_act.png) no-repeat center !important;background-size:cover !important;");
                $('.index_next1').css("cssText", "background:url(./images/turn_right_def.png) no-repeat center !important;background-size:cover !important;");
            }
        }
    });

    var indexbanner3 = new Swiper('.index-banner3 .swiper-container', {
        loop:true,
        slidesPerView: 3,
        centeredSlides: true,
        spaceBetween: 40,
        pagination: {
            el: '.index-banner3 .swiper-pagination',
            type: 'fraction',
            // renderFraction: function (currentClass, totalClass) {
            //     return '<span class="' + currentClass + '"></span>' +
            //         ' of ' +
            //         '<span class="' + totalClass + '"></span>';
            // },
        },
        navigation: {
            nextEl: '.index_next2',
            prevEl: '.index_prev2',
        },
        on:{
            slideChangeTransitionEnd: function () {
            },
            slideChangeTransitionStart:function () {
                var index = $('.index-banner3 .swiper-slide-active').attr('data-swiper-slide-index');
                console.log(index);
                index++;
                $(".index-banner3").find(".index_swiperNum .currnum").html(index<=10?"0"+index:index);

            },
            slideNextTransitionStart: function () {
                $('.index_prev2').css("cssText", "background:url(./images/turn_left_def.png) no-repeat center !important;background-size:cover !important;");
                $('.index_next2').css("cssText", "background:url(./images/turn_right_def.png) no-repeat center !important;background-size:cover !important;");
            },
            slidePrevTransitionStart: function () {
                $('.index_prev2').css("cssText", "background:url(./images/turn_left_def.png) no-repeat center !important;background-size:cover !important;");
                $('.index_next2').css("cssText", "background:url(./images/turn_right_def.png) no-repeat center !important;background-size:cover !important;");
            }
        }
    });
     //获取轮播总个数
    var banner3total=indexbanner3.$el.find(".swiper-pagination-total").html();
    $(".index-banner3").find(".index_swiperNum .total").html(banner3total<=10?"0"+banner3total:banner3total);


    var indexbanner4 = new Swiper('.index-banner4 .swiper-container', {
        loop:true,
        slidesPerView: 4,
        // centeredSlides: true,
        spaceBetween: 30,
        pagination: {
            el: '.index-banner4 .swiper-pagination',
            type: 'fraction',
            // renderFraction: function (currentClass, totalClass) {
            //     return '<span class="' + currentClass + '"></span>' +
            //         ' of ' +
            //         '<span class="' + totalClass + '"></span>';
            // },
        },
        navigation: {
            nextEl: '.index_next3',
            prevEl: '.index_prev3',
        },
        on:{
            slideChangeTransitionEnd: function () {
            },
            slideChangeTransitionStart:function () {
                var index = $('.index-banner4 .swiper-slide-active').attr('data-swiper-slide-index');
                console.log(index);
                index++;
                $(".index-banner4").find(".index_swiperNum .currnum").html(index<=10?"0"+index:index);

            },
            slideNextTransitionStart: function () {
                $('.index_prev3').css("cssText", "background:url(./images/turn_left_def.png) no-repeat center !important;background-size:cover !important;");
                $('.index_next3').css("cssText", "background:url(./images/turn_right_def.png) no-repeat center !important;background-size:cover !important;");
            },
            slidePrevTransitionStart: function () {
                $('.index_prev3').css("cssText", "background:url(./images/turn_left_def.png) no-repeat center !important;background-size:cover !important;");
                $('.index_next3').css("cssText", "background:url(./images/turn_right_def.png) no-repeat center !important;background-size:cover !important;");
            }
        }
    });
    //获取轮播总个数
    var banner4total=indexbanner4.$el.find(".swiper-pagination-total").html();
    $(".index-banner4").find(".index_swiperNum .total").html(banner4total<=10?"0"+banner4total:banner4total);


})

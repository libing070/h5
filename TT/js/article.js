$(function () {
    init();
});

async  function init() {
    await loadModule();
    await initSwiper();
    await activemouseEvents();
}
 loadModule = () => {
    $("#article .header").load("header.html");//加载头部导航
    $("#article .index-banner1").load("topswiper.html");//加载头部轮播
     $("#article .index-banner3").load("weeklyleaderboard.html");//加载头部轮播
    $("#article .footer").load("footer.html");//加载底部导航
}
 activemouseEvents = () => {
    setTimeout(function () {
        $('#article .header .nav ul li').hover(function () {
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

        $('.article-list .box .content ').hover(function () {
            $(this).find('.desc').stop().slideDown();
        }, function () {
            $(this).find('.desc').stop().slideUp();
        });

    },10);
}

initSwiper=()=>{
    setTimeout(function () {
        var indexbanner1 = new Swiper('.index-banner1 .swiper-container', {
            loop:true,
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true, //修改swiper的父元素时，自动初始化swiper
            slidesPerView: 1,
            centeredSlides: true,
            spaceBetween: 0,
            navigation: {
                nextEl: '.index_next1',
                prevEl: '.index_prev1',
            },
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

        var indexbanner2 = new Swiper('.index-banner3 .swiper-container', {
            loop:true,
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true, //修改swiper的父元素时，自动初始化swiper
            slidesPerView: 5,
            // centeredSlides: true,
            spaceBetween: 40,
            pagination: {
                el: '.index-banner3 .swiper-pagination',
                clickable: true,

            },

            on:{
                slideChangeTransitionEnd: function () {
                },
                slideChangeTransitionStart:function () {
                    var index = $('.index-banner3 .swiper-slide-active').attr('data-swiper-slide-index');
                    console.log(index);
                },

            }
        });

    },500);
}

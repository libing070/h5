$(function () {
    var swiper1 = new Swiper('.containerOuter,swiper-container', {
        direction: 'vertical',
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        mousewheel: true,
        on: {
            slideChangeTransitionStart: function () {
                console.log(this.activeIndex)
                $('.scrollBar .p1').html('0' + (this.activeIndex + 1))
                aniReset();
                $('.module6').removeClass('module6_back');
                $('.recruit').removeClass('module7_back');
                // console.log(this.activeIndex);
                if (this.activeIndex == $('.module1').index('.outerSlide')) {
                    aniTranslateY(['.ani_1'], ['1rem', '0', ], 1000, 500);
                    aniTranslateY(['.ani_2'], ['1rem', '0', ], 1000, 1000);
                    aniTranslateY(['.ani_3'], ['1rem', '0', ], 1000, 500);
                    aniTranslateY(['.ani_4'], ['1rem', '0', ], 1000, 1000);
                    aniTranslateY(['.ani_5'], ['1rem', '0', ], 1000, 500);
                    aniTranslateY(['.ani_6'], ['1rem', '0', ], 1000, 1000);
                    aniTranslateY(['.ani_7'], ['1rem', '0', ], 1000, 1500);
                    aniTranslateY(['.ani_8'], ['1rem', '0', ], 1000, 2000);
                    aniTranslateY(['.ani_9'], ['1rem', '0', ], 1000, 2500);
                    aniTranslateY(['.ani_10'], ['1rem', '0', ], 1000, 500);
                    aniTranslateY(['.ani_11'], ['1rem', '0', ], 1000, 1000);
                    aniTranslateY(['.ani_12'], ['1rem', '0', ], 1000, 1500);
                    aniTranslateX(['.ani_13'], ['70%', '0', ], 1000, 2000);
                    aniTranslateX(['.ani_14'], ['100%', '0', ], 1000, 3000);
                    for (let i = 1; i <= 12; i++) {
                        aniTranslateX(['.ani_' + (i + 14)], ['2rem', '0', ], 1000, (2500 + 200 * i));
                    }
                }
                if (this.activeIndex == $('.module2').index('.outerSlide')) {
                    aniRound(['.aniR_1'], [00, 17], 1, 3000);
                    aniRound(['.aniR_2'], [000, 900], 1, 3000);
                    aniRound(['.aniR_3'], [000, 600], 1, 3000);
                    aniRound(['.aniR_4'], [00, 40], 1, 3000);
                    aniTranslateY(['.ani_27'], ['1rem', '0', ], 1000, 500);
                    aniTranslateY(['.ani_28'], ['1rem', '0', ], 1000, 1000);
                    aniTranslateY(['.ani_29'], ['-1rem', '0', ], 1000, 1500);
                }
                if (this.activeIndex == $('.module3').index('.outerSlide')) {
                    // aniTranslateW(['.pro_p1'],)
                    aniTranslateX(['.ani_30'], ['-1rem', '0', ], 1000, 500);
                    aniTranslateX(['.ani_31'], ['-1rem', '0', ], 1000, 1000);
                    aniTranslateX(['.ani_32'], ['-1rem', '0', ], 1000, 1500);
                }
                if (this.activeIndex == $('.module4').index('.outerSlide')) {
                    aniTranslateY(['.ani_33'], ['1rem', '0', ], 1000, 500);
                    aniTranslateY(['.ani_34'], ['1rem', '0', ], 1000, 1000);
                    aniTranslateY(['.ani_35'], ['1rem', '0', ], 1000, 1500);
                }
                if (this.activeIndex == $('.module5').index('.outerSlide')) {
                    aniTranslateY(['.aniN_1'], ['0.5rem', '0', ], 1000, 500);
                    aniTranslateY(['.ani_36'], ['1rem', '0', ], 1000, 500);
                    aniTranslateY(['.ani_37'], ['1rem', '0', ], 1000, 1000);
                }
                if (this.activeIndex == $('.module6').index('.outerSlide')) {
                    aniTranslateX(['.ani_38'], ['-2rem', '0', ], 1000, 500);
                    aniTranslateX(['.ani_39'], ['-2rem', '0', ], 1000, 700);
                    aniTranslateX(['.ani_40'], ['-2rem', '0', ], 1000, 900);
                    aniTranslateX(['.ani_41'], ['-2rem', '0', ], 1000, 1100);
                    aniTranslateX(['.ani_42'], ['-2rem', '0', ], 1000, 1200);
                    aniTranslateW(['.line_contcat1'], ['0%', '100%', ], 1000, 2000);
                    aniTranslateX(['.ani_43'], ['-2rem', '0', ], 1000, 1400);
                    aniTranslateW(['.line_contcat2'], ['0%', '100%', ], 1000, 2400);
                    aniTranslateX(['.ani_44'], ['2rem', '0', ], 1000, 500);
                    aniTranslateX(['.ani_45'], ['2rem', '0', ], 1000, 600);
                    aniTranslateX(['.ani_46'], ['2rem', '0', ], 1000, 700);
                    aniTranslateX(['.ani_47'], ['2rem', '0', ], 1000, 800);
                    aniTranslateX(['.ani_48'], ['2rem', '0', ], 1000, 900);
                    aniTranslateX(['.ani_49'], ['2rem', '0', ], 1000, 1000);
                    aniTranslateX(['.ani_50'], ['2rem', '0', ], 1000, 1100);
                    aniTranslateX(['.ani_51'], ['2rem', '0', ], 1000, 1200);
                    aniTranslateX(['.ani_52'], ['2rem', '0', ], 1000, 1300);
                    aniTranslateX(['.ani_53'], ['2rem', '0', ], 1000, 1400);
                    aniTranslateX(['.ani_54'], ['2rem', '0', ], 1000, 1500);
                    aniTranslateX(['.ani_55'], ['2rem', '0', ], 1000, 1600);
                    aniTranslateT(['.ani_56'], ['60%', '40%', ], 1000, 1800);
                    aniTranslateW(['.line_qrcode'], ['0%', '100%', ], 1000, 2800);
                    $('.module6 .reImg').addClass('module6_back');
                }
                if (this.activeIndex == $('.module7').index('.outerSlide')) {
                    aniTranslateY(['.ani_57'], ['1rem', '0', ], 1000, 500);
                    aniTranslateY(['.ani_58'], ['1rem', '0', ], 1000, 1000);
                    aniTranslateY(['.ani_59'], ['1rem', '0', ], 1000, 1500);
                    aniTranslateX(['.ani_61'], ['2rem', '0', ], 1000, 1600);
                    aniTranslateX(['.ani_62'], ['2rem', '0', ], 1000, 1700);
                    aniTranslateX(['.ani_63'], ['2rem', '0', ], 1000, 1800);
                    aniTranslateX(['.ani_64'], ['2rem', '0', ], 1000, 1900);
                    aniTranslateX(['.ani_65'], ['2rem', '0', ], 1000, 2000);
                    aniTranslateY(['.ani_60'], ['1rem', '0', ], 1000, 2000);
                    aniTranslateX(['.ani_66'], ['2rem', '0', ], 1000, 2100);
                    aniTranslateX(['.ani_67'], ['2rem', '0', ], 1000, 2200);
                    aniTranslateX(['.ani_68'], ['2rem', '0', ], 1000, 2300);
                    aniTranslateX(['.ani_69'], ['2rem', '0', ], 1000, 2400);
                    aniTranslateX(['.ani_70'], ['2rem', '0', ], 1000, 2500);
                    $('.module7 .reImg').addClass('module7_back');
                }
                if (this.activeIndex == $('.module8').index('.outerSlide')) {
                    aniTranslateY(['.ani_71'], ['1rem', '0', ], 1000, 500);
                    aniTranslateY(['.ani_72'], ['1rem', '0', ], 1000, 1000);
                    aniTranslateY(['.ani_73'], ['1rem', '0', ], 1000, 1500);
                    aniTranslateY(['.ani_74'], ['1rem', '0', ], 1000, 2000);
                    aniTranslateY(['.ani_75'], ['1rem', '0', ], 1000, 2500);
                }
                if (this.activeIndex == $('.module9').index('.outerSlide')) {
                    aniTranslateY(['.ani_76'], ['1rem', '0', ], 1000, 500);
                }
            },
            slideNextTransitionStart: function () {
                for (let i = 1; i <= this.activeIndex; i++) {
                    $('.scrollBar ul li').eq(i).attr('class', 'active');
                }
                if (this.activeIndex == 8) {
                    $('.whiteIcon').attr('src', './images/redIcon.png');
                    $('.p2').css('color', '#e90010');
                } else {
                    $('.whiteIcon').attr('src', './images/whiteIcon.png');
                }
            },
            slidePrevTransitionStart: function () {
                var index = this.activeIndex;
                for (let i = $('.scrollBar ul li').length; i > this.activeIndex; i--) {
                    console.log(i)
                    $('.scrollBar ul li').eq(i).attr('class', '');
                }

                $('.whiteIcon').attr('src', './images/whiteIcon.png');
                $('.p2').css('color', '#fff');
            },
        },
    });
    var swiper2 = new Swiper('.indexSwiper,swiper-container', {
        loop: true,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        navigation: {
            nextEl: '.indexSwiper_next',
            prevEl: '.indexSwiper_prev',
        },
        on: {
            slideChangeTransitionStart: function (swiper) { //滑动父级需要激活滚轮事件
                var index = $('.indexSwiper .swiper-slide-active').attr('data-swiper-slide-index');
                // console.log(index);
                aniReset();
                if (index == 0) {
                    // aniTranslateW(['.ani_0'], ['0', '1rem', ], 4000, 500);
                    aniTranslateY(['.ani_1'], ['1rem', '0', ], 1000, 500);
                    aniTranslateY(['.ani_2'], ['1rem', '0', ], 1000, 1000);
                }
                if (index == 1) {
                    aniTranslateY(['.ani_3'], ['1rem', '0', ], 1000, 500);
                    aniTranslateY(['.ani_4'], ['1rem', '0', ], 1000, 1000);
                    aniTranslateY(['.ani_5'], ['1rem', '0', ], 1000, 500);
                    aniTranslateY(['.ani_6'], ['1rem', '0', ], 1000, 1000);
                    aniTranslateY(['.ani_7'], ['1rem', '0', ], 1000, 1500);
                    aniTranslateY(['.ani_8'], ['1rem', '0', ], 1000, 2000);
                    aniTranslateY(['.ani_9'], ['1rem', '0', ], 1000, 2500);
                }
                if (index == 2) {
                    aniTranslateY(['.ani_10'], ['1rem', '0', ], 1000, 500);
                    aniTranslateY(['.ani_11'], ['1rem', '0', ], 1000, 1000);
                    aniTranslateY(['.ani_12'], ['1rem', '0', ], 1000, 1500);
                    aniTranslateX(['.ani_13'], ['70%', '0', ], 1000, 2000);
                    aniTranslateX(['.ani_14'], ['100%', '0', ], 1000, 3000);
                    for (let i = 1; i <= 12; i++) {
                        aniTranslateX(['.ani_' + (i + 14)], ['2rem', '0', ], 1000, (2500 + 200 * i));
                    }
                }

            },
            slideNextTransitionStart: function () {
                $('.indexSwiper_prev').css("cssText", "background:url(./images/turn_left_def.png) no-repeat center !important;background-size:cover !important;");
                $('.indexSwiper_next').css("cssText", "background:url(./images/turn_right_act.png) no-repeat center !important;background-size:cover !important;");
            },
            slidePrevTransitionStart: function () {
                // console.log(1)
                $('.indexSwiper_prev').css("cssText", "background:url(./images/turn_left_act.png) no-repeat center !important;background-size:cover !important;");
                $('.indexSwiper_next').css("cssText", "background:url(./images/turn_right_def.png) no-repeat center !important;background-size:cover !important;");
            }
        },
    });


    var num = 1;
    if (num > 1) {
        var swiper3 = new Swiper('.about_us,swiper-container', {
            loop: true,
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true, //修改swiper的父元素时，自动初始化swiper
            navigation: {
                nextEl: '.about_us_next',
                prevEl: '.about_us_prev',
            },
        });
    } else {
        var swiper3 = new Swiper('.about_us,swiper-container', {
            loop: false,
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true, //修改swiper的父元素时，自动初始化swiper
            navigation: {
                nextEl: '.about_us_next',
                prevEl: '.about_us_prev',
            },
        });
    }
    //d导航事件
    $('.nav li').on('click', function () {
        if ($(this).index() == 5) { //关于我们
            var index = $('.module2').index('.outerSlide');
            swiper1.slideTo(index);
        }
        if ($(this).index() == 4) { //服务与产品
            var index = $('.module3').index('.outerSlide');
            swiper1.slideTo(index);
        }
        if ($(this).index() == 3) { //案例展示
            var index = $('.module4').index('.outerSlide');
            swiper1.slideTo(index);
        }
        if ($(this).index() == 2) { //新意资讯
            var index = $('.module5').index('.outerSlide');
            swiper1.slideTo(index);
        }
        if ($(this).index() == 1) { //职达新意
            var index = $('.module7').index('.outerSlide');
            swiper1.slideTo(index);
        }
        if ($(this).index() == 0) { //智库
            var index = $('.module8').index('.outerSlide');
            swiper1.slideTo(index);
        }
    });

})
$(function () {

    // aniTranslateX('.ani_3', ['0', '1rem', ], 4000, 100, true);
});
//动画
function aniTranslateX(className, unit, duration, delay, loop) {
    anime({
        targets: className,
        translateX: unit,
        opacity: 1,
        duration: 1000,
        delay: delay,
        loop: false,
        easing: 'easeOutQuad'
    });
}

function aniTranslateY(className, unit, duration, delay) {
    anime({
        targets: className,
        translateY: unit,
        opacity: 1,
        duration: duration,
        delay: delay,
        loop: false,
        easing: 'easeOutQuad'
    });
}

function aniTranslateT(className, unit, duration, delay) {
    anime({
        targets: className,
        top: unit,
        opacity: 1,
        duration: duration,
        delay: delay,
        loop: false,
        easing: 'easeOutQuad'
    });
}

function aniTranslateW(className, unit, duration, delay) {
    anime({
        targets: className,
        width: unit,
        opacity: 1,
        duration: duration,
        delay: delay,
        loop: false,
        easing: 'easeOutQuad'
    });
}

function aniRound(className, range, round) {
    anime({
        targets: className,
        innerHTML: range,
        opacity: 1,
        easing: 'linear',
        round: round, // Will round the animated value to 1 decimal
        delay: 100,
        easing: 'easeOutQuad'
    });
}

function aniScale(className, unit, duration, delay) {
    anime({
        targets: className,
        scale: unit,
        duration: 2000,
        delay: delay,
        loop: false,
        easing: 'easeOutQuad'
    });
}
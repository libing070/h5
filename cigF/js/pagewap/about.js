$(function () {
    var swiper = new Swiper('.banner4-swpier1', {
        slidesPerView: 3,
        spaceBetween: 10,
        slidesPerGroup: 3,
        loopFillGroupWithBlank: true,
        pagination: {
            el: '.swpier1-swiper-pagination',
            clickable: true,
        },
    });

    var swiper1 = new Swiper('.banner5-swpier1', {
        slidesPerGroup: 3,
        loopFillGroupWithBlank: true,
        slidesPerView: 3,
        spaceBetween: 0,
        pagination: {
            el: '.swpier2-swiper-pagination',
            clickable: true,
        },
    });

    var teamSwiper = new Swiper('.teamSwiper,swiper-container', {
        loop: true,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        centeredSlides: true,
        navigation: {
            nextEl: '.team_next',
            prevEl: '.team_prev',
        },
        // pagination: {
        //     el: '.previous_pagination',
        // },
        slidesPerView: 'auto',
        spaceBetween: 30,
        on: {
            slideNextTransitionStart: function () {
                $('.team_prev').css("cssText", "background:url(../images/turn_left_black.png) no-repeat center !important;background-size:cover !important;");
                $('.team_next').css("cssText", "background:url(../images/turn_right_act.png) no-repeat center !important;background-size:cover !important;");
            },
            slidePrevTransitionStart: function () {
                $('.team_prev').css("cssText", "background:url(../images/turn_left_act.png) no-repeat center !important;background-size:cover !important;");
                $('.team_next').css("cssText", "background:url(../images/turn_right_black.png) no-repeat center !important;background-size:cover !important;");
            }
        }
    });
    $('.develop_next').on('click', function () {
        if ($('.developBtn').attr('clickType') == 1) {
            $('.developBtn').attr('clickType', '2');
        } else {
            return
        }
        $('.developSwiper .active').next().addClass('active');
        var activeIndex = $('.developSwiper .active').index();//当前li的下标
        if(activeIndex>=8){
            $('.developBtn').attr('clickType', '1');
            $('.developSwiper .active').next().removeClass('active');
            return
        }
        console.log(activeIndex);
        $('.developSwiper .item').eq(activeIndex).removeClass('active');
        var activeLiWidth = $('.developSwiper .item').eq(activeIndex).width();//当前li的宽度
        var initTranslate = $('.developSwiper').css("transform").split(',')[4];
        aniTranslateX(['.developSwiper'], [initTranslate, (initTranslate - activeLiWidth) -(activeIndex==7?0:10)+ 'px'], 1000, 0);
        console.log(initTranslate, activeLiWidth)
    });
    $('.develop_prev').on('click', function () {
        if ($('.developBtn').attr('clickType') == 1) {
            $('.developBtn').attr('clickType', '2');
        } else {
            return
        }
        $('.developSwiper .active').prev().addClass('active');
        var activeIndex = $('.developSwiper .active').index();
        if(activeIndex<=0){
            $('.developBtn').attr('clickType', '1');
          $('.developSwiper .active').prev().removeClass('active');
            return
        }
        var activeLiWidth = $('.developSwiper .item').eq(activeIndex).width();//上一个li的宽度
        $('.developSwiper .item').eq(++activeIndex).removeClass('active');

        var initTranslate = $('.developSwiper').css("transform").split(',')[4];
        aniTranslateX(['.developSwiper'], [parseInt(initTranslate), (parseInt(initTranslate) + activeLiWidth)+10 + 'px'], 1000, 0);
        console.log(activeIndex, parseInt(initTranslate), activeLiWidth)
    });

function aniTranslateX(className, unit, duration, delay, loop) {
    anime({
        targets: className,
        translateX: unit,
        duration: 1000,
        delay: delay,
        loop: false,
        easing: 'easeOutQuad',
        complete: function (anim) {
            // console.log(anim)
            var activeIndex = $('.developSwiper .active').index();
            console.log(activeIndex);
            setTimeout(() => {
          //       if (activeIndex == 11) {
          //           $('.developSwiper .item').removeClass('active');
          //           $('.developSwiper .item').eq(3).addClass('active');
          //           $('.developSwiper').css("transform", "translateX(-1rem)");
          //       }
          //       if (activeIndex == 3) {
          //           $('.developSwiper .item').removeClass('active');
          //           $('.developSwiper .item').eq(11).addClass('active');
          //           $('.developSwiper').css("transform", "translateX(34rem)");
          //       }
                $('.developBtn').attr('clickType', '1');
            }, 100);
        }
    });
}

});
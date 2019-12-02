$(function () {
    //wap移动端导航事件
    $("#wapNavMenu").on("click",".menu",function () {
        var that=this;
        var currIndex=0;
        for(var i=0;i<$(".outerSlide").length;i++){//安卓机 视频层级太高
            if($(".outerSlide").eq(i).hasClass("swiper-slide-active")){
                currIndex=i;
                break;
            }
        }
        if($(".menu-content").hasClass("close")){
            if(isAndroid()&&currIndex==0) {
                $(".module1 .banner1 .play video").hide();//安卓机 视频层级太高
                //$(".module1 .banner1 .play video").addClass('module1-banner1-video');
            }
            aniTranslateX(['.menu-content'], ['100%', '0', ], 200, 200);
            $(".menu-content").removeClass("close");
            setTimeout(function () {
                $(that).attr("src","images/wap/nav-menu-close.jpg");
            },200)

        }else{
            if(isAndroid()&&currIndex==0) {
                $(".module1 .banner1 .play video").show();//安卓机 视频层级太高
               //$(".module1 .banner1 .play video").removeClass('module1-banner1-video');
            }
            aniTranslateX(['.menu-content'], ['0', '100%', ], 200, 200);
            $(".menu-content").addClass("close");
            setTimeout(function () {
                $(that).attr("src","images/wap/nav-menu.jpg");
            },200)
        }
    });


    var swiper1 = new Swiper('.containerOuter,swiper-container', {
        direction: 'vertical',
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        // mousewheel: true,
       // speed:500,
        navigation:{
            nextEl:'.scroll-more .arrow_icon_btn'
        },
        on: {
            slideNextTransitionStart: function () {

            },
            slidePrevTransitionStart: function () {

            },
            slideChangeTransitionEnd: function(){
                //案例视频全部停止播放
                var len=$(".caseSwiper").find("video").length;
                $(".caseSwiper .case-swiper-video-btn").show();
                for(var i=0;i<len;i++){
                    $(".caseSwiper").find("video").get(i).pause();
                }
            },
            slideChangeTransitionStart: function () {
                $(".scroll-more").show();
                aniResetWap();
                $(".outerSlide").removeClass("module_back_scale");
                if(isAndroid()) {
                    $(".module1 .banner1 .play video").hide();//安卓机 视频层级太高
                }
                if (this.activeIndex == $('.module1').index('.outerSlide')) {
                    if(isAndroid()) {
                        $(".module1 .banner1 .play video").show();//安卓机 视频层级太高
                    }
                    var index = $('.indexSwiper .swiper-slide-active').attr('data-swiper-slide-index');
                    switch(index) {
                        case '0':
                            aniTranslateY(['.wap_ani_1'], ['1rem', '0', ], 4000, 500);
                            aniTranslateY(['.wap_ani_2'], ['1rem', '0', ], 4000, 1000);
                            $(".swiper-button").css("left","10%").css("top","84%");
                            break;
                        case '1':
                            aniTranslateY(['.wap_ani_3'], ['1rem', '0', ], 4000, 500);
                            aniTranslateY(['.wap_ani_4'], ['1rem', '0', ], 4000, 1000);
                            aniTranslateY(['.wap_ani_6'], ['1rem', '0', ], 4000, 500);
                            aniTranslateY(['.wap_ani_7'], ['1rem', '0', ], 4000, 1000);
                            aniTranslateY(['.wap_ani_8'], ['1rem', '0', ], 4000, 1000);
                            aniTranslateY(['.wap_ani_9'], ['1rem', '0', ], 4000, 1000);
                            $(".swiper-button").css("left","6%").css("top","40%");
                            break;
                        case '2':
                            aniTranslateY(['.wap_ani_10'], ['1rem', '0', ], 4000, 500);
                            aniTranslateY(['.wap_ani_11'], ['1rem', '0', ], 4000, 1000);
                            aniTranslateY(['.wap_ani_13'], ['1rem', '0', ], 4000, 500);
                            aniTranslateY(['.wap_ani_14'], ['1rem', '0', ], 4000, 1000);
                            aniTranslateY(['.wap_ani_15'], ['1rem', '0', ], 4000, 1500);
                            aniTranslateY(['.wap_ani_16'], ['1rem', '0', ], 4000, 2000);
                            aniTranslateY(['.wap_ani_166'], ['1.5rem', '0', ], 4000, 2500);
                            $(".banner3 .banner_top .txt_margin").css("margin-bottom","10%");
                            $(".swiper-button").css("left","6%").css("top","40%");
                            break;
                        default:

                    }
                }
                if (this.activeIndex == $('.module2').index('.outerSlide')) {
                    aniTranslateY(['.wap_ani_17'], ['1rem', '0', ], 1000, 500);
                    aniTranslateY(['.wap_ani_18'], ['1rem', '0', ], 1000, 1000);
                    aniTranslateY(['.wap_ani_19'], ['-1rem', '0', ], 1000, 1000);
                    aniRound(['.wap_aniR_1'], ['00', 17], 1, 3000);
                    aniRound(['.wap_aniR_2'], ['000', 100], 1, 3000);
                    aniRound(['.wap_aniR_3'], ['0', 3], 1, 3000);
                    aniRound(['.wap_aniR_4'], ['000', 500], 1, 3000);
                }
                if(this.activeIndex == $('.module3').index('.outerSlide')){
                    $('.module3_1').css('transition','all 1s').css("height",'33%').find("a").css("opacity",1);
                    $('.module3_2').css('transition','all 1s').css("height",'33%').find("a").css("opacity",1);
                    $('.module3_3').css('transition','all 1s').css("height",'33%').find("a").css("opacity",1);
                    $('.module3_1,.module3_2,.module3_3').find(".con").css('transition','all 1s').hide();
                           aniTranslateY(['.wap_ani_21'], ['1rem', '0', ], 4000, 500);
                            aniTranslateY(['.wap_ani_22'], ['1rem', '0', ], 4000, 1000);
                            // aniTranslateY(['.wap_ani_23'], ['1rem', '0', ], 4000, 1500);
                            aniTranslateY(['.wap_ani_27'], ['1rem', '0', ], 4000, 500);
                            aniTranslateY(['.wap_ani_28'], ['1rem', '0', ], 4000, 1000);
                            // aniTranslateY(['.wap_ani_29'], ['1rem', '0', ], 4000, 1500);
                            aniTranslateY(['.wap_ani_24'], ['1rem', '0', ], 4000, 500);
                            aniTranslateY(['.wap_ani_25'], ['1rem', '0', ], 4000, 1000);
                            // aniTranslateY(['.wap_ani_26'], ['1rem', '0', ], 4000, 1500);
                    // var index = $('.productSwiper .swiper-slide-active').attr('data-swiper-slide-index');
                    // $(".swiper-button").css("left","10%").css("top","84%");
                    // switch(index) {
                    //     case '0':
                    //         aniTranslateY(['.wap_ani_21'], ['1rem', '0', ], 4000, 500);
                    //         aniTranslateY(['.wap_ani_22'], ['1rem', '0', ], 4000, 1000);
                    //         aniTranslateY(['.wap_ani_23'], ['1rem', '0', ], 4000, 1500);
                    //         break;
                    //     case '1':
                    //         aniTranslateY(['.wap_ani_24'], ['1rem', '0', ], 4000, 500);
                    //         aniTranslateY(['.wap_ani_25'], ['1rem', '0', ], 4000, 1000);
                    //         aniTranslateY(['.wap_ani_26'], ['1rem', '0', ], 4000, 1500);
                    //         break;
                    //     case '2':
                    //         aniTranslateY(['.wap_ani_27'], ['1rem', '0', ], 4000, 500);
                    //         aniTranslateY(['.wap_ani_28'], ['1rem', '0', ], 4000, 1000);
                    //         aniTranslateY(['.wap_ani_29'], ['1rem', '0', ], 4000, 1500);
                    //         break;
                    //     default:
                    //
                    // }
                }
                if(this.activeIndex == $('.module4').index('.outerSlide')){
                    $(".caseSwiper .server-user,.caseSwiper .name").css('opacity', '0');
                    aniTranslateY(['.server-user'], ['1rem', '0', ], 4000, 500);
                    aniTranslateY(['.name'], ['1rem', '0', ], 4000, 1000);
                }
                if(this.activeIndex == $('.module5').index('.outerSlide')){
                    $(".news-swiper .t,.news-swiper .content").css('opacity', '0');
                    aniTranslateY(['.news-swiper .swiper-slide-active .t'], ['1rem', '0', ], 1000, 100);
                    aniTranslateY(['.news-swiper .swiper-slide-active .content'], ['1rem', '0', ], 1000, 500);
                }
                if(this.activeIndex == $('.module6').index('.outerSlide')){
                    $(".module6").addClass("module_back_scale");
                    aniTranslateY(['.wap_ani_30'], ['-1rem', '0',], 4000, 400);
                    aniTranslateY(['.wap_ani_31'], ['-1rem', '0',], 4000, 200);
                    aniTranslateY(['.wap_ani_32'], ['1rem', '0',], 4000, 600);
                    aniTranslateY(['.wap_ani_33'], ['1rem', '0',], 4000, 800);
                    aniTranslateY(['.wap_ani_34'], ['1rem', '0',], 4000, 1000);
                    aniTranslateY(['.wap_ani_35'], ['1rem', '0',], 4000, 1000);
                    aniTranslateX(['.wap_ani_36'], ['150%', '0',], 2000, 400);
                    aniTranslateX(['.wap_ani_37'], ['150%', '0',], 2000, 600);

                    aniTranslateX(['.wap_ani_38'], ['-150%', '0',], 2000, 400);
                    aniTranslateX(['.wap_ani_39'], ['-150%', '0',], 2000, 600);
                    aniTranslateX(['.wap_ani_40'], ['-150%', '0',], 2000, 800);

                    aniTranslateX(['.wap_ani_41'], ['-150%', '0',], 2000, 400);
                    aniTranslateX(['.wap_ani_42'], ['-150%', '0',], 2000, 600);
                    aniTranslateX(['.wap_ani_43'], ['-150%', '0',], 2000, 800);

                    aniTranslateX(['.wap_ani_44'], ['150%', '0',], 2000, 400);
                    aniTranslateX(['.wap_ani_45'], ['150%', '0',], 2000, 600);
                    aniTranslateX(['.wap_ani_46'], ['150%', '0',], 2000, 800);

                    aniTranslateX(['.wap_ani_47'], ['150%', '0',], 2000, 400);
                    aniTranslateX(['.wap_ani_48'], ['150%', '0',], 2000, 600);
                    aniTranslateX(['.wap_ani_49'], ['150%', '0',], 2000, 800);
                }
                if(this.activeIndex == $('.module7').index('.outerSlide')){
                    //招聘页面
                    $(".module7").addClass("module_back_scale");
                    aniTranslateY(['.wap_ani_50'], ['1rem', '0', ], 4000, 500);
                    aniTranslateY(['.wap_ani_51'], ['1rem', '0', ], 4000, 1000);
                    var hotjoblen=$(".module7 .hotjobsData").find("a").length;
                    $(".hotjobsData,.longrecruitData").find("a").css('opacity', '0');
                    for(var i=0;i<hotjoblen;i++){
                        aniTranslateY(['.hotjobs-a-'+i], ['1rem', '0',], 2000, 200*(i+1));
                    }
                    var longrecruitlen=$(".module7 .longrecruitData").find("a").length;
                    for(var i=0;i<longrecruitlen;i++){
                        aniTranslateY(['.longrecruit-a-'+i], ['1rem', '0',], 2000, 200*(i+1));
                    }
                }
                if(this.activeIndex == $('.module8').index('.outerSlide')){
                    $(".module8").addClass("module_back_scale");
                    $(".wap_ani_50,.wap_ani_51").css('opacity', '0');
                    aniTranslateY(['.wap_ani_50'], ['1rem', '0', ], 1000, 200);
                    aniTranslateY(['.wap_ani_51'], ['1rem', '0', ], 1000, 400);
                }
                if(this.activeIndex == $('.module9').index('.outerSlide')){
                    $(".scroll-more").hide();
                    $(".wap_ani_52,.wap_ani_53m,.wap_ani_54").css('opacity', '0');
                    aniTranslateY(['.wap_ani_52'], ['1rem', '0', ], 1000, 200);
                    aniTranslateY(['.wap_ani_53'], ['1rem', '0', ], 1000, 200);
                    aniTranslateY(['.wap_ani_54'], ['1rem', '0', ], 1000, 400);
                }
            }
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
            slideChangeTransitionStart: function () { //滑动父级需要激活滚轮事件
                var index = $('.indexSwiper .swiper-slide-active').attr('data-swiper-slide-index');
                aniResetWap();
                if (index == 0) {
                    aniTranslateY(['.wap_ani_1'], ['1rem', '0', ], 4000, 500);
                    aniTranslateY(['.wap_ani_2'], ['1rem', '0', ], 4000, 1000);
                    $(".swiper-button").css("left","10%").css("top","84%");

                }
                if (index == 1) {
                    aniTranslateY(['.wap_ani_3'], ['1rem', '0', ], 4000, 500);
                    aniTranslateY(['.wap_ani_4'], ['1rem', '0', ], 4000, 1000);
                    aniTranslateY(['.wap_ani_6'], ['1rem', '0', ], 4000, 500);
                    aniTranslateY(['.wap_ani_7'], ['1rem', '0', ], 4000, 1000);
                    aniTranslateY(['.wap_ani_8'], ['1rem', '0', ], 4000, 1000);
                    aniTranslateY(['.wap_ani_9'], ['1rem', '0', ], 4000, 1000);
                    $(".swiper-button").css("left","6%").css("top","40%");
                }
                if (index == 2) {
                    aniTranslateY(['.wap_ani_10'], ['1rem', '0', ], 4000, 500);
                    aniTranslateY(['.wap_ani_11'], ['1rem', '0', ], 4000, 1000);
                    aniTranslateY(['.wap_ani_13'], ['1rem', '0', ], 4000, 500);
                    aniTranslateY(['.wap_ani_14'], ['1rem', '0', ], 4000, 1000);
                    aniTranslateY(['.wap_ani_15'], ['1rem', '0', ], 4000, 1500);
                    aniTranslateY(['.wap_ani_16'], ['1rem', '0', ], 4000, 2000);
                    aniTranslateY(['.wap_ani_166'], ['1.5rem', '0', ], 4000, 2500);
                    $(".banner3 .banner_top .txt_margin").css("margin-bottom","10%");
                    $(".swiper-button").css("left","6%").css("top","40%");
                }
            },
            slideNextTransitionStart: function () {
                $('.indexSwiper_prev').css("cssText", "background:url(./images/wap/turn_left_def.png) no-repeat center !important;background-size:cover !important;");
                $('.indexSwiper_next').css("cssText", "background:url(./images/wap/turn_right_act.png) no-repeat center !important;background-size:cover !important;");
            },
            slidePrevTransitionStart: function () {
                // console.log(1)
                $('.indexSwiper_prev').css("cssText", "background:url(./images/wap/turn_left_act.png) no-repeat center !important;background-size:cover !important;");
                $('.indexSwiper_next').css("cssText", "background:url(./images/wap/turn_right_def.png) no-repeat center !important;background-size:cover !important;");
            }
        },
    });

    var swiper3 = new Swiper('.productSwiper,swiper-container', {
        loop: true,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        navigation: {
            nextEl: '.productSwiper_next',
            prevEl: '.productSwiper_prev',
        },
        on: {
            slideChangeTransitionStart: function () { //滑动父级需要激活滚轮事件
                var index = $('.productSwiper .swiper-slide-active').attr('data-swiper-slide-index');
                aniResetWap();
                if (index == 0) {
                    aniTranslateY(['.wap_ani_21'], ['1rem', '0', ], 4000, 500);
                    aniTranslateY(['.wap_ani_22'], ['1rem', '0', ], 4000, 1000);
                    aniTranslateY(['.wap_ani_23'], ['1rem', '0', ], 4000, 1500);
                }
                if (index == 1) {
                    aniTranslateY(['.wap_ani_24'], ['1rem', '0', ], 4000, 500);
                    aniTranslateY(['.wap_ani_25'], ['1rem', '0', ], 4000, 1000);
                    aniTranslateY(['.wap_ani_26'], ['1rem', '0', ], 4000, 1500);
                }
                if (index == 2) {
                    aniTranslateY(['.wap_ani_27'], ['1rem', '0', ], 4000, 500);
                    aniTranslateY(['.wap_ani_28'], ['1rem', '0', ], 4000, 1000);
                    aniTranslateY(['.wap_ani_29'], ['1rem', '0', ], 4000, 1500);

                }
            },
            slideNextTransitionStart: function () {
                $('.productSwiper_prev').css("cssText", "background:url(./images/wap/turn_left_def.png) no-repeat center !important;background-size:cover !important;");
                $('.productSwiper_next').css("cssText", "background:url(./images/wap/turn_right_act.png) no-repeat center !important;background-size:cover !important;");
            },
            slidePrevTransitionStart: function () {
                $('.productSwiper_prev').css("cssText", "background:url(./images/wap/turn_left_act.png) no-repeat center !important;background-size:cover !important;");
                $('.productSwiper_next').css("cssText", "background:url(./images/wap/turn_right_def.png) no-repeat center !important;background-size:cover !important;");
            }
        },
    });


$(".module3").on("click",'.item',function () {
    var index=$(this).index();

       if(index==0){
           $(this).css('transition','all 1s').css("height",'53%');
           $('.module3_2').css('transition','all 1s').css("height",'23%').find("a").css("opacity",0);
           $('.module3_3').css('transition','all 1s').css("height",'23%').find("a").css("opacity",0);
       }
      if(index==1){
        $(this).css('transition','all 1s').css("height",'53%');
        $('.module3_1').css('transition','all 1s').css("height",'23%').find("a").css("opacity",0);
        $('.module3_3').css('transition','all 1s').css("height",'23%').find("a").css("opacity",0);
      }
      if(index==2){
        $(this).css('transition','all 1s').css("height",'53%');
        $('.module3_1').css('transition','all 1s').css("height",'23%').find("a").css("opacity",0);
        $('.module3_2').css('transition','all 1s').css("height",'23%').find("a").css("opacity",0);
      }
    if($(this).hasClass("active")){
        $(this).removeClass("active").siblings().removeClass("active");
        $('.module3_1').css('transition','all 1s').css("height",'33%').find("a").css("opacity",1);
        $('.module3_2').css('transition','all 1s').css("height",'33%').find("a").css("opacity",1);
        $('.module3_3').css('transition','all 1s').css("height",'33%').find("a").css("opacity",1);
        $(this).find(".con").css('transition','all 1s').css("opacity",0).hide();
        return;
    }else{
        $(this).addClass("active").siblings().removeClass("active").find("a").css("opacity",0);
        $(this).find("a").css("opacity",1);
        $(this).find(".con").css('transition','all 1s').show().css("opacity",1);
        $(this).siblings().find(".con").css('transition','all 1s').hide().css("opacity",0);
    }
})

    var oaSwiper = new Swiper('.oa-swiper', {
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        slidesPerView: 'auto',
        mousewheel: true,
        loop:false,
        spaceBetween: 20,
        on:{
            slideChangeTransitionEnd: function () {

            }
        }
    });

    var oaSwiper2 = new Swiper('.oa-swiper2', {
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        slidesPerView: 'auto',
        mousewheel: true,
        loop:false,
        spaceBetween: 20,
        on:{
            slideChangeTransitionEnd: function () {

            }
        }
    });

    var downloadSwiper = new Swiper('.download-swiper', {
        direction: 'vertical',
        freeMode: true,
        slidesPerView:4,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper

    });

})
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
        duration: 1000,
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
        duration: 1000,
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

//重置动画
function aniResetWap() {
    for (let i = 0; i < 100; i++) {
        $('.wap_ani_' + i).css('opacity', '0');
    }
}
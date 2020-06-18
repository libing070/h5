$(function () {

    var swiper1 = new Swiper('.content.swiper-container', {
        direction: 'vertical',
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        mousewheel: true,
        longSwipesMs : 1000,
        longSwipes:false,
        threshold : 20,//拖动的临界值（单位为px），如果触摸距离小于该值滑块不会被拖动。
        on: {
            slideChangeTransitionStart: function () {
                console.log(this.activeIndex);
                $(".see-more-icon").attr("type",this.activeIndex);
                $('.see-more-icon').show();
                if(this.activeIndex == 0){
                    $('.logo').attr('src', './images/logo1.png');
                    $('.see-more-icon').attr('src', './images/see-more-icon1.png');
                    $(".menu span").css("color","white");
                }else if (this.activeIndex == 1) {
                    $('.logo').attr('src', './images/logo2.png?v=1');
                    $('.see-more-icon').attr('src', './images/see-more-icon2.png');
                    $(".menu span").css("color","#4B78EC");
                }else if (this.activeIndex == 2) {
                    $('.logo').attr('src', './images/logo2.png?v=1');
                    $('.see-more-icon').attr('src', './images/see-more-icon2.png');
                    $(".menu span").css("color","#4B78EC");
                }else if (this.activeIndex == 3) {
                    $('.logo').attr('src', './images/logo2.png?v=1');
                    $('.see-more-icon').attr('src', './images/see-more-icon2.png');
                    $(".menu span").css("color","#4B78EC");
                }else if (this.activeIndex == 4) {
                    $('.logo').attr('src', './images/logo2.png?v=1');
                    $('.see-more-icon').attr('src', './images/see-more-icon1.png');
                    $(".menu span").css("color","#4B78EC");
                }else if (this.activeIndex == 5) {
                    $('.logo').attr('src', './images/logo2.png?v=1');
                    $('.see-more-icon').attr('src', './images/see-more-icon2.png');
                    $(".menu span").css("color","#4B78EC");
                }else if (this.activeIndex == 6) {
                    $('.logo').attr('src', './images/logo1.png');
                    $('.see-more-icon').attr('src', './images/see-more-icon2.png');
                    $(".menu span").css("color","white");
                }else if (this.activeIndex == 7) {
                    $('.logo').attr('src', './images/logo1.png');
                    $('.see-more-icon').attr('src', './images/see-more-icon1.png');
                    $(".menu span").css("color","white");
                }else if (this.activeIndex == 8) {
                    $('.logo').attr('src', './images/logo2.png?v=1');
                    $('.see-more-icon').attr('src', './images/see-more-icon2.png');
                    $(".menu span").css("color","#4B78EC");
                }else if (this.activeIndex == 9) {
                    $('.logo').attr('src', './images/logo1.png');
                    $('.see-more-icon').attr('src', './images/see-more-icon1.png').hide();
                    $(".menu span").css("color","white");
                }

            },
            slideNextTransitionStart: function () {


            },
            slidePrevTransitionStart: function () {

            },
            slideChangeTransitionEnd: function(){

            },
        },
    });
    $(".content").on("click",".menu .active",function () {
        swiper1.slideTo(0);
    })
   $(".content").on("click",".see-more-icon",function () {
    var type=$(this).attr("type")
     swiper1.slideTo(++type);
   })
    var banner1 = new Swiper('.banner1 .swiper-container', {
        slidesPerView: 1,
        // spaceBetween: 30,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        preventClicksPropagation: false,
        pagination: {
            el: '.banner1 .swiper-pagination',
            clickable: true,
        },
    });

    var banner5 = new Swiper('.banner5 .swiper-container', {
        slidesPerView: 1,
        // spaceBetween: 30,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        preventClicksPropagation: false,
        pagination: {
            el: '.banner5 .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.banner5 .swiper-button-next',
            prevEl: '.banner5 .swiper-button-prev',
        },
    });
});


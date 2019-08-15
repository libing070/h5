$(function () {
    var viewSwiper = new Swiper('.view .swiper-container', {
        // loop: true,
        // autoplay: {
        //     delay: 4500,
        //     disableOnInteraction: false,
        // },
        on: {
            slideChangeTransitionStart: function () {
                updateNavPosition()
            },
            slideChangeTransitionEnd: function(event){
                $(".view").each(function () {
                    $(this).find("video").get(0).pause();
                    $(this).find("video").get(1).pause();
                    $(this).find("video").get(2).pause();
                    $(this).find("video").get(3).pause();
                })
            },
        },
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
    });
    var previewSwiper = new Swiper('.preview .swiper-container', {
        // visibilityFullFit: true,
        slidesPerView: '3',
        // allowTouchMove: true,
        on: {
            tap: function () {
                viewSwiper.slideTo(previewSwiper.clickedIndex);
                $(".view").each(function () {
                    $(this).find("video").get(0).pause();
                    $(this).find("video").get(1).pause();
                    $(this).find("video").get(2).pause();
                    $(this).find("video").get(3).pause();
                })
            }
        },
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
    });
    var mySwiper1 = new Swiper('.swiper2 .swiper-container', {
        loop: true,
        autoplay: true, //可选选项，自动滑动
        navigation: {
            nextEl: '.swiper-button-next1',
            prevEl: '.swiper-button-prev1',
        },
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        preventClicksPropagation: false,
        on: {
            click: function () {
                var activeIndex = $('.swiper2 .swiper-slide-active').attr('data-swiper-slide-index');
                activeIndex = parseInt(activeIndex);
                console.log(activeIndex);
                $('.header2 .btns a').eq(0).attr('class', '');
                $('.header2 .btns a').eq(1).attr('class', 'active');
                $('.content').hide();
                $('.content2').show(function () {
                    if (activeIndex) {
                        mySwiper3.slideTo(activeIndex);
                        activeIndex++;
                        $('.c2_2 img').attr('src', './images/c2_swiper/c2_param_0' + activeIndex + '.jpg');
                    } else {
                        mySwiper3.slideTo(0);
                        $('.c2_2 img').attr('src', './images/c2_swiper/c2_param_01.jpg');
                    }
                });
            }
        }
    });
    var mySwiper2 = new Swiper('.swiper3 .swiper-container', {
        loop: true,
        autoplay: true, //可选选项，自动滑动
        pagination: {
            el: '.swiper-pagination1',
        },
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
    });
    var mySwiper3 = new Swiper('.param_swiper .swiper-container', {
        loop: true,
        // autoplay: true, //可选选项，自动滑动
        navigation: {
            nextEl: '.swiper-button-next2',
            prevEl: '.swiper-button-prev2',
        },
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        on: {
            slideChangeTransitionEnd: function () {
                // var activeIndex = mySwiper3.activeIndex;
                // activeIndex++;
                // if (activeIndex) {
                //     $('.c2_2 img').attr('src', './images/c2_swiper/c2_param_0' + activeIndex + '.jpg');
                // } else {
                //     $('.c2_2 img').attr('src', './images/c2_swiper/c2_param_01.jpg');
                // }
            }
        }
    });
    var mySwiper4 = new Swiper('.spotSwiper .swiper-container', {
        loop: true,
        // autoplay: true, //可选选项，自动滑动
        pagination: {
            el: '.swiper-pagination2',
        },
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        on: {
            slideChangeTransitionEnd: function() {
                stm_clicki('send', 'event', '页面定位', '滑动', '车型亮点切换');
            }
        }

    });


    function updateNavPosition() {
        $('.preview .active-nav').removeClass('active-nav');
        var activeNav = $('.preview .swiper-slide').eq(viewSwiper.activeIndex).addClass('active-nav');
        if (!activeNav.hasClass('swiper-slide-visible')) {
            if (activeNav.index() > previewSwiper.activeIndex) {
                var thumbsPerNav = Math.floor(previewSwiper.width / activeNav.width()) - 1;
                previewSwiper.slideTo(activeNav.index() - thumbsPerNav)
            } else {
                previewSwiper.slideTo(activeNav.index())
            }
        }
    }
});
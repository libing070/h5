var swiper1 = new Swiper('.swiper1 .swiper-container', {
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next1',
        prevEl: '.swiper-button-prev1',
    },
    observer: true, //修改swiper自己或子元素时，自动初始化swiper
    observeParents: true, //修改swiper的父元素时，自动初始化swiper
    on: {
        click: function () {
            var activeIndex = parseInt($('.swiper1 .swiper-slide-active').attr('data-swiper-slide-index'));
            // console.log($('.swiper3').offset().top);

            $('html,body').animate({
                scrollTop: $('.swiper3').offset().top + 'px'
            }, 'slow');
            swiper3.slideTo(activeIndex++);
            // $('body').scrollTop();
        }
    },
    preventClicksPropagation: false,
})

var swiper2 = new Swiper('.swiper2 .swiper-container', {
    slidesPerView: 3,
    spaceBetween: 100,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    observer: true, //修改swiper自己或子元素时，自动初始化swiper
    observeParents: true, //修改swiper的父元素时，自动初始化swiper
});

var swiper3 = new Swiper('.swiper3 .swiper-container', {
    // loop: true,
    navigation: {
        nextEl: '.swiper-button-next2',
        prevEl: '.swiper-button-prev2',
    },
    on: {
        slideChangeTransitionEnd: function () {
            var activeIndex = swiper3.activeIndex
            activeIndex++
            $('.div-setting .bottom img').attr('src', 'images/parame-1/parame_b_0' + activeIndex + '.jpg')
            console.log(swiper3.activeIndex);
        }
    },
    observer: true, //修改swiper自己或子元素时，自动初始化swiper
    observeParents: true, //修改swiper的父元素时，自动初始化swiper
});


var viewSwiper = new Swiper('.exq_swiper_big .swiper-container', {
    // loop: true,
    autoplay: {
        delay: 4500,
        disableOnInteraction: false,
    },
    on: {
        slideChangeTransitionStart: function () {
            updateNavPosition()
        }
    },
    observer: true, //修改swiper自己或子元素时，自动初始化swiper
    observeParents: true, //修改swiper的父元素时，自动初始化swiper
});
var previewSwiper = new Swiper('.exq_swiper_small .swiper-container', {
    slidesPerView: '3.7',
    on: {
        tap: function () {
            viewSwiper.slideTo(previewSwiper.clickedIndex)
        }
    },
    observer: true, //修改swiper自己或子元素时，自动初始化swiper
    observeParents: true, //修改swiper的父元素时，自动初始化swiper
    direction: 'vertical',
    navigation: {
        nextEl: '.exq_swiper_next',
        prevEl: '.exq_swiper_prev',
    },
});

function updateNavPosition() {
    $('.exq_swiper_small .active-nav').removeClass('active-nav');
    var activeNav = $('.exq_swiper_small .swiper-slide').eq(viewSwiper.activeIndex).addClass('active-nav');
    if (!activeNav.hasClass('swiper-slide-visible')) {
        if (activeNav.index() > previewSwiper.activeIndex) {
            var thumbsPerNav = Math.floor(previewSwiper.height / activeNav.height()) - 1;
            previewSwiper.slideTo(activeNav.index() - thumbsPerNav)
        } else {
            previewSwiper.slideTo(activeNav.index())
        }
    }
}
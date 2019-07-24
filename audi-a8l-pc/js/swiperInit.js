(function () {

});
var index2 = -1;
var swiper1 = new Swiper('.swiper1 .swiper-container', {
    direction: 'horizontal',
    loop: true,
    autoplay: true,
    centeredSlides: true,
    slidesPerView: 1.6,
    spaceBetween: 70,
    observer: true, //修改swiper自己或子元素时，自动初始化swiper
    observeParents: true, //修改swiper的父元素时，自动初始化swiper
    navigation: {
        nextEl: '.swiper1_next',
        prevEl: '.swiper1_prve',
    },
    pagination: {
        el: '.swiper1_pagination',
        type: 'fraction',
    },
    loopedSlides: 2,
    // freeMode: false,
});
var swiper2 = new Swiper('.swiper2 .swiper-container', {
    direction: 'horizontal',
    speed: 1500,
    loop: true,
    // autoplay: true,
    observer: true, //修改swiper自己或子元素时，自动初始化swiper
    observeParents: true, //修改swiper的父元素时，自动初始化swiper
    preventInteractionOnTransition: true,
    navigation: {
        nextEl: '.swiper3_next',
        prevEl: '.swiper3_prev',
    },
    on: {
        slideNextTransitionStart: function () {
            var index = $('.swiper2 .swiper-slide-active').attr('data-swiper-slide-index');
            console.log('index:' + index)
            swiper3Check(index, 'right');
        },
        slidePrevTransitionStart: function () {
            var index = $('.swiper2 .swiper-slide-active').attr('data-swiper-slide-index');
            console.log('index:' + index)
            swiper3Check(index, 'left');
        },
    }
});
var swiper3 = new Swiper('.swiper3 .swiper-container', {
    direction: 'horizontal',
    loop: true,
    // autoplay: true,
    slidesPerView: 4,
    observer: true, //修改swiper自己或子元素时，自动初始化swiper
    observeParents: true, //修改swiper的父元素时，自动初始化swiper
});

$('.black_circle').on('click', function () {
    var cid = $(this).attr('cid');
    swiper2.slideTo(cid);
    // console.log(cid)
    // console.log(swiper2.on)
    // for (let i = 0; i < cid; i++) {
    //     swiper3Check(cid, 'right');
    // }
});

function swiper3Check(index, type) {

    if (index) {
        $('.swiper3').attr('data-index', index);
        $('.swiper3_txt_img').show();
        for (let i = 0; i < $('.swiper3_txt_img').length; i++) {
            $('.swiper3_txt_img').eq(i).attr('src', './images/swiper2/swiper_txt_' + i + '.png');
        }
        $('.swiper3_txt_img').eq(index).attr('src', './images/swiper2/swiper_txt_' + index + '_act.png');
        if (type == 'right') {
            $('.after_tyre').attr('class', 'front_rotate after_tyre');
            $('.front_tyre').attr('class', 'front_rotate front_tyre');
            index++;
            if (type == 'right' && index == 1) {
                $('.swiper3_car').animate({
                    'left': '100%'
                }, 1000, function () {
                    $(this).css('left', '-15%').animate({
                        'left': '5%'
                    }, 1000, function () {
                        $('.after_tyre').attr('class', 'after_tyre');
                        $('.front_tyre').attr('class', 'front_tyre');
                    });
                });
            } else {
                $('.swiper3_car').animate({
                    'left': (25 * index - 20) + '%'
                }, 1500, function () {
                    $('.after_tyre').attr('class', 'after_tyre');
                    $('.front_tyre').attr('class', 'front_tyre');
                });
            }
        } else if (type == 'left') {
            $('.after_tyre').attr('class', 'after_rotate after_tyre');
            $('.front_tyre').attr('class', 'after_rotate front_tyre');
            // index--;
            if (type == 'left' && index == 3) {
                $('.swiper3_car').animate({
                    'left': '-15%'
                }, 1000, function () {
                    $(this).css('left', '120%').animate({
                        'left': '80%'
                    }, 1000, function () {
                        $('.after_tyre').attr('class', 'after_tyre');
                        $('.front_tyre').attr('class', 'front_tyre');
                    });
                });
            } else {
                $('.swiper3_car').animate({
                    'left': (25 * index + 5) + '%'
                }, 1500, function () {
                    $('.after_tyre').attr('class', 'after_tyre');
                    $('.front_tyre').attr('class', 'front_tyre');
                });
            }
        }
        console.log(index, type)
        // $('.swiper3_car').animate({
        //     'left': (25 * index -20) + '%'
        // }, 1500, function () {
        //     $('.after_tyre').attr('class', 'after_tyre');
        //     $('.front_tyre').attr('class', 'front_tyre');
        // });
        // if (type == 'right' && index == 1) {
        //     $('.swiper3_car').animate({
        //         'left': '100%'
        //     }, 1000, function () {
        //         $(this).css('left', '-15%').animate({
        //             'left': '5%'
        //         }, 1000, function () {
        //             $('.after_tyre').attr('class', 'after_tyre');
        //             $('.front_tyre').attr('class', 'front_tyre');
        //         });
        //     });
        // } else if (type == 'left' && index == 3) {
        //     // index = 3;
        //     $('.swiper3_car').animate({
        //         'left': '-15%'
        //     }, 1000, function () {
        //         $(this).css('left', '120%').animate({
        //             'left': '80%'
        //         }, 1000, function () {
        //             $('.after_tyre').attr('class', 'after_tyre');
        //             $('.front_tyre').attr('class', 'front_tyre');
        //         });
        //     });
        // } else {
        //     $('.swiper3_car').animate({
        //         'left': (25 * index + 5) + '%'
        //     }, 1500, function () {
        //         $('.after_tyre').attr('class', 'after_tyre');
        //         $('.front_tyre').attr('class', 'front_tyre');
        //     });
        // }
    }
}
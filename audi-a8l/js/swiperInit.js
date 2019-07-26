$(function () {
    var swiper1 = new Swiper('.swiper1 .swiper-container', {
        direction: 'horizontal',
        loop: true,
        autoplay: true,
        centeredSlides: true,
        slidesPerView: 1.2,
        spaceBetween: 15,
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
        simulateTouch : false,//禁止鼠标模拟
    });
    var swiper2 = new Swiper('.swiper2 .swiper-container', {
        direction: 'horizontal',
        loop: true,
        autoplay: true,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        navigation: {
            nextEl: '.swiper2_next',
            prevEl: '.swiper2_prev',
        },
    });
    var swiper3 = new Swiper('.swiper3 .swiper-container', {
        direction: 'horizontal',
        loop: true,
        // autoplay: true,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
    });
    swiper2.controller.control = swiper3;
});
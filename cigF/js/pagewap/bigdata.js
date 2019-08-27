$(function () {
var newsSwiper = new Swiper('.swiper1', {
    loop:true,
    // freeMode: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 40,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,

    },
    on:{
        slideChangeTransitionEnd: function () {
        }
    }
});



});
$(function () {
    var scrollTop='<div class="scrollTop" style="display: none;cursor: pointer;z-index:666;position: fixed;right: 0;top: 0;bottom:0;margin: auto;height: 0.5rem;width: 0.5rem"><img style="width: 100%" src="./images/scrollTop.jpg"></div>'
    $('body .container').append(scrollTop);

    $(window).scroll(function(){
        if($(window).scrollTop()>400){
            $('.container').find(".scrollTop").fadeIn(300);
        }else{
            $('.container').find(".scrollTop").fadeOut(200);
        }

    });
    $('body').on("click",'.scrollTop',function () {
        $('html, body').animate({
            scrollTop: $("body").offset().top
        }, 500);
    })
    $('.container').find(".scrollTop img").hover(function () {
        $(this).attr("src","./images/scrollTop_red.jpg");

    }, function () {
        $(this).attr("src","./images/scrollTop.jpg");
    });
});


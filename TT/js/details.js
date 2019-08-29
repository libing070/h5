$(function () {
    init();

    $('.video_box .video-btn').on('click', function () {
        $('.video_box .video-btn').hide();
        $('.video_box .video-bg').hide();
        var v=document.getElementById("video1");
          v.play();
    });

});

async  function init() {
    await loadModule();
    await initSwiper();
    await activemouseEvents();
}
 loadModule = () => {
    $("#details .header").load("header.html");//加载头部导航
    $("#details .footer").load("footer.html");//加载底部导航
}
 activemouseEvents = () => {
    setTimeout(function () {

        $('#details .header .nav ul li').hover(function () {
            $(this).find('.submenu').stop().slideDown();
        }, function () {
            $(this).find('.submenu').stop().slideUp();
        });
    },10);
}

initSwiper=()=>{
    setTimeout(function () {


    },500);
}

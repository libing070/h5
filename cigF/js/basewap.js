$(function () {

    //获取案例数据集合

    // //获取焦点后回退
    // $("input").focus(function () {
    //     distance = $(document).scrollTop();
    // });
    // $("textarea").focus(function () {
    //     distance = $(document).scrollTop();
    // });
    // $("select").focus(function () {
    //     distance = $(document).scrollTop();
    // });
    //
    // //失去焦点后回退
    // $("input").blur(function () {
    //     $(document).scrollTop(distance);
    // });
    // $("textarea").blur(function () {
    //     $(document).scrollTop(distance);
    // });
    // $("select").blur(function () {
    //     $(document).scrollTop(distance);
    // });



    //案例视频点击事件
    $(".caseSwiper").on("click",".case-swiper-video-btn",function () {
        var len=$(".caseSwiper").find("video").length;
        $(".caseSwiper .case-swiper-video-btn").show();
        for(var i=0;i<len;i++){
            $(".caseSwiper").find("video").get(i).pause();
        }
        $(this).hide();
        var myVideo=$(this).siblings("video").get(0);
        myVideo.play();
        myVideo.addEventListener('ended', playsss);
        function playsss() {
            console.log(1);
            $(".caseSwiper .case-swiper-video-btn").show();
            myVideo.removeEventListener("ended", playsss);

        }

    })
});
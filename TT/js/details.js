$(function () {
    init();
    $('.video_box .video-btn').on('click', function () {
        $('.video_box .video-btn').hide();
        $('.video_box .video-bg').hide();
        var v = document.getElementById("video1");
        v.play();
    });
});

async function init() {
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
        $(".information .bottom").on("click",'.mes',function () {
            $('html, body').animate({
                scrollTop: $(".top-reply").offset().top
            }, 500);
        })

        $(".list-box").on("click", ".list-box-A .list-box-A-title .mes", function () {
            $(this).parent().parent().siblings('.list-box-A-textarea').slideToggle("slow");
        });
        $(".list-box").on("click", ".list-box-B .list-box-B-title .mes", function () {
            $(this).parent().parent().siblings('.list-box-B-textarea').slideToggle("slow");
        })
        $(".list-box").on("click", ".list-box-B .list-box-B-title .del", function () {
            var that = this;
            layer.confirm('确定删除该挑评论?', {
                icon: 3, title: '提示', yes: function (index) {
                    layer.close(index);
                    $(that).parent().parent().parent('.list-box-B').fadeOut();
                },
                cancel: function (index, layero) {
                    layer.close(index);
                }
            });

        })
    }, 10);
}

initSwiper = () => {
    setTimeout(function () {
        var mySwiper = new Swiper ('.swiper-container', {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            },

            // 如果需要前进后退按钮
            navigation: {
                nextEl: '.index_next1',
                prevEl: '.index_prev1',
            },
            on:{
                slideNextTransitionStart: function () {
                    $('.index_prev1').css("cssText", "background:url(./images/turn_left_black.png) no-repeat center !important;background-size:cover !important;");
                    $('.index_next1').css("cssText", "background:url(./images/turn_right_act.png) no-repeat center !important;background-size:cover !important;");
                },
                slidePrevTransitionStart: function () {
                    $('.index_prev1').css("cssText", "background:url(./images/turn_left_act.png) no-repeat center !important;background-size:cover !important;");
                    $('.index_next1').css("cssText", "background:url(./images/turn_right_black.png) no-repeat center !important;background-size:cover !important;");
                }
            }

        })
    }, 500);
}

$(function () {
    init();

    ///api/Forum/GetForumPagingList(TT_025)获取文章/知识分页列表

    function loadList(pageIndex) {
        $.request('/api/Forum/GetForumPagingList', {
                timestamp: ts(),
                forumType:1, //知识
                pageIndex:pageIndex||1,
                pageSize:10,
                sign: createSign({
                    timestamp: ts(),
                    forumType:1,
                    pageIndex:pageIndex||1,
                    pageSize:10,
                })
            },
            function (res) {
                if(pageIndex>res.data.pageCount){
                    $(".load-more").find("p").html("没有更多了");
                    $(".load-more").find(".load-more-btn").hide();
                    $(".load-more").attr("hasmore","0");
                    return;
                }
                if(res.data.forumList!=""){
                    if(res.data.forumList.length<3){
                        $(".all-list-layout").css("justify-content","space-evenly");
                    }
                    //文章
                    var str = '';
                    res.data.forumList.forEach((ele, k) => {
                        str+='<div ids="'+ele.id+'" class="box">';
                        //str+='<img style="width: 100%" src="images/index-banner3-s1.png">';
                         str+='<img class="jump-details-img" ids="'+ele.id+'" style="width: 100%" src="'+ele.picUrl+'">';
                        str+='<div class="content">';
                        str+='<p class="time">'+ele.createTime+'</p>';
                        str+='<p class="title">'+ele.title+'</p>';
                        str+='<p class="desc">'+ele.summary+'</p>';
                        str+='</div>';
                        str+='<p class="bottom">';
                        str +='<span class="item"><img src="./images/message-icon.png"><span >'+ele.commentCount+'</span></span>';
                        str +='<span class="item"><img src="./images/view-icon.png"><span>'+ele.visitCount+'</span></span>';
                        str +='<span class="item"><img forumId="'+ele.id+'"  class="vote-icon-img" src="./images/vote-icon.png"><span>'+ele.likeCount+'</span></span>';
                        str+='</p>';
                        str+='</div>';
                    });
                    $('.all-list-layout').append(str);
                    $(".load-more").find(".load-more-btn").hide();

                }else{
                    $(".load-more").find("p").html("没有更多了");
                }
            }
        );
    }
    loadList(1);
    $(".all-list-layout").on("click",'.jump-details-img',function () {
        window.location.href='./details.html?id='+$(this).attr("ids");
    });

    $(".load-more").on("click",function () {
        $(".load-more").find(".load-more-btn").show();
        var hasMore=$(".load-more").attr("hasmore");//1更多 0 没有
        if(hasMore==0){
            $('.load-more').off();
            $(".load-more").find(".load-more-btn").hide();
            return;
        }
        var pageIndex=$(this).attr("pageIndex");
        pageIndex=++pageIndex;
        $(this).attr("pageIndex",pageIndex);
        loadList(pageIndex);
    });

});

async  function init() {
    await loadModule();
    await initSwiper();
    await activemouseEvents();
}
 loadModule = () => {
    $("#know .header").load("header.html");//加载头部导航
    $("#know .index-banner1").load("topswiper.html");//加载头部轮播
     $("#know .index-banner3").load("weeklyleaderboard.html");//加载头部轮播
    $("#know .footer").load("footer.html");//加载底部导航
}
 activemouseEvents = () => {
    setTimeout(function () {
        $('#know .header .nav ul li').hover(function () {
            $(this).find('.submenu').stop().slideDown();
        }, function () {
            $(this).find('.submenu').stop().slideUp();
        });
        //一周阅读排行榜hover事件
        $('.weeklyleaderboard .swiper-slide').hover(function () {
            $(this).find('.desc').stop().slideDown();
        }, function () {
            $(this).find('.desc').stop().slideUp();
        });

        $('.know-list .box .content ').hover(function () {
            $(this).find('.desc').stop().slideDown();
        }, function () {
            $(this).find('.desc').stop().slideUp();
        });
        $("#know .header .nav .navBar").find("li").find("a.know").css("color","#ff0000");//加载头部导航

    },100);
}

initSwiper=()=>{
    setTimeout(function () {
        var indexbanner1 = new Swiper('.index-banner1 .swiper-container', {
            loop:true,
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true, //修改swiper的父元素时，自动初始化swiper
            slidesPerView: 1,
            centeredSlides: true,
            spaceBetween: 0,
            navigation: {
                nextEl: '.index_next1',
                prevEl: '.index_prev1',
            },
            pagination: {
                el: '.index-banner1 .swiper-pagination',
                clickable: true,

            },
            on:{
                slideChangeTransitionEnd: function () {
                },
                slideChangeTransitionStart:function () {
                    var index = $('.index-banner1 .swiper-slide-active').attr('data-swiper-slide-index');
                    console.log(index);
                    aniReset();
                    aniTranslateY(['.ani_1'], ['1rem', '0', ], 1000, 500);
                    aniTranslateY(['.ani_2'], ['1rem', '0', ], 1000, 1000);
                    aniTranslateY(['.ani_3'], ['1rem', '0', ], 1000, 1500);
                    aniTranslateY(['.ani_4'], ['1rem', '0', ], 1000, 500);
                    aniTranslateY(['.ani_5'], ['1rem', '0', ], 1000, 1000);
                    aniTranslateY(['.ani_6'], ['1rem', '0', ], 1000, 1500);
                    aniTranslateY(['.ani_7'], ['1rem', '0', ], 1000, 500);
                    aniTranslateY(['.ani_8'], ['1rem', '0', ], 1000, 1000);
                    aniTranslateY(['.ani_9'], ['1rem', '0', ], 1000, 1500);
                    aniTranslateY(['.ani_10'], ['1rem', '0', ], 1000, 500);
                    aniTranslateY(['.ani_11'], ['1rem', '0', ], 1000, 1000);
                    aniTranslateY(['.ani_12'], ['1rem', '0', ], 1000, 1500);
                },
                slideNextTransitionStart: function () {
                    $('.index_prev1').css("cssText", "background:url(./images/turn_left_def.png) no-repeat center !important;background-size:cover !important;");
                    $('.index_next1').css("cssText", "background:url(./images/turn_right_act.png) no-repeat center !important;background-size:cover !important;");
                },
                slidePrevTransitionStart: function () {
                    $('.index_prev1').css("cssText", "background:url(./images/turn_left_act.png) no-repeat center !important;background-size:cover !important;");
                    $('.index_next1').css("cssText", "background:url(./images/turn_right_def.png) no-repeat center !important;background-size:cover !important;");
                }
            }
        });

        var indexbanner2 = new Swiper('.index-banner3 .swiper-container', {
            loop:true,
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true, //修改swiper的父元素时，自动初始化swiper
            slidesPerView: 5,
            // centeredSlides: true,
            spaceBetween: 40,
            pagination: {
                el: '.index-banner3 .swiper-pagination',
                clickable: true,

            },

            on:{
                slideChangeTransitionEnd: function () {
                },
                slideChangeTransitionStart:function () {
                    var index = $('.index-banner3 .swiper-slide-active').attr('data-swiper-slide-index');
                    console.log(index);
                },

            }
        });

    },500);
}

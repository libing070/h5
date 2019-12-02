$(function () {
    init();
    //api/Forum/GetActivityPagingList(TT_027)获取活动分页列表

    function loadList(type ,pageIndex) {
        $.request('/api/Forum/GetActivityPagingList', {
                timestamp: ts(),
                activityType:type,// 1 进行中 2 已结束
                pageIndex:pageIndex||1,
                pageSize:10,
                userToken:localStorage.getItem("ttToken")||'',
                sign: createSign({
                    timestamp: ts(),
                    activityType:type,
                    pageIndex:pageIndex||1,
                    pageSize:10,
                    userToken:localStorage.getItem("ttToken")||'',
                })
            },
            function (res) {
                if(pageIndex>res.data.pageCount){
                    $(".load-more"+type).find("p").html("没有更多了");
                    $(".load-more"+type).find(".load-more-btn").hide();
                    $(".load-more"+type).attr("hasmore","0");
                    return;
                }
                if(res.data.forumList!=""){
                    if(res.data.forumList.length<3){
                        $(".all-list-layout"+type).css("justify-content","space-evenly");
                    }
                    //文章
                    var str = '';
                    res.data.forumList.forEach((ele, k) => {
                        str+='<div forumId="'+ele.id+'" class="box ">';
                        var url= '';
                        NetPing(ele.picUrl,function (res) {
                            if(!res){
                                url='./images/404.png'
                            }else{
                                url=ele.picUrl;
                            }
                        })
                         str+='<img forumId="'+ele.id+'" style="width: 100%" class="click-img" src="'+url+'">';
                        str+='<div class="content">';
                        str+='<p class="time">'+ele.createTime+'</p>';
                        str+='<p class="title">'+ele.title+'</p>';
                        str+='<p class="desc">'+ele.summary+'</p>';
                        str+='</div>';
                        str+='<p class="bottom">';
                        str +='<span class="item"><img src="./images/message-icon.png"><span >'+ele.commentCount+'</span></span>';
                        str +='<span class="item"><img src="./images/view-icon.png"><span>'+ele.visitCount+'</span></span>';
                        str +='<span class="item"><img forumId="'+ele.id+'"  class="vote-icon-img" src="'+(ele.IsLike?"./images/vote-icon-red.png":"./images/vote-icon.png")+'"><span>'+ele.likeCount+'</span></span>';
                        str+='</p>';
                        str+='</div>';
                    });
                    $('.all-list-layout'+type).append(str);
                    $(".load-more"+type).find(".load-more-btn").hide();

                }else{
                    $(".load-more"+type).find("p").html("没有更多了");
                }
            }
        );
    }
    loadList(1,1);//1 进行中
    loadList(2,1);//2 已结束
    //活动点击事件跳转到活动详情
    $(".all-list-layout").on("click",'.click-img',function () {
        window.location.href='./active-details.html?forumId='+$(this).attr("forumId");
    })


    $(".load-more").on("click",function () {
        var type=$(this).attr("type");
        $(".load-more"+type).find(".load-more-btn").show();
        var hasMore=$(".load-more"+type).attr("hasmore");//1更多 0 没有
        if(hasMore==0){
            $('.load-more'+type).off();
            $(".load-more"+type).find(".load-more-btn").hide();
            return;
        }
        var pageIndex=$(this).attr("pageIndex");
        pageIndex=++pageIndex;
        $(this).attr("pageIndex",pageIndex);
        loadList(type,pageIndex);
    });


});

async  function init() {
    await loadModule();
    await initSwiper();
    await activemouseEvents();
}
 loadModule = () => {
    $("#active .header").load("header.html");//加载头部导航

     $("#active .index-banner1").load("topswiper.html");//加载头部轮播
     $("#active .index-banner3").load("weeklyleaderboard.html");//加载头部轮播
    $("#active .footer").load("footer.html");//加载底部导航
}
 activemouseEvents = () => {
    setTimeout(function () {
        $('#active .header .nav ul li').hover(function () {
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

        $('.active-list .box .content ').hover(function () {
            $(this).find('.desc').stop().slideDown();
        }, function () {
            $(this).find('.desc').stop().slideUp();
        });
        $("#active .header .nav .navBar").find("li").find("a.active").css("color","#ff0000");//加载头部导航

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

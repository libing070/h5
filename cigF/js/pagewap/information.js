$(function () {

    var inittype=20;
    var initialSlide=0;
    var url = window.location.href;
    var sp=url.split("?")[1];
    if(sp.indexOf('inittype')>-1){
        inittype= GetUrlParam('inittype');
        initialSlide= GetUrlParam('initialSlide');
    }
var swiper1 = new Swiper('.banner1', {
    loop:true,
    slidesPerView: 1,
    centeredSlides: true,
    pagination: {
        el: '.banner1-swiper-pagination',
        clickable: true,

    },
    on:{
        slideChangeTransitionEnd: function () {
        }
    }
});


    var swiper2 = new Swiper('.banner2', {
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        slidesPerView:4,
        loop:false,
        spaceBetween:30,
        on:{
            tap: function(){
                $('.banner2 .swiper-slide').removeClass('swiper-slide-active');
                $('.banner2 .swiper-slide').eq(this.clickedIndex).addClass('swiper-slide-active');
                swiper3.slideTo(this.clickedIndex);
            },
        }
    });
    var swiper3 = new Swiper('.banner3', {
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        slidesPerView:1,
        loop:false,
        initialSlide :initialSlide,
        spaceBetween:0,
        on:{
            slideChangeTransitionEnd: function(event){
                $('.banner2 .swiper-slide').removeClass('swiper-slide-active');
                $('.banner2 .swiper-slide').eq(this.activeIndex).addClass('swiper-slide-active');
                var type= $('.banner2 .swiper-slide').eq(this.activeIndex).attr("type");
                $(".banner3 .load-more").attr("type",type);//切换改变当前type
                $(".banner3 .load-more").attr("pageIndex",1);//切换后默认为1
                $(".banner3 .load-more").attr("hasmore",1);//1更多 0 没有
                $(".banner3 .load-more").find("p").html("加载更多");
                loadNewList(type,1);
            },
        }

    });
    //获取新闻列表
    function loadNewList(type,pageIndex) {
        console.log(type+"===="+pageIndex);
        $.request('/api/News/GetPagingList', {
                timestamp: ts(),
                type:type,
                pageIndex:pageIndex||1,
                pageSize:10,
                sign: createSign({
                    timestamp: ts(),
                    type:type,
                    pageIndex:pageIndex||1,
                    pageSize:10,
                })
            },
            function (res) {
                if(pageIndex>res.data.pageCount){
                    $(".banner3 .load-more").find("p").html("没有更多了");
					$(".banner3 .load-more").find(".load-more-btn").removeClass("active");
                    $(".banner3 .load-more").attr("hasmore","0");
                    return;
                }
                var str = '';
                res.data.newsList.forEach((ele, k) => {
                    str+='<div newsId="'+ele.id+'" class="list">';
                    if(ele.multimediaType==1){
                        str+='<img class="bg" src="'+ele.picUrl+'">';
                    }else{
                        str+='<div class="bg">';
                        str+='  <img class="video-btn"  src="../images/wap/video-btn.png">';
                        str+='<video width="100%" height="100%" poster="" x5-playsinline="" playsinline="" webkit-playsinline="" class="video video1" style="object-fit:cover;" id="video1" src="'+ele.picUrl+'" preload="auto"></video>';
                        str+=' </div>';
                    }
                    str+='<div class="text">';
                    str+='<p class="p1">'+ele.title+'</p>';
                    str+='<p class="p2">'+ele.summary+'</p>';
                    str+='</div>';
                    str+='</div>';

                });
                if(pageIndex==1){
                    $('.banner3 .swiper-slide').attr("type",type).html("");
                }
                $('.banner3 .swiper-slide').attr("type",type).append(str);
                $(".banner3 .load-more").find(".load-more-btn").removeClass("active");

            }
        );

    }

    loadNewList(inittype,1);//默认加载第一个

    $(".banner3").on("click",".load-more",function () {
        var hasMore=$(".banner3 .load-more").attr("hasmore");//1更多 0 没有
        if(hasMore==0){
            $(".banner3 .load-more").find(".load-more-btn").removeClass("active");

            $(".banner3").find('.load-more').off();
             return;
        }
        $(".banner3 .load-more").find(".load-more-btn").addClass("active");

        var type= $(this).attr("type");
       var pageIndex=$(this).attr("pageIndex");
        pageIndex=++pageIndex;
        $(this).attr("pageIndex",pageIndex);
        loadNewList(type,pageIndex);
    });



    //案例视频点击事件
    $(".banner3").on("click",".video-btn",function () {
        var len=$(".banner3").find("video").length;
        $(".banner3 .video-btn").show();
        for(var i=0;i<len;i++){
            $(".banner3").find("video").get(i).pause();
        }
        $(this).hide();
        var myVideo=$(this).siblings("video").get(0);
        myVideo.play();
        myVideo.addEventListener('ended', playsss);
        function playsss() {
            $(".banner3 .video-btn").show();
            myVideo.removeEventListener("ended", playsss);

        }

    });

    // $(".banner3 .swiper-slide").on("click",".text",function () {
    //     var newsId=$(this).parent(".list").attr("newsId");
    //     console.log($(this).parent(".list").attr("newsId"));
    //     window.location.href = "./../pagewap/details.html?newsId="+newsId;
    // })
    $(".banner3 .swiper-slide").on("click",".list",function () {
        var newsId=$(this).attr("newsId");
        console.log($(this).attr("newsId"));
        window.location.href = "./../pagewap/details.html?newsId="+newsId;
    })
});
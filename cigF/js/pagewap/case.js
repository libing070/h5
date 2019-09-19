$(function () {
    $('html, body').animate({
        scrollTop: $("body").offset().top
    }, 500);
    var inittype=24;
    var initialSlide=0;
    var url = window.location.href;
    var sp=url.split("?")[1];
    if(sp.indexOf('inittype')>-1){
        inittype= GetUrlParam('inittype');
        initialSlide= GetUrlParam('initialSlide');
        $('.banner3 .load-more').attr('type',inittype);
    }
var swiper1 = new Swiper('.banner1', {
    loop:true,
    autoplay:true,
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

    var swiper3 = new Swiper('.banner3', {
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        slidesPerView:1,
        loop:false,
        spaceBetween:0,
        on:{
            slideChangeTransitionEnd: function(event){
                $('.banner2 .swiper-slide').removeClass('swiper-slide-active');
                $('.banner2 .swiper-slide').eq(this.activeIndex).addClass('swiper-slide-active');
                var type= $('.banner2 .swiper-slide').eq(this.activeIndex).attr("type");
                $(".banner3 .load-more").attr("type",type);//切换改变当前type
                $(".banner3 .load-more").attr("pageIndex",1);//切换后默认为1
                $(".banner3 .load-more").attr("hasmore",1);//1更多 0 没有
                $(".banner3 .load-more").find("p").html("点击加载更多");
                var title=$('.banner2 .swiper-slide').eq(this.activeIndex).html();
                $('head .meta-description').attr("content",'CIG新意互动案例展示，为您展示新意互动在'+title+'领域的案例，助您进一步了解新意互动强大的科技营销实力。');
                $('head .meta-keywords').attr("content",title+',CIG新意互动官网');
                $("head title").html(title+"_案例展示_CIG新意互动官网");
                loadCaseList(type,1);
            },
        }

    });
    var swiper2 = new Swiper('.banner2', {
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        slidesPerView:3,
        loop:false,
        spaceBetween:30,
        centeredSlides: true,
        initialSlide :initialSlide ,//默认选中第2个
        controller: {
            control: swiper3, //控制Swiper1
        },
        on:{
            slideChangeTransitionEnd: function(event){
              //  console.log(this.activeIndex);//切换结束时，告诉我现在是第几个slide
            },
            tap: function(){
                $('.banner2 .swiper-slide').removeClass('swiper-slide-active');
                $('.banner2 .swiper-slide').eq(this.clickedIndex).addClass('swiper-slide-active');
                swiper3.slideTo(this.clickedIndex);
            },
        }
    });
    swiper3.controller.control = swiper2;

    loadCaseList(inittype,1);//默认加载
    var ttttt="";
    for(var i=0;i<$('.banner2 .swiper-slide').length;i++){
        if($('.banner2 .swiper-slide').eq(i).attr("type")==inittype){
            ttttt= $('.banner2 .swiper-slide').eq(i).html();
            break;
        }
    }
    $('head .meta-description').attr("content",'CIG新意互动案例展示，为您展示新意互动在'+ttttt+'领域的案例，助您进一步了解新意互动强大的科技营销实力。');
    $('head .meta-keywords').attr("content",ttttt+',CIG新意互动官网');
    $("head title").html(ttttt+"_案例展示_CIG新意互动官网");





    var isbool=true;
    $(window).on('scroll', function () {
        var t=$(window).scrollTop();
        var h=document.body.scrollHeight;
        var c=document.documentElement.clientHeight;
        // console.log(h-t-c);
        var sp_bottom=h-t-c;//距离底部的距离
        var hasMore=$(".banner3 .load-more").attr("hasmore");//1更多 0 没有
        if( hasMore==1&&isbool){
            if(sp_bottom<450){
                isbool=false;
                var pageIndex =$('.banner3 .load-more').attr('pageIndex');
                var type = $('.banner3 .load-more').attr('type');
                pageIndex++;
                $('.banner3 .load-more').attr('pageIndex', pageIndex);
                loadCaseList(type,pageIndex);
            }
        }
    });




    function loadCaseList(type,pageIndex) {
         console.log(type+"======"+pageIndex);
        $.request('/api/Case/GetPagingList', {
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
              //  console.log(res);
                if(pageIndex>res.data.pageCount){
                    $(".banner3 .load-more").find("p").html("没有更多了");
					 $(".banner3 .load-more").find(".load-more-btn").hide();
                    $(".banner3 .load-more").attr("hasmore","0");
                    isbool=false;
                    return;
                }
                var str = '';
                res.data.caseList.forEach((ele, k) => {
                    str += '<div class="list" caseId="'+ele.id+'">';
                    if(k%2==0){
                        str += '<img class="left-bg" src="../images/wap/level2/case/case-list-bg-left.png">';
                        if(ele.multimediaType==1){
                            str += '<img class="right-img" src="'+ele.url+'">';
                        }else{
                            str+=' <img class="right-v-btn video-btn"  src="../images/wap/video-btn.png">';
                             str += '<video  poster="" x5-playsinline="" playsinline="" webkit-playsinline="" class="right-img" style="object-fit:cover;"src="'+ele.url+'" preload="auto"></video>';
                        }
                    }else{
                        str += '<img class="right-bg" src="../images/wap/level2/case/case-list-bg-right.png">';
                        if(ele.multimediaType==1){
                            str += '<img class="left-img" src="'+ele.url+'">';
                        }else{
                            str+='<img class="left-v-btn video-btn"  src="../images/wap/video-btn.png">';
                            str += '<video  poster="" x5-playsinline="" playsinline="" webkit-playsinline="" class="left-img" style="object-fit:cover;"  src="'+ele.url+'" preload="auto"></video>';
                        }
                    }
                    str += '<div class="text">';
                    // str += '<p class="p1">2019 / 8 / 20</p>';
                    str += '<p class="p2">'+ele.serviceUser+ele.name+'</p>';
                    str += ' <p class="p3">'+ele.content+'</p>';
                    str += '</div>';
                    str += '</div>';

                });
                if(pageIndex==1){
                    $('.banner3 .swiper-slide').attr("type",type).html("");
                }
                $('.banner3 .swiper-slide').attr("type",type).append(str);
                $(".banner3 .load-more").find(".load-more-btn").hide();
                isbool=true;
            }
        );
    };


    // $(".banner3").on("click",".load-more",function () {
    //     $(".banner3 .load-more").find(".load-more-btn").show();
    //     var hasMore=$(".banner3 .load-more").attr("hasmore");//1更多 0 没有
    //     if(hasMore==0){
    //         $(".banner3 .load-more").find(".load-more-btn").hide();
    //         $(".banner3").find('.load-more').off();
    //         return;
    //     }
    //     var type= $(this).attr("type");
    //     var pageIndex=$(this).attr("pageIndex");
    //     pageIndex=++pageIndex;
    //     $(this).attr("pageIndex",pageIndex);
    //     loadCaseList(type,pageIndex);
    // });



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


    // $(".banner3 .swiper-slide").on("click",".left-bg,.right-bg,.text",function () {
    //     var caseId=$(this).parent(".list").attr("caseId");
    //     console.log($(this).parent(".list").attr("caseId"));
    //     window.location.href = "./../pagewap/details.html?caseId="+caseId;
    // })
    $(".banner3 .swiper-slide").on("click",".list",function () {
        var caseId=$(this).attr("caseId");
        console.log($(this).attr("caseId"));
        window.location.href = "./../pagewap/details.html?caseId="+caseId;
    })


});
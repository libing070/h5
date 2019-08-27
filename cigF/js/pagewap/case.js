$(function () {
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
                $(".banner3 .load-more").find("p").html("加载更多");
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
        initialSlide :2 ,//默认选中第2个
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

    loadCaseList(26,1);//默认加载 社会化与用户营销


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
                    $(".banner3 .load-more").attr("hasmore","0");
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
                $(".banner3 .load-more").find(".load-more-btn").removeClass("active");
            }
        );
    };


    $(".banner3").on("click",".load-more",function () {
        $(".banner3 .load-more").find(".load-more-btn").addClass("active");
        var hasMore=$(".banner3 .load-more").attr("hasmore");//1更多 0 没有
        if(hasMore==0){
            $(".banner3").find('.load-more').off();
            return;
        }
        var type= $(this).attr("type");
        var pageIndex=$(this).attr("pageIndex");
        pageIndex=++pageIndex;
        $(this).attr("pageIndex",pageIndex);
        loadCaseList(type,pageIndex);
    });


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


    $(".banner3 .swiper-slide").on("click",".left-bg,.right-bg,.text",function () {
        var caseId=$(this).parent(".list").attr("caseId");
        console.log($(this).parent(".list").attr("caseId"));
        window.location.href = "./../pagewap/details.html?caseId="+caseId;
    })


});

$(function () {
    //banner
    $.request("/api/Forum/GetKeyVersionInfo", null, function(res){
        for(var i=0;i<res.data.keyVersionList.length;i++){
            NetPing(res.data.keyVersionList[i].KeyVisionUrl,function (re) {
                if(!re){
                    res.data.keyVersionList[i].KeyVisionUrl='./wap/images/wap/404.png'
                }else{
                    res.data.keyVersionList[i].KeyVisionUrl= res.data.keyVersionList[i].KeyVisionUrl;
                }
            })
        }

        var html = baidu.template('banner',res.data);
        $(".wap-banner .swiper-container .swiper-wrapper").html(html);
        var wapBanner = new Swiper('.wap-banner .swiper-container', {
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true, //修改swiper的父元素时，自动初始化swiper
            autoplay: true,//可选选项，自动滑动
            loop: true,
            pagination: {
                el: '.wapBanner_pagination',
            },
            navigation: {
                nextEl: '.wapBanner_next',
                prevEl: '.wapBanner_prev',
            },
        });
    });
    //一周阅读排行
    $.request("/api/Forum/GetWeekReadSort", null, function(res){
        for(var i=0;i<res.data.forumInfo.length;i++){
            NetPing(res.data.forumInfo[i].picUrl,function (re) {
                if(!re){
                    res.data.forumInfo[i].picUrl='./wap/images/wap/404.png'
                }else{
                    res.data.forumInfo[i].picUrl= res.data.forumInfo[i].picUrl;
                }
            })
        }

        var html = baidu.template('week_read_ranking',res.data);
        $(".readRank .swiper-container").html(html);
        var readRank = new Swiper('.readRank .swiper-container', {
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true, //修改swiper的父元素时，自动初始化swiper
            // autoplay: true,//可选选项，自动滑动
            loop: true,
            centeredSlides: true,
            slidesPerView: 2.2,
            spaceBetween: 20,
            pagination: {
                el: '.readRankpagination'
            },
            on: {
                slideChangeTransitionStart: function () {
                    $('.readRank .swiper-slide').find('.read_txt').slideUp();
                    $('.readRank .swiper-slide-active').find('.read_txt').slideDown();
                }
            }
        });
    });

    $.request("/api/Forum/GetForumInfo", {timestamp:ts()}, function(res){
        //文章
        for(var i=0;i<res.data.articleList.length;i++){
            NetPing(res.data.articleList[i].picUrl,function (re) {
                if(!re){
                    res.data.articleList[i].picUrl='./wap/images/wap/404.png'
                }else{
                    res.data.articleList[i].picUrl= res.data.articleList[i].picUrl;
                }
            })
        }
        var html = baidu.template('article_list',res.data);
        $(".artSwiper .swiper-container .swiper-wrapper").html(html);
        var artSwiper = new Swiper('.artSwiper .swiper-container', {
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true, //修改swiper的父元素时，自动初始化swiper
            // autoplay: true,//可选选项，自动滑动
            loop: true,
            centeredSlides: true,
            slidesPerView: 2,
            spaceBetween: 40,
        });
        //知识
        for(var i=0;i<res.data.knowHowList.length;i++){
            NetPing(res.data.knowHowList[i].picUrl,function (re) {
                if(!re){
                    res.data.knowHowList[i].picUrl='./wap/images/wap/404.png'
                }else{
                    res.data.knowHowList[i].picUrl= res.data.knowHowList[i].picUrl;
                }
            })
        }

        var html = baidu.template('knowledge_list',res.data);
        $(".kldSwiper .swiper-container .swiper-wrapper").html(html);
        var kldSwiper = new Swiper('.kldSwiper .swiper-container', {
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true, //修改swiper的父元素时，自动初始化swiper
            // autoplay: true,//可选选项，自动滑动
            loop: true,
            centeredSlides: true,
            slidesPerView: 2,
            spaceBetween: 40,
        });
        //活动
        for(var i=0;i<res.data.recommendList.length;i++){
            NetPing(res.data.recommendList[i].picUrl,function (re) {
                if(!re){
                    res.data.recommendList[i].picUrl='./wap/images/wap/404.png'
                }else{
                    res.data.recommendList[i].picUrl= res.data.recommendList[i].picUrl;
                }
            })
        }

        var html = baidu.template('activity_top_img', res.data);
        $(".wap .active_banner").html(html);
        var html = baidu.template('activity_top',res.data);
        $(".wap .active_cont").html(html);
        var html = baidu.template('activity_list',res.data);
        $(".wap .activeSwiper .swiper-container .swiper-wrapper").html(html);
        var activeSwiper = new Swiper('.activeSwiper .swiper-container', {
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true, //修改swiper的父元素时，自动初始化swiper
            // autoplay: true,//可选选项，自动滑动
            loop: true,
            // centeredSlides: true,
            slidesPerView: 2,
            spaceBetween: 10,
        });
        //热门
        for(var i=0;i<res.data.hotList.length;i++){
            NetPing(res.data.hotList[i].picUrl,function (re) {
                if(!re){
                    res.data.hotList[i].picUrl='./wap/images/wap/404.png'
                }else{
                    res.data.hotList[i].picUrl= res.data.hotList[i].picUrl;
                }
            })
        }

        var html = baidu.template('hot_list', res.data);
        $(".wap .popular_recommend ul").html(html);

    });


})
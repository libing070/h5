$(function () {
    var id=GetUrlParam("id");
    init();

    //api/Forum/GetForumDetail(TT_007)根据ID获取文章内容，并且阅读数+1
    function GetForumDetail() {
            $.request('/api/Forum/GetForumDetail', {
                    "timestamp": ts(),
                    id:id,
                    sign: createSign({
                        id:id,
                        "timestamp": ts(),
                    })
                },
                function (res) {
                    var str = '';
                    var data= res.data;
                    $(".details").attr('ids',id);
                    $(".information").find(".title").html(data.Title+'-'+data.Summary);
                    $(".information .message-icon").html(data.CommentCount);
                    $(".information .view-icon").html(data.VisitCount);
                    $(".information .vote-icon").html(data.LikeCount);
                    $(".information p.text").html(data.Content);

                    if(data.MultimediaType==1){
                          var str='<div class="swiper-slide"><img class="video-bg" style="width: 100%" src="'+data.PicUrl+'"></div>';
                        $(".information .images .swiper-container .swiper-wrapper").append(str);
                        $(".information .images").show();
                        $(".information .videoss").hide();
                    }else{
                        $(".information .videoss").show();
                        $(".information .images").hide();
                        $(".information .videoss video").attr('src',data.PicUrl);
                    }
                }
            );
    }
    GetForumDetail();

    //api/Comment/Pagelist获取文章的评论

    function Pagelist(pageIndex) {
        $.request('/api/Comment/Pagelist', {
                "timestamp": ts(),
                 forumId:id,
                 pageIndex:pageIndex||1,
                 pageSize:10,
                token:localStorage.getItem("ttToken")||'',
                 sign: createSign({
                    forumId:id,
                    pageIndex:pageIndex||1,
                    pageSize:10,
                     token:localStorage.getItem("ttToken")||'',
                    "timestamp": ts(),
                })
            },
            function (res) {
                if(pageIndex>res.data.pageCount){
                    $(".comment-load-more").find("p").html("没有更多了");
                    $(".comment-load-more").find(".load-more-btn").hide();
                    $(".comment-load-more").attr("hasmore","0");
                    return;
                }
                 var str='';
                 var list= res.data.list;
                 for (var i=0;i<list.length;i++){
                     str+='<div class="list-box-A">';
                     str+='<div class="list-box-A-title">';
                     str+='   <div class="title-left">';
                     str+='  <img class="icon" src="images/headportrait1.png">';
                     str+='   <span class="name">'+list[i].UserName+'</span>';
                     str+='   <span class="time">'+list[i].Date+'</span>';
                     str+='   </div>';
                     str+='  <div class="title-right">';
                     str+='  <span class="s1 mes"><img class="icon" src="./images/message-icon.png"><span class="nums">'+list[i].CommentCount+'</span></span>';
                     str+=' <span class="s1 vote"><img class="icon vote-icon-img" commentId="'+list[i].Id+'" src="./images/vote-icon.png"><span class="nums">'+list[i].LikeCount+'</span></span>';
                     str+=' </div>';
                     str+=' </div>';
                     str+=' <div class="list-box-A-con">'+list[i].Content+'</div>';
                     str+=' <div class="list-box-A-textarea" style="display: none">';
                     str+='   <textarea class="textarea"></textarea>';
                     str+='  <div class="reply-btn">';
                     str+='  <img class="class-reply-btn-img" commentId="'+list[i].Id+'" src="images/reply-btn.png">';
                     str+='  </div>';
                     str+='   </div>';

                     var subList=list[i].SubCommentList;
                     for (var k=0;k<subList.length;k++){
                         str+='<div class="list-box-B">';
                         str+='    <div class="list-box-B-title">';
                         str+='   <div class="list-li-left">';
                         str+='   <span class="name">王迪迪</span>';
                         str+='   <span class="static">回复</span>';
                         str+='   <span class="name">王迪</span>';
                         str+='   <span class="time">半个小时前</span>';
                         str+='  </div>';
                         str+='   <div class="list-li-right">';
                         str+='  <span class="s1 del">删除</span>';
                         str+='   <span class="s1 mes"><img class="icon" src="./images/message-icon.png"><span class="nums">'+subList[k].CommentCount+'</span></span>';
                         str+='<span class="s1 vote"><img class="icon vote-icon-img" commentId="'+list[i].Id+'" src="./images/vote-icon.png"><span class="nums">'+subList[k].LikeCount+'</span></span>';
                         str+=' </div>';
                         str+=' </div>';
                         str+='<div class="list-box-B-con">'+subList[k].Content+'</div>';
                         str+='<div class="list-box-B-textarea" style="display: none">';
                         str+='   <textarea class="textarea"></textarea>';
                         str+='    <div class="reply-btn">';
                         str+='    <img class="class-reply-btn-img" commentId="'+subList[k].Id+'"  src="images/reply-btn.png">';
                         str+='   </div>';
                         str+='   </div>';
                         str+='   </div>';
                     }

                     str+='</div>';
                 }

                 $(".message-box .reply-list .list-box").append(str);
                $(".comment-load-more").find(".load-more-btn").hide();
            }
        );
    }

    Pagelist(1);

  ///api/Comment/Publish对文章发表评论，或者对评论进行二级评论
    $(".message-box").on("click",'.class-reply-btn-img',function () {
         var commentId=$(this).attr("commentId");
         var content=$(this).parent('.reply-btn').siblings('textarea').val();
        console.log(content);
        if (!content) {
            layer.msg('请填写评论');
            return;
        }

        $.request('/api/Comment/Publish', {
                timestamp: ts(),
                forumId:id,
                commentId:commentId,
                content:content,
                token:localStorage.getItem("ttToken")||'',
                sign: createSign({
                    token:localStorage.getItem("ttToken")||'',
                    forumId:id,
                    commentId:commentId,
                    content:content,
                    timestamp: ts(),
                })
            },
            function (res) {
                layer.msg(res.message);
                $(".message-box .reply-list .list-box").html('');
                Pagelist(1);
            }
        );
    })


    $(".message-box").on("click",'.comment-load-more',function () {
        var type=$(this).attr("type");
        $(".comment-load-more").find(".load-more-btn").show();
        var hasMore=  $(".comment-load-more").attr("hasmore");//1更多 0 没有
        if(hasMore==0){
            $(".comment-load-more").off();
            $(".comment-load-more").find(".load-more-btn").hide();
            return;
        }
        var pageIndex=$(this).attr("pageIndex");
        pageIndex=++pageIndex;
        $(this).attr("pageIndex",pageIndex);
        Pagelist(pageIndex);
    });

    //api/Forum/UserLike用户点赞接口
    $(".message-box").on("click",'.vote-icon-img',function () {
        var commentId=$(this).attr("commentId");
        console.log(commentId);
        $.request('/api/Forum/UserLike', {
                timestamp: ts(),
                forumId:id,
                commentId:commentId,
                userToken:localStorage.getItem("ttToken")||'',
                sign: createSign({
                    userToken:localStorage.getItem("ttToken")||'',
                    forumId:id,
                    commentId:commentId,
                    timestamp: ts(),
                })
            },
            function (res) {
                layer.msg(res.message);
            }
        );
    });


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
            layer.confirm('确定删除该评论?', {
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
        var mySwiper = new Swiper ('.images .swiper-container', {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
                el: '.images .swiper-pagination',
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

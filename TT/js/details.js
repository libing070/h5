$(function () {
    var id=GetUrlParam("id");
    init();

    //api/Forum/GetForumDetail(TT_007)根据ID获取文章内容，并且阅读数+1
    function GetForumDetail() {
            $.request('/api/Forum/GetForumDetail', {
                    timestamp: ts(),
                    id:id,
                    userToken:localStorage.getItem('ttToken')||'',
                    sign: createSign({
                        id:id,
                        userToken:localStorage.getItem('ttToken')||'',
                        timestamp: ts(),
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
                    $(".information .vote-icon-img").attr("forumId",id);
                    if(data.IsLike){
                        $(".information .vote-icon-img").attr("src",'./images/vote-icon-red.png');
                    }
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
                userToken:localStorage.getItem("ttToken")||'',
                 sign: createSign({
                    forumId:id,
                    pageIndex:pageIndex||1,
                    pageSize:10,
                     userToken:localStorage.getItem("ttToken")||'',
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
                     str+='<div rootId="'+list[i].Id+'" class="list-box-A">';
                     str+='<div class="list-box-A-title">';
                     str+='   <div class="title-left">';
                     str+='  <img class="icon" src="images/headportrait1.png">';
                     str+='   <span class="name">'+list[i].UserName+'</span>';
                     str+='   <span class="time">'+timeago(list[i].Date)+'</span>';
                     str+='   </div>';
                     str+='  <div class="title-right">';
                     if(list[i].IsMine){
                         str+='  <span class="s1 del" style="font-weight: bold" forumId="'+id+'" commentId="'+list[i].Id+'" >删除</span>';
                     }else{
                         str+='  <span class="s1" ></span>';
                     }
                     str+='  <span class="s1 mes"><img class="icon" src="./images/message-icon.png"><span class="nums">'+list[i].CommentCount+'</span></span>';
                     str+=' <span class="s1 vote"><img  forumId="'+id+'" class="icon vote-icon-img vote-icon-img-detail" commentId="'+list[i].Id+'" src="'+(list[i].IsLike?"./images/vote-icon-red.png":"./images/vote-icon.png")+'"><span class="nums">'+list[i].LikeCount+'</span></span>';
                     str+=' </div>';
                     str+=' </div>';
                     str+=' <div class="list-box-A-con">'+list[i].Content+'</div>';
                     str+=' <div class="list-box-A-textarea" style="display: none">';
                     str+='   <textarea class="textarea"></textarea>';
                     str+='  <div class="reply-btn">';
                     str+='  <img class="class-reply-btn-img" classs="1" commentId="'+list[i].Id+'" src="images/reply-btn.png">';
                     str+='  </div>';
                     str+='   </div>';

                     var subList=list[i].SubCommentList;
                     for (var k=0;k<subList.length;k++){
                         str+='<div class="list-box-B">';
                         str+='    <div class="list-box-B-title">';
                         str+='   <div class="list-li-left">';
                         str+='   <span class="name">'+subList[k].UserName+'</span>';
                         str+='   <span class="static">回复</span>';
                         str+='   <span class="name">'+subList[k].ToUserName+'</span>';
                         str+='   <span class="time">'+timeago(subList[k].Date)+'</span>';
                         str+='  </div>';
                         str+='   <div class="list-li-right">';
                         if(subList[k].IsMine){
                             str+='  <span class="s1 del" forumId="'+id+'" commentId="'+subList[k].Id+'" >删除</span>';
                         }else{
                             str+='  <span class="s1" ></span>';
                         }
                         str+='   <span class="s1 mes"><img class="icon" src="./images/message-icon.png"><span class="nums">'+subList[k].CommentCount+'</span></span>';
                         str+='<span class="s1 vote"><img class="icon vote-icon-img vote-icon-img-detail" forumId="'+id+'" commentId="'+subList[k].Id+'" src="'+(subList[k].IsLike?"./images/vote-icon-red.png":"./images/vote-icon.png")+'"><span class="nums">'+subList[k].LikeCount+'</span></span>';
                         str+=' </div>';
                         str+=' </div>';
                         str+='<div class="list-box-B-con">'+subList[k].Content+'</div>';
                         str+='<div class="list-box-B-textarea" style="display: none">';
                         str+='   <textarea class="textarea"></textarea>';
                         str+='    <div class="reply-btn">';
                         str+='    <img class="class-reply-btn-img" classs="2"  commentId="'+subList[k].Id+'"  src="images/reply-btn.png">';
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

    function appendSubComment(data) {
        var str='';
        str+='<div class="list-box-B">';
        str+='    <div class="list-box-B-title">';
        str+='   <div class="list-li-left">';
        str+='   <span class="name">'+data.UserName+'</span>';
        str+='   <span class="static">回复</span>';
        str+='   <span class="name">'+data.ToUserName+'</span>';
        str+='   <span class="time">'+timeago(data.Date)+'</span>';
        str+='  </div>';
        str+='   <div class="list-li-right">';
        if(data.IsMine){
            str+='  <span class="s1 del" forumId="'+id+'" commentId="'+data.Id+'" >删除</span>';
        }else{
            str+='  <span class="s1" ></span>';
        }
        str+='   <span class="s1 mes"><img class="icon" src="./images/message-icon.png"><span class="nums">'+data.CommentCount+'</span></span>';
        str+='<span class="s1 vote"><img class="icon vote-icon-img vote-icon-img-detail" forumId="'+id+'" commentId="'+data.Id+'" src="'+(data.IsLike?"./images/vote-icon-red.png":"./images/vote-icon.png")+'"><span class="nums">'+data.LikeCount+'</span></span>';
        str+=' </div>';
        str+=' </div>';
        str+='<div class="list-box-B-con">'+data.Content+'</div>';
        str+='<div class="list-box-B-textarea" style="display: none">';
        str+='   <textarea class="textarea"></textarea>';
        str+='    <div class="reply-btn">';
        str+='    <img class="class-reply-btn-img" classs="2"  commentId="'+data.Id+'"  src="images/reply-btn.png">';
        str+='   </div>';
        str+='   </div>';
        str+='   </div>';
        return str;
    }

  ///api/Comment/Publish对文章发表评论，或者对评论进行二级评论
    $(".message-box").on("click",'.class-reply-btn-img',function () {
         var commentId=$(this).attr("commentId");
         var content=$(this).parent('.reply-btn').siblings('textarea').val();
         var that=this;
        if (!content) {
            layer.msg('请填写评论');
            return;
        }
        if(!localStorage.getItem("ttToken")){
            layer.msg('请先登录');
            setTimeout(function () {
                window.location.href='./userhome.html?type=0';//登录
            },2000);
            return;
        }


        $.request('/api/Comment/Publish', {
                timestamp: ts(),
                forumId:id,
                commentId:commentId,
                content:content,
                userToken:localStorage.getItem("ttToken")||'',
                sign: createSign({
                    userToken:localStorage.getItem("ttToken")||'',
                    forumId:id,
                    commentId:commentId,
                    content:content,
                    timestamp: ts(),
                })
            },
            function (res) {
                layer.msg(res.message);
                $(that).parent('.reply-btn').siblings('textarea').val('');
                if(commentId==0){
                    $(".message-box .reply-list .list-box").html('');
                     Pagelist(1);
                }else{
                    var str=appendSubComment(res.data);
                   var classs=$(that).attr("classs");
                    if(classs==1){//一级回复评论按钮
                        $(that).parent('.reply-btn').parent('.list-box-A-textarea').after(str).slideToggle("slow");
                    }else if(classs==2){//二级回复评论按钮
                        $(that).parent('.reply-btn').parent('.list-box-B-textarea').slideToggle("slow");
                        $(that).parent('.reply-btn').parent('.list-box-B-textarea').parent('.list-box-B').after(str);
                    }

                }
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
        $(".list-box").on("click", ".list-box-A .list-box-A-title .del,.list-box-B .list-box-B-title .del", function () {
            var that = this;
            layer.confirm('确定删除该评论?', {
                icon: 3, title: '提示', yes: function (index) {
                    ///Comment/Delete(TT_012)删除评论
                    $.request('/api/Comment/Delete', {
                            timestamp: ts(),
                            forumId:$(that).attr("forumId"),
                            commentId:$(that).attr("commentId"),
                            userToken:localStorage.getItem("ttToken")||'',
                            sign: createSign({
                                timestamp: ts(),
                                userToken:localStorage.getItem("ttToken")||'',
                                forumId:$(that).attr("forumId"),
                                commentId:$(that).attr("commentId"),
                            })
                        },
                        function (res) {
                        if(res.code==1){
                            layer.close(index);
                            $(that).parent().parent().parent().fadeOut();
                            layer.msg('删除成功！');
                        }

                        }
                    );

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

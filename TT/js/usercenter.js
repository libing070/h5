$(function () {
    if(!localStorage.getItem('ttToken')){
        window.location.href='./index.html'
    }else{
      var  nickname= localStorage.getItem('ttName');
        $(".left-nav .nickname").html(nickname);
    }

    init();


    $(".left-nav").on("click",'.item-menu',function () {
        $(this).addClass("active").siblings().removeClass("active");
        $(this).find("span").css( "color","rgb( 233, 0, 16 )") ;
        $(this).find(".sanjiao").attr("src","images/sanjiao-icon-red.png");
        $(this).siblings().find("span").css( "color","") ;
        $(this).siblings().find(".sanjiao").attr("src","images/sanjiao-icon.png");
         var index= $(this).attr("type");
          for( var i=0;i<$('.right-content').find('.wrap').length;i++){
              if($('.right-content').find('.wrap').eq(i).attr("type")==index){
                  $('.right-content').find('.wrap').eq(i).show();
                  if(index==0){//发布内容
                    $(".fabu .content-display").each(function () {
                        $(this).find(".title").attr("ids","");
                        $(this).find(".title").val("");
                        $(this).find(".summary-textarea").val("");
                        $(this).find(".url-input").val("");
                        UE.getEditor('editor'+$(this).index()).setContent('可供编辑的内容');
                        $(".right-content .fabu .pu-menu .item").eq(0).click();
                    })
                  }
                  if(index==1){//初始化加载我的发布列表（默认加载‘已发布’）
                      GetForumCount();
                      $(".mypublish .mypu-menu .item").eq(0).click();
                  }
                  if(index==2){//我的喜欢
                      $('.mylike .mybox').html('');
                      GetForumPagingListForUserLike(1);
                  }
                  if(index==4){//初始化加载消息管理 系统消息
                      $(".right-content .mess .pu-menu .item").eq(0).click();
                  }
              }else{
                  $('.right-content').find('.wrap').eq(i).hide();
              }
          }
    })

    //我的发布切换事件
    $(".mypublish .mypu-menu").on("click",'.item',function () {
        $(this).addClass("active").siblings().removeClass("active");
        var type=$(this).attr("type");
        $(".mypublish-load-more").find("p").html("点击加载更多");
        $(".mypublish-load-more").attr("hasmore","1").attr("pageIndex","1").attr("type",type);
        $('.mypublish .mybox').html("");
        loadPageList(type,1);
    })

    ///api/Forum/GetForumCount(TT_006)获取我的文章各个状态的数量
    function GetForumCount() {
        $.request('/api/Forum/GetForumCount', {
                timestamp: ts(),
                userToken:localStorage.getItem("ttToken")||'',
                sign: createSign({
                    userToken:localStorage.getItem("ttToken")||'',
                    timestamp: ts(),
                })
            },
            function (res) {
               $(".mypublishcount").html('('+res.data.publish+')');
                $(".waitingcount").html('('+res.data.waiting+')');
                $(".rejectcount").html('('+res.data.reject+')');
                $(".draftcount").html('('+res.data.draft+')');
            }
        );
    }



    //api/Forum/PageList(TT_005) 我的文章列表(我的发布)
    function loadPageList(type,pageIndex){
        $.request('/api/Forum/PageList', {
                timestamp: ts(),
                state:type,// 0 提交待审核 1 已发布 2 未通过 3 草稿
                pageIndex:pageIndex||1,
                pageSize:10,
                userToken:localStorage.getItem("ttToken")||'',
                sign: createSign({
                    timestamp: ts(),
                    state:type,
                    pageIndex:pageIndex||1,
                    pageSize:10,
                    userToken:localStorage.getItem("ttToken")||'',
                })
            },
            function (res) {
                if(pageIndex>res.data.pageCount){
                    $(".mypublish-load-more").find("p").html("没有更多了");
                    $(".mypublish-load-more").find(".load-more-btn").hide();
                    $(".mypublish-load-more").attr("hasmore","0");
                    return;
                }
                if(res.data.list!=""){
                    var str = '';
                    res.data.list.forEach((ele, k) => {
                        str += '<div class="box">';
                        str += '   <div class="top">';
                        if(ele.MultimediaType==2){
                            str += ' <video class="bg" muted loop autoplay="autoplay" style="object-fit: fill;width: 100%"  src="'+ele.PicUrl+'""></video>';
                        }else{
                            str += '   <img class="bg" src="'+ele.PicUrl+'">';
                        }

                        str += '   <img class="bg-mask" src="images/my-pu-box-bg-mask.png">';
                        str += '   <p class="bottom">';
                        str += '   <span class="item"><img src="./images/message-icon-white.png"><span >'+ele.CommentCount+'</span></span>';
                        str += '<span class="item"><img src="./images/view-icon-white.png"><span>'+ele.VisitCount+'</span></span>';
                        str += ' <span class="item"><img src="./images/vote-icon-white.png"><span>'+ele.LikeCount+'</span></span>';
                        str += ' </p>';
                        str += ' <div class="mask" style="display: none">';
                        str += '   <div class="flex">';
                        str += '   <div class="item edit" type="'+ele.Type+'"  ids="'+ele.Id+'"><img src="images/edit-icon.png"><span style="color: #cb0404">编辑</span></div>';
                        str += ' <div class="item del" ids="'+ele.Id+'"><img src="images/delete-icon.png"><span>删除</span></div>';
                        str += '</div>';
                        str += '</div>';
                        str += '</div>';
                        str += '<div class="title">'+ele.Title+'</div>';
                        str += '   <div class="desc">'+ele.Summary+'</div>';
                        str += ' </div>';
                    });
                    $('.mypublish .mybox').append(str);
                    $(".mypublish-load-more").find(".load-more-btn").hide();

                }else{
                    $(".mypublish-load-more").find("p").html("没有更多了");
                }
            }
        );
    }
    $(".mypublish").on("click",'.mypublish-load-more',function () {
        var type=$(this).attr("type");
        $(".mypublish-load-more").find(".load-more-btn").show();
        var hasMore=  $(".mypublish-load-more").attr("hasmore");//1更多 0 没有
        if(hasMore==0){
            $(".mypublish-load-more").off();
            $(".mypublish-load-more").find(".load-more-btn").hide();
            return;
        }
        var pageIndex=$(this).attr("pageIndex");
        pageIndex=++pageIndex;
        $(this).attr("pageIndex",pageIndex);
        loadPageList(type,pageIndex);
    });

    var  clock;
    $(".fabu").on("click",'.content-display.active .submit img',function () {
        var type= $('.fabu .pu-menu').find('.item.active').attr("typenum");
        var Id=$(".content-display.active").find(".title").attr("ids");
        var Title=$(".content-display.active").find(".title").val();
        var Summary=$(".content-display.active").find(".summary-textarea").val();
        var typeNum= $(".content-display.active").find(".eduit-wrap").attr("type");
        var hasContents= UE.getEditor('editor'+typeNum).hasContents();
        var Content= UE.getEditor('editor'+typeNum).getContent();
        var PicUrl=$(".content-display.active").find(".url-input").val();

        var random=['http://219.143.155.183:8899/Upload/20190905/o_1djvmmtuf1ub0vqd5so10i9tmrf_长安马自达-案例展示板.jpg',
            'http://219.143.155.183:8899/Upload/20190823/a68a901e-cacb-4d83-923c-18f972317ed7.jpg',
            'http://219.143.155.183:8899/Upload/20190823/a68a901e-cacb-4d83-923c-18f972317ed7.jpg',
            'http://219.143.155.183:8899/file/case2.jpg',
            'http://219.143.155.183:8899/file/case1.jpg',
            'http://219.143.155.183:8899/Upload/20190829/o_1dje7p5ks2t916ch1hchsl014o9f_Koala.jpg'];
        var index = Math.floor(Math.random()*random.length);//取得随机数的索引
     //  PicUrl=random[index];//根据索引取得随机数
        var MultimediaType=1;//图片


        if(PicUrl.indexOf("mp4")!=-1){
            MultimediaType=2//视频
        }
        if(!Title){
            layer.msg("请填写标题");
            return;
        }
        if(!Summary){
            layer.msg("请填写摘要");
            return;
        }
        if(!hasContents){
            layer.msg("请填写内容");
            return;
        }
        if(!PicUrl){
            layer.msg("请上传文件");
            return;
        }




        var url='',params={};
        if(Id==""){//新增
            url='/api/Forum/Publish';
            params= {
                timestamp: ts(),
                //  Id:Id||'',
                type:type,
                Title:Title,
                Summary:Summary,
                PicUrl:PicUrl,
                MultimediaType:MultimediaType,
                Content:Content,
                userToken:localStorage.getItem("ttToken")||'',
                sign: createSign({
                    timestamp: ts(),
                    //   Id:Id||'',
                    type:type,
                    Title:Title,
                    Summary:Summary,
                    PicUrl:PicUrl,
                    MultimediaType:MultimediaType,
                    Content:Content,
                    userToken:localStorage.getItem("ttToken")||'',
                })
            }
        }else{//编辑
            url='/api/Forum/GetForumDetailForEditEvent';
            params= {
                timestamp: ts(),
                Id:Id,
                type:type,
                Title:Title,
                Summary:Summary,
                PicUrl:PicUrl,
                MultimediaType:MultimediaType,
                Content:Content,
                userToken:localStorage.getItem("ttToken")||'',
                sign: createSign({
                    timestamp: ts(),
                    Id:Id,
                    type:type,
                    Title:Title,
                    Summary:Summary,
                    PicUrl:PicUrl,
                    MultimediaType:MultimediaType,
                    Content:Content,
                    userToken:localStorage.getItem("ttToken")||'',
                })
            }
        }

        $.request(url,params,
            function (res) {
                layer.msg(res.message);
                $(".submitted-pages").show();
                $(".content-display.active").hide();
                var  totalTime= 5;
                clock = window.setInterval(() => {
                    totalTime--;
                    $('.submitted-pages p .s2').html(totalTime);
                    if (totalTime <=0) {
                        window.clearInterval(clock);
                        $(".submitted-pages").hide();
                        resetPublish();
                        $(".left-nav .item-menu").eq(1).click();
                    }
                },1000);
            }
        );
    });

    //发布完成 立即返回按钮
    $(".right-content").on("click",'.fabu .submitted-pages .s3',function () {
        window.clearInterval(clock);
        $(".submitted-pages").hide();
        $('.submitted-pages p .s2').html(5);
            resetPublish();
            $(".left-nav .item-menu").eq(1).click();
    });

    //--发布内容--//
    $(".right-content").on("click",'.fabu .pu-menu .item',function () {
        $(this).addClass("active").siblings().removeClass("active");
        var len= $(".content-display").length;
        for(var i=0;i<len;i++){
            if($(".content-display").eq(i).attr("type")==$(this).attr("type")){
                $(".content-display").eq(i).addClass("active").show();
            }else{
                $(".content-display").eq(i).removeClass("active").hide();
            }
        }
    });

    $(".right-content .publish .mybox").on("mouseenter", ".box", function() {
        $(this).find(".top").children('.mask').stop().slideDown();
    });
    $(".right-content .publish .mybox").on("mouseleave", ".box", function() {
        $(this).find(".top").children('.mask').stop().slideUp();
    });


    //我的发布-我的喜欢  点击删除
    $(".right-content").on("click", ".mybox .box .top .mask .del", function () {
        var that = this;
         var id=$(this).attr("ids");
        layer.confirm('确定删除?', {
            icon: 3, title: '提示', yes: function (index) {
                ///api/Forum/DeleteForum(TT_012)删除文章
                $.request('/api/Forum/DeleteForum', {
                        timestamp: ts(),
                        id:id,
                        userToken:localStorage.getItem("ttToken")||'',
                        sign: createSign({
                            timestamp: ts(),
                            userToken:localStorage.getItem("ttToken")||'',
                            id:id,
                        })
                    },
                    function (res) {
                        layer.close(index);
                       // $(that).parent().parent().parent().parent().fadeOut();
                        GetForumCount();
                        $(".mypublish .mypu-menu .item.active").click();
                    }
                );

            },
            cancel: function (index, layero) {
                layer.close(index);
            }
        });
    });

    //我的发布-我的喜欢  点击编辑
    $(".right-content").on("click", ".mybox .box .top .mask .edit", function () {
        var type=$(this).attr("Type");// 0资讯  1 知识  4活动
        var index=type==4?2:type;
        var id=$(this).attr("ids");
        $(".left-nav .item-menu").eq(0).click();//切换到发布内容
        $(".right-content .fabu .pu-menu .item").eq(index).click();//根据type定位到资讯知识活动
        GetForumDetailForEdit(id,index);
    });
    //api/Forum/GetForumDetailForEdit(TT_007)根据ID获取文章内容
function GetForumDetailForEdit(id,index) {
    $.request('/api/Forum/GetForumDetailForEdit', {
            timestamp: ts(),
            id:id,
            userToken:localStorage.getItem("ttToken")||'',
            sign: createSign({
                timestamp: ts(),
                id:id,
                userToken:localStorage.getItem("ttToken")||'',
            })
        },
        function (res) {
            $(".content-display.active").find(".title").attr("ids",res.data.Id);
            $(".content-display.active").find(".title").val(res.data.Title);
            $(".content-display.active").find(".summary-textarea").val(res.data.Summary);
            ++index;
            UE.getEditor('editor'+(index)).setHeight(200);
            UE.getEditor('editor'+(index)).setContent(res.data.Content);
            $(".content-display.active").find(".url-input").val(res.data.PicUrl);
        }
    );
}


    //我的喜欢列表
    ///Forum/GetForumPagingListForUserLike我点赞的文章
    function GetForumPagingListForUserLike(pageIndex) {
        $.request('/api/Forum/GetForumPagingListForUserLike', {
                timestamp: ts(),
                pageIndex:pageIndex||1,
                pageSize:10,
                userToken:localStorage.getItem("ttToken")||'',
                sign: createSign({
                    timestamp: ts(),
                    pageIndex:pageIndex||1,
                    pageSize:10,
                    userToken:localStorage.getItem("ttToken")||'',
                })
            },
            function (res) {
                if(pageIndex>res.data.pageCount){
                    $(".myLike-load-more").find("p").html("没有更多了");
                    $(".myLike-load-more").find(".load-more-btn").hide();
                    $(".myLike-load-more").attr("hasmore","0");
                    return;
                }
                if(res.data.forumList!=""){
                    var str = '';
                    res.data.forumList.forEach((ele, k) => {
                        str += '<div id="'+ele.id+'" type="'+ele.type+'" class="box">';
                        str += '   <div class="top">';
                        str += '   <img class="bg" src="'+ele.picUrl+'">';
                        str += '   <img class="bg-mask" src="images/my-pu-box-bg-mask.png">';
                        str += '   <p class="bottom">';
                        str += '   <span class="item"><img src="./images/message-icon-white.png"><span >'+ele.commentCount+'</span></span>';
                        str += '<span class="item"><img src="./images/view-icon-white.png"><span>'+ele.visitCount+'</span></span>';
                        str += ' <span class="item"><img src="'+(ele.IsLike?"./images/vote-icon-red.png":"./images/vote-icon-white.png")+'"><span>'+ele.likeCount+'</span></span>';
                        str += ' </p>';
                        // str += ' <div class="mask" style="display: none">';
                        // str += '   <div class="flex">';
                        // str += '   <div class="item edit" type="'+ele.type+'"  ids="'+ele.Id+'"><img src="images/edit-icon.png"><span style="color: #cb0404">编辑</span></div>';
                        // str += ' <div class="item del" ids="'+ele.id+'"><img src="images/delete-icon.png"><span>删除</span></div>';
                        // str += '</div>';
                        // str += '</div>';
                        str += '</div>';
                        str += '<div class="title">'+ele.title+'</div>';
                        str += '   <div class="desc">'+ele.summary+'</div>';
                        str += ' </div>';
                    });
                    $('.mylike .mybox').append(str);
                    $(".myLike-load-more").find(".load-more-btn").hide();

                }else{
                    $(".myLike-load-more").find("p").html("没有更多了");
                }
            }
        );
    }
    $(".mylike").on("click",'.myLike-load-more',function () {
        $(".myLike-load-more").find(".load-more-btn").show();
        var hasMore=  $(".myLike-load-more").attr("hasmore");//1更多 0 没有
        if(hasMore==0){
            $(".myLike-load-more").off();
            $(".myLike-load-more").find(".load-more-btn").hide();
            return;
        }
        var pageIndex=$(this).attr("pageIndex");
        pageIndex=++pageIndex;
        $(this).attr("pageIndex",pageIndex);
        GetForumPagingListForUserLike(pageIndex);
    });
    $(".mylike .mybox").on("click",'.box',function () {
      var type= $(this).attr('type');//type=4 活动
        if(type==4){
            window.location.href='./active-details.html?forumId='+$(this).attr("id");
        }else{
            window.location.href='./details.html?id='+$(this).attr("id");
        }
    });
    //  账户密码
    $(".myaccount .form").on("click",'.btn',function () {
        var userName=$('.myaccount .form .userName').val();
        var password=$('.myaccount .form .password').val();
        var confirmPassword=$('.myaccount .form .confirmPassword').val();
        if (!userName) {
            layer.msg('请填写用户名');
            return;
        };
        if (!password) {
            layer.msg('请填写密码');
            return;
        };
        if (!confirmPassword) {
            layer.msg('请填写确认密码');
            return;
        };
        if (password!=confirmPassword) {
            layer.msg('两次密码不一致');
            return;
        }

        $.request('/api/User/ModifyPassword', {
                timestamp: ts(),
                userName:userName,
                  password:password,
                 confirmPassword:confirmPassword,
                 sign: createSign({
                    password:password,
                    confirmPassword:confirmPassword,
                    timestamp: ts(),
                    userName:userName,
                })
            },
            function (res) {
                layer.msg(res.message);
                if(res.code==1){
                    localStorage.removeItem('ttToken');
                    localStorage.removeItem('ttName');
                    $(".container .header .register").show();
                    $(".container .header .signin").show();
                    $(".container .header .exit").hide();
                    $(".container .header .users").hide();
                    setTimeout(function () {
                        window.location.href='./userhome.html'
                    },2000);
                }

            }
        );

    })


    //消息管理
    $(".right-content").on("click",'.mess .pu-menu .item',function () {
        console.log( $(this).attr("type"));
        $(this).addClass("active").siblings().removeClass("active");
        if( $(this).attr("type")=='system'){//系统消息
             $(".system-content").show();
             $(".comment-box").hide();
            $('.system-detail').hide();
            $(".system-load-more").find("p").html("加载更多");
            $(".system-load-more").attr("hasmore","1").attr("pageIndex","1");
            loadSystemMessage(1);
        }else{//评论管理
            $(".comment-box").show();
            $(".system-content").hide();
            $('.system-detail').hide();
            $(".comment-box .comment-box-list").html('');
            MyCommentList(1);
        }
    })
    //api/Message/GetPagingList获取用户的消息(系统消息)
    function loadSystemMessage(pageIndex){
        $.request('/api/Message/GetPagingList', {
                timestamp: ts(),
                userToken:localStorage.getItem("ttToken")||'',
                pageIndex:pageIndex||1,
                pageSize:10,
                sign: createSign({
                    pageIndex:pageIndex||1,
                    userToken:localStorage.getItem("ttToken")||'',
                    pageSize:10,
                    timestamp: ts(),
                })
            },
            function (res) {
                if(pageIndex>res.data.pageCount){
                    $(".system-load-more").find("p").html("没有更多了");
                    $(".system-load-more").find(".load-more-btn").hide();
                    $(".system-load-more").attr("hasmore","0");
                    return;
                }
                if(res.data.list!=""){
                    var str='';
                    res.data.list.forEach((ele, k) => {
                        str+='<div class="box"><span class="desc">您发布的《XXXXXX》为能审核通过</span><span class="time">2019-8-6</span></div>';
                    });
                    $(".mess .system-box").append(str);
                    $(".system-load-more").find(".load-more-btn").hide();
                }else{
                    $(".system-load-more").find("p").html("没有更多了");
                }

            }
        );
    }

    //系统消息加载更多
    $(".mess").on("click",'.system-load-more',function () {
        $(".system-load-more").find(".load-more-btn").show();
        var hasMore=  $(".system-load-more").attr("hasmore");//1更多 0 没有
        if(hasMore==0){
            $(".system-load-more").off();
            $(".system-load-more").find(".load-more-btn").hide();
            return;
        }
        var pageIndex=$(this).attr("pageIndex");
        pageIndex=++pageIndex;
        $(this).attr("pageIndex",pageIndex);
        loadSystemMessage(pageIndex);

    });


    // //消息管理-系统管理 点击列表
    // $(".right-content").on("click",'.mess .system-content .system-box .box',function () {
    //      $('.system-detail').show();
    //      $(".system-content").hide();
    // });
    // //消息管理-系统管理 点击返回
    // $(".right-content").on("click",'.mess .system-detail .system-menu',function () {
    //     $('.system-detail').hide();
    //     $(".system-content").show();
    // });


    //消息管理-评论管理 列表
    ///Comment/MyCommentList我发布的评论
  function MyCommentList(pageIndex) {
      $.request('/api/Comment/MyCommentList', {
              timestamp: ts(),
              userToken:localStorage.getItem("ttToken")||'',
              pageIndex:pageIndex||1,
              pageSize:10,
              sign: createSign({
                  pageIndex:pageIndex||1,
                  userToken:localStorage.getItem("ttToken")||'',
                  pageSize:10,
                  timestamp: ts(),
              })
          },
          function (res) {
              if(pageIndex>res.data.pageCount){
                  $(".comment-load-more").find("p").html("没有更多了");
                  $(".comment-load-more").find(".load-more-btn").hide();
                  $(".comment-load-more").attr("hasmore","0");
                  return;
              }
              if(res.data.list!=""){
                  var str='';
                  res.data.list.forEach((ele, k) => {
                      str+='  <div class="box">';
                      str+='   <img class="head" src="images/headportrait1.png">';
                      str+='   <p class="desc">';
                      str+='   <span class="p1">'+ele.UserName+'</span>';
                      str+='   <span class="p2">评论了文章</span>';
                      str+='   <span class="p1">《'+ele.ForumName+'》</span>';
                      str+=' <span class="p2">'+(timeago(ele.Date))+'</span><br/>';
                      str+=' <span class="p2">'+(ele.Content.length>30?(ele.Content.substring(0,30)+"..."):ele.Content)+'</span>';
                      str+=' </p>';
                      str+=' <p class="del"><img style="display: inline-block;vertical-align: middle;padding-right: 0.05rem" src="images/delete-icon.png">删除</p>';
                      str+='   </div>';
                  });
                  $(".comment-box .comment-box-list").append(str);
                  $(".comment-load-more").find(".load-more-btn").hide();
              }else{
                  $(".comment-load-more").find("p").html("没有更多了");
              }

          }
      );
  }
//评论管理加载更多
    $(".comment-box").on("click",'.comment-load-more',function () {
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
        MyCommentList(pageIndex);

    });

    //消息管理-评论管理  点击删除
    $(".right-content").on("click", ".comment-box .box .del", function () {
        var that = this;
        layer.confirm('确定删除?', {
            icon: 3, title: '提示', yes: function (index) {
                layer.close(index);
                $(that).parent().fadeOut();
            },
            cancel: function (index, layero) {
                layer.close(index);
            }
        });
    });


});

async  function init() {
    await loadModule();
    await activemouseEvents();
}
 loadModule = () => {
    $("#usercenter .header").load("header.html");//加载头部导航
    $("#usercenter .footer").load("footer.html");//加载底部导航
}
 activemouseEvents = () => {
    setTimeout(function () {
        $('#usercenter .header .nav ul li').hover(function () {
            $(this).find('.submenu').stop().slideDown();
        }, function () {
            $(this).find('.submenu').stop().slideUp();
        });
    },100);
}

function resetPublish(){
    $(".content-display").find(".title").val('');
    $(".content-display").find(".summary-textarea").val('');
    $(".content-display").find(".url-input").val('');
    ue1.ready(function() {
        ue1.setHeight(200);
        //设置编辑器的内容
        ue1.setContent('可供编辑的内容');
    });
    ue2.ready(function() {
        ue2.setHeight(200);
        //设置编辑器的内容
        ue2.setContent('可供编辑的内容');
    });
    ue3.ready(function() {
        ue3.setHeight(200);
        //设置编辑器的内容
        ue3.setContent('可供编辑的内容');
    });
}
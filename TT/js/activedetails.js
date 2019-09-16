$(function () {
    var forumId=GetUrlParam("forumId");
    init();
    //api/Forum/GetActivityInfo(TT_028)获取活动详情
    function GetActivityInfo() {
        $.request('/api/Forum/GetActivityInfo', {
                "timestamp": ts(),
                  forumId:forumId,
                  sign: createSign({
                  forumId:forumId,
                    "timestamp": ts(),
                })
            },
            function (res) {
                var str = '';
               var data= res.data.forumInfo;
               $(".details").attr('forumid',forumId);
               $(".information").find(".title").html(data.title);
                $(".information").find(".createTime").html("发布时间："+data.createTime.split(" ")[0]);
                $(".information").find(".createUserName").html("发布者："+(data.createUserName==""?"暂无":data.createUserName));
                var picUrl=data.picUrl==null?"./images/details-s1.jpg":data.picUrl;
                $(".information").find(".images .swiper-wrapper").append("<div class='swiper-slide'><img class='video-bg' src='"+picUrl+"'></div>");
            }
        );
    }
    GetActivityInfo();



    $('.video_box .video-btn').on('click', function () {
        $('.video_box .video-btn').hide();
        $('.video_box .video-bg').hide();
        var v = document.getElementById("video1");
        v.play();
    });


    $(".registr").on("click",'.active-reg-btn',function () {
          $(".dialog").fadeIn();
    })
    $(".dialog").on("click",'.close-btn',function () {
        $(".dialog").fadeOut();
    })

  $(".dialog .form").on("click",'.submit-btn',function () {
      var forumId=$(".details").attr("forumid");
      var name=$(".dialog .form").find(".name").val();
      var company=$(".dialog .form").find(".company").val();
      var office=$(".dialog .form").find(".office").val();
      var mobile=$(".dialog .form").find(".mobile").val();
      var email=$(".dialog .form").find(".email").val();
      var myregmobile = /^(1(([34578][0-9])|(47)|[8][01236789]))\d{8}$/;

      if (!name) {
          layer.msg('请填写您的姓名');
          return;
      }
      if (!company) {
          layer.msg('请填写您的公司名称');
          return;
      }
      if (!office) {
              layer.msg('请填您的职位');
              return;
      }
      if (!mobile) {
          layer.msg('请填写您的手机号');
          return;
      }
      if (!myregmobile.test(mobile)) {
          layer.msg('请填写正确手机号');
          return;
      }

      ///api/Forum/ActivityApply(TT_029)活动报名
      $.request('/api/Forum/ActivityApply', {
              forumId: forumId,
              name:name,
              company:company,
              office:office,
              mobile:mobile,
              email:email,
              timestamp: ts(),
              sign: createSign({
                  forumId: forumId,
                  name:name,
                  company:company,
                  office:office,
                  mobile:mobile,
                  email:email,
                  timestamp: ts(),
              })
          },
          function (res) {
              layer.msg(res.message,function () {
                  $(".dialog").fadeOut();
              });
          }
      );

  })

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

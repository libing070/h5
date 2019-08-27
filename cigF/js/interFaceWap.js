$(function () {

    // (Portal_011)获取模块排序
    $.request('/api/Module/GetModuleList', {
            roleId: 1,
            timestamp: ts(),
            sign: createSign({
                roleId: 1,
                timestamp: ts(),
            })
        },
        function (res) {
            // console.log(res);
            var moduleCode = res.data[0].moduleCode;
            if (moduleCode == '09') { //1
                $('.module9').insertBefore($('.module1'));
                $(".wap_ani_52,.wap_ani_53m,.wap_ani_54").css('opacity', '0');
                aniTranslateY(['.wap_ani_52'], ['1rem', '0', ], 1000, 200);
                aniTranslateY(['.wap_ani_53'], ['1rem', '0', ], 1000, 200);
                aniTranslateY(['.wap_ani_54'], ['1rem', '0', ], 1000, 400);
            }
            if (moduleCode == '06') { //6 联系
                aniResetWap();
                $('.module6').insertBefore($('.module1'));
                $(".module6").addClass("module_back_scale");
                aniTranslateY(['.wap_ani_30'], ['-1rem', '0',], 4000, 400);
                aniTranslateY(['.wap_ani_31'], ['-1rem', '0',], 4000, 200);
                aniTranslateY(['.wap_ani_32'], ['1rem', '0',], 4000, 600);
                aniTranslateY(['.wap_ani_33'], ['1rem', '0',], 4000, 800);
                aniTranslateY(['.wap_ani_34'], ['1rem', '0',], 4000, 1000);
                aniTranslateY(['.wap_ani_35'], ['1rem', '0',], 4000, 1000);
                aniTranslateX(['.wap_ani_36'], ['150%', '0',], 2000, 400);
                aniTranslateX(['.wap_ani_37'], ['150%', '0',], 2000, 600);

                aniTranslateX(['.wap_ani_38'], ['-150%', '0',], 2000, 400);
                aniTranslateX(['.wap_ani_39'], ['-150%', '0',], 2000, 600);
                aniTranslateX(['.wap_ani_40'], ['-150%', '0',], 2000, 800);

                aniTranslateX(['.wap_ani_41'], ['-150%', '0',], 2000, 400);
                aniTranslateX(['.wap_ani_42'], ['-150%', '0',], 2000, 600);
                aniTranslateX(['.wap_ani_43'], ['-150%', '0',], 2000, 800);

                aniTranslateX(['.wap_ani_44'], ['150%', '0',], 2000, 400);
                aniTranslateX(['.wap_ani_45'], ['150%', '0',], 2000, 600);
                aniTranslateX(['.wap_ani_46'], ['150%', '0',], 2000, 800);

                aniTranslateX(['.wap_ani_47'], ['150%', '0',], 2000, 400);
                aniTranslateX(['.wap_ani_48'], ['150%', '0',], 2000, 600);
                aniTranslateX(['.wap_ani_49'], ['150%', '0',], 2000, 800);
            }
        }
    );


    // (Portal_003)获取首页案例信息
    $.request('/api/Case/GetList', {
            timestamp: ts(),
            sign: createSign({
                timestamp: ts()
            })
        },
        function (res) {
            // console.log(res);
            var str = '';
            res.data.forEach((ele, k) => {
                if(ele.multimediaType == 1){//图片
                    str += '<div class="swiper-slide case-swiper-slide image">';
                    str+='<img style="object-fit:cover;width:100%;height:100%" src="' + ele.url + '">';
                }else if(ele.multimediaType == 2){//视频
                    str += '<div class="swiper-slide case-swiper-slide video">';
                    str+='<img class="case-swiper-video-btn" onclick="playVideo(this,' + k + ')" src="./images/wap/video-btn.png">';
                    str+='<video  controls="controls"  poster="" x5-playsinline="" playsinline="" webkit-playsinline="" class="video" style="object-fit:cover;" height="100%" width="100%" id="caseVideo' + k + '"  src="'+ele.url+'" preload="auto"></video>';
                }
                str +='<p class="server-user">'+ele.serviceUser+'</p>';
                str +='<p class="name">'+ele.name+'</p>';
                str +='<p  class="arrow"><img caseId="'+ele.id+'" class="arrow_icon_btn" src="images/arrow_icon.png"></p>';
                str += '</div>';

            });
            $('.caseSwiper .swiper-wrapper').append(str);
        }
    );

    $(".caseSwiper .swiper-wrapper").on("click",".arrow_icon_btn",function () {
        var caseId=$(this).attr("caseId");
        console.log($(this).attr("caseId"));
        window.location.href = "./pagewap/details.html?caseId="+caseId;
    });


    // //(Portal_005)获取新闻推荐
    $.request('/api/News/GetRecommendNews', {
            timestamp: ts(),
            sign: createSign({
                timestamp: ts(),
            })
        },
        function (res) {
            var str = '';
            res.data.forEach((ele, k) => {
                str+='<div class="swiper-slide news-swiper-slide">';
                str+='<img style="width:100%;" src="'+ele.picUrl+'">';
                str+='<p newsId="'+ele.id+'" class="t">'+ele.title+'</p>';
                str+='<p  newsId="'+ele.id+'"class="content">'+ele.summary+'</p>';
                str+='</div>';

            });
            $('.news-swiper .swiper-wrapper').html(str);
        }
    );

    $(".news-swiper .swiper-wrapper").on("click",".t,.content",function () {
        var newsId=$(this).attr("newsId");
        console.log($(this).attr("newsId"));
        window.location.href = "./pagewap/details.html?newsId="+newsId;
    });



    // (Portal_007)获取招聘信息
    $.request('/api/Job/GetJobInfo', {
            "timestamp": ts(),
            sign: createSign({
                "timestamp": ts(),
            })
        },
        function (res) {
            var str = '';
            res.data.hotJob.forEach((ele, k) => {
              str+='<a class="hotjobs-a-'+k+'" href="' + ele.jobUrl + '">'+ele.jobTitle+'</a>';
            });
            $('.hotjobsData').append(str);
            var str2 = '';
            res.data.longTimeJob.forEach((ele, k) => {
                str2+='<a class="longrecruit-a-'+k+'" href="' + ele.jobUrl + '">'+ele.jobTitle+'</a>';
            });
           $('.longrecruitData').append(str2);
        }
    );

    // (Portal_008)获取首页营销智库列表
    $.request('/api/Forum/GetHomeRecommendInfo', {
            timestamp: ts(),
            sign: createSign({
                timestamp: ts(),
            })
        },
        function (res) {
            // console.log(res);
            var ttStr = '';
            res.data.forEach(function (ele, k) {
                ttStr+='<div class="swiper-slide">';
                  ttStr+='<img class="image" src="' + ele.picUrl + '" >';
                  ttStr+='<p class="title">'+ele.title+'</p>';
                  ttStr+='<p class="author ">发布者：'+ele.createUserName+'</p>';
                  ttStr+='<div class="item">';
                    ttStr+='<p><img class="xinxi" style="display: inline-block" src="images/wap/xinxi-icon.png">'+ ele.commentCount + '</p>';
                    ttStr+='<p><img class="look"  style="display: inline-block"  src="images/wap/look-icon.png">'+ ele.visitCount +'</p>';
                    ttStr+='<p><img class="heart" style="display: inline-block"  src="images/wap/heart-icon.png">'+ ele.likeCount+'</p>';
                  ttStr+='</div>';
                ttStr+='</div>';

            });
            $('.thinktank-swiper .swiper-wrapper').append(ttStr);
        }
    );

    // (Portal_011)获取首页网盘信息
    $.request('/api/NetDisc/GetHomeNetDiscInfo', {
            timestamp: ts(),
            sign: createSign({
                timestamp: ts(),
            })
        },
        function (res) {
            // console.log(res);
            var wpStr = '';
            res.data.forEach((ele, k) => {
                // wpStr += '<li>' +
                //     '<a href="' + ele.url + '" id="' + ele.id + '" download="download">' +
                //     '<span class="fontSize14">' + ele.name + '</span>' +
                //     '<span class="fontSize14">' + ele.fileSize + '</span>' +
                //     '<span class="fontSize14">下载</span>' +
                //     '<img src="./images/dl-black.png" alt="">' +
                //     '</a>' +
                //     '</li>';

                wpStr +='<div class="swiper-slide item">';
                wpStr +='<a href="' + ele.url + '" id="' + ele.id + '"  href="" style="display: block;width: 100%">';
                wpStr +='<span class="name">'+ ele.name + '</span>';
                wpStr +='<span class="size">' + ele.fileSize + '</span>';
                wpStr +='<span class="xiazai">下载</span>';
                wpStr +='<span class="icon"><img class="download-btn" src="./images/wap/download-icon.png"></span>';
                wpStr +='</a>';
                wpStr +='</div>';
            })
            $('.download-swiper-wrapper').append(wpStr);
        }
    );


    // 验证码生成
    $('.verifyCodeImg img').on('click', function () {
        $(this).attr('src', host + '/api/VerifyCode/CreateCode?' + ts());
    });

});

//时间戳
function ts() {
    return Math.round(new Date() / 1000);
}
// 新建md5加密值
function createSign(dic) {
    var jsonstr = JSON.stringify(objKeySort(dic));
    var str1 = jsonstr.replace(new RegExp(':', 'g'), '=');
    var str2 = str1.replace(new RegExp(',', 'g'), '&');
    var str3 = str2.substring(1, str2.length - 1);
    str3 = str3.replace(/\"/g, "");
    var str = str3 + '&661C9A9B-6E9A-4C1E-92AA-B4F7B8D4DD3C'
    var sign = hex_md5(str);
    return sign;
}
//排序的函数
function objKeySort(arys) {
    //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
    var newkey = Object.keys(arys).sort();
    //console.log('newkey='+newkey);
    var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
    for (var i = 0; i < newkey.length; i++) {
        //遍历newkey数组
        newObj[newkey[i]] = arys[newkey[i]];
        //向新创建的对象中按照排好的顺序依次增加键值对
    }
    return newObj; //返回排好序的新对象
}

function playVideo(_this, k) {
    // var eleName = 'caseVideo' + k;
    // $(_this).hide();
    // var myVideo=$(_this).siblings("video").get(0);
    // myVideo.play();
    // myVideo.addEventListener('ended', playsss);
    // function playsss() {
    //     console.log(1);
    //     $(".caseSwiper .case-swiper-video-btn").show();
    //     myVideo.removeEventListener("ended", playsss);
    //
    // }
 }




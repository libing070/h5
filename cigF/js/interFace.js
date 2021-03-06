$(function () {
    // 接口
    // (Portal_011)获取模块排序

    var roleId=localStorage.getItem("roleId");

    if(roleId!=3){//排除不是合伙伙伴
       var currIp =returnCitySN["cip"];
        if(allIp.indexOf(currIp)>-1){//是员工
           localStorage.setItem("roleId","2");
        }else{//普通用户
            localStorage.setItem("roleId","1");

        }

    }
   //console.log(returnCitySN["cip"]+','+returnCitySN["cname"]);
    function firstApi() {
        $.request('/api/Module/GetModuleList', {
                roleId: localStorage.getItem("roleId"),
                timestamp: ts(),
                sign: createSign({
                    roleId: localStorage.getItem("roleId"),
                    timestamp: ts(),
                })
            },
            function (res) {
                var moduleCode = res.data[0].moduleCode;
                if (moduleCode == '09') { //1
                    $('.module9').insertBefore($('.module1'));
                    aniTranslateY(['.ani_76'], ['1rem', '0', ], 1000, 500);
                }
                if (moduleCode == '06') { //6 联系
                    $('.module6').insertBefore($('.module1'));
                    $('.logo').attr("src",'./images/logo.png');
                    aniTranslateX(['.ani_38'], ['-2rem', '0', ], 1000, 500);
                    aniTranslateX(['.ani_39'], ['-2rem', '0', ], 1000, 700);
                    aniTranslateX(['.ani_40'], ['-2rem', '0', ], 1000, 900);
                    aniTranslateX(['.ani_41'], ['-2rem', '0', ], 1000, 1100);
                    aniTranslateX(['.ani_42'], ['-2rem', '0', ], 1000, 1200);
                    aniTranslateW(['.line_contcat1'], ['0%', '100%', ], 1000, 2000);
                    aniTranslateX(['.ani_43'], ['-2rem', '0', ], 1000, 1400);
                    aniTranslateW(['.line_contcat2'], ['0%', '100%', ], 1000, 2400);
                    aniTranslateX(['.ani_44'], ['2rem', '0', ], 1000, 500);
                    aniTranslateX(['.ani_45'], ['2rem', '0', ], 1000, 600);
                    aniTranslateX(['.ani_46'], ['2rem', '0', ], 1000, 700);
                    aniTranslateX(['.ani_47'], ['2rem', '0', ], 1000, 800);
                    aniTranslateX(['.ani_48'], ['2rem', '0', ], 1000, 900);
                    aniTranslateX(['.ani_49'], ['2rem', '0', ], 1000, 1000);
                    aniTranslateX(['.ani_50'], ['2rem', '0', ], 1000, 1100);
                    aniTranslateX(['.ani_51'], ['2rem', '0', ], 1000, 1200);
                    aniTranslateX(['.ani_52'], ['2rem', '0', ], 1000, 1300);
                    aniTranslateX(['.ani_53'], ['2rem', '0', ], 1000, 1400);
                    aniTranslateX(['.ani_54'], ['2rem', '0', ], 1000, 1500);
                    aniTranslateX(['.ani_55'], ['2rem', '0', ], 1000, 1600);
                    aniTranslateT(['.ani_56'], ['60%', '40%', ], 1000, 1800);
                    aniTranslateW(['.line_qrcode'], ['0%', '100%', ], 1000, 2800);
                    $('.module6 .reImg').addClass('module6_back');
                }
                // loading(1, function () {
                //     getList();
                // });
                loading();
            }
        );
    }

    // (Portal_003)获取首页案例信息
    function getList() {
        $.request('/api/Case/GetList', {
                timestamp: ts(),
                sign: createSign({
                    timestamp: ts()
                })
            },
            function (res) {
                var str = '';
                res.data.forEach((ele, k) => {
                    // console.log(k)
                    str += '<div class="swiper-slide"><a href="./page/detail.html?caseId=' + ele.id + '">'
                    if (ele.multimediaType == 1) {
                        str += '<img src="' + ele.url + '"/>'
                    } else if (ele.multimediaType == 2) {
                        str += '<video muted loop autoplay="autoplay" id="video' + k + '" src="' + ele.url + '"></video>'
                    }
                    str += '<div class="caseCont">' +
                        '<div class="case_float">' +
                        '<div class="case_txt">' +
                        // '<p class="fontSize32 ani_33">' + ele.serviceUser + '</p>' +
                        '<p class="fontSize32 ani_34">' + ele.name + '</p>' +
                        ' </div>' +
                        '</div>' +
                        '<div class="case_float">' +
                        '<div class="case_txt">' +
                        '<p class="fontSize18 ani_35">' + ele.content + '</p>' +
                        '<a href="./page/case.html" class="arrow_icon arrow_About ">' +
                        '<img class="" src="./images/arrow_icon.png" alt="">' +
                        '</a>' +
                        '</div>' +
                        '</div>';
                    if (ele.multimediaType == 2) {
                        // str += '<div class="play" onclick="playVideo(this,' + k + ')">' +
                        //     '<img src="./images/play.png" alt="">' +
                        //     '</div>'
                    }
                    str += '</div>' +
                        '</a></div>';

                });
                $('.caseSwiper .swiper-wrapper').append(str);
                var swiper4 = new Swiper('.caseSwiper,swiper-container', {
                    loop: true,
                    observer: true, //修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true, //修改swiper的父元素时，自动初始化swiper
                    navigation: {
                        nextEl: '.case_next',
                        prevEl: '.case_prev',
                    },
                    pagination: {
                        el: '.case_pagination',
                        type: 'fraction'
                    },
                    on: {
                        slideChangeTransitionStart: function () {
                            aniReset();
                            aniTranslateY(['.ani_33'], ['1rem', '0', ], 1000, 500);
                            aniTranslateY(['.ani_34'], ['1rem', '0', ], 1000, 1000);
                            aniTranslateY(['.ani_35'], ['1rem', '0', ], 1000, 1500);
                        },
                        slideNextTransitionStart: function () {
                            $('.case_prev').css("cssText", "background:url(./images/turn_left_def.png) no-repeat center !important;background-size:cover !important;");
                            $('.case_next').css("cssText", "background:url(./images/turn_right_act.png) no-repeat center !important;background-size:cover !important;");

                        },
                        slidePrevTransitionStart: function () {
                            $('.case_prev').css("cssText", "background:url(./images/turn_left_act.png) no-repeat center !important;background-size:cover !important;");
                            $('.case_next').css("cssText", "background:url(./images/turn_right_def.png) no-repeat center !important;background-size:cover !important;");
                        }
                    }
                });
                // loading(2, function () {
                //     GetJobInfo();
                // });
                loading();
            }
        );
    }
    // (Portal_003)获取案例分页列表
    // $.request('/api/Case/GetPagingList', {
    //         pageIndex: 1,
    //         pageSize: 10,
    //         timestamp: ts(),
    //         sign: createSign({
    //             "pageIndex": 1,
    //             "pageSize": 10,
    //             timestamp: ts()
    //         })
    //     },
    //     function (res) {
    //         console.log(res);
    //     }
    // );
    $('.download').attr('href', host + '/api/File/Download?type=1&sourceId=1&timestamp=' + ts())
    //文件下载
    // $.request('/api/File/Download', {
    //         type: 1,
    //         sourceId: 1,
    //         timestamp: ts(),
    //         sign: createSign({
    //             type: 1,
    //             sourceId: 1,
    //             timestamp: ts(),
    //         })
    //     },
    //     function (res) {
    //         console.log(res);

    //     }
    // );
    // 验证码生成
    $('.verifyCodeImg img').on('click', function () {
        $(this).attr('src', host + '/api/VerifyCode/CreateCode?' + ts());
    });
    // //登录
    // $('#login').on('click', function () {
    //     var username = $('.page1 .username').val();
    //     var password = $('.page1 .password').val();
    //     var verifyCode = $('.page1 .verifyCode').val();
    //     $.request('/api/User/Login', {
    //             userName: username,
    //             password: password,
    //             verifyCode: verifyCode,
    //             timestamp: ts(),
    //             sign: createSign({
    //                 userName: username,
    //                 password: password,
    //                 verifyCode: verifyCode,
    //                 timestamp: ts(),
    //             })
    //         },
    //         function (res) {
    //             console.log(res);
    //         }
    //     );
    // });
    //发送手机验证码
    // $('.mobileCodeBtn').on('click', function () {
    //     var mobile = $('.page3 .mobile').val();
    //     $.request('/api/Mobile/sendMessage', {
    //             mobile: mobile,
    //             timestamp: ts(),
    //             sign: createSign({
    //                 mobile: mobile,
    //                 timestamp: ts(),
    //             })
    //         },
    //         function (res) {
    //             console.log(res);
    //         }
    //     );
    // });
    // //注册
    // $('#regist').on('click', function () {
    //     var username = $('.page2 .username').val();
    //     var password = $('.page2 .password').val();
    //     var mobile = $('.page2 .mobile').val();
    //     var mobileCode = $('.page2 .mobileCode').val();
    //     $.request('/api/User/Register', {
    //             userName: username,
    //             password: password,
    //             mobile: mobile,
    //             mobileCode: mobileCode,
    //             timestamp: ts(),
    //             sign: createSign({
    //                 userName: username,
    //                 password: password,
    //                 mobile: mobile,
    //                 mobileCode: mobileCode,
    //                 timestamp: ts(),
    //             })
    //         },
    //         function (res) {
    //             console.log(res);
    //             localStorage.setItem('userToken', res.data.userToken);
    //         }
    //     );
    // });
    // //验证用户名
    // $('.username').on('blur', function () {
    //     var username = $('.page2 .username').val();
    //     $.request('/api/User/UserNameIsExists', {
    //             userName: username,
    //             timestamp: ts(),
    //             sign: createSign({
    //                 userName: username,
    //                 timestamp: ts(),
    //             })
    //         },
    //         function (res) {
    //             console.log(res);
    //         }
    //     );
    // });
    // //验证手机号
    // $('.mobile').on('blur', function () {
    //     var mobile = $('.page2 .mobile').val();
    //     $.request('/api/User/MobileIsExists', {
    //             mobile: mobile,
    //             timestamp: ts(),
    //             sign: createSign({
    //                 mobile: mobile,
    //                 timestamp: ts(),
    //             })
    //         },
    //         function (res) {
    //             console.log(res);
    //         }
    //     );
    // });
    //找回密码
    // $('.forgetPwd').on('click', function() {
    //     // var username = $('.page3 .username').val();
    //     var password = $('.page3 .password').val();
    //     var mobile = $('.page3 .mobile').val();
    //     var mobileCode = $('.page3 .mobileCode').val();
    //     $.request('/api/User/ForgetPwd', {
    //             password: password,
    //             mobile: mobile,
    //             mobileCode: mobileCode,
    //             timestamp: ts(),
    //             sign: createSign({
    //                 password: password,
    //                 mobile: mobile,
    //                 mobileCode: mobileCode,
    //                 timestamp: ts(),
    //             })
    //         },
    //         function(res) {
    //             console.log(res);
    //             // localStorage.setItem('userToken', res.data.userToken);
    //         }
    //     );
    // });
    // //修改密码
    // $('.modifyPwd').on('click', function() {
    //         var username = $('.page4 .username').val();
    //         var password = $('.page4 .password').val();
    //         var confirmPassword = $('.page4 .confirmPassword').val();
    //         $.request('/api/User/ModifyPassword', {
    //                 userName: username,
    //                 password: password,
    //                 confirmPassword: confirmPassword,
    //                 timestamp: ts(),
    //                 sign: createSign({
    //                     userName: username,
    //                     password: password,
    //                     confirmPassword: confirmPassword,
    //                     timestamp: ts(),
    //                 })
    //             },
    //             function(res) {
    //                 console.log(res);
    //             }
    //         );
    //     })
    // (Portal_007)获取招聘信息
    function GetJobInfo() {
        $.request('/api/Job/GetJobInfo', {
                "timestamp": ts(),
                sign: createSign({
                    "timestamp": ts(),
                })
            },
            function (res) {
                var str = '';
                res.data.hotJob.forEach((ele, k) => {
                    str += '<li>' +
                        '<a class="ani_' + (k + 61) + '" href="' + ele.jobUrl + '">' + ele.jobTitle + '</a>' +
                        '</li>';
                });
                $('.hotJob').append(str);
                var str2 = '';
                res.data.longTimeJob.forEach((ele, k) => {
                    str2 += '<li>' +
                        '<a class="ani_' + (k + 61 + res.data.hotJob.length) + '" href="' + ele.jobUrl + '">' + ele.jobTitle + '</a>' +
                        '</li>';
                });
                $('.longTimeJob').append(str2);
                $('.recruit .arrow_icon').attr('href', res.data.moreUrl);
                // loading(3, function () {
                //     GetRecommendNews();
                // });
                loading();
            }
        );
    }


    // //(Portal_011)获取首页网盘信息
    // $.request('/api/NetDisc/GetHomeNetDiscInfo', {
    //         timestamp: ts(),
    //         sign: createSign({
    //             timestamp: ts(),
    //         })
    //     },
    //     function (res) {
    //         console.log(res);
    //     }
    // );
    // //(Portal_005)获取新闻推荐
    function GetRecommendNews() {
        $.request('/api/News/GetRecommendNews', {
                timestamp: ts(),
                sign: createSign({
                    timestamp: ts(),
                })
            },
            function (res) {
                var str = '';
                res.data.forEach((ele, k) => {
                    str += '<div class="swiper-slide"><a href="./page/detail.html?newsId=' + ele.id + '">' +
                        '<div class="news_pic"><img src="' + ele.picUrl + '" alt="">' +
                        '<div class="news_mask"></div>' +
                        '</div>' +
                        '<p class="fontSize26 new_txt fofa-blod ani_36">' + ele.title + '</p>' +
                        '<p class="fontSize18 new_txt fofa-light ani_37" style="display: none">' + ele.summary + '</p>' +
                        '</a></div>';
                });
                $('.newsSwiper .swiper-wrapper').html(str);
                var swiper5 = new Swiper('.newsSwiper,swiper-container', {
                    loop: true,
                    observer: true, //修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true, //修改swiper的父元素时，自动初始化swiper
                    navigation: {
                        nextEl: '.news_next',
                        prevEl: '.news_prev',
                    },
                    pagination: {
                        el: '.news_pagination',
                        type: 'fraction'
                    },
                    slidesPerView: 3,
                    spaceBetween: 50,
                    on: {
                        slideChangeTransitionStart: function () {
                            aniReset();
                            aniTranslateY(['.ani_36'], ['1rem', '0', ], 1000, 500);
                            aniTranslateY(['.ani_37'], ['1rem', '0', ], 1000, 1000);
                        },
                        slideNextTransitionStart: function () {
                            $('.news_prev').css("cssText", "background:url(./images/turn_left_def.png) no-repeat center !important;background-size:cover !important;");
                            $('.news_next').css("cssText", "background:url(./images/turn_right_act.png) no-repeat center !important;background-size:cover !important;");

                        },
                        slidePrevTransitionStart: function () {
                            $('.news_prev').css("cssText", "background:url(./images/turn_left_act.png) no-repeat center !important;background-size:cover !important;");
                            $('.news_next').css("cssText", "background:url(./images/turn_right_def.png) no-repeat center !important;background-size:cover !important;");
                        }
                    }
                });
                // loading(4, function () {
                //     GetHomeRecommendInfo();
                // });
                loading();
            }
        );
    }
    // (Portal_008)获取首页营销智库列表
    function GetHomeRecommendInfo() {
        $.request('/api/Forum/GetHomeRecommendInfo', {
                timestamp: ts(),
                sign: createSign({
                    timestamp: ts(),
                })
            },
            function (res) {
                var ttStr = '';
                res.data.forEach(function (ele, k) {
                    ttStr += '<div class="swiper-slide" id="' + ele.id + '">' +
                        '<img src="' + ele.picUrl + '" alt="">' +
                        '<p class="fontSize14 tt_margin_1 ani_73">发布者：' + ele.createUserName + '</p>' +
                        '<p class="fontSize20 tt_margin_2 ani_74">' + ele.title + '</p>' +
                        '<p class="icons fontSize12 ani_75">' +
                        '<span class="">' +
                        '<img src="./images/xinxi-icon.png" alt="">' + ele.commentCount + '</span>' +
                        '<span>' +
                        '<img src="./images/look-icon.png" alt="">' + ele.visitCount + '</span>' +
                        '<span>' +
                        '<img src="./images/heart-icon.png" alt="">' + ele.likeCount + '</span>' +
                        '</p>' +
                        '</div>'
                });
                $('.ttSwiper .swiper-wrapper').append(ttStr);
                var swiper6 = new Swiper('.ttSwiper,swiper-container', {
                    loop: true,
                    observer: true, //修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true, //修改swiper的父元素时，自动初始化swiper
                    navigation: {
                        nextEl: '.tt_next',
                        prevEl: '.tt_prev',
                    },
                    pagination: {
                        el: '.tt_pagination',
                        type: 'fraction'
                    },
                    slidesPerView: 3,
                    spaceBetween: 20,
                });
                loading();
                // loading(5, function () {
                //     GetHomeNetDiscInfo();
                // });
            }
        );
    }
    // (Portal_011)获取首页网盘信息
    function GetHomeNetDiscInfo() {
        $.request('/api/NetDisc/GetHomeNetDiscInfo', {
                timestamp: ts(),
                sign: createSign({
                    timestamp: ts(),
                })
            },
            function (res) {
                var wpStr = '';
                res.data.forEach((ele, k) => {
                    wpStr += '<li>' +
                        '<a href="' + ele.url + '" id="' + ele.id + '" download="download">' +
                        '<span class="fontSize14">' + ele.name + '</span>' +
                        '<span class="fontSize14">' + ele.fileSize + '</span>' +
                        '<span class="fontSize14">下载</span>' +
                        '<img src="./images/dl-black.png" alt="">' +
                        '</a>' +
                        '</li>';
                })
                $('.wangpan ul').append(wpStr);
                //网盘鼠标滑过事件
                $('.wangpan ul li').hover(function () {
                    $(this).find('a').css('color', '#e90010');
                    $(this).find('img').attr('src', './images/dl-red.png');
                }, function () {
                    $(this).find('a').css('color', '#333');
                    $(this).find('img').attr('src', './images/dl-black.png');
                });
                 loading();
            }
        );
    }
    function init() {
        firstApi();
        getList();
        GetJobInfo();
        GetRecommendNews();
        GetHomeRecommendInfo();
        GetHomeNetDiscInfo();
    }
    init();

});


function loading() {
    currentWidth ++;
}

var totalWidth = 6;
var currentWidth = 0;
var progress = 0;
var step = 5;
var timer = setInterval(function () {
    var tmp = progress + step;
    if (tmp == 100) {
        $('.loadProColor').width('100%');
        clearInterval(timer);
        setTimeout(() => {
            $('.progress').hide();
            $('.loadState').show();
            aniTranslateY(['.ani_1'], ['1rem', '0', ], 1000, 500);
            aniTranslateY(['.ani_2'], ['1rem', '0', ], 1000, 1000);
        }, 500);
    }else if (tmp < (parseInt(currentWidth/totalWidth)*100) && tmp<100) {
        progress = tmp;
        var width = parseInt(progress*currentWidth/totalWidth);
        // if (width<100) {
            console.log(width);
            $('.loadProColor').width(width + '%');
        // }
    }else {
        console.log('waiting');
    }
}, 30);
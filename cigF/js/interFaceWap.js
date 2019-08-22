$(function () {
    console.log("interFaceWap");
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
                str +='<p class="arrow"><img src="images/arrow_icon.png"></p>';
                str += '</div>';

            });
            $('.caseSwiper .swiper-wrapper').append(str);
        }
    );

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
                str+='<p class="t">'+ele.title+'</p>';
                str+='<p class="content">'+ele.summary+'</p>';
                str+='</div>';

            });
            $('.news-swiper .swiper-wrapper').html(str);
        }
    );

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




$(function () {
    var url = window.location.href;
    console.log(url);
    var sp=url.split("?")[1];
    if(sp.indexOf('caseId')>-1){
        GetUrlParam('caseId');
        $(".case-news-url").attr("href","./../pagewap/case.html").html("案例");
        loadDetails("caseId","Case/CaseInfo?caseId="+GetUrlParam('caseId'));

    }else if(sp.indexOf('newsId')>-1){
        GetUrlParam('newsId');
        $(".case-news-url").attr("href","./../pagewap/information.html").html("新闻");
        loadDetails("newsId","News/NewsDetail?newsId="+GetUrlParam('newsId'));

    }

    function GetUrlParam(paraName) {
        var url = document.location.toString();
        var arrObj = url.split("?");
        if (arrObj.length > 1) {
            var arrPara = arrObj[1].split("&");
            var arr;
            for (var i = 0; i < arrPara.length; i++) {
                arr = arrPara[i].split("=");

                if (arr != null && arr[0] == paraName) {
                    return arr[1];
                }
            }
            return "";
        }
        else {
            return "";
        }
    }


    function  loadDetails(type,url) {
        $.requestGet('/api/'+url, function (res) {
                   var data=res.data;
                   if(type=="caseId"){
                       $(".banner2 .p1").html(data.name);
                       $(".banner2 .d1").find('p .time').html(data.createTime.split(" ")[0]);
                       $(".banner2 .d1").find('p .author').html(data.serviceUser);
                       $(".banner3 .t").html(data.content);
                       if(data.multimediaType==1){
                           $(".images").show();
                           $("#images").attr("src",data.url);
                       }else{
                           $(".video").show();
                           $("#video").attr("src",data.url);
                       }
                   }else if(type=="newsId"){
                       $(".banner2 .p1").html(data.title);
                       $(".banner2 .d1").find('p .time').html(data.createTime.split(" ")[0]);
                       $(".banner2 .d1").find('p .author').html(data.createUserName);
                       $(".banner3 .t").html(data.content);
                       if(data.multimediaType==1){
                           $(".images").show();
                           $("#images").attr("src",data.picUrl);
                       }else{
                           $(".video").show();
                           $("#video").attr("src",data.picUrl);
                       }
                   }

            }
        );
    }

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
});
$(function () {
       //首页接口
       ///api/Forum/GetForumInfo(Thinktank_019~Thinktank_022)获取智库首页内容

    function GetForumInfo() {
        $.request('/api/Forum/GetForumInfo', {
                "timestamp": ts(),
                userToken:localStorage.getItem("ttToken")||'',
                sign: createSign({
                    "timestamp": ts(),
                    userToken:localStorage.getItem("ttToken")||'',
                })
            },
            function (res) {
                //文章
                var str = '';
                res.data.articleList.forEach((ele, k) => {
                    str +='<div class="swiper-slide box">';
                   var url= '';
                       NetPing(ele.picUrl,function (res) {
                         if(!res){
                             url='./images/404.png'
                         }else{
                             url=ele.picUrl;
                         }
                    })
                    str +='<a href="./details.html?id='+ele.id+'"><img style="width: 100%" src="'+url+'"></a>';
                    str +='<div class="content">';
                    str +='<p class="time">'+ele.createTime+'</p>';
                    str +='<p class="title">'+ele.title+'</p>';
                    str +='<p class="desc">'+ele.summary+'</p>';
                    str +='</div>';
                    str +='<p class="bottom">';
                    str +='<span class="item"><img src="./images/message-icon.png"><span >'+ele.commentCount+'</span></span>';
                    str +='<span class="item"><img src="./images/view-icon.png"><span>'+ele.visitCount+'</span></span>';
                    str +='<span class="item"><img forumId="'+ele.id+'" class="vote-icon-img" src="'+(ele.IsLike?"./images/vote-icon-red.png":"./images/vote-icon.png")+'"><span>'+ele.likeCount+'</span></span>';
                    str +='</p>';
                    str +='</div>';
                });
                $('.index-banner3 .swiper-wrapper').append(str);


                //知识
                var str2 = '';

                //热门活动
                var str3='';
                res.data.hotList.forEach((ele, k) => {
                    str3+='<div class="list click-list">';
                    str3+='<div class="top">';
                    var url= '';
                    NetPing(ele.picUrl,function (res) {
                        if(!res){
                            url='./images/404.png'
                        }else{
                            url=ele.picUrl;
                        }
                    })
                    str3+='<img class="click-img" forumId="'+ele.id+'"  style="width: 100%;cursor: pointer" style="width: 100%" src="'+url+'">';
                    str3+='<img class="icon" style="width: 30%" src="images/end-icon.png">';
                    str3+='<p class="time">'+ele.createTime+'</p>';
                    str3+='</div>';
                    str3+='<p class="_title">'+ele.title+'</p>';
                    str3+='<p class="text">'+ele.summary+'</p>';
                    str3+='</div>';
                });
                $('.hotactivity').append(str3);

                //热门推荐
                var str4='';
                var recommendList=res.data.recommendList;
                for(var i=0;i<recommendList.length;i++){
                     if(i==0){
                         str4+='<div class="first click-list">';
                         var url= '';
                         NetPing(recommendList[i].picUrl,function (res) {
                             if(!res){
                                 url='./images/404.png'
                             }else{
                                 url=recommendList[i].picUrl;
                             }
                         })

                         str4+=' <img class="click-img"  forumId="'+recommendList[i].id+'" src="'+url+'" style="width: 100%;display: block;cursor: pointer">';
                         str4+=' <img class="click-img rectangle"  forumId="'+recommendList[i].id+'" src="images/rectangle-icon.png" style="cursor: pointer">';
                         str4+=' <img class="hot-recommend" src="images/hot-recommend-icon.png">';
                         str4+=' <div class="text">';
                         str4+='  <div class="time">'+recommendList[i].createTime+'</div>';
                         str4+='  <div class="right">';
                         str4+='  <p>'+recommendList[i].title+'</p>';
                         str4+='  <p>'+recommendList[i].summary+'</p>';
                         str4+=' <p style="cursor: pointer" class="bottom">';
                         str4+='  <span class="item"><img src="./images/message-icon.png"><span >'+recommendList[i].commentCount+'</span></span>';
                         str4+=' <span class="item"><img src="./images/view-icon.png"><span>'+recommendList[i].visitCount+'</span></span>';
                         str4+=' <span class="item"><img forumId="'+recommendList[i].id+'"  class="vote-icon-img" src="'+(recommendList[i].IsLike?"./images/vote-icon-red.png":"./images/vote-icon.png")+'"><span>'+recommendList[i].likeCount+'</span></span>';
                         str4+=' </p>';
                         str4+=' </div>';
                         str4+='</div>';
                         str4+=' </div>';

                     }else{
                         str4+=' <div  class="box click-list">';
                         NetPing(recommendList[i].picUrl,function (res) {
                             if(!res){
                                 url='./images/404.png'
                             }else{
                                 url=recommendList[i].picUrl;
                             }
                         })
                         str4+='  <img class="click-img" style="width: 100%;cursor: pointer"  forumId="'+recommendList[i].id+'" src="'+url+'">';
                         str4+='   <div class="content">';
                         str4+='   <p class="time">'+recommendList[i].createTime+'</p>';
                         str4+='    <p class="title">'+recommendList[i].title+'</p>';
                         str4+='  <p class="desc">'+recommendList[i].summary+'</p>';
                         str4+='  <p class="bottom">';
                         str4+='    <span class="item"><img src="./images/message-icon.png"><span >'+recommendList[i].commentCount+'</span></span>';
                         str4+=' <span class="item"><img src="./images/view-icon.png"><span>'+recommendList[i].visitCount+'</span></span>';
                         str4+='  <span class="item"><img forumId="'+recommendList[i].id+'"  class="vote-icon-img" src="'+(recommendList[i].IsLike?"./images/vote-icon-red.png":"./images/vote-icon.png")+'"><span>'+recommendList[i].likeCount+'</span></span>';
                         str4+='  </p>';
                         str4+='   </div>';
                         str4+='  </div>';
                     }
                }
                $('.activity-list').append(str4);
            }
        );
    }
    GetForumInfo();
});


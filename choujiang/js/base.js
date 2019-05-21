$(function () {
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
        handleFontSize();
    } else {
        if (document.addEventListener) {
            document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
        } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", handleFontSize);
            document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
        }
    }

    function handleFontSize() {
        /*设置网页字体为默认大小*/
        WeixinJSBridge.invoke('setFontSizeCallback', {
            'fontSize': 0
        });
        /*重写设置网页字体大小的事件*/
        WeixinJSBridge.on('menu:setfont', function () {
            WeixinJSBridge.invoke('setFontSizeCallback', {
                'fontSize': 0
            });
        });
    }
    // -------------- 计算body高度，保障软键盘消失后回弹---------------------
    var Height = $('body').height();
    $(window).resize(function () {
        $('body').height(Height);
    });

    $("input").blur(function () {
        $(window).scrollTop(0, 0);
    });
    $("textarea").blur(function () {
        $(window).scrollTop(0, 0);
    });
    $("select").blur(function () {
        $(window).scrollTop(0, 0);
    });

    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

//获取抽奖次数
function getPrizeNumber() {
    $.ajax({
        url:'https://easy-mock.com/mock/5ce397e122e23351f21e78cb/h5/getPrizeIndex',
        type: 'get',
        success:function(json){
            var xiabiao=json.data.index;//获取抽奖次数
            $(".children2").html(xiabiao);//将抽奖次数返回给页面
        }
    });
}
    getPrizeNumber();

    var list = $('#zp').children(".jiang"),
        len = list.length,
        index = 0,
        interval = null,running,remain=0;
    var apikey=[];
    var num=0;
    $('#begin').on("click",function () {
        if($(".children2").html()==0){
            alert("您的抽奖次数用完啦！");
        }else{
            $.ajax({
                url:'https://easy-mock.com/mock/5ce397e122e23351f21e78cb/h5/getPrizeIndex',
                type: 'get',
                success:function(json){
                    var xiabiao=json.data.index;//返回对应的下标
                    apikey.push(xiabiao);
                    console.log(xiabiao);
                    console.log(apikey);
                    if(running)return;
                    $(".children2").html($(".children2").html()-1);
                    running = true;
                    if(apikey.length>1){//至少两次抽奖机会
                        if(num>=1){
                            var k=apikey[num-1];//获取上一个下标的值
                            var n=7- k;//最大下标减去上一个下标的值 得到当前这一圈还有多少个才能转完
                            var r=n+apikey[num]+1;//"apikey[num]+1"新的一圈要转的位置 注意下标从0开始,+1;
                            remain= 1920+r*80;
                            num++;
                        }else{
                            remain= 1920+apikey[0]*80;
                            num++;
                        }
                    }else{//说明只有一次抽奖机会
                        remain= 1920+apikey[0]*80;
                        num++;
                    }
                    var t = 80;
                    var interval = setInterval(fn, t);
                    function fn() {
                        if( remain <=0 ){
                            running = false;
                            alert( '你抽中了: '+list[index].getAttribute("text") );
                            clearInterval(interval);
                        }else{
                            list[index].className = "";
                            list[(index+1) % len].className = "current";
                            index = ++index % len;
                            remain -= 80;
                            if (remain<=640) {
                                t=t+20;
                                clearInterval(interval);
                                interval = setInterval(fn, t);
                            }
                        }
                    }
                }
            });
        }
    });

    $("#shareCloseBtn").on("click",function () {
        $(".share").hide();
    })
    $("#shareBtnOk").on("click",function () {
        $(".share").hide();
    })

    function addPoint() {
        var point_top="",point_bottom="",point_right="",point_left="";
            var point_top_bottom_num=parseInt($(".point-top").width()/15.55/2);//每一个点的宽度为15px;得到的结果是最多能放多少个点;然后/2得到每个点的个数
            for(var i=0;i<point_top_bottom_num;i++){
                point_top+="<img class='change-point-top light' src='images/light.png'><img class='change-point-top dark' src='images/dark.png'>";
                point_bottom+="<img class='change-point-bottom dark' src='images/dark.png'><img class='change-point-top light' src='images/light.png'>";
            }
        var point_right_left_num=parseInt($(".point-right").height()/16/2);//每一个点的高度为16px;得到的结果是最多能放多少个点;然后/2得到每个点的个数
        for(var i=0;i<point_right_left_num;i++){
            point_right+="<img class='change-point-right dark' src='images/dark.png'><img class='change-point-right light' src='images/light.png'>";
            point_left+="<img class='change-point-left light' src='images/light.png'><img class='change-point-left dark' src='images/dark.png'>";
        }

        $(".point-top").append(point_top);
        $(".point-bottom").append(point_bottom);
        $(".point-right").append(point_right);
        $(".point-left").append(point_left);

    }
    addPoint();

    function changePoint() {
        $(".change-point-top,.change-point-bottom,.change-point-right,.change-point-left,.change-point-top-left,.change-point-top-right,.change-point-bottom-right,.change-point-bottom-left").each(function () {
            if($(this).hasClass("light")){
                $(this).removeClass("light").addClass("dark").attr("src","images/dark.png");
            }else{
                $(this).removeClass("dark").addClass("light").attr("src","images/light.png");
            }
        });
    }

    //利用setInterval，设置每隔1秒执行changePoint函数。
    window.setInterval(changePoint,1000);


});


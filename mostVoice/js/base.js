$(function () {
    //---------------step_1选择爱好------------------
    var selectIndex = [];
    $('.select_interest li').click(function () {
        var flag = $(this).attr('flag');
        $(this).attr('class', 'selected');
        if (flag == 'true') {
            if (selectIndex.indexOf($(this).attr('num')) != -1) {
                selectIndex.remove($(this).attr('num'))
            }
            $(this).removeClass();
            $(this).attr('flag', 'false');
        } else {
            selectIndex.push($(this).attr('num'));
            $(this).attr('flag', 'true');
            $(this).attr('class', 'selected');
        }
    });
    //下一步
    $(".btn_box").click(function () {
        $('.step_1').css("transform", "translate3d(-130%, 0, 0)");
        $('.step_2').css("transform", "translate3d(0, 0, 0)");
        $('.step_2').show();
    });

    //		点击按钮分享页面显示
    $(".share_btn2").on("click", function () {
        $(".share_flar").show();
    });
    $(".share_flar").on("click", function () {
        $(".share_flar").hide();
    });
    Array.prototype.remove = function (val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };

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

    $("#otherinterestLi").on("click", function () {
        if ($(this).hasClass("selected")) {
            $("#step1Message .ms").show();
        } else {
            $("#step1Message .ms").hide();
        }
    });

    var okbtn = "0";// 是否是最终提交按钮 0校验警告  1最终提交
    //输入框基本校验
    function validateRequired() {
        var name = $("#stepInputname").val();
        var phone = $("#stepInputphone").val();
        if (name == "" || name == null || name == undefined) { // "",null,undefined
            swal({
                title: "输入有误",
                text: '请输入姓名',
                button: "确定",
            });
            return false;
        }
        if (phone == "" || phone == null || phone == undefined) {
            swal({
                title: "输入有误",
                text: '请输入手机号',
                button: "确定",
            });
            return false;
        } else if (!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(phone)) {
            swal({
                title: "输入有误",
                text: '请输入正确的手机号',
                button: "确定",
            });
            return false;
        }
        return true;
    }

    $("#submitStep2btn").on("click", function () {
        $("body").css("z-index", "0");
        $("body").find(".swal-overlay").css("display", "block");
        $("#stepSelectProvice").css("background-color", "transparent");

        if (validateRequired()) {
            checkInformation();
        }
    });

    var likesArrayList = [];
    function checkInformation() {
        likesArrayList.splice(0, likesArrayList.length);//清空数组
        var likes = "";
        $("#likeUl").find('li.selected').each(function () {
            likesArrayList.push($(this).attr("ablility"));
            likes += $(this).attr("text") + " ";
            $("#likesHidden").val(likes);
        });
        var name = $("#stepInputname").val();
        var phone = $("#stepInputphone").val();
        var from = $("#stepSelectProvice option:selected").val();
        var text = "您填写的信息如下：\n\n";

        text += "姓名：" + name + '\n';
        text += "手机：" + phone + '\n';
        text += "来自：" + from + '\n';
        if (likes.indexOf("其他") != -1) {
            likes = likes.replace("其他", "");//去掉”其他“
        }
        text += "兴趣爱好：" + likes;
        if ($("#otherinterestLi").hasClass("selected") && $.trim($("#otherinterestInput").val()) != "") {
            text += " " + $("#otherinterestInput").val();
        }
        swal({
            title: "请确认你的信息",
            text: text,
            dangerMode: true,
            buttons: ["返回修改", "确认提交"],
        })

        okbtn = "1";//是最终提交

    }
    $("body").on("click", '.swal-footer .swal-button--cancel', function () {
        $(".step_1").css("display", "block");
        $('.step_1').css("transform", "translate3d(0, 0, 0)");
        $('.step_2').css("transform", "translate3d(130%, 0, 0)");
        okbtn = "0";//重置

    });
    $("body").on("click", '.swal-footer .swal-button--confirm', function () {
        $("body").find(".swal-overlay").css("display", "none");
        if (okbtn == "1") {
            var name = $("#stepInputname").val();
            var phone = $("#stepInputphone").val();
            var from = $("#stepSelectProvice option:selected").val();
            var ability_other_name = "";
            if ($("#otherinterestLi").hasClass("selected") && $.trim($("#otherinterestInput").val()) != "") {
                ability_other_name = $("#otherinterestInput").val();
            }
            var cond = "name=" + name + "&mobile=" + phone + "&from=" + from
                + "&" + likesArrayList.join("&")
                + "&ability_other_name=" + ability_other_name;
            $.ajax({
                type: "get",
                url: "http://adminqy_blue.h5tt.skyengine.cn/api/register?" + cond,
                dataType: 'jsonp',
                success: function (result) {
                    $(".step_2").css("display", "none");
                    $(".share").css("display", "block");
                },
                error: function (errormsg) {
                }
            });
        }

    });


});

//loading页
window.onload = function () {
    $(function () {
        var allPic = [
            'images/bg.jpg',
            'images/jiantou.png',
            'images/step2btn.png',
            'images/step_2_title.png',
            'images/interest_1.png',
            'images/interest_2.png',
            'images/interest_3.png',
            'images/interest_4.png',
            'images/interest_5.png',
            'images/interest_6.png',
            'images/interest_7.png',
            'images/interest_8.png',
            'images/interest_9.png',
            'images/interest_10.png',
            'images/logo_left.png',
            'images/logo_right.png',
            'images/next_bg.png',
            'images/next_txt.png',
            'images/selected.png',
            'images/share_btn1.png',
            'images/share_btn2.png',
            'images/share_tit.png',
            'images/sign_up.png',
            'images/stare_flar.png'
        ];
        var interval;
        var timesRun = 0;
        var allLoad = new createjs.LoadQueue(false);
        allLoad.loadManifest(allPic);
        allLoad.on("progress", function (e) {
            var percentage = 100//Math.ceil(e.progress * 100);
            if (interval == undefined) {
            } else {
                clearInterval(interval);
            }
            interval = setInterval(function () {
                if (timesRun >= percentage) {
                    clearInterval(interval);
                } else {
                    timesRun += 1;
                    $('.number').html(timesRun)
                    if (timesRun >= 90) {
                        timesRun += 10;
                        $('.number').html(timesRun)
                        clearInterval(interval);
                        if (percentage == 100) {
                            setTimeout(() => {
                                $('.loading').hide();
                                $('.step_1').show();
                                $('.logo').show();
                            }, 600);
                        }
                    }
                }
            }, 1);
        });

    })
}
(function () {
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
})();

function mobileFun() {
    var value = $("#user_mobile").val();
    value = value.replace(/[^\d]/g, "");
    if (value.length > 11) {
        value = value.slice(0, 11);
    }
    $("#user_mobile").val(value);
}

function textContentFun() {
    var value = $("#txtContent").val();
    if (value.length > 60) {
        value = value.slice(0, 60);
    }
    $("#txtContent").val(value);
}

function filteremoji(content) {
    var ranges = [
        '\ud83c[\udf00-\udfff]',
        '\ud83d[\udc00-\ude4f]',
        '\ud83d[\ude80-\udeff]'
    ];
    content = content.replace(new RegExp(ranges.join('|'), 'g'), '');
    return content;
}


var detailLi;
var isTijiao = "1";
$(function () {
    //失去焦点后回退
    $("input").blur(function () {
        $(window).scrollTop(0, 0);
    });
    $("textarea").blur(function () {
        $(window).scrollTop(0, 0);
    });
    $("select").blur(function () {
        $(window).scrollTop(0, 0);
    });

    //开启规则
    $('.wel_btn').on('click', function () {
        addBaidu('奖品规则');
        $('.prize').show();
    })

    //关闭规则
    $('.close_img').on('click', function () {
        $('.prize').hide();
    })

    //进入列表
    $('.start_btn').on('click', function () {
        addBaidu('车主故事');
        editorBack = $(".welcome");
        $('.welcome').hide();
        $('.liebiao').show();
    })

    //进入参与
    $('.liji_btn').on('click', function () {
        addBaidu('立即参与');
        if (isEmpty($.cookie('mobile'))) {
            liebiaoBack = $(".welcome");
            $('.welcome').hide();
            $('.editor').show();
        } else {
            myAlert("您已参与");
        }

    })

    //进入详情
    $('#scrolling').on('click', 'li', function () {
        addBaidu('故事详情');
        var code = $(this).attr("code");
        var job = $(this).find('.job').html();
        var name = $(this).find('.name').html();
        var time = $(this).attr("time");
        var contentTxt = $(this).find('.contentTxt').html();
        var imageUrl = $(this).find('.photo').attr("src");
        $('.detail').find('.job').html(job);
        $('.detail').find('.name').html(name);
        $('.detail').find('.timeShow').html(time + "年购入K3");
        $('.detail').find('.contentTxt').html(contentTxt);
        $('.detail').find('.contentTxt').removeClass("kuoda");
        if (contentTxt.length <= 15) {
            $('.detail').find('.contentTxt').addClass("kuoda");
        }
        $('.detail').find('.pic').attr("src", imageUrl);
        $('.detail').find('.like').attr("code", code);
        if (isEmpty($.cookie('view_' + code))) {
            $.cookie('view_' + code, "1", {expires: 30});
            addView(code);
            $(this).find('.viewNum').html(parseInt($(this).find('.viewNum').html()) + 1);
        }
        if (isEmpty($.cookie('zan_' + code))) {
            $('.like').find('img').attr("src", "image/btn_like.png");
        } else {
            $('.like').find('img').attr("src", "image/btn_like_had.png");
        }
        $('.liebiao').hide();
        $('.detail').show();
        detailLi = $(this);
    })

    //喜欢
    $('.like').on('click', function () {
        var code = $(this).attr("code");
        if (isEmpty($.cookie('zan_' + code))) {
            $.cookie('zan_' + code, "1", {expires: 30});
            addZan(code);
            if (detailLi != undefined) {
                try {
                    detailLi.find('.zanNum').html(parseInt(detailLi.find('.zanNum').html()) + 1);
                } catch (e) {
                }
            }
        }
        $(this).find('img').attr("src", "image/btn_like_had.png");
    })

    //回到列表
    $('.back').on('click', function () {
        $('.detail').hide();
        $('.liebiao').show();
    })

    // //点击上传
    // $('.upload_btn').on('click', function () {
    //     $("#file").click();
    // })

    //重新上传
    $('.resetBtn').on('click', function () {
        pc.clear();
        $('.upload_btn').show();
        $('#file').show();

    })

    //注册提交
    $('.btn_tijiao').on('click', function () {
        zhuce();
    })


    $('.btn_edit_next').on('click', function () {
        txtContent = $("#txtContent").val();
        if (isEmpty(txtContent)) {
            myAlert("内容不能为空");
            return;
        }
        if (txtContent.length > 60) {
            myAlert("字数不能大于60个");
            return;
        }
        txtContent = filteremoji(txtContent);
        $('.upload').show();
        if (uploadBack == undefined || uploadBack == null) {
            var box = document.getElementById("clipArea");
            var height = box.clientHeight;
            var width = box.clientWidth;
            pc = new PhotoClip('#clipArea', {
                size: [width, height],
                outputSize: 800,
                file: '#file',
                ok: '#clipBtn',
                loadStart: function () {
                },
                loadComplete: function () {
                    $('.upload_btn').hide();
                    $('#file').hide();
                },
                done: function (dataURL) {
                    attachBase64 = dataURL;
                    $("#photo").attr("src", dataURL);
                    $('.zhuce').show();
                },
                fail: function (msg) {
                }
            });
        }
        $('.editor').hide();
    })

    //开始编辑
    $('.start_to_edit').on('click', function () {
        addBaidu('编辑故事');
        editorBack = $(".liebiao");
        $('.editor').show();
        $('.liebiao').hide();
    })

    //列表返回
    $("#libiaoBack").on('click', function () {
        $(".liebiao").hide();
        if (liebiaoBack) {
            if (liebiaoBack == 'wrap') {
                $("#wrap").show();
                myslider = new iSlider({
                    wrap: '#wrap',
                    item: '.item'
                });
                var hupeng = document.getElementById("hupeng");
                hupeng.addEventListener("click", hupengFun);
                var fenxiang = document.getElementById("fenxiang");
                fenxiang.addEventListener("click", fenxiangFun);
                var kanbieren = document.getElementById("kanbieren");
                var kanbierenFun = function (e) {
                    addBaidu('看别人的故事');
                    liebiaoBack = "wrap";
                    e.preventDefault();
                    $("#wrap").hide();
                    $('.start_to_edit').hide();
                    $(".liebiao").show();
                    myslider.gandiao();
                    hupeng.removeEventListener("click", hupengFun);
                    fenxiang.removeEventListener("click", fenxiangFun);
                    kanbieren.removeEventListener("click", kanbierenFun);
                }
                kanbieren.addEventListener("click", kanbierenFun);
            } else {
                liebiaoBack.show();
            }
        } else {
            $(".welcome").show();
        }
    })
    //编辑返回
    $("#editorBack").on('click', function () {
        $(".editor").hide();
        if (editorBack) {
            editorBack.show();
        } else {
            $(".welcome").show();
        }
    })
    //编辑返回
    $("#uploadBack").on('click', function () {
        $(".upload").hide();
        $(".editor").show();
    })

    $("#zhuce_shadow").on('click', function () {
        $('.zhuce').hide();
    })

})

var liebiaoBack;
var editorBack;
var uploadBack;


function myAlert(message, cb) {
    $("#message").html(message);
    $('.allShadow').show();
    $(".kuang").show();
    $("#closeKuang").off('click');
    $("#closeKuang").on('click', function () {
        $('.allShadow').hide();
        $(".kuang").hide();
        if (cb) {
            cb();
        }
    });
}


function html2Canvas() {
    try {
        //截图处理
        var copyDom = $(".self");
        $(".self").attr("style", "overflow: auto;");
        var width = copyDom.offsetWidth;
        var height = copyDom.offsetHeight;
        var scale = 2;
        var canvas = document.createElement('canvas');
        canvas.width = width * scale;
        canvas.height = height * scale;
        var content = canvas.getContext("2d");
        content.scale(scale, scale);
        var rect = copyDom.get(0).getBoundingClientRect();
        content.translate(-rect.left, -rect.top);//
        html2canvas(copyDom[0], {
            dpi: window.devicePixelRatio * 2,
            scale: scale,
            canvas: canvas,
            width: width,
            heigth: height,
            backgroundColor: '#fff',
            logging: false
        }).then(function (canvas) {
            var dataUrl = canvas.toDataURL();
            $("#sdimg").attr('src', dataUrl);
            $(".erwei").hide();
            $(".changan").show();
            $(".tip").show();
            $(".self").find('.btns').show();
            addBaidu('提交');
            myAlert("提交成功", function () {
                isTijiao = "1";
                $.cookie('mobile', mobileValue, {expires: 30});
                $('.upload').hide();
                myslider = new iSlider({
                    wrap: '#wrap',
                    item: '.item'
                });
                var hupeng = document.getElementById("hupeng");
                hupeng.addEventListener("click", hupengFun);
                var fenxiang = document.getElementById("fenxiang");
                fenxiang.addEventListener("click", fenxiangFun);
                var kanbieren = document.getElementById("kanbieren");
                var kanbierenFun = function (e) {
                    addBaidu('看别人的故事');
                    liebiaoBack = "wrap";
                    e.preventDefault();
                    $("#wrap").hide();
                    $('.start_to_edit').hide();
                    $(".liebiao").show();
                    myslider.gandiao();
                    hupeng.removeEventListener("click", hupengFun);
                    fenxiang.removeEventListener("click", fenxiangFun);
                    kanbieren.removeEventListener("click", kanbierenFun);
                }
                kanbieren.addEventListener("click", kanbierenFun);
            });
        });
    } catch (e) {
        console.log('截图异常');
    }
}

var hupengFun = function (e) {
    e.preventDefault();
    $(".fenxiang").show();
    addBaidu('呼唤朋友');
}

var fenxiangFun = function (e) {
    e.preventDefault();
    $(".fenxiang").hide();
}


function sumitImageFile(base64Codes, cb) {
    var formData = new FormData();   //这里连带form里的其他参数也一起提交了,如果不需要提交其他参数可以直接FormData无参数的构造函数
    //convertBase64UrlToBlob函数是将base64编码转换为Blob
    formData.append("file", convertBase64UrlToBlob(base64Codes), new Date().getTime() + ".jpeg");  //append函数的第一个参数是后台获取数据的参数名,和html标签的input的name属性功能相同
    //ajax 提交form
    $.ajax({
        url: "/k3api/upload",
        type: "POST",
        data: formData,
        dataType: "json",
        processData: false,         // 告诉jQuery不要去处理发送的数据
        contentType: false,        // 告诉jQuery不要去设置Content-Type请求头
        success: function (res) {
            cb(res.data);
        },
        xhr: function () {            //在jquery函数中直接使用ajax的XMLHttpRequest对象
            var xhr = new XMLHttpRequest();
            xhr.upload.addEventListener("progress", function (evt) {
                // if (evt.lengthComputable) {
                //     var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                //     console.log("正在提交." + percentComplete.toString() + '%');        //在控制台打印上传进度
                // }
            }, false);
            return xhr;
        }

    });
}

/**
 * 将以base64的图片url数据转换为Blob
 * @param urlData
 *            用url方式表示的base64图片数据
 */
function convertBase64UrlToBlob(urlData) {

    var bytes = window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte

    //处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], {type: 'image/jpeg'});
}

function zhuce() {
    var name = $("#user_name").val();
    if (isEmpty(name)) {
        myAlert("名字不能为空");
        return;
    }
    $('.self').find('.name').html(name);
    var sex = $("input[name='sex']:checked").val();
    if (isEmpty(sex)) {
        myAlert("性别不能为空");
        return;

    }
    var job = $("#user_job").val();
    if (isEmpty(job)) {
        myAlert("职业不能为空");
        return;
    }
    $('.self').find('.job').html(job);
    var mobile = $("#user_mobile").val();
    if (isEmpty(mobile)) {
        myAlert("手机号不能为空");
        return;
    }
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(mobile)) {
        myAlert("请输入正确的手机号");
        return;
    }
    var time = $("#user_time").val();
    if (isEmpty(time)) {
        myAlert("请选择购车时间");
        return;
    }
    if (isTijiao == "1") {
        isTijiao = "2";
    } else {
        return;
    }

    $('.self').find('.show_time').html(time + "年购入K3");
    $('.self').find('.content_text').html(txtContent);
    $('.self').find('.content_text').removeClass("kuoda");
    if (txtContent.length <= 15) {
        $('.self').find('.content_text').addClass("kuoda");
    }
    mobileValue = mobile;
    setTimeout(function () {
        sumitImageFile(attachBase64, function (url) {
            var cond = {
                name: name,
                sex: sex,
                mobile: mobile,
                job: job,
                content: txtContent,
                buyTime: time,
                attach: url,
            };
            $.ajax({
                type: "POST",
                url: "/k3api/save" + "?timestamp=" + new Date().getTime(),
                dataType: "json",
                async: true,
                cache: false,
                data: cond,
                success: function (result) {
                    if (result.code == 10000 && !isEmpty(result.message)) {
                        $("#sdimg").attr('src', "/image/" + result.message);
                    }
                },
                error: function (data, status, e)//服务器响应失败处理函数
                {
                }
            })
        })
    }, 0);
    html2Canvas();
}

function isEmpty(val) {
    if (val == undefined || val == null || val == '') {
        return true;
    }
    return false;
}


function getList(page, cb) {
    if (isEmpty(page)) {
        page = 1;
    }
    var cond = {page: page};
    if (isEmpty($.cookie('mobile'))) {
    } else {
        cond.mobile = $.cookie('mobile');
    }
    $.ajax({
        type: "POST",
        url: "/k3api/list" + "?timestamp=" + new Date().getTime(),
        dataType: "json",
        async: true,
        cache: false,
        data: cond,
        success: function (result) {
            if (result.code == 10000) {
                cb(result);
            }
        },
        error: function (data, status, e)//服务器响应失败处理函数
        {
        }
    })
}

function refresh() {
    plit = "item-1";
    getList(1, function (res) {
        $("#scrolling").find(".every_line").remove();
        $.each(res.data.list, function (index, obj) {
            var $node = $("#" + plit).clone();
            $node.addClass("every_line");
            $node.attr("code", obj.code);
            var time = new Date(obj.buyTime);
            var y = time.getFullYear();
            $node.attr("time", y);
            $node.removeAttr("style");
            $node.find('.job').html(obj.job);
            $node.find('.name').html(obj.name);
            $node.find('.contentTxt').html(obj.content);
            $node.find('.viewNum').html(obj.viewNum);
            $node.find('.zanNum').html(obj.zanNum);
            $node.find('.photo').attr("src", "/image/" + obj.attach);
            $("#scrolling").append($node);
            if (plit == 'item-1') {
                plit = "item-2";
            } else {
                plit = "item-1";
            }
        });
    })
}

var curPage = 2;
var start = true;

function addFresh() {
    if (start) {
        start = false;
    } else {
        return;
    }
    getList(curPage, function (res) {
        var you = false;
        $.each(res.data.list, function (index, obj) {
            var $node = $("#" + plit).clone();
            $node.addClass("every_line");
            $node.attr("code", obj.code);
            var time = new Date(obj.buyTime);
            var y = time.getFullYear();
            $node.attr("time", y);
            $node.removeAttr("style");
            $node.find('.job').html(obj.job);
            $node.find('.name').html(obj.name);
            $node.find('.contentTxt').html(obj.content);
            $node.find('.viewNum').html(obj.viewNum);
            $node.find('.zanNum').html(obj.zanNum);
            $node.find('.photo').attr("src", "/image/" + obj.attach);
            $("#scrolling").append($node);
            if (plit == 'item-1') {
                plit = "item-2";
            } else {
                plit = "item-1";
            }
            you = true;
        });
        if (you) {
            curPage++;
        }
        start = true;
    })
}


function addZan(code) {
    if (isEmpty(code)) {
        return;
    }
    var cond = {key: code};
    $.ajax({
        type: "POST",
        url: "/k3api/addZan" + "?timestamp=" + new Date().getTime(),
        dataType: "json",
        async: true,
        cache: false,
        data: cond,
        success: function (result) {

        },
        error: function (data, status, e)//服务器响应失败处理函数
        {
        }
    })
}

function addView(code) {
    if (isEmpty(code)) {
        return;
    }
    var cond = {key: code};
    $.ajax({
        type: "POST",
        url: "/k3api/addView" + "?timestamp=" + new Date().getTime(),
        dataType: "json",
        async: true,
        cache: false,
        data: cond,
        success: function (result) {

        },
        error: function (data, status, e)//服务器响应失败处理函数
        {
        }
    })
}



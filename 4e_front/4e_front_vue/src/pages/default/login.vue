<template>
<div class="index_body">
    <div class="indexlogin">
    <div class="head-box">
        <div class="head-tit">
            <div class="head-left"><img src="@/assets/default/img/LOGO_left.png" width="175" height="30" /></div>
            <div class="head-right"><img src="@/assets/default/img/LOGO_right.png" width="55" height="57" /></div>
        </div>
    </div>
    <div class="login_content">
        <div class="picScroll-left">
            <div class="hd">
                <ul></ul>
            </div>
            <div class="bd">
                <ul class="picList">
                    <li>
                        <div class="pics">
                            <a href="javascript:;">
                            <img src="http://file.fawvw.dma.cig.com.cn/up72/upload/20181122093350040/图片6.jpg?AccessKeyId=OBIJ4EHOIGOBWXZVNLWA&Expires=1543455243000&Signature=B/NYvywVbrnYWHBfO30qb9DOvIA=" /></a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="indexbox">
            <form action="" method="post" class="form-1 pr w506">
                <input type="hidden" value="post" name="_method">
                <p class="field pr fn-22"><img src="@/assets/default/img/login_title.png" /></p>
                <p class="field pr">
                   <i class="iconfont f26 cur_po pa">&#xe632;</i>
                   <input type="text" placeholder="请输入用户名" maxlength="20" tabindex="1" class="border_radius ff-yahei f18 {required:true,messages:{required:'用户名不能为空！'}}" id="userName" name="userName">
                </p>
                <p class="field pr">
                   <i class="iconfont f26 cur_po pa">&#xe736;</i>
                   <input type="password" autocomplete="off" name="password" maxlength="20" id="password" class="ff-yahei f18 {required:true,messages:{required:'密码不能为空！'}}" tabindex="2" placeholder="请输入密码">
                </p>
                <p class="field_tip" id="msg"></p>
                <div class="field field_btns">
                   <input type="button" class="input_button ff-yahei f20 pointer" value="用户登录" tabindex="4" name="button" id="login-button" @click='login'>
                   <a class="fr" href="/jsp/pc/login/do.jsp?method=forgetPwd">忘记密码？</a>
                </div>
            </form>
       </div>
    </div>
    <div class="loginfoot"> © 一汽-大众汽车有限公司 版权所有</div>
    </div>
</div>
</template>

<script>
import global_css from '@/assets/default/css/global.css'
import style_css from '@/assets/default/css/style_login.css'
import skin_give_css from '@/assets/default/css/skin_give.css'
import top_css from '@/assets/default/css/top.css'
import iconfont_css from '@/assets/default/css/iconfont.css'
import login_css from '@/assets/default/css/login.css'
import common_js from '@/assets/default/js/common.js'

let base = localStorage.getItem("base")
export default {
    data: function() {
        return {
            base: base
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            // 解决session超时的时候会出现双层登录窗口的问题
            if(window.self != window.top) window.top.location.href = window.self.location.href; 

            if(!this.isSupportPlaceholder()) {
                // 遍历所有input对象, 除了密码框
                $('input').not("input[type='password']").each(
                    function() {
                        var self = $(this);
                        var val = self.attr("placeholder");
                        input(self, val);
                    }
                );

                $('input[type="password"]').each(
                    function() {
                        var pwdField    = $(this);
                        var pwdVal      = pwdField.attr('placeholder');
                        var pwdId       = pwdField.attr('id');
                        // 重命名该input的id为原id后跟1
                        pwdField.after('<input id="' + pwdId +'1" type="text" value='+pwdVal+' autocomplete="off" />');
                        var pwdPlaceholder = $('#' + pwdId + '1');
                        pwdPlaceholder.show();
                        pwdField.hide();

                        pwdPlaceholder.focus(function(){
                            pwdPlaceholder.hide();
                            pwdField.show();
                            pwdField.focus();
                        });

                        pwdField.blur(function(){
                            if(pwdField.val() == '') {
                                pwdPlaceholder.show();
                                pwdField.hide();
                            }
                        });
                    }
                );
            }

            $(document).keydown(function (event) {
                if (event.keyCode == 13) { //绑定回车
                    $('#login-button').click(); //自动/触发登录按钮
                }
            });
        },
        isSupportPlaceholder() {
            var input = document.createElement('input');
            return 'placeholder' in input;
        },
        input(obj, val) {
            var $input = obj;
            var val = val;
            $input.attr({value:val});
            $input.focus(function() {
                if ($input.val() == val) {
                    $(this).attr({value:""});
                }
            }).blur(function() {
                if ($input.val() == "") {
                    $(this).attr({value:val});
                }
            });
        },
        isParamLegal() {
            var params = common_js.getParamsByIdArr(["userName", "password","kaptcha"]);
            if(common_js.isBlank(params.userName)) {
                $("#msg").text("请输入用户名");
                $("#userName").focus();
                return false;
            }
            if(common_js.isBlank(params.password)) {
                $("#msg").text("请输入密码");
                $("#password").focus();
                return false;
            }
            if($("#kaptchaP").is(":visible") && common_js.isBlank(params.kaptcha)) {
                $("#msg").text("请输入验证码");
                $("#kaptcha").focus();
                return false;
            }
            $("#msg").text("");
            return params;
        },
        login(event) {
            var btn = $("#login-button");
            if(common_js.isLock(btn)) return;
            var params = this.isParamLegal();
            if(!params) return;
            common_js.lock(btn);
            btn.val("正在登录...");
            $.ajax({
                method: 'post',
                url: this.base+"/api/user/login",
                data: params,
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (data) {
                    if (data.code==200) {
                        localStorage.setItem("languageType", data.lastLanguageType);
                        window.location.href = '/';
                    }else{
                        $("#msg").text(data.message);
                        btn.val("登 录");
                        common_js.unlock(btn, 1);
                    }
                }
            });
        }
    }
}
</script>
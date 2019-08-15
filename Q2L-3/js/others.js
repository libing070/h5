$(function(){

    $(".goliuzi").on('click',function(){
        smoothscroll();
    })

    function smoothscroll(){
        var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo (0,currentScroll - (currentScroll/5));
        }
    }

    $(".zhineng").on('click',function(){
        window.open('http://ai.auto-smart.com/audi_q2l/robot.html?utm='+utms);
    })

    $("#show-find").on('click',function(){
        $("#find_pop").fadeIn();
    })

    $(".mask").on('click',function(){
        $("#find_pop").fadeOut();
        hide_pop();
    })

    function hide_pop(){
        $('.share_pop').fadeOut();
        $('.xcx_pop').fadeOut();
        $('.ewm_pop').fadeOut();
    }

    //底部逻辑
    function hide_pop() {
        $('.share_pop').fadeOut();
        $('.xcx_pop').fadeOut();
        $('.ewm_pop').fadeOut();
        $('body').css('overflow', 'hidden');
    }
    $(".mask").on('click', function () {
        $("#find_pop").fadeOut();
        hide_pop();
        $('.mask').fadeOut();
        $('body').css('overflow', 'auto');
    })
    $('.share').on('click', function () {
        $('.mask').show();
        hide_pop();
        $('.share_pop').fadeIn();
    })

    $('.xiaochengxu').on('click', function () {
        $('.mask').show();
        hide_pop();
        $('.xcx_pop').fadeIn();
    })
    $('.weixin').on('click', function () {
        $('.mask').show();
        hide_pop();
        $('.ewm_pop').fadeIn();
    });

})
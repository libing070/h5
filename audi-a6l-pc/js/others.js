$(function(){

    $("#yuyue").on('click',function(){
        smoothscroll();
    })

    function smoothscroll(){
        var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo (0,currentScroll - (currentScroll/5));
        }
    }

    $("#wenda").on('click',function(){
        window.open('http://ai.auto-smart.com/audi_a6l/robot.html');
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

    $('.share').on('click',function(){
        hide_pop();
        $('.share_pop').fadeIn();
    })

    $('.xiaochengxu').on('click',function(){
        hide_pop();
        $('.xcx_pop').fadeIn();
    })
    $('.weixin').on('click',function(){
        hide_pop();
        $('.ewm_pop').fadeIn();
    })


})
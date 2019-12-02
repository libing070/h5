$(function () {
$(".banner2").on("click",'.item div',function () {
    $(this).parent('.item').siblings().children(".after").css("display","none").removeClass("active");
    $(this).parent('.item').siblings().children(".before").css("display","block").addClass("active");
    if($(this).hasClass("active")){
        $(this).removeClass("active").css("display","none");
        $(this).siblings().addClass("active").css("display","block");
    }
});

});
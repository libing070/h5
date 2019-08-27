$(function () {
$(".banner2").on("click",'.item div',function () {
    if($(this).hasClass("active")){
        $(this).removeClass("active").css("display","none");
        $(this).siblings().addClass("active").css("display","block");
    }
})
});
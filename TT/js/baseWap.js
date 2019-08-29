$(function () {

    //获取焦点后回退
    $("input").focus(function () {
        distance = $(document).scrollTop();
    });
    $("textarea").focus(function () {
        distance = $(document).scrollTop();
    });
    $("select").focus(function () {
        distance = $(document).scrollTop();
    });

    //失去焦点后回退
    $("input").blur(function () {
        $(document).scrollTop(distance);
    });
    $("textarea").blur(function () {
        $(document).scrollTop(distance);
    });
    $("select").blur(function () {
        $(document).scrollTop(distance);
    });



});

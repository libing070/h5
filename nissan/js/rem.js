; (function () {
    /**
     * 6.4=设计稿尺寸/100
     * css元素尺寸=设计稿元素尺寸/100;
     */
    /**
     * 设计图宽 1088px 移动端750px 比例1.45 
     */
    var change = 'orientationchange' in window ? 'orientationchange' : 'resize';
    function calculate() {
        var deviceWidth = document.documentElement.clientWidth;
        var deviceHeight = document.documentElement.clientHeight;
        // console.log((64 / deviceHeight))
        // console.log(deviceWidth)
        // console.log(deviceHeight)
        console.log(window.outerHeight)
        if (deviceWidth < 320) {
            deviceWidth = 320;
        }
        else if (deviceWidth > 640) {
            deviceWidth = 640;
        }
        // if (deviceWidth == 375) {
        //     console.log(100)
        // }
        document.documentElement.style.fontSize = deviceWidth / 6.4 / 1.45 + 'px';//需要除以1.45进行换算
        document.documentElement.style.width = deviceWidth + "px";
        // console.log(document.documentElement.style.fontSize)
    };
    window.addEventListener(change, calculate, false);
    calculate();
})();

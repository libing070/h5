(function (window) {
    var _element = document.getElementById('scrolling'),
        _startPos = 0,
        _transitionHeight = 0;

    _element.addEventListener('touchstart', function (e) {
        _startPos = e.touches[0].pageY;
    }, false);

    _element.addEventListener('touchmove', function (e) {
        _transitionHeight = e.touches[0].pageY - _startPos;
    }, false);

    _element.addEventListener('touchend', function (e) {
        if(_element.scrollHeight==(_element.scrollTop+_element.clientHeight) && _transitionHeight<0){
            addFresh();
        }
        // _element.style.transition = 'transform 0.5s ease 1s';
        // _element.style.transform = 'translateY(0px)';

    }, false);
})(window);


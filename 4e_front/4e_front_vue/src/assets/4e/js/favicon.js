(function() {
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = '/static/4e/favicon.ico';
    document.getElementsByTagName('head')[0].appendChild(link);
})();
;(function (window,document) {
    $id=(id)=>{
        return typeof(id)==="string"?document.getElementById(id):id;
    }
    $class=(classs)=>{
        return typeof(classs)==="string"?document.getElementsByClassName(classs):classs;
    }
    $name=(name)=>{
        return typeof(name)==="string"?document.getElementsByName(name):name;
    }
    $tagname=(tagname)=>{
        return typeof(tagname)==="string"?document.getElementsByTagName(tagname):tagname;
    }
})(window,document);
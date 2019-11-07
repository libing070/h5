export const BASE={
    timestamp:function (url){
        var getTimestamp=new Date().getTime();
        if(url&&url.indexOf("?")>-1){
            url=url+"&timestamp="+getTimestamp
        }else{
            url=url+"?timestamp="+getTimestamp
        }
        return url;
    }
}
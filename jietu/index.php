<?php
$domain = $_SERVER['SERVER_NAME'];
$base = ($_SERVER['SERVER_PORT']=="80"?"http://":"https://").$_SERVER['SERVER_NAME'].$_SERVER["REQUEST_URI"];

$appid = "wx4acec2db42162951";
//$secret = "020bb0c3796d20cb78cb8585f2d9a954";
$secret = "1d66451a48b5a782ad5f8a5995503cfc";

if(isset($_REQUEST['code'])){
    //生成调取api的地址
    $requesturl = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='.$appid.'&secret='.$secret.'&code='.$_REQUEST['code'].'&grant_type=authorization_code';
    $result = file_get_contents($requesturl);
    $result = json_decode($result, true);

    if (isset($result['errcode'])) {
        //重新授权
        header("Location:https://open.weixin.qq.com/connect/oauth2/authorize?appid={$appid}&&redirect_uri={$base}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect");
        exit;
    }
    //生成获取用户信息的地址
    $getuser = 'https://api.weixin.qq.com/sns/userinfo?access_token='.$result['access_token'].'&openid='.$result['openid'].'&lang=zh_CN';
    $info = file_get_contents($getuser);
    //最后得到$info 数组，这个数据里面包含用户数据的具体信息，具体这个东西看文档就好啦~写的很清楚
    $info = json_decode($info, true);
    $avatar = $info['headimgurl'];
    $nickname = $info['nickname'];
    $sex = $info['sex'];

    $avatar_path = "avatar/".$result['openid'];
    $path = dirname(__FILE__)."/index.html";
    $html = file_get_contents($path);
    $html = str_replace('@avatar@', $avatar_path, $html);
    $html = str_replace('@origin_avatar@', $avatar, $html);
    $html = str_replace('@nickname@', $nickname, $html);
    $html = str_replace('@openid@', $result['openid'], $html);
    $html = str_replace('@sex@', $sex, $html);
    header("Content-type: text/html; charset=utf-8");
    echo $html;exit;
}else{
    header("Location:https://open.weixin.qq.com/connect/oauth2/authorize?appid={$appid}&redirect_uri={$base}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect");
}



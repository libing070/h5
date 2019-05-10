<?php

include 'WechatJssdk.class.php';

//2015appid
// $appid = 'wx258b2df4f0e1ae84';
// $secret = 'c224fd808739d4d9630643bc6eda4cbf';
//2016appid
$appid = 'wx32ebd644b39ec2f2';
$secret = '06f5ae70707d579224e13c6baf082ca5';



$url = $url = $_REQUEST['url'];

$jssdk = new WechatJssdk($appid,$secret,$url);
$sign = $jssdk->GetSignPackage();

$data['appid'] = $sign['appId'];
$data['noncestr'] = $sign['nonceStr'];
$data['signature'] = $sign['signature'];
$data['timestamp'] = $sign['timestamp'];
$data['url'] = $sign['url'];
$data['token']=$sign['token'];
$callback = $_GET['callback'];
echo $callback.'('.json_encode($data).')';
exit();


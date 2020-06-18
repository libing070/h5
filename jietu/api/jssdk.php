<?php
include 'WechatJssdk.class.php';
$appid = 'wx4acec2db42162951';
$secret = '1d66451a48b5a782ad5f8a5995503cfc';
$url = isset($_POST['url']) ? $_POST['url'] : '';
$jssdk = new WechatJssdk($appid,$secret,$url);
$sign = $jssdk->GetSignPackage();
$data['appid'] = $sign['appId'];
$data['noncestr'] = $sign['nonceStr'];
$data['signature'] = $sign['signature'];
$data['timestamp'] = $sign['timestamp'];
$data['url'] = $sign['url'];
$data['token']=$sign['token'];
$return = json_encode($data);
echo $return;

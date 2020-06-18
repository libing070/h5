<?php

include 'WechatJssdk.class.php';

$appid = 'wxd90316eda13354a1';
$secret = 'c53c66104c558f27b9d70cdd7e5bd167';

$url = isset($_POST['url']) ? $_POST['url'] : '';

$jssdk = new WechatJssdk($appid,$secret,$url);
$sign = $jssdk->GetSignPackage();

$data['appid'] = $sign['appId'];
$data['noncestr'] = $sign['nonceStr'];
$data['signature'] = $sign['signature'];
$data['timestamp'] = $sign['timestamp'];
$data['url'] = $sign['url'];
$data['token']=$sign['token'];
$callback = $_GET['callback'];
if ($callback) {
	echo $callback.'('.json_encode($data).')';
}else{
	echo json_encode($data);
}
exit();
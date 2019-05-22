<?php


$params = $_GET + $_POST;
$username = $params['username'];
$password = $params['password'];
header("Content-type: application/json; charset=utf-8");

if (empty($username)) {
    $res=array('code' => 9999, 'msg' => '用户名不能为空');
}
if (empty($password)) {
    $res=array('code' => 9999, 'msg' => '密码不能为空');
}
if ($username == 'admin' && $password == 'abc.123') {
    $res=array('code' => 200, 'msg' => '成功');
    setcookie("SESSIONUSER", $username, time()+3600);
} else {
    $res=array('code' => 9999, 'msg' => '用户名或密码错误');
}
echo json_encode($res);
exit;
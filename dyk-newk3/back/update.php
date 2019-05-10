<?php

function db_query($sql)
{
    $config = json_decode(file_get_contents("db_config.json"));
    $connect = mysqli_connect($config->ip, $config->user, $config->password, $config->databases, $config->port);
    $connect->query('set names utf8');
    $result = $connect->query($sql);
    $arr = array();
    while ($row = mysqli_fetch_array($result)) {
        array_push($arr, $row);
    }
    mysqli_close($connect);
    return $arr;
}

$params = $_GET + $_POST;
$uid = $params['uid'];
$status = $params['status'];
header("Content-type: application/json; charset=utf-8");
if (empty($uid)) {
    $res = array('code' => 9999, 'msg' => '用户ID不能为空');
    echo json_encode($res);
    exit;
}
if (empty($status)) {
    $res = array('code' => 9999, 'msg' => '状态不能为空');
    echo json_encode($res);
    exit;
}
$sql = "update dyk_k3_user set status={$status} where uid={$uid};";
db_query($sql);
$res = array('code' => 200, 'msg' => '更新成功');
echo json_encode($res);
exit;






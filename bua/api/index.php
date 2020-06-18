<?php

$params = $_GET + $_POST;
$action = isset($params['action'])?$params['action']:'';

function db_query($sql) {
	$config = json_decode(file_get_contents(dirname(__FILE__)."/db_config.json"));
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

date_default_timezone_set('PRC');

$utm = $params['utm'];	
$channel = $params['channel'];	
$uuid = $params['uuid'];	
$province = $params['province'];	
$city = $params['city'];	
$ip = $_SERVER['REMOTE_ADDR'];
$date = date('Y-m-d', time());
$broswer = $_SERVER['HTTP_USER_AGENT'];
$created_at = time();
$des = $params['des'];

$redis = new Redis();
$redis->connect('127.0.0.1',6379);

switch($action) {
    case 'page_view':
	/*$sql = "insert into pv(utm, channel, ip, uuid, province, city, broswer, date, created_at)
		values('{$utm}', '{$channel}', '{$ip}', '{$uuid}', '{$province}', '{$city}', '{$broswer}', '{$date}', {$created_at})
	";
	$ret = db_query($sql);
	echo json_encode($ret);*/
	$data = [];
	$data['utm'] = $utm;
	$data['channel'] = $channel;
	$data['uuid'] = $uuid;
	$data['province'] = $province;
	$data['city'] = $city;
	$data['ip'] = $ip;
	$data['date'] = $date;
	$data['broswer'] = $broswer;
	$data['created_at'] = $created_at;
	$redis->LPUSH('page_view',json_encode($data));
	echo json_encode([]);
        break;
    case 'page_click':
	$data = [];
        $data['utm'] = $utm;
        $data['channel'] = $channel;
        $data['uuid'] = $uuid;
        $data['province'] = $province;
        $data['city'] = $city;
        $data['ip'] = $ip;
        $data['date'] = $date;
        $data['broswer'] = $broswer;
        $data['created_at'] = $created_at;
        $data['des'] = $des;
        $redis->LPUSH('page_click',json_encode($data));
	/*$sql = "insert into buy(utm, channel, ip, uuid, province, city, broswer, date, created_at, `des`)
                values('{$utm}', '{$channel}', '{$ip}', '{$uuid}', '{$province}', '{$city}', '{$broswer}', '{$date}', {$created_at}, '{$des}')";	
	$ret = db_query($sql);
	echo json_encode($ret);*/
	echo json_encode([]);
	break;
    default:
        echo 'bad request';
        break;
}
exit;

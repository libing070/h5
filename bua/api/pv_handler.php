<?php

function db_query($sql) {
	$config = json_decode(file_get_contents(dirname(__FILE__)."/db_config.json"));
	$connect = mysqli_connect($config->ip, $config->user, $config->password, $config->databases, $config->port);
	$connect->query('set names utf8');
	$result = $connect->query($sql);
	mysqli_close($connect);
	return $result;
}

//处理数据
$redis = new Redis();
$redis->pconnect('127.0.0.1',6379);
while(true){
    try{
	//处理pv
        $pv = $redis->LPOP('page_view');
        if($pv){
	    $pv = json_decode($pv, true);
	    $utm = $pv['utm'];
	    $channel = $pv['channel'];
	    $ip = $pv['ip'];
	    $uuid = $pv['uuid'];
	    $province = $pv['province'];
	    $city = $pv['city'];
	    $broswer = $pv['broswer'];
	    $created_at = $pv['created_at'];
	    $date = $pv['date'];
	    $sql = "insert into pv(utm, channel, ip, uuid, province, city, broswer, date, created_at)
                values('{$utm}', '{$channel}', '{$ip}', '{$uuid}', '{$province}', '{$city}', '{$broswer}', '{$date}', {$created_at})
	    ";
	    $ret = db_query($sql);
        }else{
	    break;
	}
    }catch(Exception $e){
        echo $e->getMessage();
    }
}

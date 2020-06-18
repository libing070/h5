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
	//处理点击
	$click = $redis->LPOP('page_click');
        if($click){
            $click = json_decode($click, true);
            $utm = $click['utm'];
            $channel = $click['channel'];
            $ip = $click['ip'];
            $uuid = $click['uuid'];
            $province = $click['province'];
            $city = $click['city'];
            $broswer = $click['broswer'];
            $created_at = $click['created_at'];
            $date = $click['date'];
            $des = $click['des'];
            $sql = "insert into buy(utm, channel, ip, uuid, province, city, broswer, date, created_at, `des`)
                values('{$utm}', '{$channel}', '{$ip}', '{$uuid}', '{$province}', '{$city}', '{$broswer}', '{$date}', {$created_at}, '{$des}')
            ";
            $ret = db_query($sql);
        }else{
	    break;
	}

    }catch(Exception $e){
        echo $e->getMessage();
    }
}

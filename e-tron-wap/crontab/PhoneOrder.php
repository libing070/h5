<?php

require dirname(__FILE__)."/../controller/ddmp.php";

set_time_limit(0);

//获取前一天日期
$date = date("Y-m-d",strtotime("-1 day"));

//username
$username = "boss@4008959966";
//passwd
$password = "";
//pageSize
$pagesize = 50;

//创建数据流上下文
$context = stream_context_create(['http'=>['method'=>'GET','timeout'=>3]]);


//获取指定媒体渠道的经销商400电话
$utms = ['m75','m76','m77','m78','m79','m80','m81','m82'];
//合法话单utms
$tels_utms = ['m21', 'm22', 'm23', 'm24', 'm1', 'm2', 'm3', 'm5'];
$tels_utms_ref = ['m21' => 'ym75', 'm22' => 'ym76', 'm23' => 'ym77', 'm24' => 'ym78', 'm1' => 'ym79', 'm2' => 'ym80', 'm3' => 'ym81', 'm4' => 'ym82'];

$tels = [];

$dealers = [];

function db_query($sql) {
    $config = json_decode(file_get_contents(dirname(__FILE__)."/../controller/db_config.json"));
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

foreach($utms as $key=>$item) {
    //获取指定经销商
    $url = "http://ai.audi.cn/api/index.php?c=home&a=getjxss&format=json&utm={$item}";
    $content = file_get_contents($url, false, $context);
    $content = json_decode($content, true);

    if (isset($content['items'])) {
        foreach($content['items'] as $k => $dealer) {
            if (!isset($dealer['tel'])) {
                continue;
            }
            if (!isset($dealers[$dealer['jingxiaossn']])) {
                $dealers[$dealer['jingxiaossn']] = $dealer;
            }
            $tel = $dealer['tel'];
            $tel = explode(",", $tel);
            $tel = $tel[0];
            if (in_array($tel, $tels)==false) {
                $tels[] = $tel;
            }
        }
    }
}

foreach($tels as $tel) {
    $page = 1;
    $flag = true;
    $error = 0;
    while($flag) {
        $url = "http://47.100.249.22/platform/iface/answered.do?name={$username}&passwd={$password}&pageSize={$pagesize}&num={$tel}&startTime={$date}&endTime={$date}&pageNo={$page}";
        $ret = file_get_contents($url, false, $context);
        $ret = json_decode($ret, true);
        if ($ret['result']=="false") {
            if ($error==4) {
                break;
            }
            $error++;
            continue;
        }
        if ($ret['data']['totalPages']==$page) {
            $flag = false;
        }else{
            $page ++;
        }
        $list = $ret['data']['resultList'];
        if ($list) {
            foreach($list as $t => $m) {
                $ivrName = $m['ivrName'];
                $number = str_replace('dept-','',$ivrName);
                //查询话单utm
                $sql = "select meiti, jingxiaoshangsn as sn from user_dianhuas where fenjihao={$number} limit 1";
                $result = db_query($sql);
                if ($result && count($result)>0 && $result[0]['meiti']) {
                    $meiti = 'm'.$result[0]['meiti'];
                    $sn = $result[0]['sn'];
                    if (in_array($meiti, $tels_utms)) {
                        $data = [];
                        $data['name'] = $m['userName'];
                        $data['mobile'] = $m['callerNo'];
                        $dealer = $dealers[$sn];
                        if (!$dealer) {
                            continue;
                        }
                        $data['jxs_id'] = $dealer['jingxiaoshangid'];
                        
                        $data['provinceId'] = '';
                        $data['cityId'] = '';
                        $data['type'] = 4;
                        $data['time'] = strtotime($m['incomingTime']);
                        $data['utm'] = $meiti;
                        var_dump('<pre/>', $data);
                        //留资到gather表
                        Tools::gather($data);
                        //留资到ddmp
                        $data['time'] = $m['incomingTime'];
                        $data['utm'] = $tels_utms_ref[$meiti];
                        echo '提交数据'.PHP_EOL;
                        Ddmp::send($data);
                    }
                }
            }
        }
    }
}

echo 'end';
exit;
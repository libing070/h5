<?php

require_once dirname(__FILE__)."/tools.php";
require_once dirname(__FILE__)."/ddmp.php";
require_once dirname(__FILE__)."/redis.php";

$params = $_GET + $_POST;
$action = isset($params['action'])?$params['action']:'';

switch($action) {
    case 'add':
        header("Content-type: application/json; charset=utf-8");
		$data = json_decode(file_get_contents('php://input'), true);
		$type = $data['type'];
		$result = Tools::add($type);
		echo json_encode($result, JSON_UNESCAPED_UNICODE);
		break;
	case 'query':
        header("Content-type: application/json; charset=utf-8");
		$result = Tools::get_all();
		echo json_encode($result, JSON_UNESCAPED_UNICODE);
		break;
    case 'send':
        header("Content-type: application/json; charset=utf-8");
        $data = json_decode(file_get_contents('php://input'), true);
        $type = 1010;
        if(isset($data['car'])){
             $data['type'] = strtolower($data['car']);
        }else{
           $result['code'] = 0;
           $result['msg'] = "请选择车型";
           echo json_encode($result, JSON_UNESCAPED_UNICODE);
           break;
        }
        $isExist=Tools::mobile_exist($type,$data['mobile']);
        if($isExist==1){
           $result['code'] = 0;
           $result['msg'] = "手机号已经提交过";
           echo json_encode($result, JSON_UNESCAPED_UNICODE);
        }else{
           $result['code'] = 0;
           $result['msg'] = "成功";
           Tools::gathers($data);
           $result = Ddmp::send($data);
           Tools::mobile_add($type, $data['mobile']);
           echo json_encode($result, JSON_UNESCAPED_UNICODE);
        }
        break;
    case 'getServerData':
        $cache = new CacheTools();
        $url = $params['url'];
        $url = explode('stimestamp', $url);
        $url = $url[0];
        $result = $cache->get($url, function($url){
            $ret = file_get_contents($url);
            $ret = json_decode($ret, true);
            $ret['cache'] = true;
            return json_encode($ret, JSON_UNESCAPED_UNICODE);
        });
        echo json_encode(json_decode($result, true), JSON_UNESCAPED_UNICODE);
        break;
    default:
        echo 'bad request';
        break;
}
exit;
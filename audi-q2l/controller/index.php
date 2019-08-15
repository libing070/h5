<?php

require dirname(__FILE__)."/tools.php";
require dirname(__FILE__)."/ddmp.php";

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
        $isExist=Tools::mobile_exist($data['mobile']);
        if($isExist==1){
           $result['code'] = 0;
           $result['msg'] = "手机号已经提交过";
           echo json_encode($result, JSON_UNESCAPED_UNICODE);
        }else{
           Tools::gathers($data);
           $result = Ddmp::send($data);
           Tools::mobile_add($data['mobile']);
           echo json_encode($result, JSON_UNESCAPED_UNICODE);
        }

        break;
    default:
        echo 'bad request';
        break;
}
exit;
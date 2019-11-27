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
        if(isset($data['car'])){
           if($data['car']=='Q2L'){
             $data['type']=21;
           }elseif($data['car']=='Q3'){
             $data['type']=22;
           }elseif($data['car']=='Q5L'){
             $data['type']=23;
           }else{
               //Q7
             $data['type']=24;
           }
        }else{
           $result['code'] = 0;
           $result['msg'] = "请选择车型";
           echo json_encode($result, JSON_UNESCAPED_UNICODE);
           break;
        }
        $isExist=Tools::mobile_exist($data['type'],$data['mobile']);
        if($isExist==1){
           $result['code'] = 0;
           $result['msg'] = "手机号已经提交过";
           echo json_encode($result, JSON_UNESCAPED_UNICODE);
        }else{
           $result['code'] = 0;
           $result['msg'] = "成功";
           Tools::gathers($data);
           $result = Ddmp::send($data);
           Tools::mobile_add($data['type'],$data['mobile']);
           echo json_encode($result, JSON_UNESCAPED_UNICODE);
        }
        break;
    default:
        echo 'bad request';
        break;
}
exit;
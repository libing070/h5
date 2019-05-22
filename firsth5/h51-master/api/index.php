<?php

require dirname(__FILE__)."/tools.php";

$params = $_GET + $_POST;
$action = isset($params['action'])?$params['action']:'';

switch($action) {
    case 'save':
        header("Content-type: application/json; charset=utf-8");
    	$data = json_decode(file_get_contents('php://input'), true);
        $name = $data['name'];
        $type = $data['type'];
    	$sex = $data['sex'];
    	$mobile = $data['mobile'];
        $weixin = $data['weixin'];
        $qq = $data['qq'];
        $source = $data['source'];
        $department = $data['department'];
        $plat = $data['plat'];
        $skill = $data['skill'];
        $result = Tools::save($name,$type, $sex, $mobile, $weixin, $qq, $source,$department,$plat,$skill);
    	echo json_encode($result);
	    break;
    default:
        echo 'bad request';
        break;
}
exit;
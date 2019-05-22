<?php
class Tools {

    private static function db_query($sql) {
        $config = json_decode(file_get_contents("db_config.json"));
        $connect = mysqli_connect($config->ip, $config->user, $config->password, $config->databases, $config->port);
        $connect->query('set names utf8');
        $result=$connect->query($sql);
        $arr=array();
        while($row =mysqli_fetch_array($result)){
            array_push($arr,$row);
        }
        mysqli_close($connect);
        return $arr;
    }


    public static function save($name,$type, $sex, $mobile, $weixin, $qq,$source,$department,$plat,$skill) {
        $sql = "
            insert into zxjh_user(name, type,sex, mobile, weixin, qq, source,department,plat,skill,createAt)
            values('{$name}', '{$type}', '{$sex}', '{$mobile}', '{$weixin}', '{$qq}', '{$source}','{$department}','{$plat}','{$skill}',now());
  ";
        self::db_query($sql);
        $result = array();
        $result['code'] = 0;
        return $result;
    }
}

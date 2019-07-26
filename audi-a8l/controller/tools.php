<?php

class Tools
{

    private static function db_query($sql)
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

    public static function exist()
    {
        $sql = "
               select * from praises where  campaign_id='a8l' and type=1
             ";
        $arr = self::db_query($sql);
        if (sizeof($arr) == 0) {
            for ($x = 1; $x <= 6; $x++) {
                $nums = 2953;
                if ($x == 2) {
                    $nums = 3424;
                }
                if ($x == 3) {
                    $nums = 4475;
                }
                if ($x == 4) {
                    $nums = 3186;
                }
                if ($x == 5) {
                    $nums = 2947;
                }
                if ($x == 6) {
                    $nums = 2094;
                }
                $sql = "
                    INSERT INTO  praises (campaign_id,type,praise_num) VALUES ('a8l',{$x},{$nums})
             ";
                self::db_query($sql);
            }
        }
    }


    public static function add($type)
    {

        $sql = "
            update praises set praise_num=praise_num+1 where type={$type} and  campaign_id='a8l'
        ";
        self::db_query($sql);
        $result = [];
        $result['code'] = 0;
        return $result;
    }

    public static function get_all()
    {
//        self::exist();
        $sql = "
            select type,praise_num from praises where campaign_id='a8l' order by type asc;
        ";
        $arr = self::db_query($sql);
        $res = array();
        for ($i = 0; $i < sizeof($arr); $i++) {
            $res[$i]['num'] = $arr[$i]['praise_num'];
            $res[$i]['type'] = $arr[$i]['type'];
        }
        $result = [];
        $result['code'] = 0;
        $result['data'] = $res;
        return $result;
    }


    public static function mobile_exist($mobile)
    {
        $sql = "select * from mobile_repeat_check  where type=3 and mobile='{$mobile}' ";
        $arr = Tools::db_query($sql);
        if (sizeof($arr) == 0) {
            return 0;
        }
        return 1;
    }

    public static function mobile_add($mobile)
    {
        $sql = "INSERT INTO  mobile_repeat_check (type,mobile) VALUES (3,'{$mobile}')";
        Tools::db_query($sql);
    }


    public static function gathers($data)
    {
        $name = $data['name'];
        $phone = $data['mobile'];
        $provinceId = $data['provinceId'];
        $cityId = $data['cityId'];
        $dealerId = $data['jxs_id'];
        $seriesId = 'A8F3678E-FC3A-493D-9DF0-A4988193074A';
        $modelId = 'BB24F339-63D3-482C-A61F-DD525E6E1E81';
        $utm = $data['utm'];
        $channel = "";
        if(isset($data['channel'])){
            $channel=$data['channel'];
        }
        $carType = 'a8l';
        $activity = '2019年奥迪A8L第三季度促销传播-互动营销-wap';
        $sql =
            "INSERT INTO  gathers (name,phone,provinceId,cityId,dealerId,seriesId,modelId,orderTime,utm,channel,car_type,activity,created_at) VALUES ('{$name}','{$phone}','{$provinceId}','{$cityId}','{$dealerId}','{$seriesId}','{$modelId}',now(),'{$utm}','{$channel}','{$carType}','{$activity}',UNIX_TIMESTAMP(now()))";
        Tools::db_query($sql);
    }


}

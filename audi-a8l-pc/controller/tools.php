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
               select * from praises where  campaign_id='a6l' and type=1
             ";
        $arr = self::db_query($sql);
        if (sizeof($arr) == 0) {
            for ($x = 1; $x <= 5; $x++) {
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
                $sql = "
                 INSERT INTO  praises (campaign_id,type,praise_num) VALUES ('a6l',{$x},{$nums})
             ";
                self::db_query($sql);
            }
        }
    }


    public static function add($type)
    {
        $sql = "
            update praises set praise_num=praise_num+1 where type={$type} and  campaign_id='a6l'
        ";
        self::db_query($sql);
        $result = [];
        $result['code'] = 0;
        return $result;
    }

    public static function get_all()
    {
        self::exist();
        $sql = "
            select type,praise_num from praises where campaign_id='a6l' order by type asc;
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
        $sql = "select * from mobile_repeat_check  where type=1 and mobile='{$mobile}' ";
        $arr = Tools::db_query($sql);
        if (sizeof($arr) == 0) {
            return 0;
        }
        return 1;
    }

    public static function mobile_add($mobile)
    {
        $sql = "INSERT INTO  mobile_repeat_check (type,mobile) VALUES (1,'{$mobile}')";
        Tools::db_query($sql);
    }


    public static function gathers($data)
    {
        $name = $data['name'];
        $phone = $data['mobile'];
        $provinceId = $data['provinceId'];
        $cityId = $data['cityId'];
        $dealerId = $data['jxs_id'];
        $seriesId = '9ACA891B-9CED-4E68-8E59-D17F209C53AD';
        $modelId = '7356E3B8-134E-47B7-BE10-D4A46E6DD4DF';
        $utm = $data['utm'];
        $carType = 'a6l';
        $activity = '2019年奥迪A6L第三季度促销传播-互动营销-pc';
        $sql =
            "INSERT INTO  gathers (name,phone,provinceId,ctyId,dealerId,seriesId,modelId,orderTime,utm,car_type,activity,created_at) VALUES ('{$name}','{$phone}','{$provinceId}','{$cityId}','{$dealerId}','{$seriesId}','{$modelId}',now(),'{$utm}','{$carType}','{$activity}',UNIX_TIMESTAMP(now()))";
        Tools::db_query($sql);
    }


}

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
               select * from praises where  campaign_id='q5l' and type=1
             ";
        $arr = self::db_query($sql);
        if (sizeof($arr) == 0) {
            for ($x = 1; $x <= 5; $x++) {
                $nums = 2553;
                if ($x == 2) {
                    $nums = 3124;
                }
                if ($x == 3) {
                    $nums = 4275;
                }
                if ($x == 4) {
                    $nums = 3786;
                }
                if ($x == 5) {
                    $nums = 2447;
                }
                $sql = "
                INSERT INTO  praises (campaign_id,type,praise_num) VALUES ('q5l',{$x},{$nums})
            ";
                self::db_query($sql);
            }
        }
    }


    public static function add($type)
    {
        $sql = "
            update praises set praise_num=praise_num+1 where type={$type} and  campaign_id='q5l'
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
            select type,praise_num from praises where campaign_id='q5l' order by type asc;
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
        $sql = "select * from mobile_repeat_check  where type=2 and mobile='{$mobile}' ";
        $arr = Tools::db_query($sql);
        if (sizeof($arr) == 0) {
            return 0;
        }
        return 1;
    }

    public static function mobile_add($mobile)
    {
        $sql = "INSERT INTO  mobile_repeat_check (type,mobile) VALUES (2,'{$mobile}')";
        Tools::db_query($sql);
    }


    public static function gathers($data)
    {
        $name = $data['name'];
        $phone = $data['mobile'];
        $provinceId = $data['provinceId'];
        $cityId = $data['cityId'];
        $dealerId = $data['jxs_id'];
        $seriesId = 'CB3923AB-83BD-48B1-90DC-9C2004D75BA9';
        $modelId = 'B19D554E-0EC2-4348-BAA3-3167FB60A9D1';
        $utm = $data['utm'];
        $carType = 'q5l';
        $activity = '2019年奥迪Q5上市十周年互动营销项目-pc';
        $sql =
            "INSERT INTO  gathers (name,phone,provinceId,cityId,dealerId,seriesId,modelId,orderTime,utm,car_type,activity,created_at) VALUES ('{$name}','{$phone}','{$provinceId}','{$cityId}','{$dealerId}','{$seriesId}','{$modelId}',now(),'{$utm}','{$carType}','{$activity}',UNIX_TIMESTAMP(now()))";
        //var_dump($sql);
        Tools::db_query($sql);
    }


}

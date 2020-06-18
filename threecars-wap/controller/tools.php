<?php

class Tools
{

    private static function db_query($sql)
    {
        $config = json_decode(file_get_contents(dirname(__FILE__)."/db_config.json"));
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
               select * from praises where  campaign_id='sports' and type=1
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
                    INSERT INTO  praises (campaign_id,type,praise_num) VALUES ('sports',{$x},{$nums})
             ";
                self::db_query($sql);
            }
        }
    }


    public static function add($type)
    {

        $sql = "
            update praises set praise_num=praise_num+1 where type={$type} and  campaign_id='sports'
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
            select type,praise_num from praises where campaign_id='sports' order by type asc;
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


    public static function mobile_exist($type,$mobile)
    {
        $sql = "select * from mobile_repeat_check  where type={$type} and mobile='{$mobile}' ";
        $arr = Tools::db_query($sql);
        if (sizeof($arr) == 0) {
            return 0;
        }
        return 1;
    }

    public static function mobile_add($type,$mobile)
    {
        $sql = "INSERT INTO  mobile_repeat_check (type,mobile) VALUES ({$type},'{$mobile}')";
        Tools::db_query($sql);
    }

    public static function gathers($data)
    {
        $name = $data['name'];
        $phone = $data['mobile'];
        $provinceId = $data['provinceId'];
        $cityId = $data['cityId'];
        $dealerId = $data['jxs_id'];
        $car = $data['type'];
        if ($car=='a6l') {
            $seriesId = "9ACA891B-9CED-4E68-8E59-D17F209C53AD";
            $modelId = "3e9d353f-e1d0-4632-ae24-f2dac97b11a2";
        }elseif ($car=='q5l') {
            $seriesId = "CB3923AB-83BD-48B1-90DC-9C2004D75BA9";
            $modelId = "B19D554E-0EC2-4348-BAA3-3167FB60A9D1";
        }elseif ($car=='a4l') {
            $seriesId = "9D5EB2B2-BD01-4154-99C4-487405AFC352";
            $modelId = "653AF3B3-CBB6-40A8-AE60-C60315ADD98E";
        }else {
            $seriesId = "9ACA891B-9CED-4E68-8E59-D17F209C53AD";
            $modelId = "3e9d353f-e1d0-4632-ae24-f2dac97b11a2";
        }
        
        $utm = $data['utm'];
        $channel = "";
        if(isset($data['channel'])){
            $channel=$data['channel'];
        }
        $carType = $data['car'];
        $activity = '2020年Audi czny 上市互动营销传播项目-pc';
        $time = 0;
        if(isset($data['time'])) {
            $time = $data['time'];
        }else{
            $time = time();
        }
        $sql =
            "INSERT INTO  gathers (name,phone,provinceId,cityId,dealerId,seriesId,modelId,orderTime,utm,channel,car_type,activity,created_at) VALUES ('{$name}','{$phone}','{$provinceId}','{$cityId}','{$dealerId}','{$seriesId}','{$modelId}',now(),'{$utm}','{$channel}','{$carType}','{$activity}',{$time})";
        Tools::db_query($sql);
    }

}

<?php

class Ddmp {

    private static $test = 1;
    
    
    function inturl()
    {
        if (self::$test) {
            $url = "http://106.75.119.170:2101/";
        }else{
            //正式地址
            //$url="http://120.132.70.217/";
        }
        return $url;
    }

    function send($data)
    {
        $utm = $data['utm'];
        $channel_id = $data['channel'];
        if (!$utm) {
           $utm = 'm75';
        }
        if (!$channel_id) {
           $channel_id = '1';
        }
        $key = $utm."_".$channel_id;
        
        $meiti_test = array(
           'm75_1' => '92768f7c-9d34-401f-83a3-11d3cc8f7cfc',
        );
       
        $meiti = [
           'm75_1' => '84159f21-8275-40e8-ae78-42a5e70dc709',
           'm76_1' => '11d27155-a48e-497d-9765-aa4b3876c354',
           'm77_1' => '98d3c0cc-301a-4287-9189-8a2ab12728be',
           'm77_2' => '1a872057-eec4-4dd3-b1da-0ef91ac33b89',
           'm77_3' => '068642b7-8008-446d-9238-9b3fcdbc610f',
           'm78_1' => '3e0852b7-b29c-4ff8-960e-e59779c9751e',
           'm78_2' => 'f97e90d1-2104-49dd-ab20-9facafe2895d',
           'm78_3' => '88b93171-42fd-4eb0-8a32-1b9c14978ccc',
           'm79_1' => 'cc3caeb8-2d7b-4de3-bbe5-e6fa1b56ce10',
           'm80_1' => '69431260-898c-4e1f-9bf3-d7eebecc8075',
           'm81_1' => '0d0409b9-ff6c-4035-a02e-3d1e8693cad3',
           'm81_2' => '900c28c1-1e32-4d2f-846c-b54317df397a',
           'm81_3' => '17fa4f12-7997-4311-b8e5-b6a002d067ba',
           'm81_4' => '54f770c8-ec44-4797-bad1-006f2754cb73',
           'm81_5' => '3a2abeb2-71ea-42a2-9c5d-da0d8890110f',
           'm81_6' => '79c969cb-a562-485b-9355-94bdc8c035d0',
           'm82_1' => 'e9dd7534-0b39-4fa4-aa4a-3aa6fea4bd75',
           'm82_2' => '1d92996b-ef47-4622-9ff5-1eaada4e9c0c',
           'm82_3' => 'ad30a4d9-aaaf-4671-93da-2a31e3620977',
           'm82_4' => 'c30b40b4-42cf-4f7f-87a0-b95b619c0859'
        ];
       
        if (self::$test) {
            if (!isset($meiti_test[$key])) {
                $key = $meiti_test['m75_1'];
            }else{
                $key = $meiti_test[$key];
                if (!$key) {
                    $key = $meiti_test['m75_1'];
                }
            }
        }else{
            $key = $meiti[$key];
            if (!$key) {
                $key = $meiti['m75_1'];
            }
        }

        header("Content-type: text/html; charset=utf-8");
        $url = self::inturl() . "interface/PostLeads";
        $authentication = array(
            'MediaId' => '979D6BB3-9A17-47A6-9607-645E0330F12E',
            'TimeStamp' => '2018-03-16 10:17:29',
            'RandomNumber' => "85122285",
            'Signature' => "44289d5deb89648e57b43bfdbdd73c6083615f22",
        );
        $senddata['MediaLeadId'] = self::uuid();
        $senddata['ChannlKeyId'] = $key;
        $senddata['Name'] = $data['name'];
        $senddata['Phone'] = $data['mobile'];
        $senddata['ProvinceId'] = $data['provinceId'];
        $senddata['CityId'] = $data['cityId'];
        $senddata['DealerId'] = $data['jxs_id'];
        $car = $data['type'];
        if ($car==21) {
            $senddata['SeriesId'] = "500CE29E-E9A5-4D2A-AB82-2EF0C0F447A4";
            $senddata['ModelId'] = "AF7A2504-8376-482E-9AD6-D0867D1BB775";
        }elseif ($car==22) {
            $senddata['SeriesId'] = "EF78447E-A4E7-4F84-B95F-93471C951933";
            $senddata['ModelId'] = "C6910C00-BE8F-4076-9CFC-BA324793CBFD";
        }elseif ($car==23) {
            $senddata['SeriesId'] = "CB3923AB-83BD-48B1-90DC-9C2004D75BA9";
            $senddata['ModelId'] = "B19D554E-0EC2-4348-BAA3-3167FB60A9D1";
        }else {
            $senddata['SeriesId'] = "32FA69D8-C28D-4DC6-AEF2-9F5B53AB4362";
            $senddata['ModelId'] = "E4146422-B9D8-42B7-B872-C8E7B2BE6CBE";
        }

        $datas = array(
            'authentication' => $authentication,
            'datas' => array($senddata)
        );
        self::postinfo($url, $datas, 'POST');
        $result = [];
        $result['code'] = 0;
        $result['msg'] = "成功";
        return $result;

    }

    //生成唯一uuid
    function uuid($prefix = '')
    {
        $chars = md5(uniqid(mt_rand(), true));
        $uuid = substr($chars, 0, 8) . '-';
        $uuid .= substr($chars, 8, 4) . '-';
        $uuid .= substr($chars, 12, 4) . '-';
        $uuid .= substr($chars, 16, 4) . '-';
        $uuid .= substr($chars, 20, 12);
        return $uuid;
    }


    //基础接口调用
    private function http_post($url)
    {
        $ch = curl_init();
        $timeout = 5;
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
        $file_contents = curl_exec($ch);
        $file_contents = (array)json_decode($file_contents);
        curl_close($ch);
        return $file_contents;
    }

    function postinfo($url, $data, $method)
    {
        $data_string = json_encode($data);
        $ch = curl_init();   //1.初始化
        curl_setopt($ch, CURLOPT_URL, $url); //2.请求地址
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);//3.请求方式
        //4.参数如下
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);//https
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; MSIE 5.01; Windows NT 5.0)');//模拟浏览器
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_AUTOREFERER, 1);
        if ($method == "POST") {//5.post方式的时候添加数据
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                    'Content-Type: application/json',
                    'Content-Length: ' . strlen($data_string))
            );
        }

        $tmpInfo = curl_exec($ch);//6.执行

        if (curl_errno($ch)) {//7.如果出错

            return curl_error($ch);
        }
        curl_close($ch);//8.关闭
        return $tmpInfo;
    }


}
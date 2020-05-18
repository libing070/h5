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
           'm75_1' => '830c7bfe-5b11-405f-9768-508dc394b53d',
        );
       
        $meiti = [
           'm91_1' => '2fbeb582-6ec3-4821-a924-1f3ce1e4095a',
           'm92_1' => '3875e404-ba53-488d-aee2-6a17e396e21c',
           'm92_2' => 'be57d557-2e05-41b1-903e-e62706668049',
           'm92_3' => '0f2573d1-f620-4835-a664-30a392c54494',
           'm93_1' => 'd5909f2e-94a5-45ec-8f71-170486fbd7d1',
           'm93_2' => '0ff8cd5f-0ccb-434d-b3ae-27e8c5e2a588',
           'm93_3' => '2e545d1a-b900-47e3-85b5-43d30e525a64',
           'm93_4' => '642fa77b-4185-4b8d-b335-c943ea357565',
           'm94_1' => 'b4c36b95-7756-49da-a3ae-45c86632fda1',
           'm94_2' => '14f84dc6-61a6-496b-8312-511e7a2475f7',
           'm94_3' => 'a30be580-b330-4b3c-b8c2-cd140b1a7c12',
           'm95_1' => '4e26b9db-e3ed-447d-b286-bacaaefcf279',
           'm95_2' => '2e7478a8-5d53-47fb-beb9-cf92c814a8b0',
           'm95_3' => '27dbb995-6619-4f2d-a1a3-5971dbda0335',
           'm95_4' => '1ce46859-0874-4db7-b2b9-1dd80c0e9260',
           'm95_5' => 'dafb77a3-6837-4557-ac05-c5edba100a7b',
           'm96_1' => 'e3244d9c-47ca-4449-a059-770ad6dbd3d3',
           'm96_2' => 'ec1cd828-f0b2-473f-b427-e51caf50e390',
           'm96_3' => '9f031539-3728-4752-84d2-9e724cac86ee',
           'm97_1' => 'ef13763d-3dcf-447a-a9e4-1a4b8ec6b71d',
           'm97_2' => '082a98ed-3a92-47e3-8a82-59b1fafdd83e',
           'm97_3' => '1a311c1f-911d-4d46-b89c-502118d546b9',
           'm98_1' => '94b1b5f5-7765-48ee-aef3-ca04168139eb',
           'm98_2' => '79ca8748-017f-43d6-9808-d9986cb350fa',
           'm98_3' => '7aec27c0-46c1-4c52-bef7-819ade5a56f8',
           'm98_4' => 'b569a0cd-5e3a-45e8-ba13-dbc9d4924671',
           'm98_5' => '4e67a1d8-6cd4-42ce-936f-35e872da3abb',
           'm99_1' => '9246198b-0ee4-4f8a-852e-fe3966faa62c',
           'm100_1' =>'c613763e-aaab-4e4a-9837-e40d46dce81d'
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
                $key = $meiti['m91_1'];
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
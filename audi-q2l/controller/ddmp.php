<?php

class Ddmp
{


    function inturl()
    {
        $url = "http://106.75.119.170:2101/";
        //正式地址
        //$url="http://120.132.70.217/";
        return $url;
    }

    function send($data)
    {
       $meiti = array(
           'm43' => '92768f7c-9d34-401f-83a3-11d3cc8f7cfc',
       );
        // $meiti=array(
        //     'm43'=>'33742ea7-5ade-479a-ab5b-2d2a0f1d56db',
        //     'm52'=>'37554094-9bce-40fd-86ab-27fe79ea3bd7',
        //     'm53'=>'dc45c43a-f84c-44c2-af44-45a62b12a937',
        //     'm54'=>'1db8e4a5-069e-40ca-b6b0-0873ec761838',
        //     'm55'=>'fd8c9267-25c8-4db0-a82b-34437830c067',
        //     'm56'=>'2cb95142-0955-4629-baee-9ab5bb017023',
        //     'm57'=>'d8a9e9da-b1ce-48ff-ade8-74e9df349aac',
        //     'm58'=>'53055df2-3260-4566-9e59-35cfda76f74b',
        //     'm59'=>'e076b9b2-0453-436c-a1ce-3936251c5ff4',
        //     'm60'=>'cfd189a3-ef91-48e8-a421-be391011f487',
        //     'm61'=>'0d5c04c0-52d3-4d5b-9fd9-bfcdd8ec8029',
        //     'm70'=>'669b3add-b9b7-49c1-ae35-3a54e9697a5d',
        //     'm71'=>'6d2a25d6-58ad-4932-8976-6676bc39fd40',
        //     'm72'=>'e874932d-4243-4937-84a0-fb04a51565a1',
        //     'm73'=>'987f7269-d460-4268-a85d-a3a19c5b2c90',
        //     'm74'=>'7131bf7b-a388-40b2-93c6-c8be12927ea3'
        // );
        $key = $meiti[$data['utm']];

        if (!$key) {
            $key = '92768f7c-9d34-401f-83a3-11d3cc8f7cfc';
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
        //A6L
        $senddata['SeriesId'] = "CB3923AB-83BD-48B1-90DC-9C2004D75BA9";
        $senddata['ModelId'] = "B19D554E-0EC2-4348-BAA3-3167FB60A9D1";

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
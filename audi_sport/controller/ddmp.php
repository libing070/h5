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
           'm42' => '92768f7c-9d34-401f-83a3-11d3cc8f7cfc',
       );
        // $meiti=array(
        //     'm42'=>'ca125eea-d538-4437-abd6-081bc489bcc2',
        //     'm44'=>'d820dd74-ae75-47ce-8ce5-0e5dbc24245f',
        //     'm45'=>'d21530c2-6404-4a07-92bf-9147c1af8ff8',
        //     'm46'=>'afd88789-3c07-4743-865e-e47fe6f70c50',
        //     'm47'=>'4d46c718-b717-42a0-8cf1-3833f48c5739',
        //     'm48'=>'93dcaea7-0065-421e-9818-eeb9040553e6',
        //     'm49'=>'dbbf2c23-d702-4c96-9900-78d25f4ad0b6',
        //     'm50'=>'baaebe44-4fce-4787-9269-3f0e380e5178',
        //     'm51'=>'d59436d9-ad7f-4502-8382-1713a1460f89',
        //     'm62'=>'e987b4af-1c6a-42bc-a2f5-5f67e3a93c7f',
        //     'm63'=>'53b61699-0f2d-4e37-a009-35e7340f69ee',
        //     'm64'=>'f89f8711-9e66-46ff-834b-4076be50ab59',
        //     'm65'=>'3960f37d-5df0-4c33-9ad0-1fda5c07b0a1',
        //     'm66'=>'79f027a9-a0c4-46fc-a14d-aa01b3c53d8b',
        //     'm67'=>'219da29a-3706-4e1e-be66-3b779e3233b9',
        //     'm68'=>'0e6c9042-7842-478e-9a07-25c63d623802',
        //     'm69'=>'51c00dd4-4f3d-448b-aecc-8b725e71cb8d',
        //     'm70'=>'8235179b-033d-482b-a0aa-4b401a945b59',
        //     'm71'=>'d193e6f8-2c0d-4507-a5c1-c9d01968e370',
        //     'm72'=>'e761f1c4-760c-4e3c-b95e-c481eb8ed470'
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
        $senddata['SeriesId'] = "A8F3678E-FC3A-493D-9DF0-A4988193074A";
        $senddata['ModelId'] = "BB24F339-63D3-482C-A61F-DD525E6E1E81";

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
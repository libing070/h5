<?php

class Ddmp {

    private static $test = 0;
    
    
    function inturl()
    {
        if (self::$test) {
            //$url = "http://106.75.119.170:2101/";
        }else{
            //正式地址
            //$url="http://120.132.70.217/";
            $url="http://117.50.108.37:2101/";
        }
        return $url;
    }

    function send($data)
    {
        $utm = $data['utm'];
        $channel_id = $data['channel'];
        if (!$utm) {
           $utm = 'm453';
        }
        if (!$channel_id) {
           $channel_id = '1';
        }
        $key = $utm."_".$channel_id;
        
        $meiti_test = array(
           'm453_1' => 'BD78A7D6-5A34-40B4-AAA6-28FFB2FB113F',
        );
       
        $meiti = [
            'm449_1' => 'ABBCFEA3-E58E-44F7-906C-620DB0676953',
            'm449_2' => '292BC657-1347-4CD6-B4CC-618C9163B7E9',
            'm449_3' => '7422B211-E08E-4AB5-8100-3FDFDA656B1C',
            'm449_4' => 'B60825AA-9486-470D-A7BD-C3CDAD35D2F7',
            'm449_5' => '7320EE0A-C1D7-4A46-97AC-81AA8325C786',
            'm449_6' => 'F284A5FF-89ED-42D0-9864-E9E3C361CC15',
            'm449_7' => 'A62A9B29-3A3E-4A4B-8FFC-3F59805022EF',
            'm449_8' => '813219DF-7D6B-43C7-A685-C7BF4B8C1130',
            'm449_9' => '93896637-111C-4AC2-971B-531AD5ADA076',
            'm449_10' => '6378298D-4A0C-4E07-AEEC-AD997572786A',
            'm450_1' => 'DE2F1B1A-0474-4106-9CF1-D5B745D388E6',
            'm450_2' => 'C024B801-D6AC-41CC-9159-9FBC88458CF5',
            'm450_3' => '7E03247E-7A44-4CEF-9360-106DAF1489CE',
            'm450_4' => '415171A4-34AE-4E31-B09E-465EA8BE8583',
            'm450_5' => '110BC3A4-FA9E-48FC-ABA2-751CD3D29EF3',
            'm450_6' => '9DC21C18-0BF1-44C3-AE4E-29F11A346E55',
            'm450_7' => 'D7FC2B1E-35BA-4DDB-97AD-49A8167C7898',
            'm450_8' => '01C1830A-76FE-4EBD-8EF0-1D0C3DF5D064',
            'm450_9' => 'E2A809A6-B576-4BBF-8F73-54F02A014BD3',
            'm450_10' => 'F56D043B-2C9B-44E6-BAEE-15EC366357C5',
            'm450_11' => 'A23C7931-B049-4144-BF07-D82AB4AD99A1',
            'm450_12' => '9D483AEC-4649-4993-B1F4-63C28CF7D415',
            'm450_13' => 'D6F91E5B-94B9-4965-B4F1-658821C629FC',
            'm451_1' => '0E506108-D901-48C9-A1DD-E6AC4558D234',
            'm451_2' => '931227A0-E876-4248-AD5B-591637E72055',
            'm451_3' => '4B0F9795-4C91-4F5D-959A-72795D26881A',
            'm451_4' => '11CB4C62-6730-4C98-984D-E90706B5858A',
            'm451_5' => '54D20720-EF70-4BFE-8233-42D739C650EF',
            'm452_1' => '34B7DF81-9E4A-43AF-8600-691EF048DE74',
            'm452_2' => 'CC00997E-7024-4EC5-B7B0-24FA3959FF13',
            'm452_3' => 'FE6D13F0-3BA1-4703-9271-2080CD852BF7',
            'm452_4' => '86C8D5EA-37F6-4A2C-A876-A93C8B925377',
            'm452_5' => 'D9DACCC7-122D-43BC-9A51-51BC3A31E837',
            'm452_6' => 'B43361E8-97B2-4AA0-8614-62AA3BCA453E',
            'm452_7' => '89F6E13A-26E8-41E5-8B84-D10F4F3EA650',
            'm452_8' => 'AE39C1A7-2DCD-4EA4-B3E8-26E8D107ED6F',
            'm452_9' => '9DAE8736-2227-4DB9-986A-B94CC8700891',
            'm452_10' => '4990B100-7ED3-4A26-AB02-853544F98799',
            'm452_11' => 'F1946DB2-8FFE-46CD-A646-DF6D898D8231',
            'm452_12' => 'EC639583-3F12-4B7A-A0D1-FA8E52B05BAA',
            'm452_13' => 'B5509CE0-D4BB-4598-B94B-40C9F57D48BB',
            'm453_1' => '4D789EE1-FF2B-4228-BED3-5372A1514E5C',
            'm454_1' => 'E1AA12A0-FB69-41D8-AD4D-D3FEE2F1FEF5',
            
            'ym449_1' => '9AC60CEB-7300-497F-82B9-CE1A2FA63FC4',
            'ym450_1' => '9AC60CEB-7300-497F-82B9-CE1A2FA63FC4',
            'ym451_1' => 'AB04E74D-2D50-42F9-8F07-EC6B59CF5B94',
            'ym452_1' => '1DD515EA-4B90-40C0-9544-CE3003A3F0CA',
            'ym453_1' => 'BD78A7D6-5A34-40B4-AAA6-28FFB2FB113F',
            'ym454_1' => 'BD78A7D6-5A34-40B4-AAA6-28FFB2FB113F',
        ];
       
        if (self::$test) {
            if (!isset($meiti_test[$key])) {
                $key = $meiti_test['m453_1'];
            }else{
                $key = $meiti_test[$key];
                if (!$key) {
                    $key = $meiti_test['m453_1'];
                }
            }
        }else{
            $key = $meiti[$key];
            if (!$key) {
                $key = $meiti['m453_1'];
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
        if ($car=='a6l') {
            $senddata['SeriesId'] = "9ACA891B-9CED-4E68-8E59-D17F209C53AD";
            $senddata['ModelId'] = "3e9d353f-e1d0-4632-ae24-f2dac97b11a2";
        }elseif ($car=='q5l') {
            $senddata['SeriesId'] = "CB3923AB-83BD-48B1-90DC-9C2004D75BA9";
            $senddata['ModelId'] = "B19D554E-0EC2-4348-BAA3-3167FB60A9D1";
        }elseif ($car=='a4l') {
            $senddata['SeriesId'] = "9D5EB2B2-BD01-4154-99C4-487405AFC352";
            $senddata['ModelId'] = "653AF3B3-CBB6-40A8-AE60-C60315ADD98E";
        }else {
            $senddata['SeriesId'] = "9ACA891B-9CED-4E68-8E59-D17F209C53AD";
            $senddata['ModelId'] = "3e9d353f-e1d0-4632-ae24-f2dac97b11a2";
        }
        if (isset($data['time'])) {
            $senddata['OrderTime'] = $data['time'];
        }

        $datas = array(
            'authentication' => $authentication,
            'datas' => array($senddata)
        );
        $ret = self::postinfo($url, $datas, 'POST');
        $result = [];
        $result['code'] = 0;
        $result['msg'] = "成功";
        $result['ddmp'] = $ret;
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
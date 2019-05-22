<?php


if(empty($_COOKIE["SESSIONUSER"])){
    echo "<script type='text/javascript'>";
    echo "window.location.href='login.php'";
    echo "</script>";
    exit;
}

function db_query($sql)
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

$sql = "select name as '姓名',type as '类型',sex as '性别',mobile as '手机号',weixin as '微信',qq as 'QQ',plat as '平台',skill as '技能',source as '来自',department as '部门/经销商', createAt as '时间' from zxjh_user  order by createAt asc";
$data = db_query($sql);

$string = "";
foreach ($data as $key => $value) {
    if ($key === 0) {
        $i = 1;
        $index = 0;
        $headlist = array();
        foreach ($value as $k => $val) {
            if ($i % 2 == 0) {
                $headlist[$index] = iconv('utf-8', 'gbk', $k);
                $index = $index + 1;
            }
            $i = $i + 1;
        }
        $string .= implode(",", $headlist) . "\n";
    }
    $row = array();
    $a = 1;
    $index2 = 0;
    foreach ($value as $k => $val) {
        if ($a % 2 == 0) {
            if ($index2 == 1) {
                $temp = "成为kol";
                if ($val == 1) {
                    $temp = "参加活动";
                }
                $row[$index2] = iconv('utf-8', 'gbk', $temp);
            } elseif ($index2 == 6) {
                $plats = json_decode($val);
                $num = count($plats);
                $temp = "";
                for ($i = 0; $i < $num; ++$i) {
                    if ($i == ($num - 1)) {
                        $temp = $temp . "平台：" . $plats[$i]->name . "  账号:" . $plats[$i]->id . "  昵称:" . $plats[$i]->nickname . "  粉丝:" . $plats[$i]->funs;
                    } else {
                        $temp = $temp . "平台：" . $plats[$i]->name . "  账号:" . $plats[$i]->id . "  昵称:" . $plats[$i]->nickname . "  粉丝:" . $plats[$i]->funs . "|";
                    }
                }
                $row[$index2] = iconv('utf-8', 'gbk', $temp);
            } elseif ($index2 == 7) {
                $val = str_replace(",", "  ", $val);
                $row[$index2] = iconv('utf-8', 'gbk', $val);
            } else {
                $row[$index2] = iconv('utf-8', 'gbk', $val);
            }
            $index2 = $index2 + 1;
        }
        $a = $a + 1;
    }
    $string .= implode(",", $row) . "\n";
}


$filename = date('Ymd') . '.csv'; //设置文件名
header("Content-type:text/csv");
header("Content-Disposition:attachment;filename=" . $filename);
header('Cache-Control:must-revalidate,post-check=0,pre-check=0');
header('Expires:0');
header('Pragma:public');
echo $string;


exit;
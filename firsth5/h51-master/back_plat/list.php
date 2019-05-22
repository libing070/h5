<!doctype html>
<html>
<head>
    <title>管理后台</title>
    <meta charset="utf-8">
    <?php $static_url = "public" ?>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link href="<?php echo $static_url ?>/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="<?php echo $static_url ?>/css/base.css" rel="stylesheet" type="text/css">
</head>

<?php


if (empty($_COOKIE["SESSIONUSER"])) {
    echo "<script type='text/javascript'>";
    echo "window.location.href='login.php'";
    echo "</script>";
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

$cond = "where 1=1 ";
if (!empty($_GET['time'])) {
    $timeParam = "&time=".$_GET['time'];
    $time = $_GET['time'];
    $cond = $cond . "and DATE_FORMAT(createAt,'%Y-%m-%d') = DATE_FORMAT('" . $_GET['time'] . "','%Y-%m-%d')";
}
$sql = "select count(1) as count from zxjh_user " . $cond . " order by createAt asc";
$countRes = db_query($sql);
$data['count'] = $countRes[0]['count'];


$page = 1;
$pageSize = 20;
if (!empty($_GET['page'])) {
    $page = $_GET['page'];
}
$sql = "select * from zxjh_user " . $cond . " order by createAt asc";
$sql = $sql . " limit " . (($page - 1) * $pageSize) . "," . $pageSize;
$data['data'] = db_query($sql);
?>


<body class="main_body">
<nav class="navbar navbar-default  navbar-inverse navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button class="navbar-toggle" type="button" data-toggle="collapse"
                    data-target=".navbar-responsive-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a href="##" class="navbar-brand">管理后台</a></div>
        <div class="collapse navbar-collapse navbar-responsive-collapse">
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown"><a href="#" role="button" class="dropdown-toggle" data-toggle="dropdown"> <span
                                class="glyphicon glyphicon-user"></span>admin <i class="caret"></i> </a>
                    <ul class="dropdown-menu">
                        <li class="divider"></li>
                        <li><a href="login.php">退出</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>

<div class="container-fluid main">
    <div class="col-md-2 ">
        <a href="./export.php" target="_blank" class="btn btn-default">导出所有</a>
    </div>
    <div class="col-md-8">
        <form class="form-inline">
            <div class="form-group">
                <label>日期</label>
                <input type="text" class="form-control Wdate" value="<?php echo $time; ?>"
                       onclick="WdatePicker({dateFmt:'yyyy-M-d'})" name="time" placeholder="查询日期">
            </div>
            <button type="submit" class="btn btn-default">查询</button>
        </form>
    </div>
</div>


<div class="container-fluid main" style="margin-top: 50px;">
    <div class="col-md-2 ">
        <!--        <div class="list-group">-->
        <!--            <a waitingLoad href="./view" class="list-group-item active">记录列表</a>-->
        <!--        </div>-->
    </div>
    <div class="col-md-12">
        <div class="panel panel-default">
            <div class="panel-body">
                <table class="table table-condensed table-hover">
                    <thead>
                    <tr>
                        <th>姓名</th>
                        <th>类型</th>
                        <th>性别</th>
                        <th>手机号</th>
                        <th>微信</th>
                        <th>QQ</th>
                        <th>来自</th>
                        <th>部门<br/>经销商</th>
                        <th>平台</th>
                        <th>技能</th>
                        <th>时间</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php foreach ($data['data'] as $e): ?>
                        <tr>
                            <td><?php echo $e['name']; ?></td>
                            <td>
                                <?php
                                if ($e['type'] == 1) {
                                    echo "参加活动";
                                } else {
                                    echo "成为kol";
                                }
                                ?>
                            </td>
                            <td><?php echo $e['sex']; ?></td>
                            <td><?php echo $e['mobile']; ?></td>
                            <td><?php echo $e['weixin']; ?></td>
                            <td><?php echo $e['qq']; ?></td>
                            <td><?php echo $e['source']; ?></td>
                            <td><?php echo $e['department']; ?></td>
                            <td>
                                <?php
                                $plats = json_decode($e['plat']);
                                $num = count($plats);
                                for ($i = 0; $i < $num; ++$i) {
                                    echo "平台：" . $plats[$i]->name . "，账号:" . $plats[$i]->id . "，昵称:" . $plats[$i]->nickname . "，粉丝:" . $plats[$i]->funs . "<br/>";
                                }
                                ?>
                            </td>
                            <td><?php echo $e['skill']; ?></td>
                            <td><?php echo $e['createAt']; ?></td>
                        </tr>
                    <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
            <?php
            $allNum = $data['count'];
            $pageSize = $pageSize;
            $pageNum = empty($page) ? 1 : $page;
            $endPage = ceil($allNum / $pageSize); //总页数
            ?>

            <div class="row">
                <div class="col-md-12" style="text-align: center;">
                    <div class="dataTables_paginate paging_bootstrap pagination">
                        <ul class="pagination">
                            <li><a href="?page=1<?php echo $timeParam ?>">首页</a></li>
                            <li><a href="?page=<?php echo $pageNum == 1 ? 1 : ($pageNum - 1) ?><?php echo $timeParam ?>">← 上一页</a></li>
                            <li><a href="?page=<?php echo $pageNum == $endPage ? $endPage : ($pageNum + 1) ?><?php echo $timeParam ?>">下一页
                                    → </a></li>
                            <li><a href="?page=<?php echo $endPage ?><?php echo $timeParam ?>">末页</a></li>
                        </ul>
                    </div>
                    <div class="alert alert-info" role="alert">
                        共<span><?php echo $allNum ?></span>条记录，共<span><?php echo $endPage ?></span>页，当前第<span><?php echo $pageNum ?></span>页
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" rel="stylesheet"
        src="<?php echo $static_url ?>/js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" rel="stylesheet"
        src="<?php echo $static_url ?>/js/bootstrap.min.js"></script>
<script type="text/javascript" rel="stylesheet"
        src="<?php echo $static_url ?>/js/common_fun.js"></script>
<script type="text/javascript" rel="stylesheet"
        src="<?php echo $static_url ?>/js/ajaxfileupload.js"></script>
<script type="text/javascript" rel="stylesheet"
        src="<?php echo $static_url ?>/date/WdatePicker.js"></script>
<div class="mask_area">
    <div class="mask"></div>
</div>
<div id="loading">
    <div id="loading-center">
        <div id="loading-center-absolute">
            <div class="object" id="object_one"></div>
            <div class="object" id="object_two"></div>
            <div class="object" id="object_three"></div>
            <div class="object" id="object_four"></div>
            <div class="object" id="object_five"></div>
            <div class="object" id="object_six"></div>
            <div class="object" id="object_seven"></div>
            <div class="object" id="object_eight"></div>
        </div>
    </div>
</div>


</body>
</html>

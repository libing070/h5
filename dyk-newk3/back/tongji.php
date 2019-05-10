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


$sql = "select time,count,(select count(a.uid) as count from dyk_k3_user a where FROM_UNIXTIME(a.create_at,'%Y-%m-%d')=aa.time  and a.`status`!=1 ) as fail from (
select 
FROM_UNIXTIME(b.create_at,'%Y-%m-%d') as time,
count(b.uid) as count
from dyk_k3_user b where b.status=1  group by FROM_UNIXTIME(b.create_at,'%Y-%m-%d')  order by FROM_UNIXTIME(b.create_at,'%Y-%m-%d') asc
) aa";
$data['data'] = db_query($sql);



$sql = "select sum(zan_num) as zanNUm,sum(view_num) as viewNum from dyk_k3_user";
$countRes = db_query($sql);
$data['zanNUm'] = $countRes[0]['zanNUm'];
$data['viewNum'] = $countRes[0]['viewNum'];



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


<div class="container-fluid main" style="margin-top: 50px;">
    <div class="col-md-2 ">
        <a href="./list.php" class="list-group-item">通过列表</a>
        <a href="./listForLitter.php" class="list-group-item">回收站</a>
        <a href="./listForValid.php" class="list-group-item">待审核</a>
        <a href="./listForFaild.php" class="list-group-item">淘汰</a>
        <a href="./tongji.php" class="list-group-item active">统计</a>
    </div>
    <div class="col-md-10">
        <div class="panel panel-default">
            <div class="panel-body">
                <p class="bg-warning">总点赞：<strong><?php echo $data['zanNUm'] ?></strong></p>
                <p class="bg-warning">总阅读：<strong><?php echo $data['viewNum'] ?></strong></p>
                <div class="table-responsive">
                    <table class="table table-condensed table-hover text-center">
                        <thead>
                        <tr>
                            <th>时间</th>
                            <th>通过人数</th>
                            <th>未通过人数</th>
                        </tr>
                        </thead>
                        <tbody>
                        <?php foreach ($data['data'] as $e): ?>
                            <tr>
                                <td><?php echo $e['time']; ?></td>
                                <td><?php echo $e['count']; ?></td>
                                <td><?php echo $e['fail']; ?></td>
                            </tr>
                        <?php endforeach; ?>
                        </tbody>
                    </table>
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

<div class="modal fade" id="mymodal-data" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                    <span class="sr-only">Close</span></button>
                <h4 class="modal-title">操作提示</h4>
            </div>
            <div class="modal-body">
                <p class="tip-content"></p>
            </div>
            <div class="modal-footer" id="alert-content" style="display:none">
                <button type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
            </div>
            <div class="modal-footer" id="conform-content" style="display:none">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="conform-but">确定</button>
            </div>
        </div>
    </div>
</div>


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


<script>
    $(function () {


    })
</script>


</body>
</html>

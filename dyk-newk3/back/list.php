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

date_default_timezone_set("PRC");

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

$cond = "where 1=1  and status=1";
if (!empty($_GET['time'])) {
    $timeParam = "&time=" . $_GET['time'];
    $time = $_GET['time'];
    $cond = $cond . " and create_at >= unix_timestamp('".$time."')";
    $cond = $cond . " and create_at < unix_timestamp(DATE_ADD(str_to_date('".$time."', '%Y-%m-%d'),INTERVAL 1 DAY))";
}
if (!empty($_GET['content'])) {
    $contentParam = "&content=" . $_GET['content'];
    $content = $_GET['content'];
    $cond = $cond . " and content like '%".$content."%'";
}
$sql = "select count(1) as count from dyk_k3_user " . $cond . " order by create_at desc";
$countRes = db_query($sql);
$data['count'] = $countRes[0]['count'];

$page = 1;
$pageSize = 10;
if (!empty($_GET['page'])) {
    $page = $_GET['page'];
}
$sql = "select * from dyk_k3_user " . $cond . " order by sort_num desc,create_at desc";
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
    <div class="col-md-offset-2 col-md-8">
        <form class="form-inline">
            <div class="form-group">
                <label>日期</label>
                <input type="text" class="form-control Wdate" value="<?php echo $time; ?>"
                       onclick="WdatePicker({dateFmt:'yyyy-M-d'})" name="time" placeholder="查询日期">
            </div>
            &nbsp; &nbsp; &nbsp;
            <div class="form-group">
                <label>内容</label>
                <input type="text" class="form-control" value="<?php echo $content; ?>" name="content" placeholder="内容">
            </div>

            <button type="submit" class="btn btn-default">查询</button>
        </form>
    </div>
</div>


<div class="container-fluid main" style="margin-top: 50px;">
    <div class="col-md-2 ">
        <a href="./list.php" class="list-group-item active">通过列表</a>
        <a href="./listForLitter.php" class="list-group-item">回收站</a>
        <a href="./listForValid.php" class="list-group-item">待审核</a>
        <a href="./listForFaild.php" class="list-group-item">淘汰</a>
        <a href="./tongji.php" class="list-group-item">统计</a>

    </div>
    <div class="col-md-10">
        <div class="panel panel-default">
            <div class="panel-body">
                <div class="table-responsive">
                    <table class="table table-condensed table-hover">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>名称</th>
                            <th>性别</th>
                            <th>职位</th>
                            <th>手机号</th>
                            <th>购车时间</th>
                            <th>内容</th>
                            <th>阅读数</th>
                            <th>点赞数</th>
                            <th>图片</th>
                            <th>创建时间</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <?php foreach ($data['data'] as $e): ?>
                            <tr>
                                <td><?php echo $e['uid']; ?></td>
                                <td><?php echo $e['name']; ?></td>
                                <td><?php if ($e['sex'] == 1) {
                                        echo "男";
                                    } else {
                                        echo "女";
                                    } ?>
                                </td>
                                <td><?php echo $e['job']; ?></td>
                                <td><?php echo $e['mobile']; ?></td>
                                <td><?php echo date("Y", $e['buy_time']); ?></td>
                                <td><?php echo $e['content']; ?></td>
                                <td><?php echo $e['view_num']; ?></td>
                                <td><?php echo $e['zan_num']; ?></td>
                                <td>
                                    <img src="<?php echo "http://h5tt.skyengine.cn/image/" . $e['attach']; ?>"
                                         style="width: 100px;" alt="..."
                                         class="img-rounded">
                                </td>
                                <td><?php echo date("m-d H:i:s", $e['create_at']); ?></td>
                                <td>
                                    <button tag="<?php echo $e['uid']; ?>" type="button"
                                            class="btn btn-danger btn-xs btn-huishou">丢回收站
                                    </button>
                                    <button tag="<?php echo $e['uid']; ?>" type="button"
                                            class="btn btn-warning btn-xs btn-taotai">淘汰
                                    </button>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
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
                            <li>
                                <a href="?page=<?php echo $pageNum == 1 ? 1 : ($pageNum - 1) ?><?php echo $timeParam ?>">←
                                    上一页</a></li>
                            <li>
                                <a href="?page=<?php echo $pageNum == $endPage ? $endPage : ($pageNum + 1) ?><?php echo $timeParam ?>">下一页
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
        $('.btn-huishou').on('click', function () {
            var uid = $(this).attr('tag');
            myConfirm("确定要放入回收站吗?", function () {
                $.localAjax('update.php',{uid:uid,status:2},function(res){
                    alert('保存成功',function(){
                        history.go(0);
                    });
                })
            })
        })


        $('.btn-taotai').on('click', function () {
            var uid = $(this).attr('tag');
            myConfirm("确定要淘汰吗?", function () {
                $.localAjax('update.php',{uid:uid,status:3},function(res){
                    alert('保存成功',function(){
                        history.go(0);
                    });
                })
            })
        })


    })

</script>


</body>
</html>

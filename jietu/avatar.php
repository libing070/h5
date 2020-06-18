<?php
$url = $_GET['url'];
$openid = $_GET['openid'];
if (file_exists(dir(__FILE__)."/avatar/".$openid)==false) {
    $content = file_get_contents($url);
    $status = file_put_contents(dirname(__FILE__)."/avatar/".$openid, $content);
}
echo 1;
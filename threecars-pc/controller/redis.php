<?php

require_once dirname(__FILE__)."/tools.php";

class CacheTools {
    
    private $redis = null;
    
    function __construct() {
        if(class_exists("Redis")) {
            $this->redis = new Redis();
            $this->redis->connect('127.0.0.1', 3306);
        }else{
            $this->redis = null;
            echo "Redis类不存在";
        }
    }
    
    public function get($key, $callback) {
        if ($this->redis==null) {
            return $callback($key);
        }
        $data = $this->redis->get($key);
        if ($data==null || $data=="null") {
            $data = $callback($key);
            $this->redis->set($key, $data);
        }
        return $data;
    }
}

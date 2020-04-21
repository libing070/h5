# Galaxy-Jeep 前端代码库

## Team members
* 产品：洪旭
* 前端：张梦珂、白延云、黄媛洁
* 后端：冯冉

## Build Setup
``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8081
yarn run dev

# build for production with minification
yarn run build

# visualize output files
npm run build --report

```

## Tech Stack
* Vue @ 2.5.2
* Vue-Router
* Axios
* eCharts @ 3.7.2
* Vue-cli
* ES6
* Element-UI @ 2.0.4
* Less
* Animate.CSS
* MomentJS
* Font-Awesome
* MockJS
* Yarn

## Notes
* echarts3.7.2.js和dataTool.js源码被修改过，修改处有`//huangyuanjie`注释，如有疑问，请联系张梦珂或者是黄媛洁
* 本项目开发分支是master分支
* 正式版地址：http://jeep.bitsmart.com.cn/#/sign-in
* 前端部署的IP：172.16.224.93
* 前端部署的主机名：172.16.224.93-jcpt_mysql_l-YG
* 前端代码上传信息：jms.cig.com.cn  20173 域账号 域密码
* 前端代码上传路径：/tmp
* 前端部署路径：/data/www/jeep.bitsmart.com.cn
* 前端服务器：nginx
* 前端部署指南：将dist文件夹通过堡垒机上传到172.16.224.93-jcpt_mysql_l-YG，然后登录堡垒机，登录172.16.224.93，进入到前端部署路径，然后执行deployjeep.sh脚本，上线完成


## Useful Links
* 产品需求文档：请查看本地文档
* [慧星2.0 接口文档](http://192.168.55.49:8090/pages/viewpage.action?pageId=3643076)
* [慧星2.0 前端部署上线指南](http://192.168.55.49:8090/pages/viewpage.action?pageId=5636276)
* [百度地图 javascript API](http://lbsyun.baidu.com/index.php?title=jspopular)
* [热力图插件API](http://api.map.baidu.com/library/Heatmap/2.0/docs/symbols/BMapLib.HeatmapOverlay.html)
* [axios官网](https://github.com/mzabriskie/axios)
* [Vue-cli使用指南](http://vuejs-templates.github.io/webpack/)


## Best Practice
* 安装或删除模块请使用Yarn命令 ！！！
* 安装依赖包：Yarn add XXX
* 卸载依赖包：Yarn remove XXX
* 所有组件文件名首字母大写

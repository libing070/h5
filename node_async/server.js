const express = require('express');
const app = express();// express.static 提供静态文件，就是html, css, js 文件
app.use(express.static('public'));
var router=require('./controllers/index');
app.use('/api', router);

app.listen(3001, () => {
    console.log('server start');
})
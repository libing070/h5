const fs=require('fs');

const str='我是写入的内容';

//写入文件
fs.writeFile('./writeFile.txt',str,function(err){
    if(err){
        throw err;
    }
    console.log("写入成功！");
})


//读取文件

fs.readFile('./writeFile.txt',function(err,data){
    if(err){
        throw err;
    }
    // 定义一个变量 保存读取结果
    var readRst = data.toString();//二进制数据流转字符串
    console.log(readRst);
})

//删除文件
// fs.unlink('./removeFile.txt',function(err){
//     if(err){
//         throw err;
//     }
//     console.log("删除成功！");
// });

//删除空的文件夹
// fs.rmdir('./dir', function (err) {
//     if (err) {
//         throw err;
//     } else {
//         console.log('删除空文件夹成功')
//     }
// })
fs.rename('./writeFile.txt','./writeFile2.txt',(err)=>{
    if(err) throw err;
    fs.stat('./writeFile2.txt',(err,stats)=>{
        if(err) throw err;
        console.log(`文件属性：${JSON.stringify(stats)}`);
    })
});
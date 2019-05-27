 async function timeout() {
   return "timeout hello world";
};
timeout().then(result=>{
    console.log(result);
});
console.log('虽然在后面，但是我先执行');
console.log('\n');



async function fun1(flag) {
    if(flag){
        return 'fun1 hello world'
    }else {
        throw 'fun1 failure'
    }
};
console.log(fun1(true));
console.log(fun1(false));

fun1(true).then(res=>{
    console.log(res);
});
 fun1(false).catch(err=>{
   console.log(err);
});
 console.log('\n');


 // 2s之后返回双倍值
 function doubleAfter2seconds(num) {
     return new Promise((resolve,reject)=>{
         setTimeout(()=>{
             resolve(2*num);
         },2000)
     });
 };

 function aa() {
     console.log('aaaaa');
 };
 async function testResult() {
     let result1=await doubleAfter2seconds(30);
     let result2=await doubleAfter2seconds(result1);
     let result3=await doubleAfter2seconds(result2);
     console.log(result1);
     console.log(result2);
     console.log(result3);
     aa();
 };

 testResult();
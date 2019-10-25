// console.log(['1', '3', '10'].map(parseInt));
// console.log(['1', '3', '10'].map((value, index, array) => parseInt(value, index)));
//
// ['1', '3', '10'].map(function (value, index, array) {
//     console.log(value+' '+index+' '+array);
//     return parseInt(value, index)
// });
//
// var number = 10;
//
// function fn() {
//     console.log(this.number);
// }
//
// var obj = {
//     number: 2,
//     show: function (fn) {
//         this.number = 3;
//         fn();
//         arguments[0]();
//     }
// };
// obj.show(fn);
//
// console.log(parseInt(3,1))


// (function (a,b,c) {
//     arguments[0]='hello';
//     for(var i=0;i<arguments.length;i++){
//         console.log(arguments[i]);
//     }
//     console.log(arguments.callee);
// })(1,2,3,4);


// function test() {
//     var s = "";
//     for (var i = 0; i < arguments.length; i++) {
//
//         s += arguments[i] + ",";
//     }
//   console.log(s);
// }
// test();
// test("name", "age");
// test("name", "age",'libing');//模拟重载

//
// var sum = function (n) {
//     if (1 == n) {
//         return 1;
//     } else {
//        return n + arguments.callee(n - 1); //6 5 4 3 2 1
//     }
// }
// console.log(sum(6));


// var length = 10;
// function fn() {
//
//     console.log(this.length);
// }
//
// var obj = {
//     method: function(fn) {
//         fn();
//         arguments[0]();
//     }
// };
//
// obj.method(fn, 1);

var name='libing',age=26;
var obj={
    name:'zhang',
    objAge:this.age,
    myFun:function (address) {
        console.log(this.name+','+this.age,address);
    }
}
var db={
    name:'sssss',
    age:12,
}
obj.myFun.call(db,'北京');
obj.myFun.apply(db,['上海']);
obj.myFun.bind(db)();


async function a() {
    var result = Promise.resolve();
    result.abort = function() {
        console.log('xxx');
    };
    return result;
}
var p = a();
p.abort();

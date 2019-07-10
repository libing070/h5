var Calculator=function () {

};
Calculator.prototype={
    add:function (x,y) {
        return x+y;
    },
    substract:function (x,y) {
        return x-y;
    }
};
console.log(new Calculator().add(8,2));

var Person=function(){};
Person.prototype=function () {
    add=function (x,y) {
        return x+y;
    };
    subtract=function (x,y) {
        return x-y;
    };
    return {
        add:add,
        subtract:subtract
    }
}();
console.log(new Person().subtract(8,2));//https://www.cnblogs.com/Yirannnnnn/p/4896542.html
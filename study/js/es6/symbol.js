let s=Symbol();
console.log(typeof s);

const obj={
    toString(){
        return 'abc';
    }
}
const  sym=Symbol(obj);

console.log(sym);

let s1=Symbol();
let s2=Symbol();

console.log(([][[]] + [])[+!![]] + ([] + {})[!+[] + !![]]);
console.log((!(~+[]) + {})[--[~+''][+[]] * [~+[]] + ~~!+[]] + ({} + [])[[~!+[]] * ~+[]]);
console.info("%c哈哈", "color: #3190e8; font-size: 30px; font-family: sans-serif");

function randomStr(n) { let standard = 'abcdefghijklmnopqrstuvwxyz9876543210' ;
let len = standard.length ;
let result = '';
for (let i = 0; i < n; i++) { result += standard.charAt(Math.floor(Math.random() * len)) } return result}//随机生成指定长度的字符串
function getRandomColor() { return `#${Math.random().toString(16).substr(2, 6)}`}//产生随机颜色
function randomOne(arr) { return arr[Math.floor(Math.random() * arr.length)]}//随机获取数组的一个成员
function minArr(arr) { return Math.min.apply(null, arr)}//数组最小值
function maxArr(arr) { return Math.max.apply(null, arr)}//数组最大值
//ES6Array.from(new Set(arr))// ES5arr.filter(function(ele, index, array){ return index===array.indexOf(ele)})//数组去重
arr.slice(0)//克隆数组
function factorial(n) { return (n > 1) ? n * f(n - 1) : n}//递归求阶乘
function sameSign(a, b) { return (a ^ b) >= 0}//判断符号是否相同
function isInt(x) { return (x ^ 0) === x}// return Math.round(x) === x// return (typeof x === 'number') && (x % 1 === 0)// ES6 -> Number.isInteger()//判断 x 是否是整数
var temp = a; a = b; b = temp; //(传统，但需要借助临时变量)
a ^= b; b ^= a; a ^= b; //(需要两个整数)
b = [a, a = b][0] //(借助数组)
    [a, b] = [b, a]; //(ES6，解构赋值)
a = a + b; b = a - b; a = a - b; //(小学奥赛题)
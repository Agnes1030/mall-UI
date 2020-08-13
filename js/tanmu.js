//根据id查找页面元素
function $id(id) {
    return document.getElementById(id);
}

//获取任意区间值
function rand(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

//随机颜色值获取
function getColor() {
    var str = "0123456789abcdef";
    var color = "#";
    for (var i = 1; i <= 6; i++) {
        color += str.charAt(rand(0, 15));
    }
    return color;
}

//日期时间格式封装
function dateToString(sign) {
    //如果用户不传递任何参数  默认日期间隔符号是  -
    sign = sign || "-";//如果sign是未定义，就按默认值 "-"
    var d = new Date();
    var y = d.getFullYear();
    var m = toTwo(d.getMonth() + 1);
    var _date = toTwo(d.getDate());
    var h = toTwo(d.getHours());
    var min = toTwo(d.getMinutes());
    var s = toTwo(d.getSeconds());
    return y + sign + m + sign + _date + " " + h + ":" + min + ":" + s;
}

//如果得到的是小于10的数 就 拼接0
function toTwo(val) {
    return val < 10 ? "0" + val : val;
}

//定义一个时间差函数
function timeDiff(start, end) {
    return Math.abs(start.getTime() - end.getTime()) / 1000;
}

//动态创建元素
function createEle(ele) {
    return document.createElement(ele);
}

function startMove(obj, json, fn) {  //  {"width":300,"height":300}
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;// 当开关变量的值为 true时，运动结束，可以停止定时器了
        for (var attr in json) {
            var current = 0;
            if (attr == "opacity") {
                //操作透明度
                current = parseFloat(getStyle(obj, attr)) * 100;
            } else if (attr == "zIndex") {
                current = parseInt(getStyle(obj, attr));//操作空间定位
            } else {

                //操作的是带有像素值的样式
                current = parseInt(getStyle(obj, attr));//获取当前操作对象的实际值
            }
            var speed = (json[attr] - current) > 0 ? 1 : -1;
            //speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
            if (json[attr] != current) {
                //如果目标值 和 当前操作的样式值不相等，就不能停止定时器
                flag = false;
            }
            //上面的条件不满足  继续执行运动
            if (attr == "opacity") {
                //操作透明度
                obj.style.opacity = (current + speed) / 100;
            } else if (attr == "zIndex") {

                obj.style.zIndex = json[attr];

            } else {
                //操作的是带有像素值的样式
                obj.style[attr] = current + speed + "px";

            }
        }
        //如果flag为true   就停止定时器
        if (flag) {
            clearInterval(obj.timer);
            //一个动作完成后,进入下一个动作(也就是要调用下一个函数)
            if (fn) { //判断如果有函数传递过来，就调用
                fn();
            }
        }

    }, 10)
}

function getStyle(obj, attr) {
    return window.getComputedStyle ? window.getComputedStyle(obj, false)[attr] : obj.currentStyle[attr];
}

$id("sendCon").onclick = function () {
    var oSpan = createEle("span");
    oSpan.innerHTML = $id("text").value;
    $id("content").appendChild(oSpan);
    oSpan.style.top = rand(0, 270) + "px";
    var w = oSpan.offsetWidth;

    startMove(oSpan, {"left": -w}, function () {
        oSpan.remove();
    });
}
$id("hideCon").onclick = function () {
    $id("content").style.opacity = 0;
}
$id("showCon").onclick = function () {
    $id("content").style.opacity = 1;
}
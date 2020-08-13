window.onload = function () {
    var canvas = document.querySelector("#clock");
    document.getElementById("msg").innerHTML=getcode(4);

    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        move();
        setInterval(move, 1000);

        function move() {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除画布
            ctx.save();
            // 初始化样式
            ctx.translate(100, 100);
            ctx.scale(0.5, 0.5);
            ctx.rotate(-90 * Math.PI / 180);
            ctx.lineWidth = "8";
            ctx.strokeStyle = "black";
            ctx.lineCap = "round";
            ctx.beginPath();

            // 外层空心圆盘
            ctx.save();
            ctx.lineWidth = 14;
            ctx.strokeStyle = "#325FA2";
            ctx.beginPath();
            ctx.arc(0, 0, 70, 0, 360 * Math.PI / 180);
            ctx.stroke();
            ctx.restore();

            // 时针刻度
            ctx.save();
            ctx.beginPath();
            for (var i = 0; i < 12; i++) {
                ctx.rotate(30 * Math.PI / 180);
                ctx.moveTo(60, 0);
                ctx.lineTo(50, 0);

            }
            ctx.stroke();
            ctx.restore();

            // 分针刻度
            ctx.save();
            ctx.lineWidth = 3;
            ctx.beginPath();
            for (var i = 0; i < 60; i++) {
                if (i % 5 != 0) {
                    ctx.moveTo(60, 0);
                    ctx.lineTo(58, 0);
                }
                ctx.rotate(6 * Math.PI / 180);
            }
            ctx.stroke();
            ctx.restore();

            // 时针、分针、秒针、钟座
            var date = new Date();
            var s = date.getSeconds();
            var m = date.getMinutes() + s / 60;
            var h = date.getHours() + m / 60;
            h = h > 12 ? h - 12 : h;

            // 时针
            ctx.save();
            ctx.lineWidth = 7;
            ctx.rotate(h * 30 * Math.PI / 180);
            ctx.beginPath();
            ctx.moveTo(-20, 0);
            ctx.lineTo(40, 0);
            ctx.stroke();
            ctx.restore();

            //分针
            ctx.save();
            ctx.lineWidth = 5;
            ctx.rotate(m * 6 * Math.PI / 180);
            ;
            ctx.beginPath();
            ctx.moveTo(-28, 0);
            ctx.lineTo(56, 0);
            ctx.stroke();
            ctx.restore();

            // 秒针
            ctx.save();
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#D40000";
            ctx.fillStyle = "#D40000";
            ctx.rotate(s * 6 * Math.PI / 180);
            ctx.beginPath();
            ctx.moveTo(-30, 0);
            ctx.lineTo(42, 0);
            ctx.stroke();
            // 中心实心圆盘
            ctx.beginPath();
            ctx.arc(0, 0, 10, 0, 360);
            ctx.fill();

            // 秒针针头
            ctx.beginPath();
            ctx.arc(48, 0, 5, 0, 360);
            ctx.stroke();
            ctx.restore();

            ctx.restore();
        }
    }
}
var code;
function getcode(n) {
    code="";
    var s="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for(var i=0;i<n;i++){
        var index=Math.floor(Math.random()*62);
        code += s.charAt(index);
    }
    return code;
}
function yanzheng() {
    var inputCode=document.getElementById("input").value;
    if(inputCode<=0)alert("请输入验证码：");
    else if(inputCode!=code){
        alert("输入有误");
        window.location.reload();//窗口重新加载
    }
    else alert("通过");
}
window.onload = function () {
    var price = document.getElementById("price");//dom体系
    var hide = document.getElementById("hide");
    var mya = document.querySelectorAll("#hide a");//api体系，按照css样式写的
    var ul = document.querySelector(".main ul");
    var list = document.querySelectorAll(".main ul li");

    //创建一个二维数组模型
    arr = new Array();
    for (var i = 0; i < list.length; i++) {
        arr[i] = [];
        arr[i][0] = list[i].querySelector("img").src;
        arr[i][1] = list[i].querySelector("p").innerHTML;
        arr[i][2] = list[i].querySelector("span").innerHTML;
    }


//设置price鼠标事件
    price.onmouseover = function () {
        hide.style.display = "block";
    }
    price.onmouseout = function () {
        hide.style.display = "none";
    }
    //设置a标签对象的点击事件
    for (var i = 0; i < mya.length; i++) {
        mya[i].index = i;
        mya[i].onclick = function () {
            mysort(this.index);
        }
    }

    //排序函数 数组本身就有排序
    function mysort(f) {
        if (f) {
            arr.sort(function (a, b) {
                return a[2] - b[2];//低到高，升序
            });
        } else {
            arr.sort(function (a, b) {
                return b[2] - a[2];
            });
        }
        //处理main中的ul
        ul.innerHTML = '';
        for (var i = 0; i < list.length; i++) {
            ul.innerHTML += "<li><img src='" + arr[i][0] + "'><p>" + arr[i][1] +
                "</p ><div class='text'>￥<span>" + arr[i][2] + "</span></div></li>"
        }
    }

}
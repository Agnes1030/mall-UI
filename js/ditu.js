var $addressBox = document.getElementById('addressBox');
var $pointBox = document.getElementById("pointBox");

//创建地图
var map = new AMap.Map("mapBox", {
    resizeEnable: true,
    center: [116.397428, 39.90923],
    zoom: 14
});

//打印当前经纬度
function addCenterPoint() {
    var centerPoint = map.getCenter();
    $pointBox.innerHTML = "当前经纬度为：" + centerPoint.getLng() + ',' + centerPoint.getLat();
}

addCenterPoint();

function geocoder() {
    var myGeo = new AMap.Geocoder();
    //地理编码,返回地理编码结果
    myGeo.getLocation($addressBox.value, function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
            //地址解析成功
            geocoder_CallBack(result);
        } else {
            //地址解析失败
            $pointBox.innerHTML = "查无此地址";
        }
    });
}

//地理编码返回结果展示
function geocoder_CallBack(data) {
    var resultStr = "";
    var geocode = data.geocodes;
    var myLng = geocode[0].location.getLng();
    var myLat = geocode[0].location.getLat();
    resultStr += "当前坐标</b>：" + myLng + ", " + myLat;
    $pointBox.innerHTML = resultStr;
    map.setCenter(new AMap.LngLat(myLng, myLat));
}

//添加地图事件
map.on('moveend', function () {
    addCenterPoint();
});

function dian() {
    var addressBox=document.getElementById("addressBox");
    var result=addressBox.value;
    sessionStorage.setItem("address",result);
    location.href="address.html";
    // location.href="cart.html";
}
function xiao() {
    var addressBox=document.getElementById("addressBox");
    var result=addressBox.value;
    sessionStorage.setItem("address",result);
    // location.href="address.html";
    location.href="cart.html";
}
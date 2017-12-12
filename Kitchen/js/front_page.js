/**
 * Created by Ambrose on 2017/12/10.
 */
var swedenFlg = document.getElementById("sweden_flag");
var ukFlg =  document.getElementById("uk_flag");

function changeBackground(e) {
    if(e === swedenFlg){
        swedenFlg.style.backgroundColor = "#ffc107";
        ukFlg.style.backgroundColor = "#ffffff";
    }else {
        ukFlg.style.backgroundColor = "#ffc107";
        swedenFlg.style.backgroundColor = "#ffffff";
    }
}


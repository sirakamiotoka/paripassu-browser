/*function lo_st_MouseClick() {
  const ss = document.getElementById("selectSE"); //ボタンを押したときのSE
  const ng = document.getElementById("newgame");
  const all = document.getElementById("titleall");
  ng.style.opacity = 0;
  all.style.opacity = 0;
  ss.volume = 0.5;
  ss.play();
  window.setTimeout(startgame, 1700);
}*/
const optimer = 35000;
var tr = false;
var videoflag;
var videoflag2 = true;
if (sessionStorage.getItem("vf") == null) {
    videoflag = true;
} else {
    videoflag = sessionStorage.getItem("vf")
}


function st_MouseClick() {
    const ss = document.getElementById("selectSE"); //ボタンを押したときのSE
    const ng = document.getElementById("newgame");
    const all = document.getElementById("titleall");
    ng.style.opacity = 0;
    all.style.opacity = 0;
    ss.volume = localStorage.getItem("bgmvolume_v");
    ss.play();
    window.setTimeout(startgame, 1700);
}
var c;
window.addEventListener("DOMContentLoaded", function() {

    var i = 1;
    const loadf = document.querySelectorAll(".loadf");
    i = 1
    loadf.forEach(function(value) {
        value.style.opacity = 0;
        value.disabled = true;
        value.style.zIndex = -1;
        if (localStorage.getItem("savedata" + i) != null) {
            value.textContent = localStorage.getItem("savedata" + i);
        }
        i++;
    });
});


function co_MouseClick() {
    videoflag = false;
    videoflag2 = false;
    con_l = 0;
    sessionStorage.setItem("configlocation", con_l)
    window.location.href = "config.html";
}
var new_g = false;

function startgame() {
    videoflag2 = false;
    videoflag = false;
    new_g = true;
    sessionStorage.setItem("newst_g", new_g)
    window.location.href = "game.html";
}

function ex_MouseClick() {
    videoflag2 = false;
    videoflag = false;
    var res = confirm("ゲームを終了しますか？");
    if (res == true) {
        window.close()
    } else {
        videoflag2 = true;
    }
}

window.addEventListener("DOMContentLoaded", function() {


    const tm = document.querySelector("#titlemusic");　 //タイトル画面のBGM
    tm.muted = false;
    var volume_adjust = localStorage.getItem("volume_adjust");
    tm.addEventListener("loadeddata", (e) => {

        tm.autoplay = true;
        tm.loop = true;

        if (localStorage.getItem("bgmvolume_v") != null) {
            //alert(localStorage.getItem("bgmvolume_v"))
            tm.volume = localStorage.getItem("bgmvolume_v");
        } else {
            tm.volume = 0.3;
        }
    });
    //alert("" + videoflag)
    //alert("tr" + tr)
    var v = document.getElementById('OPvideo');
    if (localStorage.getItem("bgmvolume_v") != null) {
        v.volume = localStorage.getItem("bgmvolume_v");
    } else {
        v.volume = 0.3;
    }
    var vc = document.querySelector('.OPclass');

    //var v_bg = document.getElementById('OPvideobg');
    //再生
    //v_bg.style.opacity = 1;
    //v_bg.play();
    if (sessionStorage.getItem("videoflag2") != null) {
        videoflag2 = sessionStorage.getItem("videoflag2")
    }
    if (sessionStorage.getItem("tr") != null) {
        tr = sessionStorage.getItem("tr")
    }
    //alert("" + videoflag)
    //alert("tr2" + tr)
    if (videoflag == true && tr == false) {

        tm.muted = true;
        v.muted = true; 
        v.style.opacity = 1;
        vc.style.zIndex = 8;
        v.play();
    }
    const countUp = () => {
        if (videoflag2 == true) {
            tm.muted = true;
            v.style.opacity = 1;
            vc.style.zIndex = 8;
            v.play();
        }
    }
    if (sessionStorage.getItem("videoflag2") != null) {
        clearInterval(intervalId);
        intervalId = setInterval(countUp, optimer);
    }

    let intervalId = setInterval(countUp, optimer);
    //alert("" + videoflag)
    v.addEventListener('click', () => {
        
        v.style.transition = "opacity 1.5s";
        //一時停止
        v.load();
        v.pause();
        v.muted = false;
            //    v_bg.style.opacity = 0;
        clearInterval(intervalId);
        intervalId = setInterval(countUp, optimer);
        v.style.opacity = 0;
        vc.style.zIndex = 0;
        tm.load();
        tm.muted = false;
        tm.autoplay = true;
        tm.loop = true;
        if (localStorage.getItem("bgmvolume_v") != null) {
            //alert(localStorage.getItem("bgmvolume_v"))
            tm.volume = localStorage.getItem("bgmvolume_v");
        } else {
            tm.volume = 0.3;
        }

    });
    v.addEventListener('ended', () => {
        v.style.transition = "opacity 1.5s";
        v.load();
        v.pause();
        
        clearInterval(intervalId);
        intervalId = setInterval(countUp, optimer);
        v.style.opacity = 0;
        vc.style.zIndex = 0;
        tm.load();
        tm.muted = false;
        tm.autoplay = true;
        tm.loop = true;
        if (localStorage.getItem("bgmvolume_v") != null) {
            //alert(localStorage.getItem("bgmvolume_v"))
            tm.volume = localStorage.getItem("bgmvolume_v");
        } else {
            tm.volume = 0.3;
        }
    });

});
// win+R無効
window.document.onkeydown = keys;


function keys(eve) {
    var winjudge = false;
    if (eve == null) {
        eve = window.event;
        winjudge = true;
    }
    var keyCode = eve.which ? eve.which : eve.keyCode;
    switch (keyCode) {
        case 116: // F5
            if (winjudge) eve.keyCode = 0;
            return false;
        case 82: // Ctrl + R
            if (eve.ctrlKey) {
                if (winjudge) eve.keyCode = 0;
                return false;
            }
            break;
    }
}
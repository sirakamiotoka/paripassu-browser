//var c = Storage.getItem("configlocation")
var BGMview_dummy
var bgmvolume_v_dummy
var videoflag_c = false;

function endconfig() {

    //if (c == 0) {

    BGMview_dummy = localStorage.getItem("BGMview_dummy");
    bgmvolume_v_dummy = localStorage.getItem("bgmvolume_v_dummy");
    localStorage.setItem("BGMview", BGMview_dummy);
    localStorage.setItem("bgmvolume_v", bgmvolume_v_dummy);
    //localStorage.removeItem("volume_adjust");
    //sessionStorage.setItem("vf", videoflag_c)
    videoflag_c = true;
    sessionStorage.setItem("tr", true)
    sessionStorage.setItem("vf", videoflag_c);
    window.location.href = "index.html";
    /*} else {
      
      loadconfig();
      
    }*/

}

function titlereturn() {
    var res = confirm("タイトル画面へ戻りますか？\n※保存していないデータは削除されます！");
    if (res == true) {
        sessionStorage.clear()
        window.location.href = "index.html";
    }
}

var volume_adjust;

function exitgame() {
    var res = confirm("ゲームを終了しますか？\n※保存していないデータは削除されます！");
    if (res == true) {
        window.close()
    }
}

re_sw = 256;
re_sh = 195;

function veryminisize() {
    window.resizeTo(re_sw * 2.1, re_sh * 2.1);
}

function minisize() {
    window.resizeTo(re_sw * 2.65, re_sh * 2.65);
}

function midsize() {
    window.resizeTo(re_sw * 3.08, re_sh * 3.08);
}

function bigsize() {
    window.resizeTo(re_sw * 3.7, re_sh * 3.7);
}

function verybigsize() {
    window.resizeTo(re_sw * 4.6, re_sh * 4.6);
}
var bgmvolume_v = localStorage.getItem("bgmvolume_v");
if (bgmvolume_v == null) {
    bgmvolume_v = 0.3;
} else {
    bgmvolume_v = Number(bgmvolume_v)
}

function fit() {
    let elements = document.getElementsByName('w_size');
    let len = elements.length;
    let checkValue = '';
    //let bgmelements = document.getElementsByName('BGMvolume');
    //let bgmlen = elements.length;
    //let bgmcheckValue = '';

    for (let i = 0; i < len; i++) {
        if (elements.item(i).checked) {
            checkValue = elements.item(i).value;
        }

    }
    /*
      for (let i = 0; i < bgmlen; i++) {
        if (bgmelements.item(i).checked) {
          bgmcheckValue = bgmelements.item(i).value;
        }
      }
      */

    var BGMview = document.getElementById("BGMview");
    localStorage.setItem("checkValue", checkValue);
    window.location.href = "index.html";
    var videoflag_c = true;
    sessionStorage.setItem("tr", true)
    sessionStorage.setItem("vf", videoflag_c);
    alert("設定を変更しました");
    switch (checkValue) {
        case "gokusyou":
            veryminisize();
            break;
        case "syou":
            minisize();
            break;
        case "tyuu":
            midsize()
            break;
        case "dai":
            bigsize()
            break;
        case "tokudai":
            verybigsize()
            break;
    }
    sessionStorage.setItem("vf", videoflag_c)
}



function BGMup() {
    if (bgmvolume_v < 1) {
        volume_adjust = 0.05;
        //volume_adjust =Math.floor(volume_adjust*10)/10;
        //alert(bgmvolume_v)
        volumeview();
        const tm = document.querySelector("#titlemusic");　 //タイトル画面のBGM

        tm.volume = localStorage.getItem("bgmvolume_v");

    }
}

function BGMdown() {
    if (bgmvolume_v > 0) {
        volume_adjust = -0.05;
        //volume_adjust =Math.floor(volume_adjust*10)/10;
        //alert(bgmvolume_v)
        volumeview();
        const tm = document.querySelector("#titlemusic");　 //タイトル画面のBGM

        tm.volume = localStorage.getItem("bgmvolume_v");
    }
}

function volumeview() {

    //bgmvolume_v = localStorage.getItem("bgmvolume_v");

    //def_vol = bgmvolume_v;
    // + Number(localStorage.getItem("volume_adjust"));
    //localStorage.setItem("bgmvolume_v",bgmvolume_v); //1.0~0.0

    bgmvolume_v += volume_adjust; //bgm音量
    if (bgmvolume_v < 0) {
        bgmvolume_v = 0.0;
    }
    if (bgmvolume_v > 1) {
        bgmvolume_v = 1.0;
    }

    BGMview.textContent = Math.round((bgmvolume_v * 100)) + "%";

    localStorage.setItem("BGMview", BGMview.textContent);
    localStorage.setItem("bgmvolume_v", bgmvolume_v); //1.0~0.0

}

window.addEventListener("DOMContentLoaded", function() {

    //volume_adjust = document.getElementById("volume_adjust");
    let elements = document.getElementsByName('w_size');
    let len = elements.length;
    checkValue = localStorage.getItem("checkValue");

    for (let i = 0; i < len; i++) {
        if (checkValue == elements.item(i).value) {
            elements.item(i).checked = true;
        }
    }

    BGMview.textContent = localStorage.getItem("BGMview");
    if (BGMview.textContent == "") {
        BGMview.textContent = "30%";
    }
    localStorage.setItem("BGMview_dummy", BGMview.textContent);
    localStorage.setItem("bgmvolume_v_dummy", bgmvolume_v);
    const titlereturn = document.getElementById("title_return");
    const exitgame = document.getElementById("exit_game");
    if (c == 0) {
        titlereturn.style.opacity = 0;
        titlereturn.disabled = true;
        exitgame.style.opacity = 0;
        exitgame.disabled = true;
    } else {
        titlereturn.style.opacity = 1;
        titlereturn.disabled = false;
        exitgame.style.opacity = 1;
        exitgame.disabled = false;
    }
});

window.addEventListener("DOMContentLoaded", function() {
    const tm = document.querySelector("#titlemusic");　 //タイトル画面のBGM
    tm.addEventListener("loadeddata", (e) => {
        tm.muted = false;
        tm.autoplay = true;
        tm.loop = true;
        tm.volume = localStorage.getItem("bgmvolume_v");
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
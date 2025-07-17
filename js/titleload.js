function lo_MouseClick() {
    const startButton = document.getElementById("newgame");
    startButton.disabled = true;
    const loadButton = document.getElementById("loadgame");
    loadButton.disabled = true;
    const configButton = document.getElementById("configgame");
    configButton.disabled = true;
    const exitButton = document.getElementById("exitgame");
    exitButton.disabled = true;
    const loadf = document.querySelectorAll(".loadf");
    videoflag2 = false;
    loadf.forEach(function(value) {
        value.style.opacity = 1;
        value.disabled = false;
        value.style.zIndex = 6;
    });
}

function saveend() {
    const startButton = document.getElementById("newgame");
    startButton.disabled = false;
    const loadButton = document.getElementById("loadgame");
    loadButton.disabled = false;
    const configButton = document.getElementById("configgame");
    //configButton.disabled = false; //レスポンシブのため
    const exitButton = document.getElementById("exitgame");
    //exitButton.disabled = false; //レスポンシブのため
    const loadf = document.querySelectorAll(".loadf");
    videoflag2 = true;
    sessionStorage.setItem("videoflag2", videoflag2)

    loadf.forEach(function(value) {
        value.style.opacity = 0;
        value.disabled = true;
        value.style.zIndex = -1;
    });
}

// ロード
function loadcheck(t_loadlistnum) {
    datacheck = localStorage.getItem("check" + t_loadlistnum);
    if (localStorage.getItem("check" + t_loadlistnum) != null) {
        playloadsystem();
    } else {
        alert("セーブデータがありません");
    }
}
var t_loadlistnum = 0;

function t_load1() {
    t_loadlistnum = 1;
    loadcheck(t_loadlistnum);
}

function t_load2() {
    t_loadlistnum = 2;
    loadcheck(t_loadlistnum);
}

function t_load3() {
    t_loadlistnum = 3;
    loadcheck(t_loadlistnum);
}

function t_load4() {
    t_loadlistnum = 4;
    loadcheck(t_loadlistnum);
}

function t_load5() {
    t_loadlistnum = 5;
    loadcheck(t_loadlistnum);
}

function t_load6() {
    t_loadlistnum = 6;
    loadcheck(t_loadlistnum);
}

function t_load7() {
    t_loadlistnum = 7;
    loadcheck(t_loadlistnum);
}

function t_load8() {
    t_loadlistnum = 8;
    loadcheck(t_loadlistnum);
}

function playloadsystem() {
    // 値を渡す
    const titleloadlistnum = t_loadlistnum
    sessionStorage.setItem('t_loadlistnum', titleloadlistnum);
    st_MouseClick();

}
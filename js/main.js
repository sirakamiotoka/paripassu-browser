//sheet.insertRule ( "* { width:" + setVal + "%; }", 0 );
//let colorElemnt = document.getElementsByClassName('*')[0];
//colorElemnt.style.setProperty("--main-size", "10%");
num = 0; //セリフ用関数
num_dummy = 0; //numの数値を一旦入れておくため関数
let st = true; //ストーリー進行を進めることが可能か
let st_c = true; //ストーリー進行を進めることが可能か
br1 = 0; //0が共通ルート、1以降は分岐ルートです
branchcount = 0; //何個目の分岐点か
clickcheck = true;
var msg_dummy = []; //メッセージ一時保存用
var msg_rdummy = [];
var br_chack = true;
var stopflag = false; // シーンチェンジディレイ用
var migiflag = true; //右クリック検知用
var bgmvolume_v = localStorage.getItem("bgmvolume_v");
var bgmvolume = bgmvolume_v; //bgm音量
if (bgmvolume < 0) {
    bgmvolume = 0;
}
if (bgmvolume > 1) {
    bgmvolume = 1.0;
}
var br = false;
//var speedgear = 0;
//var txspeed = 20;

//エンターキー、Zキーでも進めれるように

//addEventListener("keydown",(e) => {
//  if (e.keyCode === 13) {
//    ClickDisabled();
//  }
//});
let new_g = sessionStorage.getItem("newst_g");
////alert(new_g)
/*
if(new_g == true){
  
  //alert() 
  new_g = false;
  sessionStorage.setItem("newst_g",new_g);
  window.location.reload(true); 
}
  */
window.addEventListener("DOMContentLoaded", function() {
    //st=false;
    migiflag = false;
    br = true
    msg_dummy = [];
    Array.prototype.splice.apply(msg_dummy, [0, 0].concat(msg));
    const saveButton = document.getElementById("save");
    const loadButton = document.getElementById("load");
    const savelistButton = document.getElementById("savelist");
    const loadlistButton = document.getElementById("loadlist");
    const savef = document.querySelectorAll(".savef");
    var i = 1;
    savef.forEach(function(value) {
        value.style.opacity = 0;
        value.disabled = true;
        value.style.zIndex = -1;
        if (localStorage.getItem("savedata" + i) != null) {
            value.textContent = localStorage.getItem("savedata" + i);
        }
        i++;
    });
    const loadf = document.querySelectorAll(".loadf");
    i = 1;
    loadf.forEach(function(value) {
        value.style.opacity = 0;
        value.disabled = true;
        value.style.zIndex = -1;
        if (localStorage.getItem("savedata" + i) != null) {
            value.textContent = document.getElementById("save" + i).textContent;
        }
        i++;
    });
    loadlistButton.disabled = true;
    savelistButton.disabled = true;
    saveButton.disabled = true;
    loadButton.disabled = true;
    const music = document.getElementById("music");

    ////alert(bgmvolume);

    music.play();
    music.loop = true;
    music.volume = bgmvolume;
    //if(stcontinue != 0){
    //  loadsystem(stcontinue)
    //}
    var Check = sessionStorage.getItem("t_loadlistnum"); // なかったらnullが返る
    if (Check >= 1) {
        ////alert(Check)
        t_loadsystem(Check);

        //タイトル画面に戻るの時データ消す
    }
    br = false
        //st=true;
    migiflag = true
});
let key_ivent_timer_id;

function delay(n) {
    return new Promise(function(resolve) {
        setTimeout(resolve, n);
    });
}
document.addEventListener("keydown", async function(e) {
    ////alert(e.key)
    if (stopflag == false && migiflag == true && st == true) {
        if (e.key === "Control") {
            if (clickcheck == true) {
                clickcheck = false;
                const loadButton = document.getElementById("load");
                const saveButton = document.getElementById("save");
                const savelistButton = document.getElementById("savelist");
                const loadlistButton = document.getElementById("loadlist");

                if (num == 0) {
                    savelistButton.disabled = false;
                    //saveButton.disabled = false;
                    //loadButton.disabled = false;
                    loadlistButton.disabled = false;
                }
                if (msg[num + 2] == "s_branch") {
                    savelistButton.disabled = true;
                    loadlistButton.disabled = true;
                    saveButton.disabled = true;
                    loadButton.disabled = true;
                }
                await MouseClickSkip(25);
            }
        }
    }
});

// キーが離された時
document.addEventListener("keyup", (e) => {
    // 離されたキーを判定する
    if (e.key === "Control") {}
});

document.addEventListener("keydown", async function(e) {
    ////alert(e.key)
    if (stopflag == false) {
        if (e.key === "z" || e.key === "Enter") {
            // キーが長押しされた時の処理
            ClickDisabled();
        }
    }
});

const TIMER = 1;

async function ClickDisabled() {
    ////alert(st + "1")
    if (stopflag == false) {
        if (st) {
            const loadButton = document.getElementById("load");
            const saveButton = document.getElementById("save");
            const savelistButton = document.getElementById("savelist");
            const loadlistButton = document.getElementById("loadlist");

            if (num == 0) {
                savelistButton.disabled = false;
                //saveButton.disabled = false;
                //loadButton.disabled = false;
                loadlistButton.disabled = false;
            }
            if (msg[num + 2] == "s_branch") {
                savelistButton.disabled = true;
                loadlistButton.disabled = true;
                saveButton.disabled = true;
                loadButton.disabled = true;
            }
            if (clickcheck == true) {
                clickcheck = false;
                st_c = true;
                const cs = document.getElementById("clicksound");
                //cs.volume = 0.25;
                cs.volume = bgmvolume;
                cs.play();
                await MouseClick();
            }
        }
    }
    ////alert(st + "2")
}

async function MouseClick() {
    //alert(st + "1.5")
    if (st == true && st_c == true) {
        //alert("s")
        await SetMsg();
        num++;
        await TextTyping(20);
        MainGameSystem();
        clickcheck = true;
    }
}

async function MouseClickSkip(skipspeed) {
    if (st == true && st_c == true) {
        await SetMsg();
        num++;
        await delay(skipspeed);
        MainGameSystem();
        clickcheck = true;
    }
}

//テキストウィンドウに表記する文を設定
async function SetMsg() {
    //if (br1 >= 0) {

    //} else {
    //  document.getElementById("str1").textContent = msg_er[num];
    //}
    //システムを動かす指令の場合

    //alert(msg[num])
    while (msg[num].indexOf("s") == "0") {
        //alert(msg[num] + "in")
        await Scene_Switch();
        if (stopflag == false) {
            Name_Switch();
            BackSwitch();
            PlayBGM();
            await CharaChange();
            CharaOpt();
        } else {
            document.getElementById("str1").textContent = "";
            var scenestop = async function() {
                Name_Switch();
                BackSwitch();
                PlayBGM();
                await CharaChange();
                CharaOpt();
                setTimeout(scenestop(), 1010);
            };
        }
        num++;
        //SetMsg();
    }
    document.getElementById("str1").textContent = msg[num];

    //alert(msg[num] + "end");

    //}
}

//BGM用-変更予定
var musicnum = 0;
var ml_num = 0;
//const m_url = [0,1,2,3,4];
//0:会議室,1:ヴァロアの町,2:戦い,3:カフェ,4:潜入　初期0
function PlayBGM() {
    switch (msg[num]) {
        case "s_BGM0":
            musicnum = 0;
            PlayBGMstart(musicnum);
            break;
        case "s_BGM1":
            musicnum = 1;
            PlayBGMstart(musicnum);
            break;
        case "s_BGM2":
            musicnum = 2;
            PlayBGMstart(musicnum);
            break;
        case "s_BGM3":
            musicnum = 3;
            PlayBGMstart(musicnum);
            break;
        case "s_BGM4":
            musicnum = 4;
            PlayBGMstart(musicnum);
            break;
    }
}
/*
function PlayBGM() {
  if (msg[num] == "s_BGM") {
    musiclist = [1, 2, 1 ,0 ,1 ,3 ,4]; //0:会議室,1:ヴァロアの町,2:戦い,3:カフェ,4:潜入　初期0
    musicnum = musiclist[ml_num];
    PlayBGMstart(musicnum);
    ml_num++;
  }
}*/

async function PlayBGMstart(m) {
    const BGM = document.querySelectorAll(".BGM");
    BGM.forEach(function(value) {
        value.pause();
    });

    BGM[m].play();
    BGM[m].loop = true;
    BGM[m].volume = bgmvolume;
}

//
var chara1 = document.getElementById("chara");
var chara2;

var r_cchangenum;

//キャラ
//async function t_loadCharaChange(p_r_cchangenum) {
async function t_loadCharaChange(a) {
    if (a != null) {
        r_cchangenum = a;
    }

    if (r_cchangenum == 2) {
        chara2 = document.getElementById("chara2");
    } else if (r_cchangenum == 3) {
        chara2 = document.getElementById("chara3");
    } else if (r_cchangenum == 4) {
        chara2 = document.getElementById("chara4");
    } else if (r_cchangenum == 5) {
        chara2 = document.getElementById("chara5");
    }

    return chara2;
}

async function CharaChange() {
    if (msg[num] == "s_cchanger2") {
        chara2 = document.getElementById("chara2");
        r_cchangenum = 2;
    } else if (msg[num] == "s_cchanger3") {
        chara2 = document.getElementById("chara3");
        r_cchangenum = 3;
    } else if (msg[num] == "s_cchanger4") {
        chara2 = document.getElementById("chara4");
        r_cchangenum = 4;
    } else if (msg[num] == "s_cchanger5") {
        chara2 = document.getElementById("chara5");
        r_cchangenum = 5;
    }
    sessionStorage.setItem("r_cchangenum_save", r_cchangenum);
    //alert(sessionStorage.getItem("r_cchangenum_save"))
}

var l_num;

function CharaOpt() {
    //キャラ表示・非表示
    if (msg[num] == "s_c1on") {
        chara1.style.opacity = 1;
        chara1.animate(
            // 途中の状態を表す配列
            [
                { transform: "translateX(-200px)" }, // 開始時の状態（左端）
                { transform: "translateX(0px)" }, // 終了時の状態（左端から200pxの位置）
            ],
            // タイミングに関する設定
            {
                fill: "backwards", // 再生前後の状態（再生前、開始時の状態を適用）
                duration: 1000, // 再生時間
            }
        );
    }
    if (msg[num] == "s_c1off") {
        //alert(chara1.style.opacity)
        chara1.style.opacity = 0;
        chara1.animate(
            // 途中の状態を表す配列
            [
                { transform: "translateX(0)" }, // 開始時の状態（左端）
                { transform: "translateX(-200px)" }, // 終了時の状態（左端から200pxの位置）
            ],
            // タイミングに関する設定
            {
                fill: "backwards", // 再生前後の状態（再生前、開始時の状態を適用）
                duration: 1000, // 再生時間（1000ミリ秒）
            }
        );
    }
    //キャラ表示・非表示
    var p_r_cchangenum;
    if (msg[num] == "s_c2on") {
        st = false;
        //if(chara2.style.opacity = 0){
        //let load_r_cc = sessionStorage.getItem("load_r_cc"); //11/06
        //let t_load_r_cc = sessionStorage.getItem("t_load_r_cc"); //11/06
        //sessionStorage.getItem("r_cchangenum_save")
        p_r_cchangenum = sessionStorage.getItem("r_cchangenum_save"); ////

        if (sessionStorage.getItem("tload_n") != null) {
            l_num = sessionStorage.getItem("tload_n");
            p_r_cchangenum = localStorage.getItem("r_cchangenum" + l_num);
            sessionStorage.removeItem("tload_n");
        }
        if (sessionStorage.getItem("load_n") != null) {
            l_num = sessionStorage.getItem("load_n");
            p_r_cchangenum = localStorage.getItem("r_cchangenum" + l_num);
            sessionStorage.removeItem("load_n");
        }

        t_loadCharaChange(p_r_cchangenum);
        ////alert(chara2);
        chara2.style.transition = "opacity 1s";
        chara2.style.opacity = 1;
        chara2.animate(
            // 途中の状態を表す配列
            [
                { transform: "translateX(200px)" }, // 開始時の状態（左端）
                { transform: "translateX(0px)" }, // 終了時の状態（左端から200pxの位置）
            ],
            // タイミングに関する設定
            {
                fill: "backwards", // 再生前後の状態（再生前、開始時の状態を適用）
                duration: 900, // 再生時間
            }
        );
        //}
        st = true;
    }
    if (msg[num] == "s_c2hon") {
        st = false;

        p_r_cchangenum = sessionStorage.getItem("r_cchangenum_save");
        //alert(r_cchangenum)
        //if(chara2.style.opacity = 0){
        //let load_r_cc = sessionStorage.getItem("load_r_cc"); //11/06
        //let t_load_r_cc = sessionStorage.getItem("t_load_r_cc"); //11/06

        if (sessionStorage.getItem("tload_n") != null) {
            l_num = sessionStorage.getItem("tload_n");
            p_r_cchangenum = localStorage.getItem("r_cchangenum" + l_num);
            sessionStorage.removeItem("tload_n");
        }
        if (sessionStorage.getItem("load_n") != null) {
            l_num = sessionStorage.getItem("load_n");
            p_r_cchangenum = localStorage.getItem("r_cchangenum" + l_num);
            sessionStorage.removeItem("load_n");
        }
        //alert(l_num)

        //r_cchangenum = localStorage.getItem("r_cchangenum" + l_num);

        t_loadCharaChange(r_cchangenum);

        //alert(r_cchangenum + "t_load_r!");
        //CharaChange();
        //alert(chara2);

        // フェードアウトを無効化//

        chara2.style.transition = "opacity 0s";

        chara2.style.opacity = 1;

        /*chara2.animate(
                // 途中の状態を表す配列
                [
                    { transform: 'translateX(200px)' }, // 開始時の状態（左端）
                    { transform: 'translateX(0px)' } // 終了時の状態（左端から200pxの位置）
                ],
                // タイミングに関する設定
                {
                    fill: 'backwards', // 再生前後の状態（再生前、開始時の状態を適用）
                    duration: 900, // 再生時間
                }, );
            //}*/
        st = true;
    }
    if (msg[num] == "s_c2off") {
        st = false;
        p_r_cchangenum = sessionStorage.getItem("r_cchangenum_save");
        if (sessionStorage.getItem("tload_n") != null) {
            l_num = sessionStorage.getItem("tload_n");
            p_r_cchangenum = localStorage.getItem("r_cchangenum" + l_num);
            sessionStorage.removeItem("tload_n");
        }
        if (sessionStorage.getItem("load_n") != null) {
            l_num = sessionStorage.getItem("load_n");
            p_r_cchangenum = localStorage.getItem("r_cchangenum" + l_num);
            sessionStorage.removeItem("load_n");
        }
        //alert(l_num)
        //r_cchangenum = localStorage.getItem("r_cchangenum" + l_num);
        //alert(r_cchangenum)

        t_loadCharaChange(r_cchangenum);
        chara2.style.transition = "opacity 1s";

        chara2.style.opacity = 0;

        chara2.animate(
            // 途中の状態を表す配列
            [
                { transform: "translateX(0)" }, // 開始時の状態（左端）
                { transform: "translateX(200px)" }, // 終了時の状態（左端から200pxの位置）
            ],
            // タイミングに関する設定
            {
                fill: "backwards", // 再生前後の状態（再生前、開始時の状態を適用）
                duration: 900, // 再生時間
            }
        );
        st = true;
    }
    if (msg[num] == "s_c2hoff") {
        st = false;
        p_r_cchangenum = sessionStorage.getItem("r_cchangenum_save");
        //11/05
        //alert(load_r_cc)

        /*
            if (sessionStorage.getItem("t_load_r_cc") == false) {
                alert("t")
                let t_loadlistnum = sessionStorage.getItem("tload_n");

                r_cchangenum = localStorage.getItem("r_cchangenum" + t_loadlistnum); //
                t_load_r_cc = true;
                t_loadCharaChange(r_cchangenum);
                //alert(r_cchangenum + "t_load_r!");
                //CharaChange();
                ////alert(chara2);
            }

            if (sessionStorage.getItem("load_r_cc") == false) {
               alert("not t")
                let loadlistnum = sessionStorage.getItem("load_n");
                r_cchangenum = localStorage.getItem("r_cchangenum" + loadlistnum);
                load_r_cc = true;
                t_loadCharaChange(r_cchangenum);
                //alert(r_cchangenum + "load_r!");
            }
            */
        //r_cchangenum = localStorage.getItem("r_cchangenum" + loadlistnum);
        //alert(r_cchangenum)
        //if(sessionStorage.getItem("tload_n"))

        if (sessionStorage.getItem("tload_n") != null) {
            l_num = sessionStorage.getItem("tload_n");
            p_r_cchangenum = localStorage.getItem("r_cchangenum" + l_num);
            sessionStorage.removeItem("tload_n");
        }
        if (sessionStorage.getItem("load_n") != null) {
            l_num = sessionStorage.getItem("load_n");
            p_r_cchangenum = localStorage.getItem("r_cchangenum" + l_num);
            sessionStorage.removeItem("load_n");
        }
        //alert(l_num)
        //r_cchangenum = localStorage.getItem("r_cchangenum" + l_num);
        //alert(r_cchangenum)
        t_loadCharaChange(r_cchangenum);
        //alert(chara2.style.value)
        // フェードアウトを無効化
        chara2.style.transition = "opacity 0s";

        chara2.style.opacity = 0;

        /*chara2.animate(
                // 途中の状態を表す配列
                [
                    { transform: 'translateX(0)' }, // 開始時の状態（左端）
                    { transform: 'translateX(200px)' } // 終了時の状態（左端から200pxの位置）
                ],
                // タイミングに関する設定
                {
                    fill: 'backwards', // 再生前後の状態（再生前、開始時の状態を適用）
                    duration: 900, // 再生時間
                }, );*/
        st = true;
    }
}

function MainGameSystem() {
    namewin = "";
    const branch1 = document.getElementById("branch1");
    const bs = document.getElementById("branchsound");
    bs.volume = localStorage.getItem("bgmvolume_v");
    const branch2 = document.getElementById("branch2");
    if(branchcount==0){
    branch1.textContent = "私たちが開発するのはどうでしょう？"
    branch2.textContent = "そうなってくれると助かりますね..."
    }else if(branchcount==1){
        branch1.textContent = ""
        branch2.textContent = ""
    }
    branch2.disabled = true;

    //選択肢のルート分岐
    if (msg[num] == "s_branch") {
        br = true;
        const saveButton = document.getElementById("save");
        const loadButton = document.getElementById("load");
        saveButton.disabled = true;
        loadButton.disabled = true;
        const blButton = document.getElementById("backlog");
        blButton.disabled = true;
        const tlButton = document.getElementById("config");
        tlButton.disabled = true;
        branchcount++;
        window.setTimeout((branch1.style.opacity = 1), 1700);
        window.setTimeout((branch2.style.opacity = 1), 1700);
        st = false;
        branch1.style.zIndex = 9;
        branch2.style.zIndex = 9;
        branch1.disabled = false;
        branch2.disabled = false;
        msg_dummy = [];
        Array.prototype.splice.apply(msg_dummy, [0, 0].concat(msg));
        var r1 = msg_r1
        var r2 = msg_r2
        //選択肢1を選んだ場合
        branch1.onclick = function() {
            br_chack = false;
            bs.play();
            
            Array.prototype.splice.apply(msg, [num + 1, 0].concat(r1));
            msg_rdummy = [];
            Array.prototype.splice.apply(msg_rdummy, [0, 0].concat(msg));
            st = true;
            MouseClick();
            branch1.disabled = true;
            branch2.disabled = true;
            branch1.style.opacity = 0;
            branch2.style.opacity = 0;
            branch1.style.zIndex = -1;
            branch2.style.zIndex = -1;
            //saveButton.disabled = false;
            //loadButton.disabled = false;
            const savelistButton = document.getElementById("savelist");
            savelistButton.disabled = false;
            const loadlistButton = document.getElementById("loadlist");
            loadlistButton.disabled = false;
            blButton.disabled = false;
            const tlButton = document.getElementById("config");
            tlButton.disabled = false;
            br = false;
        };
        //選択肢2を選んだ場合
        branch2.onclick = function() {

            br_chack = false;
            bs.play();
            ////alert(msg)
            Array.prototype.splice.apply(msg, [num + 1, 0].concat(r2));
            msg_rdummy = [];
            Array.prototype.splice.apply(msg_rdummy, [0, 0].concat(msg));

            ////alert(msg)

            //msg_dummy = msg;
            //msg = msg_r2;
            //num_dummy = num;
            //num = 0;
            st = true;
            MouseClick();
            branch1.disabled = true;
            branch2.disabled = true;
            branch1.style.opacity = 0;
            branch2.style.opacity = 0;
            branch1.style.zIndex = -1;
            branch2.style.zIndex = -1;
            //saveButton.disabled = false;
            //loadButton.disabled = false;

            const savelistButton = document.getElementById("savelist");
            savelistButton.disabled = false;
            const loadlistButton = document.getElementById("loadlist");
            loadlistButton.disabled = false;
            blButton.disabled = false;
            const tlButton = document.getElementById("config");
            tlButton.disabled = false;
            br = false;
        };
    }

    //ルート分岐後
    /*if (msg[num] == "s_common") {
        num = num_dummy;
        num++;
        msg = msg_dummy;
        //MouseClick();
      }*/
}
//背景切り替え -ｓｗ変更予定(ほぼ済)

const url = [
    "images/digital.gif",
    "images/varoa.jpg",
    "images/cafe.png",
    "images/kitimae.png",
    "images/kiti.png",
    "images/tosyokan.png",
    "images/rainvaroa.png",
    "images/yuugatavaroa2.png",
    "images/seitenvaroa.png",
    "images/home.jpg",
    "",
];

var CGurl;
async function CGurlchange(cn) {
    CGurl = [
        "images/tobitsuki.png",
        "images/zetubou.jpg",
        "images/kakigoori.jpg",
        "images/ken.jpg",
        "images/kengeki.png",
        "images/gurazi.jpg",
    ];

    return (CG.src = CGurl[cn]);
}
//var back_i = 0;
var CGnum = -1;
var backnum = 0;
//const backlist = [0, 1, 0];
function BackSwitch() {
    switch (msg[num]) {
        case "s_BGkaigi":
            backnum = 0;
            BackSwitchstart(backnum);
            break;
        case "s_BGmati":
            backnum = 1;
            BackSwitchstart(backnum);
            break;
        case "s_BGcafe":
            backnum = 2;
            BackSwitchstart(backnum);
            break;
        case "s_BGkitimae":
            backnum = 3;
            BackSwitchstart(backnum);
            break;
        case "s_BGkiti":
            backnum = 4;
            BackSwitchstart(backnum);
            break;
        case "s_BGtosyokan":
            backnum = 5;
            BackSwitchstart(backnum);
            break;
        case "s_BGrainmati":
            backnum = 6;
            BackSwitchstart(backnum);
            break;
        case "s_BGyuugatamati":
            backnum = 7;
            BackSwitchstart(backnum);
            break;
        case "s_BGseitenmati":
            backnum = 8;
            BackSwitchstart(backnum);
            break;
        case "s_BGhome":
            backnum = 9;
            BackSwitchstart(backnum);
            break;
        case "s_end":
            //alert("タイトルへ戻ります。");
            sessionStorage.clear();
            window.location.href = "index.html";
            break;

        case "s_CG0":
            CGnum = 0;
            CGSwitchstart(CGnum);
            break;
        case "s_CG1":
            CGnum = 1;
            CGSwitchstart(CGnum);
            break;
        case "s_CG2":
            CGnum = 2;
            CGSwitchstart(CGnum);
            break;
        case "s_CG3":
            CGnum = 3;
            CGSwitchstart(CGnum);
            break;
        case "s_CG4":
            CGnum = 4;
            CGSwitchstart(CGnum);
            break;
        case "s_CG5":
            CGnum = 5;
            CGSwitchstart(CGnum);
            break;
        case "s_CGoff":
            CGnum = -2;
            CGSwitchstart(CGnum);
            break;
    }
}

function BackSwitchstart(bn) {
    const target = document.getElementById("back");

    //const url = ["images/digital.gif","images/10.jpg",""];
    target.src = url[bn];
    st = true;
}

async function CGSwitchstart(bn) {
    const CG = document.getElementById("CG");
    if (bn >= 0) {
        await CGurlchange(bn);
        setTimeout(() => {
            CG.style.opacity = 1;
        }, 25); //ローディング
    } else {
        CG.style.opacity = 0;
    }
    //const url = ["images/digital.gif","images/10.jpg",""];
    //st = true;
}
//名前切り替え
function Name_Switch() {
    switch (msg[num]) {
        case "s_null":
            namewin = " ";
            break;
        case "s_riddle":
            namewin = "？？？";
            break;
        case "s_py":
            namewin = "ピュセル";
            break;
        case "s_syoujo":
            namewin = "少女";
            break;
        case "s_syaru":
            namewin = "シャルル";
            break;
        case "s_jou":
            namewin = "上官";
            break;
        case "s_GThana":
            namewin = "タナトス達";
            break;
        case "s_people":
            namewin = "街の人";
            break;
        case "s_Gpeople":
            namewin = "街の人々";
            break;
        case "s_itidou":
            namewin = "一同";
            break;
        case "s_miru":
            namewin = "ミル";
            break;
        case "s_loli":
            namewin = "ロリっ子";
            break;
        case "s_doctor":
            namewin = "金髪の女性";
            break;
        case "s_runa":
            namewin = "ルナ";
            break;
        case "s_cafefl":
            namewin = "店員";
            break;
        case "s_kidA":
            namewin = "街の子供A";
            break;
        case "s_kidB":
            namewin = "街の子供B";
            break;
        case "s_kidmother":
            namewin = "子供達の母";
            break;
        case "s_kids":
            namewin = "街の子供達";
            break;
        case "s_system":
            namewin = "システム";
            break;

    }
    //sessionStorage.setItem("blnamewin", namewin)
    namefit();
}

function namefit() {
    document.getElementById("str2").textContent = namewin;
}

function Clickconfig() {
    c = 1;
    window.location.href = "config.html";
}

async function Scene_Switch() {
    //alert(msg[num])
    if (msg[num] == "s_scene") {
        //st = false;
        //alert(msg[num] + "はいった")
        stopflag = true;
        //alert("はいった")
        const scene = document.getElementById("scene");
        scene.style.zIndex = 6;
        scene.style.opacity = 1;
        var sceneclear = async function() {
            //alert(scene.style.opacity + "はいった")
            scene.style.opacity = 0;
            scene.style.zIndex = 0;
            stopflag = false;
            //st = true;
            //ClickDisabled();
        };
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(sceneclear());
            }, 800);
        });
        //setTimeout(sceneclear, 800);
    }
    if (msg[num] == "s_scene_sepia") {
        //st = false;
        //alert(msg[num] + "はいった")
        stopflag = true;
        //alert("はいった")
        const loadButton = document.getElementById("load");
        const saveButton = document.getElementById("save");
        const savelistButton = document.getElementById("savelist");
        const loadlistButton = document.getElementById("loadlist");
        loadlistButton.disabled = true;
        savelistButton.disabled = true;
        saveButton.disabled = true;
        loadButton.disabled = true;

        const scene_sep = document.getElementById("scene_sep");
        scene_sep.style.zIndex = 1;
        const msgwin = document.querySelector(".msgwin");
        msgwin.style.zIndex = 2;
        scene_sep.style.opacity = 0.2;
        stopflag = false;
        //setTimeout(sceneclear, 800);
    }
    if (msg[num] == "s_scene_sepiaend") {
        //st = false;
        //alert(msg[num] + "はいった")
        stopflag = true;
        //alert("はいった")
        const loadButton = document.getElementById("load");
        const saveButton = document.getElementById("save");
        const savelistButton = document.getElementById("savelist");
        const loadlistButton = document.getElementById("loadlist");
        loadlistButton.disabled = false;
        savelistButton.disabled = false;
        saveButton.disabled = false;
        loadButton.disabled = false;

        const scene_sep = document.getElementById("scene_sep");
        scene_sep.style.zIndex = 0;
        const msgwin = document.querySelector(".msgwin");
        msgwin.style.zIndex = 1;
        scene_sep.style.opacity = 0;
        stopflag = false;
        //setTimeout(sceneclear, 800);
    }
}

//右クリック
window.onload = function() {
    document.oncontextmenu = function() {
        ////alert("みぎくり");
        const msgwin = document.getElementById("textbox");
        const namewin = document.getElementById("namebox");
        const msgtext = document.getElementById("str1");
        const nametext = document.getElementById("str2");
        const saveButton = document.getElementById("save");
        const blButton = document.getElementById("backlog");
        const loadButton = document.getElementById("load");
        const savelistButton = document.getElementById("savelist");
        const loadlistButton = document.getElementById("loadlist");
        const configButton = document.getElementById("config");
        if (br == false) {
            if (migiflag) {
                st = false;
                stopflag = true;
                saveButton.disabled = true;
                blButton.disabled = true;
                loadButton.disabled = true;
                savelistButton.disabled = true;
                loadlistButton.disabled = true;
                configButton.disabled = true;
                saveButton.style.opacity = 0;
                blButton.style.opacity = 0;
                loadButton.style.opacity = 0;
                savelistButton.style.opacity = 0;
                loadlistButton.style.opacity = 0;
                configButton.style.opacity = 0;
                msgwin.style.opacity = 0;
                namewin.style.opacity = 0;
                msgtext.style.opacity = 0;
                nametext.style.opacity = 0;
                migiflag = false;
                stopflag = false;
            } else {
                //saveButton.disabled = false;
                blButton.disabled = false;
                //loadButton.disabled = false;
                savelistButton.disabled = false;
                loadlistButton.disabled = false;
                configButton.disabled = false;
                //saveButton.style.opacity = 1;
                blButton.style.opacity = 1;
                //loadButton.style.opacity = 1;
                savelistButton.style.opacity = 1;
                loadlistButton.style.opacity = 1;
                configButton.style.opacity = 1;
                msgwin.style.opacity = 0.78;
                namewin.style.opacity = 0.78;
                msgtext.style.opacity = 1;
                nametext.style.opacity = 1;
                migiflag = true;
                st = true;
                stopflag = false;
            }
        }
        return false; //標準の右クリックメニューを表示しない
    };
    const body = document.querySelector("body");
    body.addEventListener("click", function() {
        //右クリック後左クリック用
        if (br == false) {
            if (migiflag == false) {
                //消えてるとき
                const msgwin = document.getElementById("textbox");
                const namewin = document.getElementById("namebox");
                const msgtext = document.getElementById("str1");
                const nametext = document.getElementById("str2");
                const saveButton = document.getElementById("save");
                const blButton = document.getElementById("backlog");
                const loadButton = document.getElementById("load");
                const savelistButton = document.getElementById("savelist");
                const loadlistButton = document.getElementById("loadlist");
                const configButton = document.getElementById("config");
                //saveButton.disabled = false;
                blButton.disabled = false;
                //loadButton.disabled = false;
                savelistButton.disabled = false;
                loadlistButton.disabled = false;
                configButton.disabled = false;
                //saveButton.style.opacity = 1;
                blButton.style.opacity = 1;
                //loadButton.style.opacity = 1;
                savelistButton.style.opacity = 1;
                loadlistButton.style.opacity = 1;
                configButton.style.opacity = 1;
                msgwin.style.opacity = 0.78;
                namewin.style.opacity = 0.78;
                msgtext.style.opacity = 1;
                nametext.style.opacity = 1;
                migiflag = true;
                st = true;
            }
        }
    });

};
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
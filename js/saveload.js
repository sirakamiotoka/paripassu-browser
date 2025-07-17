//branch2.disabled;
//var opac_c1 = 0.5
//var opac_c2 = 0.5
let load_r_cc = true;
let t_load_r_cc = true;
// クイックセーブ
function ClickQsave() {
    const bs = document.getElementById("branchsound");
    const chara1 = document.getElementById("chara");
    const chara2 = document.getElementById("chara2");
    const target = document.getElementById("back");
    const str2 = document.getElementById("str2");
    localStorage.setItem("saveopacityc1", chara1.style.opacity);
    localStorage.setItem("saveopacityc2", chara2.style.opacity);
    localStorage.setItem("br_c", branchcount);
    localStorage.setItem("br_chack", br_chack);
    localStorage.setItem("ml_n", ml_num);
    jsonmsgrd = JSON.stringify(msg_rdummy);
    localStorage.setItem("msg_rdummy", jsonmsgrd);
    jsonmsgd = JSON.stringify(msg_dummy);
    //alert("ok")
    localStorage.setItem("msg_dummy", jsonmsgd);
    jsonmsg = JSON.stringify(msg_dummy);
    //alert("ok")
    localStorage.setItem("msg", jsonmsg);
    //alert("ok")
    localStorage.setItem("savename", str2.textContent);

    //if (msg[num-2].indexOf("s") == "0"&&msg[num-1].indexOf("s") == "0") {
    localStorage.setItem("savenum", num - 3);
    //}else if (msg[num-1].indexOf("s") == "0") {
    localStorage.setItem("savenum", num - 2);
    //}else{
    localStorage.setItem("savenum", num);
    //}
    localStorage.setItem("saveback", back_i);
    localStorage.setItem("checkQ", "t");
    alert("セーブしました");
}
// クイックロード
async function ClickQload() {
    if (localStorage.getItem("checkQ") == "t") {
        const chara1 = document.getElementById("chara");
        const chara2 = document.getElementById("chara2");
        const target = document.getElementById("back");
        const str2 = document.getElementById("str2");

        chara1.style.opacity = localStorage.getItem("saveopacityc1");
        chara2.style.opacity = localStorage.getItem("saveopacityc2");
        back_i = localStorage.getItem("saveback");
        BackSwitchstart(backlist[back_i]);
        let json = localStorage.getItem("msg_dummy");
        msg_dummy = JSON.parse(json);
        let rdjson = localStorage.getItem("msg_rdummy");
        msg_rdummy = JSON.parse(rdjson);
        let mjson = localStorage.getItem("msg");
        msg = JSON.parse(mjson);
        //msg_dummy = localStorage.getItem("msg_dummy");
        const saveButton = document.getElementById("save");
        saveButton.disabled = false;
        ml_num = localStorage.getItem("ml_n")

        // br_chack = localStorage.getItem("br_chack");    


        num = localStorage.getItem("savenum");
        //clickcheck = true;

        if (localStorage.getItem("br_c") < branchcount) {
            msg = [];
            Array.prototype.splice.apply(msg, [0, 0].concat(msg_dummy));

        }
        num--;
        if (branchcount >= 0 && localStorage.getItem("br_c") >= branchcount) {
            if (num >= 2) {
                while (msg[num - 1].indexOf("s") == "0" && msg[num - 1] != "s_branch") {
                    num--;
                }
            }
            //alert(branchcount)
            if (br_chack == false || branchcount == 0) {
                Array.prototype.splice.apply(msg, [0, 0].concat(msg_rdummy));
            }
        } else {
            document.getElementById("str1").textContent = ".......";
        }
        ClickDisabled();

        branchcount = localStorage.getItem("br_c");
        str2.textContent = localStorage.getItem("savename");
        PlayBGMstart(localStorage.getItem("ml_n"))

        alert("ロードしました");
    } else {
        alert("データがありません");
    }
}

function Clicksavelist() {
    st = false;
    const savelistButton = document.getElementById("savelist");
    savelistButton.disabled = true;
    const loadlistButton = document.getElementById("loadlist");
    loadlistButton.disabled = true;
    const blButton = document.getElementById("backlog");
    blButton.disabled = true;
    const loadButton = document.getElementById("load");
    loadButton.disabled = true;
    const saveButton = document.getElementById("save");
    saveButton.disabled = true;
    const configButton = document.getElementById("config");
    configButton.disabled = true;
    const savef = document.querySelectorAll(".savef");
    savef.forEach(function(value) {
        value.style.opacity = 1;
        value.disabled = false;
        value.style.zIndex = 7;
    });
}

function saveend() {
    st = true;
    const saveButton = document.getElementById("save");
    saveButton.disabled = true;

    const loadButton = document.getElementById("load");
    loadButton.disabled = true;
    const savelistButton = document.getElementById("savelist");
    savelistButton.disabled = false;
    const loadlistButton = document.getElementById("loadlist");
    loadlistButton.disabled = false;
    const backlog = document.getElementById("backlog");
    backlog.disabled = false;
    const configButton = document.getElementById("config");
    configButton.disabled = false;
    const savef = document.querySelectorAll(".savef");
    savef.forEach(function(value) {
        value.style.opacity = 0;
        value.disabled = true;
        value.style.zIndex = -1;
    });
    const loadf = document.querySelectorAll(".loadf");
    loadf.forEach(function(value) {
        value.style.opacity = 0;
        value.disabled = true;
        value.style.zIndex = -1;
    });
}

function Clickloadlist() {
    st = false;
    const saveButton = document.getElementById("save");
    saveButton.disabled = true;
    const blButton = document.getElementById("backlog");
    blButton.disabled = true;
    const loadButton = document.getElementById("load");
    loadButton.disabled = true;
    const savelistButton = document.getElementById("savelist");
    savelistButton.disabled = true;
    const loadlistButton = document.getElementById("loadlist");
    loadlistButton.disabled = true;
    const configButton = document.getElementById("config");
    configButton.disabled = true;

    const loadf = document.querySelectorAll(".loadf");
    loadf.forEach(function(value) {
        value.style.opacity = 1;
        value.disabled = false;
        value.style.zIndex = 7;
    });
}

function saveclear() {
    var res = confirm("データを全削除しますか？");
    if (res == true) {

        const savef = document.querySelectorAll(".savef");
        var j = 1;
        savef.forEach(function(value) {
            if (localStorage.getItem("savedata" + j) != null) {
                value.textContent = "保存されていません"
            }
            j++;
        });
        const loadf = document.querySelectorAll(".loadf");
        j = 1;
        loadf.forEach(function(value) {
            if (localStorage.getItem("savedata" + j) != null) {
                value.textContent = "保存されていません"
            }
            j++;
        });
        localStorage.clear();
        sessionStorage.clear();
        alert("全データを削除しました")
        saveend();
    }
}
// セーブ
var savelistnum = 0;

function save1() {
    savelistnum = 1;
    savesystem();
}

function save2() {
    savelistnum = 2;
    savesystem();
}

function save3() {
    savelistnum = 3;
    savesystem();
}

function save4() {
    savelistnum = 4;
    savesystem();
}

function save5() {
    savelistnum = 5;
    savesystem();
}

function save6() {
    savelistnum = 6;
    savesystem();
}

function save7() {
    savelistnum = 7;
    savesystem();
}

function save8() {
    savelistnum = 8;
    savesystem();
}

function savesystem_s(savetext) {
    let today = new Date();

    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    const str2 = document.getElementById("str2");
    const str1 = document.getElementById("str1");

    if (savelistnum <= 8) { //11/06
        document.getElementById("save" + savelistnum).textContent = str2.textContent + "「" + (str1.textContent).substr(0, 17) + "」 " + year + "/" + month + "/" + day + "  " + hours + ":" + minutes;
        document.getElementById("load" + savelistnum).textContent = document.getElementById("save" + savelistnum).textContent;

        //const obj = { url: "../../save/", title: 'savedata' }
        //localStorage.setItem('key', JSON.stringify(obj))
        localStorage.setItem("savedata" + savelistnum, document.getElementById("save" + savelistnum).textContent);
    }
    const bs = document.getElementById("branchsound");

    var chara1 = document.getElementById("chara");
    var chara2 = document.getElementById("chara2");
    //var p_r_cchangenum_save = sessionStorage.getItem("r_cchangenum_save");
    localStorage.setItem("r_cchangenum" + savelistnum, sessionStorage.getItem("r_cchangenum_save"));
    //r_cchangenum = sessionStorage.setItem("r_cchangenum_save", r_cchangenum);
    //var r_cchangenum = sessionStorage.getItem("r_cchangenum_save")
    //alert(r_cchangenum+"a"+chara2.style.opacity)
    if (r_cchangenum == 2) {
        chara2 = document.getElementById("chara2");
    } else if (r_cchangenum == 3) {
        chara2 = document.getElementById("chara3");
    } else if (r_cchangenum == 4) {
        chara2 = document.getElementById("chara4");
    } else if (r_cchangenum == 5) {
        chara2 = document.getElementById("chara5");
    }

    //キャラ
    localStorage.setItem("saveopacityc1" + savelistnum, chara1.style.opacity);
    localStorage.setItem("saveopacityc2" + savelistnum, chara2.style.opacity);
    //alert(r_cchangenum+"a"+chara2.style.opacity)
    //r_cchangenum = localStorage.getItem("r_cchangenum")
    const target = document.getElementById("back");
    //savelistnum = toString(savelistnum);
    localStorage.setItem("check" + savelistnum, savelistnum);
    //alert(sessionStorage.getItem("r_cchangenum_save"))

    //localStorage.setItem("chara2"+savelistnum,chara2); //11/06

    localStorage.setItem("br_c" + savelistnum, branchcount);
    localStorage.setItem("br_chack" + savelistnum, br_chack);
    localStorage.setItem("ml_n" + savelistnum, musicnum);

    // 9/19追加
    localStorage.setItem("backnum" + savelistnum, backnum);
    localStorage.setItem("CGnum" + savelistnum, CGnum);
    jsonmsgrd = JSON.stringify(msg_rdummy);
    localStorage.setItem("msg_rdummy" + savelistnum, jsonmsgrd);
    jsonmsgd = JSON.stringify(msg_dummy);
    //alert("ok")
    localStorage.setItem("msg_dummy" + savelistnum, jsonmsgd);
    jsonmsg = JSON.stringify(msg_dummy);
    //alert("ok")
    localStorage.setItem("msg" + savelistnum, jsonmsg);
    //alert("ok")
    localStorage.setItem("savename" + savelistnum, str2.textContent);
    localStorage.setItem("savetext" + savelistnum, str1.textContent);

    //if (msg[num-2].indexOf("s") == "0"&&msg[num-1].indexOf("s") == "0") {
    //  localStorage.setItem("savenum"+savelistnum, num-3);
    //}else if (msg[num-1].indexOf("s") == "0") {
    //  localStorage.setItem("savenum"+savelistnum, num-2);
    //}else{
    localStorage.setItem("savenum" + savelistnum, num - 1);
    //  alert(localStorage.getItem("savenum"+savelistnum));
    //}
    //9/19コメントアウト
    //    localStorage.setItem("saveback"+savelistnum, back_i);
    if (savelistnum <= 8) { //11/06
        alert(savetext);
    }
}

function savesystem() {
    if (localStorage.getItem("check" + savelistnum) != null) {
        var res = confirm("スロット" + savelistnum + "に上書きしますか？");
        if (res == true) {
            var savetext = "上書きしました";
            savesystem_s(savetext);
        }
    } else {
        var savetext = "セーブしました";
        savesystem_s(savetext);
    }
}
// ロード
var loadlistnum = 0;

function load1() {
    loadlistnum = 1;
    loadsystem();
}

function load2() {
    loadlistnum = 2;
    loadsystem();
}

function load3() {
    loadlistnum = 3;
    loadsystem();
}

function load4() {
    loadlistnum = 4;
    loadsystem();
}

function load5() {
    loadlistnum = 5;
    loadsystem();
}

function load6() {
    loadlistnum = 6;
    loadsystem();
}

function load7() {
    loadlistnum = 7;
    loadsystem();
}

function load8() {
    loadlistnum = 8;
    loadsystem();
}
async function loadsystem() {
    //if(stcontinue!=null){
    //    loadlistnum = stcontinue
    //}r_cchangenum
    //11/05変更

    sessionStorage.setItem("load_n", loadlistnum);
    if (localStorage.getItem("check" + loadlistnum) != null) {

        var chara1 = document.getElementById("chara");
        var chara2;
        chara2 = document.getElementById("chara2");
        chara2.style.opacity = 0;
        chara2 = document.getElementById("chara3");
        chara2.style.opacity = 0;
        chara2 = document.getElementById("chara4");
        chara2.style.opacity = 0;
        chara2 = document.getElementById("chara5");
        chara2.style.opacity = 0;
        //キャラ
        if (localStorage.getItem("r_cchangenum" + loadlistnum) == 2) {
            chara2 = document.getElementById("chara2");
        } else if (localStorage.getItem("r_cchangenum" + loadlistnum) == 3) {
            chara2 = document.getElementById("chara3");
        } else if (localStorage.getItem("r_cchangenum" + loadlistnum) == 4) {
            chara2 = document.getElementById("chara4");
        } else if (localStorage.getItem("r_cchangenum" + loadlistnum) == 5) {
            chara2 = document.getElementById("chara5");
        }
        //キャラ
        //11/05↑
        const target = document.getElementById("back");
        const str2 = document.getElementById("str2");
        const str1 = document.getElementById("str1");
        datacheck = localStorage.getItem("check" + loadlistnum);


        chara1.style.opacity = localStorage.getItem("saveopacityc1" + loadlistnum);
        chara2.style.opacity = localStorage.getItem("saveopacityc2" + loadlistnum);
        //alert(chara2.style.opacity)
        r_cchangenum = localStorage.getItem("r_cchangenum" + loadlistnum); //11/05
        load_r_cc = false; //11/06
        sessionStorage.setItem("load_r_cc", load_r_cc); //11/06

        //9/19追加
        backnum = localStorage.getItem("backnum" + loadlistnum);
        BackSwitchstart(localStorage.getItem("backnum" + loadlistnum));
        CGnum = localStorage.getItem("CGnum" + loadlistnum);
        CGSwitchstart(localStorage.getItem("CGnum" + loadlistnum));
        //back_i = localStorage.getItem("saveback"+loadlistnum);
        //BackSwitchstart(backlist[backnum]);
        let json = localStorage.getItem("msg_dummy" + loadlistnum);
        msg_dummy = JSON.parse(json);
        let rdjson = localStorage.getItem("msg_rdummy" + loadlistnum);
        msg_rdummy = JSON.parse(rdjson);
        let mjson = localStorage.getItem("msg" + loadlistnum);
        msg = JSON.parse(mjson);
        //msg_dummy = localStorage.getItem("msg_dummy");
        const saveButton = document.getElementById("save" + loadlistnum);
        saveButton.disabled = false;
        ml_num = localStorage.getItem("ml_n" + loadlistnum);

        // br_chack = localStorage.getItem("br_chack");    

        num = localStorage.getItem("savenum" + loadlistnum);
        //clickcheck = true;

        if (localStorage.getItem("br_c" + loadlistnum) < branchcount) {
            msg = [];
            Array.prototype.splice.apply(msg, [0, 0].concat(msg_dummy));

        }

        if (branchcount >= 0 && localStorage.getItem("br_c" + loadlistnum) >= branchcount) {

            //alert(branchcount)

            //alert(br_chack)
            //alert(branchcount)

            //if (br_chack==true||branchcount == 0) {
            Array.prototype.splice.apply(msg, [0, 0].concat(msg_rdummy));

            //}
            if (num >= 2) {
                //alert(msg[num].indexOf("s") == 0)
                while (msg[num].indexOf("s") == 0) {
                    num--;
                }
            }
        } else {
            document.getElementById("str1").textContent = ".......";
        }
        ClickDisabled();

        branchcount = localStorage.getItem("br_c" + loadlistnum);
        str2.textContent = localStorage.getItem("savename" + loadlistnum);
        PlayBGMstart(localStorage.getItem("ml_n" + loadlistnum));
        //12/16↓
        while (msg[num].indexOf("s") == "0") {
            num++;
        }
        //num--;
        //12/16↑
        //9/20 お試し
        /*
           //savelistnum = toString(savelistnum);
             localStorage.setItem("check"+savelistnum,savelistnum);
             localStorage.setItem("saveopacityc1" +savelistnum,chara1.style.opacity);
             localStorage.setItem("saveopacityc2" +savelistnum,chara2.style.opacity);
             localStorage.setItem("br_c"+savelistnum,branchcount);
             localStorage.setItem("br_chack"+savelistnum,br_chack);
             localStorage.setItem("ml_n"+savelistnum,ml_num);
             localStorage.setItem("backnum"+savelistnum,backnum);
       
             jsonmsgrd = JSON.stringify(msg_rdummy);
             localStorage.setItem("msg_rdummy"+savelistnum,jsonmsgrd);
             jsonmsgd = JSON.stringify(msg_dummy);
             //alert("ok")
             localStorage.setItem("msg_dummy"+savelistnum,jsonmsgd);
             jsonmsg = JSON.stringify(msg_dummy);
             //alert("ok")
             localStorage.setItem("msg"+savelistnum,jsonmsg);
             //alert("ok")
             localStorage.setItem("savename"+savelistnum,str2.textContent);
             localStorage.setItem("savetext"+savelistnum,str1.textContent);
              
                 //if (msg[num-2].indexOf("s") == "0"&&msg[num-1].indexOf("s") == "0") {
                   //  localStorage.setItem("savenum"+savelistnum, num-3);
                 //}else if (msg[num-1].indexOf("s") == "0") {
                   //  localStorage.setItem("savenum"+savelistnum, num-2);
                 //}else{
                     localStorage.setItem("savenum"+savelistnum, num-1);
                     */

        if (loadlistnum <= 8) { //11/06

            alert("ロードしました");
        }

        //str1.textContent = localStorage.getItem("savetext"+loadlistnum);
        saveend();
    } else {
        alert("セーブデータがありません");
    }
}
async function t_loadsystem(pCheck) {

    //const t_loadlistnum = sessionStorage.getItem('t_loadlistnum');
    var t_loadlistnum = pCheck;
    sessionStorage.setItem("tload_n", t_loadlistnum);
    //alert(sessionStorage.getItem("tload"));
    datacheck = localStorage.getItem("check" + t_loadlistnum);
    if (localStorage.getItem("check" + t_loadlistnum) != null) {
        //alert(sessionStorage.getItem('t_loadlistnum'));
        var chara1 = document.getElementById("chara");
        var chara2 = document.getElementById("chara2");
        chara2.style.opacity = 0;
        chara2 = document.getElementById("chara3");
        chara2.style.opacity = 0;
        chara2 = document.getElementById("chara4");
        chara2.style.opacity = 0;
        chara2 = document.getElementById("chara5");
        chara2.style.opacity = 0;
        //右側キャラ全非表示

        //alert(localStorage.getItem("r_cchangenum" + t_loadlistnum));
        if (localStorage.getItem("r_cchangenum" + t_loadlistnum) == 2) {
            chara2 = document.getElementById("chara2");
        } else if (localStorage.getItem("r_cchangenum" + t_loadlistnum) == 3) {
            chara2 = document.getElementById("chara3");
        } else if (localStorage.getItem("r_cchangenum" + t_loadlistnum) == 4) {
            chara2 = document.getElementById("chara4");
        } else if (localStorage.getItem("r_cchangenum" + t_loadlistnum) == 5) {
            chara2 = document.getElementById("chara5");
        }

        //11/05↑
        const target = document.getElementById("back");
        const str1 = document.getElementById("str1");
        const str2 = document.getElementById("str2");

        chara1.style.opacity = localStorage.getItem("saveopacityc1" + t_loadlistnum);
        chara2.style.opacity = localStorage.getItem("saveopacityc2" + t_loadlistnum);
        /*
        r_cchangenum = localStorage.getItem("r_cchangenum" + loadlistnum); //11/05
        load_r_cc = false; //11/06
        sessionStorage.setItem("load_r_cc", load_r_cc); //11/06

        //9/19追加
        backnum = localStorage.getItem("backnum" + loadlistnum);
        BackSwitchstart(localStorage.getItem("backnum" + loadlistnum));
        CGnum = localStorage.getItem("CGnum" + loadlistnum);
        CGSwitchstart(localStorage.getItem("CGnum" + loadlistnum));
        //back_i = localStorage.getItem("saveback"+loadlistnum);
        //BackSwitchstart(backlist[backnum]);

*/
        r_cchangenum = localStorage.getItem("r_cchangenum" + t_loadlistnum); //11/05 /2/3
        t_load_r_cc = false; //11/05
        sessionStorage.setItem("t_load_r_cc", t_load_r_cc); //11/06

        //r_cchangenum = localStorage.getItem("r_cchangenum"+t_loadlistnum); //11/05
        //9/19追加
        backnum = localStorage.getItem("backnum" + t_loadlistnum);
        BackSwitchstart(localStorage.getItem("backnum" + t_loadlistnum));
        CGnum = localStorage.getItem("CGnum" + t_loadlistnum);
        CGSwitchstart(localStorage.getItem("CGnum" + t_loadlistnum));
        //back_i = localStorage.getItem("saveback"+loadlistnum);
        //BackSwitchstart(backlist[backnum]);
        let json = localStorage.getItem("msg_dummy" + t_loadlistnum);
        msg_dummy = JSON.parse(json);
        let rdjson = localStorage.getItem("msg_rdummy" + t_loadlistnum);
        msg_rdummy = JSON.parse(rdjson);
        let mjson = localStorage.getItem("msg" + t_loadlistnum);
        msg = JSON.parse(mjson);
        //msg_dummy = localStorage.getItem("msg_dummy");
        const saveButton = document.getElementById("save" + t_loadlistnum);
        saveButton.disabled = false;
        ml_num = localStorage.getItem("ml_n" + t_loadlistnum)
            // br_chack = localStorage.getItem("br_chack");    

        num = localStorage.getItem("savenum" + t_loadlistnum);
        //clickcheck = true;

        if (localStorage.getItem("br_c" + t_loadlistnum) < branchcount) {
            msg = [];
            Array.prototype.splice.apply(msg, [0, 0].concat(msg_dummy));

        }

        if (branchcount >= 0 && localStorage.getItem("br_c" + t_loadlistnum) >= branchcount) {
            if (br_chack == true || branchcount == 0) {
                Array.prototype.splice.apply(msg, [0, 0].concat(msg_rdummy));

            }
            if (num >= 2) {
                //alert(msg[num].indexOf("s") == 0)
                while (msg[num].indexOf("s") == 0) {
                    num--;
                }
            }
        } else {
            document.getElementById("str1").textContent = ".......";
        }
        //alert(num);

        //alert(msg[num]);
        ClickDisabled();

        branchcount = localStorage.getItem("br_c" + t_loadlistnum);
        str2.textContent = localStorage.getItem("savename" + t_loadlistnum);
        PlayBGMstart(localStorage.getItem("ml_n" + t_loadlistnum))
            //12/16↓
        while (msg[num].indexOf("s") == "0") {
            num++;
        }


        //12/16↑
        //9/20 お試し

        //savelistnum = toString(savelistnum);
        /* 
        localStorage.setItem("check"+savelistnum,savelistnum);
        localStorage.setItem("saveopacityc1" +savelistnum,chara1.style.opacity);
        localStorage.setItem("saveopacityc2" +savelistnum,chara2.style.opacity);
        localStorage.setItem("br_c"+savelistnum,branchcount);
        localStorage.setItem("br_chack"+savelistnum,br_chack);
        localStorage.setItem("ml_n"+savelistnum,ml_num);
        localStorage.setItem("backnum"+savelistnum,backnum);
    
        jsonmsgrd = JSON.stringify(msg_rdummy);
        localStorage.setItem("msg_rdummy"+savelistnum,jsonmsgrd);
        jsonmsgd = JSON.stringify(msg_dummy);
        //alert("ok")
        localStorage.setItem("msg_dummy"+savelistnum,jsonmsgd);
        jsonmsg = JSON.stringify(msg_dummy);
        //alert("ok")
        localStorage.setItem("msg"+savelistnum,jsonmsg);
        //alert("ok")
        localStorage.setItem("savename"+savelistnum,str2.textContent);
        localStorage.setItem("savetext"+savelistnum,str1.textContent);
         
            //if (msg[num-2].indexOf("s") == "0"&&msg[num-1].indexOf("s") == "0") {
              //  localStorage.setItem("savenum"+savelistnum, num-3);
            //}else if (msg[num-1].indexOf("s") == "0") {
              //  localStorage.setItem("savenum"+savelistnum, num-2);
            //}else{
                localStorage.setItem("savenum"+savelistnum, num-1);*/
    }


    const saveButton = document.getElementById("save");
    const loadButton = document.getElementById("load");
    const savelistButton = document.getElementById("savelist");
    const loadlistButton = document.getElementById("loadlist");
    loadlistButton.disabled = false;
    savelistButton.disabled = false;
    saveButton.disabled = false;
    loadButton.disabled = false;
    //sessionStorage.clear()
}
var c = 1;

function Name_Switch_bl(n) {
    switch (n) {
        case "s_null":
            namewin = "  ";
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
        default:
            namewin = "  ";
            //msg_bl = msg[num - (i + c)]
            //alert(msg_bl)
            //Name_Switch_bl(msg[num - (i + c)])
            //c++;
            break;
    }
    return namewin;
}

function Clickbacklog() {
    const bl1 = document.getElementById("bl1");
    const blBG = document.getElementById("blBG");
    const blButton = document.getElementById("backlog");
    //const tb = document.getElementById("textbox");
    bl1.textContent = "";
    var backlimit = 50;
    backsetmes();
    //alert(msg[num - (i + c)])

    function backsetmes() {
        if (num >= backlimit) {
            for (let i = 1; i < (backlimit); i++) {
                if (msg[num - i].indexOf("s") != "0") {
                    var namebl = Name_Switch_bl(msg[num - (i + 1)])
                        //alert(msg[num - (i + c)])

                    //bl1.insertAdjacentText('afterbegin', "「" + msg[num - i] + "」");
                    if (namebl != "  ") {
                        bl1.insertAdjacentText('afterbegin', namebl + "「" + msg[num - i] + "」");
                    } else {
                        bl1.insertAdjacentText('afterbegin', namebl + "" + msg[num - i] + "");

                    }
                    //bl1.insertAdjacentText('afterbegin', bl1.innerText += "\n\n")
                    const lineBreak = document.createElement('br');
                    bl1.insertBefore(lineBreak, bl1.firstChild);
                    const lineBreak2 = document.createElement('br');
                    bl1.insertBefore(lineBreak2, bl1.firstChild);
                    //bl1.innerTEXT = `${bl1.innerText} \n ${bl1.innerText}`;
                    //alert(bl1.innerText)
                }
            }
        } else {
            backlimit--;
            backsetmes();
        }
    }
    if (bl1.style.opacity == 0) {
        blBG.style.opacity = 0.6;
        bl1.style.opacity = 1;
        st = false;
        blButton.style.zIndex = 5;

        blBG.style.zIndex = 3;

    } else {
        blBG.style.opacity = 0;
        bl1.style.opacity = 0;
        blButton.style.zIndex = 2;
        bl1.textContent = null
        st = true;
        blBG.style.zIndex = 0;
    }
}

async function co_MouseClick_game() {
    savelistnum = 9;
    savesystem();
    con_l = 1;
    sessionStorage.setItem("configlocation", con_l)
    await locationconf();
    async function locationconf() {
        window.location.href = "config.html";
    }

}

function loadconfig() {
    loadlistnum = 9;
    sessionStorage.setItem("loadlistnum", loadlistnum);
    if (loadlistnum == 9) {
        window.location.href = "game.html";
    }

    loadsystem();
}

function titlereturn() {
    var res = confirm("タイトル画面へ戻りますか？\n※保存していないデータは削除されます！");
    if (res == true) {
        var videoflag_c = true;
        sessionStorage.clear()
        sessionStorage.setItem("tr", true)
        sessionStorage.setItem("vf", videoflag_c);
        window.location.href = "index.html";
    }
}
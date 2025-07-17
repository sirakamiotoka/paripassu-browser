
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;

app.on('ready', () => {
    // mainWindow を作成
    sw = 256;
    sh = 195;
    //sw *= 0.7;
    //sh *= 0.7;
    // 画面の高さ
    
    mainWindow = new BrowserWindow({maximizable: false,width: sw*0.9,height: sh*0.9,frame: true, useContentSize: false,resizable:false});
    mainWindow.setMenuBarVisibility(false);
    mainWindow.setAspectRatio(sw/sh);
    mainWindow.setFullScreenable(false);
    
    // html を指定
    let path = 'file://' + __dirname + '/index.html';
    mainWindow.loadURL(path);

    // developper tool を開く
    // mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
    
});
//1330

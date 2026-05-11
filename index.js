const electron = require('electron');
const ffmeg = require('fluent-ffmpeg');

const { app, BrowserWindow } = electron;
const remote = require('@electron/remote/main');
remote.initialize();

app.on('ready', () => {
    console.log("App is ready");
    const mainWindow = new BrowserWindow({
        height: 800,
        width: 600,
        webPrefrences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableremoteModule: true,
        }
    });
    remote('@electron/remote/main').enable(mainWindow.webContents);
    mainWindow.loadURL(`file://${__dirname}/index.html`);
});
ipcMain.on("video:submit", (event, filePath) => {
    console.log("processing video information", filePath);
    ffmeg.ffprobe(filePath, (err, metadata) => {
        if (err) {
            console.log("FFprobe error: ", err);
            event.reply("video:error",err);
            return;
        } 
        if(!metadata || !metadata.format){
            console.log("metadata error: ", metadata);
            event.reply("video:error", err);
            return;
        }
        constduration = metadata.format.duration;
        console.log("Duration", duration);
        event.reply('video:durationanaylyzed', duration);
    });
});
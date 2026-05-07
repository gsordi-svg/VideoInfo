import electron from 'electron';
const { app, BrowserWindow } = electron;

app.on('ready', function() {
    console.log("App is ready");
    const mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/index.html`);
});
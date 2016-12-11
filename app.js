require('console-stamp')(console, 'HH:MM:ss.l');
const {BrowserWindow} = require('electron')
const electron = require('electron')
const SteamTotp = require('steam-totp');
const Config = require('electron-config');
const path = require('path')
const url = require('url')


const app = electron.app
const config = new Config();

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({ width: 800, height: 900, frame: false })
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))
    console.log('Window Created');
    console.log(config.path);
    mainWindow.webContents.openDevTools()
    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})








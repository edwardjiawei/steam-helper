const {BrowserWindow} = require('electron').remote
const {ipcMain} = require('electron').remote
const WinJS = require('winjs');
const electron = require('electron')
const app = require('electron').remote;
const url = require('url')
const path = require('path')

Object.keys(config.get()).forEach(function (key) {
    var ava = config.get(key + ".avatar");
    var secret = config.get(key + ".shared_secret");
    if (ava != 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/00/0000000000000000000000000000000000000000_full.jpg') {
        var avatar = config.get(key + ".avatar");
    } else {
        var avatar = 'img/ava.png';
    }
    setTimeout(function () { console.log(SteamTotp.generateAuthCode(secret)); }, 3000);
    document.getElementById('accounts').innerHTML += '<li id="' + key + '" onclick="userWindow(this.id)" ><img src="' + avatar + '"><h3>' + key + '</h3><p>Code: </p></li>'
});

function userWindow(username) {
    let userWindow = new BrowserWindow({ width: 500, height: 400, modal: true, show: false, frame: false })
    userWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'userWindow.html'),
        protocol: 'file:',
        slashes: true
    }))
    userWindow.show()
    userWindow.webContents.openDevTools()
    userWindow.webContents.on('dom-ready', function () {
        userWindow.webContents.send('username', username);
        console.log('username sent');
    }); 
}

function addAccount() {
    const {BrowserWindow} = require('electron').remote
    let child = new BrowserWindow({ width: 500, height: 400, modal: true, show: false, frame: false })
    child.loadURL(url.format({
        pathname: path.join(__dirname, 'addAccount.html'),
        protocol: 'file:',
        slashes: true
    }))
    child.show()
    child.webContents.openDevTools()
}

var kappa;
var request = require('request');
request('http://store.steampowered.com/api/appdetails?appids=730', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        parsed = JSON.parse(body);
        console.log(parsed['730']['data']['header_image']);
    }
})
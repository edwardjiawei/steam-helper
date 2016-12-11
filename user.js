const {ipcRenderer} = require('electron')

ipcRenderer.on('username', (event, data) => {
    document.getElementById('title').innerHTML += ' - ' + data;
    logIn(data);
    //console.log(client.getOwnedApps());

})


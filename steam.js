const SteamTotp = require('steam-totp');
const Config = require('electron-config');
const SteamUser = require('steam-user');
const config = new Config();
const client = new SteamUser({
    promptSteamGuardCode: false,
    enablePicsCache: true
});

setInterval("checkConnection();", 1000);

function logIn(user) {
    smalltalk.prompt('Question', 'Password for ' + user).then(function (pass) {
          client.logOn({
              accountName: user,
              password: pass,
              twoFactorCode: SteamTotp.generateAuthCode(config.get(user + '.shared_secret'))
        });
         }, function () {
        console.log('cancel');
    });
    client.on('loggedOn', function (detail) {
        console.log(user + " logged in! ");
        client.getPersonas([client.steamID.getSteamID64()], (personas) => {
            var hash = personas[client.steamID.getSteamID64()].avatar_hash.toString('hex');
            var url = "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/" + hash.substring(0, 2) + "/" + hash + "_full.jpg";
            config.set(user + '.avatar', url);
            config.set(user + '.id', client.steamID.getSteamID64()); 
        });
    });

    client.on('error', function (err) {
        console.log(err);
    });

    client.on('debug', function (text) {
        console.log(text);
    });
}

function checkConnection() {
    if (client.steamID != null) {
        document.getElementById("status").style.color = "green";
    } else {
        document.getElementById("status").style.color = "red";
    }
}


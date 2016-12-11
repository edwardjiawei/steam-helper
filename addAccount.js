var SteamCommunity = require("steamcommunity");
var community = new SteamCommunity();
var code;
var steamCode;
var username;


function login() {
    var username = document.getElementsByName("login")[0].value;
    community.login({
        "accountName": document.getElementsByName("login")[0].value,
        "password": document.getElementsByName("pass")[0].value,
    }, function (err, sessionId, cookies, steamguard) {
        if (err) {
            console.log(err);
            smalltalk.prompt('Question', 'Guard code', '').then(function (response) {
                console.log(response);
                steamCode = response;
                community.login({
                    "accountName": document.getElementsByName("login")[0].value,
                    "password": document.getElementsByName("pass")[0].value,
                    "authCode": steamCode,
                }, function (err, sessionId, cookies, steamguard) {
                    if (err) {
                        console.log("Err after community login: " + err);
                    } else {
                        enable2fa();
                        document.getElementById('handler').innerHTML = "Logged in!";
                    }
                });
            }, function () {
                console.log('cancel');
            });
           
        } else {
            enable2fa();
            document.getElementById('handler').innerHTML = "Logged in!";
        }
    });
}

function enable2fa() {
    community.enableTwoFactor(function (err, resp) {
        if (err) {
            console.log(err.message);
        } else {
            if (resp.status != 1) {
                console.log("Failed: " + resp.status);
            } else {
                var username = document.getElementsByName("login")[0].value;
                config.set(username, resp);
                    console.log("Response saved as " + username + ".2fa");
                    smalltalk.prompt('Question', 'SMS code', '').then(function (response) {
                        console.log(response);
                        code = response;
                        finalize2fa(resp['shared_secret'], code);
                    }, function () {
                        console.log('cancel');
                    });

            }
        }
    });
}

function finalize2fa(shared_secret, code) {
    community.finalizeTwoFactor(shared_secret, code, function (err) {
        if (err) {
            console.log(err);
        } else {
            document.getElementById('handler').innerHTML = "Token created!";
        }
    });
}
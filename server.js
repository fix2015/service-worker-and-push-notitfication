/**
 * Created by semianchuk on 04.04.16.
 */
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var app = express().use(express.static(
    path.join(__dirname, '/app/')
))

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const webpush = require('web-push');


const vapidKeys = webpush.generateVAPIDKeys();

webpush.setGCMAPIKey('AIzaSyBAlrG9mUI7Z1Ta2kkO3dz7Umn6FBXe1Fc');
webpush.setVapidDetails(
    'mailto:fix20152@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);
const pushSubscription = {"endpoint":"https://fcm.googleapis.com/fcm/send/e2L42wAB2PQ:APA91bF3cidItVPAqeLZwgWWkMSoeWPbE2xQ05xSsyf19ZpSOUKTrwkfsIcnr3NvQxV0aUpOH1WJD1UFRSqJ8k_4pyaI-ZtuGFQOeLiWTPV-RwodaQcL-BimSDwg8hyRTZlKnKTlqm_n","keys":{"p256dh":"BAHkHv8wYJ_GpfhT2ubgb2vEm_pT_LE2A2X0RLZhf35ixHvLdwwDXpI_tbeUov4UpDBEyLigHauzxz6DuL9GKns=","auth":"BvKuhDlevQkDXvYZFwAetQ=="}}
//const pushSubscription = {"endpoint":"https://updates.push.services.mozilla.com/wpush/v1/gAAAAABYIyRLXevacQhqrx_I4Ua70M4T-22M_8LhH_yhYpyPay55q0W9O8ZHMR1KDDclaOM8gBuCrOhxTiyj4mouKdRTbYN5GqKGc5zkIN9x-nnxY7CRRk2sk4Az3MOP9PHSgU0dAdYV","keys":{"auth":"TSk-nMCrujjKTEXAONef8A","p256dh":"BFQkLFrNsPa4tjDACWsmRkmJOtEBo74YuPBZEWTdpS5_njLuaINsD0-yhpJ9Zb1hItBbTD-64fwjGO8MP5mebfg"}}

const options = {
    gcmAPIKey: 'AIzaSyBAlrG9mUI7Z1Ta2kkO3dz7Umn6FBXe1Fc',
    vapidDetails: {
        subject: 'mailto:fix20152@gmail.com',
        publicKey: vapidKeys.publicKey,
        privateKey: vapidKeys.privateKey
    },
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'key=AIzaSyBAlrG9mUI7Z1Ta2kkO3dz7Umn6FBXe1Fc',
    }
}


app.get('/sendNotification', function(req, res) {

    webpush.sendNotification(
        pushSubscription,
        '< Push Payload String >',
        options
    ).then(function (res) {
        console.log(res)
    })
    .catch(function(error){
        console.log(error);
        //process.exit(1);
    });

    console.log('done')
}, function(err) {
    console.log(err);
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/app/index.html');
});
console.log('Server running: http://localhost:8080')
app.listen(8081);

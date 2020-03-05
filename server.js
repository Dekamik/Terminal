require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/ping', function (req, res) {
    return res.send('pong');
});

app.get('/departures', function (req, res) {
    request({
        uri: 'http://api.sl.se/api2/realtimedeparturesV4.JSON',
        qs: {
            key: process.env.SL_REAL_TIME_INFO_API_KEY,
            siteid: '3522',
            timewindow: '60'
        },
    }).pipe(res);
});

app.get('/api/deviations', function (req, res) {

});

app.get('/weather-home', function (req, res) {

});

app.get('/weather-airport', function (req, res) {

});

const listener = app.listen(process.env.API_PORT, function () {
    console.log("Backend API is listening on port " + listener.address().port);
});

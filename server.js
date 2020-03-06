require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const weather = require('weather-js');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/ping', function (req, res) {
    return res.send('pong');
});

app.get('/departures', function (req, res) {
    request({
        uri: 'http://api.sl.se/api2/realtimedeparturesV4.JSON',
        qs: {
            key: process.env.SL_REAL_TIME_API_KEY,
            siteid: process.env.SL_REAL_TIME_SITE_ID,
            timewindow: process.env.SL_REAL_TIME_TIME_WINDOW_MINS
        },
    }).pipe(res);
});

app.get('/deviations', function (req, res) {
    request({
        uri: 'https://api.sl.se/api2/deviations.JSON',
        qs: {
            key: process.env.SL_DEVIATIONS_API_KEY,
            lineNumber: process.env.SL_DEVIATIONS_LINES,
            transportMode: process.env.SL_DEVIATIONS_MODES
        }
    }).pipe(res);
});

app.get('/weather', function (req, res) {
    weather.find({search: req.query.place, degreeType: 'C'}, (err, result) => {
        if (err) console.error(err);
        res.send(result);
    });
});

const listener = app.listen(process.env.API_PORT, function () {
    console.log("Backend API is listening on port " + listener.address().port);
});

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const yrno = require('yr.no-forecast')({
    request: {
        timeout: 15000
    }
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/ping', function (req, res) {
    return res.send('pong');
});

app.get('/busstop', function (req, res) {
    request({
        uri: 'https://api.sl.se/api2/typeahead.json',
        qs: {
            key: process.env.SL_PLACES_API_KEY,
            searchstring: process.env.SL_PLACES_BUS_STOP_NAME
        }
    }).pipe(res);
});

app.get('/departures', function (req, res) {
    request({
        uri: 'http://api.sl.se/api2/realtimedeparturesV4.JSON',
        qs: {
            key: process.env.SL_REAL_TIME_API_KEY,
            siteid: req.query.siteId,
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
    let response = {};
    let weather = undefined;
    yrno.getWeather(req.query)
        .then(data => { weather = data })
        .then(() => weather.getForecastForTime(new Date()))
        .then(current => response.current = current)
        .then(() => weather.getFiveDaySummary())
        .then(forecast => response.forecast = forecast)
        .then(() => res.send(response));
});

const listener = app.listen(process.env.API_PORT, function () {
    console.log("Backend API is listening on port " + listener.address().port);
});

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

app.get('/busstop', (req, res) => {
    request({
        uri: 'https://api.sl.se/api2/typeahead.json',
        qs: req.query
    }).pipe(res);
});

app.get('/departures', (req, res) => {
    request({
        uri: 'http://api.sl.se/api2/realtimedeparturesV4.JSON',
        qs: req.query
    }).pipe(res);
});

app.get('/deviations', (req, res) => {
    request({
        uri: 'https://api.sl.se/api2/deviations.JSON',
        qs: req.query
    }).pipe(res);
});

app.get('/weather', (req, res) => {
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

const listener = app.listen(process.env.API_PORT, () => 
    console.log("Dispatcher is listening on port " + listener.address().port)
);

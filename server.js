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
    console.log("Fetching departures")
    request({
        uri: 'http://api.sl.se/api2/realtimedeparturesV4.JSON',
        qs: {
            key: '',
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

const listener = app.listen(process.env.PORT || 8080, function () {
    console.log("Backend API is listening on port " + listener.address().port);
});


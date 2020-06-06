var express = require('express');
var router = express.Router();

const realtimeDevJson = require('../devJSON/realtimeBhamMay18.json');
const nowcastDevJson = require('../devJSON/nowcastBhamMay18.json');
const hourlyDevJson = require('../devJSON/hourlyBhamMay18.json');
const dailyDevJson = require('../devJSON/dailyBhamMay18.json');

/* GET and send static JSON */
router.get('/', function (req, res, next) {
  res.json({realTime: realtimeDevJson, nowcast: nowcastDevJson, hourly: hourlyDevJson, daily:dailyDevJson});
});

/* POST and fetch weather data */
router.post('/', function (req, res, next) {
  res.json({realTime: realtimeDevJson, nowcast: nowcastDevJson, hourly: hourlyDevJson, daily:dailyDevJson});
});

const getForecast = (req, res, next) => {
  if (req.body.isDevMode) {
    console.log('DEV MODE - Loading static weather data');

    // Adds myId to each hour of hourlyForecast
    for (let index = 0; index < hourlyDevJson.length; index++) {
      hourlyDevJson[index].myId = index;
    }
    // Adds myId to each day of dailyForecast
    for (let index = 0; index < dailyDevJson.length; index++) {
      dailyDevJson[index].date = addDays(new Date(), index);
      dailyDevJson[index].myId = index;
    }

    res.json({
      realtimeForecast: realtimeDevJson,
      nowcastForecast: nowcastDevJson,
      hourlyForecast: hourlyDevJson,
      dailyForecast: dailyDevJson,
    });
  }
};

const reverseGeocode = () => {};

// const splitLatLong = () => { }

const getWeatherData = () => {};

const getRealtimeForecast = () => {};

const getNowcastForecast = () => {};

const getHourlyForecast = () => {};

const getDailyForecast = () => {};

module.exports = router;

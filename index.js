const express = require('express');
const router = express.Router();

const { getWeatherData } = require('./middleware/getWeatherData.js');

router.post('/test', (req, res, next) => {
  req.body.isDevMode = false;
  req.body.latLong = '48.71,-122.45';
  getWeatherData(req, res, next);
});

/* GET and send static JSON */
router.get('/static', function (req, res, next) {
  let isStatic = true;
  res.json({
    isStatic: isStatic,
    realtime: realtimeDevJson,
    nowcast: nowcastDevJson,
    hourly: hourlyDevJson,
    daily: dailyDevJson,
  });
});

/* POST and fetch weather data */
router.get('/', function (req, res, next) {
  // TODO - change this to a POST request instead of a GET, to POST geo data
  res.send('test');
});

module.exports = router;

const express = require('express');
const router = express.Router();

// Business Logic //
const { getWeatherData } = require('./middleware/getWeatherData.js');

// Static data //
const realtimeDevJson = require('./devJSON/realtimeBhamMay18.json');
const nowcastDevJson = require('./devJSON/nowcastBhamMay18.json');
const hourlyDevJson = require('./devJSON/hourlyBhamMay18.json');
const dailyDevJson = require('./devJSON/dailyBhamMay18.json');

router.get('/test', (req, res, next) => {
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
router.post('/', async function (req, res, next) {
  console.log('req.body: ', req.body);
  await getWeatherData(req, res, next);
  res.json(res.locals);
});

module.exports = router;

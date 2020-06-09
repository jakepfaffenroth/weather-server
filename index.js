const express = require('express');
const router = express.Router();

// Business Logic //
const { getWeatherData } = require('./middleware/getWeatherData.js');
const { splitLatLong, processGeolocation, geocode } = require('./middleware/processGeolocation.js');

// Static data //
const realtimeDevJson = require('./devJSON/realtimeBhamMay18.json');
const nowcastDevJson = require('./devJSON/nowcastBhamMay18.json');
const hourlyDevJson = require('./devJSON/hourlyBhamMay18.json');
const dailyDevJson = require('./devJSON/dailyBhamMay18.json');

router.get('/test', async (req, res, next) => {
  req.body.isDevMode = false;
  req.body.latLong = '48.71,-122.45';
  await getWeatherData(req, res, next);
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

/* POST and fetch weather data on app load */
router.post('/', async function (req, res, next) {
  console.log('app load req.body: ', req.body);
  await getWeatherData(req, res, next);
});

/* POST and process geo search string */
router.post('/geosearch', async function (req, res, next) {
  console.log('geosearch req.body: ', req.body);
  await geocode(req, res, next);
  getWeatherData(req, res, next)
});

module.exports = router;

const { addDays } = require('date-fns');

// Static weather data for dev mode
const realtimeDevJson = require('../devJSON/realtimeBhamMay18.json');
const nowcastDevJson = require('../devJSON/nowcastBhamMay18.json');
const hourlyDevJson = require('../devJSON/hourlyBhamMay18.json');
const dailyDevJson = require('../devJSON/dailyBhamMay18.json');

exports.checkIfDevMode = async (req, res, next) => {
  console.log('... checking if dev mode');
  // let isStatic = false;

  // if app is in Dev Mode, respond with static data
  if (req.body.isDevMode) {
    console.log('...... DEV MODE - Loading static weather data');

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
      isStatic: true,
      realtimeForecast: realtimeDevJson,
      nowcastForecast: nowcastDevJson,
      hourlyForecast: hourlyDevJson,
      dailyForecast: dailyDevJson,
    });
  } else {
    console.log('...... Not in Dev Mode');
    // Not dev mode, so proceed to fetching weather data
    // next();
  }
};

const axios = require('axios');
const addDays = require('date-fns/addDays');

const { checkIfDevMode } = require('./checkIfDevMode.js');
const { splitLatLong, reverseGeocode, geocode } = require('./processGeolocation.js');

module.exports.getWeatherData = async (req, res, next) => {
  res.locals.geo = {};
  splitLatLong(req, res, next);
  await checkIfDevMode(req, res, next);
  await reverseGeocode(req, res, next);
  Promise.all([
    getRealtimeForecast(req, res, next),
    getHourlyForecast(req, res, next),
    getDailyForecast(req, res, next),
  ]).then(() => {
    res.json(res.locals);
  });
};

const getRealtimeForecast = async (req, res, next) => {
  let url =
    'https://api.climacell.co/v3/weather/realtime?lat=' +
    res.locals.geo.lat +
    '&lon=' +
    res.locals.geo.long +
    '&unit_system=us&fields=precipitation,precipitation_type,temp,feels_like,dewpoint,wind_speed,wind_gust,baro_pressure,visibility,humidity,wind_direction,sunrise,sunset,cloud_cover,cloud_ceiling,cloud_base,surface_shortwave_radiation,moon_phase,weather_code&apikey=' +
    process.env.WEATHER_API;

  try {
    const axiosRes = await axios.get(url);
    // Log response status to console
    console.log('Realtime response: ', axiosRes.status, axiosRes.statusText);

    res.locals.realtime = axiosRes.data;
  } catch (err) {
    console.log(err);
  }
};

const getHourlyForecast = async (req, res, next) => {
  let url =
    'https://api.climacell.co/v3/weather/forecast/hourly?lat=' +
    res.locals.geo.lat +
    '&lon=' +
    res.locals.geo.long +
    '&unit_system=us&start_time=now&fields=precipitation,precipitation_type,precipitation_probability,temp,feels_like,dewpoint,wind_speed,wind_gust,baro_pressure,visibility,humidity,wind_direction,sunrise,sunset,cloud_cover,cloud_ceiling,cloud_base,surface_shortwave_radiation,moon_phase,weather_code&apikey=' +
    process.env.WEATHER_API;

  try {
    const axiosRes = await axios.get(url);
    // Log response status to console
    console.log('Hourly response: ', axiosRes.status, axiosRes.statusText);

    // Adds myId to each hour of hourlyForecast
    for (let index = 0; index < axiosRes.data.length; index++) {
      axiosRes.data[index].myId = index;
    }

    res.locals.hourly = axiosRes.data;
  } catch (err) {
    console.log(err);
  }
};

const getDailyForecast = async (req, res, next) => {
  let url =
    'https://api.climacell.co/v3/weather/forecast/daily?lat=' +
    res.locals.geo.lat +
    '&lon=' +
    res.locals.geo.long +
    '&unit_system=us&fields=precipitation,precipitation_accumulation,temp,feels_like,wind_speed,baro_pressure,visibility,humidity,wind_direction,sunrise,sunset,moon_phase,weather_code&apikey=' +
    process.env.WEATHER_API;

  try {
    const axiosRes = await axios.get(url);
    // Log response status to console
    console.log('Daily response: ', axiosRes.status, axiosRes.statusText);

    // Adds myId and Date to each day of dailyForecast
    for (let index = 0; index < axiosRes.data.length; index++) {
      axiosRes.data[index].date = addDays(new Date(), index);
      axiosRes.data[index].myId = index;
    }

    res.locals.daily = axiosRes.data;
  } catch (err) {
    console.log(err);
  }
};

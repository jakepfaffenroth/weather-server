const axios = require('axios');

const splitLatLong = async (req, res, next) => {
  console.log('... splitting LatLong');
  let latLongArray = req.body.latLong.split(',');
  res.locals.lat = latLongArray[0];
  res.locals.long = latLongArray[1];
  // next();
};

const reverseGeocode = async (req, res, next) => {
  let url =
    'https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?prox=' +
    req.body.latLong +
    '%2C250&mode=retrieveAddresses&maxresults=1&gen=9&apiKey=' +
    process.env.HERE_API;

  const axiosResponse = await axios.get(url);
  res.locals.city = axiosResponse.View[0].Result[0].Location.Address.City;
  res.locals.State = axiosResponse.View[0].Result[0].Location.Address.State;
};

module.exports = { splitLatLong, reverseGeocode };

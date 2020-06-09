const axios = require('axios');

module.exports.processGeolocation = async (req, res, next) => {
  // Splits lat and long for urls
  console.log('... splitting LatLong');
  let latLongArray = req.body.latLong.split(',');
  res.locals.geo.lat = latLongArray[0];
  res.locals.geo.long = latLongArray[1];

  // Reverse geocode lookup
  let url =
    'https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?prox=' +
    req.body.latLong +
    '%2C250&mode=retrieveAddresses&maxresults=1&gen=9&apiKey=' +
    process.env.HERE_API;

  const axiosRes = await axios.get(url);
  res.locals.geo.city = axiosRes.data.Response.View[0].Result[0].Location.Address.City;

  res.locals.geo.state = axiosRes.data.Response.View[0].Result[0].Location.Address.State;
};

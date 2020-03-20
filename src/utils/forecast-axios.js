const axios = require('axios');

const forecast = (longitude, latitude, callback) => {
  const apikey = '7197f5cab59240d0e0e09e9e3c565641';
  const url = `https://api.darksky.net/forecast/${apikey}/${latitude},${longitude}`;

  axios.get(url)
  .then(({ data }) => {
    if (data.error) {
      callback('Unable to find location.', undefined);
    } else {
      const returnString =`${data.daily.data[0].summary} It is currently ${data.currently.temperature} degrees out. There is a ${data.currently.precipProbability * 100}% chance of rain.`;
      callback(undefined, returnString);
    }
  })
  .catch((error) => {
    callback('Unable to connect to forecast services.', undefined);
  })
}

module.exports = forecast;
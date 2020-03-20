/*
  request@2.88.2: request has been deprecated, 
  see https://github.com/request/request/issues/3142
 */
const request = require('request');

const forecast = (longitude, latitude, callback) => {
  const apikey = '7197f5cab59240d0e0e09e9e3c565641';
  const url = `https://api.darksky.net/forecast/${apikey}/${latitude},${longitude}`;

  request({url, json: true}, (error, { body }) => {
    if (error) {
      callback('Unable to connect to forecast services.', undefined);
    } else if (body.error) {
      callback('Unable to find location.', undefined);
    } else {
      // const returnObject = {
      //   summary: body.daily.data[0].summary,
      //   currentTemp: body.currently.temperature,
      //   precipProbability: body.currently.precipProbability
      // };
      const returnString =`${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability * 100}% chance of rain.`;
      callback(undefined, returnString);
    }
  })
}

module.exports = forecast;
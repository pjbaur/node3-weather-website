const axios = require('axios');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicGpiYXVyIiwiYSI6ImNrN3VwNWN6MDAwOHMzbXFsaTRibWZtZmcifQ.YyVR0d_7Kk4jMstAFcgKRw&limit=1`;

  axios.get(url)
  .then(({data}) => {
    if (data.features.length === 0) {
      callback('Enable to find location. Try another search.', undefined);
    } else {
      callback(undefined, {
        latitude: data.features[0].center[1],
        longitude: data.features[0].center[0],
        location: data.features[0].place_name
      })
    }
  })
  .catch((error) => {
    callback('Unable to connect to location services.', undefined)
  });
}

module.exports = geocode;
const request = require('request')

const API_KEY = `4b2dfca5ef55d789d6d331358e74fc88`;
const forecast=(lat,lon,callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${lat} ${lon}`;
    request({url, json: true }, (error, {body} ={}) => {
      if (error) {
        callback('Unable to Connect to Weather Service !',undefined);
      } else if (body.error) {
        callback('Cannot find the location',undefined);
      } else {
        callback(undefined,
          'It is currently ' +
            body.current.temperature +
            ' and it feels like ' +
            body.current.feelslike
        );
      }
    });
}

module.exports = forecast
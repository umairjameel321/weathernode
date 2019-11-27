const request = require('request');
const constants = require('../config');

forecast = (longitude, latitude, callback) => {
    const url = constants.darksky.BASE_URL + '/' + constants.darksky.SECRECT_KEY + '/' + latitude + ',' + longitude + '?units=' + constants.darksky.UNIT + '&lang=' + constants.darksky.LANG;
    request({url, json: true}, (error, {body}) => { // url means url: url and body is a property of response object
        if(error) {
            callback("Can't fetch data from dark sky api", undefined);
        } else if (body.error) {
            callback(body.error, undefined);
        } else {           
            callback(undefined, {'Summary': body.daily.data[0], 'Temperature': body.currently});
        }
    })
}

module.exports = forecast;
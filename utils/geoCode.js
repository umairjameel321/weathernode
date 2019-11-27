const request = require('request');
const constants = require('../config');

const geoCode = (address, callback) => {
    const url = constants.mapbox.BASE_URL + '/' + constants.mapbox.END_POINT + '/' + encodeURIComponent(address) + '?access_token=' + constants.mapbox.ACCESS_TOKEN + '&limit=' + constants.mapbox.LIMIT;

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback("Can't fetch data from mapbox api", undefined);
        } else if (body.features && !body.features.length) {
            callback("Unable to find location, try anotehr search", undefined);
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    })
}

module.exports = geoCode;
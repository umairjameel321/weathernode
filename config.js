const constants = {
    darksky: {
        BASE_URL:'https://api.darksky.net/forecast',
        SECRECT_KEY:'4da30de2788a4f2784121e215eccb9e7',
        LAT:'37.8267',
        LONG:'-122.4233',
        UNIT: 'si',
        LANG: 'en'
    }, 
    mapbox: { // this is to pass location name to this api and get a lot of data including lat/long (which we will use in darksky api to get weather data);
        BASE_URL:"https://api.mapbox.com/geocoding/v5",
        ACCESS_TOKEN:'pk.eyJ1IjoidW1haXJqYW1lZWwiLCJhIjoiY2sydGJpbGlpMG90dTNibnoyb2F1ejMyayJ9.V8AZ7Z-bpNEy4Z7AK2P_mw',
        END_POINT: "mapbox.places",
        SEARCH_TEXT: "Lahore.json",
        LIMIT: 1
    }
}

module.exports = constants;
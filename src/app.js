const express = require('express');
const path = require('path');
const hbs = require('hbs');

const constants = require('../config');
const geoCode = require('../utils/geoCode');
const forecast = require('../utils/forecast');

const app = express();

const publicStaticDirPath = path.join(__dirname, '../public');

// optional (required only if views (with same or other name) dir exist somewhere else other than main web-server dir.
// otherwise default location of views dir (with name 'views') will work.
const viewsPath = path.join(__dirname, '../templates/views');

const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and templates path
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// static dir to serve static content
app.use(express.static(publicStaticDirPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Umair",
        author: "Umair"
    });
});


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: "Umair Mirza",
        author: "Umair"
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: "Umair Jameel",
        author: "Umair"
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error Page',
        name: "Help dynamic page not found",
        author: "Umair"
    });
});

// localhost:3000/products?address=lahore
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ // return is required when more than one res.send are written within an endpoint
            error: 'You must address a search term.'
        })
    }
    geoCode(req.query.address + ".json", (error, {longitude, latitude, location} = {}) => {
        if(!error) {
            console.log("Longitude: %s, Latitude: %s, Location: %s", longitude, latitude, location);
            forecast(longitude, latitude, (error, response) => {
                if(!error) {
                    
                    res.send({
                        location,
                        data: response
                    });
                } else {
                    res.send({
                        error
                    });
                }
            })
        } else {
            res.send({
                error
            });
        }
    })
})

// 404 route should come at last
app.get("*", (req, res) => {
    res.render('404', {
        title: 'Error Page',
        name: "Page not found",
        author: "Umair"
    });
});

app.listen(3000, () => {
    console.log("Server is up and running on port 3000");
});
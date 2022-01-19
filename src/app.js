const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__dirname)
//console.log(path.join(__dirname,'../public'))   //joining paths of directory


const app = express()                                                   //loading express

const port = process.env.PORT || 3000                                    // heroku port

//defining paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')                   //customize name and location for views 
const partialsPath = path.join(__dirname, '../templates/partials')


//setup handlebars enginge and views

app.set('views', viewsPath)
app.set('view engine', 'hbs')                                            //handlebars to render dynamic pages
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))                                                               //way to customize server


app.get('', (req, res) => {               //gets view and converts to html
    res.render('index', {
        title: 'Weather',
        name: 'ilias'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'ilias'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'this is help text',
        title: ' help',
        name: 'ilias'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'you must provide address term'
        })
    }
    console.log(req.query.address)


    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

           
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })

    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide search term'
        })
    }


    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'ilias',
        errorMessage: 'Help article not found'
    })

})

app.get('*', (req, res) => {                //* means everything that hasnt been addressed !! always last

    res.render('404', {
        title: '404',
        name: 'ilias',
        errorMessage: 'Page not found'
    })
})


// app.com
//app.com/help
//app.com/about

app.listen(port, () => {                                      //starting server     //port//*

    console.log('server is up on port ' + port)
})                       
const request = require('request')




const forecast = (lot, lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=006f935df6f30a3bb49963fd4e7ad21d&query=' + lot + ',' + lat + '&units=m'
    request({ url, json: true }, (error, { body }) => {

        if (error) {

            callback('unable to connect to weather service', undefined)
        } else if (body.error) {

            callback('unable to find location', undefined)

        } else {

            callback(undefined, body.current.weather_descriptions[0] + '. it is currently ' + body.current.temperature + ' degrees. It feels like ' + body.current.feelslike +
                ' the humidity is : ' + body.current.humidity)

        }

    })
}

module.exports = forecast
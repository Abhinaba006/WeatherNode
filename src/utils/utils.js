const request = require('request')

const geo_code = (place, callback)=>{
    const geo_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(place)+'.json?access_token=pk.eyJ1IjoiYWJhYmFiYmEiLCJhIjoiY2s2ZGpjZXQyMTJkaDNrbXZ3ZXBzd2o2diJ9.PPVWGcZQuTCkVoE_ZC4ezw&limit=1'

    request({url:geo_url, json:true}, (error, response)=>{
        if(error){
            callback('unable to connect location service ', undefined)
        }else if(response.body.features.length===0){
            callback('Unable to find this location, try another place ', undefined)
        }else{
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=1ae23179161333de705cca972a455013&query='+latitude+','+longitude

    request({url:url, json:true}, (error, response)=>{
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degress out")
        }
    })
}

module.exports = {
    geo_code:geo_code,
    forecast:forecast
}


const request = require('request')

const forecast = (coords, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=42d13ddf54ccd4df52e16bc673bc7391&query='+coords
    request({
        url,
        json:true
    }, (error, {body})=>{
        if(error){
            callback('Unable to connect to forecast services', undefined)
        } else if(body.success == false){
            callback('Unable to fetch weather info', undefined)
        } else{
            callback(undefined, body);
        }
    })
}

module.exports = forecast
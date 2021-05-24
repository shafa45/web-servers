const request = require('request')

const geoCode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2hhZmE0NSIsImEiOiJja29kMHB2eTcwNGgzMnVsNGxweGJvMzkwIn0.CHp1tmcLoy5UNM9MWGJVuA&limit=1';
        request({url,json:true},(error,{body} ={}) => {
            if(error){
                callback("Unable to connect to location services",undefined)
            }
            else if (body.features.length === 0){
                callback('Unable to find location.Try another search.',undefined)
            }
            else{
                const lon = body.features[0].center[0];
                const lat = body.features[0].center[1];
                const location=body.features[0].place_name
                callback(undefined,{
                    lon:lon,
                    lat:lat,
                    location:location
                })
            }
        })
        
    }

    module.exports = geoCode
const weatherAPI= require('request')

const getLatLong= (address,callback)=>{
    const gecodingURL='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2FnYXIxODA1IiwiYSI6ImNqdGpsMHRhNjMweHgzem8zY3RrbDE5M24ifQ.AdUBEFGO925v0ntLsmvYCw'
    weatherAPI({url:gecodingURL,json:true},(error,response)=>{
        if(error){
            callback(['Unable to connect to Network'])
        }else if(response.body.features.length==0){
            callback(['Unable to access location'])
        }else{
            const data = {
                Latitude: response.body.features[0].center[0],
                Longitude : response.body.features[0].center[1],
                location : response.body.features[0].place_name
            }
            callback(undefined,data)
        }
    })
}

const getWeatherInfo=(lat,long,callback)=>{
    const url = 'https://api.darksky.net/forecast/4f2291991f13abda12d9f96b34d84ef4/'+encodeURIComponent(lat)+','+encodeURIComponent(long)
    
    weatherAPI({url:url,json : true},(error,response)=>{
        if(error){
            callback(['Unable to access location'])
        }else if(response.body.error){
            callback(['Please try another location!'])
        }else
        {
            const value ={
                temperature : response.body.currently.temperature,
                pricipitationProb: response.body.currently.precipProbability
            }
            callback(undefined,value)
        }
    })
}

module.exports={
    getLatLong:getLatLong,
    getWeatherInfo:getWeatherInfo
}
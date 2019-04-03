const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoC = require('../utils/geoCode')
const port = process.env.PORT || 3000


const app = express()
const staticWebPages = path.join(__dirname,"../public")
const viewsWebPages = path.join(__dirname,"../templates/views")

const partialWebPages = path.join(__dirname,"../templates/partials")

app.set('view engine','hbs')
app.set('views',viewsWebPages)
hbs.registerPartials(partialWebPages)

app.use(express.static(staticWebPages))

app.get('/about',(req,resp)=>{
    return resp.render('about',{
        "name": "sagar",
        "title" : "About"
    })
})

app.get('/help',(req,resp)=>{
    return resp.render('help',{
        "name": "sagar",
        "title" : "Help"
    })
})

app.get('',(req,resp)=>{
    return resp.render('index',{
        "name": "sagar",
        "title" : "Weather"
    })
})

app.get('/weather',(req,resp)=>{
    debugger
    if(!req.query.address){
        return resp.send({error})
    }
    geoC.getLatLong(req.query.address,(error,{Latitude,Longitude,location}={})=>{
        if(error){
            return resp.send({error})
        }
        geoC.getWeatherInfo(Latitude,Longitude,(error,{temperature,pricipitationProb}={})=>{
            if(error){
                return resp.send({error})
            }
            resp.send({
                Address:req.query.address,
                Latitude,
                Longitude,
                location,
                temperature,
                pricipitationProb
            })
        })
    })
})

app.get('*',(req,res)=>{
    return res.render('404',{
        title:"404",
        message:"Page Not Found",
        name:"sagar"
    })
})

app.listen(port,()=>{
    console.log('Listening on port '+port)
})
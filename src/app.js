const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config 
const publicDirPath =path.join(__dirname,'../public') 
const viewsPath =path.join(__dirname,'../templates/views') 
const partialsPath =path.join(__dirname,'../templates/partials') 


// Set up handlebars and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)

// Set up static directory to serve 
app.use(express.static(publicDirPath))

hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather",
        name:"Md Shafaullah"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Me",
        name:"Md Shafaullah"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        helpText:"This is some helpful text",
        name:"Md Shafaullah"
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return  res.send("Error : You must provide the search term")
    }
    res.send({
        products:[]
    })
    console.log(req.query)
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, { lat, lon, location } = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(lat,lon,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })

    // res.send({
    //     forecast:"It is snowing",
    //     location:"Kolkata",
    //     address:req.query.address
    // })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        errorMsg:"Cannot find Help article",
        title:"404 Error",
        name:"Md Shafaullah"
    })
})
app.get('/*',(req,res)=>{
    res.render('404',{
        errorMsg:"Page not Found",
        title:"404 Error",
        name:"Md Shafaullah"
    })
})






// app.com
// app.com/help
// app.com/about

app.listen(3000, ()=>{
    console.log("Server is up on port 3000.")
})
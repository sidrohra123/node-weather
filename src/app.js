const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title:'Weather App',
        name:'Siddharth'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title:'About Us',
        name:'Siddharth'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title:'Help Page',
        name:'Siddharth'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        pageName:req.url,
        title:'Help Article not found',
        name:'Siddharth'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide an address in url to have weather details'
        })
    }

    geocode(req.query.address, (error, data) => {
        if(error){
            return res.send({
                error:'Unable to search for geo code'
            });
        }
        forecast(data.longitude+','+data.latitude, (err, response)=>{
            if(err){
                return res.send({
                    error:'Error! '+err
                });
            }
            const weather = {
                address:req.query.address,
                forecast:response,
                location:data.location
            }
            res.send(weather)
        })
    })
})

app.get('/products', (req,res)=> {
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        pageName:req.url,
        title:'Page Not Found',
        name:'Siddharth'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})
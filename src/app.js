const express = require('express')
const path = require('path')
const hbs = require('hbs')
const utils = require('./utils/utils')
const geo_code = utils.geo_code
const forecast = utils.forecast


const app = express();
const port = process.env.PORT || 3000


// --- define paths for express
const public = path.join(__dirname, '../public');
const view_path = path.join(__dirname, '../templates/views')
const partials_path = path.join(__dirname, '../templates/partials')

// app.engine('html', require('ejs').renderFile);
app.set('view engine','hbs')
app.set('views', view_path)
hbs.registerPartials(partials_path)  // configur partial and register

app.use(express.static(public)) ;   //setup directory to serve

const name = 'Abhi'
app.get('', (req, res)=>{
    res.render('index', {
        title: 'weather app',
        name
    })
})

app.get('/help', (req, res)=>{
    res.send('Hello hlp');
});

app.get('/about', (req, res)=>{
    res.render('about', {
        name:name
    })
});

app.get('/weather', (req, res)=>{
    if(!req.query.place){
        return res.send({
            error:'You must provide search'
        })
    }
    else{
        const place = req.query.place;
        console.log(place)
        geo_code(place, (error, data)=>{
            if(error){
                res.send([{
                    error
                }, undefined])
            }else{
                const { latitude, longitude, location } = data
                forecast(latitude, longitude, (error, forecast_data)=>{
                    if(error) res.send([{
                        error
                    }, undefined])
                    else res.send([undefined, {
                        forecast_data,
                        location
                    }])
                })
            }
        })
    }
});


app.get('/product', (req, res)=>{
    if(!req.query.search){
        res.send({
            error:'You must provide search'
        })
    }else{
        console.log(req.query)
        res.send({
            hi:'hi'
        })
    } 
})

app.get('*', (req, res)=>{
    res.render('404')
})


app.listen(port, ()=>{
    console.log('server is up at '+port );
});
const express = require("express")
const bodyParser = require('body-parser')
const weatherRequest = require('./requests/weather')

const app = express()

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(req,res) =>{
    res.render('index', {weather:null,error:null})
})

app.post('/',async (req,res)=>{

    const {city} = req.body
    const {weather, error, main,fl} = await weatherRequest(city)
    
    res.render('index', {weather,error,main,fl})
})

app.listen(8000,()=>{
    console.log('Server started')
} )
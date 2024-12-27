require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const habitRoute = require('./router/habitRouter')
const app = express()

app.use(express.json())
app.use('/habit',habitRoute)
mongoose.connect(process.env.MONGO_URL)
    .then(() =>{
        app.listen(process.env.PORT,() =>{
            console.log("connected and running...")
        })
    })
    .catch((error)=>{
        console.log(error)
    })

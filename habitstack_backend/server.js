require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const habitRoute = require('./router/habitRouter')
const authRoute = require('./router/authRouter')
const  {authMiddleWare} = require('./middleware/authMiddleWare')

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())

app.use('/auth',authRoute)

app.use('/habit',authMiddleWare,habitRoute)

mongoose.connect(process.env.MONGO_URL)
    .then(() =>{
        app.listen(process.env.PORT,() =>{
            console.log("connected and running...")
        })
    })
    .catch((error)=>{
        console.log(error)
    })

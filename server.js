require('dotenv').config()
const express= require('express')
const mongoose= require('mongoose')
const workoutRoutes=require('./routes/workouts')
const userRoutes = require('./routes/user')
const statsRoutes = require('./routes/stats')

//express app
const app= express()

//middleware--> run on every request
app.use(express.json()) // to read json data on all post request
app.use((req,res,next) => {
    console.log(req.method, req.path)
    next() //for next real request
})

//routes--react to request (route handler)
app.get('/', (req,res) => {
    res.json({mssg: 'Congrats, you landed on landing page !!!!!'})
})

app.use('/api',statsRoutes)
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)



//connect to DB
mongoose.connect(process.env.MONGO_URI) //async takes some time and returns promise
    .then(()=> {
        console.log("Connected to DB")
        //listen for requests 
        app.listen(process.env.PORT,() => {
            console.log("Listening on PORT", process.env.PORT)
        })
    })
    .catch((error)=>{
        console.log(error)
    })


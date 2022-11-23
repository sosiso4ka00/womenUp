//mongo
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL, {
    dbName: 'todo'
})



//express stuff
const express = require('express')
const cors = require('cors')

const { json, urlencoded } = express

const app = express()

app.use(cors())
app.use(json())
app.use(urlencoded({extended:true}))

//routes
const todoRouter = require('./todo')
const authRouter = require('./auth')


app.use('/todo', todoRouter)
app.use('/auth', authRouter)



app.listen(process.env.PORT)


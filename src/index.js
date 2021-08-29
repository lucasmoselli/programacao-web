const express = require('express')
const cors = require('cors')
const path = require('path')
const http = require('http')

const userRouter = require('./controllers/userController')
const animeRouter = require('./controllers/animeController')
const db = require('./database/index')

const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use('/users', userRouter)
app.use('/anime', animeRouter)


app.listen(3000)

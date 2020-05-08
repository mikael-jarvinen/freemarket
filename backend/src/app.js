const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const listingRouter = require('./controllers/listings')
const userRouter = require('./controllers/users')

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => {
    console.log(`connected to MongoDB with ${process.env.NODE_ENV} mode`)
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())

app.use('/api/listings', listingRouter)
app.use('/api/users', userRouter)

module.exports = app
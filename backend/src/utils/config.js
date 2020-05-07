require('dotenv').config()

let MONGODB_URI = process.env.MONGODB_URI
let PORT = process.env.PORT

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
} else if (process.env.NODE_ENV === 'development') {
  MONGODB_URI = process.env.DEV_MONGODB_URI
}

module.exports = {
  MONGODB_URI,
  PORT
}
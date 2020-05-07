const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const listingSchema = mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  locality: {
    type: String,
    required: true,
  }
})

userSchema.plugin((uniqueValidator))
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Listing', userSchema)
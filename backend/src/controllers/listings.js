const listingsRouter = require('express').Router()
const Listing = require('../models/listing')

listingsRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (!body.title || !body.description || !body.locality || !body.author) {
    response.status(400).json({
      error: 'missing field or fields'
    })
  }

  try {
    const newListing = new Listing({
      title: body.title,
      description: body.description,
      locality: body.locality,
      author: body.author
    })
    response.json(await newListing.save())
  } catch (e) {
    next(e)
  }
})

listingsRouter.get('/:id', async (request, response, next) => {
  const id = request.params.id

  try {
    const listing = await Listing.findById(id)
    response.json(listing.toJSON())
  } catch (e) {
    next(e)
  }
})

listingsRouter.get('/', async (request, response) => {
  const allListings = await Listing.find({})

  response.json(allListings(l => l.toJSON()))
})

module.exports = listingsRouter
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (!body.displayName || !body.password) {
    return response.status(400).json({
      error: 'missing username and/or password'
    })
  } else if (body.password.length < 8) {
    return response.status(400).json({
      error: 'too short password, minimum length is 8'
    })
  }

  const passwordHash = await bcrypt.hash(body.password, 10)

  try {
    let user = {
      displayName: body.displayName,
      passwordHash
    }

    if (body.firstName && body.lastName) {
      user = {
        ...user,
        firstName: body.firstName,
        lastName: body.lastName,
      }
    }

    const newUser = new User(user)

    response.json(await newUser.save())
  } catch (e) {
    next(e)
  }
})

usersRouter.get('/search', async (request, response) => {
  const search = request.query.search
  const searchResult = await User.find({
    'displayName': {
      '$regex': search, '$options': 'i'
    }
  })
  response.json(searchResult)
})

usersRouter.get('/:id', async (request, response, next) => {
  const id = request.params.id

  try {
    const user = await User.findById(id)
    response.json(user.toJSON())
  } catch (e) {
    next(e)
  }
})

usersRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id

  try {
    await User.findByIdAndDelete(id)
    response.status(204).send()
  } catch (e) {
    next(e)
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})

  response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter
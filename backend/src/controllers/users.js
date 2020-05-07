const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
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
})
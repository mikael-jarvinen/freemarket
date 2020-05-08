const config = require('../src/utils/config')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../src/app')
const api = supertest(app)
const User = require('../src/models/user')
const Listing = require('../src/models/listing')

const initMongo = async () => {
  const tester1 = await new User({
    displayName: 'tester1',
    passwordHash: bcrypt.hashSync('password123', 10)
  }).save()

  const tester2 = await new User({
    displayName: 'tester2',
    passwordHash: bcrypt.hashSync('password123', 10),
    firstName: 'Adam',
    lastName: 'tester'
  }).save()

  const listing1 = await new Listing({
    title: 'Listing1',
    description: 'testing api with jest',
    locality: 'TestingLand',
    author: tester1._id
  }).save()

  const listing2 = await new Listing({
    title: 'Listing1',
    description: 'testing api with jest',
    locality: 'TestingLand',
    author: tester2._id
  }).save()
}

describe('api', () => {
  beforeEach(async () => {
    await initMongo()
  })

  describe('user endpoint', async () => {

  })

  describe('listings endpoint', async () => {
    
  })
})
import axios from 'axios'
import queryString from 'query-string'
import { removeFrontFilters } from '../utils'

const baseUrl = '/api/listings/'

// posts a new listing
export const post = async listing => {
  const body = new FormData()
  body.set('title', listing.title)
  body.set('price', listing.price)
  body.set('postal_code', listing.postal_code)
  body.set('category', listing.category)
  body.set('description', listing.description)
  body.append('picture', listing.picture)

  const response = await axios.post(
    baseUrl,
    body
  )
  return response.data
}

// gets listings and parses the price field to type Number
export const get = async (offset, filters) => {
  const response = await axios.get(`${baseUrl}?${queryString.stringify({
    ...removeFrontFilters(filters),
    offset
  })}`)
  return response.data
}
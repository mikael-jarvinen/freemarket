import axios from 'axios'
import queryString from 'query-string'
import { removeFrontFilters } from '../utils'

const baseUrl = '/api/listings/'

// posts a new listing
export const post = async values => {
  const body = new FormData()
  for (const key in values) {
    if (key === 'picture') {
      body.append('picture', values.picture)
    } else {
      body.set(key, values[key])
    }
  }

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
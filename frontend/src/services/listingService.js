import axios from 'axios'
import queryString from 'query-string'
import { removeFrontFilters } from '../utils'

const baseUrl = '/api/listings/'

// posts a new listing
export const post = async listing => {
  const response = await axios.post(
    baseUrl,
    listing
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
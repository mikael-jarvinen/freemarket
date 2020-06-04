import axios from 'axios'

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
export const get = async offset => {
  const response = await axios.get(`${baseUrl}?limit=21&offset=${offset}`)
  return response.data
}
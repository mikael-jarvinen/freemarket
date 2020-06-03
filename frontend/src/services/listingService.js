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

// gets listings
export const get = async offset => {
  const response = await axios.get(`${baseUrl}?offset=${offset}`)
  return response.data
}
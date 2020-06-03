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
  let response = await axios.get(`${baseUrl}?limit=21&offset=${offset}`)
  response = {
    ...response,
    data: {
      ...response.data,
      results: response.data.results.map(l => {
        return {
          ...l,
          price: Number(l.price)
        }
      })
    }
  }
  return response.data
}
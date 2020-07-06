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

// gets listings
export const get = async (offset, filters) => {
  const response = await axios.get(`${baseUrl}?${queryString.stringify({
    ...removeFrontFilters(filters),
    offset
  })}`)
  return response.data
}

// gets a single listing by id
export const getById = async id => {
  const response = await axios.get(baseUrl + id)
  return response.data
}
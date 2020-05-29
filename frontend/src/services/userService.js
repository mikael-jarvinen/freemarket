import axios from 'axios'

const baseUrl = '/api/users/'

//Returns an access and refresh token if email and password are valid
export const login = async (email, password) => {
  const response = await axios.post(
    '/api/token/',
    {
      email,
      password
    }
  )
  return response.data
}

// posts a new user
export const register = async (
  email,
  password,
  display_name,
  full_name,
  biography,
  website
) => {
  await axios.post(baseUrl, {
    email,
    password,
    display_name,
    full_name,
    biography,
    website
  })
}

//Returns a list of all users that match the search parameter
export const search = async search => {
  const response = await axios.get(`${baseUrl}?search=${search}`)
  return response.data.results
}
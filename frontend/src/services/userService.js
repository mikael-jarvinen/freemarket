import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import store from '../store/'
import { update } from '../store/authReducer'

axios.defaults.headers.common['Authorization'] = localStorage.getItem('access')

const refreshAuthLogic = async failedRequest => {
  const response = await axios.post(
    '/api/token/refresh/',
    {
      refresh: store.getState().auth.refresh
    }
  )
  const accessToken = response.data.access
  store.dispatch(update(accessToken))
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
  failedRequest.response.config.headers['Authorization'] =
  `Bearer ${accessToken}`
  return Promise.resolve()
}

// This function will attach the interceptor to axios for 
// refreshing tokens
createAuthRefreshInterceptor(axios, refreshAuthLogic)

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
  const response = await axios.post(baseUrl, {
    email,
    password,
    display_name,
    full_name,
    biography,
    website
  })
  return response
}

//Returns a list of all users that match the search parameter
export const search = async search => {
  const response = await axios.get(`${baseUrl}?search=${search}`)
  return response.data.results
}

// Put method for a user resource
export const put = async (id, user) => {
  const response = await axios.put(
    `${baseUrl}${id}/`,
    user
  )
  return response
}
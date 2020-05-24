import axios from 'axios'

let accessToken = localStorage.getItem('access')
let refreshToken = localStorage.getItem('refresh')

export const login = async (email, password) => {
  const response = await axios.post(
    '/api/token/',
    {
      email,
      password
    }
  )

  accessToken = response.data.access
  refreshToken = response.data.refresh
}
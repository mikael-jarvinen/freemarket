// This reducer is responsible for holding information
// about current authentication tokens and logged on user

import {
  login as loginAPI,
  search,
} from '../services/userService'
import { showMessage } from '../store/loginDialogReducer'

const initialState = () => {
  return {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    user: JSON.parse(localStorage.getItem('user'))
  }
}

export const login = (email, password) => {
  return async dispatch => {
    try {
      const { access, refresh } = await loginAPI(email, password)

      //email is unique so search should return only 1 user
      const users = await search(email)
      const user = users[0]

      dispatch({
        type: 'LOGIN',
        data: {
          access,
          refresh,
          user
        }
      })

      localStorage.setItem('access', access)
      localStorage.setItem('refresh', refresh)
      localStorage.setItem('user', JSON.stringify(user))
    } catch (e) {
      if (e.message.includes('401')) {
        dispatch(showMessage('Invalid credentials'))
      }
    }
  }
}

export const logout = () => {
  localStorage.setItem('access', null)
  localStorage.setItem('refresh', null)
  localStorage.setItem('user', null)
  return {
    type: 'LOGOUT'
  }
}

const authReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'LOGIN':
    return {
      ...state,
      access: action.data.access,
      refresh: action.data.refresh,
      user: action.data.user
    }
  case 'LOGOUT':
    return initialState
  default:
    return state
  }
}

export default authReducer
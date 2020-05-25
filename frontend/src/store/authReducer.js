// This reducer is responsible for holding information
// about current authentication tokens and logged on user

import { login as loginAPI, search } from '../backendAPI/userService'
import { closeDialog, showMessage } from '../store/loginDialogReducer'

const initialState = {
  access: null,
  refresh: null,
  user: null
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
      dispatch(closeDialog())

      localStorage.setItem('access', access)
      localStorage.setItem('refresh', refresh)
      localStorage.setItem('user', user)
    } catch (e) {
      if (e.message.includes('401')) {
        dispatch(showMessage('Invalid credentials'))
      }
    }
  }
}

export const logout = () => {
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
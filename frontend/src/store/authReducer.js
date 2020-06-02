// This reducer is responsible for holding information
// about current authentication tokens and logged on user

import {
  login as loginAPI,
  search,
  put
} from '../services/userService'
import { post } from '../services/listingService'
import { showMessage } from './loginFormReducer'
import { showMessage as alertListing } from './addListingDialogReducer'
import { push } from 'connected-react-router'

// fetches possible login information from localstorage
const initialState = () => {
  return {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    user: JSON.parse(localStorage.getItem('user'))
  }
}

// Posts a new listing then updates logged in users field by adding a
// new listing
// if posting fails dispatch action to show error message to AddListingDialog
export const addListing = listing => {
  return async dispatch => {
    try {
      const newListing = await post(listing)
      dispatch({
        type: 'NEW_LISTING',
        data: {
          newListing
        }
      })

      // if succesfull close AddListingDialog
      dispatch(push({ search: null }))
    } catch (e) {
      dispatch(alertListing(Object.values(e.response.data).join()))
    }
  }
}

// requests access and refresh tokens from backend then fetches the user
// the given email belongs to
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

// Edits a user with a PUT method than updates state with new edited user
export const editAccount = ({
  display_name,
  full_name,
  website,
  biography
}) => {
  return async (dispatch, getState) => {
    const { access, refresh, user} = getState().auth
    const response = await put(
      user.id,
      {
        email: user.email,
        display_name,
        full_name,
        website,
        biography
      }
    )

    return {
      type: 'LOGIN',
      data: {
        access,
        refresh,
        user: response.data
      }
    }
  }
}

// clears localstorage and state from any login information
export const logout = () => {
  localStorage.setItem('access', null)
  localStorage.setItem('refresh', null)
  localStorage.setItem('user', null)
  return {
    type: 'LOGOUT'
  }
}

// updates localstorage and state with new access token
export const update = access => {
  localStorage.setItem('access', access)
  return {
    type: 'UPDATE',
    data: {
      access
    }
  }
}

const authReducer = (state = initialState(), action) => {
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
  case 'UPDATE':
    return {
      ...state,
      access: action.data.access
    }
  case 'NEW_LISTING':
    return {
      ...state,
      user: {
        ...state.user,
        listings: state.user.listings.concat(action.data.newListing)
      }
    }
  default:
    return state
  }
}

export default authReducer
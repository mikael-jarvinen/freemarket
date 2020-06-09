// reducer responsible for updating the users state, which is 
// basically a cache for user resources

import { getById } from '../services/userService'

const initialState = {
  resolving: false,
  users: []
}

export const loadUser = id => {
  return async dispatch => {
    dispatch({ type: 'TOGGLE_USER_RESOLVING'})
    const user = await getById(id)
    dispatch({
      type: 'ADD_USER',
      data: user
    })
    dispatch({ type: 'TOGGLE_USER_RESOLVING'})
  }
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'ADD_USER':
    return {
      ...state,
      users: state.users.concat(action.data)
    }
  case 'TOGGLE_USER_RESOLVING':
    return {
      ...state,
      resolving: !state.resolving
    }
  default:
    return state
  }
}

export default usersReducer
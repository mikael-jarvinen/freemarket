// This reducer is responsible for holding information
// about current authentication tokens and logged on user
const initialState = () => {
  return null
}

const authReducer = (state = initialState(), action) => {
  switch(action.type) {
  case 'LOGIN':
    return state
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export default authReducer
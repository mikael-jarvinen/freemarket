// reducer responsible for the loginfrom alert state

export const showMessage = message => {
  return {
    type: 'MESSAGE',
    data: {
      message
    }
  }
}

const loginFormReducer = (state = { message: null }, action) => {
  switch(action.type) {
  case 'MESSAGE':
    return {
      ...state,
      message: action.data.message
    }
  default:
    return state
  }
}

export default loginFormReducer
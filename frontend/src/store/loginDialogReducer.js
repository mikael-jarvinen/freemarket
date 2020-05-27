// reducer responsible for the login dialog state

const initialState = {
  form: 'login'
}

export const showMessage = message => {
  return {
    type: 'MESSAGE',
    data: {
      message
    }
  }
}

const loginDialogReducer = (state = initialState, action) => {
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

export default loginDialogReducer
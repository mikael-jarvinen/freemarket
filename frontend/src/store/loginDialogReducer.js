// reducer responsible for the login dialog state

const initialState = {
  open: false,
  form: 'login'
}

export const closeDialog = () => {
  return {
    type: 'CLOSE'
  }
}

export const openDialog = () => {
  return {
    type: 'OPEN'
  }
}

export const showMessage = message => {
  return {
    type: 'MESSAGE',
    data: {
      message
    }
  }
}

export const showLogin = () => {
  return {
    type: 'SHOW_LOGIN'
  }
}

export const showRegister = () => {
  return {
    type: 'SHOW_REGISTER'
  }
}

const loginDialogReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'SHOW_LOGIN':
    return {
      ...state,
      form: 'login'
    }
  case 'SHOW_REGISTER':
    return {
      ...state,
      form: 'register'
    }
  case 'CLOSE':
    return {
      ...state,
      open: false
    }
  case 'OPEN':
    return {
      ...state,
      open: true
    }
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
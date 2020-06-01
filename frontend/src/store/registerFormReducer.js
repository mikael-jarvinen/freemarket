// reducer responsible of the registerform alerts state

const initialState = {
  email: null,
  display_name: null,
  password: null,
}

export const emailAlert = message => {
  return {
    type: 'EMAIL_ALERT',
    data: {
      message
    }
  }
}

export const passwordAlert = message => {
  return {
    type: 'PASSWORD_ALERT',
    data: {
      message
    }
  }
}

export const displayNameAlert = message => {
  return {
    type: 'DISPLAY_NAME_ALERT',
    data: {
      message
    }
  }
}

const registerFormReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'EMAIL_ALERT':
    return {
      ...state,
      email: action.data.message
    }
  case 'PASSWORD_ALERT':
    return {
      ...state,
      password: action.data.message
    }
  case 'DISPLAY_NAME_ALERT':
    return {
      ...state,
      display_name: action.data.message
    }
  default:
    return state
  }
}

export default registerFormReducer